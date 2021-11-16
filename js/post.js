$(document).ready(function () {
  $(".post-body").each((index) => {
    const postBody = $("#post-body" + index).text();
    const maxLength = 400;
    if (postBody.length > maxLength) {
      const keep =
        postBody.substring(0, maxLength).split(" ").slice(0, -1).join(" ") +
        "...";
      $("#post-body" + index).text(keep);
    }
  });
});
