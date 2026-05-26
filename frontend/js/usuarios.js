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
    const campoTelefone = document.getElementById("telefone");
    const campoCPF = document.getElementById("cpf");
    const campoCEP = document.getElementById("cep");
    const campoNome = document.getElementById("nome");

    if (btnNovoUsuario) btnNovoUsuario.addEventListener("click", abrirModalUsuario);
    if (btnFecharModal) btnFecharModal.addEventListener("click", fecharModalUsuario);
    if (btnCancelar) btnCancelar.addEventListener("click", fecharModalUsuario);
    if (formUsuario) formUsuario.addEventListener("submit", salvarUsuario);
    if (campoBusca) campoBusca.addEventListener("keyup", filtrarUsuarios);
    if (filtroStatus) filtroStatus.addEventListener("change", filtrarUsuarios);
    if (campoTelefone) campoTelefone.addEventListener("input", formatarTelefone);
    if (campoCPF) campoCPF.addEventListener("input", formatarCPF);
    if (campoCEP) campoCEP.addEventListener("input", formatarCEP);
    if (campoCEP) campoCEP.addEventListener("blur", buscarEnderecoPorCEP);

    if (campoNome) {
        campoNome.addEventListener("input", () => {
            campoNome.value = campoNome.value.replace(/[0-9]/g, "");
        });
    }
});

