/*! For license information please see bundle.28eef536336d2248d619.js.LICENSE.txt */
(() => {
  var t = {
      138: (t, r, e) => {
        var n = {
          "./at_at.svg": 773,
          "./c3po.svg": 809,
          "./darth_vader.svg": 916,
          "./death_star.svg": 645,
          "./falcon.svg": 67,
          "./r2d2.svg": 918,
          "./stormtrooper.svg": 952,
          "./tie_ln.svg": 103,
          "./yoda.svg": 677,
        };
        function o(t) {
          var r = i(t);
          return e(r);
        }
        function i(t) {
          if (!e.o(n, t)) {
            var r = new Error("Cannot find module '" + t + "'");
            throw ((r.code = "MODULE_NOT_FOUND"), r);
          }
          return n[t];
        }
        (o.keys = function () {
          return Object.keys(n);
        }),
          (o.resolve = i),
          (t.exports = o),
          (o.id = 138);
      },
      773: (t, r, e) => {
        "use strict";
        t.exports = e.p + "0379613a4269155f45b3.svg";
      },
      809: (t, r, e) => {
        "use strict";
        t.exports = e.p + "92e4eecf1c83293e3395.svg";
      },
      916: (t, r, e) => {
        "use strict";
        t.exports = e.p + "9ae79499243776a4de6e.svg";
      },
      645: (t, r, e) => {
        "use strict";
        t.exports = e.p + "3392ebef20e51148368e.svg";
      },
      67: (t, r, e) => {
        "use strict";
        t.exports = e.p + "b33cd68d7fb870c59309.svg";
      },
      918: (t, r, e) => {
        "use strict";
        t.exports = e.p + "a97a2e9fa184dcab972b.svg";
      },
      952: (t, r, e) => {
        "use strict";
        t.exports = e.p + "61e5b40f641dff097d3f.svg";
      },
      103: (t, r, e) => {
        "use strict";
        t.exports = e.p + "7d600c80a7f5f31bc337.svg";
      },
      677: (t, r, e) => {
        "use strict";
        t.exports = e.p + "4c0ad8f5f10199effb77.svg";
      },
    },
    r = {};
  function e(n) {
    var o = r[n];
    if (void 0 !== o) return o.exports;
    var i = (r[n] = { exports: {} });
    return t[n](i, i.exports, e), i.exports;
  }
  (e.g = (function () {
    if ("object" == typeof globalThis) return globalThis;
    try {
      return this || new Function("return this")();
    } catch (t) {
      if ("object" == typeof window) return window;
    }
  })()),
    (e.o = (t, r) => Object.prototype.hasOwnProperty.call(t, r)),
    (() => {
      var t;
      e.g.importScripts && (t = e.g.location + "");
      var r = e.g.document;
      if (
        !t &&
        r &&
        (r.currentScript &&
          "SCRIPT" === r.currentScript.tagName.toUpperCase() &&
          (t = r.currentScript.src),
        !t)
      ) {
        var n = r.getElementsByTagName("script");
        if (n.length)
          for (var o = n.length - 1; o > -1 && (!t || !/^http(s?):/.test(t)); )
            t = n[o--].src;
      }
      if (!t)
        throw new Error(
          "Automatic publicPath is not supported in this browser",
        );
      (t = t
        .replace(/#.*$/, "")
        .replace(/\?.*$/, "")
        .replace(/\/[^\/]+$/, "/")),
        (e.p = t);
    })(),
    (() => {
      "use strict";
      function t(r) {
        return (
          (t =
            "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
              ? function (t) {
                  return typeof t;
                }
              : function (t) {
                  return t &&
                    "function" == typeof Symbol &&
                    t.constructor === Symbol &&
                    t !== Symbol.prototype
                    ? "symbol"
                    : typeof t;
                }),
          t(r)
        );
      }
      function r(t, r) {
        for (var e = 0; e < r.length; e++) {
          var o = r[e];
          (o.enumerable = o.enumerable || !1),
            (o.configurable = !0),
            "value" in o && (o.writable = !0),
            Object.defineProperty(t, n(o.key), o);
        }
      }
      function n(r) {
        var e = (function (r) {
          if ("object" != t(r) || !r) return r;
          var e = r[Symbol.toPrimitive];
          if (void 0 !== e) {
            var n = e.call(r, "string");
            if ("object" != t(n)) return n;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(r);
        })(r);
        return "symbol" == t(e) ? e : e + "";
      }
      var o = {},
        i = (function () {
          function t() {
            var r =
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : t.random();
            !(function (t, r) {
              if (!(t instanceof r))
                throw new TypeError("Cannot call a class as a function");
            })(this, t),
              (this.name = r),
              o[r]
                ? (this.img = o[r].cloneNode())
                : ((this.img = new Image()),
                  (this.img.src = e(138)("./".concat(r, ".svg"))),
                  (o[r] = this.img));
          }
          return (
            (n = t),
            (i = [
              {
                key: "preload",
                value: function () {
                  t.symbols.forEach(function (r) {
                    return new t(r);
                  });
                },
              },
              {
                key: "symbols",
                get: function () {
                  return [
                    "at_at",
                    "c3po",
                    "darth_vader",
                    "death_star",
                    "falcon",
                    "r2d2",
                    "stormtrooper",
                    "tie_ln",
                    "yoda",
                  ];
                },
              },
              {
                key: "random",
                value: function () {
                  return this.symbols[
                    Math.floor(Math.random() * this.symbols.length)
                  ];
                },
              },
            ]),
            null && r(n.prototype, null),
            i && r(n, i),
            Object.defineProperty(n, "prototype", { writable: !1 }),
            n
          );
          var n, i;
        })();
      function a(t) {
        return (
          (a =
            "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
              ? function (t) {
                  return typeof t;
                }
              : function (t) {
                  return t &&
                    "function" == typeof Symbol &&
                    t.constructor === Symbol &&
                    t !== Symbol.prototype
                    ? "symbol"
                    : typeof t;
                }),
          a(t)
        );
      }
      function c(t, r) {
        for (var e = 0; e < r.length; e++) {
          var n = r[e];
          (n.enumerable = n.enumerable || !1),
            (n.configurable = !0),
            "value" in n && (n.writable = !0),
            Object.defineProperty(t, u(n.key), n);
        }
      }
      function u(t) {
        var r = (function (t) {
          if ("object" != a(t) || !t) return t;
          var r = t[Symbol.toPrimitive];
          if (void 0 !== r) {
            var e = r.call(t, "string");
            if ("object" != a(e)) return e;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(t);
        })(t);
        return "symbol" == a(r) ? r : r + "";
      }
      var s = (function () {
        return (
          (t = function t(r, e, n) {
            var o = this;
            !(function (t, r) {
              if (!(t instanceof r))
                throw new TypeError("Cannot call a class as a function");
            })(this, t),
              (this.reelContainer = r),
              (this.idx = e),
              (this.symbolContainer = document.createElement("div")),
              this.symbolContainer.classList.add("icons"),
              this.reelContainer.appendChild(this.symbolContainer),
              (this.animation = this.symbolContainer.animate(
                [
                  { top: 0, filter: "blur(0)" },
                  { filter: "blur(2px)", offset: 0.5 },
                  {
                    top: "calc(("
                      .concat(10 * Math.floor(this.factor), " / 3) * -100% - (")
                      .concat(10 * Math.floor(this.factor), " * 3px))"),
                    filter: "blur(0)",
                  },
                ],
                { duration: 1e3 * this.factor, easing: "ease-in-out" },
              )),
              this.animation.cancel(),
              n.forEach(function (t) {
                return o.symbolContainer.appendChild(new i(t).img);
              });
          }),
          (r = [
            {
              key: "factor",
              get: function () {
                return 1 + Math.pow(this.idx / 2, 2);
              },
            },
            {
              key: "renderSymbols",
              value: function (t) {
                for (
                  var r = document.createDocumentFragment(), e = 3;
                  e < 3 + 10 * Math.floor(this.factor);
                  e++
                ) {
                  var n = new i(
                    e >= 10 * Math.floor(this.factor) - 2
                      ? t[e - 10 * Math.floor(this.factor)]
                      : void 0,
                  );
                  r.appendChild(n.img);
                }
                this.symbolContainer.appendChild(r);
              },
            },
            {
              key: "spin",
              value: function () {
                var t = this,
                  r = new Promise(function (r) {
                    return (t.animation.onfinish = r);
                  }),
                  e = new Promise(function (r) {
                    return setTimeout(r, 1e3 * t.factor);
                  });
                return (
                  this.animation.cancel(),
                  this.animation.play(),
                  Promise.race([r, e]).then(function () {
                    "finished" !== t.animation.playState &&
                      t.animation.finish();
                    for (
                      var r = t.symbolContainer.children.length - 3, e = 0;
                      e < r;
                      e++
                    )
                      t.symbolContainer.firstChild.remove();
                  })
                );
              },
            },
          ]) && c(t.prototype, r),
          Object.defineProperty(t, "prototype", { writable: !1 }),
          t
        );
        var t, r;
      })();
      function l(t) {
        return (
          (l =
            "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
              ? function (t) {
                  return typeof t;
                }
              : function (t) {
                  return t &&
                    "function" == typeof Symbol &&
                    t.constructor === Symbol &&
                    t !== Symbol.prototype
                    ? "symbol"
                    : typeof t;
                }),
          l(t)
        );
      }
      function f() {
        f = function () {
          return r;
        };
        var t,
          r = {},
          e = Object.prototype,
          n = e.hasOwnProperty,
          o =
            Object.defineProperty ||
            function (t, r, e) {
              t[r] = e.value;
            },
          i = "function" == typeof Symbol ? Symbol : {},
          a = i.iterator || "@@iterator",
          c = i.asyncIterator || "@@asyncIterator",
          u = i.toStringTag || "@@toStringTag";
        function s(t, r, e) {
          return (
            Object.defineProperty(t, r, {
              value: e,
              enumerable: !0,
              configurable: !0,
              writable: !0,
            }),
            t[r]
          );
        }
        try {
          s({}, "");
        } catch (t) {
          s = function (t, r, e) {
            return (t[r] = e);
          };
        }
        function h(t, r, e, n) {
          var i = r && r.prototype instanceof b ? r : b,
            a = Object.create(i.prototype),
            c = new N(n || []);
          return o(a, "_invoke", { value: O(t, e, c) }), a;
        }
        function p(t, r, e) {
          try {
            return { type: "normal", arg: t.call(r, e) };
          } catch (t) {
            return { type: "throw", arg: t };
          }
        }
        r.wrap = h;
        var y = "suspendedStart",
          d = "suspendedYield",
          v = "executing",
          m = "completed",
          g = {};
        function b() {}
        function w() {}
        function x() {}
        var S = {};
        s(S, a, function () {
          return this;
        });
        var E = Object.getPrototypeOf,
          _ = E && E(E(F([])));
        _ && _ !== e && n.call(_, a) && (S = _);
        var L = (x.prototype = b.prototype = Object.create(S));
        function j(t) {
          ["next", "throw", "return"].forEach(function (r) {
            s(t, r, function (t) {
              return this._invoke(r, t);
            });
          });
        }
        function k(t, r) {
          function e(o, i, a, c) {
            var u = p(t[o], t, i);
            if ("throw" !== u.type) {
              var s = u.arg,
                f = s.value;
              return f && "object" == l(f) && n.call(f, "__await")
                ? r.resolve(f.__await).then(
                    function (t) {
                      e("next", t, a, c);
                    },
                    function (t) {
                      e("throw", t, a, c);
                    },
                  )
                : r.resolve(f).then(
                    function (t) {
                      (s.value = t), a(s);
                    },
                    function (t) {
                      return e("throw", t, a, c);
                    },
                  );
            }
            c(u.arg);
          }
          var i;
          o(this, "_invoke", {
            value: function (t, n) {
              function o() {
                return new r(function (r, o) {
                  e(t, n, r, o);
                });
              }
              return (i = i ? i.then(o, o) : o());
            },
          });
        }
        function O(r, e, n) {
          var o = y;
          return function (i, a) {
            if (o === v) throw Error("Generator is already running");
            if (o === m) {
              if ("throw" === i) throw a;
              return { value: t, done: !0 };
            }
            for (n.method = i, n.arg = a; ; ) {
              var c = n.delegate;
              if (c) {
                var u = P(c, n);
                if (u) {
                  if (u === g) continue;
                  return u;
                }
              }
              if ("next" === n.method) n.sent = n._sent = n.arg;
              else if ("throw" === n.method) {
                if (o === y) throw ((o = m), n.arg);
                n.dispatchException(n.arg);
              } else "return" === n.method && n.abrupt("return", n.arg);
              o = v;
              var s = p(r, e, n);
              if ("normal" === s.type) {
                if (((o = n.done ? m : d), s.arg === g)) continue;
                return { value: s.arg, done: n.done };
              }
              "throw" === s.type &&
                ((o = m), (n.method = "throw"), (n.arg = s.arg));
            }
          };
        }
        function P(r, e) {
          var n = e.method,
            o = r.iterator[n];
          if (o === t)
            return (
              (e.delegate = null),
              ("throw" === n &&
                r.iterator.return &&
                ((e.method = "return"),
                (e.arg = t),
                P(r, e),
                "throw" === e.method)) ||
                ("return" !== n &&
                  ((e.method = "throw"),
                  (e.arg = new TypeError(
                    "The iterator does not provide a '" + n + "' method",
                  )))),
              g
            );
          var i = p(o, r.iterator, e.arg);
          if ("throw" === i.type)
            return (
              (e.method = "throw"), (e.arg = i.arg), (e.delegate = null), g
            );
          var a = i.arg;
          return a
            ? a.done
              ? ((e[r.resultName] = a.value),
                (e.next = r.nextLoc),
                "return" !== e.method && ((e.method = "next"), (e.arg = t)),
                (e.delegate = null),
                g)
              : a
            : ((e.method = "throw"),
              (e.arg = new TypeError("iterator result is not an object")),
              (e.delegate = null),
              g);
        }
        function C(t) {
          var r = { tryLoc: t[0] };
          1 in t && (r.catchLoc = t[1]),
            2 in t && ((r.finallyLoc = t[2]), (r.afterLoc = t[3])),
            this.tryEntries.push(r);
        }
        function T(t) {
          var r = t.completion || {};
          (r.type = "normal"), delete r.arg, (t.completion = r);
        }
        function N(t) {
          (this.tryEntries = [{ tryLoc: "root" }]),
            t.forEach(C, this),
            this.reset(!0);
        }
        function F(r) {
          if (r || "" === r) {
            var e = r[a];
            if (e) return e.call(r);
            if ("function" == typeof r.next) return r;
            if (!isNaN(r.length)) {
              var o = -1,
                i = function e() {
                  for (; ++o < r.length; )
                    if (n.call(r, o)) return (e.value = r[o]), (e.done = !1), e;
                  return (e.value = t), (e.done = !0), e;
                };
              return (i.next = i);
            }
          }
          throw new TypeError(l(r) + " is not iterable");
        }
        return (
          (w.prototype = x),
          o(L, "constructor", { value: x, configurable: !0 }),
          o(x, "constructor", { value: w, configurable: !0 }),
          (w.displayName = s(x, u, "GeneratorFunction")),
          (r.isGeneratorFunction = function (t) {
            var r = "function" == typeof t && t.constructor;
            return (
              !!r &&
              (r === w || "GeneratorFunction" === (r.displayName || r.name))
            );
          }),
          (r.mark = function (t) {
            return (
              Object.setPrototypeOf
                ? Object.setPrototypeOf(t, x)
                : ((t.__proto__ = x), s(t, u, "GeneratorFunction")),
              (t.prototype = Object.create(L)),
              t
            );
          }),
          (r.awrap = function (t) {
            return { __await: t };
          }),
          j(k.prototype),
          s(k.prototype, c, function () {
            return this;
          }),
          (r.AsyncIterator = k),
          (r.async = function (t, e, n, o, i) {
            void 0 === i && (i = Promise);
            var a = new k(h(t, e, n, o), i);
            return r.isGeneratorFunction(e)
              ? a
              : a.next().then(function (t) {
                  return t.done ? t.value : a.next();
                });
          }),
          j(L),
          s(L, u, "Generator"),
          s(L, a, function () {
            return this;
          }),
          s(L, "toString", function () {
            return "[object Generator]";
          }),
          (r.keys = function (t) {
            var r = Object(t),
              e = [];
            for (var n in r) e.push(n);
            return (
              e.reverse(),
              function t() {
                for (; e.length; ) {
                  var n = e.pop();
                  if (n in r) return (t.value = n), (t.done = !1), t;
                }
                return (t.done = !0), t;
              }
            );
          }),
          (r.values = F),
          (N.prototype = {
            constructor: N,
            reset: function (r) {
              if (
                ((this.prev = 0),
                (this.next = 0),
                (this.sent = this._sent = t),
                (this.done = !1),
                (this.delegate = null),
                (this.method = "next"),
                (this.arg = t),
                this.tryEntries.forEach(T),
                !r)
              )
                for (var e in this)
                  "t" === e.charAt(0) &&
                    n.call(this, e) &&
                    !isNaN(+e.slice(1)) &&
                    (this[e] = t);
            },
            stop: function () {
              this.done = !0;
              var t = this.tryEntries[0].completion;
              if ("throw" === t.type) throw t.arg;
              return this.rval;
            },
            dispatchException: function (r) {
              if (this.done) throw r;
              var e = this;
              function o(n, o) {
                return (
                  (c.type = "throw"),
                  (c.arg = r),
                  (e.next = n),
                  o && ((e.method = "next"), (e.arg = t)),
                  !!o
                );
              }
              for (var i = this.tryEntries.length - 1; i >= 0; --i) {
                var a = this.tryEntries[i],
                  c = a.completion;
                if ("root" === a.tryLoc) return o("end");
                if (a.tryLoc <= this.prev) {
                  var u = n.call(a, "catchLoc"),
                    s = n.call(a, "finallyLoc");
                  if (u && s) {
                    if (this.prev < a.catchLoc) return o(a.catchLoc, !0);
                    if (this.prev < a.finallyLoc) return o(a.finallyLoc);
                  } else if (u) {
                    if (this.prev < a.catchLoc) return o(a.catchLoc, !0);
                  } else {
                    if (!s)
                      throw Error("try statement without catch or finally");
                    if (this.prev < a.finallyLoc) return o(a.finallyLoc);
                  }
                }
              }
            },
            abrupt: function (t, r) {
              for (var e = this.tryEntries.length - 1; e >= 0; --e) {
                var o = this.tryEntries[e];
                if (
                  o.tryLoc <= this.prev &&
                  n.call(o, "finallyLoc") &&
                  this.prev < o.finallyLoc
                ) {
                  var i = o;
                  break;
                }
              }
              i &&
                ("break" === t || "continue" === t) &&
                i.tryLoc <= r &&
                r <= i.finallyLoc &&
                (i = null);
              var a = i ? i.completion : {};
              return (
                (a.type = t),
                (a.arg = r),
                i
                  ? ((this.method = "next"), (this.next = i.finallyLoc), g)
                  : this.complete(a)
              );
            },
            complete: function (t, r) {
              if ("throw" === t.type) throw t.arg;
              return (
                "break" === t.type || "continue" === t.type
                  ? (this.next = t.arg)
                  : "return" === t.type
                    ? ((this.rval = this.arg = t.arg),
                      (this.method = "return"),
                      (this.next = "end"))
                    : "normal" === t.type && r && (this.next = r),
                g
              );
            },
            finish: function (t) {
              for (var r = this.tryEntries.length - 1; r >= 0; --r) {
                var e = this.tryEntries[r];
                if (e.finallyLoc === t)
                  return this.complete(e.completion, e.afterLoc), T(e), g;
              }
            },
            catch: function (t) {
              for (var r = this.tryEntries.length - 1; r >= 0; --r) {
                var e = this.tryEntries[r];
                if (e.tryLoc === t) {
                  var n = e.completion;
                  if ("throw" === n.type) {
                    var o = n.arg;
                    T(e);
                  }
                  return o;
                }
              }
              throw Error("illegal catch attempt");
            },
            delegateYield: function (r, e, n) {
              return (
                (this.delegate = { iterator: F(r), resultName: e, nextLoc: n }),
                "next" === this.method && (this.arg = t),
                g
              );
            },
          }),
          r
        );
      }
      function h(t, r, e, n, o, i, a) {
        try {
          var c = t[i](a),
            u = c.value;
        } catch (t) {
          return void e(t);
        }
        c.done ? r(u) : Promise.resolve(u).then(n, o);
      }
      var p = window.location.origin;
      const y = function () {
          return ((t = f().mark(function t() {
            var r, e;
            return f().wrap(
              function (t) {
                for (;;)
                  switch ((t.prev = t.next)) {
                    case 0:
                      return (
                        (t.prev = 0),
                        (t.next = 3),
                        fetch("".concat(p, "/api/jackpot"))
                      );
                    case 3:
                      return (r = t.sent), (t.next = 6), r.json();
                    case 6:
                      return (e = t.sent), t.abrupt("return", e);
                    case 10:
                      return (
                        (t.prev = 10),
                        (t.t0 = t.catch(0)),
                        console.error("Failed to fetch jackpot:", t.t0),
                        t.abrupt("return", {
                          jackpot: 5555555,
                          formatted: "5.555.555",
                        })
                      );
                    case 14:
                    case "end":
                      return t.stop();
                  }
              },
              t,
              null,
              [[0, 10]],
            );
          })),
          function () {
            var r = this,
              e = arguments;
            return new Promise(function (n, o) {
              var i = t.apply(r, e);
              function a(t) {
                h(i, n, o, a, c, "next", t);
              }
              function c(t) {
                h(i, n, o, a, c, "throw", t);
              }
              a(void 0);
            });
          })();
          var t;
        },
        d = function (t) {
          return t.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        };
      function v(t) {
        return (
          (v =
            "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
              ? function (t) {
                  return typeof t;
                }
              : function (t) {
                  return t &&
                    "function" == typeof Symbol &&
                    t.constructor === Symbol &&
                    t !== Symbol.prototype
                    ? "symbol"
                    : typeof t;
                }),
          v(t)
        );
      }
      function m() {
        m = function () {
          return r;
        };
        var t,
          r = {},
          e = Object.prototype,
          n = e.hasOwnProperty,
          o =
            Object.defineProperty ||
            function (t, r, e) {
              t[r] = e.value;
            },
          i = "function" == typeof Symbol ? Symbol : {},
          a = i.iterator || "@@iterator",
          c = i.asyncIterator || "@@asyncIterator",
          u = i.toStringTag || "@@toStringTag";
        function s(t, r, e) {
          return (
            Object.defineProperty(t, r, {
              value: e,
              enumerable: !0,
              configurable: !0,
              writable: !0,
            }),
            t[r]
          );
        }
        try {
          s({}, "");
        } catch (t) {
          s = function (t, r, e) {
            return (t[r] = e);
          };
        }
        function l(t, r, e, n) {
          var i = r && r.prototype instanceof b ? r : b,
            a = Object.create(i.prototype),
            c = new N(n || []);
          return o(a, "_invoke", { value: O(t, e, c) }), a;
        }
        function f(t, r, e) {
          try {
            return { type: "normal", arg: t.call(r, e) };
          } catch (t) {
            return { type: "throw", arg: t };
          }
        }
        r.wrap = l;
        var h = "suspendedStart",
          p = "suspendedYield",
          y = "executing",
          d = "completed",
          g = {};
        function b() {}
        function w() {}
        function x() {}
        var S = {};
        s(S, a, function () {
          return this;
        });
        var E = Object.getPrototypeOf,
          _ = E && E(E(F([])));
        _ && _ !== e && n.call(_, a) && (S = _);
        var L = (x.prototype = b.prototype = Object.create(S));
        function j(t) {
          ["next", "throw", "return"].forEach(function (r) {
            s(t, r, function (t) {
              return this._invoke(r, t);
            });
          });
        }
        function k(t, r) {
          function e(o, i, a, c) {
            var u = f(t[o], t, i);
            if ("throw" !== u.type) {
              var s = u.arg,
                l = s.value;
              return l && "object" == v(l) && n.call(l, "__await")
                ? r.resolve(l.__await).then(
                    function (t) {
                      e("next", t, a, c);
                    },
                    function (t) {
                      e("throw", t, a, c);
                    },
                  )
                : r.resolve(l).then(
                    function (t) {
                      (s.value = t), a(s);
                    },
                    function (t) {
                      return e("throw", t, a, c);
                    },
                  );
            }
            c(u.arg);
          }
          var i;
          o(this, "_invoke", {
            value: function (t, n) {
              function o() {
                return new r(function (r, o) {
                  e(t, n, r, o);
                });
              }
              return (i = i ? i.then(o, o) : o());
            },
          });
        }
        function O(r, e, n) {
          var o = h;
          return function (i, a) {
            if (o === y) throw Error("Generator is already running");
            if (o === d) {
              if ("throw" === i) throw a;
              return { value: t, done: !0 };
            }
            for (n.method = i, n.arg = a; ; ) {
              var c = n.delegate;
              if (c) {
                var u = P(c, n);
                if (u) {
                  if (u === g) continue;
                  return u;
                }
              }
              if ("next" === n.method) n.sent = n._sent = n.arg;
              else if ("throw" === n.method) {
                if (o === h) throw ((o = d), n.arg);
                n.dispatchException(n.arg);
              } else "return" === n.method && n.abrupt("return", n.arg);
              o = y;
              var s = f(r, e, n);
              if ("normal" === s.type) {
                if (((o = n.done ? d : p), s.arg === g)) continue;
                return { value: s.arg, done: n.done };
              }
              "throw" === s.type &&
                ((o = d), (n.method = "throw"), (n.arg = s.arg));
            }
          };
        }
        function P(r, e) {
          var n = e.method,
            o = r.iterator[n];
          if (o === t)
            return (
              (e.delegate = null),
              ("throw" === n &&
                r.iterator.return &&
                ((e.method = "return"),
                (e.arg = t),
                P(r, e),
                "throw" === e.method)) ||
                ("return" !== n &&
                  ((e.method = "throw"),
                  (e.arg = new TypeError(
                    "The iterator does not provide a '" + n + "' method",
                  )))),
              g
            );
          var i = f(o, r.iterator, e.arg);
          if ("throw" === i.type)
            return (
              (e.method = "throw"), (e.arg = i.arg), (e.delegate = null), g
            );
          var a = i.arg;
          return a
            ? a.done
              ? ((e[r.resultName] = a.value),
                (e.next = r.nextLoc),
                "return" !== e.method && ((e.method = "next"), (e.arg = t)),
                (e.delegate = null),
                g)
              : a
            : ((e.method = "throw"),
              (e.arg = new TypeError("iterator result is not an object")),
              (e.delegate = null),
              g);
        }
        function C(t) {
          var r = { tryLoc: t[0] };
          1 in t && (r.catchLoc = t[1]),
            2 in t && ((r.finallyLoc = t[2]), (r.afterLoc = t[3])),
            this.tryEntries.push(r);
        }
        function T(t) {
          var r = t.completion || {};
          (r.type = "normal"), delete r.arg, (t.completion = r);
        }
        function N(t) {
          (this.tryEntries = [{ tryLoc: "root" }]),
            t.forEach(C, this),
            this.reset(!0);
        }
        function F(r) {
          if (r || "" === r) {
            var e = r[a];
            if (e) return e.call(r);
            if ("function" == typeof r.next) return r;
            if (!isNaN(r.length)) {
              var o = -1,
                i = function e() {
                  for (; ++o < r.length; )
                    if (n.call(r, o)) return (e.value = r[o]), (e.done = !1), e;
                  return (e.value = t), (e.done = !0), e;
                };
              return (i.next = i);
            }
          }
          throw new TypeError(v(r) + " is not iterable");
        }
        return (
          (w.prototype = x),
          o(L, "constructor", { value: x, configurable: !0 }),
          o(x, "constructor", { value: w, configurable: !0 }),
          (w.displayName = s(x, u, "GeneratorFunction")),
          (r.isGeneratorFunction = function (t) {
            var r = "function" == typeof t && t.constructor;
            return (
              !!r &&
              (r === w || "GeneratorFunction" === (r.displayName || r.name))
            );
          }),
          (r.mark = function (t) {
            return (
              Object.setPrototypeOf
                ? Object.setPrototypeOf(t, x)
                : ((t.__proto__ = x), s(t, u, "GeneratorFunction")),
              (t.prototype = Object.create(L)),
              t
            );
          }),
          (r.awrap = function (t) {
            return { __await: t };
          }),
          j(k.prototype),
          s(k.prototype, c, function () {
            return this;
          }),
          (r.AsyncIterator = k),
          (r.async = function (t, e, n, o, i) {
            void 0 === i && (i = Promise);
            var a = new k(l(t, e, n, o), i);
            return r.isGeneratorFunction(e)
              ? a
              : a.next().then(function (t) {
                  return t.done ? t.value : a.next();
                });
          }),
          j(L),
          s(L, u, "Generator"),
          s(L, a, function () {
            return this;
          }),
          s(L, "toString", function () {
            return "[object Generator]";
          }),
          (r.keys = function (t) {
            var r = Object(t),
              e = [];
            for (var n in r) e.push(n);
            return (
              e.reverse(),
              function t() {
                for (; e.length; ) {
                  var n = e.pop();
                  if (n in r) return (t.value = n), (t.done = !1), t;
                }
                return (t.done = !0), t;
              }
            );
          }),
          (r.values = F),
          (N.prototype = {
            constructor: N,
            reset: function (r) {
              if (
                ((this.prev = 0),
                (this.next = 0),
                (this.sent = this._sent = t),
                (this.done = !1),
                (this.delegate = null),
                (this.method = "next"),
                (this.arg = t),
                this.tryEntries.forEach(T),
                !r)
              )
                for (var e in this)
                  "t" === e.charAt(0) &&
                    n.call(this, e) &&
                    !isNaN(+e.slice(1)) &&
                    (this[e] = t);
            },
            stop: function () {
              this.done = !0;
              var t = this.tryEntries[0].completion;
              if ("throw" === t.type) throw t.arg;
              return this.rval;
            },
            dispatchException: function (r) {
              if (this.done) throw r;
              var e = this;
              function o(n, o) {
                return (
                  (c.type = "throw"),
                  (c.arg = r),
                  (e.next = n),
                  o && ((e.method = "next"), (e.arg = t)),
                  !!o
                );
              }
              for (var i = this.tryEntries.length - 1; i >= 0; --i) {
                var a = this.tryEntries[i],
                  c = a.completion;
                if ("root" === a.tryLoc) return o("end");
                if (a.tryLoc <= this.prev) {
                  var u = n.call(a, "catchLoc"),
                    s = n.call(a, "finallyLoc");
                  if (u && s) {
                    if (this.prev < a.catchLoc) return o(a.catchLoc, !0);
                    if (this.prev < a.finallyLoc) return o(a.finallyLoc);
                  } else if (u) {
                    if (this.prev < a.catchLoc) return o(a.catchLoc, !0);
                  } else {
                    if (!s)
                      throw Error("try statement without catch or finally");
                    if (this.prev < a.finallyLoc) return o(a.finallyLoc);
                  }
                }
              }
            },
            abrupt: function (t, r) {
              for (var e = this.tryEntries.length - 1; e >= 0; --e) {
                var o = this.tryEntries[e];
                if (
                  o.tryLoc <= this.prev &&
                  n.call(o, "finallyLoc") &&
                  this.prev < o.finallyLoc
                ) {
                  var i = o;
                  break;
                }
              }
              i &&
                ("break" === t || "continue" === t) &&
                i.tryLoc <= r &&
                r <= i.finallyLoc &&
                (i = null);
              var a = i ? i.completion : {};
              return (
                (a.type = t),
                (a.arg = r),
                i
                  ? ((this.method = "next"), (this.next = i.finallyLoc), g)
                  : this.complete(a)
              );
            },
            complete: function (t, r) {
              if ("throw" === t.type) throw t.arg;
              return (
                "break" === t.type || "continue" === t.type
                  ? (this.next = t.arg)
                  : "return" === t.type
                    ? ((this.rval = this.arg = t.arg),
                      (this.method = "return"),
                      (this.next = "end"))
                    : "normal" === t.type && r && (this.next = r),
                g
              );
            },
            finish: function (t) {
              for (var r = this.tryEntries.length - 1; r >= 0; --r) {
                var e = this.tryEntries[r];
                if (e.finallyLoc === t)
                  return this.complete(e.completion, e.afterLoc), T(e), g;
              }
            },
            catch: function (t) {
              for (var r = this.tryEntries.length - 1; r >= 0; --r) {
                var e = this.tryEntries[r];
                if (e.tryLoc === t) {
                  var n = e.completion;
                  if ("throw" === n.type) {
                    var o = n.arg;
                    T(e);
                  }
                  return o;
                }
              }
              throw Error("illegal catch attempt");
            },
            delegateYield: function (r, e, n) {
              return (
                (this.delegate = { iterator: F(r), resultName: e, nextLoc: n }),
                "next" === this.method && (this.arg = t),
                g
              );
            },
          }),
          r
        );
      }
      function g(t, r, e, n, o, i, a) {
        try {
          var c = t[i](a),
            u = c.value;
        } catch (t) {
          return void e(t);
        }
        c.done ? r(u) : Promise.resolve(u).then(n, o);
      }
      function b(t, r) {
        for (var e = 0; e < r.length; e++) {
          var n = r[e];
          (n.enumerable = n.enumerable || !1),
            (n.configurable = !0),
            "value" in n && (n.writable = !0),
            Object.defineProperty(t, w(n.key), n);
        }
      }
      function w(t) {
        var r = (function (t) {
          if ("object" != v(t) || !t) return t;
          var r = t[Symbol.toPrimitive];
          if (void 0 !== r) {
            var e = r.call(t, "string");
            if ("object" != v(e)) return e;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(t);
        })(t);
        return "symbol" == v(r) ? r : r + "";
      }
      var x = (function () {
          return (
            (t = function t(r) {
              var e = this,
                n =
                  arguments.length > 1 && void 0 !== arguments[1]
                    ? arguments[1]
                    : {};
              !(function (t, r) {
                if (!(t instanceof r))
                  throw new TypeError("Cannot call a class as a function");
              })(this, t),
                i.preload(),
                (this.jackpotDisplay = document.getElementById("jp")),
                (this.currentSymbols = [
                  ["death_star", "death_star", "death_star"],
                  ["death_star", "death_star", "death_star"],
                  ["death_star", "death_star", "death_star"],
                  ["death_star", "death_star", "death_star"],
                  ["death_star", "death_star", "death_star"],
                ]),
                (this.nextSymbols = [
                  ["death_star", "death_star", "death_star"],
                  ["death_star", "death_star", "death_star"],
                  ["death_star", "death_star", "death_star"],
                  ["death_star", "death_star", "death_star"],
                  ["death_star", "death_star", "death_star"],
                ]),
                (this.container = r),
                (this.reels = Array.from(
                  this.container.getElementsByClassName("reel"),
                ).map(function (t, r) {
                  return new s(t, r, e.currentSymbols[r]);
                })),
                (this.spinButton = document.getElementById("spin")),
                this.spinButton.addEventListener("click", function () {
                  return e.spin();
                }),
                (this.autoPlayCheckbox = document.getElementById("autoplay")),
                n.inverted && this.container.classList.add("inverted"),
                (this.config = n),
                this.updateJackpotFromServer();
            }),
            (r = [
              {
                key: "updateJackpotFromServer",
                value:
                  ((e = m().mark(function t() {
                    var r;
                    return m().wrap(
                      function (t) {
                        for (;;)
                          switch ((t.prev = t.next)) {
                            case 0:
                              return (t.next = 2), y();
                            case 2:
                              (r = t.sent),
                                this.jackpotDisplay &&
                                  (this.jackpotDisplay.textContent =
                                    r.formatted || d(r.jackpot));
                            case 4:
                            case "end":
                              return t.stop();
                          }
                      },
                      t,
                      this,
                    );
                  })),
                  (n = function () {
                    var t = this,
                      r = arguments;
                    return new Promise(function (n, o) {
                      var i = e.apply(t, r);
                      function a(t) {
                        g(i, n, o, a, c, "next", t);
                      }
                      function c(t) {
                        g(i, n, o, a, c, "throw", t);
                      }
                      a(void 0);
                    });
                  }),
                  function () {
                    return n.apply(this, arguments);
                  }),
              },
              {
                key: "spin",
                value: function () {
                  var t = this;
                  return (
                    (this.currentSymbols = this.nextSymbols),
                    (this.nextSymbols = [
                      [i.random(), i.random(), i.random()],
                      [i.random(), i.random(), i.random()],
                      [i.random(), i.random(), i.random()],
                      [i.random(), i.random(), i.random()],
                      [i.random(), i.random(), i.random()],
                    ]),
                    this.onSpinStart(this.nextSymbols),
                    Promise.all(
                      this.reels.map(function (r) {
                        return r.renderSymbols(t.nextSymbols[r.idx]), r.spin();
                      }),
                    ).then(function () {
                      return t.onSpinEnd(t.nextSymbols);
                    })
                  );
                },
              },
              {
                key: "onSpinStart",
                value: function (t) {
                  var r, e;
                  (this.spinButton.disabled = !0),
                    null === (r = (e = this.config).onSpinStart) ||
                      void 0 === r ||
                      r.call(e, t);
                },
              },
              {
                key: "onSpinEnd",
                value: function (t) {
                  var r,
                    e,
                    n = this;
                  if (
                    ((this.spinButton.disabled = !1),
                    null === (r = (e = this.config).onSpinEnd) ||
                      void 0 === r ||
                      r.call(e, t),
                    this.updateJackpotFromServer(),
                    this.autoPlayCheckbox.checked)
                  )
                    return window.setTimeout(function () {
                      return n.spin();
                    }, 200);
                },
              },
            ]),
            r && b(t.prototype, r),
            Object.defineProperty(t, "prototype", { writable: !1 }),
            t
          );
          var t, r, e, n;
        })(),
        S = {
          inverted: !1,
          onSpinStart: function (t) {
            console.log("onSpinStart", t);
          },
          onSpinEnd: function (t) {
            console.log("onSpinEnd", t);
          },
        };
      new x(document.getElementById("slot"), S);
    })();
})();
