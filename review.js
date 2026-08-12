var SUPABASE_URL = 'https://ovflbrrnqgmooutlukyf.supabase.co';
var SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im92ZmxicnJucWdtb291dGx1a3lmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgxMzk1NzUsImV4cCI6MjA4MzcxNTU3NX0.8Rd22mCnCigBpFCaKZmj2F2q2bwHdM9nutb1hUMqUKM';

var sb = null;
try { sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY); } catch(e) { console.error('Supabase init error:', e); }

document.getElementById('reviewForm').addEventListener('submit', async function(e) {
  e.preventDefault();
  
  var btn = document.getElementById('btnSubmit');
  var originalText = btn.textContent;
  
  btn.disabled = true;
  btn.textContent = 'Enviando...';
  
  var name = document.getElementById('rname').value.trim();
  var text = document.getElementById('rtext').value.trim();
  var starsRadio = document.querySelector('input[name="stars"]:checked');
  var consent = document.getElementById('rconsent');
  var stars = starsRadio ? parseInt(starsRadio.value) : null;
  
  if (!name || !text || !stars) {
    alert("Por favor completa todos los campos y selecciona las estrellas.");
    btn.disabled = false;
    btn.textContent = originalText;
    return;
  }
  
  if (consent && !consent.checked) {
    alert("Debes autorizar el uso de tu reseña para continuar.");
    btn.disabled = false;
    btn.textContent = originalText;
    return;
  }

  if (!sb) {
    alert('Error de conexión. Intenta recargar la página.');
    btn.disabled = false;
    btn.textContent = originalText;
    return;
  }
  
  try {
    var result = await sb.from('reviews').insert([
      { name: name, text: text, stars: stars, approved: true }
    ]);
    
    if (result.error) {
      console.error('Supabase insert error:', result.error);
      alert('Hubo un error al enviar tu experiencia: ' + result.error.message);
      btn.disabled = false;
      btn.textContent = originalText;
    } else {
      document.getElementById('reviewFormContainer').style.display = 'none';
      var msg = document.getElementById('successMessage');
      msg.style.display = 'flex';
      msg.style.flexDirection = 'column';
      msg.style.alignItems = 'center';
      msg.style.justifyContent = 'center';
    }
  } catch(err) {
    console.error('Error:', err);
    alert('Hubo un error inesperado. Intenta nuevamente.');
    btn.disabled = false;
    btn.textContent = originalText;
  }
});
