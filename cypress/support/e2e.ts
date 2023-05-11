import '@cypress/code-coverage/support';
import './commands';

afterEach(() => {
  cy.window().trigger('unload');
});
