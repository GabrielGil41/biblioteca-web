const API_URL = "http://localhost:3000/livros";

let livros = [];

document.addEventListener("DOMContentLoaded", () => {
    carregarLivros();

    const btnNovoLivro = document.getElementById("btn-novo-livro");
    const btnFecharModal = document.getElementById("btn-fechar-modal-livro");
    const btnCancelar = document.getElementById("btn-cancelar-livro");
    const formLivro = document.getElementById("form-livro");
    const campoBusca = document.getElementById("buscar-livro");
    const campoISBN = document.getElementById("isbn");

    if (btnNovoLivro) btnNovoLivro.addEventListener("click", abrirModalLivro);
    if (btnFecharModal) btnFecharModal.addEventListener("click", fecharModalLivro);
    if (btnCancelar) btnCancelar.addEventListener("click", fecharModalLivro);
    if (formLivro) formLivro.addEventListener("submit", salvarLivro);
    if (campoBusca) campoBusca.addEventListener("keyup", buscarLivro);
    if (campoISBN) campoISBN.addEventListener("input", formatarISBN);

    bloquearNumerosEmCamposTexto(["autor", "idioma", "genero", "categoria"]);
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
                <td colspan="8">Nenhum livro cadastrado.</td>
            </tr>
        `;
        return;
    }

    listaLivros.forEach((livro, index) => {
        const statusClasse = normalizarClasseStatus(livro.status);

        tabela.innerHTML += `
            <tr>
                <td>#${index + 1}</td>
                <td>${livro.titulo || "-"}</td>
                <td>${livro.autor || "-"}</td>
                <td>${livro.editora || "-"}</td>
                <td>${livro.isbn || "-"}</td>
                <td>${livro.categoria || "-"}</td>
                <td>
                    <span class="status ${statusClasse}">
                        ${livro.status || "-"}
                    </span>
                </td>
                <td class="acoes">
                    <button class="btn-action edit" onclick="editarLivro('${livro._id}')">
                        <i class="fa-solid fa-pen"></i>
                    </button>

                    <button class="btn-action delete" onclick="deletarLivro('${livro._id}')">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </td>
            </tr>
        `;
    });
}

function atualizarCards(listaLivros) {
    const totalLivros = document.getElementById("total-livros");
    const livrosDisponiveis = document.getElementById("livros-disponiveis");
    const livrosEmprestados = document.getElementById("livros-emprestados");

    const total = listaLivros.length;
    const disponiveis = listaLivros.filter(livro => livro.status === "Disponível").length;
    const emprestados = listaLivros.filter(livro => livro.status === "Emprestado").length;

    if (totalLivros) totalLivros.textContent = total;
    if (livrosDisponiveis) livrosDisponiveis.textContent = disponiveis;
    if (livrosEmprestados) livrosEmprestados.textContent = emprestados;
}

function abrirModalLivro() {
    const modal = document.getElementById("modal-livro");
    if (!modal) return;

    modal.classList.add("active");

    document.getElementById("titulo-modal").textContent = "Cadastrar Livro";
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

    const id = document.getElementById("livro-id").value;

    const livro = {
        titulo: document.getElementById("titulo").value.trim(),
        autor: document.getElementById("autor").value.trim(),
        editora: document.getElementById("editora").value.trim(),
        edicao: document.getElementById("edicao").value.trim(),
        isbn: document.getElementById("isbn").value.trim(),
        idioma: document.getElementById("idioma").value.trim(),
        genero: document.getElementById("genero").value.trim(),
        categoria: document.getElementById("categoria").value.trim(),
        localizacaoFisica: document.getElementById("localizacao-fisica").value.trim(),
        status: document.getElementById("status").value
    };

    const isbnNumeros = livro.isbn.replace(/\D/g, "");

    if (!livro.titulo || !livro.autor || !livro.editora || !livro.edicao || !livro.isbn || !livro.idioma || !livro.genero || !livro.categoria || !livro.localizacaoFisica || !livro.status) {
        alert("Preencha todos os campos obrigatórios.");
        return;
    }

    if (/\d/.test(livro.autor)) {
        alert("O autor não pode conter números.");
        return;
    }

    if (/\d/.test(livro.idioma)) {
        alert("O idioma não pode conter números.");
        return;
    }

    if (/\d/.test(livro.genero)) {
        alert("O gênero não pode conter números.");
        return;
    }

    if (/\d/.test(livro.categoria)) {
        alert("A categoria não pode conter números.");
        return;
    }

    if (isbnNumeros.length !== 10 && isbnNumeros.length !== 13) {
        alert("ISBN inválido. Informe um ISBN com 10 ou 13 dígitos.");
        return;
    }

    try {
        let resposta;

        if (id) {
            resposta = await fetch(`${API_URL}/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(livro)
            });
        } else {
            resposta = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(livro)
            });
        }

        if (!resposta.ok) {
            const erro = await resposta.json();
            throw new Error(erro.mensagem || "Erro ao salvar livro");
        }

        fecharModalLivro();
        carregarLivros();
    } catch (error) {
        console.error("Erro ao salvar livro:", error);
        alert(error.message);
    }
}

