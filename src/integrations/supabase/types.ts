export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      bookings: {
        Row: {
          booking_date: string | null
          booking_details: Json | null
          booking_reference: string | null
          booking_type: string
          check_in_date: string | null
          check_out_date: string | null
          cost: number | null
          created_at: string
          description: string | null
          id: string
          location: string | null
          provider: string | null
          status: string | null
          trip_id: string
          user_id: string
        }
        Insert: {
          booking_date?: string | null
          booking_details?: Json | null
          booking_reference?: string | null
          booking_type: string
          check_in_date?: string | null
          check_out_date?: string | null
          cost?: number | null
          created_at?: string
          description?: string | null
          id?: string
          location?: string | null
          provider?: string | null
          status?: string | null
          trip_id: string
          user_id: string
        }
        Update: {
          booking_date?: string | null
          booking_details?: Json | null
          booking_reference?: string | null
          booking_type?: string
          check_in_date?: string | null
          check_out_date?: string | null
          cost?: number | null
          created_at?: string
          description?: string | null
          id?: string
          location?: string | null
          provider?: string | null
          status?: string | null
          trip_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "bookings_trip_id_fkey"
            columns: ["trip_id"]
            isOneToOne: false
            referencedRelation: "trips"
            referencedColumns: ["id"]
          },
        ]
      }
      campaign_sends: {
        Row: {
          campaign_id: string | null
          clicked_at: string | null
          created_at: string
          delivered_at: string | null
          error_message: string | null
          id: string
          opened_at: string | null
          recipient_email: string
          sent_at: string | null
          status: string | null
          user_id: string | null
        }
        Insert: {
          campaign_id?: string | null
          clicked_at?: string | null
          created_at?: string
          delivered_at?: string | null
          error_message?: string | null
          id?: string
          opened_at?: string | null
          recipient_email: string
          sent_at?: string | null
          status?: string | null
          user_id?: string | null
        }
        Update: {
          campaign_id?: string | null
          clicked_at?: string | null
          created_at?: string
          delivered_at?: string | null
          error_message?: string | null
          id?: string
          opened_at?: string | null
          recipient_email?: string
          sent_at?: string | null
          status?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "campaign_sends_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "marketing_campaigns"
            referencedColumns: ["id"]
          },
        ]
      }
      consultation_requests: {
        Row: {
          budget: string | null
          created_at: string
          destinations: string | null
          email: string
          id: string
          interests: string | null
          name: string
          phone: string
          travel_dates: string | null
          travelers: string | null
        }
        Insert: {
          budget?: string | null
          created_at?: string
          destinations?: string | null
          email: string
          id?: string
          interests?: string | null
          name: string
          phone: string
          travel_dates?: string | null
          travelers?: string | null
        }
        Update: {
          budget?: string | null
          created_at?: string
          destinations?: string | null
          email?: string
          id?: string
          interests?: string | null
          name?: string
          phone?: string
          travel_dates?: string | null
          travelers?: string | null
        }
        Relationships: []
      }
      documents: {
        Row: {
          application_id: string | null
          created_at: string
          document_type: string
          file_name: string
          file_size: number | null
          file_url: string
          id: string
          mime_type: string | null
          user_id: string
        }
        Insert: {
          application_id?: string | null
          created_at?: string
          document_type: string
          file_name: string
          file_size?: number | null
          file_url: string
          id?: string
          mime_type?: string | null
          user_id: string
        }
        Update: {
          application_id?: string | null
          created_at?: string
          document_type?: string
          file_name?: string
          file_size?: number | null
          file_url?: string
          id?: string
          mime_type?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "documents_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "visa_applications"
            referencedColumns: ["id"]
          },
        ]
      }
      form_submissions: {
        Row: {
          budget: string | null
          created_at: string
          departure_date: string | null
          destination: string | null
          duration: string | null
          email: string
          form_type: string
          id: string
          ip_address: string | null
          name: string
          nationality: string | null
          other_needs: string | null
          phone: string
          referrer: string | null
          return_date: string | null
          selected_packages: string[] | null
          special_requests: string | null
          travel_date: string | null
          travel_needs: string[] | null
          travel_purpose: string | null
          travelers: string | null
          updated_at: string
          user_agent: string | null
          user_id: string | null
          visa_type: string | null
        }
        Insert: {
          budget?: string | null
          created_at?: string
          departure_date?: string | null
          destination?: string | null
          duration?: string | null
          email: string
          form_type: string
          id?: string
          ip_address?: string | null
          name: string
          nationality?: string | null
          other_needs?: string | null
          phone: string
          referrer?: string | null
          return_date?: string | null
          selected_packages?: string[] | null
          special_requests?: string | null
          travel_date?: string | null
          travel_needs?: string[] | null
          travel_purpose?: string | null
          travelers?: string | null
          updated_at?: string
          user_agent?: string | null
          user_id?: string | null
          visa_type?: string | null
        }
        Update: {
          budget?: string | null
          created_at?: string
          departure_date?: string | null
          destination?: string | null
          duration?: string | null
          email?: string
          form_type?: string
          id?: string
          ip_address?: string | null
          name?: string
          nationality?: string | null
          other_needs?: string | null
          phone?: string
          referrer?: string | null
          return_date?: string | null
          selected_packages?: string[] | null
          special_requests?: string | null
          travel_date?: string | null
          travel_needs?: string[] | null
          travel_purpose?: string | null
          travelers?: string | null
          updated_at?: string
          user_agent?: string | null
          user_id?: string | null
          visa_type?: string | null
        }
        Relationships: []
      }
      long_visas_leads: {
        Row: {
          created_at: string
          departure_city: string
          destination_country: string
          email: string
          id: string
          nationality: string
          phone: string
          visa_category: string
        }
        Insert: {
          created_at?: string
          departure_city: string
          destination_country: string
          email: string
          id?: string
          nationality: string
          phone: string
          visa_category: string
        }
        Update: {
          created_at?: string
          departure_city?: string
          destination_country?: string
          email?: string
          id?: string
          nationality?: string
          phone?: string
          visa_category?: string
        }
        Relationships: []
      }
      marketing_campaigns: {
        Row: {
          clicked_count: number | null
          content: string
          created_at: string
          id: string
          max_days_since_signup: number | null
          min_days_since_signup: number | null
          name: string
          opened_count: number | null
          recipients_count: number | null
          scheduled_at: string | null
          sent_at: string | null
          status: string | null
          subject: string | null
          target_budget_ranges: string[] | null
          target_destinations: string[] | null
          target_form_types: string[] | null
          target_travel_needs: string[] | null
          type: string
          updated_at: string
        }
        Insert: {
          clicked_count?: number | null
          content: string
          created_at?: string
          id?: string
          max_days_since_signup?: number | null
          min_days_since_signup?: number | null
          name: string
          opened_count?: number | null
          recipients_count?: number | null
          scheduled_at?: string | null
          sent_at?: string | null
          status?: string | null
          subject?: string | null
          target_budget_ranges?: string[] | null
          target_destinations?: string[] | null
          target_form_types?: string[] | null
          target_travel_needs?: string[] | null
          type: string
          updated_at?: string
        }
        Update: {
          clicked_count?: number | null
          content?: string
          created_at?: string
          id?: string
          max_days_since_signup?: number | null
          min_days_since_signup?: number | null
          name?: string
          opened_count?: number | null
          recipients_count?: number | null
          scheduled_at?: string | null
          sent_at?: string | null
          status?: string | null
          subject?: string | null
          target_budget_ranges?: string[] | null
          target_destinations?: string[] | null
          target_form_types?: string[] | null
          target_travel_needs?: string[] | null
          type?: string
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          date_of_birth: string | null
          first_name: string | null
          id: string
          last_name: string | null
          nationality: string | null
          passport_expiry: string | null
          passport_number: string | null
          phone: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          date_of_birth?: string | null
          first_name?: string | null
          id: string
          last_name?: string | null
          nationality?: string | null
          passport_expiry?: string | null
          passport_number?: string | null
          phone?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          date_of_birth?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          nationality?: string | null
          passport_expiry?: string | null
          passport_number?: string | null
          phone?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      short_visas_leads: {
        Row: {
          created_at: string
          departure_city: string
          destination_country: string
          email: string
          id: string
          nationality: string
          phone: string
          purpose: string
        }
        Insert: {
          created_at?: string
          departure_city: string
          destination_country: string
          email: string
          id?: string
          nationality: string
          phone: string
          purpose: string
        }
        Update: {
          created_at?: string
          departure_city?: string
          destination_country?: string
          email?: string
          id?: string
          nationality?: string
          phone?: string
          purpose?: string
        }
        Relationships: []
      }
      trips: {
        Row: {
          created_at: string
          departure_city: string | null
          departure_date: string | null
          destination_country: string
          id: string
          return_date: string | null
          status: string | null
          total_budget: number | null
          trip_type: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          departure_city?: string | null
          departure_date?: string | null
          destination_country: string
          id?: string
          return_date?: string | null
          status?: string | null
          total_budget?: number | null
          trip_type?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          departure_city?: string | null
          departure_date?: string | null
          destination_country?: string
          id?: string
          return_date?: string | null
          status?: string | null
          total_budget?: number | null
          trip_type?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_activity: {
        Row: {
          action_data: Json | null
          action_type: string | null
          city: string | null
          country: string | null
          created_at: string
          email: string
          id: string
          ip_address: string | null
          is_online: boolean | null
          last_seen: string | null
          page_visited: string
          session_id: string | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          action_data?: Json | null
          action_type?: string | null
          city?: string | null
          country?: string | null
          created_at?: string
          email: string
          id?: string
          ip_address?: string | null
          is_online?: boolean | null
          last_seen?: string | null
          page_visited: string
          session_id?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          action_data?: Json | null
          action_type?: string | null
          city?: string | null
          country?: string | null
          created_at?: string
          email?: string
          id?: string
          ip_address?: string | null
          is_online?: boolean | null
          last_seen?: string | null
          page_visited?: string
          session_id?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      user_documents: {
        Row: {
          document_type: string | null
          file_name: string
          file_path: string
          file_size: number | null
          id: string
          mime_type: string | null
          updated_at: string
          uploaded_at: string
          user_id: string
        }
        Insert: {
          document_type?: string | null
          file_name: string
          file_path: string
          file_size?: number | null
          id?: string
          mime_type?: string | null
          updated_at?: string
          uploaded_at?: string
          user_id: string
        }
        Update: {
          document_type?: string | null
          file_name?: string
          file_path?: string
          file_size?: number | null
          id?: string
          mime_type?: string | null
          updated_at?: string
          uploaded_at?: string
          user_id?: string
        }
        Relationships: []
      }
      visa_applications: {
        Row: {
          application_reference: string | null
          created_at: string
          departure_date: string | null
          email: string
          id: string
          last_updated: string | null
          name: string
          nationality: string
          previous_visas: string | null
          return_date: string | null
          special_circumstances: string | null
          status: string | null
          submitted_at: string | null
          travel_purpose: string
          user_id: string | null
          visa_type: string
        }
        Insert: {
          application_reference?: string | null
          created_at?: string
          departure_date?: string | null
          email: string
          id?: string
          last_updated?: string | null
          name: string
          nationality: string
          previous_visas?: string | null
          return_date?: string | null
          special_circumstances?: string | null
          status?: string | null
          submitted_at?: string | null
          travel_purpose?: string
          user_id?: string | null
          visa_type: string
        }
        Update: {
          application_reference?: string | null
          created_at?: string
          departure_date?: string | null
          email?: string
          id?: string
          last_updated?: string | null
          name?: string
          nationality?: string
          previous_visas?: string | null
          return_date?: string | null
          special_circumstances?: string | null
          status?: string | null
          submitted_at?: string | null
          travel_purpose?: string
          user_id?: string | null
          visa_type?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
