function formatDate(date) {
  return luxon.DateTime.fromFormat(date, "dd/MM/yyyy").toLocaleString({
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function loadNews() {
  fetch("/data/news.json")
    .then((response) => response.json())
    .then(({ news }) => {
      // news is an array, we expect the first 6 elements to be featured news
      // and the rest to be other/older news. featured news has more properties
      // than older news
      const featuredNews = news.slice(0, 6);
      const otherNews = news.slice(6);

      const featuredNewsTargetDiv = document.querySelector(
        "#recent_news_content"
      );
      const otherNewsTargetDiv = document.querySelector("#other_news_content");

      featuredNews.forEach(({ date, description, image, link, title }) => {
        const html = `<featured-news
                      date="${formatDate(date)}"
                      title="${title}"
                      description="${description.slice(0, 240)}"
                      image=${image}
                      link=${link}
                    >
                    </featured-news>
      `;
        featuredNewsTargetDiv.insertAdjacentHTML("beforeend", html);
      });

      if (otherNewsTargetDiv) {
        otherNews.forEach(({ date, description }) => {
          const html = `<other-news
                        date="${formatDate(date)}"
                        description="${description}"
                      >
                      </other-news>
        `;
          otherNewsTargetDiv.insertAdjacentHTML("beforeend", html);
        });
      }
    })
    .catch((error) => console.error(error));
}

loadNews();
