
const s = Store.get();
setActive('nav-perfil');
// Assume último ativo para devolução rápida (mock)
const ativo = (s.emprestimosAtivos||[])[0];
if(!ativo){
  document.getElementById('dev-livro').value = '—';
} else {
  document.getElementById('dev-livro').value = ativo.titulo;
}
document.getElementById('dev-confirmar').addEventListener('click', () => {
  if(!ativo){ window.location.href = '../perfil/index.html'; return; }
  const idx = s.emprestimosAtivos.findIndex(e=>e.livroId===ativo.livroId);
  const livro = s.livros.find(l=>l.id===ativo.livroId);
  if(livro) livro.status='disponivel';
  if(idx>=0) s.emprestimosAtivos.splice(idx,1);
  const hoje = new Date();
  const empDate = new Date(new Date(ativo.prev).getTime() - 14*86400000);
  const atraso = hoje > new Date(ativo.prev);
  s.historico = [{ titulo:ativo.titulo, emp:empDate.toISOString(), dev:hoje.toISOString(), atraso }, ...s.historico];
  Store.set(s);
  window.location.href = '../catalogo/index.html';
});
