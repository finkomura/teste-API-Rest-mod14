/// <reference types="cypress" />

describe('login - testes da API ServeRest', () => {
    it('Deve fazer login com sucesso', () => {
        cy.request({
            method:'POST',
            url:'http://localhost:3000/login',
            body: { 
            "email": "dalvinha@qa.com.br",
            "password": "teste"
            }
    
        }).then((response) => {
            expect(response.status).to.equal(200)
            expect(response.body.message).to.equal('Login realizado com sucesso')
            cy.log(response.body.authorization)
        })
    });
});