function vSanctum() {
  var ch = S.chronicles.slice(0, 3),
    en = S.wiki.slice(0, 6);
  return (
    '<section class="hero"><div class="orbit"><i></i><i></i><i></i><div class="orbit-in"><h1>' +
    esc(S.settings.name) +
    '</h1><p class="tagline">' +
    esc(S.settings.tagline) +
    "</p></div></div>" +
    '<div class="cta"><button class="btn primary" data-act="nav" data-view="chronicles">' +
    ic("wand", 16) +
    ' Lire les chroniques</button><button class="btn" data-act="nav" data-view="wiki">' +
    ic("bookopen", 16) +
    " Explorer le wiki</button></div>" +
    '<button class="hint" data-act="scroll-next" aria-label="Voir la suite"><span class="line"></span>' +
    ic("down", 16) +
    "</button></section>" +
    '<section class="sec" id="recent"><h2 class="h-sec">Chroniques récentes</h2>' +
    (ch.length
      ? '<div class="grid">' +
        ch.map(chronCard).join("") +
        '</div><div class="center"><button class="btn" data-act="nav" data-view="chronicles">Toutes les chroniques</button></div>'
      : emptyBox("Aucune chronique pour le moment.")) +
    '</section><section class="sec"><h2 class="h-sec">Dans le wiki</h2>' +
    (en.length
      ? '<div class="grid">' +
        en.map(entryCard).join("") +
        '</div><div class="center"><button class="btn" data-act="nav" data-view="wiki">Tout le wiki</button></div>'
      : emptyBox("Le wiki attend sa première entrée.")) +
    "</section>"
  );
}
