function calYearLen() {
  return CAL.months.reduce(function (a, m) {
    return a + m.d;
  }, 0);
}
function calBefore(mi) {
  var n = 0;
  for (var i = 0; i < mi; i++) n += CAL.months[i].d;
  return n;
}
function calAbs(y, mi, d) {
  return (y - 1) * calYearLen() + calBefore(mi) + (d - 1);
}
function calWeekday(a) {
  var n = CAL.weekdays.length;
  return (((CAL.epochWeekday + a) % n) + n) % n;
}
function calPhase(moon, a) {
  var c = moon.cycle,
    ref = calAbs(moon.full.y, moon.full.m - 1, moon.full.d),
    t = (((a - ref) % c) + c) % c;
  return (t / c + 0.5) % 1;
}

var PH = [
  "Nouvelle lune",
  "Premier croissant",
  "Premier quartier",
  "Gibbeuse croissante",
  "Pleine lune",
  "Gibbeuse décroissante",
  "Dernier quartier",
  "Dernier croissant",
];
function calPhaseName(p) {
  return PH[Math.floor(p * 8 + 0.5) % 8];
}

function moonSvg(p, size, color) {
  var r = size / 2 - 0.75,
    c = size / 2,
    k = Math.cos(2 * Math.PI * p),
    rx = Math.abs(k) * r,
    d;
  if (p < 0.5)
    d =
      "M" +
      c +
      " " +
      (c - r) +
      "A" +
      r +
      " " +
      r +
      " 0 0 1 " +
      c +
      " " +
      (c + r) +
      "A" +
      rx +
      " " +
      r +
      " 0 0 " +
      (k > 0 ? 0 : 1) +
      " " +
      c +
      " " +
      (c - r) +
      "Z";
  else
    d =
      "M" +
      c +
      " " +
      (c - r) +
      "A" +
      r +
      " " +
      r +
      " 0 0 0 " +
      c +
      " " +
      (c + r) +
      "A" +
      rx +
      " " +
      r +
      " 0 0 " +
      (k > 0 ? 1 : 0) +
      " " +
      c +
      " " +
      (c - r) +
      "Z";
  return (
    '<svg class="moon" width="' +
    size +
    '" height="' +
    size +
    '" viewBox="0 0 ' +
    size +
    " " +
    size +
    '" aria-hidden="true"><circle cx="' +
    c +
    '" cy="' +
    c +
    '" r="' +
    r +
    '" fill="#0a1020" stroke="#5f7298" stroke-width="1"/><path d="' +
    d +
    '" fill="' +
    color +
    '"/></svg>'
  );
}

function calEvents(y, m, d) {
  return CAL.events.filter(function (e) {
    return e.m === m && e.d === d && (e.y == null || e.y === y);
  });
}

function calLegend() {
  return (
    '<div class="cal-legend">' +
    CAL.moons
      .map(function (m) {
        return (
          '<span class="lg">' +
          moonSvg(0.5, 14, m.color) +
          esc(m.n) +
          ", cycle de " +
          m.cycle +
          " jours</span>"
        );
      })
      .join("") +
    '<span class="lg"><i class="dot"></i>Date actuelle du récit</span></div>'
  );
}

function calMonthHtml() {
  var mo = CAL.months[cs.m],
    n = CAL.weekdays.length,
    first = calWeekday(calAbs(cs.y, cs.m, 1)),
    cells = "",
    list = [];
  var isCur = CAL.today.y === cs.y && CAL.today.m - 1 === cs.m;
  for (var i = 0; i < first; i++) cells += '<div class="day blank"></div>';
  for (var d = 1; d <= mo.d; d++) {
    var a = calAbs(cs.y, cs.m, d);
    var moons = CAL.moons
      .map(function (m) {
        var p = calPhase(m, a);
        return (
          '<span class="mn" title="' +
          esc(m.n + " : " + calPhaseName(p)) +
          '">' +
          moonSvg(p, 14, m.color) +
          "</span>"
        );
      })
      .join("");
    var evs = calEvents(cs.y, cs.m + 1, d);
    evs.forEach(function (e) {
      list.push({ d: d, title: e.title });
    });
    cells +=
      '<div class="day' +
      (isCur && CAL.today.d === d ? " today" : "") +
      '"><span class="dn">' +
      d +
      '</span><span class="moons">' +
      moons +
      "</span>" +
      evs
        .map(function (e) {
          return (
            '<span class="ev" title="' +
            esc(e.title) +
            '">' +
            esc(e.title) +
            "</span>"
          );
        })
        .join("") +
      "</div>";
  }
  var rest = (n - ((first + mo.d) % n)) % n;
  for (var j = 0; j < rest; j++) cells += '<div class="day blank"></div>';
  return (
    '<div class="cal-bar m"><button class="cal-nav sq" data-act="cal-month" data-step="-1" aria-label="Mois précédent">‹</button><h3>' +
    esc(mo.n) +
    " — Mois " +
    (cs.m + 1) +
    '</h3><button class="cal-nav sq" data-act="cal-month" data-step="1" aria-label="Mois suivant">›</button></div>' +
    '<div class="cal-grid" style="--cols:' +
    n +
    '">' +
    CAL.weekdays
      .map(function (w) {
        return '<div class="wd">' + esc(w) + "</div>";
      })
      .join("") +
    cells +
    "</div>" +
    calLegend() +
    (list.length
      ? '<section class="cal-events"><h4>Événements du mois</h4><ul>' +
        list
          .map(function (e) {
            return (
              "<li><b>" + e.d + "</b><span>" + esc(e.title) + "</span></li>"
            );
          })
          .join("") +
        "</ul></section>"
      : "")
  );
}

