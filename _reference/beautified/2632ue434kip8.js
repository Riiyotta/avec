(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["object" == typeof document ? document.currentScript : void 0, 12786, 5734, (e) => {
  "use strict";
  var t = e.i(95187);
  let n = (0, t.createServerReference)("40d730e98c61135a569cbe00446f1b85ce60cd5d22", t.callServer, void 0, t.findSourceMapURL, "getScoreStats");
  e.s(["getScoreStats", 0, n], 12786);
  let r = (0, t.createServerReference)("40d6db75061fde770fbd8a566bab7ec8cfd09da164", t.callServer, void 0, t.findSourceMapURL, "recordScore");
  e.s(["recordScore", 0, r], 5734);
}, 45185, (e) => {
  "use strict";
  let t;
  var n, r, a, i, s, o, l, d, c, u, p = e.i(43476);
  e.s([], 38570), e.i(38570), (n = o || (o = {})).assertEqual = (e10) => {
  }, n.assertIs = function(e10) {
  }, n.assertNever = function(e10) {
    throw Error();
  }, n.arrayToEnum = (e10) => {
    let t10 = {};
    for (let n10 of e10) t10[n10] = n10;
    return t10;
  }, n.getValidEnumValues = (e10) => {
    let t10 = n.objectKeys(e10).filter((t11) => "number" != typeof e10[e10[t11]]), r10 = {};
    for (let n10 of t10) r10[n10] = e10[n10];
    return n.objectValues(r10);
  }, n.objectValues = (e10) => n.objectKeys(e10).map(function(t10) {
    return e10[t10];
  }), n.objectKeys = "function" == typeof Object.keys ? (e10) => Object.keys(e10) : (e10) => {
    let t10 = [];
    for (let n10 in e10) Object.prototype.hasOwnProperty.call(e10, n10) && t10.push(n10);
    return t10;
  }, n.find = (e10, t10) => {
    for (let n10 of e10) if (t10(n10)) return n10;
  }, n.isInteger = "function" == typeof Number.isInteger ? (e10) => Number.isInteger(e10) : (e10) => "number" == typeof e10 && Number.isFinite(e10) && Math.floor(e10) === e10, n.joinValues = function(e10, t10 = " | ") {
    return e10.map((e11) => "string" == typeof e11 ? `'${e11}'` : e11).join(t10);
  }, n.jsonStringifyReplacer = (e10, t10) => "bigint" == typeof t10 ? t10.toString() : t10, (l || (l = {})).mergeShapes = (e10, t10) => ({ ...e10, ...t10 });
  let h = o.arrayToEnum(["string", "nan", "number", "integer", "float", "boolean", "date", "bigint", "symbol", "function", "undefined", "null", "array", "object", "unknown", "promise", "void", "never", "map", "set"]), m = (e10) => {
    switch (typeof e10) {
      case "undefined":
        return h.undefined;
      case "string":
        return h.string;
      case "number":
        return Number.isNaN(e10) ? h.nan : h.number;
      case "boolean":
        return h.boolean;
      case "function":
        return h.function;
      case "bigint":
        return h.bigint;
      case "symbol":
        return h.symbol;
      case "object":
        if (Array.isArray(e10)) return h.array;
        if (null === e10) return h.null;
        if (e10.then && "function" == typeof e10.then && e10.catch && "function" == typeof e10.catch) return h.promise;
        if ("u" > typeof Map && e10 instanceof Map) return h.map;
        if ("u" > typeof Set && e10 instanceof Set) return h.set;
        if ("u" > typeof Date && e10 instanceof Date) return h.date;
        return h.object;
      default:
        return h.unknown;
    }
  };
  e.s(["ZodParsedType", 0, h, "getParsedType", 0, m, "objectUtil", 0, l, "util", 0, o], 4783);
  let f = o.arrayToEnum(["invalid_type", "invalid_literal", "custom", "invalid_union", "invalid_union_discriminator", "invalid_enum_value", "unrecognized_keys", "invalid_arguments", "invalid_return_type", "invalid_date", "invalid_string", "too_small", "too_big", "invalid_intersection_types", "not_multiple_of", "not_finite"]), y = (e10) => JSON.stringify(e10, null, 2).replace(/"([^"]+)":/g, "$1:");
  class g extends Error {
    get errors() {
      return this.issues;
    }
    constructor(e10) {
      super(), this.issues = [], this.addIssue = (e11) => {
        this.issues = [...this.issues, e11];
      }, this.addIssues = (e11 = []) => {
        this.issues = [...this.issues, ...e11];
      };
      const t10 = new.target.prototype;
      Object.setPrototypeOf ? Object.setPrototypeOf(this, t10) : this.__proto__ = t10, this.name = "ZodError", this.issues = e10;
    }
    format(e10) {
      let t10 = e10 || function(e11) {
        return e11.message;
      }, n10 = { _errors: [] }, r10 = (e11) => {
        for (let a10 of e11.issues) if ("invalid_union" === a10.code) a10.unionErrors.map(r10);
        else if ("invalid_return_type" === a10.code) r10(a10.returnTypeError);
        else if ("invalid_arguments" === a10.code) r10(a10.argumentsError);
        else if (0 === a10.path.length) n10._errors.push(t10(a10));
        else {
          let e12 = n10, r11 = 0;
          for (; r11 < a10.path.length; ) {
            let n11 = a10.path[r11];
            r11 === a10.path.length - 1 ? (e12[n11] = e12[n11] || { _errors: [] }, e12[n11]._errors.push(t10(a10))) : e12[n11] = e12[n11] || { _errors: [] }, e12 = e12[n11], r11++;
          }
        }
      };
      return r10(this), n10;
    }
    static assert(e10) {
      if (!(e10 instanceof g)) throw Error(`Not a ZodError: ${e10}`);
    }
    toString() {
      return this.message;
    }
    get message() {
      return JSON.stringify(this.issues, o.jsonStringifyReplacer, 2);
    }
    get isEmpty() {
      return 0 === this.issues.length;
    }
    flatten(e10 = (e11) => e11.message) {
      let t10 = {}, n10 = [];
      for (let r10 of this.issues) if (r10.path.length > 0) {
        let n11 = r10.path[0];
        t10[n11] = t10[n11] || [], t10[n11].push(e10(r10));
      } else n10.push(e10(r10));
      return { formErrors: n10, fieldErrors: t10 };
    }
    get formErrors() {
      return this.flatten();
    }
  }
  g.create = (e10) => new g(e10), e.s(["ZodError", 0, g, "ZodIssueCode", 0, f, "quotelessJson", 0, y], 69790);
  let b = (e10, t10) => {
    let n10;
    switch (e10.code) {
      case f.invalid_type:
        n10 = e10.received === h.undefined ? "Required" : `Expected ${e10.expected}, received ${e10.received}`;
        break;
      case f.invalid_literal:
        n10 = `Invalid literal value, expected ${JSON.stringify(e10.expected, o.jsonStringifyReplacer)}`;
        break;
      case f.unrecognized_keys:
        n10 = `Unrecognized key(s) in object: ${o.joinValues(e10.keys, ", ")}`;
        break;
      case f.invalid_union:
        n10 = "Invalid input";
        break;
      case f.invalid_union_discriminator:
        n10 = `Invalid discriminator value. Expected ${o.joinValues(e10.options)}`;
        break;
      case f.invalid_enum_value:
        n10 = `Invalid enum value. Expected ${o.joinValues(e10.options)}, received '${e10.received}'`;
        break;
      case f.invalid_arguments:
        n10 = "Invalid function arguments";
        break;
      case f.invalid_return_type:
        n10 = "Invalid function return type";
        break;
      case f.invalid_date:
        n10 = "Invalid date";
        break;
      case f.invalid_string:
        "object" == typeof e10.validation ? "includes" in e10.validation ? (n10 = `Invalid input: must include "${e10.validation.includes}"`, "number" == typeof e10.validation.position && (n10 = `${n10} at one or more positions greater than or equal to ${e10.validation.position}`)) : "startsWith" in e10.validation ? n10 = `Invalid input: must start with "${e10.validation.startsWith}"` : "endsWith" in e10.validation ? n10 = `Invalid input: must end with "${e10.validation.endsWith}"` : o.assertNever(e10.validation) : n10 = "regex" !== e10.validation ? `Invalid ${e10.validation}` : "Invalid";
        break;
      case f.too_small:
        n10 = "array" === e10.type ? `Array must contain ${e10.exact ? "exactly" : e10.inclusive ? "at least" : "more than"} ${e10.minimum} element(s)` : "string" === e10.type ? `String must contain ${e10.exact ? "exactly" : e10.inclusive ? "at least" : "over"} ${e10.minimum} character(s)` : "number" === e10.type || "bigint" === e10.type ? `Number must be ${e10.exact ? "exactly equal to " : e10.inclusive ? "greater than or equal to " : "greater than "}${e10.minimum}` : "date" === e10.type ? `Date must be ${e10.exact ? "exactly equal to " : e10.inclusive ? "greater than or equal to " : "greater than "}${new Date(Number(e10.minimum))}` : "Invalid input";
        break;
      case f.too_big:
        n10 = "array" === e10.type ? `Array must contain ${e10.exact ? "exactly" : e10.inclusive ? "at most" : "less than"} ${e10.maximum} element(s)` : "string" === e10.type ? `String must contain ${e10.exact ? "exactly" : e10.inclusive ? "at most" : "under"} ${e10.maximum} character(s)` : "number" === e10.type ? `Number must be ${e10.exact ? "exactly" : e10.inclusive ? "less than or equal to" : "less than"} ${e10.maximum}` : "bigint" === e10.type ? `BigInt must be ${e10.exact ? "exactly" : e10.inclusive ? "less than or equal to" : "less than"} ${e10.maximum}` : "date" === e10.type ? `Date must be ${e10.exact ? "exactly" : e10.inclusive ? "smaller than or equal to" : "smaller than"} ${new Date(Number(e10.maximum))}` : "Invalid input";
        break;
      case f.custom:
        n10 = "Invalid input";
        break;
      case f.invalid_intersection_types:
        n10 = "Intersection results could not be merged";
        break;
      case f.not_multiple_of:
        n10 = `Number must be a multiple of ${e10.multipleOf}`;
        break;
      case f.not_finite:
        n10 = "Number must be finite";
        break;
      default:
        n10 = t10.defaultError, o.assertNever(e10);
    }
    return { message: n10 };
  }, v = b;
  function x(e10) {
    v = e10;
  }
  function _() {
    return v;
  }
  e.s(["getErrorMap", 0, _, "setErrorMap", 0, x], 37904), e.i(37904), e.s(["defaultErrorMap", 0, b, "getErrorMap", 0, _, "setErrorMap", 0, x], 77290), e.i(77290);
  let k = (e10) => {
    let { data: t10, path: n10, errorMaps: r10, issueData: a10 } = e10, i10 = [...n10, ...a10.path || []], s10 = { ...a10, path: i10 };
    if (void 0 !== a10.message) return { ...a10, path: i10, message: a10.message };
    let o2 = "";
    for (let e11 of r10.filter((e12) => !!e12).slice().reverse()) o2 = e11(s10, { data: t10, defaultError: o2 }).message;
    return { ...a10, path: i10, message: o2 };
  }, w = [];
  function j(e10, t10) {
    let n10 = _(), r10 = k({ issueData: t10, data: e10.data, path: e10.path, errorMaps: [e10.common.contextualErrorMap, e10.schemaErrorMap, n10, n10 === b ? void 0 : b].filter((e11) => !!e11) });
    e10.common.issues.push(r10);
  }
  class E {
    constructor() {
      this.value = "valid";
    }
    dirty() {
      "valid" === this.value && (this.value = "dirty");
    }
    abort() {
      "aborted" !== this.value && (this.value = "aborted");
    }
    static mergeArray(e10, t10) {
      let n10 = [];
      for (let r10 of t10) {
        if ("aborted" === r10.status) return T;
        "dirty" === r10.status && e10.dirty(), n10.push(r10.value);
      }
      return { status: e10.value, value: n10 };
    }
    static async mergeObjectAsync(e10, t10) {
      let n10 = [];
      for (let e11 of t10) {
        let t11 = await e11.key, r10 = await e11.value;
        n10.push({ key: t11, value: r10 });
      }
      return E.mergeObjectSync(e10, n10);
    }
    static mergeObjectSync(e10, t10) {
      let n10 = {};
      for (let r10 of t10) {
        let { key: t11, value: a10 } = r10;
        if ("aborted" === t11.status || "aborted" === a10.status) return T;
        "dirty" === t11.status && e10.dirty(), "dirty" === a10.status && e10.dirty(), "__proto__" !== t11.value && (void 0 !== a10.value || r10.alwaysSet) && (n10[t11.value] = a10.value);
      }
      return { status: e10.value, value: n10 };
    }
  }
  let T = Object.freeze({ status: "aborted" }), C = (e10) => ({ status: "dirty", value: e10 }), S = (e10) => ({ status: "valid", value: e10 }), N = (e10) => "aborted" === e10.status, I = (e10) => "dirty" === e10.status, A = (e10) => "valid" === e10.status, O = (e10) => "u" > typeof Promise && e10 instanceof Promise;
  e.s(["DIRTY", 0, C, "EMPTY_PATH", 0, w, "INVALID", 0, T, "OK", 0, S, "ParseStatus", 0, E, "addIssueToContext", 0, j, "isAborted", 0, N, "isAsync", 0, O, "isDirty", 0, I, "isValid", 0, A, "makeIssue", 0, k], 65354), e.i(65354), e.s([], 27404), e.i(27404), e.i(4783), (r = d || (d = {})).errToObj = (e10) => "string" == typeof e10 ? { message: e10 } : e10 || {}, r.toString = (e10) => "string" == typeof e10 ? e10 : e10?.message;
  class R {
    constructor(e10, t10, n10, r10) {
      this._cachedPath = [], this.parent = e10, this.data = t10, this._path = n10, this._key = r10;
    }
    get path() {
      return this._cachedPath.length || (Array.isArray(this._key) ? this._cachedPath.push(...this._path, ...this._key) : this._cachedPath.push(...this._path, this._key)), this._cachedPath;
    }
  }
  let D = (e10, t10) => {
    if (A(t10)) return { success: true, data: t10.value };
    if (!e10.common.issues.length) throw Error("Validation failed but no issues detected.");
    return { success: false, get error() {
      if (this._error) return this._error;
      let t11 = new g(e10.common.issues);
      return this._error = t11, this._error;
    } };
  };
  function L(e10) {
    if (!e10) return {};
    let { errorMap: t10, invalid_type_error: n10, required_error: r10, description: a10 } = e10;
    if (t10 && (n10 || r10)) throw Error(`Can't use "invalid_type_error" or "required_error" in conjunction with custom error map.`);
    return t10 ? { errorMap: t10, description: a10 } : { errorMap: (t11, a11) => {
      let { message: i10 } = e10;
      return "invalid_enum_value" === t11.code ? { message: i10 ?? a11.defaultError } : void 0 === a11.data ? { message: i10 ?? r10 ?? a11.defaultError } : "invalid_type" !== t11.code ? { message: a11.defaultError } : { message: i10 ?? n10 ?? a11.defaultError };
    }, description: a10 };
  }
  class M {
    get description() {
      return this._def.description;
    }
    _getType(e10) {
      return m(e10.data);
    }
    _getOrReturnCtx(e10, t10) {
      return t10 || { common: e10.parent.common, data: e10.data, parsedType: m(e10.data), schemaErrorMap: this._def.errorMap, path: e10.path, parent: e10.parent };
    }
    _processInputParams(e10) {
      return { status: new E(), ctx: { common: e10.parent.common, data: e10.data, parsedType: m(e10.data), schemaErrorMap: this._def.errorMap, path: e10.path, parent: e10.parent } };
    }
    _parseSync(e10) {
      let t10 = this._parse(e10);
      if (O(t10)) throw Error("Synchronous parse encountered promise.");
      return t10;
    }
    _parseAsync(e10) {
      return Promise.resolve(this._parse(e10));
    }
    parse(e10, t10) {
      let n10 = this.safeParse(e10, t10);
      if (n10.success) return n10.data;
      throw n10.error;
    }
    safeParse(e10, t10) {
      let n10 = { common: { issues: [], async: t10?.async ?? false, contextualErrorMap: t10?.errorMap }, path: t10?.path || [], schemaErrorMap: this._def.errorMap, parent: null, data: e10, parsedType: m(e10) }, r10 = this._parseSync({ data: e10, path: n10.path, parent: n10 });
      return D(n10, r10);
    }
    "~validate"(e10) {
      let t10 = { common: { issues: [], async: !!this["~standard"].async }, path: [], schemaErrorMap: this._def.errorMap, parent: null, data: e10, parsedType: m(e10) };
      if (!this["~standard"].async) try {
        let n10 = this._parseSync({ data: e10, path: [], parent: t10 });
        return A(n10) ? { value: n10.value } : { issues: t10.common.issues };
      } catch (e11) {
        e11?.message?.toLowerCase()?.includes("encountered") && (this["~standard"].async = true), t10.common = { issues: [], async: true };
      }
      return this._parseAsync({ data: e10, path: [], parent: t10 }).then((e11) => A(e11) ? { value: e11.value } : { issues: t10.common.issues });
    }
    async parseAsync(e10, t10) {
      let n10 = await this.safeParseAsync(e10, t10);
      if (n10.success) return n10.data;
      throw n10.error;
    }
    async safeParseAsync(e10, t10) {
      let n10 = { common: { issues: [], contextualErrorMap: t10?.errorMap, async: true }, path: t10?.path || [], schemaErrorMap: this._def.errorMap, parent: null, data: e10, parsedType: m(e10) }, r10 = this._parse({ data: e10, path: n10.path, parent: n10 });
      return D(n10, await (O(r10) ? r10 : Promise.resolve(r10)));
    }
    refine(e10, t10) {
      return this._refinement((n10, r10) => {
        let a10 = e10(n10), i10 = () => r10.addIssue({ code: f.custom, ..."string" == typeof t10 || void 0 === t10 ? { message: t10 } : "function" == typeof t10 ? t10(n10) : t10 });
        return "u" > typeof Promise && a10 instanceof Promise ? a10.then((e11) => !!e11 || (i10(), false)) : !!a10 || (i10(), false);
      });
    }
    refinement(e10, t10) {
      return this._refinement((n10, r10) => !!e10(n10) || (r10.addIssue("function" == typeof t10 ? t10(n10, r10) : t10), false));
    }
    _refinement(e10) {
      return new eI({ schema: this, typeName: c.ZodEffects, effect: { type: "refinement", refinement: e10 } });
    }
    superRefine(e10) {
      return this._refinement(e10);
    }
    constructor(e10) {
      this.spa = this.safeParseAsync, this._def = e10, this.parse = this.parse.bind(this), this.safeParse = this.safeParse.bind(this), this.parseAsync = this.parseAsync.bind(this), this.safeParseAsync = this.safeParseAsync.bind(this), this.spa = this.spa.bind(this), this.refine = this.refine.bind(this), this.refinement = this.refinement.bind(this), this.superRefine = this.superRefine.bind(this), this.optional = this.optional.bind(this), this.nullable = this.nullable.bind(this), this.nullish = this.nullish.bind(this), this.array = this.array.bind(this), this.promise = this.promise.bind(this), this.or = this.or.bind(this), this.and = this.and.bind(this), this.transform = this.transform.bind(this), this.brand = this.brand.bind(this), this.default = this.default.bind(this), this.catch = this.catch.bind(this), this.describe = this.describe.bind(this), this.pipe = this.pipe.bind(this), this.readonly = this.readonly.bind(this), this.isNullable = this.isNullable.bind(this), this.isOptional = this.isOptional.bind(this), this["~standard"] = { version: 1, vendor: "zod", validate: (e11) => this["~validate"](e11) };
    }
    optional() {
      return eA.create(this, this._def);
    }
    nullable() {
      return eO.create(this, this._def);
    }
    nullish() {
      return this.nullable().optional();
    }
    array() {
      return eh.create(this);
    }
    promise() {
      return eN.create(this, this._def);
    }
    or(e10) {
      return ef.create([this, e10], this._def);
    }
    and(e10) {
      return eb.create(this, e10, this._def);
    }
    transform(e10) {
      return new eI({ ...L(this._def), schema: this, typeName: c.ZodEffects, effect: { type: "transform", transform: e10 } });
    }
    default(e10) {
      return new eR({ ...L(this._def), innerType: this, defaultValue: "function" == typeof e10 ? e10 : () => e10, typeName: c.ZodDefault });
    }
    brand() {
      return new eZ({ typeName: c.ZodBranded, type: this, ...L(this._def) });
    }
    catch(e10) {
      return new eD({ ...L(this._def), innerType: this, catchValue: "function" == typeof e10 ? e10 : () => e10, typeName: c.ZodCatch });
    }
    describe(e10) {
      return new this.constructor({ ...this._def, description: e10 });
    }
    pipe(e10) {
      return eU.create(this, e10);
    }
    readonly() {
      return eP.create(this);
    }
    isOptional() {
      return this.safeParse(void 0).success;
    }
    isNullable() {
      return this.safeParse(null).success;
    }
  }
  let Z = /^c[^\s-]{8,}$/i, U = /^[0-9a-z]+$/, P = /^[0-9A-HJKMNP-TV-Z]{26}$/i, Y = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i, $ = /^[a-z0-9_-]{21}$/i, z = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/, F = /^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/, q = /^(?!\.)(?!.*\.\.)([A-Z0-9_'+\-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i, W = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/, H = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/(3[0-2]|[12]?[0-9])$/, B = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/, V = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/, K = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/, G = /^([0-9a-zA-Z-_]{4})*(([0-9a-zA-Z-_]{2}(==)?)|([0-9a-zA-Z-_]{3}(=)?))?$/, X = "((\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-((0[13578]|1[02])-(0[1-9]|[12]\\d|3[01])|(0[469]|11)-(0[1-9]|[12]\\d|30)|(02)-(0[1-9]|1\\d|2[0-8])))", J = RegExp(`^${X}$`);
  function Q(e10) {
    let t10 = "[0-5]\\d";
    e10.precision ? t10 = `${t10}\\.\\d{${e10.precision}}` : null == e10.precision && (t10 = `${t10}(\\.\\d+)?`);
    let n10 = e10.precision ? "+" : "?";
    return `([01]\\d|2[0-3]):[0-5]\\d(:${t10})${n10}`;
  }
  function ee(e10) {
    let t10 = `${X}T${Q(e10)}`, n10 = [];
    return n10.push(e10.local ? "Z?" : "Z"), e10.offset && n10.push("([+-]\\d{2}:?\\d{2})"), t10 = `${t10}(${n10.join("|")})`, RegExp(`^${t10}$`);
  }
  class et extends M {
    _parse(e10) {
      var n10, r10, a10, i10;
      let s10;
      if (this._def.coerce && (e10.data = String(e10.data)), this._getType(e10) !== h.string) {
        let t10 = this._getOrReturnCtx(e10);
        return j(t10, { code: f.invalid_type, expected: h.string, received: t10.parsedType }), T;
      }
      let l2 = new E();
      for (let d2 of this._def.checks) if ("min" === d2.kind) e10.data.length < d2.value && (j(s10 = this._getOrReturnCtx(e10, s10), { code: f.too_small, minimum: d2.value, type: "string", inclusive: true, exact: false, message: d2.message }), l2.dirty());
      else if ("max" === d2.kind) e10.data.length > d2.value && (j(s10 = this._getOrReturnCtx(e10, s10), { code: f.too_big, maximum: d2.value, type: "string", inclusive: true, exact: false, message: d2.message }), l2.dirty());
      else if ("length" === d2.kind) {
        let t10 = e10.data.length > d2.value, n11 = e10.data.length < d2.value;
        (t10 || n11) && (s10 = this._getOrReturnCtx(e10, s10), t10 ? j(s10, { code: f.too_big, maximum: d2.value, type: "string", inclusive: true, exact: true, message: d2.message }) : n11 && j(s10, { code: f.too_small, minimum: d2.value, type: "string", inclusive: true, exact: true, message: d2.message }), l2.dirty());
      } else if ("email" === d2.kind) q.test(e10.data) || (j(s10 = this._getOrReturnCtx(e10, s10), { validation: "email", code: f.invalid_string, message: d2.message }), l2.dirty());
      else if ("emoji" === d2.kind) t || (t = RegExp("^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$", "u")), t.test(e10.data) || (j(s10 = this._getOrReturnCtx(e10, s10), { validation: "emoji", code: f.invalid_string, message: d2.message }), l2.dirty());
      else if ("uuid" === d2.kind) Y.test(e10.data) || (j(s10 = this._getOrReturnCtx(e10, s10), { validation: "uuid", code: f.invalid_string, message: d2.message }), l2.dirty());
      else if ("nanoid" === d2.kind) $.test(e10.data) || (j(s10 = this._getOrReturnCtx(e10, s10), { validation: "nanoid", code: f.invalid_string, message: d2.message }), l2.dirty());
      else if ("cuid" === d2.kind) Z.test(e10.data) || (j(s10 = this._getOrReturnCtx(e10, s10), { validation: "cuid", code: f.invalid_string, message: d2.message }), l2.dirty());
      else if ("cuid2" === d2.kind) U.test(e10.data) || (j(s10 = this._getOrReturnCtx(e10, s10), { validation: "cuid2", code: f.invalid_string, message: d2.message }), l2.dirty());
      else if ("ulid" === d2.kind) P.test(e10.data) || (j(s10 = this._getOrReturnCtx(e10, s10), { validation: "ulid", code: f.invalid_string, message: d2.message }), l2.dirty());
      else if ("url" === d2.kind) try {
        new URL(e10.data);
      } catch {
        j(s10 = this._getOrReturnCtx(e10, s10), { validation: "url", code: f.invalid_string, message: d2.message }), l2.dirty();
      }
      else "regex" === d2.kind ? (d2.regex.lastIndex = 0, d2.regex.test(e10.data) || (j(s10 = this._getOrReturnCtx(e10, s10), { validation: "regex", code: f.invalid_string, message: d2.message }), l2.dirty())) : "trim" === d2.kind ? e10.data = e10.data.trim() : "includes" === d2.kind ? e10.data.includes(d2.value, d2.position) || (j(s10 = this._getOrReturnCtx(e10, s10), { code: f.invalid_string, validation: { includes: d2.value, position: d2.position }, message: d2.message }), l2.dirty()) : "toLowerCase" === d2.kind ? e10.data = e10.data.toLowerCase() : "toUpperCase" === d2.kind ? e10.data = e10.data.toUpperCase() : "startsWith" === d2.kind ? e10.data.startsWith(d2.value) || (j(s10 = this._getOrReturnCtx(e10, s10), { code: f.invalid_string, validation: { startsWith: d2.value }, message: d2.message }), l2.dirty()) : "endsWith" === d2.kind ? e10.data.endsWith(d2.value) || (j(s10 = this._getOrReturnCtx(e10, s10), { code: f.invalid_string, validation: { endsWith: d2.value }, message: d2.message }), l2.dirty()) : "datetime" === d2.kind ? ee(d2).test(e10.data) || (j(s10 = this._getOrReturnCtx(e10, s10), { code: f.invalid_string, validation: "datetime", message: d2.message }), l2.dirty()) : "date" === d2.kind ? J.test(e10.data) || (j(s10 = this._getOrReturnCtx(e10, s10), { code: f.invalid_string, validation: "date", message: d2.message }), l2.dirty()) : "time" === d2.kind ? RegExp(`^${Q(d2)}$`).test(e10.data) || (j(s10 = this._getOrReturnCtx(e10, s10), { code: f.invalid_string, validation: "time", message: d2.message }), l2.dirty()) : "duration" === d2.kind ? F.test(e10.data) || (j(s10 = this._getOrReturnCtx(e10, s10), { validation: "duration", code: f.invalid_string, message: d2.message }), l2.dirty()) : "ip" === d2.kind ? (n10 = e10.data, !(("v4" === (r10 = d2.version) || !r10) && W.test(n10) || ("v6" === r10 || !r10) && B.test(n10)) && 1 && (j(s10 = this._getOrReturnCtx(e10, s10), { validation: "ip", code: f.invalid_string, message: d2.message }), l2.dirty())) : "jwt" === d2.kind ? !function(e11, t10) {
        if (!z.test(e11)) return false;
        try {
          let [n11] = e11.split(".");
          if (!n11) return false;
          let r11 = n11.replace(/-/g, "+").replace(/_/g, "/").padEnd(n11.length + (4 - n11.length % 4) % 4, "="), a11 = JSON.parse(atob(r11));
          if ("object" != typeof a11 || null === a11 || "typ" in a11 && a11?.typ !== "JWT" || !a11.alg || t10 && a11.alg !== t10) return false;
          return true;
        } catch {
          return false;
        }
      }(e10.data, d2.alg) && (j(s10 = this._getOrReturnCtx(e10, s10), { validation: "jwt", code: f.invalid_string, message: d2.message }), l2.dirty()) : "cidr" === d2.kind ? (a10 = e10.data, !(("v4" === (i10 = d2.version) || !i10) && H.test(a10) || ("v6" === i10 || !i10) && V.test(a10)) && 1 && (j(s10 = this._getOrReturnCtx(e10, s10), { validation: "cidr", code: f.invalid_string, message: d2.message }), l2.dirty())) : "base64" === d2.kind ? K.test(e10.data) || (j(s10 = this._getOrReturnCtx(e10, s10), { validation: "base64", code: f.invalid_string, message: d2.message }), l2.dirty()) : "base64url" === d2.kind ? G.test(e10.data) || (j(s10 = this._getOrReturnCtx(e10, s10), { validation: "base64url", code: f.invalid_string, message: d2.message }), l2.dirty()) : o.assertNever(d2);
      return { status: l2.value, value: e10.data };
    }
    _regex(e10, t10, n10) {
      return this.refinement((t11) => e10.test(t11), { validation: t10, code: f.invalid_string, ...d.errToObj(n10) });
    }
    _addCheck(e10) {
      return new et({ ...this._def, checks: [...this._def.checks, e10] });
    }
    email(e10) {
      return this._addCheck({ kind: "email", ...d.errToObj(e10) });
    }
    url(e10) {
      return this._addCheck({ kind: "url", ...d.errToObj(e10) });
    }
    emoji(e10) {
      return this._addCheck({ kind: "emoji", ...d.errToObj(e10) });
    }
    uuid(e10) {
      return this._addCheck({ kind: "uuid", ...d.errToObj(e10) });
    }
    nanoid(e10) {
      return this._addCheck({ kind: "nanoid", ...d.errToObj(e10) });
    }
    cuid(e10) {
      return this._addCheck({ kind: "cuid", ...d.errToObj(e10) });
    }
    cuid2(e10) {
      return this._addCheck({ kind: "cuid2", ...d.errToObj(e10) });
    }
    ulid(e10) {
      return this._addCheck({ kind: "ulid", ...d.errToObj(e10) });
    }
    base64(e10) {
      return this._addCheck({ kind: "base64", ...d.errToObj(e10) });
    }
    base64url(e10) {
      return this._addCheck({ kind: "base64url", ...d.errToObj(e10) });
    }
    jwt(e10) {
      return this._addCheck({ kind: "jwt", ...d.errToObj(e10) });
    }
    ip(e10) {
      return this._addCheck({ kind: "ip", ...d.errToObj(e10) });
    }
    cidr(e10) {
      return this._addCheck({ kind: "cidr", ...d.errToObj(e10) });
    }
    datetime(e10) {
      return "string" == typeof e10 ? this._addCheck({ kind: "datetime", precision: null, offset: false, local: false, message: e10 }) : this._addCheck({ kind: "datetime", precision: void 0 === e10?.precision ? null : e10?.precision, offset: e10?.offset ?? false, local: e10?.local ?? false, ...d.errToObj(e10?.message) });
    }
    date(e10) {
      return this._addCheck({ kind: "date", message: e10 });
    }
    time(e10) {
      return "string" == typeof e10 ? this._addCheck({ kind: "time", precision: null, message: e10 }) : this._addCheck({ kind: "time", precision: void 0 === e10?.precision ? null : e10?.precision, ...d.errToObj(e10?.message) });
    }
    duration(e10) {
      return this._addCheck({ kind: "duration", ...d.errToObj(e10) });
    }
    regex(e10, t10) {
      return this._addCheck({ kind: "regex", regex: e10, ...d.errToObj(t10) });
    }
    includes(e10, t10) {
      return this._addCheck({ kind: "includes", value: e10, position: t10?.position, ...d.errToObj(t10?.message) });
    }
    startsWith(e10, t10) {
      return this._addCheck({ kind: "startsWith", value: e10, ...d.errToObj(t10) });
    }
    endsWith(e10, t10) {
      return this._addCheck({ kind: "endsWith", value: e10, ...d.errToObj(t10) });
    }
    min(e10, t10) {
      return this._addCheck({ kind: "min", value: e10, ...d.errToObj(t10) });
    }
    max(e10, t10) {
      return this._addCheck({ kind: "max", value: e10, ...d.errToObj(t10) });
    }
    length(e10, t10) {
      return this._addCheck({ kind: "length", value: e10, ...d.errToObj(t10) });
    }
    nonempty(e10) {
      return this.min(1, d.errToObj(e10));
    }
    trim() {
      return new et({ ...this._def, checks: [...this._def.checks, { kind: "trim" }] });
    }
    toLowerCase() {
      return new et({ ...this._def, checks: [...this._def.checks, { kind: "toLowerCase" }] });
    }
    toUpperCase() {
      return new et({ ...this._def, checks: [...this._def.checks, { kind: "toUpperCase" }] });
    }
    get isDatetime() {
      return !!this._def.checks.find((e10) => "datetime" === e10.kind);
    }
    get isDate() {
      return !!this._def.checks.find((e10) => "date" === e10.kind);
    }
    get isTime() {
      return !!this._def.checks.find((e10) => "time" === e10.kind);
    }
    get isDuration() {
      return !!this._def.checks.find((e10) => "duration" === e10.kind);
    }
    get isEmail() {
      return !!this._def.checks.find((e10) => "email" === e10.kind);
    }
    get isURL() {
      return !!this._def.checks.find((e10) => "url" === e10.kind);
    }
    get isEmoji() {
      return !!this._def.checks.find((e10) => "emoji" === e10.kind);
    }
    get isUUID() {
      return !!this._def.checks.find((e10) => "uuid" === e10.kind);
    }
    get isNANOID() {
      return !!this._def.checks.find((e10) => "nanoid" === e10.kind);
    }
    get isCUID() {
      return !!this._def.checks.find((e10) => "cuid" === e10.kind);
    }
    get isCUID2() {
      return !!this._def.checks.find((e10) => "cuid2" === e10.kind);
    }
    get isULID() {
      return !!this._def.checks.find((e10) => "ulid" === e10.kind);
    }
    get isIP() {
      return !!this._def.checks.find((e10) => "ip" === e10.kind);
    }
    get isCIDR() {
      return !!this._def.checks.find((e10) => "cidr" === e10.kind);
    }
    get isBase64() {
      return !!this._def.checks.find((e10) => "base64" === e10.kind);
    }
    get isBase64url() {
      return !!this._def.checks.find((e10) => "base64url" === e10.kind);
    }
    get minLength() {
      let e10 = null;
      for (let t10 of this._def.checks) "min" === t10.kind && (null === e10 || t10.value > e10) && (e10 = t10.value);
      return e10;
    }
    get maxLength() {
      let e10 = null;
      for (let t10 of this._def.checks) "max" === t10.kind && (null === e10 || t10.value < e10) && (e10 = t10.value);
      return e10;
    }
  }
  et.create = (e10) => new et({ checks: [], typeName: c.ZodString, coerce: e10?.coerce ?? false, ...L(e10) });
  class en extends M {
    constructor() {
      super(...arguments), this.min = this.gte, this.max = this.lte, this.step = this.multipleOf;
    }
    _parse(e10) {
      let t10;
      if (this._def.coerce && (e10.data = Number(e10.data)), this._getType(e10) !== h.number) {
        let t11 = this._getOrReturnCtx(e10);
        return j(t11, { code: f.invalid_type, expected: h.number, received: t11.parsedType }), T;
      }
      let n10 = new E();
      for (let r10 of this._def.checks) "int" === r10.kind ? o.isInteger(e10.data) || (j(t10 = this._getOrReturnCtx(e10, t10), { code: f.invalid_type, expected: "integer", received: "float", message: r10.message }), n10.dirty()) : "min" === r10.kind ? (r10.inclusive ? e10.data < r10.value : e10.data <= r10.value) && (j(t10 = this._getOrReturnCtx(e10, t10), { code: f.too_small, minimum: r10.value, type: "number", inclusive: r10.inclusive, exact: false, message: r10.message }), n10.dirty()) : "max" === r10.kind ? (r10.inclusive ? e10.data > r10.value : e10.data >= r10.value) && (j(t10 = this._getOrReturnCtx(e10, t10), { code: f.too_big, maximum: r10.value, type: "number", inclusive: r10.inclusive, exact: false, message: r10.message }), n10.dirty()) : "multipleOf" === r10.kind ? 0 !== function(e11, t11) {
        let n11 = (e11.toString().split(".")[1] || "").length, r11 = (t11.toString().split(".")[1] || "").length, a10 = n11 > r11 ? n11 : r11;
        return Number.parseInt(e11.toFixed(a10).replace(".", "")) % Number.parseInt(t11.toFixed(a10).replace(".", "")) / 10 ** a10;
      }(e10.data, r10.value) && (j(t10 = this._getOrReturnCtx(e10, t10), { code: f.not_multiple_of, multipleOf: r10.value, message: r10.message }), n10.dirty()) : "finite" === r10.kind ? Number.isFinite(e10.data) || (j(t10 = this._getOrReturnCtx(e10, t10), { code: f.not_finite, message: r10.message }), n10.dirty()) : o.assertNever(r10);
      return { status: n10.value, value: e10.data };
    }
    gte(e10, t10) {
      return this.setLimit("min", e10, true, d.toString(t10));
    }
    gt(e10, t10) {
      return this.setLimit("min", e10, false, d.toString(t10));
    }
    lte(e10, t10) {
      return this.setLimit("max", e10, true, d.toString(t10));
    }
    lt(e10, t10) {
      return this.setLimit("max", e10, false, d.toString(t10));
    }
    setLimit(e10, t10, n10, r10) {
      return new en({ ...this._def, checks: [...this._def.checks, { kind: e10, value: t10, inclusive: n10, message: d.toString(r10) }] });
    }
    _addCheck(e10) {
      return new en({ ...this._def, checks: [...this._def.checks, e10] });
    }
    int(e10) {
      return this._addCheck({ kind: "int", message: d.toString(e10) });
    }
    positive(e10) {
      return this._addCheck({ kind: "min", value: 0, inclusive: false, message: d.toString(e10) });
    }
    negative(e10) {
      return this._addCheck({ kind: "max", value: 0, inclusive: false, message: d.toString(e10) });
    }
    nonpositive(e10) {
      return this._addCheck({ kind: "max", value: 0, inclusive: true, message: d.toString(e10) });
    }
    nonnegative(e10) {
      return this._addCheck({ kind: "min", value: 0, inclusive: true, message: d.toString(e10) });
    }
    multipleOf(e10, t10) {
      return this._addCheck({ kind: "multipleOf", value: e10, message: d.toString(t10) });
    }
    finite(e10) {
      return this._addCheck({ kind: "finite", message: d.toString(e10) });
    }
    safe(e10) {
      return this._addCheck({ kind: "min", inclusive: true, value: Number.MIN_SAFE_INTEGER, message: d.toString(e10) })._addCheck({ kind: "max", inclusive: true, value: Number.MAX_SAFE_INTEGER, message: d.toString(e10) });
    }
    get minValue() {
      let e10 = null;
      for (let t10 of this._def.checks) "min" === t10.kind && (null === e10 || t10.value > e10) && (e10 = t10.value);
      return e10;
    }
    get maxValue() {
      let e10 = null;
      for (let t10 of this._def.checks) "max" === t10.kind && (null === e10 || t10.value < e10) && (e10 = t10.value);
      return e10;
    }
    get isInt() {
      return !!this._def.checks.find((e10) => "int" === e10.kind || "multipleOf" === e10.kind && o.isInteger(e10.value));
    }
    get isFinite() {
      let e10 = null, t10 = null;
      for (let n10 of this._def.checks) if ("finite" === n10.kind || "int" === n10.kind || "multipleOf" === n10.kind) return true;
      else "min" === n10.kind ? (null === t10 || n10.value > t10) && (t10 = n10.value) : "max" === n10.kind && (null === e10 || n10.value < e10) && (e10 = n10.value);
      return Number.isFinite(t10) && Number.isFinite(e10);
    }
  }
  en.create = (e10) => new en({ checks: [], typeName: c.ZodNumber, coerce: e10?.coerce || false, ...L(e10) });
  class er extends M {
    constructor() {
      super(...arguments), this.min = this.gte, this.max = this.lte;
    }
    _parse(e10) {
      let t10;
      if (this._def.coerce) try {
        e10.data = BigInt(e10.data);
      } catch {
        return this._getInvalidInput(e10);
      }
      if (this._getType(e10) !== h.bigint) return this._getInvalidInput(e10);
      let n10 = new E();
      for (let r10 of this._def.checks) "min" === r10.kind ? (r10.inclusive ? e10.data < r10.value : e10.data <= r10.value) && (j(t10 = this._getOrReturnCtx(e10, t10), { code: f.too_small, type: "bigint", minimum: r10.value, inclusive: r10.inclusive, message: r10.message }), n10.dirty()) : "max" === r10.kind ? (r10.inclusive ? e10.data > r10.value : e10.data >= r10.value) && (j(t10 = this._getOrReturnCtx(e10, t10), { code: f.too_big, type: "bigint", maximum: r10.value, inclusive: r10.inclusive, message: r10.message }), n10.dirty()) : "multipleOf" === r10.kind ? e10.data % r10.value !== BigInt(0) && (j(t10 = this._getOrReturnCtx(e10, t10), { code: f.not_multiple_of, multipleOf: r10.value, message: r10.message }), n10.dirty()) : o.assertNever(r10);
      return { status: n10.value, value: e10.data };
    }
    _getInvalidInput(e10) {
      let t10 = this._getOrReturnCtx(e10);
      return j(t10, { code: f.invalid_type, expected: h.bigint, received: t10.parsedType }), T;
    }
    gte(e10, t10) {
      return this.setLimit("min", e10, true, d.toString(t10));
    }
    gt(e10, t10) {
      return this.setLimit("min", e10, false, d.toString(t10));
    }
    lte(e10, t10) {
      return this.setLimit("max", e10, true, d.toString(t10));
    }
    lt(e10, t10) {
      return this.setLimit("max", e10, false, d.toString(t10));
    }
    setLimit(e10, t10, n10, r10) {
      return new er({ ...this._def, checks: [...this._def.checks, { kind: e10, value: t10, inclusive: n10, message: d.toString(r10) }] });
    }
    _addCheck(e10) {
      return new er({ ...this._def, checks: [...this._def.checks, e10] });
    }
    positive(e10) {
      return this._addCheck({ kind: "min", value: BigInt(0), inclusive: false, message: d.toString(e10) });
    }
    negative(e10) {
      return this._addCheck({ kind: "max", value: BigInt(0), inclusive: false, message: d.toString(e10) });
    }
    nonpositive(e10) {
      return this._addCheck({ kind: "max", value: BigInt(0), inclusive: true, message: d.toString(e10) });
    }
    nonnegative(e10) {
      return this._addCheck({ kind: "min", value: BigInt(0), inclusive: true, message: d.toString(e10) });
    }
    multipleOf(e10, t10) {
      return this._addCheck({ kind: "multipleOf", value: e10, message: d.toString(t10) });
    }
    get minValue() {
      let e10 = null;
      for (let t10 of this._def.checks) "min" === t10.kind && (null === e10 || t10.value > e10) && (e10 = t10.value);
      return e10;
    }
    get maxValue() {
      let e10 = null;
      for (let t10 of this._def.checks) "max" === t10.kind && (null === e10 || t10.value < e10) && (e10 = t10.value);
      return e10;
    }
  }
  er.create = (e10) => new er({ checks: [], typeName: c.ZodBigInt, coerce: e10?.coerce ?? false, ...L(e10) });
  class ea extends M {
    _parse(e10) {
      if (this._def.coerce && (e10.data = !!e10.data), this._getType(e10) !== h.boolean) {
        let t10 = this._getOrReturnCtx(e10);
        return j(t10, { code: f.invalid_type, expected: h.boolean, received: t10.parsedType }), T;
      }
      return S(e10.data);
    }
  }
  ea.create = (e10) => new ea({ typeName: c.ZodBoolean, coerce: e10?.coerce || false, ...L(e10) });
  class ei extends M {
    _parse(e10) {
      let t10;
      if (this._def.coerce && (e10.data = new Date(e10.data)), this._getType(e10) !== h.date) {
        let t11 = this._getOrReturnCtx(e10);
        return j(t11, { code: f.invalid_type, expected: h.date, received: t11.parsedType }), T;
      }
      if (Number.isNaN(e10.data.getTime())) return j(this._getOrReturnCtx(e10), { code: f.invalid_date }), T;
      let n10 = new E();
      for (let r10 of this._def.checks) "min" === r10.kind ? e10.data.getTime() < r10.value && (j(t10 = this._getOrReturnCtx(e10, t10), { code: f.too_small, message: r10.message, inclusive: true, exact: false, minimum: r10.value, type: "date" }), n10.dirty()) : "max" === r10.kind ? e10.data.getTime() > r10.value && (j(t10 = this._getOrReturnCtx(e10, t10), { code: f.too_big, message: r10.message, inclusive: true, exact: false, maximum: r10.value, type: "date" }), n10.dirty()) : o.assertNever(r10);
      return { status: n10.value, value: new Date(e10.data.getTime()) };
    }
    _addCheck(e10) {
      return new ei({ ...this._def, checks: [...this._def.checks, e10] });
    }
    min(e10, t10) {
      return this._addCheck({ kind: "min", value: e10.getTime(), message: d.toString(t10) });
    }
    max(e10, t10) {
      return this._addCheck({ kind: "max", value: e10.getTime(), message: d.toString(t10) });
    }
    get minDate() {
      let e10 = null;
      for (let t10 of this._def.checks) "min" === t10.kind && (null === e10 || t10.value > e10) && (e10 = t10.value);
      return null != e10 ? new Date(e10) : null;
    }
    get maxDate() {
      let e10 = null;
      for (let t10 of this._def.checks) "max" === t10.kind && (null === e10 || t10.value < e10) && (e10 = t10.value);
      return null != e10 ? new Date(e10) : null;
    }
  }
  ei.create = (e10) => new ei({ checks: [], coerce: e10?.coerce || false, typeName: c.ZodDate, ...L(e10) });
  class es extends M {
    _parse(e10) {
      if (this._getType(e10) !== h.symbol) {
        let t10 = this._getOrReturnCtx(e10);
        return j(t10, { code: f.invalid_type, expected: h.symbol, received: t10.parsedType }), T;
      }
      return S(e10.data);
    }
  }
  es.create = (e10) => new es({ typeName: c.ZodSymbol, ...L(e10) });
  class eo extends M {
    _parse(e10) {
      if (this._getType(e10) !== h.undefined) {
        let t10 = this._getOrReturnCtx(e10);
        return j(t10, { code: f.invalid_type, expected: h.undefined, received: t10.parsedType }), T;
      }
      return S(e10.data);
    }
  }
  eo.create = (e10) => new eo({ typeName: c.ZodUndefined, ...L(e10) });
  class el extends M {
    _parse(e10) {
      if (this._getType(e10) !== h.null) {
        let t10 = this._getOrReturnCtx(e10);
        return j(t10, { code: f.invalid_type, expected: h.null, received: t10.parsedType }), T;
      }
      return S(e10.data);
    }
  }
  el.create = (e10) => new el({ typeName: c.ZodNull, ...L(e10) });
  class ed extends M {
    constructor() {
      super(...arguments), this._any = true;
    }
    _parse(e10) {
      return S(e10.data);
    }
  }
  ed.create = (e10) => new ed({ typeName: c.ZodAny, ...L(e10) });
  class ec extends M {
    constructor() {
      super(...arguments), this._unknown = true;
    }
    _parse(e10) {
      return S(e10.data);
    }
  }
  ec.create = (e10) => new ec({ typeName: c.ZodUnknown, ...L(e10) });
  class eu extends M {
    _parse(e10) {
      let t10 = this._getOrReturnCtx(e10);
      return j(t10, { code: f.invalid_type, expected: h.never, received: t10.parsedType }), T;
    }
  }
  eu.create = (e10) => new eu({ typeName: c.ZodNever, ...L(e10) });
  class ep extends M {
    _parse(e10) {
      if (this._getType(e10) !== h.undefined) {
        let t10 = this._getOrReturnCtx(e10);
        return j(t10, { code: f.invalid_type, expected: h.void, received: t10.parsedType }), T;
      }
      return S(e10.data);
    }
  }
  ep.create = (e10) => new ep({ typeName: c.ZodVoid, ...L(e10) });
  class eh extends M {
    _parse(e10) {
      let { ctx: t10, status: n10 } = this._processInputParams(e10), r10 = this._def;
      if (t10.parsedType !== h.array) return j(t10, { code: f.invalid_type, expected: h.array, received: t10.parsedType }), T;
      if (null !== r10.exactLength) {
        let e11 = t10.data.length > r10.exactLength.value, a11 = t10.data.length < r10.exactLength.value;
        (e11 || a11) && (j(t10, { code: e11 ? f.too_big : f.too_small, minimum: a11 ? r10.exactLength.value : void 0, maximum: e11 ? r10.exactLength.value : void 0, type: "array", inclusive: true, exact: true, message: r10.exactLength.message }), n10.dirty());
      }
      if (null !== r10.minLength && t10.data.length < r10.minLength.value && (j(t10, { code: f.too_small, minimum: r10.minLength.value, type: "array", inclusive: true, exact: false, message: r10.minLength.message }), n10.dirty()), null !== r10.maxLength && t10.data.length > r10.maxLength.value && (j(t10, { code: f.too_big, maximum: r10.maxLength.value, type: "array", inclusive: true, exact: false, message: r10.maxLength.message }), n10.dirty()), t10.common.async) return Promise.all([...t10.data].map((e11, n11) => r10.type._parseAsync(new R(t10, e11, t10.path, n11)))).then((e11) => E.mergeArray(n10, e11));
      let a10 = [...t10.data].map((e11, n11) => r10.type._parseSync(new R(t10, e11, t10.path, n11)));
      return E.mergeArray(n10, a10);
    }
    get element() {
      return this._def.type;
    }
    min(e10, t10) {
      return new eh({ ...this._def, minLength: { value: e10, message: d.toString(t10) } });
    }
    max(e10, t10) {
      return new eh({ ...this._def, maxLength: { value: e10, message: d.toString(t10) } });
    }
    length(e10, t10) {
      return new eh({ ...this._def, exactLength: { value: e10, message: d.toString(t10) } });
    }
    nonempty(e10) {
      return this.min(1, e10);
    }
  }
  eh.create = (e10, t10) => new eh({ type: e10, minLength: null, maxLength: null, exactLength: null, typeName: c.ZodArray, ...L(t10) });
  class em extends M {
    constructor() {
      super(...arguments), this._cached = null, this.nonstrict = this.passthrough, this.augment = this.extend;
    }
    _getCached() {
      if (null !== this._cached) return this._cached;
      let e10 = this._def.shape(), t10 = o.objectKeys(e10);
      return this._cached = { shape: e10, keys: t10 }, this._cached;
    }
    _parse(e10) {
      if (this._getType(e10) !== h.object) {
        let t11 = this._getOrReturnCtx(e10);
        return j(t11, { code: f.invalid_type, expected: h.object, received: t11.parsedType }), T;
      }
      let { status: t10, ctx: n10 } = this._processInputParams(e10), { shape: r10, keys: a10 } = this._getCached(), i10 = [];
      if (!(this._def.catchall instanceof eu && "strip" === this._def.unknownKeys)) for (let e11 in n10.data) a10.includes(e11) || i10.push(e11);
      let s10 = [];
      for (let e11 of a10) {
        let t11 = r10[e11], a11 = n10.data[e11];
        s10.push({ key: { status: "valid", value: e11 }, value: t11._parse(new R(n10, a11, n10.path, e11)), alwaysSet: e11 in n10.data });
      }
      if (this._def.catchall instanceof eu) {
        let e11 = this._def.unknownKeys;
        if ("passthrough" === e11) for (let e12 of i10) s10.push({ key: { status: "valid", value: e12 }, value: { status: "valid", value: n10.data[e12] } });
        else if ("strict" === e11) i10.length > 0 && (j(n10, { code: f.unrecognized_keys, keys: i10 }), t10.dirty());
        else if ("strip" === e11) ;
        else throw Error("Internal ZodObject error: invalid unknownKeys value.");
      } else {
        let e11 = this._def.catchall;
        for (let t11 of i10) {
          let r11 = n10.data[t11];
          s10.push({ key: { status: "valid", value: t11 }, value: e11._parse(new R(n10, r11, n10.path, t11)), alwaysSet: t11 in n10.data });
        }
      }
      return n10.common.async ? Promise.resolve().then(async () => {
        let e11 = [];
        for (let t11 of s10) {
          let n11 = await t11.key, r11 = await t11.value;
          e11.push({ key: n11, value: r11, alwaysSet: t11.alwaysSet });
        }
        return e11;
      }).then((e11) => E.mergeObjectSync(t10, e11)) : E.mergeObjectSync(t10, s10);
    }
    get shape() {
      return this._def.shape();
    }
    strict(e10) {
      return d.errToObj, new em({ ...this._def, unknownKeys: "strict", ...void 0 !== e10 ? { errorMap: (t10, n10) => {
        let r10 = this._def.errorMap?.(t10, n10).message ?? n10.defaultError;
        return "unrecognized_keys" === t10.code ? { message: d.errToObj(e10).message ?? r10 } : { message: r10 };
      } } : {} });
    }
    strip() {
      return new em({ ...this._def, unknownKeys: "strip" });
    }
    passthrough() {
      return new em({ ...this._def, unknownKeys: "passthrough" });
    }
    extend(e10) {
      return new em({ ...this._def, shape: () => ({ ...this._def.shape(), ...e10 }) });
    }
    merge(e10) {
      return new em({ unknownKeys: e10._def.unknownKeys, catchall: e10._def.catchall, shape: () => ({ ...this._def.shape(), ...e10._def.shape() }), typeName: c.ZodObject });
    }
    setKey(e10, t10) {
      return this.augment({ [e10]: t10 });
    }
    catchall(e10) {
      return new em({ ...this._def, catchall: e10 });
    }
    pick(e10) {
      let t10 = {};
      for (let n10 of o.objectKeys(e10)) e10[n10] && this.shape[n10] && (t10[n10] = this.shape[n10]);
      return new em({ ...this._def, shape: () => t10 });
    }
    omit(e10) {
      let t10 = {};
      for (let n10 of o.objectKeys(this.shape)) e10[n10] || (t10[n10] = this.shape[n10]);
      return new em({ ...this._def, shape: () => t10 });
    }
    deepPartial() {
      return function e10(t10) {
        if (t10 instanceof em) {
          let n10 = {};
          for (let r10 in t10.shape) {
            let a10 = t10.shape[r10];
            n10[r10] = eA.create(e10(a10));
          }
          return new em({ ...t10._def, shape: () => n10 });
        }
        if (t10 instanceof eh) return new eh({ ...t10._def, type: e10(t10.element) });
        if (t10 instanceof eA) return eA.create(e10(t10.unwrap()));
        if (t10 instanceof eO) return eO.create(e10(t10.unwrap()));
        if (t10 instanceof ev) return ev.create(t10.items.map((t11) => e10(t11)));
        else return t10;
      }(this);
    }
    partial(e10) {
      let t10 = {};
      for (let n10 of o.objectKeys(this.shape)) {
        let r10 = this.shape[n10];
        e10 && !e10[n10] ? t10[n10] = r10 : t10[n10] = r10.optional();
      }
      return new em({ ...this._def, shape: () => t10 });
    }
    required(e10) {
      let t10 = {};
      for (let n10 of o.objectKeys(this.shape)) if (e10 && !e10[n10]) t10[n10] = this.shape[n10];
      else {
        let e11 = this.shape[n10];
        for (; e11 instanceof eA; ) e11 = e11._def.innerType;
        t10[n10] = e11;
      }
      return new em({ ...this._def, shape: () => t10 });
    }
    keyof() {
      return eT(o.objectKeys(this.shape));
    }
  }
  em.create = (e10, t10) => new em({ shape: () => e10, unknownKeys: "strip", catchall: eu.create(), typeName: c.ZodObject, ...L(t10) }), em.strictCreate = (e10, t10) => new em({ shape: () => e10, unknownKeys: "strict", catchall: eu.create(), typeName: c.ZodObject, ...L(t10) }), em.lazycreate = (e10, t10) => new em({ shape: e10, unknownKeys: "strip", catchall: eu.create(), typeName: c.ZodObject, ...L(t10) });
  class ef extends M {
    _parse(e10) {
      let { ctx: t10 } = this._processInputParams(e10), n10 = this._def.options;
      if (t10.common.async) return Promise.all(n10.map(async (e11) => {
        let n11 = { ...t10, common: { ...t10.common, issues: [] }, parent: null };
        return { result: await e11._parseAsync({ data: t10.data, path: t10.path, parent: n11 }), ctx: n11 };
      })).then(function(e11) {
        for (let t11 of e11) if ("valid" === t11.result.status) return t11.result;
        for (let n12 of e11) if ("dirty" === n12.result.status) return t10.common.issues.push(...n12.ctx.common.issues), n12.result;
        let n11 = e11.map((e12) => new g(e12.ctx.common.issues));
        return j(t10, { code: f.invalid_union, unionErrors: n11 }), T;
      });
      {
        let e11, r10 = [];
        for (let a11 of n10) {
          let n11 = { ...t10, common: { ...t10.common, issues: [] }, parent: null }, i10 = a11._parseSync({ data: t10.data, path: t10.path, parent: n11 });
          if ("valid" === i10.status) return i10;
          "dirty" !== i10.status || e11 || (e11 = { result: i10, ctx: n11 }), n11.common.issues.length && r10.push(n11.common.issues);
        }
        if (e11) return t10.common.issues.push(...e11.ctx.common.issues), e11.result;
        let a10 = r10.map((e12) => new g(e12));
        return j(t10, { code: f.invalid_union, unionErrors: a10 }), T;
      }
    }
    get options() {
      return this._def.options;
    }
  }
  ef.create = (e10, t10) => new ef({ options: e10, typeName: c.ZodUnion, ...L(t10) });
  let ey = (e10) => {
    if (e10 instanceof ej) return ey(e10.schema);
    if (e10 instanceof eI) return ey(e10.innerType());
    if (e10 instanceof eE) return [e10.value];
    if (e10 instanceof eC) return e10.options;
    if (e10 instanceof eS) return o.objectValues(e10.enum);
    else if (e10 instanceof eR) return ey(e10._def.innerType);
    else if (e10 instanceof eo) return [void 0];
    else if (e10 instanceof el) return [null];
    else if (e10 instanceof eA) return [void 0, ...ey(e10.unwrap())];
    else if (e10 instanceof eO) return [null, ...ey(e10.unwrap())];
    else if (e10 instanceof eZ) return ey(e10.unwrap());
    else if (e10 instanceof eP) return ey(e10.unwrap());
    else if (e10 instanceof eD) return ey(e10._def.innerType);
    else return [];
  };
  class eg extends M {
    _parse(e10) {
      let { ctx: t10 } = this._processInputParams(e10);
      if (t10.parsedType !== h.object) return j(t10, { code: f.invalid_type, expected: h.object, received: t10.parsedType }), T;
      let n10 = this.discriminator, r10 = t10.data[n10], a10 = this.optionsMap.get(r10);
      return a10 ? t10.common.async ? a10._parseAsync({ data: t10.data, path: t10.path, parent: t10 }) : a10._parseSync({ data: t10.data, path: t10.path, parent: t10 }) : (j(t10, { code: f.invalid_union_discriminator, options: Array.from(this.optionsMap.keys()), path: [n10] }), T);
    }
    get discriminator() {
      return this._def.discriminator;
    }
    get options() {
      return this._def.options;
    }
    get optionsMap() {
      return this._def.optionsMap;
    }
    static create(e10, t10, n10) {
      let r10 = /* @__PURE__ */ new Map();
      for (let n11 of t10) {
        let t11 = ey(n11.shape[e10]);
        if (!t11.length) throw Error(`A discriminator value for key \`${e10}\` could not be extracted from all schema options`);
        for (let a10 of t11) {
          if (r10.has(a10)) throw Error(`Discriminator property ${String(e10)} has duplicate value ${String(a10)}`);
          r10.set(a10, n11);
        }
      }
      return new eg({ typeName: c.ZodDiscriminatedUnion, discriminator: e10, options: t10, optionsMap: r10, ...L(n10) });
    }
  }
  class eb extends M {
    _parse(e10) {
      let { status: t10, ctx: n10 } = this._processInputParams(e10), r10 = (e11, r11) => {
        if (N(e11) || N(r11)) return T;
        let a10 = function e12(t11, n11) {
          let r12 = m(t11), a11 = m(n11);
          if (t11 === n11) return { valid: true, data: t11 };
          if (r12 === h.object && a11 === h.object) {
            let r13 = o.objectKeys(n11), a12 = o.objectKeys(t11).filter((e13) => -1 !== r13.indexOf(e13)), i10 = { ...t11, ...n11 };
            for (let r14 of a12) {
              let a13 = e12(t11[r14], n11[r14]);
              if (!a13.valid) return { valid: false };
              i10[r14] = a13.data;
            }
            return { valid: true, data: i10 };
          }
          if (r12 === h.array && a11 === h.array) {
            if (t11.length !== n11.length) return { valid: false };
            let r13 = [];
            for (let a12 = 0; a12 < t11.length; a12++) {
              let i10 = e12(t11[a12], n11[a12]);
              if (!i10.valid) return { valid: false };
              r13.push(i10.data);
            }
            return { valid: true, data: r13 };
          }
          if (r12 === h.date && a11 === h.date && +t11 == +n11) return { valid: true, data: t11 };
          return { valid: false };
        }(e11.value, r11.value);
        return a10.valid ? ((I(e11) || I(r11)) && t10.dirty(), { status: t10.value, value: a10.data }) : (j(n10, { code: f.invalid_intersection_types }), T);
      };
      return n10.common.async ? Promise.all([this._def.left._parseAsync({ data: n10.data, path: n10.path, parent: n10 }), this._def.right._parseAsync({ data: n10.data, path: n10.path, parent: n10 })]).then(([e11, t11]) => r10(e11, t11)) : r10(this._def.left._parseSync({ data: n10.data, path: n10.path, parent: n10 }), this._def.right._parseSync({ data: n10.data, path: n10.path, parent: n10 }));
    }
  }
  eb.create = (e10, t10, n10) => new eb({ left: e10, right: t10, typeName: c.ZodIntersection, ...L(n10) });
  class ev extends M {
    _parse(e10) {
      let { status: t10, ctx: n10 } = this._processInputParams(e10);
      if (n10.parsedType !== h.array) return j(n10, { code: f.invalid_type, expected: h.array, received: n10.parsedType }), T;
      if (n10.data.length < this._def.items.length) return j(n10, { code: f.too_small, minimum: this._def.items.length, inclusive: true, exact: false, type: "array" }), T;
      !this._def.rest && n10.data.length > this._def.items.length && (j(n10, { code: f.too_big, maximum: this._def.items.length, inclusive: true, exact: false, type: "array" }), t10.dirty());
      let r10 = [...n10.data].map((e11, t11) => {
        let r11 = this._def.items[t11] || this._def.rest;
        return r11 ? r11._parse(new R(n10, e11, n10.path, t11)) : null;
      }).filter((e11) => !!e11);
      return n10.common.async ? Promise.all(r10).then((e11) => E.mergeArray(t10, e11)) : E.mergeArray(t10, r10);
    }
    get items() {
      return this._def.items;
    }
    rest(e10) {
      return new ev({ ...this._def, rest: e10 });
    }
  }
  ev.create = (e10, t10) => {
    if (!Array.isArray(e10)) throw Error("You must pass an array of schemas to z.tuple([ ... ])");
    return new ev({ items: e10, typeName: c.ZodTuple, rest: null, ...L(t10) });
  };
  class ex extends M {
    get keySchema() {
      return this._def.keyType;
    }
    get valueSchema() {
      return this._def.valueType;
    }
    _parse(e10) {
      let { status: t10, ctx: n10 } = this._processInputParams(e10);
      if (n10.parsedType !== h.object) return j(n10, { code: f.invalid_type, expected: h.object, received: n10.parsedType }), T;
      let r10 = [], a10 = this._def.keyType, i10 = this._def.valueType;
      for (let e11 in n10.data) r10.push({ key: a10._parse(new R(n10, e11, n10.path, e11)), value: i10._parse(new R(n10, n10.data[e11], n10.path, e11)), alwaysSet: e11 in n10.data });
      return n10.common.async ? E.mergeObjectAsync(t10, r10) : E.mergeObjectSync(t10, r10);
    }
    get element() {
      return this._def.valueType;
    }
    static create(e10, t10, n10) {
      return new ex(t10 instanceof M ? { keyType: e10, valueType: t10, typeName: c.ZodRecord, ...L(n10) } : { keyType: et.create(), valueType: e10, typeName: c.ZodRecord, ...L(t10) });
    }
  }
  class e_ extends M {
    get keySchema() {
      return this._def.keyType;
    }
    get valueSchema() {
      return this._def.valueType;
    }
    _parse(e10) {
      let { status: t10, ctx: n10 } = this._processInputParams(e10);
      if (n10.parsedType !== h.map) return j(n10, { code: f.invalid_type, expected: h.map, received: n10.parsedType }), T;
      let r10 = this._def.keyType, a10 = this._def.valueType, i10 = [...n10.data.entries()].map(([e11, t11], i11) => ({ key: r10._parse(new R(n10, e11, n10.path, [i11, "key"])), value: a10._parse(new R(n10, t11, n10.path, [i11, "value"])) }));
      if (n10.common.async) {
        let e11 = /* @__PURE__ */ new Map();
        return Promise.resolve().then(async () => {
          for (let n11 of i10) {
            let r11 = await n11.key, a11 = await n11.value;
            if ("aborted" === r11.status || "aborted" === a11.status) return T;
            ("dirty" === r11.status || "dirty" === a11.status) && t10.dirty(), e11.set(r11.value, a11.value);
          }
          return { status: t10.value, value: e11 };
        });
      }
      {
        let e11 = /* @__PURE__ */ new Map();
        for (let n11 of i10) {
          let r11 = n11.key, a11 = n11.value;
          if ("aborted" === r11.status || "aborted" === a11.status) return T;
          ("dirty" === r11.status || "dirty" === a11.status) && t10.dirty(), e11.set(r11.value, a11.value);
        }
        return { status: t10.value, value: e11 };
      }
    }
  }
  e_.create = (e10, t10, n10) => new e_({ valueType: t10, keyType: e10, typeName: c.ZodMap, ...L(n10) });
  class ek extends M {
    _parse(e10) {
      let { status: t10, ctx: n10 } = this._processInputParams(e10);
      if (n10.parsedType !== h.set) return j(n10, { code: f.invalid_type, expected: h.set, received: n10.parsedType }), T;
      let r10 = this._def;
      null !== r10.minSize && n10.data.size < r10.minSize.value && (j(n10, { code: f.too_small, minimum: r10.minSize.value, type: "set", inclusive: true, exact: false, message: r10.minSize.message }), t10.dirty()), null !== r10.maxSize && n10.data.size > r10.maxSize.value && (j(n10, { code: f.too_big, maximum: r10.maxSize.value, type: "set", inclusive: true, exact: false, message: r10.maxSize.message }), t10.dirty());
      let a10 = this._def.valueType;
      function i10(e11) {
        let n11 = /* @__PURE__ */ new Set();
        for (let r11 of e11) {
          if ("aborted" === r11.status) return T;
          "dirty" === r11.status && t10.dirty(), n11.add(r11.value);
        }
        return { status: t10.value, value: n11 };
      }
      let s10 = [...n10.data.values()].map((e11, t11) => a10._parse(new R(n10, e11, n10.path, t11)));
      return n10.common.async ? Promise.all(s10).then((e11) => i10(e11)) : i10(s10);
    }
    min(e10, t10) {
      return new ek({ ...this._def, minSize: { value: e10, message: d.toString(t10) } });
    }
    max(e10, t10) {
      return new ek({ ...this._def, maxSize: { value: e10, message: d.toString(t10) } });
    }
    size(e10, t10) {
      return this.min(e10, t10).max(e10, t10);
    }
    nonempty(e10) {
      return this.min(1, e10);
    }
  }
  ek.create = (e10, t10) => new ek({ valueType: e10, minSize: null, maxSize: null, typeName: c.ZodSet, ...L(t10) });
  class ew extends M {
    constructor() {
      super(...arguments), this.validate = this.implement;
    }
    _parse(e10) {
      let { ctx: t10 } = this._processInputParams(e10);
      if (t10.parsedType !== h.function) return j(t10, { code: f.invalid_type, expected: h.function, received: t10.parsedType }), T;
      function n10(e11, n11) {
        return k({ data: e11, path: t10.path, errorMaps: [t10.common.contextualErrorMap, t10.schemaErrorMap, _(), b].filter((e12) => !!e12), issueData: { code: f.invalid_arguments, argumentsError: n11 } });
      }
      function r10(e11, n11) {
        return k({ data: e11, path: t10.path, errorMaps: [t10.common.contextualErrorMap, t10.schemaErrorMap, _(), b].filter((e12) => !!e12), issueData: { code: f.invalid_return_type, returnTypeError: n11 } });
      }
      let a10 = { errorMap: t10.common.contextualErrorMap }, i10 = t10.data;
      if (this._def.returns instanceof eN) {
        let e11 = this;
        return S(async function(...t11) {
          let s10 = new g([]), o2 = await e11._def.args.parseAsync(t11, a10).catch((e12) => {
            throw s10.addIssue(n10(t11, e12)), s10;
          }), l2 = await Reflect.apply(i10, this, o2);
          return await e11._def.returns._def.type.parseAsync(l2, a10).catch((e12) => {
            throw s10.addIssue(r10(l2, e12)), s10;
          });
        });
      }
      {
        let e11 = this;
        return S(function(...t11) {
          let s10 = e11._def.args.safeParse(t11, a10);
          if (!s10.success) throw new g([n10(t11, s10.error)]);
          let o2 = Reflect.apply(i10, this, s10.data), l2 = e11._def.returns.safeParse(o2, a10);
          if (!l2.success) throw new g([r10(o2, l2.error)]);
          return l2.data;
        });
      }
    }
    parameters() {
      return this._def.args;
    }
    returnType() {
      return this._def.returns;
    }
    args(...e10) {
      return new ew({ ...this._def, args: ev.create(e10).rest(ec.create()) });
    }
    returns(e10) {
      return new ew({ ...this._def, returns: e10 });
    }
    implement(e10) {
      return this.parse(e10);
    }
    strictImplement(e10) {
      return this.parse(e10);
    }
    static create(e10, t10, n10) {
      return new ew({ args: e10 || ev.create([]).rest(ec.create()), returns: t10 || ec.create(), typeName: c.ZodFunction, ...L(n10) });
    }
  }
  class ej extends M {
    get schema() {
      return this._def.getter();
    }
    _parse(e10) {
      let { ctx: t10 } = this._processInputParams(e10);
      return this._def.getter()._parse({ data: t10.data, path: t10.path, parent: t10 });
    }
  }
  ej.create = (e10, t10) => new ej({ getter: e10, typeName: c.ZodLazy, ...L(t10) });
  class eE extends M {
    _parse(e10) {
      if (e10.data !== this._def.value) {
        let t10 = this._getOrReturnCtx(e10);
        return j(t10, { received: t10.data, code: f.invalid_literal, expected: this._def.value }), T;
      }
      return { status: "valid", value: e10.data };
    }
    get value() {
      return this._def.value;
    }
  }
  function eT(e10, t10) {
    return new eC({ values: e10, typeName: c.ZodEnum, ...L(t10) });
  }
  eE.create = (e10, t10) => new eE({ value: e10, typeName: c.ZodLiteral, ...L(t10) });
  class eC extends M {
    _parse(e10) {
      if ("string" != typeof e10.data) {
        let t10 = this._getOrReturnCtx(e10), n10 = this._def.values;
        return j(t10, { expected: o.joinValues(n10), received: t10.parsedType, code: f.invalid_type }), T;
      }
      if (this._cache || (this._cache = new Set(this._def.values)), !this._cache.has(e10.data)) {
        let t10 = this._getOrReturnCtx(e10), n10 = this._def.values;
        return j(t10, { received: t10.data, code: f.invalid_enum_value, options: n10 }), T;
      }
      return S(e10.data);
    }
    get options() {
      return this._def.values;
    }
    get enum() {
      let e10 = {};
      for (let t10 of this._def.values) e10[t10] = t10;
      return e10;
    }
    get Values() {
      let e10 = {};
      for (let t10 of this._def.values) e10[t10] = t10;
      return e10;
    }
    get Enum() {
      let e10 = {};
      for (let t10 of this._def.values) e10[t10] = t10;
      return e10;
    }
    extract(e10, t10 = this._def) {
      return eC.create(e10, { ...this._def, ...t10 });
    }
    exclude(e10, t10 = this._def) {
      return eC.create(this.options.filter((t11) => !e10.includes(t11)), { ...this._def, ...t10 });
    }
  }
  eC.create = eT;
  class eS extends M {
    _parse(e10) {
      let t10 = o.getValidEnumValues(this._def.values), n10 = this._getOrReturnCtx(e10);
      if (n10.parsedType !== h.string && n10.parsedType !== h.number) {
        let e11 = o.objectValues(t10);
        return j(n10, { expected: o.joinValues(e11), received: n10.parsedType, code: f.invalid_type }), T;
      }
      if (this._cache || (this._cache = new Set(o.getValidEnumValues(this._def.values))), !this._cache.has(e10.data)) {
        let e11 = o.objectValues(t10);
        return j(n10, { received: n10.data, code: f.invalid_enum_value, options: e11 }), T;
      }
      return S(e10.data);
    }
    get enum() {
      return this._def.values;
    }
  }
  eS.create = (e10, t10) => new eS({ values: e10, typeName: c.ZodNativeEnum, ...L(t10) });
  class eN extends M {
    unwrap() {
      return this._def.type;
    }
    _parse(e10) {
      let { ctx: t10 } = this._processInputParams(e10);
      return t10.parsedType !== h.promise && false === t10.common.async ? (j(t10, { code: f.invalid_type, expected: h.promise, received: t10.parsedType }), T) : S((t10.parsedType === h.promise ? t10.data : Promise.resolve(t10.data)).then((e11) => this._def.type.parseAsync(e11, { path: t10.path, errorMap: t10.common.contextualErrorMap })));
    }
  }
  eN.create = (e10, t10) => new eN({ type: e10, typeName: c.ZodPromise, ...L(t10) });
  class eI extends M {
    innerType() {
      return this._def.schema;
    }
    sourceType() {
      return this._def.schema._def.typeName === c.ZodEffects ? this._def.schema.sourceType() : this._def.schema;
    }
    _parse(e10) {
      let { status: t10, ctx: n10 } = this._processInputParams(e10), r10 = this._def.effect || null, a10 = { addIssue: (e11) => {
        j(n10, e11), e11.fatal ? t10.abort() : t10.dirty();
      }, get path() {
        return n10.path;
      } };
      if (a10.addIssue = a10.addIssue.bind(a10), "preprocess" === r10.type) {
        let e11 = r10.transform(n10.data, a10);
        if (n10.common.async) return Promise.resolve(e11).then(async (e12) => {
          if ("aborted" === t10.value) return T;
          let r11 = await this._def.schema._parseAsync({ data: e12, path: n10.path, parent: n10 });
          return "aborted" === r11.status ? T : "dirty" === r11.status || "dirty" === t10.value ? C(r11.value) : r11;
        });
        {
          if ("aborted" === t10.value) return T;
          let r11 = this._def.schema._parseSync({ data: e11, path: n10.path, parent: n10 });
          return "aborted" === r11.status ? T : "dirty" === r11.status || "dirty" === t10.value ? C(r11.value) : r11;
        }
      }
      if ("refinement" === r10.type) {
        let e11 = (e12) => {
          let t11 = r10.refinement(e12, a10);
          if (n10.common.async) return Promise.resolve(t11);
          if (t11 instanceof Promise) throw Error("Async refinement encountered during synchronous parse operation. Use .parseAsync instead.");
          return e12;
        };
        if (false !== n10.common.async) return this._def.schema._parseAsync({ data: n10.data, path: n10.path, parent: n10 }).then((n11) => "aborted" === n11.status ? T : ("dirty" === n11.status && t10.dirty(), e11(n11.value).then(() => ({ status: t10.value, value: n11.value }))));
        {
          let r11 = this._def.schema._parseSync({ data: n10.data, path: n10.path, parent: n10 });
          return "aborted" === r11.status ? T : ("dirty" === r11.status && t10.dirty(), e11(r11.value), { status: t10.value, value: r11.value });
        }
      }
      if ("transform" === r10.type) if (false !== n10.common.async) return this._def.schema._parseAsync({ data: n10.data, path: n10.path, parent: n10 }).then((e11) => A(e11) ? Promise.resolve(r10.transform(e11.value, a10)).then((e12) => ({ status: t10.value, value: e12 })) : T);
      else {
        let e11 = this._def.schema._parseSync({ data: n10.data, path: n10.path, parent: n10 });
        if (!A(e11)) return T;
        let i10 = r10.transform(e11.value, a10);
        if (i10 instanceof Promise) throw Error("Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.");
        return { status: t10.value, value: i10 };
      }
      o.assertNever(r10);
    }
  }
  eI.create = (e10, t10, n10) => new eI({ schema: e10, typeName: c.ZodEffects, effect: t10, ...L(n10) }), eI.createWithPreprocess = (e10, t10, n10) => new eI({ schema: t10, effect: { type: "preprocess", transform: e10 }, typeName: c.ZodEffects, ...L(n10) });
  class eA extends M {
    _parse(e10) {
      return this._getType(e10) === h.undefined ? S(void 0) : this._def.innerType._parse(e10);
    }
    unwrap() {
      return this._def.innerType;
    }
  }
  eA.create = (e10, t10) => new eA({ innerType: e10, typeName: c.ZodOptional, ...L(t10) });
  class eO extends M {
    _parse(e10) {
      return this._getType(e10) === h.null ? S(null) : this._def.innerType._parse(e10);
    }
    unwrap() {
      return this._def.innerType;
    }
  }
  eO.create = (e10, t10) => new eO({ innerType: e10, typeName: c.ZodNullable, ...L(t10) });
  class eR extends M {
    _parse(e10) {
      let { ctx: t10 } = this._processInputParams(e10), n10 = t10.data;
      return t10.parsedType === h.undefined && (n10 = this._def.defaultValue()), this._def.innerType._parse({ data: n10, path: t10.path, parent: t10 });
    }
    removeDefault() {
      return this._def.innerType;
    }
  }
  eR.create = (e10, t10) => new eR({ innerType: e10, typeName: c.ZodDefault, defaultValue: "function" == typeof t10.default ? t10.default : () => t10.default, ...L(t10) });
  class eD extends M {
    _parse(e10) {
      let { ctx: t10 } = this._processInputParams(e10), n10 = { ...t10, common: { ...t10.common, issues: [] } }, r10 = this._def.innerType._parse({ data: n10.data, path: n10.path, parent: { ...n10 } });
      return O(r10) ? r10.then((e11) => ({ status: "valid", value: "valid" === e11.status ? e11.value : this._def.catchValue({ get error() {
        return new g(n10.common.issues);
      }, input: n10.data }) })) : { status: "valid", value: "valid" === r10.status ? r10.value : this._def.catchValue({ get error() {
        return new g(n10.common.issues);
      }, input: n10.data }) };
    }
    removeCatch() {
      return this._def.innerType;
    }
  }
  eD.create = (e10, t10) => new eD({ innerType: e10, typeName: c.ZodCatch, catchValue: "function" == typeof t10.catch ? t10.catch : () => t10.catch, ...L(t10) });
  class eL extends M {
    _parse(e10) {
      if (this._getType(e10) !== h.nan) {
        let t10 = this._getOrReturnCtx(e10);
        return j(t10, { code: f.invalid_type, expected: h.nan, received: t10.parsedType }), T;
      }
      return { status: "valid", value: e10.data };
    }
  }
  eL.create = (e10) => new eL({ typeName: c.ZodNaN, ...L(e10) });
  let eM = Symbol("zod_brand");
  class eZ extends M {
    _parse(e10) {
      let { ctx: t10 } = this._processInputParams(e10), n10 = t10.data;
      return this._def.type._parse({ data: n10, path: t10.path, parent: t10 });
    }
    unwrap() {
      return this._def.type;
    }
  }
  class eU extends M {
    _parse(e10) {
      let { status: t10, ctx: n10 } = this._processInputParams(e10);
      if (n10.common.async) return (async () => {
        let e11 = await this._def.in._parseAsync({ data: n10.data, path: n10.path, parent: n10 });
        return "aborted" === e11.status ? T : "dirty" === e11.status ? (t10.dirty(), C(e11.value)) : this._def.out._parseAsync({ data: e11.value, path: n10.path, parent: n10 });
      })();
      {
        let e11 = this._def.in._parseSync({ data: n10.data, path: n10.path, parent: n10 });
        return "aborted" === e11.status ? T : "dirty" === e11.status ? (t10.dirty(), { status: "dirty", value: e11.value }) : this._def.out._parseSync({ data: e11.value, path: n10.path, parent: n10 });
      }
    }
    static create(e10, t10) {
      return new eU({ in: e10, out: t10, typeName: c.ZodPipeline });
    }
  }
  class eP extends M {
    _parse(e10) {
      let t10 = this._def.innerType._parse(e10), n10 = (e11) => (A(e11) && (e11.value = Object.freeze(e11.value)), e11);
      return O(t10) ? t10.then((e11) => n10(e11)) : n10(t10);
    }
    unwrap() {
      return this._def.innerType;
    }
  }
  function eY(e10, t10) {
    let n10 = "function" == typeof e10 ? e10(t10) : "string" == typeof e10 ? { message: e10 } : e10;
    return "string" == typeof n10 ? { message: n10 } : n10;
  }
  function e$(e10, t10 = {}, n10) {
    return e10 ? ed.create().superRefine((r10, a10) => {
      let i10 = e10(r10);
      if (i10 instanceof Promise) return i10.then((e11) => {
        if (!e11) {
          let e12 = eY(t10, r10), i11 = e12.fatal ?? n10 ?? true;
          a10.addIssue({ code: "custom", ...e12, fatal: i11 });
        }
      });
      if (!i10) {
        let e11 = eY(t10, r10), i11 = e11.fatal ?? n10 ?? true;
        a10.addIssue({ code: "custom", ...e11, fatal: i11 });
      }
    }) : ed.create();
  }
  eP.create = (e10, t10) => new eP({ innerType: e10, typeName: c.ZodReadonly, ...L(t10) });
  let ez = { object: em.lazycreate };
  (a = c || (c = {})).ZodString = "ZodString", a.ZodNumber = "ZodNumber", a.ZodNaN = "ZodNaN", a.ZodBigInt = "ZodBigInt", a.ZodBoolean = "ZodBoolean", a.ZodDate = "ZodDate", a.ZodSymbol = "ZodSymbol", a.ZodUndefined = "ZodUndefined", a.ZodNull = "ZodNull", a.ZodAny = "ZodAny", a.ZodUnknown = "ZodUnknown", a.ZodNever = "ZodNever", a.ZodVoid = "ZodVoid", a.ZodArray = "ZodArray", a.ZodObject = "ZodObject", a.ZodUnion = "ZodUnion", a.ZodDiscriminatedUnion = "ZodDiscriminatedUnion", a.ZodIntersection = "ZodIntersection", a.ZodTuple = "ZodTuple", a.ZodRecord = "ZodRecord", a.ZodMap = "ZodMap", a.ZodSet = "ZodSet", a.ZodFunction = "ZodFunction", a.ZodLazy = "ZodLazy", a.ZodLiteral = "ZodLiteral", a.ZodEnum = "ZodEnum", a.ZodEffects = "ZodEffects", a.ZodNativeEnum = "ZodNativeEnum", a.ZodOptional = "ZodOptional", a.ZodNullable = "ZodNullable", a.ZodDefault = "ZodDefault", a.ZodCatch = "ZodCatch", a.ZodPromise = "ZodPromise", a.ZodBranded = "ZodBranded", a.ZodPipeline = "ZodPipeline", a.ZodReadonly = "ZodReadonly";
  let eF = (e10, t10 = { message: `Input not instance of ${e10.name}` }) => e$((t11) => t11 instanceof e10, t10), eq = et.create, eW = en.create, eH = eL.create, eB = er.create, eV = ea.create, eK = ei.create, eG = es.create, eX = eo.create, eJ = el.create, eQ = ed.create, e0 = ec.create, e1 = eu.create, e2 = ep.create, e4 = eh.create, e5 = em.create, e3 = em.strictCreate, e6 = ef.create, e9 = eg.create, e8 = eb.create, e7 = ev.create, te = ex.create, tt = e_.create, tn = ek.create, tr = ew.create, ta = ej.create, ti = eE.create, ts = eC.create, to = eS.create, tl = eN.create, td = eI.create, tc = eA.create, tu = eO.create, tp = eI.createWithPreprocess, th = eU.create, tm = () => eq().optional(), tf = () => eW().optional(), ty = () => eV().optional(), tg = { string: (e10) => et.create({ ...e10, coerce: true }), number: (e10) => en.create({ ...e10, coerce: true }), boolean: (e10) => ea.create({ ...e10, coerce: true }), bigint: (e10) => er.create({ ...e10, coerce: true }), date: (e10) => ei.create({ ...e10, coerce: true }) };
  e.s(["BRAND", 0, eM, "NEVER", 0, T, "Schema", 0, M, "ZodAny", 0, ed, "ZodArray", 0, eh, "ZodBigInt", 0, er, "ZodBoolean", 0, ea, "ZodBranded", 0, eZ, "ZodCatch", 0, eD, "ZodDate", 0, ei, "ZodDefault", 0, eR, "ZodDiscriminatedUnion", 0, eg, "ZodEffects", 0, eI, "ZodEnum", 0, eC, "ZodFirstPartyTypeKind", 0, c, "ZodFunction", 0, ew, "ZodIntersection", 0, eb, "ZodLazy", 0, ej, "ZodLiteral", 0, eE, "ZodMap", 0, e_, "ZodNaN", 0, eL, "ZodNativeEnum", 0, eS, "ZodNever", 0, eu, "ZodNull", 0, el, "ZodNullable", 0, eO, "ZodNumber", 0, en, "ZodObject", 0, em, "ZodOptional", 0, eA, "ZodPipeline", 0, eU, "ZodPromise", 0, eN, "ZodReadonly", 0, eP, "ZodRecord", 0, ex, "ZodSchema", 0, M, "ZodSet", 0, ek, "ZodString", 0, et, "ZodSymbol", 0, es, "ZodTransformer", 0, eI, "ZodTuple", 0, ev, "ZodType", 0, M, "ZodUndefined", 0, eo, "ZodUnion", 0, ef, "ZodUnknown", 0, ec, "ZodVoid", 0, ep, "any", 0, eQ, "array", 0, e4, "bigint", 0, eB, "boolean", 0, eV, "coerce", 0, tg, "custom", 0, e$, "date", 0, eK, "datetimeRegex", 0, ee, "discriminatedUnion", 0, e9, "effect", 0, td, "enum", 0, ts, "function", 0, tr, "instanceof", 0, eF, "intersection", 0, e8, "late", 0, ez, "lazy", 0, ta, "literal", 0, ti, "map", 0, tt, "nan", 0, eH, "nativeEnum", 0, to, "never", 0, e1, "null", 0, eJ, "nullable", 0, tu, "number", 0, eW, "object", 0, e5, "oboolean", 0, ty, "onumber", 0, tf, "optional", 0, tc, "ostring", 0, tm, "pipeline", 0, th, "preprocess", 0, tp, "promise", 0, tl, "record", 0, te, "set", 0, tn, "strictObject", 0, e3, "string", 0, eq, "symbol", 0, eG, "transformer", 0, td, "tuple", 0, e7, "undefined", 0, eX, "union", 0, e6, "unknown", 0, e0, "void", 0, e2], 65638), e.i(65638), e.i(69790), e.s(["BRAND", 0, eM, "DIRTY", 0, C, "EMPTY_PATH", 0, w, "INVALID", 0, T, "NEVER", 0, T, "OK", 0, S, "ParseStatus", 0, E, "Schema", 0, M, "ZodAny", 0, ed, "ZodArray", 0, eh, "ZodBigInt", 0, er, "ZodBoolean", 0, ea, "ZodBranded", 0, eZ, "ZodCatch", 0, eD, "ZodDate", 0, ei, "ZodDefault", 0, eR, "ZodDiscriminatedUnion", 0, eg, "ZodEffects", 0, eI, "ZodEnum", 0, eC, "ZodError", 0, g, "ZodFirstPartyTypeKind", 0, c, "ZodFunction", 0, ew, "ZodIntersection", 0, eb, "ZodIssueCode", 0, f, "ZodLazy", 0, ej, "ZodLiteral", 0, eE, "ZodMap", 0, e_, "ZodNaN", 0, eL, "ZodNativeEnum", 0, eS, "ZodNever", 0, eu, "ZodNull", 0, el, "ZodNullable", 0, eO, "ZodNumber", 0, en, "ZodObject", 0, em, "ZodOptional", 0, eA, "ZodParsedType", 0, h, "ZodPipeline", 0, eU, "ZodPromise", 0, eN, "ZodReadonly", 0, eP, "ZodRecord", 0, ex, "ZodSchema", 0, M, "ZodSet", 0, ek, "ZodString", 0, et, "ZodSymbol", 0, es, "ZodTransformer", 0, eI, "ZodTuple", 0, ev, "ZodType", 0, M, "ZodUndefined", 0, eo, "ZodUnion", 0, ef, "ZodUnknown", 0, ec, "ZodVoid", 0, ep, "addIssueToContext", 0, j, "any", 0, eQ, "array", 0, e4, "bigint", 0, eB, "boolean", 0, eV, "coerce", 0, tg, "custom", 0, e$, "date", 0, eK, "datetimeRegex", 0, ee, "defaultErrorMap", 0, b, "discriminatedUnion", 0, e9, "effect", 0, td, "enum", 0, ts, "function", 0, tr, "getErrorMap", 0, _, "getParsedType", 0, m, "instanceof", 0, eF, "intersection", 0, e8, "isAborted", 0, N, "isAsync", 0, O, "isDirty", 0, I, "isValid", 0, A, "late", 0, ez, "lazy", 0, ta, "literal", 0, ti, "makeIssue", 0, k, "map", 0, tt, "nan", 0, eH, "nativeEnum", 0, to, "never", 0, e1, "null", 0, eJ, "nullable", 0, tu, "number", 0, eW, "object", 0, e5, "objectUtil", 0, l, "oboolean", 0, ty, "onumber", 0, tf, "optional", 0, tc, "ostring", 0, tm, "pipeline", 0, th, "preprocess", 0, tp, "promise", 0, tl, "quotelessJson", 0, y, "record", 0, te, "set", 0, tn, "setErrorMap", 0, x, "strictObject", 0, e3, "string", 0, eq, "symbol", 0, eG, "transformer", 0, td, "tuple", 0, e7, "undefined", 0, eX, "union", 0, e6, "unknown", 0, e0, "util", 0, o, "void", 0, e2], 88685);
  var tb = e.i(88685), tb = tb;
  tb.object({ message: tb.string() });
  var tb = tb;
  let tv = tb.object({ to: tb.string(), cc: tb.string().optional(), bcc: tb.string().optional(), subject: tb.string(), body: tb.string() }), tx = tb.object({ message: tb.string(), draftEmail: tv });
  tb.object({ userPrompt: tx, composeSessionId: tb.string(), parentEmail: tb.object({ emailId: tb.string(), relation: tb.enum(["reply", "forwarded"]) }).optional() });
  !function({ mediaSource: e10, campaign: t10, channel: n10, deepLinkValue: r10, extraParams: a10 }) {
    let i10 = new URL("https://get.avec.ai/bIbA/");
    for (let [e11, t11] of Object.entries(a10 ?? {})) i10.searchParams.set(e11, t11);
    i10.searchParams.set("pid", e10), t10 && i10.searchParams.set("c", t10), n10 && i10.searchParams.set("af_channel", n10), r10 && i10.searchParams.set("deep_link_value", r10), i10.toString();
  }({ mediaSource: "email_footer", campaign: "sent_with_avec" }), new TextEncoder();
  var tb = tb;
  let t_ = tb.object({ gmailMessageId: tb.string(), sender: tb.string(), subject: tb.string(), receivedAt: tb.string() });
  tb.object({ snapshotEpoch: tb.number(), universe: tb.object({ totalCount: tb.number(), windowStart: tb.string().nullable(), windowEnd: tb.string().nullable() }), categoryWindow: tb.object({ after: tb.string() }), totalEmailsAnalyzed: tb.number(), priorityEmails: tb.array(t_.extend({ threadGmailId: tb.string(), justification: tb.string() })).max(50), categories: tb.array(tb.object({ key: tb.string(), label: tb.string(), totalCount: tb.number(), snapshot: tb.array(t_).max(200) })), other: tb.object({ totalCount: tb.number(), snapshot: tb.array(t_).max(500) }), older: tb.object({ totalCount: tb.number() }), savedGmailMessageIds: tb.array(tb.string()).catch([]).default([]), rescuedGmailMessageIds: tb.array(tb.string()).catch([]).default([]), saveLaterStatus: tb.enum(["pending", "completed", "failed"]).catch("pending").default("pending"), membershipIncludesExcluded: tb.boolean().catch(false).default(false), clearedCount: tb.number().catch(0).default(0) });
  let tk = tb.object({ gmailMessageId: tb.string(), verdict: tb.enum(["priority", "rejected"]), justification: tb.string().optional() });
  tb.array(tk).catch([]).default([]);
  var tb = tb;
  let tw = ["https://www.googleapis.com/auth/contacts.readonly", "https://www.googleapis.com/auth/contacts.other.readonly"];
  [...tw, ...tw], tb.enum(["email", "calendar", "contacts"]);
  var tb = tb;
  let tj = { requestId: tb.string().min(1), startedAt: tb.string().datetime() };
  tb.discriminatedUnion("status", [tb.object({ ...tj, status: tb.literal("pending") }), tb.object({ ...tj, status: tb.literal("failed"), reason: tb.enum(["provider_failure", "unconfirmed"]) })]), tb.discriminatedUnion("kind", [tb.object({ kind: tb.literal("unavailable") }), tb.object({ kind: tb.literal("can_add") }), tb.object({ kind: tb.literal("creating") }), tb.object({ kind: tb.literal("failed"), reason: tb.enum(["provider_failure", "unconfirmed"]) }), tb.object({ kind: tb.literal("ready"), provider: tb.enum(["google_meet", "zoom", "teams", "other"]), url: tb.string().url().regex(/^https?:\/\//i) })]);
  var tb = tb, tb = tb;
  let tE = String.raw`(?:Written|Sent|Dictated)\s+(?:in\s+\d+(?:\.\d)?\s*s\s+)?with\s+(?:(?:Net|Avec)(?:\s+\([^)]+\))?|\[(?:Net|Avec)\]\([^)]+\))`;
  RegExp("<div\\b[^>]*\\bdata-net-signature-delimiter\\b[^>]*>[\\s\\S]*?</div>", "i");
  let tT = tb.string().refine((e10) => !/[\r\n]/.test(e10), { message: "Newlines are not allowed" }), tC = tb.object({ email: tT, name: tT.optional() }), tS = tb.union([tb.array(tC), tT]), tN = tb.object({ selfMemo: tb.boolean().optional(), analyticsClient: tb.enum(["desktop", "ios", "android", "web"]).optional().catch(void 0), to: tS, cc: tS.optional(), bcc: tS.optional(), subject: tT, body: tb.string(), attachments: tb.array(tb.object({ filename: tT, sourceAttachmentId: tb.string().optional(), origin: tb.enum(["draft", "parent"]).optional().describe("Indicates the attachment is from an existing email"), contentId: tT.optional().describe("Content-ID for inline image attachments referenced via cid: in the HTML body"), attachmentId: tb.string().uuid().optional().describe("Stable attachment identity used by pending previews and the eventual sent email") })), appInviteUrl: tb.string().optional(), includeSignature: tb.boolean().optional(), includeNetFooter: tb.boolean().optional(), netFooterDurationMs: tb.number().optional(), netFooterVersion: tb.enum(["writtenWithNet", "sentOrDictatedWithNet", "sentWithNet", "writtenWithAvec"]).optional(), signatureDelimiterVersion: tb.enum(["zwsp", "hidden"]).optional().describe("Which body/signature cut marker this client can parse when it reopens the draft. Omitted by builds that only understand the legacy bare-ZWSP marker."), parentEmail: tb.object({ emailId: tb.string(), relation: tb.enum(["reply", "forwarded"]) }).optional(), draftEmail: tb.object({ emailId: tb.string(), threadId: tb.string() }).optional().describe("Indicates this input is a modified version of an existing draft email"), clientIds: tb.object({ emailId: tb.string().uuid(), threadId: tb.string().uuid().optional() }).optional().describe("Client-pre-generated IDs for a new draft. Mutually exclusive with draftEmail."), explicitForwardedAttachments: tb.boolean().optional(), explicitForwardedInlineAttachments: tb.boolean().optional(), accountId: tb.string().optional(), sendAsEmail: tT.optional().describe("The Gmail send-as email address to use for sending"), requestId: tb.string().uuid().optional(), action: tb.enum(["complete-reply-todo", "none"]).default("none"), version: tb.enum(["v1", "v2"]).default("v2") });
  tb.object({ id: tb.string(), userId: tb.string(), accountId: tb.string(), ids: tb.object({ draftEmailId: tb.string(), threadId: tb.string() }), input: tN });
  var tb = tb;
  let tI = ["from", "to", "cc", "bcc"], tA = tb.object({ name: tb.string(), emailId: tb.string(), receivedAt: tb.number(), role: tb.enum(tI), isDraft: tb.boolean() }), tO = tb.object({ contactId: tb.string(), roles: tb.array(tb.enum(tI)), lastSentAt: tb.number().nullable(), unread: tb.array(tb.object({ emailId: tb.string(), receivedAt: tb.number() })), nameEvidence: tA.nullable().optional().catch(void 0) }), tR = tb.object({ version: tb.literal(1), mail: tb.array(tO).nullable(), drafts: tb.array(tO).nullable(), trash: tb.array(tO).nullable(), spam: tb.array(tO).nullable(), spamTrash: tb.array(tO).nullable() }), tD = tb.enum(["to", "cc", "bcc", "from"]), tL = tb.enum(["empty", "text", "html", "both"]), tM = tb.enum(["sender", "type", "other"]), tZ = tb.enum(["high_priority", "low_priority", "triaged", "excluded", "pending"]), tU = tb.enum(["due_date", "no_due_date", "moved_aside"]);
  tb.array(tb.string().uuid("Invalid commitment ID (not a UUID)")).max(50).optional();
  let tP = tb.enum(["inline", "attachment"]), tY = tb.enum(["none", "favicon", "google", "web", "bimi"]), t$ = tb.enum(["reply", "review", "other", "fallback"]), tz = tb.enum(["inbox_zero", "unreads_zero", "no_system"]), tF = tb.enum(["markdown", "html", "markdown_above_fold"]), tq = tb.enum(["google", "llm", "other"]), tW = tb.enum(["day", "moment"]), tH = tb.enum(["yes", "no", "maybe", "not_replied", "not_applicable"]), tB = tb.object({ id: tb.string(), name: tb.string().nullable(), firstName: tb.string().nullable(), lastName: tb.string().nullable(), email: tb.string(), image: tb.string().nullable(), createdAt: tb.coerce.date(), preferredTimezone: tb.string().nullable(), onboardingCompletedAt: tb.coerce.date().nullable(), deckTourCompletedAt: tb.coerce.date().nullable(), firstDeckClearedMessageAt: tb.coerce.date().nullable(), inboxEmptyAtOnboarding: tb.boolean().nullable(), inboxPersona: tz.nullable(), sendDelaySeconds: tb.number(), signatureSetting: tb.enum(["always", "new_threads_only", "never"]).catch("always"), notificationLevel: tb.number().nullable().catch(null), laterReminderNotificationsEnabled: tb.boolean().catch(true), laterReturnToDeckEnabled: tb.boolean().catch(true), laterFridayDigestEnabled: tb.boolean().catch(true), laterDigestDays: tb.array(tb.string()).catch(["friday"]), laterDigestTime: tb.enum(["morning", "evening"]).catch("morning"), lastAwaitingResponseExtractionAt: tb.coerce.date().nullable().catch(null), lastNeedsReplyExtractionAt: tb.coerce.date().nullable().catch(null), changeEventId: tb.coerce.bigint().nullable() }), tV = tb.enum(["gmail", "user"]), tK = tb.enum(["pending", "ready", "failed", "unavailable"]), tG = tb.object({ id: tb.string(), userId: tb.string(), accountId: tb.string(), threadId: tb.string(), fromId: tb.string(), gmailId: tb.string(), needsTriage: tb.boolean(), needsNotification: tb.boolean().catch(false), needsTriageFeedback: tb.boolean().nullable(), needsTriageFeedbackReason: tM.nullable(), snippet: tb.string().nullable(), subject: tb.string().nullable(), summary: tb.string().nullable(), listTitle: tb.string().nullable().catch(null), notificationBody: tb.string().nullable(), preferHtml: tb.boolean(), renderMode: tF.nullable().catch(null), isNewsletter: tb.boolean(), isSelfEmail: tb.boolean(), semanticType: tb.string().nullable(), extractedSignInCode: tb.string().nullable().catch(null), needsTriageReasoning: tb.string().nullable(), enriched: tb.boolean(), enrichedAt: tb.coerce.date().nullable(), headerMessageId: tb.string(), headerInReplyTo: tb.string().nullable(), headerListUnsubscribe: tb.string().nullable(), headerListUnsubscribePost: tb.string().nullable(), headerReferences: tb.array(tb.string()).nullable(), headerReplyTo: tb.string().nullable(), headerXOriginalSender: tb.string().nullable().catch(null), receivedAt: tb.coerce.date(), insertedAt: tb.coerce.date(), updatedAt: tb.coerce.date().nullable(), archivedAt: tb.coerce.date().nullable(), draftedAt: tb.coerce.date().nullable(), readAt: tb.coerce.date().nullable(), trashedAt: tb.coerce.date().nullable(), spamAt: tb.coerce.date().nullable().catch(null), spamOriginAt: tb.coerce.date().nullable().catch(null), spamOrigin: tV.nullable().catch(null), spamRestoreState: tK.nullable().catch(null), starredAt: tb.coerce.date().nullable(), netReadAt: tb.coerce.date().nullable(), triagedAt: tb.coerce.date().nullable(), dismissedAt: tb.coerce.date().nullable(), completedAt: tb.coerce.date().nullable(), todoActionType: t$.nullable(), todoTitle: tb.string().nullable(), todoDescription: tb.string().nullable(), bulkNonTriageDone: tb.coerce.date().nullable(), changeEventId: tb.coerce.bigint().nullable() }), tX = tb.object({ id: tb.string(), userId: tb.string(), accountId: tb.string(), gmailId: tb.string(), subject: tb.string().nullable(), participantSummary: tb.string().nullable(), participantState: tR.nullable().catch(null), insertedAt: tb.coerce.date(), updatedAt: tb.coerce.date().nullable(), lastEmailAt: tb.coerce.date(), lastEmailGmailId: tb.string(), lastTriagedEmailAt: tb.coerce.date().nullable(), retriagedAt: tb.coerce.date().nullable().catch(null), changeEventId: tb.coerce.bigint().nullable(), isStarred: tb.boolean(), latestStarredAt: tb.coerce.date().nullable().catch(null), hasUnreadEmails: tb.boolean(), triageState: tZ, everNeededTriage: tb.boolean(), optimisticTriageState: tZ.nullable(), optimisticTriageStateSetAt: tb.coerce.date().nullable(), handleLaterEmailId: tb.string().nullable(), handleLaterDueAt: tb.coerce.date().nullable(), handleLaterAt: tb.coerce.date().nullable().catch(null), dueDateInferenceState: tU.nullable().catch(null), dueDateInferenceDueAt: tb.coerce.date().nullable().catch(null), dueDateInferenceUpdatedAt: tb.coerce.date().nullable().catch(null), dueDateInferenceEvidenceEmailId: tb.string().nullable().catch(null), dueDateInferenceEvidenceBefore: tb.string().nullable().catch(null), dueDateInferenceEvidenceHighlight: tb.string().nullable().catch(null), dueDateInferenceEvidenceAfter: tb.string().nullable().catch(null), userDueDateState: tU.nullable().catch(null), laterReturnedToDeckAt: tb.coerce.date().nullable().catch(null), laterNoDueDateFiredAt: tb.coerce.date().nullable().catch(null), extractedDueAt: tb.coerce.date().nullable().catch(null), lastDraftEmailId: tb.string().nullable(), lastSentEmailId: tb.string().nullable(), lastTrashedEmailId: tb.string().nullable(), lastSpamMarkedEmailId: tb.string().nullable().catch(null), replyStatusState: tb.enum(["needs_reply", "awaiting_reply", "none"]).nullable().catch(null), replyStatusSince: tb.coerce.date().nullable().catch(null), replyStatusEmailId: tb.string().nullable().catch(null), replyStatusEmailReceivedAt: tb.coerce.date().nullable().catch(null), extractedIsAwaitingResponse: tb.boolean().nullable().catch(null), extractedIsAwaitingResponseConfidence: tb.number().nullable().catch(null), extractedNeedsReply: tb.boolean().nullable().catch(null), extractedNeedsReplyConfidence: tb.number().nullable().catch(null), dismissedFromResponseViewAt: tb.coerce.date().nullable(), backloggedAt: tb.coerce.date().nullable().catch(null) }), tJ = tb.object({ id: tb.string(), userId: tb.string(), accountId: tb.string(), isUser: tb.boolean(), email: tb.string(), resolvedName: tb.string().nullable().catch(null), matchNames: tb.array(tb.string()).nullable().catch(null), nameOverride: tb.string().nullable().catch(null), resolvedNameSource: tb.enum(["sender", "recipient", "address"]).nullable().catch(null), resolvedNameMessageCount: tb.number().nullable().catch(null), resolvedNameLastSeenAt: tb.coerce.date().nullable().catch(null), nameResolutionVersion: tb.number().nullable().catch(null), insertedAt: tb.coerce.date(), updatedAt: tb.coerce.date().nullable(), avatarSource: tY.nullable(), avatarUrl: tb.string().nullable(), avatarRefreshedAt: tb.coerce.date().nullable(), changeEventId: tb.coerce.bigint().nullable() }), tQ = tb.object({ id: tb.string(), emailId: tb.string(), contactId: tb.string(), type: tD, name: tb.string().nullable(), changeEventId: tb.coerce.bigint().nullable() });
  tb.object({ emailId: tb.string(), type: tL, html: tb.string().nullable(), markdown: tb.string().nullable(), markdownAboveTheFold: tb.string().nullable(), text: tb.string().nullable(), textAboveTheFold: tb.string().nullable(), leadHtml: tb.string().nullable().catch(null), quotedHtml: tb.string().nullable().catch(null), trailHtml: tb.string().nullable().catch(null), leadMarkdown: tb.string().nullable().catch(null), quotedMarkdown: tb.string().nullable().catch(null), trailMarkdown: tb.string().nullable().catch(null), leadText: tb.string().nullable().catch(null), quotedText: tb.string().nullable().catch(null), trailText: tb.string().nullable().catch(null), leadNeedsHtml: tb.boolean().nullable().catch(null), quotedNeedsHtml: tb.boolean().nullable().catch(null), trailNeedsHtml: tb.boolean().nullable().catch(null), quoteContainsInlineReply: tb.boolean().nullable().catch(null), splitVersion: tb.number().nullable().catch(null), splitOutcome: tb.string().nullable().catch(null) });
  let t0 = tb.object({ id: tb.string(), emailId: tb.string(), mimeType: tb.string(), filename: tb.string(), size: tb.number(), headerContentId: tb.string(), disposition: tP.nullable(), summary: tb.string().nullable(), insertedAt: tb.coerce.date(), updatedAt: tb.coerce.date().nullable(), summarizedAt: tb.coerce.date().nullable(), changeEventId: tb.coerce.bigint().nullable() }), t1 = tb.object({ id: tb.string(), userId: tb.string(), provider: tb.string(), providerAccountId: tb.string(), scope: tb.string(), email: tb.string(), name: tb.string().nullable(), nickname: tb.string().nullable(), avatarUrl: tb.string().nullable(), insertedAt: tb.coerce.date(), updatedAt: tb.coerce.date().nullable(), unlinkedAt: tb.coerce.date().nullable(), notificationsEnabled: tb.boolean(), calendarAutoWriteEnabled: tb.boolean().catch(false), changeEventId: tb.coerce.bigint().nullable() }), t2 = tb.object({ id: tb.string(), status: tb.enum(["pending", "sent", "user_cancelled", "pending_draft", "saved_draft"]), userId: tb.string(), accountId: tb.string(), threadId: tb.string(), emailId: tb.string(), insertedAt: tb.coerce.date(), processedAt: tb.coerce.date().nullable(), changeEventId: tb.coerce.bigint().nullable(), inputData: tN }), t4 = tb.enum(["archived", "trash"]), t5 = tb.object({ userId: tb.string(), markDoneAsRead: tb.boolean(), markDoneLabel: t4.nullable(), markDoneLowImportanceAsRead: tb.boolean(), markDoneLowImportanceLabel: t4.nullable(), markLaterAsRead: tb.boolean(), markLaterLabel: t4.nullable(), markFilteredAsRead: tb.boolean(), markFilteredLabel: t4.nullable(), changeEventId: tb.coerce.bigint().nullable() }), t3 = tb.object({ userId: tb.string(), key: tb.string(), value: tb.string(), updatedAt: tb.coerce.date(), changeEventId: tb.coerce.bigint().nullable() });
  tb.object({ id: tb.string().describe("Synthetic id b/c we don't currently support composite keys"), userId: tb.string(), accountId: tb.string(), sendAsEmail: tb.string(), displayName: tb.string().nullable(), isPrimary: tb.boolean(), isDefault: tb.boolean(), signature: tb.string().nullable(), signatureText: tb.string().nullable(), lastSeenAt: tb.coerce.date() });
  let t6 = tb.object({ isCounterProposal: tb.boolean().nullable().catch(null), id: tb.string(), emailId: tb.string(), attachmentId: tb.string().nullable(), source: tq, iCalUid: tb.string(), sequence: tb.number(), recurrenceId: tb.string(), organizerEmail: tb.string().nullable(), startDate: tb.coerce.date(), endDate: tb.coerce.date(), startDatePrecision: tW, endDatePrecision: tW, startTimezone: tb.string().nullable(), endTimezone: tb.string().nullable(), location: tb.string().nullable(), summary: tb.string(), description: tb.string().nullable(), userRsvpStatus: tH, insertedAt: tb.coerce.date(), netAddedToCalendarAt: tb.coerce.date().nullable(), netAcceptedAt: tb.coerce.date().nullable(), netDeclinedAt: tb.coerce.date().nullable(), netMaybeAt: tb.coerce.date().nullable(), googleCreatedAt: tb.coerce.date().nullable(), rrule: tb.string().nullable(), rruleText: tb.string().nullable(), changeEventId: tb.coerce.bigint().nullable() }), t9 = tG.pick({ id: true }), t8 = tX.pick({ id: true }), t7 = t1.pick({ id: true }), ne = t2.pick({ id: true }), nt = tJ.pick({ id: true }), nn = tQ.pick({ id: true }), nr = t5.pick({ userId: true }), na = tB.pick({ id: true }), ni = t3.pick({ key: true }), ns = t6.pick({ id: true }), no = t0.pick({ id: true }), nl = tG.partial().required({ id: true, changeEventId: true }), nd = tX.partial().required({ id: true, changeEventId: true }), nc = tB.partial().required({ id: true, changeEventId: true }), nu = t1.partial().required({ id: true, changeEventId: true }), np = t2.partial().required({ id: true, changeEventId: true }), nh = tJ.partial().required({ id: true, changeEventId: true }), nm = tQ.partial().required({ id: true, changeEventId: true }), nf = t5.partial().required({ userId: true, changeEventId: true }), ny = t3.partial().required({ key: true, changeEventId: true }), ng = t6.partial().required({ id: true, changeEventId: true }), nb = t0.partial().required({ id: true, changeEventId: true });
  function nv(e10) {
    let t10 = Object.entries(e10.shape).filter(([, e11]) => e11 instanceof tb.ZodNullable).map(([e11]) => e11);
    return tb.preprocess((e11) => {
      if (!e11 || "object" != typeof e11 || Array.isArray(e11)) return e11;
      let n10 = { ...e11 };
      for (let e12 of t10) void 0 === n10[e12] && (n10[e12] = null);
      return n10;
    }, e10);
  }
  let nx = tb.object({ emails: tb.array(nv(tG)).optional(), threads: tb.array(nv(tX)).optional(), users: tb.array(nv(tB)).optional(), userAccounts: tb.array(nv(t1)).optional(), pendingEmails: tb.array(nv(t2)).optional(), contacts: tb.array(nv(tJ)).optional(), emailContacts: tb.array(nv(tQ)).optional(), userSyncSettings: tb.array(nv(t5)).optional(), userSettings: tb.array(nv(t3)).optional(), emailCalendarInvites: tb.array(nv(t6)).optional(), emailAttachments: tb.array(nv(t0)).optional() }), n_ = tb.object({ emails: tb.array(t9).optional(), threads: tb.array(t8).optional(), users: tb.array(na).optional(), userAccounts: tb.array(t7).optional(), pendingEmails: tb.array(ne).optional(), contacts: tb.array(nt).optional(), emailContacts: tb.array(nn).optional(), userSyncSettings: tb.array(nr).optional(), userSettings: tb.array(ni).optional(), emailCalendarInvites: tb.array(ns).optional(), emailAttachments: tb.array(no).optional() }), nk = tb.object({ emails: tb.array(nl).optional(), threads: tb.array(nd).optional(), users: tb.array(nc).optional(), userAccounts: tb.array(nu).optional(), pendingEmails: tb.array(np).optional(), contacts: tb.array(nh).optional(), emailContacts: tb.array(nm).optional(), userSyncSettings: tb.array(nf).optional(), userSettings: tb.array(ny).optional(), emailCalendarInvites: tb.array(ng).optional(), emailAttachments: tb.array(nb).optional() }), nw = tb.object({ id: tb.coerce.bigint(), previousId: tb.coerce.bigint().nullish(), userId: tb.string(), insertedAt: tb.coerce.date(), metadata: tb.object({}).nullable() }), nj = nw.extend({ action: tb.literal("update"), data: nk }), nE = nw.extend({ action: tb.literal("upsert"), data: nx }), nT = nw.extend({ action: tb.literal("delete"), data: n_ });
  tb.discriminatedUnion("action", [nj, nE, nT]), tb.object({ type: tb.literal("sync_available"), lastSyncId: tb.string() }), tb.enum(["later", "starred", "all", "important", "awaiting_response", "needs_reply", "drafts", "sent", "trash", "spam", "backlog"]), tb.object({ next: tb.string().optional(), oldestTimestamp: tb.coerce.date() }), tb.enum(["emails", "threads", "users", "userAccounts", "pendingEmails", "contacts", "emailContacts", "userSyncSettings", "userSettings", "emailCalendarInvites", "emailAttachments"]), new Intl.DateTimeFormat("en-US", { hourCycle: "h23", timeZone: "America/New_York", year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit" }).format(/* @__PURE__ */ new Date("2014-06-25T04:00:00.123Z"));
  var tb = tb;
  let nC = /^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}(:\d{2})?)?$/, nS = tb.object({ email: tb.string().max(320), name: tb.string().max(200).nullable().default(null) });
  tb.object({ title: tb.string().max(300), description: tb.string().max(4e3).nullable().default(null), location: tb.string().max(500).nullable().default(null), startLocal: tb.string().regex(nC), endLocal: tb.string().regex(nC).nullable().default(null), timezone: tb.string().max(64).nullable().default(null), endTimezone: tb.string().max(64).nullable().default(null), attendees: tb.array(nS).max(50).default([]), rationale: tb.string().max(2e3).default(""), evidence: tb.array(tb.object({ emailId: tb.string().max(200), quote: tb.string().max(1e3) })).max(20).default([]) }), tb.enum(["opaque", "transparent"]);
  var nN = ["MO", "TU", "WE", "TH", "FR", "SA", "SU"], nI = function() {
    function e10(e11, t10) {
      if (0 === t10) throw Error("Can't create weekday with n == 0");
      this.weekday = e11, this.n = t10;
    }
    return e10.fromStr = function(t10) {
      return new e10(nN.indexOf(t10));
    }, e10.prototype.nth = function(t10) {
      return this.n === t10 ? this : new e10(this.weekday, t10);
    }, e10.prototype.equals = function(e11) {
      return this.weekday === e11.weekday && this.n === e11.n;
    }, e10.prototype.toString = function() {
      var e11 = nN[this.weekday];
      return this.n && (e11 = (this.n > 0 ? "+" : "") + String(this.n) + e11), e11;
    }, e10.prototype.getJsWeekday = function() {
      return 6 === this.weekday ? 0 : this.weekday + 1;
    }, e10;
  }(), nA = function(e10) {
    return null != e10;
  }, nO = function(e10) {
    return "number" == typeof e10;
  }, nR = function(e10) {
    return "string" == typeof e10 && nN.includes(e10);
  }, nD = Array.isArray, nL = function(e10, t10) {
    void 0 === t10 && (t10 = e10), 1 == arguments.length && (t10 = e10, e10 = 0);
    for (var n10 = [], r10 = e10; r10 < t10; r10++) n10.push(r10);
    return n10;
  }, nM = function(e10, t10) {
    var n10 = 0, r10 = [];
    if (nD(e10)) for (; n10 < t10; n10++) r10[n10] = [].concat(e10);
    else for (; n10 < t10; n10++) r10[n10] = e10;
    return r10;
  };
  function nZ(e10, t10, n10) {
    void 0 === n10 && (n10 = " ");
    var r10 = String(e10);
    return (t10 |= 0, r10.length > t10) ? String(r10) : ((t10 -= r10.length) > n10.length && (n10 += nM(n10, t10 / n10.length)), n10.slice(0, t10) + String(r10));
  }
  var nU = function(e10, t10, n10) {
    var r10 = e10.split(t10);
    return n10 ? r10.slice(0, n10).concat([r10.slice(n10).join(t10)]) : r10;
  }, nP = function(e10, t10) {
    var n10 = e10 % t10;
    return n10 * t10 < 0 ? n10 + t10 : n10;
  }, nY = function(e10, t10) {
    return { div: Math.floor(e10 / t10), mod: nP(e10, t10) };
  }, n$ = function(e10) {
    return !nA(e10) || 0 === e10.length;
  }, nz = function(e10) {
    return !n$(e10);
  }, nF = function(e10, t10) {
    return nz(e10) && -1 !== e10.indexOf(t10);
  }, nq = function(e10, t10, n10, r10, a10, i10) {
    return void 0 === r10 && (r10 = 0), void 0 === a10 && (a10 = 0), void 0 === i10 && (i10 = 0), new Date(Date.UTC(e10, t10 - 1, n10, r10, a10, i10));
  }, nW = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31], nH = nq(1970, 1, 1), nB = [6, 0, 1, 2, 3, 4, 5], nV = function(e10) {
    return e10 % 4 == 0 && e10 % 100 != 0 || e10 % 400 == 0;
  }, nK = function(e10) {
    return e10 instanceof Date;
  }, nG = function(e10) {
    return nK(e10) && !isNaN(e10.getTime());
  }, nX = function(e10) {
    var t10, n10;
    return t10 = e10, n10 = nH, Math.round((t10.getTime() - n10.getTime()) / 864e5);
  }, nJ = function(e10) {
    return new Date(nH.getTime() + 864e5 * e10);
  }, nQ = function(e10) {
    var t10 = e10.getUTCMonth();
    return 1 === t10 && nV(e10.getUTCFullYear()) ? 29 : nW[t10];
  }, n0 = function(e10) {
    return nB[e10.getUTCDay()];
  }, n1 = function(e10, t10) {
    var n10 = nq(e10, t10 + 1, 1);
    return [n0(n10), nQ(n10)];
  }, n2 = function(e10, t10) {
    return t10 = t10 || e10, new Date(Date.UTC(e10.getUTCFullYear(), e10.getUTCMonth(), e10.getUTCDate(), t10.getHours(), t10.getMinutes(), t10.getSeconds(), t10.getMilliseconds()));
  }, n4 = function(e10) {
    return new Date(e10.getTime());
  }, n5 = function(e10) {
    for (var t10 = [], n10 = 0; n10 < e10.length; n10++) t10.push(n4(e10[n10]));
    return t10;
  }, n3 = function(e10) {
    e10.sort(function(e11, t10) {
      return e11.getTime() - t10.getTime();
    });
  }, n6 = function(e10, t10) {
    void 0 === t10 && (t10 = true);
    var n10 = new Date(e10);
    return [nZ(n10.getUTCFullYear().toString(), 4, "0"), nZ(n10.getUTCMonth() + 1, 2, "0"), nZ(n10.getUTCDate(), 2, "0"), "T", nZ(n10.getUTCHours(), 2, "0"), nZ(n10.getUTCMinutes(), 2, "0"), nZ(n10.getUTCSeconds(), 2, "0"), t10 ? "Z" : ""].join("");
  }, n9 = function(e10) {
    var t10 = /^(\d{4})(\d{2})(\d{2})(T(\d{2})(\d{2})(\d{2})Z?)?$/.exec(e10);
    if (!t10) throw Error("Invalid UNTIL value: ".concat(e10));
    return new Date(Date.UTC(parseInt(t10[1], 10), parseInt(t10[2], 10) - 1, parseInt(t10[3], 10), parseInt(t10[5], 10) || 0, parseInt(t10[6], 10) || 0, parseInt(t10[7], 10) || 0));
  }, n8 = function(e10, t10) {
    return e10.toLocaleString("sv-SE", { timeZone: t10 }).replace(" ", "T") + "Z";
  }, n7 = function(e10, t10) {
    var n10 = new Date(n8(e10, Intl.DateTimeFormat().resolvedOptions().timeZone)), r10 = new Date(n8(e10, null != t10 ? t10 : "UTC")).getTime() - n10.getTime();
    return new Date(e10.getTime() - r10);
  }, re = function() {
    function e10(e11, t10) {
      this.minDate = null, this.maxDate = null, this._result = [], this.total = 0, this.method = e11, this.args = t10, "between" === e11 ? (this.maxDate = t10.inc ? t10.before : new Date(t10.before.getTime() - 1), this.minDate = t10.inc ? t10.after : new Date(t10.after.getTime() + 1)) : "before" === e11 ? this.maxDate = t10.inc ? t10.dt : new Date(t10.dt.getTime() - 1) : "after" === e11 && (this.minDate = t10.inc ? t10.dt : new Date(t10.dt.getTime() + 1));
    }
    return e10.prototype.accept = function(e11) {
      ++this.total;
      var t10 = this.minDate && e11 < this.minDate, n10 = this.maxDate && e11 > this.maxDate;
      if ("between" === this.method) {
        if (t10) return true;
        if (n10) return false;
      } else if ("before" === this.method) {
        if (n10) return false;
      } else if ("after" === this.method) return !!t10 || (this.add(e11), false);
      return this.add(e11);
    }, e10.prototype.add = function(e11) {
      return this._result.push(e11), true;
    }, e10.prototype.getValue = function() {
      var e11 = this._result;
      switch (this.method) {
        case "all":
        case "between":
          return e11;
        default:
          return e11.length ? e11[e11.length - 1] : null;
      }
    }, e10.prototype.clone = function() {
      return new e10(this.method, this.args);
    }, e10;
  }(), rt = function(e10, t10) {
    return (rt = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e11, t11) {
      e11.__proto__ = t11;
    } || function(e11, t11) {
      for (var n10 in t11) Object.prototype.hasOwnProperty.call(t11, n10) && (e11[n10] = t11[n10]);
    })(e10, t10);
  };
  function rn(e10, t10) {
    if ("function" != typeof t10 && null !== t10) throw TypeError("Class extends value " + String(t10) + " is not a constructor or null");
    function n10() {
      this.constructor = e10;
    }
    rt(e10, t10), e10.prototype = null === t10 ? Object.create(t10) : (n10.prototype = t10.prototype, new n10());
  }
  var rr = function() {
    return (rr = Object.assign || function(e10) {
      for (var t10, n10 = 1, r10 = arguments.length; n10 < r10; n10++) for (var a10 in t10 = arguments[n10]) Object.prototype.hasOwnProperty.call(t10, a10) && (e10[a10] = t10[a10]);
      return e10;
    }).apply(this, arguments);
  };
  function ra(e10, t10, n10) {
    if (n10 || 2 == arguments.length) for (var r10, a10 = 0, i10 = t10.length; a10 < i10; a10++) !r10 && a10 in t10 || (r10 || (r10 = Array.prototype.slice.call(t10, 0, a10)), r10[a10] = t10[a10]);
    return e10.concat(r10 || Array.prototype.slice.call(t10));
  }
  var ri = ("function" == typeof SuppressedError && SuppressedError, function(e10) {
    function t10(t11, n10, r10) {
      var a10 = e10.call(this, t11, n10) || this;
      return a10.iterator = r10, a10;
    }
    return rn(t10, e10), t10.prototype.add = function(e11) {
      return !!this.iterator(e11, this._result.length) && (this._result.push(e11), true);
    }, t10;
  }(re));
  let rs = { dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], tokens: { SKIP: /^[ \r\n\t]+|^\.$/, number: /^[1-9][0-9]*/, numberAsText: /^(one|two|three)/i, every: /^every/i, "day(s)": /^days?/i, "weekday(s)": /^weekdays?/i, "week(s)": /^weeks?/i, "hour(s)": /^hours?/i, "minute(s)": /^minutes?/i, "month(s)": /^months?/i, "year(s)": /^years?/i, on: /^(on|in)/i, at: /^(at)/i, the: /^the/i, first: /^first/i, second: /^second/i, third: /^third/i, nth: /^([1-9][0-9]*)(\.|th|nd|rd|st)/i, last: /^last/i, for: /^for/i, "time(s)": /^times?/i, until: /^(un)?til/i, monday: /^mo(n(day)?)?/i, tuesday: /^tu(e(s(day)?)?)?/i, wednesday: /^we(d(n(esday)?)?)?/i, thursday: /^th(u(r(sday)?)?)?/i, friday: /^fr(i(day)?)?/i, saturday: /^sa(t(urday)?)?/i, sunday: /^su(n(day)?)?/i, january: /^jan(uary)?/i, february: /^feb(ruary)?/i, march: /^mar(ch)?/i, april: /^apr(il)?/i, may: /^may/i, june: /^june?/i, july: /^july?/i, august: /^aug(ust)?/i, september: /^sep(t(ember)?)?/i, october: /^oct(ober)?/i, november: /^nov(ember)?/i, december: /^dec(ember)?/i, comma: /^(,\s*|(and|or)\s*)+/i } };
  var ro = function(e10, t10) {
    return -1 !== e10.indexOf(t10);
  }, rl = function(e10) {
    return e10.toString();
  }, rd = function(e10, t10, n10) {
    return "".concat(t10, " ").concat(n10, ", ").concat(e10);
  }, rc = function() {
    function e10(e11, t10, n10, r10) {
      if (void 0 === t10 && (t10 = rl), void 0 === n10 && (n10 = rs), void 0 === r10 && (r10 = rd), this.text = [], this.language = n10 || rs, this.gettext = t10, this.dateFormatter = r10, this.rrule = e11, this.options = e11.options, this.origOptions = e11.origOptions, this.origOptions.bymonthday) {
        var a10 = [].concat(this.options.bymonthday), i10 = [].concat(this.options.bynmonthday);
        a10.sort(function(e12, t11) {
          return e12 - t11;
        }), i10.sort(function(e12, t11) {
          return t11 - e12;
        }), this.bymonthday = a10.concat(i10), this.bymonthday.length || (this.bymonthday = null);
      }
      if (nA(this.origOptions.byweekday)) {
        var s10 = nD(this.origOptions.byweekday) ? this.origOptions.byweekday : [this.origOptions.byweekday], o2 = String(s10);
        this.byweekday = { allWeeks: s10.filter(function(e12) {
          return !e12.n;
        }), someWeeks: s10.filter(function(e12) {
          return !!e12.n;
        }), isWeekdays: -1 !== o2.indexOf("MO") && -1 !== o2.indexOf("TU") && -1 !== o2.indexOf("WE") && -1 !== o2.indexOf("TH") && -1 !== o2.indexOf("FR") && -1 === o2.indexOf("SA") && -1 === o2.indexOf("SU"), isEveryDay: -1 !== o2.indexOf("MO") && -1 !== o2.indexOf("TU") && -1 !== o2.indexOf("WE") && -1 !== o2.indexOf("TH") && -1 !== o2.indexOf("FR") && -1 !== o2.indexOf("SA") && -1 !== o2.indexOf("SU") };
        var l2 = function(e12, t11) {
          return e12.weekday - t11.weekday;
        };
        this.byweekday.allWeeks.sort(l2), this.byweekday.someWeeks.sort(l2), this.byweekday.allWeeks.length || (this.byweekday.allWeeks = null), this.byweekday.someWeeks.length || (this.byweekday.someWeeks = null);
      } else this.byweekday = null;
    }
    return e10.isFullyConvertible = function(t10) {
      if (!(t10.options.freq in e10.IMPLEMENTED) || t10.origOptions.until && t10.origOptions.count) return false;
      for (var n10 in t10.origOptions) {
        if (ro(["dtstart", "tzid", "wkst", "freq"], n10)) break;
        if (!ro(e10.IMPLEMENTED[t10.options.freq], n10)) return false;
      }
      return true;
    }, e10.prototype.isFullyConvertible = function() {
      return e10.isFullyConvertible(this.rrule);
    }, e10.prototype.toString = function() {
      var t10 = this.gettext;
      if (!(this.options.freq in e10.IMPLEMENTED)) return t10("RRule error: Unable to fully convert this rrule to text");
      if (this.text = [t10("every")], this[rX.FREQUENCIES[this.options.freq]](), this.options.until) {
        this.add(t10("until"));
        var n10 = this.options.until;
        this.add(this.dateFormatter(n10.getUTCFullYear(), this.language.monthNames[n10.getUTCMonth()], n10.getUTCDate()));
      } else this.options.count && this.add(t10("for")).add(this.options.count.toString()).add(t10(this.plural(this.options.count) ? "times" : "time"));
      return this.isFullyConvertible() || this.add(t10("(~ approximate)")), this.text.join("");
    }, e10.prototype.HOURLY = function() {
      var e11 = this.gettext;
      1 !== this.options.interval && this.add(this.options.interval.toString()), this.add(e11(this.plural(this.options.interval) ? "hours" : "hour"));
    }, e10.prototype.MINUTELY = function() {
      var e11 = this.gettext;
      1 !== this.options.interval && this.add(this.options.interval.toString()), this.add(e11(this.plural(this.options.interval) ? "minutes" : "minute"));
    }, e10.prototype.DAILY = function() {
      var e11 = this.gettext;
      1 !== this.options.interval && this.add(this.options.interval.toString()), this.byweekday && this.byweekday.isWeekdays ? this.add(e11(this.plural(this.options.interval) ? "weekdays" : "weekday")) : this.add(e11(this.plural(this.options.interval) ? "days" : "day")), this.origOptions.bymonth && (this.add(e11("in")), this._bymonth()), this.bymonthday ? this._bymonthday() : this.byweekday ? this._byweekday() : this.origOptions.byhour && this._byhour();
    }, e10.prototype.WEEKLY = function() {
      var e11 = this.gettext;
      1 !== this.options.interval && this.add(this.options.interval.toString()).add(e11(this.plural(this.options.interval) ? "weeks" : "week")), this.byweekday && this.byweekday.isWeekdays ? 1 === this.options.interval ? this.add(e11(this.plural(this.options.interval) ? "weekdays" : "weekday")) : this.add(e11("on")).add(e11("weekdays")) : this.byweekday && this.byweekday.isEveryDay ? this.add(e11(this.plural(this.options.interval) ? "days" : "day")) : (1 === this.options.interval && this.add(e11("week")), this.origOptions.bymonth && (this.add(e11("in")), this._bymonth()), this.bymonthday ? this._bymonthday() : this.byweekday && this._byweekday(), this.origOptions.byhour && this._byhour());
    }, e10.prototype.MONTHLY = function() {
      var e11 = this.gettext;
      this.origOptions.bymonth ? (1 !== this.options.interval && (this.add(this.options.interval.toString()).add(e11("months")), this.plural(this.options.interval) && this.add(e11("in"))), this._bymonth()) : (1 !== this.options.interval && this.add(this.options.interval.toString()), this.add(e11(this.plural(this.options.interval) ? "months" : "month"))), this.bymonthday ? this._bymonthday() : this.byweekday && this.byweekday.isWeekdays ? this.add(e11("on")).add(e11("weekdays")) : this.byweekday && this._byweekday();
    }, e10.prototype.YEARLY = function() {
      var e11 = this.gettext;
      this.origOptions.bymonth ? (1 !== this.options.interval && (this.add(this.options.interval.toString()), this.add(e11("years"))), this._bymonth()) : (1 !== this.options.interval && this.add(this.options.interval.toString()), this.add(e11(this.plural(this.options.interval) ? "years" : "year"))), this.bymonthday ? this._bymonthday() : this.byweekday && this._byweekday(), this.options.byyearday && this.add(e11("on the")).add(this.list(this.options.byyearday, this.nth, e11("and"))).add(e11("day")), this.options.byweekno && this.add(e11("in")).add(e11(this.plural(this.options.byweekno.length) ? "weeks" : "week")).add(this.list(this.options.byweekno, void 0, e11("and")));
    }, e10.prototype._bymonthday = function() {
      var e11 = this.gettext;
      this.byweekday && this.byweekday.allWeeks ? this.add(e11("on")).add(this.list(this.byweekday.allWeeks, this.weekdaytext, e11("or"))).add(e11("the")).add(this.list(this.bymonthday, this.nth, e11("or"))) : this.add(e11("on the")).add(this.list(this.bymonthday, this.nth, e11("and")));
    }, e10.prototype._byweekday = function() {
      var e11 = this.gettext;
      this.byweekday.allWeeks && !this.byweekday.isWeekdays && this.add(e11("on")).add(this.list(this.byweekday.allWeeks, this.weekdaytext)), this.byweekday.someWeeks && (this.byweekday.allWeeks && this.add(e11("and")), this.add(e11("on the")).add(this.list(this.byweekday.someWeeks, this.weekdaytext, e11("and"))));
    }, e10.prototype._byhour = function() {
      var e11 = this.gettext;
      this.add(e11("at")).add(this.list(this.origOptions.byhour, void 0, e11("and")));
    }, e10.prototype._bymonth = function() {
      this.add(this.list(this.options.bymonth, this.monthtext, this.gettext("and")));
    }, e10.prototype.nth = function(e11) {
      e11 = parseInt(e11.toString(), 10);
      var t10, n10 = this.gettext;
      if (-1 === e11) return n10("last");
      var r10 = Math.abs(e11);
      switch (r10) {
        case 1:
        case 21:
        case 31:
          t10 = r10 + n10("st");
          break;
        case 2:
        case 22:
          t10 = r10 + n10("nd");
          break;
        case 3:
        case 23:
          t10 = r10 + n10("rd");
          break;
        default:
          t10 = r10 + n10("th");
      }
      return e11 < 0 ? t10 + " " + n10("last") : t10;
    }, e10.prototype.monthtext = function(e11) {
      return this.language.monthNames[e11 - 1];
    }, e10.prototype.weekdaytext = function(e11) {
      var t10 = nO(e11) ? (e11 + 1) % 7 : e11.getJsWeekday();
      return (e11.n ? this.nth(e11.n) + " " : "") + this.language.dayNames[t10];
    }, e10.prototype.plural = function(e11) {
      return e11 % 100 != 1;
    }, e10.prototype.add = function(e11) {
      return this.text.push(" "), this.text.push(e11), this;
    }, e10.prototype.list = function(e11, t10, n10, r10) {
      var a10 = this;
      void 0 === r10 && (r10 = ","), nD(e11) || (e11 = [e11]), t10 = t10 || function(e12) {
        return e12.toString();
      };
      var i10 = function(e12) {
        return t10 && t10.call(a10, e12);
      };
      if (!n10) return e11.map(i10).join(r10 + " ");
      for (var s10 = e11.map(i10), o2 = r10, l2 = "", d2 = 0; d2 < s10.length; d2++) 0 !== d2 && (d2 === s10.length - 1 ? l2 += " " + n10 + " " : l2 += o2 + " "), l2 += s10[d2];
      return l2;
    }, e10;
  }(), ru = function() {
    function e10(e11) {
      this.done = true, this.rules = e11;
    }
    return e10.prototype.start = function(e11) {
      return this.text = e11, this.done = false, this.nextSymbol();
    }, e10.prototype.isDone = function() {
      return this.done && null === this.symbol;
    }, e10.prototype.nextSymbol = function() {
      this.symbol = null, this.value = null;
      do {
        if (this.done) return false;
        for (var e11 in t10 = null, this.rules) {
          var t10, n10, r10 = this.rules[e11].exec(this.text);
          r10 && (null === t10 || r10[0].length > t10[0].length) && (t10 = r10, n10 = e11);
        }
        if (null != t10 && (this.text = this.text.substr(t10[0].length), "" === this.text && (this.done = true)), null == t10) {
          this.done = true, this.symbol = null, this.value = null;
          return;
        }
      } while ("SKIP" === n10);
      return this.symbol = n10, this.value = t10, true;
    }, e10.prototype.accept = function(e11) {
      if (this.symbol === e11) {
        if (this.value) {
          var t10 = this.value;
          return this.nextSymbol(), t10;
        }
        return this.nextSymbol(), true;
      }
      return false;
    }, e10.prototype.acceptNumber = function() {
      return this.accept("number");
    }, e10.prototype.expect = function(e11) {
      if (this.accept(e11)) return true;
      throw Error("expected " + e11 + " but found " + this.symbol);
    }, e10;
  }();
  function rp(e10, t10) {
    void 0 === t10 && (t10 = rs);
    var n10 = {}, r10 = new ru(t10.tokens);
    if (!r10.start(e10)) return null;
    return function() {
      r10.expect("every");
      var e11 = r10.acceptNumber();
      if (e11 && (n10.interval = parseInt(e11[0], 10)), r10.isDone()) throw Error("Unexpected end");
      switch (r10.symbol) {
        case "day(s)":
          n10.freq = rX.DAILY, r10.nextSymbol() && (i10(), d2());
          break;
        case "weekday(s)":
          n10.freq = rX.WEEKLY, n10.byweekday = [rX.MO, rX.TU, rX.WE, rX.TH, rX.FR], r10.nextSymbol(), i10(), d2();
          break;
        case "week(s)":
          n10.freq = rX.WEEKLY, r10.nextSymbol() && (a10(), i10(), d2());
          break;
        case "hour(s)":
          n10.freq = rX.HOURLY, r10.nextSymbol() && (a10(), d2());
          break;
        case "minute(s)":
          n10.freq = rX.MINUTELY, r10.nextSymbol() && (a10(), d2());
          break;
        case "month(s)":
          n10.freq = rX.MONTHLY, r10.nextSymbol() && (a10(), d2());
          break;
        case "year(s)":
          n10.freq = rX.YEARLY, r10.nextSymbol() && (a10(), d2());
          break;
        case "monday":
        case "tuesday":
        case "wednesday":
        case "thursday":
        case "friday":
        case "saturday":
        case "sunday":
          if (n10.freq = rX.WEEKLY, n10.byweekday = [rX[r10.symbol.substr(0, 2).toUpperCase()]], !r10.nextSymbol()) return;
          for (; r10.accept("comma"); ) {
            if (r10.isDone()) throw Error("Unexpected end");
            var t11 = o2();
            if (!t11) throw Error("Unexpected symbol " + r10.symbol + ", expected weekday");
            n10.byweekday.push(rX[t11]), r10.nextSymbol();
          }
          i10(), function() {
            r10.accept("on"), r10.accept("the");
            var e12 = l2();
            if (e12) for (n10.bymonthday = [e12], r10.nextSymbol(); r10.accept("comma"); ) {
              if (!(e12 = l2())) throw Error("Unexpected symbol " + r10.symbol + "; expected monthday");
              n10.bymonthday.push(e12), r10.nextSymbol();
            }
          }(), d2();
          break;
        case "january":
        case "february":
        case "march":
        case "april":
        case "may":
        case "june":
        case "july":
        case "august":
        case "september":
        case "october":
        case "november":
        case "december":
          if (n10.freq = rX.YEARLY, n10.bymonth = [s10()], !r10.nextSymbol()) return;
          for (; r10.accept("comma"); ) {
            if (r10.isDone()) throw Error("Unexpected end");
            var c2 = s10();
            if (!c2) throw Error("Unexpected symbol " + r10.symbol + ", expected month");
            n10.bymonth.push(c2), r10.nextSymbol();
          }
          a10(), d2();
          break;
        default:
          throw Error("Unknown symbol");
      }
    }(), n10;
    function a10() {
      var e11 = r10.accept("on"), t11 = r10.accept("the");
      if (e11 || t11) do {
        var a11 = l2(), i11 = o2(), d3 = s10();
        if (a11) i11 ? (r10.nextSymbol(), n10.byweekday || (n10.byweekday = []), n10.byweekday.push(rX[i11].nth(a11))) : (n10.bymonthday || (n10.bymonthday = []), n10.bymonthday.push(a11), r10.accept("day(s)"));
        else if (i11) r10.nextSymbol(), n10.byweekday || (n10.byweekday = []), n10.byweekday.push(rX[i11]);
        else if ("weekday(s)" === r10.symbol) r10.nextSymbol(), n10.byweekday || (n10.byweekday = [rX.MO, rX.TU, rX.WE, rX.TH, rX.FR]);
        else if ("week(s)" === r10.symbol) {
          r10.nextSymbol();
          var c2 = r10.acceptNumber();
          if (!c2) throw Error("Unexpected symbol " + r10.symbol + ", expected week number");
          for (n10.byweekno = [parseInt(c2[0], 10)]; r10.accept("comma"); ) {
            if (!(c2 = r10.acceptNumber())) throw Error("Unexpected symbol " + r10.symbol + "; expected monthday");
            n10.byweekno.push(parseInt(c2[0], 10));
          }
        } else {
          if (!d3) return;
          r10.nextSymbol(), n10.bymonth || (n10.bymonth = []), n10.bymonth.push(d3);
        }
      } while (r10.accept("comma") || r10.accept("the") || r10.accept("on"));
    }
    function i10() {
      if (r10.accept("at")) do {
        var e11 = r10.acceptNumber();
        if (!e11) throw Error("Unexpected symbol " + r10.symbol + ", expected hour");
        for (n10.byhour = [parseInt(e11[0], 10)]; r10.accept("comma"); ) {
          if (!(e11 = r10.acceptNumber())) throw Error("Unexpected symbol " + r10.symbol + "; expected hour");
          n10.byhour.push(parseInt(e11[0], 10));
        }
      } while (r10.accept("comma") || r10.accept("at"));
    }
    function s10() {
      switch (r10.symbol) {
        case "january":
          return 1;
        case "february":
          return 2;
        case "march":
          return 3;
        case "april":
          return 4;
        case "may":
          return 5;
        case "june":
          return 6;
        case "july":
          return 7;
        case "august":
          return 8;
        case "september":
          return 9;
        case "october":
          return 10;
        case "november":
          return 11;
        case "december":
          return 12;
        default:
          return false;
      }
    }
    function o2() {
      switch (r10.symbol) {
        case "monday":
        case "tuesday":
        case "wednesday":
        case "thursday":
        case "friday":
        case "saturday":
        case "sunday":
          return r10.symbol.substr(0, 2).toUpperCase();
        default:
          return false;
      }
    }
    function l2() {
      switch (r10.symbol) {
        case "last":
          return r10.nextSymbol(), -1;
        case "first":
          return r10.nextSymbol(), 1;
        case "second":
          return r10.nextSymbol(), r10.accept("last") ? -2 : 2;
        case "third":
          return r10.nextSymbol(), r10.accept("last") ? -3 : 3;
        case "nth":
          var e11 = parseInt(r10.value[1], 10);
          if (e11 < -366 || e11 > 366) throw Error("Nth out of range: " + e11);
          return r10.nextSymbol(), r10.accept("last") ? -e11 : e11;
        default:
          return false;
      }
    }
    function d2() {
      if ("until" === r10.symbol) {
        var e11 = Date.parse(r10.text);
        if (!e11) throw Error("Cannot parse until date:" + r10.text);
        n10.until = new Date(e11);
      } else r10.accept("for") && (n10.count = parseInt(r10.value[0], 10), r10.expect("number"));
    }
  }
  function rh(e10) {
    return e10 < u.HOURLY;
  }
  (i = u || (u = {}))[i.YEARLY = 0] = "YEARLY", i[i.MONTHLY = 1] = "MONTHLY", i[i.WEEKLY = 2] = "WEEKLY", i[i.DAILY = 3] = "DAILY", i[i.HOURLY = 4] = "HOURLY", i[i.MINUTELY = 5] = "MINUTELY", i[i.SECONDLY = 6] = "SECONDLY";
  var rm = ["count", "until", "interval", "byweekday", "bymonthday", "bymonth"];
  rc.IMPLEMENTED = [], rc.IMPLEMENTED[u.HOURLY] = rm, rc.IMPLEMENTED[u.MINUTELY] = rm, rc.IMPLEMENTED[u.DAILY] = ["byhour"].concat(rm), rc.IMPLEMENTED[u.WEEKLY] = rm, rc.IMPLEMENTED[u.MONTHLY] = rm, rc.IMPLEMENTED[u.YEARLY] = ["byweekno", "byyearday"].concat(rm);
  var rf = rc.isFullyConvertible, ry = function() {
    function e10(e11, t10, n10, r10) {
      this.hour = e11, this.minute = t10, this.second = n10, this.millisecond = r10 || 0;
    }
    return e10.prototype.getHours = function() {
      return this.hour;
    }, e10.prototype.getMinutes = function() {
      return this.minute;
    }, e10.prototype.getSeconds = function() {
      return this.second;
    }, e10.prototype.getMilliseconds = function() {
      return this.millisecond;
    }, e10.prototype.getTime = function() {
      return (60 * this.hour * 60 + 60 * this.minute + this.second) * 1e3 + this.millisecond;
    }, e10;
  }(), rg = function(e10) {
    function t10(t11, n10, r10, a10, i10, s10, o2) {
      var l2 = e10.call(this, a10, i10, s10, o2) || this;
      return l2.year = t11, l2.month = n10, l2.day = r10, l2;
    }
    return rn(t10, e10), t10.fromDate = function(e11) {
      return new this(e11.getUTCFullYear(), e11.getUTCMonth() + 1, e11.getUTCDate(), e11.getUTCHours(), e11.getUTCMinutes(), e11.getUTCSeconds(), e11.valueOf() % 1e3);
    }, t10.prototype.getWeekday = function() {
      return n0(new Date(this.getTime()));
    }, t10.prototype.getTime = function() {
      return new Date(Date.UTC(this.year, this.month - 1, this.day, this.hour, this.minute, this.second, this.millisecond)).getTime();
    }, t10.prototype.getDay = function() {
      return this.day;
    }, t10.prototype.getMonth = function() {
      return this.month;
    }, t10.prototype.getYear = function() {
      return this.year;
    }, t10.prototype.addYears = function(e11) {
      this.year += e11;
    }, t10.prototype.addMonths = function(e11) {
      if (this.month += e11, this.month > 12) {
        var t11 = Math.floor(this.month / 12), n10 = nP(this.month, 12);
        this.month = n10, this.year += t11, 0 === this.month && (this.month = 12, --this.year);
      }
    }, t10.prototype.addWeekly = function(e11, t11) {
      t11 > this.getWeekday() ? this.day += -(this.getWeekday() + 1 + (6 - t11)) + 7 * e11 : this.day += -(this.getWeekday() - t11) + 7 * e11, this.fixDay();
    }, t10.prototype.addDaily = function(e11) {
      this.day += e11, this.fixDay();
    }, t10.prototype.addHours = function(e11, t11, n10) {
      for (t11 && (this.hour += Math.floor((23 - this.hour) / e11) * e11); ; ) {
        this.hour += e11;
        var r10 = nY(this.hour, 24), a10 = r10.div, i10 = r10.mod;
        if (a10 && (this.hour = i10, this.addDaily(a10)), n$(n10) || nF(n10, this.hour)) break;
      }
    }, t10.prototype.addMinutes = function(e11, t11, n10, r10) {
      for (t11 && (this.minute += Math.floor((1439 - (60 * this.hour + this.minute)) / e11) * e11); ; ) {
        this.minute += e11;
        var a10 = nY(this.minute, 60), i10 = a10.div, s10 = a10.mod;
        if (i10 && (this.minute = s10, this.addHours(i10, false, n10)), (n$(n10) || nF(n10, this.hour)) && (n$(r10) || nF(r10, this.minute))) break;
      }
    }, t10.prototype.addSeconds = function(e11, t11, n10, r10, a10) {
      for (t11 && (this.second += Math.floor((86399 - (3600 * this.hour + 60 * this.minute + this.second)) / e11) * e11); ; ) {
        this.second += e11;
        var i10 = nY(this.second, 60), s10 = i10.div, o2 = i10.mod;
        if (s10 && (this.second = o2, this.addMinutes(s10, false, n10, r10)), (n$(n10) || nF(n10, this.hour)) && (n$(r10) || nF(r10, this.minute)) && (n$(a10) || nF(a10, this.second))) break;
      }
    }, t10.prototype.fixDay = function() {
      if (!(this.day <= 28)) {
        var e11 = n1(this.year, this.month - 1)[1];
        if (!(this.day <= e11)) for (; this.day > e11; ) {
          if (this.day -= e11, ++this.month, 13 === this.month && (this.month = 1, ++this.year, this.year > 9999)) return;
          e11 = n1(this.year, this.month - 1)[1];
        }
      }
    }, t10.prototype.add = function(e11, t11) {
      var n10 = e11.freq, r10 = e11.interval, a10 = e11.wkst, i10 = e11.byhour, s10 = e11.byminute, o2 = e11.bysecond;
      switch (n10) {
        case u.YEARLY:
          return this.addYears(r10);
        case u.MONTHLY:
          return this.addMonths(r10);
        case u.WEEKLY:
          return this.addWeekly(r10, a10);
        case u.DAILY:
          return this.addDaily(r10);
        case u.HOURLY:
          return this.addHours(r10, t11, i10);
        case u.MINUTELY:
          return this.addMinutes(r10, t11, i10, s10);
        case u.SECONDLY:
          return this.addSeconds(r10, t11, i10, s10, o2);
      }
    }, t10;
  }(ry);
  function rb(e10) {
    for (var t10 = [], n10 = Object.keys(e10), r10 = 0; r10 < n10.length; r10++) {
      var a10 = n10[r10];
      nF(rG, a10) || t10.push(a10), nK(e10[a10]) && !nG(e10[a10]) && t10.push(a10);
    }
    if (t10.length) throw Error("Invalid options: " + t10.join(", "));
    return rr({}, e10);
  }
  function rv(e10) {
    var t10 = e10.split("\n").map(r_).filter(function(e11) {
      return null !== e11;
    });
    return rr(rr({}, t10[0]), t10[1]);
  }
  function rx(e10) {
    var t10 = {}, n10 = /DTSTART(?:;TZID=([^:=]+?))?(?::|=)([^;\s]+)/i.exec(e10);
    if (!n10) return t10;
    var r10 = n10[1], a10 = n10[2];
    return r10 && (t10.tzid = r10), t10.dtstart = n9(a10), t10;
  }
  function r_(e10) {
    if (!(e10 = e10.replace(/^\s+|\s+$/, "")).length) return null;
    var t10 = /^([A-Z]+?)[:;]/.exec(e10.toUpperCase());
    if (!t10) return rk(e10);
    var n10 = t10[1];
    switch (n10.toUpperCase()) {
      case "RRULE":
      case "EXRULE":
        return rk(e10);
      case "DTSTART":
        return rx(e10);
      default:
        throw Error("Unsupported RFC prop ".concat(n10, " in ").concat(e10));
    }
  }
  function rk(e10) {
    var t10 = rx(e10.replace(/^RRULE:/i, ""));
    return e10.replace(/^(?:RRULE|EXRULE):/i, "").split(";").forEach(function(n10) {
      var r10 = n10.split("="), a10 = r10[0], i10 = r10[1];
      switch (a10.toUpperCase()) {
        case "FREQ":
          t10.freq = u[i10.toUpperCase()];
          break;
        case "WKST":
          t10.wkst = rV[i10.toUpperCase()];
          break;
        case "COUNT":
        case "INTERVAL":
        case "BYSETPOS":
        case "BYMONTH":
        case "BYMONTHDAY":
        case "BYYEARDAY":
        case "BYWEEKNO":
        case "BYHOUR":
        case "BYMINUTE":
        case "BYSECOND":
          var s10, o2 = -1 !== (s10 = i10).indexOf(",") ? s10.split(",").map(rw) : rw(s10);
          t10[a10.toLowerCase()] = o2;
          break;
        case "BYWEEKDAY":
        case "BYDAY":
          t10.byweekday = i10.split(",").map(function(e11) {
            if (2 === e11.length) return rV[e11];
            var t11 = e11.match(/^([+-]?\d{1,2})([A-Z]{2})$/);
            if (!t11 || t11.length < 3) throw SyntaxError("Invalid weekday string: ".concat(e11));
            var n11 = Number(t11[1]);
            return new nI(rV[t11[2]].weekday, n11);
          });
          break;
        case "DTSTART":
        case "TZID":
          var l2 = rx(e10);
          t10.tzid = l2.tzid, t10.dtstart = l2.dtstart;
          break;
        case "UNTIL":
          t10.until = n9(i10);
          break;
        case "BYEASTER":
          t10.byeaster = Number(i10);
          break;
        default:
          throw Error("Unknown RRULE property '" + a10 + "'");
      }
    }), t10;
  }
  function rw(e10) {
    return /^[+-]?\d+$/.test(e10) ? Number(e10) : e10;
  }
  var rj = function() {
    function e10(e11, t10) {
      if (isNaN(e11.getTime())) throw RangeError("Invalid date passed to DateWithZone");
      this.date = e11, this.tzid = t10;
    }
    return Object.defineProperty(e10.prototype, "isUTC", { get: function() {
      return !this.tzid || "UTC" === this.tzid.toUpperCase();
    }, enumerable: false, configurable: true }), e10.prototype.toString = function() {
      var e11 = n6(this.date.getTime(), this.isUTC);
      return this.isUTC ? ":".concat(e11) : ";TZID=".concat(this.tzid, ":").concat(e11);
    }, e10.prototype.getTime = function() {
      return this.date.getTime();
    }, e10.prototype.rezonedDate = function() {
      return this.isUTC ? this.date : n7(this.date, this.tzid);
    }, e10;
  }();
  function rE(e10) {
    for (var t10 = [], n10 = "", r10 = Object.keys(e10), a10 = Object.keys(rK), i10 = 0; i10 < r10.length; i10++) if ("tzid" !== r10[i10] && nF(a10, r10[i10])) {
      var s10, o2, l2 = r10[i10].toUpperCase(), d2 = e10[r10[i10]], c2 = "";
      if (!(!nA(d2) || nD(d2) && !d2.length)) {
        switch (l2) {
          case "FREQ":
            c2 = rX.FREQUENCIES[e10.freq];
            break;
          case "WKST":
            c2 = nO(d2) ? new nI(d2).toString() : d2.toString();
            break;
          case "BYWEEKDAY":
            l2 = "BYDAY", c2 = (nD(d2) ? d2 : [d2]).map(function(e11) {
              return e11 instanceof nI ? e11 : nD(e11) ? new nI(e11[0], e11[1]) : new nI(e11);
            }).toString();
            break;
          case "DTSTART":
            s10 = d2, o2 = e10.tzid, n10 = s10 ? "DTSTART" + new rj(new Date(s10), o2).toString() : "";
            break;
          case "UNTIL":
            c2 = n6(d2, !e10.tzid);
            break;
          default:
            if (nD(d2)) {
              for (var u2 = [], p2 = 0; p2 < d2.length; p2++) u2[p2] = String(d2[p2]);
              c2 = u2.toString();
            } else c2 = String(d2);
        }
        c2 && t10.push([l2, c2]);
      }
    }
    var h2 = t10.map(function(e11) {
      var t11 = e11[0], n11 = e11[1];
      return "".concat(t11, "=").concat(n11.toString());
    }).join(";"), m2 = "";
    return "" !== h2 && (m2 = "RRULE:".concat(h2)), [n10, m2].filter(function(e11) {
      return !!e11;
    }).join("\n");
  }
  var rT = function() {
    function e10() {
      this.all = false, this.before = [], this.after = [], this.between = [];
    }
    return e10.prototype._cacheAdd = function(e11, t10, n10) {
      t10 && (t10 = t10 instanceof Date ? n4(t10) : n5(t10)), "all" === e11 ? this.all = t10 : (n10._value = t10, this[e11].push(n10));
    }, e10.prototype._cacheGet = function(e11, t10) {
      var n10 = false, r10 = t10 ? Object.keys(t10) : [], a10 = this[e11];
      if ("all" === e11) n10 = this.all;
      else if (nD(a10)) for (var i10 = 0; i10 < a10.length; i10++) {
        var s10 = a10[i10];
        if (!(r10.length && function(e12) {
          for (var n11 = 0; n11 < r10.length; n11++) {
            var a11 = r10[n11];
            if (!function(e13, t11) {
              return Array.isArray(e13) ? !!Array.isArray(t11) && e13.length === t11.length && e13.every(function(e14, n12) {
                return e14.getTime() === t11[n12].getTime();
              }) : e13 instanceof Date ? t11 instanceof Date && e13.getTime() === t11.getTime() : e13 === t11;
            }(t10[a11], e12[a11])) return true;
          }
          return false;
        }(s10))) {
          n10 = s10._value;
          break;
        }
      }
      if (!n10 && this.all) {
        for (var o2 = new re(e11, t10), i10 = 0; i10 < this.all.length && o2.accept(this.all[i10]); i10++) ;
        n10 = o2.getValue(), this._cacheAdd(e11, n10, t10);
      }
      return nD(n10) ? n5(n10) : n10 instanceof Date ? n4(n10) : n10;
    }, e10;
  }(), rC = ra(ra(ra(ra(ra(ra(ra(ra(ra(ra(ra(ra(ra([], nM(1, 31), true), nM(2, 28), true), nM(3, 31), true), nM(4, 30), true), nM(5, 31), true), nM(6, 30), true), nM(7, 31), true), nM(8, 31), true), nM(9, 30), true), nM(10, 31), true), nM(11, 30), true), nM(12, 31), true), nM(1, 7), true), rS = ra(ra(ra(ra(ra(ra(ra(ra(ra(ra(ra(ra(ra([], nM(1, 31), true), nM(2, 29), true), nM(3, 31), true), nM(4, 30), true), nM(5, 31), true), nM(6, 30), true), nM(7, 31), true), nM(8, 31), true), nM(9, 30), true), nM(10, 31), true), nM(11, 30), true), nM(12, 31), true), nM(1, 7), true), rN = nL(1, 29), rI = nL(1, 30), rA = nL(1, 31), rO = nL(1, 32), rR = ra(ra(ra(ra(ra(ra(ra(ra(ra(ra(ra(ra(ra([], rO, true), rI, true), rO, true), rA, true), rO, true), rA, true), rO, true), rO, true), rA, true), rO, true), rA, true), rO, true), rO.slice(0, 7), true), rD = ra(ra(ra(ra(ra(ra(ra(ra(ra(ra(ra(ra(ra([], rO, true), rN, true), rO, true), rA, true), rO, true), rA, true), rO, true), rO, true), rA, true), rO, true), rA, true), rO, true), rO.slice(0, 7), true), rL = nL(-28, 0), rM = nL(-29, 0), rZ = nL(-30, 0), rU = nL(-31, 0), rP = ra(ra(ra(ra(ra(ra(ra(ra(ra(ra(ra(ra(ra([], rU, true), rM, true), rU, true), rZ, true), rU, true), rZ, true), rU, true), rU, true), rZ, true), rU, true), rZ, true), rU, true), rU.slice(0, 7), true), rY = ra(ra(ra(ra(ra(ra(ra(ra(ra(ra(ra(ra(ra([], rU, true), rL, true), rU, true), rZ, true), rU, true), rZ, true), rU, true), rU, true), rZ, true), rU, true), rZ, true), rU, true), rU.slice(0, 7), true), r$ = [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335, 366], rz = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334, 365], rF = function() {
    for (var e10 = [], t10 = 0; t10 < 55; t10++) e10 = e10.concat(nL(7));
    return e10;
  }(), rq = function() {
    function e10(e11) {
      this.options = e11;
    }
    return e10.prototype.rebuild = function(e11, t10) {
      var n10, r10, a10, i10, s10, o2, l2, d2, c2, u2, p2 = this.options;
      if (e11 !== this.lastyear && (this.yearinfo = function(e12, t11) {
        var n11, r11, a11, i11, s11, o3 = nq(e12, 1, 1), l3 = nV(e12) ? 366 : 365, d3 = nV(e12 + 1) ? 366 : 365, c3 = nX(o3), u3 = n0(o3), p3 = rr(rr({ yearlen: l3, nextyearlen: d3, yearordinal: c3, yearweekday: u3 }, (r11 = nV(n11 = e12) ? 366 : 365, a11 = n0(nq(n11, 1, 1)), 365 === r11 ? { mmask: rC, mdaymask: rD, nmdaymask: rY, wdaymask: rF.slice(a11), mrange: rz } : { mmask: rS, mdaymask: rR, nmdaymask: rP, wdaymask: rF.slice(a11), mrange: r$ })), { wnomask: null });
        if (n$(t11.byweekno)) return p3;
        p3.wnomask = nM(0, l3 + 7);
        var h3 = i11 = nP(7 - u3 + t11.wkst, 7);
        h3 >= 4 ? (h3 = 0, s11 = p3.yearlen + nP(u3 - t11.wkst, 7)) : s11 = l3 - h3;
        for (var m3 = Math.floor(Math.floor(s11 / 7) + nP(s11, 7) / 4), f3 = 0; f3 < t11.byweekno.length; f3++) {
          var y3 = t11.byweekno[f3];
          if (y3 < 0 && (y3 += m3 + 1), y3 > 0 && y3 <= m3) {
            var g2 = void 0;
            y3 > 1 ? (g2 = h3 + (y3 - 1) * 7, h3 !== i11 && (g2 -= 7 - i11)) : g2 = h3;
            for (var b2 = 0; b2 < 7 && (p3.wnomask[g2] = 1, g2++, p3.wdaymask[g2] !== t11.wkst); b2++) ;
          }
        }
        if (nF(t11.byweekno, 1)) {
          var g2 = h3 + 7 * m3;
          if (h3 !== i11 && (g2 -= 7 - i11), g2 < l3) for (var f3 = 0; f3 < 7 && (p3.wnomask[g2] = 1, g2 += 1, p3.wdaymask[g2] !== t11.wkst); f3++) ;
        }
        if (h3) {
          var v2 = void 0;
          if (nF(t11.byweekno, -1)) v2 = -1;
          else {
            var x2 = n0(nq(e12 - 1, 1, 1)), _2 = nP(7 - x2.valueOf() + t11.wkst, 7), k2 = nV(e12 - 1) ? 366 : 365, w2 = void 0;
            _2 >= 4 ? (_2 = 0, w2 = k2 + nP(x2 - t11.wkst, 7)) : w2 = l3 - h3, v2 = Math.floor(52 + nP(w2, 7) / 4);
          }
          if (nF(t11.byweekno, v2)) for (var g2 = 0; g2 < h3; g2++) p3.wnomask[g2] = 1;
        }
        return p3;
      }(e11, p2)), nz(p2.bynweekday) && (t10 !== this.lastmonth || e11 !== this.lastyear)) {
        var h2 = this.yearinfo, m2 = h2.yearlen, f2 = h2.mrange, y2 = h2.wdaymask;
        this.monthinfo = function(e12, t11, n11, r11, a11, i11) {
          var s11 = { lastyear: e12, lastmonth: t11, nwdaymask: [] }, o3 = [];
          if (i11.freq === rX.YEARLY) if (n$(i11.bymonth)) o3 = [[0, n11]];
          else for (var l3 = 0; l3 < i11.bymonth.length; l3++) t11 = i11.bymonth[l3], o3.push(r11.slice(t11 - 1, t11 + 1));
          else i11.freq === rX.MONTHLY && (o3 = [r11.slice(t11 - 1, t11 + 1)]);
          if (n$(o3)) return s11;
          s11.nwdaymask = nM(0, n11);
          for (var l3 = 0; l3 < o3.length; l3++) for (var d3 = o3[l3], c3 = d3[0], u3 = d3[1] - 1, p3 = 0; p3 < i11.bynweekday.length; p3++) {
            var h3 = void 0, m3 = i11.bynweekday[p3], f3 = m3[0], y3 = m3[1];
            y3 < 0 ? (h3 = u3 + (y3 + 1) * 7, h3 -= nP(a11[h3] - f3, 7)) : (h3 = c3 + (y3 - 1) * 7, h3 += nP(7 - a11[h3] + f3, 7)), c3 <= h3 && h3 <= u3 && (s11.nwdaymask[h3] = 1);
          }
          return s11;
        }(e11, t10, m2, f2, y2, p2);
      }
      nA(p2.byeaster) && (this.eastermask = (void 0 === (n10 = p2.byeaster) && (n10 = 0), r10 = e11 % 19, a10 = Math.floor(e11 / 100), i10 = e11 % 100, s10 = Math.floor(a10 / 4), o2 = Math.floor((a10 + 8) / 25), l2 = Math.floor((a10 - o2 + 1) / 3), d2 = Math.floor(19 * r10 + a10 - s10 - l2 + 15) % 30, c2 = Math.floor(32 + a10 % 4 * 2 + 2 * Math.floor(i10 / 4) - d2 - i10 % 4) % 7, u2 = Math.floor((r10 + 11 * d2 + 22 * c2) / 451), [Math.ceil((Date.UTC(e11, Math.floor((d2 + c2 - 7 * u2 + 114) / 31) - 1, (d2 + c2 - 7 * u2 + 114) % 31 + 1 + n10) - Date.UTC(e11, 0, 1)) / 864e5)]));
    }, Object.defineProperty(e10.prototype, "lastyear", { get: function() {
      return this.monthinfo ? this.monthinfo.lastyear : null;
    }, enumerable: false, configurable: true }), Object.defineProperty(e10.prototype, "lastmonth", { get: function() {
      return this.monthinfo ? this.monthinfo.lastmonth : null;
    }, enumerable: false, configurable: true }), Object.defineProperty(e10.prototype, "yearlen", { get: function() {
      return this.yearinfo.yearlen;
    }, enumerable: false, configurable: true }), Object.defineProperty(e10.prototype, "yearordinal", { get: function() {
      return this.yearinfo.yearordinal;
    }, enumerable: false, configurable: true }), Object.defineProperty(e10.prototype, "mrange", { get: function() {
      return this.yearinfo.mrange;
    }, enumerable: false, configurable: true }), Object.defineProperty(e10.prototype, "wdaymask", { get: function() {
      return this.yearinfo.wdaymask;
    }, enumerable: false, configurable: true }), Object.defineProperty(e10.prototype, "mmask", { get: function() {
      return this.yearinfo.mmask;
    }, enumerable: false, configurable: true }), Object.defineProperty(e10.prototype, "wnomask", { get: function() {
      return this.yearinfo.wnomask;
    }, enumerable: false, configurable: true }), Object.defineProperty(e10.prototype, "nwdaymask", { get: function() {
      return this.monthinfo ? this.monthinfo.nwdaymask : [];
    }, enumerable: false, configurable: true }), Object.defineProperty(e10.prototype, "nextyearlen", { get: function() {
      return this.yearinfo.nextyearlen;
    }, enumerable: false, configurable: true }), Object.defineProperty(e10.prototype, "mdaymask", { get: function() {
      return this.yearinfo.mdaymask;
    }, enumerable: false, configurable: true }), Object.defineProperty(e10.prototype, "nmdaymask", { get: function() {
      return this.yearinfo.nmdaymask;
    }, enumerable: false, configurable: true }), e10.prototype.ydayset = function() {
      return [nL(this.yearlen), 0, this.yearlen];
    }, e10.prototype.mdayset = function(e11, t10) {
      for (var n10 = this.mrange[t10 - 1], r10 = this.mrange[t10], a10 = nM(null, this.yearlen), i10 = n10; i10 < r10; i10++) a10[i10] = i10;
      return [a10, n10, r10];
    }, e10.prototype.wdayset = function(e11, t10, n10) {
      for (var r10 = nM(null, this.yearlen + 7), a10 = nX(nq(e11, t10, n10)) - this.yearordinal, i10 = a10, s10 = 0; s10 < 7 && (r10[a10] = a10, ++a10, this.wdaymask[a10] !== this.options.wkst); s10++) ;
      return [r10, i10, a10];
    }, e10.prototype.ddayset = function(e11, t10, n10) {
      var r10 = nM(null, this.yearlen), a10 = nX(nq(e11, t10, n10)) - this.yearordinal;
      return r10[a10] = a10, [r10, a10, a10 + 1];
    }, e10.prototype.htimeset = function(e11, t10, n10, r10) {
      var a10 = this, i10 = [];
      return this.options.byminute.forEach(function(t11) {
        i10 = i10.concat(a10.mtimeset(e11, t11, n10, r10));
      }), n3(i10), i10;
    }, e10.prototype.mtimeset = function(e11, t10, n10, r10) {
      var a10 = this.options.bysecond.map(function(n11) {
        return new ry(e11, t10, n11, r10);
      });
      return n3(a10), a10;
    }, e10.prototype.stimeset = function(e11, t10, n10, r10) {
      return [new ry(e11, t10, n10, r10)];
    }, e10.prototype.getdayset = function(e11) {
      switch (e11) {
        case u.YEARLY:
          return this.ydayset.bind(this);
        case u.MONTHLY:
          return this.mdayset.bind(this);
        case u.WEEKLY:
          return this.wdayset.bind(this);
        case u.DAILY:
        default:
          return this.ddayset.bind(this);
      }
    }, e10.prototype.gettimeset = function(e11) {
      switch (e11) {
        case u.HOURLY:
          return this.htimeset.bind(this);
        case u.MINUTELY:
          return this.mtimeset.bind(this);
        case u.SECONDLY:
          return this.stimeset.bind(this);
      }
    }, e10;
  }();
  function rW(e10, t10) {
    var n10 = t10.dtstart, r10 = t10.freq, a10 = t10.interval, i10 = t10.until, s10 = t10.bysetpos, o2 = t10.count;
    if (0 === o2 || 0 === a10) return rB(e10);
    var l2 = rg.fromDate(n10), d2 = new rq(t10);
    d2.rebuild(l2.year, l2.month);
    for (var c2 = function(e11, t11, n11) {
      var r11 = n11.freq, a11 = n11.byhour, i11 = n11.byminute, s11 = n11.bysecond;
      if (rh(r11)) {
        var o3 = n11.dtstart.getTime() % 1e3;
        if (!rh(n11.freq)) return [];
        var l3 = [];
        return n11.byhour.forEach(function(e12) {
          n11.byminute.forEach(function(t12) {
            n11.bysecond.forEach(function(n12) {
              l3.push(new ry(e12, t12, n12, o3));
            });
          });
        }), l3;
      }
      return r11 >= rX.HOURLY && nz(a11) && !nF(a11, t11.hour) || r11 >= rX.MINUTELY && nz(i11) && !nF(i11, t11.minute) || r11 >= rX.SECONDLY && nz(s11) && !nF(s11, t11.second) ? [] : e11.gettimeset(r11)(t11.hour, t11.minute, t11.second, t11.millisecond);
    }(d2, l2, t10); ; ) {
      var u2 = d2.getdayset(r10)(l2.year, l2.month, l2.day), p2 = u2[0], h2 = u2[1], m2 = u2[2], f2 = function(e11, t11, n11, r11, a11) {
        for (var i11 = false, s11 = t11; s11 < n11; s11++) {
          var o3 = e11[s11];
          (i11 = function(e12, t12, n12) {
            var r12 = n12.bymonth, a12 = n12.byweekno, i12 = n12.byweekday, s12 = n12.byeaster, o4 = n12.bymonthday, l3 = n12.bynmonthday, d3 = n12.byyearday;
            return nz(r12) && !nF(r12, e12.mmask[t12]) || nz(a12) && !e12.wnomask[t12] || nz(i12) && !nF(i12, e12.wdaymask[t12]) || nz(e12.nwdaymask) && !e12.nwdaymask[t12] || null !== s12 && !nF(e12.eastermask, t12) || (nz(o4) || nz(l3)) && !nF(o4, e12.mdaymask[t12]) && !nF(l3, e12.nmdaymask[t12]) || nz(d3) && (t12 < e12.yearlen && !nF(d3, t12 + 1) && !nF(d3, -e12.yearlen + t12) || t12 >= e12.yearlen && !nF(d3, t12 + 1 - e12.yearlen) && !nF(d3, -e12.nextyearlen + t12 - e12.yearlen));
          }(r11, o3, a11)) && (e11[o3] = null);
        }
        return i11;
      }(p2, h2, m2, d2, t10);
      if (nz(s10)) for (var y2 = function(e11, t11, n11, r11, a11, i11) {
        for (var s11 = [], o3 = 0; o3 < e11.length; o3++) {
          var l3 = void 0, d3 = void 0, c3 = e11[o3];
          c3 < 0 ? (l3 = Math.floor(c3 / t11.length), d3 = nP(c3, t11.length)) : (l3 = Math.floor((c3 - 1) / t11.length), d3 = nP(c3 - 1, t11.length));
          for (var u3 = [], p3 = n11; p3 < r11; p3++) {
            var h3 = i11[p3];
            nA(h3) && u3.push(h3);
          }
          var m3 = void 0;
          m3 = l3 < 0 ? u3.slice(l3)[0] : u3[l3];
          var f3 = t11[d3], y3 = n2(nJ(a11.yearordinal + m3), f3);
          nF(s11, y3) || s11.push(y3);
        }
        return n3(s11), s11;
      }(s10, c2, h2, m2, d2, p2), g2 = 0; g2 < y2.length; g2++) {
        var b2 = y2[g2];
        if (i10 && b2 > i10) return rB(e10);
        if (b2 >= n10) {
          var v2 = rH(b2, t10);
          if (!e10.accept(v2) || o2 && !--o2) return rB(e10);
        }
      }
      else for (var g2 = h2; g2 < m2; g2++) {
        var x2 = p2[g2];
        if (nA(x2)) for (var _2 = nJ(d2.yearordinal + x2), k2 = 0; k2 < c2.length; k2++) {
          var b2 = n2(_2, c2[k2]);
          if (i10 && b2 > i10) return rB(e10);
          if (b2 >= n10) {
            var v2 = rH(b2, t10);
            if (!e10.accept(v2) || o2 && !--o2) return rB(e10);
          }
        }
      }
      if (0 === t10.interval || (l2.add(t10, f2), l2.year > 9999)) return rB(e10);
      rh(r10) || (c2 = d2.gettimeset(r10)(l2.hour, l2.minute, l2.second, 0)), d2.rebuild(l2.year, l2.month);
    }
  }
  function rH(e10, t10) {
    return new rj(e10, t10.tzid).rezonedDate();
  }
  function rB(e10) {
    return e10.getValue();
  }
  var rV = { MO: new nI(0), TU: new nI(1), WE: new nI(2), TH: new nI(3), FR: new nI(4), SA: new nI(5), SU: new nI(6) }, rK = { freq: u.YEARLY, dtstart: null, interval: 1, wkst: rV.MO, count: null, until: null, tzid: null, bysetpos: null, bymonth: null, bymonthday: null, bynmonthday: null, byyearday: null, byweekno: null, byweekday: null, bynweekday: null, byhour: null, byminute: null, bysecond: null, byeaster: null }, rG = Object.keys(rK), rX = function() {
    function e10(e11, t10) {
      void 0 === e11 && (e11 = {}), void 0 === t10 && (t10 = false), this._cache = t10 ? null : new rT(), this.origOptions = rb(e11);
      var n10 = function(e12) {
        var t11 = rr(rr({}, rK), rb(e12));
        if (nA(t11.byeaster) && (t11.freq = rX.YEARLY), !(nA(t11.freq) && rX.FREQUENCIES[t11.freq])) throw Error("Invalid frequency: ".concat(t11.freq, " ").concat(e12.freq));
        if (t11.dtstart || (t11.dtstart = new Date((/* @__PURE__ */ new Date()).setMilliseconds(0))), nA(t11.wkst) ? nO(t11.wkst) || (t11.wkst = t11.wkst.weekday) : t11.wkst = rX.MO.weekday, nA(t11.bysetpos)) {
          nO(t11.bysetpos) && (t11.bysetpos = [t11.bysetpos]);
          for (var n11 = 0; n11 < t11.bysetpos.length; n11++) {
            var r10 = t11.bysetpos[n11];
            if (0 === r10 || !(r10 >= -366 && r10 <= 366)) throw Error("bysetpos must be between 1 and 366, or between -366 and -1");
          }
        }
        if (!(t11.byweekno || nz(t11.byweekno) || nz(t11.byyearday) || t11.bymonthday || nz(t11.bymonthday) || nA(t11.byweekday) || nA(t11.byeaster))) switch (t11.freq) {
          case rX.YEARLY:
            t11.bymonth || (t11.bymonth = t11.dtstart.getUTCMonth() + 1), t11.bymonthday = t11.dtstart.getUTCDate();
            break;
          case rX.MONTHLY:
            t11.bymonthday = t11.dtstart.getUTCDate();
            break;
          case rX.WEEKLY:
            t11.byweekday = [n0(t11.dtstart)];
        }
        if (nA(t11.bymonth) && !nD(t11.bymonth) && (t11.bymonth = [t11.bymonth]), nA(t11.byyearday) && !nD(t11.byyearday) && nO(t11.byyearday) && (t11.byyearday = [t11.byyearday]), nA(t11.bymonthday)) if (nD(t11.bymonthday)) {
          for (var a10 = [], i10 = [], n11 = 0; n11 < t11.bymonthday.length; n11++) {
            var r10 = t11.bymonthday[n11];
            r10 > 0 ? a10.push(r10) : r10 < 0 && i10.push(r10);
          }
          t11.bymonthday = a10, t11.bynmonthday = i10;
        } else t11.bymonthday < 0 ? (t11.bynmonthday = [t11.bymonthday], t11.bymonthday = []) : (t11.bynmonthday = [], t11.bymonthday = [t11.bymonthday]);
        else t11.bymonthday = [], t11.bynmonthday = [];
        if (nA(t11.byweekno) && !nD(t11.byweekno) && (t11.byweekno = [t11.byweekno]), nA(t11.byweekday)) if (nO(t11.byweekday)) t11.byweekday = [t11.byweekday], t11.bynweekday = null;
        else if (nR(t11.byweekday)) t11.byweekday = [nI.fromStr(t11.byweekday).weekday], t11.bynweekday = null;
        else if (t11.byweekday instanceof nI) !t11.byweekday.n || t11.freq > rX.MONTHLY ? (t11.byweekday = [t11.byweekday.weekday], t11.bynweekday = null) : (t11.bynweekday = [[t11.byweekday.weekday, t11.byweekday.n]], t11.byweekday = null);
        else {
          for (var s10 = [], o2 = [], n11 = 0; n11 < t11.byweekday.length; n11++) {
            var l2 = t11.byweekday[n11];
            if (nO(l2)) {
              s10.push(l2);
              continue;
            }
            if (nR(l2)) {
              s10.push(nI.fromStr(l2).weekday);
              continue;
            }
            !l2.n || t11.freq > rX.MONTHLY ? s10.push(l2.weekday) : o2.push([l2.weekday, l2.n]);
          }
          t11.byweekday = nz(s10) ? s10 : null, t11.bynweekday = nz(o2) ? o2 : null;
        }
        else t11.bynweekday = null;
        return nA(t11.byhour) ? nO(t11.byhour) && (t11.byhour = [t11.byhour]) : t11.byhour = t11.freq < rX.HOURLY ? [t11.dtstart.getUTCHours()] : null, nA(t11.byminute) ? nO(t11.byminute) && (t11.byminute = [t11.byminute]) : t11.byminute = t11.freq < rX.MINUTELY ? [t11.dtstart.getUTCMinutes()] : null, nA(t11.bysecond) ? nO(t11.bysecond) && (t11.bysecond = [t11.bysecond]) : t11.bysecond = t11.freq < rX.SECONDLY ? [t11.dtstart.getUTCSeconds()] : null, { parsedOptions: t11 };
      }(e11).parsedOptions;
      this.options = n10;
    }
    return e10.parseText = function(e11, t10) {
      return rp(e11, t10);
    }, e10.fromText = function(e11, t10) {
      var n10;
      return void 0 === (n10 = t10) && (n10 = rs), new rX(rp(e11, n10) || void 0);
    }, e10.fromString = function(t10) {
      return new e10(e10.parseString(t10) || void 0);
    }, e10.prototype._iter = function(e11) {
      return rW(e11, this.options);
    }, e10.prototype._cacheGet = function(e11, t10) {
      return !!this._cache && this._cache._cacheGet(e11, t10);
    }, e10.prototype._cacheAdd = function(e11, t10, n10) {
      if (this._cache) return this._cache._cacheAdd(e11, t10, n10);
    }, e10.prototype.all = function(e11) {
      if (e11) return this._iter(new ri("all", {}, e11));
      var t10 = this._cacheGet("all");
      return false === t10 && (t10 = this._iter(new re("all", {})), this._cacheAdd("all", t10)), t10;
    }, e10.prototype.between = function(e11, t10, n10, r10) {
      if (void 0 === n10 && (n10 = false), !nG(e11) || !nG(t10)) throw Error("Invalid date passed in to RRule.between");
      var a10 = { before: t10, after: e11, inc: n10 };
      if (r10) return this._iter(new ri("between", a10, r10));
      var i10 = this._cacheGet("between", a10);
      return false === i10 && (i10 = this._iter(new re("between", a10)), this._cacheAdd("between", i10, a10)), i10;
    }, e10.prototype.before = function(e11, t10) {
      if (void 0 === t10 && (t10 = false), !nG(e11)) throw Error("Invalid date passed in to RRule.before");
      var n10 = { dt: e11, inc: t10 }, r10 = this._cacheGet("before", n10);
      return false === r10 && (r10 = this._iter(new re("before", n10)), this._cacheAdd("before", r10, n10)), r10;
    }, e10.prototype.after = function(e11, t10) {
      if (void 0 === t10 && (t10 = false), !nG(e11)) throw Error("Invalid date passed in to RRule.after");
      var n10 = { dt: e11, inc: t10 }, r10 = this._cacheGet("after", n10);
      return false === r10 && (r10 = this._iter(new re("after", n10)), this._cacheAdd("after", r10, n10)), r10;
    }, e10.prototype.count = function() {
      return this.all().length;
    }, e10.prototype.toString = function() {
      return rE(this.origOptions);
    }, e10.prototype.toText = function(e11, t10, n10) {
      return new rc(this, e11, t10, n10).toString();
    }, e10.prototype.isFullyConvertibleToText = function() {
      return rf(this);
    }, e10.prototype.clone = function() {
      return new e10(this.origOptions);
    }, e10.FREQUENCIES = ["YEARLY", "MONTHLY", "WEEKLY", "DAILY", "HOURLY", "MINUTELY", "SECONDLY"], e10.YEARLY = u.YEARLY, e10.MONTHLY = u.MONTHLY, e10.WEEKLY = u.WEEKLY, e10.DAILY = u.DAILY, e10.HOURLY = u.HOURLY, e10.MINUTELY = u.MINUTELY, e10.SECONDLY = u.SECONDLY, e10.MO = rV.MO, e10.TU = rV.TU, e10.WE = rV.WE, e10.TH = rV.TH, e10.FR = rV.FR, e10.SA = rV.SA, e10.SU = rV.SU, e10.parseString = rv, e10.optionsToString = rE, e10;
  }(), rJ = { dtstart: null, cache: false, unfold: false, forceset: false, compatible: false, tzid: null };
  function rQ(e10, t10) {
    return void 0 === t10 && (t10 = {}), function(e11, t11) {
      var n10, r10, a10, i10, s10, o2, l2, d2 = (n10 = [], r10 = [], a10 = [], i10 = [], o2 = (s10 = rx(e11)).dtstart, l2 = s10.tzid, function(e12, t12) {
        if (void 0 === t12 && (t12 = false), !(e12 = e12 && e12.trim())) throw Error("Invalid empty string");
        if (!t12) return e12.split(/\s/);
        for (var n11 = e12.split("\n"), r11 = 0; r11 < n11.length; ) {
          var a11 = n11[r11] = n11[r11].replace(/\s+$/g, "");
          a11 ? r11 > 0 && " " === a11[0] ? (n11[r11 - 1] += a11.slice(1), n11.splice(r11, 1)) : r11 += 1 : n11.splice(r11, 1);
        }
        return n11;
      }(e11, t11.unfold).forEach(function(e12) {
        if (e12) {
          var t12, s11 = function(e13) {
            var t13 = function(e14) {
              if (-1 === e14.indexOf(":")) return { name: "RRULE", value: e14 };
              var t14 = nU(e14, ":", 1);
              return { name: t14[0], value: t14[1] };
            }(e13), n11 = t13.name, r11 = t13.value, a11 = n11.split(";");
            if (!a11) throw Error("empty property name");
            return { name: a11[0].toUpperCase(), parms: a11.slice(1), value: r11 };
          }(e12), o3 = s11.name, d3 = s11.parms, c3 = s11.value;
          switch (o3.toUpperCase()) {
            case "RRULE":
              if (d3.length) throw Error("unsupported RRULE parm: ".concat(d3.join(",")));
              n10.push(rv(e12));
              break;
            case "RDATE":
              var u3 = (null != (t12 = /RDATE(?:;TZID=([^:=]+))?/i.exec(e12)) ? t12 : [])[1];
              u3 && !l2 && (l2 = u3), r10 = r10.concat(r1(c3, d3));
              break;
            case "EXRULE":
              if (d3.length) throw Error("unsupported EXRULE parm: ".concat(d3.join(",")));
              a10.push(rv(c3));
              break;
            case "EXDATE":
              i10 = i10.concat(r1(c3, d3));
              break;
            case "DTSTART":
              break;
            default:
              throw Error("unsupported property: " + o3);
          }
        }
      }), { dtstart: o2, tzid: l2, rrulevals: n10, rdatevals: r10, exrulevals: a10, exdatevals: i10 }), c2 = d2.rrulevals, u2 = d2.rdatevals, p2 = d2.exrulevals, h2 = d2.exdatevals, m2 = d2.dtstart, f2 = d2.tzid, y2 = false === t11.cache;
      if (t11.compatible && (t11.forceset = true, t11.unfold = true), t11.forceset || c2.length > 1 || u2.length || p2.length || h2.length) {
        var g2 = new r4(y2);
        return g2.dtstart(m2), g2.tzid(f2 || void 0), c2.forEach(function(e12) {
          g2.rrule(new rX(r0(e12, m2, f2), y2));
        }), u2.forEach(function(e12) {
          g2.rdate(e12);
        }), p2.forEach(function(e12) {
          g2.exrule(new rX(r0(e12, m2, f2), y2));
        }), h2.forEach(function(e12) {
          g2.exdate(e12);
        }), t11.compatible && t11.dtstart && g2.rdate(m2), g2;
      }
      var b2 = c2[0] || {};
      return new rX(r0(b2, b2.dtstart || t11.dtstart || m2, b2.tzid || t11.tzid || f2), y2);
    }(e10, function(e11) {
      var t11 = [], n10 = Object.keys(e11), r10 = Object.keys(rJ);
      if (n10.forEach(function(e12) {
        nF(r10, e12) || t11.push(e12);
      }), t11.length) throw Error("Invalid options: " + t11.join(", "));
      return rr(rr({}, rJ), e11);
    }(t10));
  }
  function r0(e10, t10, n10) {
    return rr(rr({}, e10), { dtstart: t10, tzid: n10 });
  }
  function r1(e10, t10) {
    return t10.forEach(function(e11) {
      if (!/(VALUE=DATE(-TIME)?)|(TZID=)/.test(e11)) throw Error("unsupported RDATE/EXDATE parm: " + e11);
    }), e10.split(",").map(function(e11) {
      return n9(e11);
    });
  }
  function r2(e10) {
    var t10 = this;
    return function(n10) {
      if (void 0 !== n10 && (t10["_".concat(e10)] = n10), void 0 !== t10["_".concat(e10)]) return t10["_".concat(e10)];
      for (var r10 = 0; r10 < t10._rrule.length; r10++) {
        var a10 = t10._rrule[r10].origOptions[e10];
        if (a10) return a10;
      }
    };
  }
  var r4 = function(e10) {
    function t10(t11) {
      void 0 === t11 && (t11 = false);
      var n10 = e10.call(this, {}, t11) || this;
      return n10.dtstart = r2.apply(n10, ["dtstart"]), n10.tzid = r2.apply(n10, ["tzid"]), n10._rrule = [], n10._rdate = [], n10._exrule = [], n10._exdate = [], n10;
    }
    return rn(t10, e10), t10.prototype._iter = function(e11) {
      return function(e12, t11, n10, r10, a10, i10) {
        var s10 = {}, o2 = e12.accept;
        function l2(e13, t12) {
          n10.forEach(function(n11) {
            n11.between(e13, t12, true).forEach(function(e14) {
              s10[Number(e14)] = true;
            });
          });
        }
        a10.forEach(function(e13) {
          s10[Number(new rj(e13, i10).rezonedDate())] = true;
        }), e12.accept = function(e13) {
          var t12 = Number(e13);
          return isNaN(t12) ? o2.call(this, e13) : !!s10[t12] || (l2(new Date(t12 - 1), new Date(t12 + 1)), !!s10[t12]) || (s10[t12] = true, o2.call(this, e13));
        }, "between" === e12.method && (l2(e12.args.after, e12.args.before), e12.accept = function(e13) {
          var t12 = Number(e13);
          return !!s10[t12] || (s10[t12] = true, o2.call(this, e13));
        });
        for (var d2 = 0; d2 < r10.length; d2++) {
          var c2 = new rj(r10[d2], i10).rezonedDate();
          if (!e12.accept(new Date(c2.getTime()))) break;
        }
        t11.forEach(function(t12) {
          rW(e12, t12.options);
        });
        var u2 = e12._result;
        switch (n3(u2), e12.method) {
          case "all":
          case "between":
            return u2;
          case "before":
            return u2.length && u2[u2.length - 1] || null;
          default:
            return u2.length && u2[0] || null;
        }
      }(e11, this._rrule, this._exrule, this._rdate, this._exdate, this.tzid());
    }, t10.prototype.rrule = function(e11) {
      r5(e11, this._rrule);
    }, t10.prototype.exrule = function(e11) {
      r5(e11, this._exrule);
    }, t10.prototype.rdate = function(e11) {
      r3(e11, this._rdate);
    }, t10.prototype.exdate = function(e11) {
      r3(e11, this._exdate);
    }, t10.prototype.rrules = function() {
      return this._rrule.map(function(e11) {
        return rQ(e11.toString());
      });
    }, t10.prototype.exrules = function() {
      return this._exrule.map(function(e11) {
        return rQ(e11.toString());
      });
    }, t10.prototype.rdates = function() {
      return this._rdate.map(function(e11) {
        return new Date(e11.getTime());
      });
    }, t10.prototype.exdates = function() {
      return this._exdate.map(function(e11) {
        return new Date(e11.getTime());
      });
    }, t10.prototype.valueOf = function() {
      var e11 = [];
      return !this._rrule.length && this._dtstart && (e11 = e11.concat(rE({ dtstart: this._dtstart }))), this._rrule.forEach(function(t11) {
        e11 = e11.concat(t11.toString().split("\n"));
      }), this._exrule.forEach(function(t11) {
        e11 = e11.concat(t11.toString().split("\n").map(function(e12) {
          return e12.replace(/^RRULE:/, "EXRULE:");
        }).filter(function(e12) {
          return !/^DTSTART/.test(e12);
        }));
      }), this._rdate.length && e11.push(r6("RDATE", this._rdate, this.tzid())), this._exdate.length && e11.push(r6("EXDATE", this._exdate, this.tzid())), e11;
    }, t10.prototype.toString = function() {
      return this.valueOf().join("\n");
    }, t10.prototype.clone = function() {
      var e11 = new t10(!!this._cache);
      return this._rrule.forEach(function(t11) {
        return e11.rrule(t11.clone());
      }), this._exrule.forEach(function(t11) {
        return e11.exrule(t11.clone());
      }), this._rdate.forEach(function(t11) {
        return e11.rdate(new Date(t11.getTime()));
      }), this._exdate.forEach(function(t11) {
        return e11.exdate(new Date(t11.getTime()));
      }), e11;
    }, t10;
  }(rX);
  function r5(e10, t10) {
    if (!(e10 instanceof rX)) throw TypeError(String(e10) + " is not RRule instance");
    nF(t10.map(String), String(e10)) || t10.push(e10);
  }
  function r3(e10, t10) {
    if (!(e10 instanceof Date)) throw TypeError(String(e10) + " is not Date instance");
    nF(t10.map(Number), Number(e10)) || (t10.push(e10), n3(t10));
  }
  function r6(e10, t10, n10) {
    var r10 = !n10 || "UTC" === n10.toUpperCase(), a10 = r10 ? "".concat(e10, ":") : "".concat(e10, ";TZID=").concat(n10, ":"), i10 = t10.map(function(e11) {
      return n6(e11.valueOf(), r10);
    }).join(",");
    return "".concat(a10).concat(i10);
  }
  e.s([], 20927), e.i(20927), e.s(["ALL_WEEKDAYS", 0, nN, "Frequency", 0, u, "RRule", 0, rX, "RRuleSet", 0, r4, "Weekday", 0, nI, "datetime", 0, nq, "rrulestr", 0, rQ], 72966);
  var r9 = e.i(72966);
  let { RRule: r8, Weekday: r7, rrulestr: ae } = Reflect.get(r9, "default") ?? r9;
  r8.YEARLY, r8.MONTHLY, r8.WEEKLY, r8.DAILY;
  var tb = tb;
  tb.enum(["ios", "mac"]);
  var tb = tb;
  RegExp(";(?=(?:to|cc|bcc|subject|body)=)", "i");
  let at = tb.enum(["all-mail", "starred", "sent", "drafts"]), an = tb.object({ utm_source: tb.string().optional(), utm_medium: tb.string().optional(), utm_campaign: tb.string().optional(), utm_content: tb.string().optional(), utm_term: tb.string().optional() });
  tb.discriminatedUnion("kind", [tb.object({ kind: tb.literal("home") }), tb.object({ kind: tb.literal("backlog"), utm: an.optional() }), tb.object({ kind: tb.literal("thread"), id: tb.string().min(1) }), tb.object({ kind: tb.literal("later") }), tb.object({ kind: tb.literal("mailbox"), filter: at }), tb.object({ kind: tb.literal("event"), icalUid: tb.string().min(1) }), tb.object({ kind: tb.literal("compose"), to: tb.array(tC).optional(), cc: tb.array(tC).optional(), bcc: tb.array(tC).optional(), subject: tb.string().optional(), body: tb.string().optional() }), tb.object({ kind: tb.literal("settings"), section: tb.string().optional(), focus: tb.string().optional() }), tb.object({ kind: tb.literal("admin"), section: tb.string().optional(), note: tb.string().optional(), version: tb.string().optional() })]);
  let ar = [tE, String.raw`Sent from [^\n]{1,60}`, String.raw`Sent via [^\n]{1,60}`, String.raw`Get Outlook for [^\n]{1,40}`, String.raw`Von [^\n]{1,60} gesendet`, String.raw`Gesendet von [^\n]{1,60}`, String.raw`Sendt fra [^\n]{1,60}`, String.raw`Envoyé depuis [^\n]{1,60}`, String.raw`Envoyé de mon [^\n]{1,60}`, String.raw`Envoyé à partir de [^\n]{1,60}`, String.raw`Télécharger Outlook pour [^\n]{1,40}`, String.raw`Enviado desde [^\n]{1,60}`, String.raw`Verzonden vanaf [^\n]{1,60}`, String.raw`Verstuurd vanaf [^\n]{1,60}`];
  RegExp(`^(?:${ar.map((e10) => `(?:${e10})`).join("|")})[.!]?$`, "i");
  var tb = tb;
  tb.object({ serverFlushIntervalMs: tb.number().min(1).max(500), clientThrottleMs: tb.number().min(1).max(500) });
  var tb = tb;
  tb.object({ path: tb.enum(["html", "native", "hybrid-collapsed", "hybrid-expanded", "segments", "empty"]), nativeRenderer: tb.enum(["markdown", "text"]).nullable(), decisionSource: tb.enum(["server", "heuristic"]), renderMode: tb.enum(["html", "markdown", "markdown_above_fold"]).nullable(), preferHtml: tb.boolean(), flags: tb.record(tb.string().max(100), tb.boolean()), renderFixesSource: tb.string().max(64).optional(), capturedAt: tb.string().datetime(), viewport: tb.object({ width: tb.number().positive(), height: tb.number().positive(), scale: tb.number().positive() }).optional() }), RegExp("2261 Market Street".replace(/\s+/g, String.raw`\s+`), "i");
  let aa = [tE, String.raw`\bSent from my\b`, String.raw`\b(?:Get|Sent from)\s+\[?Outlook for (?:iOS|Android|iPhone|iPad|Mac|Windows)\b`, String.raw`\bTélécharger\s+\[?Outlook pour (?:iOS|Android|iPhone|iPad|Mac|Windows)\b`];
  s = [...aa, String.raw`\bOn\b(?:(?![.!?]\s|\bOn\b)[\s\S]){0,200}?\bwrote:`, String.raw`-{2,}\s*Original Message\s*-{2,}`, String.raw`\bFrom:[\s\S]{0,200}?\bSent:`], RegExp(`(?:${s.join("|")})[\\s\\S]*$`), RegExp(`(?:${aa.join("|")})`);
  var tb = tb;
  tb.enum(["morning", "evening"]);
  let ai = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
  tb.enum(ai), [...ai];
  var tb = tb;
  let as = tb.union([tb.literal(-1), tb.literal(0), tb.literal(1), tb.literal(2), tb.literal(3)]), ao = tb.object({ type: tb.literal("content-thread"), id: tb.string(), lastEmailId: tb.string().optional() }), al = tb.object({ type: tb.literal("new-message"), payload: ao }), ad = tb.enum(["expo", "fcm"]);
  tb.enum(["authorized", "provisional", "denied", "not_determined"]), tb.enum(["unknown", "app_store", "test_flight", "play_store", "other"]);
  let ac = tb.object({ type: tb.literal("sign-in-prompt"), payload: ao }), au = tb.object({ type: tb.literal("priority-digest"), payload: ao }), ap = tb.object({ type: tb.literal("friday-digest"), payload: tb.object({ type: tb.literal("stack-friday-digest"), threadIds: tb.array(tb.string().uuid()).min(1).max(50).optional() }) }), ah = tb.object({ type: tb.literal("handle-later-reminder"), payload: tb.object({ type: tb.literal("later-tab"), threadId: tb.string().optional(), threadIds: tb.array(tb.string().uuid()).min(1).max(50).optional() }) });
  tb.discriminatedUnion("type", [al, ac, au, tb.object({ type: tb.literal("digest"), payload: tb.object({}).strict() }), tb.object({ type: tb.literal("emergency"), payload: tb.object({}).strict() }), ah, ap, tb.object({ type: tb.literal("voice-search-better-answer"), payload: tb.object({ threadId: tb.string().optional() }) }), tb.object({ type: tb.literal("voice-texting-message"), payload: tb.object({ channel: tb.string().optional() }) }), tb.object({ type: tb.literal("ingest-limit-paused"), payload: tb.object({}).strict() })]).and(tb.object({ notificationId: tb.string().optional(), notificationProvider: ad.optional(), notificationFcmId: tb.string().optional(), sentAt: tb.coerce.date().optional(), provisional: tb.boolean().optional(), subtitle: tb.string().optional() }));
  var tb = tb;
  tb.record(tb.string(), tb.boolean());
  var am = tb;
  am.enum(["text", "voice", "search", "ask"]), am.object({ transcript: am.string().optional() });
  var tb = tb;
  tb.object({ avatarUrl: tb.string() });
  var tb = tb;
  tb.object({ prompts: tb.array(tb.object({ label: tb.string(), prompt: tb.string() })) });
  var tb = tb;
  let af = { default_reply_behavior: tb.enum(["reply", "reply-all"]), compose_include_net_footer: tb.boolean(), swipe_direction: tb.enum(["normal", "inverted"]), leftie_mode: tb.boolean(), preferred_calendar_app: tb.enum(["google", "apple"]), new_email_notification_level: as, todo_notifications_enabled: tb.boolean(), home_undated_todos_hidden_at: tb.string().datetime(), home_undated_todos_dismissed: tb.record(tb.string(), tb.string().datetime()), home_needs_reply_hidden_at: tb.string().datetime(), home_awaiting_reply_hidden_at: tb.string().datetime(), catch_up_customized: tb.boolean(), show_gmail_calendar_events: tb.boolean(), calendar_event_visibility: tb.enum(["private", "public"]), compose_auto_polish: tb.boolean() }, ay = Object.keys(af);
  tb.enum(ay), tb.discriminatedUnion("key", [tb.object({ key: tb.literal("default_reply_behavior"), value: af.default_reply_behavior }), tb.object({ key: tb.literal("compose_include_net_footer"), value: af.compose_include_net_footer }), tb.object({ key: tb.literal("swipe_direction"), value: af.swipe_direction }), tb.object({ key: tb.literal("leftie_mode"), value: af.leftie_mode }), tb.object({ key: tb.literal("preferred_calendar_app"), value: af.preferred_calendar_app }), tb.object({ key: tb.literal("new_email_notification_level"), value: af.new_email_notification_level }), tb.object({ key: tb.literal("todo_notifications_enabled"), value: af.todo_notifications_enabled }), tb.object({ key: tb.literal("home_undated_todos_hidden_at"), value: af.home_undated_todos_hidden_at }), tb.object({ key: tb.literal("home_undated_todos_dismissed"), value: af.home_undated_todos_dismissed }), tb.object({ key: tb.literal("home_needs_reply_hidden_at"), value: af.home_needs_reply_hidden_at }), tb.object({ key: tb.literal("home_awaiting_reply_hidden_at"), value: af.home_awaiting_reply_hidden_at }), tb.object({ key: tb.literal("catch_up_customized"), value: af.catch_up_customized }), tb.object({ key: tb.literal("show_gmail_calendar_events"), value: af.show_gmail_calendar_events }), tb.object({ key: tb.literal("calendar_event_visibility"), value: af.calendar_event_visibility }), tb.object({ key: tb.literal("compose_auto_polish"), value: af.compose_auto_polish })]);
  var tb = tb;
  tb.enum(["mobile", "desktop"]);
  var tb = tb;
  tb.enum(["compose-v3-rich-text", "user-preference-v1", "email-rendering-feedback-v1", "self-memo-v1", "voice-search-v1", "thread-voice-v1", "ws-yapper", "voice-texting-v1", "heartbeat-v1"]);
  var tb = tb;
  function ag() {
    return tb.string().max(320).refine((e10) => /^[^\s@]+@[^\s@]+\.[^\s@.]+$/.test(e10.trim()) && !/[\r\n'"]/.test(e10));
  }
  function ab() {
    return tb.object({ email: ag(), name: tb.string().max(500).refine((e10) => !/[\r\n]/.test(e10)).optional() });
  }
  let av = tb.object({ accountId: tb.string().min(1).max(100), sendAsEmail: ag() }), ax = tb.object({ to: tb.array(ab()).max(50), cc: tb.array(ab()).max(50), bcc: tb.array(ab()).max(50) }), a_ = tb.object({ subject: tb.string().max(500).refine((e10) => !/[\r\n]/.test(e10)).optional(), recipients: ax.optional(), sender: av.optional(), includeSignature: tb.boolean().optional(), includeNetFooter: tb.boolean().optional() }), ak = tb.object({ subject: tb.string().max(500), recipients: ax, sender: av.optional(), availableSenders: tb.array(av.extend({ label: tb.string().max(500).optional(), signatureAvailable: tb.boolean().optional() })).max(100), includeSignature: tb.boolean().optional(), includeNetFooter: tb.boolean().optional() });
  var tb = tb;
  let aw = tb.string().datetime({ offset: true }).or(tb.string().date()), aj = tb.string().min(1).max(80), aE = { since: aw.optional().describe("Filter when messages were sent, not when a plan happens."), until: aw.optional() }, aT = tb.string().trim().min(1).max(200).describe("A literal case-insensitive substring, not a Gmail query."), aC = tb.object({ query: aT, limit: tb.number().int().min(1).max(40).optional().describe("Maximum matches for this query; defaults to 15.") }), aS = { chatRef: aj.optional(), ...aE, fromMe: tb.boolean().optional() }, aN = tb.object({ query: aT, queries: tb.array(aC).min(1).max(6).optional(), ...aS, limit: tb.number().int().min(1).max(40).optional() });
  tb.object({ queries: tb.array(aC).min(1).max(6).describe("Run distinct literal searches together to cover synonyms, date spellings, providers, and other likely wording. Each query has its own result limit."), ...aS, limit: tb.number().int().min(1).max(40).optional().describe("Maximum unique results after merging and deduplicating; defaults to 30.") });
  let aI = tb.object({ chatRef: aj, ...aE, beforeMessageRef: tb.string().min(1).max(80).optional(), limit: tb.number().int().min(1).max(100).optional() }), aA = tb.object({ ...aE, limit: tb.number().int().min(1).max(40).optional(), offset: tb.number().int().min(0).max(1e5).optional() }), aO = tb.discriminatedUnion("kind", [tb.object({ kind: tb.literal("status") }), tb.object({ kind: tb.literal("search"), args: aN }), tb.object({ kind: tb.literal("conversation"), args: aI }), tb.object({ kind: tb.literal("conversations"), args: aA })]), aR = tb.object({ requestId: tb.string().uuid(), userId: tb.string().uuid(), sessionId: tb.string().min(1).max(128), operation: aO }), aD = tb.discriminatedUnion("ok", [tb.object({ ok: tb.literal(true), available: tb.boolean(), output: tb.string().max(48e3).optional() }), tb.object({ ok: tb.literal(false), error: tb.enum(["unavailable", "invalid_request", "timeout", "cancelled"]) })]), aL = tb.object({ requestId: tb.string().uuid(), sessionId: tb.string().min(1).max(128), result: aD });
  var tb = tb, tb = tb, tb = tb;
  let aM = tb.object({ type: tb.literal("conversation.item.created"), previous_item_id: tb.string().nullable(), item: tb.discriminatedUnion("type", [tb.object({ id: tb.string(), type: tb.literal("message"), role: tb.enum(["user", "assistant", "system"]), content: tb.array(tb.discriminatedUnion("type", [tb.object({ type: tb.literal("input_text"), text: tb.string() }), tb.object({ type: tb.literal("input_audio"), transcript: tb.string().nullable() })])) }), tb.object({ id: tb.string(), type: tb.literal("function_call"), call_id: tb.string(), name: tb.string(), arguments: tb.string() }), tb.object({ id: tb.string(), type: tb.literal("function_call_output"), call_id: tb.string(), output: tb.string() })]) }), aZ = tb.object({ type: tb.literal("conversation.item.input_audio_transcription.completed"), item_id: tb.string(), transcript: tb.string() }), aU = tb.object({ type: tb.literal("conversation.item.input_audio_transcription.failed"), item_id: tb.string(), error: tb.object({ type: tb.string().optional(), code: tb.string().nullable().optional(), message: tb.string().optional(), param: tb.string().nullable().optional() }).optional() }), aP = tb.object({ type: tb.literal("session.created") }), aY = tb.object({ type: tb.literal("session.updated") }), a$ = tb.object({ type: tb.literal("response.created"), response: tb.object({ id: tb.string() }) }), az = tb.object({ type: tb.literal("response.done"), response: tb.object({ id: tb.string(), output: tb.array(tb.discriminatedUnion("type", [tb.object({ type: tb.literal("message") }), tb.object({ type: tb.literal("function_call"), call_id: tb.string(), name: tb.string(), arguments: tb.string() })])), usage: tb.object({ input_tokens: tb.number(), output_tokens: tb.number(), total_tokens: tb.number(), input_token_details: tb.object({ audio_tokens: tb.number(), cached_tokens: tb.number(), text_tokens: tb.number() }), output_token_details: tb.object({ audio_tokens: tb.number(), text_tokens: tb.number(), reasoning_tokens: tb.number().optional() }) }) }) }), aF = tb.object({ type: tb.literal("response.content_part.done"), item_id: tb.string() }), aq = tb.object({ type: tb.literal("response.output_item.done") }), aW = tb.object({ type: tb.literal("response.output_item.added"), output_index: tb.number(), item: tb.discriminatedUnion("type", [tb.object({ id: tb.string(), type: tb.literal("function_call"), call_id: tb.string(), name: tb.string(), arguments: tb.string() }), tb.object({ id: tb.string(), type: tb.literal("message") })]) }), aH = tb.object({ type: tb.literal("response.content_part.added"), item_id: tb.string() }), aB = tb.object({ type: tb.literal("response.text.done"), text: tb.string() }), aV = tb.object({ type: tb.literal("response.text.delta"), item_id: tb.string(), delta: tb.string() }), aK = tb.object({ type: tb.literal("response.output_text.done"), text: tb.string() }), aG = tb.object({ type: tb.literal("response.output_text.delta"), item_id: tb.string(), delta: tb.string() }), aX = tb.object({ type: tb.literal("response.function_call_arguments.delta"), item_id: tb.string(), output_index: tb.number(), call_id: tb.string(), delta: tb.string() }), aJ = tb.object({ type: tb.literal("response.function_call_arguments.done"), item_id: tb.string(), output_index: tb.number(), call_id: tb.string(), arguments: tb.string() }), aQ = tb.object({ type: tb.literal("error"), error: tb.object({ code: tb.string().nullable(), message: tb.string() }) }), a0 = tb.object({ type: tb.literal("rate_limits.updated"), rate_limits: tb.array(tb.object({ name: tb.string(), limit: tb.number(), remaining: tb.number(), reset_seconds: tb.number() })) }), a1 = tb.object({ type: tb.literal("input_audio_buffer.committed"), previous_item_id: tb.string().nullable(), item_id: tb.string() }), a2 = tb.object({ type: tb.literal("conversation.item.input_audio_transcription.delta"), item_id: tb.string(), delta: tb.string() }), a4 = tb.object({ type: tb.literal("input_audio_buffer.cleared") }), a5 = tb.object({ type: tb.literal("conversation.item.deleted"), item_id: tb.string() }), a3 = tb.discriminatedUnion("type", [tb.object({ id: tb.string(), type: tb.literal("message"), role: tb.enum(["user", "assistant", "system"]), content: tb.array(tb.discriminatedUnion("type", [tb.object({ type: tb.literal("input_text"), text: tb.string() }), tb.object({ type: tb.literal("input_audio"), transcript: tb.string().nullable() })])) }), tb.object({ id: tb.string(), type: tb.literal("function_call"), call_id: tb.string(), name: tb.string(), arguments: tb.string() }), tb.object({ id: tb.string(), type: tb.literal("function_call_output"), call_id: tb.string(), output: tb.string() })]), a6 = tb.object({ type: tb.literal("conversation.item.added"), previous_item_id: tb.string().nullable().optional(), item: a3 }), a9 = tb.object({ type: tb.literal("conversation.item.done"), previous_item_id: tb.string().nullable().optional(), item: a3 }), a8 = (tb.discriminatedUnion("type", [aP, aY, a$, az, aF, aq, aW, aH, aB, aV, aK, aG, aQ, a0, aM, aZ, aU, aX, aJ, a1, a4, a2, a5, a6, a9]), az), a7 = aB, ie = aV, it = aQ, ir = a0, ia = aM, ii = aZ, is = tb.object({ type: tb.literal("net.notice"), level: tb.enum(["error", "warning", "info"]), message: tb.string() }), io = tb.array(tb.discriminatedUnion("op", [tb.object({ op: tb.literal("add"), field: tb.enum(["to", "cc", "bcc"]), emailAddress: tb.string() }), tb.object({ op: tb.literal("remove"), field: tb.enum(["to", "cc", "bcc"]), emailAddress: tb.string() }), tb.object({ op: tb.literal("move"), fromField: tb.enum(["to", "cc", "bcc"]).describe("The field to move the email address from"), toField: tb.enum(["to", "cc", "bcc"]).describe("The field to move the email address to"), emailAddress: tb.string() }), tb.object({ op: tb.literal("edit"), field: tb.enum(["to", "cc", "bcc"]), fromEmailAddress: tb.string(), toEmailAddress: tb.string() })])), il = tb.object({ type: tb.literal("net.modification.recipients"), ops: io }), id = tb.object({ type: tb.literal("net.modification.subject"), subject: tb.string() }), ic = tb.object({ type: tb.literal("net.modification.appended_content"), target: tb.enum(["signature", "footer"]), include: tb.boolean() }), iu = tb.object({ type: tb.literal("net.compose.mode_changed"), mode: tb.enum(["transcription", "follow_up"]) }), ip = tb.object({ type: tb.literal("net.compose.phase_changed"), phase: tb.literal("polishing") });
  tb.discriminatedUnion("type", [a7, ie, it, ir, a8, il, id, ic, iu, ip, is]), tb.discriminatedUnion("type", [il, id, ic]);
  let ih = tb.object({ id: tb.string(), threadId: tb.string(), subject: tb.string(), sender: tb.string(), senderEmail: tb.string().optional(), snippet: tb.string(), summary: tb.string().optional(), receivedAt: tb.string().optional(), isNewThread: tb.boolean().optional(), contactId: tb.string().optional(), source: tb.enum(["turbopuffer", "gmail"]), inTrash: tb.boolean().optional() }), im = tb.object({ type: tb.literal("net.search.answer.delta"), text: tb.string(), searchId: tb.string().optional() }), iy = tb.object({ type: tb.literal("net.voice_search.progress"), message: tb.string(), searchId: tb.string().optional() }), ig = tb.object({ query: tb.string(), searchType: tb.enum(["semantic", "fulltext", "sender"]), resultCount: tb.number() }), ib = tb.object({ type: tb.literal("net.search.queries"), queries: tb.array(ig), suggestedQuery: ig, searchId: tb.string().optional() }), iv = tb.object({ type: tb.literal("net.search.answer"), message: tb.string(), query: tb.string(), sourceThreadIds: tb.array(tb.string()), sourceAttachments: tb.array(t0).optional(), sources: tb.array(ih), mode: tb.enum(["faster", "smarter"]), searchId: tb.string().optional() }), ix = tb.object({ type: tb.literal("net.search.open_compose"), relation: tb.enum(["reply", "reply-all", "forwarded", "new"]), searchClientSessionId: tb.string(), threadId: tb.string().optional(), searchId: tb.string().optional() });
  tb.discriminatedUnion("type", [it, ia, ii, is, im, iv, ib, iy, ix]);
  let i_ = tb.object({ type: tb.literal("net.thread_voice.audio_input_transcribed"), transcript: tb.string() }), ik = tb.object({ type: tb.literal("net.thread_voice.answer.delta"), text: tb.string() }), iw = tb.enum(["answer", "search", "unsupported", "feedback"]), ij = tb.object({ type: tb.literal("net.thread_voice.response_type"), responseType: iw }), iE = tb.object({ threadId: tb.string(), kind: tb.enum(["create", "link"]).default("create"), calendarEventId: tb.string().nullable().default(null), occurrenceStartAt: tb.string().nullable().default(null), commitmentId: tb.string().nullable().default(null), note: tb.string().nullable().default(null), duplicatesAcknowledged: tb.boolean().default(false), title: tb.string(), description: tb.string().nullable(), location: tb.string().nullable(), startLocal: tb.string(), endLocal: tb.string().nullable(), timezone: tb.string().nullable(), endTimezone: tb.string().nullable() }), iT = tb.object({ type: tb.literal("net.thread_voice.answer"), message: tb.string(), responseType: iw, sourceThreadIds: tb.array(tb.string()).optional(), sources: tb.array(ih).optional(), unsupportedFeature: tb.string().optional(), feedbackDetail: tb.string().optional(), suggestedEvents: tb.array(iE).optional() }), iC = tb.object({ type: tb.literal("net.thread_voice.progress"), message: tb.string() }), iS = tb.object({ type: tb.literal("net.thread_voice.error"), message: tb.string() });
  tb.discriminatedUnion("type", [i_, ik, iT, iC, iS, ij]);
  let iN = tb.object({ type: tb.literal("net.voice_texting.transcript.partial"), text: tb.string() }), iI = tb.object({ type: tb.literal("net.voice_texting.message"), id: tb.string().uuid(), chatId: tb.string().uuid(), senderUserId: tb.string().uuid(), senderName: tb.string().nullable(), senderEmail: tb.string(), senderAvatarUrl: tb.string().nullable(), body: tb.string(), sentAt: tb.string(), editedAt: tb.string().nullable(), previousBody: tb.string().nullable() }), iA = tb.object({ type: tb.literal("net.voice_texting.message.delta"), id: tb.string(), text: tb.string() }), iO = tb.object({ type: tb.literal("net.voice_texting.error"), message: tb.string() }), iR = tb.object({ type: tb.literal("net.voice_texting.contact"), email: tb.string(), name: tb.string().nullable(), avatarUrl: tb.string().nullable() }), iD = tb.object({ type: tb.literal("net.voice_texting.typing_indicator"), userEmail: tb.string(), userName: tb.string().nullable(), avatarUrl: tb.string().nullable(), isTyping: tb.boolean() });
  tb.discriminatedUnion("type", [iN, iI, iA, iO, iR, iD]);
  let iL = tb.enum(["answer", "search", "unsupported", "feedback"]), iM = tb.object({ type: tb.literal("net.ws_yapper.audio_input_transcribed"), transcript: tb.string(), turnId: tb.string().optional() }), iZ = tb.object({ type: tb.literal("net.ws_yapper.answer.delta"), text: tb.string(), turnId: tb.string().optional() }), iU = tb.enum(["edit_open_draft", "new_draft", "reply", "forward"]), iP = tb.object({ kind: tb.literal("edit_open_draft"), bodyHtml: tb.string().optional(), inlineImageCount: tb.number().int().min(0).max(1e3).optional(), envelope: a_.optional(), previousEnvelope: ak.optional(), target: tb.object({ sessionId: tb.string(), revision: tb.number() }) }), iY = tb.object({ email: tb.string(), name: tb.string().optional() }), i$ = tb.object({ kind: tb.literal("new_draft"), bodyHtml: tb.string(), to: tb.array(iY).optional(), subject: tb.string().optional() }), iz = tb.object({ kind: tb.literal("reply"), bodyHtml: tb.string(), emailId: tb.string(), threadId: tb.string(), replyAll: tb.boolean().optional() }), iF = tb.object({ kind: tb.literal("forward"), bodyHtml: tb.string(), emailId: tb.string(), threadId: tb.string(), to: tb.array(iY).optional() }), iq = tb.discriminatedUnion("kind", [iP, i$, iz, iF]), iW = tb.object({ type: tb.literal("net.ws_yapper.answer"), message: tb.string(), proposal: iq.optional(), responseType: iL, sourceThreadIds: tb.array(tb.string()).optional(), sources: tb.array(ih).optional(), unsupportedFeature: tb.string().optional(), feedbackDetail: tb.string().optional(), turnId: tb.string().optional() }), iH = tb.object({ type: tb.literal("net.ws_yapper.progress"), message: tb.string(), turnId: tb.string().optional() }), iB = tb.object({ type: tb.literal("net.ws_yapper.error"), message: tb.string(), turnId: tb.string().optional() });
  tb.discriminatedUnion("type", [aR.extend({ type: tb.literal("net.ws_yapper.messages.request") }), iM, iZ, iW, iH, iB]);
  var tb = tb;
  let iV = tb.object({ type: tb.literal("conversation.item.delete"), item_id: tb.string() }), iK = tb.object({ type: tb.literal("conversation.item.create"), previous_item_id: tb.string().nullable().optional(), item: tb.discriminatedUnion("type", [tb.object({ id: tb.string().optional(), type: tb.literal("message"), role: tb.enum(["user", "assistant", "system"]), content: tb.array(tb.discriminatedUnion("type", [tb.object({ type: tb.literal("input_text"), text: tb.string() }), tb.object({ type: tb.literal("input_audio"), audio: tb.string() })])) }), tb.object({ type: tb.literal("function_call_output"), call_id: tb.string(), output: tb.string() })]) }), iG = tb.object({ type: tb.literal("input_audio_buffer.clear") }), iX = tb.object({ type: tb.literal("input_audio_buffer.append"), audio: tb.string() }), iJ = tb.object({ type: tb.literal("input_audio_buffer.commit") }), iQ = tb.object({ type: tb.literal("response.create") }), i0 = tb.object({ type: tb.literal("response.cancel"), response_id: tb.string().optional(), event_id: tb.string().optional() }), i1 = tb.object({ description: tb.string(), name: tb.string(), parameters: tb.any().optional(), type: tb.literal("function") }), i2 = tb.object({ type: tb.literal("session.update"), session: tb.object({ type: tb.enum(["realtime", "transcription"]).optional(), output_modalities: tb.array(tb.string()).optional(), max_output_tokens: tb.number().optional(), instructions: tb.string().optional(), tools: tb.array(i1).optional(), tool_choice: tb.enum(["auto", "none", "required"]).optional(), audio: tb.object({ input: tb.object({ turn_detection: tb.any().nullable().optional(), transcription: tb.object({ model: tb.string(), language: tb.string().optional(), prompt: tb.string().optional() }).optional() }).optional() }).optional(), reasoning: tb.object({ effort: tb.string() }).optional() }) }), i4 = (tb.discriminatedUnion("type", [iV, iK, iX, iG, iJ, iQ, i0, i2]), iV), i5 = iK, i3 = iX, i6 = iG, i9 = iJ, i8 = iQ, i7 = i2, se = tb.string().min(1).max(64), st = tb.object({ emailId: tb.string(), relation: tb.enum(["reply", "forwarded"]) }), sn = tb.object({ type: tb.literal("net.context.update"), recipients: tb.array(tb.string()), parentEmail: st.optional(), accountId: tb.string(), sendAsEmail: tb.string().optional(), searchClientSessionId: tb.string().optional(), composeMode: tb.enum(["transcription", "follow_up"]).optional(), includeSignature: tb.boolean().optional(), forceReload: tb.boolean().optional() }), sr = tb.object({ type: tb.literal("net.draft.snapshot"), draft: tb.string().max(2e5) }), sa = tb.object({ type: tb.literal("net.draft.polish"), useRichTextPolish: tb.boolean().optional(), mode: se.optional() }), si = tb.object({ type: tb.literal("net.draft.sent") }), ss = tb.object({ type: tb.literal("net.compose.text_input"), text: tb.string() }), so = tb.object({ type: tb.literal("net.compose.draft_content"), text: tb.string() }), sl = tb.object({ type: tb.literal("net.compose.response.create"), autoPolish: tb.boolean().optional() });
  tb.discriminatedUnion("type", [sn, sr, sa, si, ss, so, sl, i4, i5, i6, i3, i9, i8, i7]);
  let sd = tb.object({ type: tb.literal("net.voice_search.context.update"), timezone: tb.string().optional(), sessionId: tb.string().optional() }), sc = tb.object({ type: tb.literal("net.voice_search.text_search"), text: tb.string(), searchId: tb.string().optional() }), su = tb.object({ type: tb.literal("net.voice_search.reset") }), sp = tb.object({ type: tb.literal("net.voice_search.restore_history"), historyId: tb.string(), searchId: tb.string().optional() }), sh = tb.object({ type: tb.literal("net.voice_search.answer_expanded") }), sm = tb.object({ type: tb.literal("net.voice_search.session_left"), sessionId: tb.string() }), sf = tb.object({ type: tb.literal("net.voice_search.audio_append"), audio: tb.string(), encoding: tb.enum(["base64"]).optional() }), sy = tb.object({ type: tb.literal("net.voice_search.audio_commit"), searchId: tb.string().optional() }), sg = tb.object({ type: tb.literal("net.voice_search.audio_clear") });
  tb.discriminatedUnion("type", [sd, sc, su, sp, sh, sm, sf, sy, sg, i4, i5, i6, i3, i9, i8, i7]);
  let sb = tb.object({ type: tb.literal("net.thread_voice.context.update"), threadId: tb.string(), accountId: tb.string(), timezone: tb.string().optional(), sessionId: tb.string().optional() }), sv = tb.object({ type: tb.literal("net.thread_voice.reset") }), sx = tb.object({ type: tb.literal("net.thread_voice.start_interaction") }), s_ = tb.object({ type: tb.literal("net.thread_voice.text_input"), text: tb.string() }), sk = tb.object({ type: tb.literal("net.thread_voice.audio_input"), audio: tb.string(), generateResponse: tb.boolean().optional().default(true) }), sw = tb.object({ type: tb.literal("net.thread_voice.audio_append"), audio: tb.string(), encoding: tb.enum(["base64"]).optional() }), sj = tb.object({ type: tb.literal("net.thread_voice.audio_commit") }), sE = tb.object({ type: tb.literal("net.thread_voice.audio_clear") }), sT = tb.object({ type: tb.literal("net.thread_voice.feeling_lucky") }), sC = tb.object({ type: tb.literal("net.thread_voice.find_related") }), sS = tb.object({ type: tb.literal("net.thread_voice.extract_events") });
  tb.discriminatedUnion("type", [sb, sv, sx, s_, sk, sw, sj, sE, sT, sC, sS]);
  let sN = tb.object({ type: tb.literal("net.voice_texting.context.update"), timezone: tb.string().optional(), sessionId: tb.string().optional() }), sI = tb.object({ type: tb.literal("net.voice_texting.text_input"), text: tb.string() }), sA = tb.object({ type: tb.literal("net.voice_texting.audio_append"), audio: tb.string() }), sO = tb.object({ type: tb.literal("net.voice_texting.audio_commit"), replaceMessageId: tb.string().uuid().optional() }), sR = tb.object({ type: tb.literal("net.voice_texting.audio_clear") }), sD = tb.object({ type: tb.literal("net.voice_texting.typing_start") }), sL = tb.object({ type: tb.literal("net.voice_texting.typing_stop") });
  tb.discriminatedUnion("type", [sN, sI, sA, sO, sR, sD, sL]);
  let sM = tb.enum(["home", "search", "later", "starred", "all", "important", "awaiting_response", "needs_reply", "drafts", "sent", "trash", "spam", "backlog"]), sZ = tb.discriminatedUnion("kind", [tb.object({ kind: tb.literal("list"), list: sM, threadIds: tb.array(tb.string().uuid()).max(25), query: tb.string().max(500).optional() }), tb.object({ kind: tb.literal("thread"), threadId: tb.string().uuid() }), tb.object({ kind: tb.literal("compose"), draft: tb.object({ to: tb.array(tb.string()).max(50).optional(), cc: tb.array(tb.string()).max(50).optional(), subject: tb.string().max(500).optional(), bodyText: tb.string().max(4e3), editableEnvelope: ak.extend({ target: tb.object({ sessionId: tb.string().max(100), revision: tb.number().int().nonnegative() }) }).optional(), editableBody: tb.object({ target: tb.object({ sessionId: tb.string().max(100), revision: tb.number().int().nonnegative() }), html: tb.string().max(16e3), inlineImageCount: tb.number().int().min(0).max(1e3).optional() }).optional() }), parentThreadId: tb.string().uuid().optional(), relation: tb.enum(["reply", "reply-all", "forwarded", "new"]).optional() })]), sU = tb.object({ role: tb.enum(["user", "assistant"]), content: tb.string().max(12e3) }), sP = tb.discriminatedUnion("source", [tb.object({ source: tb.literal("auto"), expanded: tb.boolean(), previewTurnId: tb.string().min(1) }), tb.object({ source: tb.literal("direct") })]), sY = tb.object({ type: tb.literal("net.ws_yapper.context.update"), messages: tb.literal("v1").optional(), magicPaste: tb.enum(["v1"]).optional(), composeActions: tb.boolean().optional(), composeEnvelopeActions: tb.boolean().optional(), composeSignatureActions: tb.boolean().optional(), composeActionKinds: tb.array(iU).optional(), accountId: tb.string().optional(), timezone: tb.string().optional(), sessionId: tb.string().optional(), engagement: sP.optional(), history: tb.array(sU).max(20).optional(), view: sZ.optional(), attachedContext: tb.string().max(12e3).optional() }), s$ = tb.object({ type: tb.literal("net.ws_yapper.text_input"), text: tb.string(), askSource: tb.enum(["auto", "direct"]).optional(), turnId: tb.string().optional() }), sz = tb.object({ type: tb.literal("net.ws_yapper.answer_expanded"), turnId: tb.string() }), sF = tb.object({ type: tb.literal("net.ws_yapper.reset") }), sq = tb.object({ type: tb.literal("net.ws_yapper.audio_append"), audio: tb.string(), encoding: tb.enum(["base64"]).optional() }), sW = tb.object({ type: tb.literal("net.ws_yapper.audio_commit"), turnId: tb.string().optional() }), sH = tb.object({ type: tb.literal("net.ws_yapper.audio_clear") });
  tb.discriminatedUnion("type", [aL.extend({ type: tb.literal("net.ws_yapper.messages.result") }), sY, s$, sz, sF, sq, sW, sH]);
  var tb = tb;
  tb.object({ type: tb.literal("net.ping"), id: tb.string(), sentAt: tb.number().int() }), tb.object({ type: tb.literal("net.pong"), id: tb.string(), sentAt: tb.number().int() });
  var tb = tb;
  tb.record(tb.string(), tb.union([tb.boolean(), tb.object({ firstShownAt: tb.number().int().nonnegative() })]));
  var tb = tb;
  tb.enum(["needs_reply", "awaiting_reply"]);
  var tb = tb;
  let sB = tb.enum(["human_help", "judging_question", "signup_help", "career_question", "safety_concern", "automated_message", "ai_refusal", "incomplete_output", "processing_failure", "budget_limit"]);
  tb.object({ version: tb.string().uuid(), reason: sB, preview: tb.string().refine((e10) => [...e10].length <= 1400), draft: tb.string().trim().min(1).max(2500).nullable(), submission: tb.string().min(1).refine((e10) => [...e10].length <= 1e5).nullable(), lastError: tb.string().max(500).optional(), lastRequestId: tb.string().uuid().optional(), resolution: tb.object({ action: tb.enum(["send", "approve", "dismiss"]), actorId: tb.string(), requestId: tb.string().uuid(), at: tb.string().datetime(), reason: tb.string().max(500), waivedLength: tb.boolean(), replyId: tb.string().uuid().nullable() }).optional() }), tb.object({ requestId: tb.string().uuid(), expiresAt: tb.string().datetime(), version: tb.string().uuid(), action: tb.enum(["send", "approve", "dismiss"]), actorId: tb.string().regex(/^[UW][A-Z0-9]+$/), channelId: tb.string().regex(/^[CG][A-Z0-9]+$/), sourceTs: tb.string().regex(/^\d+\.\d+$/), text: tb.string().trim().min(1).max(2500).optional(), waiveLength: tb.boolean().default(false), reason: tb.string().trim().max(500).default("") });
  var sV = e.i(70703), sK = e.i(57688), sG = e.i(71645), sX = e.i(74080), sJ = e.i(15363), sQ = e.i(36354), s0 = e.i(70216), s1 = e.i(48378), s2 = e.i(95333), s4 = e.i(29116), s5 = e.i(87339), s3 = e.i(96951), s6 = e.i(36519);
  let s9 = { default: "gap-3 rounded-xl px-4 py-3", large: "gap-4 rounded-2xl px-6 py-4" }, s8 = { default: "type-button tracking-[-0.02em]", large: "type-body tracking-[-0.025em]" }, s7 = { default: "size-5", large: "size-6" }, oe = { default: "text-[15px] leading-snug tracking-[-0.02em]", large: "type-body tracking-[-0.025em]" };
  function ot({ variant: e10, size: t10, className: n10 }) {
    return (0, s6.cn)("flex w-fit cursor-pointer items-center border transition-transform duration-120 active:scale-[0.97]", "primary" === e10 ? "border-brand bg-brand text-white hover:bg-brand-alt" : "border-black/50 hover:bg-surface-alt", s9[t10], n10);
  }
  function on({ variant: e10, size: t10 }) {
    return (0, s6.cn)("whitespace-nowrap font-medium select-none", s8[t10], "secondary" === e10 && "text-black");
  }
  function or() {
    return "function" == typeof navigator.share;
  }
  async function oa({ url: e10, title: t10, text: n10 }) {
    if (!or()) return "failed";
    try {
      return await navigator.share({ title: t10, text: n10, url: e10 }), "shared";
    } catch (e11) {
      return e11 instanceof Error && "AbortError" === e11.name ? "cancelled" : "failed";
    }
  }
  async function oi(e10) {
    let t10 = await oa(e10);
    if ("failed" !== t10) return t10;
    try {
      return await navigator.clipboard.writeText(e10.url), "copied";
    } catch {
      return "failed";
    }
  }
  function os(e10) {
    let [t10, n10] = (0, sG.useState)(false), [r10, a10] = (0, sG.useState)(false), i10 = (0, sG.useRef)(0);
    return (0, sG.useEffect)(() => {
      e10 ? n10(true) : a10(false);
    }, [e10]), (0, sG.useEffect)(() => {
      if (t10 && e10) return i10.current = requestAnimationFrame(() => a10(true)), () => cancelAnimationFrame(i10.current);
    }, [t10, e10]), { mounted: t10, visible: r10, onTransitionEnd: (0, sG.useCallback)((t11) => {
      t11.target !== t11.currentTarget || e10 || n10(false);
    }, [e10]) };
  }
  let oo = (0, sV.default)(() => e.A(28746).then((e10) => ({ default: e10.QRCodeSVG })), { loadableGenerated: { modules: [53849] }, ssr: false, loading: () => (0, p.jsx)("div", { className: "flex size-[160px] items-center justify-center", children: (0, p.jsx)(ol, { className: "text-black/50" }) }) });
  function ol({ className: e10 }) {
    return (0, p.jsx)("svg", { className: (0, s6.cn)("size-6 animate-spin", e10), viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: (0, p.jsx)("path", { d: "M18 12C18 13.1867 17.6481 14.3467 16.9888 15.3334C16.3295 16.3201 15.3925 17.0892 14.2961 17.5433C13.1997 17.9974 11.9933 18.1162 10.8295 17.8847C9.66557 17.6532 8.59647 17.0818 7.75736 16.2426C6.91824 15.4035 6.3468 14.3344 6.11529 13.1705C5.88378 12.0067 6.0026 10.8003 6.45672 9.7039C6.91085 8.60754 7.67988 7.67047 8.66658 7.01118C9.65327 6.35189 10.8133 6 12 6", stroke: "currentColor", strokeWidth: "1.75", strokeLinecap: "round" }) });
  }
  function od() {
    return (0, p.jsxs)("div", { className: "relative size-full", children: [(0, p.jsx)("div", { className: "absolute top-0 left-0 size-[72%]", children: (0, p.jsx)(sQ.OutlookIcon, {}) }), (0, p.jsx)("div", { className: "absolute right-0 bottom-0 size-[72%] drop-shadow-[0_0_1px_#fff,0_0_2px_#fff]", children: (0, p.jsx)(sQ.AndroidIcon, {}) })] });
  }
  let oc = "https://avec.ai", ou = `${oc}/download`, op = "/mac";
  function oh({ className: e10, label: t10, source: n10, size: r10 = "default", variant: a10 = "primary" }) {
    let { isOutsideNorthAmerica: i10 } = (0, s1.useDevice)(), s10 = (0, s2.useIosHaptics)(), o2 = (0, s4.useTrack)(), [l2, d2] = (0, sG.useState)(false), c2 = os(l2), u2 = (0, s0.useDeepLinkDownload)(), [h2, m2] = (0, sG.useState)(false);
    (0, sG.useEffect)(() => m2(or()), []);
    let f2 = u2 ?? `${ou}?source=${encodeURIComponent(n10)}`, y2 = u2 ?? function({ campaign: e11 }) {
      let t11 = new URL("https://apps.apple.com/app/apple-store/id6742199038");
      return t11.searchParams.set("pt", "127490380"), t11.searchParams.set("ct", e11), t11.searchParams.set("mt", "8"), t11.toString();
    }({ campaign: "web_qr" }), g2 = (0, sG.useCallback)((e11) => {
      s10.light();
      let r11 = window.matchMedia("(pointer: coarse)").matches;
      o2(s5.BillboardEvents.DownloadOnIosClicked, { label: t10, source: n10, presentation: r11 ? "direct_link" : "qr_code" }), r11 || (e11.preventDefault(), d2(true));
    }, [s10, o2, t10, n10]), b2 = (0, sG.useCallback)(() => {
      oa({ url: u2 ?? `${ou}?source=${encodeURIComponent(`${n10}_send`)}`, title: "Avec for iPhone", text: "Download Avec for iPhone" }).then((e11) => {
        o2(s5.BillboardEvents.SendLinkClicked, { platform: "ios", source: n10, outcome: e11 });
      });
    }, [u2, n10, o2]);
    return ((0, sG.useEffect)(() => {
      if (!l2) return;
      let e11 = (e12) => {
        "Escape" === e12.key && d2(false);
      };
      return document.addEventListener("keydown", e11), () => document.removeEventListener("keydown", e11);
    }, [l2]), i10) ? null : (0, p.jsxs)(p.Fragment, { children: [(0, p.jsx)("a", { href: f2, "aria-label": t10, onClick: g2, className: ot({ variant: a10, size: r10, className: e10 }), children: (0, p.jsx)("span", { className: on({ variant: a10, size: r10 }), children: t10 }) }), c2.mounted && (0, sX.createPortal)((0, p.jsx)("div", { className: (0, s6.cn)("fixed inset-0 z-50 flex items-center justify-center transition-[opacity,backdrop-filter,background-color] duration-200", c2.visible ? "bg-black/50 backdrop-blur-sm ease-out" : "bg-black/0 backdrop-blur-0 ease-in"), onTransitionEnd: c2.onTransitionEnd, onClick: () => d2(false), children: (0, p.jsxs)("div", { className: (0, s6.cn)("flex flex-col items-center gap-6 rounded-[28px] bg-background p-8 ring-1 ring-black/10 transition-all duration-200", c2.visible ? "scale-100 opacity-100 blur-0 ease-out" : "scale-75 opacity-0 blur-2xl ease-in"), onClick: (e11) => e11.stopPropagation(), children: [(0, p.jsxs)("p", { className: "text-center text-lg font-medium tracking-[-0.03em]", children: ["Download on the", " ", (0, p.jsx)("span", { className: "inline-block size-4 shrink-0 ml-px mr-[3px] translate-y-px", children: (0, p.jsx)(sQ.AppleIcon, {}) }), "App Store"] }), (0, p.jsx)("div", { className: "flex flex-col items-center rounded-2xl bg-white p-4 shadow-lg ring-1 ring-black/5", children: (0, p.jsx)(oo, { size: 160, value: y2 }) }), (0, p.jsx)("p", { className: "type-caption opacity-60 font-[550] tracking-[-0.03em]", children: "Scan with your iPhone" }), h2 && (0, p.jsxs)("button", { type: "button", onClick: b2, className: ot({ variant: "secondary", size: "default", className: "-mt-2" }), children: [(0, p.jsx)("div", { className: "size-5 shrink-0 text-black", children: (0, p.jsx)(om, {}) }), (0, p.jsx)("span", { className: on({ variant: "secondary", size: "default" }), children: "Send link to your phone" })] })] }) }), document.body)] });
  }
  function om() {
    return (0, p.jsxs)("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.75", strokeLinecap: "round", strokeLinejoin: "round", xmlns: "http://www.w3.org/2000/svg", children: [(0, p.jsx)("path", { d: "M12 3v12" }), (0, p.jsx)("path", { d: "M8 7l4-4 4 4" }), (0, p.jsx)("path", { d: "M5 11v8a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-8" })] });
  }
  function of({ className: e10, label: t10, source: n10, size: r10 = "default", variant: a10 = "primary" }) {
    let i10 = (0, s2.useIosHaptics)(), s10 = (0, s4.useTrack)(), o2 = function() {
      let [e11, t11] = (0, sG.useState)(false), n11 = (0, sG.useRef)(void 0), r11 = (0, sG.useCallback)(() => {
        t11(true), clearTimeout(n11.current), n11.current = setTimeout(() => t11(false), 2e3);
      }, []);
      return (0, sG.useEffect)(() => () => clearTimeout(n11.current), []), { copied: e11, flash: r11 };
    }(), l2 = `${op}?source=${encodeURIComponent(n10)}`, d2 = (0, sG.useCallback)((e11) => {
      i10.light();
      let r11 = window.matchMedia("(pointer: coarse)").matches;
      s10(s5.BillboardEvents.DownloadForMacClicked, { label: t10, source: n10, presentation: r11 ? "share_sheet" : "direct_link" }), r11 && (e11.preventDefault(), oi({ url: `${oc}${op}?source=${encodeURIComponent(`${n10}_send`)}`, title: "Avec for Mac", text: "Download Avec for Mac" }).then((e12) => {
        s10(s5.BillboardEvents.SendLinkClicked, { platform: "mac", source: n10, outcome: e12 }), "copied" === e12 && o2.flash();
      }));
    }, [i10, s10, t10, n10, o2]);
    return (0, p.jsx)("a", { href: l2, "aria-label": t10, onClick: d2, className: ot({ variant: a10, size: r10, className: e10 }), children: (0, p.jsx)("span", { className: on({ variant: a10, size: r10 }), children: o2.copied ? "Link copied" : t10 }) });
  }
  function oy({ className: e10, source: t10, size: n10 = "default" }) {
    let { isAndroid: r10, isOutsideNorthAmerica: a10 } = (0, s1.useDevice)(), i10 = (0, s2.useIosHaptics)(), s10 = (0, s4.useTrack)(), o2 = (0, sG.useCallback)(() => {
      i10.light(), s10(s5.BillboardEvents.TestFlightClicked, { source: t10 });
    }, [i10, s10, t10]);
    return !a10 || r10 ? null : (0, p.jsxs)("a", { href: s3.TESTFLIGHT_URL, target: "_blank", rel: "noopener noreferrer", "aria-label": "Get early access", onClick: o2, className: ot({ variant: "secondary", size: n10, className: e10 }), children: [(0, p.jsx)(sK.default, { src: "/images/testflight.png", alt: "", width: 48, height: 48, className: (0, s6.cn)("shrink-0 rounded-[6px]", s7[n10]) }), (0, p.jsx)("span", { className: on({ variant: "secondary", size: n10 }), children: "Get early access" })] });
  }
  e.s(["DownloadForMacButton", 0, of, "DownloadOnIosButton", 0, oh, "GetNotifiedButton", 0, function({ appearance: e10 = "button", className: t10, label: n10, source: r10, size: a10 = "default" }) {
    let { isAndroid: i10 } = (0, s1.useDevice)(), s10 = (0, s2.useIosHaptics)(), o2 = (0, s4.useTrack)(), [l2, d2] = (0, sG.useState)(false), c2 = os(l2), [u2, h2] = (0, sG.useState)(""), [m2, f2] = (0, sG.useState)("idle"), y2 = (0, sG.useRef)(null), g2 = (0, sG.useCallback)(() => {
      s10.light(), o2(s5.BillboardEvents.GetNotifiedClicked, { label: n10, source: r10 }), d2(true);
    }, [s10, o2, n10, r10]), b2 = i10 ? "android" : "more-platforms", v2 = (0, sG.useCallback)((e11) => {
      e11.preventDefault(), s10.light(), o2(s5.BillboardEvents.GetNotifiedSubmitted), f2("loading"), (0, sJ.joinWaitlist)(u2, b2).then((e12) => f2(e12.ok ? "success" : "error"), () => f2("error"));
    }, [u2, b2, s10, o2]), x2 = (0, sG.useCallback)(() => {
      "loading" !== m2 && d2(false);
    }, [m2]);
    return (0, sG.useEffect)(() => {
      c2.mounted || "idle" === m2 || (h2(""), f2("idle"));
    }, [c2.mounted, m2]), (0, sG.useEffect)(() => {
      if (!l2) return;
      let e11 = (e12) => {
        "Escape" === e12.key && x2();
      };
      return document.addEventListener("keydown", e11), () => document.removeEventListener("keydown", e11);
    }, [l2, x2]), (0, p.jsxs)(p.Fragment, { children: [(0, p.jsxs)("button", { type: "button", onClick: g2, className: "link" === e10 ? (0, s6.cn)("w-fit max-w-full cursor-pointer text-left text-balance font-medium text-black/50 underline underline-offset-4 hover:text-black", oe[a10], t10) : ot({ variant: "secondary", size: a10, className: t10 }), children: ["button" === e10 ? (0, p.jsx)("div", { className: (0, s6.cn)("shrink-0", s7[a10]), children: i10 ? (0, p.jsx)(sQ.AndroidIcon, {}) : (0, p.jsx)(od, {}) }) : null, (0, p.jsx)("span", { className: "link" === e10 ? "select-none" : on({ variant: "secondary", size: a10 }), children: n10 })] }), c2.mounted && (0, sX.createPortal)((0, p.jsx)("div", { className: (0, s6.cn)("fixed inset-0 z-50 flex items-center justify-center px-4 transition-[opacity,backdrop-filter,background-color] duration-200", c2.visible ? "bg-black/50 backdrop-blur-sm ease-out" : "bg-black/0 backdrop-blur-0 ease-in"), onTransitionEnd: c2.onTransitionEnd, onClick: x2, children: (0, p.jsxs)("div", { className: (0, s6.cn)("flex w-full max-w-sm flex-col items-center gap-6 rounded-[28px] bg-background p-6 pt-8 md:p-8 ring-1 ring-black/10 transition-all duration-200", c2.visible ? "scale-100 opacity-100 blur-0 ease-out" : "scale-75 opacity-0 blur-2xl ease-in"), onClick: (e11) => e11.stopPropagation(), onTransitionEnd: (e11) => {
      e11.target === e11.currentTarget && "opacity" === e11.propertyName && c2.visible && y2.current?.focus();
    }, children: [(0, p.jsxs)("div", { className: "flex flex-col items-center", children: [(0, p.jsx)("div", { className: "size-12 shrink-0 mb-4", children: i10 ? (0, p.jsx)(sQ.AndroidIcon, {}) : (0, p.jsx)(od, {}) }), (0, p.jsx)("p", { id: "notify-dialog-title", className: "text-center text-lg font-medium tracking-tight", children: i10 ? "Get notified for Avec on Android" : "Get notified" }), (0, p.jsx)("p", { className: "text-center text-sm tracking-tight", children: i10 ? "We\u2019ll email you when Avec launches on Android" : "We\u2019ll email you when Avec is available for more platforms" })] }), (0, p.jsxs)("div", { className: "grid w-full *:[grid-area:1/1]", children: [(0, p.jsxs)("form", { onSubmit: v2, className: `flex flex-col gap-2 transition-opacity duration-200 ${"success" === m2 && "pointer-events-none"}`, children: [(0, p.jsx)("input", { type: "email", name: "email", required: true, ref: y2, autoComplete: "email", autoCapitalize: "none", autoCorrect: "off", spellCheck: false, inputMode: "email", enterKeyHint: "send", "aria-label": "Email address", placeholder: "you@example.com", value: u2, onChange: (e11) => h2(e11.target.value), disabled: "loading" === m2, className: (0, s6.cn)("flex-1 rounded-xl transition-opacity duration-250 tracking-tight bg-white px-3 py-3 shadow-[0_0_0_1px_rgba(0,0,0,0.06)] placeholder:text-soft focus-visible:shadow-[0_0_0_1px_rgba(0,0,0,0.12)] disabled:opacity-50 md:text-sm", "success" === m2 ? "opacity-0" : "") }), (0, p.jsxs)("button", { type: "submit", disabled: "loading" === m2, className: "relative rounded-xl bg-brand px-4 py-3 font-medium text-white tracking-tight hover:bg-brand-alt disabled:hover:bg-brand", children: [(0, p.jsx)("span", { className: "loading" === m2 ? "opacity-0" : "opacity-100", children: "error" === m2 ? "Try again" : "Submit" }), "loading" === m2 && (0, p.jsx)("span", { className: "absolute inset-0 flex items-center justify-center", children: (0, p.jsx)(ol, { className: "text-white/50" }) })] })] }), "success" === m2 && (0, p.jsx)("div", { className: "flex", children: (0, p.jsx)("p", { className: "relative flex-1 animate-[expand_250ms_cubic-bezier(0.22,1,0.36,1)_forwards] mt-auto flex items-center justify-center py-2 font-medium rounded-xl text-white tracking-tight", children: "You're on the list!" }) })] })] }) }), document.body)] });
  }, "PlatformCtas", 0, function({ labels: e10, source: t10, size: n10 = "default", buttonClassName: r10, secondaryClassName: a10 }) {
    let { isIPhone: i10 } = (0, s1.useDevice)(), s10 = (i11) => (0, p.jsxs)(p.Fragment, { children: [(0, p.jsx)(oh, { label: e10.ios[i11], source: t10, size: n10, variant: i11, className: (0, s6.cn)(r10, "secondary" === i11 && a10) }, "ios"), (0, p.jsx)(oy, { source: t10, size: n10, className: (0, s6.cn)(r10, "secondary" === i11 && a10) }, "testflight")] }), o2 = (i11) => (0, p.jsx)(of, { label: e10.mac[i11], source: t10, size: n10, variant: i11, className: (0, s6.cn)(r10, "secondary" === i11 && a10) }, "mac");
    return i10 ? (0, p.jsxs)(p.Fragment, { children: [s10("primary"), o2("secondary")] }) : (0, p.jsxs)(p.Fragment, { children: [o2("primary"), s10("secondary")] });
  }, "TestFlightButton", 0, oy], 45185);
}, 32138, (e) => {
  "use strict";
  var t = e.i(43476), n = e.i(71645), r = e.i(57688), a = e.i(36519);
  function i({ sender: e2, image: n2 }) {
    if (n2) return (0, t.jsx)(r.default, { src: n2, alt: e2, width: 36, height: 36, className: "size-9 shrink-0 rounded-full object-cover" });
    let a2 = e2.charAt(0).toUpperCase();
    return (0, t.jsx)("div", { className: "flex size-9 shrink-0 items-center justify-center rounded-full bg-surface-alt font-inter", children: (0, t.jsx)("span", { className: "text-[13px] font-medium text-foreground/70", children: a2 }) });
  }
  function s({ email: e2, className: n2, gameLabel: r2 }) {
    return (0, t.jsxs)("div", { className: (0, a.cn)("flex w-[270px] flex-col overflow-hidden rounded-[20px] bg-white font-inter shadow-[0_0_0_0.33px_rgba(0,0,0,0.07),0_2px_8px_rgba(0,0,0,0.06)]", n2), children: [(0, t.jsxs)("div", { className: "relative flex flex-1 flex-col gap-4 overflow-hidden px-4 pt-4 pb-1", children: [(0, t.jsx)("p", { className: "text-[18px]/[28px] font-medium tracking-tight text-[#403e3c]", children: e2.subject }), (0, t.jsxs)("div", { className: "flex items-center gap-2", children: [(0, t.jsx)(i, { sender: e2.sender, image: e2.image }), (0, t.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col ", children: [(0, t.jsxs)("div", { className: "flex items-baseline gap-1", children: [(0, t.jsx)("span", { className: "flex-1 truncate text-[14px]/[20px] font-medium tracking-[-0.01em] text-[#403e3c]", children: e2.sender }), (0, t.jsx)("span", { className: "shrink-0 text-[12px]/[16px] tracking-[-0.01em] text-[#878580]", children: e2.time })] }), (0, t.jsxs)("div", { className: "flex items-center gap-1 text-[12px]/[16px] tracking-[-0.01em]", children: [(0, t.jsx)("span", { className: "text-[#403e3c]", children: "To:" }), (0, t.jsx)("span", { className: "truncate text-[#878580]", children: e2.to })] })] })] }), (0, t.jsx)("p", { className: "whitespace-pre-line text-[14px]/[20px] text-[#403e3c] font-[440] tracking-[-0.01em]", children: e2.body }), (0, t.jsx)("div", { className: "pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-linear-to-t from-white to-transparent" })] }), r2 ? (0, t.jsx)(o, { label: r2 }) : (0, t.jsxs)("div", { className: "mx-3 mb-3 flex flex-col items-center gap-0.5 rounded-xl bg-[#0682fe] px-4 py-3 ", children: [(0, t.jsxs)("div", { className: "flex items-center gap-1 text-[14px]/[20px] font-medium text-white", children: [(0, t.jsx)(l, {}), (0, t.jsx)("span", { children: "Reply" })] }), (0, t.jsx)("span", { className: "text-[12px]/[16px] font-medium text-blue-100/70", children: "Hold to voice compose" })] })] });
  }
  function o({ label: e2 }) {
    let n2 = "done" === e2;
    return (0, t.jsx)("div", { className: (0, a.cn)("mx-3 mb-3 flex items-center justify-center gap-1.5 rounded-xl px-4 py-5.25", n2 ? "bg-accent-green" : "bg-accent-sky"), children: (0, t.jsx)("span", { className: "text-[14px]/[20px] font-medium text-white", children: n2 ? "Done" : "Later" }) });
  }
  function l() {
    return (0, t.jsx)("svg", { width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: (0, t.jsx)("path", { d: "M15.6465 15.5469C15.4277 15.5469 15.25 15.4762 15.1133 15.335C14.9811 15.1982 14.915 15.0205 14.915 14.8018C14.915 14.6742 14.9173 14.5397 14.9219 14.3984C14.931 14.2526 14.9355 14.0863 14.9355 13.8994C14.9355 13.1338 14.8353 12.514 14.6348 12.04C14.4388 11.5661 14.1152 11.2197 13.6641 11.001C13.2174 10.7822 12.6159 10.6729 11.8594 10.6729H7.42285L5.78906 10.5771L7.83301 12.4229L9.35059 13.9609C9.41895 14.0293 9.47135 14.1113 9.50781 14.207C9.54883 14.2982 9.56934 14.3962 9.56934 14.501C9.56934 14.7061 9.4987 14.877 9.35742 15.0137C9.2207 15.1504 9.04525 15.2188 8.83105 15.2188C8.63509 15.2188 8.45508 15.1413 8.29102 14.9863L3.78613 10.4883C3.62207 10.3242 3.54004 10.1351 3.54004 9.9209C3.54004 9.70215 3.62207 9.5153 3.78613 9.36035L8.28418 4.86914C8.4528 4.70964 8.63509 4.62988 8.83105 4.62988C9.04525 4.62988 9.2207 4.69824 9.35742 4.83496C9.4987 4.96712 9.56934 5.13574 9.56934 5.34082C9.56934 5.4502 9.54883 5.55046 9.50781 5.6416C9.47135 5.72819 9.41895 5.80566 9.35059 5.87402L7.83301 7.41895L5.7959 9.26465L7.42285 9.16895H11.9551C13.5365 9.16895 14.6803 9.5472 15.3867 10.3037C16.0977 11.0602 16.4531 12.2428 16.4531 13.8516C16.4531 14.0521 16.4486 14.2389 16.4395 14.4121C16.4303 14.5807 16.4121 14.7334 16.3848 14.8701C16.362 14.984 16.3232 15.0911 16.2686 15.1914C16.2139 15.2962 16.1341 15.3805 16.0293 15.4443C15.929 15.5127 15.8014 15.5469 15.6465 15.5469Z", fill: "currentColor" }) });
  }
  let d = ["right", "left"], c = "cubic-bezier(0.4, 0, 0.2, 1)";
  function u(e2) {
    if (e2 <= 0) return 0;
    let t2 = e2 / 0.82;
    if (t2 >= 1) return 1;
    let n2 = 0, r2 = 1;
    for (let e3 = 0; e3 < 20; e3++) {
      let e4 = (n2 + r2) * 0.5;
      e4 * e4 * (3 - 2 * e4) < t2 ? n2 = e4 : r2 = e4;
    }
    let a2 = (n2 + r2) * 0.5;
    return a2 * a2 * a2;
  }
  function p({ direction: e2, show: n2, rapid: r2, scrollOpacity: a2 }) {
    let i2 = "right" === e2, s2 = void 0 !== a2;
    return (0, t.jsxs)("div", { className: "pointer-events-none absolute inset-0 flex flex-col rounded-[20px] p-5 text-white", style: { opacity: s2 ? a2 : +!!n2, transition: s2 ? "none" : `opacity ${r2 ? 20 : 50}ms ease-out`, backgroundColor: i2 ? "#07AA04" : "#858482", alignItems: i2 ? "flex-start" : "flex-end" }, children: [(0, t.jsx)("svg", { width: "32", height: "32", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: i2 ? (0, t.jsx)("path", { fill: "currentColor", d: "M10.3906 19.3828C9.97396 19.3828 9.61979 19.2031 9.32812 18.8438L5.28125 13.8594C5.16667 13.724 5.08333 13.5911 5.03125 13.4609C4.98438 13.3307 4.96094 13.1953 4.96094 13.0547C4.96094 12.7422 5.0651 12.4844 5.27344 12.2812C5.48177 12.0781 5.74479 11.9766 6.0625 11.9766C6.42188 11.9766 6.72396 12.1302 6.96875 12.4375L10.3594 16.7344L16.9766 6.25C17.112 6.04167 17.2526 5.89583 17.3984 5.8125C17.5443 5.72396 17.7266 5.67969 17.9453 5.67969C18.263 5.67969 18.5234 5.77865 18.7266 5.97656C18.9297 6.17448 19.0312 6.42708 19.0312 6.73438C19.0312 6.85938 19.0104 6.98438 18.9688 7.10938C18.9271 7.23438 18.862 7.36458 18.7734 7.5L11.4609 18.8125C11.2109 19.1927 10.8542 19.3828 10.3906 19.3828Z" }) : (0, t.jsx)("path", { fill: "currentColor", d: "M12 20.5078C10.8854 20.5078 9.83594 20.2943 8.85156 19.8672C7.86719 19.4453 7 18.8594 6.25 18.1094C5.5 17.3594 4.91146 16.4948 4.48438 15.5156C4.0625 14.5312 3.85156 13.4792 3.85156 12.3594C3.85156 11.2448 4.0625 10.1979 4.48438 9.21875C4.91146 8.23438 5.4974 7.36719 6.24219 6.61719C6.99219 5.86719 7.85938 5.28125 8.84375 4.85938C9.82812 4.43229 10.8776 4.21875 11.9922 4.21875C12.5286 4.21875 13.0469 4.26823 13.5469 4.36719C14.0521 4.46615 14.5391 4.61198 15.0078 4.80469C14.8307 5.0599 14.6953 5.32812 14.6016 5.60938C14.5078 5.89062 14.4505 6.1849 14.4297 6.49219C14.0547 6.33594 13.6615 6.21615 13.25 6.13281C12.8438 6.04427 12.4245 6 11.9922 6C11.112 6 10.2865 6.16406 9.51562 6.49219C8.75 6.82031 8.07552 7.27604 7.49219 7.85938C6.91406 8.44271 6.46094 9.11979 6.13281 9.89062C5.8099 10.6562 5.64844 11.4792 5.64844 12.3594C5.64844 13.2448 5.8099 14.0729 6.13281 14.8438C6.46094 15.6094 6.91667 16.2839 7.5 16.8672C8.08333 17.4453 8.75781 17.8984 9.52344 18.2266C10.2943 18.5547 11.1198 18.7188 12 18.7188C12.8802 18.7188 13.7057 18.5547 14.4766 18.2266C15.2474 17.8984 15.9219 17.4453 16.5 16.8672C17.0833 16.2839 17.5391 15.6094 17.8672 14.8438C18.1953 14.0729 18.3594 13.2448 18.3594 12.3594C18.3594 12.0677 18.3385 11.7812 18.2969 11.5C18.2552 11.2135 18.1953 10.9375 18.1172 10.6719C18.4089 10.6979 18.7031 10.6849 19 10.6328C19.3021 10.5807 19.5938 10.4844 19.875 10.3438C19.9635 10.6615 20.0312 10.9896 20.0781 11.3281C20.125 11.6667 20.1484 12.0104 20.1484 12.3594C20.1484 13.4792 19.9349 14.5312 19.5078 15.5156C19.0807 16.4948 18.4922 17.3594 17.7422 18.1094C16.9974 18.8594 16.1328 19.4453 15.1484 19.8672C14.1641 20.2943 13.1146 20.5078 12 20.5078ZM8.15625 13.4219C7.96354 13.4219 7.79948 13.3568 7.66406 13.2266C7.53385 13.0964 7.46875 12.9349 7.46875 12.7422C7.46875 12.5547 7.53385 12.3958 7.66406 12.2656C7.79948 12.1354 7.96354 12.0703 8.15625 12.0703H11.3203V7.74219C11.3203 7.54948 11.3854 7.38802 11.5156 7.25781C11.6458 7.1276 11.8047 7.0625 11.9922 7.0625C12.1849 7.0625 12.3464 7.1276 12.4766 7.25781C12.6068 7.38802 12.6719 7.54948 12.6719 7.74219V12.7422C12.6719 12.9349 12.6068 13.0964 12.4766 13.2266C12.3464 13.3568 12.1849 13.4219 11.9922 13.4219H8.15625ZM18.1797 9.60938C17.6849 9.60938 17.2344 9.48958 16.8281 9.25C16.4219 9.00521 16.0964 8.67969 15.8516 8.27344C15.612 7.86198 15.4922 7.41146 15.4922 6.92188C15.4922 6.43229 15.612 5.98438 15.8516 5.57812C16.0964 5.16667 16.4219 4.84115 16.8281 4.60156C17.2344 4.35677 17.6849 4.23438 18.1797 4.23438C18.6693 4.23438 19.1172 4.35677 19.5234 4.60156C19.9349 4.84115 20.2604 5.16667 20.5 5.57812C20.7448 5.98438 20.8672 6.43229 20.8672 6.92188C20.8672 7.41146 20.7448 7.86198 20.5 8.27344C20.2604 8.67969 19.9349 9.00521 19.5234 9.25C19.1172 9.48958 18.6693 9.60938 18.1797 9.60938Z" }) }), (0, t.jsx)("p", { className: "text-xl font-medium tracking-[-0.035em]", children: i2 ? "Done" : "Later" })] });
  }
  e.s(["EmailStack", 0, function({ emails: e2, activeIndex: r2, onSwipe: a2, gameSwipes: i2, cardLabels: o2, isDragging: l2 = false, dragExit: h = false, topCardRef: m, topCardPreset: f, scrollFloat: y }) {
    var g;
    let b = void 0 !== i2, v = void 0 !== y && Number.isFinite(y) && y >= 0 && !b, x = v ? y >= 2 ? 2 : +(y >= 1) : r2 >= 2 ? 2 : +(r2 >= 1), [_, k] = (0, n.useState)([]), [w, j] = (0, n.useState)(300), [E, T] = (0, n.useState)(false), C = (0, n.useRef)(r2), S = (0, n.useRef)(0);
    (0, n.useEffect)(() => {
      if (r2 !== C.current) {
        let e3 = 3 === C.current;
        if (C.current = r2, e3 && r2 < 3) {
          T(true);
          let e4 = setTimeout(() => {
            k([]), j(300), T(false);
          }, 150);
          return () => clearTimeout(e4);
        }
        k([]), j(300), T(false);
      }
    }, [r2]);
    let N = b ? i2 : _, I = (0, n.useMemo)(() => [...d.slice(0, x), ...N], [x, N]), A = I.length, O = (0, n.useRef)(i2?.length ?? 0);
    (0, n.useEffect)(() => {
      if (!b) return;
      let e3 = i2.length;
      if (e3 > O.current) {
        let e4 = Date.now(), t2 = e4 - S.current;
        S.current = e4, j(t2 < 300 ? 150 : 300);
      }
      O.current = e3;
    }, [i2, b]), (0, n.useEffect)(() => {
      if (3 !== r2 || b) return;
      let e3 = (e4) => {
        if ("ArrowRight" === e4.key || "ArrowLeft" === e4.key) {
          e4.preventDefault();
          let t2 = "ArrowRight" === e4.key ? "right" : "left", n2 = Date.now(), r3 = n2 - S.current;
          S.current = n2, j(r3 < 300 ? 150 : 300), a2?.(t2), k((e5) => [...e5, t2]);
        }
      };
      return window.addEventListener("keydown", e3), () => window.removeEventListener("keydown", e3);
    }, [r2, x, a2, b]);
    let R = Math.max(0, A - 1), D = v && y < 1 ? 0 : v && y < 2 ? 1 : null, L = null === D || (g = (y ?? 0) - D) <= 0 ? 0 : g >= 1 ? 1 : g < 0.82 ? 0.7 * u(g) : 0.7 + 0.30000000000000004 * (1 - (1 - (g - 0.82) / 0.18000000000000005) ** 2);
    return (0, t.jsx)("div", { className: "absolute inset-0 flex items-center justify-center [scale:var(--stack-scale,0.7)] max-md:[@media(min-height:740px)]:[scale:var(--stack-scale,0.9)] md:[scale:var(--stack-scale,1)]", style: { opacity: +!E, transition: "opacity 150ms ease" }, children: (0, t.jsx)("div", { className: "relative isolate aspect-27/40 w-full max-w-[320px]", children: Array.from({ length: A + 3 - R }, (n2, r3) => {
      var a3, i3, g2;
      let b2, x2, _2 = R + r3, k2 = e2[_2 % e2.length];
      if (!k2) return null;
      let j2 = _2 - A, E2 = j2 < 0 ? I[_2] : void 0, T2 = null !== D && j2 > 0 && _2 > D, C2 = T2 ? Math.max(0, j2 - L) : Math.max(0, j2), S2 = `translateY(${-8 * C2}px) scale(${1 - 0.1 * C2})`, N2 = E2 ? "right" === E2 ? "translateX(200%) rotate(12deg)" : "translateX(-200%) rotate(-12deg)" : "", O2 = 0 === j2, M = null;
      v && (0 === _2 && y < 1 ? (M = y, b2 = d[0]) : 1 === _2 && y >= 1 && y < 2 && (M = y - 1, b2 = d[1]));
      let Z = null !== M && !N2 && M < 1, U = O2 && f ? "done" === f ? "translateX(40%) translateY(-3%) rotate(3deg)" : "translateX(-40%) translateY(-3%) rotate(-3deg)" : "", P = N2 ? `${S2} ${N2}` : Z && b2 && null != M ? (a3 = Math.min(1, M), i3 = b2, x2 = u(a3), `${S2} translateX(${200 * x2 * ("right" === i3 ? 1 : -1)}%) rotate(${12 * x2 * ("right" === i3 ? 1 : -1)}deg)`) : U ? `${S2} ${U}` : S2, Y = -1 === j2, $ = O2 && l2 || Z && void 0 !== b2 || T2, z = T2 ? Math.max(0, Math.min(1, (2 - C2 - 0.25) / 0.5)) : +!(C2 >= 2);
      return (0, t.jsxs)("div", { ref: O2 ? m : void 0, className: "absolute inset-0 origin-top", style: { zIndex: -j2, transform: P, transitionProperty: $ ? "none" : "transform, opacity", transitionDuration: `${Y && h ? 300 : w}ms`, transitionTimingFunction: `${Y ? h ? "cubic-bezier(0, 0, 0.58, 1)" : "cubic-bezier(0.1, 0.3, 1, 0)" : c}, ${c}`, transitionDelay: `${Y ? 0 : Math.round(0.06 * w)}ms`, opacity: z }, children: [(0, t.jsx)(s, { email: k2, className: "h-full w-full select-none", gameLabel: o2 ? o2[_2 % o2.length] : void 0 }), (0, t.jsx)(p, { direction: E2 ?? (Z ? b2 : O2 && f ? "done" === f ? "right" : "left" : void 0), show: Y || O2 && !!f || O2 && Z && (M ?? 0) > 0.05, scrollOpacity: O2 && Z && null != M ? (g2 = M) <= 0.05 ? 0 : g2 >= 0.1 ? 1 : (g2 - 0.05) / 0.05 : void 0, rapid: 150 === w })] }, _2);
    }) }) });
  }], 32138);
}, 10989, (e) => {
  "use strict";
  var t = e.i(43476), n = e.i(71645), r = e.i(12786), a = e.i(5734), i = e.i(32138), s = e.i(95333), o = e.i(29116), l = e.i(87339), d = e.i(36519);
  let c = [{ bucket: 0, count: 0 }];
  function u(e2) {
    e2.preventDefault();
  }
  function p(e2) {
    return Array.from({ length: e2 }, () => 0.5 > Math.random() ? "later" : "done");
  }
  function h({ histogram: e2, playerScore: r2, loading: a2, height: i2 = 64, barColor: s2 = "bg-foreground/20", activeColor: o2 = "bg-foreground" }) {
    let [l2, d2] = (0, n.useState)(null), c2 = (0, n.useRef)(null), p2 = (0, n.useRef)(null), f2 = (0, n.useCallback)((e3) => {
      p2.current && p2.current.removeEventListener("touchmove", u), p2.current = e3, e3 && e3.addEventListener("touchmove", u, { passive: false });
    }, []), y2 = e2[0], g2 = e2[e2.length - 1], b2 = y2?.bucket ?? 0, v = g2?.bucket ?? 0, x = v - b2 + 1, _ = (0, n.useCallback)((e3) => {
      let t2 = p2.current;
      if (!t2 || x <= 0) return null;
      let n2 = t2.getBoundingClientRect(), r3 = e3 - n2.left - 8, a3 = n2.width - 16;
      return r3 < 0 || r3 >= a3 ? null : b2 + Math.min(Math.floor(r3 / a3 * x), x - 1);
    }, [b2, x]), k = (0, n.useCallback)((e3) => {
      e3 !== c2.current && (c2.current = e3, d2(e3));
    }, []), { allBuckets: w, maxCount: j } = (0, n.useMemo)(() => {
      if (!y2 || !g2) return { allBuckets: [], maxCount: 0 };
      let t2 = new Map(e2.map((e3) => [e3.bucket, e3.count])), n2 = [];
      for (let e3 = b2; e3 <= v; e3++) n2.push({ bucket: e3, count: t2.get(e3) ?? 0 });
      return { allBuckets: n2, maxCount: Math.max(...n2.map((e3) => e3.count)) };
    }, [e2, y2, g2, b2, v]);
    return a2 ? (0, t.jsxs)("div", { className: "mt-4", children: [(0, t.jsx)("div", { className: "flex items-center justify-center gap-px px-2", style: { height: i2 }, children: (0, t.jsx)("p", { className: "text-[16px]/[24px] text-foreground/30 font-medium animate-pulse", children: "Loading..." }) }), (0, t.jsx)("div", { className: "h-px bg-foreground/15 mt-px rounded" }), (0, t.jsx)("div", { className: "mt-0.5 flex justify-between text-[12px]/[16px] tabular-nums text-foreground/30", children: (0, t.jsx)("div", { className: "h-4 w-4" }) })] }) : y2 && g2 ? (0, t.jsxs)("div", { className: "mt-4", children: [(0, t.jsx)("div", { ref: f2, className: "relative flex items-end justify-center gap-px px-2", style: { height: i2 }, onMouseLeave: () => k(null), onTouchStart: (e3) => {
      let t2 = e3.touches[0];
      t2 && k(_(t2.clientX));
    }, onTouchMove: (e3) => {
      let t2 = e3.touches[0];
      t2 && k(_(t2.clientX));
    }, onTouchEnd: () => k(null), onTouchCancel: () => k(null), children: w.map((e3, n2) => {
      let a3 = j > 0 ? e3.count / j * 100 : 0, i3 = e3.bucket === r2, d3 = e3.bucket === l2;
      return (0, t.jsxs)("div", { className: "relative flex-1", style: { height: "100%" }, onMouseEnter: () => k(e3.bucket), children: [d3 && (0, t.jsx)(m, { bucket: e3.bucket, count: e3.count, index: n2, total: w.length }), (0, t.jsx)("div", { className: `absolute inset-x-0 bottom-0 rounded-t-[1px] transition-colors duration-75 ${d3 ? o2 : i3 ? "bg-accent-sky" : s2}`, style: { height: `${Math.max(a3, 4 * (e3.count > 0))}%`, minHeight: 2 * (e3.count > 0) } })] }, e3.bucket);
    }) }), (0, t.jsx)("div", { className: "h-px bg-foreground/15 mt-px rounded" }), (0, t.jsxs)("div", { className: "mt-0.5 flex justify-between text-[12px]/[16px] tabular-nums text-foreground/30", children: [(0, t.jsx)("span", { className: "w-5", children: b2 }), (0, t.jsx)("span", { className: "w-5", children: v })] })] }) : null;
  }
  function m({ bucket: e2, count: n2, index: r2, total: a2 }) {
    return (0, t.jsx)("div", { className: `absolute bottom-full z-10 pointer-events-none mb-1.5 ${r2 <= 1 ? "left-0" : r2 >= a2 - 2 ? "right-0" : "left-1/2 -translate-x-1/2"}`, children: (0, t.jsxs)("div", { className: "bg-white rounded-md px-2 py-1 text-[12px]/[16px] font-medium tabular-nums text-black whitespace-nowrap shadow-lg", children: [e2, " pts ", (0, t.jsxs)("span", { className: "text-neutral-500", children: ["(", n2, ")"] })] }) });
  }
  let f = ["done", "later", "done", "later", "done", "later"];
  function y() {
    let [e2, r2] = (0, n.useState)(0), [a2, i2] = (0, n.useState)(false);
    (0, n.useEffect)(() => {
      let e3 = setInterval(() => {
        i2(true), setTimeout(() => {
          r2((e4) => e4 + 1), i2(false);
        }, 500);
      }, 1800);
      return () => clearInterval(e3);
    }, []);
    let s2 = "done" === (f[e2 % f.length] ?? "done") ? "right" : "left";
    return (0, t.jsxs)("div", { className: "flex items-center gap-5 mt-1", children: [(0, t.jsx)("div", { className: (0, d.cn)("text-foreground transition-all duration-200 z-10", a2 && "left" === s2 ? "text-accent-sky scale-125" : "text-foreground/20 scale-100"), children: (0, t.jsx)(b, { direction: "left" }) }), (0, t.jsx)("div", { className: "relative h-[120px] w-[90px]", children: Array.from({ length: 2 }, (n2, r3) => {
      let i3 = e2 + (1 - r3), o2 = i3 - e2, l2 = f[i3 % f.length] ?? "done", d2 = 0 === o2 && a2;
      return (0, t.jsx)("div", { className: "absolute inset-0 origin-top", style: { zIndex: -o2, transform: `translateY(${-4 * o2}px) scale(${1 - 0.06 * o2}) ${d2 ? "right" === s2 ? "translateX(120%) rotate(6deg)" : "translateX(-120%) rotate(-6deg)" : ""}`, transition: `transform ${d2 ? "500ms" : "400ms"}, opacity ${d2 ? "150ms" : "400ms"} ${d2 ? "350ms" : "0ms"}`, transitionTimingFunction: d2 ? "cubic-bezier(0.1, 0.3, 1, 0)" : "cubic-bezier(0.4, 0, 0.2, 1)", opacity: o2 >= 2 || d2 ? 0 : 1 }, children: (0, t.jsx)(g, { label: l2 }) }, i3);
    }) }), (0, t.jsx)("div", { className: (0, d.cn)("transition-all duration-200 z-10", a2 && "right" === s2 ? "text-accent-green scale-125" : "text-foreground/20 scale-100"), children: (0, t.jsx)(b, { direction: "right" }) })] });
  }
  function g({ label: e2 }) {
    let n2 = "done" === e2;
    return (0, t.jsxs)("div", { className: "flex h-full w-full flex-col overflow-hidden rounded-xl bg-[#f7f6f4] border border-foreground/10 shadow-[0_1px_4px_rgba(0,0,0,0.06)]", children: [(0, t.jsxs)("div", { className: "flex flex-1 flex-col gap-1.5 px-3 pt-3 pb-1", children: [(0, t.jsx)("div", { className: "h-1 w-[95%] rounded-full bg-foreground/10" }), (0, t.jsx)("div", { className: "h-1 w-[85%] rounded-full bg-foreground/10" }), (0, t.jsx)("div", { className: "h-1 w-[95%] rounded-full bg-foreground/10" }), (0, t.jsx)("div", { className: "h-1 w-[60%] rounded-full bg-foreground/10" })] }), (0, t.jsx)("div", { className: (0, d.cn)("mx-2 mb-2 flex items-center justify-center rounded-lg py-2", n2 ? "bg-accent-green" : "bg-accent-sky"), children: (0, t.jsx)("span", { className: "text-[14px]/[14px] font-[550] tracking-tight text-white", children: n2 ? "Done" : "Later" }) })] });
  }
  function b({ direction: e2 }) {
    return (0, t.jsx)("svg", { width: "12", height: "12", viewBox: "0 0 12 12", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: "left" === e2 ? (0, t.jsx)("path", { d: "M0.392578 5.75781C0.392578 5.54688 0.470703 5.36719 0.626953 5.21875L4.45898 1.38672C4.54102 1.30469 4.625 1.24609 4.71094 1.21094C4.80078 1.17188 4.89062 1.15234 4.98047 1.15234C5.19531 1.15234 5.36914 1.21875 5.50195 1.35156C5.63477 1.48438 5.70117 1.64844 5.70117 1.84375C5.70117 1.94922 5.67969 2.04688 5.63672 2.13672C5.59766 2.22266 5.54492 2.29883 5.47852 2.36523L4.16602 3.68945L2.08594 5.59961L1.81641 5.14844L3.94922 5.03125H10.8633C11.0859 5.03125 11.2656 5.09961 11.4023 5.23633C11.5391 5.36914 11.6074 5.54297 11.6074 5.75781C11.6074 5.97656 11.5391 6.1543 11.4023 6.29102C11.2656 6.42383 11.0859 6.49023 10.8633 6.49023H3.94922L1.81641 6.36719L2.08594 5.92773L4.16602 7.82617L5.47852 9.15039C5.54492 9.2168 5.59766 9.29297 5.63672 9.37891C5.67969 9.46484 5.70117 9.5625 5.70117 9.67188C5.70117 9.86719 5.63477 10.0312 5.50195 10.1641C5.36914 10.2969 5.19531 10.3633 4.98047 10.3633C4.79297 10.3633 4.62305 10.2871 4.4707 10.1348L0.626953 6.29688C0.470703 6.14844 0.392578 5.96875 0.392578 5.75781Z", fill: "currentColor" }) : (0, t.jsx)("path", { d: "M11.6074 5.75781C11.6074 5.96875 11.5312 6.14844 11.3789 6.29688L7.5293 10.1348C7.37695 10.2871 7.20703 10.3633 7.01953 10.3633C6.80469 10.3633 6.63086 10.2969 6.49805 10.1641C6.36523 10.0312 6.29883 9.86719 6.29883 9.67188C6.29883 9.5625 6.31836 9.46484 6.35742 9.37891C6.40039 9.29297 6.45508 9.2168 6.52148 9.15039L7.83398 7.82617L9.91406 5.92773L10.1836 6.36719L8.05078 6.49023H1.13672C0.914062 6.49023 0.734375 6.42383 0.597656 6.29102C0.460938 6.1543 0.392578 5.97656 0.392578 5.75781C0.392578 5.54297 0.460938 5.36914 0.597656 5.23633C0.734375 5.09961 0.914062 5.03125 1.13672 5.03125H8.05078L10.1836 5.14844L9.91406 5.59961L7.83398 3.68945L6.52148 2.36523C6.45508 2.29883 6.40039 2.22266 6.35742 2.13672C6.31836 2.04688 6.29883 1.94922 6.29883 1.84375C6.29883 1.64844 6.36523 1.48438 6.49805 1.35156C6.63086 1.21875 6.80469 1.15234 7.01953 1.15234C7.10938 1.15234 7.19727 1.17188 7.2832 1.21094C7.37305 1.24609 7.45898 1.30469 7.54102 1.38672L11.3789 5.21875C11.5312 5.36719 11.6074 5.54688 11.6074 5.75781Z", fill: "currentColor" }) });
  }
  e.s(["ScoreHistogram", 0, h, "TriageGame", 0, function({ emails: e2, onPulse: m2, onScoreRecorded: f2, onReset: g2, active: b2, standalone: v }) {
    let x, _, [k, w] = (0, n.useState)("instructions"), [j, E] = (0, n.useState)(3), [T, C] = (0, n.useState)(0), [S, N] = (0, n.useState)(20), [I, A] = (0, n.useState)([]), [O, R] = (0, n.useState)(() => p(e2.length)), [D, L] = (0, n.useState)(0), [M, Z] = (0, n.useState)(null), [U, P] = (0, n.useState)(null), [Y, $] = (0, n.useState)(false), [z, F] = (0, n.useState)(false), [q, W] = (0, n.useState)([]), H = (0, s.useIosHaptics)(), B = (0, o.useTrack)(), V = (0, n.useRef)(k);
    V.current = k;
    let K = (0, n.useRef)(T);
    K.current = T;
    let G = (0, n.useRef)(null), X = (0, n.useRef)(null), J = (0, n.useRef)(false), Q = (0, n.useRef)(false), ee = (0, n.useRef)(null), [et, en] = (0, n.useState)(false), [er, ea] = (0, n.useState)(false), ei = (0, n.useRef)(null), es = (0, n.useCallback)((e3) => {
      ei.current && ei.current.removeEventListener("touchmove", u), ei.current = e3, e3 && e3.addEventListener("touchmove", u, { passive: false });
    }, []), eo = (0, n.useCallback)((e3) => {
      V.current = e3, w(e3);
    }, []), el = (0, n.useCallback)(() => 2 + I.length, [I.length]), ed = (0, n.useCallback)(() => O[el() % O.length], [el, O]), ec = (0, n.useCallback)((t2) => {
      2 + t2 >= O.length && R((t3) => [...t3, ...p(e2.length)]);
    }, [O.length, e2.length]), eu = (0, n.useCallback)((e3) => {
      if ("playing" !== V.current) return;
      let t2 = e3 === ("later" === ed() ? "left" : "right");
      t2 ? (L((e4) => e4 + 1), H.light()) : H.error();
      let n2 = Math.max(-99, Math.min(K.current + (t2 ? 1 : -1), 99));
      K.current = n2, C(n2), (n2 >= 99 || n2 <= -99) && ($(true), eo("finished")), t2 ? m2("right" === e3 ? "var(--color-accent-green)" : "var(--color-accent-sky)") : m2("var(--color-accent-red)"), ec(I.length + 1), A((t3) => [...t3, e3]);
    }, [ed, m2, I.length, ec, eo, H]), ep = (0, n.useCallback)(() => {
      H.light(), B(l.BillboardEvents.GameStarted), eo("countdown"), E(3);
    }, [eo, H, B]), eh = (0, n.useRef)(null), em = (0, n.useCallback)(() => {
      ee.current && (ee.current.style.transform = "");
    }, []), ef = (0, n.useCallback)(() => {
      en(false), Q.current = false, G.current = null, X.current = null, J.current = false, em();
    }, [em]), ey = (0, n.useCallback)((t2 = "instructions") => {
      eo(t2), C(0), L(0), N(20), E(3), A([]), R(p(e2.length)), Z(null), P(null), $(false), F(false), W([]), ea(false), ef(), g2?.(), eh.current && (clearTimeout(eh.current), eh.current = null);
    }, [e2.length, eo, ef, g2]), eg = (0, n.useCallback)(() => {
      H.light(), B(l.BillboardEvents.GameShareClicked, { score: T }), eh.current && (clearTimeout(eh.current), eh.current = null);
      let e3 = new URL(U ? `/stackchallenge/s/${U}` : "/stackchallenge", window.location.origin), t2 = `Can you beat my score on @Avec Stack Challenge?
${e3.toString()}`;
      navigator.clipboard.writeText(t2).then(() => {
        F(true);
        let e4 = Date.now(), t3 = (Math.random() - 0.5) * 60, n2 = Math.sign(t3) * (2 + 4 * Math.random());
        W((r2) => [...r2, { id: e4, text: "Can you beat my score on @Avec Stack Challenge?", dx: t3, rotate: n2 }]), setTimeout(() => W((t4) => t4.filter((t5) => t5.id !== e4)), 1e3), eh.current = setTimeout(() => {
          F(false), eh.current = null;
        }, 2e3);
      });
    }, [T, U, H, B]), eb = (0, n.useRef)(b2);
    return (0, n.useEffect)(() => {
      if (eb.current && !b2 && "finished" !== V.current) {
        let e3 = setTimeout(ey, 300);
        return eb.current = b2, () => clearTimeout(e3);
      }
      eb.current = b2;
    }, [b2, ey]), (0, n.useEffect)(() => {
      if ("finished" !== k) return;
      let e3 = false;
      return (async () => {
        let t2 = await (0, a.recordScore)(T);
        if (e3) return;
        t2.ok && t2.hash && (P(t2.hash), f2?.(t2.hash));
        let n2 = await (0, r.getScoreStats)(T);
        e3 || (Z(n2), B(l.BillboardEvents.GameFinished, { score: T, percentile: n2.percentile, hitScoreLimit: Y }));
      })(), () => {
        e3 = true;
      };
    }, [k, T, Y, B, f2]), (0, n.useEffect)(() => {
      if ("countdown" !== k || !b2) return;
      if (j <= 0) return void eo("playing");
      let e3 = setTimeout(() => E((e4) => e4 - 1), 1e3);
      return () => clearTimeout(e3);
    }, [k, j, b2, eo]), (0, n.useEffect)(() => {
      if ("playing" !== k || S <= 0 || !b2) return;
      let e3 = setTimeout(() => {
        N((e4) => {
          let t2 = e4 - 1;
          return t2 <= 0 ? (eo("finished"), 0) : t2;
        });
      }, 1e3);
      return () => clearTimeout(e3);
    }, [k, S, b2, eo]), (0, n.useEffect)(() => {
      "playing" !== k && ef();
    }, [k, ef]), (0, n.useEffect)(() => {
      if (!b2) return;
      let e3 = (e4) => {
        if ("Enter" === e4.key && "instructions" === V.current) {
          e4.preventDefault(), ep();
          return;
        }
        "playing" === V.current && ("ArrowLeft" === e4.key || "ArrowRight" === e4.key) && (e4.preventDefault(), ea(false), eu("ArrowRight" === e4.key ? "right" : "left"));
      };
      return window.addEventListener("keydown", e3), () => window.removeEventListener("keydown", e3);
    }, [b2, ep, eu]), (0, t.jsxs)(t.Fragment, { children: [(0, t.jsx)(i.EmailStack, { emails: e2, activeIndex: 3, gameSwipes: I, cardLabels: "playing" === k ? O : void 0, isDragging: et, dragExit: er, topCardRef: ee }), "playing" === k && (0, t.jsxs)("div", { ref: es, className: "absolute inset-0 z-30 flex pointer-fine:hidden touch-none", onTouchStart: (e3) => {
      G.current = e3.touches[0]?.clientX ?? null, X.current = e3.touches[0]?.clientY ?? null, J.current = false, Q.current = false, en(false);
    }, onTouchMove: (e3) => {
      let t2 = G.current, n2 = X.current, r2 = e3.touches[0];
      if (null == t2 || null == n2 || !r2) return;
      let a2 = r2.clientX - t2, i2 = r2.clientY - n2;
      if (!Q.current && Math.sqrt(a2 * a2 + i2 * i2) > 5 && (Q.current = true, en(true)), Q.current && ee.current) {
        let e4 = Math.max(-4, Math.min(4, 0.02 * a2));
        ee.current.style.transform = `translateY(0px) scale(1) translateX(${a2}px) translateY(${i2}px) rotate(${e4}deg)`;
      }
    }, onTouchCancel: ef, onTouchEnd: (e3) => {
      let t2 = G.current, n2 = e3.changedTouches[0]?.clientX, r2 = Q.current;
      if (G.current = null, X.current = null, Q.current = false, en(false), r2) {
        if (null != t2 && null != n2) {
          let e4 = n2 - t2;
          if (Math.abs(e4) > 30) {
            J.current = true, ea(true), eu(e4 > 0 ? "right" : "left");
            return;
          }
        }
        em();
      }
    }, children: [(0, t.jsx)("button", { type: "button", className: "h-full flex-1", onClick: () => {
      J.current || (ea(false), eu("left"));
    }, "aria-label": "Later" }), (0, t.jsx)("button", { type: "button", className: "h-full flex-1", onClick: () => {
      J.current || (ea(false), eu("right"));
    }, "aria-label": "Done" })] }), "instructions" === k && (0, t.jsx)("div", { className: (0, d.cn)("group absolute inset-0 z-20 flex items-center justify-center p-6 cursor-pointer transition-[backdrop-filter,background-color] duration-800", b2 ? "bg-black/50 backdrop-blur-sm" : "bg-black/0 backdrop-blur-0"), onClick: ep, role: "button", tabIndex: 0, onKeyDown: (e3) => {
      "Enter" === e3.key && ep();
    }, children: (0, t.jsxs)("div", { className: (0, d.cn)("flex flex-col items-center text-center text-balance gap-6 md:gap-8 [@media(max-height:700px)]:gap-3.5 rounded-[28px] bg-white px-4 py-6 md:p-8 ring-1 ring-black/10 shadow-xl pointer-fine:group-hover:scale-102 transition-transform duration-120 ease-out", b2 ? "animate-card-enter" : "opacity-0"), children: [(0, t.jsxs)("div", { className: "flex flex-col items-center gap-1 md:gap-1", children: [!v && (0, t.jsx)("p", { className: "type-caption tracking-[-0.035em] font-medium text-foreground bg-surface/75 rounded-full px-2 py-1 mb-2 -mt-2.5 max-md:[@media(max-height:700px)]:hidden", children: "Experience it yourself" }), v ? (0, t.jsx)("h1", { className: "type-body-lg font-medium", children: "Play Avec Stack Challenge" }) : (0, t.jsx)("h2", { className: "type-body-lg font-medium", children: "Play Avec Stack Challenge" }), (0, t.jsxs)("p", { className: "type-body md:text-[16px]/[24px] text-[14px]/[20px] w-full text-foreground font-medium", children: ["Sort as many emails as you can in ", 20, (0, t.jsx)("span", { className: "min-[381px]:hidden", children: "s" }), (0, t.jsx)("span", { className: "hidden min-[381px]:inline", children: " sec" }), (0, t.jsx)("span", { className: "hidden min-[414px]:inline", children: "onds" })] })] }), (0, t.jsxs)("div", { className: "flex flex-col items-center gap-4", children: [(0, t.jsxs)("p", { className: "type-body text-[14px]/[20px] tracking-[-0.02em] text-foreground font-medium", children: [(0, t.jsx)("span", { className: "hidden pointer-fine:inline", children: "Use the arrow keys to match each card's label" }), (0, t.jsx)("span", { className: "pointer-fine:hidden", children: "Tap/swipe to match each card's label" })] }), (0, t.jsx)(y, {}), (0, t.jsxs)("p", { className: "type-body text-[14px]/[20px] tracking-[-0.02em] text-foreground font-medium text-balance pt-1 flex gap-1.5", children: [(0, t.jsxs)("span", { className: "bg-accent-green/30 rounded px-1.5 pb-1 pt-0.5 inline-flex gap-1.5", children: [(0, t.jsx)("span", { className: "text-green-700 font-semibold", children: "+1" }), " ", "Correct"] }), (0, t.jsxs)("span", { className: "bg-accent-red/30 rounded px-1.5 pb-1 pt-0.5 inline-flex gap-1.5", children: [(0, t.jsx)("span", { className: "text-red-700 font-semibold", children: "-1" }), "Incorrect"] })] })] }), (0, t.jsxs)("p", { className: "type-body text-[16px]/[24px] font-medium pt-4 tracking-[-0.03em]", children: [(0, t.jsxs)("span", { className: "hidden pointer-fine:inline", children: ["Click or press", " ", (0, t.jsx)("span", { className: "border border-foreground/15 rounded px-1 pb-0.5", children: "Enter" }), " ", "to begin"] }), (0, t.jsx)("span", { className: "pointer-fine:hidden", children: "Tap to begin" })] })] }) }), "countdown" === k && j > 0 && (0, t.jsx)("div", { className: "absolute inset-0 z-20 flex items-center justify-center bg-black/50 backdrop-blur-sm", children: (0, t.jsx)("span", { className: "type-display animate-countdown font-medium text-white", children: j }, j) }), "playing" === k && (0, t.jsxs)(t.Fragment, { children: [(0, t.jsxs)("div", { className: "pointer-events-none absolute inset-x-0 top-0 z-20 flex items-center justify-between px-5 pt-5", children: [(0, t.jsxs)("div", { className: "type-button rounded-full bg-black/40 px-3 py-1.5 font-medium tabular-nums text-white backdrop-blur-sm", children: [S, "s"] }), (0, t.jsxs)("div", { className: "type-button rounded-full bg-black/40 px-3 py-1.5 font-medium tabular-nums text-white backdrop-blur-sm", children: [T, " ", 1 === T ? "pt" : "pts"] })] }), (0, t.jsxs)("div", { className: "pointer-events-none absolute inset-x-0 bottom-6 z-20 flex justify-between px-6 type-button font-medium text-black/50", children: [(0, t.jsx)("span", { children: "\u2190 Later" }), (0, t.jsx)("span", { children: "Done \u2192" })] })] }), "finished" === k && (0, t.jsx)("div", { className: "absolute inset-0 z-20 flex items-center justify-center bg-black/50 p-6 backdrop-blur-sm", children: (0, t.jsxs)("div", { className: "animate-card-enter flex w-full max-w-[360px] flex-col items-center [@media(min-height:700px)]:gap-1 rounded-[28px] bg-white p-4 md:p-8 text-center ring-1 ring-black/10 shadow-xl", children: [(0, t.jsx)("p", { className: "text-[14px]/[20px] font-medium text-foreground/50", children: "Your score" }), (0, t.jsx)("p", { className: "text-[32px]/[48px] [@media(min-height:700px)]:text-[48px]/[56px] font-semibold tabular-nums text-foreground", children: T }), (0, t.jsx)("p", { className: "text-[16px]/[24px] font-medium tabular-nums text-foreground pb-3", children: I.length > 0 ? `${Math.round(D / I.length * 100)}% accuracy` : "0% accuracy" }), (x = !Y && !M, _ = Y ? T >= 99 ? "You hit the max score! You're almost too good..." : "You hit the min score! You're almost too bad..." : M?.isNewRecord ? "New world record!" : M?.isTiedRecord ? "You tied the world record!" : M?.isNewWorstScore ? "New world's worst score!" : M?.isTiedWorstScore ? "You tied the world's worst score!" : M ? function(e3, { lowercase: t2 = false } = {}) {
      let n2 = 100 - e3, [r2, a2] = t2 ? ["top", "bottom"] : ["Top", "Bottom"];
      return e3 >= 50 ? n2 <= 0.01 ? `${r2} 0.01% of players` : n2 <= 0.05 ? `${r2} 0.05% of players` : n2 <= 0.1 ? `${r2} 0.1% of players` : n2 <= 0.5 ? `${r2} 0.5% of players` : `${r2} ${Math.round(n2)}% of players` : `${a2} ${Math.round(e3)}% of players`;
    }(M.percentile) : null, x ? (0, t.jsx)("div", { className: "pb-2 flex justify-center", children: (0, t.jsx)("div", { className: "h-3 my-1 w-36 animate-pulse rounded-lg bg-foreground/10" }) }) : (0, t.jsx)("p", { className: "text-[14px]/[20px] font-medium text-foreground/50 pb-2", children: _ ?? "\xA0" })), (0, t.jsx)("div", { className: "flex w-full flex-col gap-1", children: (0, t.jsx)(h, { histogram: M?.histogram ?? c, playerScore: T, loading: !M }) }), (0, t.jsxs)("div", { className: "mt-2 flex flex-col-reverse md:flex-row md:items-center gap-2 md:gap-3 w-full pt-4", children: [(0, t.jsxs)("div", { className: "relative flex-1", children: [q.map((e3) => (0, t.jsx)("span", { className: "animate-float-up-fade origin-bottom border border-foreground/5 pointer-events-none absolute bottom-full left-1/2 z-10 -translate-x-1/2 whitespace-pre-line text-center text-[12px]/[16px] font-medium text-foreground/70 bg-white/70 backdrop-blur-sm min-w-[220px] text-balance rounded-lg p-2", style: { "--float-dx": `${e3.dx}px`, "--float-rot": `${e3.rotate}deg` }, children: e3.text }, e3.id)), (0, t.jsx)("button", { type: "button", onClick: eg, className: (0, d.cn)("w-full rounded-full tracking-tight px-6 py-3 text-[16px]/[24px] font-medium hover:opacity-90 cursor-pointer border border-transparent transition-transform duration-120 active:scale-[0.97]", z ? "bg-accent-green text-white" : "bg-foreground text-white"), children: z ? "Copied!" : "Share" })] }), (0, t.jsx)("button", { type: "button", onClick: () => {
      H.light(), B(l.BillboardEvents.GamePlayAgainClicked, { score: T }), ey("countdown");
    }, className: "rounded-full border border-foreground/15 tracking-tight px-6 py-3 text-[16px]/[24px] font-medium text-foreground hover:bg-foreground/5 flex-1 cursor-pointer transition-transform duration-120 active:scale-[0.97]", children: "Play again" })] })] }) })] });
  }], 10989);
}, 70216, (e) => {
  "use strict";
  var t = e.i(71645);
  let n = (0, t.createContext)(null);
  e.s(["DeepLinkDownloadProvider", 0, n, "useDeepLinkDownload", 0, function() {
    return (0, t.useContext)(n);
  }]);
}, 95333, (e) => {
  "use strict";
  var t = e.i(71645);
  e.s(["useIosHaptics", 0, function() {
    let e2 = (0, t.useRef)(null), n = (0, t.useRef)([]);
    (0, t.useEffect)(() => {
      let t2 = `ios-haptic-${crypto.randomUUID()}`, r2 = document.createElement("input");
      r2.type = "checkbox", r2.id = t2, r2.setAttribute("switch", ""), r2.style.all = "initial", r2.style.appearance = "auto", r2.style.display = "none";
      let a2 = document.createElement("label");
      return a2.htmlFor = t2, a2.setAttribute("aria-hidden", "true"), a2.style.display = "none", a2.appendChild(r2), document.body.appendChild(a2), e2.current = a2, () => {
        n.current.forEach(window.clearTimeout), n.current = [], a2.remove(), e2.current = null;
      };
    }, []);
    let r = (0, t.useCallback)(() => {
      let t2 = e2.current;
      t2 && t2.click();
    }, []), a = (0, t.useCallback)((e3) => {
      n.current.forEach(window.clearTimeout), n.current = [];
      let t2 = 0;
      for (let a2 of e3) if (0 === (t2 += a2)) r();
      else {
        let e4 = window.setTimeout(() => {
          r();
        }, t2);
        n.current.push(e4);
      }
    }, [r]), i = (0, t.useCallback)((e3) => {
      switch (e3) {
        case "light":
          a([0]);
          break;
        case "error":
          a([0, 100, 100]);
      }
    }, [a]);
    return (0, t.useMemo)(() => ({ light: () => i("light"), error: () => i("error"), trigger: i }), [i]);
  }]);
}, 90317, (e, t, n) => {
  "use strict";
  Object.defineProperty(n, "__esModule", { value: true });
  var r = { bindSnapshot: function() {
    return d;
  }, createAsyncLocalStorage: function() {
    return l;
  }, createSnapshot: function() {
    return c;
  } };
  for (var a in r) Object.defineProperty(n, a, { enumerable: true, get: r[a] });
  let i = Object.defineProperty(Error("Invariant: AsyncLocalStorage accessed in runtime where it is not available"), "__NEXT_ERROR_CODE", { value: "E504", enumerable: false, configurable: true });
  class s {
    disable() {
      throw i;
    }
    getStore() {
    }
    run() {
      throw i;
    }
    exit() {
      throw i;
    }
    enterWith() {
      throw i;
    }
    static bind(e2) {
      return e2;
    }
  }
  let o = "u" > typeof globalThis && globalThis.AsyncLocalStorage;
  function l() {
    return o ? new o() : new s();
  }
  function d(e2) {
    return o ? o.bind(e2) : s.bind(e2);
  }
  function c() {
    return o ? o.snapshot() : function(e2, ...t2) {
      return e2(...t2);
    };
  }
}, 42344, (e, t, n) => {
  "use strict";
  Object.defineProperty(n, "__esModule", { value: true }), Object.defineProperty(n, "workAsyncStorageInstance", { enumerable: true, get: function() {
    return r;
  } });
  let r = (0, e.r(90317).createAsyncLocalStorage)();
}, 63599, (e, t, n) => {
  "use strict";
  Object.defineProperty(n, "__esModule", { value: true }), Object.defineProperty(n, "workAsyncStorage", { enumerable: true, get: function() {
    return r.workAsyncStorageInstance;
  } });
  let r = e.r(42344);
}, 9885, (e, t, n) => {
  "use strict";
  function r(e2) {
    return e2.split("/").map((e3) => encodeURIComponent(e3)).join("/");
  }
  Object.defineProperty(n, "__esModule", { value: true }), Object.defineProperty(n, "encodeURIPath", { enumerable: true, get: function() {
    return r;
  } });
}, 67585, (e, t, n) => {
  "use strict";
  Object.defineProperty(n, "__esModule", { value: true }), Object.defineProperty(n, "BailoutToCSR", { enumerable: true, get: function() {
    return a;
  } });
  let r = e.r(32061);
  function a({ reason: e2, children: t2 }) {
    if ("u" < typeof window) throw Object.defineProperty(new r.BailoutToCSRError(e2), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
    return t2;
  }
}, 52157, (e, t, n) => {
  "use strict";
  Object.defineProperty(n, "__esModule", { value: true }), Object.defineProperty(n, "PreloadChunks", { enumerable: true, get: function() {
    return l;
  } });
  let r = e.r(43476), a = e.r(74080), i = e.r(63599), s = e.r(9885), o = e.r(43369);
  function l({ moduleIds: e2 }) {
    if ("u" > typeof window) return null;
    let t2 = i.workAsyncStorage.getStore();
    if (void 0 === t2) return null;
    let n2 = [];
    if (t2.reactLoadableManifest && e2) {
      let r2 = t2.reactLoadableManifest;
      for (let t3 of e2) {
        if (!r2[t3]) continue;
        let e3 = r2[t3].files;
        n2.push(...e3);
      }
    }
    if (0 === n2.length) return null;
    let d = (0, o.getAssetTokenQuery)();
    return (0, r.jsx)(r.Fragment, { children: n2.map((e3) => {
      let n3 = `${t2.assetPrefix}/_next/${(0, s.encodeURIPath)(e3)}${d}`;
      return e3.endsWith(".css") ? (0, r.jsx)("link", { precedence: "dynamic", href: n3, rel: "stylesheet", as: "style", nonce: t2.nonce }, e3) : ((0, a.preload)(n3, { as: "script", fetchPriority: "low", nonce: t2.nonce }), null);
    }) });
  }
}, 69093, (e, t, n) => {
  "use strict";
  Object.defineProperty(n, "__esModule", { value: true }), Object.defineProperty(n, "default", { enumerable: true, get: function() {
    return d;
  } });
  let r = e.r(43476), a = e.r(71645), i = e.r(67585), s = e.r(52157);
  function o(e2) {
    return { default: e2 && "default" in e2 ? e2.default : e2 };
  }
  let l = { loader: () => Promise.resolve(o(() => null)), loading: null, ssr: true }, d = function(e2) {
    let t2 = { ...l, ...e2 }, n2 = (0, a.lazy)(() => t2.loader().then(o)), d2 = t2.loading;
    function c(e3) {
      let o2 = d2 ? (0, r.jsx)(d2, { isLoading: true, pastDelay: true, error: null }) : null, l2 = !t2.ssr || !!t2.loading, c2 = l2 ? a.Suspense : a.Fragment, u = t2.ssr ? (0, r.jsxs)(r.Fragment, { children: ["u" < typeof window ? (0, r.jsx)(s.PreloadChunks, { moduleIds: t2.modules }) : null, (0, r.jsx)(n2, { ...e3 })] }) : (0, r.jsx)(i.BailoutToCSR, { reason: "next/dynamic", children: (0, r.jsx)(n2, { ...e3 }) });
      return (0, r.jsx)(c2, { ...l2 ? { fallback: o2 } : {}, children: u });
    }
    return c.displayName = "LoadableComponent", c;
  };
}, 70703, (e, t, n) => {
  "use strict";
  Object.defineProperty(n, "__esModule", { value: true }), Object.defineProperty(n, "default", { enumerable: true, get: function() {
    return a;
  } });
  let r = e.r(55682)._(e.r(69093));
  function a(e2, t2) {
    let n2 = {};
    "function" == typeof e2 && (n2.loader = e2);
    let a2 = { ...n2, ...t2 };
    return (0, r.default)({ ...a2, modules: a2.loadableGenerated?.modules });
  }
  ("function" == typeof n.default || "object" == typeof n.default && null !== n.default) && void 0 === n.default.__esModule && (Object.defineProperty(n.default, "__esModule", { value: true }), Object.assign(n.default, n), t.exports = n.default);
}]);
