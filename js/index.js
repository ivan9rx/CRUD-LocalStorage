document.querySelector('#logar').addEventListener('click', (e)=>{
    e.preventDefault();
    entrar();
})

function entrar() {
    let usuario = document.querySelector('#login');
    let senha = document.querySelector('#senha');

    // vetor vazio
    let listaUser = [];

    let usuarioValido = {
        login: '',
        senha: ''
    }

    listaUser =  JSON.parse(localStorage.getItem('usuarios'));

    // vai varrer todos os items

    listaUser.forEach(elemento => {
        if(usuario.value === elemento.login && senha.value === elemento.senha) {
            usuarioValido = {
                id: elemento.id,
                login: elemento.login,
                senha: elemento.senha
            }
        }
    });

    if(usuario.value === '' || senha.value === '') {
        alert('preencha todos os campos')
        const erro = (e) => {
          
            e.preventDefault();
            
        };

        erro();
    }

    if(usuario.value === usuarioValido.login && senha.value === usuarioValido.senha) {
        alert('opa, deu certo');
        saveSession(usuarioValido.id);
        window.location.href = 'recados.html'
    } else {
        alert('deu errado')
    }

    console.log(usuarioValido);

    function saveSession (data) {
        if (saveSession) {
            localStorage.setItem("session", data)
        }
        sessionStorage.setItem("logado", JSON.stringify(data));
    }
}