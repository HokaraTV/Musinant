function vChronicles() {
  return (
    '<header class="ph"><div><p class="eyebrow">Récits</p><h1>Chroniques</h1><p class="lede">L’histoire du monde, racontée dans l’ordre où elle s’est écrite.</p></div></header>' +
    (S.chronicles.length
      ? '<div class="rows">' +
        S.chronicles
          .map(function (c) {
            return (
              '<a class="row" href="#" data-act="open-chron" data-id="' +
              c.id +
              '"><div class="when">' +
              esc(c.date || "Sans date") +
              (c.tag ? "<small>" + esc(c.tag) + "</small>" : "") +
              "</div><div><h3>" +
              esc(c.title) +
              "</h3><p>" +
              esc(c.summary) +
              "</p></div></a>"
            );
          })
          .join("") +
        "</div>"
      : emptyBox("Aucune chronique pour le moment."))
  );
}

function vChronicle() {
  var c = S.chronicles.find(function (x) {
    return x.id === V.id;
  });
  if (!c) return missing("chronicles");
  var refs = refsIn(c.body + " " + c.summary).filter(function (r) {
    return r.id !== c.id;
  });
  return (
    '<article><div class="crumbs"><button class="link" data-act="back">' +
    ic("back", 16) +
    " Retour</button><span>Chroniques</span></div>" +
    '<header class="ph"><div><p class="eyebrow">' +
    esc(c.date || "Sans date") +
    (c.tag ? " · " + esc(c.tag) : "") +
    "</p><h1>" +
    esc(c.title) +
    "</h1>" +
    (c.summary ? '<p class="lede">' + inline(c.summary) + "</p>" : "") +
    "</div>" +
    "</header>" +
    '<div class="prose">' +
    (c.body
      ? prose(c.body)
      : '<p class="muted">Cette chronique est encore vide.</p>') +
    "</div>" +
    (refs.length
      ? '<section class="refs"><h2>Entrées citées</h2><div class="chips">' +
        refs.map(chip).join("") +
        "</div></section>"
      : "") +
    "</article>"
  );
}
