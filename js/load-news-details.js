function loadNewsDetails() {
  let newsId = document.location.hash;

  if (!Boolean(newsId)) {
    window.location.href = "404.html";
    return;
  }

  newsId = newsId.slice(1); // discard the # itself

  fetch("/data/news.json")
    .then((response) => response.json())
    .then(({ news }) => {
      // find out the news with id fields
      const newsWithIds = news.filter((news) => typeof news.id !== "undefined");
      const newsWithCurrentIdArray = newsWithIds.filter(
        (news) => news.id === newsId
      );

      if (newsWithCurrentIdArray.length !== 1) {
        window.location.href = "404.html";
        return;
      }

      const currentNewsDetails = newsWithCurrentIdArray[0];

      const newsDetailsElement = `
        <news-details
          title="${currentNewsDetails.title}"
          date="${formatDate(currentNewsDetails.date)}"
          image="${currentNewsDetails.image}"
          image-caption="${currentNewsDetails.title}"
          description="${currentNewsDetails.description}"
        >
        </news-details>
      `;

      document
        .querySelector(".row-fluid")
        .insertAdjacentHTML("beforeend", newsDetailsElement);
    })
    .catch((error) => console.error(error)); // TODO: error page

  console.log(document.location);
}

loadNewsDetails();
