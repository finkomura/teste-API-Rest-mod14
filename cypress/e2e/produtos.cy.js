/// <reference types="cypress"/>


describe('Testes de funcionalidade de produtos', () => {
    let token
    before(() => {
        cy.token('dalvinha@qa.com.br', 'teste').then(tkn => { token = tkn })
    });
    it('Listar produtos', () => {
        cy.request({
            method: 'GET',
            url: 'http://localhost:3000/produtos'
        }).then((response) => {
            expect(response.body.produtos[1].nome).to.equal('Logitech MX Vertical')
            expect(response.status).to.equal(200)
            expect(response.body).to.have.property('produtos')
            expect(response.duration).to.be.lessThan(20)
        })
    });
    it('cadastrar produto', () => {
        let produto = `produto Ebac ${Math.floor(Math.random() * 10000)}`
        cy.request({
            method: 'POST',
            url: "produtos",
            body: {
                "nome": produto,
                "preco": 200,
                "descricao": "produto novo",
                "quantidade": 100
            },
            headers: { Authorization: token }
        }).then((response) => {
            expect(response.status).to.equal(201)
            expect(response.body.message).to.equal('Cadastro realizado com sucesso')

        })
    });
    it('deve validar mensagem de erro ao cadastrar produto repetido', () => {
        cy.request({
            method: 'POST',
            url: "produtos",
            body: {
                "nome": "produto EBAC 5116",
                "preco": 200,
                "descricao": "produto novo",
                "quantidade": 100
            },
            failOnStatusCode: false,
            headers: { Authorization: token }
        }).then((response) => {
            expect(response.status).to.equal(400)
            expect(response.body.message).to.equal('Já existe produto com esse nome')
        })
    });
    it.only('fazer o cadastro com comando customizado', () => {
        cy.cadastrarProduto(token, "produtinho 1123", 300, "produto criado para teste",25)
            .then((response) => {
                expect(response.status).to.equal(400)
                expect(response.body.message).to.equal('Já existe produto com esse nome')
            })
    });
});