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
          stripe_payment_id: string | null
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
          stripe_payment_id?: string | null
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
          stripe_payment_id?: string | null
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
          total_amount: number
          updated_at: string
          user_id: string
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
          total_amount: number
          updated_at?: string
          user_id: string
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
          total_amount?: number
          updated_at?: string
          user_id?: string
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
      profiles: {
        Row: {
          created_at: string | null
          date_of_birth: string | null
          first_name: string | null
          id: string
          last_name: string | null
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
          nationality?: string | null
          passport_expiry?: string | null
          passport_number?: string | null
          phone?: string | null
          updated_at?: string | null
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
          application_data: Json | null
          application_reference: string | null
          created_at: string | null
          departure_date: string | null
          email: string
          id: string
          last_updated: string | null
          name: string
          nationality: string
          return_date: string | null
          status: string | null
          submitted_at: string | null
          travel_purpose: string | null
          user_id: string | null
          visa_type: string
        }
        Insert: {
          application_data?: Json | null
          application_reference?: string | null
          created_at?: string | null
          departure_date?: string | null
          email: string
          id?: string
          last_updated?: string | null
          name: string
          nationality: string
          return_date?: string | null
          status?: string | null
          submitted_at?: string | null
          travel_purpose?: string | null
          user_id?: string | null
          visa_type: string
        }
        Update: {
          application_data?: Json | null
          application_reference?: string | null
          created_at?: string | null
          departure_date?: string | null
          email?: string
          id?: string
          last_updated?: string | null
          name?: string
          nationality?: string
          return_date?: string | null
          status?: string | null
          submitted_at?: string | null
          travel_purpose?: string | null
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
          _ip_address: string
          _email: string
          _max_submissions?: number
          _time_window_minutes?: number
        }
        Returns: boolean
      }
      cleanup_expired_otp_codes: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      generate_booking_reference: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      generate_otp_code: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      is_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
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
