export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3"
  }
  public: {
    Tables: {
      agent_avatar_presets: {
        Row: {
          category: string | null
          display_name: string
          emoji: string | null
          id: string
          is_active: boolean | null
          preset_key: string
          sort_order: number | null
          svg_url: string | null
        }
        Insert: {
          category?: string | null
          display_name: string
          emoji?: string | null
          id?: string
          is_active?: boolean | null
          preset_key: string
          sort_order?: number | null
          svg_url?: string | null
        }
        Update: {
          category?: string | null
          display_name?: string
          emoji?: string | null
          id?: string
          is_active?: boolean | null
          preset_key?: string
          sort_order?: number | null
          svg_url?: string | null
        }
        Relationships: []
      }
      agent_conversations: {
        Row: {
          agent_id: string
          created_at: string | null
          id: string
          title: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          agent_id: string
          created_at?: string | null
          id?: string
          title?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          agent_id?: string
          created_at?: string | null
          id?: string
          title?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "agent_conversations_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "travel_agents"
            referencedColumns: ["id"]
          },
        ]
      }
      agent_messages: {
        Row: {
          content: string
          conversation_id: string
          created_at: string | null
          id: string
          metadata: Json | null
          role: string
        }
        Insert: {
          content: string
          conversation_id: string
          created_at?: string | null
          id?: string
          metadata?: Json | null
          role: string
        }
        Update: {
          content?: string
          conversation_id?: string
          created_at?: string | null
          id?: string
          metadata?: Json | null
          role?: string
        }
        Relationships: [
          {
            foreignKeyName: "agent_messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "agent_conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      agent_offer_cards: {
        Row: {
          affiliate_source: string | null
          badge: string | null
          booked_at: string | null
          clicked_at: string | null
          commission_amount: number | null
          commission_rate: number | null
          created_at: string | null
          cta_action: string | null
          cta_label: string | null
          cta_url: string | null
          currency: string | null
          expires_at: string | null
          id: string
          image_url: string | null
          offer_data: Json | null
          offer_type: string
          price: number | null
          session_id: string | null
          subtitle: string | null
          title: string
          user_id: string | null
          was_booked: boolean | null
          was_clicked: boolean | null
        }
        Insert: {
          affiliate_source?: string | null
          badge?: string | null
          booked_at?: string | null
          clicked_at?: string | null
          commission_amount?: number | null
          commission_rate?: number | null
          created_at?: string | null
          cta_action?: string | null
          cta_label?: string | null
          cta_url?: string | null
          currency?: string | null
          expires_at?: string | null
          id?: string
          image_url?: string | null
          offer_data?: Json | null
          offer_type: string
          price?: number | null
          session_id?: string | null
          subtitle?: string | null
          title: string
          user_id?: string | null
          was_booked?: boolean | null
          was_clicked?: boolean | null
        }
        Update: {
          affiliate_source?: string | null
          badge?: string | null
          booked_at?: string | null
          clicked_at?: string | null
          commission_amount?: number | null
          commission_rate?: number | null
          created_at?: string | null
          cta_action?: string | null
          cta_label?: string | null
          cta_url?: string | null
          currency?: string | null
          expires_at?: string | null
          id?: string
          image_url?: string | null
          offer_data?: Json | null
          offer_type?: string
          price?: number | null
          session_id?: string | null
          subtitle?: string | null
          title?: string
          user_id?: string | null
          was_booked?: boolean | null
          was_clicked?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "agent_offer_cards_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "agent_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      agent_onboarding_progress: {
        Row: {
          completed_at: string | null
          created_at: string | null
          id: string
          skipped_steps: string[] | null
          step_1_name_done: boolean | null
          step_2_personality_done: boolean | null
          step_3_avatar_done: boolean | null
          step_4_travel_profile_done: boolean | null
          step_5_loyalty_done: boolean | null
          step_6_companions_done: boolean | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          completed_at?: string | null
          created_at?: string | null
          id?: string
          skipped_steps?: string[] | null
          step_1_name_done?: boolean | null
          step_2_personality_done?: boolean | null
          step_3_avatar_done?: boolean | null
          step_4_travel_profile_done?: boolean | null
          step_5_loyalty_done?: boolean | null
          step_6_companions_done?: boolean | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          completed_at?: string | null
          created_at?: string | null
          id?: string
          skipped_steps?: string[] | null
          step_1_name_done?: boolean | null
          step_2_personality_done?: boolean | null
          step_3_avatar_done?: boolean | null
          step_4_travel_profile_done?: boolean | null
          step_5_loyalty_done?: boolean | null
          step_6_companions_done?: boolean | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      agent_sessions: {
        Row: {
          created_at: string | null
          current_page: string | null
          detected_budget: string | null
          detected_dates: Json | null
          detected_destination: string | null
          detected_intent: string | null
          detected_mood: string | null
          detected_origin: string | null
          detected_travelers: number | null
          id: string
          is_active: boolean | null
          messages: Json | null
          offers_booked: Json | null
          offers_clicked: Json | null
          offers_shown: Json | null
          session_token: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          current_page?: string | null
          detected_budget?: string | null
          detected_dates?: Json | null
          detected_destination?: string | null
          detected_intent?: string | null
          detected_mood?: string | null
          detected_origin?: string | null
          detected_travelers?: number | null
          id?: string
          is_active?: boolean | null
          messages?: Json | null
          offers_booked?: Json | null
          offers_clicked?: Json | null
          offers_shown?: Json | null
          session_token?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          current_page?: string | null
          detected_budget?: string | null
          detected_dates?: Json | null
          detected_destination?: string | null
          detected_intent?: string | null
          detected_mood?: string | null
          detected_origin?: string | null
          detected_travelers?: number | null
          id?: string
          is_active?: boolean | null
          messages?: Json | null
          offers_booked?: Json | null
          offers_clicked?: Json | null
          offers_shown?: Json | null
          session_token?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      application_travelers: {
        Row: {
          application_id: string
          contact_info: Json | null
          created_at: string
          id: string
          passport_info: Json | null
          personal_info: Json | null
          traveler_number: number
          traveler_reference: string
          updated_at: string
        }
        Insert: {
          application_id: string
          contact_info?: Json | null
          created_at?: string
          id?: string
          passport_info?: Json | null
          personal_info?: Json | null
          traveler_number: number
          traveler_reference: string
          updated_at?: string
        }
        Update: {
          application_id?: string
          contact_info?: Json | null
          created_at?: string
          id?: string
          passport_info?: Json | null
          personal_info?: Json | null
          traveler_number?: number
          traveler_reference?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "application_travelers_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "visa_applications"
            referencedColumns: ["id"]
          },
        ]
      }
      appointments: {
        Row: {
          appointment_type: string | null
          created_at: string
          duration_minutes: number | null
          id: string
          lead_id: string | null
          meeting_link: string | null
          notes: string | null
          scheduled_at: string
          status: string | null
        }
        Insert: {
          appointment_type?: string | null
          created_at?: string
          duration_minutes?: number | null
          id?: string
          lead_id?: string | null
          meeting_link?: string | null
          notes?: string | null
          scheduled_at: string
          status?: string | null
        }
        Update: {
          appointment_type?: string | null
          created_at?: string
          duration_minutes?: number | null
          id?: string
          lead_id?: string | null
          meeting_link?: string | null
          notes?: string | null
          scheduled_at?: string
          status?: string | null
        }
        Relationships: []
      }
      automation_rules: {
        Row: {
          action_data: Json
          action_type: string
          created_at: string
          id: string
          is_active: boolean | null
          name: string
          trigger_conditions: Json
          trigger_type: string
        }
        Insert: {
          action_data: Json
          action_type: string
          created_at?: string
          id?: string
          is_active?: boolean | null
          name: string
          trigger_conditions: Json
          trigger_type: string
        }
        Update: {
          action_data?: Json
          action_type?: string
          created_at?: string
          id?: string
          is_active?: boolean | null
          name?: string
          trigger_conditions?: Json
          trigger_type?: string
        }
        Relationships: []
      }
      blockchain_keys: {
        Row: {
          created_at: string
          id: string
          key_hash: string
          last_used_at: string | null
          status: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          key_hash: string
          last_used_at?: string | null
          status?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          key_hash?: string
          last_used_at?: string | null
          status?: string | null
          user_id?: string
        }
        Relationships: []
      }
      booking_documents: {
        Row: {
          booking_id: string
          document_name: string
          document_type: string
          file_size: number | null
          file_url: string
          id: string
          mime_type: string | null
          passenger_id: string | null
          uploaded_at: string
        }
        Insert: {
          booking_id: string
          document_name: string
          document_type: string
          file_size?: number | null
          file_url: string
          id?: string
          mime_type?: string | null
          passenger_id?: string | null
          uploaded_at?: string
        }
        Update: {
          booking_id?: string
          document_name?: string
          document_type?: string
          file_size?: number | null
          file_url?: string
          id?: string
          mime_type?: string | null
          passenger_id?: string | null
          uploaded_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "booking_documents_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "flight_bookings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "booking_documents_passenger_id_fkey"
            columns: ["passenger_id"]
            isOneToOne: false
            referencedRelation: "booking_passengers"
            referencedColumns: ["id"]
          },
        ]
      }
      booking_passengers: {
        Row: {
          booking_id: string
          created_at: string
          date_of_birth: string
          email: string
          first_name: string
          id: string
          last_name: string
          meal_preference: string | null
          nationality: string
          passenger_type: string
          passport_expiry: string | null
          passport_number: string | null
          phone: string | null
          seat_preference: string | null
          special_requests: string | null
          title: string
        }
        Insert: {
          booking_id: string
          created_at?: string
          date_of_birth: string
          email: string
          first_name: string
          id?: string
          last_name: string
          meal_preference?: string | null
          nationality: string
          passenger_type?: string
          passport_expiry?: string | null
          passport_number?: string | null
          phone?: string | null
          seat_preference?: string | null
          special_requests?: string | null
          title: string
        }
        Update: {
          booking_id?: string
          created_at?: string
          date_of_birth?: string
          email?: string
          first_name?: string
          id?: string
          last_name?: string
          meal_preference?: string | null
          nationality?: string
          passenger_type?: string
          passport_expiry?: string | null
          passport_number?: string | null
          phone?: string | null
          seat_preference?: string | null
          special_requests?: string | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "booking_passengers_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "flight_bookings"
            referencedColumns: ["id"]
          },
        ]
      }
      booking_payments: {
        Row: {
          amount: number
          booking_id: string
          created_at: string
          currency: string
          id: string
          payment_date: string | null
          payment_intent_id: string | null
          payment_method: string | null
          payment_status: string
          refund_amount: number | null
          refund_date: string | null
          square_location_id: string | null
          square_order_id: string | null
          square_payment_id: string | null
          stripe_payment_intent_id: string | null
          stripe_session_id: string | null
          updated_at: string
        }
        Insert: {
          amount: number
          booking_id: string
          created_at?: string
          currency?: string
          id?: string
          payment_date?: string | null
          payment_intent_id?: string | null
          payment_method?: string | null
          payment_status?: string
          refund_amount?: number | null
          refund_date?: string | null
          square_location_id?: string | null
          square_order_id?: string | null
          square_payment_id?: string | null
          stripe_payment_intent_id?: string | null
          stripe_session_id?: string | null
          updated_at?: string
        }
        Update: {
          amount?: number
          booking_id?: string
          created_at?: string
          currency?: string
          id?: string
          payment_date?: string | null
          payment_intent_id?: string | null
          payment_method?: string | null
          payment_status?: string
          refund_amount?: number | null
          refund_date?: string | null
          square_location_id?: string | null
          square_order_id?: string | null
          square_payment_id?: string | null
          stripe_payment_intent_id?: string | null
          stripe_session_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "booking_payments_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "flight_bookings"
            referencedColumns: ["id"]
          },
        ]
      }
      bookings: {
        Row: {
          booking_category: string | null
          booking_date: string | null
          booking_details: Json | null
          booking_reference: string | null
          booking_type: string
          cancellation_policy: Json | null
          check_in_date: string | null
          check_out_date: string | null
          confirmation_code: string | null
          cost: number | null
          created_at: string
          description: string | null
          id: string
          location: string | null
          provider: string | null
          special_requirements: string | null
          status: string | null
          supplier_reference: string | null
          trip_id: string
          user_id: string
        }
        Insert: {
          booking_category?: string | null
          booking_date?: string | null
          booking_details?: Json | null
          booking_reference?: string | null
          booking_type: string
          cancellation_policy?: Json | null
          check_in_date?: string | null
          check_out_date?: string | null
          confirmation_code?: string | null
          cost?: number | null
          created_at?: string
          description?: string | null
          id?: string
          location?: string | null
          provider?: string | null
          special_requirements?: string | null
          status?: string | null
          supplier_reference?: string | null
          trip_id: string
          user_id: string
        }
        Update: {
          booking_category?: string | null
          booking_date?: string | null
          booking_details?: Json | null
          booking_reference?: string | null
          booking_type?: string
          cancellation_policy?: Json | null
          check_in_date?: string | null
          check_out_date?: string | null
          confirmation_code?: string | null
          cost?: number | null
          created_at?: string
          description?: string | null
          id?: string
          location?: string | null
          provider?: string | null
          special_requirements?: string | null
          status?: string | null
          supplier_reference?: string | null
          trip_id?: string
          user_id?: string
        }
        Relationships: []
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
      chat_conversations: {
        Row: {
          created_at: string
          id: string
          title: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          title?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          title?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      chat_messages: {
        Row: {
          content: string
          conversation_id: string
          created_at: string
          id: string
          metadata: Json | null
          role: string
        }
        Insert: {
          content: string
          conversation_id: string
          created_at?: string
          id?: string
          metadata?: Json | null
          role: string
        }
        Update: {
          content?: string
          conversation_id?: string
          created_at?: string
          id?: string
          metadata?: Json | null
          role?: string
        }
        Relationships: [
          {
            foreignKeyName: "chat_messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "chat_conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      commission_tracking: {
        Row: {
          affiliate_source: string | null
          booked_at: string | null
          booking_reference: string | null
          booking_type: string
          commission_amount: number | null
          commission_paid_at: string | null
          commission_rate: number | null
          commission_status: string | null
          created_at: string | null
          gross_amount: number | null
          id: string
          offer_card_id: string | null
          user_id: string | null
        }
        Insert: {
          affiliate_source?: string | null
          booked_at?: string | null
          booking_reference?: string | null
          booking_type: string
          commission_amount?: number | null
          commission_paid_at?: string | null
          commission_rate?: number | null
          commission_status?: string | null
          created_at?: string | null
          gross_amount?: number | null
          id?: string
          offer_card_id?: string | null
          user_id?: string | null
        }
        Update: {
          affiliate_source?: string | null
          booked_at?: string | null
          booking_reference?: string | null
          booking_type?: string
          commission_amount?: number | null
          commission_paid_at?: string | null
          commission_rate?: number | null
          commission_status?: string | null
          created_at?: string | null
          gross_amount?: number | null
          id?: string
          offer_card_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "commission_tracking_offer_card_id_fkey"
            columns: ["offer_card_id"]
            isOneToOne: false
            referencedRelation: "agent_offer_cards"
            referencedColumns: ["id"]
          },
        ]
      }
      consultation_bookings: {
        Row: {
          agent_notes: string | null
          assigned_agent_id: string | null
          booking_reference: string | null
          calendly_event_uri: string | null
          created_at: string | null
          destination_code: string
          document_checklist: Json | null
          documents_ready: boolean | null
          duration_minutes: number | null
          follow_up_required: boolean | null
          id: string
          meeting_link: string | null
          original_scheduled_at: string | null
          outcome: string | null
          package_type: string
          payment_status: string | null
          price_paid: number | null
          reschedule_reason: string | null
          rescheduled: boolean | null
          rescheduled_at: string | null
          scheduled_at: string | null
          screening_session_id: string | null
          status: string | null
          stripe_payment_intent_id: string | null
          timezone: string | null
          updated_at: string | null
          user_id: string | null
          visa_type: string | null
        }
        Insert: {
          agent_notes?: string | null
          assigned_agent_id?: string | null
          booking_reference?: string | null
          calendly_event_uri?: string | null
          created_at?: string | null
          destination_code: string
          document_checklist?: Json | null
          documents_ready?: boolean | null
          duration_minutes?: number | null
          follow_up_required?: boolean | null
          id?: string
          meeting_link?: string | null
          original_scheduled_at?: string | null
          outcome?: string | null
          package_type: string
          payment_status?: string | null
          price_paid?: number | null
          reschedule_reason?: string | null
          rescheduled?: boolean | null
          rescheduled_at?: string | null
          scheduled_at?: string | null
          screening_session_id?: string | null
          status?: string | null
          stripe_payment_intent_id?: string | null
          timezone?: string | null
          updated_at?: string | null
          user_id?: string | null
          visa_type?: string | null
        }
        Update: {
          agent_notes?: string | null
          assigned_agent_id?: string | null
          booking_reference?: string | null
          calendly_event_uri?: string | null
          created_at?: string | null
          destination_code?: string
          document_checklist?: Json | null
          documents_ready?: boolean | null
          duration_minutes?: number | null
          follow_up_required?: boolean | null
          id?: string
          meeting_link?: string | null
          original_scheduled_at?: string | null
          outcome?: string | null
          package_type?: string
          payment_status?: string | null
          price_paid?: number | null
          reschedule_reason?: string | null
          rescheduled?: boolean | null
          rescheduled_at?: string | null
          scheduled_at?: string | null
          screening_session_id?: string | null
          status?: string | null
          stripe_payment_intent_id?: string | null
          timezone?: string | null
          updated_at?: string | null
          user_id?: string | null
          visa_type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "consultation_bookings_screening_session_id_fkey"
            columns: ["screening_session_id"]
            isOneToOne: false
            referencedRelation: "visa_screening_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      consultation_packages: {
        Row: {
          consultation_count: number | null
          features: Json | null
          id: string
          includes_doc_review: boolean | null
          includes_followup: boolean | null
          includes_mock_interview: boolean | null
          is_active: boolean | null
          name: string
          package_key: string
          price_usd: number
          sort_order: number | null
          stripe_price_id: string | null
          tagline: string | null
          validity_days: number | null
        }
        Insert: {
          consultation_count?: number | null
          features?: Json | null
          id?: string
          includes_doc_review?: boolean | null
          includes_followup?: boolean | null
          includes_mock_interview?: boolean | null
          is_active?: boolean | null
          name: string
          package_key: string
          price_usd: number
          sort_order?: number | null
          stripe_price_id?: string | null
          tagline?: string | null
          validity_days?: number | null
        }
        Update: {
          consultation_count?: number | null
          features?: Json | null
          id?: string
          includes_doc_review?: boolean | null
          includes_followup?: boolean | null
          includes_mock_interview?: boolean | null
          is_active?: boolean | null
          name?: string
          package_key?: string
          price_usd?: number
          sort_order?: number | null
          stripe_price_id?: string | null
          tagline?: string | null
          validity_days?: number | null
        }
        Relationships: []
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
      discovery_preferences: {
        Row: {
          auto_accept_connections: boolean | null
          created_at: string | null
          id: string
          share_current_location: boolean | null
          share_past_trips: boolean | null
          share_upcoming_trips: boolean | null
          show_in_global_directory: boolean | null
          show_in_nearby: boolean | null
          updated_at: string | null
          user_id: string
          who_can_invite_to_trips: string | null
          who_can_message: string | null
          who_can_see_profile: string | null
        }
        Insert: {
          auto_accept_connections?: boolean | null
          created_at?: string | null
          id?: string
          share_current_location?: boolean | null
          share_past_trips?: boolean | null
          share_upcoming_trips?: boolean | null
          show_in_global_directory?: boolean | null
          show_in_nearby?: boolean | null
          updated_at?: string | null
          user_id: string
          who_can_invite_to_trips?: string | null
          who_can_message?: string | null
          who_can_see_profile?: string | null
        }
        Update: {
          auto_accept_connections?: boolean | null
          created_at?: string | null
          id?: string
          share_current_location?: boolean | null
          share_past_trips?: boolean | null
          share_upcoming_trips?: boolean | null
          show_in_global_directory?: boolean | null
          show_in_nearby?: boolean | null
          updated_at?: string | null
          user_id?: string
          who_can_invite_to_trips?: string | null
          who_can_message?: string | null
          who_can_see_profile?: string | null
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
        Relationships: []
      }
      email_templates: {
        Row: {
          content: string
          created_at: string
          id: string
          is_active: boolean | null
          name: string
          subject: string
          template_type: string | null
          updated_at: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          is_active?: boolean | null
          name: string
          subject: string
          template_type?: string | null
          updated_at?: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          is_active?: boolean | null
          name?: string
          subject?: string
          template_type?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      email_tracking: {
        Row: {
          campaign_send_id: string | null
          clicked_at: string | null
          created_at: string
          email_template_id: string | null
          id: string
          lead_id: string | null
          opened_at: string | null
          replied_at: string | null
          tracking_pixel_url: string | null
        }
        Insert: {
          campaign_send_id?: string | null
          clicked_at?: string | null
          created_at?: string
          email_template_id?: string | null
          id?: string
          lead_id?: string | null
          opened_at?: string | null
          replied_at?: string | null
          tracking_pixel_url?: string | null
        }
        Update: {
          campaign_send_id?: string | null
          clicked_at?: string | null
          created_at?: string
          email_template_id?: string | null
          id?: string
          lead_id?: string | null
          opened_at?: string | null
          replied_at?: string | null
          tracking_pixel_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "email_tracking_campaign_send_id_fkey"
            columns: ["campaign_send_id"]
            isOneToOne: false
            referencedRelation: "campaign_sends"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "email_tracking_email_template_id_fkey"
            columns: ["email_template_id"]
            isOneToOne: false
            referencedRelation: "email_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      flight_bookings: {
        Row: {
          airline_code: string | null
          booking_date: string
          booking_reference: string
          booking_status: string
          conversation_id: string | null
          created_at: string
          currency: string
          departure_date: string
          destination_airport: string
          flight_data: Json
          flight_numbers: string[] | null
          id: string
          origin_airport: string
          passenger_count: number
          pnr_code: string | null
          return_date: string | null
          square_order_id: string | null
          total_amount: number
          updated_at: string
          user_id: string | null
        }
        Insert: {
          airline_code?: string | null
          booking_date?: string
          booking_reference: string
          booking_status?: string
          conversation_id?: string | null
          created_at?: string
          currency?: string
          departure_date: string
          destination_airport: string
          flight_data: Json
          flight_numbers?: string[] | null
          id?: string
          origin_airport: string
          passenger_count?: number
          pnr_code?: string | null
          return_date?: string | null
          square_order_id?: string | null
          total_amount: number
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          airline_code?: string | null
          booking_date?: string
          booking_reference?: string
          booking_status?: string
          conversation_id?: string | null
          created_at?: string
          currency?: string
          departure_date?: string
          destination_airport?: string
          flight_data?: Json
          flight_numbers?: string[] | null
          id?: string
          origin_airport?: string
          passenger_count?: number
          pnr_code?: string | null
          return_date?: string | null
          square_order_id?: string | null
          total_amount?: number
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "flight_bookings_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "chat_conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      form_submission_rate_limit: {
        Row: {
          email: string
          first_submission_at: string | null
          id: string
          ip_address: string
          last_submission_at: string | null
          submission_count: number | null
        }
        Insert: {
          email: string
          first_submission_at?: string | null
          id?: string
          ip_address: string
          last_submission_at?: string | null
          submission_count?: number | null
        }
        Update: {
          email?: string
          first_submission_at?: string | null
          id?: string
          ip_address?: string
          last_submission_at?: string | null
          submission_count?: number | null
        }
        Relationships: []
      }
      form_submissions: {
        Row: {
          appointment_booked: boolean | null
          budget: string | null
          contacted_at: string | null
          created_at: string | null
          departure_date: string | null
          destination: string | null
          duration: string | null
          email: string
          form_type: string
          id: string
          internal_notes: string | null
          ip_address: string | null
          last_follow_up: string | null
          lead_status: string | null
          lead_tags: string[] | null
          name: string
          nationality: string | null
          other_needs: string | null
          phone: string
          referral_source: string | null
          referrer: string | null
          return_date: string | null
          sales_value: number | null
          selected_packages: string[] | null
          special_requests: string | null
          travel_date: string | null
          travel_needs: string[] | null
          travel_purpose: string | null
          travelers: string | null
          updated_at: string | null
          user_agent: string | null
          user_id: string | null
          visa_type: string | null
        }
        Insert: {
          appointment_booked?: boolean | null
          budget?: string | null
          contacted_at?: string | null
          created_at?: string | null
          departure_date?: string | null
          destination?: string | null
          duration?: string | null
          email: string
          form_type: string
          id?: string
          internal_notes?: string | null
          ip_address?: string | null
          last_follow_up?: string | null
          lead_status?: string | null
          lead_tags?: string[] | null
          name: string
          nationality?: string | null
          other_needs?: string | null
          phone: string
          referral_source?: string | null
          referrer?: string | null
          return_date?: string | null
          sales_value?: number | null
          selected_packages?: string[] | null
          special_requests?: string | null
          travel_date?: string | null
          travel_needs?: string[] | null
          travel_purpose?: string | null
          travelers?: string | null
          updated_at?: string | null
          user_agent?: string | null
          user_id?: string | null
          visa_type?: string | null
        }
        Update: {
          appointment_booked?: boolean | null
          budget?: string | null
          contacted_at?: string | null
          created_at?: string | null
          departure_date?: string | null
          destination?: string | null
          duration?: string | null
          email?: string
          form_type?: string
          id?: string
          internal_notes?: string | null
          ip_address?: string | null
          last_follow_up?: string | null
          lead_status?: string | null
          lead_tags?: string[] | null
          name?: string
          nationality?: string | null
          other_needs?: string | null
          phone?: string
          referral_source?: string | null
          referrer?: string | null
          return_date?: string | null
          sales_value?: number | null
          selected_packages?: string[] | null
          special_requests?: string | null
          travel_date?: string | null
          travel_needs?: string[] | null
          travel_purpose?: string | null
          travelers?: string | null
          updated_at?: string | null
          user_agent?: string | null
          user_id?: string | null
          visa_type?: string | null
        }
        Relationships: []
      }
      globe_trip_stops: {
        Row: {
          arrive_date: string | null
          city_slug: string
          country: string
          country_slug: string
          created_at: string | null
          depart_date: string | null
          emoji: string | null
          id: string
          lat: number
          lng: number
          name: string
          position: number
          trip_id: string
          user_id: string
        }
        Insert: {
          arrive_date?: string | null
          city_slug: string
          country: string
          country_slug: string
          created_at?: string | null
          depart_date?: string | null
          emoji?: string | null
          id?: string
          lat: number
          lng: number
          name: string
          position?: number
          trip_id: string
          user_id: string
        }
        Update: {
          arrive_date?: string | null
          city_slug?: string
          country?: string
          country_slug?: string
          created_at?: string | null
          depart_date?: string | null
          emoji?: string | null
          id?: string
          lat?: number
          lng?: number
          name?: string
          position?: number
          trip_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "globe_trip_stops_trip_id_fkey"
            columns: ["trip_id"]
            isOneToOne: false
            referencedRelation: "globe_trips"
            referencedColumns: ["id"]
          },
        ]
      }
      globe_trips: {
        Row: {
          created_at: string | null
          id: string
          name: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          name?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      globe_user_profile: {
        Row: {
          home_city: string | null
          home_city_slug: string | null
          home_lat: number | null
          home_lng: number | null
          nationality: string | null
          passport_countries: string[] | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          home_city?: string | null
          home_city_slug?: string | null
          home_lat?: number | null
          home_lng?: number | null
          nationality?: string | null
          passport_countries?: string[] | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          home_city?: string | null
          home_city_slug?: string | null
          home_lat?: number | null
          home_lng?: number | null
          nationality?: string | null
          passport_countries?: string[] | null
          updated_at?: string | null
          user_id?: string
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
          name: string
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
          name?: string
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
          name?: string
          nationality?: string
          phone?: string
          visa_category?: string
        }
        Relationships: []
      }
      loyalty_program_catalog: {
        Row: {
          category: string
          company_name: string
          id: string
          is_active: boolean | null
          logo_url: string | null
          program_name: string
          sort_order: number | null
        }
        Insert: {
          category: string
          company_name: string
          id?: string
          is_active?: boolean | null
          logo_url?: string | null
          program_name: string
          sort_order?: number | null
        }
        Update: {
          category?: string
          company_name?: string
          id?: string
          is_active?: boolean | null
          logo_url?: string | null
          program_name?: string
          sort_order?: number | null
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
      membership_webhooks: {
        Row: {
          created_at: string | null
          event_type: string
          id: string
          processed: boolean | null
          user_id: string | null
          webhook_data: Json | null
        }
        Insert: {
          created_at?: string | null
          event_type: string
          id?: string
          processed?: boolean | null
          user_id?: string | null
          webhook_data?: Json | null
        }
        Update: {
          created_at?: string | null
          event_type?: string
          id?: string
          processed?: boolean | null
          user_id?: string | null
          webhook_data?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "membership_webhooks_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      ogt_orders: {
        Row: {
          addons: Json
          addons_total: number
          automation_processed: boolean
          completed_at: string | null
          confirmed_at: string | null
          created_at: string
          currency: string
          id: string
          membership_duration_days: number | null
          order_reference: string
          order_status: string
          payment_status: string
          plan_price: number
          plan_type: string
          square_order_id: string | null
          square_payment_id: string | null
          stripe_customer_id: string | null
          stripe_payment_intent_id: string | null
          stripe_session_id: string | null
          stripe_subscription_id: string | null
          total_amount: number
          trip_meta: Json
          updated_at: string
          upsell_converted: boolean | null
          upsell_from: string | null
          upsell_offered_at: string | null
          user_id: string | null
          webhook_sent: boolean
        }
        Insert: {
          addons?: Json
          addons_total?: number
          automation_processed?: boolean
          completed_at?: string | null
          confirmed_at?: string | null
          created_at?: string
          currency?: string
          id?: string
          membership_duration_days?: number | null
          order_reference?: string
          order_status?: string
          payment_status?: string
          plan_price: number
          plan_type: string
          square_order_id?: string | null
          square_payment_id?: string | null
          stripe_customer_id?: string | null
          stripe_payment_intent_id?: string | null
          stripe_session_id?: string | null
          stripe_subscription_id?: string | null
          total_amount: number
          trip_meta?: Json
          updated_at?: string
          upsell_converted?: boolean | null
          upsell_from?: string | null
          upsell_offered_at?: string | null
          user_id?: string | null
          webhook_sent?: boolean
        }
        Update: {
          addons?: Json
          addons_total?: number
          automation_processed?: boolean
          completed_at?: string | null
          confirmed_at?: string | null
          created_at?: string
          currency?: string
          id?: string
          membership_duration_days?: number | null
          order_reference?: string
          order_status?: string
          payment_status?: string
          plan_price?: number
          plan_type?: string
          square_order_id?: string | null
          square_payment_id?: string | null
          stripe_customer_id?: string | null
          stripe_payment_intent_id?: string | null
          stripe_session_id?: string | null
          stripe_subscription_id?: string | null
          total_amount?: number
          trip_meta?: Json
          updated_at?: string
          upsell_converted?: boolean | null
          upsell_from?: string | null
          upsell_offered_at?: string | null
          user_id?: string | null
          webhook_sent?: boolean
        }
        Relationships: []
      }
      otp_codes: {
        Row: {
          attempts: number
          code: string
          created_at: string
          expires_at: string
          id: string
          is_used: boolean
          max_attempts: number
          phone_number: string | null
          purpose: string
          user_email: string
          verification_method: string
          verified_at: string | null
        }
        Insert: {
          attempts?: number
          code: string
          created_at?: string
          expires_at?: string
          id?: string
          is_used?: boolean
          max_attempts?: number
          phone_number?: string | null
          purpose: string
          user_email: string
          verification_method: string
          verified_at?: string | null
        }
        Update: {
          attempts?: number
          code?: string
          created_at?: string
          expires_at?: string
          id?: string
          is_used?: boolean
          max_attempts?: number
          phone_number?: string | null
          purpose?: string
          user_email?: string
          verification_method?: string
          verified_at?: string | null
        }
        Relationships: []
      }
      personal_agents: {
        Row: {
          agent_name: string
          agent_personality: string | null
          avatar_color: string | null
          avatar_preset: string | null
          avatar_type: string | null
          avatar_url: string | null
          car_loyalty: Json | null
          companions: Json | null
          created_at: string | null
          currency_preference: string | null
          dream_destinations: string[] | null
          home_airport: string | null
          home_city: string | null
          home_country: string | null
          hotel_loyalty: Json | null
          id: string
          language: string | null
          last_interaction_at: string | null
          loyalty_programs: Json | null
          meal_preference: string | null
          nationality: string | null
          onboarding_completed: boolean | null
          onboarding_step: number | null
          passport_country: string | null
          passport_expiry: string | null
          passport_number: string | null
          preferred_airlines: string[] | null
          preferred_hotel_chains: string[] | null
          proactive_suggestions: boolean | null
          seat_preference: string | null
          total_interactions: number | null
          travel_style: string | null
          updated_at: string | null
          user_id: string | null
          visa_history: Json | null
          visited_countries: string[] | null
          voice_enabled: boolean | null
        }
        Insert: {
          agent_name?: string
          agent_personality?: string | null
          avatar_color?: string | null
          avatar_preset?: string | null
          avatar_type?: string | null
          avatar_url?: string | null
          car_loyalty?: Json | null
          companions?: Json | null
          created_at?: string | null
          currency_preference?: string | null
          dream_destinations?: string[] | null
          home_airport?: string | null
          home_city?: string | null
          home_country?: string | null
          hotel_loyalty?: Json | null
          id?: string
          language?: string | null
          last_interaction_at?: string | null
          loyalty_programs?: Json | null
          meal_preference?: string | null
          nationality?: string | null
          onboarding_completed?: boolean | null
          onboarding_step?: number | null
          passport_country?: string | null
          passport_expiry?: string | null
          passport_number?: string | null
          preferred_airlines?: string[] | null
          preferred_hotel_chains?: string[] | null
          proactive_suggestions?: boolean | null
          seat_preference?: string | null
          total_interactions?: number | null
          travel_style?: string | null
          updated_at?: string | null
          user_id?: string | null
          visa_history?: Json | null
          visited_countries?: string[] | null
          voice_enabled?: boolean | null
        }
        Update: {
          agent_name?: string
          agent_personality?: string | null
          avatar_color?: string | null
          avatar_preset?: string | null
          avatar_type?: string | null
          avatar_url?: string | null
          car_loyalty?: Json | null
          companions?: Json | null
          created_at?: string | null
          currency_preference?: string | null
          dream_destinations?: string[] | null
          home_airport?: string | null
          home_city?: string | null
          home_country?: string | null
          hotel_loyalty?: Json | null
          id?: string
          language?: string | null
          last_interaction_at?: string | null
          loyalty_programs?: Json | null
          meal_preference?: string | null
          nationality?: string | null
          onboarding_completed?: boolean | null
          onboarding_step?: number | null
          passport_country?: string | null
          passport_expiry?: string | null
          passport_number?: string | null
          preferred_airlines?: string[] | null
          preferred_hotel_chains?: string[] | null
          proactive_suggestions?: boolean | null
          seat_preference?: string | null
          total_interactions?: number | null
          travel_style?: string | null
          updated_at?: string | null
          user_id?: string | null
          visa_history?: Json | null
          visited_countries?: string[] | null
          voice_enabled?: boolean | null
        }
        Relationships: []
      }
      pricing_plans: {
        Row: {
          billing_cycle: string | null
          created_at: string | null
          features: Json | null
          id: string
          is_active: boolean | null
          is_hero: boolean | null
          name: string
          plan_key: string
          price_usd: number
          sort_order: number | null
          stripe_price_id: string | null
          tagline: string | null
        }
        Insert: {
          billing_cycle?: string | null
          created_at?: string | null
          features?: Json | null
          id?: string
          is_active?: boolean | null
          is_hero?: boolean | null
          name: string
          plan_key: string
          price_usd: number
          sort_order?: number | null
          stripe_price_id?: string | null
          tagline?: string | null
        }
        Update: {
          billing_cycle?: string | null
          created_at?: string | null
          features?: Json | null
          id?: string
          is_active?: boolean | null
          is_hero?: boolean | null
          name?: string
          plan_key?: string
          price_usd?: number
          sort_order?: number | null
          stripe_price_id?: string | null
          tagline?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string | null
          date_of_birth: string | null
          first_name: string | null
          id: string
          last_name: string | null
          membership_expiry: string | null
          nationality: string | null
          passport_expiry: string | null
          passport_number: string | null
          phone: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          date_of_birth?: string | null
          first_name?: string | null
          id: string
          last_name?: string | null
          membership_expiry?: string | null
          nationality?: string | null
          passport_expiry?: string | null
          passport_number?: string | null
          phone?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          date_of_birth?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          membership_expiry?: string | null
          nationality?: string | null
          passport_expiry?: string | null
          passport_number?: string | null
          phone?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      scoutpass_applications: {
        Row: {
          application_number: number
          appointment_center: string | null
          appointment_city: string | null
          appointment_date: string | null
          appointment_reference: string | null
          created_at: string | null
          decision: string | null
          decision_date: string | null
          documents_verified: boolean | null
          eligibility_confirmed: boolean | null
          forms_completed: boolean | null
          id: string
          notes: string | null
          order_id: string
          updated_at: string | null
          visa_validity_end: string | null
          visa_validity_start: string | null
        }
        Insert: {
          application_number?: number
          appointment_center?: string | null
          appointment_city?: string | null
          appointment_date?: string | null
          appointment_reference?: string | null
          created_at?: string | null
          decision?: string | null
          decision_date?: string | null
          documents_verified?: boolean | null
          eligibility_confirmed?: boolean | null
          forms_completed?: boolean | null
          id?: string
          notes?: string | null
          order_id: string
          updated_at?: string | null
          visa_validity_end?: string | null
          visa_validity_start?: string | null
        }
        Update: {
          application_number?: number
          appointment_center?: string | null
          appointment_city?: string | null
          appointment_date?: string | null
          appointment_reference?: string | null
          created_at?: string | null
          decision?: string | null
          decision_date?: string | null
          documents_verified?: boolean | null
          eligibility_confirmed?: boolean | null
          forms_completed?: boolean | null
          id?: string
          notes?: string | null
          order_id?: string
          updated_at?: string | null
          visa_validity_end?: string | null
          visa_validity_start?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "scoutpass_applications_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "scoutpass_orders"
            referencedColumns: ["id"]
          },
        ]
      }
      scoutpass_comms_log: {
        Row: {
          channel: string
          error_message: string | null
          id: string
          order_id: string | null
          provider_message_id: string | null
          recipient: string
          sent_at: string | null
          status: string
          type: string
        }
        Insert: {
          channel: string
          error_message?: string | null
          id?: string
          order_id?: string | null
          provider_message_id?: string | null
          recipient: string
          sent_at?: string | null
          status?: string
          type: string
        }
        Update: {
          channel?: string
          error_message?: string | null
          id?: string
          order_id?: string | null
          provider_message_id?: string | null
          recipient?: string
          sent_at?: string | null
          status?: string
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "scoutpass_comms_log_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "scoutpass_orders"
            referencedColumns: ["id"]
          },
        ]
      }
      scoutpass_group_members: {
        Row: {
          created_at: string | null
          date_of_birth: string | null
          email: string | null
          first_name: string
          id: string
          last_name: string
          nationality: string | null
          order_id: string
          passport_expiry: string | null
          passport_number: string | null
          phone: string | null
          relationship: string | null
        }
        Insert: {
          created_at?: string | null
          date_of_birth?: string | null
          email?: string | null
          first_name: string
          id?: string
          last_name: string
          nationality?: string | null
          order_id: string
          passport_expiry?: string | null
          passport_number?: string | null
          phone?: string | null
          relationship?: string | null
        }
        Update: {
          created_at?: string | null
          date_of_birth?: string | null
          email?: string | null
          first_name?: string
          id?: string
          last_name?: string
          nationality?: string | null
          order_id?: string
          passport_expiry?: string | null
          passport_number?: string | null
          phone?: string | null
          relationship?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "scoutpass_group_members_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "scoutpass_orders"
            referencedColumns: ["id"]
          },
        ]
      }
      scoutpass_leads: {
        Row: {
          converted_to_order_id: string | null
          country_of_origin: string | null
          created_at: string | null
          destination_country: string | null
          eligibility_result: Json | null
          email: string
          id: string
          source: string | null
          travel_date: string | null
          visa_type: string | null
        }
        Insert: {
          converted_to_order_id?: string | null
          country_of_origin?: string | null
          created_at?: string | null
          destination_country?: string | null
          eligibility_result?: Json | null
          email: string
          id?: string
          source?: string | null
          travel_date?: string | null
          visa_type?: string | null
        }
        Update: {
          converted_to_order_id?: string | null
          country_of_origin?: string | null
          created_at?: string | null
          destination_country?: string | null
          eligibility_result?: Json | null
          email?: string
          id?: string
          source?: string | null
          travel_date?: string | null
          visa_type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "scoutpass_leads_converted_to_order_id_fkey"
            columns: ["converted_to_order_id"]
            isOneToOne: false
            referencedRelation: "scoutpass_orders"
            referencedColumns: ["id"]
          },
        ]
      }
      scoutpass_orders: {
        Row: {
          agent_assigned: string | null
          agent_notes: string | null
          application_prepared_at: string | null
          appointment_attended_at: string | null
          appointment_secured_at: string | null
          awaiting_decision_at: string | null
          closed_at: string | null
          created_at: string | null
          date_of_birth: string | null
          decision_received_at: string | null
          destination_country: string
          documents_metadata: Json | null
          email: string
          first_name: string
          id: string
          info_received_at: string | null
          is_group: boolean | null
          last_name: string
          locale: string
          nationality: string | null
          paid_at: string | null
          passport_expiry: string | null
          passport_issuing_country: string | null
          passport_number: string | null
          passport_returned_at: string | null
          phone: string | null
          preferred_cities: string[] | null
          status: Database["public"]["Enums"]["order_status"]
          stripe_customer_id: string | null
          stripe_payment_intent_id: string | null
          stripe_session_id: string | null
          tracking_number: string | null
          travel_date_from: string | null
          travel_date_to: string | null
          travel_purpose: string | null
          updated_at: string | null
          visa_type: string
          whatsapp: string | null
        }
        Insert: {
          agent_assigned?: string | null
          agent_notes?: string | null
          application_prepared_at?: string | null
          appointment_attended_at?: string | null
          appointment_secured_at?: string | null
          awaiting_decision_at?: string | null
          closed_at?: string | null
          created_at?: string | null
          date_of_birth?: string | null
          decision_received_at?: string | null
          destination_country: string
          documents_metadata?: Json | null
          email: string
          first_name: string
          id?: string
          info_received_at?: string | null
          is_group?: boolean | null
          last_name: string
          locale?: string
          nationality?: string | null
          paid_at?: string | null
          passport_expiry?: string | null
          passport_issuing_country?: string | null
          passport_number?: string | null
          passport_returned_at?: string | null
          phone?: string | null
          preferred_cities?: string[] | null
          status?: Database["public"]["Enums"]["order_status"]
          stripe_customer_id?: string | null
          stripe_payment_intent_id?: string | null
          stripe_session_id?: string | null
          tracking_number?: string | null
          travel_date_from?: string | null
          travel_date_to?: string | null
          travel_purpose?: string | null
          updated_at?: string | null
          visa_type: string
          whatsapp?: string | null
        }
        Update: {
          agent_assigned?: string | null
          agent_notes?: string | null
          application_prepared_at?: string | null
          appointment_attended_at?: string | null
          appointment_secured_at?: string | null
          awaiting_decision_at?: string | null
          closed_at?: string | null
          created_at?: string | null
          date_of_birth?: string | null
          decision_received_at?: string | null
          destination_country?: string
          documents_metadata?: Json | null
          email?: string
          first_name?: string
          id?: string
          info_received_at?: string | null
          is_group?: boolean | null
          last_name?: string
          locale?: string
          nationality?: string | null
          paid_at?: string | null
          passport_expiry?: string | null
          passport_issuing_country?: string | null
          passport_number?: string | null
          passport_returned_at?: string | null
          phone?: string | null
          preferred_cities?: string[] | null
          status?: Database["public"]["Enums"]["order_status"]
          stripe_customer_id?: string | null
          stripe_payment_intent_id?: string | null
          stripe_session_id?: string | null
          tracking_number?: string | null
          travel_date_from?: string | null
          travel_date_to?: string | null
          travel_purpose?: string | null
          updated_at?: string | null
          visa_type?: string
          whatsapp?: string | null
        }
        Relationships: []
      }
      scoutpass_refund_requests: {
        Row: {
          cities_expanded: boolean | null
          created_at: string | null
          expanded_cities: string[] | null
          id: string
          order_id: string
          reason: string | null
          requested_at: string | null
          resolution_notes: string | null
          resolved_at: string | null
          resolved_by: string | null
          status: string
          stripe_refund_id: string | null
          updated_at: string | null
        }
        Insert: {
          cities_expanded?: boolean | null
          created_at?: string | null
          expanded_cities?: string[] | null
          id?: string
          order_id: string
          reason?: string | null
          requested_at?: string | null
          resolution_notes?: string | null
          resolved_at?: string | null
          resolved_by?: string | null
          status?: string
          stripe_refund_id?: string | null
          updated_at?: string | null
        }
        Update: {
          cities_expanded?: boolean | null
          created_at?: string | null
          expanded_cities?: string[] | null
          id?: string
          order_id?: string
          reason?: string | null
          requested_at?: string | null
          resolution_notes?: string | null
          resolved_at?: string | null
          resolved_by?: string | null
          status?: string
          stripe_refund_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "scoutpass_refund_requests_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "scoutpass_orders"
            referencedColumns: ["id"]
          },
        ]
      }
      short_visas_leads: {
        Row: {
          created_at: string
          departure_city: string
          destination_country: string
          email: string
          id: string
          name: string
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
          name?: string
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
          name?: string
          nationality?: string
          phone?: string
          purpose?: string
        }
        Relationships: []
      }
      square_webhooks: {
        Row: {
          created_at: string
          event_data: Json
          event_type: string
          id: string
          processed: boolean | null
          processed_at: string | null
          webhook_id: string
        }
        Insert: {
          created_at?: string
          event_data: Json
          event_type: string
          id?: string
          processed?: boolean | null
          processed_at?: string | null
          webhook_id: string
        }
        Update: {
          created_at?: string
          event_data?: Json
          event_type?: string
          id?: string
          processed?: boolean | null
          processed_at?: string | null
          webhook_id?: string
        }
        Relationships: []
      }
      staff_agents: {
        Row: {
          calendly_link: string | null
          created_at: string | null
          email: string
          full_name: string
          hired_at: string | null
          id: string
          is_active: boolean | null
          languages: string[] | null
          max_daily_consultations: number | null
          phone: string | null
          role: string | null
          specializations: string[] | null
          user_id: string | null
          zoom_personal_link: string | null
        }
        Insert: {
          calendly_link?: string | null
          created_at?: string | null
          email: string
          full_name: string
          hired_at?: string | null
          id?: string
          is_active?: boolean | null
          languages?: string[] | null
          max_daily_consultations?: number | null
          phone?: string | null
          role?: string | null
          specializations?: string[] | null
          user_id?: string | null
          zoom_personal_link?: string | null
        }
        Update: {
          calendly_link?: string | null
          created_at?: string | null
          email?: string
          full_name?: string
          hired_at?: string | null
          id?: string
          is_active?: boolean | null
          languages?: string[] | null
          max_daily_consultations?: number | null
          phone?: string | null
          role?: string | null
          specializations?: string[] | null
          user_id?: string | null
          zoom_personal_link?: string | null
        }
        Relationships: []
      }
      stripe_customers: {
        Row: {
          created_at: string | null
          current_period_end: string | null
          current_period_start: string | null
          id: string
          plan_type: string | null
          stripe_customer_id: string
          stripe_subscription_id: string | null
          subscription_status: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          current_period_end?: string | null
          current_period_start?: string | null
          id?: string
          plan_type?: string | null
          stripe_customer_id: string
          stripe_subscription_id?: string | null
          subscription_status?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          current_period_end?: string | null
          current_period_start?: string | null
          id?: string
          plan_type?: string | null
          stripe_customer_id?: string
          stripe_subscription_id?: string | null
          subscription_status?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      stripe_webhooks: {
        Row: {
          created_at: string | null
          error_message: string | null
          event_data: Json
          event_type: string
          id: string
          processed: boolean | null
          processed_at: string | null
          stripe_event_id: string
        }
        Insert: {
          created_at?: string | null
          error_message?: string | null
          event_data: Json
          event_type: string
          id?: string
          processed?: boolean | null
          processed_at?: string | null
          stripe_event_id: string
        }
        Update: {
          created_at?: string | null
          error_message?: string | null
          event_data?: Json
          event_type?: string
          id?: string
          processed?: boolean | null
          processed_at?: string | null
          stripe_event_id?: string
        }
        Relationships: []
      }
      travel_agents: {
        Row: {
          avatar_url: string | null
          budget_preference: string | null
          created_at: string | null
          custom_instructions: string | null
          favorite_destinations: string[] | null
          id: string
          is_active: boolean | null
          languages: string[] | null
          name: string
          personality: string
          specialties: string[] | null
          travel_style: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          budget_preference?: string | null
          created_at?: string | null
          custom_instructions?: string | null
          favorite_destinations?: string[] | null
          id?: string
          is_active?: boolean | null
          languages?: string[] | null
          name: string
          personality?: string
          specialties?: string[] | null
          travel_style?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          budget_preference?: string | null
          created_at?: string | null
          custom_instructions?: string | null
          favorite_destinations?: string[] | null
          id?: string
          is_active?: boolean | null
          languages?: string[] | null
          name?: string
          personality?: string
          specialties?: string[] | null
          travel_style?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      traveler_messages: {
        Row: {
          created_at: string | null
          id: string
          message_text: string
          read: boolean | null
          read_at: string | null
          receiver_id: string
          related_trip_id: string | null
          sender_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          message_text: string
          read?: boolean | null
          read_at?: string | null
          receiver_id: string
          related_trip_id?: string | null
          sender_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          message_text?: string
          read?: boolean | null
          read_at?: string | null
          receiver_id?: string
          related_trip_id?: string | null
          sender_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "traveler_messages_related_trip_id_fkey"
            columns: ["related_trip_id"]
            isOneToOne: false
            referencedRelation: "trips"
            referencedColumns: ["id"]
          },
        ]
      }
      trip_activities: {
        Row: {
          booking_reference: string | null
          created_at: string
          end_time: string | null
          id: string
          location: string | null
          notes: string | null
          order_index: number | null
          price_amount: number | null
          price_currency: string | null
          start_time: string | null
          title: string
          trip_day_id: string
          type: string
        }
        Insert: {
          booking_reference?: string | null
          created_at?: string
          end_time?: string | null
          id?: string
          location?: string | null
          notes?: string | null
          order_index?: number | null
          price_amount?: number | null
          price_currency?: string | null
          start_time?: string | null
          title: string
          trip_day_id: string
          type: string
        }
        Update: {
          booking_reference?: string | null
          created_at?: string
          end_time?: string | null
          id?: string
          location?: string | null
          notes?: string | null
          order_index?: number | null
          price_amount?: number | null
          price_currency?: string | null
          start_time?: string | null
          title?: string
          trip_day_id?: string
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "trip_activities_trip_day_id_fkey"
            columns: ["trip_day_id"]
            isOneToOne: false
            referencedRelation: "trip_days"
            referencedColumns: ["id"]
          },
        ]
      }
      trip_collaborators: {
        Row: {
          can_edit: boolean | null
          can_invite_others: boolean | null
          created_at: string | null
          id: string
          invitation_status:
            | Database["public"]["Enums"]["invitation_status"]
            | null
          invited_by: string | null
          joined_at: string | null
          role: Database["public"]["Enums"]["trip_collab_role"] | null
          trip_id: string
          user_id: string
        }
        Insert: {
          can_edit?: boolean | null
          can_invite_others?: boolean | null
          created_at?: string | null
          id?: string
          invitation_status?:
            | Database["public"]["Enums"]["invitation_status"]
            | null
          invited_by?: string | null
          joined_at?: string | null
          role?: Database["public"]["Enums"]["trip_collab_role"] | null
          trip_id: string
          user_id: string
        }
        Update: {
          can_edit?: boolean | null
          can_invite_others?: boolean | null
          created_at?: string | null
          id?: string
          invitation_status?:
            | Database["public"]["Enums"]["invitation_status"]
            | null
          invited_by?: string | null
          joined_at?: string | null
          role?: Database["public"]["Enums"]["trip_collab_role"] | null
          trip_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "trip_collaborators_trip_id_fkey"
            columns: ["trip_id"]
            isOneToOne: false
            referencedRelation: "trips"
            referencedColumns: ["id"]
          },
        ]
      }
      trip_contexts: {
        Row: {
          budget_range: string | null
          created_at: string
          date_window: Json | null
          destinations: string[]
          id: string
          notes: string | null
          party_size: number | null
          saved_quotes: Json | null
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          budget_range?: string | null
          created_at?: string
          date_window?: Json | null
          destinations?: string[]
          id?: string
          notes?: string | null
          party_size?: number | null
          saved_quotes?: Json | null
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          budget_range?: string | null
          created_at?: string
          date_window?: Json | null
          destinations?: string[]
          id?: string
          notes?: string | null
          party_size?: number | null
          saved_quotes?: Json | null
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      trip_days: {
        Row: {
          created_at: string
          date: string
          day_number: number
          id: string
          notes: string | null
          trip_id: string
        }
        Insert: {
          created_at?: string
          date: string
          day_number: number
          id?: string
          notes?: string | null
          trip_id: string
        }
        Update: {
          created_at?: string
          date?: string
          day_number?: number
          id?: string
          notes?: string | null
          trip_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "trip_days_trip_id_fkey"
            columns: ["trip_id"]
            isOneToOne: false
            referencedRelation: "trips"
            referencedColumns: ["id"]
          },
        ]
      }
      trips: {
        Row: {
          budget_amount: number | null
          budget_currency: string | null
          created_at: string
          destination: string
          end_date: string
          id: string
          notes: string | null
          start_date: string
          status: string | null
          travelers_count: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          budget_amount?: number | null
          budget_currency?: string | null
          created_at?: string
          destination: string
          end_date: string
          id?: string
          notes?: string | null
          start_date: string
          status?: string | null
          travelers_count?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          budget_amount?: number | null
          budget_currency?: string | null
          created_at?: string
          destination?: string
          end_date?: string
          id?: string
          notes?: string | null
          start_date?: string
          status?: string | null
          travelers_count?: number | null
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
          created_at: string | null
          email: string
          id: string
          ip_address: string | null
          is_online: boolean | null
          last_seen: string | null
          location_data: Json | null
          page_visited: string
          referrer_source: string | null
          session_duration: number | null
          session_id: string | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          action_data?: Json | null
          action_type?: string | null
          city?: string | null
          country?: string | null
          created_at?: string | null
          email: string
          id?: string
          ip_address?: string | null
          is_online?: boolean | null
          last_seen?: string | null
          location_data?: Json | null
          page_visited: string
          referrer_source?: string | null
          session_duration?: number | null
          session_id?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          action_data?: Json | null
          action_type?: string | null
          city?: string | null
          country?: string | null
          created_at?: string | null
          email?: string
          id?: string
          ip_address?: string | null
          is_online?: boolean | null
          last_seen?: string | null
          location_data?: Json | null
          page_visited?: string
          referrer_source?: string | null
          session_duration?: number | null
          session_id?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      user_agents: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          id: string
          name: string
          preferences: Json
          updated_at: string | null
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          id?: string
          name: string
          preferences?: Json
          updated_at?: string | null
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          id?: string
          name?: string
          preferences?: Json
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_connections: {
        Row: {
          addressee_id: string
          connection_type: Database["public"]["Enums"]["connection_type"] | null
          created_at: string | null
          id: string
          requester_id: string
          status: Database["public"]["Enums"]["connection_status"]
          updated_at: string | null
        }
        Insert: {
          addressee_id: string
          connection_type?:
            | Database["public"]["Enums"]["connection_type"]
            | null
          created_at?: string | null
          id?: string
          requester_id: string
          status?: Database["public"]["Enums"]["connection_status"]
          updated_at?: string | null
        }
        Update: {
          addressee_id?: string
          connection_type?:
            | Database["public"]["Enums"]["connection_type"]
            | null
          created_at?: string | null
          id?: string
          requester_id?: string
          status?: Database["public"]["Enums"]["connection_status"]
          updated_at?: string | null
        }
        Relationships: []
      }
      user_documents: {
        Row: {
          blockchain_key_id: string | null
          document_type: string | null
          encryption_method: string | null
          file_name: string
          file_path: string
          file_size: number | null
          id: string
          is_encrypted: boolean | null
          mime_type: string | null
          updated_at: string
          uploaded_at: string
          user_id: string
        }
        Insert: {
          blockchain_key_id?: string | null
          document_type?: string | null
          encryption_method?: string | null
          file_name: string
          file_path: string
          file_size?: number | null
          id?: string
          is_encrypted?: boolean | null
          mime_type?: string | null
          updated_at?: string
          uploaded_at?: string
          user_id: string
        }
        Update: {
          blockchain_key_id?: string | null
          document_type?: string | null
          encryption_method?: string | null
          file_name?: string
          file_path?: string
          file_size?: number | null
          id?: string
          is_encrypted?: boolean | null
          mime_type?: string | null
          updated_at?: string
          uploaded_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_documents_blockchain_key_id_fkey"
            columns: ["blockchain_key_id"]
            isOneToOne: false
            referencedRelation: "blockchain_keys"
            referencedColumns: ["id"]
          },
        ]
      }
      user_location_history: {
        Row: {
          accuracy_radius_km: number | null
          expires_at: string | null
          id: string
          is_traveling: boolean | null
          location: Json
          recorded_at: string | null
          related_trip_id: string | null
          user_id: string
        }
        Insert: {
          accuracy_radius_km?: number | null
          expires_at?: string | null
          id?: string
          is_traveling?: boolean | null
          location: Json
          recorded_at?: string | null
          related_trip_id?: string | null
          user_id: string
        }
        Update: {
          accuracy_radius_km?: number | null
          expires_at?: string | null
          id?: string
          is_traveling?: boolean | null
          location?: Json
          recorded_at?: string | null
          related_trip_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_location_history_related_trip_id_fkey"
            columns: ["related_trip_id"]
            isOneToOne: false
            referencedRelation: "trips"
            referencedColumns: ["id"]
          },
        ]
      }
      user_preferences: {
        Row: {
          ai_agent_accessibility_needs: string[] | null
          ai_agent_airline_accounts: Json | null
          ai_agent_dietary_preferences: string[] | null
          ai_agent_dream_destinations: string[] | null
          ai_agent_name: string | null
          ai_agent_personality_traits: Json | null
          ai_agent_setup_completed: boolean | null
          ai_agent_travel_style: string | null
          ai_agent_visa_assistance: boolean | null
          budget_band: string | null
          created_at: string
          emergency_contacts: Json | null
          home_airports: string[] | null
          id: string
          loyalty_ids: Json | null
          notification_settings: Json | null
          passports: string[] | null
          preference_vector: Json | null
          privacy_settings: Json | null
          tracking_opt_in: boolean | null
          travel_preferences: Json | null
          updated_at: string
          user_id: string
          voice_opt_in: boolean | null
        }
        Insert: {
          ai_agent_accessibility_needs?: string[] | null
          ai_agent_airline_accounts?: Json | null
          ai_agent_dietary_preferences?: string[] | null
          ai_agent_dream_destinations?: string[] | null
          ai_agent_name?: string | null
          ai_agent_personality_traits?: Json | null
          ai_agent_setup_completed?: boolean | null
          ai_agent_travel_style?: string | null
          ai_agent_visa_assistance?: boolean | null
          budget_band?: string | null
          created_at?: string
          emergency_contacts?: Json | null
          home_airports?: string[] | null
          id?: string
          loyalty_ids?: Json | null
          notification_settings?: Json | null
          passports?: string[] | null
          preference_vector?: Json | null
          privacy_settings?: Json | null
          tracking_opt_in?: boolean | null
          travel_preferences?: Json | null
          updated_at?: string
          user_id: string
          voice_opt_in?: boolean | null
        }
        Update: {
          ai_agent_accessibility_needs?: string[] | null
          ai_agent_airline_accounts?: Json | null
          ai_agent_dietary_preferences?: string[] | null
          ai_agent_dream_destinations?: string[] | null
          ai_agent_name?: string | null
          ai_agent_personality_traits?: Json | null
          ai_agent_setup_completed?: boolean | null
          ai_agent_travel_style?: string | null
          ai_agent_visa_assistance?: boolean | null
          budget_band?: string | null
          created_at?: string
          emergency_contacts?: Json | null
          home_airports?: string[] | null
          id?: string
          loyalty_ids?: Json | null
          notification_settings?: Json | null
          passports?: string[] | null
          preference_vector?: Json | null
          privacy_settings?: Json | null
          tracking_opt_in?: boolean | null
          travel_preferences?: Json | null
          updated_at?: string
          user_id?: string
          voice_opt_in?: boolean | null
        }
        Relationships: []
      }
      user_profiles_public: {
        Row: {
          age_range: string | null
          avatar_url: string | null
          bio: string | null
          created_at: string | null
          current_location: Json | null
          display_name: string
          gender: string | null
          home_city: string | null
          home_country: string | null
          id: string
          is_discoverable: boolean | null
          languages_spoken: string[] | null
          last_active_at: string | null
          location_sharing_enabled: boolean | null
          profile_completion_percentage: number | null
          travel_interests: string[] | null
          updated_at: string | null
          user_id: string
          verified: boolean | null
        }
        Insert: {
          age_range?: string | null
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          current_location?: Json | null
          display_name: string
          gender?: string | null
          home_city?: string | null
          home_country?: string | null
          id?: string
          is_discoverable?: boolean | null
          languages_spoken?: string[] | null
          last_active_at?: string | null
          location_sharing_enabled?: boolean | null
          profile_completion_percentage?: number | null
          travel_interests?: string[] | null
          updated_at?: string | null
          user_id: string
          verified?: boolean | null
        }
        Update: {
          age_range?: string | null
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          current_location?: Json | null
          display_name?: string
          gender?: string | null
          home_city?: string | null
          home_country?: string | null
          id?: string
          is_discoverable?: boolean | null
          languages_spoken?: string[] | null
          last_active_at?: string | null
          location_sharing_enabled?: boolean | null
          profile_completion_percentage?: number | null
          travel_interests?: string[] | null
          updated_at?: string | null
          user_id?: string
          verified?: boolean | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_sessions: {
        Row: {
          created_at: string | null
          duration_seconds: number | null
          email: string
          ended_at: string | null
          id: string
          ip_address: string | null
          is_active: boolean | null
          last_activity: string | null
          location_data: Json | null
          pages_visited: number | null
          session_id: string
          started_at: string | null
          updated_at: string | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          duration_seconds?: number | null
          email: string
          ended_at?: string | null
          id?: string
          ip_address?: string | null
          is_active?: boolean | null
          last_activity?: string | null
          location_data?: Json | null
          pages_visited?: number | null
          session_id: string
          started_at?: string | null
          updated_at?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          duration_seconds?: number | null
          email?: string
          ended_at?: string | null
          id?: string
          ip_address?: string | null
          is_active?: boolean | null
          last_activity?: string | null
          location_data?: Json | null
          pages_visited?: number | null
          session_id?: string
          started_at?: string | null
          updated_at?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      user_travel_memory: {
        Row: {
          agent_name: string | null
          agent_personality: string | null
          budget_range: string | null
          created_at: string | null
          dream_destinations: string[] | null
          home_airport: string | null
          home_city: string | null
          id: string
          known_visa_needs: string[] | null
          languages: string[] | null
          last_active_at: string | null
          lifetime_value: number | null
          loyalty_programs: Json | null
          meal_preference: string | null
          nationality: string | null
          passport_country: string | null
          passport_expiry: string | null
          preferred_airlines: string[] | null
          preferred_hotel_chains: string[] | null
          prefers_voice: boolean | null
          seat_preference: string | null
          total_bookings: number | null
          total_conversations: number | null
          travel_companions: Json | null
          travel_style: string | null
          upcoming_trips: Json | null
          updated_at: string | null
          user_id: string | null
          visa_history: Json | null
          visited_countries: string[] | null
        }
        Insert: {
          agent_name?: string | null
          agent_personality?: string | null
          budget_range?: string | null
          created_at?: string | null
          dream_destinations?: string[] | null
          home_airport?: string | null
          home_city?: string | null
          id?: string
          known_visa_needs?: string[] | null
          languages?: string[] | null
          last_active_at?: string | null
          lifetime_value?: number | null
          loyalty_programs?: Json | null
          meal_preference?: string | null
          nationality?: string | null
          passport_country?: string | null
          passport_expiry?: string | null
          preferred_airlines?: string[] | null
          preferred_hotel_chains?: string[] | null
          prefers_voice?: boolean | null
          seat_preference?: string | null
          total_bookings?: number | null
          total_conversations?: number | null
          travel_companions?: Json | null
          travel_style?: string | null
          upcoming_trips?: Json | null
          updated_at?: string | null
          user_id?: string | null
          visa_history?: Json | null
          visited_countries?: string[] | null
        }
        Update: {
          agent_name?: string | null
          agent_personality?: string | null
          budget_range?: string | null
          created_at?: string | null
          dream_destinations?: string[] | null
          home_airport?: string | null
          home_city?: string | null
          id?: string
          known_visa_needs?: string[] | null
          languages?: string[] | null
          last_active_at?: string | null
          lifetime_value?: number | null
          loyalty_programs?: Json | null
          meal_preference?: string | null
          nationality?: string | null
          passport_country?: string | null
          passport_expiry?: string | null
          preferred_airlines?: string[] | null
          preferred_hotel_chains?: string[] | null
          prefers_voice?: boolean | null
          seat_preference?: string | null
          total_bookings?: number | null
          total_conversations?: number | null
          travel_companions?: Json | null
          travel_style?: string | null
          upcoming_trips?: Json | null
          updated_at?: string | null
          user_id?: string | null
          visa_history?: Json | null
          visited_countries?: string[] | null
        }
        Relationships: []
      }
      visa_applications: {
        Row: {
          application_data: Json | null
          application_number: number | null
          application_reference: string | null
          application_reference_new: string | null
          auto_saved_at: string | null
          country_code: string | null
          created_at: string | null
          departure_date: string | null
          email: string
          id: string
          is_draft: boolean | null
          last_updated: string | null
          name: string
          nationality: string
          progress_data: Json | null
          progress_step: number | null
          return_date: string | null
          status: string | null
          submitted_at: string | null
          total_travelers: number | null
          travel_purpose: string | null
          user_id: string | null
          visa_type: string
        }
        Insert: {
          application_data?: Json | null
          application_number?: number | null
          application_reference?: string | null
          application_reference_new?: string | null
          auto_saved_at?: string | null
          country_code?: string | null
          created_at?: string | null
          departure_date?: string | null
          email: string
          id?: string
          is_draft?: boolean | null
          last_updated?: string | null
          name: string
          nationality: string
          progress_data?: Json | null
          progress_step?: number | null
          return_date?: string | null
          status?: string | null
          submitted_at?: string | null
          total_travelers?: number | null
          travel_purpose?: string | null
          user_id?: string | null
          visa_type: string
        }
        Update: {
          application_data?: Json | null
          application_number?: number | null
          application_reference?: string | null
          application_reference_new?: string | null
          auto_saved_at?: string | null
          country_code?: string | null
          created_at?: string | null
          departure_date?: string | null
          email?: string
          id?: string
          is_draft?: boolean | null
          last_updated?: string | null
          name?: string
          nationality?: string
          progress_data?: Json | null
          progress_step?: number | null
          return_date?: string | null
          status?: string | null
          submitted_at?: string | null
          total_travelers?: number | null
          travel_purpose?: string | null
          user_id?: string | null
          visa_type?: string
        }
        Relationships: []
      }
      visa_destinations: {
        Row: {
          biometrics_required: boolean | null
          bls_available: boolean | null
          country_code: string
          country_name: string
          created_at: string | null
          flag_emoji: string | null
          govt_portal_url: string | null
          id: string
          interview_required: boolean | null
          is_active: boolean | null
          key_requirements: Json | null
          processing_times: Json | null
          sort_order: number | null
          vfs_available: boolean | null
          visa_types: Json | null
        }
        Insert: {
          biometrics_required?: boolean | null
          bls_available?: boolean | null
          country_code: string
          country_name: string
          created_at?: string | null
          flag_emoji?: string | null
          govt_portal_url?: string | null
          id?: string
          interview_required?: boolean | null
          is_active?: boolean | null
          key_requirements?: Json | null
          processing_times?: Json | null
          sort_order?: number | null
          vfs_available?: boolean | null
          visa_types?: Json | null
        }
        Update: {
          biometrics_required?: boolean | null
          bls_available?: boolean | null
          country_code?: string
          country_name?: string
          created_at?: string | null
          flag_emoji?: string | null
          govt_portal_url?: string | null
          id?: string
          interview_required?: boolean | null
          is_active?: boolean | null
          key_requirements?: Json | null
          processing_times?: Json | null
          sort_order?: number | null
          vfs_available?: boolean | null
          visa_types?: Json | null
        }
        Relationships: []
      }
      visa_screening_sessions: {
        Row: {
          ai_assessment: Json | null
          ai_chat_history: Json | null
          ai_recommendation: string | null
          completed_at: string | null
          created_at: string | null
          current_country: string | null
          destination_code: string
          documents_missing: Json | null
          documents_ready: Json | null
          id: string
          intended_return_date: string | null
          intended_travel_date: string | null
          nationality: string | null
          previous_refusals: boolean | null
          previous_travel_history: Json | null
          readiness_score: number | null
          refusal_details: string | null
          session_token: string | null
          status: string | null
          travel_purpose: string | null
          updated_at: string | null
          user_id: string | null
          visa_type: string | null
        }
        Insert: {
          ai_assessment?: Json | null
          ai_chat_history?: Json | null
          ai_recommendation?: string | null
          completed_at?: string | null
          created_at?: string | null
          current_country?: string | null
          destination_code: string
          documents_missing?: Json | null
          documents_ready?: Json | null
          id?: string
          intended_return_date?: string | null
          intended_travel_date?: string | null
          nationality?: string | null
          previous_refusals?: boolean | null
          previous_travel_history?: Json | null
          readiness_score?: number | null
          refusal_details?: string | null
          session_token?: string | null
          status?: string | null
          travel_purpose?: string | null
          updated_at?: string | null
          user_id?: string | null
          visa_type?: string | null
        }
        Update: {
          ai_assessment?: Json | null
          ai_chat_history?: Json | null
          ai_recommendation?: string | null
          completed_at?: string | null
          created_at?: string | null
          current_country?: string | null
          destination_code?: string
          documents_missing?: Json | null
          documents_ready?: Json | null
          id?: string
          intended_return_date?: string | null
          intended_travel_date?: string | null
          nationality?: string | null
          previous_refusals?: boolean | null
          previous_travel_history?: Json | null
          readiness_score?: number | null
          refusal_details?: string | null
          session_token?: string | null
          status?: string | null
          travel_purpose?: string | null
          updated_at?: string | null
          user_id?: string | null
          visa_type?: string | null
        }
        Relationships: []
      }
      voice_transcripts: {
        Row: {
          call_id: string
          conversation_id: string | null
          created_at: string
          duration_seconds: number | null
          ended_at: string | null
          entities: Json
          id: string
          summary: string | null
          turns: Json
          user_id: string
        }
        Insert: {
          call_id: string
          conversation_id?: string | null
          created_at?: string
          duration_seconds?: number | null
          ended_at?: string | null
          entities?: Json
          id?: string
          summary?: string | null
          turns?: Json
          user_id: string
        }
        Update: {
          call_id?: string
          conversation_id?: string | null
          created_at?: string
          duration_seconds?: number | null
          ended_at?: string | null
          entities?: Json
          id?: string
          summary?: string | null
          turns?: Json
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      admin_list_users: {
        Args: never
        Returns: {
          created_at: string
          email: string
          email_confirmed: boolean
          first_name: string
          id: string
          last_name: string
          last_sign_in_at: string
          nationality: string
          order_count: number
          phone: string
          providers: string[]
          request_count: number
          roles: string[]
        }[]
      }
      check_form_submission_rate_limit: {
        Args: {
          _email: string
          _ip_address: string
          _max_submissions?: number
          _time_window_minutes?: number
        }
        Returns: boolean
      }
      check_otp_rate_limit: {
        Args: {
          _email: string
          _max_codes?: number
          _time_window_minutes?: number
        }
        Returns: boolean
      }
      check_submission_rate_limit: {
        Args: {
          _email: string
          _ip_address: string
          _max_submissions?: number
          _time_window_minutes?: number
        }
        Returns: boolean
      }
      cleanup_expired_locations: { Args: never; Returns: undefined }
      cleanup_expired_otp_codes: { Args: never; Returns: undefined }
      generate_application_reference: {
        Args: { p_application_date?: string; p_country_code: string }
        Returns: string
      }
      generate_booking_reference: { Args: never; Returns: string }
      generate_otp_code: { Args: never; Returns: string }
      generate_traveler_reference: {
        Args: { p_base_reference: string; p_traveler_number: number }
        Returns: string
      }
      get_nearby_travelers: {
        Args: { radius_km?: number; user_lat: number; user_lng: number }
        Returns: {
          avatar_url: string
          bio: string
          current_location: Json
          display_name: string
          distance_km: number
          travel_interests: string[]
          upcoming_trips: Json
          user_id: string
        }[]
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_admin: { Args: never; Returns: boolean }
      is_passport_club_member: { Args: { user_id: string }; Returns: boolean }
      my_scoutpass_orders: {
        Args: never
        Returns: {
          appointment_secured_at: string
          created_at: string
          decision_received_at: string
          destination_country: string
          id: string
          paid_at: string
          status: string
          tracking_number: string
          visa_type: string
        }[]
      }
      scoutpass_is_admin: { Args: never; Returns: boolean }
      scoutpass_my_email: { Args: never; Returns: string }
      scoutpass_order_for_session: {
        Args: { p_session_id: string }
        Returns: string
      }
      scoutpass_request_refund: {
        Args: { p_reason: string; p_tracking: string }
        Returns: string
      }
      scoutpass_track: {
        Args: { p_tracking: string }
        Returns: {
          created_at: string
          destination_country: string
          first_name: string
          last_name: string
          status: string
          tracking_number: string
          travel_date_from: string
          travel_date_to: string
          visa_type: string
        }[]
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
      connection_status: "pending" | "accepted" | "blocked"
      connection_type: "friend" | "follow" | "travel_buddy"
      invitation_status: "pending" | "accepted" | "declined"
      order_status:
        | "pending_payment"
        | "paid"
        | "info_received"
        | "application_prepared"
        | "appointment_secured"
        | "appointment_attended"
        | "awaiting_decision"
        | "passport_returned"
        | "decision_received"
        | "closed"
        | "refund_requested"
        | "refunded"
      trip_collab_role: "owner" | "editor" | "viewer"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "moderator", "user"],
      connection_status: ["pending", "accepted", "blocked"],
      connection_type: ["friend", "follow", "travel_buddy"],
      invitation_status: ["pending", "accepted", "declined"],
      order_status: [
        "pending_payment",
        "paid",
        "info_received",
        "application_prepared",
        "appointment_secured",
        "appointment_attended",
        "awaiting_decision",
        "passport_returned",
        "decision_received",
        "closed",
        "refund_requested",
        "refunded",
      ],
      trip_collab_role: ["owner", "editor", "viewer"],
    },
  },
} as const
