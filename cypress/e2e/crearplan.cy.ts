const EXISTING_USER = {
    email: "",  // no sabia que poner xd
    password: "",
  };
  
  function login() {
    cy.visit("/auth/login");
    cy.get("email").type(EXISTING_USER.email);
    cy.get("password").type(EXISTING_USER.password);
    cy.contains("button", "Iniciar sesión").click();
    cy.url().should("include", "/plans");
  }
  
  describe("Crear un plan", () => {
    beforeEach(() => {
      login();
    });
  
    it("Happy path", () => {
      const planName = `prueba ${Date.now()}`;
      cy.visit("/plans/new");
  
      cy.get("name").type(planName);
      cy.get("address").type("Gatitos");
      cy.get("estimatedPrice").type("65000");
      cy.get("estimatedTime").type("150");
      cy.get("description").type("Tarde de gatos");
      cy.get("recomendations").type("Llevar gatitos");
  
      cy.contains("button", "Publicar plan").click();
  
      cy.url().should("include", "/plans");
      cy.url().should("not.include", "/plans/new");
      cy.contains(planName).should("be.visible");
    });
  
    it("Path sad", () => {
      cy.visit("/plans/new");
  
      cy.get("name").type("A"); // muy corto
      cy.get("estimatedPrice").type("0"); // inválido
      cy.get("estimatedTime").type("120");
  
      cy.contains("button", "Publicar plan").click();
  
      cy.url().should("include", "/plans/new"); 
      cy.contains("Nombre no válido").should("be.visible");
      cy.contains("Precio no válido").should("be.visible");
    });
  });