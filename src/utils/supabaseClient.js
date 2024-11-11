import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ctihchjgasyhsyyjcmlj.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN0aWhjaGpnYXN5aHN5eWpjbWxqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzExOTE5NzYsImV4cCI6MjA0Njc2Nzk3Nn0.1HSjELuSS37fm5NgNjgiqaLj5Dw9IdWyYpOr1cvtWn4";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;