function editarLivro(id) {
    const livro = livros.find(livro => livro._id === id);
    if (!livro) return;

    document.getElementById("livro-id").value = livro._id;
    document.getElementById("titulo").value = livro.titulo || "";
    document.getElementById("autor").value = livro.autor || "";
    document.getElementById("editora").value = livro.editora || "";
    document.getElementById("edicao").value = livro.edicao || "";
    document.getElementById("isbn").value = livro.isbn || "";
    document.getElementById("idioma").value = livro.idioma || "";
    document.getElementById("genero").value = livro.genero || "";
    document.getElementById("categoria").value = livro.categoria || "";
    document.getElementById("localizacao-fisica").value = livro.localizacaoFisica || "";
    document.getElementById("status").value = livro.status || "Disponível";

    document.getElementById("titulo-modal").textContent = "Editar Livro";
    document.getElementById("modal-livro").classList.add("active");
}

async function deletarLivro(id) {
    const confirmar = confirm("Tem certeza que deseja excluir este livro?");
    if (!confirmar) return;

    try {
        const resposta = await fetch(`${API_URL}/${id}`, {
            method: "DELETE"
        });

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
    const termo = document.getElementById("buscar-livro").value.toLowerCase();

    const livrosFiltrados = livros.filter(livro =>
        (livro.titulo || "").toLowerCase().includes(termo) ||
        (livro.autor || "").toLowerCase().includes(termo) ||
        (livro.editora || "").toLowerCase().includes(termo) ||
        (livro.isbn || "").toLowerCase().includes(termo) ||
        (livro.genero || "").toLowerCase().includes(termo) ||
        (livro.categoria || "").toLowerCase().includes(termo) ||
        (livro.localizacaoFisica || "").toLowerCase().includes(termo)
    );

    renderizarLivros(livrosFiltrados);
}

function formatarISBN(event) {
    let isbn = event.target.value.replace(/\D/g, "");
    isbn = isbn.substring(0, 13);

    if (isbn.length <= 10) {
        isbn = isbn.replace(/^(\d{1})(\d{0,3})(\d{0,5})(\d{0,1})$/, (match, p1, p2, p3, p4) => {
            let resultado = p1;
            if (p2) resultado += `-${p2}`;
            if (p3) resultado += `-${p3}`;
            if (p4) resultado += `-${p4}`;
            return resultado;
        });
    } else {
        isbn = isbn.replace(/^(\d{3})(\d{1})(\d{0,3})(\d{0,5})(\d{0,1})$/, (match, p1, p2, p3, p4, p5) => {
            let resultado = p1;
            if (p2) resultado += `-${p2}`;
            if (p3) resultado += `-${p3}`;
            if (p4) resultado += `-${p4}`;
            if (p5) resultado += `-${p5}`;
            return resultado;
        });
    }

    event.target.value = isbn;
}

function bloquearNumerosEmCamposTexto(ids) {
    ids.forEach(id => {
        const campo = document.getElementById(id);

        if (campo) {
            campo.addEventListener("input", () => {
                campo.value = campo.value.replace(/[0-9]/g, "");
            });
        }
    });
}

function normalizarClasseStatus(status) {
    if (!status) return "";

    return status
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/\s+/g, "-");
}