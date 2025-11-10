
const s = Store.get();
setActive('nav-catalogo');
const livro = s.livros.find(x=>x.id===s.currentLivroId) || s.livros[0];
document.getElementById('hdr').textContent = livro.titulo;
document.getElementById('det-cod').value = livro.cod;
document.getElementById('det-cat').value = livro.cat;
document.getElementById('det-autor').value = livro.autor;
document.getElementById('det-ano').value = livro.ano;

const btnEmp = document.getElementById('btn-emprestar');
const btnRes = document.getElementById('btn-reservar');
btnEmp.disabled = (livro.status!=='disponivel');
btnRes.disabled = (livro.status==='disponivel');

btnEmp.addEventListener('click', ()=>{ window.location.href = '../emprestimo/index.html'; });
btnRes.addEventListener('click', ()=>{
  if(!livro.fila.includes(s.usuario.id)) livro.fila.push(s.usuario.id);
  Store.set(s);
  window.location.href = '../fila/index.html';
});
