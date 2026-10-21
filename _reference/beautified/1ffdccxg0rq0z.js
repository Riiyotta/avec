(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["object" == typeof document ? document.currentScript : void 0, 57512, (e) => {
  "use strict";
  var t = e.i(71645);
  let r = ["utm_", "af_", "deep_link_"], n = /* @__PURE__ */ new Set(["pid", "c"]);
  e.s(["TrackingParamsCleaner", 0, function() {
    return (0, t.useEffect)(() => {
      let e2 = new URL(window.location.href), t2 = false;
      for (let o of Array.from(e2.searchParams.keys())) (n.has(o) || r.some((e3) => o.startsWith(e3))) && (e2.searchParams.delete(o), t2 = true);
      t2 && window.history.replaceState(window.history.state, "", e2.pathname + (e2.search ? e2.search : "") + e2.hash);
    }, []), null;
  }]);
}, 59297, (e) => {
  "use strict";
  var t = e.i(43476), r = e.i(4570), n = e.i(20565);
  e.s(["PostHogProvider", 0, function({ children: e2 }) {
    return (0, t.jsx)(n.PostHogProvider, { client: r.default, children: e2 });
  }]);
}, 48378, (e) => {
  "use strict";
  var t = e.i(43476), r = e.i(71645), n = e.i(96951);
  let o = (0, r.createContext)({ isAndroid: false, isIPhone: false, isOutsideNorthAmerica: false, country: null });
  e.s(["DeviceProvider", 0, function({ children: e2, country: a, userAgent: l }) {
    let u = (0, r.useMemo)(() => {
      let e3 = /android/i.test(l ?? ""), t2 = (0, n.isOutsideAppStoreTerritories)(a);
      return { isAndroid: e3, isIPhone: /ip(hone|od)/i.test(l ?? ""), isOutsideNorthAmerica: t2, country: a };
    }, [a, l]);
    return (0, t.jsx)(o.Provider, { value: u, children: e2 });
  }, "useDevice", 0, function() {
    return (0, r.useContext)(o);
  }], 48378);
}, 96951, (e) => {
  "use strict";
  let t = /* @__PURE__ */ new Set(["US", "CA"]), r = /* @__PURE__ */ new Set(["XX", "T1"]);
  e.s(["TESTFLIGHT_URL", 0, "https://testflight.apple.com/join/3JR2HxjZ", "isOutsideAppStoreTerritories", 0, function(e2) {
    return !(null === e2 || r.has(e2)) && !t.has(e2);
  }]);
}, 28298, (e, t, r) => {
  "use strict";
  e.i(47167), Object.defineProperty(r, "__esModule", { value: true }), Object.defineProperty(r, "useRouterBFCache", { enumerable: true, get: function() {
    return o;
  } });
  let n = e.r(71645);
  function o(e2, t2, r2) {
    let [o2, a] = (0, n.useState)(() => ({ tree: e2, cacheNode: t2, stateKey: r2, next: null }));
    if (o2.tree === e2) return o2;
    let l = { tree: e2, cacheNode: t2, stateKey: r2, next: null }, u = 1, i = o2, s = l;
    for (; null !== i && u < 1; ) {
      if (i.stateKey === r2) {
        s.next = i.next;
        break;
      }
      {
        u++;
        let e3 = { tree: i.tree, cacheNode: i.cacheNode, stateKey: i.stateKey, next: null };
        s.next = e3, s = e3;
      }
      i = i.next;
    }
    return a(l), l;
  }
  ("function" == typeof r.default || "object" == typeof r.default && null !== r.default) && void 0 === r.default.__esModule && (Object.defineProperty(r.default, "__esModule", { value: true }), Object.assign(r.default, r), t.exports = r.default);
}, 47257, (e, t, r) => {
  "use strict";
  Object.defineProperty(r, "__esModule", { value: true }), Object.defineProperty(r, "ClientPageRoot", { enumerable: true, get: function() {
    return s;
  } });
  let n = e.r(43476), o = e.r(8372), a = e.r(71645), l = e.r(33906), u = e.r(61994), i = e.r(15783);
  function s({ Component: e2, serverProvidedParams: t2 }) {
    let r2, d;
    if (null !== t2) r2 = t2.searchParams, d = t2.params;
    else {
      let e3 = (0, a.use)(o.LayoutRouterContext);
      d = null !== e3 ? e3.parentParams : {}, r2 = (0, l.urlSearchParamsToParsedUrlQuery)((0, a.use)(u.SearchParamsContext));
    }
    let c = (0, i.createClientSearchParams)(r2), f = (0, i.createClientParams)(d);
    return (0, n.jsx)(e2, { params: f, searchParams: c });
  }
  ("function" == typeof r.default || "object" == typeof r.default && null !== r.default) && void 0 === r.default.__esModule && (Object.defineProperty(r.default, "__esModule", { value: true }), Object.assign(r.default, r), t.exports = r.default);
}, 92825, (e, t, r) => {
  "use strict";
  Object.defineProperty(r, "__esModule", { value: true }), Object.defineProperty(r, "ClientSegmentRoot", { enumerable: true, get: function() {
    return u;
  } });
  let n = e.r(43476), o = e.r(8372), a = e.r(71645), l = e.r(15783);
  function u({ Component: e2, slots: t2, serverProvidedParams: r2 }) {
    let i;
    if (null !== r2) i = r2.params;
    else {
      let e3 = (0, a.use)(o.LayoutRouterContext);
      i = null !== e3 ? e3.parentParams : {};
    }
    let s = (0, l.createClientParams)(i);
    return (0, n.jsx)(e2, { ...t2, params: s });
  }
  ("function" == typeof r.default || "object" == typeof r.default && null !== r.default) && void 0 === r.default.__esModule && (Object.defineProperty(r.default, "__esModule", { value: true }), Object.assign(r.default, r), t.exports = r.default);
}, 68017, (e, t, r) => {
  "use strict";
  e.i(47167), Object.defineProperty(r, "__esModule", { value: true }), Object.defineProperty(r, "HTTPAccessFallbackBoundary", { enumerable: true, get: function() {
    return d;
  } });
  let n = e.r(90809), o = e.r(43476), a = n._(e.r(71645)), l = e.r(90373), u = e.r(54394), i = e.r(8372);
  class s extends a.default.Component {
    constructor(e2) {
      super(e2), this.state = { triggeredStatus: void 0, previousPathname: e2.pathname };
    }
    componentDidCatch() {
    }
    static getDerivedStateFromError(e2) {
      if ((0, u.isHTTPAccessFallbackError)(e2)) return { triggeredStatus: (0, u.getAccessFallbackHTTPStatus)(e2) };
      throw e2;
    }
    static getDerivedStateFromProps(e2, t2) {
      return e2.pathname !== t2.previousPathname && t2.triggeredStatus ? { triggeredStatus: void 0, previousPathname: e2.pathname } : { triggeredStatus: t2.triggeredStatus, previousPathname: e2.pathname };
    }
    render() {
      let { notFound: e2, forbidden: t2, unauthorized: r2, children: n2 } = this.props, { triggeredStatus: a2 } = this.state, l2 = { [u.HTTPAccessErrorStatus.NOT_FOUND]: e2, [u.HTTPAccessErrorStatus.FORBIDDEN]: t2, [u.HTTPAccessErrorStatus.UNAUTHORIZED]: r2 };
      if (a2) {
        let i2 = a2 === u.HTTPAccessErrorStatus.NOT_FOUND && e2, s2 = a2 === u.HTTPAccessErrorStatus.FORBIDDEN && t2, d2 = a2 === u.HTTPAccessErrorStatus.UNAUTHORIZED && r2;
        return i2 || s2 || d2 ? (0, o.jsxs)(o.Fragment, { children: [(0, o.jsx)("meta", { name: "robots", content: "noindex" }), false, l2[a2]] }) : n2;
      }
      return n2;
    }
  }
  function d({ notFound: e2, forbidden: t2, unauthorized: r2, children: n2 }) {
    let u2 = (0, l.useUntrackedPathname)(), c = (0, a.useContext)(i.MissingSlotContext);
    return e2 || t2 || r2 ? (0, o.jsx)(s, { pathname: u2, notFound: e2, forbidden: t2, unauthorized: r2, missingSlots: c, children: n2 }) : (0, o.jsx)(o.Fragment, { children: n2 });
  }
  ("function" == typeof r.default || "object" == typeof r.default && null !== r.default) && void 0 === r.default.__esModule && (Object.defineProperty(r.default, "__esModule", { value: true }), Object.assign(r.default, r), t.exports = r.default);
}, 22976, (e, t, r) => {
  "use strict";
  Object.defineProperty(r, "__esModule", { value: true });
  var n = { InstantValidationBoundaryContext: function() {
    return a;
  }, PlaceValidationBoundaryBelowThisLevel: function() {
    return l;
  }, RenderValidationBoundaryAtThisLevel: function() {
    return u;
  }, SlotMarker: function() {
    return i;
  } };
  for (var o in n) Object.defineProperty(r, o, { enumerable: true, get: n[o] });
  let a = null, l = null, u = null, i = null;
  ("function" == typeof r.default || "object" == typeof r.default && null !== r.default) && void 0 === r.default.__esModule && (Object.defineProperty(r.default, "__esModule", { value: true }), Object.assign(r.default, r), t.exports = r.default);
}, 77694, (e, t, r) => {
  "use strict";
  Object.defineProperty(r, "__esModule", { value: true });
  var n = { InstantValidationBoundaryContext: function() {
    return a.InstantValidationBoundaryContext;
  }, PlaceValidationBoundaryBelowThisLevel: function() {
    return a.PlaceValidationBoundaryBelowThisLevel;
  }, RenderValidationBoundaryAtThisLevel: function() {
    return a.RenderValidationBoundaryAtThisLevel;
  }, SlotMarker: function() {
    return a.SlotMarker;
  } };
  for (var o in n) Object.defineProperty(r, o, { enumerable: true, get: n[o] });
  let a = e.r(22976);
  ("function" == typeof r.default || "object" == typeof r.default && null !== r.default) && void 0 === r.default.__esModule && (Object.defineProperty(r.default, "__esModule", { value: true }), Object.assign(r.default, r), t.exports = r.default);
}, 39756, (e, t, r) => {
  "use strict";
  e.i(47167), Object.defineProperty(r, "__esModule", { value: true });
  var n = { LoadingBoundaryProvider: function() {
    return C;
  }, default: function() {
    return T;
  } };
  for (var o in n) Object.defineProperty(r, o, { enumerable: true, get: n[o] });
  let a = e.r(55682), l = e.r(90809), u = e.r(43476), i = l._(e.r(71645)), s = a._(e.r(74080)), d = e.r(8372), c = e.r(1244), f = e.r(72383), p = e.r(91915), h = e.r(58442), y = e.r(68017);
  e.r(77694);
  let m = e.r(70725), v = e.r(28298);
  e.r(74180);
  let b = e.r(61994), P = e.r(33906), _ = e.r(95871);
  s.default.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function g(e2, t2, r2) {
    let n2 = e2.getClientRects();
    if (0 === n2.length) return 0;
    let o2 = 1 / 0;
    for (let e3 = 0; e3 < n2.length; e3++) {
      let t3 = n2[e3];
      t3.top < o2 && (o2 = t3.top);
    }
    return o2 >= r2() && o2 <= t2 ? 1 : 2;
  }
  i.default.Component;
  let j = function(e2) {
    let t2 = i.default.useRef(null);
    return (0, i.useLayoutEffect)(() => {
      let { focusAndScrollRef: r2, cacheNode: n2 } = e2, o2 = r2.forceScroll ? r2.scrollRef : n2.scrollRef;
      if (null === o2 || !o2.current) return;
      let a2 = null, l2 = r2.hashFragment;
      if (l2) {
        var u2;
        if (null === (a2 = "top" === (u2 = l2) ? document.body : document.getElementById(u2) ?? document.getElementsByName(u2)[0] ?? null)) {
          o2.current = false, r2.onlyHashChange = false, r2.hashFragment = null;
          return;
        }
      } else a2 = t2.current;
      if (null === a2) return;
      let i2 = false;
      (0, p.disableSmoothScrollDuringRouteTransition)(() => {
        let e3 = document.documentElement, t3 = null, r3 = null, n3 = null, u3 = () => {
          var r4, o3;
          let a3, l3;
          return null === n3 && (r4 = e3, o3 = t3, n3 = !Number.isFinite(l3 = Number.parseFloat(a3 = getComputedStyle(r4).scrollPaddingTop)) || l3 < 0 ? 0 : a3.endsWith("px") ? l3 : a3.endsWith("%") ? l3 / 100 * o3 : 0), n3;
        };
        (l2 || (t3 = e3.clientHeight, 0 !== (r3 = g(a2, t3, u3)))) && ((i2 = true, o2.current = false, l2) ? a2.scrollIntoView() : 1 !== r3 && (e3.scrollTop = 0, 2 === g(a2, t3, u3) && a2.scrollIntoView()));
      }, { dontForceLayout: true, onlyHashChange: r2.onlyHashChange }), i2 && (r2.onlyHashChange = false, r2.hashFragment = null);
    }, void 0), (0, u.jsx)(i.Fragment, { ref: t2, children: e2.children });
  };
  function O({ children: e2, cacheNode: t2 }) {
    let r2 = (0, i.useContext)(d.GlobalLayoutRouterContext);
    if (!r2) throw Object.defineProperty(Error("invariant global layout router not mounted"), "__NEXT_ERROR_CODE", { value: "E473", enumerable: false, configurable: true });
    return (0, u.jsx)(j, { focusAndScrollRef: r2.focusAndScrollRef, cacheNode: t2, children: e2 });
  }
  function x({ tree: e2, segmentPath: t2, debugNameContext: r2, cacheNode: n2, params: o2, url: a2, isActive: l2 }) {
    let s2, f2 = (0, i.useContext)(d.GlobalLayoutRouterContext);
    if ((0, i.useContext)(b.NavigationPromisesContext), !f2) throw Object.defineProperty(Error("invariant global layout router not mounted"), "__NEXT_ERROR_CODE", { value: "E473", enumerable: false, configurable: true });
    let p2 = null !== n2 ? n2 : (0, i.use)(c.unresolvedThenable), h2 = null !== p2.prefetchRsc ? p2.prefetchRsc : p2.rsc, y2 = (0, i.useDeferredValue)(p2.rsc, h2);
    if ((0, _.isDeferredRsc)(y2)) {
      let e3 = (0, i.use)(y2);
      null === e3 && (0, i.use)(c.unresolvedThenable), s2 = e3;
    } else null === y2 && (0, i.use)(c.unresolvedThenable), s2 = y2;
    let m2 = s2;
    return (0, u.jsx)(d.LayoutRouterContext.Provider, { value: { parentTree: e2, parentCacheNode: p2, parentSegmentPath: t2, parentParams: o2, parentLoadingData: null, debugNameContext: r2, url: a2, isActive: l2 }, children: m2 });
  }
  function C({ loading: e2, children: t2 }) {
    let r2 = (0, i.use)(d.LayoutRouterContext);
    return null === r2 ? t2 : (0, u.jsx)(d.LayoutRouterContext.Provider, { value: { parentTree: r2.parentTree, parentCacheNode: r2.parentCacheNode, parentSegmentPath: r2.parentSegmentPath, parentParams: r2.parentParams, parentLoadingData: e2, debugNameContext: r2.debugNameContext, url: r2.url, isActive: r2.isActive }, children: t2 });
  }
  function S({ name: e2, loading: t2, children: r2 }) {
    if (null !== t2) {
      let n2 = t2[0], o2 = t2[1], a2 = t2[2];
      return (0, u.jsx)(i.Suspense, { name: e2, fallback: (0, u.jsxs)(u.Fragment, { children: [o2, a2, n2] }), children: r2 });
    }
    return (0, u.jsx)(u.Fragment, { children: r2 });
  }
  function T({ parallelRouterKey: e2, error: t2, errorStyles: r2, errorScripts: n2, templateStyles: o2, templateScripts: a2, template: l2, notFound: s2, forbidden: p2, unauthorized: b2, segmentViewBoundaries: _2 }) {
    let g2 = (0, i.useContext)(d.LayoutRouterContext);
    if (!g2) throw Object.defineProperty(Error("invariant expected layout router to be mounted"), "__NEXT_ERROR_CODE", { value: "E56", enumerable: false, configurable: true });
    let { parentTree: j2, parentCacheNode: C2, parentSegmentPath: R, parentParams: E, parentLoadingData: M, url: w, isActive: N, debugNameContext: F } = g2, A = j2[0], H = null === R ? [e2] : R.concat([A, e2]), B = j2[1][e2], k = C2.slots;
    (void 0 === B || null === k) && (0, i.use)(c.unresolvedThenable);
    let D = B[0], L = k[e2] ?? null, K = (0, m.createRouterCacheKey)(D, true), I = (0, v.useRouterBFCache)(B, L, K), U = [];
    do {
      let e3 = I.tree, i2 = I.cacheNode, c2 = I.stateKey, m2 = e3[0], v2 = E;
      if (Array.isArray(m2)) {
        let e4 = m2[0], t3 = m2[1], r3 = m2[2], n3 = (0, P.getParamValueFromCacheKey)(t3, r3);
        null !== n3 && (v2 = { ...E, [e4]: n3 });
      }
      let _3 = function(e4) {
        if ("/" === e4) return "/";
        if ("string" == typeof e4) if ("(__SLOT__)" === e4) return;
        else return e4 + "/";
        return e4[1] + "/";
      }(m2), g3 = _3 ?? F, j3 = void 0 === _3 ? void 0 : F, C3 = (0, u.jsxs)(O, { cacheNode: i2, children: [(0, u.jsx)(f.ErrorBoundary, { errorComponent: t2, errorStyles: r2, errorScripts: n2, children: (0, u.jsx)(S, { name: j3, loading: M, children: (0, u.jsx)(y.HTTPAccessFallbackBoundary, { notFound: s2, forbidden: p2, unauthorized: b2, children: (0, u.jsxs)(h.RedirectBoundary, { children: [(0, u.jsx)(x, { url: w, tree: e3, params: v2, cacheNode: i2, segmentPath: H, debugNameContext: g3, isActive: N && c2 === K }), null] }) }) }) }), null] }), T2 = (0, u.jsxs)(d.TemplateContext.Provider, { value: C3, children: [o2, a2, l2] }, c2);
      U.push(T2), I = I.next;
    } while (null !== I);
    return U;
  }
  ("function" == typeof r.default || "object" == typeof r.default && null !== r.default) && void 0 === r.default.__esModule && (Object.defineProperty(r.default, "__esModule", { value: true }), Object.assign(r.default, r), t.exports = r.default);
}, 37457, (e, t, r) => {
  "use strict";
  Object.defineProperty(r, "__esModule", { value: true }), Object.defineProperty(r, "default", { enumerable: true, get: function() {
    return u;
  } });
  let n = e.r(90809), o = e.r(43476), a = n._(e.r(71645)), l = e.r(8372);
  function u() {
    let e2 = (0, a.useContext)(l.TemplateContext);
    return (0, o.jsx)(o.Fragment, { children: e2 });
  }
  ("function" == typeof r.default || "object" == typeof r.default && null !== r.default) && void 0 === r.default.__esModule && (Object.defineProperty(r.default, "__esModule", { value: true }), Object.assign(r.default, r), t.exports = r.default);
}, 6831, (e, t, r) => {
  "use strict";
  Object.defineProperty(r, "__esModule", { value: true }), Object.defineProperty(r, "createRenderParamsFromClient", { enumerable: true, get: function() {
    return o;
  } });
  let n = /* @__PURE__ */ new WeakMap();
  function o(e2) {
    let t2 = n.get(e2);
    if (t2) return t2;
    let r2 = Promise.resolve(e2);
    return n.set(e2, r2), r2;
  }
  ("function" == typeof r.default || "object" == typeof r.default && null !== r.default) && void 0 === r.default.__esModule && (Object.defineProperty(r.default, "__esModule", { value: true }), Object.assign(r.default, r), t.exports = r.default);
}, 14193, (e, t, r) => {
  "use strict";
  e.i(47167), Object.defineProperty(r, "__esModule", { value: true }), Object.defineProperty(r, "createRenderParamsFromClient", { enumerable: true, get: function() {
    return n;
  } });
  let n = e.r(6831).createRenderParamsFromClient;
  ("function" == typeof r.default || "object" == typeof r.default && null !== r.default) && void 0 === r.default.__esModule && (Object.defineProperty(r.default, "__esModule", { value: true }), Object.assign(r.default, r), t.exports = r.default);
}, 93504, (e, t, r) => {
  "use strict";
  Object.defineProperty(r, "__esModule", { value: true }), Object.defineProperty(r, "createRenderSearchParamsFromClient", { enumerable: true, get: function() {
    return o;
  } });
  let n = /* @__PURE__ */ new WeakMap();
  function o(e2) {
    let t2 = n.get(e2);
    if (t2) return t2;
    let r2 = Promise.resolve(e2);
    return n.set(e2, r2), r2;
  }
  ("function" == typeof r.default || "object" == typeof r.default && null !== r.default) && void 0 === r.default.__esModule && (Object.defineProperty(r.default, "__esModule", { value: true }), Object.assign(r.default, r), t.exports = r.default);
}, 66996, (e, t, r) => {
  "use strict";
  e.i(47167), Object.defineProperty(r, "__esModule", { value: true }), Object.defineProperty(r, "createRenderSearchParamsFromClient", { enumerable: true, get: function() {
    return n;
  } });
  let n = e.r(93504).createRenderSearchParamsFromClient;
  ("function" == typeof r.default || "object" == typeof r.default && null !== r.default) && void 0 === r.default.__esModule && (Object.defineProperty(r.default, "__esModule", { value: true }), Object.assign(r.default, r), t.exports = r.default);
}, 15783, (e, t, r) => {
  "use strict";
  Object.defineProperty(r, "__esModule", { value: true });
  var n = { createClientParams: function() {
    return a.createRenderParamsFromClient;
  }, createClientSearchParams: function() {
    return l.createRenderSearchParamsFromClient;
  } };
  for (var o in n) Object.defineProperty(r, o, { enumerable: true, get: n[o] });
  let a = e.r(14193), l = e.r(66996);
  ("function" == typeof r.default || "object" == typeof r.default && null !== r.default) && void 0 === r.default.__esModule && (Object.defineProperty(r.default, "__esModule", { value: true }), Object.assign(r.default, r), t.exports = r.default);
}, 27201, (e, t, r) => {
  "use strict";
  Object.defineProperty(r, "__esModule", { value: true }), Object.defineProperty(r, "IconMark", { enumerable: true, get: function() {
    return o;
  } });
  let n = e.r(43476), o = () => "u" > typeof window ? null : (0, n.jsx)("meta", { name: "\xABnxt-icon\xBB" });
}, 91915, (e, t, r) => {
  "use strict";
  function n(e2, t2 = {}) {
    if (t2.onlyHashChange) return void e2();
    let r2 = document.documentElement;
    if ("smooth" !== r2.dataset.scrollBehavior) return void e2();
    let o = r2.style.scrollBehavior;
    r2.style.scrollBehavior = "auto", t2.dontForceLayout || r2.getClientRects(), e2(), r2.style.scrollBehavior = o;
  }
  e.i(47167), Object.defineProperty(r, "__esModule", { value: true }), Object.defineProperty(r, "disableSmoothScrollDuringRouteTransition", { enumerable: true, get: function() {
    return n;
  } });
}, 20565, (e) => {
  "use strict";
  var t = e.i(4570), r = e.i(71645), n = (0, r.createContext)({ client: t.default }), o = function(e2, t2) {
    return (o = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e3, t3) {
      e3.__proto__ = t3;
    } || function(e3, t3) {
      for (var r2 in t3) Object.prototype.hasOwnProperty.call(t3, r2) && (e3[r2] = t3[r2]);
    })(e2, t2);
  };
  "function" == typeof SuppressedError && SuppressedError;
  var a = function(e2) {
    return "function" == typeof e2;
  }, l = { componentStack: null, exceptionEvent: null, error: null };
  !function(e2) {
    if ("function" != typeof e2 && null !== e2) throw TypeError("Class extends value " + String(e2) + " is not a constructor or null");
    function t2() {
      this.constructor = u;
    }
    function u(t3) {
      var r2 = e2.call(this, t3) || this;
      return r2.state = l, r2;
    }
    o(u, e2), u.prototype = null === e2 ? Object.create(e2) : (t2.prototype = e2.prototype, new t2()), u.prototype.componentDidCatch = function(e3, t3) {
      var r2, n2 = this.props.additionalProperties;
      a(n2) ? r2 = n2(e3) : "object" == typeof n2 && (r2 = n2);
      var o2 = this.context.client.captureException(e3, r2), l2 = t3.componentStack;
      this.setState({ error: e3, componentStack: l2, exceptionEvent: o2 });
    }, u.prototype.render = function() {
      var e3 = this.props, t3 = e3.children, n2 = e3.fallback, o2 = this.state;
      if (null == o2.componentStack) return a(t3) ? t3() : t3;
      var l2 = a(n2) ? r.default.createElement(n2, { error: o2.error, componentStack: o2.componentStack, exceptionEvent: o2.exceptionEvent }) : n2;
      return r.default.isValidElement(l2) ? l2 : (console.warn("[PostHog.js][PostHogErrorBoundary] Invalid fallback prop, provide a valid React element or a function that returns a valid React element."), r.default.createElement(r.default.Fragment, null));
    }, u.contextType = n;
  }(r.default.Component), e.s(["PostHogProvider", 0, function(e2) {
    var o2 = e2.children, a2 = e2.client, l2 = e2.apiKey, u = e2.options, i = (0, r.useRef)(null), s = (0, r.useMemo)(function() {
      return a2 ? (l2 && console.warn("[PostHog.js] You have provided both `client` and `apiKey` to `PostHogProvider`. `apiKey` will be ignored in favour of `client`."), u && console.warn("[PostHog.js] You have provided both `client` and `options` to `PostHogProvider`. `options` will be ignored in favour of `client`."), a2) : (l2 || console.warn("[PostHog.js] No `apiKey` or `client` were provided to `PostHogProvider`. Using default global `window.posthog` instance. You must initialize it manually. This is not recommended behavior."), t.default);
    }, [a2, l2, JSON.stringify(u)]);
    return (0, r.useEffect)(function() {
      if (!a2) {
        var e3 = i.current;
        e3 ? (l2 !== e3.apiKey && console.warn("[PostHog.js] You have provided a different `apiKey` to `PostHogProvider` than the one that was already initialized. This is not supported by our provider and we'll keep using the previous key. If you need to toggle between API Keys you need to control the `client` yourself and pass it in as a prop rather than an `apiKey` prop."), u && !function e4(t2, r2, n2) {
          if (void 0 === n2 && (n2 = /* @__PURE__ */ new WeakMap()), t2 === r2) return true;
          if ("object" != typeof t2 || null === t2 || "object" != typeof r2 || null === r2) return false;
          if (n2.has(t2) && n2.get(t2) === r2) return true;
          n2.set(t2, r2);
          var o3 = Object.keys(t2), a3 = Object.keys(r2);
          if (o3.length !== a3.length) return false;
          for (var l3 = 0; l3 < o3.length; l3++) {
            var u2 = o3[l3];
            if (!a3.includes(u2) || !e4(t2[u2], r2[u2], n2)) return false;
          }
          return true;
        }(u, e3.options) && t.default.set_config(u)) : (t.default.__loaded && console.warn("[PostHog.js] `posthog` was already loaded elsewhere. This may cause issues."), t.default.init(l2, u)), i.current = { apiKey: l2, options: null != u ? u : {} };
      }
    }, [a2, l2, JSON.stringify(u)]), r.default.createElement(n.Provider, { value: { client: s } }, o2);
  }, "usePostHog", 0, function() {
    return (0, r.useContext)(n).client;
  }]);
}]);
