const API_URL_EMPRESTIMOS = "http://localhost:3000/emprestimos";
const API_URL_USUARIOS = "http://localhost:3000/usuarios";
const API_URL_LIVROS = "http://localhost:3000/livros";

let emprestimos = [];
let usuarios = [];
let livros = [];

document.addEventListener("DOMContentLoaded", () => {
    carregarDadosIniciais();

    document.getElementById("btn-novo-emprestimo")?.addEventListener("click", abrirModalEmprestimo);
    document.getElementById("btn-fechar-modal")?.addEventListener("click", fecharModalEmprestimo);
    document.getElementById("btn-cancelar")?.addEventListener("click", fecharModalEmprestimo);
    document.getElementById("form-emprestimo")?.addEventListener("submit", salvarEmprestimo);
    document.getElementById("buscar-emprestimo")?.addEventListener("keyup", filtrarEmprestimos);
    document.getElementById("filtro-status")?.addEventListener("change", filtrarEmprestimos);
});

async function carregarDadosIniciais() {
    try {
        await Promise.all([
            carregarUsuarios(),
            carregarLivros(),
            carregarEmprestimos()
        ]);
    } catch (error) {
        console.error("Erro ao carregar dados iniciais:", error);
        alert("Erro ao carregar dados. Verifique se o backend está rodando.");
    }
}

async function carregarUsuarios() {
    const resposta = await fetch(API_URL_USUARIOS);
    usuarios = await resposta.json();

    const selectUsuario = document.getElementById("usuario");

    if (!selectUsuario) return;

    selectUsuario.innerHTML = `<option value="">Selecione um usuário</option>`;

    usuarios.forEach(usuario => {
        selectUsuario.innerHTML += `
            <option value="${usuario._id}">
                ${usuario.nome}
            </option>
        `;
    });
}

async function carregarLivros() {
    const resposta = await fetch(API_URL_LIVROS);
    livros = await resposta.json();

    const selectLivro = document.getElementById("livro");

    if (!selectLivro) return;

    selectLivro.innerHTML = `<option value="">Selecione um livro</option>`;

    livros.forEach(livro => {
        selectLivro.innerHTML += `
            <option value="${livro._id}">
                ${livro.titulo}
            </option>
        `;
    });
}

async function carregarEmprestimos() {
    const resposta = await fetch(API_URL_EMPRESTIMOS);
    emprestimos = await resposta.json();

    renderizarEmprestimos(emprestimos);
    atualizarCardsEmprestimos(emprestimos);
}

function renderizarEmprestimos(listaEmprestimos) {
    const tabela = document.getElementById("tabela-emprestimos");

    if (!tabela) return;

    tabela.innerHTML = "";

    if (listaEmprestimos.length === 0) {
        tabela.innerHTML = `
            <tr>
                <td colspan="7">Nenhum empréstimo cadastrado.</td>
            </tr>
        `;
        return;
    }

    listaEmprestimos.forEach((emprestimo, index) => {
        const nomeUsuario = emprestimo.usuario?.nome || "Usuário não encontrado";
        const tituloLivro = emprestimo.livro?.titulo || "Livro não encontrado";

        tabela.innerHTML += `
            <tr>
                <td>#${index + 1}</td>
                <td>${nomeUsuario}</td>
                <td>${tituloLivro}</td>
                <td>${formatarData(emprestimo.dataEmprestimo)}</td>
                <td>${formatarData(emprestimo.dataDevolucao)}</td>
                <td>
                    <span class="status ${emprestimo.status}">
                        ${emprestimo.status}
                    </span>
                </td>
                <td class="acoes">
                    <button class="btn-action edit" onclick="editarEmprestimo('${emprestimo._id}')">
                        <i class="fa-solid fa-pen"></i>
                    </button>

                    <button class="btn-action success" onclick="marcarComoDevolvido('${emprestimo._id}')">
                        <i class="fa-solid fa-check"></i>
                    </button>

                    <button class="btn-action delete" onclick="deletarEmprestimo('${emprestimo._id}')">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </td>
            </tr>
        `;
    });
}

function atualizarCardsEmprestimos(listaEmprestimos) {
    const totalEmprestimos = document.getElementById("total-emprestimos");
    const emprestimosAtivos = document.getElementById("emprestimos-ativos");
    const emprestimosPendentes = document.getElementById("emprestimos-pendentes");
    const emprestimosAtrasados = document.getElementById("emprestimos-atrasados");

    const total = listaEmprestimos.length;
    const ativos = listaEmprestimos.filter(e => e.status === "emprestado").length;
    const devolvidos = listaEmprestimos.filter(e => e.status === "devolvido").length;
    const atrasados = listaEmprestimos.filter(e => verificarAtraso(e)).length;

    if (totalEmprestimos) totalEmprestimos.textContent = total;
    if (emprestimosAtivos) emprestimosAtivos.textContent = ativos;
    if (emprestimosPendentes) emprestimosPendentes.textContent = ativos - atrasados;
    if (emprestimosAtrasados) emprestimosAtrasados.textContent = atrasados;
}

