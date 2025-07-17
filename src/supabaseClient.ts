// src/supabaseClient.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://tuopivqtdgpriymxviao.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR1b3BpdnF0ZGdwcml5bXh2aWFvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI1NzgyNDIsImV4cCI6MjA2ODE1NDI0Mn0.lgJIwhtYwW3iPX0S0RlZNgkOnMt-0jupz0YhTl_420A'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)