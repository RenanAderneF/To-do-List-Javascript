//Seleção de elementos: Nesse treço, selecionaremos todos os elementos presentes no código HTML, a fim de podermos manipulá-los com Javascript, criando eventos personalizados. Isso é feito criando uma variável que recebe o método document.querySelector e o elemento em questão entre parênteses.

const blocoCriaTarefa = document.querySelector("#blocoCriaTarefa");

const campoCriaTarefa = document.querySelector("#campoCriaTarefa");

const tarefas = document.querySelectorAll(".tarefaAtiva,  .tarefaCompleta");

let numeroTotalTarefas = localStorage.length;

let posicaoTarefa = 0;

const entradaCriaTarefa = document.querySelector("#entradaCriaTarefa");

const blocoEditaTarefa = document.querySelector("#blocoEditaTarefa");

const campoEditaTarefa = document.querySelector("#campoEditaTarefa")

let tituloEditar;

let elementoEditar;

const cancelaEdit = document.querySelector("#cancelaEdit");

const blocoFiltro = document.querySelector("#blocoFiltro");

const campoFiltro = document.querySelector("#filtrar");

const formSuperior = document.querySelector("#formSuperior");

const formInferior = document.querySelector("#formInferior");

let estadoForm = 1;

const tarefaAtiva = document.querySelector(".tarefaAtiva");

const icone = document.querySelector("i");

const concluiTarefa = document.querySelector(".concluiTarefa");

const editaTarefa = document.querySelector(".editaTarefa");

const deletaTarefa = document.querySelector(".deletaTarefa");

const tarefaCompleta = document.querySelector(".tarefaCompleta");

const filtro = document.querySelector("#filtrar");

let opcaoFiltro;

//Funções

const salvaTarefa = (text) => { //Função para criar elementos HTML de uma nova tarefa.

    //Bloco de criar tarefa:

    const tarefaAtiva = document.createElement("div")
    tarefaAtiva.classList.add("tarefaAtiva");

    //Cabeçalho da tarefa criada:

    const tarefaTitulo = document.createElement("h4");
    tarefaTitulo.innerText = text;
    tarefaAtiva.appendChild(tarefaTitulo);

    //Botão para concluir tarefa:

    const concluiTarefa = document.createElement("button");
    concluiTarefa.classList.add("concluiTarefa");
    concluiTarefa.innerHTML = '<i class="fa-solid fa-check"></i>'
    tarefaAtiva.appendChild(concluiTarefa);

    //Botão para editar tarefa:

    const editaTarefa = document.createElement("button");
    editaTarefa.classList.add("editaTarefa");
    editaTarefa.innerHTML = '<i class="fa-solid fa-pencil"></i>'
    tarefaAtiva.appendChild(editaTarefa);

    //Botão para excluir tarefa:

    const deletaTarefa = document.createElement("button");
    deletaTarefa.classList.add("deletaTarefa");
    deletaTarefa.innerHTML = '<i class="fa-solid fa-trash"></i>'
    tarefaAtiva.appendChild(deletaTarefa);

    formInferior.appendChild(tarefaAtiva);  //O bloco de tarefa ativa e seus respectivos elementos filho acrescentados, são acrescentados a div do formulário inferior. Sem esse comando, nada do que foi criado e acrescentado pode aparecer na página.
 
    console.log(`Tarefa "${tarefaAtiva.innerText}" criada.`);

    localStorage.setItem(posicaoTarefa, tarefaTitulo.innerText); //armazena o título da tarefa na chave de posição, que é incrementada toda vez que o evento submit de "entradaCriaTarefa", é acionado.

    tarefaAtiva.classList.add(posicaoTarefa);
    
}

const trocaForm = () => {

   const elementoPai = formSuperior.closest("div");

   blocoEditaTarefa.classList.toggle("hide");
   blocoCriaTarefa.classList.toggle("hide");
   formInferior.classList.toggle("hide");
   blocoFiltro.classList.toggle("hide");

    //as condicionais abaixo servem para alterar o id da parte superior do formulário afim de mudar seu layout quando a função for acionada, armazenando o estado do formulário.

    if(estadoForm === 1) { 

        elementoPai.id = "formSuperiorArredondado"; 
        estadoForm = 2; 

    } else {

        elementoPai.id = "formSuperior";
        estadoForm = 1;

    }

}

const updateTarefa = (entradaEditaTarefa, tituloEditar, elementoEditar) => { 

    tituloEditar.innerText = entradaEditaTarefa; //O título incluso no div do "botaoClicado" recebe o texto digitado no campo de edição de tarefas.

    const numClasse = elementoEditar.classList[1]; //Classe referente à chave no localStorage.
    localStorage.setItem(numClasse, entradaEditaTarefa); //Substitui valor antigo por valor na variável "entradaEditaTarefa", no valor da chave correspondente à tarefa a ser editada.
    
}

const filtraTarefa = () => {

    const tarefasAtivas = document.querySelectorAll(".tarefaAtiva");
    const tarefasCompletas = document.querySelectorAll(".tarefaCompleta");
    
    if(opcaoFiltro === "done") {
    
        tarefasAtivas.forEach(function(tarefaAtiva){

            tarefaAtiva.classList.add("hide");
        
        });

        tarefasCompletas.forEach(function(tarefaCompleta){

            tarefaCompleta.classList.remove("hide");
        
        });
        
        
    }

    if(opcaoFiltro === "to-do") {
    
        tarefasAtivas.forEach(function(tarefaAtiva){

            tarefaAtiva.classList.remove("hide");
        
        });
        
        tarefasCompletas.forEach(function(tarefaCompleta){

            tarefaCompleta.classList.add("hide");
        
        });

    }


    if(opcaoFiltro === "all") {
    
        tarefasAtivas.forEach(function(tarefaAtiva){

            tarefaAtiva.classList.remove("hide");
        
        });
        
        tarefasCompletas.forEach(function(tarefaCompleta){

            tarefaCompleta.classList.remove("hide");
        
        });
    }

}

