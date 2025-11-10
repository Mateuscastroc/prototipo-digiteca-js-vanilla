
const s = Store.get();
setActive('nav-perfil');
document.getElementById('p-nome').value = s.usuario.nome;
document.getElementById('p-email').value = s.usuario.email;
document.getElementById('p-notif').value = s.usuario.notif || 'Email';

function fmt(d){ return new Intl.DateTimeFormat('pt-BR',{day:'2-digit',month:'2-digit',year:'numeric'}).format(new Date(d)); }

function render(){
  const tbA = document.getElementById('tb-ativos');
  tbA.innerHTML='';
  (s.emprestimosAtivos||[]).forEach((e,idx)=>{
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${e.titulo}</td><td>${fmt(e.prev)}</td>
      <td>
        <a class="btn" href="../devolucao/index.html">Devolver</a>
        <button class="btn" data-renovar="${idx}">Renovar</button>
      </td>`;
    tbA.appendChild(tr);
  });
  const tbH = document.getElementById('tb-hist');
  tbH.innerHTML='';
  (s.historico||[]).forEach(h=>{
    const st = h.atraso ? 'Em atraso' : 'Devolvido';
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${h.titulo}</td><td>${fmt(h.emp)}</td><td>${fmt(h.dev)}</td><td>${st}</td>`;
    tbH.appendChild(tr);
  });
  document.querySelectorAll('button[data-renovar]').forEach(b=>{
    b.addEventListener('click', ()=>{
      const i = +b.dataset.renovar;
      const e = s.emprestimosAtivos[i];
      const livro = s.livros.find(l=>l.id===e.livroId);
      if(livro && livro.fila.length===0){
        const d = new Date(e.prev); d.setDate(d.getDate()+7); e.prev = d.toISOString();
        Store.set(s);
        render();
        alert('Renovado por +7 dias (mock)');
      } else {
        alert('Não é possível renovar: há reservas pendentes.');
      }
    });
  });
}
render();

document.getElementById('p-salvar').addEventListener('click', () => {
  s.usuario.notif = document.getElementById('p-notif').value;
  Store.set(s);
  alert('Preferências salvas.');
});
