import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3'
import { corsHeaders } from '../_shared/cors.ts'

const supabaseUrl = Deno.env.get('SUPABASE_URL')!
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!

interface UserWithDetails {
  user_id: string;
  email: string;
  created_at: string;
  agent_name?: string;
  agent_created_at?: string;
  agent_preferences?: any;
  has_profile: boolean;
  profile_data?: any;
  form_submissions: any[];
  session_count: number;
  last_activity?: string;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    // Get all users from auth.users
    const { data: authUsers, error: authError } = await supabase.auth.admin.listUsers()
    if (authError) {
      console.error('Error fetching auth users:', authError)
      throw authError
    }

    // Get all AI agents
    const { data: agents, error: agentsError } = await supabase
      .from('user_agents')
      .select('*')
      .order('created_at', { ascending: false })

    if (agentsError) {
      console.error('Error fetching agents:', agentsError)
      throw agentsError
    }

    // Get all profiles
    const { data: profiles, error: profilesError } = await supabase
      .from('profiles')
      .select('*')

    if (profilesError) {
      console.error('Error fetching profiles:', profilesError)
    }

    // Get form submissions
    const { data: forms, error: formsError } = await supabase
      .from('form_submissions')
      .select('*')
      .order('created_at', { ascending: false })

    if (formsError) {
      console.error('Error fetching forms:', formsError)
    }

    // Get recent sessions
    const { data: sessions, error: sessionsError } = await supabase
      .from('user_sessions')
      .select('user_id, created_at, last_activity')
      .gte('created_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString())
      .not('user_id', 'is', null)

    if (sessionsError) {
      console.error('Error fetching sessions:', sessionsError)
    }

    // Combine all data
    const usersWithDetails: UserWithDetails[] = []
    const processedUserIds = new Set<string>()

    // Process auth users with agents
    authUsers.users?.forEach(authUser => {
      const agent = agents?.find(a => a.user_id === authUser.id)
      const profile = profiles?.find(p => p.id === authUser.id)
      const userForms = forms?.filter(f => f.user_id === authUser.id) || []
      const userSessions = sessions?.filter(s => s.user_id === authUser.id) || []
      const lastActivity = userSessions.length > 0 
        ? userSessions.reduce((latest, session) => 
            new Date(session.last_activity || session.created_at) > new Date(latest) 
              ? session.last_activity || session.created_at 
              : latest, userSessions[0].last_activity || userSessions[0].created_at)
        : undefined

      if (agent || profile || userForms.length > 0 || userSessions.length > 0) {
        usersWithDetails.push({
          user_id: authUser.id,
          email: authUser.email || '',
          created_at: authUser.created_at,
          agent_name: agent?.name,
          agent_created_at: agent?.created_at,
          agent_preferences: agent?.preferences,
          has_profile: !!profile,
          profile_data: profile,
          form_submissions: userForms,
          session_count: userSessions.length,
          last_activity: lastActivity
        })
        processedUserIds.add(authUser.id)
      }
    })

    // Add users from form submissions who might not be in auth.users
    const formEmails = new Set(forms?.map(f => f.email) || [])
    formEmails.forEach(email => {
      const existingUser = usersWithDetails.find(u => u.email === email)
      if (!existingUser) {
        const userForms = forms?.filter(f => f.email === email) || []
        if (userForms.length > 0) {
          usersWithDetails.push({
            user_id: 'form-only-' + email.replace(/[^a-zA-Z0-9]/g, '-'),
            email: email,
            created_at: userForms[0].created_at || new Date().toISOString(),
            has_profile: false,
            form_submissions: userForms,
            session_count: 0
          })
        }
      }
    })

    // Calculate stats
    const stats = {
      total_users: authUsers.users?.length || 0,
      total_agents: agents?.length || 0,
      users_with_profiles: usersWithDetails.filter(u => u.has_profile).length,
      users_without_profiles: usersWithDetails.filter(u => !u.has_profile).length,
      recent_activity: new Set(sessions?.map(s => s.user_id)).size || 0,
      form_only_users: usersWithDetails.filter(u => u.user_id.startsWith('form-only-')).length
    }

    // Sort by most recent activity
    usersWithDetails.sort((a, b) => {
      const aDate = new Date(a.last_activity || a.agent_created_at || a.created_at)
      const bDate = new Date(b.last_activity || b.agent_created_at || b.created_at)
      return bDate.getTime() - aDate.getTime()
    })

    return new Response(
      JSON.stringify({ 
        users: usersWithDetails,
        stats: stats
      }),
      {
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        },
        status: 200,
      }
    )

  } catch (error) {
    console.error('Error in admin-users function:', error)
    return new Response(
      JSON.stringify({ 
        error: error.message,
        details: 'Failed to fetch user data'
      }),
      {
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        },
        status: 500,
      }
    )
  }
})