const otherNewsTemplate = document.createElement("template");
otherNewsTemplate.innerHTML = `
  <link href="/css/theme.css" rel="stylesheet" />
  <link href="/css/news_style.css" rel="stylesheet" />

  <div class="other-container">
    <h5><span class="date other-date"></span></h5>
    <p class="other-description"></p>
  </div>
`;

class OtherNews extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(otherNewsTemplate.content.cloneNode(true));
  }

  connectedCallback() {
    const otherDate = this.getAttribute("date");
    const otherDescription = this.getAttribute("description");

    if (otherDate) {
      this.shadowRoot.querySelector(".other-date").innerHTML = otherDate;
    }

    if (otherDescription) {
      this.shadowRoot.querySelector(".other-description").innerHTML =
        otherDescription;
    }
  }
}

window.customElements.define("other-news", OtherNews);
