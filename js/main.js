//Constante que captura o formulário
const form = document.getElementById("novoItem");

//Constante lista recebe a lista toda do HTML, ou seja, a tag <ul>;
const lista = document.getElementById("lista");

//Detecta quando o botão submit é utilizado, e aciona uma arrow function;
form.addEventListener("submit", (evento) => {
    //Evita a tentativa de enviar os dados pelo procedimento padrão (backend);
    evento.preventDefault();
    
    /*
    //Captura o valor digitado no input "nome" do formulário;
    console.log(evento.target.elements["nome"].value);
    
    //Captura o valor digitado no input "quantidade" do formulário;
    console.log(evento.target.elements["quantidade"].value);
    */
    
    //Ao clicar no botão submit, chama a função "Cria Elemento" e envia o valor dos inputs "nome" e "quantidade", respectivamente;
    criaElemento(evento.target.elements["nome"].value, evento.target.elements["quantidade"].value)
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
}