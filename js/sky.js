var skyEl = $("#sky"),
  cx = skyEl.getContext("2d");
var W = 0,
  H = 0,
  stars = [],
  links = [],
  shooters = [],
  raf = 0,
  nextShot = 0,
  lastT = 0;

function buildSky() {
  var dpr = Math.min(window.devicePixelRatio || 1, 2);
  W = window.innerWidth;
  H = window.innerHeight;
  skyEl.width = Math.round(W * dpr);
  skyEl.height = Math.round(H * dpr);
  cx.setTransform(dpr, 0, 0, dpr, 0, 0);
  var n = Math.round(((W * H) / 7500) * S.settings.density);
  stars = [];
  for (var i = 0; i < n; i++) {
    var big = Math.random() < 0.06;
    stars.push({
      x: Math.random() * W,
      y: Math.random() * H,
      r: big ? 1.5 + Math.random() * 0.8 : 0.35 + Math.random() * 0.75,
      a: 0.3 + Math.random() * 0.6,
      ph: Math.random() * 6.283,
      sp: 0.5 + Math.random() * 1.5,
      big: big,
    });
  }
  var key = [];
  stars.forEach(function (s, i) {
    if (s.big || s.r > 0.95) key.push({ s: s, i: i });
  });
  var seen = {};
  links = [];
  key.forEach(function (a) {
    key
      .filter(function (b) {
        return b.i !== a.i;
      })
      .map(function (b) {
        return { b: b, d: Math.hypot(a.s.x - b.s.x, a.s.y - b.s.y) };
      })
      .filter(function (o) {
        return o.d < 240;
      })
      .sort(function (u, v) {
        return u.d - v.d;
      })
      .slice(0, 2)
      .forEach(function (o) {
        var k = a.i < o.b.i ? a.i + "-" + o.b.i : o.b.i + "-" + a.i;
        if (!seen[k]) {
          seen[k] = 1;
          links.push([a.s, o.b.s]);
        }
      });
  });
  draw(performance.now(), 0);
}

function spawnShot() {
  var ang = ((28 + Math.random() * 14) * Math.PI) / 180,
    sp = 650 + Math.random() * 350;
  shooters.push({
    x: Math.random() * W * 0.8,
    y: Math.random() * H * 0.45,
    vx: Math.cos(ang) * sp,
    vy: Math.sin(ang) * sp,
    age: 0,
    life: 0.8 + Math.random() * 0.6,
    len: 110 + Math.random() * 90,
  });
}

function draw(t, dt) {
  cx.clearRect(0, 0, W, H);
  var g = cx.createRadialGradient(
    W * 0.55,
    H * 0.32,
    0,
    W * 0.55,
    H * 0.32,
    Math.max(W, H) * 0.65,
  );
  g.addColorStop(0, "rgba(72,52,130,.17)");
  g.addColorStop(0.5, "rgba(24,40,90,.07)");
  g.addColorStop(1, "rgba(5,8,19,0)");
  cx.globalAlpha = 1;
  cx.fillStyle = g;
  cx.fillRect(0, 0, W, H);
  cx.strokeStyle = "rgba(140,190,240,.08)";
  cx.lineWidth = 1;
  cx.beginPath();
  links.forEach(function (l) {
    cx.moveTo(l[0].x, l[0].y);
    cx.lineTo(l[1].x, l[1].y);
  });
  cx.stroke();
  var anim = S.settings.anim;
  for (var i = 0; i < stars.length; i++) {
    var s = stars[i],
      tw = anim ? 0.62 + 0.38 * Math.sin((t / 1000) * s.sp + s.ph) : 1;
    cx.globalAlpha = Math.min(1, s.a * tw);
    cx.fillStyle = s.big ? "#ffffff" : "#d9e6ff";
    cx.beginPath();
    cx.arc(s.x, s.y, s.r, 0, 6.2832);
    cx.fill();
  }
  cx.globalAlpha = 1;
  for (var j = 0; j < stars.length; j++) {
    var b = stars[j];
    if (!b.big) continue;
    var h = cx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r * 5);
    h.addColorStop(0, "rgba(190,220,255,.26)");
    h.addColorStop(1, "rgba(190,220,255,0)");
    cx.fillStyle = h;
    cx.fillRect(b.x - b.r * 5, b.y - b.r * 5, b.r * 10, b.r * 10);
  }
  for (var k = shooters.length - 1; k >= 0; k--) {
    var o = shooters[k];
    o.age += dt;
    if (o.age > o.life) {
      shooters.splice(k, 1);
      continue;
    }
    var hx = o.x + o.vx * o.age,
      hy = o.y + o.vy * o.age,
      sp = Math.hypot(o.vx, o.vy),
      tx = hx - (o.vx / sp) * o.len,
      ty = hy - (o.vy / sp) * o.len;
    var lg = cx.createLinearGradient(tx, ty, hx, hy);
    lg.addColorStop(0, "rgba(255,255,255,0)");
    lg.addColorStop(1, "rgba(255,255,255,1)");
    cx.globalAlpha = Math.sin((Math.PI * o.age) / o.life);
    cx.strokeStyle = lg;
    cx.lineWidth = 1.5;
    cx.beginPath();
    cx.moveTo(tx, ty);
    cx.lineTo(hx, hy);
    cx.stroke();
  }
  cx.globalAlpha = 1;
}

function loop(t) {
  var dt = Math.min(0.05, (t - lastT) / 1000 || 0);
  lastT = t;
  if (t > nextShot) {
    spawnShot();
    nextShot = t + 3500 + Math.random() * 5500;
  }
  draw(t, dt);
  raf = requestAnimationFrame(loop);
}

function startSky() {
  cancelAnimationFrame(raf);
  raf = 0;
  shooters = [];
  if (!S.settings.sky) return;
  if (S.settings.anim && !document.hidden) {
    lastT = performance.now();
    nextShot = lastT + 1500;
    raf = requestAnimationFrame(loop);
  } else draw(performance.now(), 0);
}

/* À appeler une seule fois, après le chargement des données */
function initSky() {
  document.addEventListener("visibilitychange", startSky);
  var rt = 0;
  window.addEventListener("resize", function () {
    clearTimeout(rt);
    rt = setTimeout(function () {
      if (
        Math.abs(window.innerWidth - W) > 40 ||
        window.innerHeight - H > 150
      ) {
        buildSky();
        startSky();
      }
    }, 200);
  });
  buildSky();
  startSky();
}
