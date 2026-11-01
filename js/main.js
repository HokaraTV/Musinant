function applySettings() {
  document.documentElement.style.setProperty("--accent", S.settings.accent);
  document.documentElement.classList.toggle("still", !S.settings.anim);
  $("#sky").hidden = !S.settings.sky;
  $("#app").classList.toggle("collapsed", !!S.settings.collapsed);
  refreshBrand();
}

/* Vérifie que les trois fichiers de data/ ont bien été chargés */
function checkData() {
  var need = [
    ["DATA_CONTENU", "data/contenu.js"],
    ["DATA_CALENDRIER", "data/calendrier.js"],
    ["DATA_PLANS", "data/plans.js"],
  ];
  var lost = need
    .filter(function (n) {
      return typeof window[n[0]] === "undefined";
    })
    .map(function (n) {
      return n[1];
    });
  if (lost.length)
    throw new Error(
      "fichier(s) non chargé(s) : " +
        lost.join(", ") +
        " (vérifie le nom, le dossier et la balise script)",
    );
}

try {
  checkData();
  loadData();
  applySettings();
  render();
  initEvents();
  initSky();
} catch (err) {
  console.error(err);
  $("#view").innerHTML =
    '<div class="empty"><p>Erreur au démarrage : ' +
    String(err.message || err) +
    "</p></div>";
}
