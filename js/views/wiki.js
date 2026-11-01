function catCount(c) {
  return S.wiki.filter(function (e) {
    return e.cat === c;
  }).length;
}

function wikiHub() {
  if (!S.wiki.length) return emptyBox("Le wiki attend sa première entrée.");
  var tiles = wikiCats()
    .map(function (c) {
      var n = catCount(c),
        sub =
          c === PL.cat
            ? "Schéma des plans de l’existence"
            : n + (n > 1 ? " entrées" : " entrée");
      return (
        '<a class="card" href="#" data-act="theme" data-cat="' +
        esc(c) +
        '"><span class="kicker">Thème</span><h3>' +
        esc(c) +
        "</h3><p>" +
        esc(sub) +
        "</p></a>"
      );
    })
    .join("");
  var all = S.wiki
    .slice()
    .sort(function (a, b) {
      return a.title.localeCompare(b.title, "fr");
    })
    .map(function (e) {
      return chip({ kind: "entry", id: e.id, title: e.title, cat: e.cat });
    })
    .join("");
  return (
    '<h2 class="grp">Explorer par thème</h2><div class="grid">' +
    tiles +
    '</div><h2 class="grp idx">Toutes les entrées <small>' +
    S.wiki.length +
    '</small></h2><div class="chips">' +
    all +
    "</div>"
  );
}

function wikiResults() {
  var n = ui.q.trim().toLowerCase();
  if (!n) return wikiHub();
  var list = S.wiki.filter(function (e) {
    return (
      (
        e.title +
        " " +
        e.cat +
        " " +
        e.summary +
        " " +
        e.body +
        " " +
        e.fields
          .map(function (f) {
            return f[0] + " " + f[1];
          })
          .join(" ")
      )
        .toLowerCase()
        .indexOf(n) > -1
    );
  });
  if (!list.length)
    return '<div class="empty"><p>Aucune entrée ne correspond à cette recherche.</p></div>';
  return '<div class="grid">' + list.map(entryCard).join("") + "</div>";
}

function vWiki() {
  return (
    '<header class="ph"><div><p class="eyebrow">Encyclopédie</p><h1>Wiki</h1><p class="lede">Lieux, peuples, factions et pouvoirs du monde, reliés entre eux.</p></div></header>' +
    '<div class="tools"><label class="search">' +
    ic("search", 16) +
    '<input id="q" class="in" type="search" placeholder="Rechercher une entrée" autocomplete="off" value="' +
    esc(ui.q) +
    '"></label></div>' +
    '<div id="results">' +
    wikiResults() +
    "</div>"
  );
}

function vEntry() {
  var e = S.wiki.find(function (x) {
    return x.id === V.id;
  });
  if (!e) return missing("wiki");
  var bl = backlinks(e.title, e.id),
    pl = e.plane ? planeById(e.plane) : null;
  return (
    '<article><div class="crumbs"><button class="link" data-act="back">' +
    ic("back", 16) +
    ' Retour</button><button class="link" data-act="nav" data-view="wiki">Wiki</button><span aria-hidden="true">/</span><button class="link" data-act="theme" data-cat="' +
    esc(e.cat) +
    '">' +
    esc(e.cat) +
    "</button></div>" +
    '<header class="ph"><div><p class="eyebrow">' +
    esc(e.cat) +
    "</p><h1>" +
    esc(e.title) +
    "</h1>" +
    (e.summary ? '<p class="lede">' + inline(e.summary) + "</p>" : "") +
    "</div>" +
    "</header>" +
    '<div class="entry-grid"><div class="prose">' +
    (e.body
      ? prose(e.body)
      : '<p class="muted">Cette entrée n’a pas encore de contenu.</p>') +
    "</div>" +
    (e.fields.length || pl
      ? '<aside class="infobox"><div class="ib-head"><span>' +
        esc(e.cat) +
        "</span><strong>" +
        esc(e.title) +
        "</strong></div><dl>" +
        (pl
          ? '<dt>Plan</dt><dd><a class="xref" href="#" data-act="plane" data-id="' +
            pl.id +
            '">' +
            esc(pl.name) +
            "</a></dd>"
          : "") +
        e.fields
          .map(function (f) {
            return "<dt>" + esc(f[0]) + "</dt><dd>" + inline(f[1]) + "</dd>";
          })
          .join("") +
        "</dl></aside>"
      : "") +
    "</div>" +
    (bl.length
      ? '<section class="refs"><h2>Mentionné dans</h2><div class="chips">' +
        bl.map(chip).join("") +
        "</div></section>"
      : "") +
    "</article>"
  );
}

function vCategory() {
  var c = V.id;
  if (c !== PL.cat && !catCount(c)) return missing("wiki");
  var head =
    '<div class="crumbs"><button class="link" data-act="back">' +
    ic("back", 16) +
    ' Retour</button><button class="link" data-act="nav" data-view="wiki">Wiki</button><span aria-hidden="true">/</span><span>' +
    esc(c) +
    "</span></div>";
  if (c === PL.cat) {
    return (
      head +
      '<header class="ph"><div><p class="eyebrow">Cosmologie</p><h1>' +
      esc(c) +
      '</h1><p class="lede">Les plans de l’existence, vus de face.</p></div></header>' +
      '<section class="planes"><div class="planes-fig">' +
      planeSvg(null) +
      '</div><p class="plane-hint" id="plane-hint" aria-live="polite">' +
      PLANE_HINT +
      "</p></section>"
    );
  }
  var list = S.wiki.filter(function (e) {
    return e.cat === c;
  });
  return (
    head +
    '<header class="ph"><div><p class="eyebrow">Thème</p><h1>' +
    esc(c) +
    '</h1><p class="lede">' +
    list.length +
    (list.length > 1 ? " entrées" : " entrée") +
    ' dans ce thème.</p></div></header><div class="grid">' +
    list.map(entryCard).join("") +
    "</div>"
  );
}
