const apiUrl = "http://localhost:8080/api/satolep-produtos";

const formCadastro = document.getElementById("formCadastro");
const inNome = document.getElementById("inNome");
const inEmail = document.getElementById("inEmail");
const inCpf = document.getElementById("inCpf");
const inObservacao = document.getElementById("inObservacao");
const inMasculino = document.getElementById("inMasculino");

formCadastro.addEventListener("submit", async (e) => {
    e.preventDefault();

    const genero = document.querySelector("input[name='inGenero']:checked").value;

    const clienteDTO = {
        genero,
        nomeCompleto: inNome.value.trim(),
        email: inEmail.value.trim(),
        cpf: inCpf.value.trim(),
        observacoes: inObservacao.value.trim()
    };

    try {
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(clienteDTO)
        });

        const isJson = response.headers.get("content-type")?.includes("application/json");
        const data = isJson ? await response.json() : null;

        if (response.ok) {
            alert("Cliente cadastrado com sucesso!");
            limparFormulario();
            return;
        }

        if (response.status === 400) {
            if (data && typeof data === "object") {
                alert(Object.values(data).join("\n"));
            } else {
                alert(data);
            }
            return;
        }

        alert("Erro inesperado: " + response.status);

    } catch {
        alert("Não foi possível conectar ao servidor.");
    }
});

function limparFormulario() {
    inNome.value = "";
    inEmail.value = "";
    inCpf.value = "";
    inObservacao.value = "";
    inMasculino.checked = true;
    inNome.focus();
}





