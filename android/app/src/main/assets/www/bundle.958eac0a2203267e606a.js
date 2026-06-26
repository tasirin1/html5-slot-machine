/*! For license information please see bundle.958eac0a2203267e606a.js.LICENSE.txt */
(() => {
  "use strict";
  (() => {
    function t(t, e) {
      var n =
        ("undefined" != typeof Symbol && t[Symbol.iterator]) || t["@@iterator"];
      if (!n) {
        if (
          Array.isArray(t) ||
          (n = r(t)) ||
          (e && t && "number" == typeof t.length)
        ) {
          n && (t = n);
          var o = 0,
            i = function () {};
          return {
            s: i,
            n: function () {
              return o >= t.length ? { done: !0 } : { done: !1, value: t[o++] };
            },
            e: function (t) {
              throw t;
            },
            f: i,
          };
        }
        throw new TypeError(
          "Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.",
        );
      }
      var a,
        c = !0,
        u = !1;
      return {
        s: function () {
          n = n.call(t);
        },
        n: function () {
          var t = n.next();
          return (c = t.done), t;
        },
        e: function (t) {
          (u = !0), (a = t);
        },
        f: function () {
          try {
            c || null == n.return || n.return();
          } finally {
            if (u) throw a;
          }
        },
      };
    }
    function e(t, e) {
      return (
        (function (t) {
          if (Array.isArray(t)) return t;
        })(t) ||
        (function (t, e) {
          var r =
            null == t
              ? null
              : ("undefined" != typeof Symbol && t[Symbol.iterator]) ||
                t["@@iterator"];
          if (null != r) {
            var n,
              o,
              i,
              a,
              c = [],
              u = !0,
              s = !1;
            try {
              if (((i = (r = r.call(t)).next), 0 === e)) {
                if (Object(r) !== r) return;
                u = !1;
              } else
                for (
                  ;
                  !(u = (n = i.call(r)).done) &&
                  (c.push(n.value), c.length !== e);
                  u = !0
                );
            } catch (t) {
              (s = !0), (o = t);
            } finally {
              try {
                if (
                  !u &&
                  null != r.return &&
                  ((a = r.return()), Object(a) !== a)
                )
                  return;
              } finally {
                if (s) throw o;
              }
            }
            return c;
          }
        })(t, e) ||
        r(t, e) ||
        (function () {
          throw new TypeError(
            "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.",
          );
        })()
      );
    }
    function r(t, e) {
      if (t) {
        if ("string" == typeof t) return n(t, e);
        var r = {}.toString.call(t).slice(8, -1);
        return (
          "Object" === r && t.constructor && (r = t.constructor.name),
          "Map" === r || "Set" === r
            ? Array.from(t)
            : "Arguments" === r ||
                /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)
              ? n(t, e)
              : void 0
        );
      }
    }
    function n(t, e) {
      (null == e || e > t.length) && (e = t.length);
      for (var r = 0, n = Array(e); r < e; r++) n[r] = t[r];
      return n;
    }
    var o = [
      [
        [0, 0],
        [1, 0],
        [2, 0],
        [3, 0],
        [4, 0],
      ],
      [
        [0, 1],
        [1, 1],
        [2, 1],
        [3, 1],
        [4, 1],
      ],
      [
        [0, 2],
        [1, 2],
        [2, 2],
        [3, 2],
        [4, 2],
      ],
      [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 1],
        [4, 0],
      ],
      [
        [0, 2],
        [1, 1],
        [2, 0],
        [3, 1],
        [4, 2],
      ],
      [
        [0, 0],
        [1, 1],
        [2, 1],
        [3, 1],
        [4, 0],
      ],
      [
        [0, 2],
        [1, 1],
        [2, 1],
        [3, 1],
        [4, 2],
      ],
      [
        [0, 1],
        [1, 0],
        [2, 1],
        [3, 2],
        [4, 1],
      ],
      [
        [0, 1],
        [1, 2],
        [2, 1],
        [3, 0],
        [4, 1],
      ],
    ];
    function i(t, e) {
      var r = {
        WILD: [0, 0, 100, 500, 2500],
        SEVEN: [0, 0, 50, 200, 1e3],
        BAR: [0, 0, 25, 100, 500],
        BELL: [0, 0, 15, 50, 200],
        CHERRY: [0, 5, 10, 30, 150],
        LEMON: [0, 3, 8, 25, 100],
        ORANGE: [0, 2, 6, 20, 75],
        PLUM: [0, 0, 5, 15, 50],
        MELON: [0, 0, 4, 12, 40],
        GRAPES: [0, 0, 3, 10, 30],
      }[t];
      return r ? r[Math.min(Math.max(e - 1, 0), r.length - 1)] : 0;
    }
    function a(r, n) {
      for (var a, c = [], u = 0; u < o.length; u++) {
        var s,
          l = o[u],
          h = l.map(function (t) {
            var n = e(t, 2),
              o = n[0],
              i = n[1];
            return (r[o] ? r[o][i] : null) || "BAR";
          }),
          f = null,
          p = t(h);
        try {
          for (p.s(); !(s = p.n()).done; ) {
            var y = s.value;
            if ("WILD" !== y) {
              f = y;
              break;
            }
          }
        } catch (t) {
          p.e(t);
        } finally {
          p.f();
        }
        f || (f = h[0]);
        for (
          var d = 0, v = 0;
          v < h.length && (h[v] === f || "WILD" === h[v]);
          v++
        )
          d++;
        if (
          !(
            d <
            ((a = f), "CHERRY" === a || "LEMON" === a || "ORANGE" === a ? 2 : 3)
          )
        ) {
          var g = i(f, d);
          g <= 0 ||
            c.push({
              payline: u,
              symbol: f,
              count: d,
              multiplier: g,
              amount: Math.floor(n * g),
              positions: l.slice(0, d),
              symbolIds: h,
            });
        }
      }
      return c;
    }
    function c(t) {
      return (
        (c =
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
        c(t)
      );
    }
    function u(t, e) {
      return (
        (function (t) {
          if (Array.isArray(t)) return t;
        })(t) ||
        (function (t, e) {
          var r =
            null == t
              ? null
              : ("undefined" != typeof Symbol && t[Symbol.iterator]) ||
                t["@@iterator"];
          if (null != r) {
            var n,
              o,
              i,
              a,
              c = [],
              u = !0,
              s = !1;
            try {
              if (((i = (r = r.call(t)).next), 0 === e)) {
                if (Object(r) !== r) return;
                u = !1;
              } else
                for (
                  ;
                  !(u = (n = i.call(r)).done) &&
                  (c.push(n.value), c.length !== e);
                  u = !0
                );
            } catch (t) {
              (s = !0), (o = t);
            } finally {
              try {
                if (
                  !u &&
                  null != r.return &&
                  ((a = r.return()), Object(a) !== a)
                )
                  return;
              } finally {
                if (s) throw o;
              }
            }
            return c;
          }
        })(t, e) ||
        h(t, e) ||
        (function () {
          throw new TypeError(
            "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.",
          );
        })()
      );
    }
    function s() {
      s = function () {
        return e;
      };
      var t,
        e = {},
        r = Object.prototype,
        n = r.hasOwnProperty,
        o =
          Object.defineProperty ||
          function (t, e, r) {
            t[e] = r.value;
          },
        i = "function" == typeof Symbol ? Symbol : {},
        a = i.iterator || "@@iterator",
        u = i.asyncIterator || "@@asyncIterator",
        l = i.toStringTag || "@@toStringTag";
      function h(t, e, r) {
        return (
          Object.defineProperty(t, e, {
            value: r,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          }),
          t[e]
        );
      }
      try {
        h({}, "");
      } catch (t) {
        h = function (t, e, r) {
          return (t[e] = r);
        };
      }
      function f(t, e, r, n) {
        var i = e && e.prototype instanceof b ? e : b,
          a = Object.create(i.prototype),
          c = new B(n || []);
        return o(a, "_invoke", { value: M(t, r, c) }), a;
      }
      function p(t, e, r) {
        try {
          return { type: "normal", arg: t.call(e, r) };
        } catch (t) {
          return { type: "throw", arg: t };
        }
      }
      e.wrap = f;
      var y = "suspendedStart",
        d = "suspendedYield",
        v = "executing",
        g = "completed",
        m = {};
      function b() {}
      function w() {}
      function E() {}
      var L = {};
      h(L, a, function () {
        return this;
      });
      var x = Object.getPrototypeOf,
        S = x && x(x(j([])));
      S && S !== r && n.call(S, a) && (L = S);
      var F = (E.prototype = b.prototype = Object.create(L));
      function O(t) {
        ["next", "throw", "return"].forEach(function (e) {
          h(t, e, function (t) {
            return this._invoke(e, t);
          });
        });
      }
      function A(t, e) {
        function r(o, i, a, u) {
          var s = p(t[o], t, i);
          if ("throw" !== s.type) {
            var l = s.arg,
              h = l.value;
            return h && "object" == c(h) && n.call(h, "__await")
              ? e.resolve(h.__await).then(
                  function (t) {
                    r("next", t, a, u);
                  },
                  function (t) {
                    r("throw", t, a, u);
                  },
                )
              : e.resolve(h).then(
                  function (t) {
                    (l.value = t), a(l);
                  },
                  function (t) {
                    return r("throw", t, a, u);
                  },
                );
          }
          u(s.arg);
        }
        var i;
        o(this, "_invoke", {
          value: function (t, n) {
            function o() {
              return new e(function (e, o) {
                r(t, n, e, o);
              });
            }
            return (i = i ? i.then(o, o) : o());
          },
        });
      }
      function M(e, r, n) {
        var o = y;
        return function (i, a) {
          if (o === v) throw Error("Generator is already running");
          if (o === g) {
            if ("throw" === i) throw a;
            return { value: t, done: !0 };
          }
          for (n.method = i, n.arg = a; ; ) {
            var c = n.delegate;
            if (c) {
              var u = N(c, n);
              if (u) {
                if (u === m) continue;
                return u;
              }
            }
            if ("next" === n.method) n.sent = n._sent = n.arg;
            else if ("throw" === n.method) {
              if (o === y) throw ((o = g), n.arg);
              n.dispatchException(n.arg);
            } else "return" === n.method && n.abrupt("return", n.arg);
            o = v;
            var s = p(e, r, n);
            if ("normal" === s.type) {
              if (((o = n.done ? g : d), s.arg === m)) continue;
              return { value: s.arg, done: n.done };
            }
            "throw" === s.type &&
              ((o = g), (n.method = "throw"), (n.arg = s.arg));
          }
        };
      }
      function N(e, r) {
        var n = r.method,
          o = e.iterator[n];
        if (o === t)
          return (
            (r.delegate = null),
            ("throw" === n &&
              e.iterator.return &&
              ((r.method = "return"),
              (r.arg = t),
              N(e, r),
              "throw" === r.method)) ||
              ("return" !== n &&
                ((r.method = "throw"),
                (r.arg = new TypeError(
                  "The iterator does not provide a '" + n + "' method",
                )))),
            m
          );
        var i = p(o, e.iterator, r.arg);
        if ("throw" === i.type)
          return (r.method = "throw"), (r.arg = i.arg), (r.delegate = null), m;
        var a = i.arg;
        return a
          ? a.done
            ? ((r[e.resultName] = a.value),
              (r.next = e.nextLoc),
              "return" !== r.method && ((r.method = "next"), (r.arg = t)),
              (r.delegate = null),
              m)
            : a
          : ((r.method = "throw"),
            (r.arg = new TypeError("iterator result is not an object")),
            (r.delegate = null),
            m);
      }
      function k(t) {
        var e = { tryLoc: t[0] };
        1 in t && (e.catchLoc = t[1]),
          2 in t && ((e.finallyLoc = t[2]), (e.afterLoc = t[3])),
          this.tryEntries.push(e);
      }
      function R(t) {
        var e = t.completion || {};
        (e.type = "normal"), delete e.arg, (t.completion = e);
      }
      function B(t) {
        (this.tryEntries = [{ tryLoc: "root" }]),
          t.forEach(k, this),
          this.reset(!0);
      }
      function j(e) {
        if (e || "" === e) {
          var r = e[a];
          if (r) return r.call(e);
          if ("function" == typeof e.next) return e;
          if (!isNaN(e.length)) {
            var o = -1,
              i = function r() {
                for (; ++o < e.length; )
                  if (n.call(e, o)) return (r.value = e[o]), (r.done = !1), r;
                return (r.value = t), (r.done = !0), r;
              };
            return (i.next = i);
          }
        }
        throw new TypeError(c(e) + " is not iterable");
      }
      return (
        (w.prototype = E),
        o(F, "constructor", { value: E, configurable: !0 }),
        o(E, "constructor", { value: w, configurable: !0 }),
        (w.displayName = h(E, l, "GeneratorFunction")),
        (e.isGeneratorFunction = function (t) {
          var e = "function" == typeof t && t.constructor;
          return (
            !!e &&
            (e === w || "GeneratorFunction" === (e.displayName || e.name))
          );
        }),
        (e.mark = function (t) {
          return (
            Object.setPrototypeOf
              ? Object.setPrototypeOf(t, E)
              : ((t.__proto__ = E), h(t, l, "GeneratorFunction")),
            (t.prototype = Object.create(F)),
            t
          );
        }),
        (e.awrap = function (t) {
          return { __await: t };
        }),
        O(A.prototype),
        h(A.prototype, u, function () {
          return this;
        }),
        (e.AsyncIterator = A),
        (e.async = function (t, r, n, o, i) {
          void 0 === i && (i = Promise);
          var a = new A(f(t, r, n, o), i);
          return e.isGeneratorFunction(r)
            ? a
            : a.next().then(function (t) {
                return t.done ? t.value : a.next();
              });
        }),
        O(F),
        h(F, l, "Generator"),
        h(F, a, function () {
          return this;
        }),
        h(F, "toString", function () {
          return "[object Generator]";
        }),
        (e.keys = function (t) {
          var e = Object(t),
            r = [];
          for (var n in e) r.push(n);
          return (
            r.reverse(),
            function t() {
              for (; r.length; ) {
                var n = r.pop();
                if (n in e) return (t.value = n), (t.done = !1), t;
              }
              return (t.done = !0), t;
            }
          );
        }),
        (e.values = j),
        (B.prototype = {
          constructor: B,
          reset: function (e) {
            if (
              ((this.prev = 0),
              (this.next = 0),
              (this.sent = this._sent = t),
              (this.done = !1),
              (this.delegate = null),
              (this.method = "next"),
              (this.arg = t),
              this.tryEntries.forEach(R),
              !e)
            )
              for (var r in this)
                "t" === r.charAt(0) &&
                  n.call(this, r) &&
                  !isNaN(+r.slice(1)) &&
                  (this[r] = t);
          },
          stop: function () {
            this.done = !0;
            var t = this.tryEntries[0].completion;
            if ("throw" === t.type) throw t.arg;
            return this.rval;
          },
          dispatchException: function (e) {
            if (this.done) throw e;
            var r = this;
            function o(n, o) {
              return (
                (c.type = "throw"),
                (c.arg = e),
                (r.next = n),
                o && ((r.method = "next"), (r.arg = t)),
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
                  if (!s) throw Error("try statement without catch or finally");
                  if (this.prev < a.finallyLoc) return o(a.finallyLoc);
                }
              }
            }
          },
          abrupt: function (t, e) {
            for (var r = this.tryEntries.length - 1; r >= 0; --r) {
              var o = this.tryEntries[r];
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
              i.tryLoc <= e &&
              e <= i.finallyLoc &&
              (i = null);
            var a = i ? i.completion : {};
            return (
              (a.type = t),
              (a.arg = e),
              i
                ? ((this.method = "next"), (this.next = i.finallyLoc), m)
                : this.complete(a)
            );
          },
          complete: function (t, e) {
            if ("throw" === t.type) throw t.arg;
            return (
              "break" === t.type || "continue" === t.type
                ? (this.next = t.arg)
                : "return" === t.type
                  ? ((this.rval = this.arg = t.arg),
                    (this.method = "return"),
                    (this.next = "end"))
                  : "normal" === t.type && e && (this.next = e),
              m
            );
          },
          finish: function (t) {
            for (var e = this.tryEntries.length - 1; e >= 0; --e) {
              var r = this.tryEntries[e];
              if (r.finallyLoc === t)
                return this.complete(r.completion, r.afterLoc), R(r), m;
            }
          },
          catch: function (t) {
            for (var e = this.tryEntries.length - 1; e >= 0; --e) {
              var r = this.tryEntries[e];
              if (r.tryLoc === t) {
                var n = r.completion;
                if ("throw" === n.type) {
                  var o = n.arg;
                  R(r);
                }
                return o;
              }
            }
            throw Error("illegal catch attempt");
          },
          delegateYield: function (e, r, n) {
            return (
              (this.delegate = { iterator: j(e), resultName: r, nextLoc: n }),
              "next" === this.method && (this.arg = t),
              m
            );
          },
        }),
        e
      );
    }
    function l(t, e) {
      var r =
        ("undefined" != typeof Symbol && t[Symbol.iterator]) || t["@@iterator"];
      if (!r) {
        if (
          Array.isArray(t) ||
          (r = h(t)) ||
          (e && t && "number" == typeof t.length)
        ) {
          r && (t = r);
          var n = 0,
            o = function () {};
          return {
            s: o,
            n: function () {
              return n >= t.length ? { done: !0 } : { done: !1, value: t[n++] };
            },
            e: function (t) {
              throw t;
            },
            f: o,
          };
        }
        throw new TypeError(
          "Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.",
        );
      }
      var i,
        a = !0,
        c = !1;
      return {
        s: function () {
          r = r.call(t);
        },
        n: function () {
          var t = r.next();
          return (a = t.done), t;
        },
        e: function (t) {
          (c = !0), (i = t);
        },
        f: function () {
          try {
            a || null == r.return || r.return();
          } finally {
            if (c) throw i;
          }
        },
      };
    }
    function h(t, e) {
      if (t) {
        if ("string" == typeof t) return f(t, e);
        var r = {}.toString.call(t).slice(8, -1);
        return (
          "Object" === r && t.constructor && (r = t.constructor.name),
          "Map" === r || "Set" === r
            ? Array.from(t)
            : "Arguments" === r ||
                /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)
              ? f(t, e)
              : void 0
        );
      }
    }
    function f(t, e) {
      (null == e || e > t.length) && (e = t.length);
      for (var r = 0, n = Array(e); r < e; r++) n[r] = t[r];
      return n;
    }
    function p(t, e, r, n, o, i, a) {
      try {
        var c = t[i](a),
          u = c.value;
      } catch (t) {
        return void r(t);
      }
      c.done ? e(u) : Promise.resolve(u).then(n, o);
    }
    function y(t, e) {
      for (var r = 0; r < e.length; r++) {
        var n = e[r];
        (n.enumerable = n.enumerable || !1),
          (n.configurable = !0),
          "value" in n && (n.writable = !0),
          Object.defineProperty(t, d(n.key), n);
      }
    }
    function d(t) {
      var e = (function (t) {
        if ("object" != c(t) || !t) return t;
        var e = t[Symbol.toPrimitive];
        if (void 0 !== e) {
          var r = e.call(t, "string");
          if ("object" != c(r)) return r;
          throw new TypeError("@@toPrimitive must return a primitive value.");
        }
        return String(t);
      })(t);
      return "symbol" == c(e) ? e : e + "";
    }
    var v = (function () {
        return (
          (t = function t() {
            !(function (t, e) {
              if (!(t instanceof e))
                throw new TypeError("Cannot call a class as a function");
            })(this, t),
              (this.animating = !1);
          }),
          (e = [
            {
              key: "spinReel",
              value:
                ((r = s().mark(function t(e, r, n) {
                  var o,
                    i = this,
                    a = arguments;
                  return s().wrap(function (t) {
                    for (;;)
                      switch ((t.prev = t.next)) {
                        case 0:
                          return (
                            (o = a.length > 3 && void 0 !== a[3] ? a[3] : 0),
                            t.abrupt(
                              "return",
                              new Promise(function (t) {
                                setTimeout(function () {
                                  var o = e.querySelectorAll(".sym");
                                  if (0 === o.length) return t();
                                  e.classList.add("spinning");
                                  var a = performance.now(),
                                    c = function (u) {
                                      if (u - a >= n)
                                        return (
                                          e.classList.remove("spinning"),
                                          i.setSymbols(o, r),
                                          e.classList.add("bounce"),
                                          setTimeout(function () {
                                            return e.classList.remove("bounce");
                                          }, 200),
                                          void t()
                                        );
                                      var s,
                                        h = [
                                          "SEVEN",
                                          "BAR",
                                          "BELL",
                                          "CHERRY",
                                          "LEMON",
                                          "ORANGE",
                                          "PLUM",
                                          "MELON",
                                          "GRAPES",
                                          "WILD",
                                        ],
                                        f = l(o);
                                      try {
                                        for (f.s(); !(s = f.n()).done; ) {
                                          var p = s.value,
                                            y = m(
                                              h[
                                                Math.floor(
                                                  Math.random() * h.length,
                                                )
                                              ],
                                            );
                                          (p.textContent = y.icon),
                                            (p.style.background = y.bg),
                                            (p.style.color = y.color);
                                        }
                                      } catch (t) {
                                        f.e(t);
                                      } finally {
                                        f.f();
                                      }
                                      requestAnimationFrame(c);
                                    };
                                  requestAnimationFrame(c);
                                }, o);
                              }),
                            )
                          );
                        case 2:
                        case "end":
                          return t.stop();
                      }
                  }, t);
                })),
                (n = function () {
                  var t = this,
                    e = arguments;
                  return new Promise(function (n, o) {
                    var i = r.apply(t, e);
                    function a(t) {
                      p(i, n, o, a, c, "next", t);
                    }
                    function c(t) {
                      p(i, n, o, a, c, "throw", t);
                    }
                    a(void 0);
                  });
                }),
                function (t, e, r) {
                  return n.apply(this, arguments);
                }),
            },
            {
              key: "setSymbols",
              value: function (t, e) {
                for (var r = 0; r < t.length && r < e.length; r++) {
                  var n = m(e[r]);
                  (t[r].textContent = n.icon),
                    (t[r].style.background = n.bg),
                    (t[r].style.color = n.color);
                }
              },
            },
            {
              key: "highlightWins",
              value: function (t, e) {
                document
                  .querySelectorAll(".sym.win, .sym.win-glow")
                  .forEach(function (t) {
                    t.classList.remove("win", "win-glow");
                  });
                var r,
                  n = l(t);
                try {
                  for (n.s(); !(r = n.n()).done; ) {
                    var o = u(r.value, 2),
                      i = o[0],
                      a = o[1],
                      c = document.querySelectorAll(".reel")[i];
                    if (c) {
                      var s = c.querySelectorAll(".sym")[a];
                      s && s.classList.add("win", "win-glow");
                    }
                  }
                } catch (t) {
                  n.e(t);
                } finally {
                  n.f();
                }
              },
            },
            {
              key: "clearHighlights",
              value: function () {
                document
                  .querySelectorAll(".sym.win, .sym.win-glow")
                  .forEach(function (t) {
                    t.classList.remove("win", "win-glow");
                  });
              },
            },
            {
              key: "countUp",
              value: function (t, e) {
                var r =
                  arguments.length > 2 && void 0 !== arguments[2]
                    ? arguments[2]
                    : 600;
                if (t) {
                  var n = performance.now(),
                    o = function () {
                      var i = performance.now(),
                        a = Math.min((i - n) / r, 1),
                        c = 1 - Math.pow(1 - a, 3),
                        u = Math.floor(0 + (e - 0) * c);
                      (t.textContent = u.toLocaleString("id-ID")),
                        a < 1 && requestAnimationFrame(o);
                    };
                  requestAnimationFrame(o);
                }
              },
            },
            {
              key: "flashWin",
              value: function (t) {
                t &&
                  (t.classList.add("win-flash"),
                  setTimeout(function () {
                    return t.classList.remove("win-flash");
                  }, 800));
              },
            },
            {
              key: "burst",
              value: function (t, e) {
                var r =
                    arguments.length > 2 && void 0 !== arguments[2]
                      ? arguments[2]
                      : "#FFD700",
                  n = document.getElementById("gameScreen");
                if (n)
                  for (
                    var o = function () {
                        var o = document.createElement("div");
                        (o.className = "particle"),
                          (o.style.cssText = "\n        position:fixed; left:"
                            .concat(t, "px; top:")
                            .concat(
                              e,
                              "px;\n        width:6px; height:6px; border-radius:50%;\n        background:",
                            )
                            .concat(
                              r,
                              ";\n        pointer-events:none; z-index:999;\n        box-shadow: 0 0 6px ",
                            )
                            .concat(r, ";\n      ")),
                          n.appendChild(o);
                        var a = (i / 12) * Math.PI * 2,
                          c = 40 + 60 * Math.random(),
                          u = Math.cos(a) * c,
                          s = Math.sin(a) * c;
                        o.animate(
                          [
                            {
                              transform: "translate(0,0) scale(1)",
                              opacity: 1,
                            },
                            {
                              transform: "translate("
                                .concat(u, "px,")
                                .concat(s, "px) scale(0)"),
                              opacity: 0,
                            },
                          ],
                          {
                            duration: 600 + 200 * Math.random(),
                            easing: "ease-out",
                          },
                        ).onfinish = function () {
                          return o.remove();
                        };
                      },
                      i = 0;
                    i < 12;
                    i++
                  )
                    o();
              },
            },
            {
              key: "pulseSpinBtn",
              value: function (t) {
                t &&
                  (t.classList.add("btn-pulse"),
                  setTimeout(function () {
                    return t.classList.remove("btn-pulse");
                  }, 300));
              },
            },
          ]),
          e && y(t.prototype, e),
          Object.defineProperty(t, "prototype", { writable: !1 }),
          t
        );
        var t, e, r, n;
      })(),
      g = {
        SEVEN: {
          icon: "7",
          bg: "linear-gradient(135deg,#8B0000,#DC143C,#8B0000)",
          color: "#FFD700",
        },
        BAR: {
          icon: "BAR",
          bg: "linear-gradient(135deg,#1a1a2e,#333,#1a1a2e)",
          color: "#FFFFFF",
        },
        BELL: {
          icon: "🔔",
          bg: "linear-gradient(135deg,#4a0030,#8b0060,#4a0030)",
          color: "#FFD700",
        },
        CHERRY: {
          icon: "🍒",
          bg: "linear-gradient(135deg,#600,#cc0033,#600)",
          color: "#FFFFFF",
        },
        LEMON: {
          icon: "🍋",
          bg: "linear-gradient(135deg,#3a5000,#6b8e00,#3a5000)",
          color: "#FFFFFF",
        },
        ORANGE: {
          icon: "🍊",
          bg: "linear-gradient(135deg,#803000,#cc5500,#803000)",
          color: "#FFFFFF",
        },
        PLUM: {
          icon: "🍑",
          bg: "linear-gradient(135deg,#400060,#7a00b3,#400060)",
          color: "#FFFFFF",
        },
        MELON: {
          icon: "🍉",
          bg: "linear-gradient(135deg,#004d00,#008000,#004d00)",
          color: "#FFFFFF",
        },
        GRAPES: {
          icon: "🍇",
          bg: "linear-gradient(135deg,#1a003a,#4a0080,#1a003a)",
          color: "#FFFFFF",
        },
        WILD: {
          icon: "⭐",
          bg: "linear-gradient(135deg,#8B4500,#FFD700,#8B4500)",
          color: "#1a0020",
        },
      };
    function m(t) {
      return g[t] || g.SEVEN;
    }
    function b(t) {
      return (
        (b =
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
        b(t)
      );
    }
    function w(t, e) {
      return (
        (function (t) {
          if (Array.isArray(t)) return t;
        })(t) ||
        (function (t, e) {
          var r =
            null == t
              ? null
              : ("undefined" != typeof Symbol && t[Symbol.iterator]) ||
                t["@@iterator"];
          if (null != r) {
            var n,
              o,
              i,
              a,
              c = [],
              u = !0,
              s = !1;
            try {
              if (((i = (r = r.call(t)).next), 0 === e)) {
                if (Object(r) !== r) return;
                u = !1;
              } else
                for (
                  ;
                  !(u = (n = i.call(r)).done) &&
                  (c.push(n.value), c.length !== e);
                  u = !0
                );
            } catch (t) {
              (s = !0), (o = t);
            } finally {
              try {
                if (
                  !u &&
                  null != r.return &&
                  ((a = r.return()), Object(a) !== a)
                )
                  return;
              } finally {
                if (s) throw o;
              }
            }
            return c;
          }
        })(t, e) ||
        (function (t, e) {
          if (t) {
            if ("string" == typeof t) return E(t, e);
            var r = {}.toString.call(t).slice(8, -1);
            return (
              "Object" === r && t.constructor && (r = t.constructor.name),
              "Map" === r || "Set" === r
                ? Array.from(t)
                : "Arguments" === r ||
                    /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)
                  ? E(t, e)
                  : void 0
            );
          }
        })(t, e) ||
        (function () {
          throw new TypeError(
            "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.",
          );
        })()
      );
    }
    function E(t, e) {
      (null == e || e > t.length) && (e = t.length);
      for (var r = 0, n = Array(e); r < e; r++) n[r] = t[r];
      return n;
    }
    function L() {
      L = function () {
        return e;
      };
      var t,
        e = {},
        r = Object.prototype,
        n = r.hasOwnProperty,
        o =
          Object.defineProperty ||
          function (t, e, r) {
            t[e] = r.value;
          },
        i = "function" == typeof Symbol ? Symbol : {},
        a = i.iterator || "@@iterator",
        c = i.asyncIterator || "@@asyncIterator",
        u = i.toStringTag || "@@toStringTag";
      function s(t, e, r) {
        return (
          Object.defineProperty(t, e, {
            value: r,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          }),
          t[e]
        );
      }
      try {
        s({}, "");
      } catch (t) {
        s = function (t, e, r) {
          return (t[e] = r);
        };
      }
      function l(t, e, r, n) {
        var i = e && e.prototype instanceof g ? e : g,
          a = Object.create(i.prototype),
          c = new B(n || []);
        return o(a, "_invoke", { value: M(t, r, c) }), a;
      }
      function h(t, e, r) {
        try {
          return { type: "normal", arg: t.call(e, r) };
        } catch (t) {
          return { type: "throw", arg: t };
        }
      }
      e.wrap = l;
      var f = "suspendedStart",
        p = "suspendedYield",
        y = "executing",
        d = "completed",
        v = {};
      function g() {}
      function m() {}
      function w() {}
      var E = {};
      s(E, a, function () {
        return this;
      });
      var x = Object.getPrototypeOf,
        S = x && x(x(j([])));
      S && S !== r && n.call(S, a) && (E = S);
      var F = (w.prototype = g.prototype = Object.create(E));
      function O(t) {
        ["next", "throw", "return"].forEach(function (e) {
          s(t, e, function (t) {
            return this._invoke(e, t);
          });
        });
      }
      function A(t, e) {
        function r(o, i, a, c) {
          var u = h(t[o], t, i);
          if ("throw" !== u.type) {
            var s = u.arg,
              l = s.value;
            return l && "object" == b(l) && n.call(l, "__await")
              ? e.resolve(l.__await).then(
                  function (t) {
                    r("next", t, a, c);
                  },
                  function (t) {
                    r("throw", t, a, c);
                  },
                )
              : e.resolve(l).then(
                  function (t) {
                    (s.value = t), a(s);
                  },
                  function (t) {
                    return r("throw", t, a, c);
                  },
                );
          }
          c(u.arg);
        }
        var i;
        o(this, "_invoke", {
          value: function (t, n) {
            function o() {
              return new e(function (e, o) {
                r(t, n, e, o);
              });
            }
            return (i = i ? i.then(o, o) : o());
          },
        });
      }
      function M(e, r, n) {
        var o = f;
        return function (i, a) {
          if (o === y) throw Error("Generator is already running");
          if (o === d) {
            if ("throw" === i) throw a;
            return { value: t, done: !0 };
          }
          for (n.method = i, n.arg = a; ; ) {
            var c = n.delegate;
            if (c) {
              var u = N(c, n);
              if (u) {
                if (u === v) continue;
                return u;
              }
            }
            if ("next" === n.method) n.sent = n._sent = n.arg;
            else if ("throw" === n.method) {
              if (o === f) throw ((o = d), n.arg);
              n.dispatchException(n.arg);
            } else "return" === n.method && n.abrupt("return", n.arg);
            o = y;
            var s = h(e, r, n);
            if ("normal" === s.type) {
              if (((o = n.done ? d : p), s.arg === v)) continue;
              return { value: s.arg, done: n.done };
            }
            "throw" === s.type &&
              ((o = d), (n.method = "throw"), (n.arg = s.arg));
          }
        };
      }
      function N(e, r) {
        var n = r.method,
          o = e.iterator[n];
        if (o === t)
          return (
            (r.delegate = null),
            ("throw" === n &&
              e.iterator.return &&
              ((r.method = "return"),
              (r.arg = t),
              N(e, r),
              "throw" === r.method)) ||
              ("return" !== n &&
                ((r.method = "throw"),
                (r.arg = new TypeError(
                  "The iterator does not provide a '" + n + "' method",
                )))),
            v
          );
        var i = h(o, e.iterator, r.arg);
        if ("throw" === i.type)
          return (r.method = "throw"), (r.arg = i.arg), (r.delegate = null), v;
        var a = i.arg;
        return a
          ? a.done
            ? ((r[e.resultName] = a.value),
              (r.next = e.nextLoc),
              "return" !== r.method && ((r.method = "next"), (r.arg = t)),
              (r.delegate = null),
              v)
            : a
          : ((r.method = "throw"),
            (r.arg = new TypeError("iterator result is not an object")),
            (r.delegate = null),
            v);
      }
      function k(t) {
        var e = { tryLoc: t[0] };
        1 in t && (e.catchLoc = t[1]),
          2 in t && ((e.finallyLoc = t[2]), (e.afterLoc = t[3])),
          this.tryEntries.push(e);
      }
      function R(t) {
        var e = t.completion || {};
        (e.type = "normal"), delete e.arg, (t.completion = e);
      }
      function B(t) {
        (this.tryEntries = [{ tryLoc: "root" }]),
          t.forEach(k, this),
          this.reset(!0);
      }
      function j(e) {
        if (e || "" === e) {
          var r = e[a];
          if (r) return r.call(e);
          if ("function" == typeof e.next) return e;
          if (!isNaN(e.length)) {
            var o = -1,
              i = function r() {
                for (; ++o < e.length; )
                  if (n.call(e, o)) return (r.value = e[o]), (r.done = !1), r;
                return (r.value = t), (r.done = !0), r;
              };
            return (i.next = i);
          }
        }
        throw new TypeError(b(e) + " is not iterable");
      }
      return (
        (m.prototype = w),
        o(F, "constructor", { value: w, configurable: !0 }),
        o(w, "constructor", { value: m, configurable: !0 }),
        (m.displayName = s(w, u, "GeneratorFunction")),
        (e.isGeneratorFunction = function (t) {
          var e = "function" == typeof t && t.constructor;
          return (
            !!e &&
            (e === m || "GeneratorFunction" === (e.displayName || e.name))
          );
        }),
        (e.mark = function (t) {
          return (
            Object.setPrototypeOf
              ? Object.setPrototypeOf(t, w)
              : ((t.__proto__ = w), s(t, u, "GeneratorFunction")),
            (t.prototype = Object.create(F)),
            t
          );
        }),
        (e.awrap = function (t) {
          return { __await: t };
        }),
        O(A.prototype),
        s(A.prototype, c, function () {
          return this;
        }),
        (e.AsyncIterator = A),
        (e.async = function (t, r, n, o, i) {
          void 0 === i && (i = Promise);
          var a = new A(l(t, r, n, o), i);
          return e.isGeneratorFunction(r)
            ? a
            : a.next().then(function (t) {
                return t.done ? t.value : a.next();
              });
        }),
        O(F),
        s(F, u, "Generator"),
        s(F, a, function () {
          return this;
        }),
        s(F, "toString", function () {
          return "[object Generator]";
        }),
        (e.keys = function (t) {
          var e = Object(t),
            r = [];
          for (var n in e) r.push(n);
          return (
            r.reverse(),
            function t() {
              for (; r.length; ) {
                var n = r.pop();
                if (n in e) return (t.value = n), (t.done = !1), t;
              }
              return (t.done = !0), t;
            }
          );
        }),
        (e.values = j),
        (B.prototype = {
          constructor: B,
          reset: function (e) {
            if (
              ((this.prev = 0),
              (this.next = 0),
              (this.sent = this._sent = t),
              (this.done = !1),
              (this.delegate = null),
              (this.method = "next"),
              (this.arg = t),
              this.tryEntries.forEach(R),
              !e)
            )
              for (var r in this)
                "t" === r.charAt(0) &&
                  n.call(this, r) &&
                  !isNaN(+r.slice(1)) &&
                  (this[r] = t);
          },
          stop: function () {
            this.done = !0;
            var t = this.tryEntries[0].completion;
            if ("throw" === t.type) throw t.arg;
            return this.rval;
          },
          dispatchException: function (e) {
            if (this.done) throw e;
            var r = this;
            function o(n, o) {
              return (
                (c.type = "throw"),
                (c.arg = e),
                (r.next = n),
                o && ((r.method = "next"), (r.arg = t)),
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
                  if (!s) throw Error("try statement without catch or finally");
                  if (this.prev < a.finallyLoc) return o(a.finallyLoc);
                }
              }
            }
          },
          abrupt: function (t, e) {
            for (var r = this.tryEntries.length - 1; r >= 0; --r) {
              var o = this.tryEntries[r];
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
              i.tryLoc <= e &&
              e <= i.finallyLoc &&
              (i = null);
            var a = i ? i.completion : {};
            return (
              (a.type = t),
              (a.arg = e),
              i
                ? ((this.method = "next"), (this.next = i.finallyLoc), v)
                : this.complete(a)
            );
          },
          complete: function (t, e) {
            if ("throw" === t.type) throw t.arg;
            return (
              "break" === t.type || "continue" === t.type
                ? (this.next = t.arg)
                : "return" === t.type
                  ? ((this.rval = this.arg = t.arg),
                    (this.method = "return"),
                    (this.next = "end"))
                  : "normal" === t.type && e && (this.next = e),
              v
            );
          },
          finish: function (t) {
            for (var e = this.tryEntries.length - 1; e >= 0; --e) {
              var r = this.tryEntries[e];
              if (r.finallyLoc === t)
                return this.complete(r.completion, r.afterLoc), R(r), v;
            }
          },
          catch: function (t) {
            for (var e = this.tryEntries.length - 1; e >= 0; --e) {
              var r = this.tryEntries[e];
              if (r.tryLoc === t) {
                var n = r.completion;
                if ("throw" === n.type) {
                  var o = n.arg;
                  R(r);
                }
                return o;
              }
            }
            throw Error("illegal catch attempt");
          },
          delegateYield: function (e, r, n) {
            return (
              (this.delegate = { iterator: j(e), resultName: r, nextLoc: n }),
              "next" === this.method && (this.arg = t),
              v
            );
          },
        }),
        e
      );
    }
    function x(t, e, r, n, o, i, a) {
      try {
        var c = t[i](a),
          u = c.value;
      } catch (t) {
        return void r(t);
      }
      c.done ? e(u) : Promise.resolve(u).then(n, o);
    }
    function S(t) {
      return function () {
        var e = this,
          r = arguments;
        return new Promise(function (n, o) {
          var i = t.apply(e, r);
          function a(t) {
            x(i, n, o, a, c, "next", t);
          }
          function c(t) {
            x(i, n, o, a, c, "throw", t);
          }
          a(void 0);
        });
      };
    }
    var F = window.location.origin;
    function O(t, e) {
      return A.apply(this, arguments);
    }
    function A() {
      return (A = S(
        L().mark(function t(e, r) {
          var n, o, i, a, c, u, s;
          return L().wrap(
            function (t) {
              for (;;)
                switch ((t.prev = t.next)) {
                  case 0:
                    for (
                      t.prev = 0,
                        n = new URLSearchParams(),
                        o = 0,
                        i = Object.entries(r);
                      o < i.length;
                      o++
                    )
                      (a = w(i[o], 2)), (c = a[0]), (u = a[1]), n.append(c, u);
                    return (
                      (t.next = 5),
                      fetch(F + e, {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/x-www-form-urlencoded",
                        },
                        body: n.toString(),
                      })
                    );
                  case 5:
                    return (s = t.sent), (t.next = 8), s.json();
                  case 8:
                    return t.abrupt("return", t.sent);
                  case 11:
                    return (
                      (t.prev = 11),
                      (t.t0 = t.catch(0)),
                      t.abrupt("return", {
                        success: !1,
                        error: "Connection failed",
                      })
                    );
                  case 14:
                  case "end":
                    return t.stop();
                }
            },
            t,
            null,
            [[0, 11]],
          );
        }),
      )).apply(this, arguments);
    }
    function M(t) {
      return N.apply(this, arguments);
    }
    function N() {
      return (N = S(
        L().mark(function t(e) {
          var r;
          return L().wrap(
            function (t) {
              for (;;)
                switch ((t.prev = t.next)) {
                  case 0:
                    return (t.prev = 0), (t.next = 3), fetch(F + e);
                  case 3:
                    return (r = t.sent), (t.next = 6), r.json();
                  case 6:
                    return t.abrupt("return", t.sent);
                  case 9:
                    return (
                      (t.prev = 9),
                      (t.t0 = t.catch(0)),
                      t.abrupt("return", null)
                    );
                  case 12:
                  case "end":
                    return t.stop();
                }
            },
            t,
            null,
            [[0, 9]],
          );
        }),
      )).apply(this, arguments);
    }
    const k = function () {
        return S(
          L().mark(function t() {
            return L().wrap(function (t) {
              for (;;)
                switch ((t.prev = t.next)) {
                  case 0:
                    return t.abrupt("return", M("/api/config"));
                  case 1:
                  case "end":
                    return t.stop();
                }
            }, t);
          }),
        )();
      },
      R = function (t) {
        return S(
          L().mark(function e() {
            return L().wrap(function (e) {
              for (;;)
                switch ((e.prev = e.next)) {
                  case 0:
                    return e.abrupt("return", O("/api/money", { balance: t }));
                  case 1:
                  case "end":
                    return e.stop();
                }
            }, e);
          }),
        )();
      };
    function B(t) {
      return (
        (B =
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
        B(t)
      );
    }
    function j(t, e) {
      var r =
        ("undefined" != typeof Symbol && t[Symbol.iterator]) || t["@@iterator"];
      if (!r) {
        if (
          Array.isArray(t) ||
          (r = (function (t, e) {
            if (t) {
              if ("string" == typeof t) return I(t, e);
              var r = {}.toString.call(t).slice(8, -1);
              return (
                "Object" === r && t.constructor && (r = t.constructor.name),
                "Map" === r || "Set" === r
                  ? Array.from(t)
                  : "Arguments" === r ||
                      /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)
                    ? I(t, e)
                    : void 0
              );
            }
          })(t)) ||
          (e && t && "number" == typeof t.length)
        ) {
          r && (t = r);
          var n = 0,
            o = function () {};
          return {
            s: o,
            n: function () {
              return n >= t.length ? { done: !0 } : { done: !1, value: t[n++] };
            },
            e: function (t) {
              throw t;
            },
            f: o,
          };
        }
        throw new TypeError(
          "Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.",
        );
      }
      var i,
        a = !0,
        c = !1;
      return {
        s: function () {
          r = r.call(t);
        },
        n: function () {
          var t = r.next();
          return (a = t.done), t;
        },
        e: function (t) {
          (c = !0), (i = t);
        },
        f: function () {
          try {
            a || null == r.return || r.return();
          } finally {
            if (c) throw i;
          }
        },
      };
    }
    function I(t, e) {
      (null == e || e > t.length) && (e = t.length);
      for (var r = 0, n = Array(e); r < e; r++) n[r] = t[r];
      return n;
    }
    function P() {
      P = function () {
        return e;
      };
      var t,
        e = {},
        r = Object.prototype,
        n = r.hasOwnProperty,
        o =
          Object.defineProperty ||
          function (t, e, r) {
            t[e] = r.value;
          },
        i = "function" == typeof Symbol ? Symbol : {},
        a = i.iterator || "@@iterator",
        c = i.asyncIterator || "@@asyncIterator",
        u = i.toStringTag || "@@toStringTag";
      function s(t, e, r) {
        return (
          Object.defineProperty(t, e, {
            value: r,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          }),
          t[e]
        );
      }
      try {
        s({}, "");
      } catch (t) {
        s = function (t, e, r) {
          return (t[e] = r);
        };
      }
      function l(t, e, r, n) {
        var i = e && e.prototype instanceof g ? e : g,
          a = Object.create(i.prototype),
          c = new k(n || []);
        return o(a, "_invoke", { value: O(t, r, c) }), a;
      }
      function h(t, e, r) {
        try {
          return { type: "normal", arg: t.call(e, r) };
        } catch (t) {
          return { type: "throw", arg: t };
        }
      }
      e.wrap = l;
      var f = "suspendedStart",
        p = "suspendedYield",
        y = "executing",
        d = "completed",
        v = {};
      function g() {}
      function m() {}
      function b() {}
      var w = {};
      s(w, a, function () {
        return this;
      });
      var E = Object.getPrototypeOf,
        L = E && E(E(R([])));
      L && L !== r && n.call(L, a) && (w = L);
      var x = (b.prototype = g.prototype = Object.create(w));
      function S(t) {
        ["next", "throw", "return"].forEach(function (e) {
          s(t, e, function (t) {
            return this._invoke(e, t);
          });
        });
      }
      function F(t, e) {
        function r(o, i, a, c) {
          var u = h(t[o], t, i);
          if ("throw" !== u.type) {
            var s = u.arg,
              l = s.value;
            return l && "object" == B(l) && n.call(l, "__await")
              ? e.resolve(l.__await).then(
                  function (t) {
                    r("next", t, a, c);
                  },
                  function (t) {
                    r("throw", t, a, c);
                  },
                )
              : e.resolve(l).then(
                  function (t) {
                    (s.value = t), a(s);
                  },
                  function (t) {
                    return r("throw", t, a, c);
                  },
                );
          }
          c(u.arg);
        }
        var i;
        o(this, "_invoke", {
          value: function (t, n) {
            function o() {
              return new e(function (e, o) {
                r(t, n, e, o);
              });
            }
            return (i = i ? i.then(o, o) : o());
          },
        });
      }
      function O(e, r, n) {
        var o = f;
        return function (i, a) {
          if (o === y) throw Error("Generator is already running");
          if (o === d) {
            if ("throw" === i) throw a;
            return { value: t, done: !0 };
          }
          for (n.method = i, n.arg = a; ; ) {
            var c = n.delegate;
            if (c) {
              var u = A(c, n);
              if (u) {
                if (u === v) continue;
                return u;
              }
            }
            if ("next" === n.method) n.sent = n._sent = n.arg;
            else if ("throw" === n.method) {
              if (o === f) throw ((o = d), n.arg);
              n.dispatchException(n.arg);
            } else "return" === n.method && n.abrupt("return", n.arg);
            o = y;
            var s = h(e, r, n);
            if ("normal" === s.type) {
              if (((o = n.done ? d : p), s.arg === v)) continue;
              return { value: s.arg, done: n.done };
            }
            "throw" === s.type &&
              ((o = d), (n.method = "throw"), (n.arg = s.arg));
          }
        };
      }
      function A(e, r) {
        var n = r.method,
          o = e.iterator[n];
        if (o === t)
          return (
            (r.delegate = null),
            ("throw" === n &&
              e.iterator.return &&
              ((r.method = "return"),
              (r.arg = t),
              A(e, r),
              "throw" === r.method)) ||
              ("return" !== n &&
                ((r.method = "throw"),
                (r.arg = new TypeError(
                  "The iterator does not provide a '" + n + "' method",
                )))),
            v
          );
        var i = h(o, e.iterator, r.arg);
        if ("throw" === i.type)
          return (r.method = "throw"), (r.arg = i.arg), (r.delegate = null), v;
        var a = i.arg;
        return a
          ? a.done
            ? ((r[e.resultName] = a.value),
              (r.next = e.nextLoc),
              "return" !== r.method && ((r.method = "next"), (r.arg = t)),
              (r.delegate = null),
              v)
            : a
          : ((r.method = "throw"),
            (r.arg = new TypeError("iterator result is not an object")),
            (r.delegate = null),
            v);
      }
      function M(t) {
        var e = { tryLoc: t[0] };
        1 in t && (e.catchLoc = t[1]),
          2 in t && ((e.finallyLoc = t[2]), (e.afterLoc = t[3])),
          this.tryEntries.push(e);
      }
      function N(t) {
        var e = t.completion || {};
        (e.type = "normal"), delete e.arg, (t.completion = e);
      }
      function k(t) {
        (this.tryEntries = [{ tryLoc: "root" }]),
          t.forEach(M, this),
          this.reset(!0);
      }
      function R(e) {
        if (e || "" === e) {
          var r = e[a];
          if (r) return r.call(e);
          if ("function" == typeof e.next) return e;
          if (!isNaN(e.length)) {
            var o = -1,
              i = function r() {
                for (; ++o < e.length; )
                  if (n.call(e, o)) return (r.value = e[o]), (r.done = !1), r;
                return (r.value = t), (r.done = !0), r;
              };
            return (i.next = i);
          }
        }
        throw new TypeError(B(e) + " is not iterable");
      }
      return (
        (m.prototype = b),
        o(x, "constructor", { value: b, configurable: !0 }),
        o(b, "constructor", { value: m, configurable: !0 }),
        (m.displayName = s(b, u, "GeneratorFunction")),
        (e.isGeneratorFunction = function (t) {
          var e = "function" == typeof t && t.constructor;
          return (
            !!e &&
            (e === m || "GeneratorFunction" === (e.displayName || e.name))
          );
        }),
        (e.mark = function (t) {
          return (
            Object.setPrototypeOf
              ? Object.setPrototypeOf(t, b)
              : ((t.__proto__ = b), s(t, u, "GeneratorFunction")),
            (t.prototype = Object.create(x)),
            t
          );
        }),
        (e.awrap = function (t) {
          return { __await: t };
        }),
        S(F.prototype),
        s(F.prototype, c, function () {
          return this;
        }),
        (e.AsyncIterator = F),
        (e.async = function (t, r, n, o, i) {
          void 0 === i && (i = Promise);
          var a = new F(l(t, r, n, o), i);
          return e.isGeneratorFunction(r)
            ? a
            : a.next().then(function (t) {
                return t.done ? t.value : a.next();
              });
        }),
        S(x),
        s(x, u, "Generator"),
        s(x, a, function () {
          return this;
        }),
        s(x, "toString", function () {
          return "[object Generator]";
        }),
        (e.keys = function (t) {
          var e = Object(t),
            r = [];
          for (var n in e) r.push(n);
          return (
            r.reverse(),
            function t() {
              for (; r.length; ) {
                var n = r.pop();
                if (n in e) return (t.value = n), (t.done = !1), t;
              }
              return (t.done = !0), t;
            }
          );
        }),
        (e.values = R),
        (k.prototype = {
          constructor: k,
          reset: function (e) {
            if (
              ((this.prev = 0),
              (this.next = 0),
              (this.sent = this._sent = t),
              (this.done = !1),
              (this.delegate = null),
              (this.method = "next"),
              (this.arg = t),
              this.tryEntries.forEach(N),
              !e)
            )
              for (var r in this)
                "t" === r.charAt(0) &&
                  n.call(this, r) &&
                  !isNaN(+r.slice(1)) &&
                  (this[r] = t);
          },
          stop: function () {
            this.done = !0;
            var t = this.tryEntries[0].completion;
            if ("throw" === t.type) throw t.arg;
            return this.rval;
          },
          dispatchException: function (e) {
            if (this.done) throw e;
            var r = this;
            function o(n, o) {
              return (
                (c.type = "throw"),
                (c.arg = e),
                (r.next = n),
                o && ((r.method = "next"), (r.arg = t)),
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
                  if (!s) throw Error("try statement without catch or finally");
                  if (this.prev < a.finallyLoc) return o(a.finallyLoc);
                }
              }
            }
          },
          abrupt: function (t, e) {
            for (var r = this.tryEntries.length - 1; r >= 0; --r) {
              var o = this.tryEntries[r];
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
              i.tryLoc <= e &&
              e <= i.finallyLoc &&
              (i = null);
            var a = i ? i.completion : {};
            return (
              (a.type = t),
              (a.arg = e),
              i
                ? ((this.method = "next"), (this.next = i.finallyLoc), v)
                : this.complete(a)
            );
          },
          complete: function (t, e) {
            if ("throw" === t.type) throw t.arg;
            return (
              "break" === t.type || "continue" === t.type
                ? (this.next = t.arg)
                : "return" === t.type
                  ? ((this.rval = this.arg = t.arg),
                    (this.method = "return"),
                    (this.next = "end"))
                  : "normal" === t.type && e && (this.next = e),
              v
            );
          },
          finish: function (t) {
            for (var e = this.tryEntries.length - 1; e >= 0; --e) {
              var r = this.tryEntries[e];
              if (r.finallyLoc === t)
                return this.complete(r.completion, r.afterLoc), N(r), v;
            }
          },
          catch: function (t) {
            for (var e = this.tryEntries.length - 1; e >= 0; --e) {
              var r = this.tryEntries[e];
              if (r.tryLoc === t) {
                var n = r.completion;
                if ("throw" === n.type) {
                  var o = n.arg;
                  N(r);
                }
                return o;
              }
            }
            throw Error("illegal catch attempt");
          },
          delegateYield: function (e, r, n) {
            return (
              (this.delegate = { iterator: R(e), resultName: r, nextLoc: n }),
              "next" === this.method && (this.arg = t),
              v
            );
          },
        }),
        e
      );
    }
    function G(t, e, r, n, o, i, a) {
      try {
        var c = t[i](a),
          u = c.value;
      } catch (t) {
        return void r(t);
      }
      c.done ? e(u) : Promise.resolve(u).then(n, o);
    }
    function _(t) {
      return function () {
        var e = this,
          r = arguments;
        return new Promise(function (n, o) {
          var i = t.apply(e, r);
          function a(t) {
            G(i, n, o, a, c, "next", t);
          }
          function c(t) {
            G(i, n, o, a, c, "throw", t);
          }
          a(void 0);
        });
      };
    }
    function C(t, e) {
      for (var r = 0; r < e.length; r++) {
        var n = e[r];
        (n.enumerable = n.enumerable || !1),
          (n.configurable = !0),
          "value" in n && (n.writable = !0),
          Object.defineProperty(t, D(n.key), n);
      }
    }
    function D(t) {
      var e = (function (t) {
        if ("object" != B(t) || !t) return t;
        var e = t[Symbol.toPrimitive];
        if (void 0 !== e) {
          var r = e.call(t, "string");
          if ("object" != B(r)) return r;
          throw new TypeError("@@toPrimitive must return a primitive value.");
        }
        return String(t);
      })(t);
      return "symbol" == B(e) ? e : e + "";
    }
    var T = (function () {
      return (
        (t = function t() {
          !(function (t, e) {
            if (!(t instanceof e))
              throw new TypeError("Cannot call a class as a function");
          })(this, t),
            (this.anim = new v()),
            (this.state = {
              balance: 1e3,
              bet: 100,
              totalWin: 0,
              spinning: !1,
              autoplay: !1,
              turbo: !1,
              freeSpins: 0,
              spinCount: 0,
              lossStreak: 0,
              lastWin: 0,
              history: [],
              config: null,
            }),
            (this.grid = []),
            (this.winResults = []),
            (this.el = {}),
            this.cacheDOM(),
            (this.reelPositions = [0, 0, 0, 0, 0]),
            (this.reelStrips = this.buildStrips()),
            this.init();
        }),
        (e = [
          {
            key: "cacheDOM",
            value: function () {
              for (
                var t = 0,
                  e = [
                    "gameScreen",
                    "playerMoney",
                    "betDisplay",
                    "betDisplay2",
                    "winText",
                    "spinBtn",
                    "autoplay",
                    "resetBtn",
                    "controls",
                    "topBar",
                    "winMsg",
                    "totalWinDisplay",
                    "betDown",
                    "betUp",
                    "turboMode",
                    "maxBet",
                    "winHistory",
                  ];
                t < e.length;
                t++
              ) {
                var r = e[t];
                this.el[r] = document.getElementById(r);
              }
              (this.reelEls = document.querySelectorAll(".reel")),
                (this.reelCount = this.reelEls.length);
            },
          },
          {
            key: "buildStrips",
            value: function () {
              for (
                var t = [
                    "SEVEN",
                    "BAR",
                    "BELL",
                    "CHERRY",
                    "LEMON",
                    "ORANGE",
                    "PLUM",
                    "MELON",
                    "GRAPES",
                    "WILD",
                  ],
                  e = [],
                  r = 0;
                r < 5;
                r++
              ) {
                for (var n = [], o = 0; o < 30; o++) {
                  var i =
                    Math.random() < 0.7
                      ? Math.floor(7 * Math.random()) + 2
                      : Math.floor(3 * Math.random());
                  n.push(t[Math.min(i, t.length - 1)]);
                }
                for (var a = 0; a < n.length; a++)
                  Math.random() < 0.03 && (n[a] = "WILD");
                e.push(n);
              }
              return e;
            },
          },
          {
            key: "init",
            value:
              ((o = _(
                P().mark(function t() {
                  var e, r;
                  return P().wrap(
                    function (t) {
                      for (;;)
                        switch ((t.prev = t.next)) {
                          case 0:
                            return (t.prev = 0), (t.next = 3), k();
                          case 3:
                            (e = t.sent), (this.state.config = e), (t.next = 9);
                            break;
                          case 7:
                            (t.prev = 7), (t.t0 = t.catch(0));
                          case 9:
                            (this.state.bet =
                              (this.state.config &&
                                this.state.config.betAmount) ||
                              100),
                              (r = localStorage.getItem("slot777_balance")),
                              (this.state.balance = r
                                ? parseInt(r, 10)
                                : (this.state.config &&
                                    this.state.config.startingMoney) ||
                                  1e3),
                              R(this.state.balance),
                              this.buildReelDOM(),
                              this.randomizeGrid(),
                              this.renderGrid(),
                              this.bindEvents(),
                              this.updateUI(),
                              this.showMsg("🎰 SPIN TO WIN");
                          case 19:
                          case "end":
                            return t.stop();
                        }
                    },
                    t,
                    this,
                    [[0, 7]],
                  );
                }),
              )),
              function () {
                return o.apply(this, arguments);
              }),
          },
          {
            key: "buildReelDOM",
            value: function () {
              var t = document.getElementById("reels");
              if (t) {
                t.innerHTML = "";
                for (var e = 0; e < 5; e++) {
                  var r = document.createElement("div");
                  r.className = "reel";
                  for (var n = 0; n < 3; n++) {
                    var o = document.createElement("div");
                    (o.className = "sym"), r.appendChild(o);
                  }
                  t.appendChild(r);
                }
                (this.reelEls = document.querySelectorAll(".reel")),
                  (this.reelCount = this.reelEls.length);
              }
            },
          },
          {
            key: "randomizeGrid",
            value: function () {
              this.grid = [];
              for (
                var t = [
                    "SEVEN",
                    "BAR",
                    "BELL",
                    "CHERRY",
                    "LEMON",
                    "ORANGE",
                    "PLUM",
                    "MELON",
                    "GRAPES",
                    "WILD",
                  ],
                  e = 0;
                e < 5;
                e++
              ) {
                for (var r = [], n = 0; n < 3; n++)
                  r.push(t[Math.floor(Math.random() * t.length)]);
                this.grid.push(r);
              }
            },
          },
          {
            key: "renderGrid",
            value: function () {
              if (this.reelEls)
                for (
                  var t = {
                      SEVEN: {
                        icon: "7",
                        bg: "linear-gradient(135deg,#8B0000,#DC143C,#8B0000)",
                        color: "#FFD700",
                      },
                      BAR: {
                        icon: "BAR",
                        bg: "linear-gradient(135deg,#1a1a2e,#333,#1a1a2e)",
                        color: "#FFFFFF",
                      },
                      BELL: {
                        icon: "🔔",
                        bg: "linear-gradient(135deg,#4a0030,#8b0060,#4a0030)",
                        color: "#FFD700",
                      },
                      CHERRY: {
                        icon: "🍒",
                        bg: "linear-gradient(135deg,#600,#cc0033,#600)",
                        color: "#FFFFFF",
                      },
                      LEMON: {
                        icon: "🍋",
                        bg: "linear-gradient(135deg,#3a5000,#6b8e00,#3a5000)",
                        color: "#FFFFFF",
                      },
                      ORANGE: {
                        icon: "🍊",
                        bg: "linear-gradient(135deg,#803000,#cc5500,#803000)",
                        color: "#FFFFFF",
                      },
                      PLUM: {
                        icon: "🍑",
                        bg: "linear-gradient(135deg,#400060,#7a00b3,#400060)",
                        color: "#FFFFFF",
                      },
                      MELON: {
                        icon: "🍉",
                        bg: "linear-gradient(135deg,#004d00,#008000,#004d00)",
                        color: "#FFFFFF",
                      },
                      GRAPES: {
                        icon: "🍇",
                        bg: "linear-gradient(135deg,#1a003a,#4a0080,#1a003a)",
                        color: "#FFFFFF",
                      },
                      WILD: {
                        icon: "⭐",
                        bg: "linear-gradient(135deg,#8B4500,#FFD700,#8B4500)",
                        color: "#1a0020",
                      },
                    },
                    e = 0;
                  e < 5 && e < this.reelEls.length;
                  e++
                )
                  for (
                    var r = this.reelEls[e].querySelectorAll(".sym"), n = 0;
                    n < 3 && n < r.length;
                    n++
                  ) {
                    var o = t[this.grid[e] ? this.grid[e][n] : "BAR"] || t.BAR;
                    (r[n].textContent = o.icon),
                      (r[n].style.background = o.bg),
                      (r[n].style.color = o.color);
                  }
            },
          },
          {
            key: "bindEvents",
            value: function () {
              var t = this;
              this.el.spinBtn &&
                this.el.spinBtn.addEventListener("click", function () {
                  return t.spin();
                }),
                this.el.resetBtn &&
                  this.el.resetBtn.addEventListener("click", function () {
                    return t.resetBalance();
                  }),
                this.el.betDown &&
                  this.el.betDown.addEventListener("click", function () {
                    return t.adjustBet(-50);
                  }),
                this.el.betUp &&
                  this.el.betUp.addEventListener("click", function () {
                    return t.adjustBet(50);
                  }),
                this.el.maxBet &&
                  this.el.maxBet.addEventListener("click", function () {
                    return t.maxBet();
                  }),
                this.el.autoplay &&
                  this.el.autoplay.addEventListener("change", function () {
                    (t.state.autoplay = t.el.autoplay.checked),
                      t.state.autoplay &&
                        !t.state.spinning &&
                        t.state.balance >= t.state.bet &&
                        t.spin();
                  }),
                this.el.turboMode &&
                  this.el.turboMode.addEventListener("change", function () {
                    t.state.turbo = t.el.turboMode.checked;
                  }),
                document.addEventListener("keydown", function (e) {
                  "Space" !== e.code ||
                    t.state.spinning ||
                    (e.preventDefault(), t.spin());
                });
            },
          },
          {
            key: "adjustBet",
            value: function (t) {
              var e = this.state.bet + t;
              (e = Math.max(10, Math.min(1e4, e))),
                (this.state.bet = e),
                this.updateUI();
            },
          },
          {
            key: "maxBet",
            value: function () {
              (this.state.bet = Math.min(1e4, this.state.balance)),
                this.updateUI();
            },
          },
          {
            key: "resetBalance",
            value:
              ((n = _(
                P().mark(function t() {
                  var e, r;
                  return P().wrap(
                    function (t) {
                      for (;;)
                        switch ((t.prev = t.next)) {
                          case 0:
                            return (t.next = 2), k();
                          case 2:
                            (r = t.sent),
                              (this.state.config = r || this.state.config),
                              (this.state.balance =
                                (r && r.startingMoney) || 1e3),
                              (this.state.lossStreak = 0),
                              localStorage.setItem(
                                "slot777_balance",
                                this.state.balance,
                              ),
                              R(this.state.balance),
                              null === (e = this.state.spinBtn) ||
                                void 0 === e ||
                                e.removeAttribute("disabled"),
                              this.updateUI(),
                              this.showMsg("💰 BALANCE RESET");
                          case 11:
                          case "end":
                            return t.stop();
                        }
                    },
                    t,
                    this,
                  );
                }),
              )),
              function () {
                return n.apply(this, arguments);
              }),
          },
          {
            key: "spin",
            value:
              ((r = _(
                P().mark(function t() {
                  var e,
                    r,
                    n,
                    o,
                    i,
                    a,
                    c,
                    u,
                    s,
                    l,
                    h,
                    f,
                    p,
                    y,
                    d,
                    v,
                    g,
                    m,
                    b,
                    w,
                    E,
                    L,
                    x,
                    S,
                    F = this;
                  return P().wrap(
                    function (t) {
                      for (;;)
                        switch ((t.prev = t.next)) {
                          case 0:
                            if (!this.state.spinning) {
                              t.next = 2;
                              break;
                            }
                            return t.abrupt("return");
                          case 2:
                            if (!(this.state.balance < this.state.bet)) {
                              t.next = 5;
                              break;
                            }
                            return (
                              this.showMsg("💸 INSUFFICIENT BALANCE"),
                              t.abrupt("return")
                            );
                          case 5:
                            for (
                              this.state.spinning = !0,
                                this.state.balance -= this.state.bet,
                                this.state.spinCount++,
                                this.updateUI(),
                                this.el.spinBtn &&
                                  (this.el.spinBtn.disabled = !0),
                                this.anim.clearHighlights(),
                                this.showMsg(
                                  this.state.turbo
                                    ? "⚡ SPINNING..."
                                    : "🎰 SPINNING...",
                                ),
                                this.anim.pulseSpinBtn(this.el.spinBtn),
                                localStorage.setItem(
                                  "slot777_balance",
                                  this.state.balance,
                                ),
                                R(this.state.balance),
                                e = this.state.config || {},
                                r = e.winRate || 0.15,
                                n = e.payoutMultiplier || 3,
                                o = e.minSpinsBeforeWin || 0,
                                this.state.lossStreak =
                                  this.state.lossStreak || 0,
                                i = !1,
                                o > 0 &&
                                  this.state.lossStreak >= o &&
                                  ((i = !0), (this.state.lossStreak = 0)),
                                a = this.generateResult(i ? 1 : r, n),
                                this.grid = a.grid,
                                this.winResults = a.wins,
                                c = this.state.turbo ? 300 : 800,
                                u = this.state.turbo ? 40 : 80,
                                s = [],
                                l = 0;
                              l < 5 && l < this.reelEls.length;
                              l++
                            )
                              (h = this.reelEls[l]),
                                (f = this.grid[l] || ["BAR", "BAR", "BAR"]),
                                s.push(this.anim.spinReel(h, f, c, l * u));
                            return (t.next = 31), Promise.all(s);
                          case 31:
                            if (
                              ((p = a.wins),
                              (y = p.reduce(function (t, e) {
                                return t + e.amount;
                              }, 0)),
                              (this.state.lastWin = y),
                              y > 0)
                            ) {
                              (this.state.balance += y),
                                (this.state.totalWin += y),
                                (this.state.lossStreak = 0),
                                (d = []),
                                (v = j(p));
                              try {
                                for (v.s(); !(g = v.n()).done; ) {
                                  (m = g.value), (b = j(m.positions));
                                  try {
                                    for (b.s(); !(w = b.n()).done; )
                                      (E = w.value), d.push(E);
                                  } catch (t) {
                                    b.e(t);
                                  } finally {
                                    b.f();
                                  }
                                }
                              } catch (t) {
                                v.e(t);
                              } finally {
                                v.f();
                              }
                              this.anim.highlightWins(d, this.grid),
                                (L = y.toLocaleString("id-ID")),
                                this.showMsg(
                                  "🎉 WIN ".concat(L, "!"),
                                  "#FF6B6B",
                                ),
                                this.el.totalWinDisplay &&
                                  (this.anim.countUp(
                                    this.el.totalWinDisplay,
                                    y,
                                  ),
                                  this.anim.flashWin(this.el.totalWinDisplay)),
                                this.el.spinBtn &&
                                  ((x =
                                    this.el.spinBtn.getBoundingClientRect()),
                                  this.anim.burst(x.left + x.width / 2, x.top));
                            } else
                              this.state.lossStreak++, this.showMsg("", "#888");
                            localStorage.setItem(
                              "slot777_balance",
                              this.state.balance,
                            ),
                              R(this.state.balance),
                              (this.state.spinning = !1),
                              this.el.spinBtn &&
                                (this.el.spinBtn.disabled = !1),
                              this.state.autoplay &&
                              this.state.balance >= this.state.bet
                                ? ((S = this.state.turbo ? 150 : 600),
                                  setTimeout(function () {
                                    return F.spin();
                                  }, S))
                                : (this.el.autoplay &&
                                    (this.el.autoplay.checked = !1),
                                  (this.state.autoplay = !1)),
                              this.updateUI();
                          case 41:
                          case "end":
                            return t.stop();
                        }
                    },
                    t,
                    this,
                  );
                }),
              )),
              function () {
                return r.apply(this, arguments);
              }),
          },
          {
            key: "generateResult",
            value: function (t, e) {
              var r = [],
                n = [];
              if (Math.random() < t) {
                for (var o = W(), i = 0; i < 5; i++) {
                  for (var c = [], u = 0; u < 3; u++)
                    1 === u && i < 5 ? c.push(o) : c.push(W());
                  r.push(c);
                }
                if (0 === (n = a(r, this.state.bet)).length) {
                  for (var s = 0; s < 5; s++) r[s][1] = o;
                  n = a(r, this.state.bet);
                }
              } else {
                for (var l = Math.random() < 0.3, h = 0; h < 5; h++) {
                  for (var f = [], p = 0; p < 3; p++)
                    l && h < 4 && 1 === p
                      ? f.push("SEVEN")
                      : l && 4 === h && 1 === p
                        ? f.push("CHERRY")
                        : f.push(W());
                  r.push(f);
                }
                n = [];
              }
              return { grid: r, wins: n };
            },
          },
          {
            key: "updateUI",
            value: function () {
              var t = function (t) {
                return (t || 0).toLocaleString("id-ID");
              };
              this.el.playerMoney &&
                (this.el.playerMoney.textContent = t(this.state.balance)),
                this.el.betDisplay &&
                  (this.el.betDisplay.textContent = t(this.state.bet)),
                this.el.betDisplay2 &&
                  (this.el.betDisplay2.textContent = t(this.state.bet)),
                this.el.totalWinDisplay &&
                  this.state.lastWin > 0 &&
                  (this.el.totalWinDisplay.textContent = t(this.state.lastWin));
            },
          },
          {
            key: "showMsg",
            value: function (t, e) {
              this.el.winText &&
                ((this.el.winText.textContent = t || ""),
                (this.el.winText.style.color = e || "#D5AD6D"));
            },
          },
        ]),
        e && C(t.prototype, e),
        Object.defineProperty(t, "prototype", { writable: !1 }),
        t
      );
      var t, e, r, n, o;
    })();
    function W() {
      var t = [
        "SEVEN",
        "SEVEN",
        "SEVEN",
        "SEVEN",
        "BAR",
        "BAR",
        "BAR",
        "BAR",
        "BAR",
        "BAR",
        "BELL",
        "BELL",
        "BELL",
        "BELL",
        "CHERRY",
        "CHERRY",
        "CHERRY",
        "CHERRY",
        "CHERRY",
        "LEMON",
        "LEMON",
        "LEMON",
        "LEMON",
        "LEMON",
        "ORANGE",
        "ORANGE",
        "ORANGE",
        "ORANGE",
        "PLUM",
        "PLUM",
        "PLUM",
        "MELON",
        "MELON",
        "GRAPES",
        "GRAPES",
        "WILD",
      ];
      return t[Math.floor(Math.random() * t.length)];
    }
    "loading" === document.readyState
      ? document.addEventListener("DOMContentLoaded", function () {
          return new T();
        })
      : new T();
  })();
})();
