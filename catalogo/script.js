
const s = Store.get();
setActive('nav-catalogo');

function badgeStatus(st){
  const cls = st==='disponivel' ? 'status-disponivel' : (st==='emprestado' ? 'status-emprestado' : 'status-reservado');
  return `<span class="badge ${cls}">${st[0].toUpperCase()+st.slice(1)}</span>`;
}

function render(){
  const term = (document.getElementById('busca').value||'').toLowerCase();
  const st = document.getElementById('filtro-status').value;
  const cat = document.getElementById('filtro-cat').value;
  const tb = document.getElementById('tbody');
  tb.innerHTML = '';
  s.livros
   .filter(l=>!term || l.titulo.toLowerCase().includes(term) || l.autor.toLowerCase().includes(term))
   .filter(l=>st==='todos' || l.status===st)
   .filter(l=>cat==='Todos' || l.cat===cat)
   .forEach(l=>{
      const tr = document.createElement('tr');
      tr.innerHTML = `<td>${l.titulo}</td><td>${l.autor}</td><td>${badgeStatus(l.status)}</td>
                      <td><button class="btn" data-id="${l.id}">Detalhes</button></td>`;
      tb.appendChild(tr);
   });
  document.querySelectorAll('button[data-id]').forEach(b=>{
    b.addEventListener('click', () => {
      s.currentLivroId = +b.dataset.id;
      Store.set(s);
      window.location.href = '../detalhe/index.html';
    });
  });
}
document.getElementById('btn-filtrar').addEventListener('click', render);
render();
