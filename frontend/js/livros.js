const API_URL = "http://localhost:3000/livros";

let livros = [];

document.addEventListener("DOMContentLoaded", () => {
    carregarLivros();

    const btnNovoLivro = document.getElementById("btn-novo-livro");
    const btnFecharModal = document.getElementById("btn-fechar-modal-livro");
    const btnCancelar = document.getElementById("btn-cancelar-livro");
    const formLivro = document.getElementById("form-livro");
    const campoBusca = document.getElementById("buscar-livro");

    if (btnNovoLivro) {
        btnNovoLivro.addEventListener("click", abrirModalLivro);
    }

    if (btnFecharModal) {
        btnFecharModal.addEventListener("click", fecharModalLivro);
    }

    if (btnCancelar) {
        btnCancelar.addEventListener("click", fecharModalLivro);
    }

    if (formLivro) {
        formLivro.addEventListener("submit", salvarLivro);
    }

    if (campoBusca) {
        campoBusca.addEventListener("keyup", buscarLivro);
    }
});

async function carregarLivros() {
    try {
        const resposta = await fetch(API_URL);

        if (!resposta.ok) {
            throw new Error("Erro ao buscar livros");
        }

        livros = await resposta.json();

        renderizarLivros(livros);
        atualizarCards(livros);

    } catch (error) {
        console.error("Erro ao carregar livros:", error);

        alert("Erro ao carregar livros. Verifique se o backend está rodando.");
    }
}

function renderizarLivros(listaLivros) {

    const tabela = document.getElementById("tabela-livros");

    if (!tabela) return;

    tabela.innerHTML = "";

    if (listaLivros.length === 0) {

        tabela.innerHTML = `
            <tr>
                <td colspan="7">
                    Nenhum livro cadastrado.
                </td>
            </tr>
        `;

        return;
    }

    listaLivros.forEach((livro, index) => {

        const statusClasse =
            livro.status === "Disponível"
                ? "disponivel"
                : "emprestado";

        tabela.innerHTML += `
            <tr>

                <td>#${index + 1}</td>

                <td>${livro.titulo}</td>

                <td>${livro.autor}</td>

                <td>${livro.categoria}</td>

                <td>${livro.isbn}</td>

                <td>
                    <span class="status ${statusClasse}">
                        ${livro.status}
                    </span>
                </td>

                <td class="acoes">

                    <button
                        class="btn-action edit"
                        onclick="editarLivro('${livro._id}')"
                    >
                        <i class="fa-solid fa-pen"></i>
                    </button>

                    <button
                        class="btn-action delete"
                        onclick="deletarLivro('${livro._id}')"
                    >
                        <i class="fa-solid fa-trash"></i>
                    </button>

                </td>

            </tr>
        `;
    });
}

function atualizarCards(listaLivros) {

    const totalLivros =
        document.getElementById("total-livros");

    const livrosDisponiveis =
        document.getElementById("livros-disponiveis");

    const livrosEmprestados =
        document.getElementById("livros-emprestados");

    const total = listaLivros.length;

    const disponiveis = listaLivros.filter(
        livro => livro.status === "Disponível"
    ).length;

    const emprestados = listaLivros.filter(
        livro => livro.status === "Emprestado"
    ).length;

    if (totalLivros) {
        totalLivros.textContent = total;
    }

    if (livrosDisponiveis) {
        livrosDisponiveis.textContent = disponiveis;
    }

    if (livrosEmprestados) {
        livrosEmprestados.textContent = emprestados;
    }
}

function abrirModalLivro() {

    const modal = document.getElementById("modal-livro");

    if (!modal) return;

    modal.classList.add("active");

    document.getElementById("titulo-modal").textContent =
        "Cadastrar Livro";

    document.getElementById("form-livro").reset();

    document.getElementById("livro-id").value = "";
}

function fecharModalLivro() {

    const modal = document.getElementById("modal-livro");

    if (!modal) return;

    modal.classList.remove("active");
}

async function salvarLivro(event) {

    event.preventDefault();

    const id =
        document.getElementById("livro-id").value;

    const livro = {

        titulo:
            document.getElementById("titulo").value,

        autor:
            document.getElementById("autor").value,

        categoria:
            document.getElementById("categoria").value,

        isbn:
            document.getElementById("isbn").value,

        status:
            document.getElementById("status").value
    };

    try {

        if (id) {

            const resposta = await fetch(
                `${API_URL}/${id}`,
                {
                    method: "PUT",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(livro)
                }
            );

            if (!resposta.ok) {
                throw new Error("Erro ao atualizar livro");
            }

        } else {

            const resposta = await fetch(
                API_URL,
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(livro)
                }
            );

            if (!resposta.ok) {
                throw new Error("Erro ao cadastrar livro");
            }
        }

        fecharModalLivro();

        carregarLivros();

    } catch (error) {

        console.error("Erro ao salvar livro:", error);

        alert("Erro ao salvar livro.");
    }
}

function editarLivro(id) {

    const livro = livros.find(
        livro => livro._id === id
    );

    if (!livro) return;

    document.getElementById("livro-id").value =
        livro._id;

    document.getElementById("titulo").value =
        livro.titulo;

    document.getElementById("autor").value =
        livro.autor;

    document.getElementById("categoria").value =
        livro.categoria;

    document.getElementById("isbn").value =
        livro.isbn;

    document.getElementById("status").value =
        livro.status;

    document.getElementById("titulo-modal").textContent =
        "Editar Livro";

    document.getElementById("modal-livro")
        .classList.add("active");
}

async function deletarLivro(id) {

    const confirmar = confirm(
        "Tem certeza que deseja excluir este livro?"
    );

    if (!confirmar) return;

    try {

        const resposta = await fetch(
            `${API_URL}/${id}`,
            {
                method: "DELETE"
            }
        );

        if (!resposta.ok) {
            throw new Error("Erro ao deletar livro");
        }

        carregarLivros();

    } catch (error) {

        console.error("Erro ao deletar livro:", error);

        alert("Erro ao deletar livro.");
    }
}

function buscarLivro() {

    const termo =
        document.getElementById("buscar-livro")
            .value
            .toLowerCase();

    const livrosFiltrados = livros.filter(livro =>

        livro.titulo.toLowerCase().includes(termo) ||

        livro.autor.toLowerCase().includes(termo) ||

        livro.categoria.toLowerCase().includes(termo) ||

        livro.isbn.toLowerCase().includes(termo)
    );

    renderizarLivros(livrosFiltrados);
}