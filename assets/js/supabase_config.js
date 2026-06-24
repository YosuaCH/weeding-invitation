const SUPABASE_URL = "https://nrspjwgufzguwmkmhama.supabase.co";
const SUPABASE_KEY = "sb_publishable_5sm2hzbDYlBdZ8-SAj4lfw_rdT_WL2F";

// Inisialisasi Supabase Client
const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
window.supabaseClient = supabaseClient;

window.supabaseAuthPromise = (async function () {
  const { data } = await supabaseClient.auth.getSession();
  if (!data.session) {
    const { error: signInError } =
      await supabaseClient.auth.signInAnonymously();
    if (signInError) {
      console.warn(
        "Anonymous Sign-In gagal. Pastikan RLS diatur ke 'anon' atau fitur Anonymous Auth aktif.",
        signInError,
      );
    } else {
      console.log("Berhasil login secara anonymous.");
    }
  }
})();

window.currentGuestData = {
  id: null,
  name: null,
  total_guests: null,
};
