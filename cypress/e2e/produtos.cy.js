/// <reference types="cypress"/>

describe('Testes de funcionalidade de produtos', () => {
    it.only('Listar produtos', () => {
        cy.request({
            method:'GET',
            url: 'http://localhost:3000/produtos'
        }).then((response) => {
           expect(response.body.produtos[1]. nome).to.equal('Logitech MX Vertical')
           expect(response.status).to .equal(200)
           expect(response.body).to.have.property('produtos')
           expect(response.duration).to.be.lessThan(20)
        })
    });
    it('cadastrar produto', () => {
         cy.request({
            method: 'POST',
            url:"produtos",
            body: {
                "nome":"produto produtivo",
                "preco": 200,
                "descricao": "produto novo",
                "quantidade":100
            },
            headers:{Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRhbHZpbmhhQHFhLmNvbS5iciIsInBhc3N3b3JkIjoidGVzdGUiLCJpYXQiOjE2OTg1MjI5NDcsImV4cCI6MTY5ODUyMzU0N30.b5hNdm_UUgXERzmzXTxXrEhm7kQhC0-E1zUcoIVjQa8"}
        }).then((response)=>{
            expect(ressponse.status).to.equal(200)
            expect(ressponse.body.message).to.equal('Cadastro realizadocom sucesso')
            
        })
    });
});