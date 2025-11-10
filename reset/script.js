
setActive('nav-login');
document.getElementById('btn-enviar').addEventListener('click', () => {
  const email = document.getElementById('reset-email').value.trim();
  const msg = document.getElementById('reset-msg');
  if(!email){
    msg.textContent = 'Informe o e-mail.';
    msg.className = 'alert danger';
    return;
  }
  msg.textContent = 'Se existir cadastro, enviaremos um link de redefinição.';
  msg.className = 'alert ok';
});
