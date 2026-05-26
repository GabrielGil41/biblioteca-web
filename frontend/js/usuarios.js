const API_URL_USUARIOS = "http://localhost:3000/usuarios";

let usuarios = [];

document.addEventListener("DOMContentLoaded", () => {
    carregarUsuarios();

    const btnNovoUsuario = document.getElementById("btn-novo-usuario");
    const btnFecharModal = document.getElementById("btn-fechar-modal");
    const btnCancelar = document.getElementById("btn-cancelar");
    const formUsuario = document.getElementById("form-usuario");
    const campoBusca = document.getElementById("buscar-usuario");
    const filtroStatus = document.getElementById("filtro-status");

    if (btnNovoUsuario) btnNovoUsuario.addEventListener("click", abrirModalUsuario);
    if (btnFecharModal) btnFecharModal.addEventListener("click", fecharModalUsuario);
    if (btnCancelar) btnCancelar.addEventListener("click", fecharModalUsuario);
    if (formUsuario) formUsuario.addEventListener("submit", salvarUsuario);
    if (campoBusca) campoBusca.addEventListener("keyup", filtrarUsuarios);
    if (filtroStatus) filtroStatus.addEventListener("change", filtrarUsuarios);
});

async function carregarUsuarios() {
    try {
        const resposta = await fetch(API_URL_USUARIOS);
        usuarios = await resposta.json();

        renderizarUsuarios(usuarios);
        atualizarCardsUsuarios(usuarios);
    } catch (error) {
        console.error("Erro ao carregar usuários:", error);
        alert("Erro ao carregar usuários. Verifique se o backend está rodando.");
    }
}

function renderizarUsuarios(listaUsuarios) {
    const tabela = document.getElementById("tabela-usuarios");

    if (!tabela) return;

    tabela.innerHTML = "";

    if (listaUsuarios.length === 0) {
        tabela.innerHTML = `
            <tr>
                <td colspan="7">Nenhum usuário cadastrado.</td>
            </tr>
        `;
        return;
    }

    listaUsuarios.forEach((usuario, index) => {
        tabela.innerHTML += `
            <tr>
                <td>#${index + 1}</td>
                <td>${usuario.nome}</td>
                <td>${usuario.email}</td>
                <td>${usuario.telefone}</td>
                <td>${usuario.matricula}</td>
                <td>
                    <span class="status ${usuario.status}">
                        ${usuario.status}
                    </span>
                </td>
                <td class="acoes">
                    <button class="btn-action edit" onclick="editarUsuario('${usuario._id}')">
                        <i class="fa-solid fa-pen"></i>
                    </button>

                    <button class="btn-action delete" onclick="deletarUsuario('${usuario._id}')">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </td>
            </tr>
        `;
    });
}

function atualizarCardsUsuarios(listaUsuarios) {
    const totalUsuarios = document.getElementById("total-usuarios");
    const usuariosAtivos = document.getElementById("usuarios-ativos");
    const usuariosInativos = document.getElementById("usuarios-inativos");

    const total = listaUsuarios.length;
    const ativos = listaUsuarios.filter(usuario => usuario.status === "ativo").length;
    const inativos = listaUsuarios.filter(usuario => usuario.status === "inativo").length;

    if (totalUsuarios) totalUsuarios.textContent = total;
    if (usuariosAtivos) usuariosAtivos.textContent = ativos;
    if (usuariosInativos) usuariosInativos.textContent = inativos;
}

function abrirModalUsuario() {
    document.getElementById("modal-usuario").classList.add("active");
    document.querySelector("#modal-usuario .modal-header h2").textContent = "Cadastrar Usuário";
    document.getElementById("form-usuario").reset();
    document.getElementById("usuario-id").value = "";
}

function fecharModalUsuario() {
    document.getElementById("modal-usuario").classList.remove("active");
}

async function salvarUsuario(event) {
    event.preventDefault();

    const id = document.getElementById("usuario-id").value;

    const usuario = {
        nome: document.getElementById("nome").value,
        email: document.getElementById("email").value,
        telefone: document.getElementById("telefone").value,
        matricula: document.getElementById("matricula").value,
        status: document.getElementById("status").value
    };

    try {
        if (id) {
            await fetch(`${API_URL_USUARIOS}/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(usuario)
            });
        } else {
            await fetch(API_URL_USUARIOS, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(usuario)
            });
        }

        fecharModalUsuario();
        carregarUsuarios();
    } catch (error) {
        console.error("Erro ao salvar usuário:", error);
        alert("Erro ao salvar usuário.");
    }
}

function editarUsuario(id) {
    const usuario = usuarios.find(usuario => usuario._id === id);

    if (!usuario) return;

    document.getElementById("usuario-id").value = usuario._id;
    document.getElementById("nome").value = usuario.nome;
    document.getElementById("email").value = usuario.email;
    document.getElementById("telefone").value = usuario.telefone;
    document.getElementById("matricula").value = usuario.matricula;
    document.getElementById("status").value = usuario.status;

    document.querySelector("#modal-usuario .modal-header h2").textContent = "Editar Usuário";
    document.getElementById("modal-usuario").classList.add("active");
}

async function deletarUsuario(id) {
    const confirmar = confirm("Tem certeza que deseja excluir este usuário?");

    if (!confirmar) return;

    try {
        await fetch(`${API_URL_USUARIOS}/${id}`, {
            method: "DELETE"
        });

        carregarUsuarios();
    } catch (error) {
        console.error("Erro ao deletar usuário:", error);
        alert("Erro ao deletar usuário.");
    }
}

function filtrarUsuarios() {
    const termo = document.getElementById("buscar-usuario").value.toLowerCase();
    const status = document.getElementById("filtro-status").value;

    const usuariosFiltrados = usuarios.filter(usuario => {
        const correspondeBusca =
            usuario.nome.toLowerCase().includes(termo) ||
            usuario.email.toLowerCase().includes(termo) ||
            usuario.telefone.toLowerCase().includes(termo) ||
            usuario.matricula.toLowerCase().includes(termo);

        const correspondeStatus = status === "" || usuario.status === status;

        return correspondeBusca && correspondeStatus;
    });

    renderizarUsuarios(usuariosFiltrados);
}