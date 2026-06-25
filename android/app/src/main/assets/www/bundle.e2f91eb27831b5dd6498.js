/*! For license information please see bundle.e2f91eb27831b5dd6498.js.LICENSE.txt */
(() => {
  "use strict";
  (() => {
    function t(e) {
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
        t(e)
      );
    }
    function e(t, e) {
      for (var n = 0; n < e.length; n++) {
        var o = e[n];
        (o.enumerable = o.enumerable || !1),
          (o.configurable = !0),
          "value" in o && (o.writable = !0),
          Object.defineProperty(t, r(o.key), o);
      }
    }
    function r(e) {
      var r = (function (e) {
        if ("object" != t(e) || !e) return e;
        var r = e[Symbol.toPrimitive];
        if (void 0 !== r) {
          var n = r.call(e, "string");
          if ("object" != t(n)) return n;
          throw new TypeError("@@toPrimitive must return a primitive value.");
        }
        return String(e);
      })(e);
      return "symbol" == t(r) ? r : r + "";
    }
    var n = {
        seven: {
          icon: "7",
          color: "#FFD700",
          bg: "linear-gradient(135deg,#8B0000,#DC143C)",
          mult: 50,
        },
        bar: {
          icon: "BAR",
          color: "#fff",
          bg: "linear-gradient(135deg,#1a1a2e,#333)",
          mult: 25,
        },
        bell: {
          icon: "🔔",
          color: "#FFD700",
          bg: "linear-gradient(135deg,#4a0030,#8b0060)",
          mult: 15,
        },
        cherry: {
          icon: "🍒",
          color: "#fff",
          bg: "linear-gradient(135deg,#600,#cc0033)",
          mult: 10,
        },
        lemon: {
          icon: "🍋",
          color: "#fff",
          bg: "linear-gradient(135deg,#3a5000,#6b8e00)",
          mult: 8,
        },
        orange: {
          icon: "🍊",
          color: "#fff",
          bg: "linear-gradient(135deg,#803000,#cc5500)",
          mult: 6,
        },
        plum: {
          icon: "🍑",
          color: "#fff",
          bg: "linear-gradient(135deg,#400060,#7a00b3)",
          mult: 5,
        },
        melon: {
          icon: "🍉",
          color: "#fff",
          bg: "linear-gradient(135deg,#004d00,#008000)",
          mult: 4,
        },
        grapes: {
          icon: "🍇",
          color: "#fff",
          bg: "linear-gradient(135deg,#1a003a,#4a0080)",
          mult: 3,
        },
      },
      o = Object.keys(n),
      i = (function () {
        return (
          (t = function t() {
            !(function (t, e) {
              if (!(t instanceof e))
                throw new TypeError("Cannot call a class as a function");
            })(this, t);
          }),
          (r = [
            {
              key: "getData",
              value: function (t) {
                return n[t] || n.seven;
              },
            },
            {
              key: "random",
              value: function () {
                return o[Math.floor(Math.random() * o.length)];
              },
            },
            {
              key: "createDiv",
              value: function (t) {
                var e = n[t] || n.seven,
                  r = document.createElement("div");
                return (
                  (r.className = "sym"),
                  (r.textContent = e.icon),
                  (r.style.cssText = "background:"
                    .concat(e.bg, ";color:")
                    .concat(e.color, ";")),
                  r
                );
              },
            },
          ]),
          null && e(t.prototype, null),
          r && e(t, r),
          Object.defineProperty(t, "prototype", { writable: !1 }),
          t
        );
        var t, r;
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
    function c() {
      c = function () {
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
        u = i.iterator || "@@iterator",
        l = i.asyncIterator || "@@asyncIterator",
        s = i.toStringTag || "@@toStringTag";
      function f(t, e, r) {
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
        f({}, "");
      } catch (t) {
        f = function (t, e, r) {
          return (t[e] = r);
        };
      }
      function h(t, e, r, n) {
        var i = e && e.prototype instanceof b ? e : b,
          a = Object.create(i.prototype),
          c = new G(n || []);
        return o(a, "_invoke", { value: P(t, r, c) }), a;
      }
      function p(t, e, r) {
        try {
          return { type: "normal", arg: t.call(e, r) };
        } catch (t) {
          return { type: "throw", arg: t };
        }
      }
      e.wrap = h;
      var y = "suspendedStart",
        v = "suspendedYield",
        d = "executing",
        g = "completed",
        m = {};
      function b() {}
      function w() {}
      function x() {}
      var L = {};
      f(L, u, function () {
        return this;
      });
      var E = Object.getPrototypeOf,
        S = E && E(E(A([])));
      S && S !== r && n.call(S, u) && (L = S);
      var k = (x.prototype = b.prototype = Object.create(L));
      function j(t) {
        ["next", "throw", "return"].forEach(function (e) {
          f(t, e, function (t) {
            return this._invoke(e, t);
          });
        });
      }
      function O(t, e) {
        function r(o, i, c, u) {
          var l = p(t[o], t, i);
          if ("throw" !== l.type) {
            var s = l.arg,
              f = s.value;
            return f && "object" == a(f) && n.call(f, "__await")
              ? e.resolve(f.__await).then(
                  function (t) {
                    r("next", t, c, u);
                  },
                  function (t) {
                    r("throw", t, c, u);
                  },
                )
              : e.resolve(f).then(
                  function (t) {
                    (s.value = t), c(s);
                  },
                  function (t) {
                    return r("throw", t, c, u);
                  },
                );
          }
          u(l.arg);
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
      function P(e, r, n) {
        var o = y;
        return function (i, a) {
          if (o === d) throw Error("Generator is already running");
          if (o === g) {
            if ("throw" === i) throw a;
            return { value: t, done: !0 };
          }
          for (n.method = i, n.arg = a; ; ) {
            var c = n.delegate;
            if (c) {
              var u = _(c, n);
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
            o = d;
            var l = p(e, r, n);
            if ("normal" === l.type) {
              if (((o = n.done ? g : v), l.arg === m)) continue;
              return { value: l.arg, done: n.done };
            }
            "throw" === l.type &&
              ((o = g), (n.method = "throw"), (n.arg = l.arg));
          }
        };
      }
      function _(e, r) {
        var n = r.method,
          o = e.iterator[n];
        if (o === t)
          return (
            (r.delegate = null),
            ("throw" === n &&
              e.iterator.return &&
              ((r.method = "return"),
              (r.arg = t),
              _(e, r),
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
      function T(t) {
        var e = { tryLoc: t[0] };
        1 in t && (e.catchLoc = t[1]),
          2 in t && ((e.finallyLoc = t[2]), (e.afterLoc = t[3])),
          this.tryEntries.push(e);
      }
      function N(t) {
        var e = t.completion || {};
        (e.type = "normal"), delete e.arg, (t.completion = e);
      }
      function G(t) {
        (this.tryEntries = [{ tryLoc: "root" }]),
          t.forEach(T, this),
          this.reset(!0);
      }
      function A(e) {
        if (e || "" === e) {
          var r = e[u];
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
        throw new TypeError(a(e) + " is not iterable");
      }
      return (
        (w.prototype = x),
        o(k, "constructor", { value: x, configurable: !0 }),
        o(x, "constructor", { value: w, configurable: !0 }),
        (w.displayName = f(x, s, "GeneratorFunction")),
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
              ? Object.setPrototypeOf(t, x)
              : ((t.__proto__ = x), f(t, s, "GeneratorFunction")),
            (t.prototype = Object.create(k)),
            t
          );
        }),
        (e.awrap = function (t) {
          return { __await: t };
        }),
        j(O.prototype),
        f(O.prototype, l, function () {
          return this;
        }),
        (e.AsyncIterator = O),
        (e.async = function (t, r, n, o, i) {
          void 0 === i && (i = Promise);
          var a = new O(h(t, r, n, o), i);
          return e.isGeneratorFunction(r)
            ? a
            : a.next().then(function (t) {
                return t.done ? t.value : a.next();
              });
        }),
        j(k),
        f(k, s, "Generator"),
        f(k, u, function () {
          return this;
        }),
        f(k, "toString", function () {
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
        (e.values = A),
        (G.prototype = {
          constructor: G,
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
                  l = n.call(a, "finallyLoc");
                if (u && l) {
                  if (this.prev < a.catchLoc) return o(a.catchLoc, !0);
                  if (this.prev < a.finallyLoc) return o(a.finallyLoc);
                } else if (u) {
                  if (this.prev < a.catchLoc) return o(a.catchLoc, !0);
                } else {
                  if (!l) throw Error("try statement without catch or finally");
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
                return this.complete(r.completion, r.afterLoc), N(r), m;
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
              (this.delegate = { iterator: A(e), resultName: r, nextLoc: n }),
              "next" === this.method && (this.arg = t),
              m
            );
          },
        }),
        e
      );
    }
    function u(t, e) {
      var r =
        ("undefined" != typeof Symbol && t[Symbol.iterator]) || t["@@iterator"];
      if (!r) {
        if (
          Array.isArray(t) ||
          (r = (function (t, e) {
            if (t) {
              if ("string" == typeof t) return l(t, e);
              var r = {}.toString.call(t).slice(8, -1);
              return (
                "Object" === r && t.constructor && (r = t.constructor.name),
                "Map" === r || "Set" === r
                  ? Array.from(t)
                  : "Arguments" === r ||
                      /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)
                    ? l(t, e)
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
    function l(t, e) {
      (null == e || e > t.length) && (e = t.length);
      for (var r = 0, n = Array(e); r < e; r++) n[r] = t[r];
      return n;
    }
    function s(t, e, r, n, o, i, a) {
      try {
        var c = t[i](a),
          u = c.value;
      } catch (t) {
        return void r(t);
      }
      c.done ? e(u) : Promise.resolve(u).then(n, o);
    }
    function f(t, e) {
      for (var r = 0; r < e.length; r++) {
        var n = e[r];
        (n.enumerable = n.enumerable || !1),
          (n.configurable = !0),
          "value" in n && (n.writable = !0),
          Object.defineProperty(t, h(n.key), n);
      }
    }
    function h(t) {
      var e = (function (t) {
        if ("object" != a(t) || !t) return t;
        var e = t[Symbol.toPrimitive];
        if (void 0 !== e) {
          var r = e.call(t, "string");
          if ("object" != a(r)) return r;
          throw new TypeError("@@toPrimitive must return a primitive value.");
        }
        return String(t);
      })(t);
      return "symbol" == a(e) ? e : e + "";
    }
    var p = (function () {
      return (
        (t = function t(e) {
          !(function (t, e) {
            if (!(t instanceof e))
              throw new TypeError("Cannot call a class as a function");
          })(this, t),
            (this.element = e),
            (this.items = []);
          for (var r = 0; r < 3; r++) {
            var n = document.createElement("div");
            (n.className = "sym"),
              this.element.appendChild(n),
              this.items.push(n);
          }
        }),
        (e = [
          {
            key: "setSymbols",
            value: function (t) {
              for (var e = 0; e < 3; e++) {
                var r = t[e] || i.random(),
                  n = i.getData(r);
                (this.items[e].textContent = n.icon),
                  (this.items[e].style.cssText = "background:"
                    .concat(n.bg, ";color:")
                    .concat(n.color, ";"));
              }
            },
          },
          {
            key: "spin",
            value:
              ((r = c().mark(function t(e) {
                var r,
                  n,
                  o = this,
                  a = arguments;
                return c().wrap(function (t) {
                  for (;;)
                    switch ((t.prev = t.next)) {
                      case 0:
                        return (
                          (r = a.length > 1 && void 0 !== a[1] ? a[1] : 600),
                          (n = Date.now()),
                          t.abrupt(
                            "return",
                            new Promise(function (t) {
                              var a = setInterval(function () {
                                if (Date.now() - n >= r)
                                  return (
                                    clearInterval(a), o.setSymbols(e), void t()
                                  );
                                var c,
                                  l = u(o.items);
                                try {
                                  for (l.s(); !(c = l.n()).done; ) {
                                    var s = c.value,
                                      f = i.random(),
                                      h = i.getData(f);
                                    (s.textContent = h.icon),
                                      (s.style.cssText = "background:"
                                        .concat(h.bg, ";color:")
                                        .concat(h.color, ";"));
                                  }
                                } catch (t) {
                                  l.e(t);
                                } finally {
                                  l.f();
                                }
                              }, 60);
                            }),
                          )
                        );
                      case 3:
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
                    s(i, n, o, a, c, "next", t);
                  }
                  function c(t) {
                    s(i, n, o, a, c, "throw", t);
                  }
                  a(void 0);
                });
              }),
              function (t) {
                return n.apply(this, arguments);
              }),
          },
        ]),
        e && f(t.prototype, e),
        Object.defineProperty(t, "prototype", { writable: !1 }),
        t
      );
      var t, e, r, n;
    })();
    function y(t) {
      return (
        (y =
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
        y(t)
      );
    }
    function v(t, e) {
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
              l = !1;
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
              (l = !0), (o = t);
            } finally {
              try {
                if (
                  !u &&
                  null != r.return &&
                  ((a = r.return()), Object(a) !== a)
                )
                  return;
              } finally {
                if (l) throw o;
              }
            }
            return c;
          }
        })(t, e) ||
        (function (t, e) {
          if (t) {
            if ("string" == typeof t) return d(t, e);
            var r = {}.toString.call(t).slice(8, -1);
            return (
              "Object" === r && t.constructor && (r = t.constructor.name),
              "Map" === r || "Set" === r
                ? Array.from(t)
                : "Arguments" === r ||
                    /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)
                  ? d(t, e)
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
    function d(t, e) {
      (null == e || e > t.length) && (e = t.length);
      for (var r = 0, n = Array(e); r < e; r++) n[r] = t[r];
      return n;
    }
    function g() {
      g = function () {
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
      function l(t, e, r) {
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
        l({}, "");
      } catch (t) {
        l = function (t, e, r) {
          return (t[e] = r);
        };
      }
      function s(t, e, r, n) {
        var i = e && e.prototype instanceof b ? e : b,
          a = Object.create(i.prototype),
          c = new G(n || []);
        return o(a, "_invoke", { value: P(t, r, c) }), a;
      }
      function f(t, e, r) {
        try {
          return { type: "normal", arg: t.call(e, r) };
        } catch (t) {
          return { type: "throw", arg: t };
        }
      }
      e.wrap = s;
      var h = "suspendedStart",
        p = "suspendedYield",
        v = "executing",
        d = "completed",
        m = {};
      function b() {}
      function w() {}
      function x() {}
      var L = {};
      l(L, a, function () {
        return this;
      });
      var E = Object.getPrototypeOf,
        S = E && E(E(A([])));
      S && S !== r && n.call(S, a) && (L = S);
      var k = (x.prototype = b.prototype = Object.create(L));
      function j(t) {
        ["next", "throw", "return"].forEach(function (e) {
          l(t, e, function (t) {
            return this._invoke(e, t);
          });
        });
      }
      function O(t, e) {
        function r(o, i, a, c) {
          var u = f(t[o], t, i);
          if ("throw" !== u.type) {
            var l = u.arg,
              s = l.value;
            return s && "object" == y(s) && n.call(s, "__await")
              ? e.resolve(s.__await).then(
                  function (t) {
                    r("next", t, a, c);
                  },
                  function (t) {
                    r("throw", t, a, c);
                  },
                )
              : e.resolve(s).then(
                  function (t) {
                    (l.value = t), a(l);
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
      function P(e, r, n) {
        var o = h;
        return function (i, a) {
          if (o === v) throw Error("Generator is already running");
          if (o === d) {
            if ("throw" === i) throw a;
            return { value: t, done: !0 };
          }
          for (n.method = i, n.arg = a; ; ) {
            var c = n.delegate;
            if (c) {
              var u = _(c, n);
              if (u) {
                if (u === m) continue;
                return u;
              }
            }
            if ("next" === n.method) n.sent = n._sent = n.arg;
            else if ("throw" === n.method) {
              if (o === h) throw ((o = d), n.arg);
              n.dispatchException(n.arg);
            } else "return" === n.method && n.abrupt("return", n.arg);
            o = v;
            var l = f(e, r, n);
            if ("normal" === l.type) {
              if (((o = n.done ? d : p), l.arg === m)) continue;
              return { value: l.arg, done: n.done };
            }
            "throw" === l.type &&
              ((o = d), (n.method = "throw"), (n.arg = l.arg));
          }
        };
      }
      function _(e, r) {
        var n = r.method,
          o = e.iterator[n];
        if (o === t)
          return (
            (r.delegate = null),
            ("throw" === n &&
              e.iterator.return &&
              ((r.method = "return"),
              (r.arg = t),
              _(e, r),
              "throw" === r.method)) ||
              ("return" !== n &&
                ((r.method = "throw"),
                (r.arg = new TypeError(
                  "The iterator does not provide a '" + n + "' method",
                )))),
            m
          );
        var i = f(o, e.iterator, r.arg);
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
      function T(t) {
        var e = { tryLoc: t[0] };
        1 in t && (e.catchLoc = t[1]),
          2 in t && ((e.finallyLoc = t[2]), (e.afterLoc = t[3])),
          this.tryEntries.push(e);
      }
      function N(t) {
        var e = t.completion || {};
        (e.type = "normal"), delete e.arg, (t.completion = e);
      }
      function G(t) {
        (this.tryEntries = [{ tryLoc: "root" }]),
          t.forEach(T, this),
          this.reset(!0);
      }
      function A(e) {
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
        throw new TypeError(y(e) + " is not iterable");
      }
      return (
        (w.prototype = x),
        o(k, "constructor", { value: x, configurable: !0 }),
        o(x, "constructor", { value: w, configurable: !0 }),
        (w.displayName = l(x, u, "GeneratorFunction")),
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
              ? Object.setPrototypeOf(t, x)
              : ((t.__proto__ = x), l(t, u, "GeneratorFunction")),
            (t.prototype = Object.create(k)),
            t
          );
        }),
        (e.awrap = function (t) {
          return { __await: t };
        }),
        j(O.prototype),
        l(O.prototype, c, function () {
          return this;
        }),
        (e.AsyncIterator = O),
        (e.async = function (t, r, n, o, i) {
          void 0 === i && (i = Promise);
          var a = new O(s(t, r, n, o), i);
          return e.isGeneratorFunction(r)
            ? a
            : a.next().then(function (t) {
                return t.done ? t.value : a.next();
              });
        }),
        j(k),
        l(k, u, "Generator"),
        l(k, a, function () {
          return this;
        }),
        l(k, "toString", function () {
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
        (e.values = A),
        (G.prototype = {
          constructor: G,
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
                  l = n.call(a, "finallyLoc");
                if (u && l) {
                  if (this.prev < a.catchLoc) return o(a.catchLoc, !0);
                  if (this.prev < a.finallyLoc) return o(a.finallyLoc);
                } else if (u) {
                  if (this.prev < a.catchLoc) return o(a.catchLoc, !0);
                } else {
                  if (!l) throw Error("try statement without catch or finally");
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
                return this.complete(r.completion, r.afterLoc), N(r), m;
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
              (this.delegate = { iterator: A(e), resultName: r, nextLoc: n }),
              "next" === this.method && (this.arg = t),
              m
            );
          },
        }),
        e
      );
    }
    function m(t, e, r, n, o, i, a) {
      try {
        var c = t[i](a),
          u = c.value;
      } catch (t) {
        return void r(t);
      }
      c.done ? e(u) : Promise.resolve(u).then(n, o);
    }
    function b(t) {
      return function () {
        var e = this,
          r = arguments;
        return new Promise(function (n, o) {
          var i = t.apply(e, r);
          function a(t) {
            m(i, n, o, a, c, "next", t);
          }
          function c(t) {
            m(i, n, o, a, c, "throw", t);
          }
          a(void 0);
        });
      };
    }
    var w = window.location.origin;
    function x(t, e) {
      return L.apply(this, arguments);
    }
    function L() {
      return (L = b(
        g().mark(function t(e, r) {
          var n, o, i, a, c, u, l;
          return g().wrap(
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
                      (a = v(i[o], 2)), (c = a[0]), (u = a[1]), n.append(c, u);
                    return (
                      (t.next = 5),
                      fetch(w + e, {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/x-www-form-urlencoded",
                        },
                        body: n.toString(),
                      })
                    );
                  case 5:
                    return (l = t.sent), (t.next = 8), l.json();
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
    function E(t) {
      return S.apply(this, arguments);
    }
    function S() {
      return (S = b(
        g().mark(function t(e) {
          var r;
          return g().wrap(
            function (t) {
              for (;;)
                switch ((t.prev = t.next)) {
                  case 0:
                    return (t.prev = 0), (t.next = 3), fetch(w + e);
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
    const k = function (t, e) {
        return b(
          g().mark(function r() {
            return g().wrap(function (r) {
              for (;;)
                switch ((r.prev = r.next)) {
                  case 0:
                    return r.abrupt(
                      "return",
                      x("/api/login", { username: t, pin: e }),
                    );
                  case 1:
                  case "end":
                    return r.stop();
                }
            }, r);
          }),
        )();
      },
      j = function (t, e, r) {
        return b(
          g().mark(function n() {
            return g().wrap(function (n) {
              for (;;)
                switch ((n.prev = n.next)) {
                  case 0:
                    return n.abrupt(
                      "return",
                      x("/api/account", { username: t, pin: e, balance: r }),
                    );
                  case 1:
                  case "end":
                    return n.stop();
                }
            }, n);
          }),
        )();
      },
      O = function () {
        return b(
          g().mark(function t() {
            return g().wrap(function (t) {
              for (;;)
                switch ((t.prev = t.next)) {
                  case 0:
                    return t.abrupt("return", E("/api/config"));
                  case 1:
                  case "end":
                    return t.stop();
                }
            }, t);
          }),
        )();
      },
      P = function (t) {
        return String(t).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      };
    function _(t) {
      return (
        (_ =
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
        _(t)
      );
    }
    function T() {
      T = function () {
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
      function l(t, e, r) {
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
        l({}, "");
      } catch (t) {
        l = function (t, e, r) {
          return (t[e] = r);
        };
      }
      function s(t, e, r, n) {
        var i = e && e.prototype instanceof g ? e : g,
          a = Object.create(i.prototype),
          c = new G(n || []);
        return o(a, "_invoke", { value: j(t, r, c) }), a;
      }
      function f(t, e, r) {
        try {
          return { type: "normal", arg: t.call(e, r) };
        } catch (t) {
          return { type: "throw", arg: t };
        }
      }
      e.wrap = s;
      var h = "suspendedStart",
        p = "suspendedYield",
        y = "executing",
        v = "completed",
        d = {};
      function g() {}
      function m() {}
      function b() {}
      var w = {};
      l(w, a, function () {
        return this;
      });
      var x = Object.getPrototypeOf,
        L = x && x(x(A([])));
      L && L !== r && n.call(L, a) && (w = L);
      var E = (b.prototype = g.prototype = Object.create(w));
      function S(t) {
        ["next", "throw", "return"].forEach(function (e) {
          l(t, e, function (t) {
            return this._invoke(e, t);
          });
        });
      }
      function k(t, e) {
        function r(o, i, a, c) {
          var u = f(t[o], t, i);
          if ("throw" !== u.type) {
            var l = u.arg,
              s = l.value;
            return s && "object" == _(s) && n.call(s, "__await")
              ? e.resolve(s.__await).then(
                  function (t) {
                    r("next", t, a, c);
                  },
                  function (t) {
                    r("throw", t, a, c);
                  },
                )
              : e.resolve(s).then(
                  function (t) {
                    (l.value = t), a(l);
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
      function j(e, r, n) {
        var o = h;
        return function (i, a) {
          if (o === y) throw Error("Generator is already running");
          if (o === v) {
            if ("throw" === i) throw a;
            return { value: t, done: !0 };
          }
          for (n.method = i, n.arg = a; ; ) {
            var c = n.delegate;
            if (c) {
              var u = O(c, n);
              if (u) {
                if (u === d) continue;
                return u;
              }
            }
            if ("next" === n.method) n.sent = n._sent = n.arg;
            else if ("throw" === n.method) {
              if (o === h) throw ((o = v), n.arg);
              n.dispatchException(n.arg);
            } else "return" === n.method && n.abrupt("return", n.arg);
            o = y;
            var l = f(e, r, n);
            if ("normal" === l.type) {
              if (((o = n.done ? v : p), l.arg === d)) continue;
              return { value: l.arg, done: n.done };
            }
            "throw" === l.type &&
              ((o = v), (n.method = "throw"), (n.arg = l.arg));
          }
        };
      }
      function O(e, r) {
        var n = r.method,
          o = e.iterator[n];
        if (o === t)
          return (
            (r.delegate = null),
            ("throw" === n &&
              e.iterator.return &&
              ((r.method = "return"),
              (r.arg = t),
              O(e, r),
              "throw" === r.method)) ||
              ("return" !== n &&
                ((r.method = "throw"),
                (r.arg = new TypeError(
                  "The iterator does not provide a '" + n + "' method",
                )))),
            d
          );
        var i = f(o, e.iterator, r.arg);
        if ("throw" === i.type)
          return (r.method = "throw"), (r.arg = i.arg), (r.delegate = null), d;
        var a = i.arg;
        return a
          ? a.done
            ? ((r[e.resultName] = a.value),
              (r.next = e.nextLoc),
              "return" !== r.method && ((r.method = "next"), (r.arg = t)),
              (r.delegate = null),
              d)
            : a
          : ((r.method = "throw"),
            (r.arg = new TypeError("iterator result is not an object")),
            (r.delegate = null),
            d);
      }
      function P(t) {
        var e = { tryLoc: t[0] };
        1 in t && (e.catchLoc = t[1]),
          2 in t && ((e.finallyLoc = t[2]), (e.afterLoc = t[3])),
          this.tryEntries.push(e);
      }
      function N(t) {
        var e = t.completion || {};
        (e.type = "normal"), delete e.arg, (t.completion = e);
      }
      function G(t) {
        (this.tryEntries = [{ tryLoc: "root" }]),
          t.forEach(P, this),
          this.reset(!0);
      }
      function A(e) {
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
        throw new TypeError(_(e) + " is not iterable");
      }
      return (
        (m.prototype = b),
        o(E, "constructor", { value: b, configurable: !0 }),
        o(b, "constructor", { value: m, configurable: !0 }),
        (m.displayName = l(b, u, "GeneratorFunction")),
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
              : ((t.__proto__ = b), l(t, u, "GeneratorFunction")),
            (t.prototype = Object.create(E)),
            t
          );
        }),
        (e.awrap = function (t) {
          return { __await: t };
        }),
        S(k.prototype),
        l(k.prototype, c, function () {
          return this;
        }),
        (e.AsyncIterator = k),
        (e.async = function (t, r, n, o, i) {
          void 0 === i && (i = Promise);
          var a = new k(s(t, r, n, o), i);
          return e.isGeneratorFunction(r)
            ? a
            : a.next().then(function (t) {
                return t.done ? t.value : a.next();
              });
        }),
        S(E),
        l(E, u, "Generator"),
        l(E, a, function () {
          return this;
        }),
        l(E, "toString", function () {
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
        (e.values = A),
        (G.prototype = {
          constructor: G,
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
                  l = n.call(a, "finallyLoc");
                if (u && l) {
                  if (this.prev < a.catchLoc) return o(a.catchLoc, !0);
                  if (this.prev < a.finallyLoc) return o(a.finallyLoc);
                } else if (u) {
                  if (this.prev < a.catchLoc) return o(a.catchLoc, !0);
                } else {
                  if (!l) throw Error("try statement without catch or finally");
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
                ? ((this.method = "next"), (this.next = i.finallyLoc), d)
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
              d
            );
          },
          finish: function (t) {
            for (var e = this.tryEntries.length - 1; e >= 0; --e) {
              var r = this.tryEntries[e];
              if (r.finallyLoc === t)
                return this.complete(r.completion, r.afterLoc), N(r), d;
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
              (this.delegate = { iterator: A(e), resultName: r, nextLoc: n }),
              "next" === this.method && (this.arg = t),
              d
            );
          },
        }),
        e
      );
    }
    function N(t, e, r, n, o, i, a) {
      try {
        var c = t[i](a),
          u = c.value;
      } catch (t) {
        return void r(t);
      }
      c.done ? e(u) : Promise.resolve(u).then(n, o);
    }
    function G(t) {
      return function () {
        var e = this,
          r = arguments;
        return new Promise(function (n, o) {
          var i = t.apply(e, r);
          function a(t) {
            N(i, n, o, a, c, "next", t);
          }
          function c(t) {
            N(i, n, o, a, c, "throw", t);
          }
          a(void 0);
        });
      };
    }
    function A(t, e) {
      for (var r = 0; r < e.length; r++) {
        var n = e[r];
        (n.enumerable = n.enumerable || !1),
          (n.configurable = !0),
          "value" in n && (n.writable = !0),
          Object.defineProperty(t, C(n.key), n);
      }
    }
    function C(t) {
      var e = (function (t) {
        if ("object" != _(t) || !t) return t;
        var e = t[Symbol.toPrimitive];
        if (void 0 !== e) {
          var r = e.call(t, "string");
          if ("object" != _(r)) return r;
          throw new TypeError("@@toPrimitive must return a primitive value.");
        }
        return String(t);
      })(t);
      return "symbol" == _(e) ? e : e + "";
    }
    new ((function () {
      return (
        (t = function t() {
          var e = this;
          !(function (t, e) {
            if (!(t instanceof e))
              throw new TypeError("Cannot call a class as a function");
          })(this, t),
            (this.user = null),
            (this.pin = null),
            (this.money = 0),
            (this.bet = 100),
            (this.config = null),
            (this.spinning = !1),
            (this.el = {});
          for (
            var r = 0,
              n = [
                "loginScreen",
                "gameScreen",
                "loginUser",
                "loginPin",
                "loginBtn",
                "loginError",
                "logoutBtn",
                "playerMoney",
                "betDisplay",
                "winText",
                "playerName",
                "spinBtn",
                "autoplay",
              ];
            r < n.length;
            r++
          ) {
            var o = n[r];
            this.el[o] = document.getElementById(o);
          }
          (this.reelElements = document.querySelectorAll(".reel")),
            (this.reels = Array.from(this.reelElements).map(function (t) {
              return new p(t);
            })),
            this.el.loginBtn.addEventListener("click", function () {
              return e.doLogin();
            }),
            this.el.loginPin.addEventListener("keydown", function (t) {
              "Enter" === t.key && e.doLogin();
            }),
            this.el.logoutBtn.addEventListener("click", function () {
              return e.showLogin();
            }),
            this.el.spinBtn.addEventListener("click", function () {
              return e.spin();
            }),
            this.el.autoplay.addEventListener("change", function () {
              e.el.autoplay.checked &&
                !e.spinning &&
                e.money >= e.bet &&
                e.spin();
            }),
            this.showLogin();
        }),
        (e = [
          {
            key: "showLogin",
            value: function () {
              this.el.gameScreen.classList.remove("active"),
                (this.el.loginScreen.style.display = "flex"),
                (this.el.loginUser.value = ""),
                (this.el.loginPin.value = ""),
                (this.el.loginError.textContent = ""),
                (this.user = null),
                (this.pin = null),
                (this.spinning = !1);
            },
          },
          {
            key: "doLogin",
            value:
              ((o = G(
                T().mark(function t() {
                  var e, r, n;
                  return T().wrap(
                    function (t) {
                      for (;;)
                        switch ((t.prev = t.next)) {
                          case 0:
                            if (
                              ((e = this.el.loginUser.value.trim()),
                              (r = this.el.loginPin.value.trim()),
                              e && r)
                            ) {
                              t.next = 5;
                              break;
                            }
                            return (
                              (this.el.loginError.textContent =
                                "Isi username dan PIN"),
                              t.abrupt("return")
                            );
                          case 5:
                            return (
                              (this.el.loginBtn.disabled = !0),
                              (this.el.loginBtn.textContent = "Connecting..."),
                              (t.next = 9),
                              k(e, r)
                            );
                          case 9:
                            if ((n = t.sent) && n.success) {
                              t.next = 15;
                              break;
                            }
                            return (
                              (this.el.loginError.textContent =
                                (n && n.error) || "Login gagal"),
                              (this.el.loginBtn.disabled = !1),
                              (this.el.loginBtn.textContent = "PLAY"),
                              t.abrupt("return")
                            );
                          case 15:
                            (this.user = e),
                              (this.pin = r),
                              (this.config = n.config || {
                                winRate: 0.15,
                                payoutMultiplier: 3,
                                startingMoney: 1e3,
                                betAmount: 100,
                              }),
                              (this.money =
                                (n.account && n.account.balance) ||
                                this.config.startingMoney ||
                                1e3),
                              (this.bet = this.config.betAmount || 100),
                              (this.el.loginBtn.disabled = !1),
                              (this.el.loginBtn.textContent = "PLAY"),
                              this.startGame();
                          case 23:
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
                return o.apply(this, arguments);
              }),
          },
          {
            key: "startGame",
            value: function () {
              (this.el.loginScreen.style.display = "none"),
                (this.el.gameScreen.style.display = ""),
                this.el.gameScreen.classList.add("active"),
                (this.el.spinBtn.disabled = !1),
                this.el.playerName &&
                  (this.el.playerName.textContent = this.user),
                this.updateUI(),
                this.showMsg("Mainkan " + this.user + "!", "#FFD700");
            },
          },
          {
            key: "updateUI",
            value: function () {
              this.el.playerMoney &&
                (this.el.playerMoney.textContent = P(this.money)),
                this.el.betDisplay &&
                  (this.el.betDisplay.textContent = P(this.bet));
            },
          },
          {
            key: "showMsg",
            value: function (t, e) {
              this.el.winText &&
                ((this.el.winText.textContent = t),
                (this.el.winText.style.color = e || "#FFD700"));
            },
          },
          {
            key: "refreshConfig",
            value:
              ((n = G(
                T().mark(function t() {
                  var e;
                  return T().wrap(
                    function (t) {
                      for (;;)
                        switch ((t.prev = t.next)) {
                          case 0:
                            return (t.prev = 0), (t.next = 3), O();
                          case 3:
                            (e = t.sent) && e.winRate && (this.config = e),
                              (t.next = 9);
                            break;
                          case 7:
                            (t.prev = 7), (t.t0 = t.catch(0));
                          case 9:
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
                return n.apply(this, arguments);
              }),
          },
          {
            key: "spin",
            value:
              ((r = G(
                T().mark(function t() {
                  var e,
                    r,
                    n,
                    o,
                    a,
                    c,
                    u,
                    l,
                    s,
                    f = this;
                  return T().wrap(
                    function (t) {
                      for (;;)
                        switch ((t.prev = t.next)) {
                          case 0:
                            if (!this.spinning && this.user) {
                              t.next = 2;
                              break;
                            }
                            return t.abrupt("return");
                          case 2:
                            if (!(this.money < this.bet)) {
                              t.next = 6;
                              break;
                            }
                            return (
                              this.showMsg(
                                "💸 Uang habis! Minta admin isi ulang.",
                                "#ff4444",
                              ),
                              (this.el.spinBtn.disabled = !0),
                              t.abrupt("return")
                            );
                          case 6:
                            return (
                              (this.spinning = !0),
                              (this.el.spinBtn.disabled = !0),
                              (this.money -= this.bet),
                              this.updateUI(),
                              this.showMsg("Memutar...", "#888"),
                              j(this.user, this.pin, this.money),
                              (t.next = 14),
                              this.refreshConfig()
                            );
                          case 14:
                            return (
                              (e =
                                (this.config && this.config.winRate) || 0.15),
                              (r =
                                (this.config && this.config.payoutMultiplier) ||
                                3),
                              (n = Math.random() < e),
                              (a = 0),
                              n
                                ? ((c = i.random()),
                                  (o = [
                                    [this.randExcept(c), c, this.randExcept(c)],
                                    [this.randExcept(c), c, this.randExcept(c)],
                                    [this.randExcept(c), c, this.randExcept(c)],
                                  ]),
                                  (u = i.getData(c).mult * r),
                                  (a = Math.floor(this.bet * u)),
                                  (this.money += a))
                                : (o = [
                                    [i.random(), i.random(), i.random()],
                                    [i.random(), i.random(), i.random()],
                                    [i.random(), i.random(), i.random()],
                                  ]),
                              (l = [0, 150, 300]),
                              (s = this.reels.map(function (t, e) {
                                return new Promise(function (r) {
                                  setTimeout(function () {
                                    t.spin(o[e]).then(r);
                                  }, l[e]);
                                });
                              })),
                              (t.next = 23),
                              Promise.all(s)
                            );
                          case 23:
                            this.updateUI(),
                              n
                                ? this.showMsg(
                                    "🎉 MENANG " + P(a) + "!",
                                    "#FFD700",
                                  )
                                : this.showMsg("", "#888"),
                              j(this.user, this.pin, this.money),
                              (this.spinning = !1),
                              (this.el.spinBtn.disabled =
                                this.money < this.bet),
                              this.el.autoplay.checked && this.money >= this.bet
                                ? setTimeout(function () {
                                    return f.spin();
                                  }, 300)
                                : (this.el.autoplay.checked = !1);
                          case 29:
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
            key: "randExcept",
            value: function (t) {
              var e;
              do {
                e = i.random();
              } while (e === t);
              return e;
            },
          },
        ]),
        e && A(t.prototype, e),
        Object.defineProperty(t, "prototype", { writable: !1 }),
        t
      );
      var t, e, r, n, o;
    })())();
  })();
})();
