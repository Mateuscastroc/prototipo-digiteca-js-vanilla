
const s = Store.get();
setActive('nav-perfil');
document.getElementById('n-dias').value = s.notif.dias;
document.getElementById('n-canal').value = s.notif.canal;
document.getElementById('n-salvar').addEventListener('click', () => {
  s.notif.dias = parseInt(document.getElementById('n-dias').value, 10) || 3;
  s.notif.canal = document.getElementById('n-canal').value;
  Store.set(s);
  alert('Configurações salvas.');
});
