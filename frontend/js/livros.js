let livros = [
    {
        id: 1,
        titulo: "Dom Casmurro",
        autor: "Machado de Assis",
        categoria: "Romance",
        isbn: "978-85-359-0277-0",
        status: "Disponível"
    },
    {
        id: 2,
        titulo: "1984",
        autor: "George Orwell",
        categoria: "Ficção Distópica",
        isbn: "978-85-221-0616-9",
        status: "Emprestado"
    },
    {
        id: 3,
        titulo: "O Pequeno Príncipe",
        autor: "Antoine de Saint-Exupéry",
        categoria: "Literatura Infantil",
        isbn: "978-85-8057-169-1",
        status: "Disponível"
    }
];

const tabelaLivros = document.getElementById("tabela-livros");
const modalLivro = document.getElementById("modal-livro");
const formLivro = document.getElementById("form-livro");

function listarLivros(lista = livros){
    tabelaLivros.innerHTML = "";

    lista.forEach((livro) => {
        const statusClasse = livro.status === "Disponível" ? "ativo" : "atrasado";

        tabelaLivros.innerHTML += `
            <tr>
                <td>#${livro.id}</td>
                <td>${livro.titulo}</td>
                <td>${livro.autor}</td>
                <td>${livro.categoria}</td>
                <td>${livro.isbn}</td>
                <td>
                    <span class="status ${statusClasse}">
                        ${livro.status}
                    </span>
                </td>
                <td>
                    <button class="btn-action edit" onclick="editarLivro(${livro.id})">
                        <i class="fa-solid fa-pen"></i>
                    </button>

                    <button class="btn-action delete" onclick="excluirLivro(${livro.id})">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </td>
            </tr>
        `;
    });

    atualizarCards();
}

function atualizarCards(){
    const totalLivros = livros.length;

    const disponiveis = livros.filter(
        livro => livro.status === "Disponível"
    ).length;

    const emprestados = livros.filter(
        livro => livro.status === "Emprestado"
    ).length;

    document.getElementById("total-livros").innerText = totalLivros;
    document.getElementById("livros-disponiveis").innerText = disponiveis;
    document.getElementById("livros-emprestados").innerText = emprestados;
}

function abrirModalLivro(){
    modalLivro.classList.add("active");
    document.getElementById("titulo-modal").innerText = "Cadastrar Livro";
    formLivro.reset();
    document.getElementById("livro-id").value = "";
}

function fecharModalLivro(){
    modalLivro.classList.remove("active");
}

formLivro.addEventListener("submit", function(event){
    event.preventDefault();

    const id = document.getElementById("livro-id").value;

    const livro = {
        id: id ? Number(id) : gerarNovoId(),
        titulo: document.getElementById("titulo").value,
        autor: document.getElementById("autor").value,
        categoria: document.getElementById("categoria").value,
        isbn: document.getElementById("isbn").value,
        status: document.getElementById("status").value
    };

    if(id){
        const index = livros.findIndex(item => item.id === Number(id));
        livros[index] = livro;
    }else{
        livros.push(livro);
    }

    listarLivros();
    fecharModalLivro();
});

function editarLivro(id){
    const livro = livros.find(item => item.id === id);

    document.getElementById("titulo-modal").innerText = "Editar Livro";
    document.getElementById("livro-id").value = livro.id;
    document.getElementById("titulo").value = livro.titulo;
    document.getElementById("autor").value = livro.autor;
    document.getElementById("categoria").value = livro.categoria;
    document.getElementById("isbn").value = livro.isbn;
    document.getElementById("status").value = livro.status;

    modalLivro.classList.add("active");
}

function excluirLivro(id){
    const confirmar = confirm("Deseja realmente excluir este livro?");

    if(confirmar){
        livros = livros.filter(livro => livro.id !== id);
        listarLivros();
    }
}

function buscarLivro(){
    const termo = document.getElementById("buscar-livro").value.toLowerCase();

    const resultado = livros.filter(livro =>
        livro.titulo.toLowerCase().includes(termo) ||
        livro.autor.toLowerCase().includes(termo) ||
        livro.categoria.toLowerCase().includes(termo) ||
        livro.isbn.toLowerCase().includes(termo)
    );

    listarLivros(resultado);
}

function gerarNovoId(){
    if(livros.length === 0){
        return 1;
    }

    return Math.max(...livros.map(livro => livro.id)) + 1;
}

listarLivros();