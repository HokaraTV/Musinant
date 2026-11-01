function actOf(k) {
  return k === "entry" ? "open-entry" : k === "plane" ? "plane" : "open-chron";
}

function byTitle(t) {
  t = String(t).toLowerCase();
  var e = S.wiki.find(function (x) {
    return x.title.toLowerCase() === t;
  });
  if (e) return { kind: "entry", id: e.id, title: e.title, cat: e.cat };
  e = S.chronicles.find(function (x) {
    return x.title.toLowerCase() === t;
  });
  if (e)
    return { kind: "chronicle", id: e.id, title: e.title, cat: "Chronique" };
  var pl = planeList().filter(function (p) {
    return p.name.toLowerCase() === t;
  })[0];
  if (pl) return { kind: "plane", id: pl.id, title: pl.name, cat: pl.tag };
  return null;
}

function inline(s) {
  return String(s || "")
    .split(/(\[\[[^\]]+\]\])/g)
    .map(function (p, i) {
      if (i % 2) {
        var raw = p.slice(2, -2),
          parts = raw.split("|"),
          t = parts[0].trim(),
          label = (parts[1] || parts[0]).trim(),
          r = byTitle(t);
        return r
          ? '<a class="xref" href="#" data-act="' +
              actOf(r.kind) +
              '" data-id="' +
              r.id +
              '">' +
              esc(label) +
              "</a>"
          : '<span class="xref missing" title="Cette entrée n’existe pas encore">' +
              esc(label) +
              "</span>";
      }
      return esc(p)
        .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
        .replace(/\*(.+?)\*/g, "<em>$1</em>");
    })
    .join("");
}

function prose(text) {
  return String(text || "")
    .trim()
    .split(/\n{2,}/)
    .map(function (b) {
      b = b.trim();
      if (!b) return "";
      if (b.indexOf("## ") === 0) return "<h3>" + inline(b.slice(3)) + "</h3>";
      var lines = b.split("\n");
      if (
        lines.every(function (l) {
          return l.indexOf("- ") === 0;
        })
      )
        return (
          "<ul>" +
          lines
            .map(function (l) {
              return "<li>" + inline(l.slice(2)) + "</li>";
            })
            .join("") +
          "</ul>"
        );
      return "<p>" + inline(b).replace(/\n/g, "<br>") + "</p>";
    })
    .join("");
}

function refsIn(text) {
  var out = [];
  (String(text || "").match(/\[\[([^\]]+)\]\]/g) || []).forEach(function (m) {
    var r = byTitle(m.slice(2, -2).split("|")[0].trim());
    if (
      r &&
      !out.some(function (o) {
        return o.id === r.id;
      })
    )
      out.push(r);
  });
  return out;
}

function backlinks(title, selfId) {
  var rx = new RegExp(
      "\\[\\[" + title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "(\\||\\]\\])",
      "i",
    ),
    out = [];
  S.wiki.forEach(function (e) {
    if (e.id === selfId) return;
    var hay =
      e.summary +
      "\n" +
      e.body +
      "\n" +
      e.fields
        .map(function (f) {
          return f[1];
        })
        .join("\n");
    if (rx.test(hay))
      out.push({ kind: "entry", id: e.id, title: e.title, cat: e.cat });
  });
  S.chronicles.forEach(function (c) {
    if (c.id === selfId) return;
    if (rx.test(c.summary + "\n" + c.body))
      out.push({
        kind: "chronicle",
        id: c.id,
        title: c.title,
        cat: "Chronique",
      });
  });
  return out;
}

function chip(r) {
  return (
    '<a class="chip" href="#" data-act="' +
    actOf(r.kind) +
    '" data-id="' +
    r.id +
    '"><small>' +
    esc(r.cat) +
    "</small>" +
    esc(r.title) +
    "</a>"
  );
}
function emptyBox(text) {
  return '<div class="empty"><p>' + text + "</p></div>";
}
function missing(view) {
  return (
    '<div class="empty"><p>Cette page n’existe plus.</p><button class="btn" data-act="nav" data-view="' +
    view +
    '">Retour à la liste</button></div>'
  );
}
