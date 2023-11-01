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
            //expect(response.body.produtos[1].nome).to.equal('Logitech MX Vertical')
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
    it('fazer o cadastro com comando customizado', () => {
        cy.cadastrarProduto(token, "produtinho 1123", 300, "produto criado para teste", 25)
            .then((response) => {
                expect(response.status).to.equal(400)
                expect(response.body.message).to.equal('Já existe produto com esse nome')
            })
    })
    it('deve pegar o id de um produto cadastrado', () => {
        cy.request('produtos').then((response) => {
            // cy.log(response.body.produtos[0]._id)
            let id = response.body.produtos[0]._id;
            let nome = response.body.produtos[0].nome;
            cy.request({
                method: 'PUT',
                url: `produtos/${id}`,
                headers: { authorization: token },
                body:
                {
                    "nome": nome,
                    "preco": 470,
                    "descricao": "Mouse",
                    "quantidade": 381,
                }
            })
        });
    });
    it('deve editar um produto cadastrado previamente', () => {
        let produto = `Produto EBAC ${Math.floor(Math.random() * 1000000)}`
        cy.cadastrarProduto(token, produto, 250, 'descricao do produto novo', 190)
        .then(response => {
            let id = response.body._id

            cy.request({
                method: 'PUT',
                url:`produtos/${id}`,
                failOnStatusCode: false,
                headers: {authorization: token},
                body:{
                    "nome": produto,
                    "preco": 280,
                    "descricao": "descricao do produto novo",
                    "quantidade": 190,
                }
            }).then(response =>{
                expect(response.body.message).to.equal('Registro alterado com sucesso')
            })
        });
    });
    it('deve editar um produto cadastrado previamente', () => {
        let produto = `Produto EBAC ${Math.floor(Math.random() * 1000000)}`
        cy.cadastrarProduto(token, produto, 250, 'descricao do produto novo', 190)
        .then(response => {
            let id = response.body._id

            cy.request({
                method: 'DELETE',
                url:`produtos/${id}`,
                failOnStatusCode: false,
                headers: {authorization: token},
            }).then(response =>{
                expect(response.body.message).to.equal('Registro excluído com sucesso')
            })
        });
    });
});
