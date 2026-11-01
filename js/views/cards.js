function chronCard(c) {
  return (
    '<a class="card" href="#" data-act="open-chron" data-id="' +
    c.id +
    '"><span class="kicker">' +
    esc(c.date) +
    "</span><h3>" +
    esc(c.title) +
    "</h3><p>" +
    esc(c.summary) +
    "</p></a>"
  );
}

function entryCard(e) {
  return (
    '<a class="card" href="#" data-act="open-entry" data-id="' +
    e.id +
    '"><span class="kicker">' +
    esc(e.cat) +
    "</span><h3>" +
    esc(e.title) +
    "</h3><p>" +
    esc(e.summary) +
    "</p></a>"
  );
}
