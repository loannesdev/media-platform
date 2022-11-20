import { credentials, url } from "../fixtures/vite.json";

it("Simple user log in", () => {
  cy.visit(url.preview);
  cy.wait(1000);

  cy.get("main>article:nth-child(4)").click();
  cy.get("button").contains("iniciar sesión", { matchCase: false }).click();
  cy.get("input[type='email']").type(credentials.email);
  cy.get("input[type='password']").type(credentials.password);
  cy.get("button").contains("iniciar", { matchCase: false }).click();
  cy.get("header>section>article:nth-child(1)>span").should("be.visible").contains(credentials.nickname);
  cy.get("header>section>article:nth-child(2)>button").click();
  cy.get("header>section>article:nth-child(2)>div").should("be.visible").contains("cerrar sesión", { matchCase: false }).click();
  cy.wait(500);

  cy.get("header>section").children().contains("registrarme", { matchCase: false }).should("be.visible");
  cy.get(".iziToast-wrapper").contains("sesión cerrada", { matchCase: false }).should("be.visible");
});
