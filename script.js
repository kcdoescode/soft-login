const formCard = document.getElementById('formCard');
const showSignup = document.getElementById('showSignup');
const showLogin  = document.getElementById('showLogin');

showSignup.addEventListener('click', (e)=>{ e.preventDefault(); formCard.classList.add('flip'); });
showLogin .addEventListener('click', (e)=>{ e.preventDefault(); formCard.classList.remove('flip'); });

const eyeOpenSVG = `<svg class="eye-icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>`;
const eyeOffSVG = `<svg class="eye-icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>`;

function togglePassword(id, btn){
  const field = document.getElementById(id);
  const isHidden = field.type === 'password';
  field.type = isHidden ? 'text' : 'password';
  btn.innerHTML = isHidden ? eyeOffSVG : eyeOpenSVG;
}

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

const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');

if (loginForm){
  loginForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const btn = loginForm.querySelector('.btn');
    const textSpan = btn.querySelector('.btn-text');
    const originalText = textSpan.textContent;
    btn.classList.add('is-loading');
    setTimeout(()=>{
      btn.classList.remove('is-loading');
      textSpan.textContent = 'Welcome Back! ✓';
      setTimeout(()=>{
        textSpan.textContent = originalText;
      }, 2000);
    }, 900);
  });
}

if (signupForm){
  signupForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const btn = signupForm.querySelector('.btn');
    const textSpan = btn.querySelector('.btn-text');
    const originalText = textSpan.textContent;
    btn.classList.add('is-loading');
    setTimeout(()=>{
      btn.classList.remove('is-loading');
      textSpan.textContent = 'Account Created! ✓';
      setTimeout(()=>{
        textSpan.textContent = originalText;
        formCard.classList.remove('flip');
      }, 1500);
    }, 900);
  });
}
