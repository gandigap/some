describe('Form page', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:6969/forms');
  });

  it('Text h1 contains the correct text', () => {
    cy.getByData('header').contains('Forms');
  });

  it('Form render', () => {
    cy.get('[name="firstName"]')
      .should('have.value', '')
      .should('have.attr', 'placeholder', 'John');
    cy.get('[name="lastName"]').should('have.value', '').should('have.attr', 'placeholder', 'Doe');
    cy.get('[name="date"]').should('have.value', '');
    cy.get('[name="country"]').should('have.value', null).contains('Choose your country');
    cy.get('[name="gender"]').eq(0).should('have.value', 'male').should('not.be.selected');
    cy.get('[name="gender"]').eq(1).should('have.value', 'female').should('not.be.selected');
    cy.get('[name="gender"]').eq(2).should('have.value', 'other').should('not.be.selected');
    cy.getByData('file').should('have.value', '');
    cy.get('[name="agreement"]').should('have.value', 'on').should('not.be.checked');
  });

  it('Form success submit and saved', () => {
    cy.get('[name="firstName"]').type('Asd');
    cy.get('[name="lastName"]').type('Qwe');
    cy.get('[name="date"]').type('2002-01-01');
    cy.get('[name="country"]').select('Russia');
    cy.get('[name="gender"]').eq(0).check();
    cy.getByData('file').selectFile({
      contents: Cypress.Buffer.from('image'),
      fileName: 'file.jpeg',
      lastModified: Date.now(),
    });
    cy.get('[name="agreement"]').check();
    cy.get('[type="submit"]').click();
    cy.getByData('status-message').should('have.text', 'Form data was saved');
    cy.getByData('form-cards').should('have.length', 1);
    cy.contains('About').click();
    cy.getByData('header').contains('About');
    cy.contains('Forms').click();
    cy.getByData('header').contains('Forms');
    cy.getByData('form-cards').should('have.length', 1);
  });

  it('Form incorrect ', () => {
    cy.get('[type="submit"]').click();
    cy.getByData('form-error-message').first().should('have.text', 'Field cannot be empty');
    cy.get('[name="firstName"]').type('a');
    cy.get('[type="submit"]').click();
    cy.getByData('form-error-message').first().should('have.text', 'First letter must be capital');
    cy.get('[name="firstName"]').clear();
    cy.get('[name="firstName"]').type('Asd');
    cy.get('[type="submit"]').click();
    cy.getByData('form-error-message').first().should('have.text', 'Field cannot be empty');
    cy.get('[name="lastName"]').type('a');
    cy.get('[type="submit"]').click();
    cy.getByData('form-error-message').first().should('have.text', 'First letter must be capital');
    cy.get('[name="lastName"]').clear();
    cy.get('[name="lastName"]').type('Qwe');
    cy.get('[type="submit"]').click();
  });
});
