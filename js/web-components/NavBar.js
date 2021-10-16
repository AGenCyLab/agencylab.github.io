/**
 * The purpose of this file is to segregate the navbar into
 * a custom nav-bar component `<nav-bar>` so that it can be
 * reused in all pages without requiring to copy paste it
 *
 * Any styling and js that is needed for the navbar also stays
 * within this file so it is easier to make changes
 */

const template = document.createElement("template");
template.innerHTML = `
  <link href="css/bootstrap.min.css" rel="stylesheet" />
  <link href="css/bootstrap-responsive.min.css" rel="stylesheet" />
  <link href="css/theme.css" rel="stylesheet" />
  
  <div class="masthead">
    <div class="navbar">
      <div class="navbar-inner">
          <div class="container">
            <ul class="nav">
                <li><a href="index.html">Home</a></li>
                <li><a href="people.html">People</a></li>
                <li><a href="research.html">Research</a></li>
                <li><a href="publications.html">Publications</a></li>
                <li><a href="gallery.html">Gallery</a></li>
                <li><a href="news.html">News</a></li>
                <li><a href="teaching.html">Teaching</a></li>
                <li><a href="blog.html">Blog</a></li>
                <li><a href="contact.html">Contact</a></li>
            </ul>
          </div>
      </div>
    </div>
  </div>
`;

class NavBar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  /**
   * The method handles adding the `active` class to the navbar link
   * which corresponds to the currently opened webpage
   */
  setActiveClass() {
    const navbarUl = this.shadowRoot.querySelector(".nav");
    const navbarLinks = navbarUl.querySelectorAll("li");
    const currentLocation = location.href;

    for (let index = 0; index < navbarLinks.length; index++) {
      const anchorElement = navbarLinks[index].querySelector("a");
      if (anchorElement.href === currentLocation) {
        if (navbarLinks[index].classList.length === 0) {
          navbarLinks[index].className = "active";
        }
      }
    }
  }

  /**
   * The callbacks to execute whenever this component is used
   * in the DOM
   */
  connectedCallback() {
    this.setActiveClass();
  }
}

// create the custom nav-bar component which can be
// used as an html tag like: <nav-bar></nav-bar>
window.customElements.define("nav-bar", NavBar);
