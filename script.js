// Acessando os elementos do DOM
const nomeCliente = document.getElementById("nomeCliente");
const emailCliente = document.getElementById("emailCliente");
const formCliente = document.getElementById("formCliente");

const registroClientes = []; // Array para receber os clientes cadastrados
const listaClientes = document.getElementById("listaClientes"); // Lista para exibir os clientes

formCliente.addEventListener("submit", function (event) {
  event.preventDefault();

  const cliente = {
    id: registroClientes.length + 1,
    nome: nomeCliente.value,
    email: emailCliente.value,
  };

  registroClientes.push(cliente);
  console.log("Cliente cadastrado:", cliente);

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
});

function removerCliente(clienteId) {
  console.log("Botão clicado:", clienteId);
  console.log("Elemento pai:", clienteId.parentElement);

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
}
