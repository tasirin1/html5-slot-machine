/*! For license information please see bundle.9ead9815cf9dffb03188.js.LICENSE.txt */
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
        s = i.asyncIterator || "@@asyncIterator",
        l = i.toStringTag || "@@toStringTag";
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
        k = E && E(E(C([])));
      k && k !== r && n.call(k, u) && (L = k);
      var S = (x.prototype = b.prototype = Object.create(L));
      function j(t) {
        ["next", "throw", "return"].forEach(function (e) {
          f(t, e, function (t) {
            return this._invoke(e, t);
          });
        });
      }
      function O(t, e) {
        function r(o, i, c, u) {
          var s = p(t[o], t, i);
          if ("throw" !== s.type) {
            var l = s.arg,
              f = l.value;
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
                    (l.value = t), c(l);
                  },
                  function (t) {
                    return r("throw", t, c, u);
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
            var s = p(e, r, n);
            if ("normal" === s.type) {
              if (((o = n.done ? g : v), s.arg === m)) continue;
              return { value: s.arg, done: n.done };
            }
            "throw" === s.type &&
              ((o = g), (n.method = "throw"), (n.arg = s.arg));
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
      function C(e) {
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
        o(S, "constructor", { value: x, configurable: !0 }),
        o(x, "constructor", { value: w, configurable: !0 }),
        (w.displayName = f(x, l, "GeneratorFunction")),
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
              : ((t.__proto__ = x), f(t, l, "GeneratorFunction")),
            (t.prototype = Object.create(S)),
            t
          );
        }),
        (e.awrap = function (t) {
          return { __await: t };
        }),
        j(O.prototype),
        f(O.prototype, s, function () {
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
        j(S),
        f(S, l, "Generator"),
        f(S, u, function () {
          return this;
        }),
        f(S, "toString", function () {
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
        (e.values = C),
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
              (this.delegate = { iterator: C(e), resultName: r, nextLoc: n }),
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
              if ("string" == typeof t) return s(t, e);
              var r = {}.toString.call(t).slice(8, -1);
              return (
                "Object" === r && t.constructor && (r = t.constructor.name),
                "Map" === r || "Set" === r
                  ? Array.from(t)
                  : "Arguments" === r ||
                      /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)
                    ? s(t, e)
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
    function s(t, e) {
      (null == e || e > t.length) && (e = t.length);
      for (var r = 0, n = Array(e); r < e; r++) n[r] = t[r];
      return n;
    }
    function l(t, e, r, n, o, i, a) {
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
                                  s = u(o.items);
                                try {
                                  for (s.s(); !(c = s.n()).done; ) {
                                    var l = c.value,
                                      f = i.random(),
                                      h = i.getData(f);
                                    (l.textContent = h.icon),
                                      (l.style.cssText = "background:"
                                        .concat(h.bg, ";color:")
                                        .concat(h.color, ";"));
                                  }
                                } catch (t) {
                                  s.e(t);
                                } finally {
                                  s.f();
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
                    l(i, n, o, a, c, "next", t);
                  }
                  function c(t) {
                    l(i, n, o, a, c, "throw", t);
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
    function v() {
      v = function () {
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
      e.wrap = l;
      var h = "suspendedStart",
        p = "suspendedYield",
        d = "executing",
        g = "completed",
        m = {};
      function b() {}
      function w() {}
      function x() {}
      var L = {};
      s(L, a, function () {
        return this;
      });
      var E = Object.getPrototypeOf,
        k = E && E(E(C([])));
      k && k !== r && n.call(k, a) && (L = k);
      var S = (x.prototype = b.prototype = Object.create(L));
      function j(t) {
        ["next", "throw", "return"].forEach(function (e) {
          s(t, e, function (t) {
            return this._invoke(e, t);
          });
        });
      }
      function O(t, e) {
        function r(o, i, a, c) {
          var u = f(t[o], t, i);
          if ("throw" !== u.type) {
            var s = u.arg,
              l = s.value;
            return l && "object" == y(l) && n.call(l, "__await")
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
      function P(e, r, n) {
        var o = h;
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
              if (o === h) throw ((o = g), n.arg);
              n.dispatchException(n.arg);
            } else "return" === n.method && n.abrupt("return", n.arg);
            o = d;
            var s = f(e, r, n);
            if ("normal" === s.type) {
              if (((o = n.done ? g : p), s.arg === m)) continue;
              return { value: s.arg, done: n.done };
            }
            "throw" === s.type &&
              ((o = g), (n.method = "throw"), (n.arg = s.arg));
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
      function C(e) {
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
        o(S, "constructor", { value: x, configurable: !0 }),
        o(x, "constructor", { value: w, configurable: !0 }),
        (w.displayName = s(x, u, "GeneratorFunction")),
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
              : ((t.__proto__ = x), s(t, u, "GeneratorFunction")),
            (t.prototype = Object.create(S)),
            t
          );
        }),
        (e.awrap = function (t) {
          return { __await: t };
        }),
        j(O.prototype),
        s(O.prototype, c, function () {
          return this;
        }),
        (e.AsyncIterator = O),
        (e.async = function (t, r, n, o, i) {
          void 0 === i && (i = Promise);
          var a = new O(l(t, r, n, o), i);
          return e.isGeneratorFunction(r)
            ? a
            : a.next().then(function (t) {
                return t.done ? t.value : a.next();
              });
        }),
        j(S),
        s(S, u, "Generator"),
        s(S, a, function () {
          return this;
        }),
        s(S, "toString", function () {
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
        (e.values = C),
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
              (this.delegate = { iterator: C(e), resultName: r, nextLoc: n }),
              "next" === this.method && (this.arg = t),
              m
            );
          },
        }),
        e
      );
    }
    function d(t, e, r, n, o, i, a) {
      try {
        var c = t[i](a),
          u = c.value;
      } catch (t) {
        return void r(t);
      }
      c.done ? e(u) : Promise.resolve(u).then(n, o);
    }
    function g(t) {
      return function () {
        var e = this,
          r = arguments;
        return new Promise(function (n, o) {
          var i = t.apply(e, r);
          function a(t) {
            d(i, n, o, a, c, "next", t);
          }
          function c(t) {
            d(i, n, o, a, c, "throw", t);
          }
          a(void 0);
        });
      };
    }
    var m = window.location.origin;
    function b(t, e) {
      return w.apply(this, arguments);
    }
    function w() {
      return (w = g(
        v().mark(function t(e, r) {
          var n;
          return v().wrap(
            function (t) {
              for (;;)
                switch ((t.prev = t.next)) {
                  case 0:
                    return (
                      (t.prev = 0),
                      (t.next = 3),
                      fetch(m + e, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(r),
                      })
                    );
                  case 3:
                    return (n = t.sent), (t.next = 6), n.json();
                  case 6:
                    return t.abrupt("return", t.sent);
                  case 9:
                    return (
                      (t.prev = 9),
                      (t.t0 = t.catch(0)),
                      t.abrupt("return", {
                        success: !1,
                        error: "Connection failed",
                      })
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
    function x(t) {
      return L.apply(this, arguments);
    }
    function L() {
      return (L = g(
        v().mark(function t(e) {
          var r;
          return v().wrap(
            function (t) {
              for (;;)
                switch ((t.prev = t.next)) {
                  case 0:
                    return (t.prev = 0), (t.next = 3), fetch(m + e);
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
    const E = function (t, e) {
        return g(
          v().mark(function r() {
            return v().wrap(function (r) {
              for (;;)
                switch ((r.prev = r.next)) {
                  case 0:
                    return r.abrupt(
                      "return",
                      b("/api/login", { username: t, pin: e }),
                    );
                  case 1:
                  case "end":
                    return r.stop();
                }
            }, r);
          }),
        )();
      },
      k = function (t, e, r) {
        return g(
          v().mark(function n() {
            return v().wrap(function (n) {
              for (;;)
                switch ((n.prev = n.next)) {
                  case 0:
                    return n.abrupt(
                      "return",
                      b("/api/account", { username: t, pin: e, balance: r }),
                    );
                  case 1:
                  case "end":
                    return n.stop();
                }
            }, n);
          }),
        )();
      },
      S = function () {
        return g(
          v().mark(function t() {
            return v().wrap(function (t) {
              for (;;)
                switch ((t.prev = t.next)) {
                  case 0:
                    return t.abrupt("return", x("/api/config"));
                  case 1:
                  case "end":
                    return t.stop();
                }
            }, t);
          }),
        )();
      },
      j = function (t) {
        return String(t).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      };
    function O(t) {
      return (
        (O =
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
        O(t)
      );
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
      e.wrap = l;
      var h = "suspendedStart",
        p = "suspendedYield",
        y = "executing",
        v = "completed",
        d = {};
      function g() {}
      function m() {}
      function b() {}
      var w = {};
      s(w, a, function () {
        return this;
      });
      var x = Object.getPrototypeOf,
        L = x && x(x(C([])));
      L && L !== r && n.call(L, a) && (w = L);
      var E = (b.prototype = g.prototype = Object.create(w));
      function k(t) {
        ["next", "throw", "return"].forEach(function (e) {
          s(t, e, function (t) {
            return this._invoke(e, t);
          });
        });
      }
      function S(t, e) {
        function r(o, i, a, c) {
          var u = f(t[o], t, i);
          if ("throw" !== u.type) {
            var s = u.arg,
              l = s.value;
            return l && "object" == O(l) && n.call(l, "__await")
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
              var u = _(c, n);
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
            var s = f(e, r, n);
            if ("normal" === s.type) {
              if (((o = n.done ? v : p), s.arg === d)) continue;
              return { value: s.arg, done: n.done };
            }
            "throw" === s.type &&
              ((o = v), (n.method = "throw"), (n.arg = s.arg));
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
      function C(e) {
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
        throw new TypeError(O(e) + " is not iterable");
      }
      return (
        (m.prototype = b),
        o(E, "constructor", { value: b, configurable: !0 }),
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
            (t.prototype = Object.create(E)),
            t
          );
        }),
        (e.awrap = function (t) {
          return { __await: t };
        }),
        k(S.prototype),
        s(S.prototype, c, function () {
          return this;
        }),
        (e.AsyncIterator = S),
        (e.async = function (t, r, n, o, i) {
          void 0 === i && (i = Promise);
          var a = new S(l(t, r, n, o), i);
          return e.isGeneratorFunction(r)
            ? a
            : a.next().then(function (t) {
                return t.done ? t.value : a.next();
              });
        }),
        k(E),
        s(E, u, "Generator"),
        s(E, a, function () {
          return this;
        }),
        s(E, "toString", function () {
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
        (e.values = C),
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
              (this.delegate = { iterator: C(e), resultName: r, nextLoc: n }),
              "next" === this.method && (this.arg = t),
              d
            );
          },
        }),
        e
      );
    }
    function _(t, e, r, n, o, i, a) {
      try {
        var c = t[i](a),
          u = c.value;
      } catch (t) {
        return void r(t);
      }
      c.done ? e(u) : Promise.resolve(u).then(n, o);
    }
    function T(t) {
      return function () {
        var e = this,
          r = arguments;
        return new Promise(function (n, o) {
          var i = t.apply(e, r);
          function a(t) {
            _(i, n, o, a, c, "next", t);
          }
          function c(t) {
            _(i, n, o, a, c, "throw", t);
          }
          a(void 0);
        });
      };
    }
    function N(t, e) {
      for (var r = 0; r < e.length; r++) {
        var n = e[r];
        (n.enumerable = n.enumerable || !1),
          (n.configurable = !0),
          "value" in n && (n.writable = !0),
          Object.defineProperty(t, G(n.key), n);
      }
    }
    function G(t) {
      var e = (function (t) {
        if ("object" != O(t) || !t) return t;
        var e = t[Symbol.toPrimitive];
        if (void 0 !== e) {
          var r = e.call(t, "string");
          if ("object" != O(r)) return r;
          throw new TypeError("@@toPrimitive must return a primitive value.");
        }
        return String(t);
      })(t);
      return "symbol" == O(e) ? e : e + "";
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
              ((o = T(
                P().mark(function t() {
                  var e, r, n;
                  return P().wrap(
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
                              E(e, r)
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
                (this.el.playerMoney.textContent = j(this.money)),
                this.el.betDisplay &&
                  (this.el.betDisplay.textContent = j(this.bet));
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
              ((n = T(
                P().mark(function t() {
                  var e;
                  return P().wrap(
                    function (t) {
                      for (;;)
                        switch ((t.prev = t.next)) {
                          case 0:
                            return (t.prev = 0), (t.next = 3), S();
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
              ((r = T(
                P().mark(function t() {
                  var e,
                    r,
                    n,
                    o,
                    a,
                    c,
                    u,
                    s,
                    l,
                    f = this;
                  return P().wrap(
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
                              k(this.user, this.pin, this.money),
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
                              (s = [0, 150, 300]),
                              (l = this.reels.map(function (t, e) {
                                return new Promise(function (r) {
                                  setTimeout(function () {
                                    t.spin(o[e]).then(r);
                                  }, s[e]);
                                });
                              })),
                              (t.next = 23),
                              Promise.all(l)
                            );
                          case 23:
                            this.updateUI(),
                              n
                                ? this.showMsg(
                                    "🎉 MENANG " + j(a) + "!",
                                    "#FFD700",
                                  )
                                : this.showMsg("", "#888"),
                              k(this.user, this.pin, this.money),
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
        e && N(t.prototype, e),
        Object.defineProperty(t, "prototype", { writable: !1 }),
        t
      );
      var t, e, r, n, o;
    })())();
  })();
})();
