const resourcePostTemplate = document.createElement("template");
resourcePostTemplate.innerHTML = `
  <link href="/css/bootstrap.min.css" rel="stylesheet" />
  <link href="/css/bootstrap-responsive.min.css" rel="stylesheet" />
  <link href="/css/theme.css" rel="stylesheet" />
  <link href="/css/resource-style.css" rel="stylesheet" />
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
    integrity="sha512-SfTiTlX6kk+qitfevl/7LibUOeJWlt9rbyDn92a1DqWOw9vWG2MFoays0sgObmWazO5BQPiFucnnEAjpAB+/Sw=="
    crossorigin="anonymous"
    referrerpolicy="no-referrer"
  />

  <div class="resource-container">
    <div class="resource-description-container">
      <div>
        <h3><a href="" target="_blank" class="resource-title"></a></h3>

        <div class="media">
          <div class="resource-date-container">
            <i class="fa fa-calendar-o" aria-hidden="true"></i>
            <p class="resource-date"></p>
          </div>

          <div class="resource-author-container">
            <i class="fa fa-user-o" aria-hidden="true"></i>
            <p class="author-names"></p>
          </div>
        </div>

        <p class="resource-preview"></p>
      </div>
      
      <a href="" target="_blank" class="btn btn-info read-more-btn"></a>
    </div>

    <div class="resource-image-container">
      <img src="" alt="" class="resource-image"/>
    </div>
  </div>
`;

class ResourcePost extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(resourcePostTemplate.content.cloneNode(true));
  }

  setDescriptionOrPreview(description) {
    if (description) {
      this.shadowRoot.querySelector(".resource-preview").innerHTML =
        description;
    }
  }

  setDate(date) {
    if (date) {
      this.shadowRoot.querySelector(".resource-date").innerHTML = date;
    }
  }

  setImage(image, alt) {
    if (image) {
      const imageNode = this.shadowRoot.querySelector(".resource-image");
      imageNode.src = image;
      imageNode.alt = alt;
    }
  }

  setLink(link) {
    if (link) {
      this.shadowRoot.querySelector(".resource-title").href = link;
      this.shadowRoot.querySelector(".read-more-btn").href = link;
    }
  }

  setAuthor(author) {
    if (author) {
      this.shadowRoot.querySelector(".author-names").innerHTML = author;
    }
  }

  setTitle(title) {
    if (title) {
      this.shadowRoot.querySelector(".resource-title").innerHTML = title;
    }
  }

  renderSlide({ date, image, link, title }) {
    // for slides, there is no description and authors
    this.setTitle(title);
    this.setImage(image, title);
    this.setDate(date);
    this.setLink(link);

    this.shadowRoot.querySelector(".read-more-btn").innerHTML = "View Slides";
    this.shadowRoot.querySelector(".resource-author-container").remove();
  }

  renderVideo({ description, link, title }) {
    // for videos, there is no authors and the video should be in an iframe
    this.setTitle(title);
    this.setLink(link);
    this.setDescriptionOrPreview(description);

    // replace the img tag with the video iframe tag
    const resourceImageClass = "resource-image";
    const resourceImageContainer = this.shadowRoot.querySelector(
      ".resource-image-container"
    );
    const resourceImageNode = this.shadowRoot.querySelector(
      `.${resourceImageClass}`
    );
    resourceImageNode.remove();

    const iframeHtml = `
      <iframe
        class="${resourceImageClass}"
        width="100%"
        height="100%"
        allow="fullscreen;"
        src="${link}"
      ></iframe>
    `;
    resourceImageContainer.insertAdjacentHTML("beforeend", iframeHtml);

    // clean up
    this.shadowRoot.querySelector(".read-more-btn").innerHTML =
      "Open Video in New Tab";
    this.shadowRoot.querySelector(".resource-author-container").remove();
    this.shadowRoot.querySelector(".resource-date-container").remove();
  }

  renderBlogPost({ date, title, link, author, image }) {
    this.setDate(date);
    this.setTitle(title);
    this.setLink(link);
    this.setImage(image, title);
    this.setAuthor(author);

    this.shadowRoot.querySelector(".read-more-btn").innerHTML = "Read Post";
  }

  renderUndergradProject({ date, title, slideLink, reportLink, image }) {
    this.setDate(date);
    this.setTitle(title);
    this.setImage(image, title);

    if (Boolean(slideLink)) {
      // if slide link exists, we want to have two buttons
      this.setLink(slideLink);
      this.shadowRoot.querySelector(".read-more-btn").innerHTML = "View Slides";
    } else {
      // remove the previously exising button as declared in the template
      this.shadowRoot.querySelector(".read-more-btn").remove();
    }

    if (Boolean(reportLink)) {
      // create the new button
      const viewReportButton = `
      <a href="${reportLink}" target="_blank" class="btn btn-info read-more-btn">View Report</a>
      `;

      this.shadowRoot
        .querySelector(".resource-description-container")
        .insertAdjacentHTML("beforeend", viewReportButton);

      // if slide link is missing, update title link with report link
      if (!Boolean(slideLink)) {
        this.setLink(reportLink);
      }
    }

    this.shadowRoot.querySelector(".resource-author-container").remove();
  }

  renderContent(context, data) {
    if (!Boolean(context)) return;

    if (context === "blog") {
      this.renderBlogPost(data);
    } else if (context === "slide") {
      this.renderSlide(data);
    } else if (context === "video") {
      this.renderVideo(data);
    } else if (context === "undergrad-project") {
      this.renderUndergradProject(data);
    }
  }

  connectedCallback() {
    // will be one of ["blog", "slide", "video", "undergrad-project"]
    const context = this.getAttribute("context");

    // the rest will be passed as props
    const date = this.getAttribute("date");
    const title = this.getAttribute("title");
    const link = this.getAttribute("link");
    const slideLink = this.getAttribute("slide-link");
    const reportLink = this.getAttribute("report-link");
    const author = this.getAttribute("author");
    const image = this.getAttribute("image");
    const description = this.getAttribute("description");

    this.renderContent(context, {
      date,
      title,
      link,
      slideLink,
      reportLink,
      author,
      image,
      description,
    });
  }
}

window.customElements.define("resource-post", ResourcePost);
