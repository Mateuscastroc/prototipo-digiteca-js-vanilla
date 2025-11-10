
const s = Store.get();
setActive('nav-login');

document.getElementById('btn-entrar').addEventListener('click', () => {
  const email = document.getElementById('login-email').value.trim();
  const senha = document.getElementById('login-senha').value.trim();
  const msg = document.getElementById('login-msg');
  if(!email || !senha){
    msg.textContent = 'Preencha e-mail e senha.';
    msg.className = 'alert danger';
    return;
  }
  s.logado = true;
  Store.set(s);
  window.location.href = '../catalogo/index.html';
});
