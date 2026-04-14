import { supabase } from '../supabase';

const POSTS_TABLE = 'posts';

export async function fetchPosts() {
  try {
    const { data, error } = await supabase
      .from(POSTS_TABLE)
      .select('*')
      .eq('status', 'published')
      .order('date', { ascending: false });
    
    if (error) throw error;
    
    return data || [];
  } catch (error) {
    console.error('Error fetching posts from Supabase:', error);
    throw error;
  }
}
