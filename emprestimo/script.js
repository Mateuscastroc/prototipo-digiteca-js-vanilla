
const s = Store.get();
setActive('nav-catalogo');
const livro = s.livros.find(x=>x.id===s.currentLivroId) || s.livros[0];
const hoje = new Date();
const addDays = (d,n)=>{const x=new Date(d);x.setDate(x.getDate()+n);return x};
const fmt = (d)=> new Intl.DateTimeFormat('pt-BR',{day:'2-digit',month:'2-digit',year:'numeric'}).format(d);

document.getElementById('emp-usuario').value = s.usuario.nome;
document.getElementById('emp-limite').textContent = s.usuario.limite;
document.getElementById('emp-livro').value = livro.titulo;
document.getElementById('emp-data').value = fmt(hoje);
document.getElementById('emp-prev').value = fmt(addDays(hoje, 14));

const ativos = s.emprestimosAtivos || [];
const atingiu = ativos.length >= s.usuario.limite;
document.getElementById('emp-alert').classList.toggle('hidden', !atingiu);
const btn = document.getElementById('emp-confirmar');
btn.disabled = atingiu;

btn.addEventListener('click', ()=>{
  if(btn.disabled) return;
  livro.status = 'emprestado';
  const reg = { livroId:livro.id, titulo:livro.titulo, prev:addDays(new Date(),14).toISOString() };
  s.emprestimosAtivos = [...ativos, reg];
  Store.set(s);
  window.location.href = '../perfil/index.html';
});
