import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://rjzkkmqjwusmegznfkvp.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJqemtrbXFqd3VzbWVnem5ma3ZwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM5MjI4MDUsImV4cCI6MjA0OTQ5ODgwNX0.n06fy_YZrRTXBucnizrxPg__1dU2hXc'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
