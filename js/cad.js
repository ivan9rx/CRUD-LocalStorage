document.querySelector("#cadastro").addEventListener('click', (w)=>{
    w.preventDefault();
    
    let email = document.querySelector('#login').value;
    let senha = document.querySelector('#senha').value;

    salvar(email, senha);
});


function salvar(e, s) {
    //verifica se tem dados no local storage, se nao cria um vetor vazio

    let db = JSON.parse(localStorage.getItem('usuarios') || '[]');

    //crio um objeto

    let usuario = {
        id: db.length + 1,
        login: e,
        senha: s
    }

    // jogo o objeto usuario dentro do vetor

    db.push(usuario);

    // salvo no localstorage agora um vetor que pode receber varios objetos

    localStorage.setItem('usuarios',  JSON.stringify(db));
    location.href = 'index.html'
}