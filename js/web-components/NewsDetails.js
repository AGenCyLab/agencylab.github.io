const newsDetailsTemplate = document.createElement("template");
newsDetailsTemplate.innerHTML = `
  <link href="/css/theme.css" rel="stylesheet" />
  <link href="/css/news-details-style.css" rel="stylesheet" />
  <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
      integrity="sha512-SfTiTlX6kk+qitfevl/7LibUOeJWlt9rbyDn92a1DqWOw9vWG2MFoays0sgObmWazO5BQPiFucnnEAjpAB+/Sw=="
      crossorigin="anonymous"
      referrerpolicy="no-referrer"
  ></link>

  <div class="news-container">
    <h1 class="news-title">
      <slot name="news-title"></slot>
    </h1>
    <div class="news-date-container">
      <i class="fa fa-calendar-o" aria-hidden="true"></i>
      <p class="news-date">
        <slot name="news-date"></slot>
      </p>
    </div>
    <button class="copy-news-link-button">Share News Link</button>
    <div class="news-image-container">
      <slot name="news-image"></slot>
      <em class="news-image-caption">
        <slot name="news-image-caption">
        </slot>
      </em>
    </div>
    <p class="news-body">
      <slot name="news-body"></slot>
    </p>
  </div>
`;

class NewsDetails extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(newsDetailsTemplate.content.cloneNode(true));
  }

  setNewsDate(date) {
    if (date) {
      const dateNode = this.shadowRoot.querySelector(".news-date");
      dateNode.innerHTML = formatDate(date);
    }
  }

  connectedCallback() {
    const newsDate = this.getAttribute("date");
    this.setNewsDate(newsDate);

    const copyNewsLinkButton = this.shadowRoot.querySelector(
      ".copy-news-link-button"
    );

    copyNewsLinkButton.addEventListener("click", function (event) {
      navigator.clipboard.writeText(window.location.href);
      copyNewsLinkButton.innerHTML = "Link Copied!";
      copyNewsLinkButton.disabled = true;

      setTimeout(() => {
        copyNewsLinkButton.innerHTML = "Share News Link";
        copyNewsLinkButton.disabled = false;
      }, 10 * 1000);
    });
  }
}

window.customElements.define("news-details", NewsDetails);
