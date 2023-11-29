"use strict";
class Header extends HTMLElement {
    constructor() {
        super();
    }
    attributeChangedCallback(name, oldValue, newValue) {
        console.log(`name: ${name}, oldValue: ${oldValue}, newValue: ${newValue}`);
    }
    connectedCallback() {
        this.innerHTML = "";
        // const h1 = document.createElement("h1");
        // h1.textContent = this.getAttribute("text") || "Meu Header";
        // this.appendChild(h1);
        this.innerHTML = `
      <h1>${this.getAttribute("text") || "Meu Header"}</h1>
    `;
    }
}
Header.observedAttributes = ["total-count"];
customElements.define("header-element", Header);
