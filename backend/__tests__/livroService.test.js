const livroService = require("../src/services/livroService");
const Livro = require("../src/models/livroModel");

jest.mock("../src/models/livroModel");

describe("Livro Service", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("deve listar todos os livros com sucesso", async () => {
        const livrosMock = [
            {
                titulo: "Dom Casmurro",
                autor: "Machado de Assis",
                status: "Disponível"
            }
        ];

        Livro.find.mockResolvedValue(livrosMock);

        const resultado = await livroService.listarLivros();

        expect(resultado).toEqual(livrosMock);
        expect(Livro.find).toHaveBeenCalledTimes(1);
    });

    test("deve criar um livro com sucesso", async () => {
        const livroMock = {
            titulo: "Dom Casmurro",
            autor: "Machado de Assis",
            editora: "Companhia das Letras",
            edicao: "1ª edição",
            isbn: "978-8-5359-0277-0",
            idioma: "Português",
            genero: "Romance",
            categoria: "Literatura Brasileira",
            localizacaoFisica: "Estante A - Prateleira 3",
            status: "Disponível"
        };

        Livro.create.mockResolvedValue(livroMock);

        const resultado = await livroService.criarLivro(livroMock);

        expect(resultado).toEqual(livroMock);
        expect(Livro.create).toHaveBeenCalledWith(livroMock);
    });

    test("deve buscar livro por ID com sucesso", async () => {
        const livroMock = {
            _id: "123",
            titulo: "Dom Casmurro"
        };

        Livro.findById.mockResolvedValue(livroMock);

        const resultado = await livroService.buscarLivroPorId("123");

        expect(resultado).toEqual(livroMock);
        expect(Livro.findById).toHaveBeenCalledWith("123");
    });

    test("deve retornar null ao buscar livro inexistente", async () => {
        Livro.findById.mockResolvedValue(null);

        const resultado = await livroService.buscarLivroPorId("999");

        expect(resultado).toBeNull();
        expect(Livro.findById).toHaveBeenCalledWith("999");
    });
});