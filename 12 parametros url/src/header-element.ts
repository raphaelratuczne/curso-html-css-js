class Header extends HTMLElement {
  static observedAttributes = ["total-count"];

  constructor() {
    super();
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
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

customElements.define("header-element", Header);
