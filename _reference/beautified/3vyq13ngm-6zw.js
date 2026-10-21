(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["object" == typeof document ? document.currentScript : void 0, 4570, (e) => {
  "use strict";
  var t = "u" > typeof window ? window : void 0, i = "u" > typeof globalThis ? globalThis : t, s = Array.prototype, r = s.forEach, n = s.indexOf, a = null == i ? void 0 : i.navigator, o = null == i ? void 0 : i.document, l = null == i ? void 0 : i.location, c = null == i ? void 0 : i.fetch, u = null != i && i.XMLHttpRequest && "withCredentials" in new i.XMLHttpRequest() ? i.XMLHttpRequest : void 0, h = null == i ? void 0 : i.AbortController, d = null == a ? void 0 : a.userAgent, p = null != t ? t : {}, g = { DEBUG: false, LIB_VERSION: "1.276.0" };
  function _(e10, t10, i10, s10, r10, n2, a2) {
    try {
      var o2 = e10[n2](a2), l2 = o2.value;
    } catch (e11) {
      return void i10(e11);
    }
    o2.done ? t10(l2) : Promise.resolve(l2).then(s10, r10);
  }
  function v(e10) {
    return function() {
      var t10 = this, i10 = arguments;
      return new Promise(function(s10, r10) {
        var n2 = e10.apply(t10, i10);
        function a2(e11) {
          _(n2, s10, r10, a2, o2, "next", e11);
        }
        function o2(e11) {
          _(n2, s10, r10, a2, o2, "throw", e11);
        }
        a2(void 0);
      });
    };
  }
  function f() {
    return (f = Object.assign.bind()).apply(null, arguments);
  }
  function m(e10, t10) {
    if (null == e10) return {};
    var i10 = {};
    for (var s10 in e10) if ({}.hasOwnProperty.call(e10, s10)) {
      if (-1 !== t10.indexOf(s10)) continue;
      i10[s10] = e10[s10];
    }
    return i10;
  }
  var y = ["$snapshot", "$pageview", "$pageleave", "$set", "survey dismissed", "survey sent", "survey shown", "$identify", "$groupidentify", "$create_alias", "$$client_ingestion_warning", "$web_experiment_applied", "$feature_enrollment_update", "$feature_flag_called"];
  function b(e10, t10) {
    return -1 !== e10.indexOf(t10);
  }
  var w = function(e10) {
    return e10.trim();
  }, E = function(e10) {
    return e10.replace(/^\$/, "");
  }, x = Array.isArray, k = Object.prototype, S = k.hasOwnProperty, P = k.toString, $ = x || function(e10) {
    return "[object Array]" === P.call(e10);
  }, I = (e10) => "function" == typeof e10, F = (e10) => e10 === Object(e10) && !$(e10), O = (e10) => {
    if (F(e10)) {
      for (var t10 in e10) if (S.call(e10, t10)) return false;
      return true;
    }
    return false;
  }, R = (e10) => void 0 === e10, C = (e10) => "[object String]" == P.call(e10), T = (e10) => C(e10) && 0 === e10.trim().length, A = (e10) => null === e10, M = (e10) => R(e10) || A(e10), D = (e10) => "[object Number]" == P.call(e10), L = (e10) => "[object Boolean]" === P.call(e10), N = (e10) => b(y, e10);
  function j(e10) {
    return null === e10 || "object" != typeof e10;
  }
  function q(e10, t10) {
    return Object.prototype.toString.call(e10) === "[object " + t10 + "]";
  }
  function U(e10) {
    return !R(Event) && function(e11, t10) {
      try {
        return e11 instanceof t10;
      } catch (e12) {
        return false;
      }
    }(e10, Event);
  }
  var H = [true, "true", 1, "1", "yes"], G = [false, "false", 0, "0", "no"];
  function B(e10, t10, i10, s10, r10) {
    return t10 > i10 && (s10.warn("min cannot be greater than max."), t10 = i10), D(e10) ? e10 > i10 ? (s10.warn(" cannot be  greater than max: " + i10 + ". Using max value instead."), i10) : e10 < t10 ? (s10.warn(" cannot be less than min: " + t10 + ". Using min value instead."), t10) : e10 : (s10.warn(" must be a number. using max or fallback. max: " + i10 + ", fallback: " + r10), B(r10 || i10, t10, i10, s10));
  }
  class W {
    constructor(e10) {
      this.t = e10, this.i = {}, this.o = () => {
        Object.keys(this.i).forEach((e11) => {
          var t10 = this.h(e11) + this.m;
          t10 >= this.S ? delete this.i[e11] : this.$(e11, t10);
        });
      }, this.h = (e11) => this.i[String(e11)], this.$ = (e11, t10) => {
        this.i[String(e11)] = t10;
      }, this.consumeRateLimit = (e11) => {
        var t10, i10, s10 = null != (t10 = this.h(e11)) ? t10 : this.S;
        if (0 === (s10 = Math.max(s10 - 1, 0))) return true;
        this.$(e11, s10);
        var r10 = 0 === s10;
        return r10 && (null == (i10 = this.k) || i10.call(this, e11)), r10;
      }, this.k = this.t.k, this.S = B(this.t.bucketSize, 0, 100, this.t.P), this.m = B(this.t.refillRate, 0, this.S, this.t.P), this.T = B(this.t.refillInterval, 0, 864e5, this.t.P), this.I = setInterval(() => {
        this.o();
      }, this.T);
    }
    stop() {
      this.I && (clearInterval(this.I), this.I = void 0);
    }
  }
  var V, z, Y, X = (e10) => e10 instanceof Error;
  function J(e10, t10, i10, s10) {
    var r10 = { platform: "web:javascript", filename: e10, function: "<anonymous>" === t10 ? "?" : t10, in_app: true };
    return R(i10) || (r10.lineno = i10), R(s10) || (r10.colno = s10), r10;
  }
  var K = (e10, t10) => {
    var i10 = -1 !== e10.indexOf("safari-extension"), s10 = -1 !== e10.indexOf("safari-web-extension");
    return i10 || s10 ? [-1 !== e10.indexOf("@") ? e10.split("@")[0] : "?", i10 ? "safari-extension:" + t10 : "safari-web-extension:" + t10] : [e10, t10];
  }, Q = /^\s*at (\S+?)(?::(\d+))(?::(\d+))\s*$/i, Z = /^\s*at (?:(.+?\)(?: \[.+\])?|.*?) ?\((?:address at )?)?(?:async )?((?:<anonymous>|[-a-z]+:|.*bundle|\/)?.*?)(?::(\d+))?(?::(\d+))?\)?\s*$/i, ee = /\((\S*)(?::(\d+))(?::(\d+))\)/, et = (e10) => {
    var t10 = Q.exec(e10);
    if (t10) {
      var [, i10, s10, r10] = t10;
      return J(i10, "?", +s10, +r10);
    }
    var n2 = Z.exec(e10);
    if (n2) {
      if (n2[2] && 0 === n2[2].indexOf("eval")) {
        var a2 = ee.exec(n2[2]);
        a2 && (n2[2] = a2[1], n2[3] = a2[2], n2[4] = a2[3]);
      }
      var [o2, l2] = K(n2[1] || "?", n2[2]);
      return J(l2, o2, n2[3] ? +n2[3] : void 0, n2[4] ? +n2[4] : void 0);
    }
  }, ei = /^\s*(.*?)(?:\((.*?)\))?(?:^|@)?((?:[-a-z]+)?:\/.*?|\[native code\]|[^@]*(?:bundle|\d+\.js)|\/[\w\-. /=]+)(?::(\d+))?(?::(\d+))?\s*$/i, es = /(\S+) line (\d+)(?: > eval line \d+)* > eval/i, er = (e10) => {
    var t10 = ei.exec(e10);
    if (t10) {
      if (t10[3] && t10[3].indexOf(" > eval") > -1) {
        var i10 = es.exec(t10[3]);
        i10 && (t10[1] = t10[1] || "eval", t10[3] = i10[1], t10[4] = i10[2], t10[5] = "");
      }
      var s10 = t10[3], r10 = t10[1] || "?";
      return [r10, s10] = K(r10, s10), J(s10, r10, t10[4] ? +t10[4] : void 0, t10[5] ? +t10[5] : void 0);
    }
  }, en = /\(error: (.*)\)/;
  class ea {
    constructor(e10, t10, i10) {
      void 0 === e10 && (e10 = []), void 0 === t10 && (t10 = []), void 0 === i10 && (i10 = []), this.coercers = e10, this.modifiers = i10, this.stackParser = function() {
        for (var e11 = arguments.length, t11 = Array(e11), i11 = 0; i11 < e11; i11++) t11[i11] = arguments[i11];
        return function(e12, i12) {
          void 0 === i12 && (i12 = 0);
          for (var s10 = [], r10 = e12.split("\n"), n2 = i12; n2 < r10.length; n2++) {
            var a2 = r10[n2];
            if (!(a2.length > 1024)) {
              var o2 = en.test(a2) ? a2.replace(en, "$1") : a2;
              if (!o2.match(/\S*Error: /)) {
                for (var l2 of t11) {
                  var c2 = l2(o2);
                  if (c2) {
                    s10.push(c2);
                    break;
                  }
                }
                if (s10.length >= 50) break;
              }
            }
          }
          if (!s10.length) return [];
          var u2 = Array.from(s10);
          return u2.reverse(), u2.slice(0, 50).map((e13) => f({}, e13, { filename: e13.filename || (u2[u2.length - 1] || {}).filename, function: e13.function || "?" }));
        };
      }(...t10);
    }
    buildFromUnknown(e10, t10) {
      void 0 === t10 && (t10 = {});
      var i10 = t10 && t10.mechanism || { handled: true, type: "generic" }, s10 = this.buildCoercingContext(i10, t10, 0).apply(e10), r10 = this.buildParsingContext(), n2 = this.parseStacktrace(s10, r10);
      return { $exception_list: this.convertToExceptionList(n2, i10), $exception_level: "error" };
    }
    modifyFrames(e10) {
      var t10 = this;
      return v(function* () {
        for (var i10 of e10) i10.stacktrace && i10.stacktrace.frames && $(i10.stacktrace.frames) && (i10.stacktrace.frames = yield t10.applyModifiers(i10.stacktrace.frames));
        return e10;
      })();
    }
    coerceFallback(e10) {
      var t10;
      return { type: "Error", value: "Unknown error", stack: null == (t10 = e10.syntheticException) ? void 0 : t10.stack, synthetic: true };
    }
    parseStacktrace(e10, t10) {
      var i10, s10;
      return null != e10.cause && (i10 = this.parseStacktrace(e10.cause, t10)), "" != e10.stack && null != e10.stack && (s10 = this.applyChunkIds(this.stackParser(e10.stack, +!!e10.synthetic), t10.chunkIdMap)), f({}, e10, { cause: i10, stack: s10 });
    }
    applyChunkIds(e10, t10) {
      return e10.map((e11) => (e11.filename && t10 && (e11.chunk_id = t10[e11.filename]), e11));
    }
    applyCoercers(e10, t10) {
      for (var i10 of this.coercers) if (i10.match(e10)) return i10.coerce(e10, t10);
      return this.coerceFallback(t10);
    }
    applyModifiers(e10) {
      var t10 = this;
      return v(function* () {
        var i10 = e10;
        for (var s10 of t10.modifiers) i10 = yield s10(i10);
        return i10;
      })();
    }
    convertToExceptionList(e10, t10) {
      var i10, s10, r10, n2 = { type: e10.type, value: e10.value, mechanism: { type: null != (i10 = t10.type) ? i10 : "generic", handled: null == (s10 = t10.handled) || s10, synthetic: null != (r10 = e10.synthetic) && r10 } };
      e10.stack && (n2.stacktrace = { type: "raw", frames: e10.stack });
      var a2 = [n2];
      return null != e10.cause && a2.push(...this.convertToExceptionList(e10.cause, f({}, t10, { handled: true }))), a2;
    }
    buildParsingContext() {
      return { chunkIdMap: function(e10) {
        var t10 = globalThis._posthogChunkIds;
        if (t10) {
          var i10 = Object.keys(t10);
          return Y && i10.length === z || (z = i10.length, Y = i10.reduce((i11, s10) => {
            V || (V = {});
            var r10 = V[s10];
            if (r10) i11[r10[0]] = r10[1];
            else for (var n2 = e10(s10), a2 = n2.length - 1; a2 >= 0; a2--) {
              var o2 = n2[a2], l2 = null == o2 ? void 0 : o2.filename, c2 = t10[s10];
              if (l2 && c2) {
                i11[l2] = c2, V[s10] = [l2, c2];
                break;
              }
            }
            return i11;
          }, {})), Y;
        }
      }(this.stackParser) };
    }
    buildCoercingContext(e10, t10, i10) {
      void 0 === i10 && (i10 = 0);
      var s10 = (i11, s11) => {
        if (s11 <= 4) {
          var r10 = this.buildCoercingContext(e10, t10, s11);
          return this.applyCoercers(i11, r10);
        }
      };
      return f({}, t10, { syntheticException: 0 == i10 ? t10.syntheticException : void 0, mechanism: e10, apply: (e11) => s10(e11, i10), next: (e11) => s10(e11, i10 + 1) });
    }
  }
  class eo {
    match(e10) {
      return this.isDOMException(e10) || this.isDOMError(e10);
    }
    coerce(e10, t10) {
      var i10 = C(e10.stack);
      return { type: this.getType(e10), value: this.getValue(e10), stack: i10 ? e10.stack : void 0, cause: e10.cause ? t10.next(e10.cause) : void 0, synthetic: false };
    }
    getType(e10) {
      return this.isDOMError(e10) ? "DOMError" : "DOMException";
    }
    getValue(e10) {
      var t10 = e10.name || (this.isDOMError(e10) ? "DOMError" : "DOMException");
      return e10.message ? t10 + ": " + e10.message : t10;
    }
    isDOMException(e10) {
      return q(e10, "DOMException");
    }
    isDOMError(e10) {
      return q(e10, "DOMError");
    }
  }
  class el {
    match(e10) {
      return e10 instanceof Error;
    }
    coerce(e10, t10) {
      return { type: this.getType(e10), value: this.getMessage(e10, t10), stack: this.getStack(e10), cause: e10.cause ? t10.next(e10.cause) : void 0, synthetic: false };
    }
    getType(e10) {
      return e10.name || e10.constructor.name;
    }
    getMessage(e10, t10) {
      var i10 = e10.message;
      return i10.error && "string" == typeof i10.error.message ? String(i10.error.message) : String(i10);
    }
    getStack(e10) {
      return e10.stacktrace || e10.stack || void 0;
    }
  }
  class ec {
    match(e10) {
      return q(e10, "ErrorEvent") && null != e10.error;
    }
    coerce(e10, t10) {
      var i10;
      return t10.apply(e10.error) || { type: "ErrorEvent", value: e10.message, stack: null == (i10 = t10.syntheticException) ? void 0 : i10.stack, synthetic: true };
    }
  }
  var eu = /^(?:[Uu]ncaught (?:exception: )?)?(?:((?:Eval|Internal|Range|Reference|Syntax|Type|URI|)Error): )?(.*)$/i;
  class eh {
    match(e10) {
      return "string" == typeof e10;
    }
    coerce(e10, t10) {
      var i10, [s10, r10] = this.getInfos(e10);
      return { type: null != s10 ? s10 : "Error", value: null != r10 ? r10 : e10, stack: null == (i10 = t10.syntheticException) ? void 0 : i10.stack, synthetic: true };
    }
    getInfos(e10) {
      var t10 = "Error", i10 = e10, s10 = e10.match(eu);
      return s10 && (t10 = s10[1], i10 = s10[2]), [t10, i10];
    }
  }
  var ed = ["fatal", "error", "warning", "log", "info", "debug"];
  function ep(e10, t10) {
    void 0 === t10 && (t10 = 40);
    var i10 = Object.keys(e10);
    if (i10.sort(), !i10.length) return "[object has no keys]";
    for (var s10 = i10.length; s10 > 0; s10--) {
      var r10 = i10.slice(0, s10).join(", ");
      if (!(r10.length > t10)) return s10 === i10.length || r10.length <= t10 ? r10 : r10.slice(0, t10) + "...";
    }
    return "";
  }
  class eg {
    match(e10) {
      return "object" == typeof e10 && null !== e10;
    }
    coerce(e10, t10) {
      var i10, s10 = this.getErrorPropertyFromObject(e10);
      return s10 ? t10.apply(s10) : { type: this.getType(e10), value: this.getValue(e10), stack: null == (i10 = t10.syntheticException) ? void 0 : i10.stack, level: this.isSeverityLevel(e10.level) ? e10.level : "error", synthetic: true };
    }
    getType(e10) {
      return U(e10) ? e10.constructor.name : "Error";
    }
    getValue(e10) {
      if ("name" in e10 && "string" == typeof e10.name) {
        var t10 = "'" + e10.name + "' captured as exception";
        return "message" in e10 && "string" == typeof e10.message && (t10 += " with message: '" + e10.message + "'"), t10;
      }
      if ("message" in e10 && "string" == typeof e10.message) return e10.message;
      var i10 = this.getObjectClassName(e10);
      return (i10 && "Object" !== i10 ? "'" + i10 + "'" : "Object") + " captured as exception with keys: " + ep(e10);
    }
    isSeverityLevel(e10) {
      return C(e10) && !T(e10) && ed.indexOf(e10) >= 0;
    }
    getErrorPropertyFromObject(e10) {
      for (var t10 in e10) if (Object.prototype.hasOwnProperty.call(e10, t10)) {
        var i10 = e10[t10];
        if (X(i10)) return i10;
      }
    }
    getObjectClassName(e10) {
      try {
        var t10 = Object.getPrototypeOf(e10);
        return t10 ? t10.constructor.name : void 0;
      } catch (e11) {
        return;
      }
    }
  }
  class e_ {
    match(e10) {
      return U(e10);
    }
    coerce(e10, t10) {
      var i10, s10 = e10.constructor.name;
      return { type: s10, value: s10 + " captured as exception with keys: " + ep(e10), stack: null == (i10 = t10.syntheticException) ? void 0 : i10.stack, synthetic: true };
    }
  }
  class ev {
    match(e10) {
      return j(e10);
    }
    coerce(e10, t10) {
      var i10;
      return { type: "Error", value: "Primitive value captured as exception: " + String(e10), stack: null == (i10 = t10.syntheticException) ? void 0 : i10.stack, synthetic: true };
    }
  }
  class ef {
    match(e10) {
      return q(e10, "PromiseRejectionEvent");
    }
    coerce(e10, t10) {
      var i10, s10 = this.getUnhandledRejectionReason(e10);
      return j(s10) ? { type: "UnhandledRejection", value: "Non-Error promise rejection captured with value: " + String(s10), stack: null == (i10 = t10.syntheticException) ? void 0 : i10.stack, synthetic: true } : t10.apply(s10);
    }
    getUnhandledRejectionReason(e10) {
      if (j(e10)) return e10;
      try {
        if ("reason" in e10) return e10.reason;
        if ("detail" in e10 && "reason" in e10.detail) return e10.detail.reason;
      } catch (e11) {
      }
      return e10;
    }
  }
  var em = (e10) => {
    var i10 = { R: function(i11) {
      if (t && (g.DEBUG || p.POSTHOG_DEBUG) && !R(t.console) && t.console) {
        for (var s10 = ("__rrweb_original__" in t.console[i11]) ? t.console[i11].__rrweb_original__ : t.console[i11], r10 = arguments.length, n2 = Array(r10 > 1 ? r10 - 1 : 0), a2 = 1; a2 < r10; a2++) n2[a2 - 1] = arguments[a2];
        s10(e10, ...n2);
      }
    }, info: function() {
      for (var e11 = arguments.length, t10 = Array(e11), s10 = 0; s10 < e11; s10++) t10[s10] = arguments[s10];
      i10.R("log", ...t10);
    }, warn: function() {
      for (var e11 = arguments.length, t10 = Array(e11), s10 = 0; s10 < e11; s10++) t10[s10] = arguments[s10];
      i10.R("warn", ...t10);
    }, error: function() {
      for (var e11 = arguments.length, t10 = Array(e11), s10 = 0; s10 < e11; s10++) t10[s10] = arguments[s10];
      i10.R("error", ...t10);
    }, critical: function() {
      for (var t10 = arguments.length, i11 = Array(t10), s10 = 0; s10 < t10; s10++) i11[s10] = arguments[s10];
      console.error(e10, ...i11);
    }, uninitializedWarning: (e11) => {
      i10.error("You must initialize PostHog before calling " + e11);
    }, createLogger: (t10) => em(e10 + " " + t10) };
    return i10;
  }, ey = em("[PostHog.js]"), eb = ey.createLogger, ew = eb("[ExternalScriptsLoader]"), eE = (e10, t10, i10) => {
    if (e10.config.disable_external_dependency_loading) return ew.warn(t10 + " was requested but loading of external scripts is disabled."), i10("Loading of external scripts is disabled");
    var s10 = null == o ? void 0 : o.querySelectorAll("script");
    if (s10) {
      for (var r10, n2 = 0; n2 < s10.length; n2++) if (r10 = function() {
        if (s10[n2].src === t10) {
          var e11 = s10[n2];
          return e11.__posthog_loading_callback_fired ? { v: i10() } : (e11.addEventListener("load", (t11) => {
            e11.__posthog_loading_callback_fired = true, i10(void 0, t11);
          }), e11.onerror = (e12) => i10(e12), { v: void 0 });
        }
      }()) return r10.v;
    }
    var a2 = () => {
      if (!o) return i10("document not found");
      var s11 = o.createElement("script");
      if (s11.type = "text/javascript", s11.crossOrigin = "anonymous", s11.src = t10, s11.onload = (e11) => {
        s11.__posthog_loading_callback_fired = true, i10(void 0, e11);
      }, s11.onerror = (e11) => i10(e11), e10.config.prepare_external_dependency_script && (s11 = e10.config.prepare_external_dependency_script(s11)), !s11) return i10("prepare_external_dependency_script returned null");
      var r11, n3 = o.querySelectorAll("body > script");
      n3.length > 0 ? null == (r11 = n3[0].parentNode) || r11.insertBefore(s11, n3[0]) : o.body.appendChild(s11);
    };
    null != o && o.body ? a2() : null == o || o.addEventListener("DOMContentLoaded", a2);
  };
  p.__PosthogExtensions__ = p.__PosthogExtensions__ || {}, p.__PosthogExtensions__.loadExternalDependency = (e10, t10, i10) => {
    var s10 = "/static/" + t10 + ".js?v=" + e10.version;
    "remote-config" === t10 && (s10 = "/array/" + e10.config.token + "/config.js"), "toolbar" === t10 && (s10 = s10 + "&t=" + 3e5 * Math.floor(Date.now() / 3e5));
    var r10 = e10.requestRouter.endpointFor("assets", s10);
    eE(e10, r10, i10);
  }, p.__PosthogExtensions__.loadSiteApp = (e10, t10, i10) => {
    var s10 = e10.requestRouter.endpointFor("api", t10);
    eE(e10, s10, i10);
  };
  var ex = {};
  function ek(e10, t10, i10) {
    if ($(e10)) {
      if (r && e10.forEach === r) e10.forEach(t10, i10);
      else if ("length" in e10 && e10.length === +e10.length) {
        for (var s10 = 0, n2 = e10.length; s10 < n2; s10++) if (s10 in e10 && t10.call(i10, e10[s10], s10) === ex) return;
      }
    }
  }
  function eS(e10, t10, i10) {
    if (!M(e10)) {
      if ($(e10)) return ek(e10, t10, i10);
      if (e10 instanceof FormData) {
        for (var s10 of e10.entries()) if (t10.call(i10, s10[1], s10[0]) === ex) return;
      } else for (var r10 in e10) if (S.call(e10, r10) && t10.call(i10, e10[r10], r10) === ex) return;
    }
  }
  var eP = function(e10) {
    for (var t10 = arguments.length, i10 = Array(t10 > 1 ? t10 - 1 : 0), s10 = 1; s10 < t10; s10++) i10[s10 - 1] = arguments[s10];
    return ek(i10, function(t11) {
      for (var i11 in t11) void 0 !== t11[i11] && (e10[i11] = t11[i11]);
    }), e10;
  }, e$ = function(e10) {
    for (var t10 = arguments.length, i10 = Array(t10 > 1 ? t10 - 1 : 0), s10 = 1; s10 < t10; s10++) i10[s10 - 1] = arguments[s10];
    return ek(i10, function(t11) {
      ek(t11, function(t12) {
        e10.push(t12);
      });
    }), e10;
  };
  function eI(e10) {
    for (var t10 = Object.keys(e10), i10 = t10.length, s10 = Array(i10); i10--; ) s10[i10] = [t10[i10], e10[t10[i10]]];
    return s10;
  }
  var eF = function(e10) {
    try {
      return e10();
    } catch (e11) {
      return;
    }
  }, eO = function(e10) {
    return function() {
      try {
        for (var t10 = arguments.length, i10 = Array(t10), s10 = 0; s10 < t10; s10++) i10[s10] = arguments[s10];
        return e10.apply(this, i10);
      } catch (e11) {
        ey.critical("Implementation error. Please turn on debug mode and open a ticket on https://app.posthog.com/home#panel=support%3Asupport%3A."), ey.critical(e11);
      }
    };
  }, eR = function(e10) {
    var t10 = {};
    return eS(e10, function(e11, i10) {
      (C(e11) && e11.length > 0 || D(e11)) && (t10[i10] = e11);
    }), t10;
  }, eC = ["herokuapp.com", "vercel.app", "netlify.app"];
  function eT(e10, t10) {
    for (var i10 = 0; i10 < e10.length; i10++) if (t10(e10[i10])) return e10[i10];
  }
  function eA(e10, t10, i10, s10) {
    var { capture: r10 = false, passive: n2 = true } = null != s10 ? s10 : {};
    null == e10 || e10.addEventListener(t10, i10, { capture: r10, passive: n2 });
  }
  var eM = "$people_distinct_id", eD = "__alias", eL = "__timers", eN = "$autocapture_disabled_server_side", ej = "$heatmaps_enabled_server_side", eq = "$exception_capture_enabled_server_side", eU = "$error_tracking_suppression_rules", eH = "$error_tracking_capture_extension_exceptions", eG = "$web_vitals_enabled_server_side", eB = "$dead_clicks_enabled_server_side", eW = "$web_vitals_allowed_metrics", eV = "$session_recording_remote_config", ez = "$sesid", eY = "$session_is_sampled", eX = "$enabled_feature_flags", eJ = "$early_access_features", eK = "$feature_flag_details", eQ = "$stored_person_properties", eZ = "$stored_group_properties", e0 = "$surveys", e1 = "$surveys_activated", e2 = "$flag_call_reported", e3 = "$user_state", e5 = "$client_session_props", e8 = "$capture_rate_limit", e6 = "$initial_campaign_params", e4 = "$initial_referrer_info", e7 = "$initial_person_info", e9 = "$epp", te = "__POSTHOG_TOOLBAR__", tt = "$posthog_cookieless", ti = [eM, eD, "__cmpns", eL, "$session_recording_enabled_server_side", ej, ez, eX, eU, e3, eJ, eK, eZ, eQ, e0, e2, e5, e8, e6, e4, e9, e7];
  function ts(e10) {
    return e10 instanceof Element && (e10.id === te || !(null == e10.closest || !e10.closest(".toolbar-global-fade-container")));
  }
  function tr(e10) {
    return !!e10 && 1 === e10.nodeType;
  }
  function tn(e10, t10) {
    return !!e10 && !!e10.tagName && e10.tagName.toLowerCase() === t10.toLowerCase();
  }
  function ta(e10) {
    return !!e10 && 3 === e10.nodeType;
  }
  function to(e10) {
    return !!e10 && 11 === e10.nodeType;
  }
  function tl(e10) {
    return e10 ? w(e10).split(/\s+/) : [];
  }
  function tc(e10) {
    var i10 = null == t ? void 0 : t.location.href;
    return !!(i10 && e10 && e10.some((e11) => i10.match(e11)));
  }
  function tu(e10) {
    var t10 = "";
    switch (typeof e10.className) {
      case "string":
        t10 = e10.className;
        break;
      case "object":
        t10 = (e10.className && "baseVal" in e10.className ? e10.className.baseVal : null) || e10.getAttribute("class") || "";
        break;
      default:
        t10 = "";
    }
    return tl(t10);
  }
  function th(e10) {
    return M(e10) ? null : w(e10).split(/(\s+)/).filter((e11) => tI(e11)).join("").replace(/[\r\n]/g, " ").replace(/[ ]+/g, " ").substring(0, 255);
  }
  function td(e10) {
    var t10 = "";
    return tb(e10) && !tw(e10) && e10.childNodes && e10.childNodes.length && eS(e10.childNodes, function(e11) {
      var i10;
      ta(e11) && e11.textContent && (t10 += null != (i10 = th(e11.textContent)) ? i10 : "");
    }), w(t10);
  }
  function tp(e10) {
    var t10;
    return R(e10.target) ? e10.srcElement || null : null != (t10 = e10.target) && t10.shadowRoot ? e10.composedPath()[0] || null : e10.target || null;
  }
  var tg = ["a", "button", "form", "input", "select", "textarea", "label"];
  function t_(e10, t10) {
    if (R(t10)) return true;
    var i10, s10 = function(e11) {
      if (t10.some((t11) => e11.matches(t11))) return { v: true };
    };
    for (var r10 of e10) if (i10 = s10(r10)) return i10.v;
    return false;
  }
  function tv(e10) {
    var t10 = e10.parentNode;
    return !(!t10 || !tr(t10)) && t10;
  }
  var tf = [".ph-no-rageclick", ".ph-no-capture"], tm = (e10) => !e10 || tn(e10, "html") || !tr(e10), ty = (e10, i10) => {
    if (!t || tm(e10)) return { parentIsUsefulElement: false, targetElementList: [] };
    for (var s10 = false, r10 = [e10], n2 = e10; n2.parentNode && !tn(n2, "body"); ) if (to(n2.parentNode)) r10.push(n2.parentNode.host), n2 = n2.parentNode.host;
    else {
      var a2 = tv(n2);
      if (!a2) break;
      if (i10 || tg.indexOf(a2.tagName.toLowerCase()) > -1) s10 = true;
      else {
        var o2 = t.getComputedStyle(a2);
        o2 && "pointer" === o2.getPropertyValue("cursor") && (s10 = true);
      }
      r10.push(a2), n2 = a2;
    }
    return { parentIsUsefulElement: s10, targetElementList: r10 };
  };
  function tb(e10) {
    for (var t10 = e10; t10.parentNode && !tn(t10, "body"); t10 = t10.parentNode) {
      var i10 = tu(t10);
      if (b(i10, "ph-sensitive") || b(i10, "ph-no-capture")) return false;
    }
    if (b(tu(e10), "ph-include")) return true;
    var s10 = e10.type || "";
    if (C(s10)) switch (s10.toLowerCase()) {
      case "hidden":
      case "password":
        return false;
    }
    var r10 = e10.name || e10.id || "";
    return !(C(r10) && /^cc|cardnum|ccnum|creditcard|csc|cvc|cvv|exp|pass|pwd|routing|seccode|securitycode|securitynum|socialsec|socsec|ssn/i.test(r10.replace(/[^a-zA-Z0-9]/g, "")));
  }
  function tw(e10) {
    return !!(tn(e10, "input") && !["button", "checkbox", "submit", "reset"].includes(e10.type) || tn(e10, "select") || tn(e10, "textarea") || "true" === e10.getAttribute("contenteditable"));
  }
  var tE = "(4[0-9]{12}(?:[0-9]{3})?)|(5[1-5][0-9]{14})|(6(?:011|5[0-9]{2})[0-9]{12})|(3[47][0-9]{13})|(3(?:0[0-5]|[68][0-9])[0-9]{11})|((?:2131|1800|35[0-9]{3})[0-9]{11})", tx = RegExp("^(?:" + tE + ")$"), tk = new RegExp(tE), tS = "\\d{3}-?\\d{2}-?\\d{4}", tP = RegExp("^(" + tS + ")$"), t$ = RegExp("(" + tS + ")");
  function tI(e10, t10) {
    return void 0 === t10 && (t10 = true), !(M(e10) || C(e10) && (e10 = w(e10), (t10 ? tx : tk).test((e10 || "").replace(/[- ]/g, "")) || (t10 ? tP : t$).test(e10))) && true;
  }
  function tF(e10) {
    var t10 = td(e10);
    return tI(t10 = (t10 + " " + function e11(t11) {
      var i10 = "";
      return t11 && t11.childNodes && t11.childNodes.length && eS(t11.childNodes, function(t12) {
        var s10;
        if (t12 && "span" === (null == (s10 = t12.tagName) ? void 0 : s10.toLowerCase())) try {
          var r10 = td(t12);
          i10 = (i10 + " " + r10).trim(), t12.childNodes && t12.childNodes.length && (i10 = (i10 + " " + e11(t12)).trim());
        } catch (e12) {
          ey.error("[AutoCapture]", e12);
        }
      }), i10;
    }(e10)).trim()) ? t10 : "";
  }
  function tO(e10) {
    return e10.replace(/"|\\"/g, '\\"');
  }
  class tR {
    constructor() {
      this.clicks = [];
    }
    isRageClick(e10, t10, i10) {
      var s10 = this.clicks[this.clicks.length - 1];
      if (s10 && Math.abs(e10 - s10.x) + Math.abs(t10 - s10.y) < 30 && i10 - s10.timestamp < 1e3) {
        if (this.clicks.push({ x: e10, y: t10, timestamp: i10 }), 3 === this.clicks.length) return true;
      } else this.clicks = [{ x: e10, y: t10, timestamp: i10 }];
      return false;
    }
  }
  var tC = "$copy_autocapture", tT = ((tW = {}).GZipJS = "gzip-js", tW.Base64 = "base64", tW), tA = (e10) => {
    var t10 = null == o ? void 0 : o.createElement("a");
    return R(t10) ? null : (t10.href = e10, t10);
  }, tM = function(e10, t10) {
    void 0 === t10 && (t10 = "&");
    var i10, s10, r10 = [];
    return eS(e10, function(e11, t11) {
      R(e11) || R(t11) || "undefined" === t11 || (i10 = encodeURIComponent(e11 instanceof File ? e11.name : e11.toString()), s10 = encodeURIComponent(t11), r10[r10.length] = s10 + "=" + i10);
    }), r10.join(t10);
  }, tD = function(e10, t10) {
    for (var i10, s10 = ((e10.split("#")[0] || "").split(/\?(.*)/)[1] || "").replace(/^\?+/g, "").split("&"), r10 = 0; r10 < s10.length; r10++) {
      var n2 = s10[r10].split("=");
      if (n2[0] === t10) {
        i10 = n2;
        break;
      }
    }
    if (!$(i10) || i10.length < 2) return "";
    var a2 = i10[1];
    try {
      a2 = decodeURIComponent(a2);
    } catch (e11) {
      ey.error("Skipping decoding for malformed query param: " + a2);
    }
    return a2.replace(/\+/g, " ");
  }, tL = function(e10, t10, i10) {
    if (!e10 || !t10 || !t10.length) return e10;
    for (var s10 = e10.split("#"), r10 = s10[0] || "", n2 = s10[1], a2 = r10.split("?"), o2 = a2[1], l2 = a2[0], c2 = (o2 || "").split("&"), u2 = [], h2 = 0; h2 < c2.length; h2++) {
      var d2 = c2[h2].split("=");
      $(d2) && (t10.includes(d2[0]) ? u2.push(d2[0] + "=" + i10) : u2.push(c2[h2]));
    }
    var p2 = l2;
    return null != o2 && (p2 += "?" + u2.join("&")), null != n2 && (p2 += "#" + n2), p2;
  }, tN = function(e10, t10) {
    var i10 = e10.match(RegExp(t10 + "=([^&]*)"));
    return i10 ? i10[1] : null;
  }, tj = eb("[AutoCapture]");
  function tq(e10, t10) {
    return t10.length > e10 ? t10.slice(0, e10) + "..." : t10;
  }
  class tU {
    constructor(e10) {
      this.C = false, this.O = null, this.rageclicks = new tR(), this.F = false, this.instance = e10, this.M = null;
    }
    get A() {
      var e10, t10, i10 = F(this.instance.config.autocapture) ? this.instance.config.autocapture : {};
      return i10.url_allowlist = null == (e10 = i10.url_allowlist) ? void 0 : e10.map((e11) => new RegExp(e11)), i10.url_ignorelist = null == (t10 = i10.url_ignorelist) ? void 0 : t10.map((e11) => new RegExp(e11)), i10;
    }
    j() {
      if (this.isBrowserSupported()) {
        if (t && o) {
          var e10 = (e11) => {
            e11 = e11 || (null == t ? void 0 : t.event);
            try {
              this.D(e11);
            } catch (e12) {
              tj.error("Failed to capture event", e12);
            }
          };
          if (eA(o, "submit", e10, { capture: true }), eA(o, "change", e10, { capture: true }), eA(o, "click", e10, { capture: true }), this.A.capture_copied_text) {
            var i10 = (e11) => {
              e11 = e11 || (null == t ? void 0 : t.event), this.D(e11, tC);
            };
            eA(o, "copy", i10, { capture: true }), eA(o, "cut", i10, { capture: true });
          }
        }
      } else tj.info("Disabling Automatic Event Collection because this browser is not supported");
    }
    startIfEnabled() {
      this.isEnabled && !this.C && (this.j(), this.C = true);
    }
    onRemoteConfig(e10) {
      e10.elementsChainAsString && (this.F = e10.elementsChainAsString), this.instance.persistence && this.instance.persistence.register({ [eN]: !!e10.autocapture_opt_out }), this.O = !!e10.autocapture_opt_out, this.startIfEnabled();
    }
    setElementSelectors(e10) {
      this.M = e10;
    }
    getElementSelectors(e10) {
      var t10, i10 = [];
      return null == (t10 = this.M) || t10.forEach((t11) => {
        var s10 = null == o ? void 0 : o.querySelectorAll(t11);
        null == s10 || s10.forEach((s11) => {
          e10 === s11 && i10.push(t11);
        });
      }), i10;
    }
    get isEnabled() {
      var e10, t10, i10 = null == (e10 = this.instance.persistence) ? void 0 : e10.props[eN];
      if (A(this.O) && !L(i10) && !this.instance.L()) return false;
      var s10 = null != (t10 = this.O) ? t10 : !!i10;
      return !!this.instance.config.autocapture && !s10;
    }
    D(e10, i10) {
      if (void 0 === i10 && (i10 = "$autocapture"), this.isEnabled) {
        var s10, r10 = tp(e10);
        ta(r10) && (r10 = r10.parentNode || null), "$autocapture" === i10 && "click" === e10.type && e10 instanceof MouseEvent && this.instance.config.rageclick && null != (s10 = this.rageclicks) && s10.isRageClick(e10.clientX, e10.clientY, (/* @__PURE__ */ new Date()).getTime()) && function(e11, i11) {
          if (!t || tm(e11) || false === (s11 = L(i11) ? !!i11 && tf : null != (r11 = null == i11 ? void 0 : i11.css_selector_ignorelist) ? r11 : tf)) return false;
          var s11, r11, { targetElementList: n3 } = ty(e11, false);
          return !t_(n3, s11);
        }(r10, this.instance.config.rageclick) && this.D(e10, "$rageclick");
        var n2 = i10 === tC;
        if (r10 && function(e11, i11, s11, r11, n3) {
          if (void 0 === s11 && (s11 = void 0), !t || tm(e11) || null != (a3 = s11) && a3.url_allowlist && !tc(s11.url_allowlist) || null != (o3 = s11) && o3.url_ignorelist && tc(s11.url_ignorelist)) return false;
          if (null != (l3 = s11) && l3.dom_event_allowlist) {
            var a3, o3, l3, c3, u3 = s11.dom_event_allowlist;
            if (u3 && !u3.some((e12) => i11.type === e12)) return false;
          }
          var { parentIsUsefulElement: h3, targetElementList: d2 } = ty(e11, r11);
          if (!function(e12, t10) {
            var i12 = null == t10 ? void 0 : t10.element_allowlist;
            if (R(i12)) return true;
            var s12, r12 = function(e13) {
              if (i12.some((t11) => e13.tagName.toLowerCase() === t11)) return { v: true };
            };
            for (var n4 of e12) if (s12 = r12(n4)) return s12.v;
            return false;
          }(d2, s11) || !t_(d2, null == (c3 = s11) ? void 0 : c3.css_selector_allowlist)) return false;
          var p2 = t.getComputedStyle(e11);
          if (p2 && "pointer" === p2.getPropertyValue("cursor") && "click" === i11.type) return true;
          var g2 = e11.tagName.toLowerCase();
          switch (g2) {
            case "html":
              return false;
            case "form":
              return (n3 || ["submit"]).indexOf(i11.type) >= 0;
            case "input":
            case "select":
            case "textarea":
              return (n3 || ["change", "click"]).indexOf(i11.type) >= 0;
            default:
              return h3 ? (n3 || ["click"]).indexOf(i11.type) >= 0 : (n3 || ["click"]).indexOf(i11.type) >= 0 && (tg.indexOf(g2) > -1 || "true" === e11.getAttribute("contenteditable"));
          }
        }(r10, e10, this.A, n2, n2 ? ["copy", "cut"] : void 0)) {
          var { props: a2, explicitNoCapture: o2 } = function(e11, i11) {
            for (var s11, r11, { e: n3, maskAllElementAttributes: a3, maskAllText: o3, elementAttributeIgnoreList: l3, elementsChainAsString: c3 } = i11, u3 = [e11], h3 = e11; h3.parentNode && !tn(h3, "body"); ) to(h3.parentNode) ? (u3.push(h3.parentNode.host), h3 = h3.parentNode.host) : (u3.push(h3.parentNode), h3 = h3.parentNode);
            var d2, p2 = [], g2 = {}, _2 = false, v2 = false;
            if (eS(u3, (e12) => {
              var t10 = tb(e12);
              "a" === e12.tagName.toLowerCase() && (_2 = e12.getAttribute("href"), _2 = t10 && _2 && tI(_2) && _2), b(tu(e12), "ph-no-capture") && (v2 = true), p2.push(function(e13, t11, i12, s12) {
                var r12 = e13.tagName.toLowerCase(), n4 = { tag_name: r12 };
                tg.indexOf(r12) > -1 && !i12 && ("a" === r12.toLowerCase() || "button" === r12.toLowerCase() ? n4.$el_text = tq(1024, tF(e13)) : n4.$el_text = tq(1024, td(e13)));
                var a4 = tu(e13);
                a4.length > 0 && (n4.classes = a4.filter(function(e14) {
                  return "" !== e14;
                })), eS(e13.attributes, function(i13) {
                  var r13;
                  if ((!tw(e13) || -1 !== ["name", "id", "class", "aria-label"].indexOf(i13.name)) && (null == s12 || !s12.includes(i13.name)) && !t11 && tI(i13.value) && (!C(r13 = i13.name) || "_ngcontent" !== r13.substring(0, 10) && "_nghost" !== r13.substring(0, 7))) {
                    var a5 = i13.value;
                    "class" === i13.name && (a5 = tl(a5).join(" ")), n4["attr__" + i13.name] = tq(1024, a5);
                  }
                });
                for (var o4 = 1, l4 = 1, c4 = e13; c4 = function(e14) {
                  if (e14.previousElementSibling) return e14.previousElementSibling;
                  var t12 = e14;
                  do
                    t12 = t12.previousSibling;
                  while (t12 && !tr(t12));
                  return t12;
                }(c4); ) o4++, c4.tagName === e13.tagName && l4++;
                return n4.nth_child = o4, n4.nth_of_type = l4, n4;
              }(e12, a3, o3, l3)), eP(g2, function(e13) {
                if (!tb(e13)) return {};
                var t11 = {};
                return eS(e13.attributes, function(e14) {
                  if (e14.name && 0 === e14.name.indexOf("data-ph-capture-attribute")) {
                    var i12 = e14.name.replace("data-ph-capture-attribute-", ""), s12 = e14.value;
                    i12 && s12 && tI(s12) && (t11[i12] = s12);
                  }
                }), t11;
              }(e12));
            }), v2) return { props: {}, explicitNoCapture: v2 };
            if (o3 || ("a" === e11.tagName.toLowerCase() || "button" === e11.tagName.toLowerCase() ? p2[0].$el_text = tF(e11) : p2[0].$el_text = td(e11)), _2) {
              p2[0].attr__href = _2;
              var m2, y2, w2 = null == (m2 = tA(_2)) ? void 0 : m2.host, E2 = null == t || null == (y2 = t.location) ? void 0 : y2.host;
              w2 && E2 && w2 !== E2 && (d2 = _2);
            }
            return { props: eP({ $event_type: n3.type, $ce_version: 1 }, c3 ? {} : { $elements: p2 }, { $elements_chain: p2.map((e12) => {
              var t10, i12, s12, r12 = { text: null == (i12 = e12.$el_text) ? void 0 : i12.slice(0, 400), tag_name: e12.tag_name, href: null == (s12 = e12.attr__href) ? void 0 : s12.slice(0, 2048), attr_class: (t10 = e12.attr__class) ? $(t10) ? t10 : tl(t10) : void 0, attr_id: e12.attr__id, nth_child: e12.nth_child, nth_of_type: e12.nth_of_type, attributes: {} };
              return eI(e12).filter((e13) => {
                var [t11] = e13;
                return 0 === t11.indexOf("attr__");
              }).forEach((e13) => {
                var [t11, i13] = e13;
                return r12.attributes[t11] = i13;
              }), r12;
            }).map((e12) => {
              var t10, i12, s12 = "";
              if (e12.tag_name && (s12 += e12.tag_name), e12.attr_class) for (var r12 of (e12.attr_class.sort(), e12.attr_class)) s12 += "." + r12.replace(/"/g, "");
              var n4 = f({}, e12.text ? { text: e12.text } : {}, { "nth-child": null != (t10 = e12.nth_child) ? t10 : 0, "nth-of-type": null != (i12 = e12.nth_of_type) ? i12 : 0 }, e12.href ? { href: e12.href } : {}, e12.attr_id ? { attr_id: e12.attr_id } : {}, e12.attributes), a4 = {};
              return eI(n4).sort((e13, t11) => {
                var [i13] = e13, [s13] = t11;
                return i13.localeCompare(s13);
              }).forEach((e13) => {
                var [t11, i13] = e13;
                return a4[tO(t11.toString())] = tO(i13.toString());
              }), s12 += ":", s12 += eI(a4).map((e13) => {
                var [t11, i13] = e13;
                return t11 + '="' + i13 + '"';
              }).join("");
            }).join(";") }, null != (s11 = p2[0]) && s11.$el_text ? { $el_text: null == (r11 = p2[0]) ? void 0 : r11.$el_text } : {}, d2 && "click" === n3.type ? { $external_click_url: d2 } : {}, g2) };
          }(r10, { e: e10, maskAllElementAttributes: this.instance.config.mask_all_element_attributes, maskAllText: this.instance.config.mask_all_text, elementAttributeIgnoreList: this.A.element_attribute_ignorelist, elementsChainAsString: this.F });
          if (o2) return false;
          var l2 = this.getElementSelectors(r10);
          if (l2 && l2.length > 0 && (a2.$element_selectors = l2), i10 === tC) {
            var c2, u2 = th(null == t || null == (c2 = t.getSelection()) ? void 0 : c2.toString()), h2 = e10.type || "clipboard";
            if (!u2) return false;
            a2.$selected_content = u2, a2.$copy_type = h2;
          }
          return this.instance.capture(i10, a2), true;
        }
      }
    }
    isBrowserSupported() {
      return I(null == o ? void 0 : o.querySelectorAll);
    }
  }
  Math.trunc || (Math.trunc = function(e10) {
    return e10 < 0 ? Math.ceil(e10) : Math.floor(e10);
  }), Number.isInteger || (Number.isInteger = function(e10) {
    return D(e10) && isFinite(e10) && Math.floor(e10) === e10;
  });
  var tH = "0123456789abcdef";
  class tG {
    constructor(e10) {
      if (this.bytes = e10, 16 !== e10.length) throw TypeError("not 128-bit length");
    }
    static fromFieldsV7(e10, t10, i10, s10) {
      if (!Number.isInteger(e10) || !Number.isInteger(t10) || !Number.isInteger(i10) || !Number.isInteger(s10) || e10 < 0 || t10 < 0 || i10 < 0 || s10 < 0 || e10 > 281474976710655 || t10 > 4095 || i10 > 1073741823 || s10 > 4294967295) throw RangeError("invalid field value");
      var r10 = new Uint8Array(16);
      return r10[0] = e10 / 1099511627776, r10[1] = e10 / 4294967296, r10[2] = e10 / 16777216, r10[3] = e10 / 65536, r10[4] = e10 / 256, r10[5] = e10, r10[6] = 112 | t10 >>> 8, r10[7] = t10, r10[8] = 128 | i10 >>> 24, r10[9] = i10 >>> 16, r10[10] = i10 >>> 8, r10[11] = i10, r10[12] = s10 >>> 24, r10[13] = s10 >>> 16, r10[14] = s10 >>> 8, r10[15] = s10, new tG(r10);
    }
    toString() {
      for (var e10 = "", t10 = 0; t10 < this.bytes.length; t10++) e10 = e10 + tH.charAt(this.bytes[t10] >>> 4) + tH.charAt(15 & this.bytes[t10]), 3 !== t10 && 5 !== t10 && 7 !== t10 && 9 !== t10 || (e10 += "-");
      if (36 !== e10.length) throw Error("Invalid UUIDv7 was generated");
      return e10;
    }
    clone() {
      return new tG(this.bytes.slice(0));
    }
    equals(e10) {
      return 0 === this.compareTo(e10);
    }
    compareTo(e10) {
      for (var t10 = 0; t10 < 16; t10++) {
        var i10 = this.bytes[t10] - e10.bytes[t10];
        if (0 !== i10) return Math.sign(i10);
      }
      return 0;
    }
  }
  class tB {
    constructor() {
      this.N = 0, this.U = 0, this.H = new tY();
    }
    generate() {
      var e10 = this.generateOrAbort();
      if (R(e10)) {
        this.N = 0;
        var t10 = this.generateOrAbort();
        if (R(t10)) throw Error("Could not generate UUID after timestamp reset");
        return t10;
      }
      return e10;
    }
    generateOrAbort() {
      var e10 = Date.now();
      if (e10 > this.N) this.N = e10, this.B();
      else {
        if (!(e10 + 1e4 > this.N)) return;
        this.U++, this.U > 4398046511103 && (this.N++, this.B());
      }
      return tG.fromFieldsV7(this.N, Math.trunc(this.U / 1073741824), 1073741823 & this.U, this.H.nextUint32());
    }
    B() {
      this.U = 1024 * this.H.nextUint32() + (1023 & this.H.nextUint32());
    }
  }
  var tW, tV, tz = (e10) => {
    if ("u" > typeof UUIDV7_DENY_WEAK_RNG && UUIDV7_DENY_WEAK_RNG) throw Error("no cryptographically strong RNG available");
    for (var t10 = 0; t10 < e10.length; t10++) e10[t10] = 65536 * Math.trunc(65536 * Math.random()) + Math.trunc(65536 * Math.random());
    return e10;
  };
  t && !R(t.crypto) && crypto.getRandomValues && (tz = (e10) => crypto.getRandomValues(e10));
  class tY {
    constructor() {
      this.q = new Uint32Array(8), this.W = 1 / 0;
    }
    nextUint32() {
      return this.W >= this.q.length && (tz(this.q), this.W = 0), this.q[this.W++];
    }
  }
  var tX = () => tJ().toString(), tJ = () => (tV || (tV = new tB())).generate(), tK = "", tQ = /[a-z0-9][a-z0-9-]+\.[a-z]{2,}$/i, tZ = { G: () => !!o, V: function(e10) {
    ey.error("cookieStore error: " + e10);
  }, J: function(e10) {
    if (o) {
      try {
        for (var t10 = e10 + "=", i10 = o.cookie.split(";").filter((e11) => e11.length), s10 = 0; s10 < i10.length; s10++) {
          for (var r10 = i10[s10]; " " == r10.charAt(0); ) r10 = r10.substring(1, r10.length);
          if (0 === r10.indexOf(t10)) return decodeURIComponent(r10.substring(t10.length, r10.length));
        }
      } catch (e11) {
      }
      return null;
    }
  }, K: function(e10) {
    var t10;
    try {
      t10 = JSON.parse(tZ.J(e10)) || {};
    } catch (e11) {
    }
    return t10;
  }, Y: function(e10, t10, i10, s10, r10) {
    if (o) try {
      var n2 = "", a2 = "", l2 = function(e11, t11) {
        if (t11) {
          var i11 = function(e12, t12) {
            if (void 0 === t12 && (t12 = o), tK) return tK;
            if (!t12 || ["localhost", "127.0.0.1"].includes(e12)) return "";
            for (var i12 = e12.split("."), s12 = Math.min(i12.length, 8), r12 = "dmn_chk_" + tX(); !tK && s12--; ) {
              var n3 = i12.slice(s12).join("."), a3 = r12 + "=1;domain=." + n3 + ";path=/";
              t12.cookie = a3 + ";max-age=3", t12.cookie.includes(r12) && (t12.cookie = a3 + ";max-age=0", tK = n3);
            }
            return tK;
          }(e11);
          if (!i11) {
            var s11, r11 = (s11 = e11.match(tQ)) ? s11[0] : "";
            r11 !== i11 && ey.info("Warning: cookie subdomain discovery mismatch", r11, i11), i11 = r11;
          }
          return i11 ? "; domain=." + i11 : "";
        }
        return "";
      }(o.location.hostname, s10);
      if (i10) {
        var c2 = /* @__PURE__ */ new Date();
        c2.setTime(c2.getTime() + 24 * i10 * 36e5), n2 = "; expires=" + c2.toUTCString();
      }
      r10 && (a2 = "; secure");
      var u2 = e10 + "=" + encodeURIComponent(JSON.stringify(t10)) + n2 + "; SameSite=Lax; path=/" + l2 + a2;
      return u2.length > 3686.4 && ey.warn("cookieStore warning: large cookie, len=" + u2.length), o.cookie = u2, u2;
    } catch (e11) {
      return;
    }
  }, X: function(e10, t10) {
    if (null != o && o.cookie) try {
      tZ.Y(e10, "", -1, t10);
    } catch (e11) {
      return;
    }
  } }, t0 = null, t1 = { G: function() {
    if (!A(t0)) return t0;
    var e10 = true;
    if (R(t)) e10 = false;
    else try {
      var i10 = "__mplssupport__";
      t1.Y(i10, "xyz"), '"xyz"' !== t1.J(i10) && (e10 = false), t1.X(i10);
    } catch (t10) {
      e10 = false;
    }
    return e10 || ey.error("localStorage unsupported; falling back to cookie store"), t0 = e10, e10;
  }, V: function(e10) {
    ey.error("localStorage error: " + e10);
  }, J: function(e10) {
    try {
      return null == t ? void 0 : t.localStorage.getItem(e10);
    } catch (e11) {
      t1.V(e11);
    }
    return null;
  }, K: function(e10) {
    try {
      return JSON.parse(t1.J(e10)) || {};
    } catch (e11) {
    }
    return null;
  }, Y: function(e10, i10) {
    try {
      null == t || t.localStorage.setItem(e10, JSON.stringify(i10));
    } catch (e11) {
      t1.V(e11);
    }
  }, X: function(e10) {
    try {
      null == t || t.localStorage.removeItem(e10);
    } catch (e11) {
      t1.V(e11);
    }
  } }, t2 = ["distinct_id", ez, eY, e9, e7], t3 = f({}, t1, { K: function(e10) {
    try {
      var t10 = {};
      try {
        t10 = tZ.K(e10) || {};
      } catch (e11) {
      }
      var i10 = eP(t10, JSON.parse(t1.J(e10) || "{}"));
      return t1.Y(e10, i10), i10;
    } catch (e11) {
    }
    return null;
  }, Y: function(e10, t10, i10, s10, r10, n2) {
    try {
      t1.Y(e10, t10, void 0, void 0, n2);
      var a2 = {};
      t2.forEach((e11) => {
        t10[e11] && (a2[e11] = t10[e11]);
      }), Object.keys(a2).length && tZ.Y(e10, a2, i10, s10, r10, n2);
    } catch (e11) {
      t1.V(e11);
    }
  }, X: function(e10, i10) {
    try {
      null == t || t.localStorage.removeItem(e10), tZ.X(e10, i10);
    } catch (e11) {
      t1.V(e11);
    }
  } }), t5 = {}, t8 = { G: function() {
    return true;
  }, V: function(e10) {
    ey.error("memoryStorage error: " + e10);
  }, J: function(e10) {
    return t5[e10] || null;
  }, K: function(e10) {
    return t5[e10] || null;
  }, Y: function(e10, t10) {
    t5[e10] = t10;
  }, X: function(e10) {
    delete t5[e10];
  } }, t6 = null, t4 = { G: function() {
    if (!A(t6)) return t6;
    if (t6 = true, R(t)) t6 = false;
    else try {
      var e10 = "__support__";
      t4.Y(e10, "xyz"), '"xyz"' !== t4.J(e10) && (t6 = false), t4.X(e10);
    } catch (e11) {
      t6 = false;
    }
    return t6;
  }, V: function(e10) {
    ey.error("sessionStorage error: ", e10);
  }, J: function(e10) {
    try {
      return null == t ? void 0 : t.sessionStorage.getItem(e10);
    } catch (e11) {
      t4.V(e11);
    }
    return null;
  }, K: function(e10) {
    try {
      return JSON.parse(t4.J(e10)) || null;
    } catch (e11) {
    }
    return null;
  }, Y: function(e10, i10) {
    try {
      null == t || t.sessionStorage.setItem(e10, JSON.stringify(i10));
    } catch (e11) {
      t4.V(e11);
    }
  }, X: function(e10) {
    try {
      null == t || t.sessionStorage.removeItem(e10);
    } catch (e11) {
      t4.V(e11);
    }
  } }, t7 = ((nr = {})[nr.PENDING = -1] = "PENDING", nr[nr.DENIED = 0] = "DENIED", nr[nr.GRANTED = 1] = "GRANTED", nr);
  class t9 {
    constructor(e10) {
      this._instance = e10;
    }
    get A() {
      return this._instance.config;
    }
    get consent() {
      return this.Z() ? t7.DENIED : this.tt;
    }
    isOptedOut() {
      return "always" === this.A.cookieless_mode || this.consent === t7.DENIED || this.consent === t7.PENDING && (this.A.opt_out_capturing_by_default || "on_reject" === this.A.cookieless_mode);
    }
    isOptedIn() {
      return !this.isOptedOut();
    }
    isExplicitlyOptedOut() {
      return this.consent === t7.DENIED;
    }
    optInOut(e10) {
      this.it.Y(this.et, +!!e10, this.A.cookie_expiration, this.A.cross_subdomain_cookie, this.A.secure_cookie);
    }
    reset() {
      this.it.X(this.et, this.A.cross_subdomain_cookie);
    }
    get et() {
      var { token: e10, opt_out_capturing_cookie_prefix: t10, consent_persistence_name: i10 } = this._instance.config;
      return i10 || (t10 ? t10 + e10 : "__ph_opt_in_out_" + e10);
    }
    get tt() {
      var e10 = this.it.J(this.et);
      return b(H, e10) ? t7.GRANTED : b(G, e10) ? t7.DENIED : t7.PENDING;
    }
    get it() {
      if (!this.rt) {
        var e10 = this.A.opt_out_capturing_persistence_type;
        this.rt = "localStorage" === e10 ? t1 : tZ;
        var t10 = "localStorage" === e10 ? tZ : t1;
        t10.J(this.et) && (this.rt.J(this.et) || this.optInOut(b(H, t10.J(this.et))), t10.X(this.et, this.A.cross_subdomain_cookie));
      }
      return this.rt;
    }
    Z() {
      return !!this.A.respect_dnt && !!eT([null == a ? void 0 : a.doNotTrack, null == a ? void 0 : a.msDoNotTrack, p.doNotTrack], (e10) => b(H, e10));
    }
  }
  var ie = eb("[Dead Clicks]"), it = () => true, ii = (e10) => {
    var t10, i10 = !(null == (t10 = e10.instance.persistence) || !t10.get_property(eB)), s10 = e10.instance.config.capture_dead_clicks;
    return L(s10) ? s10 : i10;
  };
  class is {
    get lazyLoadedDeadClicksAutocapture() {
      return this.st;
    }
    constructor(e10, t10, i10) {
      this.instance = e10, this.isEnabled = t10, this.onCapture = i10, this.startIfEnabled();
    }
    onRemoteConfig(e10) {
      this.instance.persistence && this.instance.persistence.register({ [eB]: null == e10 ? void 0 : e10.captureDeadClicks }), this.startIfEnabled();
    }
    startIfEnabled() {
      this.isEnabled(this) && this.nt(() => {
        this.ot();
      });
    }
    nt(e10) {
      var t10, i10;
      null != (t10 = p.__PosthogExtensions__) && t10.initDeadClicksAutocapture && e10(), null == (i10 = p.__PosthogExtensions__) || null == i10.loadExternalDependency || i10.loadExternalDependency(this.instance, "dead-clicks-autocapture", (t11) => {
        t11 ? ie.error("failed to load script", t11) : e10();
      });
    }
    ot() {
      var e10;
      if (o) {
        if (!this.st && null != (e10 = p.__PosthogExtensions__) && e10.initDeadClicksAutocapture) {
          var t10 = F(this.instance.config.capture_dead_clicks) ? this.instance.config.capture_dead_clicks : {};
          t10.__onCapture = this.onCapture, this.st = p.__PosthogExtensions__.initDeadClicksAutocapture(this.instance, t10), this.st.start(o), ie.info("starting...");
        }
      } else ie.error("`document` not found. Cannot start.");
    }
    stop() {
      this.st && (this.st.stop(), this.st = void 0, ie.info("stopping..."));
    }
  }
  var ir = eb("[ExceptionAutocapture]");
  class ia {
    constructor(e10) {
      var i10, s10, r10;
      this.lt = () => {
        var e11;
        if (t && this.isEnabled && null != (e11 = p.__PosthogExtensions__) && e11.errorWrappingFunctions) {
          var i11 = p.__PosthogExtensions__.errorWrappingFunctions.wrapOnError, s11 = p.__PosthogExtensions__.errorWrappingFunctions.wrapUnhandledRejection, r11 = p.__PosthogExtensions__.errorWrappingFunctions.wrapConsoleError;
          try {
            !this.ut && this.A.capture_unhandled_errors && (this.ut = i11(this.captureException.bind(this))), !this.ht && this.A.capture_unhandled_rejections && (this.ht = s11(this.captureException.bind(this))), !this.dt && this.A.capture_console_errors && (this.dt = r11(this.captureException.bind(this)));
          } catch (e12) {
            ir.error("failed to start", e12), this.vt();
          }
        }
      }, this._instance = e10, this.ct = !(null == (i10 = this._instance.persistence) || !i10.props[eq]), this.A = this.ft(), this.gt = new W({ refillRate: null != (s10 = this._instance.config.error_tracking.__exceptionRateLimiterRefillRate) ? s10 : 1, bucketSize: null != (r10 = this._instance.config.error_tracking.__exceptionRateLimiterBucketSize) ? r10 : 10, refillInterval: 1e4, P: ir }), this.startIfEnabled();
    }
    ft() {
      var e10 = this._instance.config.capture_exceptions, t10 = { capture_unhandled_errors: false, capture_unhandled_rejections: false, capture_console_errors: false };
      return F(e10) ? t10 = f({}, t10, e10) : (R(e10) ? this.ct : e10) && (t10 = f({}, t10, { capture_unhandled_errors: true, capture_unhandled_rejections: true })), t10;
    }
    get isEnabled() {
      return this.A.capture_console_errors || this.A.capture_unhandled_errors || this.A.capture_unhandled_rejections;
    }
    startIfEnabled() {
      this.isEnabled && (ir.info("enabled"), this.nt(this.lt));
    }
    nt(e10) {
      var t10, i10;
      null != (t10 = p.__PosthogExtensions__) && t10.errorWrappingFunctions && e10(), null == (i10 = p.__PosthogExtensions__) || null == i10.loadExternalDependency || i10.loadExternalDependency(this._instance, "exception-autocapture", (t11) => {
        if (t11) return ir.error("failed to load script", t11);
        e10();
      });
    }
    vt() {
      var e10, t10, i10;
      null == (e10 = this.ut) || e10.call(this), this.ut = void 0, null == (t10 = this.ht) || t10.call(this), this.ht = void 0, null == (i10 = this.dt) || i10.call(this), this.dt = void 0;
    }
    onRemoteConfig(e10) {
      var t10 = e10.autocaptureExceptions;
      this.ct = !!t10, this.A = this.ft(), this._instance.persistence && this._instance.persistence.register({ [eq]: this.ct }), this.startIfEnabled();
    }
    captureException(e10) {
      var t10, i10, s10 = null != (t10 = null == e10 || null == (i10 = e10.$exception_list) || null == (i10 = i10[0]) ? void 0 : i10.type) ? t10 : "Exception";
      this.gt.consumeRateLimit(s10) ? ir.info("Skipping exception capture because of client rate limiting.", { exception: s10 }) : this._instance.exceptions.sendExceptionEvent(e10);
    }
  }
  function io(e10, t10, i10) {
    try {
      if (!(t10 in e10)) return () => {
      };
      var s10 = e10[t10], r10 = i10(s10);
      return I(r10) && (r10.prototype = r10.prototype || {}, Object.defineProperties(r10, { __posthog_wrapped__: { enumerable: false, value: true } })), e10[t10] = r10, () => {
        e10[t10] = s10;
      };
    } catch (e11) {
      return () => {
      };
    }
  }
  class il {
    constructor(e10) {
      var i10;
      this._instance = e10, this._t = (null == t || null == (i10 = t.location) ? void 0 : i10.pathname) || "";
    }
    get isEnabled() {
      return "history_change" === this._instance.config.capture_pageview;
    }
    startIfEnabled() {
      this.isEnabled && (ey.info("History API monitoring enabled, starting..."), this.monitorHistoryChanges());
    }
    stop() {
      this.yt && this.yt(), this.yt = void 0, ey.info("History API monitoring stopped");
    }
    monitorHistoryChanges() {
      var e10, i10;
      if (t && t.history) {
        var s10 = this;
        null != (e10 = t.history.pushState) && e10.__posthog_wrapped__ || io(t.history, "pushState", (e11) => function(t10, i11, r10) {
          e11.call(this, t10, i11, r10), s10.bt("pushState");
        }), null != (i10 = t.history.replaceState) && i10.__posthog_wrapped__ || io(t.history, "replaceState", (e11) => function(t10, i11, r10) {
          e11.call(this, t10, i11, r10), s10.bt("replaceState");
        }), this.wt();
      }
    }
    bt(e10) {
      try {
        var i10, s10 = null == t || null == (i10 = t.location) ? void 0 : i10.pathname;
        if (!s10) return;
        s10 !== this._t && this.isEnabled && this._instance.capture("$pageview", { navigation_type: e10 }), this._t = s10;
      } catch (t10) {
        ey.error("Error capturing " + e10 + " pageview", t10);
      }
    }
    wt() {
      if (!this.yt) {
        var e10 = () => {
          this.bt("popstate");
        };
        eA(t, "popstate", e10), this.yt = () => {
          t && t.removeEventListener("popstate", e10);
        };
      }
    }
  }
  var ic = eb("[SegmentIntegration]"), iu = "posthog-js";
  function ih(e10, t10) {
    var { organization: i10, projectId: s10, prefix: r10, severityAllowList: n2 = ["error"], sendExceptionsToPostHog: a2 = true } = void 0 === t10 ? {} : t10;
    return (t11) => {
      if (!("*" === n2 || n2.includes(t11.level)) || !e10.__loaded) return t11;
      t11.tags || (t11.tags = {});
      var o2, l2, c2, u2, h2, d2 = e10.requestRouter.endpointFor("ui", "/project/" + e10.config.token + "/person/" + e10.get_distinct_id());
      t11.tags["PostHog Person URL"] = d2, e10.sessionRecordingStarted() && (t11.tags["PostHog Recording URL"] = e10.get_session_replay_url({ withTimestamp: true }));
      var p2 = (null == (o2 = t11.exception) ? void 0 : o2.values) || [], g2 = p2.map((e11) => f({}, e11, { stacktrace: e11.stacktrace ? f({}, e11.stacktrace, { type: "raw", frames: (e11.stacktrace.frames || []).map((e12) => f({}, e12, { platform: "web:javascript" })) }) : void 0 })), _2 = { $exception_message: (null == (l2 = p2[0]) ? void 0 : l2.value) || t11.message, $exception_type: null == (c2 = p2[0]) ? void 0 : c2.type, $exception_level: t11.level, $exception_list: g2, $sentry_event_id: t11.event_id, $sentry_exception: t11.exception, $sentry_exception_message: (null == (u2 = p2[0]) ? void 0 : u2.value) || t11.message, $sentry_exception_type: null == (h2 = p2[0]) ? void 0 : h2.type, $sentry_tags: t11.tags };
      return i10 && s10 && (_2.$sentry_url = (r10 || "https://sentry.io/organizations/") + i10 + "/issues/?project=" + s10 + "&query=" + t11.event_id), a2 && e10.exceptions.sendExceptionEvent(_2), t11;
    };
  }
  class id {
    constructor(e10, t10, i10, s10, r10, n2) {
      this.name = iu, this.setupOnce = function(a2) {
        a2(ih(e10, { organization: t10, projectId: i10, prefix: s10, severityAllowList: r10, sendExceptionsToPostHog: null == n2 || n2 }));
      };
    }
  }
  var ip = null != t && t.location ? tN(t.location.hash, "__posthog") || tN(location.hash, "state") : null, ig = "_postHogToolbarParams", i_ = eb("[Toolbar]"), iv = ((nn = iv || {})[nn.UNINITIALIZED = 0] = "UNINITIALIZED", nn[nn.LOADING = 1] = "LOADING", nn[nn.LOADED = 2] = "LOADED", nn);
  class im {
    constructor(e10) {
      this.instance = e10;
    }
    xt(e10) {
      p.ph_toolbar_state = e10;
    }
    St() {
      var e10;
      return null != (e10 = p.ph_toolbar_state) ? e10 : iv.UNINITIALIZED;
    }
    maybeLoadToolbar(e10, i10, s10) {
      if (void 0 === e10 && (e10 = void 0), void 0 === i10 && (i10 = void 0), void 0 === s10 && (s10 = void 0), !t || !o) return false;
      e10 = null != e10 ? e10 : t.location, s10 = null != s10 ? s10 : t.history;
      try {
        if (!i10) {
          try {
            t.localStorage.setItem("test", "test"), t.localStorage.removeItem("test");
          } catch (e11) {
            return false;
          }
          i10 = null == t ? void 0 : t.localStorage;
        }
        var r10, n2 = ip || tN(e10.hash, "__posthog") || tN(e10.hash, "state"), a2 = n2 ? eF(() => JSON.parse(atob(decodeURIComponent(n2)))) || eF(() => JSON.parse(decodeURIComponent(n2))) : null;
        return a2 && "ph_authorize" === a2.action ? ((r10 = a2).source = "url", r10 && Object.keys(r10).length > 0 && (a2.desiredHash ? e10.hash = a2.desiredHash : s10 ? s10.replaceState(s10.state, "", e10.pathname + e10.search) : e10.hash = "")) : ((r10 = JSON.parse(i10.getItem(ig) || "{}")).source = "localstorage", delete r10.userIntent), !(!r10.token || this.instance.config.token !== r10.token) && (this.loadToolbar(r10), true);
      } catch (e11) {
        return false;
      }
    }
    Et(e10) {
      var t10 = p.ph_load_toolbar || p.ph_load_editor;
      !M(t10) && I(t10) ? t10(e10, this.instance) : i_.warn("No toolbar load function found");
    }
    loadToolbar(e10) {
      var i10, s10 = !(null == o || !o.getElementById(te));
      if (!t || s10) return false;
      var r10 = "custom" === this.instance.requestRouter.region && this.instance.config.advanced_disable_toolbar_metrics, n2 = f({ token: this.instance.config.token }, e10, { apiURL: this.instance.requestRouter.endpointFor("ui") }, r10 ? { instrument: false } : {});
      return (t.localStorage.setItem(ig, JSON.stringify(f({}, n2, { source: void 0 }))), this.St() === iv.LOADED) ? this.Et(n2) : this.St() === iv.UNINITIALIZED && (this.xt(iv.LOADING), null == (i10 = p.__PosthogExtensions__) || null == i10.loadExternalDependency || i10.loadExternalDependency(this.instance, "toolbar", (e11) => {
        e11 ? (i_.error("[Toolbar] Failed to load", e11), this.xt(iv.UNINITIALIZED)) : (this.xt(iv.LOADED), this.Et(n2));
      }), eA(t, "turbolinks:load", () => {
        this.xt(iv.UNINITIALIZED), this.loadToolbar(n2);
      })), true;
    }
    $t(e10) {
      return this.loadToolbar(e10);
    }
    maybeLoadEditor(e10, t10, i10) {
      return void 0 === e10 && (e10 = void 0), void 0 === t10 && (t10 = void 0), void 0 === i10 && (i10 = void 0), this.maybeLoadToolbar(e10, t10, i10);
    }
  }
  var iy = eb("[TracingHeaders]");
  class ib {
    constructor(e10) {
      this.kt = void 0, this.Pt = void 0, this.lt = () => {
        var e11, t10;
        R(this.kt) && (null == (e11 = p.__PosthogExtensions__) || null == (e11 = e11.tracingHeadersPatchFns) || e11._patchXHR(this._instance.config.__add_tracing_headers || [], this._instance.get_distinct_id(), this._instance.sessionManager)), R(this.Pt) && (null == (t10 = p.__PosthogExtensions__) || null == (t10 = t10.tracingHeadersPatchFns) || t10._patchFetch(this._instance.config.__add_tracing_headers || [], this._instance.get_distinct_id(), this._instance.sessionManager));
      }, this._instance = e10;
    }
    nt(e10) {
      var t10, i10;
      null != (t10 = p.__PosthogExtensions__) && t10.tracingHeadersPatchFns && e10(), null == (i10 = p.__PosthogExtensions__) || null == i10.loadExternalDependency || i10.loadExternalDependency(this._instance, "tracing-headers", (t11) => {
        if (t11) return iy.error("failed to load script", t11);
        e10();
      });
    }
    startIfEnabledOrStop() {
      var e10, t10;
      this._instance.config.__add_tracing_headers ? this.nt(this.lt) : (null == (e10 = this.kt) || e10.call(this), null == (t10 = this.Pt) || t10.call(this), this.kt = void 0, this.Pt = void 0);
    }
  }
  var iw = "Mobile", iE = "Android", ix = "Tablet", ik = iE + " " + ix, iS = "iPad", iP = "Apple", i$ = iP + " Watch", iI = "Safari", iF = "BlackBerry", iO = "Samsung", iR = iO + "Browser", iC = iO + " Internet", iT = "Chrome", iA = iT + " OS", iM = iT + " iOS", iD = "Internet Explorer", iL = iD + " " + iw, iN = "Opera", ij = iN + " Mini", iq = "Edge", iU = "Microsoft " + iq, iH = "Firefox", iG = iH + " iOS", iB = "Nintendo", iW = "PlayStation", iV = "Xbox", iz = iE + " " + iw, iY = iw + " " + iI, iX = "Windows", iJ = iX + " Phone", iK = "Nokia", iQ = "Ouya", iZ = "Generic", i0 = iZ + " " + iw.toLowerCase(), i1 = iZ + " " + ix.toLowerCase(), i2 = "Konqueror", i3 = "(\\d+(\\.\\d+)?)", i5 = RegExp("Version/" + i3), i8 = RegExp(iV, "i"), i6 = RegExp(iW + " \\w+", "i"), i4 = RegExp(iB + " \\w+", "i"), i7 = RegExp(iF + "|PlayBook|BB10", "i"), i9 = { "NT3.51": "NT 3.11", "NT4.0": "NT 4.0", "5.0": "2000", 5.1: "XP", 5.2: "XP", "6.0": "Vista", 6.1: "7", 6.2: "8", 6.3: "8.1", 6.4: "10", "10.0": "10" }, se = function(e10, t10) {
    var i10;
    return t10 = t10 || "", b(e10, " OPR/") && b(e10, "Mini") ? ij : b(e10, " OPR/") ? iN : i7.test(e10) ? iF : b(e10, "IE" + iw) || b(e10, "WPDesktop") ? iL : b(e10, iR) ? iC : b(e10, iq) || b(e10, "Edg/") ? iU : b(e10, "FBIOS") ? "Facebook " + iw : b(e10, "UCWEB") || b(e10, "UCBrowser") ? "UC Browser" : b(e10, "CriOS") ? iM : b(e10, "CrMo") || b(e10, iT) ? iT : b(e10, iE) && b(e10, iI) ? iz : b(e10, "FxiOS") ? iG : b(e10.toLowerCase(), i2.toLowerCase()) ? i2 : (i10 = t10) && b(i10, iP) || b(e10, iI) && !b(e10, iT) && !b(e10, iE) ? b(e10, iw) ? iY : iI : b(e10, iH) ? iH : b(e10, "MSIE") || b(e10, "Trident/") ? iD : b(e10, "Gecko") ? iH : "";
  }, st = { [iL]: [RegExp("rv:" + i3)], [iU]: [RegExp(iq + "?\\/" + i3)], [iT]: [RegExp("(" + iT + "|CrMo)\\/" + i3)], [iM]: [RegExp("CriOS\\/" + i3)], "UC Browser": [RegExp("(UCBrowser|UCWEB)\\/" + i3)], [iI]: [i5], [iY]: [i5], [iN]: [RegExp("(Opera|OPR)\\/" + i3)], [iH]: [RegExp(iH + "\\/" + i3)], [iG]: [RegExp("FxiOS\\/" + i3)], [i2]: [RegExp("Konqueror[:/]?" + i3, "i")], [iF]: [RegExp(iF + " " + i3), i5], [iz]: [RegExp("android\\s" + i3, "i")], [iC]: [RegExp(iR + "\\/" + i3)], [iD]: [RegExp("(rv:|MSIE )" + i3)], Mozilla: [RegExp("rv:" + i3)] }, si = function(e10, t10) {
    var i10 = st[se(e10, t10)];
    if (R(i10)) return null;
    for (var s10 = 0; s10 < i10.length; s10++) {
      var r10 = i10[s10], n2 = e10.match(r10);
      if (n2) return parseFloat(n2[n2.length - 2]);
    }
    return null;
  }, ss = [[RegExp(iV + "; " + iV + " (.*?)[);]", "i"), (e10) => [iV, e10 && e10[1] || ""]], [RegExp(iB, "i"), [iB, ""]], [RegExp(iW, "i"), [iW, ""]], [i7, [iF, ""]], [RegExp(iX, "i"), (e10, t10) => {
    if (/Phone/.test(t10) || /WPDesktop/.test(t10)) return [iJ, ""];
    if (new RegExp(iw).test(t10) && !/IEMobile\b/.test(t10)) return [iX + " " + iw, ""];
    var i10 = /Windows NT ([0-9.]+)/i.exec(t10);
    if (i10 && i10[1]) {
      var s10 = i9[i10[1]] || "";
      return /arm/i.test(t10) && (s10 = "RT"), [iX, s10];
    }
    return [iX, ""];
  }], [/((iPhone|iPad|iPod).*?OS (\d+)_(\d+)_?(\d+)?|iPhone)/, (e10) => e10 && e10[3] ? ["iOS", [e10[3], e10[4], e10[5] || "0"].join(".")] : ["iOS", ""]], [/(watch.*\/(\d+\.\d+\.\d+)|watch os,(\d+\.\d+),)/i, (e10) => {
    var t10 = "";
    return e10 && e10.length >= 3 && (t10 = R(e10[2]) ? e10[3] : e10[2]), ["watchOS", t10];
  }], [RegExp("(" + iE + " (\\d+)\\.(\\d+)\\.?(\\d+)?|" + iE + ")", "i"), (e10) => e10 && e10[2] ? [iE, [e10[2], e10[3], e10[4] || "0"].join(".")] : [iE, ""]], [/Mac OS X (\d+)[_.](\d+)[_.]?(\d+)?/i, (e10) => {
    var t10 = ["Mac OS X", ""];
    if (e10 && e10[1]) {
      var i10 = [e10[1], e10[2], e10[3] || "0"];
      t10[1] = i10.join(".");
    }
    return t10;
  }], [/Mac/i, ["Mac OS X", ""]], [/CrOS/, [iA, ""]], [/Linux|debian/i, ["Linux", ""]]], sr = function(e10) {
    return i4.test(e10) ? iB : i6.test(e10) ? iW : i8.test(e10) ? iV : RegExp(iQ, "i").test(e10) ? iQ : RegExp("(" + iJ + "|WPDesktop)", "i").test(e10) ? iJ : /iPad/.test(e10) ? iS : /iPod/.test(e10) ? "iPod Touch" : /iPhone/.test(e10) ? "iPhone" : /(watch)(?: ?os[,/]|\d,\d\/)[\d.]+/i.test(e10) ? i$ : i7.test(e10) ? iF : /(kobo)\s(ereader|touch)/i.test(e10) ? "Kobo" : RegExp(iK, "i").test(e10) ? iK : /(kf[a-z]{2}wi|aeo[c-r]{2})( bui|\))/i.test(e10) || /(kf[a-z]+)( bui|\)).+silk\//i.test(e10) ? "Kindle Fire" : /(Android|ZTE)/i.test(e10) ? !new RegExp(iw).test(e10) || /(9138B|TB782B|Nexus [97]|pixel c|HUAWEISHT|BTV|noble nook|smart ultra 6)/i.test(e10) ? /pixel[\daxl ]{1,6}/i.test(e10) && !/pixel c/i.test(e10) || /(huaweimed-al00|tah-|APA|SM-G92|i980|zte|U304AA)/i.test(e10) || /lmy47v/i.test(e10) && !/QTAQZ3/i.test(e10) ? iE : ik : iE : RegExp("(pda|" + iw + ")", "i").test(e10) ? i0 : RegExp(ix, "i").test(e10) && !RegExp(ix + " pc", "i").test(e10) ? i1 : "";
  }, sn = "https?://(.*)", sa = ["gclid", "gclsrc", "dclid", "gbraid", "wbraid", "fbclid", "msclkid", "twclid", "li_fat_id", "igshid", "ttclid", "rdt_cid", "epik", "qclid", "sccid", "irclid", "_kx"], so = e$(["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "gad_source", "mc_cid"], sa), sl = "<masked>", sc = ["li_fat_id"];
  function su(e10, t10, i10) {
    if (!o) return {};
    var s10, r10 = t10 ? e$([], sa, i10 || []) : [], n2 = sh(tL(o.URL, r10, sl), e10);
    return eP((s10 = {}, eS(sc, function(e11) {
      var t11 = tZ.J(e11);
      s10[e11] = t11 || null;
    }), s10), n2);
  }
  function sh(e10, t10) {
    var i10 = so.concat(t10 || []), s10 = {};
    return eS(i10, function(t11) {
      var i11 = tD(e10, t11);
      s10[t11] = i11 || null;
    }), s10;
  }
  function sd(e10) {
    var t10 = e10 ? 0 === e10.search(sn + "google.([^/?]*)") ? "google" : 0 === e10.search(sn + "bing.com") ? "bing" : 0 === e10.search(sn + "yahoo.com") ? "yahoo" : 0 === e10.search(sn + "duckduckgo.com") ? "duckduckgo" : null : null, i10 = {};
    if (!A(t10)) {
      i10.$search_engine = t10;
      var s10 = o ? tD(o.referrer, "yahoo" != t10 ? "q" : "p") : "";
      s10.length && (i10.ph_keyword = s10);
    }
    return i10;
  }
  function sp() {
    return navigator.language || navigator.userLanguage;
  }
  function sg() {
    return (null == o ? void 0 : o.referrer) || "$direct";
  }
  function s_(e10, t10) {
    var i10 = e10 ? e$([], sa, t10 || []) : [], s10 = null == l ? void 0 : l.href.substring(0, 1e3);
    return { r: sg().substring(0, 1e3), u: s10 ? tL(s10, i10, sl) : void 0 };
  }
  function sv(e10) {
    var t10, { r: i10, u: s10 } = e10, r10 = { $referrer: i10, $referring_domain: null == i10 ? void 0 : "$direct" == i10 ? "$direct" : null == (t10 = tA(i10)) ? void 0 : t10.host };
    if (s10) {
      r10.$current_url = s10;
      var n2 = tA(s10);
      r10.$host = null == n2 ? void 0 : n2.host, r10.$pathname = null == n2 ? void 0 : n2.pathname, eP(r10, sh(s10));
    }
    return i10 && eP(r10, sd(i10)), r10;
  }
  function sf() {
    try {
      return Intl.DateTimeFormat().resolvedOptions().timeZone;
    } catch (e10) {
      return;
    }
  }
  var sm = eb("[Web Vitals]");
  class sy {
    constructor(e10) {
      var t10;
      this.Tt = false, this.C = false, this.q = { url: void 0, metrics: [], firstMetricTimestamp: void 0 }, this.It = () => {
        clearTimeout(this.Rt), 0 !== this.q.metrics.length && (this._instance.capture("$web_vitals", this.q.metrics.reduce((e11, t11) => f({}, e11, { ["$web_vitals_" + t11.name + "_event"]: f({}, t11), ["$web_vitals_" + t11.name + "_value"]: t11.value }), {})), this.q = { url: void 0, metrics: [], firstMetricTimestamp: void 0 });
      }, this.Ct = (e11) => {
        var t11, i10 = null == (t11 = this._instance.sessionManager) ? void 0 : t11.checkAndGetSessionAndWindowId(true);
        if (R(i10)) sm.error("Could not read session ID. Dropping metrics!");
        else {
          this.q = this.q || { url: void 0, metrics: [], firstMetricTimestamp: void 0 };
          var s10 = this.Ot();
          R(s10) || (M(null == e11 ? void 0 : e11.name) || M(null == e11 ? void 0 : e11.value) ? sm.error("Invalid metric received", e11) : this.Ft && e11.value >= this.Ft ? sm.error("Ignoring metric with value >= " + this.Ft, e11) : (this.q.url !== s10 && (this.It(), this.Rt = setTimeout(this.It, this.flushToCaptureTimeoutMs)), R(this.q.url) && (this.q.url = s10), this.q.firstMetricTimestamp = R(this.q.firstMetricTimestamp) ? Date.now() : this.q.firstMetricTimestamp, e11.attribution && e11.attribution.interactionTargetElement && (e11.attribution.interactionTargetElement = void 0), this.q.metrics.push(f({}, e11, { $current_url: s10, $session_id: i10.sessionId, $window_id: i10.windowId, timestamp: Date.now() })), this.q.metrics.length === this.allowedMetrics.length && this.It()));
        }
      }, this.lt = () => {
        var e11, t11, i10, s10, r10 = p.__PosthogExtensions__;
        R(r10) || R(r10.postHogWebVitalsCallbacks) || ({ onLCP: e11, onCLS: t11, onFCP: i10, onINP: s10 } = r10.postHogWebVitalsCallbacks), e11 && t11 && i10 && s10 ? (this.allowedMetrics.indexOf("LCP") > -1 && e11(this.Ct.bind(this)), this.allowedMetrics.indexOf("CLS") > -1 && t11(this.Ct.bind(this)), this.allowedMetrics.indexOf("FCP") > -1 && i10(this.Ct.bind(this)), this.allowedMetrics.indexOf("INP") > -1 && s10(this.Ct.bind(this)), this.C = true) : sm.error("web vitals callbacks not loaded - not starting");
      }, this._instance = e10, this.Tt = !(null == (t10 = this._instance.persistence) || !t10.props[eG]), this.startIfEnabled();
    }
    get allowedMetrics() {
      var e10, t10, i10 = F(this._instance.config.capture_performance) ? null == (e10 = this._instance.config.capture_performance) ? void 0 : e10.web_vitals_allowed_metrics : void 0;
      return R(i10) ? (null == (t10 = this._instance.persistence) ? void 0 : t10.props[eW]) || ["CLS", "FCP", "INP", "LCP"] : i10;
    }
    get flushToCaptureTimeoutMs() {
      return (F(this._instance.config.capture_performance) ? this._instance.config.capture_performance.web_vitals_delayed_flush_ms : void 0) || 5e3;
    }
    get Ft() {
      var e10 = F(this._instance.config.capture_performance) && D(this._instance.config.capture_performance.__web_vitals_max_value) ? this._instance.config.capture_performance.__web_vitals_max_value : 9e5;
      return 0 < e10 && e10 <= 6e4 ? 9e5 : e10;
    }
    get isEnabled() {
      var e10 = null == l ? void 0 : l.protocol;
      if ("http:" !== e10 && "https:" !== e10) return sm.info("Web Vitals are disabled on non-http/https protocols"), false;
      var t10 = F(this._instance.config.capture_performance) ? this._instance.config.capture_performance.web_vitals : L(this._instance.config.capture_performance) ? this._instance.config.capture_performance : void 0;
      return L(t10) ? t10 : this.Tt;
    }
    startIfEnabled() {
      this.isEnabled && !this.C && (sm.info("enabled, starting..."), this.nt(this.lt));
    }
    onRemoteConfig(e10) {
      var t10 = F(e10.capturePerformance) && !!e10.capturePerformance.web_vitals, i10 = F(e10.capturePerformance) ? e10.capturePerformance.web_vitals_allowed_metrics : void 0;
      this._instance.persistence && (this._instance.persistence.register({ [eG]: t10 }), this._instance.persistence.register({ [eW]: i10 })), this.Tt = t10, this.startIfEnabled();
    }
    nt(e10) {
      var t10, i10;
      null != (t10 = p.__PosthogExtensions__) && t10.postHogWebVitalsCallbacks && e10(), null == (i10 = p.__PosthogExtensions__) || null == i10.loadExternalDependency || i10.loadExternalDependency(this._instance, "web-vitals", (t11) => {
        t11 ? sm.error("failed to load script", t11) : e10();
      });
    }
    Ot() {
      var e10 = t ? t.location.href : void 0;
      if (e10) {
        var i10 = this._instance.config.mask_personal_data_properties, s10 = this._instance.config.custom_personal_data_properties;
        return tL(e10, i10 ? e$([], sa, s10 || []) : [], sl);
      }
      sm.error("Could not determine current URL");
    }
  }
  var sb = eb("[Heatmaps]");
  function sw(e10) {
    return F(e10) && "clientX" in e10 && "clientY" in e10 && D(e10.clientX) && D(e10.clientY);
  }
  class sE {
    constructor(e10) {
      var t10;
      this.rageclicks = new tR(), this.Tt = false, this.C = false, this.Mt = null, this.instance = e10, this.Tt = !(null == (t10 = this.instance.persistence) || !t10.props[ej]);
    }
    get flushIntervalMilliseconds() {
      var e10 = 5e3;
      return F(this.instance.config.capture_heatmaps) && this.instance.config.capture_heatmaps.flush_interval_milliseconds && (e10 = this.instance.config.capture_heatmaps.flush_interval_milliseconds), e10;
    }
    get isEnabled() {
      return R(this.instance.config.capture_heatmaps) ? R(this.instance.config.enable_heatmaps) ? this.Tt : this.instance.config.enable_heatmaps : false !== this.instance.config.capture_heatmaps;
    }
    startIfEnabled() {
      if (this.isEnabled) this.C || (sb.info("starting..."), this.At(), this.Mt = setInterval(this.jt.bind(this), this.flushIntervalMilliseconds));
      else {
        var e10, t10;
        clearInterval(null != (e10 = this.Mt) ? e10 : void 0), null == (t10 = this.Dt) || t10.stop(), this.getAndClearBuffer();
      }
    }
    onRemoteConfig(e10) {
      var t10 = !!e10.heatmaps;
      this.instance.persistence && this.instance.persistence.register({ [ej]: t10 }), this.Tt = t10, this.startIfEnabled();
    }
    getAndClearBuffer() {
      var e10 = this.q;
      return this.q = void 0, e10;
    }
    Lt(e10) {
      this.Nt(e10.originalEvent, "deadclick");
    }
    At() {
      t && o && (eA(t, "beforeunload", this.jt.bind(this)), eA(o, "click", (e10) => this.Nt(e10 || (null == t ? void 0 : t.event)), { capture: true }), eA(o, "mousemove", (e10) => this.Ut(e10 || (null == t ? void 0 : t.event)), { capture: true }), this.Dt = new is(this.instance, it, this.Lt.bind(this)), this.Dt.startIfEnabled(), this.C = true);
    }
    zt(e10, i10) {
      var s10 = this.instance.scrollManager.scrollY(), r10 = this.instance.scrollManager.scrollX(), n2 = this.instance.scrollManager.scrollElement(), a2 = function(e11, i11, s11) {
        for (var r11 = e11; r11 && tr(r11) && !tn(r11, "body") && r11 !== s11; ) {
          if (b(i11, null == t ? void 0 : t.getComputedStyle(r11).position)) return true;
          r11 = tv(r11);
        }
        return false;
      }(tp(e10), ["fixed", "sticky"], n2);
      return { x: e10.clientX + (a2 ? 0 : r10), y: e10.clientY + (a2 ? 0 : s10), target_fixed: a2, type: i10 };
    }
    Nt(e10, t10) {
      var i10;
      if (void 0 === t10 && (t10 = "click"), !ts(e10.target) && sw(e10)) {
        var s10 = this.zt(e10, t10);
        null != (i10 = this.rageclicks) && i10.isRageClick(e10.clientX, e10.clientY, (/* @__PURE__ */ new Date()).getTime()) && this.Ht(f({}, s10, { type: "rageclick" })), this.Ht(s10);
      }
    }
    Ut(e10) {
      !ts(e10.target) && sw(e10) && (clearTimeout(this.Bt), this.Bt = setTimeout(() => {
        this.Ht(this.zt(e10, "mousemove"));
      }, 500));
    }
    Ht(e10) {
      if (t) {
        var i10 = t.location.href, s10 = this.instance.config.mask_personal_data_properties, r10 = this.instance.config.custom_personal_data_properties, n2 = tL(i10, s10 ? e$([], sa, r10 || []) : [], sl);
        this.q = this.q || {}, this.q[n2] || (this.q[n2] = []), this.q[n2].push(e10);
      }
    }
    jt() {
      this.q && !O(this.q) && this.instance.capture("$$heatmap", { $heatmap_data: this.getAndClearBuffer() });
    }
  }
  class sx {
    constructor(e10) {
      this._instance = e10;
    }
    doPageView(e10, i10) {
      var s10, r10 = this.qt(e10, i10);
      return this.Wt = { pathname: null != (s10 = null == t ? void 0 : t.location.pathname) ? s10 : "", pageViewId: i10, timestamp: e10 }, this._instance.scrollManager.resetContext(), r10;
    }
    doPageLeave(e10) {
      var t10;
      return this.qt(e10, null == (t10 = this.Wt) ? void 0 : t10.pageViewId);
    }
    doEvent() {
      var e10;
      return { $pageview_id: null == (e10 = this.Wt) ? void 0 : e10.pageViewId };
    }
    qt(e10, t10) {
      var i10 = this.Wt;
      if (!i10) return { $pageview_id: t10 };
      var s10 = { $pageview_id: t10, $prev_pageview_id: i10.pageViewId }, r10 = this._instance.scrollManager.getContext();
      if (r10 && !this._instance.config.disable_scroll_properties) {
        var { maxScrollHeight: n2, lastScrollY: a2, maxScrollY: o2, maxContentHeight: l2, lastContentY: c2, maxContentY: u2 } = r10;
        if (!(R(n2) || R(a2) || R(o2) || R(l2) || R(c2) || R(u2))) {
          n2 = Math.ceil(n2), a2 = Math.ceil(a2), o2 = Math.ceil(o2), l2 = Math.ceil(l2), c2 = Math.ceil(c2), u2 = Math.ceil(u2);
          var h2 = n2 <= 1 ? 1 : B(a2 / n2, 0, 1, ey), d2 = n2 <= 1 ? 1 : B(o2 / n2, 0, 1, ey), p2 = l2 <= 1 ? 1 : B(c2 / l2, 0, 1, ey), g2 = l2 <= 1 ? 1 : B(u2 / l2, 0, 1, ey);
          s10 = eP(s10, { $prev_pageview_last_scroll: a2, $prev_pageview_last_scroll_percentage: h2, $prev_pageview_max_scroll: o2, $prev_pageview_max_scroll_percentage: d2, $prev_pageview_last_content: c2, $prev_pageview_last_content_percentage: p2, $prev_pageview_max_content: u2, $prev_pageview_max_content_percentage: g2 });
        }
      }
      return i10.pathname && (s10.$prev_pageview_pathname = i10.pathname), i10.timestamp && (s10.$prev_pageview_duration = (e10.getTime() - i10.timestamp.getTime()) / 1e3), s10;
    }
  }
  var sk = Uint8Array, sS = Uint16Array, sP = Uint32Array, s$ = new sk([0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0, 0, 0, 0]), sI = new sk([0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13, 0, 0]), sF = new sk([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]), sO = function(e10, t10) {
    for (var i10 = new sS(31), s10 = 0; s10 < 31; ++s10) i10[s10] = t10 += 1 << e10[s10 - 1];
    var r10 = new sP(i10[30]);
    for (s10 = 1; s10 < 30; ++s10) for (var n2 = i10[s10]; n2 < i10[s10 + 1]; ++n2) r10[n2] = n2 - i10[s10] << 5 | s10;
    return [i10, r10];
  }, sR = sO(s$, 2), sC = sR[0], sT = sR[1];
  sC[28] = 258, sT[258] = 28;
  for (var sA = sO(sI, 0)[1], sM = new sS(32768), sD = 0; sD < 32768; ++sD) {
    var sL = (43690 & sD) >>> 1 | (21845 & sD) << 1;
    sL = (61680 & (sL = (52428 & sL) >>> 2 | (13107 & sL) << 2)) >>> 4 | (3855 & sL) << 4, sM[sD] = ((65280 & sL) >>> 8 | (255 & sL) << 8) >>> 1;
  }
  var sN = function(e10, t10, i10) {
    for (var s10 = e10.length, r10 = 0, n2 = new sS(t10); r10 < s10; ++r10) ++n2[e10[r10] - 1];
    var a2, o2 = new sS(t10);
    for (r10 = 0; r10 < t10; ++r10) o2[r10] = o2[r10 - 1] + n2[r10 - 1] << 1;
    if (i10) {
      a2 = new sS(1 << t10);
      var l2 = 15 - t10;
      for (r10 = 0; r10 < s10; ++r10) if (e10[r10]) for (var c2 = r10 << 4 | e10[r10], u2 = t10 - e10[r10], h2 = o2[e10[r10] - 1]++ << u2, d2 = h2 | (1 << u2) - 1; h2 <= d2; ++h2) a2[sM[h2] >>> l2] = c2;
    } else for (a2 = new sS(s10), r10 = 0; r10 < s10; ++r10) a2[r10] = sM[o2[e10[r10] - 1]++] >>> 15 - e10[r10];
    return a2;
  }, sj = new sk(288);
  for (sD = 0; sD < 144; ++sD) sj[sD] = 8;
  for (sD = 144; sD < 256; ++sD) sj[sD] = 9;
  for (sD = 256; sD < 280; ++sD) sj[sD] = 7;
  for (sD = 280; sD < 288; ++sD) sj[sD] = 8;
  var sq = new sk(32);
  for (sD = 0; sD < 32; ++sD) sq[sD] = 5;
  var sU = sN(sj, 9, 0), sH = sN(sq, 5, 0), sG = function(e10) {
    return (e10 / 8 | 0) + (7 & e10 && 1);
  }, sB = function(e10, t10, i10) {
    (null == i10 || i10 > e10.length) && (i10 = e10.length);
    var s10 = new (e10 instanceof sS ? sS : e10 instanceof sP ? sP : sk)(i10 - t10);
    return s10.set(e10.subarray(t10, i10)), s10;
  }, sW = function(e10, t10, i10) {
    i10 <<= 7 & t10;
    var s10 = t10 / 8 | 0;
    e10[s10] |= i10, e10[s10 + 1] |= i10 >>> 8;
  }, sV = function(e10, t10, i10) {
    i10 <<= 7 & t10;
    var s10 = t10 / 8 | 0;
    e10[s10] |= i10, e10[s10 + 1] |= i10 >>> 8, e10[s10 + 2] |= i10 >>> 16;
  }, sz = function(e10, t10) {
    for (var i10 = [], s10 = 0; s10 < e10.length; ++s10) e10[s10] && i10.push({ s: s10, f: e10[s10] });
    var r10 = i10.length, n2 = i10.slice();
    if (!r10) return [new sk(0), 0];
    if (1 == r10) {
      var a2 = new sk(i10[0].s + 1);
      return a2[i10[0].s] = 1, [a2, 1];
    }
    i10.sort(function(e11, t11) {
      return e11.f - t11.f;
    }), i10.push({ s: -1, f: 25001 });
    var o2 = i10[0], l2 = i10[1], c2 = 0, u2 = 1, h2 = 2;
    for (i10[0] = { s: -1, f: o2.f + l2.f, l: o2, r: l2 }; u2 != r10 - 1; ) o2 = i10[i10[c2].f < i10[h2].f ? c2++ : h2++], l2 = i10[c2 != u2 && i10[c2].f < i10[h2].f ? c2++ : h2++], i10[u2++] = { s: -1, f: o2.f + l2.f, l: o2, r: l2 };
    var d2 = n2[0].s;
    for (s10 = 1; s10 < r10; ++s10) n2[s10].s > d2 && (d2 = n2[s10].s);
    var p2 = new sS(d2 + 1), g2 = sY(i10[u2 - 1], p2, 0);
    if (g2 > t10) {
      s10 = 0;
      var _2 = 0, v2 = g2 - t10, f2 = 1 << v2;
      for (n2.sort(function(e11, t11) {
        return p2[t11.s] - p2[e11.s] || e11.f - t11.f;
      }); s10 < r10; ++s10) {
        var m2 = n2[s10].s;
        if (!(p2[m2] > t10)) break;
        _2 += f2 - (1 << g2 - p2[m2]), p2[m2] = t10;
      }
      for (_2 >>>= v2; _2 > 0; ) {
        var y2 = n2[s10].s;
        p2[y2] < t10 ? _2 -= 1 << t10 - p2[y2]++ - 1 : ++s10;
      }
      for (; s10 >= 0 && _2; --s10) {
        var b2 = n2[s10].s;
        p2[b2] == t10 && (--p2[b2], ++_2);
      }
      g2 = t10;
    }
    return [new sk(p2), g2];
  }, sY = function(e10, t10, i10) {
    return -1 == e10.s ? Math.max(sY(e10.l, t10, i10 + 1), sY(e10.r, t10, i10 + 1)) : t10[e10.s] = i10;
  }, sX = function(e10) {
    for (var t10 = e10.length; t10 && !e10[--t10]; ) ;
    for (var i10 = new sS(++t10), s10 = 0, r10 = e10[0], n2 = 1, a2 = function(e11) {
      i10[s10++] = e11;
    }, o2 = 1; o2 <= t10; ++o2) if (e10[o2] == r10 && o2 != t10) ++n2;
    else {
      if (!r10 && n2 > 2) {
        for (; n2 > 138; n2 -= 138) a2(32754);
        n2 > 2 && (a2(n2 > 10 ? n2 - 11 << 5 | 28690 : n2 - 3 << 5 | 12305), n2 = 0);
      } else if (n2 > 3) {
        for (a2(r10), --n2; n2 > 6; n2 -= 6) a2(8304);
        n2 > 2 && (a2(n2 - 3 << 5 | 8208), n2 = 0);
      }
      for (; n2--; ) a2(r10);
      n2 = 1, r10 = e10[o2];
    }
    return [i10.subarray(0, s10), t10];
  }, sJ = function(e10, t10) {
    for (var i10 = 0, s10 = 0; s10 < t10.length; ++s10) i10 += e10[s10] * t10[s10];
    return i10;
  }, sK = function(e10, t10, i10) {
    var s10 = i10.length, r10 = sG(t10 + 2);
    e10[r10] = 255 & s10, e10[r10 + 1] = s10 >>> 8, e10[r10 + 2] = 255 ^ e10[r10], e10[r10 + 3] = 255 ^ e10[r10 + 1];
    for (var n2 = 0; n2 < s10; ++n2) e10[r10 + n2 + 4] = i10[n2];
    return 8 * (r10 + 4 + s10);
  }, sQ = function(e10, t10, i10, s10, r10, n2, a2, o2, l2, c2, u2) {
    sW(t10, u2++, i10), ++r10[256];
    for (var h2 = sz(r10, 15), d2 = h2[0], p2 = h2[1], g2 = sz(n2, 15), _2 = g2[0], v2 = g2[1], f2 = sX(d2), m2 = f2[0], y2 = f2[1], b2 = sX(_2), w2 = b2[0], E2 = b2[1], x2 = new sS(19), k2 = 0; k2 < m2.length; ++k2) x2[31 & m2[k2]]++;
    for (k2 = 0; k2 < w2.length; ++k2) x2[31 & w2[k2]]++;
    for (var S2 = sz(x2, 7), P2 = S2[0], $2 = S2[1], I2 = 19; I2 > 4 && !P2[sF[I2 - 1]]; --I2) ;
    var F2, O2, R2, C2, T2 = c2 + 5 << 3, A2 = sJ(r10, sj) + sJ(n2, sq) + a2, M2 = sJ(r10, d2) + sJ(n2, _2) + a2 + 14 + 3 * I2 + sJ(x2, P2) + (2 * x2[16] + 3 * x2[17] + 7 * x2[18]);
    if (T2 <= A2 && T2 <= M2) return sK(t10, u2, e10.subarray(l2, l2 + c2));
    if (sW(t10, u2, 1 + (M2 < A2)), u2 += 2, M2 < A2) {
      F2 = sN(d2, p2, 0), O2 = d2, R2 = sN(_2, v2, 0), C2 = _2;
      var D2 = sN(P2, $2, 0);
      for (sW(t10, u2, y2 - 257), sW(t10, u2 + 5, E2 - 1), sW(t10, u2 + 10, I2 - 4), u2 += 14, k2 = 0; k2 < I2; ++k2) sW(t10, u2 + 3 * k2, P2[sF[k2]]);
      u2 += 3 * I2;
      for (var L2 = [m2, w2], N2 = 0; N2 < 2; ++N2) {
        var j2 = L2[N2];
        for (k2 = 0; k2 < j2.length; ++k2) {
          var q2 = 31 & j2[k2];
          sW(t10, u2, D2[q2]), u2 += P2[q2], q2 > 15 && (sW(t10, u2, j2[k2] >>> 5 & 127), u2 += j2[k2] >>> 12);
        }
      }
    } else F2 = sU, O2 = sj, R2 = sH, C2 = sq;
    for (k2 = 0; k2 < o2; ++k2) if (s10[k2] > 255) {
      sV(t10, u2, F2[(q2 = s10[k2] >>> 18 & 31) + 257]), u2 += O2[q2 + 257], q2 > 7 && (sW(t10, u2, s10[k2] >>> 23 & 31), u2 += s$[q2]);
      var U2 = 31 & s10[k2];
      sV(t10, u2, R2[U2]), u2 += C2[U2], U2 > 3 && (sV(t10, u2, s10[k2] >>> 5 & 8191), u2 += sI[U2]);
    } else sV(t10, u2, F2[s10[k2]]), u2 += O2[s10[k2]];
    return sV(t10, u2, F2[256]), u2 + O2[256];
  }, sZ = new sP([65540, 131080, 131088, 131104, 262176, 1048704, 1048832, 2114560, 2117632]), s0 = function() {
    for (var e10 = new sP(256), t10 = 0; t10 < 256; ++t10) {
      for (var i10 = t10, s10 = 9; --s10; ) i10 = (1 & i10 && 3988292384) ^ i10 >>> 1;
      e10[t10] = i10;
    }
    return e10;
  }(), s1 = function(e10, t10, i10) {
    for (; i10; ++t10) e10[t10] = i10, i10 >>>= 8;
  }, s2 = function(e10) {
    var t10, i10, s10, r10, n2 = "";
    for (t10 = i10 = 0, s10 = (e10 = (e10 + "").replace(/\r\n/g, "\n").replace(/\r/g, "\n")).length, r10 = 0; r10 < s10; r10++) {
      var a2 = e10.charCodeAt(r10), o2 = null;
      a2 < 128 ? i10++ : o2 = a2 > 127 && a2 < 2048 ? String.fromCharCode(a2 >> 6 | 192, 63 & a2 | 128) : String.fromCharCode(a2 >> 12 | 224, a2 >> 6 & 63 | 128, 63 & a2 | 128), A(o2) || (i10 > t10 && (n2 += e10.substring(t10, i10)), n2 += o2, t10 = i10 = r10 + 1);
    }
    return i10 > t10 && (n2 += e10.substring(t10, e10.length)), n2;
  }, s3 = !!u || !!c, s5 = "text/plain", s8 = (e10, t10) => {
    var [i10, s10] = e10.split("?"), r10 = f({}, t10);
    null == s10 || s10.split("&").forEach((e11) => {
      var [t11] = e11.split("=");
      delete r10[t11];
    });
    var n2 = tM(r10);
    return i10 + "?" + (n2 = n2 ? (s10 ? s10 + "&" : "") + n2 : s10);
  }, s6 = (e10, t10) => JSON.stringify(e10, (e11, t11) => "bigint" == typeof t11 ? t11.toString() : t11, t10), s4 = (e10) => {
    var { data: t10, compression: i10 } = e10;
    if (t10) {
      if (i10 === tT.GZipJS) {
        var s10, r10, n2, a2, o2, l2, c2, u2, h2 = new Blob([(s10 = function(e11) {
          var t11 = e11.length;
          if ("u" > typeof TextEncoder) return new TextEncoder().encode(e11);
          for (var i11 = new sk(e11.length + (e11.length >>> 1)), s11 = 0, r11 = function(e12) {
            i11[s11++] = e12;
          }, n3 = 0; n3 < t11; ++n3) {
            if (s11 + 5 > i11.length) {
              var a3 = new sk(s11 + 8 + (t11 - n3 << 1));
              a3.set(i11), i11 = a3;
            }
            var o3 = e11.charCodeAt(n3);
            o3 < 128 ? r11(o3) : (o3 < 2048 ? r11(192 | o3 >>> 6) : (o3 > 55295 && o3 < 57344 ? (r11(240 | (o3 = 65536 + (1047552 & o3) | 1023 & e11.charCodeAt(++n3)) >>> 18), r11(128 | o3 >>> 12 & 63)) : r11(224 | o3 >>> 12), r11(128 | o3 >>> 6 & 63)), r11(128 | 63 & o3));
          }
          return sB(i11, 0, s11);
        }(s6(t10)), r10 = { mtime: 0 }, n2 = 4294967295, a2 = { p: function(e11) {
          for (var t11 = n2, i11 = 0; i11 < e11.length; ++i11) t11 = s0[255 & t11 ^ e11[i11]] ^ t11 >>> 8;
          n2 = t11;
        }, d: function() {
          return 4294967295 ^ n2;
        } }, o2 = s10.length, a2.p(s10), u2 = (l2 = 10 + (r10.filename && r10.filename.length + 1 || 0), c2 = function(e11, t11, i11, s11, r11) {
          var n3 = e11.length, a3 = new sk(s11 + n3 + 5 * (1 + Math.floor(n3 / 7e3)) + 8), o3 = a3.subarray(s11, a3.length - 8), l3 = 0;
          if (!t11 || n3 < 8) for (var c3 = 0; c3 <= n3; c3 += 65535) {
            var u3 = c3 + 65535;
            u3 < n3 ? l3 = sK(o3, l3, e11.subarray(c3, u3)) : (o3[c3] = r11, l3 = sK(o3, l3, e11.subarray(c3, n3)));
          }
          else {
            for (var h3 = sZ[t11 - 1], d3 = h3 >>> 13, p3 = 8191 & h3, g2 = (1 << i11) - 1, _2 = new sS(32768), v2 = new sS(g2 + 1), f2 = Math.ceil(i11 / 3), m2 = 2 * f2, y2 = function(t12) {
              return (e11[t12] ^ e11[t12 + 1] << f2 ^ e11[t12 + 2] << m2) & g2;
            }, b2 = new sP(25e3), w2 = new sS(288), E2 = new sS(32), x2 = 0, k2 = 0, S2 = (c3 = 0, 0), P2 = 0, $2 = 0; c3 < n3; ++c3) {
              var I2 = y2(c3), F2 = 32767 & c3, O2 = v2[I2];
              if (_2[F2] = O2, v2[I2] = F2, P2 <= c3) {
                var R2 = n3 - c3;
                if ((x2 > 7e3 || S2 > 24576) && R2 > 423) {
                  l3 = sQ(e11, o3, 0, b2, w2, E2, k2, S2, $2, c3 - $2, l3), S2 = x2 = k2 = 0, $2 = c3;
                  for (var C2 = 0; C2 < 286; ++C2) w2[C2] = 0;
                  for (C2 = 0; C2 < 30; ++C2) E2[C2] = 0;
                }
                var T2 = 2, A2 = 0, M2 = p3, D2 = F2 - O2 & 32767;
                if (R2 > 2 && I2 == y2(c3 - D2)) for (var L2 = Math.min(d3, R2) - 1, N2 = Math.min(32767, c3), j2 = Math.min(258, R2); D2 <= N2 && --M2 && F2 != O2; ) {
                  if (e11[c3 + T2] == e11[c3 + T2 - D2]) {
                    for (var q2 = 0; q2 < j2 && e11[c3 + q2] == e11[c3 + q2 - D2]; ++q2) ;
                    if (q2 > T2) {
                      if (T2 = q2, A2 = D2, q2 > L2) break;
                      var U2 = Math.min(D2, q2 - 2), H2 = 0;
                      for (C2 = 0; C2 < U2; ++C2) {
                        var G2 = c3 - D2 + C2 + 32768 & 32767, B2 = G2 - _2[G2] + 32768 & 32767;
                        B2 > H2 && (H2 = B2, O2 = G2);
                      }
                    }
                  }
                  D2 += (F2 = O2) - (O2 = _2[F2]) + 32768 & 32767;
                }
                if (A2) {
                  b2[S2++] = 268435456 | sT[T2] << 18 | sA[A2];
                  var W2 = 31 & sT[T2], V2 = 31 & sA[A2];
                  k2 += s$[W2] + sI[V2], ++w2[257 + W2], ++E2[V2], P2 = c3 + T2, ++x2;
                } else b2[S2++] = e11[c3], ++w2[e11[c3]];
              }
            }
            l3 = sQ(e11, o3, r11, b2, w2, E2, k2, S2, $2, c3 - $2, l3);
          }
          return sB(a3, 0, s11 + sG(l3) + 8);
        }(s10, null == r10.level ? 6 : r10.level, null == r10.mem ? Math.ceil(1.5 * Math.max(8, Math.min(13, Math.log(s10.length)))) : 12 + r10.mem, l2, true)).length, function(e11, t11) {
          var i11 = t11.filename;
          if (e11[0] = 31, e11[1] = 139, e11[2] = 8, e11[8] = t11.level < 2 ? 4 : 2 * (9 == t11.level), e11[9] = 3, 0 != t11.mtime && s1(e11, 4, Math.floor(new Date(t11.mtime || Date.now()) / 1e3)), i11) {
            e11[3] = 8;
            for (var s11 = 0; s11 <= i11.length; ++s11) e11[s11 + 10] = i11.charCodeAt(s11);
          }
        }(c2, r10), s1(c2, u2 - 8, a2.d()), s1(c2, u2 - 4, o2), c2)], { type: s5 });
        return { contentType: s5, body: h2, estimatedSize: h2.size };
      }
      if (i10 === tT.Base64) {
        let e11;
        var d2 = "data=" + encodeURIComponent("string" == typeof (e11 = function(e12) {
          var t11, i11, s11, r11, n3, a3 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", o3 = 0, l3 = 0, c3 = "", u3 = [];
          if (!e12) return e12;
          e12 = s2(e12);
          do
            t11 = (n3 = e12.charCodeAt(o3++) << 16 | e12.charCodeAt(o3++) << 8 | e12.charCodeAt(o3++)) >> 18 & 63, i11 = n3 >> 12 & 63, s11 = n3 >> 6 & 63, r11 = 63 & n3, u3[l3++] = a3.charAt(t11) + a3.charAt(i11) + a3.charAt(s11) + a3.charAt(r11);
          while (o3 < e12.length);
          switch (c3 = u3.join(""), e12.length % 3) {
            case 1:
              c3 = c3.slice(0, -2) + "==";
              break;
            case 2:
              c3 = c3.slice(0, -1) + "=";
          }
          return c3;
        }(s6(t10))) ? e11 : s6(e11));
        return { contentType: "application/x-www-form-urlencoded", body: d2, estimatedSize: new Blob([d2]).size };
      }
      var p2 = s6(t10);
      return { contentType: "application/json", body: p2, estimatedSize: new Blob([p2]).size };
    }
  }, s7 = [];
  c && s7.push({ transport: "fetch", method: (e10) => {
    var t10, i10, { contentType: s10, body: r10, estimatedSize: n2 } = null != (t10 = s4(e10)) ? t10 : {}, a2 = new Headers();
    eS(e10.headers, function(e11, t11) {
      a2.append(t11, e11);
    }), s10 && a2.append("Content-Type", s10);
    var o2 = e10.url, l2 = null;
    if (h) {
      var u2 = new h();
      l2 = { signal: u2.signal, timeout: setTimeout(() => u2.abort(), e10.timeout) };
    }
    c(o2, f({ method: (null == e10 ? void 0 : e10.method) || "GET", headers: a2, keepalive: "POST" === e10.method && 52428.8 > (n2 || 0), body: r10, signal: null == (i10 = l2) ? void 0 : i10.signal }, e10.fetchOptions)).then((t11) => t11.text().then((i11) => {
      var s11 = { statusCode: t11.status, text: i11 };
      if (200 === t11.status) try {
        s11.json = JSON.parse(i11);
      } catch (e11) {
        ey.error(e11);
      }
      null == e10.callback || e10.callback(s11);
    })).catch((t11) => {
      ey.error(t11), null == e10.callback || e10.callback({ statusCode: 0, text: t11 });
    }).finally(() => l2 ? clearTimeout(l2.timeout) : null);
  } }), u && s7.push({ transport: "XHR", method: (e10) => {
    var t10, i10 = new u();
    i10.open(e10.method || "GET", e10.url, true);
    var { contentType: s10, body: r10 } = null != (t10 = s4(e10)) ? t10 : {};
    eS(e10.headers, function(e11, t11) {
      i10.setRequestHeader(t11, e11);
    }), s10 && i10.setRequestHeader("Content-Type", s10), e10.timeout && (i10.timeout = e10.timeout), e10.disableXHRCredentials || (i10.withCredentials = true), i10.onreadystatechange = () => {
      if (4 === i10.readyState) {
        var t11 = { statusCode: i10.status, text: i10.responseText };
        if (200 === i10.status) try {
          t11.json = JSON.parse(i10.responseText);
        } catch (e11) {
        }
        null == e10.callback || e10.callback(t11);
      }
    }, i10.send(r10);
  } }), null != a && a.sendBeacon && s7.push({ transport: "sendBeacon", method: (e10) => {
    var t10 = s8(e10.url, { beacon: "1" });
    try {
      var i10, { contentType: s10, body: r10 } = null != (i10 = s4(e10)) ? i10 : {}, n2 = "string" == typeof r10 ? new Blob([r10], { type: s10 }) : r10;
      a.sendBeacon(t10, n2);
    } catch (e11) {
    }
  } });
  var s9 = function(e10, t10) {
    if (!function(e11) {
      try {
        new RegExp(e11);
      } catch (e12) {
        return false;
      }
      return true;
    }(t10)) return false;
    try {
      return new RegExp(t10).test(e10);
    } catch (e11) {
      return false;
    }
  };
  function re(e10, t10, i10) {
    return s6({ distinct_id: e10, userPropertiesToSet: t10, userPropertiesToSetOnce: i10 });
  }
  var rt = { exact: (e10, t10) => t10.some((t11) => e10.some((e11) => t11 === e11)), is_not: (e10, t10) => t10.every((t11) => e10.every((e11) => t11 !== e11)), regex: (e10, t10) => t10.some((t11) => e10.some((e11) => s9(t11, e11))), not_regex: (e10, t10) => t10.every((t11) => e10.every((e11) => !s9(t11, e11))), icontains: (e10, t10) => t10.map(ri).some((t11) => e10.map(ri).some((e11) => t11.includes(e11))), not_icontains: (e10, t10) => t10.map(ri).every((t11) => e10.map(ri).every((e11) => !t11.includes(e11))) }, ri = (e10) => e10.toLowerCase(), rs = eb("[Error tracking]");
  class rr {
    constructor(e10) {
      var t10, i10;
      this.Gt = [], this.Vt = new ea([new eo(), new ef(), new ec(), new el(), new e_(), new eg(), new eh(), new ev()], [et, er]), this._instance = e10, this.Gt = null != (t10 = null == (i10 = this._instance.persistence) ? void 0 : i10.get_property(eU)) ? t10 : [];
    }
    onRemoteConfig(e10) {
      var t10, i10, s10, r10 = null != (t10 = null == (i10 = e10.errorTracking) ? void 0 : i10.suppressionRules) ? t10 : [], n2 = null == (s10 = e10.errorTracking) ? void 0 : s10.captureExtensionExceptions;
      this.Gt = r10, this._instance.persistence && this._instance.persistence.register({ [eU]: this.Gt, [eH]: n2 });
    }
    get Jt() {
      var e10, t10 = !!this._instance.get_property(eH), i10 = this._instance.config.error_tracking.captureExtensionExceptions;
      return null != (e10 = null != i10 ? i10 : t10) && e10;
    }
    buildProperties(e10, t10) {
      return this.Vt.buildFromUnknown(e10, { syntheticException: null == t10 ? void 0 : t10.syntheticException, mechanism: { handled: null == t10 ? void 0 : t10.handled } });
    }
    sendExceptionEvent(e10) {
      if (this.Kt(e10)) rs.info("Skipping exception capture because a suppression rule matched");
      else {
        if (this.Jt || !this.Yt(e10)) return this._instance.capture("$exception", e10, { _noTruncate: true, _batchKey: "exceptionEvent" });
        rs.info("Skipping exception capture because it was thrown by an extension");
      }
    }
    Kt(e10) {
      var t10 = e10.$exception_list;
      if (!t10 || !$(t10) || 0 === t10.length) return false;
      var i10 = t10.reduce((e11, t11) => {
        var { type: i11, value: s10 } = t11;
        return C(i11) && i11.length > 0 && e11.$exception_types.push(i11), C(s10) && s10.length > 0 && e11.$exception_values.push(s10), e11;
      }, { $exception_types: [], $exception_values: [] });
      return this.Gt.some((e11) => {
        var t11 = e11.values.map((e12) => {
          var t12, s10 = rt[e12.operator], r10 = $(e12.value) ? e12.value : [e12.value], n2 = null != (t12 = i10[e12.key]) ? t12 : [];
          return r10.length > 0 && s10(r10, n2);
        });
        return "OR" === e11.type ? t11.some(Boolean) : t11.every(Boolean);
      });
    }
    Yt(e10) {
      var t10 = e10.$exception_list;
      return !(!t10 || !$(t10)) && t10.flatMap((e11) => {
        var t11, i10;
        return null != (t11 = null == (i10 = e11.stacktrace) ? void 0 : i10.frames) ? t11 : [];
      }).some((e11) => e11.filename && e11.filename.startsWith("chrome-extension://"));
    }
  }
  var rn = eb("[FeatureFlags]"), ra = "$active_feature_flags", ro = "$override_feature_flags", rl = "$feature_flag_payloads", rc = "$override_feature_flag_payloads", ru = "$feature_flag_request_id", rh = (e10) => {
    var t10 = {};
    for (var [i10, s10] of eI(e10 || {})) s10 && (t10[i10] = s10);
    return t10;
  }, rd = ((na = {}).FeatureFlags = "feature_flags", na.Recordings = "recordings", na);
  class rp {
    constructor(e10) {
      this.Xt = false, this.Qt = false, this.Zt = false, this.ti = false, this.ii = false, this.ei = false, this.ri = false, this._instance = e10, this.featureFlagEventHandlers = [];
    }
    si() {
      var e10 = this._instance.config.evaluation_environments;
      return null != e10 && e10.length ? e10.filter((e11) => {
        var t10 = e11 && "string" == typeof e11 && e11.trim().length > 0;
        return t10 || rn.error("Invalid evaluation environment found:", e11, "Expected non-empty string"), t10;
      }) : [];
    }
    ni() {
      return this.si().length > 0;
    }
    flags() {
      if (this._instance.config.__preview_remote_config) this.ei = true;
      else {
        var e10 = !this.oi && (this._instance.config.advanced_disable_feature_flags || this._instance.config.advanced_disable_feature_flags_on_first_load);
        this.ai({ disableFlags: e10 });
      }
    }
    get hasLoadedFlags() {
      return this.Qt;
    }
    getFlags() {
      return Object.keys(this.getFlagVariants());
    }
    getFlagsWithDetails() {
      var e10 = this._instance.get_property(eK), t10 = this._instance.get_property(ro), i10 = this._instance.get_property(rc);
      if (!i10 && !t10) return e10 || {};
      var s10 = eP({}, e10 || {});
      for (var r10 of [.../* @__PURE__ */ new Set([...Object.keys(i10 || {}), ...Object.keys(t10 || {})])]) {
        var n2, a2, o2 = s10[r10], l2 = null == t10 ? void 0 : t10[r10], c2 = R(l2) ? null != (n2 = null == o2 ? void 0 : o2.enabled) && n2 : !!l2, u2 = R(l2) ? o2.variant : "string" == typeof l2 ? l2 : void 0, h2 = null == i10 ? void 0 : i10[r10], d2 = f({}, o2, { enabled: c2, variant: c2 ? null != u2 ? u2 : null == o2 ? void 0 : o2.variant : void 0 });
        c2 !== (null == o2 ? void 0 : o2.enabled) && (d2.original_enabled = null == o2 ? void 0 : o2.enabled), u2 !== (null == o2 ? void 0 : o2.variant) && (d2.original_variant = null == o2 ? void 0 : o2.variant), h2 && (d2.metadata = f({}, null == o2 ? void 0 : o2.metadata, { payload: h2, original_payload: null == o2 || null == (a2 = o2.metadata) ? void 0 : a2.payload })), s10[r10] = d2;
      }
      return this.Xt || (rn.warn(" Overriding feature flag details!", { flagDetails: e10, overriddenPayloads: i10, finalDetails: s10 }), this.Xt = true), s10;
    }
    getFlagVariants() {
      var e10 = this._instance.get_property(eX), t10 = this._instance.get_property(ro);
      if (!t10) return e10 || {};
      for (var i10 = eP({}, e10), s10 = Object.keys(t10), r10 = 0; r10 < s10.length; r10++) i10[s10[r10]] = t10[s10[r10]];
      return this.Xt || (rn.warn(" Overriding feature flags!", { enabledFlags: e10, overriddenFlags: t10, finalFlags: i10 }), this.Xt = true), i10;
    }
    getFlagPayloads() {
      var e10 = this._instance.get_property(rl), t10 = this._instance.get_property(rc);
      if (!t10) return e10 || {};
      for (var i10 = eP({}, e10 || {}), s10 = Object.keys(t10), r10 = 0; r10 < s10.length; r10++) i10[s10[r10]] = t10[s10[r10]];
      return this.Xt || (rn.warn(" Overriding feature flag payloads!", { flagPayloads: e10, overriddenPayloads: t10, finalPayloads: i10 }), this.Xt = true), i10;
    }
    reloadFeatureFlags() {
      this.ti || this._instance.config.advanced_disable_feature_flags || this.oi || (this.oi = setTimeout(() => {
        this.ai();
      }, 5));
    }
    li() {
      clearTimeout(this.oi), this.oi = void 0;
    }
    ensureFlagsLoaded() {
      this.Qt || this.Zt || this.oi || this.reloadFeatureFlags();
    }
    setAnonymousDistinctId(e10) {
      this.$anon_distinct_id = e10;
    }
    setReloadingPaused(e10) {
      this.ti = e10;
    }
    ai(e10) {
      var t10;
      if (this.li(), !this._instance.L()) if (this.Zt) this.ii = true;
      else {
        var i10 = { token: this._instance.config.token, distinct_id: this._instance.get_distinct_id(), groups: this._instance.getGroups(), $anon_distinct_id: this.$anon_distinct_id, person_properties: f({}, (null == (t10 = this._instance.persistence) ? void 0 : t10.get_initial_props()) || {}, this._instance.get_property(eQ) || {}), group_properties: this._instance.get_property(eZ) };
        (null != e10 && e10.disableFlags || this._instance.config.advanced_disable_feature_flags) && (i10.disable_flags = true), this.ni() && (i10.evaluation_environments = this.si());
        var s10 = this._instance.config.__preview_remote_config, r10 = this._instance.config.advanced_only_evaluate_survey_feature_flags ? "&only_evaluate_survey_feature_flags=true" : "", n2 = this._instance.requestRouter.endpointFor("api", (s10 ? "/flags/?v=2" : "/flags/?v=2&config=true") + r10);
        s10 && (i10.timezone = sf()), this.Zt = true, this._instance.ui({ method: "POST", url: n2, data: i10, compression: this._instance.config.disable_compression ? void 0 : tT.Base64, timeout: this._instance.config.feature_flag_request_timeout_ms, callback: (e11) => {
          var t11, s11, r11, n3 = true;
          200 === e11.statusCode && (this.ii || (this.$anon_distinct_id = void 0), n3 = false), this.Zt = false, this.ei || (this.ei = true, this._instance.hi(null != (r11 = e11.json) ? r11 : {})), (!i10.disable_flags || this.ii) && ((this.ri = !n3, e11.json && null != (s11 = e11.json.quotaLimited) && s11.includes(rd.FeatureFlags)) ? rn.warn("You have hit your feature flags quota limit, and will not be able to load feature flags until the quota is reset.  Please visit https://posthog.com/docs/billing/limits-alerts to learn more.") : (i10.disable_flags || this.receivedFeatureFlags(null != (t11 = e11.json) ? t11 : {}, n3), this.ii && (this.ii = false, this.ai())));
        } });
      }
    }
    getFeatureFlag(e10, t10) {
      if (void 0 === t10 && (t10 = {}), this.Qt || this.getFlags() && this.getFlags().length > 0) {
        var i10 = this.getFlagVariants()[e10], s10 = "" + i10, r10 = this._instance.get_property(ru) || void 0, n2 = this._instance.get_property(e2) || {};
        if ((t10.send_event || !("send_event" in t10)) && (!(e10 in n2) || !n2[e10].includes(s10))) {
          $(n2[e10]) ? n2[e10].push(s10) : n2[e10] = [s10], null == (l2 = this._instance.persistence) || l2.register({ [e2]: n2 });
          var a2 = this.getFeatureFlagDetails(e10), o2 = { $feature_flag: e10, $feature_flag_response: i10, $feature_flag_payload: this.getFeatureFlagPayload(e10) || null, $feature_flag_request_id: r10, $feature_flag_bootstrapped_response: (null == (c2 = this._instance.config.bootstrap) || null == (c2 = c2.featureFlags) ? void 0 : c2[e10]) || null, $feature_flag_bootstrapped_payload: (null == (u2 = this._instance.config.bootstrap) || null == (u2 = u2.featureFlagPayloads) ? void 0 : u2[e10]) || null, $used_bootstrap_value: !this.ri };
          R(null == a2 || null == (h2 = a2.metadata) ? void 0 : h2.version) || (o2.$feature_flag_version = a2.metadata.version);
          var l2, c2, u2, h2, d2, p2, g2, _2, v2, f2, m2 = null != (d2 = null == a2 || null == (p2 = a2.reason) ? void 0 : p2.description) ? d2 : null == a2 || null == (g2 = a2.reason) ? void 0 : g2.code;
          m2 && (o2.$feature_flag_reason = m2), null != a2 && null != (_2 = a2.metadata) && _2.id && (o2.$feature_flag_id = a2.metadata.id), R(null == a2 ? void 0 : a2.original_variant) && R(null == a2 ? void 0 : a2.original_enabled) || (o2.$feature_flag_original_response = R(a2.original_variant) ? a2.original_enabled : a2.original_variant), null != a2 && null != (v2 = a2.metadata) && v2.original_payload && (o2.$feature_flag_original_payload = null == a2 || null == (f2 = a2.metadata) ? void 0 : f2.original_payload), this._instance.capture("$feature_flag_called", o2);
        }
        return i10;
      }
      rn.warn('getFeatureFlag for key "' + e10 + `" failed. Feature flags didn't load in time.`);
    }
    getFeatureFlagDetails(e10) {
      return this.getFlagsWithDetails()[e10];
    }
    getFeatureFlagPayload(e10) {
      return this.getFlagPayloads()[e10];
    }
    getRemoteConfigPayload(e10, t10) {
      var i10 = this._instance.config.token, s10 = { distinct_id: this._instance.get_distinct_id(), token: i10 };
      this.ni() && (s10.evaluation_environments = this.si()), this._instance.ui({ method: "POST", url: this._instance.requestRouter.endpointFor("api", "/flags/?v=2&config=true"), data: s10, compression: this._instance.config.disable_compression ? void 0 : tT.Base64, timeout: this._instance.config.feature_flag_request_timeout_ms, callback: (i11) => {
        var s11, r10 = null == (s11 = i11.json) ? void 0 : s11.featureFlagPayloads;
        t10((null == r10 ? void 0 : r10[e10]) || void 0);
      } });
    }
    isFeatureEnabled(e10, t10) {
      if (void 0 === t10 && (t10 = {}), this.Qt || this.getFlags() && this.getFlags().length > 0) {
        var i10 = this.getFeatureFlag(e10, t10);
        return R(i10) ? void 0 : !!i10;
      }
      rn.warn('isFeatureEnabled for key "' + e10 + `" failed. Feature flags didn't load in time.`);
    }
    addFeatureFlagsHandler(e10) {
      this.featureFlagEventHandlers.push(e10);
    }
    removeFeatureFlagsHandler(e10) {
      this.featureFlagEventHandlers = this.featureFlagEventHandlers.filter((t10) => t10 !== e10);
    }
    receivedFeatureFlags(e10, t10) {
      if (this._instance.persistence) {
        this.Qt = true;
        var i10 = this.getFlagVariants(), s10 = this.getFlagPayloads(), r10 = this.getFlagsWithDetails();
        !function(e11, t11, i11, s11, r11) {
          void 0 === i11 && (i11 = {}), void 0 === s11 && (s11 = {}), void 0 === r11 && (r11 = {});
          var n2, a2 = ((n2 = e11.flags) ? (e11.featureFlags = Object.fromEntries(Object.keys(n2).map((e12) => {
            var t12;
            return [e12, null != (t12 = n2[e12].variant) ? t12 : n2[e12].enabled];
          })), e11.featureFlagPayloads = Object.fromEntries(Object.keys(n2).filter((e12) => n2[e12].enabled).filter((e12) => {
            var t12;
            return null == (t12 = n2[e12].metadata) ? void 0 : t12.payload;
          }).map((e12) => {
            var t12;
            return [e12, null == (t12 = n2[e12].metadata) ? void 0 : t12.payload];
          }))) : rn.warn("Using an older version of the feature flags endpoint. Please upgrade your PostHog server to the latest version"), e11), o2 = a2.flags, l2 = a2.featureFlags, c2 = a2.featureFlagPayloads;
          if (l2) {
            var u2 = e11.requestId;
            if ($(l2)) {
              rn.warn("v1 of the feature flags endpoint is deprecated. Please use the latest version.");
              var h2 = {};
              if (l2) for (var d2 = 0; d2 < l2.length; d2++) h2[l2[d2]] = true;
              t11 && t11.register({ [ra]: l2, [eX]: h2 });
            } else {
              var p2 = l2, g2 = c2, _2 = o2;
              e11.errorsWhileComputingFlags && (p2 = f({}, i11, p2), g2 = f({}, s11, g2), _2 = f({}, r11, _2)), t11 && t11.register(f({ [ra]: Object.keys(rh(p2)), [eX]: p2 || {}, [rl]: g2 || {}, [eK]: _2 || {} }, u2 ? { [ru]: u2 } : {}));
            }
          }
        }(e10, this._instance.persistence, i10, s10, r10), this.di(t10);
      }
    }
    override(e10, t10) {
      void 0 === t10 && (t10 = false), rn.warn("override is deprecated. Please use overrideFeatureFlags instead."), this.overrideFeatureFlags({ flags: e10, suppressWarning: t10 });
    }
    overrideFeatureFlags(e10) {
      if (!this._instance.__loaded || !this._instance.persistence) return rn.uninitializedWarning("posthog.featureFlags.overrideFeatureFlags");
      if (false === e10) return this._instance.persistence.unregister(ro), this._instance.persistence.unregister(rc), void this.di();
      if (e10 && "object" == typeof e10 && ("flags" in e10 || "payloads" in e10)) {
        var t10;
        if (this.Xt = !!(null != (t10 = e10.suppressWarning) && t10), "flags" in e10) {
          if (false === e10.flags) this._instance.persistence.unregister(ro);
          else if (e10.flags) if ($(e10.flags)) {
            for (var i10 = {}, s10 = 0; s10 < e10.flags.length; s10++) i10[e10.flags[s10]] = true;
            this._instance.persistence.register({ [ro]: i10 });
          } else this._instance.persistence.register({ [ro]: e10.flags });
        }
        return "payloads" in e10 && (false === e10.payloads ? this._instance.persistence.unregister(rc) : e10.payloads && this._instance.persistence.register({ [rc]: e10.payloads })), void this.di();
      }
      this.di();
    }
    onFeatureFlags(e10) {
      if (this.addFeatureFlagsHandler(e10), this.Qt) {
        var { flags: t10, flagVariants: i10 } = this.vi();
        e10(t10, i10);
      }
      return () => this.removeFeatureFlagsHandler(e10);
    }
    updateEarlyAccessFeatureEnrollment(e10, t10, i10) {
      var s10, r10 = (this._instance.get_property(eJ) || []).find((t11) => t11.flagKey === e10), n2 = { ["$feature_enrollment/" + e10]: t10 }, a2 = { $feature_flag: e10, $feature_enrollment: t10, $set: n2 };
      r10 && (a2.$early_access_feature_name = r10.name), i10 && (a2.$feature_enrollment_stage = i10), this._instance.capture("$feature_enrollment_update", a2), this.setPersonPropertiesForFlags(n2, false);
      var o2 = f({}, this.getFlagVariants(), { [e10]: t10 });
      null == (s10 = this._instance.persistence) || s10.register({ [ra]: Object.keys(rh(o2)), [eX]: o2 }), this.di();
    }
    getEarlyAccessFeatures(e10, t10, i10) {
      void 0 === t10 && (t10 = false);
      var s10 = this._instance.get_property(eJ), r10 = i10 ? "&" + i10.map((e11) => "stage=" + e11).join("&") : "";
      if (s10 && !t10) return e10(s10);
      this._instance.ui({ url: this._instance.requestRouter.endpointFor("api", "/api/early_access_features/?token=" + this._instance.config.token + r10), method: "GET", callback: (t11) => {
        var i11, s11;
        if (t11.json) {
          var r11 = t11.json.earlyAccessFeatures;
          return null == (i11 = this._instance.persistence) || i11.unregister(eJ), null == (s11 = this._instance.persistence) || s11.register({ [eJ]: r11 }), e10(r11);
        }
      } });
    }
    vi() {
      var e10 = this.getFlags(), t10 = this.getFlagVariants();
      return { flags: e10.filter((e11) => t10[e11]), flagVariants: Object.keys(t10).filter((e11) => t10[e11]).reduce((e11, i10) => (e11[i10] = t10[i10], e11), {}) };
    }
    di(e10) {
      var { flags: t10, flagVariants: i10 } = this.vi();
      this.featureFlagEventHandlers.forEach((s10) => s10(t10, i10, { errorsLoading: e10 }));
    }
    setPersonPropertiesForFlags(e10, t10) {
      void 0 === t10 && (t10 = true);
      var i10 = this._instance.get_property(eQ) || {};
      this._instance.register({ [eQ]: f({}, i10, e10) }), t10 && this._instance.reloadFeatureFlags();
    }
    resetPersonPropertiesForFlags() {
      this._instance.unregister(eQ);
    }
    setGroupPropertiesForFlags(e10, t10) {
      void 0 === t10 && (t10 = true);
      var i10 = this._instance.get_property(eZ) || {};
      0 !== Object.keys(i10).length && Object.keys(i10).forEach((t11) => {
        i10[t11] = f({}, i10[t11], e10[t11]), delete e10[t11];
      }), this._instance.register({ [eZ]: f({}, i10, e10) }), t10 && this._instance.reloadFeatureFlags();
    }
    resetGroupPropertiesForFlags(e10) {
      if (e10) {
        var t10 = this._instance.get_property(eZ) || {};
        this._instance.register({ [eZ]: f({}, t10, { [e10]: {} }) });
      } else this._instance.unregister(eZ);
    }
    reset() {
      this.Qt = false, this.Zt = false, this.ti = false, this.ii = false, this.ei = false, this.ri = false, this.$anon_distinct_id = void 0, this.li(), this.Xt = false;
    }
  }
  var rg = ["cookie", "localstorage", "localstorage+cookie", "sessionstorage", "memory"];
  class r_ {
    constructor(e10, t10) {
      this.A = e10, this.props = {}, this.ci = false, this.fi = ((e11) => {
        var t11 = "";
        return e11.token && (t11 = e11.token.replace(/\+/g, "PL").replace(/\//g, "SL").replace(/=/g, "EQ")), e11.persistence_name ? "ph_" + e11.persistence_name : "ph_" + t11 + "_posthog";
      })(e10), this.it = this.pi(e10), this.load(), e10.debug && ey.info("Persistence loaded", e10.persistence, f({}, this.props)), this.update_config(e10, e10, t10), this.save();
    }
    isDisabled() {
      return !!this.gi;
    }
    pi(e10) {
      -1 === rg.indexOf(e10.persistence.toLowerCase()) && (ey.critical("Unknown persistence type " + e10.persistence + "; falling back to localStorage+cookie"), e10.persistence = "localStorage+cookie");
      var t10 = e10.persistence.toLowerCase();
      return "localstorage" === t10 && t1.G() ? t1 : "localstorage+cookie" === t10 && t3.G() ? t3 : "sessionstorage" === t10 && t4.G() ? t4 : "memory" === t10 ? t8 : "cookie" === t10 ? tZ : t3.G() ? t3 : tZ;
    }
    properties() {
      var e10 = {};
      return eS(this.props, function(t10, i10) {
        if (i10 === eX && F(t10)) for (var s10, r10 = Object.keys(t10), a2 = 0; a2 < r10.length; a2++) e10["$feature/" + r10[a2]] = t10[r10[a2]];
        else s10 = false, (A(ti) ? s10 : n && ti.indexOf === n ? -1 != ti.indexOf(i10) : (eS(ti, function(e11) {
          if (s10 || (s10 = e11 === i10)) return ex;
        }), s10)) || (e10[i10] = t10);
      }), e10;
    }
    load() {
      if (!this.gi) {
        var e10 = this.it.K(this.fi);
        e10 && (this.props = eP({}, e10));
      }
    }
    save() {
      this.gi || this.it.Y(this.fi, this.props, this.mi, this.yi, this.bi, this.A.debug);
    }
    remove() {
      this.it.X(this.fi, false), this.it.X(this.fi, true);
    }
    clear() {
      this.remove(), this.props = {};
    }
    register_once(e10, t10, i10) {
      if (F(e10)) {
        R(t10) && (t10 = "None"), this.mi = R(i10) ? this.wi : i10;
        var s10 = false;
        if (eS(e10, (e11, i11) => {
          this.props.hasOwnProperty(i11) && this.props[i11] !== t10 || (this.props[i11] = e11, s10 = true);
        }), s10) return this.save(), true;
      }
      return false;
    }
    register(e10, t10) {
      if (F(e10)) {
        this.mi = R(t10) ? this.wi : t10;
        var i10 = false;
        if (eS(e10, (t11, s10) => {
          e10.hasOwnProperty(s10) && this.props[s10] !== t11 && (this.props[s10] = t11, i10 = true);
        }), i10) return this.save(), true;
      }
      return false;
    }
    unregister(e10) {
      e10 in this.props && (delete this.props[e10], this.save());
    }
    update_campaign_params() {
      if (!this.ci) {
        var e10 = su(this.A.custom_campaign_params, this.A.mask_personal_data_properties, this.A.custom_personal_data_properties);
        O(eR(e10)) || this.register(e10), this.ci = true;
      }
    }
    update_search_keyword() {
      var e10;
      this.register((e10 = null == o ? void 0 : o.referrer) ? sd(e10) : {});
    }
    update_referrer_info() {
      var e10;
      this.register_once({ $referrer: sg(), $referring_domain: null != o && o.referrer && (null == (e10 = tA(o.referrer)) ? void 0 : e10.host) || "$direct" }, void 0);
    }
    set_initial_person_info() {
      this.props[e6] || this.props[e4] || this.register_once({ [e7]: s_(this.A.mask_personal_data_properties, this.A.custom_personal_data_properties) }, void 0);
    }
    get_initial_props() {
      var e10 = {};
      eS([e4, e6], (t11) => {
        var i11 = this.props[t11];
        i11 && eS(i11, function(t12, i12) {
          e10["$initial_" + E(i12)] = t12;
        });
      });
      var t10, i10, s10 = this.props[e7];
      return s10 && eP(e10, (t10 = sv(s10), i10 = {}, eS(t10, function(e11, t11) {
        i10["$initial_" + E(t11)] = e11;
      }), i10)), e10;
    }
    safe_merge(e10) {
      return eS(this.props, function(t10, i10) {
        i10 in e10 || (e10[i10] = t10);
      }), e10;
    }
    update_config(e10, t10, i10) {
      if (this.wi = this.mi = e10.cookie_expiration, this.set_disabled(e10.disable_persistence || !!i10), this.set_cross_subdomain(e10.cross_subdomain_cookie), this.set_secure(e10.secure_cookie), e10.persistence !== t10.persistence) {
        var s10 = this.pi(e10), r10 = this.props;
        this.clear(), this.it = s10, this.props = r10, this.save();
      }
    }
    set_disabled(e10) {
      this.gi = e10, this.gi ? this.remove() : this.save();
    }
    set_cross_subdomain(e10) {
      e10 !== this.yi && (this.yi = e10, this.remove(), this.save());
    }
    set_secure(e10) {
      e10 !== this.bi && (this.bi = e10, this.remove(), this.save());
    }
    set_event_timer(e10, t10) {
      var i10 = this.props[eL] || {};
      i10[e10] = t10, this.props[eL] = i10, this.save();
    }
    remove_event_timer(e10) {
      var t10 = (this.props[eL] || {})[e10];
      return R(t10) || (delete this.props[eL][e10], this.save()), t10;
    }
    get_property(e10) {
      return this.props[e10];
    }
    set_property(e10, t10) {
      this.props[e10] = t10, this.save();
    }
  }
  (no = {}).Button = "button", no.Tab = "tab", no.Selector = "selector", (nl = {}).TopLeft = "top_left", nl.TopRight = "top_right", nl.TopCenter = "top_center", nl.MiddleLeft = "middle_left", nl.MiddleRight = "middle_right", nl.MiddleCenter = "middle_center", nl.Left = "left", nl.Center = "center", nl.Right = "right", nl.NextToTrigger = "next_to_trigger";
  var rv = ((nc = {}).Popover = "popover", nc.API = "api", nc.Widget = "widget", nc.ExternalSurvey = "external_survey", nc), rf = ((nu = {}).Open = "open", nu.MultipleChoice = "multiple_choice", nu.SingleChoice = "single_choice", nu.Rating = "rating", nu.Link = "link", (nh = {}).NextQuestion = "next_question", nh.End = "end", nh.ResponseBased = "response_based", nh.SpecificQuestion = "specific_question", (nd = {}).Once = "once", nd.Recurring = "recurring", nd.Always = "always", (np = {}).SHOWN = "survey shown", np.DISMISSED = "survey dismissed", np.SENT = "survey sent", np), rm = ((ng = {}).SURVEY_ID = "$survey_id", ng.SURVEY_NAME = "$survey_name", ng.SURVEY_RESPONSE = "$survey_response", ng.SURVEY_ITERATION = "$survey_iteration", ng.SURVEY_ITERATION_START_DATE = "$survey_iteration_start_date", ng.SURVEY_PARTIALLY_COMPLETED = "$survey_partially_completed", ng.SURVEY_SUBMISSION_ID = "$survey_submission_id", ng.SURVEY_QUESTIONS = "$survey_questions", ng.SURVEY_COMPLETED = "$survey_completed", ng), ry = ((n_ = {}).Popover = "popover", n_.Inline = "inline", n_);
  class rb {
    constructor() {
      this.xi = {}, this.xi = {};
    }
    on(e10, t10) {
      return this.xi[e10] || (this.xi[e10] = []), this.xi[e10].push(t10), () => {
        this.xi[e10] = this.xi[e10].filter((e11) => e11 !== t10);
      };
    }
    emit(e10, t10) {
      for (var i10 of this.xi[e10] || []) i10(t10);
      for (var s10 of this.xi["*"] || []) s10(e10, t10);
    }
  }
  class rw {
    constructor(e10) {
      this.Si = new rb(), this.Ei = (e11, t10) => this.$i(e11, t10) && this.ki(e11, t10) && this.Pi(e11, t10), this.$i = (e11, t10) => null == t10 || !t10.event || (null == e11 ? void 0 : e11.event) === (null == t10 ? void 0 : t10.event), this._instance = e10, this.Ti = /* @__PURE__ */ new Set(), this.Ii = /* @__PURE__ */ new Set();
    }
    init() {
      var e10, t10;
      R(null == (e10 = this._instance) ? void 0 : e10.Ri) || null == (t10 = this._instance) || t10.Ri((e11, t11) => {
        this.on(e11, t11);
      });
    }
    register(e10) {
      var t10, i10;
      if (!R(null == (t10 = this._instance) ? void 0 : t10.Ri) && (e10.forEach((e11) => {
        var t11, i11;
        null == (t11 = this.Ii) || t11.add(e11), null == (i11 = e11.steps) || i11.forEach((e12) => {
          var t12;
          null == (t12 = this.Ti) || t12.add((null == e12 ? void 0 : e12.event) || "");
        });
      }), null != (i10 = this._instance) && i10.autocapture)) {
        var s10, r10 = /* @__PURE__ */ new Set();
        e10.forEach((e11) => {
          var t11;
          null == (t11 = e11.steps) || t11.forEach((e12) => {
            null != e12 && e12.selector && r10.add(null == e12 ? void 0 : e12.selector);
          });
        }), null == (s10 = this._instance) || s10.autocapture.setElementSelectors(r10);
      }
    }
    on(e10, t10) {
      var i10;
      null != t10 && 0 != e10.length && (this.Ti.has(e10) || this.Ti.has(null == t10 ? void 0 : t10.event)) && this.Ii && (null == (i10 = this.Ii) ? void 0 : i10.size) > 0 && this.Ii.forEach((e11) => {
        this.Ci(t10, e11) && this.Si.emit("actionCaptured", e11.name);
      });
    }
    Oi(e10) {
      this.onAction("actionCaptured", (t10) => e10(t10));
    }
    Ci(e10, t10) {
      if (null == (null == t10 ? void 0 : t10.steps)) return false;
      for (var i10 of t10.steps) if (this.Ei(e10, i10)) return true;
      return false;
    }
    onAction(e10, t10) {
      return this.Si.on(e10, t10);
    }
    ki(e10, t10) {
      if (null != t10 && t10.url) {
        var i10, s10 = null == e10 || null == (i10 = e10.properties) ? void 0 : i10.$current_url;
        if (!s10 || "string" != typeof s10 || !rw.Fi(s10, null == t10 ? void 0 : t10.url, (null == t10 ? void 0 : t10.url_matching) || "contains")) return false;
      }
      return true;
    }
    static Fi(e10, i10, s10) {
      switch (s10) {
        case "regex":
          return !!t && s9(e10, i10);
        case "exact":
          return i10 === e10;
        case "contains":
          return s9(e10, rw.Mi(i10).replace(/_/g, ".").replace(/%/g, ".*"));
        default:
          return false;
      }
    }
    static Mi(e10) {
      return e10.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d");
    }
    Pi(e10, t10) {
      if ((null != t10 && t10.href || null != t10 && t10.tag_name || null != t10 && t10.text) && !this.Ai(e10).some((e11) => !(null != t10 && t10.href && !rw.Fi(e11.href || "", null == t10 ? void 0 : t10.href, (null == t10 ? void 0 : t10.href_matching) || "exact")) && (null == t10 || !t10.tag_name || e11.tag_name === (null == t10 ? void 0 : t10.tag_name)) && !(null != t10 && t10.text && !rw.Fi(e11.text || "", null == t10 ? void 0 : t10.text, (null == t10 ? void 0 : t10.text_matching) || "exact") && !rw.Fi(e11.$el_text || "", null == t10 ? void 0 : t10.text, (null == t10 ? void 0 : t10.text_matching) || "exact")))) return false;
      if (null != t10 && t10.selector) {
        var i10, s10 = null == e10 || null == (i10 = e10.properties) ? void 0 : i10.$element_selectors;
        if (!s10 || !s10.includes(null == t10 ? void 0 : t10.selector)) return false;
      }
      return true;
    }
    Ai(e10) {
      return null == (null == e10 ? void 0 : e10.properties.$elements) ? [] : null == e10 ? void 0 : e10.properties.$elements;
    }
  }
  var rE = eb("[Surveys]"), rx = "seenSurvey_", rk = (e10) => {
    var t10 = "" + rx + e10.id;
    return e10.current_iteration && e10.current_iteration > 0 && (t10 = "" + rx + e10.id + "_" + e10.current_iteration), t10;
  }, rS = [rv.Popover, rv.Widget, rv.API], rP = { ignoreConditions: false, ignoreDelay: false, displayType: ry.Popover };
  class r$ {
    constructor(e10) {
      this._instance = e10, this.ji = /* @__PURE__ */ new Map(), this.Di = /* @__PURE__ */ new Map();
    }
    register(e10) {
      var t10;
      R(null == (t10 = this._instance) ? void 0 : t10.Ri) || (this.Li(e10), this.Ni(e10));
    }
    Ni(e10) {
      var t10 = e10.filter((e11) => {
        var t11, i10;
        return (null == (t11 = e11.conditions) ? void 0 : t11.actions) && (null == (i10 = e11.conditions) || null == (i10 = i10.actions) || null == (i10 = i10.values) ? void 0 : i10.length) > 0;
      });
      0 !== t10.length && (null == this.Ui && (this.Ui = new rw(this._instance), this.Ui.init(), this.Ui.Oi((e11) => {
        this.onAction(e11);
      })), t10.forEach((e11) => {
        var t11, i10, s10, r10, n2;
        e11.conditions && null != (t11 = e11.conditions) && t11.actions && null != (i10 = e11.conditions) && null != (i10 = i10.actions) && i10.values && (null == (s10 = e11.conditions) || null == (s10 = s10.actions) || null == (s10 = s10.values) ? void 0 : s10.length) > 0 && (null == (r10 = this.Ui) || r10.register(e11.conditions.actions.values), null == (n2 = e11.conditions) || null == (n2 = n2.actions) || null == (n2 = n2.values) || n2.forEach((t12) => {
          if (t12 && t12.name) {
            var i11 = this.Di.get(t12.name);
            i11 && i11.push(e11.id), this.Di.set(t12.name, i11 || [e11.id]);
          }
        }));
      }));
    }
    Li(e10) {
      var t10;
      0 !== e10.filter((e11) => {
        var t11, i10;
        return (null == (t11 = e11.conditions) ? void 0 : t11.events) && (null == (i10 = e11.conditions) || null == (i10 = i10.events) || null == (i10 = i10.values) ? void 0 : i10.length) > 0;
      }).length && (null == (t10 = this._instance) || t10.Ri((e11, t11) => {
        this.onEvent(e11, t11);
      }), e10.forEach((e11) => {
        var t11;
        null == (t11 = e11.conditions) || null == (t11 = t11.events) || null == (t11 = t11.values) || t11.forEach((t12) => {
          if (t12 && t12.name) {
            var i10 = this.ji.get(t12.name);
            i10 && i10.push(e11.id), this.ji.set(t12.name, i10 || [e11.id]);
          }
        });
      }));
    }
    onEvent(e10, t10) {
      var i10, s10, r10 = (null == (i10 = this._instance) || null == (i10 = i10.persistence) ? void 0 : i10.props[e1]) || [];
      if (rf.SHOWN === e10 && t10 && r10.length > 0) {
        rE.info("survey event matched, removing survey from activated surveys", { event: e10, eventPayload: t10, existingActivatedSurveys: r10 });
        var n2, a2 = null == t10 || null == (n2 = t10.properties) ? void 0 : n2.$survey_id;
        if (a2) {
          var o2 = r10.indexOf(a2);
          o2 >= 0 && (r10.splice(o2, 1), this.zi(r10));
        }
      } else if (this.ji.has(e10)) {
        rE.info("survey event name matched", { event: e10, eventPayload: t10, surveys: this.ji.get(e10) });
        var l2 = [];
        null == (s10 = this._instance) || s10.getSurveys((t11) => {
          l2 = t11.filter((t12) => {
            var i11;
            return null == (i11 = this.ji.get(e10)) ? void 0 : i11.includes(t12.id);
          });
        });
        var c2 = l2.filter((i11) => {
          var s11, r11 = null == (s11 = i11.conditions) || null == (s11 = s11.events) || null == (s11 = s11.values) ? void 0 : s11.find((t11) => t11.name === e10);
          return !!r11 && (!r11.propertyFilters || Object.entries(r11.propertyFilters).every((e11) => {
            var i12, [s12, r12] = e11, n3 = null == t10 || null == (i12 = t10.properties) ? void 0 : i12[s12];
            if (R(n3) || A(n3)) return false;
            var a3 = [String(n3)], o3 = rt[r12.operator];
            return o3 ? o3(r12.values, a3) : (rE.warn("Unknown property comparison operator: " + r12.operator), false);
          }));
        });
        this.zi(r10.concat(c2.map((e11) => e11.id) || []));
      }
    }
    onAction(e10) {
      var t10, i10 = (null == (t10 = this._instance) || null == (t10 = t10.persistence) ? void 0 : t10.props[e1]) || [];
      this.Di.has(e10) && this.zi(i10.concat(this.Di.get(e10) || []));
    }
    zi(e10) {
      var t10;
      rE.info("updating activated surveys", { activatedSurveys: e10 }), null == (t10 = this._instance) || null == (t10 = t10.persistence) || t10.register({ [e1]: [...new Set(e10)] });
    }
    getSurveys() {
      var e10;
      return (null == (e10 = this._instance) || null == (e10 = e10.persistence) ? void 0 : e10.props[e1]) || [];
    }
    getEventToSurveys() {
      return this.ji;
    }
    Hi() {
      return this.Ui;
    }
  }
  class rI {
    constructor(e10) {
      this.Bi = void 0, this._surveyManager = null, this.qi = false, this.Wi = false, this.Gi = [], this._instance = e10, this._surveyEventReceiver = null;
    }
    onRemoteConfig(e10) {
      if (!this._instance.config.disable_surveys) {
        var t10 = e10.surveys;
        if (M(t10)) return rE.warn("Flags not loaded yet. Not loading surveys.");
        var i10 = $(t10);
        this.Bi = i10 ? t10.length > 0 : t10, rE.info("flags response received, isSurveysEnabled: " + this.Bi), this.loadIfEnabled();
      }
    }
    reset() {
      localStorage.removeItem("lastSeenSurveyDate");
      for (var e10 = [], t10 = 0; t10 < localStorage.length; t10++) {
        var i10 = localStorage.key(t10);
        (null != i10 && i10.startsWith(rx) || null != i10 && i10.startsWith("inProgressSurvey_")) && e10.push(i10);
      }
      e10.forEach((e11) => localStorage.removeItem(e11));
    }
    loadIfEnabled() {
      if (!this._surveyManager) if (this.Wi) rE.info("Already initializing surveys, skipping...");
      else if (this._instance.config.disable_surveys) rE.info("Disabled. Not loading surveys.");
      else if (this._instance.config.cookieless_mode && this._instance.consent.isOptedOut()) rE.info("Not loading surveys in cookieless mode without consent.");
      else {
        var e10 = null == p ? void 0 : p.__PosthogExtensions__;
        if (e10) {
          if (!R(this.Bi) || this._instance.config.advanced_enable_surveys) {
            var t10 = this.Bi || this._instance.config.advanced_enable_surveys;
            this.Wi = true;
            try {
              var i10 = e10.generateSurveys;
              if (i10) return void this.Vi(i10, t10);
              var s10 = e10.loadExternalDependency;
              if (!s10) return void this.Ji("PostHog loadExternalDependency extension not found.");
              s10(this._instance, "surveys", (i11) => {
                i11 || !e10.generateSurveys ? this.Ji("Could not load surveys script", i11) : this.Vi(e10.generateSurveys, t10);
              });
            } catch (e11) {
              throw this.Ji("Error initializing surveys", e11), e11;
            } finally {
              this.Wi = false;
            }
          }
        } else rE.error("PostHog Extensions not found.");
      }
    }
    Vi(e10, t10) {
      this._surveyManager = e10(this._instance, t10), this._surveyEventReceiver = new r$(this._instance), rE.info("Surveys loaded successfully"), this.Ki({ isLoaded: true });
    }
    Ji(e10, t10) {
      rE.error(e10, t10), this.Ki({ isLoaded: false, error: e10 });
    }
    onSurveysLoaded(e10) {
      return this.Gi.push(e10), this._surveyManager && this.Ki({ isLoaded: true }), () => {
        this.Gi = this.Gi.filter((t10) => t10 !== e10);
      };
    }
    getSurveys(e10, t10) {
      if (void 0 === t10 && (t10 = false), this._instance.config.disable_surveys) return rE.info("Disabled. Not loading surveys."), e10([]);
      var i10 = this._instance.get_property(e0);
      if (i10 && !t10) return e10(i10, { isLoaded: true });
      if (this.qi) return e10([], { isLoaded: false, error: "Surveys are already being loaded" });
      try {
        this.qi = true, this._instance.ui({ url: this._instance.requestRouter.endpointFor("api", "/api/surveys/?token=" + this._instance.config.token), method: "GET", timeout: this._instance.config.surveys_request_timeout_ms, callback: (t11) => {
          this.qi = false;
          var i11 = t11.statusCode;
          if (200 !== i11 || !t11.json) {
            var s10 = "Surveys API could not be loaded, status: " + i11;
            return rE.error(s10), e10([], { isLoaded: false, error: s10 });
          }
          var r10, n2, a2 = t11.json.surveys || [], o2 = a2.filter((e11) => {
            var t12, i12;
            return !(!e11.start_date || e11.end_date) && (!(null == (t12 = e11.conditions) || null == (t12 = t12.events) || null == (t12 = t12.values) || !t12.length) || !(null == (i12 = e11.conditions) || null == (i12 = i12.actions) || null == (i12 = i12.values) || !i12.length));
          });
          return o2.length > 0 && (null == (n2 = this._surveyEventReceiver) || n2.register(o2)), null == (r10 = this._instance.persistence) || r10.register({ [e0]: a2 }), e10(a2, { isLoaded: true });
        } });
      } catch (e11) {
        throw this.qi = false, e11;
      }
    }
    Ki(e10) {
      for (var t10 of this.Gi) try {
        if (!e10.isLoaded) return t10([], e10);
        this.getSurveys(t10);
      } catch (e11) {
        rE.error("Error in survey callback", e11);
      }
    }
    getActiveMatchingSurveys(e10, t10) {
      if (void 0 === t10 && (t10 = false), !M(this._surveyManager)) return this._surveyManager.getActiveMatchingSurveys(e10, t10);
      rE.warn("init was not called");
    }
    Yi(e10) {
      var t10 = null;
      return this.getSurveys((i10) => {
        var s10;
        t10 = null != (s10 = i10.find((t11) => t11.id === e10)) ? s10 : null;
      }), t10;
    }
    Xi(e10) {
      if (M(this._surveyManager)) return { eligible: false, reason: "SDK is not enabled or survey functionality is not yet loaded" };
      var t10 = "string" == typeof e10 ? this.Yi(e10) : e10;
      return t10 ? this._surveyManager.checkSurveyEligibility(t10) : { eligible: false, reason: "Survey not found" };
    }
    canRenderSurvey(e10) {
      if (M(this._surveyManager)) return rE.warn("init was not called"), { visible: false, disabledReason: "SDK is not enabled or survey functionality is not yet loaded" };
      var t10 = this.Xi(e10);
      return { visible: t10.eligible, disabledReason: t10.reason };
    }
    canRenderSurveyAsync(e10, t10) {
      return M(this._surveyManager) ? (rE.warn("init was not called"), Promise.resolve({ visible: false, disabledReason: "SDK is not enabled or survey functionality is not yet loaded" })) : new Promise((i10) => {
        this.getSurveys((t11) => {
          var s10, r10 = null != (s10 = t11.find((t12) => t12.id === e10)) ? s10 : null;
          if (r10) {
            var n2 = this.Xi(r10);
            i10({ visible: n2.eligible, disabledReason: n2.reason });
          } else i10({ visible: false, disabledReason: "Survey not found" });
        }, t10);
      });
    }
    renderSurvey(e10, t10) {
      var i10;
      if (M(this._surveyManager)) rE.warn("init was not called");
      else {
        var s10 = "string" == typeof e10 ? this.Yi(e10) : e10;
        if (null != s10 && s10.id) if (rS.includes(s10.type)) {
          var r10 = null == o ? void 0 : o.querySelector(t10);
          if (r10) return null != (i10 = s10.appearance) && i10.surveyPopupDelaySeconds ? (rE.info("Rendering survey " + s10.id + " with delay of " + s10.appearance.surveyPopupDelaySeconds + " seconds"), void setTimeout(() => {
            var e11, t11;
            rE.info("Rendering survey " + s10.id + " with delay of " + (null == (e11 = s10.appearance) ? void 0 : e11.surveyPopupDelaySeconds) + " seconds"), null == (t11 = this._surveyManager) || t11.renderSurvey(s10, r10), rE.info("Survey " + s10.id + " rendered");
          }, 1e3 * s10.appearance.surveyPopupDelaySeconds)) : void this._surveyManager.renderSurvey(s10, r10);
          rE.warn("Survey element not found");
        } else rE.warn("Surveys of type " + s10.type + " cannot be rendered in the app");
        else rE.warn("Survey not found");
      }
    }
    displaySurvey(e10, t10) {
      var i10;
      if (M(this._surveyManager)) rE.warn("init was not called");
      else {
        var s10 = this.Yi(e10);
        if (s10) {
          var r10 = s10;
          if (null != (i10 = s10.appearance) && i10.surveyPopupDelaySeconds && t10.ignoreDelay && (r10 = f({}, s10, { appearance: f({}, s10.appearance, { surveyPopupDelaySeconds: 0 }) })), false === t10.ignoreConditions) {
            var n2 = this.canRenderSurvey(s10);
            if (!n2.visible) return void rE.warn("Survey is not eligible to be displayed: ", n2.disabledReason);
          }
          t10.displayType !== ry.Inline ? this._surveyManager.handlePopoverSurvey(r10) : this.renderSurvey(r10, t10.selector);
        } else rE.warn("Survey not found");
      }
    }
  }
  var rF = eb("[RateLimiter]");
  class rO {
    constructor(e10) {
      var t10, i10;
      this.serverLimits = {}, this.lastEventRateLimited = false, this.checkForLimiting = (e11) => {
        var t11 = e11.text;
        if (t11 && t11.length) try {
          (JSON.parse(t11).quota_limited || []).forEach((e12) => {
            rF.info((e12 || "events") + " is quota limited."), this.serverLimits[e12] = (/* @__PURE__ */ new Date()).getTime() + 6e4;
          });
        } catch (e12) {
          return void rF.warn('could not rate limit - continuing. Error: "' + (null == e12 ? void 0 : e12.message) + '"', { text: t11 });
        }
      }, this.instance = e10, this.captureEventsPerSecond = (null == (t10 = e10.config.rate_limiting) ? void 0 : t10.events_per_second) || 10, this.captureEventsBurstLimit = Math.max((null == (i10 = e10.config.rate_limiting) ? void 0 : i10.events_burst_limit) || 10 * this.captureEventsPerSecond, this.captureEventsPerSecond), this.lastEventRateLimited = this.clientRateLimitContext(true).isRateLimited;
    }
    clientRateLimitContext(e10) {
      void 0 === e10 && (e10 = false);
      var t10, i10, s10, r10 = (/* @__PURE__ */ new Date()).getTime(), n2 = null != (t10 = null == (i10 = this.instance.persistence) ? void 0 : i10.get_property(e8)) ? t10 : { tokens: this.captureEventsBurstLimit, last: r10 };
      n2.tokens += (r10 - n2.last) / 1e3 * this.captureEventsPerSecond, n2.last = r10, n2.tokens > this.captureEventsBurstLimit && (n2.tokens = this.captureEventsBurstLimit);
      var a2 = n2.tokens < 1;
      return a2 || e10 || (n2.tokens = Math.max(0, n2.tokens - 1)), !a2 || this.lastEventRateLimited || e10 || this.instance.capture("$$client_ingestion_warning", { $$client_ingestion_warning_message: "posthog-js client rate limited. Config is set to " + this.captureEventsPerSecond + " events per second and " + this.captureEventsBurstLimit + " events burst limit." }, { skip_client_rate_limiting: true }), this.lastEventRateLimited = a2, null == (s10 = this.instance.persistence) || s10.set_property(e8, n2), { isRateLimited: a2, remainingTokens: n2.tokens };
    }
    isServerRateLimited(e10) {
      var t10 = this.serverLimits[e10 || "events"] || false;
      return false !== t10 && (/* @__PURE__ */ new Date()).getTime() < t10;
    }
  }
  var rR = eb("[RemoteConfig]");
  class rC {
    constructor(e10) {
      this._instance = e10;
    }
    get remoteConfig() {
      var e10;
      return null == (e10 = p._POSTHOG_REMOTE_CONFIG) || null == (e10 = e10[this._instance.config.token]) ? void 0 : e10.config;
    }
    Qi(e10) {
      var t10, i10;
      null != (t10 = p.__PosthogExtensions__) && t10.loadExternalDependency ? null == (i10 = p.__PosthogExtensions__) || null == i10.loadExternalDependency || i10.loadExternalDependency(this._instance, "remote-config", () => e10(this.remoteConfig)) : (rR.error("PostHog Extensions not found. Cannot load remote config."), e10());
    }
    Zi(e10) {
      this._instance.ui({ method: "GET", url: this._instance.requestRouter.endpointFor("assets", "/array/" + this._instance.config.token + "/config"), callback: (t10) => {
        e10(t10.json);
      } });
    }
    load() {
      try {
        if (this.remoteConfig) return rR.info("Using preloaded remote config", this.remoteConfig), void this.hi(this.remoteConfig);
        if (this._instance.L()) return void rR.warn("Remote config is disabled. Falling back to local config.");
        this.Qi((e10) => {
          e10 ? this.hi(e10) : (rR.info("No config found after loading remote JS config. Falling back to JSON."), this.Zi((e11) => {
            this.hi(e11);
          }));
        });
      } catch (e10) {
        rR.error("Error loading remote config", e10);
      }
    }
    hi(e10) {
      e10 ? this._instance.config.__preview_remote_config ? (this._instance.hi(e10), false !== e10.hasFeatureFlags && this._instance.featureFlags.ensureFlagsLoaded()) : rR.info("__preview_remote_config is disabled. Logging config instead", e10) : rR.error("Failed to fetch remote config from PostHog.");
    }
  }
  class rT {
    constructor(e10, t10) {
      this.te = true, this.ie = [], this.ee = B((null == t10 ? void 0 : t10.flush_interval_ms) || 3e3, 250, 5e3, ey.createLogger("flush interval"), 3e3), this.re = e10;
    }
    enqueue(e10) {
      this.ie.push(e10), this.se || this.ne();
    }
    unload() {
      this.oe();
      var e10 = Object.values(this.ie.length > 0 ? this.ae() : {});
      [...e10.filter((e11) => 0 === e11.url.indexOf("/e")), ...e10.filter((e11) => 0 !== e11.url.indexOf("/e"))].map((e11) => {
        this.re(f({}, e11, { transport: "sendBeacon" }));
      });
    }
    enable() {
      this.te = false, this.ne();
    }
    ne() {
      var e10 = this;
      this.te || (this.se = setTimeout(() => {
        if (this.oe(), this.ie.length > 0) {
          var t10 = this.ae();
          for (var i10 in t10) !function() {
            var s10 = t10[i10], r10 = (/* @__PURE__ */ new Date()).getTime();
            s10.data && $(s10.data) && eS(s10.data, (e11) => {
              e11.offset = Math.abs(e11.timestamp - r10), delete e11.timestamp;
            }), e10.re(s10);
          }();
        }
      }, this.ee));
    }
    oe() {
      clearTimeout(this.se), this.se = void 0;
    }
    ae() {
      var e10 = {};
      return eS(this.ie, (t10) => {
        var i10, s10 = (t10 ? t10.batchKey : null) || t10.url;
        R(e10[s10]) && (e10[s10] = f({}, t10, { data: [] })), null == (i10 = e10[s10].data) || i10.push(t10.data);
      }), this.ie = [], e10;
    }
  }
  var rA = ["retriesPerformedSoFar"];
  class rM {
    constructor(e10) {
      this.le = false, this.ue = 3e3, this.ie = [], this._instance = e10, this.ie = [], this.he = true, !R(t) && "onLine" in t.navigator && (this.he = t.navigator.onLine, eA(t, "online", () => {
        this.he = true, this.jt();
      }), eA(t, "offline", () => {
        this.he = false;
      }));
    }
    get length() {
      return this.ie.length;
    }
    retriableRequest(e10) {
      var { retriesPerformedSoFar: t10 } = e10, i10 = m(e10, rA);
      D(t10) && t10 > 0 && (i10.url = s8(i10.url, { retry_count: t10 })), this._instance.ui(f({}, i10, { callback: (e11) => {
        200 !== e11.statusCode && (e11.statusCode < 400 || e11.statusCode >= 500) && (null != t10 ? t10 : 0) < 10 ? this.de(f({ retriesPerformedSoFar: t10 }, i10)) : null == i10.callback || i10.callback(e11);
      } }));
    }
    de(e10) {
      var t10, i10, s10, r10 = e10.retriesPerformedSoFar || 0;
      e10.retriesPerformedSoFar = r10 + 1;
      var n2 = (s10 = (Math.random() - 0.5) * ((i10 = Math.min(18e5, t10 = 3e3 * Math.pow(2, r10))) - t10 / 2), Math.ceil(i10 + s10)), a2 = Date.now() + n2;
      this.ie.push({ retryAt: a2, requestOptions: e10 });
      var o2 = "Enqueued failed request for retry in " + n2;
      navigator.onLine || (o2 += " (Browser is offline)"), ey.warn(o2), this.le || (this.le = true, this.ve());
    }
    ve() {
      this.ce && clearTimeout(this.ce), this.ce = setTimeout(() => {
        this.he && this.ie.length > 0 && this.jt(), this.ve();
      }, this.ue);
    }
    jt() {
      var e10 = Date.now(), t10 = [], i10 = this.ie.filter((i11) => i11.retryAt < e10 || (t10.push(i11), false));
      if (this.ie = t10, i10.length > 0) for (var { requestOptions: s10 } of i10) this.retriableRequest(s10);
    }
    unload() {
      for (var { requestOptions: e10 } of (this.ce && (clearTimeout(this.ce), this.ce = void 0), this.ie)) try {
        this._instance.ui(f({}, e10, { transport: "sendBeacon" }));
      } catch (e11) {
        ey.error(e11);
      }
      this.ie = [];
    }
  }
  class rD {
    constructor(e10) {
      this.fe = () => {
        this.pe || (this.pe = {});
        var e11, t10, i10, s10, r10 = this.scrollElement(), n2 = this.scrollY(), a2 = r10 ? Math.max(0, r10.scrollHeight - r10.clientHeight) : 0, o2 = n2 + ((null == r10 ? void 0 : r10.clientHeight) || 0), l2 = (null == r10 ? void 0 : r10.scrollHeight) || 0;
        this.pe.lastScrollY = Math.ceil(n2), this.pe.maxScrollY = Math.max(n2, null != (e11 = this.pe.maxScrollY) ? e11 : 0), this.pe.maxScrollHeight = Math.max(a2, null != (t10 = this.pe.maxScrollHeight) ? t10 : 0), this.pe.lastContentY = o2, this.pe.maxContentY = Math.max(o2, null != (i10 = this.pe.maxContentY) ? i10 : 0), this.pe.maxContentHeight = Math.max(l2, null != (s10 = this.pe.maxContentHeight) ? s10 : 0);
      }, this._instance = e10;
    }
    getContext() {
      return this.pe;
    }
    resetContext() {
      var e10 = this.pe;
      return setTimeout(this.fe, 0), e10;
    }
    startMeasuringScrollPosition() {
      eA(t, "scroll", this.fe, { capture: true }), eA(t, "scrollend", this.fe, { capture: true }), eA(t, "resize", this.fe);
    }
    scrollElement() {
      if (!this._instance.config.scroll_root_selector) return null == t ? void 0 : t.document.documentElement;
      for (var e10 of $(this._instance.config.scroll_root_selector) ? this._instance.config.scroll_root_selector : [this._instance.config.scroll_root_selector]) {
        var i10 = null == t ? void 0 : t.document.querySelector(e10);
        if (i10) return i10;
      }
    }
    scrollY() {
      if (this._instance.config.scroll_root_selector) {
        var e10 = this.scrollElement();
        return e10 && e10.scrollTop || 0;
      }
      return t && (t.scrollY || t.pageYOffset || t.document.documentElement.scrollTop) || 0;
    }
    scrollX() {
      if (this._instance.config.scroll_root_selector) {
        var e10 = this.scrollElement();
        return e10 && e10.scrollLeft || 0;
      }
      return t && (t.scrollX || t.pageXOffset || t.document.documentElement.scrollLeft) || 0;
    }
  }
  var rL = (e10) => s_(null == e10 ? void 0 : e10.config.mask_personal_data_properties, null == e10 ? void 0 : e10.config.custom_personal_data_properties);
  class rN {
    constructor(e10, t10, i10, s10) {
      this.ge = (e11) => {
        var t11 = this._e();
        if (!t11 || t11.sessionId !== e11) {
          var i11 = { sessionId: e11, props: this.me(this._instance) };
          this.ye.register({ [e5]: i11 });
        }
      }, this._instance = e10, this.be = t10, this.ye = i10, this.me = s10 || rL, this.be.onSessionId(this.ge);
    }
    _e() {
      return this.ye.props[e5];
    }
    getSetOnceProps() {
      var e10, t10 = null == (e10 = this._e()) ? void 0 : e10.props;
      return t10 ? "r" in t10 ? sv(t10) : { $referring_domain: t10.referringDomain, $pathname: t10.initialPathName, utm_source: t10.utm_source, utm_campaign: t10.utm_campaign, utm_medium: t10.utm_medium, utm_content: t10.utm_content, utm_term: t10.utm_term } : {};
    }
    getSessionProps() {
      var e10 = {};
      return eS(eR(this.getSetOnceProps()), (t10, i10) => {
        "$current_url" === i10 && (i10 = "url"), e10["$session_entry_" + E(i10)] = t10;
      }), e10;
    }
  }
  var rj = eb("[SessionId]");
  class rq {
    on(e10, t10) {
      return this.we.on(e10, t10);
    }
    constructor(e10, t10, i10) {
      if (this.xe = [], this.Se = void 0, this.we = new rb(), this.Ee = (e11, t11) => Math.abs(e11 - t11) > this.sessionTimeoutMs, !e10.persistence) throw Error("SessionIdManager requires a PostHogPersistence instance");
      if ("always" === e10.config.cookieless_mode) throw Error('SessionIdManager cannot be used with cookieless_mode="always"');
      this.A = e10.config, this.ye = e10.persistence, this.$e = void 0, this.ke = void 0, this._sessionStartTimestamp = null, this._sessionActivityTimestamp = null, this.Pe = t10 || tX, this.Te = i10 || tX;
      var s10, r10 = this.A.persistence_name || this.A.token, n2 = this.A.session_idle_timeout_seconds || 1800;
      if (this._sessionTimeoutMs = 1e3 * B(n2, 60, 36e3, rj.createLogger("session_idle_timeout_seconds"), 1800), e10.register({ $configured_session_timeout_ms: this._sessionTimeoutMs }), this.Ie(), this.Re = "ph_" + r10 + "_window_id", this.Ce = "ph_" + r10 + "_primary_window_exists", this.Oe()) {
        var a2 = t4.K(this.Re), o2 = t4.K(this.Ce);
        a2 && !o2 ? this.$e = a2 : t4.X(this.Re), t4.Y(this.Ce, true);
      }
      if (null != (s10 = this.A.bootstrap) && s10.sessionID) try {
        var l2 = ((e11) => {
          var t11 = e11.replace(/-/g, "");
          if (32 !== t11.length) throw Error("Not a valid UUID");
          if ("7" !== t11[12]) throw Error("Not a UUIDv7");
          return parseInt(t11.substring(0, 12), 16);
        })(this.A.bootstrap.sessionID);
        this.Fe(this.A.bootstrap.sessionID, (/* @__PURE__ */ new Date()).getTime(), l2);
      } catch (e11) {
        rj.error("Invalid sessionID in bootstrap", e11);
      }
      this.Me();
    }
    get sessionTimeoutMs() {
      return this._sessionTimeoutMs;
    }
    onSessionId(e10) {
      return R(this.xe) && (this.xe = []), this.xe.push(e10), this.ke && e10(this.ke, this.$e), () => {
        this.xe = this.xe.filter((t10) => t10 !== e10);
      };
    }
    Oe() {
      return "memory" !== this.A.persistence && !this.ye.gi && t4.G();
    }
    Ae(e10) {
      e10 !== this.$e && (this.$e = e10, this.Oe() && t4.Y(this.Re, e10));
    }
    je() {
      return this.$e ? this.$e : this.Oe() ? t4.K(this.Re) : null;
    }
    Fe(e10, t10, i10) {
      e10 === this.ke && t10 === this._sessionActivityTimestamp && i10 === this._sessionStartTimestamp || (this._sessionStartTimestamp = i10, this._sessionActivityTimestamp = t10, this.ke = e10, this.ye.register({ [ez]: [t10, e10, i10] }));
    }
    De() {
      if (this.ke && this._sessionActivityTimestamp && this._sessionStartTimestamp) return [this._sessionActivityTimestamp, this.ke, this._sessionStartTimestamp];
      var e10 = this.ye.props[ez];
      return $(e10) && 2 === e10.length && e10.push(e10[0]), e10 || [0, null, 0];
    }
    resetSessionId() {
      this.Fe(null, null, null);
    }
    destroy() {
      clearTimeout(this.Le), this.Le = void 0, this.Se && t && (t.removeEventListener("beforeunload", this.Se, { capture: false }), this.Se = void 0), this.xe = [];
    }
    Me() {
      this.Se = () => {
        this.Oe() && t4.X(this.Ce);
      }, eA(t, "beforeunload", this.Se, { capture: false });
    }
    checkAndGetSessionAndWindowId(e10, t10) {
      if (void 0 === e10 && (e10 = false), void 0 === t10 && (t10 = null), "always" === this.A.cookieless_mode) throw Error('checkAndGetSessionAndWindowId should not be called with cookieless_mode="always"');
      var i10 = t10 || (/* @__PURE__ */ new Date()).getTime(), [s10, r10, n2] = this.De(), a2 = this.je(), o2 = D(n2) && n2 > 0 && Math.abs(i10 - n2) > 864e5, l2 = false, c2 = !r10, u2 = !e10 && this.Ee(i10, s10);
      c2 || u2 || o2 ? (r10 = this.Pe(), a2 = this.Te(), rj.info("new session ID generated", { sessionId: r10, windowId: a2, changeReason: { noSessionId: c2, activityTimeout: u2, sessionPastMaximumLength: o2 } }), n2 = i10, l2 = true) : a2 || (a2 = this.Te(), l2 = true);
      var h2 = 0 === s10 || !e10 || o2 ? i10 : s10, d2 = 0 === n2 ? (/* @__PURE__ */ new Date()).getTime() : n2;
      return this.Ae(a2), this.Fe(r10, h2, d2), e10 || this.Ie(), l2 && this.xe.forEach((e11) => e11(r10, a2, l2 ? { noSessionId: c2, activityTimeout: u2, sessionPastMaximumLength: o2 } : void 0)), { sessionId: r10, windowId: a2, sessionStartTimestamp: d2, changeReason: l2 ? { noSessionId: c2, activityTimeout: u2, sessionPastMaximumLength: o2 } : void 0, lastActivityTimestamp: s10 };
    }
    Ie() {
      clearTimeout(this.Le), this.Le = setTimeout(() => {
        var [e10] = this.De();
        if (this.Ee((/* @__PURE__ */ new Date()).getTime(), e10)) {
          var t10 = this.ke;
          this.resetSessionId(), this.we.emit("forcedIdleReset", { idleSessionId: t10 });
        }
      }, 1.1 * this.sessionTimeoutMs);
    }
  }
  var rU = ["$set_once", "$set"], rH = eb("[SiteApps]");
  class rG {
    constructor(e10) {
      this._instance = e10, this.Ne = [], this.apps = {};
    }
    get isEnabled() {
      return !!this._instance.config.opt_in_site_apps;
    }
    Ue(e10, t10) {
      if (t10) {
        var i10 = this.globalsForEvent(t10);
        this.Ne.push(i10), this.Ne.length > 1e3 && (this.Ne = this.Ne.slice(10));
      }
    }
    get siteAppLoaders() {
      var e10;
      return null == (e10 = p._POSTHOG_REMOTE_CONFIG) || null == (e10 = e10[this._instance.config.token]) ? void 0 : e10.siteApps;
    }
    init() {
      if (this.isEnabled) {
        var e10 = this._instance.Ri(this.Ue.bind(this));
        this.ze = () => {
          e10(), this.Ne = [], this.ze = void 0;
        };
      }
    }
    globalsForEvent(e10) {
      if (!e10) throw Error("Event payload is required");
      var t10, i10, s10, r10, n2, a2, o2, l2 = {}, c2 = this._instance.get_property("$groups") || [];
      for (var [u2, h2] of Object.entries(this._instance.get_property("$stored_group_properties") || {})) l2[u2] = { id: c2[u2], type: u2, properties: h2 };
      var { $set_once: d2, $set: p2 } = e10;
      return { event: f({}, m(e10, rU), { properties: f({}, e10.properties, p2 ? { $set: f({}, null != (t10 = null == (i10 = e10.properties) ? void 0 : i10.$set) ? t10 : {}, p2) } : {}, d2 ? { $set_once: f({}, null != (s10 = null == (r10 = e10.properties) ? void 0 : r10.$set_once) ? s10 : {}, d2) } : {}), elements_chain: null != (n2 = null == (a2 = e10.properties) ? void 0 : a2.$elements_chain) ? n2 : "", distinct_id: null == (o2 = e10.properties) ? void 0 : o2.distinct_id }), person: { properties: this._instance.get_property("$stored_person_properties") }, groups: l2 };
    }
    setupSiteApp(e10) {
      var t10 = this.apps[e10.id], i10 = () => {
        var i11;
        !t10.errored && this.Ne.length && (rH.info("Processing " + this.Ne.length + " events for site app with id " + e10.id), this.Ne.forEach((e11) => null == t10.processEvent ? void 0 : t10.processEvent(e11)), t10.processedBuffer = true), Object.values(this.apps).every((e11) => e11.processedBuffer || e11.errored) && (null == (i11 = this.ze) || i11.call(this));
      }, s10 = false, r10 = (r11) => {
        t10.errored = !r11, t10.loaded = true, rH.info("Site app with id " + e10.id + " " + (r11 ? "loaded" : "errored")), s10 && i10();
      };
      try {
        var { processEvent: n2 } = e10.init({ posthog: this._instance, callback: (e11) => {
          r10(e11);
        } });
        n2 && (t10.processEvent = n2), s10 = true;
      } catch (t11) {
        rH.error("Error while initializing PostHog app with config id " + e10.id, t11), r10(false);
      }
      if (s10 && t10.loaded) try {
        i10();
      } catch (i11) {
        rH.error("Error while processing buffered events PostHog app with config id " + e10.id, i11), t10.errored = true;
      }
    }
    He() {
      var e10 = this.siteAppLoaders || [];
      for (var t10 of e10) this.apps[t10.id] = { id: t10.id, loaded: false, errored: false, processedBuffer: false };
      for (var i10 of e10) this.setupSiteApp(i10);
    }
    Be(e10) {
      if (0 !== Object.keys(this.apps).length) {
        var t10 = this.globalsForEvent(e10);
        for (var i10 of Object.values(this.apps)) try {
          null == i10.processEvent || i10.processEvent(t10);
        } catch (t11) {
          rH.error("Error while processing event " + e10.event + " for site app " + i10.id, t11);
        }
      }
    }
    onRemoteConfig(e10) {
      var t10, i10, s10, r10 = this;
      if (null != (t10 = this.siteAppLoaders) && t10.length) return this.isEnabled ? (this.He(), void this._instance.on("eventCaptured", (e11) => this.Be(e11))) : void rH.error('PostHog site apps are disabled. Enable the "opt_in_site_apps" config to proceed.');
      if (null == (i10 = this.ze) || i10.call(this), null != (s10 = e10.siteApps) && s10.length) if (this.isEnabled) {
        var n2 = function(e11) {
          var t11;
          p["__$$ph_site_app_" + e11] = r10._instance, null == (t11 = p.__PosthogExtensions__) || null == t11.loadSiteApp || t11.loadSiteApp(r10._instance, o2, (t12) => {
            if (t12) return rH.error("Error while initializing PostHog app with config id " + e11, t12);
          });
        };
        for (var { id: a2, url: o2 } of e10.siteApps) n2(a2);
      } else rH.error('PostHog site apps are disabled. Enable the "opt_in_site_apps" config to proceed.');
    }
  }
  var rB = ["amazonbot", "amazonproductbot", "app.hypefactors.com", "applebot", "archive.org_bot", "awariobot", "backlinksextendedbot", "baiduspider", "bingbot", "bingpreview", "chrome-lighthouse", "dataforseobot", "deepscan", "duckduckbot", "facebookexternal", "facebookcatalog", "http://yandex.com/bots", "hubspot", "ia_archiver", "leikibot", "linkedinbot", "meta-externalagent", "mj12bot", "msnbot", "nessus", "petalbot", "pinterest", "prerender", "rogerbot", "screaming frog", "sebot-wa", "sitebulb", "slackbot", "slurp", "trendictionbot", "turnitin", "twitterbot", "vercel-screenshot", "vercelbot", "yahoo! slurp", "yandexbot", "zoombot", "bot.htm", "bot.php", "(bot;", "bot/", "crawler", "ahrefsbot", "ahrefssiteaudit", "semrushbot", "siteauditbot", "splitsignalbot", "gptbot", "oai-searchbot", "chatgpt-user", "perplexitybot", "better uptime bot", "sentryuptimebot", "uptimerobot", "headlesschrome", "cypress", "google-hoteladsverifier", "adsbot-google", "apis-google", "duplexweb-google", "feedfetcher-google", "google favicon", "google web preview", "google-read-aloud", "googlebot", "googleother", "google-cloudvertexbot", "googleweblight", "mediapartners-google", "storebot-google", "google-inspectiontool", "bytespider"], rW = function(e10, t10) {
    if (!e10) return false;
    var i10 = e10.toLowerCase();
    return rB.concat(t10 || []).some((e11) => {
      var t11 = e11.toLowerCase();
      return -1 !== i10.indexOf(t11);
    });
  }, rV = function(e10, t10) {
    if (!e10) return false;
    var i10 = e10.userAgent;
    if (i10 && rW(i10, t10)) return true;
    try {
      var s10 = null == e10 ? void 0 : e10.userAgentData;
      if (null != s10 && s10.brands && s10.brands.some((e11) => rW(null == e11 ? void 0 : e11.brand, t10))) return true;
    } catch (e11) {
    }
    return !!e10.webdriver;
  }, rz = ((nv = {}).US = "us", nv.EU = "eu", nv.CUSTOM = "custom", nv), rY = "i.posthog.com";
  class rX {
    constructor(e10) {
      this.qe = {}, this.instance = e10;
    }
    get apiHost() {
      var e10 = this.instance.config.api_host.trim().replace(/\/$/, "");
      return "https://app.posthog.com" === e10 ? "https://us.i.posthog.com" : e10;
    }
    get uiHost() {
      var e10, t10 = null == (e10 = this.instance.config.ui_host) ? void 0 : e10.replace(/\/$/, "");
      return t10 || (t10 = this.apiHost.replace("." + rY, ".posthog.com")), "https://app.posthog.com" === t10 ? "https://us.posthog.com" : t10;
    }
    get region() {
      return this.qe[this.apiHost] || (/https:\/\/(app|us|us-assets)(\.i)?\.posthog\.com/i.test(this.apiHost) ? this.qe[this.apiHost] = rz.US : /https:\/\/(eu|eu-assets)(\.i)?\.posthog\.com/i.test(this.apiHost) ? this.qe[this.apiHost] = rz.EU : this.qe[this.apiHost] = rz.CUSTOM), this.qe[this.apiHost];
    }
    endpointFor(e10, t10) {
      if (void 0 === t10 && (t10 = ""), t10 && (t10 = "/" === t10[0] ? t10 : "/" + t10), "ui" === e10) return this.uiHost + t10;
      if (this.region === rz.CUSTOM) return this.apiHost + t10;
      var i10 = rY + t10;
      switch (e10) {
        case "assets":
          return "https://" + this.region + "-assets." + i10;
        case "api":
          return "https://" + this.region + "." + i10;
      }
    }
  }
  var rJ = { icontains: (e10, i10) => !!t && i10.href.toLowerCase().indexOf(e10.toLowerCase()) > -1, not_icontains: (e10, i10) => !!t && -1 === i10.href.toLowerCase().indexOf(e10.toLowerCase()), regex: (e10, i10) => !!t && s9(i10.href, e10), not_regex: (e10, i10) => !!t && !s9(i10.href, e10), exact: (e10, t10) => t10.href === e10, is_not: (e10, t10) => t10.href !== e10 };
  class rK {
    constructor(e10) {
      var t10 = this;
      this.getWebExperimentsAndEvaluateDisplayLogic = function(e11) {
        void 0 === e11 && (e11 = false), t10.getWebExperiments((e12) => {
          rK.We("retrieved web experiments from the server"), t10.Ge = /* @__PURE__ */ new Map(), e12.forEach((e13) => {
            if (e13.feature_flag_key) {
              t10.Ge && (rK.We("setting flag key ", e13.feature_flag_key, " to web experiment ", e13), null == (i10 = t10.Ge) || i10.set(e13.feature_flag_key, e13));
              var i10, s10 = t10._instance.getFeatureFlag(e13.feature_flag_key);
              C(s10) && e13.variants[s10] && t10.Ve(e13.name, s10, e13.variants[s10].transforms);
            } else if (e13.variants) for (var r10 in e13.variants) {
              var n2 = e13.variants[r10];
              rK.Je(n2) && t10.Ve(e13.name, r10, n2.transforms);
            }
          });
        }, e11);
      }, this._instance = e10, this._instance.onFeatureFlags((e11) => {
        this.onFeatureFlags(e11);
      });
    }
    onFeatureFlags(e10) {
      if (this._is_bot()) rK.We("Refusing to render web experiment since the viewer is a likely bot");
      else if (!this._instance.config.disable_web_experiments) {
        if (M(this.Ge)) return this.Ge = /* @__PURE__ */ new Map(), this.loadIfEnabled(), void this.previewWebExperiment();
        rK.We("applying feature flags", e10), e10.forEach((e11) => {
          var t10;
          if (this.Ge && null != (t10 = this.Ge) && t10.has(e11)) {
            var i10, s10 = this._instance.getFeatureFlag(e11), r10 = null == (i10 = this.Ge) ? void 0 : i10.get(e11);
            s10 && null != r10 && r10.variants[s10] && this.Ve(r10.name, s10, r10.variants[s10].transforms);
          }
        });
      }
    }
    previewWebExperiment() {
      var e10 = rK.getWindowLocation();
      if (null != e10 && e10.search) {
        var t10 = tD(null == e10 ? void 0 : e10.search, "__experiment_id"), i10 = tD(null == e10 ? void 0 : e10.search, "__experiment_variant");
        t10 && i10 && (rK.We("previewing web experiments " + t10 + " && " + i10), this.getWebExperiments((e11) => {
          this.Ke(parseInt(t10), i10, e11);
        }, false, true));
      }
    }
    loadIfEnabled() {
      this._instance.config.disable_web_experiments || this.getWebExperimentsAndEvaluateDisplayLogic();
    }
    getWebExperiments(e10, t10, i10) {
      if (this._instance.config.disable_web_experiments && !i10) return e10([]);
      var s10 = this._instance.get_property("$web_experiments");
      if (s10 && !t10) return e10(s10);
      this._instance.ui({ url: this._instance.requestRouter.endpointFor("api", "/api/web_experiments/?token=" + this._instance.config.token), method: "GET", callback: (t11) => 200 === t11.statusCode && t11.json ? e10(t11.json.experiments || []) : e10([]) });
    }
    Ke(e10, t10, i10) {
      var s10 = i10.filter((t11) => t11.id === e10);
      s10 && s10.length > 0 && (rK.We("Previewing web experiment [" + s10[0].name + "] with variant [" + t10 + "]"), this.Ve(s10[0].name, t10, s10[0].variants[t10].transforms));
    }
    static Je(e10) {
      return !M(e10.conditions) && rK.Ye(e10) && rK.Xe(e10);
    }
    static Ye(e10) {
      if (M(e10.conditions) || M(null == (t10 = e10.conditions) ? void 0 : t10.url)) return true;
      var t10, i10, s10, r10, n2 = rK.getWindowLocation();
      return !!n2 && (null == (i10 = e10.conditions) || !i10.url || rJ[null != (s10 = null == (r10 = e10.conditions) ? void 0 : r10.urlMatchType) ? s10 : "icontains"](e10.conditions.url, n2));
    }
    static getWindowLocation() {
      return null == t ? void 0 : t.location;
    }
    static Xe(e10) {
      if (M(e10.conditions) || M(null == (i10 = e10.conditions) ? void 0 : i10.utm)) return true;
      var t10 = su();
      if (t10.utm_source) {
        var i10, s10, r10, n2, a2, o2, l2, c2, u2, h2 = null == (s10 = e10.conditions) || null == (s10 = s10.utm) || !s10.utm_campaign || (null == (r10 = e10.conditions) || null == (r10 = r10.utm) ? void 0 : r10.utm_campaign) == t10.utm_campaign, d2 = null == (n2 = e10.conditions) || null == (n2 = n2.utm) || !n2.utm_source || (null == (a2 = e10.conditions) || null == (a2 = a2.utm) ? void 0 : a2.utm_source) == t10.utm_source, p2 = null == (o2 = e10.conditions) || null == (o2 = o2.utm) || !o2.utm_medium || (null == (l2 = e10.conditions) || null == (l2 = l2.utm) ? void 0 : l2.utm_medium) == t10.utm_medium, g2 = null == (c2 = e10.conditions) || null == (c2 = c2.utm) || !c2.utm_term || (null == (u2 = e10.conditions) || null == (u2 = u2.utm) ? void 0 : u2.utm_term) == t10.utm_term;
        return h2 && p2 && g2 && d2;
      }
      return false;
    }
    static We(e10) {
      for (var t10 = arguments.length, i10 = Array(t10 > 1 ? t10 - 1 : 0), s10 = 1; s10 < t10; s10++) i10[s10 - 1] = arguments[s10];
      ey.info("[WebExperiments] " + e10, i10);
    }
    Ve(e10, t10, i10) {
      this._is_bot() ? rK.We("Refusing to render web experiment since the viewer is a likely bot") : "control" !== t10 ? i10.forEach((i11) => {
        if (i11.selector) {
          rK.We("applying transform of variant " + t10 + " for experiment " + e10 + " ", i11);
          var s10, r10 = null == (s10 = document) ? void 0 : s10.querySelectorAll(i11.selector);
          null == r10 || r10.forEach((e11) => {
            i11.html && (e11.innerHTML = i11.html), i11.css && e11.setAttribute("style", i11.css);
          });
        }
      }) : rK.We("Control variants leave the page unmodified.");
    }
    _is_bot() {
      return a && this._instance ? rV(a, this._instance.config.custom_blocked_useragents) : void 0;
    }
  }
  var rQ = eb("[PostHog ExternalIntegrations]"), rZ = { intercom: "intercom-integration", crispChat: "crisp-chat-integration" };
  class r0 {
    constructor(e10) {
      this._instance = e10;
    }
    nt(e10, t10) {
      var i10;
      null == (i10 = p.__PosthogExtensions__) || null == i10.loadExternalDependency || i10.loadExternalDependency(this._instance, e10, (e11) => {
        if (e11) return rQ.error("failed to load script", e11);
        t10();
      });
    }
    startIfEnabledOrStop() {
      var e10, t10 = this, i10 = function(e11) {
        var i11, s11, n2;
        !r10 || null != (i11 = p.__PosthogExtensions__) && null != (i11 = i11.integrations) && i11[e11] || t10.nt(rZ[e11], () => {
          var i12;
          null == (i12 = p.__PosthogExtensions__) || null == (i12 = i12.integrations) || null == (i12 = i12[e11]) || i12.start(t10._instance);
        }), !r10 && null != (s11 = p.__PosthogExtensions__) && null != (s11 = s11.integrations) && s11[e11] && (null == (n2 = p.__PosthogExtensions__) || null == (n2 = n2.integrations) || null == (n2 = n2[e11]) || n2.stop());
      };
      for (var [s10, r10] of Object.entries(null != (e10 = this._instance.config.integrations) ? e10 : {})) i10(s10);
    }
  }
  var r1 = "[SessionRecording]", r2 = eb(r1);
  class r3 {
    get started() {
      var e10;
      return !(null == (e10 = this.Qe) || !e10.isStarted);
    }
    get status() {
      return this.Qe ? this.Qe.status : this.Ze && !this.tr ? "disabled" : "lazy_loading";
    }
    constructor(e10) {
      if (this._forceAllowLocalhostNetworkCapture = false, this.Ze = false, this.ir = void 0, this._instance = e10, !this._instance.sessionManager) throw r2.error("started without valid sessionManager"), Error(r1 + " started without valid sessionManager. This is a bug.");
      if ("always" === this._instance.config.cookieless_mode) throw Error(r1 + ' cannot be used with cookieless_mode="always"');
    }
    get tr() {
      var e10, i10 = !(null == (e10 = this._instance.get_property(eV)) || !e10.enabled), s10 = !this._instance.config.disable_session_recording, r10 = this._instance.config.disable_session_recording || this._instance.consent.isOptedOut();
      return t && i10 && s10 && !r10;
    }
    startIfEnabledOrStop(e10) {
      var t10;
      if (!this.tr || null == (t10 = this.Qe) || !t10.isStarted) {
        var i10 = !R(Object.assign) && !R(Array.from);
        this.tr && i10 ? (this.er(e10), r2.info("starting")) : this.stopRecording();
      }
    }
    er(e10) {
      var t10, i10, s10;
      this.tr && (null != p && null != (t10 = p.__PosthogExtensions__) && null != (t10 = t10.rrweb) && t10.record && null != (i10 = p.__PosthogExtensions__) && i10.initSessionRecording ? this.rr(e10) : null == (s10 = p.__PosthogExtensions__) || null == s10.loadExternalDependency || s10.loadExternalDependency(this._instance, this.sr, (t11) => {
        if (t11) return r2.error("could not load recorder", t11);
        this.rr(e10);
      }));
    }
    stopRecording() {
      var e10, t10;
      null == (e10 = this.ir) || e10.call(this), this.ir = void 0, null == (t10 = this.Qe) || t10.stop();
    }
    nr() {
      var e10;
      null == (e10 = this._instance.persistence) || e10.unregister(eY);
    }
    ar(e10) {
      if (this._instance.persistence) {
        var t10, i10, s10 = this._instance.persistence, r10 = () => {
          var t11 = false === e10.sessionRecording ? void 0 : e10.sessionRecording, i11 = null == t11 ? void 0 : t11.sampleRate, r11 = M(i11) ? null : parseFloat(i11);
          M(r11) && this.nr();
          var n2 = null == t11 ? void 0 : t11.minimumDurationMilliseconds;
          s10.register({ [eV]: f({ enabled: !!t11 }, t11, { networkPayloadCapture: f({ capturePerformance: e10.capturePerformance }, null == t11 ? void 0 : t11.networkPayloadCapture), canvasRecording: { enabled: null == t11 ? void 0 : t11.recordCanvas, fps: null == t11 ? void 0 : t11.canvasFps, quality: null == t11 ? void 0 : t11.canvasQuality }, sampleRate: r11, minimumDurationMilliseconds: R(n2) ? null : n2, endpoint: null == t11 ? void 0 : t11.endpoint, triggerMatchType: null == t11 ? void 0 : t11.triggerMatchType, masking: null == t11 ? void 0 : t11.masking, urlTriggers: null == t11 ? void 0 : t11.urlTriggers }) });
        };
        r10(), null == (t10 = this.ir) || t10.call(this), this.ir = null == (i10 = this._instance.sessionManager) ? void 0 : i10.onSessionId(r10);
      }
    }
    onRemoteConfig(e10) {
      "sessionRecording" in e10 ? false !== e10.sessionRecording ? (this.ar(e10), this.Ze = true, this.startIfEnabledOrStop()) : this.Ze = true : r2.info("skipping remote config with no sessionRecording", e10);
    }
    log(e10, t10) {
      var i10;
      void 0 === t10 && (t10 = "log"), null != (i10 = this.Qe) && i10.log ? this.Qe.log(e10, t10) : r2.warn("log called before recorder was ready");
    }
    get sr() {
      var e10, t10, i10 = null == (e10 = this._instance) || null == (e10 = e10.persistence) ? void 0 : e10.get_property(eV);
      return (null == i10 || null == (t10 = i10.scriptConfig) ? void 0 : t10.script) || "lazy-recorder";
    }
    rr(e10) {
      var t10, i10;
      if (null == (t10 = p.__PosthogExtensions__) || !t10.initSessionRecording) throw Error("Called on script loaded before session recording is available");
      this.Qe || (this.Qe = null == (i10 = p.__PosthogExtensions__) ? void 0 : i10.initSessionRecording(this._instance), this.Qe._forceAllowLocalhostNetworkCapture = this._forceAllowLocalhostNetworkCapture), this.Qe.start(e10);
    }
    onRRwebEmit(e10) {
      var t10;
      null == (t10 = this.Qe) || null == t10.onRRwebEmit || t10.onRRwebEmit(e10);
    }
    overrideLinkedFlag() {
      var e10;
      null == (e10 = this.Qe) || e10.overrideLinkedFlag();
    }
    overrideSampling() {
      var e10;
      null == (e10 = this.Qe) || e10.overrideSampling();
    }
    overrideTrigger(e10) {
      var t10;
      null == (t10 = this.Qe) || t10.overrideTrigger(e10);
    }
    get sdkDebugProperties() {
      var e10;
      return (null == (e10 = this.Qe) ? void 0 : e10.sdkDebugProperties) || { $recording_status: this.status };
    }
    tryAddCustomEvent(e10, t10) {
      var i10;
      return !(null == (i10 = this.Qe) || !i10.tryAddCustomEvent(e10, t10));
    }
  }
  var r5 = {}, r8 = () => {
  }, r6 = "posthog", r4 = !s3 && -1 === (null == d ? void 0 : d.indexOf("MSIE")) && -1 === (null == d ? void 0 : d.indexOf("Mozilla")), r7 = (e10) => {
    var i10;
    return { api_host: "https://us.i.posthog.com", ui_host: null, token: "", autocapture: true, rageclick: true, cross_subdomain_cookie: function(e11) {
      var t10 = null == e11 ? void 0 : e11.hostname;
      if (!C(t10)) return false;
      var i11 = t10.split(".").slice(-2).join(".");
      for (var s10 of eC) if (i11 === s10) return false;
      return true;
    }(null == o ? void 0 : o.location), persistence: "localStorage+cookie", persistence_name: "", loaded: r8, save_campaign_params: true, custom_campaign_params: [], custom_blocked_useragents: [], save_referrer: true, capture_pageview: "2025-05-24" !== e10 || "history_change", capture_pageleave: "if_capture_pageview", defaults: null != e10 ? e10 : "unset", debug: l && C(null == l ? void 0 : l.search) && -1 !== l.search.indexOf("__posthog_debug=true") || false, cookie_expiration: 365, upgrade: false, disable_session_recording: false, disable_persistence: false, disable_web_experiments: true, disable_surveys: false, disable_surveys_automatic_display: false, disable_external_dependency_loading: false, enable_recording_console_log: void 0, secure_cookie: "https:" === (null == t || null == (i10 = t.location) ? void 0 : i10.protocol), ip: false, opt_out_capturing_by_default: false, opt_out_persistence_by_default: false, opt_out_useragent_filter: false, opt_out_capturing_persistence_type: "localStorage", consent_persistence_name: null, opt_out_capturing_cookie_prefix: null, opt_in_site_apps: false, property_denylist: [], respect_dnt: false, sanitize_properties: null, request_headers: {}, request_batching: true, properties_string_max_length: 65535, session_recording: {}, mask_all_element_attributes: false, mask_all_text: false, mask_personal_data_properties: false, custom_personal_data_properties: [], advanced_disable_flags: false, advanced_disable_decide: false, advanced_disable_feature_flags: false, advanced_disable_feature_flags_on_first_load: false, advanced_only_evaluate_survey_feature_flags: false, advanced_enable_surveys: false, advanced_disable_toolbar_metrics: false, feature_flag_request_timeout_ms: 3e3, surveys_request_timeout_ms: 1e4, on_request_error: (e11) => {
      var t10 = "Bad HTTP status: " + e11.statusCode + " " + e11.text;
      ey.error(t10);
    }, get_device_id: (e11) => e11, capture_performance: void 0, name: "posthog", bootstrap: {}, disable_compression: false, session_idle_timeout_seconds: 1800, person_profiles: "identified_only", before_send: void 0, request_queue_config: { flush_interval_ms: 3e3 }, error_tracking: {}, _onCapture: r8, __preview_eager_load_replay: false };
  }, r9 = (e10) => {
    var t10 = {};
    R(e10.process_person) || (t10.person_profiles = e10.process_person), R(e10.xhr_headers) || (t10.request_headers = e10.xhr_headers), R(e10.cookie_name) || (t10.persistence_name = e10.cookie_name), R(e10.disable_cookie) || (t10.disable_persistence = e10.disable_cookie), R(e10.store_google) || (t10.save_campaign_params = e10.store_google), R(e10.verbose) || (t10.debug = e10.verbose);
    var i10 = eP({}, t10, e10);
    return $(e10.property_blacklist) && (R(e10.property_denylist) ? i10.property_denylist = e10.property_blacklist : $(e10.property_denylist) ? i10.property_denylist = [...e10.property_blacklist, ...e10.property_denylist] : ey.error("Invalid value for property_denylist config: " + e10.property_denylist)), i10;
  };
  class ne {
    constructor() {
      this.__forceAllowLocalhost = false;
    }
    get lr() {
      return this.__forceAllowLocalhost;
    }
    set lr(e10) {
      ey.error("WebPerformanceObserver is deprecated and has no impact on network capture. Use `_forceAllowLocalhostNetworkCapture` on `posthog.sessionRecording`"), this.__forceAllowLocalhost = e10;
    }
  }
  class nt {
    get decideEndpointWasHit() {
      var e10, t10;
      return null != (e10 = null == (t10 = this.featureFlags) ? void 0 : t10.hasLoadedFlags) && e10;
    }
    get flagsEndpointWasHit() {
      var e10, t10;
      return null != (e10 = null == (t10 = this.featureFlags) ? void 0 : t10.hasLoadedFlags) && e10;
    }
    constructor() {
      this.webPerformance = new ne(), this.ur = false, this.version = g.LIB_VERSION, this.hr = new rb(), this._calculate_event_properties = this.calculateEventProperties.bind(this), this.config = r7(), this.SentryIntegration = id, this.sentryIntegration = (e10) => {
        var t10;
        return t10 = ih(this, e10), { name: iu, processEvent: (e11) => t10(e11) };
      }, this.__request_queue = [], this.__loaded = false, this.analyticsDefaultEndpoint = "/e/", this.dr = false, this.vr = null, this.cr = null, this.pr = null, this.featureFlags = new rp(this), this.toolbar = new im(this), this.scrollManager = new rD(this), this.pageViewManager = new sx(this), this.surveys = new rI(this), this.experiments = new rK(this), this.exceptions = new rr(this), this.rateLimiter = new rO(this), this.requestRouter = new rX(this), this.consent = new t9(this), this.externalIntegrations = new r0(this), this.people = { set: (e10, t10, i10) => {
        var s10 = C(e10) ? { [e10]: t10 } : e10;
        this.setPersonProperties(s10), null == i10 || i10({});
      }, set_once: (e10, t10, i10) => {
        var s10 = C(e10) ? { [e10]: t10 } : e10;
        this.setPersonProperties(void 0, s10), null == i10 || i10({});
      } }, this.on("eventCaptured", (e10) => ey.info('send "' + (null == e10 ? void 0 : e10.event) + '"', e10));
    }
    init(e10, t10, i10) {
      if (i10 && i10 !== r6) {
        var s10, r10 = null != (s10 = r5[i10]) ? s10 : new nt();
        return r10._init(e10, t10, i10), r5[i10] = r10, r5[r6][i10] = r10, r10;
      }
      return this._init(e10, t10, i10);
    }
    _init(e10, i10, s10) {
      if (void 0 === i10 && (i10 = {}), R(e10) || T(e10)) return ey.critical("PostHog was initialized without a token. This likely indicates a misconfiguration. Please check the first argument passed to posthog.init()"), this;
      if (this.__loaded) return console.warn("[PostHog.js]", "You have already initialized PostHog! Re-initializing is a no-op"), this;
      this.__loaded = true, this.config = {}, i10.debug = this.gr(i10.debug), this._r = i10, this.mr = [], i10.person_profiles && (this.cr = i10.person_profiles), this.set_config(eP({}, r7(i10.defaults), r9(i10), { name: s10, token: e10 })), this.config.on_xhr_error && ey.error("on_xhr_error is deprecated. Use on_request_error instead"), this.compression = i10.disable_compression ? void 0 : tT.GZipJS;
      var r10 = this.yr();
      this.persistence = new r_(this.config, r10), this.sessionPersistence = "sessionStorage" === this.config.persistence || "memory" === this.config.persistence ? this.persistence : new r_(f({}, this.config, { persistence: "sessionStorage" }), r10);
      var n2 = f({}, this.persistence.props), a2 = f({}, this.sessionPersistence.props);
      this.register({ $initialization_time: (/* @__PURE__ */ new Date()).toISOString() }), this.br = new rT((e11) => this.wr(e11), this.config.request_queue_config), this.Sr = new rM(this), this.__request_queue = [];
      var o2 = "always" === this.config.cookieless_mode || "on_reject" === this.config.cookieless_mode && this.consent.isExplicitlyOptedOut();
      if (o2 || (this.sessionManager = new rq(this), this.sessionPropsManager = new rN(this, this.sessionManager, this.persistence)), new ib(this).startIfEnabledOrStop(), this.siteApps = new rG(this), null == (l2 = this.siteApps) || l2.init(), o2 || (this.sessionRecording = new r3(this), this.sessionRecording.startIfEnabledOrStop()), this.config.disable_scroll_properties || this.scrollManager.startMeasuringScrollPosition(), this.autocapture = new tU(this), this.autocapture.startIfEnabled(), this.surveys.loadIfEnabled(), this.heatmaps = new sE(this), this.heatmaps.startIfEnabled(), this.webVitalsAutocapture = new sy(this), this.exceptionObserver = new ia(this), this.exceptionObserver.startIfEnabled(), this.deadClicksAutocapture = new is(this, ii), this.deadClicksAutocapture.startIfEnabled(), this.historyAutocapture = new il(this), this.historyAutocapture.startIfEnabled(), g.DEBUG = g.DEBUG || this.config.debug, g.DEBUG && ey.info("Starting in debug mode", { this: this, config: i10, thisC: f({}, this.config), p: n2, s: a2 }), void 0 !== (null == (c2 = i10.bootstrap) ? void 0 : c2.distinctID)) {
        var l2, c2, u2, h2, d2 = this.config.get_device_id(tX()), p2 = null != (u2 = i10.bootstrap) && u2.isIdentifiedID ? d2 : i10.bootstrap.distinctID;
        this.persistence.set_property(e3, null != (h2 = i10.bootstrap) && h2.isIdentifiedID ? "identified" : "anonymous"), this.register({ distinct_id: i10.bootstrap.distinctID, $device_id: p2 });
      }
      if (this.Er()) {
        var _2, v2, m2 = Object.keys((null == (_2 = i10.bootstrap) ? void 0 : _2.featureFlags) || {}).filter((e11) => {
          var t10;
          return !(null == (t10 = i10.bootstrap) || null == (t10 = t10.featureFlags) || !t10[e11]);
        }).reduce((e11, t10) => {
          var s11;
          return e11[t10] = (null == (s11 = i10.bootstrap) || null == (s11 = s11.featureFlags) ? void 0 : s11[t10]) || false, e11;
        }, {}), y2 = Object.keys((null == (v2 = i10.bootstrap) ? void 0 : v2.featureFlagPayloads) || {}).filter((e11) => m2[e11]).reduce((e11, t10) => {
          var s11, r11;
          return null != (s11 = i10.bootstrap) && null != (s11 = s11.featureFlagPayloads) && s11[t10] && (e11[t10] = null == (r11 = i10.bootstrap) || null == (r11 = r11.featureFlagPayloads) ? void 0 : r11[t10]), e11;
        }, {});
        this.featureFlags.receivedFeatureFlags({ featureFlags: m2, featureFlagPayloads: y2 });
      }
      if (o2) this.register_once({ distinct_id: tt, $device_id: null }, "");
      else if (!this.get_distinct_id()) {
        var b2 = this.config.get_device_id(tX());
        this.register_once({ distinct_id: b2, $device_id: b2 }, ""), this.persistence.set_property(e3, "anonymous");
      }
      return eA(t, "onpagehide" in self ? "pagehide" : "unload", this._handle_unload.bind(this), { passive: false }), this.toolbar.maybeLoadToolbar(), i10.segment ? function(e11, t10) {
        var i11 = e11.config.segment;
        if (!i11) return t10();
        !function(e12, t11) {
          var i12 = e12.config.segment;
          if (!i12) return t11();
          var s11 = (i13) => {
            var s12 = () => i13.anonymousId() || tX();
            e12.config.get_device_id = s12, i13.id() && (e12.register({ distinct_id: i13.id(), $device_id: s12() }), e12.persistence.set_property(e3, "identified")), t11();
          }, r11 = i12.user();
          "then" in r11 && I(r11.then) ? r11.then((e13) => s11(e13)) : s11(r11);
        }(e11, () => {
          var s11;
          i11.register((Promise && Promise.resolve || ic.warn("This browser does not have Promise support, and can not use the segment integration"), s11 = (t11, i12) => {
            if (!i12) return t11;
            t11.event.userId || t11.event.anonymousId === e11.get_distinct_id() || (ic.info("No userId set, resetting PostHog"), e11.reset()), t11.event.userId && t11.event.userId !== e11.get_distinct_id() && (ic.info("UserId set, identifying with PostHog"), e11.identify(t11.event.userId));
            var s12 = e11.calculateEventProperties(i12, t11.event.properties);
            return t11.event.properties = Object.assign({}, s12, t11.event.properties), t11;
          }, { name: "PostHog JS", type: "enrichment", version: "1.0.0", isLoaded: () => true, load: () => Promise.resolve(), track: (e12) => s11(e12, e12.event.event), page: (e12) => s11(e12, "$pageview"), identify: (e12) => s11(e12, "$identify"), screen: (e12) => s11(e12, "$screen") })).then(() => {
            t10();
          });
        });
      }(this, () => this.$r()) : this.$r(), I(this.config._onCapture) && this.config._onCapture !== r8 && (ey.warn("onCapture is deprecated. Please use `before_send` instead"), this.on("eventCaptured", (e11) => this.config._onCapture(e11.event, e11))), this.config.ip && ey.warn('The `ip` config option has NO EFFECT AT ALL and has been deprecated. Use a custom transformation or "Discard IP data" project setting instead. See https://posthog.com/tutorials/web-redact-properties#hiding-customer-ip-address for more information.'), this;
    }
    hi(e10) {
      var t10, i10, s10, r10, n2, a2, l2, c2;
      o && o.body ? (this.compression = void 0, e10.supportedCompression && !this.config.disable_compression && (this.compression = b(e10.supportedCompression, tT.GZipJS) ? tT.GZipJS : b(e10.supportedCompression, tT.Base64) ? tT.Base64 : void 0), null != (t10 = e10.analytics) && t10.endpoint && (this.analyticsDefaultEndpoint = e10.analytics.endpoint), this.set_config({ person_profiles: this.cr ? this.cr : "identified_only" }), null == (i10 = this.siteApps) || i10.onRemoteConfig(e10), null == (s10 = this.sessionRecording) || s10.onRemoteConfig(e10), null == (r10 = this.autocapture) || r10.onRemoteConfig(e10), null == (n2 = this.heatmaps) || n2.onRemoteConfig(e10), this.surveys.onRemoteConfig(e10), null == (a2 = this.webVitalsAutocapture) || a2.onRemoteConfig(e10), null == (l2 = this.exceptionObserver) || l2.onRemoteConfig(e10), this.exceptions.onRemoteConfig(e10), null == (c2 = this.deadClicksAutocapture) || c2.onRemoteConfig(e10)) : (ey.info("document not ready yet, trying again in 500 milliseconds..."), setTimeout(() => {
        this.hi(e10);
      }, 500));
    }
    $r() {
      try {
        this.config.loaded(this);
      } catch (e10) {
        ey.critical("`loaded` function failed", e10);
      }
      this.kr(), this.config.capture_pageview && setTimeout(() => {
        (this.consent.isOptedIn() || "always" === this.config.cookieless_mode) && this.Pr();
      }, 1), new rC(this).load(), this.featureFlags.flags();
    }
    kr() {
      var e10;
      this.is_capturing() && this.config.request_batching && (null == (e10 = this.br) || e10.enable());
    }
    _dom_loaded() {
      this.is_capturing() && ek(this.__request_queue, (e10) => this.wr(e10)), this.__request_queue = [], this.kr();
    }
    _handle_unload() {
      var e10, t10;
      this.config.request_batching ? (this.Tr() && this.capture("$pageleave"), null == (e10 = this.br) || e10.unload(), null == (t10 = this.Sr) || t10.unload()) : this.Tr() && this.capture("$pageleave", null, { transport: "sendBeacon" });
    }
    ui(e10) {
      this.__loaded && (r4 ? this.__request_queue.push(e10) : this.rateLimiter.isServerRateLimited(e10.batchKey) || (e10.transport = e10.transport || this.config.api_transport, e10.url = s8(e10.url, { ip: +!!this.config.ip }), e10.headers = f({}, this.config.request_headers), e10.compression = "best-available" === e10.compression ? this.compression : e10.compression, e10.disableXHRCredentials = this.config.__preview_disable_xhr_credentials, this.config.__preview_disable_beacon && (e10.disableTransport = ["sendBeacon"]), e10.fetchOptions = e10.fetchOptions || this.config.fetch_options, ((e11) => {
        var t10, i10, s10, r10 = f({}, e11);
        r10.timeout = r10.timeout || 6e4, r10.url = s8(r10.url, { _: (/* @__PURE__ */ new Date()).getTime().toString(), ver: g.LIB_VERSION, compression: r10.compression });
        var n2 = null != (t10 = r10.transport) ? t10 : "fetch", a2 = s7.filter((e12) => !r10.disableTransport || !e12.transport || !r10.disableTransport.includes(e12.transport)), o2 = null != (i10 = null == (s10 = eT(a2, (e12) => e12.transport === n2)) ? void 0 : s10.method) ? i10 : a2[0].method;
        if (!o2) throw Error("No available transport method");
        o2(r10);
      })(f({}, e10, { callback: (t10) => {
        var i10, s10;
        this.rateLimiter.checkForLimiting(t10), t10.statusCode >= 400 && (null == (i10 = (s10 = this.config).on_request_error) || i10.call(s10, t10)), null == e10.callback || e10.callback(t10);
      } }))));
    }
    wr(e10) {
      this.Sr ? this.Sr.retriableRequest(e10) : this.ui(e10);
    }
    _execute_array(e10) {
      var t10, i10 = [], s10 = [], r10 = [];
      ek(e10, (e11) => {
        e11 && ($(t10 = e11[0]) ? r10.push(e11) : I(e11) ? e11.call(this) : $(e11) && "alias" === t10 ? i10.push(e11) : $(e11) && -1 !== t10.indexOf("capture") && I(this[t10]) ? r10.push(e11) : s10.push(e11));
      });
      var n2 = function(e11, t11) {
        ek(e11, function(e12) {
          if ($(e12[0])) {
            var i11 = t11;
            eS(e12, function(e13) {
              i11 = i11[e13[0]].apply(i11, e13.slice(1));
            });
          } else this[e12[0]].apply(this, e12.slice(1));
        }, t11);
      };
      n2(i10, this), n2(s10, this), n2(r10, this);
    }
    Er() {
      var e10, t10;
      return (null == (e10 = this.config.bootstrap) ? void 0 : e10.featureFlags) && Object.keys(null == (t10 = this.config.bootstrap) ? void 0 : t10.featureFlags).length > 0 || false;
    }
    push(e10) {
      this._execute_array([e10]);
    }
    capture(e10, t10, i10) {
      var s10;
      if (this.__loaded && this.persistence && this.sessionPersistence && this.br) {
        if (this.is_capturing()) if (!R(e10) && C(e10)) {
          if (this.config.opt_out_useragent_filter || !this._is_bot()) {
            var r10 = null != i10 && i10.skip_client_rate_limiting ? void 0 : this.rateLimiter.clientRateLimitContext();
            if (null == r10 || !r10.isRateLimited) {
              null != t10 && t10.$current_url && !C(null == t10 ? void 0 : t10.$current_url) && (ey.error("Invalid `$current_url` property provided to `posthog.capture`. Input must be a string. Ignoring provided value."), null == t10 || delete t10.$current_url), this.sessionPersistence.update_search_keyword(), this.config.save_campaign_params && this.sessionPersistence.update_campaign_params(), this.config.save_referrer && this.sessionPersistence.update_referrer_info(), (this.config.save_campaign_params || this.config.save_referrer) && this.persistence.set_initial_person_info();
              var n2 = /* @__PURE__ */ new Date(), a2 = (null == i10 ? void 0 : i10.timestamp) || n2, o2 = tX(), l2 = { uuid: o2, event: e10, properties: this.calculateEventProperties(e10, t10 || {}, a2, o2) };
              r10 && (l2.properties.$lib_rate_limit_remaining_tokens = r10.remainingTokens), (null == i10 ? void 0 : i10.$set) && (l2.$set = null == i10 ? void 0 : i10.$set);
              var c2, u2 = this.Ir(null == i10 ? void 0 : i10.$set_once);
              if (u2 && (l2.$set_once = u2), (h2 = l2, d2 = null != i10 && i10._noTruncate ? null : this.config.properties_string_max_length, p2 = (e11) => C(e11) && !A(d2) ? e11.slice(0, d2) : e11, g2 = /* @__PURE__ */ new Set(), l2 = function e11(t11, i11) {
                var s11;
                return t11 !== Object(t11) ? p2 ? p2(t11) : t11 : g2.has(t11) ? void 0 : (g2.add(t11), $(t11) ? (s11 = [], ek(t11, (t12) => {
                  s11.push(e11(t12));
                })) : (s11 = {}, eS(t11, (t12, i12) => {
                  g2.has(t12) || (s11[i12] = e11(t12, i12));
                })), s11);
              }(h2)).timestamp = a2, R(null == i10 ? void 0 : i10.timestamp) || (l2.properties.$event_time_override_provided = true, l2.properties.$event_time_override_system_time = n2), e10 === rf.DISMISSED || e10 === rf.SENT) {
                var h2, d2, p2, g2, _2, v2, m2, y2 = null == t10 ? void 0 : t10[rm.SURVEY_ID], b2 = null == t10 ? void 0 : t10[rm.SURVEY_ITERATION];
                c2 = { id: y2, current_iteration: b2 }, localStorage.getItem(rk(c2)) || localStorage.setItem(rk(c2), "true"), l2.$set = f({}, l2.$set, { [(_2 = { id: y2, current_iteration: b2 }, m2 = "$survey_" + (v2 = e10 === rf.SENT ? "responded" : "dismissed") + "/" + _2.id, _2.current_iteration && _2.current_iteration > 0 && (m2 = "$survey_" + v2 + "/" + _2.id + "/" + _2.current_iteration), m2)]: true });
              }
              var w2 = f({}, l2.properties.$set, l2.$set);
              if (O(w2) || this.setPersonPropertiesForFlags(w2), !M(this.config.before_send)) {
                var E2 = this.Rr(l2);
                if (!E2) return;
                l2 = E2;
              }
              this.hr.emit("eventCaptured", l2);
              var x2 = { method: "POST", url: null != (s10 = null == i10 ? void 0 : i10._url) ? s10 : this.requestRouter.endpointFor("api", this.analyticsDefaultEndpoint), data: l2, compression: "best-available", batchKey: null == i10 ? void 0 : i10._batchKey };
              return !this.config.request_batching || i10 && (null == i10 || !i10._batchKey) || null != i10 && i10.send_instantly ? this.wr(x2) : this.br.enqueue(x2), l2;
            }
            ey.critical("This capture call is ignored due to client rate limiting.");
          }
        } else ey.error("No event name provided to posthog.capture");
      } else ey.uninitializedWarning("posthog.capture");
    }
    Ri(e10) {
      return this.on("eventCaptured", (t10) => e10(t10.event, t10));
    }
    calculateEventProperties(e10, i10, s10, r10, n2) {
      if (s10 = s10 || /* @__PURE__ */ new Date(), !this.persistence || !this.sessionPersistence) return i10;
      var a2, c2 = n2 ? void 0 : this.persistence.remove_event_timer(e10), u2 = f({}, i10);
      if (u2.token = this.config.token, u2.$config_defaults = this.config.defaults, ("always" == this.config.cookieless_mode || "on_reject" == this.config.cookieless_mode && this.consent.isExplicitlyOptedOut()) && (u2.$cookieless_mode = true), "$snapshot" === e10) {
        var h2 = f({}, this.persistence.properties(), this.sessionPersistence.properties());
        return u2.distinct_id = h2.distinct_id, (!C(u2.distinct_id) && !D(u2.distinct_id) || T(u2.distinct_id)) && ey.error("Invalid distinct_id for replay event. This indicates a bug in your implementation"), u2;
      }
      var p2, _2 = function(e11, i11) {
        if (!d) return {};
        var s11, r11, n3 = e11 ? e$([], sa, i11 || []) : [], [a3, o2] = function(e12) {
          for (var t10 = 0; t10 < ss.length; t10++) {
            var [i12, s12] = ss[t10], r12 = i12.exec(e12), n4 = r12 && (I(s12) ? s12(r12, e12) : s12);
            if (n4) return n4;
          }
          return ["", ""];
        }(d);
        return eP(eR({ $os: a3, $os_version: o2, $browser: se(d, navigator.vendor), $device: sr(d), $device_type: (r11 = sr(d)) === iS || r11 === ik || "Kobo" === r11 || "Kindle Fire" === r11 || r11 === i1 ? ix : r11 === iB || r11 === iV || r11 === iW || r11 === iQ ? "Console" : r11 === i$ ? "Wearable" : r11 ? iw : "Desktop", $timezone: sf(), $timezone_offset: function() {
          try {
            return (/* @__PURE__ */ new Date()).getTimezoneOffset();
          } catch (e12) {
            return;
          }
        }() }), { $current_url: tL(null == l ? void 0 : l.href, n3, sl), $host: null == l ? void 0 : l.host, $pathname: null == l ? void 0 : l.pathname, $raw_user_agent: d.length > 1e3 ? d.substring(0, 997) + "..." : d, $browser_version: si(d, navigator.vendor), $browser_language: sp(), $browser_language_prefix: "string" == typeof (s11 = sp()) ? s11.split("-")[0] : void 0, $screen_height: null == t ? void 0 : t.screen.height, $screen_width: null == t ? void 0 : t.screen.width, $viewport_height: null == t ? void 0 : t.innerHeight, $viewport_width: null == t ? void 0 : t.innerWidth, $lib: "web", $lib_version: g.LIB_VERSION, $insert_id: Math.random().toString(36).substring(2, 10) + Math.random().toString(36).substring(2, 10), $time: Date.now() / 1e3 });
      }(this.config.mask_personal_data_properties, this.config.custom_personal_data_properties);
      if (this.sessionManager) {
        var { sessionId: v2, windowId: m2 } = this.sessionManager.checkAndGetSessionAndWindowId(n2, s10.getTime());
        u2.$session_id = v2, u2.$window_id = m2;
      }
      this.sessionPropsManager && eP(u2, this.sessionPropsManager.getSessionProps());
      try {
        this.sessionRecording && eP(u2, this.sessionRecording.sdkDebugProperties), u2.$sdk_debug_retry_queue_size = null == (a2 = this.Sr) ? void 0 : a2.length;
      } catch (e11) {
        u2.$sdk_debug_error_capturing_properties = String(e11);
      }
      if (this.requestRouter.region === rz.CUSTOM && (u2.$lib_custom_api_host = this.config.api_host), p2 = "$pageview" !== e10 || n2 ? "$pageleave" !== e10 || n2 ? this.pageViewManager.doEvent() : this.pageViewManager.doPageLeave(s10) : this.pageViewManager.doPageView(s10, r10), u2 = eP(u2, p2), "$pageview" === e10 && o && (u2.title = o.title), !R(c2)) {
        var y2 = s10.getTime() - c2;
        u2.$duration = parseFloat((y2 / 1e3).toFixed(3));
      }
      d && this.config.opt_out_useragent_filter && (u2.$browser_type = this._is_bot() ? "bot" : "browser"), (u2 = eP({}, _2, this.persistence.properties(), this.sessionPersistence.properties(), u2)).$is_identified = this._isIdentified(), $(this.config.property_denylist) ? eS(this.config.property_denylist, function(e11) {
        delete u2[e11];
      }) : ey.error("Invalid value for property_denylist config: " + this.config.property_denylist + " or property_blacklist config: " + this.config.property_blacklist);
      var b2 = this.config.sanitize_properties;
      b2 && (ey.error("sanitize_properties is deprecated. Use before_send instead"), u2 = b2(u2, e10));
      var w2 = this.Cr();
      return u2.$process_person_profile = w2, w2 && !n2 && this.Or("_calculate_event_properties"), u2;
    }
    Ir(e10) {
      if (!this.persistence || !this.Cr() || this.ur) return e10;
      var t10, i10 = eP({}, this.persistence.get_initial_props(), (null == (t10 = this.sessionPropsManager) ? void 0 : t10.getSetOnceProps()) || {}, e10 || {}), s10 = this.config.sanitize_properties;
      return s10 && (ey.error("sanitize_properties is deprecated. Use before_send instead"), i10 = s10(i10, "$set_once")), this.ur = true, O(i10) ? void 0 : i10;
    }
    register(e10, t10) {
      var i10;
      null == (i10 = this.persistence) || i10.register(e10, t10);
    }
    register_once(e10, t10, i10) {
      var s10;
      null == (s10 = this.persistence) || s10.register_once(e10, t10, i10);
    }
    register_for_session(e10) {
      var t10;
      null == (t10 = this.sessionPersistence) || t10.register(e10);
    }
    unregister(e10) {
      var t10;
      null == (t10 = this.persistence) || t10.unregister(e10);
    }
    unregister_for_session(e10) {
      var t10;
      null == (t10 = this.sessionPersistence) || t10.unregister(e10);
    }
    Fr(e10, t10) {
      this.register({ [e10]: t10 });
    }
    getFeatureFlag(e10, t10) {
      return this.featureFlags.getFeatureFlag(e10, t10);
    }
    getFeatureFlagPayload(e10) {
      var t10 = this.featureFlags.getFeatureFlagPayload(e10);
      try {
        return JSON.parse(t10);
      } catch (e11) {
        return t10;
      }
    }
    isFeatureEnabled(e10, t10) {
      return this.featureFlags.isFeatureEnabled(e10, t10);
    }
    reloadFeatureFlags() {
      this.featureFlags.reloadFeatureFlags();
    }
    updateEarlyAccessFeatureEnrollment(e10, t10, i10) {
      this.featureFlags.updateEarlyAccessFeatureEnrollment(e10, t10, i10);
    }
    getEarlyAccessFeatures(e10, t10, i10) {
      return void 0 === t10 && (t10 = false), this.featureFlags.getEarlyAccessFeatures(e10, t10, i10);
    }
    on(e10, t10) {
      return this.hr.on(e10, t10);
    }
    onFeatureFlags(e10) {
      return this.featureFlags.onFeatureFlags(e10);
    }
    onSurveysLoaded(e10) {
      return this.surveys.onSurveysLoaded(e10);
    }
    onSessionId(e10) {
      var t10, i10;
      return null != (t10 = null == (i10 = this.sessionManager) ? void 0 : i10.onSessionId(e10)) ? t10 : () => {
      };
    }
    getSurveys(e10, t10) {
      void 0 === t10 && (t10 = false), this.surveys.getSurveys(e10, t10);
    }
    getActiveMatchingSurveys(e10, t10) {
      void 0 === t10 && (t10 = false), this.surveys.getActiveMatchingSurveys(e10, t10);
    }
    renderSurvey(e10, t10) {
      this.surveys.renderSurvey(e10, t10);
    }
    displaySurvey(e10, t10) {
      void 0 === t10 && (t10 = rP), this.surveys.displaySurvey(e10, t10);
    }
    canRenderSurvey(e10) {
      return this.surveys.canRenderSurvey(e10);
    }
    canRenderSurveyAsync(e10, t10) {
      return void 0 === t10 && (t10 = false), this.surveys.canRenderSurveyAsync(e10, t10);
    }
    identify(e10, t10, i10) {
      if (!this.__loaded || !this.persistence) return ey.uninitializedWarning("posthog.identify");
      if (D(e10) && (e10 = e10.toString(), ey.warn("The first argument to posthog.identify was a number, but it should be a string. It has been converted to a string.")), e10) if (["distinct_id", "distinctid"].includes(e10.toLowerCase())) ey.critical('The string "' + e10 + '" was set in posthog.identify which indicates an error. This ID should be unique to the user and not a hardcoded string.');
      else if (e10 !== tt) {
        if (this.Or("posthog.identify")) {
          var s10 = this.get_distinct_id();
          this.register({ $user_id: e10 }), this.get_property("$device_id") || this.register_once({ $had_persisted_distinct_id: true, $device_id: s10 }, ""), e10 !== s10 && e10 !== this.get_property(eD) && (this.unregister(eD), this.register({ distinct_id: e10 }));
          var r10 = "anonymous" === (this.persistence.get_property(e3) || "anonymous");
          e10 !== s10 && r10 ? (this.persistence.set_property(e3, "identified"), this.setPersonPropertiesForFlags(f({}, i10 || {}, t10 || {}), false), this.capture("$identify", { distinct_id: e10, $anon_distinct_id: s10 }, { $set: t10 || {}, $set_once: i10 || {} }), this.pr = re(e10, t10, i10), this.featureFlags.setAnonymousDistinctId(s10)) : (t10 || i10) && this.setPersonProperties(t10, i10), e10 !== s10 && (this.reloadFeatureFlags(), this.unregister(e2));
        }
      } else ey.critical('The string "' + tt + '" was set in posthog.identify which indicates an error. This ID is only used as a sentinel value.');
      else ey.error("Unique user id has not been set in posthog.identify");
    }
    setPersonProperties(e10, t10) {
      if ((e10 || t10) && this.Or("posthog.setPersonProperties")) {
        var i10 = re(this.get_distinct_id(), e10, t10);
        this.pr !== i10 ? (this.setPersonPropertiesForFlags(f({}, t10 || {}, e10 || {})), this.capture("$set", { $set: e10 || {}, $set_once: t10 || {} }), this.pr = i10) : ey.info("A duplicate setPersonProperties call was made with the same properties. It has been ignored.");
      }
    }
    group(e10, t10, i10) {
      if (e10 && t10) {
        if (this.Or("posthog.group")) {
          var s10 = this.getGroups();
          s10[e10] !== t10 && this.resetGroupPropertiesForFlags(e10), this.register({ $groups: f({}, s10, { [e10]: t10 }) }), i10 && (this.capture("$groupidentify", { $group_type: e10, $group_key: t10, $group_set: i10 }), this.setGroupPropertiesForFlags({ [e10]: i10 })), s10[e10] === t10 || i10 || this.reloadFeatureFlags();
        }
      } else ey.error("posthog.group requires a group type and group key");
    }
    resetGroups() {
      this.register({ $groups: {} }), this.resetGroupPropertiesForFlags(), this.reloadFeatureFlags();
    }
    setPersonPropertiesForFlags(e10, t10) {
      void 0 === t10 && (t10 = true), this.featureFlags.setPersonPropertiesForFlags(e10, t10);
    }
    resetPersonPropertiesForFlags() {
      this.featureFlags.resetPersonPropertiesForFlags();
    }
    setGroupPropertiesForFlags(e10, t10) {
      void 0 === t10 && (t10 = true), this.Or("posthog.setGroupPropertiesForFlags") && this.featureFlags.setGroupPropertiesForFlags(e10, t10);
    }
    resetGroupPropertiesForFlags(e10) {
      this.featureFlags.resetGroupPropertiesForFlags(e10);
    }
    reset(e10) {
      if (ey.info("reset"), !this.__loaded) return ey.uninitializedWarning("posthog.reset");
      var t10, i10, s10, r10, n2 = this.get_property("$device_id");
      if (this.consent.reset(), null == (t10 = this.persistence) || t10.clear(), null == (i10 = this.sessionPersistence) || i10.clear(), this.surveys.reset(), this.featureFlags.reset(), null == (s10 = this.persistence) || s10.set_property(e3, "anonymous"), null == (r10 = this.sessionManager) || r10.resetSessionId(), this.pr = null, "always" === this.config.cookieless_mode) this.register_once({ distinct_id: tt, $device_id: null }, "");
      else {
        var a2 = this.config.get_device_id(tX());
        this.register_once({ distinct_id: a2, $device_id: e10 ? a2 : n2 }, "");
      }
      this.register({ $last_posthog_reset: (/* @__PURE__ */ new Date()).toISOString() }, 1);
    }
    get_distinct_id() {
      return this.get_property("distinct_id");
    }
    getGroups() {
      return this.get_property("$groups") || {};
    }
    get_session_id() {
      var e10, t10;
      return null != (e10 = null == (t10 = this.sessionManager) ? void 0 : t10.checkAndGetSessionAndWindowId(true).sessionId) ? e10 : "";
    }
    get_session_replay_url(e10) {
      if (!this.sessionManager) return "";
      var { sessionId: t10, sessionStartTimestamp: i10 } = this.sessionManager.checkAndGetSessionAndWindowId(true), s10 = this.requestRouter.endpointFor("ui", "/project/" + this.config.token + "/replay/" + t10);
      if (null != e10 && e10.withTimestamp && i10) {
        var r10, n2 = null != (r10 = e10.timestampLookBack) ? r10 : 10;
        if (!i10) return s10;
        s10 += "?t=" + Math.max(Math.floor(((/* @__PURE__ */ new Date()).getTime() - i10) / 1e3) - n2, 0);
      }
      return s10;
    }
    alias(e10, t10) {
      return e10 === this.get_property(eM) ? (ey.critical("Attempting to create alias for existing People user - aborting."), -2) : this.Or("posthog.alias") ? (R(t10) && (t10 = this.get_distinct_id()), e10 !== t10 ? (this.Fr(eD, e10), this.capture("$create_alias", { alias: e10, distinct_id: t10 })) : (ey.warn("alias matches current distinct_id - skipping api call."), this.identify(e10), -1)) : void 0;
    }
    set_config(e10) {
      var t10 = f({}, this.config);
      if (F(e10)) {
        eP(this.config, r9(e10));
        var i10, s10, r10, n2, a2, o2 = this.yr();
        null == (i10 = this.persistence) || i10.update_config(this.config, t10, o2), this.sessionPersistence = "sessionStorage" === this.config.persistence || "memory" === this.config.persistence ? this.persistence : new r_(f({}, this.config, { persistence: "sessionStorage" }), o2);
        var l2 = this.gr(this.config.debug);
        L(l2) && (this.config.debug = l2), L(this.config.debug) && (this.config.debug ? (g.DEBUG = true, t1.G() && t1.Y("ph_debug", "true"), ey.info("set_config", { config: e10, oldConfig: t10, newConfig: f({}, this.config) })) : (g.DEBUG = false, t1.G() && t1.X("ph_debug"))), null == (s10 = this.sessionRecording) || s10.startIfEnabledOrStop(), null == (r10 = this.autocapture) || r10.startIfEnabled(), null == (n2 = this.heatmaps) || n2.startIfEnabled(), this.surveys.loadIfEnabled(), this.Mr(), null == (a2 = this.externalIntegrations) || a2.startIfEnabledOrStop();
      }
    }
    startSessionRecording(e10) {
      var t10, i10, s10, r10, n2, a2 = true === e10, o2 = { sampling: a2 || !(null == e10 || !e10.sampling), linked_flag: a2 || !(null == e10 || !e10.linked_flag), url_trigger: a2 || !(null == e10 || !e10.url_trigger), event_trigger: a2 || !(null == e10 || !e10.event_trigger) };
      Object.values(o2).some(Boolean) && (null == (t10 = this.sessionManager) || t10.checkAndGetSessionAndWindowId(), o2.sampling && (null == (i10 = this.sessionRecording) || i10.overrideSampling()), o2.linked_flag && (null == (s10 = this.sessionRecording) || s10.overrideLinkedFlag()), o2.url_trigger && (null == (r10 = this.sessionRecording) || r10.overrideTrigger("url")), o2.event_trigger && (null == (n2 = this.sessionRecording) || n2.overrideTrigger("event"))), this.set_config({ disable_session_recording: false });
    }
    stopSessionRecording() {
      this.set_config({ disable_session_recording: true });
    }
    sessionRecordingStarted() {
      var e10;
      return !(null == (e10 = this.sessionRecording) || !e10.started);
    }
    captureException(e10, t10) {
      var i10 = Error("PostHog syntheticException"), s10 = this.exceptions.buildProperties(e10, { handled: true, syntheticException: i10 });
      return this.exceptions.sendExceptionEvent(f({}, s10, t10));
    }
    loadToolbar(e10) {
      return this.toolbar.loadToolbar(e10);
    }
    get_property(e10) {
      var t10;
      return null == (t10 = this.persistence) ? void 0 : t10.props[e10];
    }
    getSessionProperty(e10) {
      var t10;
      return null == (t10 = this.sessionPersistence) ? void 0 : t10.props[e10];
    }
    toString() {
      var e10, t10 = null != (e10 = this.config.name) ? e10 : r6;
      return t10 !== r6 && (t10 = r6 + "." + t10), t10;
    }
    _isIdentified() {
      var e10, t10;
      return "identified" === (null == (e10 = this.persistence) ? void 0 : e10.get_property(e3)) || "identified" === (null == (t10 = this.sessionPersistence) ? void 0 : t10.get_property(e3));
    }
    Cr() {
      var e10, t10;
      return !("never" === this.config.person_profiles || "identified_only" === this.config.person_profiles && !this._isIdentified() && O(this.getGroups()) && (null == (e10 = this.persistence) || null == (e10 = e10.props) || !e10[eD]) && (null == (t10 = this.persistence) || null == (t10 = t10.props) || !t10[e9]));
    }
    Tr() {
      return true === this.config.capture_pageleave || "if_capture_pageview" === this.config.capture_pageleave && (true === this.config.capture_pageview || "history_change" === this.config.capture_pageview);
    }
    createPersonProfile() {
      this.Cr() || this.Or("posthog.createPersonProfile") && this.setPersonProperties({}, {});
    }
    Or(e10) {
      return "never" === this.config.person_profiles ? (ey.error(e10 + ' was called, but process_person is set to "never". This call will be ignored.'), false) : (this.Fr(e9, true), true);
    }
    yr() {
      if ("always" === this.config.cookieless_mode) return true;
      var e10 = this.consent.isOptedOut(), t10 = this.config.opt_out_persistence_by_default || "on_reject" === this.config.cookieless_mode;
      return this.config.disable_persistence || e10 && !!t10;
    }
    Mr() {
      var e10, t10, i10, s10, r10 = this.yr();
      return (null == (e10 = this.persistence) ? void 0 : e10.gi) !== r10 && (null == (i10 = this.persistence) || i10.set_disabled(r10)), (null == (t10 = this.sessionPersistence) ? void 0 : t10.gi) !== r10 && (null == (s10 = this.sessionPersistence) || s10.set_disabled(r10)), r10;
    }
    opt_in_capturing(e10) {
      if ("always" !== this.config.cookieless_mode) {
        var t10, i10;
        "on_reject" === this.config.cookieless_mode && this.consent.isExplicitlyOptedOut() && (this.reset(true), null == (t10 = this.sessionManager) || t10.destroy(), this.sessionManager = new rq(this), this.persistence && (this.sessionPropsManager = new rN(this, this.sessionManager, this.persistence)), this.sessionRecording = new r3(this), this.sessionRecording.startIfEnabledOrStop()), this.consent.optInOut(true), this.Mr(), this.kr(), "on_reject" == this.config.cookieless_mode && this.surveys.loadIfEnabled(), (R(null == e10 ? void 0 : e10.captureEventName) || null != e10 && e10.captureEventName) && this.capture(null != (i10 = null == e10 ? void 0 : e10.captureEventName) ? i10 : "$opt_in", null == e10 ? void 0 : e10.captureProperties, { send_instantly: true }), this.config.capture_pageview && this.Pr();
      } else ey.warn('Consent opt in/out is not valid with cookieless_mode="always" and will be ignored');
    }
    opt_out_capturing() {
      var e10, t10;
      "always" !== this.config.cookieless_mode ? ("on_reject" === this.config.cookieless_mode && this.consent.isOptedIn() && this.reset(true), this.consent.optInOut(false), this.Mr(), "on_reject" === this.config.cookieless_mode && (this.register({ distinct_id: tt, $device_id: null }), null == (e10 = this.sessionManager) || e10.destroy(), this.sessionManager = void 0, this.sessionPropsManager = void 0, null == (t10 = this.sessionRecording) || t10.stopRecording(), this.sessionRecording = void 0, this.Pr())) : ey.warn('Consent opt in/out is not valid with cookieless_mode="always" and will be ignored');
    }
    has_opted_in_capturing() {
      return this.consent.isOptedIn();
    }
    has_opted_out_capturing() {
      return this.consent.isOptedOut();
    }
    get_explicit_consent_status() {
      var e10 = this.consent.consent;
      return e10 === t7.GRANTED ? "granted" : e10 === t7.DENIED ? "denied" : "pending";
    }
    is_capturing() {
      return "always" === this.config.cookieless_mode || ("on_reject" === this.config.cookieless_mode ? this.consent.isExplicitlyOptedOut() || this.consent.isOptedIn() : !this.has_opted_out_capturing());
    }
    clear_opt_in_out_capturing() {
      this.consent.reset(), this.Mr();
    }
    _is_bot() {
      return a ? rV(a, this.config.custom_blocked_useragents) : void 0;
    }
    Pr() {
      o && ("visible" === o.visibilityState ? this.dr || (this.dr = true, this.capture("$pageview", { title: o.title }, { send_instantly: true }), this.vr && (o.removeEventListener("visibilitychange", this.vr), this.vr = null)) : this.vr || (this.vr = this.Pr.bind(this), eA(o, "visibilitychange", this.vr)));
    }
    debug(e10) {
      false === e10 ? (null == t || t.console.log("You've disabled debug mode."), this.set_config({ debug: false })) : (null == t || t.console.log("You're now in debug mode. All calls to PostHog will be logged in your console.\nYou can disable this with `posthog.debug(false)`."), this.set_config({ debug: true }));
    }
    L() {
      var e10, t10, i10, s10, r10 = this._r || {};
      return "advanced_disable_flags" in r10 ? !!r10.advanced_disable_flags : false !== this.config.advanced_disable_flags ? !!this.config.advanced_disable_flags : true === this.config.advanced_disable_decide ? (ey.warn("Config field 'advanced_disable_decide' is deprecated. Please use 'advanced_disable_flags' instead. The old field will be removed in a future major version."), true) : (t10 = "advanced_disable_decide", i10 = (e10 = "advanced_disable_flags") in r10 && !R(r10[e10]), s10 = t10 in r10 && !R(r10[t10]), i10 ? r10[e10] : !!s10 && (ey && ey.warn("Config field '" + t10 + "' is deprecated. Please use '" + e10 + "' instead. The old field will be removed in a future major version."), r10[t10]));
    }
    Rr(e10) {
      if (M(this.config.before_send)) return e10;
      var t10 = $(this.config.before_send) ? this.config.before_send : [this.config.before_send], i10 = e10;
      for (var s10 of t10) {
        if (M(i10 = s10(i10))) {
          var r10 = "Event '" + e10.event + "' was rejected in beforeSend function";
          return N(e10.event) ? ey.warn(r10 + ". This can cause unexpected behavior.") : ey.info(r10), null;
        }
        i10.properties && !O(i10.properties) || ey.warn("Event '" + e10.event + "' has no properties after beforeSend function, this is likely an error.");
      }
      return i10;
    }
    getPageViewId() {
      var e10;
      return null == (e10 = this.pageViewManager.Wt) ? void 0 : e10.pageViewId;
    }
    captureTraceFeedback(e10, t10) {
      this.capture("$ai_feedback", { $ai_trace_id: String(e10), $ai_feedback_text: t10 });
    }
    captureTraceMetric(e10, t10, i10) {
      this.capture("$ai_metric", { $ai_trace_id: String(e10), $ai_metric_name: t10, $ai_metric_value: String(i10) });
    }
    gr(e10) {
      var t10 = L(e10) && !e10, i10 = t1.G() && "true" === t1.J("ph_debug");
      return !t10 && (!!i10 || e10);
    }
  }
  for (var ni = ["identify"], ns = 0; ns < ni.length; ns++) nt.prototype[ni[ns]] = eO(nt.prototype[ni[ns]]);
  var nr, nn, na, no, nl, nc, nu, nh, nd, np, ng, n_, nv, nf, nm = (nf = r5[r6] = new nt(), function() {
    function e10() {
      e10.done || (e10.done = true, r4 = false, eS(r5, function(e11) {
        e11._dom_loaded();
      }));
    }
    null != o && o.addEventListener ? "complete" === o.readyState ? e10() : eA(o, "DOMContentLoaded", e10, { capture: false }) : t && ey.error("Browser doesn't support `document.addEventListener` so PostHog couldn't be initialized");
  }(), nf);
  e.s(["default", 0, nm]);
}]);
