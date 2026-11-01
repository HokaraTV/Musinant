function render() {
  renderNav();
  var fn =
    {
      sanctum: vSanctum,
      chronicles: vChronicles,
      chronicle: vChronicle,
      wiki: vWiki,
      entry: vEntry,
      category: vCategory,
      plane: vPlane,
      links: vLinks,
      calendar: vCalendar,
    }[V.name] || vSanctum;
  $("#view").innerHTML = fn();
  if (V.name === "calendar") drawCal();
}

/* nav.js appelle hooks.render() sans importer ce fichier (évite le cycle) */
hooks.render = render;
