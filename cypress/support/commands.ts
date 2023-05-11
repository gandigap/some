Cypress.Commands.add('getByData', (selector) => cy.get(`[data-cy=${selector}]`));
