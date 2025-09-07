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
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      farm_availability: {
        Row: {
          created_at: string
          date: string
          farm_id: string
          id: string
          is_available: boolean
        }
        Insert: {
          created_at?: string
          date: string
          farm_id: string
          id?: string
          is_available?: boolean
        }
        Update: {
          created_at?: string
          date?: string
          farm_id?: string
          id?: string
          is_available?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "farm_availability_farm_id_fkey"
            columns: ["farm_id"]
            isOneToOne: false
            referencedRelation: "farms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "farm_availability_farm_id_fkey"
            columns: ["farm_id"]
            isOneToOne: false
            referencedRelation: "farms_with_stats"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_farm_availability_farm_id"
            columns: ["farm_id"]
            isOneToOne: false
            referencedRelation: "farms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_farm_availability_farm_id"
            columns: ["farm_id"]
            isOneToOne: false
            referencedRelation: "farms_with_stats"
            referencedColumns: ["id"]
          },
        ]
      }
      farm_images: {
        Row: {
          created_at: string
          farm_id: string
          id: string
          image_url: string
          is_primary: boolean | null
        }
        Insert: {
          created_at?: string
          farm_id: string
          id?: string
          image_url: string
          is_primary?: boolean | null
        }
        Update: {
          created_at?: string
          farm_id?: string
          id?: string
          image_url?: string
          is_primary?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "farm_images_farm_id_fkey"
            columns: ["farm_id"]
            isOneToOne: false
            referencedRelation: "farms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "farm_images_farm_id_fkey"
            columns: ["farm_id"]
            isOneToOne: false
            referencedRelation: "farms_with_stats"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_farm_images_farm_id"
            columns: ["farm_id"]
            isOneToOne: false
            referencedRelation: "farms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_farm_images_farm_id"
            columns: ["farm_id"]
            isOneToOne: false
            referencedRelation: "farms_with_stats"
            referencedColumns: ["id"]
          },
        ]
      }
      farms: {
        Row: {
          bedrooms: number | null
          contact_email: string | null
          created_at: string
          description: string | null
          guests: number | null
          id: string
          location: string | null
          name: string
          owner_id: string
          price_per_night: number | null
          rating: number | null
          review_count: number | null
          updated_at: string
        }
        Insert: {
          bedrooms?: number | null
          contact_email?: string | null
          created_at?: string
          description?: string | null
          guests?: number | null
          id?: string
          location?: string | null
          name: string
          owner_id: string
          price_per_night?: number | null
          rating?: number | null
          review_count?: number | null
          updated_at?: string
        }
        Update: {
          bedrooms?: number | null
          contact_email?: string | null
          created_at?: string
          description?: string | null
          guests?: number | null
          id?: string
          location?: string | null
          name?: string
          owner_id?: string
          price_per_night?: number | null
          rating?: number | null
          review_count?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_farms_owner_id"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          email: string
          full_name: string | null
          id: string
          role: Database["public"]["Enums"]["user_role"]
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          full_name?: string | null
          id: string
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          full_name?: string | null
          id?: string
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      farms_with_stats: {
        Row: {
          available_days_ahead: number | null
          bedrooms: number | null
          contact_email: string | null
          created_at: string | null
          description: string | null
          guests: number | null
          id: string | null
          location: string | null
          name: string | null
          price_per_night: number | null
          primary_image_url: string | null
          rating: number | null
          review_count: number | null
          total_images: number | null
          updated_at: string | null
        }
        Insert: {
          available_days_ahead?: never
          bedrooms?: number | null
          contact_email?: string | null
          created_at?: string | null
          description?: string | null
          guests?: number | null
          id?: string | null
          location?: string | null
          name?: string | null
          price_per_night?: number | null
          primary_image_url?: never
          rating?: number | null
          review_count?: number | null
          total_images?: never
          updated_at?: string | null
        }
        Update: {
          available_days_ahead?: never
          bedrooms?: number | null
          contact_email?: string | null
          created_at?: string | null
          description?: string | null
          guests?: number | null
          id?: string | null
          location?: string | null
          name?: string | null
          price_per_night?: number | null
          primary_image_url?: never
          rating?: number | null
          review_count?: number | null
          total_images?: never
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      get_farm_primary_image: {
        Args: { farm_uuid: string }
        Returns: string
      }
      get_farm_stats: {
        Args: { farm_uuid: string }
        Returns: Json
      }
      is_admin: {
        Args: { user_id: string }
        Returns: boolean
      }
      is_farm_available: {
        Args: { end_date: string; farm_uuid: string; start_date: string }
        Returns: boolean
      }
    }
    Enums: {
      user_role: "admin" | "farm_owner"
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
      user_role: ["admin", "farm_owner"],
    },
  },
} as const
