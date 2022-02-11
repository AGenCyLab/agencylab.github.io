function renderHeading(elementTag, elementId, text, targetParentNode) {
  const heading = document.createElement(elementTag);
  heading.innerHTML = text;
  heading.id = elementId;
  targetParentNode.appendChild(heading);
}

function renderSlideData(slideData) {
  // slideData is an array of objects, each object representing a semester worth
  // of slide data
  const slideTargetDiv = document.querySelector("#slide-contents");
  const sidebarTarget = document.querySelector(".nav-list");

  let id = "slides";
  renderHeading("h2", id, "Reading Group Presentation Slides", slideTargetDiv);
  let navigation = `
    <li>
      <a href="#${id}">Presentation Slides</a>
    </li>
  `;
  sidebarTarget.insertAdjacentHTML("beforeend", navigation);

  slideData.forEach(({ semester, slides }) => {
    id = `slides-${semester.toLowerCase().replace(/\s/g, "-")}`;
    renderHeading("h4", id, semester, slideTargetDiv);
    navigation = `
      <li>
        <a class="subhead" href="#${id}">${semester}</a>
      </li>
    `;
    sidebarTarget.insertAdjacentHTML("beforeend", navigation);

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
  const sidebarTarget = document.querySelector(".nav-list");

  let id = "videos";
  renderHeading("h2", id, "Presentation Videos", videoTargetDiv);
  let navigation = `
    <li>
      <a href="#${id}">Presentation Videos</a>
    </li>
  `;
  sidebarTarget.insertAdjacentHTML("beforeend", navigation);

  videoData.forEach(({ semester, videos }) => {
    id = `videos-${semester.toLowerCase().replace(/\s/g, "-")}`;
    renderHeading("h4", id, semester, videoTargetDiv);
    let navigation = `
      <li>
        <a class="subhead" href="#${id}">${semester}</a>
      </li>
    `;
    sidebarTarget.insertAdjacentHTML("beforeend", navigation);

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

function renderBlogPost(blogPostData) {
  // blogPostData is simply an array of objects, with no semester information,
  // so they should ideally just be rendered one after the another
  const blogPostTargetDiv = document.querySelector("#resource-contents");
  const sidebarTarget = document.querySelector(".nav-list");

  let id = "blogs";
  renderHeading("h2", "blogs", "Blog Posts", blogPostTargetDiv);
  let navigation = `
    <li>
      <a href="#${id}">Blog Posts</a>
    </li>
  `;
  sidebarTarget.insertAdjacentHTML("beforeend", navigation);

  blogPostData.forEach(({ date, title, link, author, image }) => {
    const html = `
      <resource-post
        context="blog"
        title="${title}"
        date="${formatDate(date)}"
        link="${link}"
        author="${author}"
        image="${image}"
      ></resource-post>
    `;

    blogPostTargetDiv.insertAdjacentHTML("beforeend", html);
  });
}

function renderUndergraduatePostData(undergraduatePostData) {
  const undergradProjectsTargetDiv = document.querySelector(
    "#undergrad-contents"
  );
  const sidebarTarget = document.querySelector(".nav-list");

  let id = "undergrad-projects";
  renderHeading("h2", id, "Undergraduate Projects", undergradProjectsTargetDiv);
  let navigation = `
    <li>
      <a href="#${id}">Undergraduate Projects</a>
    </li>
  `;
  sidebarTarget.insertAdjacentHTML("beforeend", navigation);

  undergraduatePostData.forEach(
    ({ date, title, image, slideLink, reportLink }) => {
      const html = `
        <resource-post
          context="undergrad-project"
          date="${formatDate(date)}"
          image="${image}"
          title="${title}"
          slide-link="${slideLink}"
          report-link="${reportLink}"
        ></resource-post>
      `;

      undergradProjectsTargetDiv.insertAdjacentHTML("beforeend", html);
    }
  );
}

fetch("/data/resources.json")
  .then((response) => response.json())
  .then(({ slideData, videoData, blogPostData, undergraduatePostData }) => {
    renderBlogPost(blogPostData);
    renderSlideData(slideData);
    renderVideoData(videoData);
    renderUndergraduatePostData(undergraduatePostData);

    // refresh scroll spy since we finished adding sidebar elements dynamically
    $(document.body).scrollspy("refresh");
  })
  .catch((error) => console.log(error));
