import { createClient } from '@supabase/supabase-js'

const URL = 'https://lovrigrpcsgyzrmwwzfq.supabase.co';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxvdnJpZ3JwY3NneXpybXd3emZxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQxNTY0ODksImV4cCI6MjAyOTczMjQ4OX0.UUjquWMobXIcAIH0tTeTJAPdcKySo0asAcP7qk9IvvI';

export const supabase = createClient(URL, API_KEY);