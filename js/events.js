function initEvents() {
  document.addEventListener("mouseover", planeHint);
  document.addEventListener("focusin", planeHint);

  document.addEventListener("click", function (e) {
    var t = e.target.closest("[data-act]");
    if (!t) return;
    e.preventDefault();
    var a = t.dataset.act,
      id = t.dataset.id;
    switch (a) {
      case "nav":
        go(t.dataset.view);
        break;
      case "open-entry":
        go("entry", id);
        break;
      case "open-chron":
        go("chronicle", id);
        break;
      case "back":
        back();
        break;
      case "collapse":
        S.settings.collapsed = !S.settings.collapsed;
        save();
        $("#app").classList.toggle("collapsed", S.settings.collapsed);
        break;
      case "menu":
        $("#app").classList.add("open");
        break;
      case "menu-close":
        closeDrawer();
        break;
      case "scroll-next": {
        var r = $("#recent");
        if (r) r.scrollIntoView({ behavior: RM ? "auto" : "smooth" });
        break;
      }
      case "theme":
        go("category", t.dataset.cat);
        break;
      case "plane":
        go("plane", t.dataset.id);
        break;
      case "cal-view":
        cs.v = t.dataset.v;
        drawCal();
        break;
      case "cal-year":
        cs.y = Math.max(1, cs.y + parseInt(t.dataset.step, 10));
        drawCal();
        break;
      case "cal-month": {
        var stp = parseInt(t.dataset.step, 10),
          cnt = CAL.months.length,
          nm = cs.m + stp,
          ny = cs.y;
        if (nm < 0) {
          if (ny > 1) {
            nm = cnt - 1;
            ny--;
          } else nm = 0;
        } else if (nm >= cnt) {
          nm = 0;
          ny++;
        }
        cs.m = nm;
        cs.y = ny;
        drawCal();
        break;
      }
      case "cal-open":
        cs.m = parseInt(t.dataset.m, 10);
        cs.v = "month";
        drawCal();
        break;
      case "cal-today":
        cs.y = CAL.today.y;
        cs.m = CAL.today.m - 1;
        cs.v = "month";
        drawCal();
        break;
    }
  });

  document.addEventListener("input", function (e) {
    var t = e.target;
    if (t.id === "q") {
      ui.q = t.value;
      $("#results").innerHTML = wikiResults();
    }
  });

  document.addEventListener("change", function (e) {
    var t = e.target;
    if (t.id === "cal-m") {
      cs.m = parseInt(t.value, 10) || 0;
      drawCal();
    } else if (t.id === "cal-y") {
      var v = parseInt(t.value, 10);
      if (v >= 1) cs.y = v;
      drawCal();
    }
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeDrawer();
    else if (
      (e.key === "Enter" || e.key === " ") &&
      e.target.getAttribute &&
      e.target.getAttribute("data-act") === "plane" &&
      e.target.tagName.toLowerCase() === "g"
    ) {
      e.preventDefault();
      go("plane", e.target.getAttribute("data-id"));
    }
  });
}
