const form = document.querySelector('#infos-prod');
const tabela = document.querySelector('#tbody');
let idx =  form.idx.value

//captura a sessão
let usuarioId = Number(sessionStorage.getItem('logado'));
//localStorage
const session = localStorage.getItem('session');

logadoOuNao ();

function logadoOuNao () {

    if(session) {
        sessionStorage.setItem("log", session);
        usuarioId = session;
    }

    if (!usuarioId) {
        window.location.href = "index.html";
        return;
    }
    
    if (session == 'undefined') {
        saindo();
        window.location.href = "index.html";
        return;
    }

}




const atualizarLocalStorage = (produtos) => { localStorage.setItem('produtos', JSON.stringify(produtos)) }
const recuperarLocalStorage = () => JSON.parse(localStorage.getItem('produtos') || '[]');

const salvarProduto = (e) =>{
    e.preventDefault();

    const nome = form.nome.value;
    const preco = Number(form.preco.value);
    const prime = form.prime.checked;

    if(idx == 'novo') {
        const produtos = recuperarLocalStorage();
        produtos.push({id: produtos.length + 1, nome, preco, prime});
        atualizarLocalStorage(produtos);
        preencherTabela();
        form.reset();
    }else {
        let produto = {id: idx, nome, preco, prime}
        atualizarProduto(idx, produto);
        preencherTabela();
        form.reset();
        idx = 'novo';
    }



}

const preencherTabela = () => {
    const produtos = recuperarLocalStorage();
    tabela.innerHTML = '';
    for(const produto of produtos) {
        tabela.innerHTML += `
            <tr>
                <th scope="row">${produto.id}</th>
                <td>${produto.nome}</td>
                <td>${produto.preco}</td>
                <td>${produto.prime ? "sim" : "não"}</td>
                <td>

                    <img type="button" width="40" src="./img/delete.svg" onclick="removerProduto(${produto.id})" />
                    <img type="button" width="40" src="./img/edit.svg" onclick="editarProduto(${produto.id})"/>

                </td>

            </tr>    

        `
    }
}

const removerProduto = (id) => {
    const produtos = recuperarLocalStorage();
    const indexProduto = produtos.findIndex((produto) => produto.id === id);
    if (indexProduto < 0) return;
    produtos.splice(indexProduto, 1);
    atualizarLocalStorage(produtos);
    alert('Cliente Removido')
    preencherTabela();
}

const editarProduto = (id) => {
    const produtos = recuperarLocalStorage();
    const indexProduto = produtos.findIndex((produto) => produto.id === id);
    form.nome.value = produtos[indexProduto].nome;
    form.preco.value = produtos[indexProduto].preco;
    form.prime.checked = produtos[indexProduto].prime;
    idx = id;
}

const atualizarProduto = (id, produto) => {
    const produtos = recuperarLocalStorage();
    const indexProduto = produtos.findIndex((produto) => produto.id === id);
    produtos[indexProduto] = produto;
    atualizarLocalStorage(produtos);
}

form.addEventListener('submit', salvarProduto);
document.addEventListener('DOMContentLoaded', preencherTabela);


document.querySelector('#sair').addEventListener('click', function(){
    saindo();
});

function saindo () {
    sessionStorage.removeItem("logado");
    localStorage.removeItem("session");

    window.location.href = "index.html";
}


