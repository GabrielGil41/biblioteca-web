const usuarioService = require("../src/services/usuarioService");
const Usuario = require("../src/models/usuarioModel");

jest.mock("../src/models/usuarioModel");

describe("Usuario Service", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("deve listar todos os usuários com sucesso", async () => {
        const usuariosMock = [
            {
                nome: "Gabriel Freitas",
                email: "gabriel@email.com",
                status: "ativo"
            }
        ];

        Usuario.find.mockResolvedValue(usuariosMock);

        const resultado = await usuarioService.listarUsuarios();

        expect(resultado).toEqual(usuariosMock);
        expect(Usuario.find).toHaveBeenCalledTimes(1);
    });

    test("deve criar um usuário com sucesso", async () => {
        const usuarioMock = {
            nome: "Gabriel Freitas",
            email: "gabriel@email.com",
            telefone: "(31) 9 9999-9999",
            cpf: "123.456.789-00",
            matricula: "MAT-001",
            curso: "Ciência da Computação",
            status: "ativo",
            endereco: {
                cep: "32000-000",
                rua: "Rua das Flores",
                numero: "150",
                complemento: "Apartamento 201",
                bairro: "Centro",
                cidade: "Belo Horizonte",
                estado: "MG"
            },
            unidadeRetirada: "Unidade Centro",
            unidadeDevolucao: "Unidade Pampulha"
        };

        Usuario.create.mockResolvedValue(usuarioMock);

        const resultado = await usuarioService.criarUsuario(usuarioMock);

        expect(resultado).toEqual(usuarioMock);
        expect(Usuario.create).toHaveBeenCalledWith(usuarioMock);
    });

    test("deve buscar usuário por ID com sucesso", async () => {
        const usuarioMock = {
            _id: "123",
            nome: "Gabriel Freitas"
        };

        Usuario.findById.mockResolvedValue(usuarioMock);

        const resultado = await usuarioService.buscarUsuarioPorId("123");

        expect(resultado).toEqual(usuarioMock);
        expect(Usuario.findById).toHaveBeenCalledWith("123");
    });

    test("deve retornar null ao buscar usuário inexistente", async () => {
        Usuario.findById.mockResolvedValue(null);

        const resultado = await usuarioService.buscarUsuarioPorId("999");

        expect(resultado).toBeNull();
        expect(Usuario.findById).toHaveBeenCalledWith("999");
    });
});