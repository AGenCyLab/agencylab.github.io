function renderHeading(elementTag, text, targetParentNode) {
  const heading = document.createElement(elementTag);
  heading.innerHTML = text;
  targetParentNode.appendChild(heading);
}

function renderSlideData(slideData) {
  // slideData is an array of objects, each object representing a semester worth
  // of slide data
  const slideTargetDiv = document.querySelector("#slide-contents");
  renderHeading("h2", "Reading Group Presentation Slides", slideTargetDiv);

  slideData.forEach(({ semester, slides }) => {
    renderHeading("h4", semester, slideTargetDiv);

    slides.forEach(({ date, image, link, title }) => {
      const html = `
        <resource-post
          context="slide"
          date="${formatDate(date)}"
          image="${image}"
          title="${title}"
          link="${link}"
        ></resource-post>
      `;

      slideTargetDiv.insertAdjacentHTML("beforeend", html);
    });
  });
}

function renderVideoData(videoData) {
  const videoTargetDiv = document.querySelector("#video-contents");
  renderHeading("h2", "Presentation Videos", videoTargetDiv);

  videoData.forEach(({ semester, videos }) => {
    renderHeading("h4", semester, videoTargetDiv);

    videos.forEach(({ description, link, title }) => {
      const html = `
        <resource-post
          context="video"
          description="${description}"
          title="${title}"
          link="${link}"
        ></resource-post>
      `;

      videoTargetDiv.insertAdjacentHTML("beforeend", html);
    });
  });
}

function renderBlogPost(blogPostData) {}

fetch("/data/resources.json")
  .then((response) => response.json())
  .then(({ slideData, videoData, blogPostData }) => {
    renderSlideData(slideData);
    renderVideoData(videoData);
    renderBlogPost(blogPostData);
  })
  .catch((error) => console.log(error));
