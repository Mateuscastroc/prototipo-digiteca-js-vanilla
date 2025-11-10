// Shared state using localStorage so pages can communicate
const Store = {
  _key: 'digiteca_state_v1',
  default() {
    return {
      logado: false,
      usuario: { id: 1, nome: 'João da Silva', email: 'joao@exemplo.com', notif: 'Email', limite: 3 },
      emprestimosAtivos: [],
      historico: [],
      livros: [
        {id:1, titulo:'Estruturas de Dados em C', autor:'A. Tanenbaum', ano:2011, cat:'Tecnologia', cod:'10001', status:'disponivel', fila:[]},
        {id:2, titulo:'Clean Code', autor:'R. Martin', ano:2008, cat:'Tecnologia', cod:'10002', status:'emprestado', fila:[3,4]},
        {id:3, titulo:'Dom Casmurro', autor:'M. de Assis', ano:1899, cat:'Literatura', cod:'20001', status:'reservado', fila:[2]},
        {id:4, titulo:'História do Brasil', autor:'B. G.', ano:1999, cat:'História', cod:'30055', status:'disponivel', fila:[]}
      ],
      users: [
        {id:1, nome:'João da Silva', email:'joao@exemplo.com', status:'Ativo'},
        {id:2, nome:'Maria Oliveira', email:'maria@exemplo.com', status:'Ativo'},
        {id:3, nome:'Carlos Souza', email:'carlos@exemplo.com', status:'Ativo'}
      ],
      notif: { dias:3, canal:'Email' },
      // UI context
      currentLivroId: null
    };
  },
  get(){
    const raw = localStorage.getItem(this._key);
    if(!raw){
      const d = this.default();
      localStorage.setItem(this._key, JSON.stringify(d));
      return d;
    }
    try { return JSON.parse(raw); } catch (e) {
      const d = this.default();
      localStorage.setItem(this._key, JSON.stringify(d));
      return d;
    }
  },
  set(s){ localStorage.setItem(this._key, JSON.stringify(s)); },
  reset(){ localStorage.removeItem(this._key); }
};

// Navigation header highlight
function setActive(navId){
  document.querySelectorAll('header.app a').forEach(a => {
    a.classList.toggle('active', a.id === navId);
  });
}