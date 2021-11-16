const featuredNewsTemplate = document.createElement("template");
featuredNewsTemplate.innerHTML = `
  <link href="/css/theme.css" rel="stylesheet" />
  <link href="/css/news_style.css" rel="stylesheet" />

  <div class="feature-container">
    <div class="centered">
      <a href="news.html">
        <img class="news-content-img tall-image feature-img" src="" alt=""/>
      </a>
    </div>
    <h5><span class="date feature-date"></span></h5>
    <h4 class="feature-heading">
      <a href="" class="feature-title"></a>
    </h4>
    <hr />
    <p class="feature-description"></p>
  </div>
`;

class FeaturedNews extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(featuredNewsTemplate.content.cloneNode(true));
  }

  connectedCallback() {
    const featureDate = this.getAttribute("date");
    const featureTitle = this.getAttribute("title");
    const featureDescription = this.getAttribute("description");
    const featureImage = this.getAttribute("image");
    const featureLink = this.getAttribute("link");

    console.log("Inside component: ");
    console.table({
      featureDate,
      featureTitle,
      featureDescription,
      featureLink,
      featureImage,
    });

    // will be used to make the news shareable
    if (featureTitle && featureDate) {
      this.shadowRoot.querySelector(".feature-container").id =
        encodeURIComponent(featureDate + featureTitle);
    }

    if (featureDate) {
      this.shadowRoot.querySelector(".feature-date").innerHTML = featureDate;
    }

    if (featureTitle) {
      this.shadowRoot.querySelector(".feature-title").innerHTML = featureTitle;
    }

    if (featureDescription) {
      this.shadowRoot.querySelector(".feature-description").innerHTML =
        featureDescription;
    }

    if (featureImage) {
      this.shadowRoot.querySelector(".feature-img").src = featureImage;
    }

    if (featureLink) {
      this.shadowRoot.querySelector(".feature-title").href = featureLink;
    }
  }
}

window.customElements.define("featured-news", FeaturedNews);
