
const s = Store.get();
setActive('nav-catalogo');
const l = s.livros.find(x=>x.id===s.currentLivroId) || s.livros[0];
document.getElementById('title').textContent = 'Fila de Reserva — ' + l.titulo;
const ol = document.getElementById('lista');
ol.innerHTML = '';
l.fila.forEach((uid,i)=>{
  const u = s.users.find(x=>x.id===uid) || {nome:'Usuário '+uid};
  const li = document.createElement('li'); li.textContent = (i+1) + ') ' + u.nome; ol.appendChild(li);
});
