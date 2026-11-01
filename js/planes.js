function planeList() {
  var ELEMENTS = PL.elements,
    n = ELEMENTS.length;
  var el = ELEMENTS.map(function (e, i) {
    return {
      id: e.id,
      name: e.name,
      tag: "Plan élémentaire",
      color: e.color,
      text: e.text,
      facts: [
        ["Borde", "Le plan matériel et le plan astral"],
        [
          "Voisins",
          ELEMENTS[(i + n - 1) % n].short +
            " et " +
            ELEMENTS[(i + 1) % n].short,
        ],
        ["Opposé", ELEMENTS[(i + Math.floor(n / 2)) % n].short],
      ],
    };
  });
  function by(id) {
    return PL.planes.filter(function (p) {
      return p.id === id;
    })[0];
  }
  return [by("upper"), by("astral")].concat(el, [by("material"), by("lower")]);
}

function planeById(id) {
  return planeList().filter(function (p) {
    return p.id === id;
  })[0];
}

function planeNeighbors(id) {
  var els = PL.elements.map(function (e) {
      return e.id;
    }),
    n = els.length,
    i = els.indexOf(id);
  if (id === "upper" || id === "lower") return ["astral"];
  if (id === "astral") return ["upper", "lower"].concat(els);
  if (id === "material") return els;
  return ["material", "astral", els[(i + n - 1) % n], els[(i + 1) % n]];
}
