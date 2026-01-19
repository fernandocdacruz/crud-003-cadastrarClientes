const apiUrl = "http://localhost:8080/api/satolep-produtos";

const listaClientes = document.getElementById("listaClientes");
const mensagemVazia = document.getElementById("mensagemVazia");

async function listarTodosClientes() {
    try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
            mensagemVazia.textContent = "Erro ao buscar clientes.";
            return;
        }

        const clientes = await response.json();

        listaClientes.innerHTML = "";
        mensagemVazia.textContent = "";

        if (clientes.length === 0) {
            mensagemVazia.textContent = "Nenhum cliente cadastrado ainda.";
            return;
        }

        clientes.forEach(cliente => {
            const li = document.createElement("li");

            const generoFormatado =
                cliente.genero.charAt(0).toUpperCase() + cliente.genero.slice(1);

            li.innerHTML = `
                <strong>ID #${cliente.id}</strong><br>
                Nome: ${cliente.nomeCompleto}<br>
                Gênero: ${generoFormatado}<br>
                CPF: ${cliente.cpf}<br>
                Email: ${cliente.email}<br>
                Observações: ${cliente.observacoes ?? ""}<br><br>
            `;

            const btnDelete = document.createElement("button");
            btnDelete.textContent = "Excluir";
            btnDelete.addEventListener("click", async () => {
                await fetch(`${apiUrl}/${cliente.id}`, { method: "DELETE" });
                listarTodosClientes();
            });

            li.appendChild(btnDelete);
            listaClientes.appendChild(li);
        });

    } catch {
        mensagemVazia.textContent = "Não foi possível conectar ao servidor.";
    }
}

listarTodosClientes();


