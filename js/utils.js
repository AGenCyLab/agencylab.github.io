function formatDate(date) {
  return luxon.DateTime.fromFormat(date, "dd/MM/yyyy").toLocaleString({
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}