function verificaArmazenamento() { //Função chamada após recarregamento do conteúdo DOM.

    if(localStorage.length > 0) { 

        let tituloAtual;

        for(posicaoTarefa; posicaoTarefa <= numeroTotalTarefas; posicaoTarefa++) { 

            tituloAtual = localStorage.getItem(posicaoTarefa); //título da posição correspondente.

            console.log(`N° da tarefa: ${posicaoTarefa}. Título: ${tituloAtual}`);
            
            if(tituloAtual) { //Se existe o item da posição...

                console.log(`tarefa "${tituloAtual}" recarregada.`)
                salvaTarefa(tituloAtual);

            }

        }
        
    }

}

//Eventos

formSuperior.addEventListener("submit", (e) => { //ouvinte de evento de envio "submit" na parte superior da lista.

    e.preventDefault();

    const entradaCriaTarefa = campoCriaTarefa.value; //Valor de tarefa criada armazenado.

    if (entradaCriaTarefa) { 

        posicaoTarefa++;
        console.log(`"posicaoTarefa" = ${posicaoTarefa}`);
        salvaTarefa(entradaCriaTarefa);
        campoCriaTarefa.value = ""; 
        
    }

});


document.addEventListener("click", (e) => { //ouvinte de evento para os botões

    const botaoClicado = e.target; //A variável "botaoClicado" armazena o alvo do clique capturado pelo ouvinte de evento acima.

    const elementoPai = botaoClicado.closest("div"); //A variável "elementoPai" armazena o elemento ancestral (ou pai) mais próximo de "botaoClicado", nesse caso sendo ele especificamente uma div.

    const tarefaTitulo = entradaCriaTarefa; //A variável "tarefaTitulo" armazena o valor armazenado na variável "entradaCriaTarefa".

    if(elementoPai && elementoPai.classList.contains("h4")) { 

        tarefaTitulo = elementoPai.querySelector("h4").innerText; 

    }

    if(botaoClicado.classList.contains("concluiTarefa")) { 

        elementoPai.classList.toggle("tarefaCompleta"); //Aplica essa classe no elemento pai com a classe "concluiTarefa" que foi interagido.
        
        const iconeBotaoClicado = botaoClicado.querySelector("i");
        const editaBotaoClicado = elementoPai.querySelector(".editaTarefa");
        const deletaBotaoClicado = elementoPai.querySelector(".deletaTarefa");

        //As variáveis acima selecionam os elementos de ícone, e botões de edita e exclui tarefa específicos do botão que foi pressionado, para que as mudanças não ocorram em todos os elementos com a classe "concluiTarefa". Essa foi a parte mais dificultosa de entendimento durante a programação do projeto.

        editaBotaoClicado.classList.toggle("hide");
        deletaBotaoClicado.classList.toggle("hide");

        if (iconeBotaoClicado.classList.contains("fa-check")) {

            iconeBotaoClicado.classList.remove("fa-check");
            iconeBotaoClicado.classList.add("fa-redo");

        } else {

            iconeBotaoClicado.classList.remove("fa-redo");
            iconeBotaoClicado.classList.add("fa-check");

        }
    }

    if (botaoClicado.classList.contains("editaTarefa")) { 

        trocaForm(); //Esconde certos campos e revela o bloco referente a edição da tarefa.

        elementoEditar = botaoClicado.closest("div");

        tituloEditar = elementoPai.querySelector("h4"); 
        console.log(tituloEditar);

        campoEditaTarefa.value = tituloEditar.innerText;

    }

    if(botaoClicado.id === "cancelaEdit") {

        trocaForm();
        
    }

    if(botaoClicado.classList.contains("deletaTarefa")) {  

        const numClasse = elementoPai.classList[1]; //Armazena a segunda classe do elemento pai, nesse caso, sendo a posição/chave da tarefa com o botão clicado. Ex: div.tarefaAtiva.1; numClasse será 1.

        //Tanto o elemento interagido quanto sua chave equivalente no localStorage são excluídos.

        elementoPai.remove();
        localStorage.removeItem(numClasse); 

    }


});

document.addEventListener("submit", (e) => {

    e.preventDefault();

    const entradaEditaTarefa = campoEditaTarefa.value;

    if(entradaEditaTarefa) { //Se campo de edição for preenchido e enviado:

        console.log(entradaEditaTarefa);

        updateTarefa(entradaEditaTarefa, tituloEditar, elementoEditar); //valor digitado e título da tarefa a ser editada. A variável "tituloEditar" foi declarada em um escopo global, tendo seu valor preenchido como o elemento "h3" incluso em "BotaoClicado", caso o botão possuisse a classe "editaTarefa".

        campoEditaTarefa.value = "";

        trocaForm(); //esconde edição e exibe tela normal.
        
    }

});

filtro.addEventListener("change", (event) => {

    opcaoFiltro = event.target.value;

    console.log(`Item selecionado: ${opcaoFiltro}`);

    filtraTarefa();
});

document.addEventListener("DOMContentLoaded", verificaArmazenamento);


