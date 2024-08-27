// Formulário superior: 

const formSuperior = document.querySelector("#formSuperior");
const formInferior = document.querySelector("#formInferior");
const campoCriaTarefa = document.querySelector("#campoCriaTarefa");
const campoEditaTarefa = document.querySelector("#campoEditaTarefa");
const blocoFiltro = document.querySelector("#blocoFiltro");
const btnCriaTarefa = document.querySelector("#btnCriaTarefa");

// Botões da tarefa ativa:

const btnConcluiTarefa = document.querySelectorAll(".btnConcluiTarefa");
const btnEditaTarefa = document.querySelectorAll(".btnEditaTarefa");
const btnDeletaTarefa = document.querySelectorAll(".btnDeletaTarefa");

// Botões do formulário de edição:

const btnConfirmaEdit =  document.querySelector("#btnConfirmaEdit");
const btnCancelaEdit =  document.querySelector("#btnCancelaEdit");


// Variáveis globais

let itensArray = localStorage.getItem("items") ? JSON.parse(localStorage) : [];
let posicaoTarefa = 0;
let estadoForm = 1;
let opcaoFiltro;
let tarefaSelecionada;
 
// Funções

const criaTarefa = (textoTitulo) => { //Função para criar elementos HTML de uma nova tarefa.

    //Bloco de criar tarefa:

    const tarefaAtiva = document.createElement("div")
    tarefaAtiva.classList.add("tarefaAtiva");

    //Cabeçalho da tarefa criada:

    const tarefaTitulo = document.createElement("h4");
    tarefaTitulo.innerText = textoTitulo;
    tarefaAtiva.appendChild(tarefaTitulo);

    //Botão para concluir tarefa:

    const concluiTarefa = document.createElement("button");
    concluiTarefa.classList.add("btnConcluiTarefa");
    concluiTarefa.innerHTML = '<i class="fa-solid fa-check"></i>'
    tarefaAtiva.appendChild(concluiTarefa);

    //Botão para editar tarefa:

    const editaTarefa = document.createElement("button");
    editaTarefa.classList.add("btnEditaTarefa");
    editaTarefa.innerHTML = '<i class="fa-solid fa-pencil"></i>'
    tarefaAtiva.appendChild(editaTarefa);

    //Botão para excluir tarefa:

    const deletaTarefa = document.createElement("button");
    deletaTarefa.classList.add("btnDeletaTarefa");
    deletaTarefa.innerHTML = '<i class="fa-solid fa-trash"></i>'
    tarefaAtiva.appendChild(deletaTarefa);

    //O bloco de tarefa ativa e seus respectivos elementos filho são acrescentados a div do formulário inferior. Sem esse comando, nada do que foi criado e acrescentado pode aparecer na página.
    formInferior.appendChild(tarefaAtiva);  
 
    //Salvando no Local Storage:

    itensArray.push(textoTitulo);
    localStorage.setItem("itens", JSON.stringify(itensArray));
   
}

const editaTarefa = (e) => {

    tarefaSelecionada = e.target.closest("div");
    console.log(tarefaSelecionada);
    trocaForm(); //Esconde certos campos e revela o bloco referente a edição da tarefa. 
}

const concluiTarefa = (e) => {

    tarefaSelecionada = e.target.closest("div");
    let titulo = tarefaSelecionada.querySelector("h4").innerText;
    tarefaSelecionada.classList.toggle("tarefaCompleta"); //Aplica essa classe no elemento pai com a classe "concluiTarefa" que foi interagido.
    
    const concluiBotaoClicado = tarefaSelecionada.querySelector(".btnConcluiTarefa");
    const editaBotaoClicado = tarefaSelecionada.querySelector(".btnEditaTarefa");
    const deletaBotaoClicado = tarefaSelecionada.querySelector(".btnDeletaTarefa");

    //As variáveis acima selecionam os elementos de ícone, e botões de edita e exclui tarefa específicos do botão que foi pressionado, para que as mudanças não ocorram em todos os elementos com a classe "concluiTarefa".

    concluiBotaoClicado.classList.toggle("hide");
    editaBotaoClicado.classList.toggle("hide");
    deletaBotaoClicado.classList.toggle("hide");
    
    let indiceTitulo = itensArray.indexOf(titulo);
    itensArray.splice(indiceTitulo, 1);
    localStorage.setItem("itens", JSON.stringify(itensArray));
   
}

