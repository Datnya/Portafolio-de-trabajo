const SUPABASE_URL = 'https://ovflbrrnqgmooutlukyf.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im92ZmxicnJucWdtb291dGx1a3lmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgxMzk1NzUsImV4cCI6MjA4MzcxNTU3NX0.8Rd22mCnCigBpFCaKZmj2F2q2bwHdM9nutb1hUMqUKM';

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

document.getElementById('reviewForm').addEventListener('submit', async function(e) {
  e.preventDefault();
  
  const btn = document.getElementById('btnSubmit');
  const originalText = btn.textContent;
  
  btn.disabled = true;
  btn.textContent = 'Enviando...';
  
  const name = document.getElementById('rname').value.trim();
  const text = document.getElementById('rtext').value.trim();
  const starsRadio = document.querySelector('input[name="stars"]:checked');
  const stars = starsRadio ? parseInt(starsRadio.value) : null;
  
  if (!name || !text || !stars) {
    alert("Por favor completa todos los campos y selecciona las estrellas.");
    btn.disabled = false;
    btn.textContent = originalText;
    return;
  }
  
  const { data, error } = await supabase
    .from('reviews')
    .insert([
      { name: name, text: text, stars: stars, approved: true }
    ]);
    
  if (error) {
    console.error(error);
    alert('Hubo un error al enviar la experiencia. Por favor intenta nuevamente.');
    btn.disabled = false;
    btn.textContent = originalText;
  } else {
    document.getElementById('reviewFormContainer').style.display = 'none';
    document.getElementById('successMessage').style.display = 'block';
  }
});
