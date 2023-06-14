/////////////////////// ANOTAÇÕES GERAIS ///////////////////////
    /*
    //Para capturar o valor digitado no input "nome" do formulário;
    console.log(evento.target.elements["nome"].value);

    //Para capturar o valor digitado no input "quantidade" do formulário;
    console.log(evento.target.elements["quantidade"].value);
    */

/////////////////////// FIM ///////////////////////


//Constante que captura o formulário
const form = document.getElementById("novoItem");

//Constante lista recebe a lista toda do HTML, ou seja, a tag <ul>;
const lista = document.getElementById("lista");

//Constante array de objetos "Itens" que irá, primeiramente, buscar se há itens já salvos no Local Storage. Se não, criará um array vazio que irá receber os objetos gerados na função "Cria Elemento" para que sejam salvos no Local Storage;
const itens = JSON.parse(localStorage.getItem("itens")) || [];


//Grava no console cada elemento (objeto) do array "Itens";
itens.forEach( (elemento) => {
    criaElemento(elemento);
} )

//Detecta quando o botão submit é utilizado, e aciona uma arrow function;
form.addEventListener("submit", (evento) => {
    //Evita a tentativa de enviar os dados pelo procedimento padrão (backend);
    evento.preventDefault();

    //Constante "nome" que recebe o valor digitado no input "nome";
    const nome = evento.target.elements["nome"];

    //Constante "quantidade" que recebe o valor digitado no input "quantidade";
    const quantidade = evento.target.elements["quantidade"];

    //Constante "existe" criada para verificar se o valor digitado no input "nome" já existe no array itens;
    const existe = itens.find(elemento => elemento.nome === nome.value);

    //Criação o objeto "Item Atual" que recebe os valores dos inputs "nome" e "quantidade";
    const itemAtual = {
        "nome": nome.value,
        "quantidade": quantidade.value
    }

    //Condicional que verifica que o item que estão tentando adicionar à lista já existe no array "Itens";
    if(existe) {
        //Verificação
        itemAtual.id = existe.id;
        //Chamada da função "Atualiza Elemento" que atualiza o item atual no HTML;
        atualizaElemento(itemAtual);
        //Atualiza o item atual no array itens usando o existe.id como índice do array, garantindo que ele está buscando o elemento correto usando o Find Index para encontrar o elemento que tenha o seu id igual ao item atual;
        itens[itens.findIndex(elemento => elemento.id === existe.id)] = itemAtual;
    } else {
        //Se o id não existe, o id do novo item será definido por outra IF (criada usando operador ternário):
            //Se o array itens não estiver vazio ("itens[itens.length - 1] ?"), o id do novo item será igual ao comprimento do array + 1 ("(itens[itens.length - 1]).id + 1").
            //Caso contrário (Se o array itens estiver vazio), o id do novo item será 0 (": 0");
        itemAtual.id = itens[itens.length - 1] ? (itens[itens.length - 1]).id + 1 : 0;
        //Se o id não existe, chama a função "Cria Elemento" e envia o valor dos inputs "nome" e "quantidade", respectivamente;
        criaElemento(itemAtual);
        //Adiciona ao array de objetos "Itens" o objeto atual com o nome e quantidade que estava nos inputs;
        itens.push(itemAtual);
    }

    //Salva no "Local Storage" do navegador o array de objetos "Itens" com os valores dos inputs "nome" e "quantidade". Foi necessário usar o JSON.stringify porque o Local Storage só aceita strings;
    localStorage.setItem("itens", JSON.stringify(itens));

    //Apaga os dados de input do formulário após o click de submit;
    nome.value = "";
    quantidade.value = "";
})

//Função "Cria Elemento" que recebe o valor dos inputs "nome" e "quantidade", respectivamente; 
function criaElemento(item) {

    //Constante "Novo Item" que cria um novo item de lista <li> || Exemplo de li copiado do HTML <li class="item"><strong>7</strong>Camisas</li>;
    const novoItem = document.createElement("li");
    
    //Novo item recebe a classe "item" assim como os outro <li> do HTML;
    novoItem.classList.add("item");

    //Constante "Numero Item" coloca o input "quantidade" dentro de uma tag strong e cria um Dataset "data-id" para este item;
    const numeroItem = document.createElement("strong");
    numeroItem.innerHTML = item.quantidade;
    numeroItem.dataset.id = item.id;
    
    //Append Child coloca "Numero Item" dentro de "Novo Item";
    novoItem.appendChild(numeroItem);

    //"Novo Item" recebe ele mesmo mais o valor do input "nome";
    novoItem.innerHTML += item.nome;

    //"Novo Item" recebe o botão deleta e envia para a função "Botão Deleta" o id do item;
    novoItem.appendChild(botaoDeleta(item.id));

    //Adicionando o "Novo Item" na lista;
    lista.appendChild(novoItem);
}

//Função "Atualiza Elemento" que recebe o item e soma ao valor de "quantidade" dele, no Local Storage, o valor do novo input
function atualizaElemento(item) {
    //Seleciona o data-id do item em questão e, através do innerHTML, substitui o valor do input "quantidade" daquele item;
    document.querySelector("[data-id='"+item.id+"']").innerHTML = item.quantidade;
}

//Função "Botão Deleta" que recebe o id do item e cria um botão com o texto "X" que será usado para deletar um item da lista;
function botaoDeleta(id){
    //Constante que cria o botão em sí;
    const elementoBotao = document.createElement("button");
    //Adiciona o "X" como texto do botão
    elementoBotao.innerText = "X";

    //Associa o Event Listener ao botão usando uma função (não se pode usar "this" do JS com arrow function). Usamos o "this" para encontrar o botão específico que foi clicado. Parent Node é usado para que delete o <li> todo e não apenas o botão em sí. A função "Botão Deleta" chama a função "Deleta Elemento" enviando o <li> e o id como parâmetros para esta última;
    elementoBotao.addEventListener("click", function() {
        deletaElemento(this.parentNode, id);
    })

    return elementoBotao;
}

//Função "Deleta Elemento" que recebe uma tag (<li>) e o id do item e os remove;
function deletaElemento(tag, id){
    tag.remove();

    //Removendo o elemento do array "itens" usando o splice[índice, quantidade a remover], porém, para que funcione, usamos o Find Index para encontrar o elemento que tenha o seu id igual ao id recebido pela função;
    itens.splice(itens.findIndex(elemento => elemento.id == id), 1);

    //Sobescreve o Local Storage com o novo array (com o item removido);
    localStorage.setItem("itens", JSON.stringify(itens));
}