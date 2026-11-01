function safeUrl(u) {
  u = String(u || "").trim();
  return /^https?:\/\//i.test(u) ? u : "https://" + u;
}

function vLinks() {
  return (
    '<header class="ph"><div><p class="eyebrow">Ressources</p><h1>Liens</h1><p class="lede">Cartes, documents, outils et pages utiles autour du monde.</p></div></header>' +
    (S.links.length
      ? '<div class="links">' +
        S.links
          .map(function (l) {
            return (
              '<a class="link-card" href="' +
              esc(safeUrl(l.url)) +
              '" target="_blank" rel="noopener noreferrer"><div><strong>' +
              esc(l.label) +
              "</strong>" +
              (l.note
                ? '<span class="note-l">' + esc(l.note) + "</span>"
                : "") +
              '<span class="url">' +
              esc(l.url) +
              "</span></div>" +
              ic("external", 18) +
              "</a>"
            );
          })
          .join("") +
        "</div>"
      : emptyBox("Aucun lien pour le moment."))
  );
}
