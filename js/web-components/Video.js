/**
 * The purpose of this file is to have a reusable
 * video component to embed videos in html pages
 */

const videoTemplate = document.createElement("template");
videoTemplate.innerHTML = `
  <link href="/css/video_style.css" rel="stylesheet" />

  <div class="video-container">
    <p class="video_title"></p>
    <p class="video_description"></p>
    <iframe
      class="video_link"
      width="100%"
      height="100%"
      allow="fullscreen;"
      src=""
    >
    </iframe>
  </div>
`;

class Video extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(videoTemplate.content.cloneNode(true));
  }

  connectedCallback() {
    const videoLink = this.getAttribute("video_link");
    const videoTitle = this.getAttribute("video_title");
    const videoDescription = this.getAttribute("video_description");

    if (videoLink) {
      this.shadowRoot.querySelector(".video_link").src = videoLink;
    }

    if (videoTitle) {
      this.shadowRoot.querySelector(".video_title").innerHTML = videoTitle;
    }

    if (videoDescription) {
      this.shadowRoot.querySelector(".video_description").innerHTML =
        videoDescription;
    }
  }
}

window.customElements.define("video-element", Video);
