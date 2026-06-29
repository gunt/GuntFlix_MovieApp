const { createClient } = require('@supabase/supabase-js');
const ws = require('ws');

// Validate environment variables at startup
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error('Missing SUPABASE_URL or SUPABASE_KEY environment variables');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
  realtime: {
    transport: ws
  }
});

module.exports = { supabase };
