function xn(e, t) {
  const n = /* @__PURE__ */ Object.create(null), s = e.split(",");
  for (let r = 0; r < s.length; r++)
    n[s[r]] = !0;
  return t ? (r) => !!n[r.toLowerCase()] : (r) => !!n[r];
}
function yn(e) {
  if (P(e)) {
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
  else if (P(e))
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
function vs(e) {
  return !!e || e === "";
}
const st = (e) => q(e) ? e : e == null ? "" : P(e) || z(e) && (e.toString === Ps || !A(e.toString)) ? JSON.stringify(e, Cs, 2) : String(e), Cs = (e, t) => t && t.__v_isRef ? Cs(e, t.value) : Ye(t) ? {
  [`Map(${t.size})`]: [...t.entries()].reduce((n, [s, r]) => (n[`${s} =>`] = r, n), {})
} : Os(t) ? {
  [`Set(${t.size})`]: [...t.values()]
} : z(t) && !P(t) && !Is(t) ? String(t) : t, B = {}, Je = [], ue = () => {
}, Er = () => !1, vr = /^on[^a-z]/, Ht = (e) => vr.test(e), En = (e) => e.startsWith("onUpdate:"), k = Object.assign, vn = (e, t) => {
  const n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}, Cr = Object.prototype.hasOwnProperty, S = (e, t) => Cr.call(e, t), P = Array.isArray, Ye = (e) => Ut(e) === "[object Map]", Os = (e) => Ut(e) === "[object Set]", A = (e) => typeof e == "function", q = (e) => typeof e == "string", Cn = (e) => typeof e == "symbol", z = (e) => e !== null && typeof e == "object", Ts = (e) => z(e) && A(e.then) && A(e.catch), Ps = Object.prototype.toString, Ut = (e) => Ps.call(e), Or = (e) => Ut(e).slice(8, -1), Is = (e) => Ut(e) === "[object Object]", On = (e) => q(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, Pt = /* @__PURE__ */ xn(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), $t = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return (n) => t[n] || (t[n] = e(n));
}, Tr = /-(\w)/g, ye = $t((e) => e.replace(Tr, (t, n) => n ? n.toUpperCase() : "")), Pr = /\B([A-Z])/g, oe = $t((e) => e.replace(Pr, "-$1").toLowerCase()), As = $t((e) => e.charAt(0).toUpperCase() + e.slice(1)), Qt = $t((e) => e ? `on${As(e)}` : ""), Rt = (e, t) => !Object.is(e, t), It = (e, t) => {
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
let ie;
class Ar {
  constructor(t = !1) {
    this.detached = t, this._active = !0, this.effects = [], this.cleanups = [], this.parent = ie, !t && ie && (this.index = (ie.scopes || (ie.scopes = [])).push(this) - 1);
  }
  get active() {
    return this._active;
  }
  run(t) {
    if (this._active) {
      const n = ie;
      try {
        return ie = this, t();
      } finally {
        ie = n;
      }
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    ie = this;
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    ie = this.parent;
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
function Mr(e, t = ie) {
  t && t.active && t.effects.push(e);
}
function Fr() {
  return ie;
}
const Tn = (e) => {
  const t = new Set(e);
  return t.w = 0, t.n = 0, t;
}, Ms = (e) => (e.w & Me) > 0, Fs = (e) => (e.n & Me) > 0, Rr = ({ deps: e }) => {
  if (e.length)
    for (let t = 0; t < e.length; t++)
      e[t].w |= Me;
}, Nr = (e) => {
  const { deps: t } = e;
  if (t.length) {
    let n = 0;
    for (let s = 0; s < t.length; s++) {
      const r = t[s];
      Ms(r) && !Fs(r) ? r.delete(e) : t[n++] = r, r.w &= ~Me, r.n &= ~Me;
    }
    t.length = n;
  }
}, ln = /* @__PURE__ */ new WeakMap();
let lt = 0, Me = 1;
const cn = 30;
let le;
const Ke = Symbol(""), fn = Symbol("");
class Pn {
  constructor(t, n = null, s) {
    this.fn = t, this.scheduler = n, this.active = !0, this.deps = [], this.parent = void 0, Mr(this, s);
  }
  run() {
    if (!this.active)
      return this.fn();
    let t = le, n = Pe;
    for (; t; ) {
      if (t === this)
        return;
      t = t.parent;
    }
    try {
      return this.parent = le, le = this, Pe = !0, Me = 1 << ++lt, lt <= cn ? Rr(this) : kn(this), this.fn();
    } finally {
      lt <= cn && Nr(this), Me = 1 << --lt, le = this.parent, Pe = n, this.parent = void 0, this.deferStop && this.stop();
    }
  }
  stop() {
    le === this ? this.deferStop = !0 : this.active && (kn(this), this.onStop && this.onStop(), this.active = !1);
  }
}
function kn(e) {
  const { deps: t } = e;
  if (t.length) {
    for (let n = 0; n < t.length; n++)
      t[n].delete(e);
    t.length = 0;
  }
}
let Pe = !0;
const Rs = [];
function Ge() {
  Rs.push(Pe), Pe = !1;
}
function et() {
  const e = Rs.pop();
  Pe = e === void 0 ? !0 : e;
}
function te(e, t, n) {
  if (Pe && le) {
    let s = ln.get(e);
    s || ln.set(e, s = /* @__PURE__ */ new Map());
    let r = s.get(n);
    r || s.set(n, r = Tn()), Ns(r);
  }
}
function Ns(e, t) {
  let n = !1;
  lt <= cn ? Fs(e) || (e.n |= Me, n = !Ms(e)) : n = !e.has(le), n && (e.add(le), le.deps.push(e));
}
function we(e, t, n, s, r, i) {
  const o = ln.get(e);
  if (!o)
    return;
  let c = [];
  if (t === "clear")
    c = [...o.values()];
  else if (n === "length" && P(e)) {
    const u = Number(s);
    o.forEach((d, m) => {
      (m === "length" || m >= u) && c.push(d);
    });
  } else
    switch (n !== void 0 && c.push(o.get(n)), t) {
      case "add":
        P(e) ? On(n) && c.push(o.get("length")) : (c.push(o.get(Ke)), Ye(e) && c.push(o.get(fn)));
        break;
      case "delete":
        P(e) || (c.push(o.get(Ke)), Ye(e) && c.push(o.get(fn)));
        break;
      case "set":
        Ye(e) && c.push(o.get(Ke));
        break;
    }
  if (c.length === 1)
    c[0] && un(c[0]);
  else {
    const u = [];
    for (const d of c)
      d && u.push(...d);
    un(Tn(u));
  }
}
function un(e, t) {
  const n = P(e) ? e : [...e];
  for (const s of n)
    s.computed && Xn(s);
  for (const s of n)
    s.computed || Xn(s);
}
function Xn(e, t) {
  (e !== le || e.allowRecurse) && (e.scheduler ? e.scheduler() : e.run());
}
const Sr = /* @__PURE__ */ xn("__proto__,__v_isRef,__isVue"), Ss = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(Cn)
), jr = /* @__PURE__ */ In(), Hr = /* @__PURE__ */ In(!1, !0), Ur = /* @__PURE__ */ In(!0), Zn = /* @__PURE__ */ $r();
function $r() {
  const e = {};
  return ["includes", "indexOf", "lastIndexOf"].forEach((t) => {
    e[t] = function(...n) {
      const s = j(this);
      for (let i = 0, o = this.length; i < o; i++)
        te(s, "get", i + "");
      const r = s[t](...n);
      return r === -1 || r === !1 ? s[t](...n.map(j)) : r;
    };
  }), ["push", "pop", "shift", "unshift", "splice"].forEach((t) => {
    e[t] = function(...n) {
      Ge();
      const s = j(this)[t].apply(this, n);
      return et(), s;
    };
  }), e;
}
function Br(e) {
  const t = j(this);
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
    const o = P(s);
    if (!e) {
      if (o && S(Zn, r))
        return Reflect.get(Zn, r, i);
      if (r === "hasOwnProperty")
        return Br;
    }
    const c = Reflect.get(s, r, i);
    return (Cn(r) ? Ss.has(r) : Sr(r)) || (e || te(s, "get", r), t) ? c : G(c) ? o && On(r) ? c : c.value : z(c) ? e ? Ds(c) : Fn(c) : c;
  };
}
const Dr = /* @__PURE__ */ js(), Kr = /* @__PURE__ */ js(!0);
function js(e = !1) {
  return function(n, s, r, i) {
    let o = n[s];
    if (ut(o) && G(o) && !G(r))
      return !1;
    if (!e && (!an(r) && !ut(r) && (o = j(o), r = j(r)), !P(n) && G(o) && !G(r)))
      return o.value = r, !0;
    const c = P(n) && On(s) ? Number(s) < n.length : S(n, s), u = Reflect.set(n, s, r, i);
    return n === j(i) && (c ? Rt(r, o) && we(n, "set", s, r) : we(n, "add", s, r)), u;
  };
}
function Lr(e, t) {
  const n = S(e, t);
  e[t];
  const s = Reflect.deleteProperty(e, t);
  return s && n && we(e, "delete", t, void 0), s;
}
function zr(e, t) {
  const n = Reflect.has(e, t);
  return (!Cn(t) || !Ss.has(t)) && te(e, "has", t), n;
}
function Wr(e) {
  return te(e, "iterate", P(e) ? "length" : Ke), Reflect.ownKeys(e);
}
const Hs = {
  get: jr,
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
}, qr = /* @__PURE__ */ k({}, Hs, {
  get: Hr,
  set: Kr
}), An = (e) => e, Bt = (e) => Reflect.getPrototypeOf(e);
function wt(e, t, n = !1, s = !1) {
  e = e.__v_raw;
  const r = j(e), i = j(t);
  n || (t !== i && te(r, "get", t), te(r, "get", i));
  const { has: o } = Bt(r), c = s ? An : n ? Sn : Nn;
  if (o.call(r, t))
    return c(e.get(t));
  if (o.call(r, i))
    return c(e.get(i));
  e !== r && e.get(t);
}
function Et(e, t = !1) {
  const n = this.__v_raw, s = j(n), r = j(e);
  return t || (e !== r && te(s, "has", e), te(s, "has", r)), e === r ? n.has(e) : n.has(e) || n.has(r);
}
function vt(e, t = !1) {
  return e = e.__v_raw, !t && te(j(e), "iterate", Ke), Reflect.get(e, "size", e);
}
function Qn(e) {
  e = j(e);
  const t = j(this);
  return Bt(t).has.call(t, e) || (t.add(e), we(t, "add", e, e)), this;
}
function Gn(e, t) {
  t = j(t);
  const n = j(this), { has: s, get: r } = Bt(n);
  let i = s.call(n, e);
  i || (e = j(e), i = s.call(n, e));
  const o = r.call(n, e);
  return n.set(e, t), i ? Rt(t, o) && we(n, "set", e, t) : we(n, "add", e, t), this;
}
function es(e) {
  const t = j(this), { has: n, get: s } = Bt(t);
  let r = n.call(t, e);
  r || (e = j(e), r = n.call(t, e)), s && s.call(t, e);
  const i = t.delete(e);
  return r && we(t, "delete", e, void 0), i;
}
function ts() {
  const e = j(this), t = e.size !== 0, n = e.clear();
  return t && we(e, "clear", void 0, void 0), n;
}
function Ct(e, t) {
  return function(s, r) {
    const i = this, o = i.__v_raw, c = j(o), u = t ? An : e ? Sn : Nn;
    return !e && te(c, "iterate", Ke), o.forEach((d, m) => s.call(r, u(d), u(m), i));
  };
}
function Ot(e, t, n) {
  return function(...s) {
    const r = this.__v_raw, i = j(r), o = Ye(i), c = e === "entries" || e === Symbol.iterator && o, u = e === "keys" && o, d = r[e](...s), m = n ? An : t ? Sn : Nn;
    return !t && te(i, "iterate", u ? fn : Ke), {
      // iterator protocol
      next() {
        const { value: w, done: v } = d.next();
        return v ? { value: w, done: v } : {
          value: c ? [m(w[0]), m(w[1])] : m(w),
          done: v
        };
      },
      // iterable protocol
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function Oe(e) {
  return function(...t) {
    return e === "delete" ? !1 : this;
  };
}
function Jr() {
  const e = {
    get(i) {
      return wt(this, i);
    },
    get size() {
      return vt(this);
    },
    has: Et,
    add: Qn,
    set: Gn,
    delete: es,
    clear: ts,
    forEach: Ct(!1, !1)
  }, t = {
    get(i) {
      return wt(this, i, !1, !0);
    },
    get size() {
      return vt(this);
    },
    has: Et,
    add: Qn,
    set: Gn,
    delete: es,
    clear: ts,
    forEach: Ct(!1, !0)
  }, n = {
    get(i) {
      return wt(this, i, !0);
    },
    get size() {
      return vt(this, !0);
    },
    has(i) {
      return Et.call(this, i, !0);
    },
    add: Oe(
      "add"
      /* TriggerOpTypes.ADD */
    ),
    set: Oe(
      "set"
      /* TriggerOpTypes.SET */
    ),
    delete: Oe(
      "delete"
      /* TriggerOpTypes.DELETE */
    ),
    clear: Oe(
      "clear"
      /* TriggerOpTypes.CLEAR */
    ),
    forEach: Ct(!0, !1)
  }, s = {
    get(i) {
      return wt(this, i, !0, !0);
    },
    get size() {
      return vt(this, !0);
    },
    has(i) {
      return Et.call(this, i, !0);
    },
    add: Oe(
      "add"
      /* TriggerOpTypes.ADD */
    ),
    set: Oe(
      "set"
      /* TriggerOpTypes.SET */
    ),
    delete: Oe(
      "delete"
      /* TriggerOpTypes.DELETE */
    ),
    clear: Oe(
      "clear"
      /* TriggerOpTypes.CLEAR */
    ),
    forEach: Ct(!0, !0)
  };
  return ["keys", "values", "entries", Symbol.iterator].forEach((i) => {
    e[i] = Ot(i, !1, !1), n[i] = Ot(i, !0, !1), t[i] = Ot(i, !1, !0), s[i] = Ot(i, !0, !0);
  }), [
    e,
    n,
    t,
    s
  ];
}
const [Yr, kr, Xr, Zr] = /* @__PURE__ */ Jr();
function Mn(e, t) {
  const n = t ? e ? Zr : Xr : e ? kr : Yr;
  return (s, r, i) => r === "__v_isReactive" ? !e : r === "__v_isReadonly" ? e : r === "__v_raw" ? s : Reflect.get(S(n, r) && r in s ? n : s, r, i);
}
const Qr = {
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
  return ut(e) ? e : Rn(e, !1, Hs, Qr, Us);
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
function ke(e) {
  return ut(e) ? ke(e.__v_raw) : !!(e && e.__v_isReactive);
}
function ut(e) {
  return !!(e && e.__v_isReadonly);
}
function an(e) {
  return !!(e && e.__v_isShallow);
}
function Ks(e) {
  return ke(e) || ut(e);
}
function j(e) {
  const t = e && e.__v_raw;
  return t ? j(t) : e;
}
function Ls(e) {
  return Nt(e, "__v_skip", !0), e;
}
const Nn = (e) => z(e) ? Fn(e) : e, Sn = (e) => z(e) ? Ds(e) : e;
function ii(e) {
  Pe && le && (e = j(e), Ns(e.dep || (e.dep = Tn())));
}
function oi(e, t) {
  e = j(e);
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
  return ke(e) ? e : new Proxy(e, ci);
}
var Ws;
class fi {
  constructor(t, n, s, r) {
    this._setter = n, this.dep = void 0, this.__v_isRef = !0, this[Ws] = !1, this._dirty = !0, this.effect = new Pn(t, () => {
      this._dirty || (this._dirty = !0, oi(this));
    }), this.effect.computed = this, this.effect.active = this._cacheable = !r, this.__v_isReadonly = s;
  }
  get value() {
    const t = j(this);
    return ii(t), (t._dirty || !t._cacheable) && (t._dirty = !1, t._value = t.effect.run()), t._value;
  }
  set value(t) {
    this._setter(t);
  }
}
Ws = "__v_isReadonly";
function ui(e, t, n = !1) {
  let s, r;
  const i = A(e);
  return i ? (s = e, r = ue) : (s = e.get, r = e.set), new fi(s, r, i || !r, n);
}
function Ie(e, t, n, s) {
  let r;
  try {
    r = s ? e(...s) : e();
  } catch (i) {
    Dt(i, t, n);
  }
  return r;
}
function ae(e, t, n, s) {
  if (A(e)) {
    const i = Ie(e, t, n, s);
    return i && Ts(i) && i.catch((o) => {
      Dt(o, t, n);
    }), i;
  }
  const r = [];
  for (let i = 0; i < e.length; i++)
    r.push(ae(e[i], t, n, s));
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
      Ie(u, null, 10, [e, o, c]);
      return;
    }
  }
  ai(e, n, r, s);
}
function ai(e, t, n, s = !0) {
  console.error(e);
}
let at = !1, dn = !1;
const Y = [];
let me = 0;
const Xe = [];
let be = null, $e = 0;
const Vs = /* @__PURE__ */ Promise.resolve();
let jn = null;
function qs(e) {
  const t = jn || Vs;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function di(e) {
  let t = me + 1, n = Y.length;
  for (; t < n; ) {
    const s = t + n >>> 1;
    dt(Y[s]) < e ? t = s + 1 : n = s;
  }
  return t;
}
function Hn(e) {
  (!Y.length || !Y.includes(e, at && e.allowRecurse ? me + 1 : me)) && (e.id == null ? Y.push(e) : Y.splice(di(e.id), 0, e), Js());
}
function Js() {
  !at && !dn && (dn = !0, jn = Vs.then(ks));
}
function hi(e) {
  const t = Y.indexOf(e);
  t > me && Y.splice(t, 1);
}
function pi(e) {
  P(e) ? Xe.push(...e) : (!be || !be.includes(e, e.allowRecurse ? $e + 1 : $e)) && Xe.push(e), Js();
}
function ns(e, t = at ? me + 1 : 0) {
  for (; t < Y.length; t++) {
    const n = Y[t];
    n && n.pre && (Y.splice(t, 1), t--, n());
  }
}
function Ys(e) {
  if (Xe.length) {
    const t = [...new Set(Xe)];
    if (Xe.length = 0, be) {
      be.push(...t);
      return;
    }
    for (be = t, be.sort((n, s) => dt(n) - dt(s)), $e = 0; $e < be.length; $e++)
      be[$e]();
    be = null, $e = 0;
  }
}
const dt = (e) => e.id == null ? 1 / 0 : e.id, gi = (e, t) => {
  const n = dt(e) - dt(t);
  if (n === 0) {
    if (e.pre && !t.pre)
      return -1;
    if (t.pre && !e.pre)
      return 1;
  }
  return n;
};
function ks(e) {
  dn = !1, at = !0, Y.sort(gi);
  const t = ue;
  try {
    for (me = 0; me < Y.length; me++) {
      const n = Y[me];
      n && n.active !== !1 && Ie(
        n,
        null,
        14
        /* ErrorCodes.SCHEDULER */
      );
    }
  } finally {
    me = 0, Y.length = 0, Ys(), at = !1, jn = null, (Y.length || Xe.length) && ks();
  }
}
function mi(e, t, ...n) {
  if (e.isUnmounted)
    return;
  const s = e.vnode.props || B;
  let r = n;
  const i = t.startsWith("update:"), o = i && t.slice(7);
  if (o && o in s) {
    const m = `${o === "modelValue" ? "model" : o}Modifiers`, { number: w, trim: v } = s[m] || B;
    v && (r = n.map((M) => q(M) ? M.trim() : M)), w && (r = n.map(on));
  }
  let c, u = s[c = Qt(t)] || // also try camelCase event handler (#2249)
  s[c = Qt(ye(t))];
  !u && i && (u = s[c = Qt(oe(t))]), u && ae(u, e, 6, r);
  const d = s[c + "Once"];
  if (d) {
    if (!e.emitted)
      e.emitted = {};
    else if (e.emitted[c])
      return;
    e.emitted[c] = !0, ae(d, e, 6, r);
  }
}
function Xs(e, t, n = !1) {
  const s = t.emitsCache, r = s.get(e);
  if (r !== void 0)
    return r;
  const i = e.emits;
  let o = {}, c = !1;
  if (!A(e)) {
    const u = (d) => {
      const m = Xs(d, t, !0);
      m && (c = !0, k(o, m));
    };
    !n && t.mixins.length && t.mixins.forEach(u), e.extends && u(e.extends), e.mixins && e.mixins.forEach(u);
  }
  return !i && !c ? (z(e) && s.set(e, null), null) : (P(i) ? i.forEach((u) => o[u] = null) : k(o, i), z(e) && s.set(e, o), o);
}
function Kt(e, t) {
  return !e || !Ht(t) ? !1 : (t = t.slice(2).replace(/Once$/, ""), S(e, t[0].toLowerCase() + t.slice(1)) || S(e, oe(t)) || S(e, t));
}
let ce = null, Lt = null;
function St(e) {
  const t = ce;
  return ce = e, Lt = e && e.type.__scopeId || null, t;
}
function _i(e) {
  Lt = e;
}
function bi() {
  Lt = null;
}
function xi(e, t = ce, n) {
  if (!t || e._n)
    return e;
  const s = (...r) => {
    s._d && us(-1);
    const i = St(t);
    let o;
    try {
      o = e(...r);
    } finally {
      St(i), s._d && us(1);
    }
    return o;
  };
  return s._n = !0, s._c = !0, s._d = !0, s;
}
function Gt(e) {
  const { type: t, vnode: n, proxy: s, withProxy: r, props: i, propsOptions: [o], slots: c, attrs: u, emit: d, render: m, renderCache: w, data: v, setupState: M, ctx: D, inheritAttrs: N } = e;
  let X, K;
  const ve = St(e);
  try {
    if (n.shapeFlag & 4) {
      const J = r || s;
      X = ge(m.call(J, J, w, i, M, v, D)), K = u;
    } else {
      const J = t;
      X = ge(J.length > 1 ? J(i, { attrs: u, slots: c, emit: d }) : J(
        i,
        null
        /* we know it doesn't need it */
      )), K = t.props ? u : yi(u);
    }
  } catch (J) {
    ft.length = 0, Dt(
      J,
      e,
      1
      /* ErrorCodes.RENDER_FUNCTION */
    ), X = Ae(ht);
  }
  let R = X;
  if (K && N !== !1) {
    const J = Object.keys(K), { shapeFlag: Ce } = R;
    J.length && Ce & 7 && (o && J.some(En) && (K = wi(K, o)), R = Ze(R, K));
  }
  return n.dirs && (R = Ze(R), R.dirs = R.dirs ? R.dirs.concat(n.dirs) : n.dirs), n.transition && (R.transition = n.transition), X = R, St(ve), X;
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
        const v = m[w];
        if (o[v] !== s[v] && !Kt(d, v))
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
function vi({ vnode: e, parent: t }, n) {
  for (; t && t.subTree === e; )
    (e = t.vnode).el = n, t = t.parent;
}
const Ci = (e) => e.__isSuspense;
function Oi(e, t) {
  t && t.pendingBranch ? P(e) ? t.effects.push(...e) : t.effects.push(e) : pi(e);
}
function Ti(e, t) {
  if (V) {
    let n = V.provides;
    const s = V.parent && V.parent.provides;
    s === n && (n = V.provides = Object.create(s)), n[e] = t;
  }
}
function At(e, t, n = !1) {
  const s = V || ce;
  if (s) {
    const r = s.parent == null ? s.vnode.appContext && s.vnode.appContext.provides : s.parent.provides;
    if (r && e in r)
      return r[e];
    if (arguments.length > 1)
      return n && A(t) ? t.call(s.proxy) : t;
  }
}
const Tt = {};
function en(e, t, n) {
  return Zs(e, t, n);
}
function Zs(e, t, { immediate: n, deep: s, flush: r, onTrack: i, onTrigger: o } = B) {
  const c = Fr() === V?.scope ? V : null;
  let u, d = !1, m = !1;
  if (G(e) ? (u = () => e.value, d = an(e)) : ke(e) ? (u = () => e, s = !0) : P(e) ? (m = !0, d = e.some((R) => ke(R) || an(R)), u = () => e.map((R) => {
    if (G(R))
      return R.value;
    if (ke(R))
      return De(R);
    if (A(R))
      return Ie(
        R,
        c,
        2
        /* ErrorCodes.WATCH_GETTER */
      );
  })) : A(e) ? t ? u = () => Ie(
    e,
    c,
    2
    /* ErrorCodes.WATCH_GETTER */
  ) : u = () => {
    if (!(c && c.isUnmounted))
      return w && w(), ae(e, c, 3, [v]);
  } : u = ue, t && s) {
    const R = u;
    u = () => De(R());
  }
  let w, v = (R) => {
    w = K.onStop = () => {
      Ie(
        R,
        c,
        4
        /* ErrorCodes.WATCH_CLEANUP */
      );
    };
  }, M;
  if (gt)
    if (v = ue, t ? n && ae(t, c, 3, [
      u(),
      m ? [] : void 0,
      v
    ]) : u(), r === "sync") {
      const R = vo();
      M = R.__watcherHandles || (R.__watcherHandles = []);
    } else
      return ue;
  let D = m ? new Array(e.length).fill(Tt) : Tt;
  const N = () => {
    if (K.active)
      if (t) {
        const R = K.run();
        (s || d || (m ? R.some((J, Ce) => Rt(J, D[Ce])) : Rt(R, D))) && (w && w(), ae(t, c, 3, [
          R,
          // pass undefined as the old value when it's changed for the first time
          D === Tt ? void 0 : m && D[0] === Tt ? [] : D,
          v
        ]), D = R);
      } else
        K.run();
  };
  N.allowRecurse = !!t;
  let X;
  r === "sync" ? X = N : r === "post" ? X = () => ee(N, c && c.suspense) : (N.pre = !0, c && (N.id = c.uid), X = () => Hn(N));
  const K = new Pn(u, X);
  t ? n ? N() : D = K.run() : r === "post" ? ee(K.run.bind(K), c && c.suspense) : K.run();
  const ve = () => {
    K.stop(), c && c.scope && vn(c.scope.effects, K);
  };
  return M && M.push(ve), ve;
}
function Pi(e, t, n) {
  const s = this.proxy, r = q(e) ? e.includes(".") ? Qs(s, e) : () => s[e] : e.bind(s, s);
  let i;
  A(t) ? i = t : (i = t.handler, n = t);
  const o = V;
  Qe(this);
  const c = Zs(r, i.bind(s), n);
  return o ? Qe(o) : Le(), c;
}
function Qs(e, t) {
  const n = t.split(".");
  return () => {
    let s = e;
    for (let r = 0; r < n.length && s; r++)
      s = s[n[r]];
    return s;
  };
}
function De(e, t) {
  if (!z(e) || e.__v_skip || (t = t || /* @__PURE__ */ new Set(), t.has(e)))
    return e;
  if (t.add(e), G(e))
    De(e.value, t);
  else if (P(e))
    for (let n = 0; n < e.length; n++)
      De(e[n], t);
  else if (Os(e) || Ye(e))
    e.forEach((n) => {
      De(n, t);
    });
  else if (Is(e))
    for (const n in e)
      De(e[n], t);
  return e;
}
function Gs(e) {
  return A(e) ? { setup: e, name: e.name } : e;
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
    vn(s[t], r);
  }, n);
}
function zt(e, t, n = V, s = !1) {
  if (n) {
    const r = n[e] || (n[e] = []), i = t.__weh || (t.__weh = (...o) => {
      if (n.isUnmounted)
        return;
      Ge(), Qe(n);
      const c = ae(t, n, e, o);
      return Le(), et(), c;
    });
    return s ? r.unshift(i) : r.push(i), i;
  }
}
const Ee = (e) => (t, n = V) => (
  // post-create lifecycle registrations are noops during SSR (except for serverPrefetch)
  (!gt || e === "sp") && zt(e, (...s) => t(...s), n)
), Fi = Ee(
  "bm"
  /* LifecycleHooks.BEFORE_MOUNT */
), Ri = Ee(
  "m"
  /* LifecycleHooks.MOUNTED */
), Ni = Ee(
  "bu"
  /* LifecycleHooks.BEFORE_UPDATE */
), Si = Ee(
  "u"
  /* LifecycleHooks.UPDATED */
), ji = Ee(
  "bum"
  /* LifecycleHooks.BEFORE_UNMOUNT */
), nr = Ee(
  "um"
  /* LifecycleHooks.UNMOUNTED */
), Hi = Ee(
  "sp"
  /* LifecycleHooks.SERVER_PREFETCH */
), Ui = Ee(
  "rtg"
  /* LifecycleHooks.RENDER_TRIGGERED */
), $i = Ee(
  "rtc"
  /* LifecycleHooks.RENDER_TRACKED */
);
function Bi(e, t = V) {
  zt("ec", e, t);
}
function rt(e, t) {
  const n = ce;
  if (n === null)
    return e;
  const s = qt(n) || n.proxy, r = e.dirs || (e.dirs = []);
  for (let i = 0; i < t.length; i++) {
    let [o, c, u, d = B] = t[i];
    o && (A(o) && (o = {
      mounted: o,
      updated: o
    }), o.deep && De(c), r.push({
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
    u && (Ge(), ae(u, n, 8, [
      e.el,
      c,
      e,
      t
    ]), et());
  }
}
const Di = Symbol(), hn = (e) => e ? dr(e) ? qt(e) || e.proxy : hn(e.parent) : null, ct = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ k(/* @__PURE__ */ Object.create(null), {
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
    $watch: (e) => Pi.bind(e)
  })
), tn = (e, t) => e !== B && !e.__isScriptSetup && S(e, t), Ki = {
  get({ _: e }, t) {
    const { ctx: n, setupState: s, data: r, props: i, accessCache: o, type: c, appContext: u } = e;
    let d;
    if (t[0] !== "$") {
      const M = o[t];
      if (M !== void 0)
        switch (M) {
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
        if (r !== B && S(r, t))
          return o[t] = 2, r[t];
        if (
          // only cache other properties when instance has declared (thus stable)
          // props
          (d = e.propsOptions[0]) && S(d, t)
        )
          return o[t] = 3, i[t];
        if (n !== B && S(n, t))
          return o[t] = 4, n[t];
        pn && (o[t] = 0);
      }
    }
    const m = ct[t];
    let w, v;
    if (m)
      return t === "$attrs" && te(e, "get", t), m(e);
    if (
      // css module (injected by vue-loader)
      (w = c.__cssModules) && (w = w[t])
    )
      return w;
    if (n !== B && S(n, t))
      return o[t] = 4, n[t];
    if (
      // global properties
      v = u.config.globalProperties, S(v, t)
    )
      return v[t];
  },
  set({ _: e }, t, n) {
    const { data: s, setupState: r, ctx: i } = e;
    return tn(r, t) ? (r[t] = n, !0) : s !== B && S(s, t) ? (s[t] = n, !0) : S(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (i[t] = n, !0);
  },
  has({ _: { data: e, setupState: t, accessCache: n, ctx: s, appContext: r, propsOptions: i } }, o) {
    let c;
    return !!n[o] || e !== B && S(e, o) || tn(t, o) || (c = i[0]) && S(c, o) || S(s, o) || S(ct, o) || S(r.config.globalProperties, o);
  },
  defineProperty(e, t, n) {
    return n.get != null ? e._.accessCache[t] = 0 : S(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n);
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
    mounted: v,
    beforeUpdate: M,
    updated: D,
    activated: N,
    deactivated: X,
    beforeDestroy: K,
    beforeUnmount: ve,
    destroyed: R,
    unmounted: J,
    render: Ce,
    renderTracked: Jt,
    renderTriggered: mt,
    errorCaptured: Fe,
    serverPrefetch: Yt,
    // public API
    expose: Re,
    inheritAttrs: tt,
    // assets
    components: _t,
    directives: bt,
    filters: kt
  } = t;
  if (d && zi(d, s, null, e.appContext.config.unwrapInjectedRef), o)
    for (const L in o) {
      const U = o[L];
      A(U) && (s[L] = U.bind(n));
    }
  if (r) {
    const L = r.call(n, n);
    z(L) && (e.data = Fn(L));
  }
  if (pn = !0, i)
    for (const L in i) {
      const U = i[L], Ne = A(U) ? U.bind(n, n) : A(U.get) ? U.get.bind(n, n) : ue, xt = !A(U) && A(U.set) ? U.set.bind(n) : ue, Se = wo({
        get: Ne,
        set: xt
      });
      Object.defineProperty(s, L, {
        enumerable: !0,
        configurable: !0,
        get: () => Se.value,
        set: (de) => Se.value = de
      });
    }
  if (c)
    for (const L in c)
      sr(c[L], s, n, L);
  if (u) {
    const L = A(u) ? u.call(n) : u;
    Reflect.ownKeys(L).forEach((U) => {
      Ti(U, L[U]);
    });
  }
  m && rs(
    m,
    e,
    "c"
    /* LifecycleHooks.CREATED */
  );
  function Z(L, U) {
    P(U) ? U.forEach((Ne) => L(Ne.bind(n))) : U && L(U.bind(n));
  }
  if (Z(Fi, w), Z(Ri, v), Z(Ni, M), Z(Si, D), Z(Ii, N), Z(Ai, X), Z(Bi, Fe), Z($i, Jt), Z(Ui, mt), Z(ji, ve), Z(nr, J), Z(Hi, Yt), P(Re))
    if (Re.length) {
      const L = e.exposed || (e.exposed = {});
      Re.forEach((U) => {
        Object.defineProperty(L, U, {
          get: () => n[U],
          set: (Ne) => n[U] = Ne
        });
      });
    } else
      e.exposed || (e.exposed = {});
  Ce && e.render === ue && (e.render = Ce), tt != null && (e.inheritAttrs = tt), _t && (e.components = _t), bt && (e.directives = bt);
}
function zi(e, t, n = ue, s = !1) {
  P(e) && (e = gn(e));
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
  ae(P(e) ? e.map((s) => s.bind(t.proxy)) : e.bind(t.proxy), t, n);
}
function sr(e, t, n, s) {
  const r = s.includes(".") ? Qs(n, s) : () => n[s];
  if (q(e)) {
    const i = t[e];
    A(i) && en(r, i);
  } else if (A(e))
    en(r, e.bind(n));
  else if (z(e))
    if (P(e))
      e.forEach((i) => sr(i, t, n, s));
    else {
      const i = A(e.handler) ? e.handler.bind(n) : t[e.handler];
      A(i) && en(r, i, e);
    }
}
function Un(e) {
  const t = e.type, { mixins: n, extends: s } = t, { mixins: r, optionsCache: i, config: { optionMergeStrategies: o } } = e.appContext, c = i.get(t);
  let u;
  return c ? u = c : !r.length && !n && !s ? u = t : (u = {}, r.length && r.forEach((d) => jt(u, d, o, !0)), jt(u, t, o)), z(t) && i.set(t, u), u;
}
function jt(e, t, n, s = !1) {
  const { mixins: r, extends: i } = t;
  i && jt(e, i, n, !0), r && r.forEach((o) => jt(e, o, n, !0));
  for (const o in t)
    if (!(s && o === "expose")) {
      const c = Wi[o] || n && n[o];
      e[o] = c ? c(e[o], t[o]) : t[o];
    }
  return e;
}
const Wi = {
  data: is,
  props: Ue,
  emits: Ue,
  // objects
  methods: Ue,
  computed: Ue,
  // lifecycle
  beforeCreate: Q,
  created: Q,
  beforeMount: Q,
  mounted: Q,
  beforeUpdate: Q,
  updated: Q,
  beforeDestroy: Q,
  beforeUnmount: Q,
  destroyed: Q,
  unmounted: Q,
  activated: Q,
  deactivated: Q,
  errorCaptured: Q,
  serverPrefetch: Q,
  // assets
  components: Ue,
  directives: Ue,
  // watch
  watch: qi,
  // provide / inject
  provide: is,
  inject: Vi
};
function is(e, t) {
  return t ? e ? function() {
    return k(A(e) ? e.call(this, this) : e, A(t) ? t.call(this, this) : t);
  } : t : e;
}
function Vi(e, t) {
  return Ue(gn(e), gn(t));
}
function gn(e) {
  if (P(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++)
      t[e[n]] = e[n];
    return t;
  }
  return e;
}
function Q(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function Ue(e, t) {
  return e ? k(k(/* @__PURE__ */ Object.create(null), e), t) : t;
}
function qi(e, t) {
  if (!e)
    return t;
  if (!t)
    return e;
  const n = k(/* @__PURE__ */ Object.create(null), e);
  for (const s in t)
    n[s] = Q(e[s], t[s]);
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
  const { props: r, attrs: i, vnode: { patchFlag: o } } = e, c = j(r), [u] = e.propsOptions;
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
        let v = m[w];
        if (Kt(e.emitsOptions, v))
          continue;
        const M = t[v];
        if (u)
          if (S(i, v))
            M !== i[v] && (i[v] = M, d = !0);
          else {
            const D = ye(v);
            r[D] = mn(
              u,
              c,
              D,
              M,
              e,
              !1
              /* isAbsent */
            );
          }
        else
          M !== i[v] && (i[v] = M, d = !0);
      }
    }
  } else {
    rr(e, t, r, i) && (d = !0);
    let m;
    for (const w in c)
      (!t || // for camelCase
      !S(t, w) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((m = oe(w)) === w || !S(t, m))) && (u ? n && // for camelCase
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
        (!t || !S(t, w)) && (delete i[w], d = !0);
  }
  d && we(e, "set", "$attrs");
}
function rr(e, t, n, s) {
  const [r, i] = e.propsOptions;
  let o = !1, c;
  if (t)
    for (let u in t) {
      if (Pt(u))
        continue;
      const d = t[u];
      let m;
      r && S(r, m = ye(u)) ? !i || !i.includes(m) ? n[m] = d : (c || (c = {}))[m] = d : Kt(e.emitsOptions, u) || (!(u in s) || d !== s[u]) && (s[u] = d, o = !0);
    }
  if (i) {
    const u = j(n), d = c || B;
    for (let m = 0; m < i.length; m++) {
      const w = i[m];
      n[w] = mn(r, u, w, d[w], e, !S(d, w));
    }
  }
  return o;
}
function mn(e, t, n, s, r, i) {
  const o = e[n];
  if (o != null) {
    const c = S(o, "default");
    if (c && s === void 0) {
      const u = o.default;
      if (o.type !== Function && A(u)) {
        const { propsDefaults: d } = r;
        n in d ? s = d[n] : (Qe(r), s = d[n] = u.call(null, t), Le());
      } else
        s = u;
    }
    o[
      0
      /* BooleanFlags.shouldCast */
    ] && (i && !c ? s = !1 : o[
      1
      /* BooleanFlags.shouldCastTrue */
    ] && (s === "" || s === oe(n)) && (s = !0));
  }
  return s;
}
function ir(e, t, n = !1) {
  const s = t.propsCache, r = s.get(e);
  if (r)
    return r;
  const i = e.props, o = {}, c = [];
  let u = !1;
  if (!A(e)) {
    const m = (w) => {
      u = !0;
      const [v, M] = ir(w, t, !0);
      k(o, v), M && c.push(...M);
    };
    !n && t.mixins.length && t.mixins.forEach(m), e.extends && m(e.extends), e.mixins && e.mixins.forEach(m);
  }
  if (!i && !u)
    return z(e) && s.set(e, Je), Je;
  if (P(i))
    for (let m = 0; m < i.length; m++) {
      const w = ye(i[m]);
      os(w) && (o[w] = B);
    }
  else if (i)
    for (const m in i) {
      const w = ye(m);
      if (os(w)) {
        const v = i[m], M = o[w] = P(v) || A(v) ? { type: v } : Object.assign({}, v);
        if (M) {
          const D = fs(Boolean, M.type), N = fs(String, M.type);
          M[
            0
            /* BooleanFlags.shouldCast */
          ] = D > -1, M[
            1
            /* BooleanFlags.shouldCastTrue */
          ] = N < 0 || D < N, (D > -1 || S(M, "default")) && c.push(w);
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
  return P(t) ? t.findIndex((n) => cs(n, e)) : A(t) && cs(t, e) ? 0 : -1;
}
const or = (e) => e[0] === "_" || e === "$stable", $n = (e) => P(e) ? e.map(ge) : [ge(e)], ki = (e, t, n) => {
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
    if (A(i))
      t[r] = ki(r, i, s);
    else if (i != null) {
      const o = $n(i);
      t[r] = () => o;
    }
  }
}, cr = (e, t) => {
  const n = $n(t);
  e.slots.default = () => n;
}, Xi = (e, t) => {
  if (e.vnode.shapeFlag & 32) {
    const n = t._;
    n ? (e.slots = j(t), Nt(t, "_", n)) : lr(t, e.slots = {});
  } else
    e.slots = {}, t && cr(e, t);
  Nt(e.slots, Vt, 1);
}, Zi = (e, t, n) => {
  const { vnode: s, slots: r } = e;
  let i = !0, o = B;
  if (s.shapeFlag & 32) {
    const c = t._;
    c ? n && c === 1 ? i = !1 : (k(r, t), !n && c === 1 && delete r._) : (i = !t.$stable, lr(t, r)), o = t;
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
let Qi = 0;
function Gi(e, t) {
  return function(s, r = null) {
    A(s) || (s = Object.assign({}, s)), r != null && !z(r) && (r = null);
    const i = fr(), o = /* @__PURE__ */ new Set();
    let c = !1;
    const u = i.app = {
      _uid: Qi++,
      _component: s,
      _props: r,
      _container: null,
      _context: i,
      _instance: null,
      version: Co,
      get config() {
        return i.config;
      },
      set config(d) {
      },
      use(d, ...m) {
        return o.has(d) || (d && A(d.install) ? (o.add(d), d.install(u, ...m)) : A(d) && (o.add(d), d(u, ...m))), u;
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
          const v = Ae(s, r);
          return v.appContext = i, m && t ? t(v, d) : e(v, d, w), c = !0, u._container = d, d.__vue_app__ = u, qt(v.component) || v.component.proxy;
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
  if (P(e)) {
    e.forEach((v, M) => _n(v, t && (P(t) ? t[M] : t), n, s, r));
    return;
  }
  if (Mt(s) && !r)
    return;
  const i = s.shapeFlag & 4 ? qt(s.component) || s.component.proxy : s.el, o = r ? null : i, { i: c, r: u } = e, d = t && t.r, m = c.refs === B ? c.refs = {} : c.refs, w = c.setupState;
  if (d != null && d !== u && (q(d) ? (m[d] = null, S(w, d) && (w[d] = null)) : G(d) && (d.value = null)), A(u))
    Ie(u, c, 12, [o, m]);
  else {
    const v = q(u), M = G(u);
    if (v || M) {
      const D = () => {
        if (e.f) {
          const N = v ? S(w, u) ? w[u] : m[u] : u.value;
          r ? P(N) && vn(N, i) : P(N) ? N.includes(i) || N.push(i) : v ? (m[u] = [i], S(w, u) && (w[u] = m[u])) : (u.value = [i], e.k && (m[e.k] = u.value));
        } else
          v ? (m[u] = o, S(w, u) && (w[u] = o)) : M && (u.value = o, e.k && (m[e.k] = o));
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
  const { insert: s, remove: r, patchProp: i, createElement: o, createText: c, createComment: u, setText: d, setElementText: m, parentNode: w, nextSibling: v, setScopeId: M = ue, insertStaticContent: D } = e, N = (l, f, a, p = null, h = null, b = null, y = !1, _ = null, x = !!f.dynamicChildren) => {
    if (l === f)
      return;
    l && !it(l, f) && (p = yt(l), de(l, h, b, !0), l = null), f.patchFlag === -2 && (x = !1, f.dynamicChildren = null);
    const { type: g, ref: C, shapeFlag: E } = f;
    switch (g) {
      case Wt:
        X(l, f, a, p);
        break;
      case ht:
        K(l, f, a, p);
        break;
      case nn:
        l == null && ve(f, a, p, y);
        break;
      case xe:
        _t(l, f, a, p, h, b, y, _, x);
        break;
      default:
        E & 1 ? Ce(l, f, a, p, h, b, y, _, x) : E & 6 ? bt(l, f, a, p, h, b, y, _, x) : (E & 64 || E & 128) && g.process(l, f, a, p, h, b, y, _, x, We);
    }
    C != null && h && _n(C, l && l.ref, b, f || l, !f);
  }, X = (l, f, a, p) => {
    if (l == null)
      s(f.el = c(f.children), a, p);
    else {
      const h = f.el = l.el;
      f.children !== l.children && d(h, f.children);
    }
  }, K = (l, f, a, p) => {
    l == null ? s(f.el = u(f.children || ""), a, p) : f.el = l.el;
  }, ve = (l, f, a, p) => {
    [l.el, l.anchor] = D(l.children, f, a, p, l.el, l.anchor);
  }, R = ({ el: l, anchor: f }, a, p) => {
    let h;
    for (; l && l !== f; )
      h = v(l), s(l, a, p), l = h;
    s(f, a, p);
  }, J = ({ el: l, anchor: f }) => {
    let a;
    for (; l && l !== f; )
      a = v(l), r(l), l = a;
    r(f);
  }, Ce = (l, f, a, p, h, b, y, _, x) => {
    y = y || f.type === "svg", l == null ? Jt(f, a, p, h, b, y, _, x) : Yt(l, f, h, b, y, _, x);
  }, Jt = (l, f, a, p, h, b, y, _) => {
    let x, g;
    const { type: C, props: E, shapeFlag: O, transition: T, dirs: F } = l;
    if (x = l.el = o(l.type, b, E && E.is, E), O & 8 ? m(x, l.children) : O & 16 && Fe(l.children, x, null, p, h, b && C !== "foreignObject", y, _), F && je(l, null, p, "created"), mt(x, l, l.scopeId, y, p), E) {
      for (const H in E)
        H !== "value" && !Pt(H) && i(x, H, null, E[H], b, l.children, p, h, _e);
      "value" in E && i(x, "value", null, E.value), (g = E.onVnodeBeforeMount) && pe(g, p, l);
    }
    F && je(l, null, p, "beforeMount");
    const $ = (!h || h && !h.pendingBranch) && T && !T.persisted;
    $ && T.beforeEnter(x), s(x, f, a), ((g = E && E.onVnodeMounted) || $ || F) && ee(() => {
      g && pe(g, p, l), $ && T.enter(x), F && je(l, null, p, "mounted");
    }, h);
  }, mt = (l, f, a, p, h) => {
    if (a && M(l, a), p)
      for (let b = 0; b < p.length; b++)
        M(l, p[b]);
    if (h) {
      let b = h.subTree;
      if (f === b) {
        const y = h.vnode;
        mt(l, y, y.scopeId, y.slotScopeIds, h.parent);
      }
    }
  }, Fe = (l, f, a, p, h, b, y, _, x = 0) => {
    for (let g = x; g < l.length; g++) {
      const C = l[g] = _ ? Te(l[g]) : ge(l[g]);
      N(null, C, f, a, p, h, b, y, _);
    }
  }, Yt = (l, f, a, p, h, b, y) => {
    const _ = f.el = l.el;
    let { patchFlag: x, dynamicChildren: g, dirs: C } = f;
    x |= l.patchFlag & 16;
    const E = l.props || B, O = f.props || B;
    let T;
    a && He(a, !1), (T = O.onVnodeBeforeUpdate) && pe(T, a, f, l), C && je(f, l, a, "beforeUpdate"), a && He(a, !0);
    const F = h && f.type !== "foreignObject";
    if (g ? Re(l.dynamicChildren, g, _, a, p, F, b) : y || U(l, f, _, null, a, p, F, b, !1), x > 0) {
      if (x & 16)
        tt(_, f, E, O, a, p, h);
      else if (x & 2 && E.class !== O.class && i(_, "class", null, O.class, h), x & 4 && i(_, "style", E.style, O.style, h), x & 8) {
        const $ = f.dynamicProps;
        for (let H = 0; H < $.length; H++) {
          const W = $[H], re = E[W], Ve = O[W];
          (Ve !== re || W === "value") && i(_, W, re, Ve, h, l.children, a, p, _e);
        }
      }
      x & 1 && l.children !== f.children && m(_, f.children);
    } else
      !y && g == null && tt(_, f, E, O, a, p, h);
    ((T = O.onVnodeUpdated) || C) && ee(() => {
      T && pe(T, a, f, l), C && je(f, l, a, "updated");
    }, p);
  }, Re = (l, f, a, p, h, b, y) => {
    for (let _ = 0; _ < f.length; _++) {
      const x = l[_], g = f[_], C = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        x.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (x.type === xe || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !it(x, g) || // - In the case of a component, it could contain anything.
        x.shapeFlag & 70) ? w(x.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          a
        )
      );
      N(x, g, C, null, p, h, b, y, !0);
    }
  }, tt = (l, f, a, p, h, b, y) => {
    if (a !== p) {
      if (a !== B)
        for (const _ in a)
          !Pt(_) && !(_ in p) && i(l, _, a[_], null, y, f.children, h, b, _e);
      for (const _ in p) {
        if (Pt(_))
          continue;
        const x = p[_], g = a[_];
        x !== g && _ !== "value" && i(l, _, g, x, y, f.children, h, b, _e);
      }
      "value" in p && i(l, "value", a.value, p.value);
    }
  }, _t = (l, f, a, p, h, b, y, _, x) => {
    const g = f.el = l ? l.el : c(""), C = f.anchor = l ? l.anchor : c("");
    let { patchFlag: E, dynamicChildren: O, slotScopeIds: T } = f;
    T && (_ = _ ? _.concat(T) : T), l == null ? (s(g, a, p), s(C, a, p), Fe(f.children, a, C, h, b, y, _, x)) : E > 0 && E & 64 && O && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    l.dynamicChildren ? (Re(l.dynamicChildren, O, a, h, b, y, _), // #2080 if the stable fragment has a key, it's a <template v-for> that may
    //  get moved around. Make sure all root level vnodes inherit el.
    // #2134 or if it's a component root, it may also get moved around
    // as the component is being moved.
    (f.key != null || h && f === h.subTree) && ur(
      l,
      f,
      !0
      /* shallow */
    )) : U(l, f, a, C, h, b, y, _, x);
  }, bt = (l, f, a, p, h, b, y, _, x) => {
    f.slotScopeIds = _, l == null ? f.shapeFlag & 512 ? h.ctx.activate(f, a, p, y, x) : kt(f, a, p, h, b, y, x) : Kn(l, f, x);
  }, kt = (l, f, a, p, h, b, y) => {
    const _ = l.component = go(l, p, h);
    if (er(l) && (_.ctx.renderer = We), mo(_), _.asyncDep) {
      if (h && h.registerDep(_, Z), !l.el) {
        const x = _.subTree = Ae(ht);
        K(null, x, f, a);
      }
      return;
    }
    Z(_, l, f, a, h, b, y);
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
  }, Z = (l, f, a, p, h, b, y) => {
    const _ = () => {
      if (l.isMounted) {
        let { next: C, bu: E, u: O, parent: T, vnode: F } = l, $ = C, H;
        He(l, !1), C ? (C.el = F.el, L(l, C, y)) : C = F, E && It(E), (H = C.props && C.props.onVnodeBeforeUpdate) && pe(H, T, C, F), He(l, !0);
        const W = Gt(l), re = l.subTree;
        l.subTree = W, N(
          re,
          W,
          // parent may have changed if it's in a teleport
          w(re.el),
          // anchor may have changed if it's in a fragment
          yt(re),
          l,
          h,
          b
        ), C.el = W.el, $ === null && vi(l, W.el), O && ee(O, h), (H = C.props && C.props.onVnodeUpdated) && ee(() => pe(H, T, C, F), h);
      } else {
        let C;
        const { el: E, props: O } = f, { bm: T, m: F, parent: $ } = l, H = Mt(f);
        if (He(l, !1), T && It(T), !H && (C = O && O.onVnodeBeforeMount) && pe(C, $, f), He(l, !0), E && Zt) {
          const W = () => {
            l.subTree = Gt(l), Zt(E, l.subTree, l, h, null);
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
          N(null, W, a, p, l, h, b), f.el = W.el;
        }
        if (F && ee(F, h), !H && (C = O && O.onVnodeMounted)) {
          const W = f;
          ee(() => pe(C, $, W), h);
        }
        (f.shapeFlag & 256 || $ && Mt($.vnode) && $.vnode.shapeFlag & 256) && l.a && ee(l.a, h), l.isMounted = !0, f = a = p = null;
      }
    }, x = l.effect = new Pn(
      _,
      () => Hn(g),
      l.scope
      // track it in component's effect scope
    ), g = l.update = () => x.run();
    g.id = l.uid, He(l, !0), g();
  }, L = (l, f, a) => {
    f.component = l;
    const p = l.vnode.props;
    l.vnode = f, l.next = null, Yi(l, f.props, p, a), Zi(l, f.children, a), Ge(), ns(), et();
  }, U = (l, f, a, p, h, b, y, _, x = !1) => {
    const g = l && l.children, C = l ? l.shapeFlag : 0, E = f.children, { patchFlag: O, shapeFlag: T } = f;
    if (O > 0) {
      if (O & 128) {
        xt(g, E, a, p, h, b, y, _, x);
        return;
      } else if (O & 256) {
        Ne(g, E, a, p, h, b, y, _, x);
        return;
      }
    }
    T & 8 ? (C & 16 && _e(g, h, b), E !== g && m(a, E)) : C & 16 ? T & 16 ? xt(g, E, a, p, h, b, y, _, x) : _e(g, h, b, !0) : (C & 8 && m(a, ""), T & 16 && Fe(E, a, p, h, b, y, _, x));
  }, Ne = (l, f, a, p, h, b, y, _, x) => {
    l = l || Je, f = f || Je;
    const g = l.length, C = f.length, E = Math.min(g, C);
    let O;
    for (O = 0; O < E; O++) {
      const T = f[O] = x ? Te(f[O]) : ge(f[O]);
      N(l[O], T, a, null, h, b, y, _, x);
    }
    g > C ? _e(l, h, b, !0, !1, E) : Fe(f, a, p, h, b, y, _, x, E);
  }, xt = (l, f, a, p, h, b, y, _, x) => {
    let g = 0;
    const C = f.length;
    let E = l.length - 1, O = C - 1;
    for (; g <= E && g <= O; ) {
      const T = l[g], F = f[g] = x ? Te(f[g]) : ge(f[g]);
      if (it(T, F))
        N(T, F, a, null, h, b, y, _, x);
      else
        break;
      g++;
    }
    for (; g <= E && g <= O; ) {
      const T = l[E], F = f[O] = x ? Te(f[O]) : ge(f[O]);
      if (it(T, F))
        N(T, F, a, null, h, b, y, _, x);
      else
        break;
      E--, O--;
    }
    if (g > E) {
      if (g <= O) {
        const T = O + 1, F = T < C ? f[T].el : p;
        for (; g <= O; )
          N(null, f[g] = x ? Te(f[g]) : ge(f[g]), a, F, h, b, y, _, x), g++;
      }
    } else if (g > O)
      for (; g <= E; )
        de(l[g], h, b, !0), g++;
    else {
      const T = g, F = g, $ = /* @__PURE__ */ new Map();
      for (g = F; g <= O; g++) {
        const ne = f[g] = x ? Te(f[g]) : ge(f[g]);
        ne.key != null && $.set(ne.key, g);
      }
      let H, W = 0;
      const re = O - F + 1;
      let Ve = !1, Wn = 0;
      const nt = new Array(re);
      for (g = 0; g < re; g++)
        nt[g] = 0;
      for (g = T; g <= E; g++) {
        const ne = l[g];
        if (W >= re) {
          de(ne, h, b, !0);
          continue;
        }
        let he;
        if (ne.key != null)
          he = $.get(ne.key);
        else
          for (H = F; H <= O; H++)
            if (nt[H - F] === 0 && it(ne, f[H])) {
              he = H;
              break;
            }
        he === void 0 ? de(ne, h, b, !0) : (nt[he - F] = g + 1, he >= Wn ? Wn = he : Ve = !0, N(ne, f[he], a, null, h, b, y, _, x), W++);
      }
      const Vn = Ve ? no(nt) : Je;
      for (H = Vn.length - 1, g = re - 1; g >= 0; g--) {
        const ne = F + g, he = f[ne], qn = ne + 1 < C ? f[ne + 1].el : p;
        nt[g] === 0 ? N(null, he, a, qn, h, b, y, _, x) : Ve && (H < 0 || g !== Vn[H] ? Se(
          he,
          a,
          qn,
          2
          /* MoveType.REORDER */
        ) : H--);
      }
    }
  }, Se = (l, f, a, p, h = null) => {
    const { el: b, type: y, transition: _, children: x, shapeFlag: g } = l;
    if (g & 6) {
      Se(l.component.subTree, f, a, p);
      return;
    }
    if (g & 128) {
      l.suspense.move(f, a, p);
      return;
    }
    if (g & 64) {
      y.move(l, f, a, We);
      return;
    }
    if (y === xe) {
      s(b, f, a);
      for (let E = 0; E < x.length; E++)
        Se(x[E], f, a, p);
      s(l.anchor, f, a);
      return;
    }
    if (y === nn) {
      R(l, f, a);
      return;
    }
    if (p !== 2 && g & 1 && _)
      if (p === 0)
        _.beforeEnter(b), s(b, f, a), ee(() => _.enter(b), h);
      else {
        const { leave: E, delayLeave: O, afterLeave: T } = _, F = () => s(b, f, a), $ = () => {
          E(b, () => {
            F(), T && T();
          });
        };
        O ? O(b, F, $) : $();
      }
    else
      s(b, f, a);
  }, de = (l, f, a, p = !1, h = !1) => {
    const { type: b, props: y, ref: _, children: x, dynamicChildren: g, shapeFlag: C, patchFlag: E, dirs: O } = l;
    if (_ != null && _n(_, null, a, l, !0), C & 256) {
      f.ctx.deactivate(l);
      return;
    }
    const T = C & 1 && O, F = !Mt(l);
    let $;
    if (F && ($ = y && y.onVnodeBeforeUnmount) && pe($, f, l), C & 6)
      gr(l.component, a, p);
    else {
      if (C & 128) {
        l.suspense.unmount(a, p);
        return;
      }
      T && je(l, null, f, "beforeUnmount"), C & 64 ? l.type.remove(l, f, a, h, We, p) : g && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (b !== xe || E > 0 && E & 64) ? _e(g, f, a, !1, !0) : (b === xe && E & 384 || !h && C & 16) && _e(x, f, a), p && Ln(l);
    }
    (F && ($ = y && y.onVnodeUnmounted) || T) && ee(() => {
      $ && pe($, f, l), T && je(l, null, f, "unmounted");
    }, a);
  }, Ln = (l) => {
    const { type: f, el: a, anchor: p, transition: h } = l;
    if (f === xe) {
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
      a = v(l), r(l), l = a;
    r(f);
  }, gr = (l, f, a) => {
    const { bum: p, scope: h, update: b, subTree: y, um: _ } = l;
    p && It(p), h.stop(), b && (b.active = !1, de(y, l, f, a)), _ && ee(_, f), ee(() => {
      l.isUnmounted = !0;
    }, f), f && f.pendingBranch && !f.isUnmounted && l.asyncDep && !l.asyncResolved && l.suspenseId === f.pendingId && (f.deps--, f.deps === 0 && f.resolve());
  }, _e = (l, f, a, p = !1, h = !1, b = 0) => {
    for (let y = b; y < l.length; y++)
      de(l[y], f, a, p, h);
  }, yt = (l) => l.shapeFlag & 6 ? yt(l.component.subTree) : l.shapeFlag & 128 ? l.suspense.next() : v(l.anchor || l.el), zn = (l, f, a) => {
    l == null ? f._vnode && de(f._vnode, null, null, !0) : N(f._vnode || null, l, f, null, null, null, a), ns(), Ys(), f._vnode = l;
  }, We = {
    p: N,
    um: de,
    m: Se,
    r: Ln,
    mt: kt,
    mc: Fe,
    pc: U,
    pbc: Re,
    n: yt,
    o: e
  };
  let Xt, Zt;
  return t && ([Xt, Zt] = t(We)), {
    render: zn,
    hydrate: Xt,
    createApp: Gi(zn, Xt)
  };
}
function He({ effect: e, update: t }, n) {
  e.allowRecurse = t.allowRecurse = n;
}
function ur(e, t, n = !1) {
  const s = e.children, r = t.children;
  if (P(s) && P(r))
    for (let i = 0; i < s.length; i++) {
      const o = s[i];
      let c = r[i];
      c.shapeFlag & 1 && !c.dynamicChildren && ((c.patchFlag <= 0 || c.patchFlag === 32) && (c = r[i] = Te(r[i]), c.el = o.el), n || ur(o, c)), c.type === Wt && (c.el = o.el);
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
const so = (e) => e.__isTeleport, xe = Symbol(void 0), Wt = Symbol(void 0), ht = Symbol(void 0), nn = Symbol(void 0), ft = [];
let fe = null;
function ro(e = !1) {
  ft.push(fe = e ? null : []);
}
function io() {
  ft.pop(), fe = ft[ft.length - 1] || null;
}
let pt = 1;
function us(e) {
  pt += e;
}
function oo(e) {
  return e.dynamicChildren = pt > 0 ? fe || Je : null, io(), pt > 0 && fe && fe.push(e), e;
}
function lo(e, t, n, s, r, i) {
  return oo(I(
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
function it(e, t) {
  return e.type === t.type && e.key === t.key;
}
const Vt = "__vInternal", ar = ({ key: e }) => e ?? null, Ft = ({ ref: e, ref_key: t, ref_for: n }) => e != null ? q(e) || G(e) || A(e) ? { i: ce, r: e, k: t, f: !!n } : e : null;
function I(e, t = null, n = null, s = 0, r = null, i = e === xe ? 0 : 1, o = !1, c = !1) {
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
    ctx: ce
  };
  return c ? (Bn(u, n), i & 128 && e.normalize(u)) : n && (u.shapeFlag |= q(n) ? 8 : 16), pt > 0 && // avoid a block node from tracking itself
  !o && // has current parent block
  fe && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (u.patchFlag > 0 || i & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  u.patchFlag !== 32 && fe.push(u), u;
}
const Ae = fo;
function fo(e, t = null, n = null, s = 0, r = null, i = !1) {
  if ((!e || e === Di) && (e = ht), co(e)) {
    const c = Ze(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return n && Bn(c, n), pt > 0 && !i && fe && (c.shapeFlag & 6 ? fe[fe.indexOf(e)] = c : fe.push(c)), c.patchFlag |= -2, c;
  }
  if (yo(e) && (e = e.__vccOpts), t) {
    t = uo(t);
    let { class: c, style: u } = t;
    c && !q(c) && (t.class = wn(c)), z(u) && (Ks(u) && !P(u) && (u = k({}, u)), t.style = yn(u));
  }
  const o = q(e) ? 1 : Ci(e) ? 128 : so(e) ? 64 : z(e) ? 4 : A(e) ? 2 : 0;
  return I(e, t, n, s, r, o, i, !0);
}
function uo(e) {
  return e ? Ks(e) || Vt in e ? k({}, e) : e : null;
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
      n && r ? P(r) ? r.concat(Ft(t)) : [r, Ft(t)] : Ft(t)
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
    patchFlag: t && e.type !== xe ? i === -1 ? 16 : i | 16 : i,
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
function se(e = " ", t = 0) {
  return Ae(Wt, null, e, t);
}
function ge(e) {
  return e == null || typeof e == "boolean" ? Ae(ht) : P(e) ? Ae(
    xe,
    null,
    // #3666, avoid reference pollution when reusing vnode
    e.slice()
  ) : typeof e == "object" ? Te(e) : Ae(Wt, null, String(e));
}
function Te(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : Ze(e);
}
function Bn(e, t) {
  let n = 0;
  const { shapeFlag: s } = e;
  if (t == null)
    t = null;
  else if (P(t))
    n = 16;
  else if (typeof t == "object")
    if (s & 65) {
      const r = t.default;
      r && (r._c && (r._d = !1), Bn(e, r()), r._c && (r._d = !0));
      return;
    } else {
      n = 32;
      const r = t._;
      !r && !(Vt in t) ? t._ctx = ce : r === 3 && ce && (ce.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else
    A(t) ? (t = { default: t, _ctx: ce }, n = 32) : (t = String(t), s & 64 ? (n = 16, t = [se(t)]) : n = 8);
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
        o && i !== o && !(P(i) && i.includes(o)) && (t[r] = i ? [].concat(i, o) : o);
      } else
        r !== "" && (t[r] = s[r]);
  }
  return t;
}
function pe(e, t, n, s = null) {
  ae(e, t, 7, [
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
    emitsOptions: Xs(s, r),
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
}, Le = () => {
  V && V.scope.off(), V = null;
};
function dr(e) {
  return e.vnode.shapeFlag & 4;
}
let gt = !1;
function mo(e, t = !1) {
  gt = t;
  const { props: n, children: s } = e.vnode, r = dr(e);
  Ji(e, n, r, t), Xi(e, s);
  const i = r ? _o(e, t) : void 0;
  return gt = !1, i;
}
function _o(e, t) {
  const n = e.type;
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = Ls(new Proxy(e.ctx, Ki));
  const { setup: s } = n;
  if (s) {
    const r = e.setupContext = s.length > 1 ? xo(e) : null;
    Qe(e), Ge();
    const i = Ie(s, e, 0, [e.props, r]);
    if (et(), Le(), Ts(i)) {
      if (i.then(Le, Le), t)
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
  A(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : z(t) && (e.setupState = zs(t)), hr(e, n);
}
let ds;
function hr(e, t, n) {
  const s = e.type;
  if (!e.render) {
    if (!t && ds && !s.render) {
      const r = s.template || Un(e).template;
      if (r) {
        const { isCustomElement: i, compilerOptions: o } = e.appContext.config, { delimiters: c, compilerOptions: u } = s, d = k(k({
          isCustomElement: i,
          delimiters: c
        }, o), u);
        s.render = ds(r, d);
      }
    }
    e.render = s.render || ue;
  }
  Qe(e), Ge(), Li(e), et(), Le();
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
        if (n in ct)
          return ct[n](e);
      },
      has(t, n) {
        return n in t || n in ct;
      }
    }));
}
function yo(e) {
  return A(e) && "__vccOpts" in e;
}
const wo = (e, t) => ui(e, t, gt), Eo = Symbol(""), vo = () => At(Eo), Co = "3.2.47", Oo = "http://www.w3.org/2000/svg", Be = typeof document < "u" ? document : null, hs = Be && /* @__PURE__ */ Be.createElement("template"), To = {
  insert: (e, t, n) => {
    t.insertBefore(e, n || null);
  },
  remove: (e) => {
    const t = e.parentNode;
    t && t.removeChild(e);
  },
  createElement: (e, t, n, s) => {
    const r = t ? Be.createElementNS(Oo, e) : Be.createElement(e, n ? { is: n } : void 0);
    return e === "select" && s && s.multiple != null && r.setAttribute("multiple", s.multiple), r;
  },
  createText: (e) => Be.createTextNode(e),
  createComment: (e) => Be.createComment(e),
  setText: (e, t) => {
    e.nodeValue = t;
  },
  setElementText: (e, t) => {
    e.textContent = t;
  },
  parentNode: (e) => e.parentNode,
  nextSibling: (e) => e.nextSibling,
  querySelector: (e) => Be.querySelector(e),
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
function Po(e, t, n) {
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
  if (P(n))
    n.forEach((s) => bn(e, t, s));
  else if (n == null && (n = ""), t.startsWith("--"))
    e.setProperty(t, n);
  else {
    const s = Ao(e, t);
    ps.test(n) ? e.setProperty(oe(s), n.replace(ps, ""), "important") : e[s] = n;
  }
}
const gs = ["Webkit", "Moz", "ms"], sn = {};
function Ao(e, t) {
  const n = sn[t];
  if (n)
    return n;
  let s = ye(t);
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
    n == null || i && !vs(n) ? e.removeAttribute(t) : e.setAttribute(t, i ? "" : n);
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
    u === "boolean" ? n = vs(n) : n == null && u === "string" ? (n = "", c = !0) : u === "number" && (n = 0, c = !0);
  }
  try {
    e[t] = n;
  } catch {
  }
  c && e.removeAttribute(t);
}
function qe(e, t, n, s) {
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
    const [c, u] = So(t);
    if (s) {
      const d = i[t] = Uo(s, r);
      qe(e, c, d, u);
    } else
      o && (Ro(e, c, o, u), i[t] = void 0);
  }
}
const _s = /(?:Once|Passive|Capture)$/;
function So(e) {
  let t;
  if (_s.test(e)) {
    t = {};
    let s;
    for (; s = e.match(_s); )
      e = e.slice(0, e.length - s[0].length), t[s[0].toLowerCase()] = !0;
  }
  return [e[2] === ":" ? e.slice(3) : oe(e.slice(2)), t];
}
let rn = 0;
const jo = /* @__PURE__ */ Promise.resolve(), Ho = () => rn || (jo.then(() => rn = 0), rn = Date.now());
function Uo(e, t) {
  const n = (s) => {
    if (!s._vts)
      s._vts = Date.now();
    else if (s._vts <= n.attached)
      return;
    ae($o(s, n.value), t, 5, [s]);
  };
  return n.value = e, n.attached = Ho(), n;
}
function $o(e, t) {
  if (P(t)) {
    const n = e.stopImmediatePropagation;
    return e.stopImmediatePropagation = () => {
      n.call(e), e._stopped = !0;
    }, t.map((s) => (r) => !r._stopped && s && s(r));
  } else
    return t;
}
const bs = /^on[a-z]/, Bo = (e, t, n, s, r = !1, i, o, c, u) => {
  t === "class" ? Po(e, s, r) : t === "style" ? Io(e, n, s) : Ht(t) ? En(t) || No(e, t, n, s, o) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : Do(e, t, s, r)) ? Fo(e, t, s, i, o, c, u) : (t === "true-value" ? e._trueValue = s : t === "false-value" && (e._falseValue = s), Mo(e, t, s, r));
};
function Do(e, t, n, s) {
  return s ? !!(t === "innerHTML" || t === "textContent" || t in e && bs.test(t) && A(n)) : t === "spellcheck" || t === "draggable" || t === "translate" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA" || bs.test(t) && q(n) ? !1 : t in e;
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
      if (i && !P(i))
        for (const u in i) {
          const d = i[u];
          (d === Number || d && d.type === Number) && (u in this._props && (this._props[u] = Jn(this._props[u])), (c || (c = /* @__PURE__ */ Object.create(null)))[ye(u)] = !0);
        }
      this._numberProps = c, r && this._resolveProps(s), this._applyStyles(o), this._update();
    }, n = this._def.__asyncLoader;
    n ? n().then((s) => t(s, !0)) : t(this._def);
  }
  _resolveProps(t) {
    const { props: n } = t, s = P(n) ? n : Object.keys(n || {});
    for (const r of Object.keys(this))
      r[0] !== "_" && s.includes(r) && this._setProp(r, this[r], !0, !1);
    for (const r of s.map(ye))
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
    const s = ye(t);
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
    n !== this._props[t] && (this._props[t] = n, r && this._instance && this._update(), s && (n === !0 ? this.setAttribute(oe(t), "") : typeof n == "string" || typeof n == "number" ? this.setAttribute(oe(t), n + "") : n || this.removeAttribute(oe(t))));
  }
  _update() {
    Es(this._createVNode(), this.shadowRoot);
  }
  _createVNode() {
    const t = Ae(this._def, k({}, this._props));
    return this._instance || (t.ce = (n) => {
      this._instance = n, n.isCE = !0;
      const s = (i, o) => {
        this.dispatchEvent(new CustomEvent(i, {
          detail: o
        }));
      };
      n.emit = (i, ...o) => {
        s(i, o), oe(i) !== i && s(oe(i), o);
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
  return P(t) ? (n) => It(t, n) : t;
};
function zo(e) {
  e.target.composing = !0;
}
function ys(e) {
  const t = e.target;
  t.composing && (t.composing = !1, t.dispatchEvent(new Event("input")));
}
const ot = {
  created(e, { modifiers: { lazy: t, trim: n, number: s } }, r) {
    e._assign = xs(r);
    const i = s || r.props && r.props.type === "number";
    qe(e, t ? "change" : "input", (o) => {
      if (o.target.composing)
        return;
      let c = e.value;
      n && (c = c.trim()), i && (c = on(c)), e._assign(c);
    }), n && qe(e, "change", () => {
      e.value = e.value.trim();
    }), t || (qe(e, "compositionstart", zo), qe(e, "compositionend", ys), qe(e, "change", ys));
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
}, Wo = /* @__PURE__ */ k({ patchProp: Bo }, To);
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
      tel: "",
      mail: ""
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
}), Jo = `.v-mail-signature-generator[data-v-28d25e1c]{--wcm-line-height: 20px;--wcm-font-size: 18px;max-width:30em;font-family:sans-serif;min-height:calc(100vh - 200px);padding-bottom:var(--wcm-line-height);font-size:var(--wcm-font-size);line-height:var(--wcm-line-height);margin:auto}.v-mail-signature-generator .v-mail-signature-generator__container[data-v-28d25e1c]{padding:var(--wcm-line-height);margin-bottom:var(--wcm-line-height);background:white}.v-mail-signature-generator .v-mail-signature-generator__container>*[data-v-28d25e1c]::-moz-selection{color:#20b2aa;background:#b0fdf6}.v-mail-signature-generator .v-mail-signature-generator__container>*[data-v-28d25e1c] ::selection{color:#20b2aa;background:#b0fdf6}.v-mail-signature-generator .v-mail-signature-generator__container>table[data-v-28d25e1c]{pointer-events:none}h1[data-v-28d25e1c]{font-size:calc(var(--wcm-font-size) * 2);line-height:calc(var(--wcm-line-height) * 2)}.v-mail-signature-generator__child-no-margin>*[data-v-28d25e1c]:first-child{margin-top:0}.v-mail-signature-generator__child-no-margin>*[data-v-28d25e1c]:last-child{margin-bottom:0}.fp-grid-container[data-v-28d25e1c],.fp-ui-form[data-v-28d25e1c]{display:flex;flex-wrap:wrap}.fp-ui-form>input[data-v-28d25e1c]{all:unset;display:block;position:relative;width:100%;cursor:pointer;box-sizing:border-box;box-shadow:inset 0 0 0 2px currentColor;padding:calc(var(--wcm-line-height) / 2);margin-bottom:var(--wcm-line-height)}.fp-grid-coll-24-24[data-v-28d25e1c]{width:100%}.fp-ui-button[data-v-28d25e1c]{all:unset;line-height:var(--wcm-line-height);font-size:var(--wcm-font-size);font-weight:400;margin:0 auto;cursor:pointer;display:block;box-sizing:border-box;box-shadow:inset 0 0 0 2px currentColor;padding:calc(var(--wcm-line-height) / 2) calc(var(--wcm-line-height))}
`, Yo = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [s, r] of t)
    n[s] = r;
  return n;
}, ze = (e) => (_i("data-v-28d25e1c"), e = e(), bi(), e), ko = { class: "v-mail-signature-generator" }, Xo = { class: "fp-grid-container" }, Zo = { class: "fp-grid-coll-24-24 v-mail-signature-generator__child-no-margin" }, Qo = /* @__PURE__ */ ze(() => /* @__PURE__ */ I("h1", null, [
  /* @__PURE__ */ se("Générateur"),
  /* @__PURE__ */ I("br"),
  /* @__PURE__ */ se("de signature mail pour"),
  /* @__PURE__ */ I("br"),
  /* @__PURE__ */ se("la Fondation Modus")
], -1)), Go = { class: "v-mail-signature-generator__content fp-ui-form" }, el = {
  dir: "ltr",
  ref: "htmlContent",
  style: { width: "100%" }
}, tl = { style: { width: "100%", "font-family": "Helvetica, Arial, sans-serif", "font-size": "12px", "line-height": "15px", color: "black" } }, nl = {
  height: "auto",
  style: { "font-family": "Helvetica, Arial, sans-serif", "font-size": "12px", "line-height": "15px", color: "rgb(53, 113, 101)", padding: "0" }
}, sl = /* @__PURE__ */ ze(() => /* @__PURE__ */ I("br", null, null, -1)), rl = /* @__PURE__ */ ze(() => /* @__PURE__ */ I("tr", null, [
  /* @__PURE__ */ I("td", {
    height: "auto",
    style: { "font-family": "Helvetica, Arial, sans-serif", "font-size": "12px", "line-height": "15px", "font-weight": "normal", padding: "15px 0 0", color: "rgb(53, 113, 101)" }
  }, [
    /* @__PURE__ */ I("strong", null, [
      /* @__PURE__ */ se("Fondation MODUS, "),
      /* @__PURE__ */ I("br"),
      /* @__PURE__ */ se("pour une mobilité durable à Genève")
    ])
  ])
], -1)), il = /* @__PURE__ */ ze(() => /* @__PURE__ */ I("tr", null, [
  /* @__PURE__ */ I("td", {
    height: "auto",
    style: { "font-family": "Helvetica, Arial, sans-serif", padding: "0", "line-height": "15px", "font-size": "12px", color: "black" }
  }, [
    /* @__PURE__ */ se(" Route de la Galaise 17 "),
    /* @__PURE__ */ I("br"),
    /* @__PURE__ */ se("1228 Plan-les-Ouates ")
  ])
], -1)), ol = {
  height: "auto",
  style: { "font-family": "Helvetica, Arial, sans-serif", padding: "15px 0 0", "line-height": "15px", "font-size": "12px", color: "black" }
}, ll = ["href"], cl = /* @__PURE__ */ ze(() => /* @__PURE__ */ I("br", null, null, -1)), fl = ["href"], ul = /* @__PURE__ */ ze(() => /* @__PURE__ */ I("tr", null, [
  /* @__PURE__ */ I("td", {
    border: "0",
    cellpadding: "0",
    cellspacing: "0",
    style: { padding: "15px 0 0", border: "0", height: "45px", width: "145px", "max-width": "145px" }
  }, [
    /* @__PURE__ */ I("img", {
      alt: "logo modus",
      style: { height: "45px", margin: "0", width: "145px", "max-width": "145px", display: "block" },
      height: "45",
      width: "145",
      src: "https://villa1203.github.io/roso.modus.mailSignature/modus_logo.png"
    })
  ])
], -1)), al = /* @__PURE__ */ ze(() => /* @__PURE__ */ I("p", null, [
  /* @__PURE__ */ se(" Une fois le texte sélectionné (le texte devient vert quand il est sélectionné), copiez-le et collez-le dans votre "),
  /* @__PURE__ */ I("br"),
  /* @__PURE__ */ se("outil de messagerie mail, dans les paramètres de signatures automatiques. ")
], -1));
function dl(e, t, n, s, r, i) {
  return ro(), lo("div", ko, [
    I("div", Xo, [
      I("div", Zo, [
        Qo,
        I("form", Go, [
          rt(I("input", {
            type: "text",
            placeholder: "prénom",
            "onUpdate:modelValue": t[0] || (t[0] = (o) => e.firstname = o)
          }, null, 512), [
            [ot, e.firstname]
          ]),
          rt(I("input", {
            type: "text",
            placeholder: "nom",
            "onUpdate:modelValue": t[1] || (t[1] = (o) => e.name = o)
          }, null, 512), [
            [ot, e.name]
          ]),
          rt(I("input", {
            type: "text",
            placeholder: "fonction",
            "onUpdate:modelValue": t[2] || (t[2] = (o) => e.activity = o)
          }, null, 512), [
            [ot, e.activity]
          ]),
          rt(I("input", {
            type: "text",
            placeholder: "numéro",
            "onUpdate:modelValue": t[3] || (t[3] = (o) => e.tel = o)
          }, null, 512), [
            [ot, e.tel]
          ]),
          rt(I("input", {
            type: "text",
            placeholder: "mail",
            "onUpdate:modelValue": t[4] || (t[4] = (o) => e.mail = o)
          }, null, 512), [
            [ot, e.mail]
          ])
        ]),
        I("div", {
          onClick: t[5] || (t[5] = (...o) => e.copySignatureInClipBoard && e.copySignatureInClipBoard(...o)),
          class: "v-mail-signature-generator__container"
        }, [
          I("div", el, [
            I("table", tl, [
              I("tbody", null, [
                I("tr", null, [
                  I("td", nl, [
                    I("strong", null, [
                      se(st(e.getCleanedEmptyString(e.firstname, "Votre prénom")) + " " + st(e.getCleanedEmptyString(e.name, "/ Votre nom")) + " ", 1),
                      sl,
                      se(" " + st(e.getCleanedEmptyString(e.activity, "Votre fonction")), 1)
                    ])
                  ])
                ]),
                rl,
                il,
                I("tr", null, [
                  I("td", ol, [
                    I("a", {
                      href: "tel:" + e.tel,
                      style: { "text-decoration": "none", color: "black" }
                    }, "T " + st(e.getCleanedEmptyString(e.tel, "Votre numéro")), 9, ll),
                    cl,
                    I("a", {
                      href: "mailto:" + e.mail,
                      style: { "text-decoration": "none", color: "black" }
                    }, st(e.getCleanedEmptyString(e.mail, "Votre adresse mail")), 9, fl)
                  ])
                ]),
                ul
              ])
            ])
          ], 512)
        ]),
        I("button", {
          onClick: t[6] || (t[6] = (...o) => e.copySignatureInClipBoard && e.copySignatureInClipBoard(...o)),
          class: "fp-ui-button"
        }, "Sélectionner le texte de signature"),
        al
      ])
    ])
  ]);
}
const hl = /* @__PURE__ */ Yo(qo, [["render", dl], ["styles", [Jo]], ["__scopeId", "data-v-28d25e1c"]]);
function pl() {
  customElements.define("mail-signature", Ko(hl));
}
export {
  pl as register
};
//# sourceMappingURL=index.js.map
