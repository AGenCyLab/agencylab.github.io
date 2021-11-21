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
    <h1 class="news-title"></h1>
    <div class="news-date-container">
      <i class="fa fa-calendar-o" aria-hidden="true"></i>
      <p class="news-date"></p>
    </div>
    <button class="copy-news-link-button">Share News Link</button>
    <div class="news-image-container">
      <img class="news-image" src="" />
      <em class="news-image-caption"></em>
    </div>
    <div class="news-body"></div>
  </div>
`;

class NewsDetails extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(newsDetailsTemplate.content.cloneNode(true));
  }

  setNewsTitle(title) {
    if (title) {
      this.shadowRoot.querySelector(".news-title").innerHTML = title;
    }
  }

  setNewsDate(date) {
    if (date) {
      this.shadowRoot
        .querySelector(".news-date")
        .insertAdjacentText("beforeend", date);
    }
  }

  setNewsImage(imageSrc) {
    if (imageSrc) {
      this.shadowRoot.querySelector(".news-image").src = imageSrc;
    }
  }

  setNewsImageCaption(imageCaption) {
    if (imageCaption) {
      this.shadowRoot.querySelector(".news-image-caption").innerHTML =
        imageCaption;
    }
  }

  setNewsDescription(description) {
    if (description) {
      this.shadowRoot.querySelector(".news-body").innerHTML = description;
    }
  }

  connectedCallback() {
    const newsTitle = this.getAttribute("title");
    const newsDate = this.getAttribute("date");
    const newsImageSrc = this.getAttribute("image");
    const newsImageCaption = this.getAttribute("image-caption");
    const newsDescription = this.getAttribute("description");

    this.setNewsTitle(newsTitle);
    this.setNewsDate(newsDate);
    this.setNewsImage(newsImageSrc);
    this.setNewsImageCaption(newsImageCaption);
    this.setNewsDescription(newsDescription);

    const disabledDuration = 60 * 1000; // 60 seconds

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
      }, disabledDuration);
    });
  }
}

window.customElements.define("news-details", NewsDetails);
