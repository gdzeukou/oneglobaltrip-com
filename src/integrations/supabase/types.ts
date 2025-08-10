export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
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
          total_amount: number
          trip_meta: Json
          updated_at: string
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
          total_amount: number
          trip_meta?: Json
          updated_at?: string
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
          total_amount?: number
          trip_meta?: Json
          updated_at?: string
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
      generate_application_reference: {
        Args: { p_country_code: string; p_application_date?: string }
        Returns: string
      }
      generate_booking_reference: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      generate_otp_code: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      generate_traveler_reference: {
        Args: { p_base_reference: string; p_traveler_number: number }
        Returns: string
      }
      is_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      is_passport_club_member: {
        Args: { user_id: string }
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

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
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
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
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
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
