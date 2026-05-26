const API_LIVROS = "http://localhost:3000/livros";
const API_USUARIOS = "http://localhost:3000/usuarios";
const API_EMPRESTIMOS = "http://localhost:3000/emprestimos";

document.addEventListener("DOMContentLoaded", () => {
    carregarDashboard();
});

async function carregarDashboard() {
    try {
        const [resLivros, resUsuarios, resEmprestimos] = await Promise.all([
            fetch(API_LIVROS),
            fetch(API_USUARIOS),
            fetch(API_EMPRESTIMOS)
        ]);

        if (!resLivros.ok || !resUsuarios.ok || !resEmprestimos.ok) {
            throw new Error("Erro ao buscar dados do dashboard");
        }

        const livros = await resLivros.json();
        const usuarios = await resUsuarios.json();
        const emprestimos = await resEmprestimos.json();

        atualizarCardsDashboard(livros, usuarios, emprestimos);
        renderizarUltimosEmprestimos(emprestimos);

    } catch (error) {
        console.error("Erro ao carregar dashboard:", error);
        alert("Erro ao carregar dados do dashboard.");
    }
}

function atualizarCardsDashboard(livros, usuarios, emprestimos) {
    const totalLivros = document.getElementById("total-livros");
    const totalUsuarios = document.getElementById("total-usuarios");
    const totalEmprestimos = document.getElementById("total-emprestimos");
    const devolucoesPendentes = document.getElementById("devolucoes-pendentes");

    const totalUsuariosSistema = usuarios.length;

    const emprestimosAtivos = emprestimos.filter(
        emprestimo => emprestimo.status === "emprestado"
    ).length;

    const pendentes = emprestimos.filter(
        emprestimo => emprestimo.status === "emprestado"
    ).length;

    if (totalLivros) {
        totalLivros.textContent = livros.length;
    }

    if (totalUsuarios) {
        totalUsuarios.textContent = totalUsuariosSistema;
    }

    if (totalEmprestimos) {
        totalEmprestimos.textContent = emprestimosAtivos;
    }

    if (devolucoesPendentes) {
        devolucoesPendentes.textContent = pendentes;
    }
}

function renderizarUltimosEmprestimos(emprestimos) {
    const tabela = document.getElementById("ultimos-emprestimos");

    if (!tabela) return;

    tabela.innerHTML = "";

    if (emprestimos.length === 0) {
        tabela.innerHTML = `
            <tr>
                <td colspan="5">Nenhum empréstimo cadastrado.</td>
            </tr>
        `;
        return;
    }

    const ultimosEmprestimos = emprestimos.slice(-5).reverse();

    ultimosEmprestimos.forEach((emprestimo, index) => {
        const nomeUsuario = emprestimo.usuario?.nome || "Usuário não encontrado";
        const tituloLivro = emprestimo.livro?.titulo || "Livro não encontrado";
        const data = formatarData(emprestimo.dataEmprestimo);

        tabela.innerHTML += `
            <tr>
                <td>#${index + 1}</td>
                <td>${nomeUsuario}</td>
                <td>${tituloLivro}</td>
                <td>${data}</td>
                <td>
                    <span class="status ${emprestimo.status}">
                        ${emprestimo.status}
                    </span>
                </td>
            </tr>
        `;
    });
}

function formatarData(data) {
    if (!data) return "-";

    return new Date(data).toLocaleDateString("pt-BR");
}