var PLANE_HINT =
  "Survolez un plan pour le nommer, cliquez pour ouvrir sa page.";

function pol(r, deg) {
  var a = (deg * Math.PI) / 180;
  return [400 + r * Math.cos(a), 430 + r * Math.sin(a)];
}
function pf(pt) {
  return pt[0].toFixed(1) + " " + pt[1].toFixed(1);
}
function sector(r1, r2, a0, a1) {
  return (
    "M" +
    pf(pol(r2, a0)) +
    "A" +
    r2 +
    " " +
    r2 +
    " 0 0 1 " +
    pf(pol(r2, a1)) +
    "L" +
    pf(pol(r1, a1)) +
    "A" +
    r1 +
    " " +
    r1 +
    " 0 0 0 " +
    pf(pol(r1, a0)) +
    "Z"
  );
}

function planeSvg(sel) {
  var ELEMENTS = PL.elements,
    n = ELEMENTS.length,
    step = 360 / n,
    o = "",
    i;
  function g(id, inner) {
    var p = planeById(id);
    return (
      '<g class="pl' +
      (sel === id ? " sel" : "") +
      '" style="--c:' +
      p.color +
      '" data-act="plane" data-id="' +
      id +
      '" tabindex="0" role="link" aria-label="' +
      esc(p.name) +
      '"><title>' +
      esc(p.name) +
      "</title>" +
      inner +
      "</g>"
    );
  }
  var rs = 7,
    st = "";
  function nx() {
    rs = (rs * 9301 + 49297) % 233280;
    return rs / 233280;
  }
  for (i = 0; i < 46; i++) {
    var a = nx() * 360,
      r = 240 + nx() * 54,
      pt = pol(r, a);
    st +=
      '<circle cx="' +
      pt[0].toFixed(1) +
      '" cy="' +
      pt[1].toFixed(1) +
      '" r="' +
      (0.8 + nx() * 1.2).toFixed(1) +
      '" opacity="' +
      (0.35 + nx() * 0.5).toFixed(2) +
      '"/>';
  }
  o += g(
    "astral",
    '<circle class="shape" cx="400" cy="430" r="300"/><g class="stars">' +
      st +
      '</g><text class="lbl up" x="400" y="165">' +
      esc(planeById("astral").name) +
      "</text>",
  );
  ELEMENTS.forEach(function (e, k) {
    var c = -90 + k * step,
      lp = pol(168, c);
    o += g(
      e.id,
      '<path class="shape" d="' +
        sector(104, 232, c - step / 2 + 1.6, c + step / 2 - 1.6) +
        '"/><text class="lbl" x="' +
        lp[0].toFixed(1) +
        '" y="' +
        lp[1].toFixed(1) +
        '">' +
        esc(e.short) +
        "</text>",
    );
  });
  var mw = planeById("material").name.split(" ");
  o += g(
    "material",
    '<circle class="shape" cx="400" cy="430" r="88"/><text class="lbl" x="400" y="418">' +
      esc(mw[0]) +
      '</text><text class="lbl" x="400" y="446">' +
      esc(mw.slice(1).join(" ")) +
      "</text>",
  );
  o += g(
    "upper",
    '<rect class="shape" x="70" y="12" width="660" height="96" rx="48"/><text class="lbl" x="400" y="60">' +
      esc(planeById("upper").name) +
      "</text>",
  );
  o += g(
    "lower",
    '<rect class="shape" x="70" y="752" width="660" height="96" rx="48"/><text class="lbl" x="400" y="800">' +
      esc(planeById("lower").name) +
      "</text>",
  );
  return (
    '<svg viewBox="0 0 800 860" role="group" aria-label="Schéma des plans de l’existence, vue de face">' +
    o +
    "</svg>"
  );
}

function vPlane() {
  var p = planeById(V.id);
  if (!p) return missing("wiki");
  var items = S.wiki.filter(function (e) {
      return e.plane === p.id;
    }),
    groups = {},
    order = [];
  items.forEach(function (e) {
    if (!groups[e.cat]) {
      groups[e.cat] = [];
      order.push(e.cat);
    }
    groups[e.cat].push(e);
  });
  order.sort(function (a, b) {
    return a.localeCompare(b, "fr");
  });
  var body = items.length
    ? order
        .map(function (c) {
          return (
            '<div class="grp-block"><h3 class="grp">' +
            esc(c) +
            "<small>" +
            groups[c].length +
            '</small></h3><div class="grid">' +
            groups[c].map(entryCard).join("") +
            "</div></div>"
          );
        })
        .join("")
    : '<div class="empty"><p>Aucune entrée n’est rattachée à ce plan pour le moment.</p></div>';
  var near = planeNeighbors(p.id)
    .map(function (id) {
      var o = planeById(id);
      return (
        '<a class="chip" href="#" data-act="plane" data-id="' +
        id +
        '"><small>' +
        esc(o.tag) +
        "</small>" +
        esc(o.name) +
        "</a>"
      );
    })
    .join("");
  return (
    '<article><div class="crumbs"><button class="link" data-act="back">' +
    ic("back", 16) +
    ' Retour</button><button class="link" data-act="nav" data-view="wiki">Wiki</button><span aria-hidden="true">/</span><button class="link" data-act="theme" data-cat="' +
    esc(PL.cat) +
    '">' +
    esc(PL.cat) +
    '</button><span aria-hidden="true">/</span><span>' +
    esc(p.name) +
    "</span></div>" +
    '<header class="ph"><div><p class="eyebrow">' +
    esc(p.tag) +
    "</p><h1>" +
    esc(p.name) +
    '</h1><p class="lede">' +
    inline(p.text) +
    "</p></div></header>" +
    '<div class="entry-grid"><div class="plane-main"><section><h2 class="grp">Éléments de ce plan<small>' +
    items.length +
    "</small></h2>" +
    body +
    "</section>" +
    '<section class="refs"><h2>Plans voisins</h2><div class="chips">' +
    near +
    "</div></section></div>" +
    '<aside class="infobox"><div class="ib-head"><span>' +
    esc(p.tag) +
    "</span><strong>" +
    esc(p.name) +
    '</strong></div><div class="plane-map">' +
    planeSvg(p.id) +
    "</div><dl>" +
    p.facts
      .map(function (f) {
        return "<dt>" + esc(f[0]) + "</dt><dd>" + inline(f[1]) + "</dd>";
      })
      .join("") +
    "</dl></aside></div></article>"
  );
}

function planeHint(e) {
  var h = $("#plane-hint");
  if (!h) return;
  var g = e.target.closest && e.target.closest(".pl"),
    p = g ? planeById(g.getAttribute("data-id")) : null;
  if (p) h.innerHTML = "<strong>" + esc(p.name) + "</strong> · " + esc(p.tag);
  else h.textContent = PLANE_HINT;
}
