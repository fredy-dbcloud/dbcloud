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
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      ai_copilot_logs: {
        Row: {
          context: Json | null
          created_at: string
          id: string
          query: string
          response: string
        }
        Insert: {
          context?: Json | null
          created_at?: string
          id?: string
          query: string
          response: string
        }
        Update: {
          context?: Json | null
          created_at?: string
          id?: string
          query?: string
          response?: string
        }
        Relationships: []
      }
      chat_messages: {
        Row: {
          content: string
          created_at: string
          id: string
          lang: string
          metadata: Json | null
          role: string
          session_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          lang?: string
          metadata?: Json | null
          role: string
          session_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          lang?: string
          metadata?: Json | null
          role?: string
          session_id?: string
        }
        Relationships: []
      }
      client_health_predictions: {
        Row: {
          ai_reasoning: string | null
          churn_probability: number | null
          created_at: string
          email: string
          expansion_probability: number | null
          health_status: Database["public"]["Enums"]["ai_health_status"]
          id: string
          margin_risk_score: number | null
          signals: Json | null
          updated_at: string
        }
        Insert: {
          ai_reasoning?: string | null
          churn_probability?: number | null
          created_at?: string
          email: string
          expansion_probability?: number | null
          health_status?: Database["public"]["Enums"]["ai_health_status"]
          id?: string
          margin_risk_score?: number | null
          signals?: Json | null
          updated_at?: string
        }
        Update: {
          ai_reasoning?: string | null
          churn_probability?: number | null
          created_at?: string
          email?: string
          expansion_probability?: number | null
          health_status?: Database["public"]["Enums"]["ai_health_status"]
          id?: string
          margin_risk_score?: number | null
          signals?: Json | null
          updated_at?: string
        }
        Relationships: []
      }
      client_requests: {
        Row: {
          ai_classification:
            | Database["public"]["Enums"]["ai_request_classification"]
            | null
          ai_classified_at: string | null
          ai_effort_level: Database["public"]["Enums"]["ai_effort_level"] | null
          ai_estimated_hours: number | null
          ai_reasoning: string | null
          ai_risk_flags: Database["public"]["Enums"]["ai_risk_flag"][] | null
          created_at: string
          description: string
          email: string
          environment: string
          estimated_hours: number | null
          id: string
          lang: string
          plan: string
          priority: string
          request_type: string
          status: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          ai_classification?:
            | Database["public"]["Enums"]["ai_request_classification"]
            | null
          ai_classified_at?: string | null
          ai_effort_level?:
            | Database["public"]["Enums"]["ai_effort_level"]
            | null
          ai_estimated_hours?: number | null
          ai_reasoning?: string | null
          ai_risk_flags?: Database["public"]["Enums"]["ai_risk_flag"][] | null
          created_at?: string
          description: string
          email: string
          environment: string
          estimated_hours?: number | null
          id?: string
          lang?: string
          plan: string
          priority: string
          request_type: string
          status?: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          ai_classification?:
            | Database["public"]["Enums"]["ai_request_classification"]
            | null
          ai_classified_at?: string | null
          ai_effort_level?:
            | Database["public"]["Enums"]["ai_effort_level"]
            | null
          ai_estimated_hours?: number | null
          ai_reasoning?: string | null
          ai_risk_flags?: Database["public"]["Enums"]["ai_risk_flag"][] | null
          created_at?: string
          description?: string
          email?: string
          environment?: string
          estimated_hours?: number | null
          id?: string
          lang?: string
          plan?: string
          priority?: string
          request_type?: string
          status?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      client_summaries: {
        Row: {
          created_at: string
          email: string
          health_status: string
          hours_included: number
          hours_used: number
          id: string
          key_findings: string[] | null
          month: number
          plan: string
          recommendations: string[] | null
          requests_completed: number
          updated_at: string
          user_id: string | null
          year: number
        }
        Insert: {
          created_at?: string
          email: string
          health_status?: string
          hours_included: number
          hours_used?: number
          id?: string
          key_findings?: string[] | null
          month: number
          plan: string
          recommendations?: string[] | null
          requests_completed?: number
          updated_at?: string
          user_id?: string | null
          year: number
        }
        Update: {
          created_at?: string
          email?: string
          health_status?: string
          hours_included?: number
          hours_used?: number
          id?: string
          key_findings?: string[] | null
          month?: number
          plan?: string
          recommendations?: string[] | null
          requests_completed?: number
          updated_at?: string
          user_id?: string | null
          year?: number
        }
        Relationships: []
      }
      leads: {
        Row: {
          company: string | null
          created_at: string
          email: string
          id: string
          interest: string | null
          lang: string
          message: string | null
          name: string | null
          phone: string | null
          source: string
        }
        Insert: {
          company?: string | null
          created_at?: string
          email: string
          id?: string
          interest?: string | null
          lang?: string
          message?: string | null
          name?: string | null
          phone?: string | null
          source?: string
        }
        Update: {
          company?: string | null
          created_at?: string
          email?: string
          id?: string
          interest?: string | null
          lang?: string
          message?: string | null
          name?: string | null
          phone?: string | null
          source?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          company: string | null
          created_at: string
          full_name: string | null
          id: string
          plan: string | null
          updated_at: string
        }
        Insert: {
          company?: string | null
          created_at?: string
          full_name?: string | null
          id: string
          plan?: string | null
          updated_at?: string
        }
        Update: {
          company?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          plan?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      check_chat_rate_limit: {
        Args: { check_session: string }
        Returns: boolean
      }
      check_leads_rate_limit: {
        Args: { check_email: string }
        Returns: boolean
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      ai_effort_level: "low" | "medium" | "high"
      ai_health_status:
        | "healthy"
        | "at_risk"
        | "churn_risk"
        | "expansion_ready"
        | "margin_risk"
      ai_request_classification:
        | "advisory"
        | "execution"
        | "incident"
        | "out_of_scope"
      ai_risk_flag:
        | "scope_creep"
        | "potential_churn"
        | "upgrade_signal"
        | "margin_risk"
      app_role: "admin" | "moderator" | "user"
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
    Enums: {
      ai_effort_level: ["low", "medium", "high"],
      ai_health_status: [
        "healthy",
        "at_risk",
        "churn_risk",
        "expansion_ready",
        "margin_risk",
      ],
      ai_request_classification: [
        "advisory",
        "execution",
        "incident",
        "out_of_scope",
      ],
      ai_risk_flag: [
        "scope_creep",
        "potential_churn",
        "upgrade_signal",
        "margin_risk",
      ],
      app_role: ["admin", "moderator", "user"],
    },
  },
} as const
