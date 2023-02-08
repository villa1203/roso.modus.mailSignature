function xn(e, t) {
  const n = /* @__PURE__ */ Object.create(null), s = e.split(",");
  for (let r = 0; r < s.length; r++)
    n[s[r]] = !0;
  return t ? (r) => !!n[r.toLowerCase()] : (r) => !!n[r];
}
function yn(e) {
  if (T(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const s = e[n], r = q(s) ? xr(s) : yn(s);
      if (r)
        for (const i in r)
          t[i] = r[i];
    }
    return t;
  } else {
    if (q(e))
      return e;
    if (z(e))
      return e;
  }
}
const mr = /;(?![^(]*\))/g, _r = /:([^]+)/, br = /\/\*.*?\*\//gs;
function xr(e) {
  const t = {};
  return e.replace(br, "").split(mr).forEach((n) => {
    if (n) {
      const s = n.split(_r);
      s.length > 1 && (t[s[0].trim()] = s[1].trim());
    }
  }), t;
}
function wn(e) {
  let t = "";
  if (q(e))
    t = e;
  else if (T(e))
    for (let n = 0; n < e.length; n++) {
      const s = wn(e[n]);
      s && (t += s + " ");
    }
  else if (z(e))
    for (const n in e)
      e[n] && (t += n + " ");
  return t.trim();
}
const yr = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", wr = /* @__PURE__ */ xn(yr);
function Cs(e) {
  return !!e || e === "";
}
const bt = (e) => q(e) ? e : e == null ? "" : T(e) || z(e) && (e.toString === Ts || !I(e.toString)) ? JSON.stringify(e, vs, 2) : String(e), vs = (e, t) => t && t.__v_isRef ? vs(e, t.value) : Je(t) ? {
  [`Map(${t.size})`]: [...t.entries()].reduce((n, [s, r]) => (n[`${s} =>`] = r, n), {})
} : Os(t) ? {
  [`Set(${t.size})`]: [...t.values()]
} : z(t) && !T(t) && !Is(t) ? String(t) : t, B = {}, qe = [], fe = () => {
}, Er = () => !1, Cr = /^on[^a-z]/, Ht = (e) => Cr.test(e), En = (e) => e.startsWith("onUpdate:"), X = Object.assign, Cn = (e, t) => {
  const n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}, vr = Object.prototype.hasOwnProperty, N = (e, t) => vr.call(e, t), T = Array.isArray, Je = (e) => Ut(e) === "[object Map]", Os = (e) => Ut(e) === "[object Set]", I = (e) => typeof e == "function", q = (e) => typeof e == "string", vn = (e) => typeof e == "symbol", z = (e) => e !== null && typeof e == "object", Ps = (e) => z(e) && I(e.then) && I(e.catch), Ts = Object.prototype.toString, Ut = (e) => Ts.call(e), Or = (e) => Ut(e).slice(8, -1), Is = (e) => Ut(e) === "[object Object]", On = (e) => q(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, Tt = /* @__PURE__ */ xn(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), $t = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return (n) => t[n] || (t[n] = e(n));
}, Pr = /-(\w)/g, xe = $t((e) => e.replace(Pr, (t, n) => n ? n.toUpperCase() : "")), Tr = /\B([A-Z])/g, ie = $t((e) => e.replace(Tr, "-$1").toLowerCase()), As = $t((e) => e.charAt(0).toUpperCase() + e.slice(1)), kt = $t((e) => e ? `on${As(e)}` : ""), Rt = (e, t) => !Object.is(e, t), It = (e, t) => {
  for (let n = 0; n < e.length; n++)
    e[n](t);
}, Nt = (e, t, n) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    value: n
  });
}, on = (e) => {
  const t = parseFloat(e);
  return isNaN(t) ? e : t;
}, Jn = (e) => {
  const t = q(e) ? Number(e) : NaN;
  return isNaN(t) ? e : t;
};
let Yn;
const Ir = () => Yn || (Yn = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
let re;
class Ar {
  constructor(t = !1) {
    this.detached = t, this._active = !0, this.effects = [], this.cleanups = [], this.parent = re, !t && re && (this.index = (re.scopes || (re.scopes = [])).push(this) - 1);
  }
  get active() {
    return this._active;
  }
  run(t) {
    if (this._active) {
      const n = re;
      try {
        return re = this, t();
      } finally {
        re = n;
      }
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    re = this;
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    re = this.parent;
  }
  stop(t) {
    if (this._active) {
      let n, s;
      for (n = 0, s = this.effects.length; n < s; n++)
        this.effects[n].stop();
      for (n = 0, s = this.cleanups.length; n < s; n++)
        this.cleanups[n]();
      if (this.scopes)
        for (n = 0, s = this.scopes.length; n < s; n++)
          this.scopes[n].stop(!0);
      if (!this.detached && this.parent && !t) {
        const r = this.parent.scopes.pop();
        r && r !== this && (this.parent.scopes[this.index] = r, r.index = this.index);
      }
      this.parent = void 0, this._active = !1;
    }
  }
}
function Mr(e, t = re) {
  t && t.active && t.effects.push(e);
}
function Fr() {
  return re;
}
const Pn = (e) => {
  const t = new Set(e);
  return t.w = 0, t.n = 0, t;
}, Ms = (e) => (e.w & Ae) > 0, Fs = (e) => (e.n & Ae) > 0, Rr = ({ deps: e }) => {
  if (e.length)
    for (let t = 0; t < e.length; t++)
      e[t].w |= Ae;
}, Nr = (e) => {
  const { deps: t } = e;
  if (t.length) {
    let n = 0;
    for (let s = 0; s < t.length; s++) {
      const r = t[s];
      Ms(r) && !Fs(r) ? r.delete(e) : t[n++] = r, r.w &= ~Ae, r.n &= ~Ae;
    }
    t.length = n;
  }
}, ln = /* @__PURE__ */ new WeakMap();
let st = 0, Ae = 1;
const cn = 30;
let oe;
const De = Symbol(""), fn = Symbol("");
class Tn {
  constructor(t, n = null, s) {
    this.fn = t, this.scheduler = n, this.active = !0, this.deps = [], this.parent = void 0, Mr(this, s);
  }
  run() {
    if (!this.active)
      return this.fn();
    let t = oe, n = Pe;
    for (; t; ) {
      if (t === this)
        return;
      t = t.parent;
    }
    try {
      return this.parent = oe, oe = this, Pe = !0, Ae = 1 << ++st, st <= cn ? Rr(this) : Xn(this), this.fn();
    } finally {
      st <= cn && Nr(this), Ae = 1 << --st, oe = this.parent, Pe = n, this.parent = void 0, this.deferStop && this.stop();
    }
  }
  stop() {
    oe === this ? this.deferStop = !0 : this.active && (Xn(this), this.onStop && this.onStop(), this.active = !1);
  }
}
function Xn(e) {
  const { deps: t } = e;
  if (t.length) {
    for (let n = 0; n < t.length; n++)
      t[n].delete(e);
    t.length = 0;
  }
}
let Pe = !0;
const Rs = [];
function ke() {
  Rs.push(Pe), Pe = !1;
}
function Ge() {
  const e = Rs.pop();
  Pe = e === void 0 ? !0 : e;
}
function te(e, t, n) {
  if (Pe && oe) {
    let s = ln.get(e);
    s || ln.set(e, s = /* @__PURE__ */ new Map());
    let r = s.get(n);
    r || s.set(n, r = Pn()), Ns(r);
  }
}
function Ns(e, t) {
  let n = !1;
  st <= cn ? Fs(e) || (e.n |= Ae, n = !Ms(e)) : n = !e.has(oe), n && (e.add(oe), oe.deps.push(e));
}
function ye(e, t, n, s, r, i) {
  const o = ln.get(e);
  if (!o)
    return;
  let c = [];
  if (t === "clear")
    c = [...o.values()];
  else if (n === "length" && T(e)) {
    const u = Number(s);
    o.forEach((d, m) => {
      (m === "length" || m >= u) && c.push(d);
    });
  } else
    switch (n !== void 0 && c.push(o.get(n)), t) {
      case "add":
        T(e) ? On(n) && c.push(o.get("length")) : (c.push(o.get(De)), Je(e) && c.push(o.get(fn)));
        break;
      case "delete":
        T(e) || (c.push(o.get(De)), Je(e) && c.push(o.get(fn)));
        break;
      case "set":
        Je(e) && c.push(o.get(De));
        break;
    }
  if (c.length === 1)
    c[0] && un(c[0]);
  else {
    const u = [];
    for (const d of c)
      d && u.push(...d);
    un(Pn(u));
  }
}
function un(e, t) {
  const n = T(e) ? e : [...e];
  for (const s of n)
    s.computed && Zn(s);
  for (const s of n)
    s.computed || Zn(s);
}
function Zn(e, t) {
  (e !== oe || e.allowRecurse) && (e.scheduler ? e.scheduler() : e.run());
}
const jr = /* @__PURE__ */ xn("__proto__,__v_isRef,__isVue"), js = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(vn)
), Sr = /* @__PURE__ */ In(), Hr = /* @__PURE__ */ In(!1, !0), Ur = /* @__PURE__ */ In(!0), Qn = /* @__PURE__ */ $r();
function $r() {
  const e = {};
  return ["includes", "indexOf", "lastIndexOf"].forEach((t) => {
    e[t] = function(...n) {
      const s = S(this);
      for (let i = 0, o = this.length; i < o; i++)
        te(s, "get", i + "");
      const r = s[t](...n);
      return r === -1 || r === !1 ? s[t](...n.map(S)) : r;
    };
  }), ["push", "pop", "shift", "unshift", "splice"].forEach((t) => {
    e[t] = function(...n) {
      ke();
      const s = S(this)[t].apply(this, n);
      return Ge(), s;
    };
  }), e;
}
function Br(e) {
  const t = S(this);
  return te(t, "has", e), t.hasOwnProperty(e);
}
function In(e = !1, t = !1) {
  return function(s, r, i) {
    if (r === "__v_isReactive")
      return !e;
    if (r === "__v_isReadonly")
      return e;
    if (r === "__v_isShallow")
      return t;
    if (r === "__v_raw" && i === (e ? t ? ti : Bs : t ? $s : Us).get(s))
      return s;
    const o = T(s);
    if (!e) {
      if (o && N(Qn, r))
        return Reflect.get(Qn, r, i);
      if (r === "hasOwnProperty")
        return Br;
    }
    const c = Reflect.get(s, r, i);
    return (vn(r) ? js.has(r) : jr(r)) || (e || te(s, "get", r), t) ? c : G(c) ? o && On(r) ? c : c.value : z(c) ? e ? Ds(c) : Fn(c) : c;
  };
}
const Dr = /* @__PURE__ */ Ss(), Kr = /* @__PURE__ */ Ss(!0);
function Ss(e = !1) {
  return function(n, s, r, i) {
    let o = n[s];
    if (ot(o) && G(o) && !G(r))
      return !1;
    if (!e && (!an(r) && !ot(r) && (o = S(o), r = S(r)), !T(n) && G(o) && !G(r)))
      return o.value = r, !0;
    const c = T(n) && On(s) ? Number(s) < n.length : N(n, s), u = Reflect.set(n, s, r, i);
    return n === S(i) && (c ? Rt(r, o) && ye(n, "set", s, r) : ye(n, "add", s, r)), u;
  };
}
function Lr(e, t) {
  const n = N(e, t);
  e[t];
  const s = Reflect.deleteProperty(e, t);
  return s && n && ye(e, "delete", t, void 0), s;
}
function zr(e, t) {
  const n = Reflect.has(e, t);
  return (!vn(t) || !js.has(t)) && te(e, "has", t), n;
}
function Wr(e) {
  return te(e, "iterate", T(e) ? "length" : De), Reflect.ownKeys(e);
}
const Hs = {
  get: Sr,
  set: Dr,
  deleteProperty: Lr,
  has: zr,
  ownKeys: Wr
}, Vr = {
  get: Ur,
  set(e, t) {
    return !0;
  },
  deleteProperty(e, t) {
    return !0;
  }
}, qr = /* @__PURE__ */ X({}, Hs, {
  get: Hr,
  set: Kr
}), An = (e) => e, Bt = (e) => Reflect.getPrototypeOf(e);
function xt(e, t, n = !1, s = !1) {
  e = e.__v_raw;
  const r = S(e), i = S(t);
  n || (t !== i && te(r, "get", t), te(r, "get", i));
  const { has: o } = Bt(r), c = s ? An : n ? jn : Nn;
  if (o.call(r, t))
    return c(e.get(t));
  if (o.call(r, i))
    return c(e.get(i));
  e !== r && e.get(t);
}
function yt(e, t = !1) {
  const n = this.__v_raw, s = S(n), r = S(e);
  return t || (e !== r && te(s, "has", e), te(s, "has", r)), e === r ? n.has(e) : n.has(e) || n.has(r);
}
function wt(e, t = !1) {
  return e = e.__v_raw, !t && te(S(e), "iterate", De), Reflect.get(e, "size", e);
}
function kn(e) {
  e = S(e);
  const t = S(this);
  return Bt(t).has.call(t, e) || (t.add(e), ye(t, "add", e, e)), this;
}
function Gn(e, t) {
  t = S(t);
  const n = S(this), { has: s, get: r } = Bt(n);
  let i = s.call(n, e);
  i || (e = S(e), i = s.call(n, e));
  const o = r.call(n, e);
  return n.set(e, t), i ? Rt(t, o) && ye(n, "set", e, t) : ye(n, "add", e, t), this;
}
function es(e) {
  const t = S(this), { has: n, get: s } = Bt(t);
  let r = n.call(t, e);
  r || (e = S(e), r = n.call(t, e)), s && s.call(t, e);
  const i = t.delete(e);
  return r && ye(t, "delete", e, void 0), i;
}
function ts() {
  const e = S(this), t = e.size !== 0, n = e.clear();
  return t && ye(e, "clear", void 0, void 0), n;
}
function Et(e, t) {
  return function(s, r) {
    const i = this, o = i.__v_raw, c = S(o), u = t ? An : e ? jn : Nn;
    return !e && te(c, "iterate", De), o.forEach((d, m) => s.call(r, u(d), u(m), i));
  };
}
function Ct(e, t, n) {
  return function(...s) {
    const r = this.__v_raw, i = S(r), o = Je(i), c = e === "entries" || e === Symbol.iterator && o, u = e === "keys" && o, d = r[e](...s), m = n ? An : t ? jn : Nn;
    return !t && te(i, "iterate", u ? fn : De), {
      // iterator protocol
      next() {
        const { value: w, done: C } = d.next();
        return C ? { value: w, done: C } : {
          value: c ? [m(w[0]), m(w[1])] : m(w),
          done: C
        };
      },
      // iterable protocol
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function ve(e) {
  return function(...t) {
    return e === "delete" ? !1 : this;
  };
}
function Jr() {
  const e = {
    get(i) {
      return xt(this, i);
    },
    get size() {
      return wt(this);
    },
    has: yt,
    add: kn,
    set: Gn,
    delete: es,
    clear: ts,
    forEach: Et(!1, !1)
  }, t = {
    get(i) {
      return xt(this, i, !1, !0);
    },
    get size() {
      return wt(this);
    },
    has: yt,
    add: kn,
    set: Gn,
    delete: es,
    clear: ts,
    forEach: Et(!1, !0)
  }, n = {
    get(i) {
      return xt(this, i, !0);
    },
    get size() {
      return wt(this, !0);
    },
    has(i) {
      return yt.call(this, i, !0);
    },
    add: ve(
      "add"
      /* TriggerOpTypes.ADD */
    ),
    set: ve(
      "set"
      /* TriggerOpTypes.SET */
    ),
    delete: ve(
      "delete"
      /* TriggerOpTypes.DELETE */
    ),
    clear: ve(
      "clear"
      /* TriggerOpTypes.CLEAR */
    ),
    forEach: Et(!0, !1)
  }, s = {
    get(i) {
      return xt(this, i, !0, !0);
    },
    get size() {
      return wt(this, !0);
    },
    has(i) {
      return yt.call(this, i, !0);
    },
    add: ve(
      "add"
      /* TriggerOpTypes.ADD */
    ),
    set: ve(
      "set"
      /* TriggerOpTypes.SET */
    ),
    delete: ve(
      "delete"
      /* TriggerOpTypes.DELETE */
    ),
    clear: ve(
      "clear"
      /* TriggerOpTypes.CLEAR */
    ),
    forEach: Et(!0, !0)
  };
  return ["keys", "values", "entries", Symbol.iterator].forEach((i) => {
    e[i] = Ct(i, !1, !1), n[i] = Ct(i, !0, !1), t[i] = Ct(i, !1, !0), s[i] = Ct(i, !0, !0);
  }), [
    e,
    n,
    t,
    s
  ];
}
const [Yr, Xr, Zr, Qr] = /* @__PURE__ */ Jr();
function Mn(e, t) {
  const n = t ? e ? Qr : Zr : e ? Xr : Yr;
  return (s, r, i) => r === "__v_isReactive" ? !e : r === "__v_isReadonly" ? e : r === "__v_raw" ? s : Reflect.get(N(n, r) && r in s ? n : s, r, i);
}
const kr = {
  get: /* @__PURE__ */ Mn(!1, !1)
}, Gr = {
  get: /* @__PURE__ */ Mn(!1, !0)
}, ei = {
  get: /* @__PURE__ */ Mn(!0, !1)
}, Us = /* @__PURE__ */ new WeakMap(), $s = /* @__PURE__ */ new WeakMap(), Bs = /* @__PURE__ */ new WeakMap(), ti = /* @__PURE__ */ new WeakMap();
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
function si(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : ni(Or(e));
}
function Fn(e) {
  return ot(e) ? e : Rn(e, !1, Hs, kr, Us);
}
function ri(e) {
  return Rn(e, !1, qr, Gr, $s);
}
function Ds(e) {
  return Rn(e, !0, Vr, ei, Bs);
}
function Rn(e, t, n, s, r) {
  if (!z(e) || e.__v_raw && !(t && e.__v_isReactive))
    return e;
  const i = r.get(e);
  if (i)
    return i;
  const o = si(e);
  if (o === 0)
    return e;
  const c = new Proxy(e, o === 2 ? s : n);
  return r.set(e, c), c;
}
function Ye(e) {
  return ot(e) ? Ye(e.__v_raw) : !!(e && e.__v_isReactive);
}
function ot(e) {
  return !!(e && e.__v_isReadonly);
}
function an(e) {
  return !!(e && e.__v_isShallow);
}
function Ks(e) {
  return Ye(e) || ot(e);
}
function S(e) {
  const t = e && e.__v_raw;
  return t ? S(t) : e;
}
function Ls(e) {
  return Nt(e, "__v_skip", !0), e;
}
const Nn = (e) => z(e) ? Fn(e) : e, jn = (e) => z(e) ? Ds(e) : e;
function ii(e) {
  Pe && oe && (e = S(e), Ns(e.dep || (e.dep = Pn())));
}
function oi(e, t) {
  e = S(e);
  const n = e.dep;
  n && un(n);
}
function G(e) {
  return !!(e && e.__v_isRef === !0);
}
function li(e) {
  return G(e) ? e.value : e;
}
const ci = {
  get: (e, t, n) => li(Reflect.get(e, t, n)),
  set: (e, t, n, s) => {
    const r = e[t];
    return G(r) && !G(n) ? (r.value = n, !0) : Reflect.set(e, t, n, s);
  }
};
function zs(e) {
  return Ye(e) ? e : new Proxy(e, ci);
}
var Ws;
class fi {
  constructor(t, n, s, r) {
    this._setter = n, this.dep = void 0, this.__v_isRef = !0, this[Ws] = !1, this._dirty = !0, this.effect = new Tn(t, () => {
      this._dirty || (this._dirty = !0, oi(this));
    }), this.effect.computed = this, this.effect.active = this._cacheable = !r, this.__v_isReadonly = s;
  }
  get value() {
    const t = S(this);
    return ii(t), (t._dirty || !t._cacheable) && (t._dirty = !1, t._value = t.effect.run()), t._value;
  }
  set value(t) {
    this._setter(t);
  }
}
Ws = "__v_isReadonly";
function ui(e, t, n = !1) {
  let s, r;
  const i = I(e);
  return i ? (s = e, r = fe) : (s = e.get, r = e.set), new fi(s, r, i || !r, n);
}
function Te(e, t, n, s) {
  let r;
  try {
    r = s ? e(...s) : e();
  } catch (i) {
    Dt(i, t, n);
  }
  return r;
}
function ue(e, t, n, s) {
  if (I(e)) {
    const i = Te(e, t, n, s);
    return i && Ps(i) && i.catch((o) => {
      Dt(o, t, n);
    }), i;
  }
  const r = [];
  for (let i = 0; i < e.length; i++)
    r.push(ue(e[i], t, n, s));
  return r;
}
function Dt(e, t, n, s = !0) {
  const r = t ? t.vnode : null;
  if (t) {
    let i = t.parent;
    const o = t.proxy, c = n;
    for (; i; ) {
      const d = i.ec;
      if (d) {
        for (let m = 0; m < d.length; m++)
          if (d[m](e, o, c) === !1)
            return;
      }
      i = i.parent;
    }
    const u = t.appContext.config.errorHandler;
    if (u) {
      Te(u, null, 10, [e, o, c]);
      return;
    }
  }
  ai(e, n, r, s);
}
function ai(e, t, n, s = !0) {
  console.error(e);
}
let lt = !1, dn = !1;
const Y = [];
let ge = 0;
const Xe = [];
let _e = null, Ue = 0;
const Vs = /* @__PURE__ */ Promise.resolve();
let Sn = null;
function qs(e) {
  const t = Sn || Vs;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function di(e) {
  let t = ge + 1, n = Y.length;
  for (; t < n; ) {
    const s = t + n >>> 1;
    ct(Y[s]) < e ? t = s + 1 : n = s;
  }
  return t;
}
function Hn(e) {
  (!Y.length || !Y.includes(e, lt && e.allowRecurse ? ge + 1 : ge)) && (e.id == null ? Y.push(e) : Y.splice(di(e.id), 0, e), Js());
}
function Js() {
  !lt && !dn && (dn = !0, Sn = Vs.then(Xs));
}
function hi(e) {
  const t = Y.indexOf(e);
  t > ge && Y.splice(t, 1);
}
function pi(e) {
  T(e) ? Xe.push(...e) : (!_e || !_e.includes(e, e.allowRecurse ? Ue + 1 : Ue)) && Xe.push(e), Js();
}
function ns(e, t = lt ? ge + 1 : 0) {
  for (; t < Y.length; t++) {
    const n = Y[t];
    n && n.pre && (Y.splice(t, 1), t--, n());
  }
}
function Ys(e) {
  if (Xe.length) {
    const t = [...new Set(Xe)];
    if (Xe.length = 0, _e) {
      _e.push(...t);
      return;
    }
    for (_e = t, _e.sort((n, s) => ct(n) - ct(s)), Ue = 0; Ue < _e.length; Ue++)
      _e[Ue]();
    _e = null, Ue = 0;
  }
}
const ct = (e) => e.id == null ? 1 / 0 : e.id, gi = (e, t) => {
  const n = ct(e) - ct(t);
  if (n === 0) {
    if (e.pre && !t.pre)
      return -1;
    if (t.pre && !e.pre)
      return 1;
  }
  return n;
};
function Xs(e) {
  dn = !1, lt = !0, Y.sort(gi);
  const t = fe;
  try {
    for (ge = 0; ge < Y.length; ge++) {
      const n = Y[ge];
      n && n.active !== !1 && Te(
        n,
        null,
        14
        /* ErrorCodes.SCHEDULER */
      );
    }
  } finally {
    ge = 0, Y.length = 0, Ys(), lt = !1, Sn = null, (Y.length || Xe.length) && Xs();
  }
}
function mi(e, t, ...n) {
  if (e.isUnmounted)
    return;
  const s = e.vnode.props || B;
  let r = n;
  const i = t.startsWith("update:"), o = i && t.slice(7);
  if (o && o in s) {
    const m = `${o === "modelValue" ? "model" : o}Modifiers`, { number: w, trim: C } = s[m] || B;
    C && (r = n.map((A) => q(A) ? A.trim() : A)), w && (r = n.map(on));
  }
  let c, u = s[c = kt(t)] || // also try camelCase event handler (#2249)
  s[c = kt(xe(t))];
  !u && i && (u = s[c = kt(ie(t))]), u && ue(u, e, 6, r);
  const d = s[c + "Once"];
  if (d) {
    if (!e.emitted)
      e.emitted = {};
    else if (e.emitted[c])
      return;
    e.emitted[c] = !0, ue(d, e, 6, r);
  }
}
function Zs(e, t, n = !1) {
  const s = t.emitsCache, r = s.get(e);
  if (r !== void 0)
    return r;
  const i = e.emits;
  let o = {}, c = !1;
  if (!I(e)) {
    const u = (d) => {
      const m = Zs(d, t, !0);
      m && (c = !0, X(o, m));
    };
    !n && t.mixins.length && t.mixins.forEach(u), e.extends && u(e.extends), e.mixins && e.mixins.forEach(u);
  }
  return !i && !c ? (z(e) && s.set(e, null), null) : (T(i) ? i.forEach((u) => o[u] = null) : X(o, i), z(e) && s.set(e, o), o);
}
function Kt(e, t) {
  return !e || !Ht(t) ? !1 : (t = t.slice(2).replace(/Once$/, ""), N(e, t[0].toLowerCase() + t.slice(1)) || N(e, ie(t)) || N(e, t));
}
let le = null, Lt = null;
function jt(e) {
  const t = le;
  return le = e, Lt = e && e.type.__scopeId || null, t;
}
function _i(e) {
  Lt = e;
}
function bi() {
  Lt = null;
}
function xi(e, t = le, n) {
  if (!t || e._n)
    return e;
  const s = (...r) => {
    s._d && us(-1);
    const i = jt(t);
    let o;
    try {
      o = e(...r);
    } finally {
      jt(i), s._d && us(1);
    }
    return o;
  };
  return s._n = !0, s._c = !0, s._d = !0, s;
}
function Gt(e) {
  const { type: t, vnode: n, proxy: s, withProxy: r, props: i, propsOptions: [o], slots: c, attrs: u, emit: d, render: m, renderCache: w, data: C, setupState: A, ctx: D, inheritAttrs: R } = e;
  let Z, K;
  const Ee = jt(e);
  try {
    if (n.shapeFlag & 4) {
      const J = r || s;
      Z = pe(m.call(J, J, w, i, A, C, D)), K = u;
    } else {
      const J = t;
      Z = pe(J.length > 1 ? J(i, { attrs: u, slots: c, emit: d }) : J(
        i,
        null
        /* we know it doesn't need it */
      )), K = t.props ? u : yi(u);
    }
  } catch (J) {
    it.length = 0, Dt(
      J,
      e,
      1
      /* ErrorCodes.RENDER_FUNCTION */
    ), Z = Ie(ft);
  }
  let F = Z;
  if (K && R !== !1) {
    const J = Object.keys(K), { shapeFlag: Ce } = F;
    J.length && Ce & 7 && (o && J.some(En) && (K = wi(K, o)), F = Ze(F, K));
  }
  return n.dirs && (F = Ze(F), F.dirs = F.dirs ? F.dirs.concat(n.dirs) : n.dirs), n.transition && (F.transition = n.transition), Z = F, jt(Ee), Z;
}
const yi = (e) => {
  let t;
  for (const n in e)
    (n === "class" || n === "style" || Ht(n)) && ((t || (t = {}))[n] = e[n]);
  return t;
}, wi = (e, t) => {
  const n = {};
  for (const s in e)
    (!En(s) || !(s.slice(9) in t)) && (n[s] = e[s]);
  return n;
};
function Ei(e, t, n) {
  const { props: s, children: r, component: i } = e, { props: o, children: c, patchFlag: u } = t, d = i.emitsOptions;
  if (t.dirs || t.transition)
    return !0;
  if (n && u >= 0) {
    if (u & 1024)
      return !0;
    if (u & 16)
      return s ? ss(s, o, d) : !!o;
    if (u & 8) {
      const m = t.dynamicProps;
      for (let w = 0; w < m.length; w++) {
        const C = m[w];
        if (o[C] !== s[C] && !Kt(d, C))
          return !0;
      }
    }
  } else
    return (r || c) && (!c || !c.$stable) ? !0 : s === o ? !1 : s ? o ? ss(s, o, d) : !0 : !!o;
  return !1;
}
function ss(e, t, n) {
  const s = Object.keys(t);
  if (s.length !== Object.keys(e).length)
    return !0;
  for (let r = 0; r < s.length; r++) {
    const i = s[r];
    if (t[i] !== e[i] && !Kt(n, i))
      return !0;
  }
  return !1;
}
function Ci({ vnode: e, parent: t }, n) {
  for (; t && t.subTree === e; )
    (e = t.vnode).el = n, t = t.parent;
}
const vi = (e) => e.__isSuspense;
function Oi(e, t) {
  t && t.pendingBranch ? T(e) ? t.effects.push(...e) : t.effects.push(e) : pi(e);
}
function Pi(e, t) {
  if (V) {
    let n = V.provides;
    const s = V.parent && V.parent.provides;
    s === n && (n = V.provides = Object.create(s)), n[e] = t;
  }
}
function At(e, t, n = !1) {
  const s = V || le;
  if (s) {
    const r = s.parent == null ? s.vnode.appContext && s.vnode.appContext.provides : s.parent.provides;
    if (r && e in r)
      return r[e];
    if (arguments.length > 1)
      return n && I(t) ? t.call(s.proxy) : t;
  }
}
const vt = {};
function en(e, t, n) {
  return Qs(e, t, n);
}
function Qs(e, t, { immediate: n, deep: s, flush: r, onTrack: i, onTrigger: o } = B) {
  const c = Fr() === V?.scope ? V : null;
  let u, d = !1, m = !1;
  if (G(e) ? (u = () => e.value, d = an(e)) : Ye(e) ? (u = () => e, s = !0) : T(e) ? (m = !0, d = e.some((F) => Ye(F) || an(F)), u = () => e.map((F) => {
    if (G(F))
      return F.value;
    if (Ye(F))
      return Be(F);
    if (I(F))
      return Te(
        F,
        c,
        2
        /* ErrorCodes.WATCH_GETTER */
      );
  })) : I(e) ? t ? u = () => Te(
    e,
    c,
    2
    /* ErrorCodes.WATCH_GETTER */
  ) : u = () => {
    if (!(c && c.isUnmounted))
      return w && w(), ue(e, c, 3, [C]);
  } : u = fe, t && s) {
    const F = u;
    u = () => Be(F());
  }
  let w, C = (F) => {
    w = K.onStop = () => {
      Te(
        F,
        c,
        4
        /* ErrorCodes.WATCH_CLEANUP */
      );
    };
  }, A;
  if (at)
    if (C = fe, t ? n && ue(t, c, 3, [
      u(),
      m ? [] : void 0,
      C
    ]) : u(), r === "sync") {
      const F = Co();
      A = F.__watcherHandles || (F.__watcherHandles = []);
    } else
      return fe;
  let D = m ? new Array(e.length).fill(vt) : vt;
  const R = () => {
    if (K.active)
      if (t) {
        const F = K.run();
        (s || d || (m ? F.some((J, Ce) => Rt(J, D[Ce])) : Rt(F, D))) && (w && w(), ue(t, c, 3, [
          F,
          // pass undefined as the old value when it's changed for the first time
          D === vt ? void 0 : m && D[0] === vt ? [] : D,
          C
        ]), D = F);
      } else
        K.run();
  };
  R.allowRecurse = !!t;
  let Z;
  r === "sync" ? Z = R : r === "post" ? Z = () => ee(R, c && c.suspense) : (R.pre = !0, c && (R.id = c.uid), Z = () => Hn(R));
  const K = new Tn(u, Z);
  t ? n ? R() : D = K.run() : r === "post" ? ee(K.run.bind(K), c && c.suspense) : K.run();
  const Ee = () => {
    K.stop(), c && c.scope && Cn(c.scope.effects, K);
  };
  return A && A.push(Ee), Ee;
}
function Ti(e, t, n) {
  const s = this.proxy, r = q(e) ? e.includes(".") ? ks(s, e) : () => s[e] : e.bind(s, s);
  let i;
  I(t) ? i = t : (i = t.handler, n = t);
  const o = V;
  Qe(this);
  const c = Qs(r, i.bind(s), n);
  return o ? Qe(o) : Ke(), c;
}
function ks(e, t) {
  const n = t.split(".");
  return () => {
    let s = e;
    for (let r = 0; r < n.length && s; r++)
      s = s[n[r]];
    return s;
  };
}
function Be(e, t) {
  if (!z(e) || e.__v_skip || (t = t || /* @__PURE__ */ new Set(), t.has(e)))
    return e;
  if (t.add(e), G(e))
    Be(e.value, t);
  else if (T(e))
    for (let n = 0; n < e.length; n++)
      Be(e[n], t);
  else if (Os(e) || Je(e))
    e.forEach((n) => {
      Be(n, t);
    });
  else if (Is(e))
    for (const n in e)
      Be(e[n], t);
  return e;
}
function Gs(e) {
  return I(e) ? { setup: e, name: e.name } : e;
}
const Mt = (e) => !!e.type.__asyncLoader, er = (e) => e.type.__isKeepAlive;
function Ii(e, t) {
  tr(e, "a", t);
}
function Ai(e, t) {
  tr(e, "da", t);
}
function tr(e, t, n = V) {
  const s = e.__wdc || (e.__wdc = () => {
    let r = n;
    for (; r; ) {
      if (r.isDeactivated)
        return;
      r = r.parent;
    }
    return e();
  });
  if (zt(t, s, n), n) {
    let r = n.parent;
    for (; r && r.parent; )
      er(r.parent.vnode) && Mi(s, t, n, r), r = r.parent;
  }
}
function Mi(e, t, n, s) {
  const r = zt(
    t,
    e,
    s,
    !0
    /* prepend */
  );
  nr(() => {
    Cn(s[t], r);
  }, n);
}
function zt(e, t, n = V, s = !1) {
  if (n) {
    const r = n[e] || (n[e] = []), i = t.__weh || (t.__weh = (...o) => {
      if (n.isUnmounted)
        return;
      ke(), Qe(n);
      const c = ue(t, n, e, o);
      return Ke(), Ge(), c;
    });
    return s ? r.unshift(i) : r.push(i), i;
  }
}
const we = (e) => (t, n = V) => (
  // post-create lifecycle registrations are noops during SSR (except for serverPrefetch)
  (!at || e === "sp") && zt(e, (...s) => t(...s), n)
), Fi = we(
  "bm"
  /* LifecycleHooks.BEFORE_MOUNT */
), Ri = we(
  "m"
  /* LifecycleHooks.MOUNTED */
), Ni = we(
  "bu"
  /* LifecycleHooks.BEFORE_UPDATE */
), ji = we(
  "u"
  /* LifecycleHooks.UPDATED */
), Si = we(
  "bum"
  /* LifecycleHooks.BEFORE_UNMOUNT */
), nr = we(
  "um"
  /* LifecycleHooks.UNMOUNTED */
), Hi = we(
  "sp"
  /* LifecycleHooks.SERVER_PREFETCH */
), Ui = we(
  "rtg"
  /* LifecycleHooks.RENDER_TRIGGERED */
), $i = we(
  "rtc"
  /* LifecycleHooks.RENDER_TRACKED */
);
function Bi(e, t = V) {
  zt("ec", e, t);
}
function Ot(e, t) {
  const n = le;
  if (n === null)
    return e;
  const s = qt(n) || n.proxy, r = e.dirs || (e.dirs = []);
  for (let i = 0; i < t.length; i++) {
    let [o, c, u, d = B] = t[i];
    o && (I(o) && (o = {
      mounted: o,
      updated: o
    }), o.deep && Be(c), r.push({
      dir: o,
      instance: s,
      value: c,
      oldValue: void 0,
      arg: u,
      modifiers: d
    }));
  }
  return e;
}
function je(e, t, n, s) {
  const r = e.dirs, i = t && t.dirs;
  for (let o = 0; o < r.length; o++) {
    const c = r[o];
    i && (c.oldValue = i[o].value);
    let u = c.dir[s];
    u && (ke(), ue(u, n, 8, [
      e.el,
      c,
      e,
      t
    ]), Ge());
  }
}
const Di = Symbol(), hn = (e) => e ? dr(e) ? qt(e) || e.proxy : hn(e.parent) : null, rt = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ X(/* @__PURE__ */ Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => hn(e.parent),
    $root: (e) => hn(e.root),
    $emit: (e) => e.emit,
    $options: (e) => Un(e),
    $forceUpdate: (e) => e.f || (e.f = () => Hn(e.update)),
    $nextTick: (e) => e.n || (e.n = qs.bind(e.proxy)),
    $watch: (e) => Ti.bind(e)
  })
), tn = (e, t) => e !== B && !e.__isScriptSetup && N(e, t), Ki = {
  get({ _: e }, t) {
    const { ctx: n, setupState: s, data: r, props: i, accessCache: o, type: c, appContext: u } = e;
    let d;
    if (t[0] !== "$") {
      const A = o[t];
      if (A !== void 0)
        switch (A) {
          case 1:
            return s[t];
          case 2:
            return r[t];
          case 4:
            return n[t];
          case 3:
            return i[t];
        }
      else {
        if (tn(s, t))
          return o[t] = 1, s[t];
        if (r !== B && N(r, t))
          return o[t] = 2, r[t];
        if (
          // only cache other properties when instance has declared (thus stable)
          // props
          (d = e.propsOptions[0]) && N(d, t)
        )
          return o[t] = 3, i[t];
        if (n !== B && N(n, t))
          return o[t] = 4, n[t];
        pn && (o[t] = 0);
      }
    }
    const m = rt[t];
    let w, C;
    if (m)
      return t === "$attrs" && te(e, "get", t), m(e);
    if (
      // css module (injected by vue-loader)
      (w = c.__cssModules) && (w = w[t])
    )
      return w;
    if (n !== B && N(n, t))
      return o[t] = 4, n[t];
    if (
      // global properties
      C = u.config.globalProperties, N(C, t)
    )
      return C[t];
  },
  set({ _: e }, t, n) {
    const { data: s, setupState: r, ctx: i } = e;
    return tn(r, t) ? (r[t] = n, !0) : s !== B && N(s, t) ? (s[t] = n, !0) : N(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (i[t] = n, !0);
  },
  has({ _: { data: e, setupState: t, accessCache: n, ctx: s, appContext: r, propsOptions: i } }, o) {
    let c;
    return !!n[o] || e !== B && N(e, o) || tn(t, o) || (c = i[0]) && N(c, o) || N(s, o) || N(rt, o) || N(r.config.globalProperties, o);
  },
  defineProperty(e, t, n) {
    return n.get != null ? e._.accessCache[t] = 0 : N(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n);
  }
};
let pn = !0;
function Li(e) {
  const t = Un(e), n = e.proxy, s = e.ctx;
  pn = !1, t.beforeCreate && rs(
    t.beforeCreate,
    e,
    "bc"
    /* LifecycleHooks.BEFORE_CREATE */
  );
  const {
    // state
    data: r,
    computed: i,
    methods: o,
    watch: c,
    provide: u,
    inject: d,
    // lifecycle
    created: m,
    beforeMount: w,
    mounted: C,
    beforeUpdate: A,
    updated: D,
    activated: R,
    deactivated: Z,
    beforeDestroy: K,
    beforeUnmount: Ee,
    destroyed: F,
    unmounted: J,
    render: Ce,
    renderTracked: Jt,
    renderTriggered: ht,
    errorCaptured: Me,
    serverPrefetch: Yt,
    // public API
    expose: Fe,
    inheritAttrs: et,
    // assets
    components: pt,
    directives: gt,
    filters: Xt
  } = t;
  if (d && zi(d, s, null, e.appContext.config.unwrapInjectedRef), o)
    for (const L in o) {
      const U = o[L];
      I(U) && (s[L] = U.bind(n));
    }
  if (r) {
    const L = r.call(n, n);
    z(L) && (e.data = Fn(L));
  }
  if (pn = !0, i)
    for (const L in i) {
      const U = i[L], Re = I(U) ? U.bind(n, n) : I(U.get) ? U.get.bind(n, n) : fe, mt = !I(U) && I(U.set) ? U.set.bind(n) : fe, Ne = wo({
        get: Re,
        set: mt
      });
      Object.defineProperty(s, L, {
        enumerable: !0,
        configurable: !0,
        get: () => Ne.value,
        set: (ae) => Ne.value = ae
      });
    }
  if (c)
    for (const L in c)
      sr(c[L], s, n, L);
  if (u) {
    const L = I(u) ? u.call(n) : u;
    Reflect.ownKeys(L).forEach((U) => {
      Pi(U, L[U]);
    });
  }
  m && rs(
    m,
    e,
    "c"
    /* LifecycleHooks.CREATED */
  );
  function Q(L, U) {
    T(U) ? U.forEach((Re) => L(Re.bind(n))) : U && L(U.bind(n));
  }
  if (Q(Fi, w), Q(Ri, C), Q(Ni, A), Q(ji, D), Q(Ii, R), Q(Ai, Z), Q(Bi, Me), Q($i, Jt), Q(Ui, ht), Q(Si, Ee), Q(nr, J), Q(Hi, Yt), T(Fe))
    if (Fe.length) {
      const L = e.exposed || (e.exposed = {});
      Fe.forEach((U) => {
        Object.defineProperty(L, U, {
          get: () => n[U],
          set: (Re) => n[U] = Re
        });
      });
    } else
      e.exposed || (e.exposed = {});
  Ce && e.render === fe && (e.render = Ce), et != null && (e.inheritAttrs = et), pt && (e.components = pt), gt && (e.directives = gt);
}
function zi(e, t, n = fe, s = !1) {
  T(e) && (e = gn(e));
  for (const r in e) {
    const i = e[r];
    let o;
    z(i) ? "default" in i ? o = At(
      i.from || r,
      i.default,
      !0
      /* treat default function as factory */
    ) : o = At(i.from || r) : o = At(i), G(o) && s ? Object.defineProperty(t, r, {
      enumerable: !0,
      configurable: !0,
      get: () => o.value,
      set: (c) => o.value = c
    }) : t[r] = o;
  }
}
function rs(e, t, n) {
  ue(T(e) ? e.map((s) => s.bind(t.proxy)) : e.bind(t.proxy), t, n);
}
function sr(e, t, n, s) {
  const r = s.includes(".") ? ks(n, s) : () => n[s];
  if (q(e)) {
    const i = t[e];
    I(i) && en(r, i);
  } else if (I(e))
    en(r, e.bind(n));
  else if (z(e))
    if (T(e))
      e.forEach((i) => sr(i, t, n, s));
    else {
      const i = I(e.handler) ? e.handler.bind(n) : t[e.handler];
      I(i) && en(r, i, e);
    }
}
function Un(e) {
  const t = e.type, { mixins: n, extends: s } = t, { mixins: r, optionsCache: i, config: { optionMergeStrategies: o } } = e.appContext, c = i.get(t);
  let u;
  return c ? u = c : !r.length && !n && !s ? u = t : (u = {}, r.length && r.forEach((d) => St(u, d, o, !0)), St(u, t, o)), z(t) && i.set(t, u), u;
}
function St(e, t, n, s = !1) {
  const { mixins: r, extends: i } = t;
  i && St(e, i, n, !0), r && r.forEach((o) => St(e, o, n, !0));
  for (const o in t)
    if (!(s && o === "expose")) {
      const c = Wi[o] || n && n[o];
      e[o] = c ? c(e[o], t[o]) : t[o];
    }
  return e;
}
const Wi = {
  data: is,
  props: He,
  emits: He,
  // objects
  methods: He,
  computed: He,
  // lifecycle
  beforeCreate: k,
  created: k,
  beforeMount: k,
  mounted: k,
  beforeUpdate: k,
  updated: k,
  beforeDestroy: k,
  beforeUnmount: k,
  destroyed: k,
  unmounted: k,
  activated: k,
  deactivated: k,
  errorCaptured: k,
  serverPrefetch: k,
  // assets
  components: He,
  directives: He,
  // watch
  watch: qi,
  // provide / inject
  provide: is,
  inject: Vi
};
function is(e, t) {
  return t ? e ? function() {
    return X(I(e) ? e.call(this, this) : e, I(t) ? t.call(this, this) : t);
  } : t : e;
}
function Vi(e, t) {
  return He(gn(e), gn(t));
}
function gn(e) {
  if (T(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++)
      t[e[n]] = e[n];
    return t;
  }
  return e;
}
function k(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function He(e, t) {
  return e ? X(X(/* @__PURE__ */ Object.create(null), e), t) : t;
}
function qi(e, t) {
  if (!e)
    return t;
  if (!t)
    return e;
  const n = X(/* @__PURE__ */ Object.create(null), e);
  for (const s in t)
    n[s] = k(e[s], t[s]);
  return n;
}
function Ji(e, t, n, s = !1) {
  const r = {}, i = {};
  Nt(i, Vt, 1), e.propsDefaults = /* @__PURE__ */ Object.create(null), rr(e, t, r, i);
  for (const o in e.propsOptions[0])
    o in r || (r[o] = void 0);
  n ? e.props = s ? r : ri(r) : e.type.props ? e.props = r : e.props = i, e.attrs = i;
}
function Yi(e, t, n, s) {
  const { props: r, attrs: i, vnode: { patchFlag: o } } = e, c = S(r), [u] = e.propsOptions;
  let d = !1;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    (s || o > 0) && !(o & 16)
  ) {
    if (o & 8) {
      const m = e.vnode.dynamicProps;
      for (let w = 0; w < m.length; w++) {
        let C = m[w];
        if (Kt(e.emitsOptions, C))
          continue;
        const A = t[C];
        if (u)
          if (N(i, C))
            A !== i[C] && (i[C] = A, d = !0);
          else {
            const D = xe(C);
            r[D] = mn(
              u,
              c,
              D,
              A,
              e,
              !1
              /* isAbsent */
            );
          }
        else
          A !== i[C] && (i[C] = A, d = !0);
      }
    }
  } else {
    rr(e, t, r, i) && (d = !0);
    let m;
    for (const w in c)
      (!t || // for camelCase
      !N(t, w) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((m = ie(w)) === w || !N(t, m))) && (u ? n && // for camelCase
      (n[w] !== void 0 || // for kebab-case
      n[m] !== void 0) && (r[w] = mn(
        u,
        c,
        w,
        void 0,
        e,
        !0
        /* isAbsent */
      )) : delete r[w]);
    if (i !== c)
      for (const w in i)
        (!t || !N(t, w)) && (delete i[w], d = !0);
  }
  d && ye(e, "set", "$attrs");
}
function rr(e, t, n, s) {
  const [r, i] = e.propsOptions;
  let o = !1, c;
  if (t)
    for (let u in t) {
      if (Tt(u))
        continue;
      const d = t[u];
      let m;
      r && N(r, m = xe(u)) ? !i || !i.includes(m) ? n[m] = d : (c || (c = {}))[m] = d : Kt(e.emitsOptions, u) || (!(u in s) || d !== s[u]) && (s[u] = d, o = !0);
    }
  if (i) {
    const u = S(n), d = c || B;
    for (let m = 0; m < i.length; m++) {
      const w = i[m];
      n[w] = mn(r, u, w, d[w], e, !N(d, w));
    }
  }
  return o;
}
function mn(e, t, n, s, r, i) {
  const o = e[n];
  if (o != null) {
    const c = N(o, "default");
    if (c && s === void 0) {
      const u = o.default;
      if (o.type !== Function && I(u)) {
        const { propsDefaults: d } = r;
        n in d ? s = d[n] : (Qe(r), s = d[n] = u.call(null, t), Ke());
      } else
        s = u;
    }
    o[
      0
      /* BooleanFlags.shouldCast */
    ] && (i && !c ? s = !1 : o[
      1
      /* BooleanFlags.shouldCastTrue */
    ] && (s === "" || s === ie(n)) && (s = !0));
  }
  return s;
}
function ir(e, t, n = !1) {
  const s = t.propsCache, r = s.get(e);
  if (r)
    return r;
  const i = e.props, o = {}, c = [];
  let u = !1;
  if (!I(e)) {
    const m = (w) => {
      u = !0;
      const [C, A] = ir(w, t, !0);
      X(o, C), A && c.push(...A);
    };
    !n && t.mixins.length && t.mixins.forEach(m), e.extends && m(e.extends), e.mixins && e.mixins.forEach(m);
  }
  if (!i && !u)
    return z(e) && s.set(e, qe), qe;
  if (T(i))
    for (let m = 0; m < i.length; m++) {
      const w = xe(i[m]);
      os(w) && (o[w] = B);
    }
  else if (i)
    for (const m in i) {
      const w = xe(m);
      if (os(w)) {
        const C = i[m], A = o[w] = T(C) || I(C) ? { type: C } : Object.assign({}, C);
        if (A) {
          const D = fs(Boolean, A.type), R = fs(String, A.type);
          A[
            0
            /* BooleanFlags.shouldCast */
          ] = D > -1, A[
            1
            /* BooleanFlags.shouldCastTrue */
          ] = R < 0 || D < R, (D > -1 || N(A, "default")) && c.push(w);
        }
      }
    }
  const d = [o, c];
  return z(e) && s.set(e, d), d;
}
function os(e) {
  return e[0] !== "$";
}
function ls(e) {
  const t = e && e.toString().match(/^\s*(function|class) (\w+)/);
  return t ? t[2] : e === null ? "null" : "";
}
function cs(e, t) {
  return ls(e) === ls(t);
}
function fs(e, t) {
  return T(t) ? t.findIndex((n) => cs(n, e)) : I(t) && cs(t, e) ? 0 : -1;
}
const or = (e) => e[0] === "_" || e === "$stable", $n = (e) => T(e) ? e.map(pe) : [pe(e)], Xi = (e, t, n) => {
  if (t._n)
    return t;
  const s = xi((...r) => $n(t(...r)), n);
  return s._c = !1, s;
}, lr = (e, t, n) => {
  const s = e._ctx;
  for (const r in e) {
    if (or(r))
      continue;
    const i = e[r];
    if (I(i))
      t[r] = Xi(r, i, s);
    else if (i != null) {
      const o = $n(i);
      t[r] = () => o;
    }
  }
}, cr = (e, t) => {
  const n = $n(t);
  e.slots.default = () => n;
}, Zi = (e, t) => {
  if (e.vnode.shapeFlag & 32) {
    const n = t._;
    n ? (e.slots = S(t), Nt(t, "_", n)) : lr(t, e.slots = {});
  } else
    e.slots = {}, t && cr(e, t);
  Nt(e.slots, Vt, 1);
}, Qi = (e, t, n) => {
  const { vnode: s, slots: r } = e;
  let i = !0, o = B;
  if (s.shapeFlag & 32) {
    const c = t._;
    c ? n && c === 1 ? i = !1 : (X(r, t), !n && c === 1 && delete r._) : (i = !t.$stable, lr(t, r)), o = t;
  } else
    t && (cr(e, t), o = { default: 1 });
  if (i)
    for (const c in r)
      !or(c) && !(c in o) && delete r[c];
};
function fr() {
  return {
    app: null,
    config: {
      isNativeTag: Er,
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
let ki = 0;
function Gi(e, t) {
  return function(s, r = null) {
    I(s) || (s = Object.assign({}, s)), r != null && !z(r) && (r = null);
    const i = fr(), o = /* @__PURE__ */ new Set();
    let c = !1;
    const u = i.app = {
      _uid: ki++,
      _component: s,
      _props: r,
      _container: null,
      _context: i,
      _instance: null,
      version: vo,
      get config() {
        return i.config;
      },
      set config(d) {
      },
      use(d, ...m) {
        return o.has(d) || (d && I(d.install) ? (o.add(d), d.install(u, ...m)) : I(d) && (o.add(d), d(u, ...m))), u;
      },
      mixin(d) {
        return i.mixins.includes(d) || i.mixins.push(d), u;
      },
      component(d, m) {
        return m ? (i.components[d] = m, u) : i.components[d];
      },
      directive(d, m) {
        return m ? (i.directives[d] = m, u) : i.directives[d];
      },
      mount(d, m, w) {
        if (!c) {
          const C = Ie(s, r);
          return C.appContext = i, m && t ? t(C, d) : e(C, d, w), c = !0, u._container = d, d.__vue_app__ = u, qt(C.component) || C.component.proxy;
        }
      },
      unmount() {
        c && (e(null, u._container), delete u._container.__vue_app__);
      },
      provide(d, m) {
        return i.provides[d] = m, u;
      }
    };
    return u;
  };
}
function _n(e, t, n, s, r = !1) {
  if (T(e)) {
    e.forEach((C, A) => _n(C, t && (T(t) ? t[A] : t), n, s, r));
    return;
  }
  if (Mt(s) && !r)
    return;
  const i = s.shapeFlag & 4 ? qt(s.component) || s.component.proxy : s.el, o = r ? null : i, { i: c, r: u } = e, d = t && t.r, m = c.refs === B ? c.refs = {} : c.refs, w = c.setupState;
  if (d != null && d !== u && (q(d) ? (m[d] = null, N(w, d) && (w[d] = null)) : G(d) && (d.value = null)), I(u))
    Te(u, c, 12, [o, m]);
  else {
    const C = q(u), A = G(u);
    if (C || A) {
      const D = () => {
        if (e.f) {
          const R = C ? N(w, u) ? w[u] : m[u] : u.value;
          r ? T(R) && Cn(R, i) : T(R) ? R.includes(i) || R.push(i) : C ? (m[u] = [i], N(w, u) && (w[u] = m[u])) : (u.value = [i], e.k && (m[e.k] = u.value));
        } else
          C ? (m[u] = o, N(w, u) && (w[u] = o)) : A && (u.value = o, e.k && (m[e.k] = o));
      };
      o ? (D.id = -1, ee(D, n)) : D();
    }
  }
}
const ee = Oi;
function eo(e) {
  return to(e);
}
function to(e, t) {
  const n = Ir();
  n.__VUE__ = !0;
  const { insert: s, remove: r, patchProp: i, createElement: o, createText: c, createComment: u, setText: d, setElementText: m, parentNode: w, nextSibling: C, setScopeId: A = fe, insertStaticContent: D } = e, R = (l, f, a, p = null, h = null, b = null, y = !1, _ = null, x = !!f.dynamicChildren) => {
    if (l === f)
      return;
    l && !nt(l, f) && (p = _t(l), ae(l, h, b, !0), l = null), f.patchFlag === -2 && (x = !1, f.dynamicChildren = null);
    const { type: g, ref: v, shapeFlag: E } = f;
    switch (g) {
      case Wt:
        Z(l, f, a, p);
        break;
      case ft:
        K(l, f, a, p);
        break;
      case nn:
        l == null && Ee(f, a, p, y);
        break;
      case be:
        pt(l, f, a, p, h, b, y, _, x);
        break;
      default:
        E & 1 ? Ce(l, f, a, p, h, b, y, _, x) : E & 6 ? gt(l, f, a, p, h, b, y, _, x) : (E & 64 || E & 128) && g.process(l, f, a, p, h, b, y, _, x, ze);
    }
    v != null && h && _n(v, l && l.ref, b, f || l, !f);
  }, Z = (l, f, a, p) => {
    if (l == null)
      s(f.el = c(f.children), a, p);
    else {
      const h = f.el = l.el;
      f.children !== l.children && d(h, f.children);
    }
  }, K = (l, f, a, p) => {
    l == null ? s(f.el = u(f.children || ""), a, p) : f.el = l.el;
  }, Ee = (l, f, a, p) => {
    [l.el, l.anchor] = D(l.children, f, a, p, l.el, l.anchor);
  }, F = ({ el: l, anchor: f }, a, p) => {
    let h;
    for (; l && l !== f; )
      h = C(l), s(l, a, p), l = h;
    s(f, a, p);
  }, J = ({ el: l, anchor: f }) => {
    let a;
    for (; l && l !== f; )
      a = C(l), r(l), l = a;
    r(f);
  }, Ce = (l, f, a, p, h, b, y, _, x) => {
    y = y || f.type === "svg", l == null ? Jt(f, a, p, h, b, y, _, x) : Yt(l, f, h, b, y, _, x);
  }, Jt = (l, f, a, p, h, b, y, _) => {
    let x, g;
    const { type: v, props: E, shapeFlag: O, transition: P, dirs: M } = l;
    if (x = l.el = o(l.type, b, E && E.is, E), O & 8 ? m(x, l.children) : O & 16 && Me(l.children, x, null, p, h, b && v !== "foreignObject", y, _), M && je(l, null, p, "created"), ht(x, l, l.scopeId, y, p), E) {
      for (const H in E)
        H !== "value" && !Tt(H) && i(x, H, null, E[H], b, l.children, p, h, me);
      "value" in E && i(x, "value", null, E.value), (g = E.onVnodeBeforeMount) && he(g, p, l);
    }
    M && je(l, null, p, "beforeMount");
    const $ = (!h || h && !h.pendingBranch) && P && !P.persisted;
    $ && P.beforeEnter(x), s(x, f, a), ((g = E && E.onVnodeMounted) || $ || M) && ee(() => {
      g && he(g, p, l), $ && P.enter(x), M && je(l, null, p, "mounted");
    }, h);
  }, ht = (l, f, a, p, h) => {
    if (a && A(l, a), p)
      for (let b = 0; b < p.length; b++)
        A(l, p[b]);
    if (h) {
      let b = h.subTree;
      if (f === b) {
        const y = h.vnode;
        ht(l, y, y.scopeId, y.slotScopeIds, h.parent);
      }
    }
  }, Me = (l, f, a, p, h, b, y, _, x = 0) => {
    for (let g = x; g < l.length; g++) {
      const v = l[g] = _ ? Oe(l[g]) : pe(l[g]);
      R(null, v, f, a, p, h, b, y, _);
    }
  }, Yt = (l, f, a, p, h, b, y) => {
    const _ = f.el = l.el;
    let { patchFlag: x, dynamicChildren: g, dirs: v } = f;
    x |= l.patchFlag & 16;
    const E = l.props || B, O = f.props || B;
    let P;
    a && Se(a, !1), (P = O.onVnodeBeforeUpdate) && he(P, a, f, l), v && je(f, l, a, "beforeUpdate"), a && Se(a, !0);
    const M = h && f.type !== "foreignObject";
    if (g ? Fe(l.dynamicChildren, g, _, a, p, M, b) : y || U(l, f, _, null, a, p, M, b, !1), x > 0) {
      if (x & 16)
        et(_, f, E, O, a, p, h);
      else if (x & 2 && E.class !== O.class && i(_, "class", null, O.class, h), x & 4 && i(_, "style", E.style, O.style, h), x & 8) {
        const $ = f.dynamicProps;
        for (let H = 0; H < $.length; H++) {
          const W = $[H], se = E[W], We = O[W];
          (We !== se || W === "value") && i(_, W, se, We, h, l.children, a, p, me);
        }
      }
      x & 1 && l.children !== f.children && m(_, f.children);
    } else
      !y && g == null && et(_, f, E, O, a, p, h);
    ((P = O.onVnodeUpdated) || v) && ee(() => {
      P && he(P, a, f, l), v && je(f, l, a, "updated");
    }, p);
  }, Fe = (l, f, a, p, h, b, y) => {
    for (let _ = 0; _ < f.length; _++) {
      const x = l[_], g = f[_], v = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        x.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (x.type === be || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !nt(x, g) || // - In the case of a component, it could contain anything.
        x.shapeFlag & 70) ? w(x.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          a
        )
      );
      R(x, g, v, null, p, h, b, y, !0);
    }
  }, et = (l, f, a, p, h, b, y) => {
    if (a !== p) {
      if (a !== B)
        for (const _ in a)
          !Tt(_) && !(_ in p) && i(l, _, a[_], null, y, f.children, h, b, me);
      for (const _ in p) {
        if (Tt(_))
          continue;
        const x = p[_], g = a[_];
        x !== g && _ !== "value" && i(l, _, g, x, y, f.children, h, b, me);
      }
      "value" in p && i(l, "value", a.value, p.value);
    }
  }, pt = (l, f, a, p, h, b, y, _, x) => {
    const g = f.el = l ? l.el : c(""), v = f.anchor = l ? l.anchor : c("");
    let { patchFlag: E, dynamicChildren: O, slotScopeIds: P } = f;
    P && (_ = _ ? _.concat(P) : P), l == null ? (s(g, a, p), s(v, a, p), Me(f.children, a, v, h, b, y, _, x)) : E > 0 && E & 64 && O && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    l.dynamicChildren ? (Fe(l.dynamicChildren, O, a, h, b, y, _), // #2080 if the stable fragment has a key, it's a <template v-for> that may
    //  get moved around. Make sure all root level vnodes inherit el.
    // #2134 or if it's a component root, it may also get moved around
    // as the component is being moved.
    (f.key != null || h && f === h.subTree) && ur(
      l,
      f,
      !0
      /* shallow */
    )) : U(l, f, a, v, h, b, y, _, x);
  }, gt = (l, f, a, p, h, b, y, _, x) => {
    f.slotScopeIds = _, l == null ? f.shapeFlag & 512 ? h.ctx.activate(f, a, p, y, x) : Xt(f, a, p, h, b, y, x) : Kn(l, f, x);
  }, Xt = (l, f, a, p, h, b, y) => {
    const _ = l.component = go(l, p, h);
    if (er(l) && (_.ctx.renderer = ze), mo(_), _.asyncDep) {
      if (h && h.registerDep(_, Q), !l.el) {
        const x = _.subTree = Ie(ft);
        K(null, x, f, a);
      }
      return;
    }
    Q(_, l, f, a, h, b, y);
  }, Kn = (l, f, a) => {
    const p = f.component = l.component;
    if (Ei(l, f, a))
      if (p.asyncDep && !p.asyncResolved) {
        L(p, f, a);
        return;
      } else
        p.next = f, hi(p.update), p.update();
    else
      f.el = l.el, p.vnode = f;
  }, Q = (l, f, a, p, h, b, y) => {
    const _ = () => {
      if (l.isMounted) {
        let { next: v, bu: E, u: O, parent: P, vnode: M } = l, $ = v, H;
        Se(l, !1), v ? (v.el = M.el, L(l, v, y)) : v = M, E && It(E), (H = v.props && v.props.onVnodeBeforeUpdate) && he(H, P, v, M), Se(l, !0);
        const W = Gt(l), se = l.subTree;
        l.subTree = W, R(
          se,
          W,
          // parent may have changed if it's in a teleport
          w(se.el),
          // anchor may have changed if it's in a fragment
          _t(se),
          l,
          h,
          b
        ), v.el = W.el, $ === null && Ci(l, W.el), O && ee(O, h), (H = v.props && v.props.onVnodeUpdated) && ee(() => he(H, P, v, M), h);
      } else {
        let v;
        const { el: E, props: O } = f, { bm: P, m: M, parent: $ } = l, H = Mt(f);
        if (Se(l, !1), P && It(P), !H && (v = O && O.onVnodeBeforeMount) && he(v, $, f), Se(l, !0), E && Qt) {
          const W = () => {
            l.subTree = Gt(l), Qt(E, l.subTree, l, h, null);
          };
          H ? f.type.__asyncLoader().then(
            // note: we are moving the render call into an async callback,
            // which means it won't track dependencies - but it's ok because
            // a server-rendered async wrapper is already in resolved state
            // and it will never need to change.
            () => !l.isUnmounted && W()
          ) : W();
        } else {
          const W = l.subTree = Gt(l);
          R(null, W, a, p, l, h, b), f.el = W.el;
        }
        if (M && ee(M, h), !H && (v = O && O.onVnodeMounted)) {
          const W = f;
          ee(() => he(v, $, W), h);
        }
        (f.shapeFlag & 256 || $ && Mt($.vnode) && $.vnode.shapeFlag & 256) && l.a && ee(l.a, h), l.isMounted = !0, f = a = p = null;
      }
    }, x = l.effect = new Tn(
      _,
      () => Hn(g),
      l.scope
      // track it in component's effect scope
    ), g = l.update = () => x.run();
    g.id = l.uid, Se(l, !0), g();
  }, L = (l, f, a) => {
    f.component = l;
    const p = l.vnode.props;
    l.vnode = f, l.next = null, Yi(l, f.props, p, a), Qi(l, f.children, a), ke(), ns(), Ge();
  }, U = (l, f, a, p, h, b, y, _, x = !1) => {
    const g = l && l.children, v = l ? l.shapeFlag : 0, E = f.children, { patchFlag: O, shapeFlag: P } = f;
    if (O > 0) {
      if (O & 128) {
        mt(g, E, a, p, h, b, y, _, x);
        return;
      } else if (O & 256) {
        Re(g, E, a, p, h, b, y, _, x);
        return;
      }
    }
    P & 8 ? (v & 16 && me(g, h, b), E !== g && m(a, E)) : v & 16 ? P & 16 ? mt(g, E, a, p, h, b, y, _, x) : me(g, h, b, !0) : (v & 8 && m(a, ""), P & 16 && Me(E, a, p, h, b, y, _, x));
  }, Re = (l, f, a, p, h, b, y, _, x) => {
    l = l || qe, f = f || qe;
    const g = l.length, v = f.length, E = Math.min(g, v);
    let O;
    for (O = 0; O < E; O++) {
      const P = f[O] = x ? Oe(f[O]) : pe(f[O]);
      R(l[O], P, a, null, h, b, y, _, x);
    }
    g > v ? me(l, h, b, !0, !1, E) : Me(f, a, p, h, b, y, _, x, E);
  }, mt = (l, f, a, p, h, b, y, _, x) => {
    let g = 0;
    const v = f.length;
    let E = l.length - 1, O = v - 1;
    for (; g <= E && g <= O; ) {
      const P = l[g], M = f[g] = x ? Oe(f[g]) : pe(f[g]);
      if (nt(P, M))
        R(P, M, a, null, h, b, y, _, x);
      else
        break;
      g++;
    }
    for (; g <= E && g <= O; ) {
      const P = l[E], M = f[O] = x ? Oe(f[O]) : pe(f[O]);
      if (nt(P, M))
        R(P, M, a, null, h, b, y, _, x);
      else
        break;
      E--, O--;
    }
    if (g > E) {
      if (g <= O) {
        const P = O + 1, M = P < v ? f[P].el : p;
        for (; g <= O; )
          R(null, f[g] = x ? Oe(f[g]) : pe(f[g]), a, M, h, b, y, _, x), g++;
      }
    } else if (g > O)
      for (; g <= E; )
        ae(l[g], h, b, !0), g++;
    else {
      const P = g, M = g, $ = /* @__PURE__ */ new Map();
      for (g = M; g <= O; g++) {
        const ne = f[g] = x ? Oe(f[g]) : pe(f[g]);
        ne.key != null && $.set(ne.key, g);
      }
      let H, W = 0;
      const se = O - M + 1;
      let We = !1, Wn = 0;
      const tt = new Array(se);
      for (g = 0; g < se; g++)
        tt[g] = 0;
      for (g = P; g <= E; g++) {
        const ne = l[g];
        if (W >= se) {
          ae(ne, h, b, !0);
          continue;
        }
        let de;
        if (ne.key != null)
          de = $.get(ne.key);
        else
          for (H = M; H <= O; H++)
            if (tt[H - M] === 0 && nt(ne, f[H])) {
              de = H;
              break;
            }
        de === void 0 ? ae(ne, h, b, !0) : (tt[de - M] = g + 1, de >= Wn ? Wn = de : We = !0, R(ne, f[de], a, null, h, b, y, _, x), W++);
      }
      const Vn = We ? no(tt) : qe;
      for (H = Vn.length - 1, g = se - 1; g >= 0; g--) {
        const ne = M + g, de = f[ne], qn = ne + 1 < v ? f[ne + 1].el : p;
        tt[g] === 0 ? R(null, de, a, qn, h, b, y, _, x) : We && (H < 0 || g !== Vn[H] ? Ne(
          de,
          a,
          qn,
          2
          /* MoveType.REORDER */
        ) : H--);
      }
    }
  }, Ne = (l, f, a, p, h = null) => {
    const { el: b, type: y, transition: _, children: x, shapeFlag: g } = l;
    if (g & 6) {
      Ne(l.component.subTree, f, a, p);
      return;
    }
    if (g & 128) {
      l.suspense.move(f, a, p);
      return;
    }
    if (g & 64) {
      y.move(l, f, a, ze);
      return;
    }
    if (y === be) {
      s(b, f, a);
      for (let E = 0; E < x.length; E++)
        Ne(x[E], f, a, p);
      s(l.anchor, f, a);
      return;
    }
    if (y === nn) {
      F(l, f, a);
      return;
    }
    if (p !== 2 && g & 1 && _)
      if (p === 0)
        _.beforeEnter(b), s(b, f, a), ee(() => _.enter(b), h);
      else {
        const { leave: E, delayLeave: O, afterLeave: P } = _, M = () => s(b, f, a), $ = () => {
          E(b, () => {
            M(), P && P();
          });
        };
        O ? O(b, M, $) : $();
      }
    else
      s(b, f, a);
  }, ae = (l, f, a, p = !1, h = !1) => {
    const { type: b, props: y, ref: _, children: x, dynamicChildren: g, shapeFlag: v, patchFlag: E, dirs: O } = l;
    if (_ != null && _n(_, null, a, l, !0), v & 256) {
      f.ctx.deactivate(l);
      return;
    }
    const P = v & 1 && O, M = !Mt(l);
    let $;
    if (M && ($ = y && y.onVnodeBeforeUnmount) && he($, f, l), v & 6)
      gr(l.component, a, p);
    else {
      if (v & 128) {
        l.suspense.unmount(a, p);
        return;
      }
      P && je(l, null, f, "beforeUnmount"), v & 64 ? l.type.remove(l, f, a, h, ze, p) : g && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (b !== be || E > 0 && E & 64) ? me(g, f, a, !1, !0) : (b === be && E & 384 || !h && v & 16) && me(x, f, a), p && Ln(l);
    }
    (M && ($ = y && y.onVnodeUnmounted) || P) && ee(() => {
      $ && he($, f, l), P && je(l, null, f, "unmounted");
    }, a);
  }, Ln = (l) => {
    const { type: f, el: a, anchor: p, transition: h } = l;
    if (f === be) {
      pr(a, p);
      return;
    }
    if (f === nn) {
      J(l);
      return;
    }
    const b = () => {
      r(a), h && !h.persisted && h.afterLeave && h.afterLeave();
    };
    if (l.shapeFlag & 1 && h && !h.persisted) {
      const { leave: y, delayLeave: _ } = h, x = () => y(a, b);
      _ ? _(l.el, b, x) : x();
    } else
      b();
  }, pr = (l, f) => {
    let a;
    for (; l !== f; )
      a = C(l), r(l), l = a;
    r(f);
  }, gr = (l, f, a) => {
    const { bum: p, scope: h, update: b, subTree: y, um: _ } = l;
    p && It(p), h.stop(), b && (b.active = !1, ae(y, l, f, a)), _ && ee(_, f), ee(() => {
      l.isUnmounted = !0;
    }, f), f && f.pendingBranch && !f.isUnmounted && l.asyncDep && !l.asyncResolved && l.suspenseId === f.pendingId && (f.deps--, f.deps === 0 && f.resolve());
  }, me = (l, f, a, p = !1, h = !1, b = 0) => {
    for (let y = b; y < l.length; y++)
      ae(l[y], f, a, p, h);
  }, _t = (l) => l.shapeFlag & 6 ? _t(l.component.subTree) : l.shapeFlag & 128 ? l.suspense.next() : C(l.anchor || l.el), zn = (l, f, a) => {
    l == null ? f._vnode && ae(f._vnode, null, null, !0) : R(f._vnode || null, l, f, null, null, null, a), ns(), Ys(), f._vnode = l;
  }, ze = {
    p: R,
    um: ae,
    m: Ne,
    r: Ln,
    mt: Xt,
    mc: Me,
    pc: U,
    pbc: Fe,
    n: _t,
    o: e
  };
  let Zt, Qt;
  return t && ([Zt, Qt] = t(ze)), {
    render: zn,
    hydrate: Zt,
    createApp: Gi(zn, Zt)
  };
}
function Se({ effect: e, update: t }, n) {
  e.allowRecurse = t.allowRecurse = n;
}
function ur(e, t, n = !1) {
  const s = e.children, r = t.children;
  if (T(s) && T(r))
    for (let i = 0; i < s.length; i++) {
      const o = s[i];
      let c = r[i];
      c.shapeFlag & 1 && !c.dynamicChildren && ((c.patchFlag <= 0 || c.patchFlag === 32) && (c = r[i] = Oe(r[i]), c.el = o.el), n || ur(o, c)), c.type === Wt && (c.el = o.el);
    }
}
function no(e) {
  const t = e.slice(), n = [0];
  let s, r, i, o, c;
  const u = e.length;
  for (s = 0; s < u; s++) {
    const d = e[s];
    if (d !== 0) {
      if (r = n[n.length - 1], e[r] < d) {
        t[s] = r, n.push(s);
        continue;
      }
      for (i = 0, o = n.length - 1; i < o; )
        c = i + o >> 1, e[n[c]] < d ? i = c + 1 : o = c;
      d < e[n[i]] && (i > 0 && (t[s] = n[i - 1]), n[i] = s);
    }
  }
  for (i = n.length, o = n[i - 1]; i-- > 0; )
    n[i] = o, o = t[o];
  return n;
}
const so = (e) => e.__isTeleport, be = Symbol(void 0), Wt = Symbol(void 0), ft = Symbol(void 0), nn = Symbol(void 0), it = [];
let ce = null;
function ro(e = !1) {
  it.push(ce = e ? null : []);
}
function io() {
  it.pop(), ce = it[it.length - 1] || null;
}
let ut = 1;
function us(e) {
  ut += e;
}
function oo(e) {
  return e.dynamicChildren = ut > 0 ? ce || qe : null, io(), ut > 0 && ce && ce.push(e), e;
}
function lo(e, t, n, s, r, i) {
  return oo(j(
    e,
    t,
    n,
    s,
    r,
    i,
    !0
    /* isBlock */
  ));
}
function co(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function nt(e, t) {
  return e.type === t.type && e.key === t.key;
}
const Vt = "__vInternal", ar = ({ key: e }) => e ?? null, Ft = ({ ref: e, ref_key: t, ref_for: n }) => e != null ? q(e) || G(e) || I(e) ? { i: le, r: e, k: t, f: !!n } : e : null;
function j(e, t = null, n = null, s = 0, r = null, i = e === be ? 0 : 1, o = !1, c = !1) {
  const u = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && ar(t),
    ref: t && Ft(t),
    scopeId: Lt,
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
    patchFlag: s,
    dynamicProps: r,
    dynamicChildren: null,
    appContext: null,
    ctx: le
  };
  return c ? (Bn(u, n), i & 128 && e.normalize(u)) : n && (u.shapeFlag |= q(n) ? 8 : 16), ut > 0 && // avoid a block node from tracking itself
  !o && // has current parent block
  ce && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (u.patchFlag > 0 || i & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  u.patchFlag !== 32 && ce.push(u), u;
}
const Ie = fo;
function fo(e, t = null, n = null, s = 0, r = null, i = !1) {
  if ((!e || e === Di) && (e = ft), co(e)) {
    const c = Ze(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return n && Bn(c, n), ut > 0 && !i && ce && (c.shapeFlag & 6 ? ce[ce.indexOf(e)] = c : ce.push(c)), c.patchFlag |= -2, c;
  }
  if (yo(e) && (e = e.__vccOpts), t) {
    t = uo(t);
    let { class: c, style: u } = t;
    c && !q(c) && (t.class = wn(c)), z(u) && (Ks(u) && !T(u) && (u = X({}, u)), t.style = yn(u));
  }
  const o = q(e) ? 1 : vi(e) ? 128 : so(e) ? 64 : z(e) ? 4 : I(e) ? 2 : 0;
  return j(e, t, n, s, r, o, i, !0);
}
function uo(e) {
  return e ? Ks(e) || Vt in e ? X({}, e) : e : null;
}
function Ze(e, t, n = !1) {
  const { props: s, ref: r, patchFlag: i, children: o } = e, c = t ? ao(s || {}, t) : s;
  return {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: c,
    key: c && ar(c),
    ref: t && t.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      n && r ? T(r) ? r.concat(Ft(t)) : [r, Ft(t)] : Ft(t)
    ) : r,
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
    patchFlag: t && e.type !== be ? i === -1 ? 16 : i | 16 : i,
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
    ssContent: e.ssContent && Ze(e.ssContent),
    ssFallback: e.ssFallback && Ze(e.ssFallback),
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce
  };
}
function Le(e = " ", t = 0) {
  return Ie(Wt, null, e, t);
}
function pe(e) {
  return e == null || typeof e == "boolean" ? Ie(ft) : T(e) ? Ie(
    be,
    null,
    // #3666, avoid reference pollution when reusing vnode
    e.slice()
  ) : typeof e == "object" ? Oe(e) : Ie(Wt, null, String(e));
}
function Oe(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : Ze(e);
}
function Bn(e, t) {
  let n = 0;
  const { shapeFlag: s } = e;
  if (t == null)
    t = null;
  else if (T(t))
    n = 16;
  else if (typeof t == "object")
    if (s & 65) {
      const r = t.default;
      r && (r._c && (r._d = !1), Bn(e, r()), r._c && (r._d = !0));
      return;
    } else {
      n = 32;
      const r = t._;
      !r && !(Vt in t) ? t._ctx = le : r === 3 && le && (le.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else
    I(t) ? (t = { default: t, _ctx: le }, n = 32) : (t = String(t), s & 64 ? (n = 16, t = [Le(t)]) : n = 8);
  e.children = t, e.shapeFlag |= n;
}
function ao(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const s = e[n];
    for (const r in s)
      if (r === "class")
        t.class !== s.class && (t.class = wn([t.class, s.class]));
      else if (r === "style")
        t.style = yn([t.style, s.style]);
      else if (Ht(r)) {
        const i = t[r], o = s[r];
        o && i !== o && !(T(i) && i.includes(o)) && (t[r] = i ? [].concat(i, o) : o);
      } else
        r !== "" && (t[r] = s[r]);
  }
  return t;
}
function he(e, t, n, s = null) {
  ue(e, t, 7, [
    n,
    s
  ]);
}
const ho = fr();
let po = 0;
function go(e, t, n) {
  const s = e.type, r = (t ? t.appContext : e.appContext) || ho, i = {
    uid: po++,
    vnode: e,
    type: s,
    parent: t,
    appContext: r,
    root: null,
    next: null,
    subTree: null,
    effect: null,
    update: null,
    scope: new Ar(
      !0
      /* detached */
    ),
    render: null,
    proxy: null,
    exposed: null,
    exposeProxy: null,
    withProxy: null,
    provides: t ? t.provides : Object.create(r.provides),
    accessCache: null,
    renderCache: [],
    // local resolved assets
    components: null,
    directives: null,
    // resolved props and emits options
    propsOptions: ir(s, r),
    emitsOptions: Zs(s, r),
    // emit
    emit: null,
    emitted: null,
    // props default value
    propsDefaults: B,
    // inheritAttrs
    inheritAttrs: s.inheritAttrs,
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
  return i.ctx = { _: i }, i.root = t ? t.root : i, i.emit = mi.bind(null, i), e.ce && e.ce(i), i;
}
let V = null;
const Qe = (e) => {
  V = e, e.scope.on();
}, Ke = () => {
  V && V.scope.off(), V = null;
};
function dr(e) {
  return e.vnode.shapeFlag & 4;
}
let at = !1;
function mo(e, t = !1) {
  at = t;
  const { props: n, children: s } = e.vnode, r = dr(e);
  Ji(e, n, r, t), Zi(e, s);
  const i = r ? _o(e, t) : void 0;
  return at = !1, i;
}
function _o(e, t) {
  const n = e.type;
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = Ls(new Proxy(e.ctx, Ki));
  const { setup: s } = n;
  if (s) {
    const r = e.setupContext = s.length > 1 ? xo(e) : null;
    Qe(e), ke();
    const i = Te(s, e, 0, [e.props, r]);
    if (Ge(), Ke(), Ps(i)) {
      if (i.then(Ke, Ke), t)
        return i.then((o) => {
          as(e, o, t);
        }).catch((o) => {
          Dt(
            o,
            e,
            0
            /* ErrorCodes.SETUP_FUNCTION */
          );
        });
      e.asyncDep = i;
    } else
      as(e, i, t);
  } else
    hr(e, t);
}
function as(e, t, n) {
  I(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : z(t) && (e.setupState = zs(t)), hr(e, n);
}
let ds;
function hr(e, t, n) {
  const s = e.type;
  if (!e.render) {
    if (!t && ds && !s.render) {
      const r = s.template || Un(e).template;
      if (r) {
        const { isCustomElement: i, compilerOptions: o } = e.appContext.config, { delimiters: c, compilerOptions: u } = s, d = X(X({
          isCustomElement: i,
          delimiters: c
        }, o), u);
        s.render = ds(r, d);
      }
    }
    e.render = s.render || fe;
  }
  Qe(e), ke(), Li(e), Ge(), Ke();
}
function bo(e) {
  return new Proxy(e.attrs, {
    get(t, n) {
      return te(e, "get", "$attrs"), t[n];
    }
  });
}
function xo(e) {
  const t = (s) => {
    e.exposed = s || {};
  };
  let n;
  return {
    get attrs() {
      return n || (n = bo(e));
    },
    slots: e.slots,
    emit: e.emit,
    expose: t
  };
}
function qt(e) {
  if (e.exposed)
    return e.exposeProxy || (e.exposeProxy = new Proxy(zs(Ls(e.exposed)), {
      get(t, n) {
        if (n in t)
          return t[n];
        if (n in rt)
          return rt[n](e);
      },
      has(t, n) {
        return n in t || n in rt;
      }
    }));
}
function yo(e) {
  return I(e) && "__vccOpts" in e;
}
const wo = (e, t) => ui(e, t, at), Eo = Symbol(""), Co = () => At(Eo), vo = "3.2.47", Oo = "http://www.w3.org/2000/svg", $e = typeof document < "u" ? document : null, hs = $e && /* @__PURE__ */ $e.createElement("template"), Po = {
  insert: (e, t, n) => {
    t.insertBefore(e, n || null);
  },
  remove: (e) => {
    const t = e.parentNode;
    t && t.removeChild(e);
  },
  createElement: (e, t, n, s) => {
    const r = t ? $e.createElementNS(Oo, e) : $e.createElement(e, n ? { is: n } : void 0);
    return e === "select" && s && s.multiple != null && r.setAttribute("multiple", s.multiple), r;
  },
  createText: (e) => $e.createTextNode(e),
  createComment: (e) => $e.createComment(e),
  setText: (e, t) => {
    e.nodeValue = t;
  },
  setElementText: (e, t) => {
    e.textContent = t;
  },
  parentNode: (e) => e.parentNode,
  nextSibling: (e) => e.nextSibling,
  querySelector: (e) => $e.querySelector(e),
  setScopeId(e, t) {
    e.setAttribute(t, "");
  },
  // __UNSAFE__
  // Reason: innerHTML.
  // Static content here can only come from compiled templates.
  // As long as the user only uses trusted templates, this is safe.
  insertStaticContent(e, t, n, s, r, i) {
    const o = n ? n.previousSibling : t.lastChild;
    if (r && (r === i || r.nextSibling))
      for (; t.insertBefore(r.cloneNode(!0), n), !(r === i || !(r = r.nextSibling)); )
        ;
    else {
      hs.innerHTML = s ? `<svg>${e}</svg>` : e;
      const c = hs.content;
      if (s) {
        const u = c.firstChild;
        for (; u.firstChild; )
          c.appendChild(u.firstChild);
        c.removeChild(u);
      }
      t.insertBefore(c, n);
    }
    return [
      // first
      o ? o.nextSibling : t.firstChild,
      // last
      n ? n.previousSibling : t.lastChild
    ];
  }
};
function To(e, t, n) {
  const s = e._vtc;
  s && (t = (t ? [t, ...s] : [...s]).join(" ")), t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t;
}
function Io(e, t, n) {
  const s = e.style, r = q(n);
  if (n && !r) {
    if (t && !q(t))
      for (const i in t)
        n[i] == null && bn(s, i, "");
    for (const i in n)
      bn(s, i, n[i]);
  } else {
    const i = s.display;
    r ? t !== n && (s.cssText = n) : t && e.removeAttribute("style"), "_vod" in e && (s.display = i);
  }
}
const ps = /\s*!important$/;
function bn(e, t, n) {
  if (T(n))
    n.forEach((s) => bn(e, t, s));
  else if (n == null && (n = ""), t.startsWith("--"))
    e.setProperty(t, n);
  else {
    const s = Ao(e, t);
    ps.test(n) ? e.setProperty(ie(s), n.replace(ps, ""), "important") : e[s] = n;
  }
}
const gs = ["Webkit", "Moz", "ms"], sn = {};
function Ao(e, t) {
  const n = sn[t];
  if (n)
    return n;
  let s = xe(t);
  if (s !== "filter" && s in e)
    return sn[t] = s;
  s = As(s);
  for (let r = 0; r < gs.length; r++) {
    const i = gs[r] + s;
    if (i in e)
      return sn[t] = i;
  }
  return t;
}
const ms = "http://www.w3.org/1999/xlink";
function Mo(e, t, n, s, r) {
  if (s && t.startsWith("xlink:"))
    n == null ? e.removeAttributeNS(ms, t.slice(6, t.length)) : e.setAttributeNS(ms, t, n);
  else {
    const i = wr(t);
    n == null || i && !Cs(n) ? e.removeAttribute(t) : e.setAttribute(t, i ? "" : n);
  }
}
function Fo(e, t, n, s, r, i, o) {
  if (t === "innerHTML" || t === "textContent") {
    s && o(s, r, i), e[t] = n ?? "";
    return;
  }
  if (t === "value" && e.tagName !== "PROGRESS" && // custom elements may use _value internally
  !e.tagName.includes("-")) {
    e._value = n;
    const u = n ?? "";
    (e.value !== u || // #4956: always set for OPTION elements because its value falls back to
    // textContent if no value attribute is present. And setting .value for
    // OPTION has no side effect
    e.tagName === "OPTION") && (e.value = u), n == null && e.removeAttribute(t);
    return;
  }
  let c = !1;
  if (n === "" || n == null) {
    const u = typeof e[t];
    u === "boolean" ? n = Cs(n) : n == null && u === "string" ? (n = "", c = !0) : u === "number" && (n = 0, c = !0);
  }
  try {
    e[t] = n;
  } catch {
  }
  c && e.removeAttribute(t);
}
function Ve(e, t, n, s) {
  e.addEventListener(t, n, s);
}
function Ro(e, t, n, s) {
  e.removeEventListener(t, n, s);
}
function No(e, t, n, s, r = null) {
  const i = e._vei || (e._vei = {}), o = i[t];
  if (s && o)
    o.value = s;
  else {
    const [c, u] = jo(t);
    if (s) {
      const d = i[t] = Uo(s, r);
      Ve(e, c, d, u);
    } else
      o && (Ro(e, c, o, u), i[t] = void 0);
  }
}
const _s = /(?:Once|Passive|Capture)$/;
function jo(e) {
  let t;
  if (_s.test(e)) {
    t = {};
    let s;
    for (; s = e.match(_s); )
      e = e.slice(0, e.length - s[0].length), t[s[0].toLowerCase()] = !0;
  }
  return [e[2] === ":" ? e.slice(3) : ie(e.slice(2)), t];
}
let rn = 0;
const So = /* @__PURE__ */ Promise.resolve(), Ho = () => rn || (So.then(() => rn = 0), rn = Date.now());
function Uo(e, t) {
  const n = (s) => {
    if (!s._vts)
      s._vts = Date.now();
    else if (s._vts <= n.attached)
      return;
    ue($o(s, n.value), t, 5, [s]);
  };
  return n.value = e, n.attached = Ho(), n;
}
function $o(e, t) {
  if (T(t)) {
    const n = e.stopImmediatePropagation;
    return e.stopImmediatePropagation = () => {
      n.call(e), e._stopped = !0;
    }, t.map((s) => (r) => !r._stopped && s && s(r));
  } else
    return t;
}
const bs = /^on[a-z]/, Bo = (e, t, n, s, r = !1, i, o, c, u) => {
  t === "class" ? To(e, s, r) : t === "style" ? Io(e, n, s) : Ht(t) ? En(t) || No(e, t, n, s, o) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : Do(e, t, s, r)) ? Fo(e, t, s, i, o, c, u) : (t === "true-value" ? e._trueValue = s : t === "false-value" && (e._falseValue = s), Mo(e, t, s, r));
};
function Do(e, t, n, s) {
  return s ? !!(t === "innerHTML" || t === "textContent" || t in e && bs.test(t) && I(n)) : t === "spellcheck" || t === "draggable" || t === "translate" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA" || bs.test(t) && q(n) ? !1 : t in e;
}
function Ko(e, t) {
  const n = Gs(e);
  class s extends Dn {
    constructor(i) {
      super(n, i, t);
    }
  }
  return s.def = n, s;
}
const Lo = typeof HTMLElement < "u" ? HTMLElement : class {
};
class Dn extends Lo {
  constructor(t, n = {}, s) {
    super(), this._def = t, this._props = n, this._instance = null, this._connected = !1, this._resolved = !1, this._numberProps = null, this.shadowRoot && s ? s(this._createVNode(), this.shadowRoot) : (this.attachShadow({ mode: "open" }), this._def.__asyncLoader || this._resolveProps(this._def));
  }
  connectedCallback() {
    this._connected = !0, this._instance || (this._resolved ? this._update() : this._resolveDef());
  }
  disconnectedCallback() {
    this._connected = !1, qs(() => {
      this._connected || (Es(null, this.shadowRoot), this._instance = null);
    });
  }
  /**
   * resolve inner component definition (handle possible async component)
   */
  _resolveDef() {
    this._resolved = !0;
    for (let s = 0; s < this.attributes.length; s++)
      this._setAttr(this.attributes[s].name);
    new MutationObserver((s) => {
      for (const r of s)
        this._setAttr(r.attributeName);
    }).observe(this, { attributes: !0 });
    const t = (s, r = !1) => {
      const { props: i, styles: o } = s;
      let c;
      if (i && !T(i))
        for (const u in i) {
          const d = i[u];
          (d === Number || d && d.type === Number) && (u in this._props && (this._props[u] = Jn(this._props[u])), (c || (c = /* @__PURE__ */ Object.create(null)))[xe(u)] = !0);
        }
      this._numberProps = c, r && this._resolveProps(s), this._applyStyles(o), this._update();
    }, n = this._def.__asyncLoader;
    n ? n().then((s) => t(s, !0)) : t(this._def);
  }
  _resolveProps(t) {
    const { props: n } = t, s = T(n) ? n : Object.keys(n || {});
    for (const r of Object.keys(this))
      r[0] !== "_" && s.includes(r) && this._setProp(r, this[r], !0, !1);
    for (const r of s.map(xe))
      Object.defineProperty(this, r, {
        get() {
          return this._getProp(r);
        },
        set(i) {
          this._setProp(r, i);
        }
      });
  }
  _setAttr(t) {
    let n = this.getAttribute(t);
    const s = xe(t);
    this._numberProps && this._numberProps[s] && (n = Jn(n)), this._setProp(s, n, !1);
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
  _setProp(t, n, s = !0, r = !0) {
    n !== this._props[t] && (this._props[t] = n, r && this._instance && this._update(), s && (n === !0 ? this.setAttribute(ie(t), "") : typeof n == "string" || typeof n == "number" ? this.setAttribute(ie(t), n + "") : n || this.removeAttribute(ie(t))));
  }
  _update() {
    Es(this._createVNode(), this.shadowRoot);
  }
  _createVNode() {
    const t = Ie(this._def, X({}, this._props));
    return this._instance || (t.ce = (n) => {
      this._instance = n, n.isCE = !0;
      const s = (i, o) => {
        this.dispatchEvent(new CustomEvent(i, {
          detail: o
        }));
      };
      n.emit = (i, ...o) => {
        s(i, o), ie(i) !== i && s(ie(i), o);
      };
      let r = this;
      for (; r = r && (r.parentNode || r.host); )
        if (r instanceof Dn) {
          n.parent = r._instance, n.provides = r._instance.provides;
          break;
        }
    }), t;
  }
  _applyStyles(t) {
    t && t.forEach((n) => {
      const s = document.createElement("style");
      s.textContent = n, this.shadowRoot.appendChild(s);
    });
  }
}
const xs = (e) => {
  const t = e.props["onUpdate:modelValue"] || !1;
  return T(t) ? (n) => It(t, n) : t;
};
function zo(e) {
  e.target.composing = !0;
}
function ys(e) {
  const t = e.target;
  t.composing && (t.composing = !1, t.dispatchEvent(new Event("input")));
}
const Pt = {
  created(e, { modifiers: { lazy: t, trim: n, number: s } }, r) {
    e._assign = xs(r);
    const i = s || r.props && r.props.type === "number";
    Ve(e, t ? "change" : "input", (o) => {
      if (o.target.composing)
        return;
      let c = e.value;
      n && (c = c.trim()), i && (c = on(c)), e._assign(c);
    }), n && Ve(e, "change", () => {
      e.value = e.value.trim();
    }), t || (Ve(e, "compositionstart", zo), Ve(e, "compositionend", ys), Ve(e, "change", ys));
  },
  // set value on mounted so it's after min/max for type="range"
  mounted(e, { value: t }) {
    e.value = t ?? "";
  },
  beforeUpdate(e, { value: t, modifiers: { lazy: n, trim: s, number: r } }, i) {
    if (e._assign = xs(i), e.composing || document.activeElement === e && e.type !== "range" && (n || s && e.value.trim() === t || (r || e.type === "number") && on(e.value) === t))
      return;
    const o = t ?? "";
    e.value !== o && (e.value = o);
  }
}, Wo = /* @__PURE__ */ X({ patchProp: Bo }, Po);
let ws;
function Vo() {
  return ws || (ws = eo(Wo));
}
const Es = (...e) => {
  Vo().render(...e);
}, qo = Gs({
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
}), Jo = `.v-mail-signature-generator[data-v-195e4d98]{--wcm-line-height: 20px;--wcm-font-size: 18px;font-family:sans-serif;min-height:calc(100vh - 200px);padding-bottom:var(--wcm-line-height);font-size:var(--wcm-font-size);line-height:var(--wcm-line-height)}.v-mail-signature-generator .v-mail-signature-generator__container[data-v-195e4d98]{padding:var(--wcm-line-height);margin-bottom:var(--wcm-line-height);background:white}.v-mail-signature-generator .v-mail-signature-generator__container>table[data-v-195e4d98]{pointer-events:none}.fp-grid-container[data-v-195e4d98],.fp-ui-form[data-v-195e4d98]{display:flex;flex-wrap:wrap}.fp-ui-form>input[data-v-195e4d98]{all:unset;display:block;position:relative;width:100%;cursor:pointer;box-sizing:border-box;box-shadow:inset 0 0 0 2px currentColor;padding:calc(var(--wcm-line-height) / 2);margin-bottom:var(--wcm-line-height)}.fp-grid-coll-24-24[data-v-195e4d98]{width:100%}.fp-ui-button[data-v-195e4d98]{all:unset;line-height:var(--wcm-line-height);font-size:var(--wcm-font-size);font-weight:400;margin:0 auto;cursor:pointer;display:block;box-sizing:border-box;box-shadow:inset 0 0 0 2px currentColor;padding:calc(var(--wcm-line-height) / 2) calc(var(--wcm-line-height))}
`, Yo = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [s, r] of t)
    n[s] = r;
  return n;
}, dt = (e) => (_i("data-v-195e4d98"), e = e(), bi(), e), Xo = { class: "v-mail-signature-generator" }, Zo = { class: "fp-grid-container" }, Qo = { class: "fp-grid-coll-24-24" }, ko = /* @__PURE__ */ dt(() => /* @__PURE__ */ j("h1", null, "Générateur de signature mail ForPro", -1)), Go = { class: "v-mail-signature-generator__content fp-ui-form" }, el = {
  dir: "ltr",
  ref: "htmlContent",
  style: { width: "100%" }
}, tl = { style: { width: "100%", "font-family": "Helvetica, Arial, sans-serif", "font-size": "12px", "line-height": "15px", color: "black" } }, nl = {
  height: "auto",
  style: { "font-family": "Helvetica, Arial, sans-serif", "font-size": "12px", "line-height": "15px", color: "black" }
}, sl = /* @__PURE__ */ dt(() => /* @__PURE__ */ j("br", null, null, -1)), rl = /* @__PURE__ */ dt(() => /* @__PURE__ */ j("tr", null, [
  /* @__PURE__ */ j("td", {
    height: "auto",
    style: { "font-family": "Helvetica, Arial, sans-serif", "font-size": "12px", "line-height": "15px", "font-weight": "normal", "padding-top": "15px", color: "black" }
  }, [
    /* @__PURE__ */ Le("Fondation "),
    /* @__PURE__ */ j("strong", null, "ForPro"),
    /* @__PURE__ */ j("br"),
    /* @__PURE__ */ Le("Fondation pour la promotion et la valorisation de la Formation Professionnelle ")
  ])
], -1)), il = /* @__PURE__ */ dt(() => /* @__PURE__ */ j("tr", { style: { "padding-top": "15px" } }, [
  /* @__PURE__ */ j("td", {
    height: "auto",
    style: { "font-family": "Helvetica, Arial, sans-serif", "padding-top": "15px", "line-height": "15px", "font-size": "12px", color: "black" }
  }, [
    /* @__PURE__ */ Le(" Route de la Galaise 17 "),
    /* @__PURE__ */ j("br"),
    /* @__PURE__ */ Le("1228 Plan-les-Ouates ")
  ])
], -1)), ol = {
  height: "auto",
  style: { "font-family": "Helvetica, Arial, sans-serif", "padding-top": "15px", "line-height": "15px", "font-size": "12px", color: "black" }
}, ll = ["href"], cl = /* @__PURE__ */ dt(() => /* @__PURE__ */ j("tr", null, [
  /* @__PURE__ */ j("td", {
    border: "0",
    cellpadding: "0",
    cellspacing: "0",
    height: "auto"
  }, [
    /* @__PURE__ */ j("img", {
      alt: "logo forpro",
      style: { height: "30px", "margin-top": "15px" },
      src: "https://azertypow.github.io/forpro.webapp/images/logo.png"
    })
  ])
], -1));
function fl(e, t, n, s, r, i) {
  return ro(), lo("div", Xo, [
    j("div", Zo, [
      j("div", Qo, [
        ko,
        j("form", Go, [
          Ot(j("input", {
            type: "text",
            placeholder: "prénom",
            "onUpdate:modelValue": t[0] || (t[0] = (o) => e.firstname = o)
          }, null, 512), [
            [Pt, e.firstname]
          ]),
          Ot(j("input", {
            type: "text",
            placeholder: "nom",
            "onUpdate:modelValue": t[1] || (t[1] = (o) => e.name = o)
          }, null, 512), [
            [Pt, e.name]
          ]),
          Ot(j("input", {
            type: "text",
            placeholder: "fonction",
            "onUpdate:modelValue": t[2] || (t[2] = (o) => e.activity = o)
          }, null, 512), [
            [Pt, e.activity]
          ]),
          Ot(j("input", {
            type: "text",
            placeholder: "numéro",
            "onUpdate:modelValue": t[3] || (t[3] = (o) => e.tel = o)
          }, null, 512), [
            [Pt, e.tel]
          ])
        ]),
        j("div", {
          onClick: t[4] || (t[4] = (...o) => e.copySignatureInClipBoard && e.copySignatureInClipBoard(...o)),
          class: "v-mail-signature-generator__container"
        }, [
          j("div", el, [
            j("table", tl, [
              j("tbody", null, [
                j("tr", null, [
                  j("td", nl, [
                    Le(bt(e.getCleanedEmptyString(e.firstname, "prénom")) + " " + bt(e.getCleanedEmptyString(e.name, "/ nom")) + " ", 1),
                    sl,
                    Le(" " + bt(e.getCleanedEmptyString(e.activity, "fonction")), 1)
                  ])
                ]),
                rl,
                il,
                j("tr", null, [
                  j("td", ol, [
                    j("a", {
                      href: "tel:" + e.tel,
                      style: { "text-decoration": "none" }
                    }, bt(e.getCleanedEmptyString(e.tel, "numéro")), 9, ll)
                  ])
                ]),
                cl
              ])
            ])
          ], 512)
        ]),
        j("button", {
          onClick: t[5] || (t[5] = (...o) => e.copySignatureInClipBoard && e.copySignatureInClipBoard(...o)),
          class: "fp-ui-button"
        }, "Selectionner le texte de signature")
      ])
    ])
  ]);
}
const ul = /* @__PURE__ */ Yo(qo, [["render", fl], ["styles", [Jo]], ["__scopeId", "data-v-195e4d98"]]);
function al() {
  customElements.define("mail-signature", Ko(ul));
}
export {
  al as register
};
//# sourceMappingURL=index.js.map
