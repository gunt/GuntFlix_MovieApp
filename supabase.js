const { createClient } = require('@supabase/supabase-js');

// Validate environment variables at startup
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error('Missing SUPABASE_URL or SUPABASE_KEY environment variables');
  process.exit(1);
}

// Disable realtime (realtime subscriptions not used — REST API only)
// Avoids WebSocket dependency issues on Node < 22
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
  realtime: {
    enabled: false
  }
});

module.exports = { supabase };