function abrirModalEmprestimo() {
    document.getElementById("modal-emprestimo").classList.add("active");
    document.querySelector("#modal-emprestimo .modal-header h2").textContent = "Cadastrar Empréstimo";
    document.getElementById("form-emprestimo").reset();
    document.getElementById("emprestimo-id").value = "";
}

function fecharModalEmprestimo() {
    document.getElementById("modal-emprestimo").classList.remove("active");
}

async function salvarEmprestimo(event) {
    event.preventDefault();

    const id = document.getElementById("emprestimo-id").value;

    const emprestimo = {
        usuario: document.getElementById("usuario").value,
        livro: document.getElementById("livro").value,
        dataEmprestimo: document.getElementById("data-emprestimo").value,
        dataDevolucao: document.getElementById("data-devolucao").value,
        status: document.getElementById("status").value
    };

    try {
        if (id) {
            await fetch(`${API_URL_EMPRESTIMOS}/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(emprestimo)
            });
        } else {
            await fetch(API_URL_EMPRESTIMOS, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(emprestimo)
            });
        }

        fecharModalEmprestimo();
        carregarEmprestimos();
    } catch (error) {
        console.error("Erro ao salvar empréstimo:", error);
        alert("Erro ao salvar empréstimo.");
    }
}

function editarEmprestimo(id) {
    const emprestimo = emprestimos.find(emprestimo => emprestimo._id === id);

    if (!emprestimo) return;

    document.getElementById("emprestimo-id").value = emprestimo._id;
    document.getElementById("usuario").value = emprestimo.usuario?._id || emprestimo.usuario;
    document.getElementById("livro").value = emprestimo.livro?._id || emprestimo.livro;
    document.getElementById("data-emprestimo").value = formatarDataInput(emprestimo.dataEmprestimo);
    document.getElementById("data-devolucao").value = formatarDataInput(emprestimo.dataDevolucao);
    document.getElementById("status").value = emprestimo.status;

    document.querySelector("#modal-emprestimo .modal-header h2").textContent = "Editar Empréstimo";
    document.getElementById("modal-emprestimo").classList.add("active");
}

async function marcarComoDevolvido(id) {
    try {
        await fetch(`${API_URL_EMPRESTIMOS}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                status: "devolvido"
            })
        });

        carregarEmprestimos();
    } catch (error) {
        console.error("Erro ao marcar como devolvido:", error);
        alert("Erro ao marcar como devolvido.");
    }
}

async function deletarEmprestimo(id) {
    const confirmar = confirm("Tem certeza que deseja excluir este empréstimo?");

    if (!confirmar) return;

    try {
        await fetch(`${API_URL_EMPRESTIMOS}/${id}`, {
            method: "DELETE"
        });

        carregarEmprestimos();
    } catch (error) {
        console.error("Erro ao deletar empréstimo:", error);
        alert("Erro ao deletar empréstimo.");
    }
}

function filtrarEmprestimos() {
    const termo = document.getElementById("buscar-emprestimo").value.toLowerCase();
    const status = document.getElementById("filtro-status").value;

    const emprestimosFiltrados = emprestimos.filter(emprestimo => {
        const nomeUsuario = emprestimo.usuario?.nome?.toLowerCase() || "";
        const tituloLivro = emprestimo.livro?.titulo?.toLowerCase() || "";

        const correspondeBusca =
            nomeUsuario.includes(termo) ||
            tituloLivro.includes(termo);

        const correspondeStatus =
            status === "" ||
            emprestimo.status === status ||
            (status === "atrasado" && verificarAtraso(emprestimo));

        return correspondeBusca && correspondeStatus;
    });

    renderizarEmprestimos(emprestimosFiltrados);
}

function verificarAtraso(emprestimo) {
    if (emprestimo.status === "devolvido") return false;

    const hoje = new Date();
    const dataDevolucao = new Date(emprestimo.dataDevolucao);

    return dataDevolucao < hoje;
}

function formatarData(data) {
    if (!data) return "-";

    return new Date(data).toLocaleDateString("pt-BR");
}

function formatarDataInput(data) {
    if (!data) return "";

    return new Date(data).toISOString().split("T")[0];
}