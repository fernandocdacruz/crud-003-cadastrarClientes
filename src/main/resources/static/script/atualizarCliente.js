const apiUrl = "http://localhost:8080/api/satolep-produtos";

const formBuscar = document.getElementById("formBuscar");
const btnBuscar = document.getElementById("btnBuscar");
const inId = document.getElementById("inId");

const formEditar = document.getElementById("formEditar");
const editId = document.getElementById("editId");
const editMasculino = document.getElementById("editMasculino");
const editFeminino = document.getElementById("editFeminino");
const editNome = document.getElementById("editNome");
const editEmail = document.getElementById("editEmail");
const editCpf = document.getElementById("editCpf");
const editObservacoes = document.getElementById("editObservacoes");
const btnSalvar = document.getElementById("btnSalvar");
const btnCancelar = document.getElementById("btnCancelar");
const mensagem = document.getElementById("mensagem");

btnBuscar.addEventListener("click", async () => {
    mensagem.textContent = "";
    const id = Number(inId.value);
    if (!id || id < 1) {
        mensagem.textContent = "Informe um ID válido.";
        return;
    }
    try {
        const response = await fetch(`${apiUrl}/${id}`);
        if (response.status === 404) {
            mensagem.textContent = "Cliente não encontrado.";
            return;
        }
        if (!response.ok) {
            mensagem.textContent = "Erro ao buscar cliente.";
            return;
        }
        const data = await response.json();
        editId.value = data.id;
        const genero = (data.genero || "").toLowerCase();
        if (genero === "feminino") {
            editFeminino.checked = true;
        } else {
            editMasculino.checked = true;
        }
        editNome.value = data.nomeCompleto;
        editEmail.value = data.email;
        editCpf.value = data.cpf;
        editObservacoes.value = data.observacoes ?? "";
        formEditar.style.display = "block";
        formBuscar.style.display = "none";
    } catch {
        mensagem.textContent = "Não foi possível conectar ao servidor.";
    }
});

btnSalvar.addEventListener("click", async () => {
    mensagem.textContent = "";
    const id = Number(editId.value);
    const selectedGeneroElement = document.querySelector("input[name='editGenero']:checked");
    if (!selectedGeneroElement) {
        mensagem.textContent = "Selecione um gênero.";
        return;
    }
    const payload = {
        nomeCompleto: editNome.value.trim(),
        email: editEmail.value.trim(),
        cpf: editCpf.value.trim(),
        genero: selectedGeneroElement.value,
        observacoes: editObservacoes.value.trim()
    };
    try {
        const response = await fetch(`${apiUrl}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });
        const isJson = response.headers.get("content-type")?.includes("application/json");
        const data = isJson ? await response.json() : null;
        if (response.ok) {
            mensagem.textContent = "Cliente atualizado com sucesso.";
            formEditar.style.display = "none";
            formBuscar.style.display = "block";
            inId.value = "";
            return;
        }
        if (response.status === 400) {
            if (data && data.errors) {
                mensagem.textContent = Object.values(data.errors).join(" ");
            } else if (data && data.message) {
                mensagem.textContent = data.message;
            } else if (typeof data === "string") {
                mensagem.textContent = data;
            } else {
                mensagem.textContent = "Erro de validação.";
            }
            return;
        }
        mensagem.textContent = "Erro ao atualizar cliente.";
    } catch {
        mensagem.textContent = "Não foi possível conectar ao servidor.";
    }
});

btnCancelar.addEventListener("click", () => {
    formEditar.style.display = "none";
    formBuscar.style.display = "block";
    mensagem.textContent = "";
});

