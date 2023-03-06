function gn(e, t) {
  const n = /* @__PURE__ */ Object.create(null), r = e.split(",");
  for (let s = 0; s < r.length; s++)
    n[r[s]] = !0;
  return t ? (s) => !!n[s.toLowerCase()] : (s) => !!n[s];
}
function wn(e) {
  if (q(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const r = e[n], s = J(r) ? gs(r) : wn(r);
      if (s)
        for (const i in s)
          t[i] = s[i];
    }
    return t;
  } else {
    if (J(e))
      return e;
    if (I(e))
      return e;
  }
}
const vs = /;(?![^(]*\))/g, bs = /:([^]+)/, ms = /\/\*.*?\*\//gs;
function gs(e) {
  const t = {};
  return e.replace(ms, "").split(vs).forEach((n) => {
    if (n) {
      const r = n.split(bs);
      r.length > 1 && (t[r[0].trim()] = r[1].trim());
    }
  }), t;
}
function Pn(e) {
  let t = "";
  if (J(e))
    t = e;
  else if (q(e))
    for (let n = 0; n < e.length; n++) {
      const r = Pn(e[n]);
      r && (t += r + " ");
    }
  else if (I(e))
    for (const n in e)
      e[n] && (t += n + " ");
  return t.trim();
}
const ws = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", Ps = /* @__PURE__ */ gn(ws);
function xr(e) {
  return !!e || e === "";
}
const mt = (e) => J(e) ? e : e == null ? "" : q(e) || I(e) && (e.toString === qr || !j(e.toString)) ? JSON.stringify(e, zr, 2) : String(e), zr = (e, t) => t && t.__v_isRef ? zr(e, t.value) : Ke(t) ? {
  [`Map(${t.size})`]: [...t.entries()].reduce((n, [r, s]) => (n[`${r} =>`] = s, n), {})
} : Xr(t) ? {
  [`Set(${t.size})`]: [...t.values()]
} : I(t) && !q(t) && !jr(t) ? String(t) : t, B = {}, Fe = [], ue = () => {
}, ys = () => !1, xs = /^on[^a-z]/, Vt = (e) => xs.test(e), yn = (e) => e.startsWith("onUpdate:"), G = Object.assign, xn = (e, t) => {
  const n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}, zs = Object.prototype.hasOwnProperty, C = (e, t) => zs.call(e, t), q = Array.isArray, Ke = (e) => Lt(e) === "[object Map]", Xr = (e) => Lt(e) === "[object Set]", j = (e) => typeof e == "function", J = (e) => typeof e == "string", zn = (e) => typeof e == "symbol", I = (e) => e !== null && typeof e == "object", Hr = (e) => I(e) && j(e.then) && j(e.catch), qr = Object.prototype.toString, Lt = (e) => qr.call(e), Xs = (e) => Lt(e).slice(8, -1), jr = (e) => Lt(e) === "[object Object]", Xn = (e) => J(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, qt = /* @__PURE__ */ gn(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), Zt = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return (n) => t[n] || (t[n] = e(n));
}, Hs = /-(\w)/g, we = Zt((e) => e.replace(Hs, (t, n) => n ? n.toUpperCase() : "")), qs = /\B([A-Z])/g, ie = Zt((e) => e.replace(qs, "-$1").toLowerCase()), Tr = Zt((e) => e.charAt(0).toUpperCase() + e.slice(1)), _t = Zt((e) => e ? `on${Tr(e)}` : ""), Wt = (e, t) => !Object.is(e, t), jt = (e, t) => {
  for (let n = 0; n < e.length; n++)
    e[n](t);
}, Dt = (e, t, n) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    value: n
  });
}, on = (e) => {
  const t = parseFloat(e);
  return isNaN(t) ? e : t;
}, Fn = (e) => {
  const t = J(e) ? Number(e) : NaN;
  return isNaN(t) ? e : t;
};
let Kn;
const js = () => Kn || (Kn = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
let se;
class Ts {
  constructor(t = !1) {
    this.detached = t, this._active = !0, this.effects = [], this.cleanups = [], this.parent = se, !t && se && (this.index = (se.scopes || (se.scopes = [])).push(this) - 1);
  }
  get active() {
    return this._active;
  }
  run(t) {
    if (this._active) {
      const n = se;
      try {
        return se = this, t();
      } finally {
        se = n;
      }
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    se = this;
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    se = this.parent;
  }
  stop(t) {
    if (this._active) {
      let n, r;
      for (n = 0, r = this.effects.length; n < r; n++)
        this.effects[n].stop();
      for (n = 0, r = this.cleanups.length; n < r; n++)
        this.cleanups[n]();
      if (this.scopes)
        for (n = 0, r = this.scopes.length; n < r; n++)
          this.scopes[n].stop(!0);
      if (!this.detached && this.parent && !t) {
        const s = this.parent.scopes.pop();
        s && s !== this && (this.parent.scopes[this.index] = s, s.index = this.index);
      }
      this.parent = void 0, this._active = !1;
    }
  }
}
function Ns(e, t = se) {
  t && t.active && t.effects.push(e);
}
function Os() {
  return se;
}
const Hn = (e) => {
  const t = new Set(e);
  return t.w = 0, t.n = 0, t;
}, Nr = (e) => (e.w & Ne) > 0, Or = (e) => (e.n & Ne) > 0, Ws = ({ deps: e }) => {
  if (e.length)
    for (let t = 0; t < e.length; t++)
      e[t].w |= Ne;
}, Ds = (e) => {
  const { deps: t } = e;
  if (t.length) {
    let n = 0;
    for (let r = 0; r < t.length; r++) {
      const s = t[r];
      Nr(s) && !Or(s) ? s.delete(e) : t[n++] = s, s.w &= ~Ne, s.n &= ~Ne;
    }
    t.length = n;
  }
}, ln = /* @__PURE__ */ new WeakMap();
let st = 0, Ne = 1;
const fn = 30;
let oe;
const Ue = Symbol(""), un = Symbol("");
class qn {
  constructor(t, n = null, r) {
    this.fn = t, this.scheduler = n, this.active = !0, this.deps = [], this.parent = void 0, Ns(this, r);
  }
  run() {
    if (!this.active)
      return this.fn();
    let t = oe, n = qe;
    for (; t; ) {
      if (t === this)
        return;
      t = t.parent;
    }
    try {
      return this.parent = oe, oe = this, qe = !0, Ne = 1 << ++st, st <= fn ? Ws(this) : Gn(this), this.fn();
    } finally {
      st <= fn && Ds(this), Ne = 1 << --st, oe = this.parent, qe = n, this.parent = void 0, this.deferStop && this.stop();
    }
  }
  stop() {
    oe === this ? this.deferStop = !0 : this.active && (Gn(this), this.onStop && this.onStop(), this.active = !1);
  }
}
function Gn(e) {
  const { deps: t } = e;
  if (t.length) {
    for (let n = 0; n < t.length; n++)
      t[n].delete(e);
    t.length = 0;
  }
}
let qe = !0;
const Wr = [];
function $e() {
  Wr.push(qe), qe = !1;
}
function et() {
  const e = Wr.pop();
  qe = e === void 0 ? !0 : e;
}
function te(e, t, n) {
  if (qe && oe) {
    let r = ln.get(e);
    r || ln.set(e, r = /* @__PURE__ */ new Map());
    let s = r.get(n);
    s || r.set(n, s = Hn()), Dr(s);
  }
}
function Dr(e, t) {
  let n = !1;
  st <= fn ? Or(e) || (e.n |= Ne, n = !Nr(e)) : n = !e.has(oe), n && (e.add(oe), oe.deps.push(e));
}
function Pe(e, t, n, r, s, i) {
  const o = ln.get(e);
  if (!o)
    return;
  let f = [];
  if (t === "clear")
    f = [...o.values()];
  else if (n === "length" && q(e)) {
    const c = Number(r);
    o.forEach((d, v) => {
      (v === "length" || v >= c) && f.push(d);
    });
  } else
    switch (n !== void 0 && f.push(o.get(n)), t) {
      case "add":
        q(e) ? Xn(n) && f.push(o.get("length")) : (f.push(o.get(Ue)), Ke(e) && f.push(o.get(un)));
        break;
      case "delete":
        q(e) || (f.push(o.get(Ue)), Ke(e) && f.push(o.get(un)));
        break;
      case "set":
        Ke(e) && f.push(o.get(Ue));
        break;
    }
  if (f.length === 1)
    f[0] && cn(f[0]);
  else {
    const c = [];
    for (const d of f)
      d && c.push(...d);
    cn(Hn(c));
  }
}
function cn(e, t) {
  const n = q(e) ? e : [...e];
  for (const r of n)
    r.computed && Yn(r);
  for (const r of n)
    r.computed || Yn(r);
}
function Yn(e, t) {
  (e !== oe || e.allowRecurse) && (e.scheduler ? e.scheduler() : e.run());
}
const Cs = /* @__PURE__ */ gn("__proto__,__v_isRef,__isVue"), Cr = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(zn)
), Es = /* @__PURE__ */ jn(), Vs = /* @__PURE__ */ jn(!1, !0), Ls = /* @__PURE__ */ jn(!0), Qn = /* @__PURE__ */ Zs();
function Zs() {
  const e = {};
  return ["includes", "indexOf", "lastIndexOf"].forEach((t) => {
    e[t] = function(...n) {
      const r = E(this);
      for (let i = 0, o = this.length; i < o; i++)
        te(r, "get", i + "");
      const s = r[t](...n);
      return s === -1 || s === !1 ? r[t](...n.map(E)) : s;
    };
  }), ["push", "pop", "shift", "unshift", "splice"].forEach((t) => {
    e[t] = function(...n) {
      $e();
      const r = E(this)[t].apply(this, n);
      return et(), r;
    };
  }), e;
}
function Bs(e) {
  const t = E(this);
  return te(t, "has", e), t.hasOwnProperty(e);
}
function jn(e = !1, t = !1) {
  return function(r, s, i) {
    if (s === "__v_isReactive")
      return !e;
    if (s === "__v_isReadonly")
      return e;
    if (s === "__v_isShallow")
      return t;
    if (s === "__v_raw" && i === (e ? t ? ti : Br : t ? Zr : Lr).get(r))
      return r;
    const o = q(r);
    if (!e) {
      if (o && C(Qn, s))
        return Reflect.get(Qn, s, i);
      if (s === "hasOwnProperty")
        return Bs;
    }
    const f = Reflect.get(r, s, i);
    return (zn(s) ? Cr.has(s) : Cs(s)) || (e || te(r, "get", s), t) ? f : $(f) ? o && Xn(s) ? f : f.value : I(f) ? e ? kr(f) : On(f) : f;
  };
}
const ks = /* @__PURE__ */ Er(), Ss = /* @__PURE__ */ Er(!0);
function Er(e = !1) {
  return function(n, r, s, i) {
    let o = n[r];
    if (lt(o) && $(o) && !$(s))
      return !1;
    if (!e && (!an(s) && !lt(s) && (o = E(o), s = E(s)), !q(n) && $(o) && !$(s)))
      return o.value = s, !0;
    const f = q(n) && Xn(r) ? Number(r) < n.length : C(n, r), c = Reflect.set(n, r, s, i);
    return n === E(i) && (f ? Wt(s, o) && Pe(n, "set", r, s) : Pe(n, "add", r, s)), c;
  };
}
function Us(e, t) {
  const n = C(e, t);
  e[t];
  const r = Reflect.deleteProperty(e, t);
  return r && n && Pe(e, "delete", t, void 0), r;
}
function Is(e, t) {
  const n = Reflect.has(e, t);
  return (!zn(t) || !Cr.has(t)) && te(e, "has", t), n;
}
function Rs(e) {
  return te(e, "iterate", q(e) ? "length" : Ue), Reflect.ownKeys(e);
}
const Vr = {
  get: Es,
  set: ks,
  deleteProperty: Us,
  has: Is,
  ownKeys: Rs
}, Ms = {
  get: Ls,
  set(e, t) {
    return !0;
  },
  deleteProperty(e, t) {
    return !0;
  }
}, Js = /* @__PURE__ */ G({}, Vr, {
  get: Vs,
  set: Ss
}), Tn = (e) => e, Bt = (e) => Reflect.getPrototypeOf(e);
function gt(e, t, n = !1, r = !1) {
  e = e.__v_raw;
  const s = E(e), i = E(t);
  n || (t !== i && te(s, "get", t), te(s, "get", i));
  const { has: o } = Bt(s), f = r ? Tn : n ? Cn : Dn;
  if (o.call(s, t))
    return f(e.get(t));
  if (o.call(s, i))
    return f(e.get(i));
  e !== s && e.get(t);
}
function wt(e, t = !1) {
  const n = this.__v_raw, r = E(n), s = E(e);
  return t || (e !== s && te(r, "has", e), te(r, "has", s)), e === s ? n.has(e) : n.has(e) || n.has(s);
}
function Pt(e, t = !1) {
  return e = e.__v_raw, !t && te(E(e), "iterate", Ue), Reflect.get(e, "size", e);
}
function _n(e) {
  e = E(e);
  const t = E(this);
  return Bt(t).has.call(t, e) || (t.add(e), Pe(t, "add", e, e)), this;
}
function $n(e, t) {
  t = E(t);
  const n = E(this), { has: r, get: s } = Bt(n);
  let i = r.call(n, e);
  i || (e = E(e), i = r.call(n, e));
  const o = s.call(n, e);
  return n.set(e, t), i ? Wt(t, o) && Pe(n, "set", e, t) : Pe(n, "add", e, t), this;
}
function er(e) {
  const t = E(this), { has: n, get: r } = Bt(t);
  let s = n.call(t, e);
  s || (e = E(e), s = n.call(t, e)), r && r.call(t, e);
  const i = t.delete(e);
  return s && Pe(t, "delete", e, void 0), i;
}
function tr() {
  const e = E(this), t = e.size !== 0, n = e.clear();
  return t && Pe(e, "clear", void 0, void 0), n;
}
function yt(e, t) {
  return function(r, s) {
    const i = this, o = i.__v_raw, f = E(o), c = t ? Tn : e ? Cn : Dn;
    return !e && te(f, "iterate", Ue), o.forEach((d, v) => r.call(s, c(d), c(v), i));
  };
}
function xt(e, t, n) {
  return function(...r) {
    const s = this.__v_raw, i = E(s), o = Ke(i), f = e === "entries" || e === Symbol.iterator && o, c = e === "keys" && o, d = s[e](...r), v = n ? Tn : t ? Cn : Dn;
    return !t && te(i, "iterate", c ? un : Ue), {
      // iterator protocol
      next() {
        const { value: P, done: x } = d.next();
        return x ? { value: P, done: x } : {
          value: f ? [v(P[0]), v(P[1])] : v(P),
          done: x
        };
      },
      // iterable protocol
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function Xe(e) {
  return function(...t) {
    return e === "delete" ? !1 : this;
  };
}
function Fs() {
  const e = {
    get(i) {
      return gt(this, i);
    },
    get size() {
      return Pt(this);
    },
    has: wt,
    add: _n,
    set: $n,
    delete: er,
    clear: tr,
    forEach: yt(!1, !1)
  }, t = {
    get(i) {
      return gt(this, i, !1, !0);
    },
    get size() {
      return Pt(this);
    },
    has: wt,
    add: _n,
    set: $n,
    delete: er,
    clear: tr,
    forEach: yt(!1, !0)
  }, n = {
    get(i) {
      return gt(this, i, !0);
    },
    get size() {
      return Pt(this, !0);
    },
    has(i) {
      return wt.call(this, i, !0);
    },
    add: Xe(
      "add"
      /* TriggerOpTypes.ADD */
    ),
    set: Xe(
      "set"
      /* TriggerOpTypes.SET */
    ),
    delete: Xe(
      "delete"
      /* TriggerOpTypes.DELETE */
    ),
    clear: Xe(
      "clear"
      /* TriggerOpTypes.CLEAR */
    ),
    forEach: yt(!0, !1)
  }, r = {
    get(i) {
      return gt(this, i, !0, !0);
    },
    get size() {
      return Pt(this, !0);
    },
    has(i) {
      return wt.call(this, i, !0);
    },
    add: Xe(
      "add"
      /* TriggerOpTypes.ADD */
    ),
    set: Xe(
      "set"
      /* TriggerOpTypes.SET */
    ),
    delete: Xe(
      "delete"
      /* TriggerOpTypes.DELETE */
    ),
    clear: Xe(
      "clear"
      /* TriggerOpTypes.CLEAR */
    ),
    forEach: yt(!0, !0)
  };
  return ["keys", "values", "entries", Symbol.iterator].forEach((i) => {
    e[i] = xt(i, !1, !1), n[i] = xt(i, !0, !1), t[i] = xt(i, !1, !0), r[i] = xt(i, !0, !0);
  }), [
    e,
    n,
    t,
    r
  ];
}
const [Ks, Gs, Ys, Qs] = /* @__PURE__ */ Fs();
function Nn(e, t) {
  const n = t ? e ? Qs : Ys : e ? Gs : Ks;
  return (r, s, i) => s === "__v_isReactive" ? !e : s === "__v_isReadonly" ? e : s === "__v_raw" ? r : Reflect.get(C(n, s) && s in r ? n : r, s, i);
}
const _s = {
  get: /* @__PURE__ */ Nn(!1, !1)
}, $s = {
  get: /* @__PURE__ */ Nn(!1, !0)
}, ei = {
  get: /* @__PURE__ */ Nn(!0, !1)
}, Lr = /* @__PURE__ */ new WeakMap(), Zr = /* @__PURE__ */ new WeakMap(), Br = /* @__PURE__ */ new WeakMap(), ti = /* @__PURE__ */ new WeakMap();
function ni(e) {
  switch (e) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function ri(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : ni(Xs(e));
}
function On(e) {
  return lt(e) ? e : Wn(e, !1, Vr, _s, Lr);
}
function si(e) {
  return Wn(e, !1, Js, $s, Zr);
}
function kr(e) {
  return Wn(e, !0, Ms, ei, Br);
}
function Wn(e, t, n, r, s) {
  if (!I(e) || e.__v_raw && !(t && e.__v_isReactive))
    return e;
  const i = s.get(e);
  if (i)
    return i;
  const o = ri(e);
  if (o === 0)
    return e;
  const f = new Proxy(e, o === 2 ? r : n);
  return s.set(e, f), f;
}
function Ge(e) {
  return lt(e) ? Ge(e.__v_raw) : !!(e && e.__v_isReactive);
}
function lt(e) {
  return !!(e && e.__v_isReadonly);
}
function an(e) {
  return !!(e && e.__v_isShallow);
}
function Sr(e) {
  return Ge(e) || lt(e);
}
function E(e) {
  const t = e && e.__v_raw;
  return t ? E(t) : e;
}
function Ur(e) {
  return Dt(e, "__v_skip", !0), e;
}
const Dn = (e) => I(e) ? On(e) : e, Cn = (e) => I(e) ? kr(e) : e;
function ii(e) {
  qe && oe && (e = E(e), Dr(e.dep || (e.dep = Hn())));
}
function oi(e, t) {
  e = E(e);
  const n = e.dep;
  n && cn(n);
}
function $(e) {
  return !!(e && e.__v_isRef === !0);
}
function li(e) {
  return $(e) ? e.value : e;
}
const fi = {
  get: (e, t, n) => li(Reflect.get(e, t, n)),
  set: (e, t, n, r) => {
    const s = e[t];
    return $(s) && !$(n) ? (s.value = n, !0) : Reflect.set(e, t, n, r);
  }
};
function Ir(e) {
  return Ge(e) ? e : new Proxy(e, fi);
}
var Rr;
class ui {
  constructor(t, n, r, s) {
    this._setter = n, this.dep = void 0, this.__v_isRef = !0, this[Rr] = !1, this._dirty = !0, this.effect = new qn(t, () => {
      this._dirty || (this._dirty = !0, oi(this));
    }), this.effect.computed = this, this.effect.active = this._cacheable = !s, this.__v_isReadonly = r;
  }
  get value() {
    const t = E(this);
    return ii(t), (t._dirty || !t._cacheable) && (t._dirty = !1, t._value = t.effect.run()), t._value;
  }
  set value(t) {
    this._setter(t);
  }
}
Rr = "__v_isReadonly";
function ci(e, t, n = !1) {
  let r, s;
  const i = j(e);
  return i ? (r = e, s = ue) : (r = e.get, s = e.set), new ui(r, s, i || !s, n);
}
function je(e, t, n, r) {
  let s;
  try {
    s = r ? e(...r) : e();
  } catch (i) {
    kt(i, t, n);
  }
  return s;
}
function ce(e, t, n, r) {
  if (j(e)) {
    const i = je(e, t, n, r);
    return i && Hr(i) && i.catch((o) => {
      kt(o, t, n);
    }), i;
  }
  const s = [];
  for (let i = 0; i < e.length; i++)
    s.push(ce(e[i], t, n, r));
  return s;
}
function kt(e, t, n, r = !0) {
  const s = t ? t.vnode : null;
  if (t) {
    let i = t.parent;
    const o = t.proxy, f = n;
    for (; i; ) {
      const d = i.ec;
      if (d) {
        for (let v = 0; v < d.length; v++)
          if (d[v](e, o, f) === !1)
            return;
      }
      i = i.parent;
    }
    const c = t.appContext.config.errorHandler;
    if (c) {
      je(c, null, 10, [e, o, f]);
      return;
    }
  }
  ai(e, n, s, r);
}
function ai(e, t, n, r = !0) {
  console.error(e);
}
let ft = !1, dn = !1;
const K = [];
let pe = 0;
const Ye = [];
let me = null, Be = 0;
const Mr = /* @__PURE__ */ Promise.resolve();
let En = null;
function Jr(e) {
  const t = En || Mr;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function di(e) {
  let t = pe + 1, n = K.length;
  for (; t < n; ) {
    const r = t + n >>> 1;
    ut(K[r]) < e ? t = r + 1 : n = r;
  }
  return t;
}
function Vn(e) {
  (!K.length || !K.includes(e, ft && e.allowRecurse ? pe + 1 : pe)) && (e.id == null ? K.push(e) : K.splice(di(e.id), 0, e), Fr());
}
function Fr() {
  !ft && !dn && (dn = !0, En = Mr.then(Gr));
}
function Ai(e) {
  const t = K.indexOf(e);
  t > pe && K.splice(t, 1);
}
function hi(e) {
  q(e) ? Ye.push(...e) : (!me || !me.includes(e, e.allowRecurse ? Be + 1 : Be)) && Ye.push(e), Fr();
}
function nr(e, t = ft ? pe + 1 : 0) {
  for (; t < K.length; t++) {
    const n = K[t];
    n && n.pre && (K.splice(t, 1), t--, n());
  }
}
function Kr(e) {
  if (Ye.length) {
    const t = [...new Set(Ye)];
    if (Ye.length = 0, me) {
      me.push(...t);
      return;
    }
    for (me = t, me.sort((n, r) => ut(n) - ut(r)), Be = 0; Be < me.length; Be++)
      me[Be]();
    me = null, Be = 0;
  }
}
const ut = (e) => e.id == null ? 1 / 0 : e.id, pi = (e, t) => {
  const n = ut(e) - ut(t);
  if (n === 0) {
    if (e.pre && !t.pre)
      return -1;
    if (t.pre && !e.pre)
      return 1;
  }
  return n;
};
function Gr(e) {
  dn = !1, ft = !0, K.sort(pi);
  const t = ue;
  try {
    for (pe = 0; pe < K.length; pe++) {
      const n = K[pe];
      n && n.active !== !1 && je(
        n,
        null,
        14
        /* ErrorCodes.SCHEDULER */
      );
    }
  } finally {
    pe = 0, K.length = 0, Kr(), ft = !1, En = null, (K.length || Ye.length) && Gr();
  }
}
function vi(e, t, ...n) {
  if (e.isUnmounted)
    return;
  const r = e.vnode.props || B;
  let s = n;
  const i = t.startsWith("update:"), o = i && t.slice(7);
  if (o && o in r) {
    const v = `${o === "modelValue" ? "model" : o}Modifiers`, { number: P, trim: x } = r[v] || B;
    x && (s = n.map((T) => J(T) ? T.trim() : T)), P && (s = n.map(on));
  }
  let f, c = r[f = _t(t)] || // also try camelCase event handler (#2249)
  r[f = _t(we(t))];
  !c && i && (c = r[f = _t(ie(t))]), c && ce(c, e, 6, s);
  const d = r[f + "Once"];
  if (d) {
    if (!e.emitted)
      e.emitted = {};
    else if (e.emitted[f])
      return;
    e.emitted[f] = !0, ce(d, e, 6, s);
  }
}
function Yr(e, t, n = !1) {
  const r = t.emitsCache, s = r.get(e);
  if (s !== void 0)
    return s;
  const i = e.emits;
  let o = {}, f = !1;
  if (!j(e)) {
    const c = (d) => {
      const v = Yr(d, t, !0);
      v && (f = !0, G(o, v));
    };
    !n && t.mixins.length && t.mixins.forEach(c), e.extends && c(e.extends), e.mixins && e.mixins.forEach(c);
  }
  return !i && !f ? (I(e) && r.set(e, null), null) : (q(i) ? i.forEach((c) => o[c] = null) : G(o, i), I(e) && r.set(e, o), o);
}
function St(e, t) {
  return !e || !Vt(t) ? !1 : (t = t.slice(2).replace(/Once$/, ""), C(e, t[0].toLowerCase() + t.slice(1)) || C(e, ie(t)) || C(e, t));
}
let le = null, Ut = null;
function Ct(e) {
  const t = le;
  return le = e, Ut = e && e.type.__scopeId || null, t;
}
function bi(e) {
  Ut = e;
}
function mi() {
  Ut = null;
}
function gi(e, t = le, n) {
  if (!t || e._n)
    return e;
  const r = (...s) => {
    r._d && cr(-1);
    const i = Ct(t);
    let o;
    try {
      o = e(...s);
    } finally {
      Ct(i), r._d && cr(1);
    }
    return o;
  };
  return r._n = !0, r._c = !0, r._d = !0, r;
}
function $t(e) {
  const { type: t, vnode: n, proxy: r, withProxy: s, props: i, propsOptions: [o], slots: f, attrs: c, emit: d, render: v, renderCache: P, data: x, setupState: T, ctx: k, inheritAttrs: D } = e;
  let Y, S;
  const xe = Ct(e);
  try {
    if (n.shapeFlag & 4) {
      const F = s || r;
      Y = he(v.call(F, F, P, i, T, x, k)), S = c;
    } else {
      const F = t;
      Y = he(F.length > 1 ? F(i, { attrs: c, slots: f, emit: d }) : F(
        i,
        null
        /* we know it doesn't need it */
      )), S = t.props ? c : wi(c);
    }
  } catch (F) {
    ot.length = 0, kt(
      F,
      e,
      1
      /* ErrorCodes.RENDER_FUNCTION */
    ), Y = Te(ct);
  }
  let W = Y;
  if (S && D !== !1) {
    const F = Object.keys(S), { shapeFlag: ze } = W;
    F.length && ze & 7 && (o && F.some(yn) && (S = Pi(S, o)), W = Qe(W, S));
  }
  return n.dirs && (W = Qe(W), W.dirs = W.dirs ? W.dirs.concat(n.dirs) : n.dirs), n.transition && (W.transition = n.transition), Y = W, Ct(xe), Y;
}
const wi = (e) => {
  let t;
  for (const n in e)
    (n === "class" || n === "style" || Vt(n)) && ((t || (t = {}))[n] = e[n]);
  return t;
}, Pi = (e, t) => {
  const n = {};
  for (const r in e)
    (!yn(r) || !(r.slice(9) in t)) && (n[r] = e[r]);
  return n;
};
function yi(e, t, n) {
  const { props: r, children: s, component: i } = e, { props: o, children: f, patchFlag: c } = t, d = i.emitsOptions;
  if (t.dirs || t.transition)
    return !0;
  if (n && c >= 0) {
    if (c & 1024)
      return !0;
    if (c & 16)
      return r ? rr(r, o, d) : !!o;
    if (c & 8) {
      const v = t.dynamicProps;
      for (let P = 0; P < v.length; P++) {
        const x = v[P];
        if (o[x] !== r[x] && !St(d, x))
          return !0;
      }
    }
  } else
    return (s || f) && (!f || !f.$stable) ? !0 : r === o ? !1 : r ? o ? rr(r, o, d) : !0 : !!o;
  return !1;
}
function rr(e, t, n) {
  const r = Object.keys(t);
  if (r.length !== Object.keys(e).length)
    return !0;
  for (let s = 0; s < r.length; s++) {
    const i = r[s];
    if (t[i] !== e[i] && !St(n, i))
      return !0;
  }
  return !1;
}
function xi({ vnode: e, parent: t }, n) {
  for (; t && t.subTree === e; )
    (e = t.vnode).el = n, t = t.parent;
}
const zi = (e) => e.__isSuspense;
function Xi(e, t) {
  t && t.pendingBranch ? q(e) ? t.effects.push(...e) : t.effects.push(e) : hi(e);
}
function Hi(e, t) {
  if (M) {
    let n = M.provides;
    const r = M.parent && M.parent.provides;
    r === n && (n = M.provides = Object.create(r)), n[e] = t;
  }
}
function Tt(e, t, n = !1) {
  const r = M || le;
  if (r) {
    const s = r.parent == null ? r.vnode.appContext && r.vnode.appContext.provides : r.parent.provides;
    if (s && e in s)
      return s[e];
    if (arguments.length > 1)
      return n && j(t) ? t.call(r.proxy) : t;
  }
}
const zt = {};
function en(e, t, n) {
  return Qr(e, t, n);
}
function Qr(e, t, { immediate: n, deep: r, flush: s, onTrack: i, onTrigger: o } = B) {
  const f = Os() === M?.scope ? M : null;
  let c, d = !1, v = !1;
  if ($(e) ? (c = () => e.value, d = an(e)) : Ge(e) ? (c = () => e, r = !0) : q(e) ? (v = !0, d = e.some((W) => Ge(W) || an(W)), c = () => e.map((W) => {
    if ($(W))
      return W.value;
    if (Ge(W))
      return Se(W);
    if (j(W))
      return je(
        W,
        f,
        2
        /* ErrorCodes.WATCH_GETTER */
      );
  })) : j(e) ? t ? c = () => je(
    e,
    f,
    2
    /* ErrorCodes.WATCH_GETTER */
  ) : c = () => {
    if (!(f && f.isUnmounted))
      return P && P(), ce(e, f, 3, [x]);
  } : c = ue, t && r) {
    const W = c;
    c = () => Se(W());
  }
  let P, x = (W) => {
    P = S.onStop = () => {
      je(
        W,
        f,
        4
        /* ErrorCodes.WATCH_CLEANUP */
      );
    };
  }, T;
  if (dt)
    if (x = ue, t ? n && ce(t, f, 3, [
      c(),
      v ? [] : void 0,
      x
    ]) : c(), s === "sync") {
      const W = xo();
      T = W.__watcherHandles || (W.__watcherHandles = []);
    } else
      return ue;
  let k = v ? new Array(e.length).fill(zt) : zt;
  const D = () => {
    if (S.active)
      if (t) {
        const W = S.run();
        (r || d || (v ? W.some((F, ze) => Wt(F, k[ze])) : Wt(W, k))) && (P && P(), ce(t, f, 3, [
          W,
          // pass undefined as the old value when it's changed for the first time
          k === zt ? void 0 : v && k[0] === zt ? [] : k,
          x
        ]), k = W);
      } else
        S.run();
  };
  D.allowRecurse = !!t;
  let Y;
  s === "sync" ? Y = D : s === "post" ? Y = () => ee(D, f && f.suspense) : (D.pre = !0, f && (D.id = f.uid), Y = () => Vn(D));
  const S = new qn(c, Y);
  t ? n ? D() : k = S.run() : s === "post" ? ee(S.run.bind(S), f && f.suspense) : S.run();
  const xe = () => {
    S.stop(), f && f.scope && xn(f.scope.effects, S);
  };
  return T && T.push(xe), xe;
}
function qi(e, t, n) {
  const r = this.proxy, s = J(e) ? e.includes(".") ? _r(r, e) : () => r[e] : e.bind(r, r);
  let i;
  j(t) ? i = t : (i = t.handler, n = t);
  const o = M;
  _e(this);
  const f = Qr(s, i.bind(r), n);
  return o ? _e(o) : Ie(), f;
}
function _r(e, t) {
  const n = t.split(".");
  return () => {
    let r = e;
    for (let s = 0; s < n.length && r; s++)
      r = r[n[s]];
    return r;
  };
}
function Se(e, t) {
  if (!I(e) || e.__v_skip || (t = t || /* @__PURE__ */ new Set(), t.has(e)))
    return e;
  if (t.add(e), $(e))
    Se(e.value, t);
  else if (q(e))
    for (let n = 0; n < e.length; n++)
      Se(e[n], t);
  else if (Xr(e) || Ke(e))
    e.forEach((n) => {
      Se(n, t);
    });
  else if (jr(e))
    for (const n in e)
      Se(e[n], t);
  return e;
}
function $r(e) {
  return j(e) ? { setup: e, name: e.name } : e;
}
const Nt = (e) => !!e.type.__asyncLoader, es = (e) => e.type.__isKeepAlive;
function ji(e, t) {
  ts(e, "a", t);
}
function Ti(e, t) {
  ts(e, "da", t);
}
function ts(e, t, n = M) {
  const r = e.__wdc || (e.__wdc = () => {
    let s = n;
    for (; s; ) {
      if (s.isDeactivated)
        return;
      s = s.parent;
    }
    return e();
  });
  if (It(t, r, n), n) {
    let s = n.parent;
    for (; s && s.parent; )
      es(s.parent.vnode) && Ni(r, t, n, s), s = s.parent;
  }
}
function Ni(e, t, n, r) {
  const s = It(
    t,
    e,
    r,
    !0
    /* prepend */
  );
  ns(() => {
    xn(r[t], s);
  }, n);
}
function It(e, t, n = M, r = !1) {
  if (n) {
    const s = n[e] || (n[e] = []), i = t.__weh || (t.__weh = (...o) => {
      if (n.isUnmounted)
        return;
      $e(), _e(n);
      const f = ce(t, n, e, o);
      return Ie(), et(), f;
    });
    return r ? s.unshift(i) : s.push(i), i;
  }
}
const ye = (e) => (t, n = M) => (
  // post-create lifecycle registrations are noops during SSR (except for serverPrefetch)
  (!dt || e === "sp") && It(e, (...r) => t(...r), n)
), Oi = ye(
  "bm"
  /* LifecycleHooks.BEFORE_MOUNT */
), Wi = ye(
  "m"
  /* LifecycleHooks.MOUNTED */
), Di = ye(
  "bu"
  /* LifecycleHooks.BEFORE_UPDATE */
), Ci = ye(
  "u"
  /* LifecycleHooks.UPDATED */
), Ei = ye(
  "bum"
  /* LifecycleHooks.BEFORE_UNMOUNT */
), ns = ye(
  "um"
  /* LifecycleHooks.UNMOUNTED */
), Vi = ye(
  "sp"
  /* LifecycleHooks.SERVER_PREFETCH */
), Li = ye(
  "rtg"
  /* LifecycleHooks.RENDER_TRIGGERED */
), Zi = ye(
  "rtc"
  /* LifecycleHooks.RENDER_TRACKED */
);
function Bi(e, t = M) {
  It("ec", e, t);
}
function Xt(e, t) {
  const n = le;
  if (n === null)
    return e;
  const r = Jt(n) || n.proxy, s = e.dirs || (e.dirs = []);
  for (let i = 0; i < t.length; i++) {
    let [o, f, c, d = B] = t[i];
    o && (j(o) && (o = {
      mounted: o,
      updated: o
    }), o.deep && Se(f), s.push({
      dir: o,
      instance: r,
      value: f,
      oldValue: void 0,
      arg: c,
      modifiers: d
    }));
  }
  return e;
}
function Ve(e, t, n, r) {
  const s = e.dirs, i = t && t.dirs;
  for (let o = 0; o < s.length; o++) {
    const f = s[o];
    i && (f.oldValue = i[o].value);
    let c = f.dir[r];
    c && ($e(), ce(c, n, 8, [
      e.el,
      f,
      e,
      t
    ]), et());
  }
}
const ki = Symbol(), An = (e) => e ? ds(e) ? Jt(e) || e.proxy : An(e.parent) : null, it = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ G(/* @__PURE__ */ Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => An(e.parent),
    $root: (e) => An(e.root),
    $emit: (e) => e.emit,
    $options: (e) => Ln(e),
    $forceUpdate: (e) => e.f || (e.f = () => Vn(e.update)),
    $nextTick: (e) => e.n || (e.n = Jr.bind(e.proxy)),
    $watch: (e) => qi.bind(e)
  })
), tn = (e, t) => e !== B && !e.__isScriptSetup && C(e, t), Si = {
  get({ _: e }, t) {
    const { ctx: n, setupState: r, data: s, props: i, accessCache: o, type: f, appContext: c } = e;
    let d;
    if (t[0] !== "$") {
      const T = o[t];
      if (T !== void 0)
        switch (T) {
          case 1:
            return r[t];
          case 2:
            return s[t];
          case 4:
            return n[t];
          case 3:
            return i[t];
        }
      else {
        if (tn(r, t))
          return o[t] = 1, r[t];
        if (s !== B && C(s, t))
          return o[t] = 2, s[t];
        if (
          // only cache other properties when instance has declared (thus stable)
          // props
          (d = e.propsOptions[0]) && C(d, t)
        )
          return o[t] = 3, i[t];
        if (n !== B && C(n, t))
          return o[t] = 4, n[t];
        hn && (o[t] = 0);
      }
    }
    const v = it[t];
    let P, x;
    if (v)
      return t === "$attrs" && te(e, "get", t), v(e);
    if (
      // css module (injected by vue-loader)
      (P = f.__cssModules) && (P = P[t])
    )
      return P;
    if (n !== B && C(n, t))
      return o[t] = 4, n[t];
    if (
      // global properties
      x = c.config.globalProperties, C(x, t)
    )
      return x[t];
  },
  set({ _: e }, t, n) {
    const { data: r, setupState: s, ctx: i } = e;
    return tn(s, t) ? (s[t] = n, !0) : r !== B && C(r, t) ? (r[t] = n, !0) : C(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (i[t] = n, !0);
  },
  has({ _: { data: e, setupState: t, accessCache: n, ctx: r, appContext: s, propsOptions: i } }, o) {
    let f;
    return !!n[o] || e !== B && C(e, o) || tn(t, o) || (f = i[0]) && C(f, o) || C(r, o) || C(it, o) || C(s.config.globalProperties, o);
  },
  defineProperty(e, t, n) {
    return n.get != null ? e._.accessCache[t] = 0 : C(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n);
  }
};
let hn = !0;
function Ui(e) {
  const t = Ln(e), n = e.proxy, r = e.ctx;
  hn = !1, t.beforeCreate && sr(
    t.beforeCreate,
    e,
    "bc"
    /* LifecycleHooks.BEFORE_CREATE */
  );
  const {
    // state
    data: s,
    computed: i,
    methods: o,
    watch: f,
    provide: c,
    inject: d,
    // lifecycle
    created: v,
    beforeMount: P,
    mounted: x,
    beforeUpdate: T,
    updated: k,
    activated: D,
    deactivated: Y,
    beforeDestroy: S,
    beforeUnmount: xe,
    destroyed: W,
    unmounted: F,
    render: ze,
    renderTracked: Ft,
    renderTriggered: At,
    errorCaptured: We,
    serverPrefetch: Kt,
    // public API
    expose: De,
    inheritAttrs: tt,
    // assets
    components: ht,
    directives: pt,
    filters: Gt
  } = t;
  if (d && Ii(d, r, null, e.appContext.config.unwrapInjectedRef), o)
    for (const U in o) {
      const L = o[U];
      j(L) && (r[U] = L.bind(n));
    }
  if (s) {
    const U = s.call(n, n);
    I(U) && (e.data = On(U));
  }
  if (hn = !0, i)
    for (const U in i) {
      const L = i[U], Ce = j(L) ? L.bind(n, n) : j(L.get) ? L.get.bind(n, n) : ue, vt = !j(L) && j(L.set) ? L.set.bind(n) : ue, Ee = Po({
        get: Ce,
        set: vt
      });
      Object.defineProperty(r, U, {
        enumerable: !0,
        configurable: !0,
        get: () => Ee.value,
        set: (ae) => Ee.value = ae
      });
    }
  if (f)
    for (const U in f)
      rs(f[U], r, n, U);
  if (c) {
    const U = j(c) ? c.call(n) : c;
    Reflect.ownKeys(U).forEach((L) => {
      Hi(L, U[L]);
    });
  }
  v && sr(
    v,
    e,
    "c"
    /* LifecycleHooks.CREATED */
  );
  function Q(U, L) {
    q(L) ? L.forEach((Ce) => U(Ce.bind(n))) : L && U(L.bind(n));
  }
  if (Q(Oi, P), Q(Wi, x), Q(Di, T), Q(Ci, k), Q(ji, D), Q(Ti, Y), Q(Bi, We), Q(Zi, Ft), Q(Li, At), Q(Ei, xe), Q(ns, F), Q(Vi, Kt), q(De))
    if (De.length) {
      const U = e.exposed || (e.exposed = {});
      De.forEach((L) => {
        Object.defineProperty(U, L, {
          get: () => n[L],
          set: (Ce) => n[L] = Ce
        });
      });
    } else
      e.exposed || (e.exposed = {});
  ze && e.render === ue && (e.render = ze), tt != null && (e.inheritAttrs = tt), ht && (e.components = ht), pt && (e.directives = pt);
}
function Ii(e, t, n = ue, r = !1) {
  q(e) && (e = pn(e));
  for (const s in e) {
    const i = e[s];
    let o;
    I(i) ? "default" in i ? o = Tt(
      i.from || s,
      i.default,
      !0
      /* treat default function as factory */
    ) : o = Tt(i.from || s) : o = Tt(i), $(o) && r ? Object.defineProperty(t, s, {
      enumerable: !0,
      configurable: !0,
      get: () => o.value,
      set: (f) => o.value = f
    }) : t[s] = o;
  }
}
function sr(e, t, n) {
  ce(q(e) ? e.map((r) => r.bind(t.proxy)) : e.bind(t.proxy), t, n);
}
function rs(e, t, n, r) {
  const s = r.includes(".") ? _r(n, r) : () => n[r];
  if (J(e)) {
    const i = t[e];
    j(i) && en(s, i);
  } else if (j(e))
    en(s, e.bind(n));
  else if (I(e))
    if (q(e))
      e.forEach((i) => rs(i, t, n, r));
    else {
      const i = j(e.handler) ? e.handler.bind(n) : t[e.handler];
      j(i) && en(s, i, e);
    }
}
function Ln(e) {
  const t = e.type, { mixins: n, extends: r } = t, { mixins: s, optionsCache: i, config: { optionMergeStrategies: o } } = e.appContext, f = i.get(t);
  let c;
  return f ? c = f : !s.length && !n && !r ? c = t : (c = {}, s.length && s.forEach((d) => Et(c, d, o, !0)), Et(c, t, o)), I(t) && i.set(t, c), c;
}
function Et(e, t, n, r = !1) {
  const { mixins: s, extends: i } = t;
  i && Et(e, i, n, !0), s && s.forEach((o) => Et(e, o, n, !0));
  for (const o in t)
    if (!(r && o === "expose")) {
      const f = Ri[o] || n && n[o];
      e[o] = f ? f(e[o], t[o]) : t[o];
    }
  return e;
}
const Ri = {
  data: ir,
  props: Ze,
  emits: Ze,
  // objects
  methods: Ze,
  computed: Ze,
  // lifecycle
  beforeCreate: _,
  created: _,
  beforeMount: _,
  mounted: _,
  beforeUpdate: _,
  updated: _,
  beforeDestroy: _,
  beforeUnmount: _,
  destroyed: _,
  unmounted: _,
  activated: _,
  deactivated: _,
  errorCaptured: _,
  serverPrefetch: _,
  // assets
  components: Ze,
  directives: Ze,
  // watch
  watch: Ji,
  // provide / inject
  provide: ir,
  inject: Mi
};
function ir(e, t) {
  return t ? e ? function() {
    return G(j(e) ? e.call(this, this) : e, j(t) ? t.call(this, this) : t);
  } : t : e;
}
function Mi(e, t) {
  return Ze(pn(e), pn(t));
}
function pn(e) {
  if (q(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++)
      t[e[n]] = e[n];
    return t;
  }
  return e;
}
function _(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function Ze(e, t) {
  return e ? G(G(/* @__PURE__ */ Object.create(null), e), t) : t;
}
function Ji(e, t) {
  if (!e)
    return t;
  if (!t)
    return e;
  const n = G(/* @__PURE__ */ Object.create(null), e);
  for (const r in t)
    n[r] = _(e[r], t[r]);
  return n;
}
function Fi(e, t, n, r = !1) {
  const s = {}, i = {};
  Dt(i, Mt, 1), e.propsDefaults = /* @__PURE__ */ Object.create(null), ss(e, t, s, i);
  for (const o in e.propsOptions[0])
    o in s || (s[o] = void 0);
  n ? e.props = r ? s : si(s) : e.type.props ? e.props = s : e.props = i, e.attrs = i;
}
function Ki(e, t, n, r) {
  const { props: s, attrs: i, vnode: { patchFlag: o } } = e, f = E(s), [c] = e.propsOptions;
  let d = !1;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    (r || o > 0) && !(o & 16)
  ) {
    if (o & 8) {
      const v = e.vnode.dynamicProps;
      for (let P = 0; P < v.length; P++) {
        let x = v[P];
        if (St(e.emitsOptions, x))
          continue;
        const T = t[x];
        if (c)
          if (C(i, x))
            T !== i[x] && (i[x] = T, d = !0);
          else {
            const k = we(x);
            s[k] = vn(
              c,
              f,
              k,
              T,
              e,
              !1
              /* isAbsent */
            );
          }
        else
          T !== i[x] && (i[x] = T, d = !0);
      }
    }
  } else {
    ss(e, t, s, i) && (d = !0);
    let v;
    for (const P in f)
      (!t || // for camelCase
      !C(t, P) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((v = ie(P)) === P || !C(t, v))) && (c ? n && // for camelCase
      (n[P] !== void 0 || // for kebab-case
      n[v] !== void 0) && (s[P] = vn(
        c,
        f,
        P,
        void 0,
        e,
        !0
        /* isAbsent */
      )) : delete s[P]);
    if (i !== f)
      for (const P in i)
        (!t || !C(t, P)) && (delete i[P], d = !0);
  }
  d && Pe(e, "set", "$attrs");
}
function ss(e, t, n, r) {
  const [s, i] = e.propsOptions;
  let o = !1, f;
  if (t)
    for (let c in t) {
      if (qt(c))
        continue;
      const d = t[c];
      let v;
      s && C(s, v = we(c)) ? !i || !i.includes(v) ? n[v] = d : (f || (f = {}))[v] = d : St(e.emitsOptions, c) || (!(c in r) || d !== r[c]) && (r[c] = d, o = !0);
    }
  if (i) {
    const c = E(n), d = f || B;
    for (let v = 0; v < i.length; v++) {
      const P = i[v];
      n[P] = vn(s, c, P, d[P], e, !C(d, P));
    }
  }
  return o;
}
function vn(e, t, n, r, s, i) {
  const o = e[n];
  if (o != null) {
    const f = C(o, "default");
    if (f && r === void 0) {
      const c = o.default;
      if (o.type !== Function && j(c)) {
        const { propsDefaults: d } = s;
        n in d ? r = d[n] : (_e(s), r = d[n] = c.call(null, t), Ie());
      } else
        r = c;
    }
    o[
      0
      /* BooleanFlags.shouldCast */
    ] && (i && !f ? r = !1 : o[
      1
      /* BooleanFlags.shouldCastTrue */
    ] && (r === "" || r === ie(n)) && (r = !0));
  }
  return r;
}
function is(e, t, n = !1) {
  const r = t.propsCache, s = r.get(e);
  if (s)
    return s;
  const i = e.props, o = {}, f = [];
  let c = !1;
  if (!j(e)) {
    const v = (P) => {
      c = !0;
      const [x, T] = is(P, t, !0);
      G(o, x), T && f.push(...T);
    };
    !n && t.mixins.length && t.mixins.forEach(v), e.extends && v(e.extends), e.mixins && e.mixins.forEach(v);
  }
  if (!i && !c)
    return I(e) && r.set(e, Fe), Fe;
  if (q(i))
    for (let v = 0; v < i.length; v++) {
      const P = we(i[v]);
      or(P) && (o[P] = B);
    }
  else if (i)
    for (const v in i) {
      const P = we(v);
      if (or(P)) {
        const x = i[v], T = o[P] = q(x) || j(x) ? { type: x } : Object.assign({}, x);
        if (T) {
          const k = ur(Boolean, T.type), D = ur(String, T.type);
          T[
            0
            /* BooleanFlags.shouldCast */
          ] = k > -1, T[
            1
            /* BooleanFlags.shouldCastTrue */
          ] = D < 0 || k < D, (k > -1 || C(T, "default")) && f.push(P);
        }
      }
    }
  const d = [o, f];
  return I(e) && r.set(e, d), d;
}
function or(e) {
  return e[0] !== "$";
}
function lr(e) {
  const t = e && e.toString().match(/^\s*(function|class) (\w+)/);
  return t ? t[2] : e === null ? "null" : "";
}
function fr(e, t) {
  return lr(e) === lr(t);
}
function ur(e, t) {
  return q(t) ? t.findIndex((n) => fr(n, e)) : j(t) && fr(t, e) ? 0 : -1;
}
const os = (e) => e[0] === "_" || e === "$stable", Zn = (e) => q(e) ? e.map(he) : [he(e)], Gi = (e, t, n) => {
  if (t._n)
    return t;
  const r = gi((...s) => Zn(t(...s)), n);
  return r._c = !1, r;
}, ls = (e, t, n) => {
  const r = e._ctx;
  for (const s in e) {
    if (os(s))
      continue;
    const i = e[s];
    if (j(i))
      t[s] = Gi(s, i, r);
    else if (i != null) {
      const o = Zn(i);
      t[s] = () => o;
    }
  }
}, fs = (e, t) => {
  const n = Zn(t);
  e.slots.default = () => n;
}, Yi = (e, t) => {
  if (e.vnode.shapeFlag & 32) {
    const n = t._;
    n ? (e.slots = E(t), Dt(t, "_", n)) : ls(t, e.slots = {});
  } else
    e.slots = {}, t && fs(e, t);
  Dt(e.slots, Mt, 1);
}, Qi = (e, t, n) => {
  const { vnode: r, slots: s } = e;
  let i = !0, o = B;
  if (r.shapeFlag & 32) {
    const f = t._;
    f ? n && f === 1 ? i = !1 : (G(s, t), !n && f === 1 && delete s._) : (i = !t.$stable, ls(t, s)), o = t;
  } else
    t && (fs(e, t), o = { default: 1 });
  if (i)
    for (const f in s)
      !os(f) && !(f in o) && delete s[f];
};
function us() {
  return {
    app: null,
    config: {
      isNativeTag: ys,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {}
    },
    mixins: [],
    components: {},
    directives: {},
    provides: /* @__PURE__ */ Object.create(null),
    optionsCache: /* @__PURE__ */ new WeakMap(),
    propsCache: /* @__PURE__ */ new WeakMap(),
    emitsCache: /* @__PURE__ */ new WeakMap()
  };
}
let _i = 0;
function $i(e, t) {
  return function(r, s = null) {
    j(r) || (r = Object.assign({}, r)), s != null && !I(s) && (s = null);
    const i = us(), o = /* @__PURE__ */ new Set();
    let f = !1;
    const c = i.app = {
      _uid: _i++,
      _component: r,
      _props: s,
      _container: null,
      _context: i,
      _instance: null,
      version: zo,
      get config() {
        return i.config;
      },
      set config(d) {
      },
      use(d, ...v) {
        return o.has(d) || (d && j(d.install) ? (o.add(d), d.install(c, ...v)) : j(d) && (o.add(d), d(c, ...v))), c;
      },
      mixin(d) {
        return i.mixins.includes(d) || i.mixins.push(d), c;
      },
      component(d, v) {
        return v ? (i.components[d] = v, c) : i.components[d];
      },
      directive(d, v) {
        return v ? (i.directives[d] = v, c) : i.directives[d];
      },
      mount(d, v, P) {
        if (!f) {
          const x = Te(r, s);
          return x.appContext = i, v && t ? t(x, d) : e(x, d, P), f = !0, c._container = d, d.__vue_app__ = c, Jt(x.component) || x.component.proxy;
        }
      },
      unmount() {
        f && (e(null, c._container), delete c._container.__vue_app__);
      },
      provide(d, v) {
        return i.provides[d] = v, c;
      }
    };
    return c;
  };
}
function bn(e, t, n, r, s = !1) {
  if (q(e)) {
    e.forEach((x, T) => bn(x, t && (q(t) ? t[T] : t), n, r, s));
    return;
  }
  if (Nt(r) && !s)
    return;
  const i = r.shapeFlag & 4 ? Jt(r.component) || r.component.proxy : r.el, o = s ? null : i, { i: f, r: c } = e, d = t && t.r, v = f.refs === B ? f.refs = {} : f.refs, P = f.setupState;
  if (d != null && d !== c && (J(d) ? (v[d] = null, C(P, d) && (P[d] = null)) : $(d) && (d.value = null)), j(c))
    je(c, f, 12, [o, v]);
  else {
    const x = J(c), T = $(c);
    if (x || T) {
      const k = () => {
        if (e.f) {
          const D = x ? C(P, c) ? P[c] : v[c] : c.value;
          s ? q(D) && xn(D, i) : q(D) ? D.includes(i) || D.push(i) : x ? (v[c] = [i], C(P, c) && (P[c] = v[c])) : (c.value = [i], e.k && (v[e.k] = c.value));
        } else
          x ? (v[c] = o, C(P, c) && (P[c] = o)) : T && (c.value = o, e.k && (v[e.k] = o));
      };
      o ? (k.id = -1, ee(k, n)) : k();
    }
  }
}
const ee = Xi;
function eo(e) {
  return to(e);
}
function to(e, t) {
  const n = js();
  n.__VUE__ = !0;
  const { insert: r, remove: s, patchProp: i, createElement: o, createText: f, createComment: c, setText: d, setElementText: v, parentNode: P, nextSibling: x, setScopeId: T = ue, insertStaticContent: k } = e, D = (l, u, a, h = null, A = null, m = null, w = !1, b = null, g = !!u.dynamicChildren) => {
    if (l === u)
      return;
    l && !rt(l, u) && (h = bt(l), ae(l, A, m, !0), l = null), u.patchFlag === -2 && (g = !1, u.dynamicChildren = null);
    const { type: p, ref: z, shapeFlag: y } = u;
    switch (p) {
      case Rt:
        Y(l, u, a, h);
        break;
      case ct:
        S(l, u, a, h);
        break;
      case nn:
        l == null && xe(u, a, h, w);
        break;
      case ge:
        ht(l, u, a, h, A, m, w, b, g);
        break;
      default:
        y & 1 ? ze(l, u, a, h, A, m, w, b, g) : y & 6 ? pt(l, u, a, h, A, m, w, b, g) : (y & 64 || y & 128) && p.process(l, u, a, h, A, m, w, b, g, Re);
    }
    z != null && A && bn(z, l && l.ref, m, u || l, !u);
  }, Y = (l, u, a, h) => {
    if (l == null)
      r(u.el = f(u.children), a, h);
    else {
      const A = u.el = l.el;
      u.children !== l.children && d(A, u.children);
    }
  }, S = (l, u, a, h) => {
    l == null ? r(u.el = c(u.children || ""), a, h) : u.el = l.el;
  }, xe = (l, u, a, h) => {
    [l.el, l.anchor] = k(l.children, u, a, h, l.el, l.anchor);
  }, W = ({ el: l, anchor: u }, a, h) => {
    let A;
    for (; l && l !== u; )
      A = x(l), r(l, a, h), l = A;
    r(u, a, h);
  }, F = ({ el: l, anchor: u }) => {
    let a;
    for (; l && l !== u; )
      a = x(l), s(l), l = a;
    s(u);
  }, ze = (l, u, a, h, A, m, w, b, g) => {
    w = w || u.type === "svg", l == null ? Ft(u, a, h, A, m, w, b, g) : Kt(l, u, A, m, w, b, g);
  }, Ft = (l, u, a, h, A, m, w, b) => {
    let g, p;
    const { type: z, props: y, shapeFlag: X, transition: H, dirs: N } = l;
    if (g = l.el = o(l.type, m, y && y.is, y), X & 8 ? v(g, l.children) : X & 16 && We(l.children, g, null, h, A, m && z !== "foreignObject", w, b), N && Ve(l, null, h, "created"), At(g, l, l.scopeId, w, h), y) {
      for (const V in y)
        V !== "value" && !qt(V) && i(g, V, null, y[V], m, l.children, h, A, be);
      "value" in y && i(g, "value", null, y.value), (p = y.onVnodeBeforeMount) && Ae(p, h, l);
    }
    N && Ve(l, null, h, "beforeMount");
    const Z = (!A || A && !A.pendingBranch) && H && !H.persisted;
    Z && H.beforeEnter(g), r(g, u, a), ((p = y && y.onVnodeMounted) || Z || N) && ee(() => {
      p && Ae(p, h, l), Z && H.enter(g), N && Ve(l, null, h, "mounted");
    }, A);
  }, At = (l, u, a, h, A) => {
    if (a && T(l, a), h)
      for (let m = 0; m < h.length; m++)
        T(l, h[m]);
    if (A) {
      let m = A.subTree;
      if (u === m) {
        const w = A.vnode;
        At(l, w, w.scopeId, w.slotScopeIds, A.parent);
      }
    }
  }, We = (l, u, a, h, A, m, w, b, g = 0) => {
    for (let p = g; p < l.length; p++) {
      const z = l[p] = b ? He(l[p]) : he(l[p]);
      D(null, z, u, a, h, A, m, w, b);
    }
  }, Kt = (l, u, a, h, A, m, w) => {
    const b = u.el = l.el;
    let { patchFlag: g, dynamicChildren: p, dirs: z } = u;
    g |= l.patchFlag & 16;
    const y = l.props || B, X = u.props || B;
    let H;
    a && Le(a, !1), (H = X.onVnodeBeforeUpdate) && Ae(H, a, u, l), z && Ve(u, l, a, "beforeUpdate"), a && Le(a, !0);
    const N = A && u.type !== "foreignObject";
    if (p ? De(l.dynamicChildren, p, b, a, h, N, m) : w || L(l, u, b, null, a, h, N, m, !1), g > 0) {
      if (g & 16)
        tt(b, u, y, X, a, h, A);
      else if (g & 2 && y.class !== X.class && i(b, "class", null, X.class, A), g & 4 && i(b, "style", y.style, X.style, A), g & 8) {
        const Z = u.dynamicProps;
        for (let V = 0; V < Z.length; V++) {
          const R = Z[V], re = y[R], Me = X[R];
          (Me !== re || R === "value") && i(b, R, re, Me, A, l.children, a, h, be);
        }
      }
      g & 1 && l.children !== u.children && v(b, u.children);
    } else
      !w && p == null && tt(b, u, y, X, a, h, A);
    ((H = X.onVnodeUpdated) || z) && ee(() => {
      H && Ae(H, a, u, l), z && Ve(u, l, a, "updated");
    }, h);
  }, De = (l, u, a, h, A, m, w) => {
    for (let b = 0; b < u.length; b++) {
      const g = l[b], p = u[b], z = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        g.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (g.type === ge || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !rt(g, p) || // - In the case of a component, it could contain anything.
        g.shapeFlag & 70) ? P(g.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          a
        )
      );
      D(g, p, z, null, h, A, m, w, !0);
    }
  }, tt = (l, u, a, h, A, m, w) => {
    if (a !== h) {
      if (a !== B)
        for (const b in a)
          !qt(b) && !(b in h) && i(l, b, a[b], null, w, u.children, A, m, be);
      for (const b in h) {
        if (qt(b))
          continue;
        const g = h[b], p = a[b];
        g !== p && b !== "value" && i(l, b, p, g, w, u.children, A, m, be);
      }
      "value" in h && i(l, "value", a.value, h.value);
    }
  }, ht = (l, u, a, h, A, m, w, b, g) => {
    const p = u.el = l ? l.el : f(""), z = u.anchor = l ? l.anchor : f("");
    let { patchFlag: y, dynamicChildren: X, slotScopeIds: H } = u;
    H && (b = b ? b.concat(H) : H), l == null ? (r(p, a, h), r(z, a, h), We(u.children, a, z, A, m, w, b, g)) : y > 0 && y & 64 && X && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    l.dynamicChildren ? (De(l.dynamicChildren, X, a, A, m, w, b), // #2080 if the stable fragment has a key, it's a <template v-for> that may
    //  get moved around. Make sure all root level vnodes inherit el.
    // #2134 or if it's a component root, it may also get moved around
    // as the component is being moved.
    (u.key != null || A && u === A.subTree) && cs(
      l,
      u,
      !0
      /* shallow */
    )) : L(l, u, a, z, A, m, w, b, g);
  }, pt = (l, u, a, h, A, m, w, b, g) => {
    u.slotScopeIds = b, l == null ? u.shapeFlag & 512 ? A.ctx.activate(u, a, h, w, g) : Gt(u, a, h, A, m, w, g) : Sn(l, u, g);
  }, Gt = (l, u, a, h, A, m, w) => {
    const b = l.component = po(l, h, A);
    if (es(l) && (b.ctx.renderer = Re), vo(b), b.asyncDep) {
      if (A && A.registerDep(b, Q), !l.el) {
        const g = b.subTree = Te(ct);
        S(null, g, u, a);
      }
      return;
    }
    Q(b, l, u, a, A, m, w);
  }, Sn = (l, u, a) => {
    const h = u.component = l.component;
    if (yi(l, u, a))
      if (h.asyncDep && !h.asyncResolved) {
        U(h, u, a);
        return;
      } else
        h.next = u, Ai(h.update), h.update();
    else
      u.el = l.el, h.vnode = u;
  }, Q = (l, u, a, h, A, m, w) => {
    const b = () => {
      if (l.isMounted) {
        let { next: z, bu: y, u: X, parent: H, vnode: N } = l, Z = z, V;
        Le(l, !1), z ? (z.el = N.el, U(l, z, w)) : z = N, y && jt(y), (V = z.props && z.props.onVnodeBeforeUpdate) && Ae(V, H, z, N), Le(l, !0);
        const R = $t(l), re = l.subTree;
        l.subTree = R, D(
          re,
          R,
          // parent may have changed if it's in a teleport
          P(re.el),
          // anchor may have changed if it's in a fragment
          bt(re),
          l,
          A,
          m
        ), z.el = R.el, Z === null && xi(l, R.el), X && ee(X, A), (V = z.props && z.props.onVnodeUpdated) && ee(() => Ae(V, H, z, N), A);
      } else {
        let z;
        const { el: y, props: X } = u, { bm: H, m: N, parent: Z } = l, V = Nt(u);
        if (Le(l, !1), H && jt(H), !V && (z = X && X.onVnodeBeforeMount) && Ae(z, Z, u), Le(l, !0), y && Qt) {
          const R = () => {
            l.subTree = $t(l), Qt(y, l.subTree, l, A, null);
          };
          V ? u.type.__asyncLoader().then(
            // note: we are moving the render call into an async callback,
            // which means it won't track dependencies - but it's ok because
            // a server-rendered async wrapper is already in resolved state
            // and it will never need to change.
            () => !l.isUnmounted && R()
          ) : R();
        } else {
          const R = l.subTree = $t(l);
          D(null, R, a, h, l, A, m), u.el = R.el;
        }
        if (N && ee(N, A), !V && (z = X && X.onVnodeMounted)) {
          const R = u;
          ee(() => Ae(z, Z, R), A);
        }
        (u.shapeFlag & 256 || Z && Nt(Z.vnode) && Z.vnode.shapeFlag & 256) && l.a && ee(l.a, A), l.isMounted = !0, u = a = h = null;
      }
    }, g = l.effect = new qn(
      b,
      () => Vn(p),
      l.scope
      // track it in component's effect scope
    ), p = l.update = () => g.run();
    p.id = l.uid, Le(l, !0), p();
  }, U = (l, u, a) => {
    u.component = l;
    const h = l.vnode.props;
    l.vnode = u, l.next = null, Ki(l, u.props, h, a), Qi(l, u.children, a), $e(), nr(), et();
  }, L = (l, u, a, h, A, m, w, b, g = !1) => {
    const p = l && l.children, z = l ? l.shapeFlag : 0, y = u.children, { patchFlag: X, shapeFlag: H } = u;
    if (X > 0) {
      if (X & 128) {
        vt(p, y, a, h, A, m, w, b, g);
        return;
      } else if (X & 256) {
        Ce(p, y, a, h, A, m, w, b, g);
        return;
      }
    }
    H & 8 ? (z & 16 && be(p, A, m), y !== p && v(a, y)) : z & 16 ? H & 16 ? vt(p, y, a, h, A, m, w, b, g) : be(p, A, m, !0) : (z & 8 && v(a, ""), H & 16 && We(y, a, h, A, m, w, b, g));
  }, Ce = (l, u, a, h, A, m, w, b, g) => {
    l = l || Fe, u = u || Fe;
    const p = l.length, z = u.length, y = Math.min(p, z);
    let X;
    for (X = 0; X < y; X++) {
      const H = u[X] = g ? He(u[X]) : he(u[X]);
      D(l[X], H, a, null, A, m, w, b, g);
    }
    p > z ? be(l, A, m, !0, !1, y) : We(u, a, h, A, m, w, b, g, y);
  }, vt = (l, u, a, h, A, m, w, b, g) => {
    let p = 0;
    const z = u.length;
    let y = l.length - 1, X = z - 1;
    for (; p <= y && p <= X; ) {
      const H = l[p], N = u[p] = g ? He(u[p]) : he(u[p]);
      if (rt(H, N))
        D(H, N, a, null, A, m, w, b, g);
      else
        break;
      p++;
    }
    for (; p <= y && p <= X; ) {
      const H = l[y], N = u[X] = g ? He(u[X]) : he(u[X]);
      if (rt(H, N))
        D(H, N, a, null, A, m, w, b, g);
      else
        break;
      y--, X--;
    }
    if (p > y) {
      if (p <= X) {
        const H = X + 1, N = H < z ? u[H].el : h;
        for (; p <= X; )
          D(null, u[p] = g ? He(u[p]) : he(u[p]), a, N, A, m, w, b, g), p++;
      }
    } else if (p > X)
      for (; p <= y; )
        ae(l[p], A, m, !0), p++;
    else {
      const H = p, N = p, Z = /* @__PURE__ */ new Map();
      for (p = N; p <= X; p++) {
        const ne = u[p] = g ? He(u[p]) : he(u[p]);
        ne.key != null && Z.set(ne.key, p);
      }
      let V, R = 0;
      const re = X - N + 1;
      let Me = !1, Rn = 0;
      const nt = new Array(re);
      for (p = 0; p < re; p++)
        nt[p] = 0;
      for (p = H; p <= y; p++) {
        const ne = l[p];
        if (R >= re) {
          ae(ne, A, m, !0);
          continue;
        }
        let de;
        if (ne.key != null)
          de = Z.get(ne.key);
        else
          for (V = N; V <= X; V++)
            if (nt[V - N] === 0 && rt(ne, u[V])) {
              de = V;
              break;
            }
        de === void 0 ? ae(ne, A, m, !0) : (nt[de - N] = p + 1, de >= Rn ? Rn = de : Me = !0, D(ne, u[de], a, null, A, m, w, b, g), R++);
      }
      const Mn = Me ? no(nt) : Fe;
      for (V = Mn.length - 1, p = re - 1; p >= 0; p--) {
        const ne = N + p, de = u[ne], Jn = ne + 1 < z ? u[ne + 1].el : h;
        nt[p] === 0 ? D(null, de, a, Jn, A, m, w, b, g) : Me && (V < 0 || p !== Mn[V] ? Ee(
          de,
          a,
          Jn,
          2
          /* MoveType.REORDER */
        ) : V--);
      }
    }
  }, Ee = (l, u, a, h, A = null) => {
    const { el: m, type: w, transition: b, children: g, shapeFlag: p } = l;
    if (p & 6) {
      Ee(l.component.subTree, u, a, h);
      return;
    }
    if (p & 128) {
      l.suspense.move(u, a, h);
      return;
    }
    if (p & 64) {
      w.move(l, u, a, Re);
      return;
    }
    if (w === ge) {
      r(m, u, a);
      for (let y = 0; y < g.length; y++)
        Ee(g[y], u, a, h);
      r(l.anchor, u, a);
      return;
    }
    if (w === nn) {
      W(l, u, a);
      return;
    }
    if (h !== 2 && p & 1 && b)
      if (h === 0)
        b.beforeEnter(m), r(m, u, a), ee(() => b.enter(m), A);
      else {
        const { leave: y, delayLeave: X, afterLeave: H } = b, N = () => r(m, u, a), Z = () => {
          y(m, () => {
            N(), H && H();
          });
        };
        X ? X(m, N, Z) : Z();
      }
    else
      r(m, u, a);
  }, ae = (l, u, a, h = !1, A = !1) => {
    const { type: m, props: w, ref: b, children: g, dynamicChildren: p, shapeFlag: z, patchFlag: y, dirs: X } = l;
    if (b != null && bn(b, null, a, l, !0), z & 256) {
      u.ctx.deactivate(l);
      return;
    }
    const H = z & 1 && X, N = !Nt(l);
    let Z;
    if (N && (Z = w && w.onVnodeBeforeUnmount) && Ae(Z, u, l), z & 6)
      ps(l.component, a, h);
    else {
      if (z & 128) {
        l.suspense.unmount(a, h);
        return;
      }
      H && Ve(l, null, u, "beforeUnmount"), z & 64 ? l.type.remove(l, u, a, A, Re, h) : p && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (m !== ge || y > 0 && y & 64) ? be(p, u, a, !1, !0) : (m === ge && y & 384 || !A && z & 16) && be(g, u, a), h && Un(l);
    }
    (N && (Z = w && w.onVnodeUnmounted) || H) && ee(() => {
      Z && Ae(Z, u, l), H && Ve(l, null, u, "unmounted");
    }, a);
  }, Un = (l) => {
    const { type: u, el: a, anchor: h, transition: A } = l;
    if (u === ge) {
      hs(a, h);
      return;
    }
    if (u === nn) {
      F(l);
      return;
    }
    const m = () => {
      s(a), A && !A.persisted && A.afterLeave && A.afterLeave();
    };
    if (l.shapeFlag & 1 && A && !A.persisted) {
      const { leave: w, delayLeave: b } = A, g = () => w(a, m);
      b ? b(l.el, m, g) : g();
    } else
      m();
  }, hs = (l, u) => {
    let a;
    for (; l !== u; )
      a = x(l), s(l), l = a;
    s(u);
  }, ps = (l, u, a) => {
    const { bum: h, scope: A, update: m, subTree: w, um: b } = l;
    h && jt(h), A.stop(), m && (m.active = !1, ae(w, l, u, a)), b && ee(b, u), ee(() => {
      l.isUnmounted = !0;
    }, u), u && u.pendingBranch && !u.isUnmounted && l.asyncDep && !l.asyncResolved && l.suspenseId === u.pendingId && (u.deps--, u.deps === 0 && u.resolve());
  }, be = (l, u, a, h = !1, A = !1, m = 0) => {
    for (let w = m; w < l.length; w++)
      ae(l[w], u, a, h, A);
  }, bt = (l) => l.shapeFlag & 6 ? bt(l.component.subTree) : l.shapeFlag & 128 ? l.suspense.next() : x(l.anchor || l.el), In = (l, u, a) => {
    l == null ? u._vnode && ae(u._vnode, null, null, !0) : D(u._vnode || null, l, u, null, null, null, a), nr(), Kr(), u._vnode = l;
  }, Re = {
    p: D,
    um: ae,
    m: Ee,
    r: Un,
    mt: Gt,
    mc: We,
    pc: L,
    pbc: De,
    n: bt,
    o: e
  };
  let Yt, Qt;
  return t && ([Yt, Qt] = t(Re)), {
    render: In,
    hydrate: Yt,
    createApp: $i(In, Yt)
  };
}
function Le({ effect: e, update: t }, n) {
  e.allowRecurse = t.allowRecurse = n;
}
function cs(e, t, n = !1) {
  const r = e.children, s = t.children;
  if (q(r) && q(s))
    for (let i = 0; i < r.length; i++) {
      const o = r[i];
      let f = s[i];
      f.shapeFlag & 1 && !f.dynamicChildren && ((f.patchFlag <= 0 || f.patchFlag === 32) && (f = s[i] = He(s[i]), f.el = o.el), n || cs(o, f)), f.type === Rt && (f.el = o.el);
    }
}
function no(e) {
  const t = e.slice(), n = [0];
  let r, s, i, o, f;
  const c = e.length;
  for (r = 0; r < c; r++) {
    const d = e[r];
    if (d !== 0) {
      if (s = n[n.length - 1], e[s] < d) {
        t[r] = s, n.push(r);
        continue;
      }
      for (i = 0, o = n.length - 1; i < o; )
        f = i + o >> 1, e[n[f]] < d ? i = f + 1 : o = f;
      d < e[n[i]] && (i > 0 && (t[r] = n[i - 1]), n[i] = r);
    }
  }
  for (i = n.length, o = n[i - 1]; i-- > 0; )
    n[i] = o, o = t[o];
  return n;
}
const ro = (e) => e.__isTeleport, ge = Symbol(void 0), Rt = Symbol(void 0), ct = Symbol(void 0), nn = Symbol(void 0), ot = [];
let fe = null;
function so(e = !1) {
  ot.push(fe = e ? null : []);
}
function io() {
  ot.pop(), fe = ot[ot.length - 1] || null;
}
let at = 1;
function cr(e) {
  at += e;
}
function oo(e) {
  return e.dynamicChildren = at > 0 ? fe || Fe : null, io(), at > 0 && fe && fe.push(e), e;
}
function lo(e, t, n, r, s, i) {
  return oo(O(
    e,
    t,
    n,
    r,
    s,
    i,
    !0
    /* isBlock */
  ));
}
function fo(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function rt(e, t) {
  return e.type === t.type && e.key === t.key;
}
const Mt = "__vInternal", as = ({ key: e }) => e ?? null, Ot = ({ ref: e, ref_key: t, ref_for: n }) => e != null ? J(e) || $(e) || j(e) ? { i: le, r: e, k: t, f: !!n } : e : null;
function O(e, t = null, n = null, r = 0, s = null, i = e === ge ? 0 : 1, o = !1, f = !1) {
  const c = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && as(t),
    ref: t && Ot(t),
    scopeId: Ut,
    slotScopeIds: null,
    children: n,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: i,
    patchFlag: r,
    dynamicProps: s,
    dynamicChildren: null,
    appContext: null,
    ctx: le
  };
  return f ? (Bn(c, n), i & 128 && e.normalize(c)) : n && (c.shapeFlag |= J(n) ? 8 : 16), at > 0 && // avoid a block node from tracking itself
  !o && // has current parent block
  fe && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (c.patchFlag > 0 || i & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  c.patchFlag !== 32 && fe.push(c), c;
}
const Te = uo;
function uo(e, t = null, n = null, r = 0, s = null, i = !1) {
  if ((!e || e === ki) && (e = ct), fo(e)) {
    const f = Qe(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return n && Bn(f, n), at > 0 && !i && fe && (f.shapeFlag & 6 ? fe[fe.indexOf(e)] = f : fe.push(f)), f.patchFlag |= -2, f;
  }
  if (wo(e) && (e = e.__vccOpts), t) {
    t = co(t);
    let { class: f, style: c } = t;
    f && !J(f) && (t.class = Pn(f)), I(c) && (Sr(c) && !q(c) && (c = G({}, c)), t.style = wn(c));
  }
  const o = J(e) ? 1 : zi(e) ? 128 : ro(e) ? 64 : I(e) ? 4 : j(e) ? 2 : 0;
  return O(e, t, n, r, s, o, i, !0);
}
function co(e) {
  return e ? Sr(e) || Mt in e ? G({}, e) : e : null;
}
function Qe(e, t, n = !1) {
  const { props: r, ref: s, patchFlag: i, children: o } = e, f = t ? ao(r || {}, t) : r;
  return {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: f,
    key: f && as(f),
    ref: t && t.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      n && s ? q(s) ? s.concat(Ot(t)) : [s, Ot(t)] : Ot(t)
    ) : s,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: o,
    target: e.target,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    // if the vnode is cloned with extra props, we can no longer assume its
    // existing patch flag to be reliable and need to add the FULL_PROPS flag.
    // note: preserve flag for fragments since they use the flag for children
    // fast paths only.
    patchFlag: t && e.type !== ge ? i === -1 ? 16 : i | 16 : i,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: e.transition,
    // These should technically only be non-null on mounted VNodes. However,
    // they *should* be copied for kept-alive vnodes. So we just always copy
    // them since them being non-null during a mount doesn't affect the logic as
    // they will simply be overwritten.
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && Qe(e.ssContent),
    ssFallback: e.ssFallback && Qe(e.ssFallback),
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce
  };
}
function ve(e = " ", t = 0) {
  return Te(Rt, null, e, t);
}
function he(e) {
  return e == null || typeof e == "boolean" ? Te(ct) : q(e) ? Te(
    ge,
    null,
    // #3666, avoid reference pollution when reusing vnode
    e.slice()
  ) : typeof e == "object" ? He(e) : Te(Rt, null, String(e));
}
function He(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : Qe(e);
}
function Bn(e, t) {
  let n = 0;
  const { shapeFlag: r } = e;
  if (t == null)
    t = null;
  else if (q(t))
    n = 16;
  else if (typeof t == "object")
    if (r & 65) {
      const s = t.default;
      s && (s._c && (s._d = !1), Bn(e, s()), s._c && (s._d = !0));
      return;
    } else {
      n = 32;
      const s = t._;
      !s && !(Mt in t) ? t._ctx = le : s === 3 && le && (le.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else
    j(t) ? (t = { default: t, _ctx: le }, n = 32) : (t = String(t), r & 64 ? (n = 16, t = [ve(t)]) : n = 8);
  e.children = t, e.shapeFlag |= n;
}
function ao(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const r = e[n];
    for (const s in r)
      if (s === "class")
        t.class !== r.class && (t.class = Pn([t.class, r.class]));
      else if (s === "style")
        t.style = wn([t.style, r.style]);
      else if (Vt(s)) {
        const i = t[s], o = r[s];
        o && i !== o && !(q(i) && i.includes(o)) && (t[s] = i ? [].concat(i, o) : o);
      } else
        s !== "" && (t[s] = r[s]);
  }
  return t;
}
function Ae(e, t, n, r = null) {
  ce(e, t, 7, [
    n,
    r
  ]);
}
const Ao = us();
let ho = 0;
function po(e, t, n) {
  const r = e.type, s = (t ? t.appContext : e.appContext) || Ao, i = {
    uid: ho++,
    vnode: e,
    type: r,
    parent: t,
    appContext: s,
    root: null,
    next: null,
    subTree: null,
    effect: null,
    update: null,
    scope: new Ts(
      !0
      /* detached */
    ),
    render: null,
    proxy: null,
    exposed: null,
    exposeProxy: null,
    withProxy: null,
    provides: t ? t.provides : Object.create(s.provides),
    accessCache: null,
    renderCache: [],
    // local resolved assets
    components: null,
    directives: null,
    // resolved props and emits options
    propsOptions: is(r, s),
    emitsOptions: Yr(r, s),
    // emit
    emit: null,
    emitted: null,
    // props default value
    propsDefaults: B,
    // inheritAttrs
    inheritAttrs: r.inheritAttrs,
    // state
    ctx: B,
    data: B,
    props: B,
    attrs: B,
    slots: B,
    refs: B,
    setupState: B,
    setupContext: null,
    // suspense related
    suspense: n,
    suspenseId: n ? n.pendingId : 0,
    asyncDep: null,
    asyncResolved: !1,
    // lifecycle hooks
    // not using enums here because it results in computed properties
    isMounted: !1,
    isUnmounted: !1,
    isDeactivated: !1,
    bc: null,
    c: null,
    bm: null,
    m: null,
    bu: null,
    u: null,
    um: null,
    bum: null,
    da: null,
    a: null,
    rtg: null,
    rtc: null,
    ec: null,
    sp: null
  };
  return i.ctx = { _: i }, i.root = t ? t.root : i, i.emit = vi.bind(null, i), e.ce && e.ce(i), i;
}
let M = null;
const _e = (e) => {
  M = e, e.scope.on();
}, Ie = () => {
  M && M.scope.off(), M = null;
};
function ds(e) {
  return e.vnode.shapeFlag & 4;
}
let dt = !1;
function vo(e, t = !1) {
  dt = t;
  const { props: n, children: r } = e.vnode, s = ds(e);
  Fi(e, n, s, t), Yi(e, r);
  const i = s ? bo(e, t) : void 0;
  return dt = !1, i;
}
function bo(e, t) {
  const n = e.type;
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = Ur(new Proxy(e.ctx, Si));
  const { setup: r } = n;
  if (r) {
    const s = e.setupContext = r.length > 1 ? go(e) : null;
    _e(e), $e();
    const i = je(r, e, 0, [e.props, s]);
    if (et(), Ie(), Hr(i)) {
      if (i.then(Ie, Ie), t)
        return i.then((o) => {
          ar(e, o, t);
        }).catch((o) => {
          kt(
            o,
            e,
            0
            /* ErrorCodes.SETUP_FUNCTION */
          );
        });
      e.asyncDep = i;
    } else
      ar(e, i, t);
  } else
    As(e, t);
}
function ar(e, t, n) {
  j(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : I(t) && (e.setupState = Ir(t)), As(e, n);
}
let dr;
function As(e, t, n) {
  const r = e.type;
  if (!e.render) {
    if (!t && dr && !r.render) {
      const s = r.template || Ln(e).template;
      if (s) {
        const { isCustomElement: i, compilerOptions: o } = e.appContext.config, { delimiters: f, compilerOptions: c } = r, d = G(G({
          isCustomElement: i,
          delimiters: f
        }, o), c);
        r.render = dr(s, d);
      }
    }
    e.render = r.render || ue;
  }
  _e(e), $e(), Ui(e), et(), Ie();
}
function mo(e) {
  return new Proxy(e.attrs, {
    get(t, n) {
      return te(e, "get", "$attrs"), t[n];
    }
  });
}
function go(e) {
  const t = (r) => {
    e.exposed = r || {};
  };
  let n;
  return {
    get attrs() {
      return n || (n = mo(e));
    },
    slots: e.slots,
    emit: e.emit,
    expose: t
  };
}
function Jt(e) {
  if (e.exposed)
    return e.exposeProxy || (e.exposeProxy = new Proxy(Ir(Ur(e.exposed)), {
      get(t, n) {
        if (n in t)
          return t[n];
        if (n in it)
          return it[n](e);
      },
      has(t, n) {
        return n in t || n in it;
      }
    }));
}
function wo(e) {
  return j(e) && "__vccOpts" in e;
}
const Po = (e, t) => ci(e, t, dt), yo = Symbol(""), xo = () => Tt(yo), zo = "3.2.47", Xo = "http://www.w3.org/2000/svg", ke = typeof document < "u" ? document : null, Ar = ke && /* @__PURE__ */ ke.createElement("template"), Ho = {
  insert: (e, t, n) => {
    t.insertBefore(e, n || null);
  },
  remove: (e) => {
    const t = e.parentNode;
    t && t.removeChild(e);
  },
  createElement: (e, t, n, r) => {
    const s = t ? ke.createElementNS(Xo, e) : ke.createElement(e, n ? { is: n } : void 0);
    return e === "select" && r && r.multiple != null && s.setAttribute("multiple", r.multiple), s;
  },
  createText: (e) => ke.createTextNode(e),
  createComment: (e) => ke.createComment(e),
  setText: (e, t) => {
    e.nodeValue = t;
  },
  setElementText: (e, t) => {
    e.textContent = t;
  },
  parentNode: (e) => e.parentNode,
  nextSibling: (e) => e.nextSibling,
  querySelector: (e) => ke.querySelector(e),
  setScopeId(e, t) {
    e.setAttribute(t, "");
  },
  // __UNSAFE__
  // Reason: innerHTML.
  // Static content here can only come from compiled templates.
  // As long as the user only uses trusted templates, this is safe.
  insertStaticContent(e, t, n, r, s, i) {
    const o = n ? n.previousSibling : t.lastChild;
    if (s && (s === i || s.nextSibling))
      for (; t.insertBefore(s.cloneNode(!0), n), !(s === i || !(s = s.nextSibling)); )
        ;
    else {
      Ar.innerHTML = r ? `<svg>${e}</svg>` : e;
      const f = Ar.content;
      if (r) {
        const c = f.firstChild;
        for (; c.firstChild; )
          f.appendChild(c.firstChild);
        f.removeChild(c);
      }
      t.insertBefore(f, n);
    }
    return [
      // first
      o ? o.nextSibling : t.firstChild,
      // last
      n ? n.previousSibling : t.lastChild
    ];
  }
};
function qo(e, t, n) {
  const r = e._vtc;
  r && (t = (t ? [t, ...r] : [...r]).join(" ")), t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t;
}
function jo(e, t, n) {
  const r = e.style, s = J(n);
  if (n && !s) {
    if (t && !J(t))
      for (const i in t)
        n[i] == null && mn(r, i, "");
    for (const i in n)
      mn(r, i, n[i]);
  } else {
    const i = r.display;
    s ? t !== n && (r.cssText = n) : t && e.removeAttribute("style"), "_vod" in e && (r.display = i);
  }
}
const hr = /\s*!important$/;
function mn(e, t, n) {
  if (q(n))
    n.forEach((r) => mn(e, t, r));
  else if (n == null && (n = ""), t.startsWith("--"))
    e.setProperty(t, n);
  else {
    const r = To(e, t);
    hr.test(n) ? e.setProperty(ie(r), n.replace(hr, ""), "important") : e[r] = n;
  }
}
const pr = ["Webkit", "Moz", "ms"], rn = {};
function To(e, t) {
  const n = rn[t];
  if (n)
    return n;
  let r = we(t);
  if (r !== "filter" && r in e)
    return rn[t] = r;
  r = Tr(r);
  for (let s = 0; s < pr.length; s++) {
    const i = pr[s] + r;
    if (i in e)
      return rn[t] = i;
  }
  return t;
}
const vr = "http://www.w3.org/1999/xlink";
function No(e, t, n, r, s) {
  if (r && t.startsWith("xlink:"))
    n == null ? e.removeAttributeNS(vr, t.slice(6, t.length)) : e.setAttributeNS(vr, t, n);
  else {
    const i = Ps(t);
    n == null || i && !xr(n) ? e.removeAttribute(t) : e.setAttribute(t, i ? "" : n);
  }
}
function Oo(e, t, n, r, s, i, o) {
  if (t === "innerHTML" || t === "textContent") {
    r && o(r, s, i), e[t] = n ?? "";
    return;
  }
  if (t === "value" && e.tagName !== "PROGRESS" && // custom elements may use _value internally
  !e.tagName.includes("-")) {
    e._value = n;
    const c = n ?? "";
    (e.value !== c || // #4956: always set for OPTION elements because its value falls back to
    // textContent if no value attribute is present. And setting .value for
    // OPTION has no side effect
    e.tagName === "OPTION") && (e.value = c), n == null && e.removeAttribute(t);
    return;
  }
  let f = !1;
  if (n === "" || n == null) {
    const c = typeof e[t];
    c === "boolean" ? n = xr(n) : n == null && c === "string" ? (n = "", f = !0) : c === "number" && (n = 0, f = !0);
  }
  try {
    e[t] = n;
  } catch {
  }
  f && e.removeAttribute(t);
}
function Je(e, t, n, r) {
  e.addEventListener(t, n, r);
}
function Wo(e, t, n, r) {
  e.removeEventListener(t, n, r);
}
function Do(e, t, n, r, s = null) {
  const i = e._vei || (e._vei = {}), o = i[t];
  if (r && o)
    o.value = r;
  else {
    const [f, c] = Co(t);
    if (r) {
      const d = i[t] = Lo(r, s);
      Je(e, f, d, c);
    } else
      o && (Wo(e, f, o, c), i[t] = void 0);
  }
}
const br = /(?:Once|Passive|Capture)$/;
function Co(e) {
  let t;
  if (br.test(e)) {
    t = {};
    let r;
    for (; r = e.match(br); )
      e = e.slice(0, e.length - r[0].length), t[r[0].toLowerCase()] = !0;
  }
  return [e[2] === ":" ? e.slice(3) : ie(e.slice(2)), t];
}
let sn = 0;
const Eo = /* @__PURE__ */ Promise.resolve(), Vo = () => sn || (Eo.then(() => sn = 0), sn = Date.now());
function Lo(e, t) {
  const n = (r) => {
    if (!r._vts)
      r._vts = Date.now();
    else if (r._vts <= n.attached)
      return;
    ce(Zo(r, n.value), t, 5, [r]);
  };
  return n.value = e, n.attached = Vo(), n;
}
function Zo(e, t) {
  if (q(t)) {
    const n = e.stopImmediatePropagation;
    return e.stopImmediatePropagation = () => {
      n.call(e), e._stopped = !0;
    }, t.map((r) => (s) => !s._stopped && r && r(s));
  } else
    return t;
}
const mr = /^on[a-z]/, Bo = (e, t, n, r, s = !1, i, o, f, c) => {
  t === "class" ? qo(e, r, s) : t === "style" ? jo(e, n, r) : Vt(t) ? yn(t) || Do(e, t, n, r, o) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : ko(e, t, r, s)) ? Oo(e, t, r, i, o, f, c) : (t === "true-value" ? e._trueValue = r : t === "false-value" && (e._falseValue = r), No(e, t, r, s));
};
function ko(e, t, n, r) {
  return r ? !!(t === "innerHTML" || t === "textContent" || t in e && mr.test(t) && j(n)) : t === "spellcheck" || t === "draggable" || t === "translate" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA" || mr.test(t) && J(n) ? !1 : t in e;
}
function So(e, t) {
  const n = $r(e);
  class r extends kn {
    constructor(i) {
      super(n, i, t);
    }
  }
  return r.def = n, r;
}
const Uo = typeof HTMLElement < "u" ? HTMLElement : class {
};
class kn extends Uo {
  constructor(t, n = {}, r) {
    super(), this._def = t, this._props = n, this._instance = null, this._connected = !1, this._resolved = !1, this._numberProps = null, this.shadowRoot && r ? r(this._createVNode(), this.shadowRoot) : (this.attachShadow({ mode: "open" }), this._def.__asyncLoader || this._resolveProps(this._def));
  }
  connectedCallback() {
    this._connected = !0, this._instance || (this._resolved ? this._update() : this._resolveDef());
  }
  disconnectedCallback() {
    this._connected = !1, Jr(() => {
      this._connected || (yr(null, this.shadowRoot), this._instance = null);
    });
  }
  /**
   * resolve inner component definition (handle possible async component)
   */
  _resolveDef() {
    this._resolved = !0;
    for (let r = 0; r < this.attributes.length; r++)
      this._setAttr(this.attributes[r].name);
    new MutationObserver((r) => {
      for (const s of r)
        this._setAttr(s.attributeName);
    }).observe(this, { attributes: !0 });
    const t = (r, s = !1) => {
      const { props: i, styles: o } = r;
      let f;
      if (i && !q(i))
        for (const c in i) {
          const d = i[c];
          (d === Number || d && d.type === Number) && (c in this._props && (this._props[c] = Fn(this._props[c])), (f || (f = /* @__PURE__ */ Object.create(null)))[we(c)] = !0);
        }
      this._numberProps = f, s && this._resolveProps(r), this._applyStyles(o), this._update();
    }, n = this._def.__asyncLoader;
    n ? n().then((r) => t(r, !0)) : t(this._def);
  }
  _resolveProps(t) {
    const { props: n } = t, r = q(n) ? n : Object.keys(n || {});
    for (const s of Object.keys(this))
      s[0] !== "_" && r.includes(s) && this._setProp(s, this[s], !0, !1);
    for (const s of r.map(we))
      Object.defineProperty(this, s, {
        get() {
          return this._getProp(s);
        },
        set(i) {
          this._setProp(s, i);
        }
      });
  }
  _setAttr(t) {
    let n = this.getAttribute(t);
    const r = we(t);
    this._numberProps && this._numberProps[r] && (n = Fn(n)), this._setProp(r, n, !1);
  }
  /**
   * @internal
   */
  _getProp(t) {
    return this._props[t];
  }
  /**
   * @internal
   */
  _setProp(t, n, r = !0, s = !0) {
    n !== this._props[t] && (this._props[t] = n, s && this._instance && this._update(), r && (n === !0 ? this.setAttribute(ie(t), "") : typeof n == "string" || typeof n == "number" ? this.setAttribute(ie(t), n + "") : n || this.removeAttribute(ie(t))));
  }
  _update() {
    yr(this._createVNode(), this.shadowRoot);
  }
  _createVNode() {
    const t = Te(this._def, G({}, this._props));
    return this._instance || (t.ce = (n) => {
      this._instance = n, n.isCE = !0;
      const r = (i, o) => {
        this.dispatchEvent(new CustomEvent(i, {
          detail: o
        }));
      };
      n.emit = (i, ...o) => {
        r(i, o), ie(i) !== i && r(ie(i), o);
      };
      let s = this;
      for (; s = s && (s.parentNode || s.host); )
        if (s instanceof kn) {
          n.parent = s._instance, n.provides = s._instance.provides;
          break;
        }
    }), t;
  }
  _applyStyles(t) {
    t && t.forEach((n) => {
      const r = document.createElement("style");
      r.textContent = n, this.shadowRoot.appendChild(r);
    });
  }
}
const gr = (e) => {
  const t = e.props["onUpdate:modelValue"] || !1;
  return q(t) ? (n) => jt(t, n) : t;
};
function Io(e) {
  e.target.composing = !0;
}
function wr(e) {
  const t = e.target;
  t.composing && (t.composing = !1, t.dispatchEvent(new Event("input")));
}
const Ht = {
  created(e, { modifiers: { lazy: t, trim: n, number: r } }, s) {
    e._assign = gr(s);
    const i = r || s.props && s.props.type === "number";
    Je(e, t ? "change" : "input", (o) => {
      if (o.target.composing)
        return;
      let f = e.value;
      n && (f = f.trim()), i && (f = on(f)), e._assign(f);
    }), n && Je(e, "change", () => {
      e.value = e.value.trim();
    }), t || (Je(e, "compositionstart", Io), Je(e, "compositionend", wr), Je(e, "change", wr));
  },
  // set value on mounted so it's after min/max for type="range"
  mounted(e, { value: t }) {
    e.value = t ?? "";
  },
  beforeUpdate(e, { value: t, modifiers: { lazy: n, trim: r, number: s } }, i) {
    if (e._assign = gr(i), e.composing || document.activeElement === e && e.type !== "range" && (n || r && e.value.trim() === t || (s || e.type === "number") && on(e.value) === t))
      return;
    const o = t ?? "";
    e.value !== o && (e.value = o);
  }
}, Ro = /* @__PURE__ */ G({ patchProp: Bo }, Ho);
let Pr;
function Mo() {
  return Pr || (Pr = eo(Ro));
}
const yr = (...e) => {
  Mo().render(...e);
}, Jo = $r({
  data() {
    return {
      firstname: "",
      name: "",
      activity: "",
      tel: ""
    };
  },
  methods: {
    copySignatureInClipBoard() {
      const e = this.$refs.htmlContent;
      if (!(e instanceof HTMLElement))
        return;
      const t = window.getSelection(), n = document.createRange();
      n.selectNodeContents(e), t && (t.removeAllRanges(), t.addRange(n));
    },
    getCleanedEmptyString(e, t) {
      return e.length > 0 ? e : t + " doit être rempli";
    }
  }
}), Fo = `.v-mail-signature-generator[data-v-82bb82c7]{--wcm-line-height: 20px;--wcm-font-size: 18px;max-width:30em;font-family:sans-serif;min-height:calc(100vh - 200px);padding-bottom:var(--wcm-line-height);font-size:var(--wcm-font-size);line-height:var(--wcm-line-height);margin:auto}.v-mail-signature-generator .v-mail-signature-generator__container[data-v-82bb82c7]{padding:var(--wcm-line-height);margin-bottom:var(--wcm-line-height);background:white}.v-mail-signature-generator .v-mail-signature-generator__container>*[data-v-82bb82c7]::-moz-selection{color:#20b2aa;background:#b0fdf6}.v-mail-signature-generator .v-mail-signature-generator__container>*[data-v-82bb82c7] ::selection{color:#20b2aa;background:#b0fdf6}.v-mail-signature-generator .v-mail-signature-generator__container>table[data-v-82bb82c7]{pointer-events:none}h1[data-v-82bb82c7]{font-size:calc(var(--wcm-font-size) * 2);line-height:calc(var(--wcm-line-height) * 2)}.v-mail-signature-generator__child-no-margin>*[data-v-82bb82c7]:first-child{margin-top:0}.v-mail-signature-generator__child-no-margin>*[data-v-82bb82c7]:last-child{margin-bottom:0}.fp-grid-container[data-v-82bb82c7],.fp-ui-form[data-v-82bb82c7]{display:flex;flex-wrap:wrap}.fp-ui-form>input[data-v-82bb82c7]{all:unset;display:block;position:relative;width:100%;cursor:pointer;box-sizing:border-box;box-shadow:inset 0 0 0 2px currentColor;padding:calc(var(--wcm-line-height) / 2);margin-bottom:var(--wcm-line-height)}.fp-grid-coll-24-24[data-v-82bb82c7]{width:100%}.fp-ui-button[data-v-82bb82c7]{all:unset;line-height:var(--wcm-line-height);font-size:var(--wcm-font-size);font-weight:400;margin:0 auto;cursor:pointer;display:block;box-sizing:border-box;box-shadow:inset 0 0 0 2px currentColor;padding:calc(var(--wcm-line-height) / 2) calc(var(--wcm-line-height))}
`, Ko = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [r, s] of t)
    n[r] = s;
  return n;
}, Oe = (e) => (bi("data-v-82bb82c7"), e = e(), mi(), e), Go = { class: "v-mail-signature-generator" }, Yo = { class: "fp-grid-container" }, Qo = { class: "fp-grid-coll-24-24 v-mail-signature-generator__child-no-margin" }, _o = /* @__PURE__ */ Oe(() => /* @__PURE__ */ O("h1", null, [
  /* @__PURE__ */ ve("Générateur"),
  /* @__PURE__ */ O("br"),
  /* @__PURE__ */ ve("de signature mail pour"),
  /* @__PURE__ */ O("br"),
  /* @__PURE__ */ ve("la Fondation Plaza")
], -1)), $o = { class: "v-mail-signature-generator__content fp-ui-form" }, el = {
  dir: "ltr",
  ref: "htmlContent",
  style: { width: "100%" }
}, tl = { style: { width: "100%", "font-family": "Helvetica, Arial, sans-serif", "font-size": "12px", "line-height": "15px", color: "black" } }, nl = {
  height: "auto",
  style: { "font-family": "Helvetica, Arial, sans-serif", "font-size": "12px", "line-height": "15px", color: "black", padding: "0" }
}, rl = /* @__PURE__ */ Oe(() => /* @__PURE__ */ O("br", null, null, -1)), sl = /* @__PURE__ */ Oe(() => /* @__PURE__ */ O("tr", null, [
  /* @__PURE__ */ O("td", {
    height: "auto",
    style: { "font-family": "Helvetica, Arial, sans-serif", "font-size": "12px", "line-height": "15px", "font-weight": "normal", padding: "15px 0 0", color: "black" }
  }, [
    /* @__PURE__ */ O("strong", null, "Fondation Plaza")
  ])
], -1)), il = /* @__PURE__ */ Oe(() => /* @__PURE__ */ O("tr", null, [
  /* @__PURE__ */ O("td", {
    height: "auto",
    style: { "font-family": "Helvetica, Arial, sans-serif", padding: "0", "line-height": "15px", "font-size": "12px", color: "black" }
  }, [
    /* @__PURE__ */ ve(" Rue de Chantepoulet 1–3 "),
    /* @__PURE__ */ O("br"),
    /* @__PURE__ */ ve("1201 Genève ")
  ])
], -1)), ol = {
  height: "auto",
  style: { "font-family": "Helvetica, Arial, sans-serif", padding: "15px 0 0", "line-height": "15px", "font-size": "12px", color: "black" }
}, ll = ["href"], fl = /* @__PURE__ */ Oe(() => /* @__PURE__ */ O("br", null, null, -1)), ul = /* @__PURE__ */ Oe(() => /* @__PURE__ */ O("a", {
  href: "https://leplaza-cinema.ch/",
  style: { "text-decoration": "none" }
}, "leplaza-cinema.ch", -1)), cl = /* @__PURE__ */ Oe(() => /* @__PURE__ */ O("tr", null, [
  /* @__PURE__ */ O("td", {
    border: "0",
    cellpadding: "0",
    cellspacing: "0",
    height: "auto",
    style: { padding: "15px 0 0" }
  }, [
    /* @__PURE__ */ O("img", {
      alt: "logo plaza",
      style: { height: "45px", margin: "0", width: "19px", "max-width": "191px" },
      src: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAgEASABIAAD/7QAsUGhvdG9zaG9wIDMuMAA4QklNA+0AAAAAABAASAAAAAEAAQBIAAAAAQAB/+ICOElDQ19QUk9GSUxFAAEBAAACKEFEQkUCEAAAbW50clJHQiBYWVogB88ABgADAAAAAAAAYWNzcEFQUEwAAAAAbm9uZQAAAAAAAAAAAAAAAAAAAAAAAPbWAAEAAAAA0y1BREJFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKY3BydAAAAPwAAAAyZGVzYwAAATAAAABkd3RwdAAAAZQAAAAUYmtwdAAAAagAAAAUclRSQwAAAbwAAAAOZ1RSQwAAAcwAAAAOYlRSQwAAAdwAAAAOclhZWgAAAewAAAAUZ1hZWgAAAgAAAAAUYlhZWgAAAhQAAAAUdGV4dAAAAABDb3B5cmlnaHQgMTk5OSBBZG9iZSBTeXN0ZW1zIEluY29ycG9yYXRlZAAAAGRlc2MAAAAAAAAACkFwcGxlIFJHQgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABYWVogAAAAAAAA81EAAQAAAAEWzFhZWiAAAAAAAAAAAAAAAAAAAAAAY3VydgAAAAAAAAABAc0AAGN1cnYAAAAAAAAAAQHNAABjdXJ2AAAAAAAAAAEBzQAAWFlaIAAAAAAAAHm9AABBUgAABLlYWVogAAAAAAAAVvgAAKwvAAAdA1hZWiAAAAAAAAAmIgAAEn8AALFw/+4AE0Fkb2JlAGQAAAAAAQUAAklE/9sAhAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAgICAgICAgICAgIDAwMDAwMDAwMDAQEBAQEBAQEBAQECAgECAgMCAgICAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMEBAQEBAQEBAQEBAQEBAQEBAQEBAT/wAARCABeASwDAREAAhEBAxEB/8QBogAAAAYCAwEAAAAAAAAAAAAABwgGBQQJAwoCAQALAQAABgMBAQEAAAAAAAAAAAAGBQQDBwIIAQkACgsQAAIBAwQBAwMCAwMDAgYJdQECAwQRBRIGIQcTIgAIMRRBMiMVCVFCFmEkMxdScYEYYpElQ6Gx8CY0cgoZwdE1J+FTNoLxkqJEVHNFRjdHYyhVVlcassLS4vJkg3SThGWjs8PT4yk4ZvN1Kjk6SElKWFlaZ2hpanZ3eHl6hYaHiImKlJWWl5iZmqSlpqeoqaq0tba3uLm6xMXGx8jJytTV1tfY2drk5ebn6Onq9PX29/j5+hEAAgEDAgQEAwUEBAQGBgVtAQIDEQQhEgUxBgAiE0FRBzJhFHEIQoEjkRVSoWIWMwmxJMHRQ3LwF+GCNCWSUxhjRPGisiY1GVQ2RWQnCnODk0Z0wtLi8lVldVY3hIWjs8PT4/MpGpSktMTU5PSVpbXF1eX1KEdXZjh2hpamtsbW5vZnd4eXp7fH1+f3SFhoeIiYqLjI2Oj4OUlZaXmJmam5ydnp+So6SlpqeoqaqrrK2ur6/9oADAMBAAIRAxEAPwDcq/2eTrj/AJ878zv/AEh/5Wf/AGpvYW/rbYf9Gzdf+yC8/wCtPU8/8DzzX/03PIX/AI9nLv8A3suvf7PJ1x/z535nf+kP/Kz/AO1N79/W2w/6Nm6/9kF5/wBaevf8DzzX/wBNzyF/49nLv/ey69/s8nXH/Pnfmd/6Q/8AKz/7U3v39bbD/o2br/2QXn/Wnr3/AAPPNf8A03PIX/j2cu/97LorL/zy/wCW9E7xS9xbojkjdkkjfqLtJHR0JV0dG2oGV1YWIPIPsOn3c5FBIO6SV/5ozf8AQHUxL/d4ferdVdORLQoRUEbntxBB4EH6nIPXD/h87+W3/wA/l3L/AOik7R/+xT37/Xd5E/6Osn/OGb/oDq3/ACbu+9b/ANMFaf8Acy2//tp6NJD86usqmGKop+o/mTUU9RFHNBPD8IvlVLDNDKgeKWKVOp2SSKRGBVgSCDcexCOb9vYBl23dCDkEWF5/1p6h6T7uvN0TvFLztyIsikqytzZy6CCMEEHcqgg8R1xqvnd1dQ0tTXV3U3zHo6Kjp5qqsrKr4S/KinpaWlp42mqKmpqJuqEigp4IkLO7EKqgkkAe9NzhtyKzvt26BAKkmwuwABxJPg9bh+7nzhcTRW9vzpyK87sERE5r5dZmZjQKoG5EkkmgAyT0WKf+eP8Ay4aaaWnqe391U9RBI0U0E/UHakU0MqEq8csUm01eORGFiCAQfZAfdvkVSVbdJAwwQYZv+gOpdj/u8/vUzRpLDyNZtEwqrLue3EEHgQRc0IPS568/m8fCztzMybd6ozncfZ24IaWWtlwXXnxz7y3pmYqKHT5quTGbb2Hkq1KWLUNUhQItxc+1dl7l8qbnKYNtmuriYCpSC2uJGp60WMmnQd5n+5D7+8kWKbpzptuxbRtjOI1uN03zaLWIseCiSe8jQsfIVqehr/2eTrj/AJ878zv/AEh/5Wf/AGpvZt/W2w/6Nm6/9kF5/wBaegB/wPPNf/Tc8hf+PZy7/wB7LpN7v/mLdE9fbbyu8d+7H+VWyNoYKGOpze6t3/Dv5M7a23h6eaohpIp8rnMz1hRYzHwy1VRHErTSorSOqg3YAsXPO+z2UEl1eWm4xWyCryS2V0qqOFSzQgDJ8+jXZPuue43M262exct8wcm7hvdyxS3s7HmfYJ55WCliscUW4PI5CqSQoJoCeA6Q/Wn82P4gdz1WVounqrvLtitwUFNVZyk60+M/fe+6rDUtbJLDR1OVp9r9f5WXHQVcsDrE8wRZGRgpJB9pLD3H5Y3VpF2t7u5ZAC4t7W4kKg8CdEZpWnn0IebPuXe+XIUNlcc9QcvbLBcsyW77tv2zWaysgBZYzcXsYcqCCQtSARXj0Ln+zydcf8+d+Z3/AKQ/8rP/ALU3sy/rbYf9Gzdf+yC8/wCtPQJ/4Hnmv/pueQv/AB7OXf8AvZdAhu/+b98Juvt3/wCj3fu4e39kb+142P8AuPu/47d4ba3f5MykMmHT+7WZ2JRZrXlY6iNqYeC86upTUGFym59zOU7K6+ivJ7mG8x+jLbXCv3fD2NGGz5Yz1IWyfce+8BzNsZ5n5b2vY9w5apIf3jY73tE9tSIkSnx4rx4qRlTr7u2hrSnQ3/7PJ1x/z535nf8ApD/ys/8AtTezb+tth/0bN1/7ILz/AK09R7/wPPNf/Tc8hf8Aj2cu/wDey6rO+Kn84X4F9RdH7c6/392huXC7swm5O0KjKYv/AEW9kVbUiZ/tXe248ask1JtmaATSYrLwO6atcTsUcK6sAAuXvc7k7bdpgsrzcZEuUeUsvgymmqZ2HBPQj7Oss/eP7jP3kedvcHdOZuW+TrS42W4tNvWGb94WChjDt1rA5Aa4BoJI2ANKMBUVBB6MfTfzxP5clbPHS0fbm7KupmJWKnpunu1Z55WALFY4YtpPI5CqTYA8D2eL7t8jOQqbnIWPACCY/wDPnUWTf3en3qLeN5rjkeySFcs77ntygfaTcgDoyeL+fPUmcx1FmMJ1f8v8xiMlTRVmOymL+FfykyGOr6SdQ8NVRV1J1VNTVVNMhurxsysOQfZ9HzltkyJLFt+5tGwqrLY3ZBHqCIaEdRRefdt522+6uLG/5u5HgvYnKSwzc1cvI6MMFXRtxDKwPEEAjqf/ALPJ1x/z535nf+kP/Kz/AO1N7v8A1tsP+jZuv/ZBef8AWnpN/wADzzX/ANNzyF/49nLv/ey69/s8nXH/AD535nf+kP8Ays/+1N79/W2w/wCjZuv/AGQXn/Wnr3/A881/9NzyF/49nLv/AHsugWzP83b4Xbd7Bh6l3Bmu5cF2pUZPDYWDrPM/HLvPGdgz5jcUdFLt/Ew7MrdhwbjkyediyVO1HAtMZapaiMxqwdblUvuXyrBejbZprpNxLKgt2tbgSamppGgx6qtUUFKmopx6H1j9yP383TlmTnXbNv2G55NWKWdt3g3zaJLIRQFhNIbpLwwCOEowkbXRCraiKGg0/wCzydcf8+d+Z3/pD/ys/wDtTezX+tth/wBGzdf+yC8/609AH/geea/+m55C/wDHs5d/72XQYdl/zUfij0vBiaruKLv/AKnpc/NV0+Cqey/i78gtiQZqfHpBJXwYmbdPXeKjyU1FHVRNMsJdo1kUsAGFy+/9w+XNqETbp9bbK5IQ3Fpcx6qUrp1xCtK5p0L+U/uce9HP0l7DyK3LW9TWyq1ym08wbLeGIOSEMgt76QoHKkKWpWhpwPQS/wDD538tv/n8u5f/AEUnaP8A9inst/13eRP+jrJ/zhm/6A6Gv/Ju771v/TBWn/cy2/8A7ael/wBcfzdvhd3FnKrbPUea7k7T3JQ4qfO1u3+uPjl3nvjOUeDpauhx9TmarE7Z2Hk6+nxVPX5OmgeoeMQpNURIWDSICtsfcvlXdJmt9smuricLrKQWtxIwUEAsQkZIAJArwqR69Brmr7kXv5yLt8O7877dsWzbVJMLaO63XfNotImlZXdYlkuLyNGkZI3YKDqKqxAoppz7I/m5fDHpzMUW3u3cv3P1Xn8jjUzOPwfZHxw712PmK/Dy1VVQxZWixm59hYutqsbJW0M8KzojRGWF0DakYD197lcq7XKkG5y3VvMy61Se1uI2K1IqA8YJFQRX5dV5V+5L79c92NxufJFhsO87bFKYJbjat82i7iSUKrmN5Le8kRZAjq2kkGjA0oR0MUPzq6yqYYqin6j+ZNRT1EUc0E8Pwi+VUsM0MqB4pYpU6nZJIpEYFWBIINx7NBzft7AMu27oQcgiwvP+tPQFk+7rzdE7xS87ciLIpKsrc2cuggjBBB3KoIPEdZf9nk64/wCfO/M7/wBIf+Vn/wBqb3v+tth/0bN1/wCyC8/609U/4Hnmv/pueQv/AB7OXf8AvZdFqzX87P8Al6bbytfgtxdnb5wObxVVNRZTDZrpTtzF5XG1tO7RVFJX46u2fBV0dVBIpV45EV1YEEA+yGX3X5JgkeGfcJkmU0ZHgmBBHEEFKg9Sxt/93/8Aee3ayttx2vlDb7nb5kEkM9vuu2SRurCoZHS6KspGQQSD05bQ/nNfAzsHP0G1Nhb47L3vujKzLT4vbe0Ohu5dy5/JVDkKkFBh8NsqtyNZM7GwWONmJ/Hty290uTr2ZLazvJ5rhjRY4redmP2KsZJ6Sb59w77yHLG23O88ycu7Tt+zwrqmu77eNrghQDiXllu0RR8yR0YP/Z5OuP8AnzvzO/8ASH/lZ/8Aam9nX9bbD/o2br/2QXn/AFp6jL/geea/+m55C/8AHs5d/wC9l0UD51/Njq2q+OeRmyPX/wAntpYrCdv/ABe3bmtx79+J3yJ2JtTEYLZXyh6c3dnKrJ7o3Z1xiMDQSfwnCTLTRy1CSVlW0VNCHnmjjYM83817c2xuz2e4RxpdWkryTWdzGgWO7gdiXeJVHappU5NAKkgdTj93X7v/ADjD7pW0drzLyje3lxsXMFlb2u28x7JeXEk11y/ultCsdvbX0szjxJVLkKRGmqRyqKzAYOtf5s/w87mrcnjOn63u/tfI4Wlhrszj+tfjT3zvqtxNFUTGnp6zJ0m19gZSegpZ5wUSSVURnFgSePZnYe5HLG6vJHtj3dy6CrrBa3EhUHAJCRmg+3oDc2fcr99OQre0u+ebbl7ZbW4cxwS7tv2z2iSOoqyxtcXsYdgMkKSQMnoX/wDZ5OuP+fO/M7/0h/5Wf/am9mf9bbD/AKNm6/8AZBef9aegP/wPPNf/AE3PIX/j2cu/97LoEN6/zfvhN1tuobE7F3D2/sHe5SgkGzd6/HbvDa26jHlQpxbjb2c2JQ5cpkg4NOfDaYEaL39lN17mcp2Fz9HfT3MN3j9KW2uEfPDtaMNnyxnqQtg+4994DmvZjzHyvtex7ly8C4N/Yb3tFxb1j/tB48N48VY/xd3b506G/wD2eTrj/nzvzO/9If8AlZ/9qb2bf1tsP+jZuv8A2QXn/WnqPf8Ageea/wDpueQv/Hs5d/72XXv9nk64/wCfO/M7/wBIf+Vn/wBqb37+tth/0bN1/wCyC8/609e/4Hnmv/pueQv/AB7OXf8AvZde/wBnk64/5878zv8A0h/5Wf8A2pvfv622H/Rs3X/sgvP+tPXv+B55r/6bnkL/AMezl3/vZdHO9inqBuve/de697917r59P8ur4Q7c+fHyc7M6e3PvvN9e0G2+u959lQ5rA4mgzNZVVmH7B2RtePFyUuQqKaGOmmh3jJKZAxYNAoAsxthdyRylBzlzBuG2XF48CRwyTh0AYkrJGlKGmO+v5dfTT96L7we7fds9oOUOedn5ct9zubvc7XaWt7mR4lVZbK7uDIGQMSwNqFpwoxPl1d1/0DXdQ/8AeT3ZH/oCbY/+u3uWP9Yja/8Ao/3H/ONP8/XPr/k69zz/AOEi2n/sruP+tfWyLQwUm3MDSU1RWRxUGBxFPBPX1kkVNDHSYujSOSsqpXZYaeNIYC7sSFQXJNh7nVAsEKqzdiLQk4wBxPp1yonkn3TcZpY4Cbm4mLLHGCxLSNUKoGSSTQDietLb5m/Mz5HfzXfk3T/Fb4uvmE6Vkz1bgtn7VxNdU4bH7/osNOZcp2t2jWsKZjt+KGkNZS0lUv2+No0jtE9a8jSYrc080777jb+OXeXi37p1lI41JUSBTmaU47cVAOFFMaq174+w3sN7V/cx9o5feX3hSA8/i2S5vbydFlezeVaR7dt6d365LeG7odUshbuEKgLZJ09/wnG+P+L2pS/6d+5u094b6qIKaXIHrOfbWyto4qoemjNZQY+LcO2N35rNR09WXWOtlkovPGFY0kLEqB1tfsbssduv743S4luyBq8DTGgNMgakdmofM0r/AAjrFLnr+9Q9zbzeZv8AW55E2ew5dVmEX72E93cyKGOl3MNxbRRFloTGok0moErCh6Jb82/5G3YPxf29kfkH8Quy9575xPXss26shtXILHi+29m4zEmKtXc21tz7XGMpd0S4SNJJ6kQ0eMrKeKISQrUHWIwrzZ7R3vL8L71yxfyzRwHxDG2JkAzrR0oH08TQKQBUV6nz7v394dyz7v7na+2PvjylYbfd7oos47yKsm23UklV8C4t7jxGtxKSFXVJLGzNpcpjVZZ/Jf8A5mef+Wm2st0D3llIa/vXrXb8OZwm7ZiIqztLYVLPTY2qyGWRUWnk3lteqq6aOtlQq+Rp6iOoKGWOrlYee1fP03MkEuzbvIG3i3TWkp4yxggEny1oSK/xAg0qGPWJ339vulbb7KbtZe5Xt5ZtH7c7tcmC4slyu33jBpFSM11C1uFVzGDURMrR6tLRKDhfzdv+3cXym/8ADN2//wC/A2h7FHuV/wAqNzF/zRX/AKuJ1Bn3I/8AxKj2c/6WE3/aHc9aS/wi+VG+/hZ39sXvzbNNk63btJkpdtb7wME09Hjt87KrGoZN1bUlqSrUT5CKkkgraMyrKtJXxUs5QhADifylzFecqbzZ7zArGAN4cyDAkjNNaV4VpQj0ND19An3hPZzlz399teYvbbdpYY92eIXe23LAM9pdLrFvcBfjCFg0b0I1xmRARXH0U+uOxNm9t7C2j2b17naPcuyd84DHbl21m6FiYK/FZSnSop2aNws1LVw6jHUU8qpPTTo8UqrIjKM3rG9tdys7a/sphJaTIJI3HmCKj7D6g5Bwc9fLjzTyvvvJXMe98pcz7c9pzBt1y9pd28nFJI2KsKjDKaVVgSrKQykqQTpcfzdf+3va/wDa2+N//um2h7xY9y/+nmL/AKa1/wACdd7vuR/+IPS/80N9/wCrlz1u+e8suvny6+dn8LvirhPmf80B0FuHd2V2Ri9yVfZ2Wm3DhsdSZWvpX2zQZrOQwxUddPT07pVS0YjYlgVViRz7wj5V5ch5q5qOzT3LQxuZWLoASNAZuBxmnX1Ee/XvLuHsJ7BL7lbXskO4Xlqm3wLa3DtGjC4aKIksgLAqGqMZPV5+5/8AhNXsx8PWnZnyo3PTbgSlqHxy7n61xVbh6mtWItSU9a+K3PQVtFSzTALJNGtQ8StqWKQroaXLj2HtDE/0vMUgmodPiRKVJ8gaMCB88/Yeud+0f3sHMC31v+//AGcs32wuol+jvpElVa9zJ4kDozAZCnSCcFlrUVmbE7V+bH8kz5NUPXe/J6nL9dVtVBmdxdewZutyvVfbGxK2v/h1XuzYdVWU8X8A3P4safta9aWmyFJUQpBX08lOZaWUBWe481+1G/pY3jFrEkM8IYmGaMmheMkdr4waBgRRgRVTlrzHyb93/wDvAvaS55p5bjSDmqNDBa7m0SR7jt14ia1trxUY+Nb1k74y7xOrF4XWQLIu771z2BtXtfYOzOzdj5OPMbP39tjC7u21k4wF+7w2fx8GSoHli1M1PUrBUBZom9cMoZGAZSPeWdje2+42drf2kmq1mjWWNvVWFR9hocjy6+fDmnlreeTOZN+5S5htDBvm23ctldwn8MsLmNwD+JarVWGGFCMEdZ9+722/1rsbefYu7Kp6La+wtq7h3nuOrjj80tNgtsYmrzWWnih1KZpYqCikKoCC7AD8+93l3DYWl1fXLUt4Y2lc+ioCx/kOm+W9g3PmvmHYeV9lhEm8bleQ2FqhNA01xIsUYJ8gXcVPkM9fNu7R3x253V2L2v8AMGpxuVgGQ7noc3m9147zrjdo7031V7o3XsfAUtTJUS1NL9tjtnVi0ChnEEOOVSynxhsFNwu9z3W+3Hmdo2FboO8i1ojyF3jUGtRQIaegX7Ovqy5P5d5I5A5V5M9i4ruFjHsD29vZS08S5tbRbe3u5mUKFbU90hkwNTSk0PdT6F/xD77x/wAnvjR0z3tQGJZewdk43IZ2ngiMEFBu/HGXB72xdPEZqhkpsZu7F1sEV3YtFGrfn3mvyzvKcwbDte8JxniDOB5OO2QeeA4IHXzDe93tvde0Xuzz57c3VSu2bhJFbuxqXtnpLayE0HdJbSRscYJI8ui6/wAwz+XbtT+YNgusMFursncPXMXWWW3NlqOo2/hMbmpMrJuWjw9HNDUpkaqlWnSlXEKylLli5va3sk525ItudYdvhub94BbszAooauoAZqRSlOpR+7D96LevuyblzduWzcqWu6vu8EEEi3UskQjEDSMCvhq1S3iZrwp1pxfJb4Tbc6J/mCYn4Y4vfWbz+38jvrpLaD74r8VQ0mZjg7Xotm1dbWpiqeokojLiDul1iQyWk8ILEajbF/fuU4Nn51i5VjvHeBpoIvFYAN+sEJNBjt14+zrux7TfeC3b3G+7Lf8Av1ecu29tukO3btfDb4pHaInbmulRDIwD0l+nGo0xqNOHW158Av5RuxPgP3HuXuHbHce7ewq/cnWeZ61mwue21h8NR0tHmN07N3RJlI6rH11TNJUwzbOjiEZUKVnYk3UXyM5M9tbPk3dJ9zt90lneS3aAo6qoAZ0etQTnsp+fXGL7yv32+ZPvJ8i7TyNvHItjtltabtFuy3FtPLKzNFb3VuIyrqoCkXRavGqgefVIv/Cj3/srvpj/AMVww/8A783sz3E/vp/ysu1f88I/6uy9dBP7qv8A6cnz9/4tUn/aBY9bh2zP+PP2n/4bWC/91dL7ydtf9xrf/mmv+AdcMd9/5Le8/wDPXL/1cbrUx/mv/wAxruT5G98VnwT+I2Szn90qTc46y3TUbHnqaXcncvY9RVSYXM7RgykEtPKmw8LXO9A8EbR0+SqI5555JqT7fTjf7j88bpvm8NyfyzI/0wk+nkMNQ08tdLJXH6anFODGpJK067Ufcw+6zyJ7We28H3jPe+0t/wB8vafvezXcQrQbXYhRLFctGQwN5KgEgYgtEpREVJddTAfHP/hOV19HtWgy3ym7f3pX7yyOPjnq9ndPy4LBYPa9bLJr+yqN17jwe56ndMsFNZZHgosfCk5ZUaaNVkkOdj9jbIW6S8w7nK10y1MVtpVUPoXZXL49Aor6jPUae6f96dzO+83Nl7O8j2EWxRSlUvt8E001wgFNYt4JbdbcFuAaSVitCQjEqod/Lj/hPH/dXamT3z8OeyN2bpzeAo/4g3VPZsmFmz2e+zhnnqf7ob4wGO23QJmneOMUtBWY+NJWLf5ajBI2Rcy+yX09vJd8r38skyDV9PcadTUydEihBq9AV/23Qo9kv7z87xvNpy7768qWVnt1y/hfvnaBKIYdRAX6m0medzFQnXJHKSBT9EipC/8A5Kv8zrsHeO84vhT8ms7kc7uhYMrF09vndU1Qd2Gu27T1FVmerd31lav3OTqqWgoaioxdTVt93GaeWikeUNSRwrParn+9urocqb/Mz3ND9LNJXXVQS0Tk5JABKk5wVNe0ANff7+6NyxsOwt7/APtHt0VvsxaM77t1mB9MEnZVi3C2Ve2NWd1WZEGg61mULSVmsm/nY/8Absf5Mf8AlGf/AIIHqn2O/df/AJUDf/8Amx/2kw9Ypf3f/wD4lz7S/wDU0/7su49aX/wq+Uu/fhf37sXvzaUOQq8Rj6+fb29cBHUT0OM33smuNE26toVVSI5KV6kUz09ZSmRJRSZCCkqTGxjUHFjlTmG85V3qz3m2DGJW0SpkCSM01oTwrShHGjBTTHXev3/9neW/fv215i9td6kiS/liF1t9yVDyWd0mr6e5VahguoNG9CuuJpY9Q1Hr6LHWPZOze4uvNm9pdeZqm3Dsrfm3sbubbmWpXR1qcdk6dJ0jnRHc0uQo3LQVVO5EtLUxyQyBZEZRm/t9/a7pZWu4WUoe0mQSRsPMEV/IjgRxBqDnr5bubuVN+5G5n33k/mewe13/AG26ktLqBwQVeNiCQSBqRhRkYdroVZSVIPWl7/Ok/wC3qcH/AGqehv8A3HoPeLPup/08VP8AS2/+TrvX9wf/AMQ2n/5r7x/hfrd895ZdfPl1737r3Xvfuvde9+691737r3XvfuvdfPY/l+/OOi+AXyV7J7jrutqrtGHcuwd49Zrt+k3VFtCSjkzO/tmbpGYbJTbf3Is6U67NMBg8CFjUB/INGlsKuTObk5M3/cN0exNwJIXt9AfRTVIj6q6W4aKUp58evpz+8v8Ad5uPvLe0vKXIttzWmzyWm5Wu7G5ktzchhFZ3Vv4XhiaAgsbrVq1GmmmnNRc6f+FLu3vx8PM1f8X7yoR/vP8AopNvcp/6/Vv/ANMw/wDznH/WrrAv/k0zu3/hcrf/ALlL/wDew6t8/madk5naP8uP5J7624zY/I5jqSlw0ZKCqkpcf2XlMDszLIpCAeaPD7pnVZQB43tJxp9yZz9fS23I2/XcGJGttPrQSlUP/GXPWD/3SuVLDe/vT+1HLu6jxbSDe2nOdIZ7GOa6jrngZbdajzHb59VE/wDCbPqrbybV+SHeE9LR1G66jcG2eqsVWmQnIYnb1Jjk3dn6VIll0x0e4clW413Zku74xQrelx7jT2J26AW2+7uVBuS62ynzVQNbD7GJX/ees3f71znLdG3r2q9vY5pF2VLWfeZo6dkk7yG2hYmmWhjSUAA4ExqMjraE95A9cg+ve/de60futMAPit/PcxuyOuI6TD4CD5R1e0sXicaHrcfjti9wwS07bcjRfunWLD7c3r9uuslqaSnDOymMsMS7CH+rvvAlpYgLCNwMaquQI5h8Pn8KvT5Uzw6+hDm3cj7x/wB3Jdcwc1M8+5tygt7LPLRXe72xgROT2iss9rqNPjDEAEMAdmH+bt/27i+U3/hm7f8A/fgbQ9z37lf8qNzF/wA0V/6uJ1yY+5H/AOJUezn/AEsJv+0O561zv5ZPwrwHzi+B/wAw+tWhxlH2Vt/sfZO7Ont010elsFveh2hmRHjaisjZJoNv7upNWOyCnyRIssdUYpJqWACDuQOVYebeTuZ7AhRfJOklrIfwyBDgn+Fx2t+RoSB11L+9x7+7n93n7x/sZzYsksnKlztN1Zb7Zxn+2tHuo6uqmoM1s1JYjgkq0epVlepj/wCRd80c71D2Puf+Xv33LXbclqNz7hXqqm3Q8uOq9n9lYypqo969U1kGQRDQf3gqqOWpoadmh0ZiKeBUlnyCBT32h5qm2y+uOSt5JjJkb6YSYKSgnxITXhqIJAx3VGS3UV/3ifsJtvO/K2z/AHnfbZI7pFtITvL2YDrc2MiqbTcVKE6/BVlSRgGrAUclUgJJRf5uv/b3tf8AtbfG/wD9020PYa9y/wDp5i/6a1/wJ1Nv3I//ABB6X/mhvv8A1cuet3z3ll18+XWjD/Jb/wC3p+2f+oPvb/3lNze8Rvar/p4cP+luP+Ot19EP39//ABDjc/8AmptH/aRB1vPe8uevne6oe/4UJdW4HdvwqwfZVRR0X95+o+1dtz4jKzNItbFgd8xz7Z3HhaMLIsTx5XIfwqqmDKxtjlIIsbw/717dDc8qRX7KPqLa4Uqx46ZOxlH2nST/AKXro3/djc47lsnv/f8AKkU8n7o3vZp1nhWmgzWlLiCVsVBjTxkWhH9qQa16Eb+QvvbObt/l67TxeZlSan6+7J7H2TgHA/eGDOSo94xxVL2BkenyW76qNCSdMCxqOFAC72duprnkm2jlNVhnliT/AEtQ+fsLn8qdBb+8g5f27ZPvPb3d2CFZNz2qx3C5Hl43htbEqPIMlshPqxY+fQf/AM/75Hjqj4iYvpfD1hg3T8jN0xYSpREBki692PPjdybunjmWojkp5azMyYahIMciTUtXUKdJAPtD7z77+7eWY9qialxfSaD/AM04yGfzxVtI+YJ6E392l7V/1098Lvn2+g1bPytZm4Uk4N7diSC2BGkhgsYnk4gq6RnPRUvi3/L7i3h/I+7Ux9RgKabtPvGjznyN2tLJg6yXPRVXXjrP1hhKEi1bUNuTbu2aoUckKaPDuibSkqyMZA7y9yWLr2l3FGhB3G7DX0Z0nVWP+yUeZ1KhpTykPGuZl94vvNPsf94Tyddxbk68ncuyQ8q3iiVBCVvRp3CV/wAC+BPcJ4gY11Wa1KlRpkf8Jxvkgcjtruj4pZuqL1W3KqLujYMbI7P/AATLSYza2/6EztNoipcbmRh6iCJY7tLkqly3AA37G774lvuvLkrd0Z+qh/0rUSQfYG0kD1Y9U/vUfar6Td+Qvebb4aQ3aHYNyIOPGiElxZvSlS0kXjozVwIoxTraA95A9chetKf+Yd/2/X2x/wCJq+HP/un6j94qc7f9Pftv+euy/wAEPXfj7r//AMjo3r/pQcz/APVzcut1j3lX1wH60zP+FHv/AGV30x/4rhh//fm9me8W/fT/AJWXav8AnhH/AFdl67x/3Vf/AE5Pn7/xapP+0Cx62vt+bty2wPjNvPfeB+3/AI7srorcW7cL93GJqX+Lbb2BWZjHfcwkES0/3lGmtf7S3HvI28uZLPYbq7hp40Vo0iV4VWMsK/Ko64wcubLZcy+7Gw8u7lq/d1/zFBZXGg0bw57xYn0nybSxofXrVE/4Tu9a4ffPyw7b7Z3JDFls31l1lLPt+orTJLVUe5uws6uLrtwQt+lqv+AUWRpHZyTor2sCeVxy9kbCK85j3PcpwGmt7eqE8Q0jULfbpDD/AG3XZ3+9D5rvuXfZjkjkraXaHbt23cLcrHQK0FlD4iQn+j4zxOAPOIfYdzD3lJ1we697917rR/8A5qGAi+Lv82/Gdm9cRUeFrsvubpz5CUdNQI00UG7qjNwHcVTV0zu3kn3FujbFVkKqInTMa5uAr294l+4cI5f9yor+xAV3kgvQB/Hq7if9M6Fj616+hD7nO5P7v/clveUuankuLaC03Tlh3kNCbZYT4CqwAoILe4SJDxXwxmo62Lv52P8A27H+TH/lGf8A4IHqn3OHuv8A8qBv/wDzY/7SYeuW/wDd/wD/AIlz7S/9TT/uy7j1r6/yuPhft35w/C35r9XVKY2h7Bw+8er919Q7qr45ANvb8x+2t9rR09VUwMtRFgNzUzvjsgLTIkM61IhlmpoQIX9veVYObeVOa9uYKL1ZYpLaQ/hkCSUqf4WHa3HBrQkDrpn98L363T7vXv8AewHOMLSycsz2F/Zb5Zxkfr2b3FoXKq3aZoGAli+EllMetUkfox38jT5obj6W7S3L/L479mr9uxV259wU/V1HuhzRVGyO1MbWVMW7+r6iOuCPQRbqqqaaejpy6quaikijjefI+zz2j5pn2rcbjkreSUBkYW4kwY5QTrizw1kEgfxggZfqLP7w/wBhNq5+5P2n7zvtqkV00dnC28PZjWt3t8iqbbcFKV1m3VlWRqEmAqzMEg6Kj/Ok/wC3qcH/AGqehv8A3HoPYd91P+nip/pbf/J1Mv3B/wDxDaf/AJr7x/hfrd895ZdfPl1737r3Xvfuvde9+691737r3XvfuvdaS38inrXrntP5z90bf7O2BsnsbAUfQXY2ZpMJvzauC3fiKXL0/cHUVFT5Wmxu4KDIUUGSgoshUQpOqCVYp5EDBXYHFD2hsLHcOcN2hv7OKeEWcrBJkV1DCeEVAYEVoSK/M9fQF/eK81808n/d09v9z5S5l3Da9yk5ksYHuNuuJraVom2zcnMbSQujFCyKxUmhKqaVA622j8OPiIeD8VvjgQeCD0d1jz/66/vJP+rHLX/TPWP/ADgi/wCgOuKH+vn72/8AhYuav+5tf/8AbR1y+WXRdP8AIz4xd1dDw/a0c/YHXOc2/tySWVqLH47dFPSCv2VV1T08EzRYzG7ox9FLMqRteCNlA59+5k2hd82DddnFAZ4GRK4AelUJpXAcAn5de9lvcWX2t93OQPcd9bx7ZusN1dBRrd7ctoulUMRWSS3eRVJI7iDXrVT/AJH3ywxXxI+RPafxf76Z+v6DtfLUOCjrdzg4mHZXcGwqrM4pcBuRq+amjwsG4oK6ooZJpVJTIUtJG2hHd0x19peY4+Wt83Hl7eP0UuWCVkxomjLDS1aadVSKn8QUefXZT+8K9l7z3s9r+TveD23A3O42WB7ho7P9Q3W2XixSeNBoDGUwMiyBQcxPKwqVAO5z7ym64MdA339331l8Z+qd2dx9t7gp9v7Q2nj56qTVJAcnnMkIJpcdtrblDNNActuTNywmKkpkYF2uzFI0d1K953iw2HbrndNynCWsa1+bGmFUebN5D/J0O/bX235t92ec9l5F5K2xrrfL2UItAfDiSoDzzuAfDgiB1O5GBgAsQDqB/wArXYm8/nZ/NF3H8qNy4KSl2rsrfG6/kBvOWmNb/CsPuPO1mW/0Y7Nosn4JY3rKXO1MNRBBKyNUY7DVJvdSPeM3t5Z3XN/uDccxXENLeKV72WlaKzE+EgNOIYggHiqHruH98PmLYfu5/c+2n2a2ncQ+87ht9ty1YBtPiSwQrH9fdNHUEK0SsrMoIWW4jHn1sgfzdv8At3F8pv8Awzdv/wDvwNoe509yv+VG5i/5or/1cTrlV9yP/wASo9nP+lhN/wBodz1WH/wmu/5lD8nv/EkbE/8AeYy3uP8A2I/5Je//APPRH/xw9Zd/3r3/ACvPtF/0qbv/ALSI+gw/nvfCPM7F3Vgv5gvR0OQwddT5nblN3JPtr7uir9t7tx1RQ0uwu3aOromDY2Spq6elxtdOhh8eQSimGuapncF/vBynLZ3EPOu0BkcOoujHUFXBAjmBHCpAUnGdJ4knoX/3cn3grDmLZ9x+7L7hvFcWzwTvsK3el0nt3V2vNtZX+MBWeWNTqrGZkwsaA0q9yfJ3LfL75g9S937kxiYrd2ZqOhNv7yhgEK0NZunZ393ds5fN46OCOGOmodwzY0VyU4RRSmoMALiMO0VbpzBJzPzPtm7Tx6bljbpKBwLppVmHoGpWnlWnlXrPrkT2hs/Y72L549vdquzNskCbzdWDNXWtvdCaeKJySSzwh/DLV79OvBbSPoq+83uvly60Yf5Lf/b0/bP/AFB97f8AvKbm94je1X/Tw4f9Lcf8dbr6Ifv7/wDiHG5/81No/wC0iDree95c9fO91q0/8KCvmt17mtn7Z+G/X2ex+5d2Um9qPe/b9Vh69Kuj2im2qTKUGD2NkZKWR6d9xV2VyTVlZTMfJj1oIRIoecaMevenmuyltYOV7KZZLkSiW6KmoTSCFjNPxEmpH4aCvHrsN/dlewHM9hvu7e+3M22y2mytt7bfsaToVa5M7RvNdoGAYQJGnho4xKZG0miGtsP8oHoXJ/H74E9NYHcNBU4vdm/YMr23uegqjaalqd/Vf3+36eWAoklFUwbHgxSVED/uRVKyK1mBUSP7Z7NJsvJ21wzoVuZgbmRT5GQ1UfIiPTUeRr1hf9+H3ItPc37yPPm5bXcpNsu3NHslnInBls10TMDUhla7MxVhhkKkVGTrZ/zMt07u/mFfzS6X4+dXVNNUw7W3Dh/jdseoq4q7+EUORw2QravsndWZ/hVNlaw4nC7mqspJVVcMMrDE4xJNBCe4J5+uLnnb3DTZNvYERutjETWgKkmV2oCaKxapA+FQeurf3Stn2T7sP3O5/c/nCF1kvLaXmrcEQp4jxyoiWFvF4jRr4ksCwhEZh+tMVrnoe4P5AHz1pYIaam+TfTtPTU8UcFPTwb87mhggghQRxQwxR9frHFFFGoVVUAKBYcezpfZnnFQFXmG2CgUAEk+P+qfUayf3lv3bppJJpvaDfHldizM1ptZJJNSSTeVJJ4noj/XOE7J/lF/zLutKDtbLYavXZua2uu+M9tgZav23uTqrtLCxY3dOTwozFJt/IZF8LjcxVGPyxRKuXxf9pUuwRsYb72059sE3GRW8J08V46lWhmWjldQUnSGPH8S/LrIXmrcOVPvufdM5tueTbKeJr6C4O32134aTwbjt8pkt45fCaZE8V4krQkmCbyJxvyI6SokkbrJHIqvHIjB0dHAZXRlJVlZTcEcEe8xwQQCDjr5tGVlYqwIYGhB4g9aVP8w7/t+vtj/xNXw5/wDdP1H7xV52/wCnv23/AD12X+CHrvv91/8A+R0b1/0oOZ/+rm5dbrHvKvrgP1pmf8KPf+yu+mP/ABXDD/8AvzezPeLfvp/ysu1f88I/6uy9d4/7qv8A6cnz9/4tUn/aBY9bdabVw++uoU2TuGGSowG8et12rnIIpPFLPh9w7YGIycMcul/HJJRVbqGsbE3t7yW+niu9t+knFYZYPDcf0WSh/keuIp3i+5d52PMG2OF3Kx3X6y3YioEsM/iRkjFQHUY60r/gB21kP5WP8x3eXVnfkbYLaeRrMx0f2PmqikrBT4rG1uWx+X2H2ZQrP9hJLtqrqaOgrDVNE4OByM08cTvoX3iryZuT+3nPV1t28DRbMWtJ3INACwMcorTtJANf4GJA677feX5KtvvjfdW2DnL22YXO9xRxcw7Xboy6pHWN4rywamsCdVaRNFR/jMSIzAVPW8Xjclj8xj6DL4ivosricrRUuSxmTxtVBXY/I4+ugSpoq+graZ5aasoqymlWSKWNmSRGDKSCD7y1R0lRJYnDRsAyspqCDkEEYII6+ee6tbmxubmyvbaSG8hkaKaGVSjo6EqyOrAMrKwIIIBBFDnpj3tvbaPW+0twb737uLE7S2dtXG1GY3DuPOVkVDi8VjqYAyVFVUSkAamIREW8ksjKiKzsqlq7u7axtpry8nWO1jUs7uaAAeZPRjsHL+981b1tnLnLm1zXu+3kqwWtrbqXkkduCqo/aTwABJIAJ60hsfkMv/Np/m347c23sBlE60ye/dt5arilhenl290H1KuLgmyOaYyV0OIye6MdiwGQu8S5nMJAhIZR7xMSSX3I9yo7iCFvoGmVjX8NvDTLcdJcD7NbU6+gy6tbH7lX3JbvaN03KE82xbbPChUgifeNy8QhIsIZI7d5ONAfAgLngetlD+dj/wBux/kx/wCUZ/8Aggeqfc7+6/8AyoG//wDNj/tJh65R/wB3/wD+Jc+0v/U0/wC7LuPVb/8Awmo/5l98sP8Aw8uqv/dJvX2BvYf/AHB5j/5rRf8AHX6yp/vYv+Vp9mP+lfuH/V616SX8+X4RZbaufwPz/wCkqauw2Sx+SwGP7pl27JWUtfhc/QVNFSbA7ao5qQ6sdN9zFT4uvnjaEJUpQTKrSzVMvtL7w8py200POm0qySKyrdFKgqwIEcwpwzRWOM6TxJPR3/dw/eCsd423cvuz+4Msc9pNFNLsC3QVklhdXa821w3xjSWmiUhqoZ0JCrGvVHnyH+UmY+YXyX6o7o3RQDH70qsF01tTfPhSniocluzZ89LhMpn8bDSxwQU1HuMU8df9usca0klQ8C6kiWR4m3rmGTmfmDbN1uE03RSCOalKF0IUsKcA3GnlWnlXroT7Yeztl7F+0nO3IW0XXi7Alxul7t2osXS2uVaWOGQsSWeCpj1EkuFDmhYqPoxe84Ovlq697917r3v3XuiY/wCzydcf8+d+Z3/pD/ys/wDtTewt/W2w/wCjZuv/AGQXn/Wnqef+B55r/wCm55C/8ezl3/vZde/2eTrj/nzvzO/9If8AlZ/9qb37+tth/wBGzdf+yC8/609e/wCB55r/AOm55C/8ezl3/vZde/2eTrj/AJ878zv/AEh/5Wf/AGpvfv622H/Rs3X/ALILz/rT17/geea/+m55C/8AHs5d/wC9l1rXfyftmd1fEv5bdodsd5/F75c7V2Tujpbeuz8PkaL4r99bkqZtwZvszrPcuPo5cdt3YOTrYEkxO26t2lZBErRhS2plBgj2ytd15b5l3Hct35f3OO0ktZIlYWlwx1NLE4FFjJ+FTnh11e+/Fv3IPvT7I8ncle3fu/yRe8w2e/Wl9PFJzDs8CiGKwv4HYPPeRoaSToKA6iDWlAabKP8As8nXH/Pnfmd/6Q/8rP8A7U3ud/622H/Rs3X/ALILz/rT1yh/4Hnmv/pueQv/AB7OXf8AvZde/wBnk64/5878zv8A0h/5Wf8A2pvfv622H/Rs3X/sgvP+tPXv+B55r/6bnkL/AMezl3/vZdUb/wAy74m9E/MTNV/dPS3XXyz6v79qoIE3DDmvgx8uF2D2Y1MIaeGq3BJi+nqyv21uWChUr/Eaakq1rBGkc8GompSJOfeW9n5olfddqsdyt95IGvXt974ctMVakBKsB+IA1wCPProb90z3q9xvYqwtuQefuaOSt49tUYm1Nvzdy19ZYaqsVhEm5qk8Bf8A0J3QpUsj0HhmvjqTtX+ed8fsKmzOtdn/ADRn2pi6SPE4fHbl+M+/OxcTjcdRw/b0EG3Y+z+qs7kMHj6KIKIKeFaaJFUKY9I0+wVtu5e7uyxC1sLXdTbKNKrJaySgAYGnxYWKgeQFPs6yc525M/u7vcy/bf8AmzfOQk3qZzPPLab9Z2Ujux1OZzt+4xJK7mupm1kkkhq56Q2Z6B/mOfMzsbC1fzGofmFhtuY2reZ9w7y+MPyU3vTbeoa+opRmRsHrjr7rCbb9JlKinjDCnX+DUs5hVZKhAFPtHLs3PPNN9E3NC7mkCmuuW0upAoJGrw4o4tIJHl2g0yehFY+5X3V/YblbcIfYmfka43WVAotrDf8AYrRpnRW8L6y+vdwEzRqxpq/XddRKoc9bMnxD3R8Wvhb1DjOpOpOivmmtOsv8U3XuvKfB75Ty7m3xuaWJIqvP5+ri6jRNWhBHTU0YWno6dVjjX9TPPfLVxy9yrtke27btG66a6pJGsLvVI3mzHwf2DgBgdclfe/aPeL3853u+dudvcTkEylfBs7OHmzl4QWkAJKwwqdzPrV3NWdiWY8AEn/MP+QNN8gPhj3x091d0P8xs5v7fO28Rjtt4qq+GXybw1PWVdJu7buWnjlyeX6vo8dSKlDj5X1SyoCVsOSAU/O29LvPK28bZt+z7o95NGFjU2N2tSHU8WiAGB59HP3YPbKb209+vbjnnnD3G5Ft+W9uu5JbuZOaNglKq1tNGCI4twZ273AooPGvDojX8lPK77+GnXfee3/kB8cPl9tPKb23ptTM7dgx/xI+RG6ErKDF4PIUVbLJNtvrnJxUjRVE6gLKUZgbgEA+wh7UyXnK1ju8G9bHucUksqOgWzuXqApB+GI0z1kR9/wCsuXfffmn283T2z91OR72z2/b7i3uml5k2S3KvJMjqAJ76MtVQcioHn1cVvr5WdG9l7M3T17vnoP5h7i2dvTA5TbO5sHXfB75YfbZPC5ikloq+kd4uqY54WkgmOiWJ0liezoyuqsJQu+Y9ov7W4srvZ9ze1lQxyIbC8oVYUI/sesFuXfZn3E5T37Z+ZuXfcjka132wuY7u0uI+bOXNUcsTB0YV3Eg0IyCCCKgggkdaa2Z+CPyI65+ScM/XHxz+V+/enNrdp4PM7W3vL8Xe+MNksjsmjz9Bl6WXKYHMdeYzLU+dxuMHgrY1p/G9XDIadpIWjdsXJeT97sd+VrHY9ym2uO5V45vpLhSYwwYVVog2oDBxxBpUU67vWP3jPa/mr2mli5q90+S9t57vNmmt7zbxzBs8qJdtC8TCOaK9kiMMkndGS1QjLrCsGA3VP9nk64/5878zv/SH/lZ/9qb3lX/W2w/6Nm6/9kF5/wBaeuBH/A881/8ATc8hf+PZy7/3sutHDrrpf5+bV39Wd1/HXo35aYavnzO8Ytu9h9cdO9sLN9rV5PK4TN0tFmsRtiRAwZJ6OriD6o5UkikAdWUYkWO185216+7bHtG5I5d9E8EE3AkqwDBPtB/MdfQ1zRz592neeWbb2/8AdL3E5Kntlt7U3W17rum3U1LHHLEzRSXAPmroaUIKstQQejDZmr/nZ76xdbtrdVJ/MXOCycElJkqWt2F8koKGuo6mN4aikrkwW05qiqopYnIkidWjcHlT7O5X92LyNoLld88FhRgY7oAg8QdKVI6jCxt/7v3l27t922aX2t/eMLB4njvdiZ0ZSCrIZrkKrAjDAgj1HRtvgn/Lv6m6y3rhu2vmLsX5Sdm5jA1sWYwfUO1Pg78usvsOfKrHBU0lb2DmtwdJYyq3SuPrXkZ8TDSJQTzRRtNUVVO0tNIJOUOSNssLqLcuaLTcLiVDqS2jsL0x1wQZGaAF6H8IFCQKlhUGE/vGfeh525u2C/5J9i+YeT9osLmMwXG93nNvLUd4I6lWSyih3aRbfWgAEzOZFVmCJFIFkXYQ7c+ecGL6u7Cr+p+gPmTubtCm2duFuvMFU/Cr5MUFHkd6ti6mPbMWQrM31njsXT4xMw8L1TSzKBTq+kM2lWmrc+cVj2+9fbdm3STcBE3gIbG6AMlDoqWiAA1UrU8OuZHJP3cJbznDli2509yuRLTlB7+AbpcpzVsLslr4imcosV/JI0hiDBAqnuIrQVI17/5QnTG/Pjp8j97/ACI+Vfxz+WuGzeJ2nkcZ1wkXxO+Ru68hW7t3zVyw7r3UZdr9dZGnpJcftyGpomFUy+cZlmjVjGWSFfbParzY99u985j2PckmWMrB/id05LyHvfsiNKLUZ468cOunH34OfeXPdH2q5e9rvZn3S5Kn26a9SXdSeY9jtkS2tFBtrelxfIzB5ykg0V0+AAxGoA7Kf+zydcf8+d+Z3/pD/wArP/tTe54/rbYf9Gzdf+yC8/609cn/APgeea/+m55C/wDHs5d/72XVCf8AOo2FkfmVL0z2X8e/jz8t9xdl7MizWxt347I/EP5LbalyGxq53z23qyCs3D1pj8Qybbz5rkaNZBUS/wAWDBWSJikOe6tm/NP7rv8AZNk3J7+LVDKrWV0tYz3KQWiC9rV+fd8uukX3BOZLb2IHPvKfud7n8k2vKV+YtwsZYuZdhnCXaUhmUrBfvLWeHwyDTSPBoSCwrZ18GfmPunaXxT6Y2R8jPj58yNudubB2lTbE3DTUvw3+R2epa/H7Sllwm1cxFk9u9cZShqZsjtSjonqSzpL955iyAFSw/wCUeaLi25c2q03zZd0j3OGIQuBZXTAhO1GqsRBqgFfOtesRvvD+xOz717zc+8we1nuZyJdckbletuNq780bHCyPcgS3ERjnvo3UR3DSBMEaNNDxpSN8w+v+8u3f5qmE+UOxfi58t8n0zQ9m/HDclRuSo+LPfGNrVxHXeN68g3XUrt/IbCp86zUE2AqgkYp/JP4wYwwZSYn5nst33P3Fh5gs+XtybaluLWQyG0uAdMQj1nSYw2NJ8s+XXQT2L5l9vOSPua7n7Qcx+8HJMPPsu0b5apaLzDs8i+Levem2XxkvGhGsTJU6qLXuIoabNf8As8nXH/Pnfmd/6Q/8rP8A7U3ufP622H/Rs3X/ALILz/rT1yS/4Hnmv/pueQv/AB7OXf8AvZda1/8AOe2X3V8xPkR1rv8A6D+L/wAuN1bW230vjdn5avyHxW772xJBn6ffG+M1NRpRbi2BjaydEx2Zp38qIYiX0hiysBBHupa7rzPvdhebNy/uclvHaiJma0uE7vEkalGjB4MPl11e+4Tv3IPsX7Yc28te5Xu9yTZbxd7899BFFzDs9wDCbS0iDF4L2RQS8TChNcVpQiuxrtr5r7Axu3MBjqvpr5mx1VBhMVRVMY+EPyqcJUUtDBBMgdOp2RwsiEXBIP49zlBzXZJBCjbXumoIAf8AELziB/zR65Ybr7AczXW6blcw89chmGS4kkQ/1s5dFVZyQaHcqjB6rD/mTdMfG756YKm3Tiur/mF1v8gNr4qag2x2B/siPywqcTuPHxLLPRbT7Ao6TqZaqrw4q2tT18IkrMYJHZI6iO9M8f8APe1bFzjCtxHYbpBvUa0jm/d94VYeSSAQ1K14EZX0Iwcu/uo8++633b9yl2e85u5G3X2zvJhJebZ/W/lxZIHNA1zZs25aVl0/FG1I5qAMyNSRaaunMl/Oe+JYk2X0RtH5iPsfDz1dPisVH8bu3N29dvTzVctRPPt7aXbPUrtgIMhO7TMYsdQVBaQswVy3uLtrk90+W62mz225mzUkKv0szxUrXtSaHtrxwoPWeHPVp9wr3rK7/wC4298jLzFOqtNMd9222vQwUACa523cqTFAAorLItAAKinTR2Zsz+bV8ytwY7CfJvb3y+i2m+Qir5Tur449+Qdd4app4pljyVP1z1H1DWY5spHE7RxSQ4kSEyWaVFLMGr+19yeaZkh3+HcxbatX6lrceEpFciKGEiv2L+fS7lLfvuU+w+2XW4+0e5cjtvYiMa/R75sxvZVYiqNfbluauIyQCwM1MVCk0B2CvgPtr4s/Afr2v27srqT5rbv7A3WaWbsLtLMfBH5T0OX3LLRhvs8ZjMdH1dWx7c2vj3kd4aGOeZmldpJppn0lJp5Ng5d5NsXgtNt3WW9koZ7htvuwz04ADwTpQeQqfUk9cyvvJbt7x/eT5ntt05g515AseWrLUu2bPBzfy88UAb4pJHO4IZ7hwAGkKqKAKiqK1av5rHyU2/3T8DO7urNldRfKuPdu9cj05iNvJuv4lfIrZOFrMse9+samjxkm4919b4nB0uRy8tOKWhhknWSurpoaaBXnmjjZv3F32DdeTt226023cfqZWgVPEs7mNSfqIiBqeJVBalAK5JAFSQOlv3M/ajc+QfvIe33OPMHO3Jp2Tb4t0nujZcybHdyrH+6L9WkEFtfSzMkYbXIwUiONXkcqiMwKT/JOruwPhltDv/E/IH43fL3aVdvzcmwcjtmLH/En5D7oWtpMFjNzU2Sklk2311k46NoJslCAspQvqutwDYNe1D3vK1rvMW9bFucTzSRtHps7l6hQwPwxGnEcepr/ALwC35a9+d99tL72y91eR722220vIrsy8ybJb6GmkgaMAT30ZaoRsrWlM8ern95/LLpDsPaO5th716D+YW4tobxwWU21ubBZD4O/LBqPL4PNUc1BkqCo8XVMUyJU0k7LrjdJEJ1IysARKd1zJtN7bXFnd7Pub20qGORGsLyjKwoQf0fMdYFbD7Le4XLG97TzHsHuRyNa73Y3Ed3aXMXNvLmqOWJg8brXcSKqwBoQQeBBGOtMbe3wK+Q+xPkFXDqn44/LHfvTuB7Dx+T2fvKq+MHe+Hylds6LLUmTo/4vhsz13icnDncZQH7esVacRSVULtAXiZGbFq75O3qy3tv3bse5TbWk4aKU2lwpKVBFVaJTqAwcUqMY67z7B95H2w5k9sIP65+6nJe2893O1yQ31gm/7PLGl0Y2jbw5Yr6SMwyP3JVtQRgHAYEDde/2eTrj/nzvzO/9If8AlZ/9qb3lb/W2w/6Nm6/9kF5/1p64Bf8AA881/wDTc8hf+PZy7/3suvf7PJ1x/wA+d+Z3/pD/AMrP/tTe/f1tsP8Ao2br/wBkF5/1p69/wPPNf/Tc8hf+PZy7/wB7Lr3+zydcf8+d+Z3/AKQ/8rP/ALU3v39bbD/o2br/ANkF5/1p69/wPPNf/Tc8hf8Aj2cu/wDey6Od7FPUDde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3RPPgV/2S3sb/wAOvun/AN/l2T7DPJ//ACr9p/zUn/6vy9Tj947/AKe/zD/zxbX/AN2mx6OH7E3UHde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3RMfn1/2Tmn/AIsJ8Mv/AIMnoT2Fucv+SGP+e6x/7Trfqefu2f8AT0n/APFX5p/8lfeOjnexT1A3Xvfuvde9+691737r3Xvfuvde9+690Tz/AGf74df8/wB9qf8AnHuP/wCsnsM/1y5Z/wCjvH+xv+gepx/4Gz3y/wDCdXv+9Qf9bevf7P8AfDr/AJ/vtT/zj3H/APWT37+uXLP/AEd4/wBjf9A9e/4Gz3y/8J1e/wC9Qf8AW3r3+z/fDr/n++1P/OPcf/1k9+/rlyz/ANHeP9jf9A9e/wCBs98v/CdXv+9Qf9bek3/w5j8C/wDvKHrD/wA+Ff8A/W72n/r7yd/00Fv+0/5ujb/gTfvH/wDhIN4/5xp/0H1Nof5j/wAHMpKafGfJLr3IzqpdoaGbLVcqqPqxjp8VI4Uf1tb3dOeOUpDpj32Bj6LU/wCAdJ7n7rH3hLNBLee1W6RRk0DSCNRX7WkA6d/9n++HX/P99qf+ce4//rJ7d/rlyz/0d4/2N/0D0h/4Gz3y/wDCdXv+9Qf9bemib+Y98HKeuGLn+SXXsGSaWCBcdNNlo64z1IjNNCKR8UtQZagTJoXTd9Qte49tHnjlJX8Nt9gElaaTWueGKVz0uT7rH3hJbY3kftTujWmkt4qiMpRa6jqEmmi0NTXFDXp3/wBn++HX/P8Afan/AJx7j/8ArJ7d/rlyz/0d4/2N/wBA9If+Bs98v/CdXv8AvUH/AFt69/s/3w6/5/vtT/zj3H/9ZPfv65cs/wDR3j/Y3/QPXv8AgbPfL/wnV7/vUH/W3r3+z/fDr/n++1P/ADj3H/8AWT37+uXLP/R3j/Y3/QPXv+Bs98v/AAnV7/vUH/W3ppi/mO/B6avOLh+SPX0uTEksRx0UuXkrxLArvPEaRcUagSQrGxddN1Cm/wBD7aHPHKRfwxvsJk4aRqrjjilelr/dZ+8HHbC8k9qtzWzoG8UiMJRqAHUZNNDUUzmvTt/s/wB8Ov8An++1P/OPcf8A9ZPbv9cuWf8Ao7x/sb/oHpF/wNnvl/4Tq9/3qD/rb1Hq/wCYV8MKCnkq675A7MoqWEKZqmriz1PTxBmVFMk02GSNAzsALkXJA91bnTlZFLPvMQUcSdQH/HenYfuy+/FzKkFv7aX8kzfCiGFmPngCUk46Y/8AhzD4F/8AeUPWH/nwr/8A63e2f6+8nf8ATQW/7T/m6Mf+BN+8f/4SDeP94T/oPr3/AA5h8C/+8oesP/PhX/8A1u9+/r7yd/00Fv8AtP8Am69/wJv3j/8AwkG8f7wn/QfRevhV83fiptX44bNwm4O6Ns4zK0+4+2aqajmps7I6U+V7h39lsdNrgxEsTJV42uhmWzH0uL2Nx7JuVea+XrfY7WKbdI1kDzEijcDNIRwXzBB6kz38+7/7x7x7p77f7byFdy2bWu3Irq0IGqPbLONxQyA1V0ZTjiOjU/7P98Ov+f77U/8AOPcf/wBZPYh/rlyz/wBHeP8AY3/QPUO/8DZ75f8AhOr3/eoP+tvTTS/zHvg7XVTUNF8kevayuTy66Olmy9RVJ4W0zaqeHFPMvibhrj0n6+2l545SdtCb7AX9BUn9lOl033WPvCW0Iubj2q3OO3NKSOI1U14dxkAz5evTt/s/3w6/5/vtT/zj3H/9ZPbv9cuWf+jvH+xv+gekP/A2e+X/AITq9/3qD/rb17/Z/vh1/wA/32p/5x7j/wDrJ79/XLln/o7x/sb/AKB69/wNnvl/4Tq9/wB6g/629e/2f74df8/32p/5x7j/APrJ79/XLln/AKO8f7G/6B69/wADZ75f+E6vf96g/wCtvXv9n++HX/P99qf+ce4//rJ79/XLln/o7x/sb/oHr3/A2e+X/hOr3/eoP+tvXv8AZ/vh1/z/AH2p/wCce4//AKye/f1y5Z/6O8f7G/6B69/wNnvl/wCE6vf96g/629e/2f74df8AP99qf+ce4/8A6ye/f1y5Z/6O8f7G/wCgevf8DZ75f+E6vf8AeoP+tvXv9n++HX/P99qf+ce4/wD6ye/f1y5Z/wCjvH+xv+gevf8AA2e+X/hOr3/eoP8Arb17/Z/vh1/z/fan/nHuP/6ye/f1y5Z/6O8f7G/6B69/wNnvl/4Tq9/3qD/rb17/AGf74df8/wB9qf8AnHuP/wCsnv39cuWf+jvH+xv+gevf8DZ75f8AhOr3/eoP+tvXv9n++HX/AD/fan/nHuP/AOsnv39cuWf+jvH+xv8AoHr3/A2e+X/hOr3/AHqD/rb17/Z/vh1/z/fan/nHuP8A+snv39cuWf8Ao7x/sb/oHr3/AANnvl/4Tq9/3qD/AK29e/2f74df8/32p/5x7j/+snv39cuWf+jvH+xv+gevf8DZ75f+E6vf96g/629e/wBn++HX/P8Afan/AJx7j/8ArJ79/XLln/o7x/sb/oHr3/A2e+X/AITq9/3qD/rb0U/5rfNj4sbv6HXC7b7l21lsoO8fifmTR09Lnlk/hm2PlZ0tubPVl5sRFH48bgsRU1Li+opEQoLWBDnNfNXL1zs4ig3RGk+ss3oA3BLyBmPw+SqT+XU0ewPsF7w7J7jNf7ryJdw2n9XeY4NbNDTxLjl3dYIVxITWSaREHzYVoM9Gw/2f74df8/32p/5x7j/+snsR/wBcuWf+jvH+xv8AoHqF/wDgbPfL/wAJ1e/71B/1t69/s/3w6/5/vtT/AM49x/8A1k9+/rlyz/0d4/2N/wBA9e/4Gz3y/wDCdXv+9Qf9bevf7P8AfDr/AJ/vtT/zj3H/APWT37+uXLP/AEd4/wBjf9A9e/4Gz3y/8J1e/wC9Qf8AW3r3+z/fDr/n++1P/OPcf/1k9+/rlyz/ANHeP9jf9A9e/wCBs98v/CdXv+9Qf9bevf7P98Ov+f77U/8AOPcf/wBZPfv65cs/9HeP9jf9A9e/4Gz3y/8ACdXv+9Qf9bevf7P98Ov+f77U/wDOPcf/ANZPfv65cs/9HeP9jf8AQPXv+Bs98v8AwnV7/vUH/W3o4fsTdQd1737r3XvfuvdfPY/l+/Byi+fvyV7J6cruyarq6HbWwd49mLuCk2rFu+Sskw2/tmbWGHbGzbg22sCVC7yM5n87lTThPGdepcKuTOUU5z3/AHDa3vjbiOF7jWE110yImmmpeOuta+XDr6c/vL/eGuPu0+0vKXPVtyom8SXe5Wu0m2kuDbBRLZ3Vx4viCGckqbXTp0iuqurFCer5dfyH+3vjB1juLvTpnu2Dtug61wtbu7deH/upWdd74xGFwqfd5bO7Zlotz7noswmFxaTVlShnoahIIH8KzvZPYv5l9ntz5fsJ942rdhcpboZZF0GKRVXJZKM4bSKk5BoMV6x19kf7xzkj3e5u2v265+9vm2W43a4Sxs5/qFvbSSWU6Y4bgPBA8XiyFY1OmRSzDWUFT1bT/Iz+c/Y3yq6f7A6w7lzk+7OxOiKna0dDvbKVDz7h3fsbdkWaixDbimkUvlc7tuu27PTz5B3M1XBPTGfVUCWeeSPaPm6+5i2y92/dJjJfWZSkrfE8b6tOr1ZSpBbiQRXNScKv7w/7u3K3s1zzyzzdyHty2XK3MaXBk2+FaQ213bGIyiADEcM6TqyxAaUZZAlE0olUHzb/AO4gfqz/AMWP+Dn/AFr6Z9xzzb/0+jbf+e6w/wCsHWZ/3fP/AJGbzn/4qvNv/eU63M/eUnXBzr3v3XugT+SPdeC+OXQ3bPeW4/t3x3Wex85uaKiqppaaLM5mmpWh23t0VEMNRJBPuXcU9Lj4n0MFlqVJ4ufZTvu6w7Hs+5bvPTw7eFpKHGpgO1a5+JqL+fQ/9quQNx90/cfkv282rULvdtwhtDIgDGKJmrPPpJUEQQB5WFchD187jrPu3tfrLvrYnzIqEzGY3BS9212+arc2QXJJQbz3djMpid17/wABV5dJIfvJ8tjd2RJkoFn8v2uUXyWWVS2Edhu247fvNnzQwZphdmYyNWjuCHkUt5kh+4V4Nnj19Q/Nvt9yXzd7bcx+w8TQQba/LybclpH4Ze1tpI5LeymWMg6RHJbExMVprhOnKmn0jdlbvwPYOzdpb+2rWfxHa+99s4Hd+28gYnh++wO5cVSZrD1nhlCyxfc4+tjfSwDLqsefedVrcw3trbXlu2q3ljWWNvVWAZT+YPXyn7/sm5cs77vXLe8weFu+33c1jdRVB0TQSNFKtRg6XQiowegY+W/x9j+VHx07P+P8u7H2PF2VisZiZd1R4RdxyYiKg3Fhs9JLHhWy2DWtkqExJhUGqiEZk1nVp0MV8ybKOYdj3DZTc+CJ1CmTTq00ZW+Gq14U49D32U9zG9nPdHlD3LTZhuD7TPJOtmZfAEpeGWEAy+HLpAMmo9hrSmK1FAX/AEDRbd/7zDzX/ojqH/7a3uGf9YW3/wCmnf8A5wD/AK29dLP+Ts27f+ENtv8AubP/AN6/qgLsz4vY0fL6r+J3xr3rWd+V39/KLrHBbw/gdJtii3Ju9J1odxTUVLT5rP0lPtjb+TSojbImskp5aWkkqwywEWhjcOXoxzO3Lew3ZvH8YW6S6QoZ+DUAZgEU17q0oC3Drpbyj7wXZ9jYfen3Y2CPlu3/AHa+73FiJWnaC2I1wBmaKFmuJ4ypEWgMHdYqFwet6f8Alw4dtu/DXqTb7zrVPgq7tLDvVJGYlqWxncXYNE06xFnMazGDUFLEgG1z7y95Hi8DlfbYSalDKtfWk0g6+dX7018N099eddzWMotxHt84QmunxNss3pWgrStK9Kb53/IyD4p/EzuruxKmKDcG3NpVON2LG5omkqewt0Sxbb2UI6SvYRZCGhz+UhrKqFVkb7GmnfQwQj2/zhvg5d5b3Xdg1Jo4isPDMj9seDxoxBI9Aeir7uftbJ7ze9PIHt+Yi223d8su4ka6LZW4M91VkyheGNkRqgeI6CoJHWhj8NO8ty/FX5PdDfJKtiySYGg31Kc9WlIZpNw7LyUj7X7OpqX7smKorTt3O1So76dFUUcMrKGXDvlbdrjl3mDZt9cN4Im7z/FGeyWleJ0sfz6+kD349vNo95PaH3J9qLd4juUm3D6aPIEF1GBcWBbTkL40KVArVKggg0P0f6Kto8lR0mRx1XTV+Pr6aCtoa6iniqqOto6qJJ6WrpKqB5IKmmqYJFeORGZHRgQSD7znR1kVXRgyMKgjIIPAg+YPXyrzwT2s81rdQvHcxuY5I5AVZWU0ZWU0KspFCDkHB6k+7dNde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3RMfn1/2Tmn/iwnwy/+DJ6E9hbnL/khj/nusf8AtOt+p5+7Z/09J/8AxV+af/JX3jo53sU9QN1737r3Xvfuvde9+691737r3Xvfuvde9+691737r3XvfuvdaH/8or5W9I/D75hdtdl99bmrtq7PznT+/Ni43IUG3c9uaabcuT7Q61z9HRNQbdx+SrYYpMXtmsczMgiUxhSwZ1Bw/wDbXmPaeWOaNzv95uDHavbSQqwVn7jNEwFFBPBDnh19G332/Zn3B98vYrkjlL222iO93y33yz3GWKSeG3Agj2++hZ9c7xoSJLiMaQdRrWlAaW+/OP8AnrfF3NdBdmdafHMbu7J372ZsrcGxqXNZTaWU2ps/atBuzFVmCzGZr5NxNi87X5XH46ukejp4KJ4JKjQZZVRWR5M5t93+Xpdmv7DY/FuLyeJoQ7IURA4KljqoxIBwAKV4nrB77vX93T7w2PuVynzX7p/RbTy1tO4Q7i8ENzHc3Nw9tIs0cSCDxIUjd0AkZpAwWulSxBCb/wCE43QW8Nr7G72+Qm5MLkcTtzsuo2jsnrmrrY3pYtxUGz6nclXvDM0EMqrJWYqLMZGkooapLwtVUtXErF4ZAqf2N2a5t7PeN6niZYLgpFATjUELF2HqNRAB4VDDyPRt/eoe5Wx7xzH7c+2O038U+6bQlzuG6pGQxge6WBbaJyMLIYo3kZD3BHiYgBlqTP5t/wDcQP1Z/wCLH/Bz/rX0z7C/Nv8A0+jbf+e6w/6wdTx93z/5Gbzn/wCKrzb/AN5Trcz95SdcHOve/de61sv+FFvyUO1+puq/i7gcj4st2hmn7H35TU9TVQzpsjZs7Ue2MfXQxlKaqx24t4yyVKBy+mfAA6QdLe4J98N++n23buX4ZKSXD+PMATXw0woPkQz5+1Ourn91t7UDeeducfeDcrWtls9uNr212VSDd3Q1TuhNWV4LUBDSlVuaV4jovnen8vxdq/yLuq9wLg6eHtTr3K4/5T7omRKyryc+K7ZNJitw4dVRAlA2J6+yG3p8ihXxxtttiWvdmJN35L+n9otum8EDcYGG4ycSaTUDL8qRlC3/ADT6kz27+8yd5/vE+cNuO4M3Ju6QvydZqSqxiTbtUkEufj8S9S5WI1qRdDFMCwX+QX8jx298Op+o8vWio3Z8ctzzbVEbiVqiTYG7ZK7cmyKyeaSWRZPBW/xbGxIgQRU2NiW3IJGvs3vn7z5XO2yvW5sZDH8/DerRn9upfkFHWMv95P7Vnkf32Tnayt9Oy81WgvaimkXluEgu0AAFKr4MxJrqeZjXyF5fuXOuePVTH84P5xn4c/GasxWzcoaPu3u5Mtsjrh6Weop8htrGLSRJvPsKCam0PT1O2MfkIYaFxLHImUrqaVRIkMyiN/c7m3+q+wPHayU3a7rDBTiop3yY80BoP6RBzQ9Zqfcb+7z/AK+3u3b3m+2ev2+5fMe4bqHAKTvqJtbIhqgrcOjNIKEGGORSVZ0PVd3/AAn3+EJwmCzfzc7ExV8zuiLLbM6Op6+GKSSi28szUW9uwIPPTySw1mdrYXw9FNHLHItJDkFdXiqo29gj2X5S8GGbmy+j/VkrFaBvJeEkg9Cx7QfQN5MOsof7zP7wY3Dctv8Au+8rXlLCzMd/zC0RIDz012lmaEArChE8ikEF2gIIaJh1dr8Cv+yW9jf+HX3T/wC/y7J9yzyf/wAq/af81J/+r8vXPv7x3/T3+Yf+eLa/+7TY9UIf8KM/kfJkMv0p8Sdt1bVH2YbuLf1HRyQVDS5Sv/iG1uu8TLDAr1kNdS0Zy9U8DECSOtpZAp9DCGvfHfS8m1ctQNWn+NTAZyapEPWoGo0+Y66Tf3WXtWltZ8/+9m6whQ/+6LbXkBUCNNFxeygmilGbwEDDgY5VqMjqB/Ml+AEnUX8p34n19FhqmPfPxhWgqezlSlxhmpV74mp8h2S2RqaX/KKuPA9qVWNo6VkeULSsxcFRrSvPnJh23245cdIj9Xt9DcYGPqKGWpGTpmKgccft6UfdR+8uvO330fee3uL9Dy9zeXTaCWkox2gMlhoVu1TNtyyu4IWr0AoTpNr38l35Jj5D/Brr6gy2QWr3t0fJJ0zuhJJ6dquSg2vS0smxci9PEqTJS1GyKuhpRNICZ6qiqDqZgx9yN7V77+++UbFJHrd2n+KyetEA8M/YYyBXzIPWGP39vaj/AFr/ALxHM9xZWxTl/mEDfrMgNpD3DMLtAxqCy3ayPpHwpIgoAR1bH7kfrC7r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de6Jj8+v+yc0/8WE+GX/wZPQnsLc5f8kMf891j/2nW/U8/ds/6ek//ir80/8Akr7x0c72KeoG697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3XutCn+VH8QOnvmr8uO1urO7YNyT7VwHU2+uwMem1s4cBkBuDFdmddbdpGmrBS1nloxjd1VYaLSNTlGv6bHDr265Z2vmvmbctu3ZZDbJbSTL4baTqEsSjNDijnr6Q/vme+PPXsD7Iclc4+30tom83O9We2Sm8h8ZPBksL6dgF1LRtdulDXhUefWzX1x/JD/l29eZRMxP1HmuwqyCeGoo4ux987lzmLpXheOQI+Cx1ZhMHlIJGj9cVfTVcbqSpXSbe58sfabkiykEp2xp2BqPHkdgP9qCqn8weuSXNP94N96Lmezaxj53g2yBlKudqtIIZGBBGJnSWaMiuDG6EGhBr1a1h8PiNvYnGYHAYvHYPBYWgpMVhsLh6GmxmJxOLx8EdLQY3GY6iigo6CgoqWJY4YYkSOONQqgAAe5FiiigjjhhjVIUUKqKAAAMAADAAHADrDO+vr3c7273LcryW43G4kaaeed2kkkkclneR3JZ3diSzEkkkkmvWm782/wDuIH6s/wDFj/g5/wBa+mfeL/Nv/T6Nt/57rD/rB13Z+75/8jN5z/8AFV5t/wC8p1uZ+8pOuDnXvfuvdaDXy3yPan80T+ZR2Rt3oyjh3pVVuXzex+p6GbOQ4rBr171LicgGzMOS3FU0dHiKDcAxNbmTG5iDVeSKIpkkAbDfmV9x9wefL6DaFErFmhtgWovhwg91WIADULfa3qevpM9krbk37n/3UOVd19xJ2sIUhi3HepFhMk31u5SJSIpArNI8PiRwVFaJFUkKpobTLfy8v57ufwWT2tne2u4c1tnNYitwGZ25lvmXX5HBZbBZGjkx2QwuTxFZ2JNj6/EV+PmeCamljeGWFyjKVJHsSS8ke780MlvNudy9u6lGRr4lSpFCpUyUKkYIOCOoVsvvQf3c227jabxt3JGx2+7W863MF1ByvGk0cyMHSWORbIOkiOAyuCGDAEEEdBL/ACnd/b1+DH8y7/QJ23SHblTv3JZT47dg4kzJX09Fu+srqeq2HXUdRS1S0NZHU7voqOlgrEMsTUGTkkjurg+y324vbrlDn39zbkuhpmNjMvEByQYyKGhq4AB9GJHHoa/fS5b2D7xP3TR7lckzfVRbbFHzRtk1CjNbKjLeIysutStszu0ZoRJCqtkU63ctx7iwe0NvZ7dm58rRYLbW18LlNxbhzeRmWnx+HweEoZ8llsrX1DemCix9BTSTSueFRCfx7yxnnhtoJrm4kCQRoXd2wFVRUkn0AFevn32ra9x3zc9u2XaLOS43a8njtbW3iGp5ZpXEccaKOLO7BQPMkdaOGVqewf51f8y6KmpGzGJ6sNd9nSSiCZX63+OWyclJNNXTLbI0uP3RuX753HkLU77gzCRXEOkLiRI177rc+hV1Lt1aD/hVtGePmA71+zW1OHX0M2cXLP3AvumPLOIJ+cjHrcVFL7fLuMAIPgZ7e30AYowtoC1Nda7xG09q7e2Ltbbeydo4qlwW1doYHEbY21hKIOKPEYHA0FPi8RjKXyvJL4KGgpY4k1MzFV5JNz7y2treC0t4LW2jCW8SCONBwVVFAB9gHXz1b1vG58xbxuu/73ePc7zfXMl3d3ElNUs0zmSSRqADU7sSaADOB0VD4NZGgxHxL2rlsrW0uNxeMz/eeRyWQrp46WioKCi7s7MqaytrKmZkhp6Wlp4meSRyFRFJJAHsO8pOkfLltJIwWNXnZmOAAJ5SST5ADqZfvCWtze+9G8WVnA8t3NbbTFFFGCzu77VYKqqoqWZmIAAySaDrSz3XgvkJ/NV+dndG8OiMDV5/dedy+b31t+KtzuK24No9ZbNrcVtjZLVmeqZsZjqGpxOI/hVKjqwllq3DAs7M3vFS4h3v3F5w3W52eEvcOzTJVguiJCEjq2ACBpHzPXfTZty9sfua/dz5B2P3H3FLbZ7eCLbroxwyT/U390klxd6YVEjusknjOQRQIKGgAHR3d3fy4P55nYG3Mrs7fnZXam9to52BKbN7V3d8wajcm3MzTRTxVUdPlcHmewK3GZCCOqp45FSaJ1EiKwFwCBbc8ie7l7BJa3m4XEts4o8ct6WVhxoVaQg5Hn1j7sn3q/7vDlndbPfeW+Udn2/e7Zi9veWPLKwTxMQVLRyxWayISpIqpBoSOB69/Ix7k3J8Z/nF2D8VOy4KnbLdrRZzYOZwWUmpaMYPuPqmpzFZiaesaoXUamakhzWKjiicGoq6uAAOQnvXtFuk+wc23vLl+pj+p1QsjUGmeEsQDX5a1+ZI69/eI8i7V7tfd65X95uUpFuxsxi3KC4hDN4u17isSyMun8IYwTEsO1Ecmmetz73lP1wV697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3XuiY/Pr/snNP/FhPhl/8GT0J7C3OX/JDH/PdY/9p1v1PP3bP+npP/4q/NP/AJK+8dHO9inqBuve/de697917r3v3Xuve/de697917onn+z/AHw6/wCf77U/849x/wD1k9hn+uXLP/R3j/Y3/QPU4/8AA2e+X/hOr3/eoP8Arb17/Z/vh1/z/fan/nHuP/6ye/f1y5Z/6O8f7G/6B69/wNnvl/4Tq9/3qD/rb17/AGf74df8/wB9qf8AnHuP/wCsnv39cuWf+jvH+xv+gevf8DZ75f8AhOr3/eoP+tvWrh/JX3Rgfjr8y+2uw+7MgvXmy890ZvzbWI3Bm4Kp6OuzuU7U6rzmPxsS4+CtqRUVOJwlXOupFXRA1yDYHHz2rmi2Pmnc77dm8C0e0kjV3BoWM0LAYqakKT+XXYL7/O1X/uj7C8k8rcgW53TmC25hs7ue1tyoZIY9u3CF5CXKLRZJUXBJqw8uto//AGf74df8/wB9qf8AnHuP/wCsnvIP+uXLP/R3j/Y3/QPXH3/gbPfL/wAJ1e/71B/1t69/s/3w6/5/vtT/AM49x/8A1k9+/rlyz/0d4/2N/wBA9e/4Gz3y/wDCdXv+9Qf9betRP+ZhvLdm7P5k27Pkr8bK2bP0u3ct0lu/rrf+JxlJXUFPu3rzZOxpaTIQ43ctC9HXnCbowVmhq6SWmleEq6SRkg408+3F1c893G/bCxdY2glgmUAgPGkdDRxQ6XXgQQaeY67c/dL2TY9k+6ls/tP7rwLbTXUO62O6bbM7o7W17dXYZDJAwZPFt5sMjq6hqgq1CMv/AA6b/OI/5/JmP/RLfHf/AO1f73/rg+6H/Rzf/nBbf9auq/8AAffcV/6YWD/uab3/ANt/Vz9b/Mjzf/DXGRrNy9jDenze3R1juLa1bg6LCwbc3JR7p3fujLbZp9wR0+0sJt7a2JqdobPyKZOFqbxKz0cerVK7apUfnmb/AFvnae98Xm2S3aMoFCsHdiuqiKqDQh1ClOA8+sCYPurbd/wYNrb7Vyv9B93y03eG8juJJWnga2treOcwlrmWa4kW5uUMLa9RAdqUUChEf5F1N0v8bM/3R3b8ht54nr3fOVxeL6z6/wANmkrZq0bZqKmm3LvTMvT47HZARRZDI4/E09NIZEb/ACWpUqQwPsHe0SbXsM267tvdysF2yi3hV610Eh3bAPEhQPsPWRv94ncc+e6+3che3/thsU26cuwTSbtuc9vpCfUBWgtYqu6VKRvOzihHfGa1HWxt/s/3w6/5/vtT/wA49x//AFk9zl/XLln/AKO8f7G/6B65Y/8AA2e+X/hOr3/eoP8Arb1q1/zm8HsPs35RbJ+SnxY3fR74yW7NsYeHfbbYfIxZTb2/euZaOg25uSRMrSUAhiye11x1PT+DWElxEjOFLrrx7904LTcOYbTfuXbgTSSRqJvDrVZIqBW7gOKaQKeanrsL9wzc+YeUfaDmH2n949kfb7Oyu5W24XgQxzWd8GeeAeGz1Mdx4rtqpUTqBUKaWEfzDvm1i/kn/LLwm3Nh7q+w727Gg6pHbfVuLo6qgy1IsPjruwcIDUxzU38Dh3Nj42TxVbSTUYQNdHkT2Neduak33kGKCznpvE4h+pt1BBHnIucadQ9cj8+sYvuwewN17Ufe2vt15k2fxPbnan3E7LvEzK8bVqllL2kN4pgcg1QBZK0yFPWvt8ae7fnH8P5t2VXx1rqzr2s3xFiYN0Vx696u3dkMjTYR66TG0kdfvvau56zHUcMuRld4aV4IpnKtKrtHGVhbYd05v5YNy2xsYGmoJD4cLkha0FZEcgZOBSvnwHXTb3Z5C+7t75JssXulAm6QbcZGs4/rdwtkRpdAkYpZ3FursQigM4YqKhSAzVNd/wAOm/ziP+fyZj/0S3x3/wDtX+xH/rg+6H/Rzf8A5wW3/WrqGP8AgPvuK/8ATCwf9zTe/wDtv6sQz/zbp6H+TLiOrtlbpk3N8muzsNufYe8cJh6T7HL7ep9/dlb0yvZGcyMS42kw8FNX7Zmq6ILRuhhnycTRBQnA3n5rC+1sW32lwZN/uEaGVFFCviSuZWOAoqtRjgWFOsXds9gHuPv433N+/wCzi09o9ouINysbidtcUxs7G1jsYUPiNKWScJJVwdSwsGqTmF/I0yHx/wDir19272R3pv7b+x+2uydxY7a+LwOaoK6oy+F682nTffJVRVuNo8h9tFuzceYmM9OShZcTSyMCChFPaNtn5dstzvt3u0h3KdxGqOCSsSCtagGmtmNR/RB6Uf3h8HuV7y8z8kcq+3XLlzuHJO02r3k1zA6rHLe3LaCpSRk1G2giXS2aGaRRTNb5P9n++HX/AD/fan/nHuP/AOsnuYf65cs/9HeP9jf9A9c4v+Bs98v/AAnV7/vUH/W3rU7/AJl1DicL/MAxfys+G+fx+76fOV+x+33rtqUb0sG1e3do5Cniy0VZQ5GCkepOeqcDS5eeVomiq6jI1CsGIe+OPPsSRc6R8x8ryiUOY7msYpomQ5qDSuoqGPqWPXaL7pl3d3/3Z732Z99ttksZLeO72MR3jajcbbcoxjKuhYL4ImeBQCCixRkUqOtqPaX8xf4lbi2ptjcGW7Xwm08rndvYXMZPauWp83Nlds5DJ42mra3b+TlpMM9LLkMNUztTTNExjaSMlSRb3kPbc7cuT29vNJuKxyOis0bBqqSASpotKqcHrjhvf3Xfena953bbLLk24vbO3upYIryAxCOdI3ZFmjDShgkqgOoOaEVz0of9n++HX/P99qf+ce4//rJ7f/rlyz/0d4/2N/0D0Wf8DZ75f+E6vf8AeoP+tvXv9n++HX/P99qf+ce4/wD6ye/f1y5Z/wCjvH+xv+gevf8AA2e+X/hOr3/eoP8Arb17/Z/vh1/z/fan/nHuP/6ye/f1y5Z/6O8f7G/6B69/wNnvl/4Tq9/3qD/rb17/AGf74df8/wB9qf8AnHuP/wCsnv39cuWf+jvH+xv+gevf8DZ75f8AhOr3/eoP+tvXv9n++HX/AD/fan/nHuP/AOsnv39cuWf+jvH+xv8AoHr3/A2e+X/hOr3/AHqD/rb17/Z/vh1/z/fan/nHuP8A+snv39cuWf8Ao7x/sb/oHr3/AANnvl/4Tq9/3qD/AK29e/2f74df8/32p/5x7j/+snv39cuWf+jvH+xv+gevf8DZ75f+E6vf96g/629e/wBn++HX/P8Afan/AJx7j/8ArJ79/XLln/o7x/sb/oHr3/A2e+X/AITq9/3qD/rb17/Z/vh1/wA/32p/5x7j/wDrJ79/XLln/o7x/sb/AKB69/wNnvl/4Tq9/wB6g/629e/2f74df8/32p/5x7j/APrJ79/XLln/AKO8f7G/6B69/wADZ75f+E6vf96g/wCtvXv9n++HX/P99qf+ce4//rJ79/XLln/o7x/sb/oHr3/A2e+X/hOr3/eoP+tvRT/mt82Pixu/odcLtvuXbWWyg7x+J+ZNHT0ueWT+GbY+VnS25s9WXmxEUfjxuCxFTUuL6ikRCgtYEOc181cvXOziKDdEaT6yzegDcEvIGY/D5KpP5dTR7A+wXvDsnuM1/uvIl3Daf1d5jg1s0NPEuOXd1ghXEhNZJpEQfNhWgz0bD/Z/vh1/z/fan/nHuP8A+snsR/1y5Z/6O8f7G/6B6hf/AIGz3y/8J1e/71B/1t69/s/3w6/5/vtT/wA49x//AFk9+/rlyz/0d4/2N/0D17/gbPfL/wAJ1e/71B/1t69/s/3w6/5/vtT/AM49x/8A1k9+/rlyz/0d4/2N/wBA9e/4Gz3y/wDCdXv+9Qf9bevf7P8AfDr/AJ/vtT/zj3H/APWT37+uXLP/AEd4/wBjf9A9e/4Gz3y/8J1e/wC9Qf8AW3r3+z/fDr/n++1P/OPcf/1k9+/rlyz/ANHeP9jf9A9e/wCBs98v/CdXv+9Qf9bevf7P98Ov+f77U/8AOPcf/wBZPfv65cs/9HeP9jf9A9e/4Gz3y/8ACdXv+9Qf9bejh+xN1B3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+690U/wCENBS43417Mo6LNYzcFPHuft90y2IizEOPnao7n7CqZoYo8/icHlBJQzTNTyl6ZEM0TGJpIikjh3lRFj2K1VZVdfEm7l1UzPIfxBTjgcceFRnqZvvAXM137rb9PPYS20ptNtBhnMRcadrslBJhkljo4AYUcnSRqCtVQbD2IuoZ697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuve/de697917r3v3Xuii/OLH0mT6BSkrc5i9uwf6d/iNVfxPMQ5qehM+P+WvSFfSY3x7fw+dyX3ucq6ZKGlb7f7dKqojaplp6YS1EQa5tRZNmCvMqD6yzOptVMXkBA7VY1YigxSpFSBUibfu93M1p7lPNb7fNdSf1b5lTwYDEHo/Le7I0lZpYU0QqxkcatZRGEaySaUY3XsS9Ql1737r3Xvfuvde9+691737r3Xvfuvdf/2Q=="
    })
  ])
], -1)), al = /* @__PURE__ */ Oe(() => /* @__PURE__ */ O("p", null, [
  /* @__PURE__ */ ve(" Une fois le texte sélectionné (le texte devient vert quand il est sélectionné), copiez-le et collez-le dans votre "),
  /* @__PURE__ */ O("br"),
  /* @__PURE__ */ ve("outil de messagerie mail, dans les paramètres de signatures automatiques. ")
], -1));
function dl(e, t, n, r, s, i) {
  return so(), lo("div", Go, [
    O("div", Yo, [
      O("div", Qo, [
        _o,
        O("form", $o, [
          Xt(O("input", {
            type: "text",
            placeholder: "prénom",
            "onUpdate:modelValue": t[0] || (t[0] = (o) => e.firstname = o)
          }, null, 512), [
            [Ht, e.firstname]
          ]),
          Xt(O("input", {
            type: "text",
            placeholder: "nom",
            "onUpdate:modelValue": t[1] || (t[1] = (o) => e.name = o)
          }, null, 512), [
            [Ht, e.name]
          ]),
          Xt(O("input", {
            type: "text",
            placeholder: "fonction",
            "onUpdate:modelValue": t[2] || (t[2] = (o) => e.activity = o)
          }, null, 512), [
            [Ht, e.activity]
          ]),
          Xt(O("input", {
            type: "text",
            placeholder: "numéro",
            "onUpdate:modelValue": t[3] || (t[3] = (o) => e.tel = o)
          }, null, 512), [
            [Ht, e.tel]
          ])
        ]),
        O("div", {
          onClick: t[4] || (t[4] = (...o) => e.copySignatureInClipBoard && e.copySignatureInClipBoard(...o)),
          class: "v-mail-signature-generator__container"
        }, [
          O("div", el, [
            O("table", tl, [
              O("tbody", null, [
                O("tr", null, [
                  O("td", nl, [
                    ve(mt(e.getCleanedEmptyString(e.firstname, "prénom")) + " " + mt(e.getCleanedEmptyString(e.name, "/ nom")) + " ", 1),
                    rl,
                    ve(" " + mt(e.getCleanedEmptyString(e.activity, "fonction")), 1)
                  ])
                ]),
                sl,
                il,
                O("tr", null, [
                  O("td", ol, [
                    O("a", {
                      href: "tel:" + e.tel,
                      style: { "text-decoration": "none" }
                    }, mt(e.getCleanedEmptyString(e.tel, "numéro")), 9, ll),
                    fl,
                    ul
                  ])
                ]),
                cl
              ])
            ])
          ], 512)
        ]),
        O("button", {
          onClick: t[5] || (t[5] = (...o) => e.copySignatureInClipBoard && e.copySignatureInClipBoard(...o)),
          class: "fp-ui-button"
        }, "Sélectionner le texte de signature"),
        al
      ])
    ])
  ]);
}
const Al = /* @__PURE__ */ Ko(Jo, [["render", dl], ["styles", [Fo]], ["__scopeId", "data-v-82bb82c7"]]);
function hl() {
  customElements.define("mail-signature", So(Al));
}
export {
  hl as register
};
//# sourceMappingURL=index.js.map
