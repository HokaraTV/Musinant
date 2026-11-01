var NAV = [
  ["sanctum", "Sanctum", "star"],
  ["chronicles", "Chroniques", "scroll"],
  ["wiki", "Wiki", "book"],
  ["calendar", "Calendrier", "calendar"],
  ["links", "Liens", "link"],
];

function navOf() {
  return (
    { chronicle: "chronicles", entry: "wiki", category: "wiki", plane: "wiki" }[
      V.name
    ] || V.name
  );
}

function activeCat() {
  if (V.name === "category") return V.id;
  if (V.name === "plane") return PL.cat;
  if (V.name === "entry") {
    var e = S.wiki.find(function (x) {
      return x.id === V.id;
    });
    return e ? e.cat : null;
  }
  return null;
}

function closeDrawer() {
  $("#app").classList.remove("open");
}

function go(name, id) {
  hist.push({ name: V.name, id: V.id });
  if (hist.length > 40) hist.shift();
  V.name = name;
  V.id = id || null;
  closeDrawer();
  hooks.render();
  window.scrollTo(0, 0);
}

function back() {
  var p = hist.pop() || { name: "wiki", id: null };
  V.name = p.name;
  V.id = p.id;
  hooks.render();
  window.scrollTo(0, 0);
}

function wikiCats() {
  var out = [],
    seen = {};
  S.wiki.forEach(function (e) {
    if (e.cat && !seen[e.cat]) {
      seen[e.cat] = 1;
      out.push(e.cat);
    }
  });
  if (!seen[PL.cat]) out.push(PL.cat);
  return out.sort(function (a, b) {
    return a.localeCompare(b, "fr");
  });
}

function renderNav() {
  $("#nav").innerHTML = NAV.map(function (n) {
    var on = navOf() === n[0] && !(n[0] === "wiki" && V.name !== "wiki");
    var h =
      '<button class="nav" data-act="nav" data-view="' +
      n[0] +
      '" title="' +
      n[1] +
      '"' +
      (on ? ' aria-current="page"' : "") +
      ">" +
      ic(n[2]) +
      '<span class="lbl">' +
      n[1] +
      "</span></button>";
    if (n[0] === "wiki") {
      var cs = wikiCats();
      if (cs.length)
        h +=
          '<div class="sub" role="group" aria-label="Thèmes du wiki">' +
          cs
            .map(function (c) {
              return (
                '<button class="sub-item" data-act="theme" data-cat="' +
                esc(c) +
                '"' +
                (activeCat() === c ? ' aria-current="true"' : "") +
                ">" +
                esc(c) +
                "</button>"
              );
            })
            .join("") +
          "</div>";
    }
    return h;
  }).join("");
}

function refreshBrand() {
  $("#brand").textContent = S.settings.name;
  $("#brand-m").textContent = S.settings.name;
}