const deletaTarefa = (e) => {

    tarefaSelecionada = e.target.closest("div");
    titulo = tarefaSelecionada.querySelector("h4").innerText;
   
    tarefaSelecionada.remove();

    //Removendo item do local Storage:

    const indexTitulo = itensArray.indexOf(titulo);
    itensArray.splice(indexTitulo, 1);
    localStorage.setItem("itens", JSON.stringify(itensArray));

}
    
const trocaForm = () => { //troca formulário de adicionar/editar.

   const tarefaSelecionada = formSuperior.closest("div");

   blocoEditaTarefa.classList.toggle("hide");
   blocoCriaTarefa.classList.toggle("hide");
   formInferior.classList.toggle("hide");
   blocoFiltro.classList.toggle("hide");

    //as condicionais abaixo servem para alterar o id da parte superior do formulário afim de mudar seu layout quando a função for acionada, armazenando o estado do formulário.

    if(estadoForm === 1) { 

        tarefaSelecionada.id = "formSuperiorArredondado"; 
        estadoForm = 2; 

    } else {

        tarefaSelecionada.id = "formSuperior";
        estadoForm = 1;

    }

}

const atualizaTarefa = (e, novoTitulo) => { 

    let titulo = tarefaSelecionada.querySelector("h4").innerText;
    tarefaSelecionada.querySelector("h4").innerText = novoTitulo; //O título incluso no div do "botaoClicado" recebe o texto digitado no campo de edição de tarefas.

    //Atualizando item no Local Storage:

    let tituloIndex = itensArray.indexOf(titulo);
    console.log(`array padrão: ${itensArray}`);
    itensArray.splice(tituloIndex, 1, novoTitulo);
    console.log(`array pós-splice: ${itensArray}`);
    localStorage.setItem("itens", JSON.stringify(itensArray));

    
}

const filtraTarefa = () => {

    const tarefasAtivas = document.querySelectorAll(".tarefaAtiva");
    const tarefasCompletas = document.querySelectorAll(".tarefaCompleta");
    
    if(opcaoFiltro === "done") {
    
        tarefasAtivas.forEach((tarefaAtiva) => {

            tarefaAtiva.classList.add("hide");
        
        });

        tarefasCompletas.forEach((tarefaCompleta) => {

            tarefaCompleta.classList.remove("hide");
        
        });
        
        
    }

    if(opcaoFiltro === "to-do") {
    
        tarefasAtivas.forEach((tarefaAtiva)=> {

            tarefaAtiva.classList.remove("hide");
        
        });
        
        tarefasCompletas.forEach((tarefaCompleta) => {

            tarefaCompleta.classList.add("hide");
        
        });

    }


    if(opcaoFiltro === "all") {
    
        tarefasAtivas.forEach((tarefaAtiva) => {

            tarefaAtiva.classList.remove("hide");
        
        });
        
        tarefasCompletas.forEach((tarefaCompleta) => {

            tarefaCompleta.classList.remove("hide");
        
        });
    }

}

function verificaArmazenamento() { //Função chamada após recarregamento do conteúdo DOM.

    if(localStorage.length > 0) {

        let array = localStorage.getItem("itens")
        array = JSON.parse(array);
        console.log(array);

        array.forEach((item) => {

            criaTarefa(item);
        })

    }
    
    else {

        console.log(`Não há tarefas armazenadas no local storage.`)

    }

}

//Eventos

//Delegação de evento dos botões das tarefas ativas:

formInferior.addEventListener("click", (e) => {

    if(e.target.classList.contains("btnConcluiTarefa")){

        concluiTarefa(e);
    }

    else if(e.target.classList.contains("btnEditaTarefa")){

        editaTarefa(e);

    }

    else if(e.target.classList.contains("btnDeletaTarefa")){

        deletaTarefa(e);
    }

})


btnCriaTarefa.addEventListener("click", () => { //

    const tituloTarefa = campoCriaTarefa.value; 

    if (tituloTarefa) { 

        campoCriaTarefa.value = ""; 
        criaTarefa(tituloTarefa);
    }

});


btnConfirmaEdit.addEventListener("click", (e) => {

    const novoTitulo = campoEditaTarefa.value;
    console.log(`Título novo: ${novoTitulo}`);

    atualizaTarefa(e, novoTitulo); 

    campoEditaTarefa.value = "";

    trocaForm(); //esconde edição e exibe tela normal.
})

btnCancelaEdit.addEventListener("click", (e) => { //
    trocaForm();
})

blocoFiltro.addEventListener("change", (event) => {

    opcaoFiltro = event.target.value;

    console.log(`Item selecionado: ${opcaoFiltro}`);

    filtraTarefa();
});

document.addEventListener("DOMContentLoaded", verificaArmazenamento);


