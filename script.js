// Flip interactions
const formCard = document.getElementById('formCard');
const showSignup = document.getElementById('showSignup');
const showLogin  = document.getElementById('showLogin');

showSignup.addEventListener('click', (e)=>{ e.preventDefault(); formCard.classList.add('flip'); });
showLogin .addEventListener('click', (e)=>{ e.preventDefault(); formCard.classList.remove('flip'); });

// Show/Hide passwords
function togglePassword(id, btn){
  const field = document.getElementById(id);
  const isHidden = field.type === 'password';
  field.type = isHidden ? 'text' : 'password';
  btn.textContent = isHidden ? '🙈' : '👁';
}

// Password strength + confirm match
const signupPassword = document.getElementById('signupPassword');
const confirmPassword = document.getElementById('confirmPassword');
const strengthMeter   = document.getElementById('passwordStrength');

if (signupPassword){
  signupPassword.addEventListener('input', updateStrength);
}
if (confirmPassword){
  confirmPassword.addEventListener('input', checkMatch);
  signupPassword.addEventListener('input', checkMatch);
}

function updateStrength(){
  const v = signupPassword.value;
  let score = 0;
  if (v.length >= 8) score++;
  if (/[A-Z]/.test(v)) score++;
  if (/[0-9]/.test(v)) score++;
  if (/[^A-Za-z0-9]/.test(v)) score++;

  const colors = ['#ff4d4d','#ff944d','#ffd24d','#57d857'];
  strengthMeter.style.background = score ? colors[score-1] : 'transparent';
}

function checkMatch(){
  if (!confirmPassword.value){ confirmPassword.style.borderColor = 'rgba(255,255,255,0.25)'; return; }
  const ok = signupPassword.value === confirmPassword.value;
  confirmPassword.style.borderColor = ok ? 'rgba(87,216,87,0.8)' : '#ff4d4d';
}

// Optional: prevent default submit (demo only)
document.getElementById('loginForm').addEventListener('submit', (e)=> e.preventDefault());
document.getElementById('signupForm').addEventListener('submit', (e)=> e.preventDefault());
