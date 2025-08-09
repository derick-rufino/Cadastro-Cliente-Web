// Acessando os elementos do DOM
const nomeCliente = document.getElementById("nomeCliente");
const emailCliente = document.getElementById("emailCliente");
const formCliente = document.getElementById("formCliente");
const btnLimparLista = document.getElementById("btnLimparTudo");

const registroClientes = []; // Array para receber os clientes cadastrados
const listaClientes = document.getElementById("listaClientes"); // Lista para exibir os clientes

function adicionarCliente(cliente) {
  const novoCliente = document.createElement("li");
  novoCliente.className = "li-cliente";
  novoCliente.innerHTML = `<div class="info-cliente">
            <span class="nome-cliente">${cliente.nome}</span>
            <span class="email-cliente">${cliente.email}</span>
          </div>
          <button class="btn-remover" onclick="removerCliente(${cliente.id})">
            Remover
          </button>`;
  listaClientes.appendChild(novoCliente);
  novoCliente.scrollIntoView();
}

carregarDadosSalvos();
function carregarDadosSalvos() {
  const registroCarregado = localStorage.getItem("registroSalvo");
  if (registroCarregado) {
    const registroEmArray = JSON.parse(registroCarregado);
    console.log(`Existem ${registroEmArray.length} registros`);
    registroEmArray.forEach((cliente) => {
      registroClientes.push(cliente);
      adicionarCliente(cliente);
    });
  } else {
    console.error("Falha ao carregar registros");
  }
}

formCliente.addEventListener("submit", function (event) {
  event.preventDefault();

  const cliente = {
    id: registroClientes.length + 1,
    nome: nomeCliente.value,
    email: emailCliente.value,
  };

  registroClientes.push(cliente);
  console.log("Cliente cadastrado:", cliente);

  adicionarCliente(cliente);
  atualizarRegistroLocal();

  nomeCliente.value = "";
  emailCliente.value = "";
  nomeCliente.focus(); // Retorna o foco para o campo nome

});

function removerCliente(clienteId) {
  console.log("Elemento removido:", clienteId);

  // usar findIndex para encontrar o id do cliente
  const index = registroClientes.findIndex(
    (cliente) => cliente.id === clienteId
  );

  /* remover do array usando splice: 
  passo o index como o valor, isso indica qual item remover e depois o num 1 indica que irá remover só 1*/
  registroClientes.splice(index, 1);

  // Remover da tela
  // Primeiro pego todos os itens da lista e armazeno
  const todosOsItens = listaClientes.children;
  // Depois eu acesso o elemento espcífico atrvés do index e o removo
  todosOsItens[index].remove();
  atualizarRegistroLocal();
}

function atualizarRegistroLocal() {
  // Converte para texto
  const registroEmTexto = JSON.stringify(registroClientes);
  // Guarda no localStorage
  localStorage.setItem("registroSalvo", registroEmTexto);
}

btnLimparLista.addEventListener("click", function () {
  if (confirm("Deseja remover TODOS os registros?")) {
    registroClientes.length = 0; // Esvazia array
    listaClientes.innerHTML = ""; // Limpa HTML
    atualizarRegistroLocal(); // Salva array vazio
  }
});
