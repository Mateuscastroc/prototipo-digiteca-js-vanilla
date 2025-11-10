
const s = Store.get();
setActive('nav-login');
document.getElementById('btn-criar').addEventListener('click', () => {
  const nome = document.getElementById('cad-nome').value.trim();
  const email = document.getElementById('cad-email').value.trim();
  const senha = document.getElementById('cad-senha').value.trim();
  const notif = document.getElementById('cad-notif').value;
  const msg = document.getElementById('cad-msg');
  if(!nome || !email || !senha){
    msg.textContent = 'Preencha todos os campos.';
    msg.className = 'alert danger';
    return;
  }
  const newId = s.users.length + 1;
  s.users.push({id:newId, nome, email, status:'Ativo'});
  s.usuario = { id:newId, nome, email, notif, limite:3 };
  s.logado = true;
  Store.set(s);
  window.location.href = '../catalogo/index.html';
});
