//Constante que captura o formulário
const form = document.getElementById("novoItem");

//Constante lista recebe a lista toda do HTML, ou seja, a tag <ul>;
const lista = document.getElementById("lista");

//Constante array "Itens" que irá receber os objetos gerados na função "Cria Elemento" para que sejam salvos no Local Storage;
const itens = [];

//Detecta quando o botão submit é utilizado, e aciona uma arrow function;
form.addEventListener("submit", (evento) => {
    //Evita a tentativa de enviar os dados pelo procedimento padrão (backend);
    evento.preventDefault();

    //Constante "nome" que recebe o valor digitado no input "nome";
    const nome = evento.target.elements["nome"];

    //Constante "quantidade" que recebe o valor digitado no input "quantidade";
    const quantidade = evento.target.elements["quantidade"];
    
    /*
    //Captura o valor digitado no input "nome" do formulário;
    console.log(evento.target.elements["nome"].value);
    
    //Captura o valor digitado no input "quantidade" do formulário;
    console.log(evento.target.elements["quantidade"].value);
    */
    
    //Ao clicar no botão submit, chama a função "Cria Elemento" e envia o valor dos inputs "nome" e "quantidade", respectivamente;
    criaElemento(nome.value, quantidade.value)

    //Apaga os dados de input do formulário após o click de submit;
    nome.value = "";
    quantidade.value = "";
})

//Função "Cria Elemento" que recebe o valor dos inputs "nome" e "quantidade", respectivamente; 
function criaElemento(nome, quantidade) {

    //Constante "Novo Item" que cria um novo item de lista <li> || Exemplo de li copiado do HTML <li class="item"><strong>7</strong>Camisas</li>;
    const novoItem = document.createElement("li");
    
    //Novo item recebe a classe "item" assim como os outro <li> do HTML;
    novoItem.classList.add("item");

    //Constante "Numero Item" coloca o input "quantidade" dentro de uma tag strong;
    const numeroItem = document.createElement("strong");
    numeroItem.innerHTML = quantidade;
    
    //Append Child coloca "Numero Item" dentro de "Novo Item";
    novoItem.appendChild(numeroItem);

    //"Novo Item" recebe ele mesmo mais o valor do input "nome";
    novoItem.innerHTML += nome;

    //Adicionando o "Novo Item" na lista;
    lista.appendChild(novoItem);

    //Criação o objeto "Item Atual" que recebe os valores dos inputs "nome" e "quantidade";
    const itemAtual = {
        "nome": nome,
        "quantidade": quantidade
    }

    itens.push(itemAtual);

    //Salva no "Local Storage" do navegador o array de objetos "Itens" com os valores dos inputs "nome" e "quantidade". Foi necessário usar o JSON.stringify porque o Local Storage só aceita strings;
    localStorage.setItem("item", JSON.stringify(itens));
}