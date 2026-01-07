// Simple DB helper using the global `supabaseClient` created in `supabase-config.js`.
// Keeps the app code clean and focused on UI.

async function fetchGifts() {
  // fetch all gifts; expected columns: id, title, reserved_by, (optional) description
  const { data, error } = await window.supabaseClient
    // use table name `gifts`
    .from('gifts')
    .select('*')
    .order('title', { ascending: true });
  if (error) {
    return [];
  }
  return data || [];
}

async function reserveGift(id, name) {
  const { error } = await window.supabaseClient
    // update reserved_by in the `gifts` table
    .from('gifts')
    .update({ reserved_by: name })
    .eq('id', id);
  if (error) return false;
  return !error;
}

async function unreserveGift(id) {
  const { error } = await window.supabaseClient
    // clear reserved_by in the `gifts` table
    .from('gifts')
    .update({ reserved_by: null })
    .eq('id', id);
  if (error) return false;
  return !error;
}

// expose helpers globally for the app script to call (keeps code simple)
window.db = { fetchGifts, reserveGift, unreserveGift };
