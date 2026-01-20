import { defineComponent as dt, withAsyncContext as wt, createElementBlock as Z, openBlock as V, createCommentVNode as st, unref as W, normalizeClass as z, createElementVNode as at, toDisplayString as _t, createBlock as mt, Suspense as yt, withCtx as bt, createVNode as Mt } from "vue";
const ct = {
  dot: "dot",
  square: "square"
}, tt = {
  dot: "dot",
  square: "square",
  extraRounded: "extra-rounded"
}, U = {
  dots: "dots",
  rounded: "rounded",
  classy: "classy",
  classyRounded: "classy-rounded",
  square: "square",
  extraRounded: "extra-rounded"
}, xt = {
  Q: "Q"
}, Ct = {
  L: 0.07,
  M: 0.15,
  Q: 0.25,
  H: 0.3
}, Ot = {
  radial: "radial"
}, et = {
  numeric: "Numeric",
  alphanumeric: "Alphanumeric",
  byte: "Byte"
}, Pt = Array.from({ length: 41 }, (f, e) => e).reduce((f, e) => (f[e] = e, f), {});
function Dt({
  originalHeight: f,
  originalWidth: e,
  maxHiddenDots: n,
  maxHiddenAxisDots: t,
  dotSize: o
}) {
  const s = { x: 0, y: 0 }, i = { x: 0, y: 0 };
  if (f <= 0 || e <= 0 || n <= 0 || o <= 0)
    return {
      height: 0,
      width: 0,
      hideYDots: 0,
      hideXDots: 0
    };
  const r = f / e;
  return s.x = Math.floor(Math.sqrt(n / r)), s.x <= 0 && (s.x = 1), t && t < s.x && (s.x = t), s.x % 2 === 0 && s.x--, i.x = s.x * o, s.y = 1 + 2 * Math.ceil((s.x * r - 1) / 2), i.y = Math.round(i.x * r), (s.y * s.x > n || t && t < s.y) && (t && t < s.y ? (s.y = t, s.y % 2 === 0 && s.x--) : s.y -= 2, i.y = s.y * o, s.x = 1 + 2 * Math.ceil((s.y / r - 1) / 2), i.x = Math.round(i.y / r)), {
    height: i.y,
    width: i.x,
    hideYDots: s.y,
    hideXDots: s.x
  };
}
function kt(f, e) {
  const n = document.createElement("a");
  n.download = e, n.href = f, document.body.appendChild(n), n.click(), document.body.removeChild(n);
}
function Bt(f) {
  switch (!0) {
    case /^\d*$/.test(f):
      return et.numeric;
    case /^[0-9A-Z $%*+\-./:]*$/.test(f):
      return et.alphanumeric;
    default:
      return et.byte;
  }
}
const K = (f) => !!f && typeof f == "object" && !Array.isArray(f);
function X(f, ...e) {
  if (!e.length)
    return f;
  const n = e.shift();
  return n === void 0 || !K(f) || !K(n) ? f : (f = { ...f }, Object.keys(n).forEach((t) => {
    const o = f[t], s = n[t];
    Array.isArray(o) && Array.isArray(s) ? f[t] = s : K(o) && K(s) ? f[t] = X(Object.assign({}, o), s) : f[t] = s;
  }), X(f, ...e));
}
function j(f) {
  const e = { ...f };
  if (!e.colorStops || !e.colorStops.length)
    throw "Field 'colorStops' is required in gradient";
  return e.rotation ? e.rotation = Number(e.rotation) : e.rotation = 0, e.colorStops = e.colorStops.map((n) => ({
    ...n,
    offset: Number(n.offset)
  })), e;
}
function ut(f) {
  const e = { ...f };
  return e.width = Number(e.width), e.height = Number(e.height), e.margin = Number(e.margin), e.imageOptions = {
    ...e.imageOptions,
    hideBackgroundDots: !!e.imageOptions.hideBackgroundDots,
    imageSize: Number(e.imageOptions.imageSize),
    margin: Number(e.imageOptions.margin)
  }, e.margin > Math.min(e.width, e.height) && (e.margin = Math.min(e.width, e.height)), e.dotsOptions = {
    ...e.dotsOptions
  }, e.dotsOptions.gradient && (e.dotsOptions.gradient = j(e.dotsOptions.gradient)), e.cornersSquareOptions && (e.cornersSquareOptions = {
    ...e.cornersSquareOptions
  }, e.cornersSquareOptions.gradient && (e.cornersSquareOptions.gradient = j(e.cornersSquareOptions.gradient))), e.cornersDotOptions && (e.cornersDotOptions = {
    ...e.cornersDotOptions
  }, e.cornersDotOptions.gradient && (e.cornersDotOptions.gradient = j(e.cornersDotOptions.gradient))), e.backgroundOptions && (e.backgroundOptions = {
    ...e.backgroundOptions
  }, e.backgroundOptions.gradient && (e.backgroundOptions.gradient = j(e.backgroundOptions.gradient))), e;
}
class It {
  _context;
  _type;
  constructor({ context: e, type: n }) {
    this._context = e, this._type = n;
  }
  draw(e, n, t, o) {
    const s = this._context;
    switch (this._type) {
      case ct.square:
        this._drawSquare({ x: e, y: n, size: t, context: s, rotation: o });
        break;
      case ct.dot:
      default:
        this._drawDot({ x: e, y: n, size: t, context: s, rotation: o });
    }
  }
  _rotateFigure({ x: e, y: n, size: t, context: o, rotation: s, draw: i }) {
    const r = e + t / 2, a = n + t / 2;
    o.moveTo(0, 0), o.translate(r, a), s && o.rotate(s), i(), o.closePath(), s && o.rotate(-s), o.translate(-r, -a);
  }
  _drawDot(e) {
    const { size: n, context: t } = e;
    this._rotateFigure({
      ...e,
      draw: () => {
        t.moveTo(0, 0), t.arc(0, 0, n / 2, 0, Math.PI * 2);
      }
    });
  }
  _drawSquare(e) {
    const { size: n, context: t } = e;
    this._rotateFigure({
      ...e,
      draw: () => {
        t.moveTo(0, 0), t.rect(-n / 2, -n / 2, n, n);
      }
    });
  }
}
class Tt {
  _context;
  _type;
  constructor({ context: e, type: n }) {
    this._context = e, this._type = n;
  }
  draw(e, n, t, o) {
    const s = this._context, i = this._type;
    let r;
    switch (i) {
      case tt.square:
        r = this._drawSquare;
        break;
      case tt.extraRounded:
        r = this._drawExtraRounded;
        break;
      case tt.dot:
      default:
        r = this._drawDot;
    }
    r.call(this, { x: e, y: n, size: t, context: s, rotation: o });
  }
  _rotateFigure({ x: e, y: n, size: t, context: o, rotation: s, draw: i }) {
    const r = e + t / 2, a = n + t / 2;
    o.translate(r, a), s && o.rotate(s), i(), o.closePath(), s && o.rotate(-s), o.translate(-r, -a);
  }
  _basicDot(e) {
    const { size: n, context: t } = e, o = n / 7;
    this._rotateFigure({
      ...e,
      draw: () => {
        t.arc(0, 0, n / 2, 0, Math.PI * 2), t.arc(0, 0, n / 2 - o, 0, Math.PI * 2);
      }
    });
  }
  _basicSquare(e) {
    const { size: n, context: t } = e, o = n / 7;
    this._rotateFigure({
      ...e,
      draw: () => {
        t.rect(-n / 2, -n / 2, n, n), t.rect(-n / 2 + o, -n / 2 + o, n - 2 * o, n - 2 * o);
      }
    });
  }
  _basicExtraRounded(e) {
    const { size: n, context: t } = e, o = n / 7;
    this._rotateFigure({
      ...e,
      draw: () => {
        t.arc(-o, -o, 2.5 * o, Math.PI, -Math.PI / 2), t.lineTo(o, -3.5 * o), t.arc(o, -o, 2.5 * o, -Math.PI / 2, 0), t.lineTo(3.5 * o, -o), t.arc(o, o, 2.5 * o, 0, Math.PI / 2), t.lineTo(-o, 3.5 * o), t.arc(-o, o, 2.5 * o, Math.PI / 2, Math.PI), t.lineTo(-3.5 * o, -o), t.arc(-o, -o, 1.5 * o, Math.PI, -Math.PI / 2), t.lineTo(o, -2.5 * o), t.arc(o, -o, 1.5 * o, -Math.PI / 2, 0), t.lineTo(2.5 * o, -o), t.arc(o, o, 1.5 * o, 0, Math.PI / 2), t.lineTo(-o, 2.5 * o), t.arc(-o, o, 1.5 * o, Math.PI / 2, Math.PI), t.lineTo(-2.5 * o, -o);
      }
    });
  }
  _drawDot({ x: e, y: n, size: t, context: o, rotation: s }) {
    this._basicDot({ x: e, y: n, size: t, context: o, rotation: s });
  }
  _drawSquare({ x: e, y: n, size: t, context: o, rotation: s }) {
    this._basicSquare({ x: e, y: n, size: t, context: o, rotation: s });
  }
  _drawExtraRounded({ x: e, y: n, size: t, context: o, rotation: s }) {
    this._basicExtraRounded({ x: e, y: n, size: t, context: o, rotation: s });
  }
}
class nt {
  _context;
  _type;
  constructor({ context: e, type: n }) {
    this._context = e, this._type = n;
  }
  draw(e, n, t, o) {
    const s = this._context, i = this._type;
    let r;
    switch (i) {
      case U.dots:
        r = this._drawDot;
        break;
      case U.classy:
        r = this._drawClassy;
        break;
      case U.classyRounded:
        r = this._drawClassyRounded;
        break;
      case U.rounded:
        r = this._drawRounded;
        break;
      case U.extraRounded:
        r = this._drawExtraRounded;
        break;
      case U.square:
      default:
        r = this._drawSquare;
    }
    r.call(this, { x: e, y: n, size: t, context: s, getNeighbor: o });
  }
  _rotateFigure({ x: e, y: n, size: t, context: o, rotation: s, draw: i }) {
    const r = e + t / 2, a = n + t / 2;
    o.translate(r, a), s && o.rotate(s), i(), o.closePath(), s && o.rotate(-s), o.translate(-r, -a);
  }
  _basicDot(e) {
    const { size: n, context: t } = e;
    this._rotateFigure({
      ...e,
      draw: () => {
        t.moveTo(0, 0), t.arc(0, 0, n / 2, 0, Math.PI * 2);
      }
    });
  }
  _basicSquare(e) {
    const { size: n, context: t } = e;
    this._rotateFigure({
      ...e,
      draw: () => {
        t.moveTo(0, 0), t.rect(-n / 2, -n / 2, n, n);
      }
    });
  }
  // if rotation === 0 - right side is rounded
  _basicSideRounded(e) {
    const { size: n, context: t } = e;
    this._rotateFigure({
      ...e,
      draw: () => {
        t.moveTo(0, 0), t.arc(0, 0, n / 2, -Math.PI / 2, Math.PI / 2), t.lineTo(-n / 2, n / 2), t.lineTo(-n / 2, -n / 2), t.lineTo(0, -n / 2);
      }
    });
  }
  // if rotation === 0 - top right corner is rounded
  _basicCornerRounded(e) {
    const { size: n, context: t } = e;
    this._rotateFigure({
      ...e,
      draw: () => {
        t.moveTo(0, 0), t.arc(0, 0, n / 2, -Math.PI / 2, 0), t.lineTo(n / 2, n / 2), t.lineTo(-n / 2, n / 2), t.lineTo(-n / 2, -n / 2), t.lineTo(0, -n / 2);
      }
    });
  }
  // if rotation === 0 - top right corner is rounded
  _basicCornerExtraRounded(e) {
    const { size: n, context: t } = e;
    this._rotateFigure({
      ...e,
      draw: () => {
        t.moveTo(0, 0), t.arc(-n / 2, n / 2, n, -Math.PI / 2, 0), t.lineTo(-n / 2, n / 2), t.lineTo(-n / 2, -n / 2);
      }
    });
  }
  _basicCornersRounded(e) {
    const { size: n, context: t } = e;
    this._rotateFigure({
      ...e,
      draw: () => {
        t.moveTo(0, 0), t.arc(0, 0, n / 2, -Math.PI / 2, 0), t.lineTo(n / 2, n / 2), t.lineTo(0, n / 2), t.arc(0, 0, n / 2, Math.PI / 2, Math.PI), t.lineTo(-n / 2, -n / 2), t.lineTo(0, -n / 2);
      }
    });
  }
  _basicCornersExtraRounded(e) {
    const { size: n, context: t } = e;
    this._rotateFigure({
      ...e,
      draw: () => {
        t.moveTo(0, 0), t.arc(-n / 2, n / 2, n, -Math.PI / 2, 0), t.arc(n / 2, -n / 2, n, Math.PI / 2, Math.PI);
      }
    });
  }
  _drawDot({ x: e, y: n, size: t, context: o }) {
    this._basicDot({ x: e, y: n, size: t, context: o, rotation: 0 });
  }
  _drawSquare({ x: e, y: n, size: t, context: o }) {
    this._basicSquare({ x: e, y: n, size: t, context: o, rotation: 0 });
  }
  _drawRounded({ x: e, y: n, size: t, context: o, getNeighbor: s }) {
    const i = +s(-1, 0), r = +s(1, 0), a = +s(0, -1), _ = +s(0, 1), w = i + r + a + _;
    if (w === 0) {
      this._basicDot({ x: e, y: n, size: t, context: o, rotation: 0 });
      return;
    }
    if (w > 2 || i && r || a && _) {
      this._basicSquare({ x: e, y: n, size: t, context: o, rotation: 0 });
      return;
    }
    if (w === 2) {
      let u = 0;
      i && a ? u = Math.PI / 2 : a && r ? u = Math.PI : r && _ && (u = -Math.PI / 2), this._basicCornerRounded({ x: e, y: n, size: t, context: o, rotation: u });
      return;
    }
    if (w === 1) {
      let u = 0;
      a ? u = Math.PI / 2 : r ? u = Math.PI : _ && (u = -Math.PI / 2), this._basicSideRounded({ x: e, y: n, size: t, context: o, rotation: u });
    }
  }
  _drawExtraRounded({ x: e, y: n, size: t, context: o, getNeighbor: s }) {
    const i = +s(-1, 0), r = +s(1, 0), a = +s(0, -1), _ = +s(0, 1), w = i + r + a + _;
    if (w === 0) {
      this._basicDot({ x: e, y: n, size: t, context: o, rotation: 0 });
      return;
    }
    if (w > 2 || i && r || a && _) {
      this._basicSquare({ x: e, y: n, size: t, context: o, rotation: 0 });
      return;
    }
    if (w === 2) {
      let u = 0;
      i && a ? u = Math.PI / 2 : a && r ? u = Math.PI : r && _ && (u = -Math.PI / 2), this._basicCornerExtraRounded({ x: e, y: n, size: t, context: o, rotation: u });
      return;
    }
    if (w === 1) {
      let u = 0;
      a ? u = Math.PI / 2 : r ? u = Math.PI : _ && (u = -Math.PI / 2), this._basicSideRounded({ x: e, y: n, size: t, context: o, rotation: u });
    }
  }
  _drawClassy({ x: e, y: n, size: t, context: o, getNeighbor: s }) {
    const i = +s(-1, 0), r = +s(1, 0), a = +s(0, -1), _ = +s(0, 1);
    if (i + r + a + _ === 0) {
      this._basicCornersRounded({ x: e, y: n, size: t, context: o, rotation: Math.PI / 2 });
      return;
    }
    if (!i && !a) {
      this._basicCornerRounded({ x: e, y: n, size: t, context: o, rotation: -Math.PI / 2 });
      return;
    }
    if (!r && !_) {
      this._basicCornerRounded({ x: e, y: n, size: t, context: o, rotation: Math.PI / 2 });
      return;
    }
    this._basicSquare({ x: e, y: n, size: t, context: o, rotation: 0 });
  }
  _drawClassyRounded({ x: e, y: n, size: t, context: o, getNeighbor: s }) {
    const i = +s(-1, 0), r = +s(1, 0), a = +s(0, -1), _ = +s(0, 1);
    if (i + r + a + _ === 0) {
      this._basicCornersRounded({ x: e, y: n, size: t, context: o, rotation: Math.PI / 2 });
      return;
    }
    if (!i && !a) {
      this._basicCornerExtraRounded({ x: e, y: n, size: t, context: o, rotation: -Math.PI / 2 });
      return;
    }
    if (!r && !_) {
      this._basicCornerExtraRounded({ x: e, y: n, size: t, context: o, rotation: Math.PI / 2 });
      return;
    }
    this._basicSquare({ x: e, y: n, size: t, context: o, rotation: 0 });
  }
}
const N = [
  [1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1]
], Q = [
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 1, 1, 1, 0, 0],
  [0, 0, 1, 1, 1, 0, 0],
  [0, 0, 1, 1, 1, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0]
];
class At {
  _canvas;
  _options;
  _qr;
  _image;
  // TODO don't pass all options to this class
  constructor(e) {
    this._canvas = document.createElement("canvas"), this._canvas.width = e.width, this._canvas.height = e.height, this._options = e;
  }
  get context() {
    return this._canvas.getContext("2d");
  }
  get width() {
    return this._canvas.width;
  }
  get height() {
    return this._canvas.height;
  }
  getCanvas() {
    return this._canvas;
  }
  clear() {
    const e = this.context;
    e && e.clearRect(0, 0, this._canvas.width, this._canvas.height);
  }
  async drawQR(e) {
    const n = e.getModuleCount(), t = Math.min(this._options.width, this._options.height) - this._options.margin * 2, o = Math.floor(t / n);
    let s = {
      hideXDots: 0,
      hideYDots: 0,
      width: 0,
      height: 0
    };
    if (this._qr = e, this._options.image) {
      if (await this.loadImage(), !this._image)
        return;
      const { imageOptions: i, qrOptions: r } = this._options, a = i.imageSize * (Ct[r.errorCorrectionLevel] ?? 0), _ = Math.floor(a * n * n);
      s = Dt({
        originalWidth: this._image.width,
        originalHeight: this._image.height,
        maxHiddenDots: _,
        maxHiddenAxisDots: n - 14,
        dotSize: o
      });
    }
    this.clear(), this.drawBackground(), this.drawDots((i, r) => !(this._options.imageOptions.hideBackgroundDots && i >= (n - s.hideXDots) / 2 && i < (n + s.hideXDots) / 2 && r >= (n - s.hideYDots) / 2 && r < (n + s.hideYDots) / 2 || N[i]?.[r] || N[i - n + 7]?.[r] || N[i]?.[r - n + 7] || Q[i]?.[r] || Q[i - n + 7]?.[r] || Q[i]?.[r - n + 7])), this.drawCorners(), this._options.image && this.drawImage({ width: s.width, height: s.height, count: n, dotSize: o });
  }
  drawBackground() {
    const e = this.context, n = this._options;
    if (e) {
      if (n.backgroundOptions.gradient) {
        const t = n.backgroundOptions.gradient, o = this._createGradient({
          context: e,
          options: t,
          additionalRotation: 0,
          x: 0,
          y: 0,
          size: this._canvas.width > this._canvas.height ? this._canvas.width : this._canvas.height
        });
        t.colorStops.forEach(({ offset: s, color: i }) => {
          o.addColorStop(s, i);
        }), e.fillStyle = o;
      } else n.backgroundOptions.color && (e.fillStyle = n.backgroundOptions.color);
      e.fillRect(0, 0, this._canvas.width, this._canvas.height);
    }
  }
  drawDots(e) {
    if (!this._qr)
      throw new Error("QR code is not defined");
    const n = this.context;
    if (!n)
      throw new Error("QR code is not defined");
    const t = this._options, o = this._qr.getModuleCount();
    if (o > t.width || o > t.height)
      throw new Error("The canvas is too small.");
    const s = Math.min(t.width, t.height) - t.margin * 2, i = Math.floor(s / o), r = Math.floor((t.width - o * i) / 2), a = Math.floor((t.height - o * i) / 2), _ = new nt({ context: n, type: t.dotsOptions.type });
    n.beginPath();
    for (let w = 0; w < o; w++)
      for (let u = 0; u < o; u++)
        e && !e(w, u) || this._qr.isDark(w, u) && _.draw(
          r + w * i,
          a + u * i,
          i,
          (g, y) => w + g < 0 || u + y < 0 || w + g >= o || u + y >= o || e && !e(w + g, u + y) ? !1 : !!this._qr && this._qr.isDark(w + g, u + y)
        );
    if (t.dotsOptions.gradient) {
      const w = t.dotsOptions.gradient, u = this._createGradient({
        context: n,
        options: w,
        additionalRotation: 0,
        x: r,
        y: a,
        size: o * i
      });
      w.colorStops.forEach(({ offset: g, color: y }) => {
        u.addColorStop(g, y);
      }), n.fillStyle = n.strokeStyle = u;
    } else t.dotsOptions.color && (n.fillStyle = n.strokeStyle = t.dotsOptions.color);
    n.fill("evenodd");
  }
  drawCorners(e) {
    if (!this._qr)
      throw new Error("QR code is not defined");
    const n = this.context;
    if (!n)
      throw new Error("QR code is not defined");
    const t = this._options, o = this._qr.getModuleCount(), s = Math.min(t.width, t.height) - t.margin * 2, i = Math.floor(s / o), r = i * 7, a = i * 3, _ = Math.floor((t.width - o * i) / 2), w = Math.floor((t.height - o * i) / 2);
    [
      [0, 0, 0],
      [1, 0, Math.PI / 2],
      [0, 1, -Math.PI / 2]
    ].forEach(([u, g, y]) => {
      if (u === void 0 || g === void 0 || y === void 0 || e && !e(u, g))
        return;
      const T = _ + u * i * (o - 7), P = w + g * i * (o - 7);
      if (t.cornersSquareOptions?.type) {
        const O = new Tt({ context: n, type: t.cornersSquareOptions?.type });
        n.beginPath(), O.draw(T, P, r, y);
      } else {
        const O = new nt({ context: n, type: t.dotsOptions.type });
        n.beginPath();
        for (let x = 0; x < N.length; x++)
          for (let D = 0; D < (N[x]?.length ?? 0); D++)
            N[x]?.[D] && O.draw(
              T + x * i,
              P + D * i,
              i,
              (v, Y) => !!N[x + v]?.[D + Y]
            );
      }
      if (t.cornersSquareOptions?.gradient) {
        const O = t.cornersSquareOptions.gradient, x = this._createGradient({
          context: n,
          options: O,
          additionalRotation: y,
          x: T,
          y: P,
          size: r
        });
        O.colorStops.forEach(({ offset: D, color: v }) => {
          x.addColorStop(D, v);
        }), n.fillStyle = n.strokeStyle = x;
      } else t.cornersSquareOptions?.color && (n.fillStyle = n.strokeStyle = t.cornersSquareOptions.color);
      if (n.fill("evenodd"), t.cornersDotOptions?.type) {
        const O = new It({ context: n, type: t.cornersDotOptions?.type });
        n.beginPath(), O.draw(T + i * 2, P + i * 2, a, y);
      } else {
        const O = new nt({ context: n, type: t.dotsOptions.type });
        n.beginPath();
        for (let x = 0; x < Q.length; x++)
          for (let D = 0; D < (Q[x]?.length ?? 0); D++)
            Q[x]?.[D] && O.draw(
              T + x * i,
              P + D * i,
              i,
              (v, Y) => !!Q[x + v]?.[D + Y]
            );
      }
      if (t.cornersDotOptions?.gradient) {
        const O = t.cornersDotOptions.gradient, x = this._createGradient({
          context: n,
          options: O,
          additionalRotation: y,
          x: T + i * 2,
          y: P + i * 2,
          size: a
        });
        O.colorStops.forEach(({ offset: D, color: v }) => {
          x.addColorStop(D, v);
        }), n.fillStyle = n.strokeStyle = x;
      } else t.cornersDotOptions?.color && (n.fillStyle = n.strokeStyle = t.cornersDotOptions.color);
      n.fill("evenodd");
    });
  }
  loadImage() {
    return new Promise((e, n) => {
      const t = this._options, o = new Image();
      if (!t.image)
        return n(new Error("Image is not defined"));
      typeof t.imageOptions.crossOrigin == "string" && (o.crossOrigin = t.imageOptions.crossOrigin), this._image = o, o.onload = () => {
        e();
      }, o.src = t.image;
    });
  }
  drawImage({
    width: e,
    height: n,
    count: t,
    dotSize: o
  }) {
    const s = this.context;
    if (!s)
      throw new Error("canvasContext is not defined");
    if (!this._image)
      throw new Error("image is not defined");
    const i = this._options, r = Math.floor((i.width - t * o) / 2), a = Math.floor((i.height - t * o) / 2), _ = r + i.imageOptions.margin + (t * o - e) / 2, w = a + i.imageOptions.margin + (t * o - n) / 2, u = e - i.imageOptions.margin * 2, g = n - i.imageOptions.margin * 2;
    s.drawImage(this._image, _, w, u < 0 ? 0 : u, g < 0 ? 0 : g);
  }
  _createGradient({
    context: e,
    options: n,
    additionalRotation: t,
    x: o,
    y: s,
    size: i
  }) {
    let r;
    if (n.type === Ot.radial)
      r = e.createRadialGradient(o + i / 2, s + i / 2, 0, o + i / 2, s + i / 2, i / 2);
    else {
      const a = ((n.rotation || 0) + t) % (2 * Math.PI), _ = (a + 2 * Math.PI) % (2 * Math.PI);
      let w = o + i / 2, u = s + i / 2, g = o + i / 2, y = s + i / 2;
      _ >= 0 && _ <= 0.25 * Math.PI || _ > 1.75 * Math.PI && _ <= 2 * Math.PI ? (w = w - i / 2, u = u - i / 2 * Math.tan(a), g = g + i / 2, y = y + i / 2 * Math.tan(a)) : _ > 0.25 * Math.PI && _ <= 0.75 * Math.PI ? (u = u - i / 2, w = w - i / 2 / Math.tan(a), y = y + i / 2, g = g + i / 2 / Math.tan(a)) : _ > 0.75 * Math.PI && _ <= 1.25 * Math.PI ? (w = w + i / 2, u = u + i / 2 * Math.tan(a), g = g - i / 2, y = y - i / 2 * Math.tan(a)) : _ > 1.25 * Math.PI && _ <= 1.75 * Math.PI && (u = u + i / 2, w = w + i / 2 / Math.tan(a), y = y - i / 2, g = g - i / 2 / Math.tan(a)), r = e.createLinearGradient(Math.round(w), Math.round(u), Math.round(g), Math.round(y));
    }
    return r;
  }
}
const G = function(f, e) {
  let o = f;
  const s = $[e];
  let i = null, r = 0, a = null;
  const _ = [], w = {}, u = function(l, p) {
    r = o * 4 + 17, i = (function(c) {
      const d = new Array(c);
      for (let h = 0; h < c; h += 1) {
        d[h] = new Array(c);
        for (let m = 0; m < c; m += 1)
          d[h][m] = null;
      }
      return d;
    })(r), g(0, 0), g(r - 7, 0), g(0, r - 7), P(), T(), x(l, p), o >= 7 && O(l), a == null && (a = Y(o, s, _)), D(a, p);
  }, g = function(l, p) {
    for (let c = -1; c <= 7; c += 1)
      if (!(l + c <= -1 || r <= l + c))
        for (let d = -1; d <= 7; d += 1)
          p + d <= -1 || r <= p + d || (0 <= c && c <= 6 && (d == 0 || d == 6) || 0 <= d && d <= 6 && (c == 0 || c == 6) || 2 <= c && c <= 4 && 2 <= d && d <= 4 ? i[l + c][p + d] = !0 : i[l + c][p + d] = !1);
  }, y = function() {
    let l = 0, p = 0;
    for (let c = 0; c < 8; c += 1) {
      u(!0, c);
      const d = q.getLostPoint(w);
      (c == 0 || l > d) && (l = d, p = c);
    }
    return p;
  }, T = function() {
    for (let l = 8; l < r - 8; l += 1)
      i[l][6] == null && (i[l][6] = l % 2 == 0);
    for (let l = 8; l < r - 8; l += 1)
      i[6][l] == null && (i[6][l] = l % 2 == 0);
  }, P = function() {
    const l = q.getPatternPosition(o);
    for (let p = 0; p < l.length; p += 1)
      for (let c = 0; c < l.length; c += 1) {
        const d = l[p], h = l[c];
        if (i[d][h] == null)
          for (let m = -2; m <= 2; m += 1)
            for (let b = -2; b <= 2; b += 1)
              m == -2 || m == 2 || b == -2 || b == 2 || m == 0 && b == 0 ? i[d + m][h + b] = !0 : i[d + m][h + b] = !1;
      }
  }, O = function(l) {
    const p = q.getBCHTypeNumber(o);
    for (let c = 0; c < 18; c += 1) {
      const d = !l && (p >> c & 1) == 1;
      i[Math.floor(c / 3)][c % 3 + r - 8 - 3] = d;
    }
    for (let c = 0; c < 18; c += 1) {
      const d = !l && (p >> c & 1) == 1;
      i[c % 3 + r - 8 - 3][Math.floor(c / 3)] = d;
    }
  }, x = function(l, p) {
    const c = s << 3 | p, d = q.getBCHTypeInfo(c);
    for (let h = 0; h < 15; h += 1) {
      const m = !l && (d >> h & 1) == 1;
      h < 6 ? i[h][8] = m : h < 8 ? i[h + 1][8] = m : i[r - 15 + h][8] = m;
    }
    for (let h = 0; h < 15; h += 1) {
      const m = !l && (d >> h & 1) == 1;
      h < 8 ? i[8][r - h - 1] = m : h < 9 ? i[8][15 - h - 1 + 1] = m : i[8][15 - h - 1] = m;
    }
    i[r - 8][8] = !l;
  }, D = function(l, p) {
    let c = -1, d = r - 1, h = 7, m = 0;
    const b = q.getMaskFunction(p);
    for (let C = r - 1; C > 0; C -= 2)
      for (C == 6 && (C -= 1); ; ) {
        for (let k = 0; k < 2; k += 1)
          if (i[d][C - k] == null) {
            let I = !1;
            m < l.length && (I = (l[m] >>> h & 1) == 1), b(d, C - k) && (I = !I), i[d][C - k] = I, h -= 1, h == -1 && (m += 1, h = 7);
          }
        if (d += c, d < 0 || r <= d) {
          d -= c, c = -c;
          break;
        }
      }
  }, v = function(l, p) {
    let c = 0, d = 0, h = 0;
    const m = new Array(p.length), b = new Array(p.length);
    for (let M = 0; M < p.length; M += 1) {
      const B = p[M].dataCount, R = p[M].totalCount - B;
      d = Math.max(d, B), h = Math.max(h, R), m[M] = new Array(B);
      for (let E = 0; E < m[M].length; E += 1)
        m[M][E] = 255 & l.getBuffer()[E + c];
      c += B;
      const J = q.getErrorCorrectPolynomial(R), rt = H(m[M], J.getLength() - 1).mod(J);
      b[M] = new Array(J.getLength() - 1);
      for (let E = 0; E < b[M].length; E += 1) {
        const it = E + rt.getLength() - b[M].length;
        b[M][E] = it >= 0 ? rt.getAt(it) : 0;
      }
    }
    let C = 0;
    for (let M = 0; M < p.length; M += 1)
      C += p[M].totalCount;
    const k = new Array(C);
    let I = 0;
    for (let M = 0; M < d; M += 1)
      for (let B = 0; B < p.length; B += 1)
        M < m[B].length && (k[I] = m[B][M], I += 1);
    for (let M = 0; M < h; M += 1)
      for (let B = 0; B < p.length; B += 1)
        M < b[B].length && (k[I] = b[B][M], I += 1);
    return k;
  }, Y = function(l, p, c) {
    const d = lt.getRSBlocks(l, p), h = ft();
    for (let b = 0; b < c.length; b += 1) {
      const C = c[b];
      h.put(C.getMode(), 4), h.put(C.getLength(), q.getLengthInBits(C.getMode(), l)), C.write(h);
    }
    let m = 0;
    for (let b = 0; b < d.length; b += 1)
      m += d[b].dataCount;
    if (h.getLengthInBits() > m * 8)
      throw "code length overflow. (" + h.getLengthInBits() + ">" + m * 8 + ")";
    for (h.getLengthInBits() + 4 <= m * 8 && h.put(0, 4); h.getLengthInBits() % 8 != 0; )
      h.putBit(!1);
    for (; !(h.getLengthInBits() >= m * 8 || (h.put(236, 8), h.getLengthInBits() >= m * 8)); )
      h.put(17, 8);
    return v(h, d);
  };
  w.addData = function(l, p) {
    p = p || "Byte";
    let c = null;
    switch (p) {
      case "Numeric":
        c = Rt(l);
        break;
      case "Alphanumeric":
        c = vt(l);
        break;
      case "Byte":
        c = Et(l);
        break;
      case "Kanji":
        c = St(l);
        break;
      default:
        throw "mode:" + p;
    }
    _.push(c), a = null;
  }, w.isDark = function(l, p) {
    if (l < 0 || r <= l || p < 0 || r <= p)
      throw l + "," + p;
    return i[l][p];
  }, w.getModuleCount = function() {
    return r;
  }, w.make = function() {
    if (o < 1) {
      let l = 1;
      for (; l < 40; l++) {
        const p = lt.getRSBlocks(l, s), c = ft();
        for (let h = 0; h < _.length; h++) {
          const m = _[h];
          c.put(m.getMode(), 4), c.put(m.getLength(), q.getLengthInBits(m.getMode(), l)), m.write(c);
        }
        let d = 0;
        for (let h = 0; h < p.length; h++)
          d += p[h].dataCount;
        if (c.getLengthInBits() <= d * 8)
          break;
      }
      o = l;
    }
    u(!1, y());
  }, w.createTableTag = function(l, p) {
    l = l || 2, p = typeof p > "u" ? l * 4 : p;
    let c = "";
    c += '<table style="', c += " border-width: 0px; border-style: none;", c += " border-collapse: collapse;", c += " padding: 0px; margin: " + p + "px;", c += '">', c += "<tbody>";
    for (let d = 0; d < w.getModuleCount(); d += 1) {
      c += "<tr>";
      for (let h = 0; h < w.getModuleCount(); h += 1)
        c += '<td style="', c += " border-width: 0px; border-style: none;", c += " border-collapse: collapse;", c += " padding: 0px; margin: 0px;", c += " width: " + l + "px;", c += " height: " + l + "px;", c += " background-color: ", c += w.isDark(d, h) ? "#000000" : "#ffffff", c += ";", c += '"/>';
      c += "</tr>";
    }
    return c += "</tbody>", c += "</table>", c;
  }, w.createSvgTag = function(l, p, c, d) {
    let h = {};
    typeof arguments[0] == "object" && (h = arguments[0], l = h.cellSize, p = h.margin, c = h.alt, d = h.title), l = l || 2, p = typeof p > "u" ? l * 4 : p, c = typeof c == "string" ? { text: c } : c || {}, c.text = c.text || null, c.id = c.text ? c.id || "qrcode-description" : null, d = typeof d == "string" ? { text: d } : d || {}, d.text = d.text || null, d.id = d.text ? d.id || "qrcode-title" : null;
    const m = w.getModuleCount() * l + p * 2;
    let b, C, k, I, M = "", B;
    for (B = "l" + l + ",0 0," + l + " -" + l + ",0 0,-" + l + "z ", M += '<svg version="1.1" xmlns="http://www.w3.org/2000/svg"', M += h.scalable ? "" : ' width="' + m + 'px" height="' + m + 'px"', M += ' viewBox="0 0 ' + m + " " + m + '" ', M += ' preserveAspectRatio="xMinYMin meet"', M += d.text || c.text ? ' role="img" aria-labelledby="' + F([d.id, c.id].join(" ").trim()) + '"' : "", M += ">", M += d.text ? '<title id="' + F(d.id) + '">' + F(d.text) + "</title>" : "", M += c.text ? '<description id="' + F(c.id) + '">' + F(c.text) + "</description>" : "", M += '<rect width="100%" height="100%" fill="white" cx="0" cy="0"/>', M += '<path d="', k = 0; k < w.getModuleCount(); k += 1)
      for (I = k * l + p, b = 0; b < w.getModuleCount(); b += 1)
        w.isDark(k, b) && (C = b * l + p, M += "M" + C + "," + I + B);
    return M += '" stroke="transparent" fill="black"/>', M += "</svg>", M;
  }, w.createDataURL = function(l, p) {
    l = l || 2, p = typeof p > "u" ? l * 4 : p;
    const c = w.getModuleCount() * l + p * 2, d = p, h = c - p;
    return Qt(c, c, function(m, b) {
      if (d <= m && m < h && d <= b && b < h) {
        const C = Math.floor((m - d) / l), k = Math.floor((b - d) / l);
        return w.isDark(k, C) ? 0 : 1;
      } else
        return 1;
    });
  }, w.createImgTag = function(l, p, c) {
    l = l || 2, p = typeof p > "u" ? l * 4 : p;
    const d = w.getModuleCount() * l + p * 2;
    let h = "";
    return h += "<img", h += ' src="', h += w.createDataURL(l, p), h += '"', h += ' width="', h += d, h += '"', h += ' height="', h += d, h += '"', c && (h += ' alt="', h += F(c), h += '"'), h += "/>", h;
  };
  const F = function(l) {
    let p = "";
    for (let c = 0; c < l.length; c += 1) {
      const d = l.charAt(c);
      switch (d) {
        case "<":
          p += "&lt;";
          break;
        case ">":
          p += "&gt;";
          break;
        case "&":
          p += "&amp;";
          break;
        case '"':
          p += "&quot;";
          break;
        default:
          p += d;
          break;
      }
    }
    return p;
  }, pt = function(l) {
    l = typeof l > "u" ? 2 : l;
    const c = w.getModuleCount() * 1 + l * 2, d = l, h = c - l;
    let m, b, C, k, I;
    const M = {
      "██": "█",
      "█ ": "▀",
      " █": "▄",
      "  ": " "
    }, B = {
      "██": "▀",
      "█ ": "▀",
      " █": " ",
      "  ": " "
    };
    let R = "";
    for (m = 0; m < c; m += 2) {
      for (C = Math.floor((m - d) / 1), k = Math.floor((m + 1 - d) / 1), b = 0; b < c; b += 1)
        I = "█", d <= b && b < h && d <= m && m < h && w.isDark(C, Math.floor((b - d) / 1)) && (I = " "), d <= b && b < h && d <= m + 1 && m + 1 < h && w.isDark(k, Math.floor((b - d) / 1)) ? I += " " : I += "█", R += l < 1 && m + 1 >= h ? B[I] : M[I];
      R += `
`;
    }
    return c % 2 && l > 0 ? R.substring(0, R.length - c - 1) + Array(c + 1).join("▀") : R.substring(0, R.length - 1);
  };
  return w.createASCII = function(l, p) {
    if (l = l || 1, l < 2)
      return pt(p);
    l -= 1, p = typeof p > "u" ? l * 2 : p;
    const c = w.getModuleCount() * l + p * 2, d = p, h = c - p;
    let m, b, C, k;
    const I = Array(l + 1).join("██"), M = Array(l + 1).join("  ");
    let B = "", R = "";
    for (m = 0; m < c; m += 1) {
      for (C = Math.floor((m - d) / l), R = "", b = 0; b < c; b += 1)
        k = 1, d <= b && b < h && d <= m && m < h && w.isDark(C, Math.floor((b - d) / l)) && (k = 0), R += k ? I : M;
      for (C = 0; C < l; C += 1)
        B += R + `
`;
    }
    return B.substring(0, B.length - 1);
  }, w.renderTo2dContext = function(l, p) {
    p = p || 2;
    const c = w.getModuleCount();
    for (let d = 0; d < c; d++)
      for (let h = 0; h < c; h++)
        l.fillStyle = w.isDark(d, h) ? "black" : "white", l.fillRect(h * p, d * p, p, p);
  }, w;
};
G.stringToBytes = function(f) {
  const e = [];
  for (let n = 0; n < f.length; n += 1) {
    const t = f.charCodeAt(n);
    e.push(t & 255);
  }
  return e;
};
G.createStringToBytes = function(f, e) {
  const n = (function() {
    const o = Lt(f), s = function() {
      const a = o.read();
      if (a == -1) throw "eof";
      return a;
    };
    let i = 0;
    const r = {};
    for (; ; ) {
      const a = o.read();
      if (a == -1) break;
      const _ = s(), w = s(), u = s(), g = String.fromCharCode(a << 8 | _), y = w << 8 | u;
      r[g] = y, i += 1;
    }
    if (i != e)
      throw i + " != " + e;
    return r;
  })(), t = 63;
  return function(o) {
    const s = [];
    for (let i = 0; i < o.length; i += 1) {
      const r = o.charCodeAt(i);
      if (r < 128)
        s.push(r);
      else {
        const a = n[o.charAt(i)];
        typeof a == "number" ? (a & 255) == a ? s.push(a) : (s.push(a >>> 8), s.push(a & 255)) : s.push(t);
      }
    }
    return s;
  };
};
const A = {
  MODE_NUMBER: 1,
  MODE_ALPHA_NUM: 2,
  MODE_8BIT_BYTE: 4,
  MODE_KANJI: 8
}, $ = {
  L: 1,
  M: 0,
  Q: 3,
  H: 2
}, S = {
  PATTERN000: 0,
  PATTERN001: 1,
  PATTERN010: 2,
  PATTERN011: 3,
  PATTERN100: 4,
  PATTERN101: 5,
  PATTERN110: 6,
  PATTERN111: 7
}, q = (function() {
  const f = [
    [],
    [6, 18],
    [6, 22],
    [6, 26],
    [6, 30],
    [6, 34],
    [6, 22, 38],
    [6, 24, 42],
    [6, 26, 46],
    [6, 28, 50],
    [6, 30, 54],
    [6, 32, 58],
    [6, 34, 62],
    [6, 26, 46, 66],
    [6, 26, 48, 70],
    [6, 26, 50, 74],
    [6, 30, 54, 78],
    [6, 30, 56, 82],
    [6, 30, 58, 86],
    [6, 34, 62, 90],
    [6, 28, 50, 72, 94],
    [6, 26, 50, 74, 98],
    [6, 30, 54, 78, 102],
    [6, 28, 54, 80, 106],
    [6, 32, 58, 84, 110],
    [6, 30, 58, 86, 114],
    [6, 34, 62, 90, 118],
    [6, 26, 50, 74, 98, 122],
    [6, 30, 54, 78, 102, 126],
    [6, 26, 52, 78, 104, 130],
    [6, 30, 56, 82, 108, 134],
    [6, 34, 60, 86, 112, 138],
    [6, 30, 58, 86, 114, 142],
    [6, 34, 62, 90, 118, 146],
    [6, 30, 54, 78, 102, 126, 150],
    [6, 24, 50, 76, 102, 128, 154],
    [6, 28, 54, 80, 106, 132, 158],
    [6, 32, 58, 84, 110, 136, 162],
    [6, 26, 54, 82, 110, 138, 166],
    [6, 30, 58, 86, 114, 142, 170]
  ], e = 1335, n = 7973, t = 21522, o = {}, s = function(i) {
    let r = 0;
    for (; i != 0; )
      r += 1, i >>>= 1;
    return r;
  };
  return o.getBCHTypeInfo = function(i) {
    let r = i << 10;
    for (; s(r) - s(e) >= 0; )
      r ^= e << s(r) - s(e);
    return (i << 10 | r) ^ t;
  }, o.getBCHTypeNumber = function(i) {
    let r = i << 12;
    for (; s(r) - s(n) >= 0; )
      r ^= n << s(r) - s(n);
    return i << 12 | r;
  }, o.getPatternPosition = function(i) {
    return f[i - 1];
  }, o.getMaskFunction = function(i) {
    switch (i) {
      case S.PATTERN000:
        return function(r, a) {
          return (r + a) % 2 == 0;
        };
      case S.PATTERN001:
        return function(r, a) {
          return r % 2 == 0;
        };
      case S.PATTERN010:
        return function(r, a) {
          return a % 3 == 0;
        };
      case S.PATTERN011:
        return function(r, a) {
          return (r + a) % 3 == 0;
        };
      case S.PATTERN100:
        return function(r, a) {
          return (Math.floor(r / 2) + Math.floor(a / 3)) % 2 == 0;
        };
      case S.PATTERN101:
        return function(r, a) {
          return r * a % 2 + r * a % 3 == 0;
        };
      case S.PATTERN110:
        return function(r, a) {
          return (r * a % 2 + r * a % 3) % 2 == 0;
        };
      case S.PATTERN111:
        return function(r, a) {
          return (r * a % 3 + (r + a) % 2) % 2 == 0;
        };
      default:
        throw "bad maskPattern:" + i;
    }
  }, o.getErrorCorrectPolynomial = function(i) {
    let r = H([1], 0);
    for (let a = 0; a < i; a += 1)
      r = r.multiply(H([1, L.gexp(a)], 0));
    return r;
  }, o.getLengthInBits = function(i, r) {
    if (1 <= r && r < 10)
      switch (i) {
        case A.MODE_NUMBER:
          return 10;
        case A.MODE_ALPHA_NUM:
          return 9;
        case A.MODE_8BIT_BYTE:
          return 8;
        case A.MODE_KANJI:
          return 8;
        default:
          throw "mode:" + i;
      }
    else if (r < 27)
      switch (i) {
        case A.MODE_NUMBER:
          return 12;
        case A.MODE_ALPHA_NUM:
          return 11;
        case A.MODE_8BIT_BYTE:
          return 16;
        case A.MODE_KANJI:
          return 10;
        default:
          throw "mode:" + i;
      }
    else if (r < 41)
      switch (i) {
        case A.MODE_NUMBER:
          return 14;
        case A.MODE_ALPHA_NUM:
          return 13;
        case A.MODE_8BIT_BYTE:
          return 16;
        case A.MODE_KANJI:
          return 12;
        default:
          throw "mode:" + i;
      }
    else
      throw "type:" + r;
  }, o.getLostPoint = function(i) {
    const r = i.getModuleCount();
    let a = 0;
    for (let u = 0; u < r; u += 1)
      for (let g = 0; g < r; g += 1) {
        let y = 0;
        const T = i.isDark(u, g);
        for (let P = -1; P <= 1; P += 1)
          if (!(u + P < 0 || r <= u + P))
            for (let O = -1; O <= 1; O += 1)
              g + O < 0 || r <= g + O || P == 0 && O == 0 || T == i.isDark(u + P, g + O) && (y += 1);
        y > 5 && (a += 3 + y - 5);
      }
    for (let u = 0; u < r - 1; u += 1)
      for (let g = 0; g < r - 1; g += 1) {
        let y = 0;
        i.isDark(u, g) && (y += 1), i.isDark(u + 1, g) && (y += 1), i.isDark(u, g + 1) && (y += 1), i.isDark(u + 1, g + 1) && (y += 1), (y == 0 || y == 4) && (a += 3);
      }
    for (let u = 0; u < r; u += 1)
      for (let g = 0; g < r - 6; g += 1)
        i.isDark(u, g) && !i.isDark(u, g + 1) && i.isDark(u, g + 2) && i.isDark(u, g + 3) && i.isDark(u, g + 4) && !i.isDark(u, g + 5) && i.isDark(u, g + 6) && (a += 40);
    for (let u = 0; u < r; u += 1)
      for (let g = 0; g < r - 6; g += 1)
        i.isDark(g, u) && !i.isDark(g + 1, u) && i.isDark(g + 2, u) && i.isDark(g + 3, u) && i.isDark(g + 4, u) && !i.isDark(g + 5, u) && i.isDark(g + 6, u) && (a += 40);
    let _ = 0;
    for (let u = 0; u < r; u += 1)
      for (let g = 0; g < r; g += 1)
        i.isDark(g, u) && (_ += 1);
    const w = Math.abs(100 * _ / r / r - 50) / 5;
    return a += w * 10, a;
  }, o;
})(), L = (function() {
  const f = new Array(256), e = new Array(256);
  for (let t = 0; t < 8; t += 1)
    f[t] = 1 << t;
  for (let t = 8; t < 256; t += 1)
    f[t] = f[t - 4] ^ f[t - 5] ^ f[t - 6] ^ f[t - 8];
  for (let t = 0; t < 255; t += 1)
    e[f[t]] = t;
  const n = {};
  return n.glog = function(t) {
    if (t < 1)
      throw "glog(" + t + ")";
    return e[t];
  }, n.gexp = function(t) {
    for (; t < 0; )
      t += 255;
    for (; t >= 256; )
      t -= 255;
    return f[t];
  }, n;
})(), H = function(f, e) {
  if (typeof f.length > "u")
    throw f.length + "/" + e;
  const n = (function() {
    let o = 0;
    for (; o < f.length && f[o] == 0; )
      o += 1;
    const s = new Array(f.length - o + e);
    for (let i = 0; i < f.length - o; i += 1)
      s[i] = f[i + o];
    return s;
  })(), t = {};
  return t.getAt = function(o) {
    return n[o];
  }, t.getLength = function() {
    return n.length;
  }, t.multiply = function(o) {
    const s = new Array(t.getLength() + o.getLength() - 1);
    for (let i = 0; i < t.getLength(); i += 1)
      for (let r = 0; r < o.getLength(); r += 1)
        s[i + r] ^= L.gexp(L.glog(t.getAt(i)) + L.glog(o.getAt(r)));
    return H(s, 0);
  }, t.mod = function(o) {
    if (t.getLength() - o.getLength() < 0)
      return t;
    const s = L.glog(t.getAt(0)) - L.glog(o.getAt(0)), i = new Array(t.getLength());
    for (let r = 0; r < t.getLength(); r += 1)
      i[r] = t.getAt(r);
    for (let r = 0; r < o.getLength(); r += 1)
      i[r] ^= L.gexp(L.glog(o.getAt(r)) + s);
    return H(i, 0).mod(o);
  }, t;
}, lt = (function() {
  const f = [
    // L
    // M
    // Q
    // H
    // 1
    [1, 26, 19],
    [1, 26, 16],
    [1, 26, 13],
    [1, 26, 9],
    // 2
    [1, 44, 34],
    [1, 44, 28],
    [1, 44, 22],
    [1, 44, 16],
    // 3
    [1, 70, 55],
    [1, 70, 44],
    [2, 35, 17],
    [2, 35, 13],
    // 4
    [1, 100, 80],
    [2, 50, 32],
    [2, 50, 24],
    [4, 25, 9],
    // 5
    [1, 134, 108],
    [2, 67, 43],
    [2, 33, 15, 2, 34, 16],
    [2, 33, 11, 2, 34, 12],
    // 6
    [2, 86, 68],
    [4, 43, 27],
    [4, 43, 19],
    [4, 43, 15],
    // 7
    [2, 98, 78],
    [4, 49, 31],
    [2, 32, 14, 4, 33, 15],
    [4, 39, 13, 1, 40, 14],
    // 8
    [2, 121, 97],
    [2, 60, 38, 2, 61, 39],
    [4, 40, 18, 2, 41, 19],
    [4, 40, 14, 2, 41, 15],
    // 9
    [2, 146, 116],
    [3, 58, 36, 2, 59, 37],
    [4, 36, 16, 4, 37, 17],
    [4, 36, 12, 4, 37, 13],
    // 10
    [2, 86, 68, 2, 87, 69],
    [4, 69, 43, 1, 70, 44],
    [6, 43, 19, 2, 44, 20],
    [6, 43, 15, 2, 44, 16],
    // 11
    [4, 101, 81],
    [1, 80, 50, 4, 81, 51],
    [4, 50, 22, 4, 51, 23],
    [3, 36, 12, 8, 37, 13],
    // 12
    [2, 116, 92, 2, 117, 93],
    [6, 58, 36, 2, 59, 37],
    [4, 46, 20, 6, 47, 21],
    [7, 42, 14, 4, 43, 15],
    // 13
    [4, 133, 107],
    [8, 59, 37, 1, 60, 38],
    [8, 44, 20, 4, 45, 21],
    [12, 33, 11, 4, 34, 12],
    // 14
    [3, 145, 115, 1, 146, 116],
    [4, 64, 40, 5, 65, 41],
    [11, 36, 16, 5, 37, 17],
    [11, 36, 12, 5, 37, 13],
    // 15
    [5, 109, 87, 1, 110, 88],
    [5, 65, 41, 5, 66, 42],
    [5, 54, 24, 7, 55, 25],
    [11, 36, 12, 7, 37, 13],
    // 16
    [5, 122, 98, 1, 123, 99],
    [7, 73, 45, 3, 74, 46],
    [15, 43, 19, 2, 44, 20],
    [3, 45, 15, 13, 46, 16],
    // 17
    [1, 135, 107, 5, 136, 108],
    [10, 74, 46, 1, 75, 47],
    [1, 50, 22, 15, 51, 23],
    [2, 42, 14, 17, 43, 15],
    // 18
    [5, 150, 120, 1, 151, 121],
    [9, 69, 43, 4, 70, 44],
    [17, 50, 22, 1, 51, 23],
    [2, 42, 14, 19, 43, 15],
    // 19
    [3, 141, 113, 4, 142, 114],
    [3, 70, 44, 11, 71, 45],
    [17, 47, 21, 4, 48, 22],
    [9, 39, 13, 16, 40, 14],
    // 20
    [3, 135, 107, 5, 136, 108],
    [3, 67, 41, 13, 68, 42],
    [15, 54, 24, 5, 55, 25],
    [15, 43, 15, 10, 44, 16],
    // 21
    [4, 144, 116, 4, 145, 117],
    [17, 68, 42],
    [17, 50, 22, 6, 51, 23],
    [19, 46, 16, 6, 47, 17],
    // 22
    [2, 139, 111, 7, 140, 112],
    [17, 74, 46],
    [7, 54, 24, 16, 55, 25],
    [34, 37, 13],
    // 23
    [4, 151, 121, 5, 152, 122],
    [4, 75, 47, 14, 76, 48],
    [11, 54, 24, 14, 55, 25],
    [16, 45, 15, 14, 46, 16],
    // 24
    [6, 147, 117, 4, 148, 118],
    [6, 73, 45, 14, 74, 46],
    [11, 54, 24, 16, 55, 25],
    [30, 46, 16, 2, 47, 17],
    // 25
    [8, 132, 106, 4, 133, 107],
    [8, 75, 47, 13, 76, 48],
    [7, 54, 24, 22, 55, 25],
    [22, 45, 15, 13, 46, 16],
    // 26
    [10, 142, 114, 2, 143, 115],
    [19, 74, 46, 4, 75, 47],
    [28, 50, 22, 6, 51, 23],
    [33, 46, 16, 4, 47, 17],
    // 27
    [8, 152, 122, 4, 153, 123],
    [22, 73, 45, 3, 74, 46],
    [8, 53, 23, 26, 54, 24],
    [12, 45, 15, 28, 46, 16],
    // 28
    [3, 147, 117, 10, 148, 118],
    [3, 73, 45, 23, 74, 46],
    [4, 54, 24, 31, 55, 25],
    [11, 45, 15, 31, 46, 16],
    // 29
    [7, 146, 116, 7, 147, 117],
    [21, 73, 45, 7, 74, 46],
    [1, 53, 23, 37, 54, 24],
    [19, 45, 15, 26, 46, 16],
    // 30
    [5, 145, 115, 10, 146, 116],
    [19, 75, 47, 10, 76, 48],
    [15, 54, 24, 25, 55, 25],
    [23, 45, 15, 25, 46, 16],
    // 31
    [13, 145, 115, 3, 146, 116],
    [2, 74, 46, 29, 75, 47],
    [42, 54, 24, 1, 55, 25],
    [23, 45, 15, 28, 46, 16],
    // 32
    [17, 145, 115],
    [10, 74, 46, 23, 75, 47],
    [10, 54, 24, 35, 55, 25],
    [19, 45, 15, 35, 46, 16],
    // 33
    [17, 145, 115, 1, 146, 116],
    [14, 74, 46, 21, 75, 47],
    [29, 54, 24, 19, 55, 25],
    [11, 45, 15, 46, 46, 16],
    // 34
    [13, 145, 115, 6, 146, 116],
    [14, 74, 46, 23, 75, 47],
    [44, 54, 24, 7, 55, 25],
    [59, 46, 16, 1, 47, 17],
    // 35
    [12, 151, 121, 7, 152, 122],
    [12, 75, 47, 26, 76, 48],
    [39, 54, 24, 14, 55, 25],
    [22, 45, 15, 41, 46, 16],
    // 36
    [6, 151, 121, 14, 152, 122],
    [6, 75, 47, 34, 76, 48],
    [46, 54, 24, 10, 55, 25],
    [2, 45, 15, 64, 46, 16],
    // 37
    [17, 152, 122, 4, 153, 123],
    [29, 74, 46, 14, 75, 47],
    [49, 54, 24, 10, 55, 25],
    [24, 45, 15, 46, 46, 16],
    // 38
    [4, 152, 122, 18, 153, 123],
    [13, 74, 46, 32, 75, 47],
    [48, 54, 24, 14, 55, 25],
    [42, 45, 15, 32, 46, 16],
    // 39
    [20, 147, 117, 4, 148, 118],
    [40, 75, 47, 7, 76, 48],
    [43, 54, 24, 22, 55, 25],
    [10, 45, 15, 67, 46, 16],
    // 40
    [19, 148, 118, 6, 149, 119],
    [18, 75, 47, 31, 76, 48],
    [34, 54, 24, 34, 55, 25],
    [20, 45, 15, 61, 46, 16]
  ], e = function(o, s) {
    const i = {};
    return i.totalCount = o, i.dataCount = s, i;
  }, n = {}, t = function(o, s) {
    switch (s) {
      case $.L:
        return f[(o - 1) * 4 + 0];
      case $.M:
        return f[(o - 1) * 4 + 1];
      case $.Q:
        return f[(o - 1) * 4 + 2];
      case $.H:
        return f[(o - 1) * 4 + 3];
      default:
        return;
    }
  };
  return n.getRSBlocks = function(o, s) {
    const i = t(o, s);
    if (typeof i > "u")
      throw "bad rs block @ typeNumber:" + o + "/errorCorrectionLevel:" + s;
    const r = i.length / 3, a = [];
    for (let _ = 0; _ < r; _ += 1) {
      const w = i[_ * 3 + 0], u = i[_ * 3 + 1], g = i[_ * 3 + 2];
      for (let y = 0; y < w; y += 1)
        a.push(e(u, g));
    }
    return a;
  }, n;
})(), ft = function() {
  const f = [];
  let e = 0;
  const n = {};
  return n.getBuffer = function() {
    return f;
  }, n.getAt = function(t) {
    const o = Math.floor(t / 8);
    return (f[o] >>> 7 - t % 8 & 1) == 1;
  }, n.put = function(t, o) {
    for (let s = 0; s < o; s += 1)
      n.putBit((t >>> o - s - 1 & 1) == 1);
  }, n.getLengthInBits = function() {
    return e;
  }, n.putBit = function(t) {
    const o = Math.floor(e / 8);
    f.length <= o && f.push(0), t && (f[o] |= 128 >>> e % 8), e += 1;
  }, n;
}, Rt = function(f) {
  const e = A.MODE_NUMBER, n = f, t = {};
  t.getMode = function() {
    return e;
  }, t.getLength = function(i) {
    return n.length;
  }, t.write = function(i) {
    const r = n;
    let a = 0;
    for (; a + 2 < r.length; )
      i.put(o(r.substring(a, a + 3)), 10), a += 3;
    a < r.length && (r.length - a == 1 ? i.put(o(r.substring(a, a + 1)), 4) : r.length - a == 2 && i.put(o(r.substring(a, a + 2)), 7));
  };
  const o = function(i) {
    let r = 0;
    for (let a = 0; a < i.length; a += 1)
      r = r * 10 + s(i.charAt(a));
    return r;
  }, s = function(i) {
    if ("0" <= i && i <= "9")
      return i.charCodeAt(0) - 48;
    throw "illegal char :" + i;
  };
  return t;
}, vt = function(f) {
  const e = A.MODE_ALPHA_NUM, n = f, t = {};
  t.getMode = function() {
    return e;
  }, t.getLength = function(s) {
    return n.length;
  }, t.write = function(s) {
    const i = n;
    let r = 0;
    for (; r + 1 < i.length; )
      s.put(
        o(i.charAt(r)) * 45 + o(i.charAt(r + 1)),
        11
      ), r += 2;
    r < i.length && s.put(o(i.charAt(r)), 6);
  };
  const o = function(s) {
    if ("0" <= s && s <= "9")
      return s.charCodeAt(0) - 48;
    if ("A" <= s && s <= "Z")
      return s.charCodeAt(0) - 65 + 10;
    switch (s) {
      case " ":
        return 36;
      case "$":
        return 37;
      case "%":
        return 38;
      case "*":
        return 39;
      case "+":
        return 40;
      case "-":
        return 41;
      case ".":
        return 42;
      case "/":
        return 43;
      case ":":
        return 44;
      default:
        throw "illegal char :" + s;
    }
  };
  return t;
}, Et = function(f) {
  const e = A.MODE_8BIT_BYTE, n = G.stringToBytes(f), t = {};
  return t.getMode = function() {
    return e;
  }, t.getLength = function(o) {
    return n.length;
  }, t.write = function(o) {
    for (let s = 0; s < n.length; s += 1)
      o.put(n[s], 8);
  }, t;
}, St = function(f) {
  const e = A.MODE_KANJI, n = G.stringToBytes;
  (function(s, i) {
    const r = n(s);
    if (r.length != 2 || (r[0] << 8 | r[1]) != i)
      throw "sjis not supported.";
  })("友", 38726);
  const t = n(f), o = {};
  return o.getMode = function() {
    return e;
  }, o.getLength = function(s) {
    return ~~(t.length / 2);
  }, o.write = function(s) {
    const i = t;
    let r = 0;
    for (; r + 1 < i.length; ) {
      let a = (255 & i[r]) << 8 | 255 & i[r + 1];
      if (33088 <= a && a <= 40956)
        a -= 33088;
      else if (57408 <= a && a <= 60351)
        a -= 49472;
      else
        throw "illegal char at " + (r + 1) + "/" + a;
      a = (a >>> 8 & 255) * 192 + (a & 255), s.put(a, 13), r += 2;
    }
    if (r < i.length)
      throw "illegal char at " + (r + 1);
  }, o;
}, gt = function() {
  const f = [], e = {};
  return e.writeByte = function(n) {
    f.push(n & 255);
  }, e.writeShort = function(n) {
    e.writeByte(n), e.writeByte(n >>> 8);
  }, e.writeBytes = function(n, t, o) {
    t = t || 0, o = o || n.length;
    for (let s = 0; s < o; s += 1)
      e.writeByte(n[s + t]);
  }, e.writeString = function(n) {
    for (let t = 0; t < n.length; t += 1)
      e.writeByte(n.charCodeAt(t));
  }, e.toByteArray = function() {
    return f;
  }, e.toString = function() {
    let n = "";
    n += "[";
    for (let t = 0; t < f.length; t += 1)
      t > 0 && (n += ","), n += f[t];
    return n += "]", n;
  }, e;
}, qt = function() {
  let f = 0, e = 0, n = 0, t = "";
  const o = {}, s = function(r) {
    t += String.fromCharCode(i(r & 63));
  }, i = function(r) {
    if (r < 0)
      throw "n:" + r;
    if (r < 26)
      return 65 + r;
    if (r < 52)
      return 97 + (r - 26);
    if (r < 62)
      return 48 + (r - 52);
    if (r == 62)
      return 43;
    if (r == 63)
      return 47;
    throw "n:" + r;
  };
  return o.writeByte = function(r) {
    for (f = f << 8 | r & 255, e += 8, n += 1; e >= 6; )
      s(f >>> e - 6), e -= 6;
  }, o.flush = function() {
    if (e > 0 && (s(f << 6 - e), f = 0, e = 0), n % 3 != 0) {
      const r = 3 - n % 3;
      for (let a = 0; a < r; a += 1)
        t += "=";
    }
  }, o.toString = function() {
    return t;
  }, o;
}, Lt = function(f) {
  const e = f;
  let n = 0, t = 0, o = 0;
  const s = {};
  s.read = function() {
    for (; o < 8; ) {
      if (n >= e.length) {
        if (o == 0)
          return -1;
        throw "unexpected end of file./" + o;
      }
      const a = e.charAt(n);
      if (n += 1, a == "=")
        return o = 0, -1;
      if (a.match(/^\s$/))
        continue;
      t = t << 6 | i(a.charCodeAt(0)), o += 6;
    }
    const r = t >>> o - 8 & 255;
    return o -= 8, r;
  };
  const i = function(r) {
    if (65 <= r && r <= 90)
      return r - 65;
    if (97 <= r && r <= 122)
      return r - 97 + 26;
    if (48 <= r && r <= 57)
      return r - 48 + 52;
    if (r == 43)
      return 62;
    if (r == 47)
      return 63;
    throw "c:" + r;
  };
  return s;
}, Nt = function(f, e) {
  const n = f, t = e, o = new Array(f * e), s = {};
  s.setPixel = function(_, w, u) {
    o[w * n + _] = u;
  }, s.write = function(_) {
    _.writeString("GIF87a"), _.writeShort(n), _.writeShort(t), _.writeByte(128), _.writeByte(0), _.writeByte(0), _.writeByte(0), _.writeByte(0), _.writeByte(0), _.writeByte(255), _.writeByte(255), _.writeByte(255), _.writeString(","), _.writeShort(0), _.writeShort(0), _.writeShort(n), _.writeShort(t), _.writeByte(0);
    const w = 2, u = r(w);
    _.writeByte(w);
    let g = 0;
    for (; u.length - g > 255; )
      _.writeByte(255), _.writeBytes(u, g, 255), g += 255;
    _.writeByte(u.length - g), _.writeBytes(u, g, u.length - g), _.writeByte(0), _.writeString(";");
  };
  const i = function(_) {
    const w = _;
    let u = 0, g = 0;
    const y = {};
    return y.write = function(T, P) {
      if (T >>> P)
        throw "length over";
      for (; u + P >= 8; )
        w.writeByte(255 & (T << u | g)), P -= 8 - u, T >>>= 8 - u, g = 0, u = 0;
      g = T << u | g, u = u + P;
    }, y.flush = function() {
      u > 0 && w.writeByte(g);
    }, y;
  }, r = function(_) {
    const w = 1 << _, u = (1 << _) + 1;
    let g = _ + 1;
    const y = a();
    for (let D = 0; D < w; D += 1)
      y.add(String.fromCharCode(D));
    y.add(String.fromCharCode(w)), y.add(String.fromCharCode(u));
    const T = gt(), P = i(T);
    P.write(w, g);
    let O = 0, x = String.fromCharCode(o[O]);
    for (O += 1; O < o.length; ) {
      const D = String.fromCharCode(o[O]);
      O += 1, y.contains(x + D) ? x = x + D : (P.write(y.indexOf(x), g), y.size() < 4095 && (y.size() == 1 << g && (g += 1), y.add(x + D)), x = D);
    }
    return P.write(y.indexOf(x), g), P.write(u, g), P.flush(), T.toByteArray();
  }, a = function() {
    const _ = {};
    let w = 0;
    const u = {};
    return u.add = function(g) {
      if (u.contains(g))
        throw "dup key:" + g;
      _[g] = w, w += 1;
    }, u.size = function() {
      return w;
    }, u.indexOf = function(g) {
      return _[g];
    }, u.contains = function(g) {
      return typeof _[g] < "u";
    }, u;
  };
  return s;
}, Qt = function(f, e, n) {
  const t = Nt(f, e);
  for (let r = 0; r < e; r += 1)
    for (let a = 0; a < f; a += 1)
      t.setPixel(a, r, n(a, r));
  const o = gt();
  t.write(o);
  const s = qt(), i = o.toByteArray();
  for (let r = 0; r < i.length; r += 1)
    s.writeByte(i[r]);
  return s.flush(), "data:image/gif;base64," + s;
};
G.stringToBytes;
const ht = {
  width: 300,
  height: 300,
  data: "",
  margin: 0,
  qrOptions: {
    typeNumber: Pt[0] ?? 0,
    mode: void 0,
    errorCorrectionLevel: xt.Q
  },
  imageOptions: {
    hideBackgroundDots: !0,
    imageSize: 0.4,
    crossOrigin: void 0,
    margin: 0
  },
  dotsOptions: {
    type: "square",
    color: "#000"
  },
  backgroundOptions: {
    color: "#fff"
  }
};
class ot {
  _options;
  _container;
  _canvas;
  _qr;
  _drawingPromise;
  constructor(e) {
    this._options = e ? ut(X(ht, e)) : ht, this.update();
  }
  static _clearContainer(e) {
    e && (e.innerHTML = "");
  }
  update(e) {
    ot._clearContainer(this._container), this._options = e ? ut(X(this._options, e)) : this._options, this._options.data && (this._qr = G(this._options.qrOptions.typeNumber, this._options.qrOptions.errorCorrectionLevel), this._qr.addData(this._options.data, this._options.qrOptions.mode || Bt(this._options.data)), this._qr.make(), this._canvas = new At(this._options), this._drawingPromise = this._canvas.drawQR(this._qr), this.append(this._container));
  }
  append(e) {
    if (e) {
      if (typeof e.appendChild != "function")
        throw "Container should be a single DOM node";
      this._canvas && e.appendChild(this._canvas.getCanvas()), this._container = e;
    }
  }
  async getImageUrl(e) {
    return this._drawingPromise && await this._drawingPromise === void 0 && this._canvas ? this._canvas.getCanvas().toDataURL(`image/${e}`) : "";
  }
  download(e) {
    this._drawingPromise && this._drawingPromise.then(() => {
      if (!this._canvas)
        return;
      const n = e, t = n.extension || "png", o = n.name || "qr", s = this._canvas.getCanvas().toDataURL(`image/${t}`);
      kt(s, `${o}.${t}`);
    });
  }
}
const Ft = ["src"], Ut = { key: 1 }, Gt = /* @__PURE__ */ dt({
  __name: "QRCodeVue3Async",
  props: {
    value: { default: "" },
    width: { default: 300 },
    height: { default: 300 },
    margin: { default: 0 },
    imgclass: { default: "" },
    myclass: { default: "" },
    downloadButton: { default: "" },
    buttonName: { default: "Download" },
    qrOptions: { default: {
      typeNumber: 0,
      mode: "Byte",
      errorCorrectionLevel: "Q"
    } },
    imageOptions: { default: { hideBackgroundDots: !0, imageSize: 0.4, margin: 0 } },
    dotsOptions: { default: {
      type: "dots",
      color: "#6a1a4c",
      gradient: {
        type: "linear",
        rotation: 0,
        colorStops: [
          { offset: 0, color: "#6a1a4c" },
          { offset: 1, color: "#6a1a4c" }
        ]
      }
    } },
    backgroundOptions: { default: { color: "#ffffff" } },
    cornersSquareOptions: { default: { type: "dot", color: "#000000" } },
    cornersDotOptions: { default: { type: void 0, color: "#000000" } },
    fileExt: { default: "png" },
    image: { default: "" },
    download: { type: Boolean, default: !1 },
    downloadOptions: { default: { name: "vqr", extension: "png" } }
  },
  async setup(f) {
    let e, n;
    const t = f, o = new ot({
      data: t.value,
      width: t.width,
      height: t.height,
      margin: t.margin,
      qrOptions: t.qrOptions,
      imageOptions: t.imageOptions,
      dotsOptions: t.dotsOptions,
      backgroundOptions: t.backgroundOptions,
      image: t.image,
      cornersSquareOptions: t.cornersSquareOptions,
      cornersDotOptions: t.cornersDotOptions
    }), s = ([e, n] = wt(() => o.getImageUrl(t.fileExt)), e = await e, n(), e);
    function i() {
      o.download(t.downloadOptions);
    }
    return (r, a) => (V(), Z("div", null, [
      W(s) ? (V(), Z("div", {
        key: 0,
        class: z(f.myclass)
      }, [
        at("img", {
          src: W(s),
          class: z(f.imgclass),
          crossorigin: "anonymous"
        }, null, 10, Ft)
      ], 2)) : st("", !0),
      W(s) && f.download ? (V(), Z("div", Ut, [
        at("button", {
          class: z(f.downloadButton),
          onClick: i
        }, _t(f.buttonName), 3)
      ])) : st("", !0)
    ]));
  }
}), Ht = /* @__PURE__ */ dt({
  __name: "QRCodeVue3",
  props: {
    value: { default: "" },
    width: { default: 300 },
    height: { default: 300 },
    margin: { default: 0 },
    imgclass: { default: "" },
    myclass: { default: "" },
    downloadButton: { default: "" },
    buttonName: { default: "Download" },
    qrOptions: { default: {
      typeNumber: 0,
      mode: "Byte",
      errorCorrectionLevel: "Q"
    } },
    imageOptions: { default: { hideBackgroundDots: !0, imageSize: 0.4, margin: 0 } },
    dotsOptions: { default: {
      type: "dots",
      color: "#6a1a4c",
      gradient: {
        type: "linear",
        rotation: 0,
        colorStops: [
          { offset: 0, color: "#6a1a4c" },
          { offset: 1, color: "#6a1a4c" }
        ]
      }
    } },
    backgroundOptions: { default: { color: "#ffffff" } },
    cornersSquareOptions: { default: { type: "dot", color: "#000000" } },
    cornersDotOptions: { default: { type: void 0, color: "#000000" } },
    fileExt: { default: "png" },
    image: { default: "" },
    download: { type: Boolean, default: !1 },
    downloadOptions: { default: { name: "vqr", extension: "png" } }
  },
  setup(f) {
    const e = f;
    return (n, t) => (V(), mt(yt, null, {
      default: bt(() => [
        Mt(Gt, {
          "background-options": e.backgroundOptions,
          "button-name": e.buttonName,
          "corners-dot-options": e.cornersDotOptions,
          "corners-square-options": e.cornersSquareOptions,
          "dots-options": e.dotsOptions,
          download: e.download,
          "download-button": e.downloadButton,
          "download-options": e.downloadOptions,
          "file-ext": e.fileExt,
          height: e.height,
          image: e.image,
          "image-options": e.imageOptions,
          imgclass: e.imgclass,
          margin: e.margin,
          value: e.value,
          myclass: e.myclass,
          "qr-options": e.qrOptions,
          width: e.width
        }, null, 8, ["background-options", "button-name", "corners-dot-options", "corners-square-options", "dots-options", "download", "download-button", "download-options", "file-ext", "height", "image", "image-options", "imgclass", "margin", "value", "myclass", "qr-options", "width"])
      ]),
      _: 1
    }));
  }
});
export {
  Ht as QRCodeVue3
};