async function carregarUsuarios() {
    try {
        const resposta = await fetch(API_URL_USUARIOS);

        if (!resposta.ok) {
            throw new Error("Erro ao buscar usuários");
        }

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
                <td colspan="10">Nenhum usuário cadastrado.</td>
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
                <td>${usuario.cpf || "-"}</td>
                <td>${usuario.matricula}</td>
                <td>${usuario.curso || "-"}</td>
                <td>${usuario.unidadeRetirada || "-"}</td>
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

function gerarProximaMatricula() {
    if (usuarios.length === 0) {
        return "MAT-001";
    }

    const numeros = usuarios.map(usuario => {
        const apenasNumeros = String(usuario.matricula).replace(/\D/g, "");
        return Number(apenasNumeros);
    });

    const maiorNumero = Math.max(...numeros);

    const proximoNumero = maiorNumero + 1;

    return `MAT-${String(proximoNumero).padStart(3, "0")}`;
}

function abrirModalUsuario() {
    document.getElementById("modal-usuario").classList.add("active");
    document.querySelector("#modal-usuario .modal-header h2").textContent = "Cadastrar Usuário";
    document.getElementById("form-usuario").reset();
    document.getElementById("usuario-id").value = "";

    const campoMatricula = document.getElementById("matricula");

    if (campoMatricula) {
        campoMatricula.value = gerarProximaMatricula();
        campoMatricula.readOnly = true;
    }
}

function fecharModalUsuario() {
    document.getElementById("modal-usuario").classList.remove("active");
}

async function salvarUsuario(event) {
    event.preventDefault();

    const id = document.getElementById("usuario-id").value;

    const nome = document.getElementById("nome").value.trim();
    const telefone = document.getElementById("telefone").value;
    const cpf = document.getElementById("cpf").value;
    const cep = document.getElementById("cep").value;

    const telefoneLimpo = telefone.replace(/\D/g, "");
    const cpfLimpo = cpf.replace(/\D/g, "");
    const cepLimpo = cep.replace(/\D/g, "");

    if (/\d/.test(nome)) {
        alert("O nome não pode conter números.");
        return;
    }

    if (telefoneLimpo.length !== 11) {
        alert("O telefone deve conter 11 dígitos. Exemplo: (31) 9 9999-9999");
        return;
    }

    if (!validarCPF(cpfLimpo)) {
        alert("CPF inválido.");
        return;
    }

    if (cepLimpo.length !== 8) {
        alert("O CEP deve conter 8 dígitos.");
        return;
    }

    const usuario = {
        nome,
        email: document.getElementById("email").value.trim(),
        telefone,
        cpf,
        matricula: document.getElementById("matricula").value,
        curso: document.getElementById("curso").value,
        status: document.getElementById("status").value,

        endereco: {
            cep,
            rua: document.getElementById("rua").value,
            numero: document.getElementById("numero").value,
            complemento: document.getElementById("complemento").value,
            bairro: document.getElementById("bairro").value,
            cidade: document.getElementById("cidade").value,
            estado: document.getElementById("estado").value
        },

        unidadeRetirada: document.getElementById("unidade-retirada").value,
        unidadeDevolucao: document.getElementById("unidade-devolucao").value
    };

    try {
        let resposta;

        if (id) {
            resposta = await fetch(`${API_URL_USUARIOS}/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(usuario)
            });
        } else {
            resposta = await fetch(API_URL_USUARIOS, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(usuario)
            });
        }

        if (!resposta.ok) {
            const erro = await resposta.json();
            throw new Error(erro.mensagem || "Erro ao salvar usuário");
        }

        fecharModalUsuario();
        carregarUsuarios();
    } catch (error) {
        console.error("Erro ao salvar usuário:", error);
        alert(error.message);
    }
}

function editarUsuario(id) {
    const usuario = usuarios.find(usuario => usuario._id === id);

    if (!usuario) return;

    document.getElementById("usuario-id").value = usuario._id;
    document.getElementById("nome").value = usuario.nome;
    document.getElementById("email").value = usuario.email;
    document.getElementById("telefone").value = usuario.telefone;
    document.getElementById("cpf").value = usuario.cpf || "";
    document.getElementById("matricula").value = usuario.matricula;
    document.getElementById("curso").value = usuario.curso || "";
    document.getElementById("status").value = usuario.status;

    document.getElementById("cep").value = usuario.endereco?.cep || "";
    document.getElementById("rua").value = usuario.endereco?.rua || "";
    document.getElementById("numero").value = usuario.endereco?.numero || "";
    document.getElementById("complemento").value = usuario.endereco?.complemento || "";
    document.getElementById("bairro").value = usuario.endereco?.bairro || "";
    document.getElementById("cidade").value = usuario.endereco?.cidade || "";
    document.getElementById("estado").value = usuario.endereco?.estado || "";

    document.getElementById("unidade-retirada").value = usuario.unidadeRetirada || "";
    document.getElementById("unidade-devolucao").value = usuario.unidadeDevolucao || "";

    document.getElementById("matricula").readOnly = true;

    document.querySelector("#modal-usuario .modal-header h2").textContent = "Editar Usuário";
    document.getElementById("modal-usuario").classList.add("active");
}

async function deletarUsuario(id) {
    const confirmar = confirm("Tem certeza que deseja excluir este usuário?");

    if (!confirmar) return;

    try {
        const resposta = await fetch(`${API_URL_USUARIOS}/${id}`, {
            method: "DELETE"
        });

        if (!resposta.ok) {
            throw new Error("Erro ao deletar usuário");
        }

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
            usuario.matricula.toLowerCase().includes(termo) ||
            (usuario.cpf || "").toLowerCase().includes(termo) ||
            (usuario.curso || "").toLowerCase().includes(termo);

        const correspondeStatus = status === "" || usuario.status === status;

        return correspondeBusca && correspondeStatus;
    });

    renderizarUsuarios(usuariosFiltrados);
}

function formatarTelefone(event) {
    let telefone = event.target.value.replace(/\D/g, "");

    telefone = telefone.substring(0, 11);

    if (telefone.length > 7) {
        telefone = telefone.replace(
            /^(\d{2})(\d{1})(\d{4})(\d{0,4}).*/,
            "($1) $2 $3-$4"
        );
    } else if (telefone.length > 3) {
        telefone = telefone.replace(
            /^(\d{2})(\d{1})(\d{0,4}).*/,
            "($1) $2 $3"
        );
    } else if (telefone.length > 2) {
        telefone = telefone.replace(
            /^(\d{2})(\d{0,1}).*/,
            "($1) $2"
        );
    } else if (telefone.length > 0) {
        telefone = telefone.replace(/^(\d*)/, "($1");
    }

    event.target.value = telefone;
}

function formatarCPF(event) {
    let cpf = event.target.value.replace(/\D/g, "");

    cpf = cpf.substring(0, 11);

    cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
    cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
    cpf = cpf.replace(/(\d{3})(\d{1,2})$/, "$1-$2");

    event.target.value = cpf;
}

function formatarCEP(event) {
    let cep = event.target.value.replace(/\D/g, "");

    cep = cep.substring(0, 8);

    cep = cep.replace(/(\d{5})(\d)/, "$1-$2");

    event.target.value = cep;
}

async function buscarEnderecoPorCEP() {
    const cep = document.getElementById("cep").value.replace(/\D/g, "");

    if (cep.length !== 8) return;

    try {
        const resposta = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const dados = await resposta.json();

        if (dados.erro) {
            alert("CEP não encontrado.");
            return;
        }

        document.getElementById("rua").value = dados.logradouro || "";
        document.getElementById("bairro").value = dados.bairro || "";
        document.getElementById("cidade").value = dados.localidade || "";
        document.getElementById("estado").value = dados.uf || "";
    } catch (error) {
        console.error("Erro ao buscar CEP:", error);
        alert("Erro ao buscar endereço pelo CEP.");
    }
}

function validarCPF(cpf) {
    cpf = cpf.replace(/\D/g, "");

    if (cpf.length !== 11) return false;
    if (/^(\d)\1+$/.test(cpf)) return false;

    let soma = 0;
    let resto;

    for (let i = 1; i <= 9; i++) {
        soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }

    resto = (soma * 10) % 11;

    if (resto === 10 || resto === 11) resto = 0;

    if (resto !== parseInt(cpf.substring(9, 10))) return false;

    soma = 0;

    for (let i = 1; i <= 10; i++) {
        soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }

    resto = (soma * 10) % 11;

    if (resto === 10 || resto === 11) resto = 0;

    if (resto !== parseInt(cpf.substring(10, 11))) return false;

    return true;
}