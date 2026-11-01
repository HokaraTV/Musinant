var KEY = "worldwiki-prefs-v1";

/* État partagé (variables globales, modifiées en place) */
var S = { settings: {}, chronicles: [], wiki: [], links: [] };
var CAL = {};
var PL = { cat: "", planes: [], elements: [] };

var V = { name: "sanctum", id: null }; /* vue courante */
var hist = []; /* historique de navigation */
var ui = { q: "" }; /* recherche du wiki */
var cs = { y: 1, m: 0, v: "month" }; /* état du calendrier */

var hooks = { render: function () {} }; /* rempli par render.js */

/* Les données viennent de data/*.js (DATA_CONTENU, DATA_CALENDRIER, DATA_PLANS) */
function loadData() {
  Object.assign(S, DATA_CONTENU);
  Object.assign(CAL, DATA_CALENDRIER);
  PL.cat = DATA_PLANS.planesCat;
  PL.planes = DATA_PLANS.planes;
  PL.elements = DATA_PLANS.elements;

  /* l'animation respecte la préférence « réduire les animations » */
  S.settings.anim = !!S.settings.anim && !RM;

  try {
    var raw = localStorage.getItem(KEY);
    if (raw) {
      var d = JSON.parse(raw);
      if (d && d.settings && d.settings.collapsed) S.settings.collapsed = true;
    }
  } catch (e) {}

  cs.y = CAL.today.y;
  cs.m = CAL.today.m - 1;
}

function save() {
  try {
    localStorage.setItem(
      KEY,
      JSON.stringify({ settings: { collapsed: !!S.settings.collapsed } }),
    );
  } catch (e) {}
}