function calYearHtml() {
  var n = CAL.weekdays.length,
    head = CAL.weekdays
      .map(function (w) {
        return '<span class="mh">' + esc(w.charAt(0)) + "</span>";
      })
      .join("");
  return (
    '<div class="year-grid">' +
    CAL.months
      .map(function (mo, mi) {
        var first = calWeekday(calAbs(cs.y, mi, 1)),
          cells = "",
          cur = CAL.today.y === cs.y && CAL.today.m - 1 === mi;
        for (var i = 0; i < first; i++) cells += '<span class="md"></span>';
        for (var d = 1; d <= mo.d; d++)
          cells +=
            '<span class="md' +
            (cur && CAL.today.d === d ? " today" : "") +
            '">' +
            d +
            "</span>";
        return (
          '<button class="mini' +
          (cur ? " cur" : "") +
          '" data-act="cal-open" data-m="' +
          mi +
          '" aria-label="Ouvrir ' +
          esc(mo.n) +
          '"><span class="mini-t">' +
          esc(mo.n) +
          "<small>Mois " +
          (mi + 1) +
          '</small></span><span class="mini-grid" style="--cols:' +
          n +
          '">' +
          head +
          cells +
          "</span></button>"
        );
      })
      .join("") +
    "</div>" +
    calLegend()
  );
}

function vCalendar() {
  var opts = CAL.months
    .map(function (m, i) {
      return (
        '<option value="' + i + '">' + (i + 1) + ". " + esc(m.n) + "</option>"
      );
    })
    .join("");
  return (
    '<header class="ph"><div><p class="eyebrow">Chronologie</p><h1>Calendrier</h1><p class="lede">Jours, mois et phases des lunes dans le monde.</p></div></header>' +
    '<div class="cal-tools"><div class="chips" role="group" aria-label="Affichage"><button class="pill" data-act="cal-view" data-v="month">Mois</button><button class="pill" data-act="cal-view" data-v="year">Année</button></div>' +
    '<label class="cal-field" id="cal-mw"><span>Mois</span><select id="cal-m" class="in">' +
    opts +
    "</select></label>" +
    '<label class="cal-field"><span>Année</span><input id="cal-y" class="in" type="number" min="1" step="1"></label>' +
    '<button class="btn" data-act="cal-today">Aller à aujourd’hui</button></div>' +
    '<div id="cal-body"></div>'
  );
}

function drawCal() {
  var host = $("#cal-body");
  if (!host) return;
  $("#cal-y").value = cs.y;
  $("#cal-m").value = cs.m;
  $("#cal-mw").hidden = cs.v !== "month";
  Array.prototype.forEach.call(
    document.querySelectorAll('[data-act="cal-view"]'),
    function (b) {
      b.setAttribute("aria-pressed", String(b.dataset.v === cs.v));
    },
  );
  var ae = document.activeElement,
    sel = null;
  if (ae && host.contains(ae) && ae.dataset && ae.dataset.act)
    sel =
      '[data-act="' +
      ae.dataset.act +
      '"]' +
      (ae.dataset.step ? '[data-step="' + ae.dataset.step + '"]' : "");
  host.innerHTML =
    '<div class="cal-bar"><button class="cal-nav" data-act="cal-year" data-step="-1">‹ Année</button><h2>Année ' +
    cs.y +
    " — " +
    esc(CAL.era) +
    '</h2><button class="cal-nav" data-act="cal-year" data-step="1">Année ›</button></div>' +
    (cs.v === "month" ? calMonthHtml() : calYearHtml());
  if (sel) {
    var nf = host.querySelector(sel);
    if (nf) nf.focus();
  }
}
