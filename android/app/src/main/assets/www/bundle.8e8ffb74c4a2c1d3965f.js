/*! For license information please see bundle.8e8ffb74c4a2c1d3965f.js.LICENSE.txt */
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
      var r =
        ("undefined" != typeof Symbol && t[Symbol.iterator]) || t["@@iterator"];
      if (!r) {
        if (
          Array.isArray(t) ||
          (r = n(t)) ||
          (e && t && "number" == typeof t.length)
        ) {
          r && (t = r);
          var i = 0,
            o = function () {};
          return {
            s: o,
            n: function () {
              return i >= t.length ? { done: !0 } : { done: !1, value: t[i++] };
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
      var a,
        l = !0,
        s = !1;
      return {
        s: function () {
          r = r.call(t);
        },
        n: function () {
          var t = r.next();
          return (l = t.done), t;
        },
        e: function (t) {
          (s = !0), (a = t);
        },
        f: function () {
          try {
            l || null == r.return || r.return();
          } finally {
            if (s) throw a;
          }
        },
      };
    }
    function n(t, e) {
      if (t) {
        if ("string" == typeof t) return r(t, e);
        var n = {}.toString.call(t).slice(8, -1);
        return (
          "Object" === n && t.constructor && (n = t.constructor.name),
          "Map" === n || "Set" === n
            ? Array.from(t)
            : "Arguments" === n ||
                /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
              ? r(t, e)
              : void 0
        );
      }
    }
    function r(t, e) {
      (null == e || e > t.length) && (e = t.length);
      for (var n = 0, r = Array(e); n < e; n++) r[n] = t[n];
      return r;
    }
    function i(t, e) {
      for (var n = 0; n < e.length; n++) {
        var r = e[n];
        (r.enumerable = r.enumerable || !1),
          (r.configurable = !0),
          "value" in r && (r.writable = !0),
          Object.defineProperty(t, o(r.key), r);
      }
    }
    function o(e) {
      var n = (function (e) {
        if ("object" != t(e) || !e) return e;
        var n = e[Symbol.toPrimitive];
        if (void 0 !== n) {
          var r = n.call(e, "string");
          if ("object" != t(r)) return r;
          throw new TypeError("@@toPrimitive must return a primitive value.");
        }
        return String(e);
      })(e);
      return "symbol" == t(n) ? n : n + "";
    }
    var a = (function () {
      return (
        (t = function t(e, n, r) {
          !(function (t, e) {
            if (!(t instanceof e))
              throw new TypeError("Cannot call a class as a function");
          })(this, t),
            (this.reelEl = e),
            (this.renderFn = n),
            (this.randomFn = r),
            (this.stripEl = null),
            (this.symbolHeight = 50),
            (this.currentOffset = 0),
            (this.totalSymbols = 0),
            (this.isSpinning = !1),
            this._build(),
            this._calcSymbolHeight();
        }),
        (o = [
          {
            key: "_build",
            value: function () {
              (this.reelEl.innerHTML = ""),
                (this.stripEl = document.createElement("div")),
                (this.stripEl.className = "reel-strip"),
                (this.stripEl.style.cssText =
                  "position:absolute;left:0;right:0;top:0;will-change:transform;backface-visibility:hidden;"),
                this.reelEl.appendChild(this.stripEl);
            },
          },
          {
            key: "_calcSymbolHeight",
            value: function () {
              var t = this.reelEl.clientHeight;
              t > 0 && (this.symbolHeight = t / 3);
            },
          },
          {
            key: "loadStrip",
            value: function (t) {
              (this.totalSymbols = t.length), (this.stripEl.innerHTML = "");
              var n,
                r = Math.max(16, Math.min(40, 0.5 * this.symbolHeight)),
                i = e(t);
              try {
                for (i.s(); !(n = i.n()).done; ) {
                  var o = n.value,
                    a = this.renderFn(o),
                    l = document.createElement("div");
                  (l.className = "sym"),
                    (l.textContent = a.icon),
                    (l.style.cssText = [
                      "height:".concat(this.symbolHeight, "px"),
                      "font-size:".concat(r, "px"),
                      "background:".concat(a.bg),
                      "color:".concat(a.color),
                      "display:flex",
                      "align-items:center",
                      "justify-content:center",
                      "font-weight:800",
                      "text-shadow:0 2px 6px rgba(0,0,0,0.5)",
                      "border-bottom:1px solid rgba(255,255,255,0.03)",
                    ].join(";")),
                    this.stripEl.appendChild(l);
                }
              } catch (t) {
                i.e(t);
              } finally {
                i.f();
              }
              (this.stripEl.style.height =
                this.totalSymbols * this.symbolHeight + "px"),
                (this.currentOffset = 0),
                (this.stripEl.style.transform = "translateY(0px)");
            },
          },
          {
            key: "buildSpinStrip",
            value: function (t) {
              for (
                var e =
                    arguments.length > 1 && void 0 !== arguments[1]
                      ? arguments[1]
                      : 25,
                  i = [],
                  o = 0;
                o < e;
                o++
              )
                i.push(this.randomFn());
              return (
                i.push.apply(
                  i,
                  (function (t) {
                    return (
                      (function (t) {
                        if (Array.isArray(t)) return r(t);
                      })(t) ||
                      (function (t) {
                        if (
                          ("undefined" != typeof Symbol &&
                            null != t[Symbol.iterator]) ||
                          null != t["@@iterator"]
                        )
                          return Array.from(t);
                      })(t) ||
                      n(t) ||
                      (function () {
                        throw new TypeError(
                          "Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.",
                        );
                      })()
                    );
                  })(t),
                ),
                i
              );
            },
          },
          {
            key: "spin",
            value: function (t, e) {
              var n = this;
              return new Promise(function (r) {
                if (n.stripEl) {
                  var i = n.buildSpinStrip(t);
                  n.loadStrip(i);
                  var o = -(n.totalSymbols - 3) * n.symbolHeight,
                    a = performance.now();
                  n.isSpinning = !0;
                  var l = function (t) {
                    var i,
                      s = t - a,
                      c = Math.min(s / e, 1);
                    if (c < 0.55) i = (c / 0.55) * 0.88;
                    else {
                      var u = (c - 0.55) / 0.45;
                      i = 0.88 + 0.12 * (1 - Math.pow(1 - u, 4));
                    }
                    i = Math.min(i, 1);
                    var f = 0 + (o - 0) * i;
                    (n.currentOffset = f),
                      (n.stripEl.style.transform = "translateY(".concat(
                        f,
                        "px)",
                      )),
                      c < 1
                        ? requestAnimationFrame(l)
                        : ((n.currentOffset = o),
                          (n.stripEl.style.transform = "translateY(".concat(
                            o,
                            "px)",
                          )),
                          (n.isSpinning = !1),
                          r());
                  };
                  requestAnimationFrame(l);
                } else r();
              });
            },
          },
          {
            key: "updateSize",
            value: function () {
              if (
                (this._calcSymbolHeight(),
                this.stripEl && this.totalSymbols > 0)
              ) {
                this.stripEl.style.height =
                  this.totalSymbols * this.symbolHeight + "px";
                var t,
                  n = Math.max(16, Math.min(40, 0.5 * this.symbolHeight)),
                  r = e(this.stripEl.querySelectorAll(".sym"));
                try {
                  for (r.s(); !(t = r.n()).done; ) {
                    var i = t.value;
                    (i.style.height = this.symbolHeight + "px"),
                      (i.style.fontSize = n + "px");
                  }
                } catch (t) {
                  r.e(t);
                } finally {
                  r.f();
                }
              }
            },
          },
        ]),
        o && i(t.prototype, o),
        Object.defineProperty(t, "prototype", { writable: !1 }),
        t
      );
      var t, o;
    })();
    function l(t, e) {
      var n =
        ("undefined" != typeof Symbol && t[Symbol.iterator]) || t["@@iterator"];
      if (!n) {
        if (
          Array.isArray(t) ||
          (n = c(t)) ||
          (e && t && "number" == typeof t.length)
        ) {
          n && (t = n);
          var r = 0,
            i = function () {};
          return {
            s: i,
            n: function () {
              return r >= t.length ? { done: !0 } : { done: !1, value: t[r++] };
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
      var o,
        a = !0,
        l = !1;
      return {
        s: function () {
          n = n.call(t);
        },
        n: function () {
          var t = n.next();
          return (a = t.done), t;
        },
        e: function (t) {
          (l = !0), (o = t);
        },
        f: function () {
          try {
            a || null == n.return || n.return();
          } finally {
            if (l) throw o;
          }
        },
      };
    }
    function s(t, e) {
      return (
        (function (t) {
          if (Array.isArray(t)) return t;
        })(t) ||
        (function (t, e) {
          var n =
            null == t
              ? null
              : ("undefined" != typeof Symbol && t[Symbol.iterator]) ||
                t["@@iterator"];
          if (null != n) {
            var r,
              i,
              o,
              a,
              l = [],
              s = !0,
              c = !1;
            try {
              if (((o = (n = n.call(t)).next), 0 === e)) {
                if (Object(n) !== n) return;
                s = !1;
              } else
                for (
                  ;
                  !(s = (r = o.call(n)).done) &&
                  (l.push(r.value), l.length !== e);
                  s = !0
                );
            } catch (t) {
              (c = !0), (i = t);
            } finally {
              try {
                if (
                  !s &&
                  null != n.return &&
                  ((a = n.return()), Object(a) !== a)
                )
                  return;
              } finally {
                if (c) throw i;
              }
            }
            return l;
          }
        })(t, e) ||
        c(t, e) ||
        (function () {
          throw new TypeError(
            "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.",
          );
        })()
      );
    }
    function c(t, e) {
      if (t) {
        if ("string" == typeof t) return u(t, e);
        var n = {}.toString.call(t).slice(8, -1);
        return (
          "Object" === n && t.constructor && (n = t.constructor.name),
          "Map" === n || "Set" === n
            ? Array.from(t)
            : "Arguments" === n ||
                /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
              ? u(t, e)
              : void 0
        );
      }
    }
    function u(t, e) {
      (null == e || e > t.length) && (e = t.length);
      for (var n = 0, r = Array(e); n < e; n++) r[n] = t[n];
      return r;
    }
    var f = [
      [
        [0, 0],
        [1, 0],
        [2, 0],
      ],
      [
        [0, 1],
        [1, 1],
        [2, 1],
      ],
      [
        [0, 2],
        [1, 2],
        [2, 2],
      ],
      [
        [0, 0],
        [1, 1],
        [2, 2],
      ],
      [
        [0, 2],
        [1, 1],
        [2, 0],
      ],
    ];
    function h(t, e) {
      var n,
        r =
          null === (n = window.__SYMBOLS_DATA) || void 0 === n ? void 0 : n[t];
      if (null == r || !r.mult) return 0;
      var i = Math.min(Math.max(e - 1, 0), r.mult.length - 1);
      return r.mult[i];
    }
    function p(t, e) {
      if (!t || t.length < 3) return [];
      for (var n, r = [], i = 0; i < f.length; i++) {
        var o,
          a = f[i],
          c = a.map(function (e) {
            var n = s(e, 2),
              r = n[0],
              i = n[1];
            return t[r] && void 0 !== t[r][i] ? t[r][i] : "BAR";
          }),
          u = null,
          p = l(c);
        try {
          for (p.s(); !(o = p.n()).done; ) {
            var y = o.value;
            if ("DIAMOND" !== y && "JACKPOT" !== y) {
              u = y;
              break;
            }
          }
        } catch (t) {
          p.e(t);
        } finally {
          p.f();
        }
        u || (u = "SEVEN"),
          ("DIAMOND" !== u && "JACKPOT" !== u) || (u = "SEVEN");
        var d,
          m = 0,
          v = l(c);
        try {
          for (v.s(); !(d = v.n()).done; ) {
            var g = d.value;
            if (g !== u && "DIAMOND" !== g) break;
            m++;
          }
        } catch (t) {
          v.e(t);
        } finally {
          v.f();
        }
        if (
          !(
            m <
            ((n = u), "CHERRY" === n || "LEMON" === n || "ORANGE" === n ? 2 : 3)
          )
        ) {
          var b = h(u, m);
          b <= 0 ||
            r.push({
              payline: i,
              symbol: u,
              count: m,
              multiplier: b,
              amount: Math.floor(e * b),
              positions: a.slice(0, m),
            });
        }
      }
      return r;
    }
    function y(t) {
      return t.reduce(function (t, e) {
        return t + e.amount;
      }, 0);
    }
    function d(t, e) {
      (null == e || e > t.length) && (e = t.length);
      for (var n = 0, r = Array(e); n < e; n++) r[n] = t[n];
      return r;
    }
    var m = {
        JACKPOT: {
          id: "JACKPOT",
          name: "Jackpot",
          icon: "💰",
          color: "#FFD700",
          bg: "linear-gradient(135deg,#4a0030,#8b0060,#4a0030)",
          mult: [0, 0, 500, 2500, 1e4],
          weight: 2,
        },
        DIAMOND: {
          id: "DIAMOND",
          name: "Diamond",
          icon: "💎",
          color: "#00FFFF",
          bg: "linear-gradient(135deg,#003366,#0099FF,#003366)",
          mult: [0, 0, 200, 1e3, 4e3],
          weight: 3,
        },
        SEVEN: {
          id: "SEVEN",
          name: "Seven",
          icon: "7️⃣",
          color: "#FF0000",
          bg: "linear-gradient(135deg,#1a0000,#CC0000,#1a0000)",
          mult: [0, 0, 100, 500, 2e3],
          weight: 5,
        },
        "3BAR": {
          id: "3BAR",
          name: "Triple BAR",
          icon: "Ⅲ",
          color: "#FFFFFF",
          bg: "linear-gradient(135deg,#1a1a2e,#444466,#1a1a2e)",
          mult: [0, 0, 60, 250, 1e3],
          weight: 6,
        },
        "2BAR": {
          id: "2BAR",
          name: "Double BAR",
          icon: "Ⅱ",
          color: "#CCCCCC",
          bg: "linear-gradient(135deg,#2a2a3e,#555577,#2a2a3e)",
          mult: [0, 0, 40, 150, 600],
          weight: 7,
        },
        BAR: {
          id: "BAR",
          name: "BAR",
          icon: "Ⅰ",
          color: "#AAAAAA",
          bg: "linear-gradient(135deg,#3a3a4e,#666688,#3a3a4e)",
          mult: [0, 0, 25, 100, 400],
          weight: 8,
        },
        BELL: {
          id: "BELL",
          name: "Bell",
          icon: "🔔",
          color: "#FFD700",
          bg: "linear-gradient(135deg,#4a3000,#8B6800,#4a3000)",
          mult: [0, 0, 15, 60, 250],
          weight: 8,
        },
        CHERRY: {
          id: "CHERRY",
          name: "Cherry",
          icon: "🍒",
          color: "#FF6666",
          bg: "linear-gradient(135deg,#660000,#CC0033,#660000)",
          mult: [0, 3, 10, 40, 150],
          weight: 10,
        },
        LEMON: {
          id: "LEMON",
          name: "Lemon",
          icon: "🍋",
          color: "#FFFF66",
          bg: "linear-gradient(135deg,#3a5000,#8BB800,#3a5000)",
          mult: [0, 2, 8, 30, 100],
          weight: 10,
        },
        ORANGE: {
          id: "ORANGE",
          name: "Orange",
          icon: "🍊",
          color: "#FFCC66",
          bg: "linear-gradient(135deg,#803000,#FF6600,#803000)",
          mult: [0, 1, 6, 20, 75],
          weight: 11,
        },
        PLUM: {
          id: "PLUM",
          name: "Plum",
          icon: "🍑",
          color: "#FF99CC",
          bg: "linear-gradient(135deg,#400060,#9900CC,#400060)",
          mult: [0, 0, 5, 15, 50],
          weight: 10,
        },
        GRAPES: {
          id: "GRAPES",
          name: "Grapes",
          icon: "🍇",
          color: "#CC99FF",
          bg: "linear-gradient(135deg,#1a003a,#6600AA,#1a003a)",
          mult: [0, 0, 4, 12, 40],
          weight: 10,
        },
        WATERMELON: {
          id: "WATERMELON",
          name: "Melon",
          icon: "🍉",
          color: "#66FF66",
          bg: "linear-gradient(135deg,#004D00,#00AA00,#004D00)",
          mult: [0, 0, 3, 10, 30],
          weight: 10,
        },
      },
      v = Object.keys(m);
    function g() {
      var t,
        e = [],
        n = (function (t, e) {
          var n =
            ("undefined" != typeof Symbol && t[Symbol.iterator]) ||
            t["@@iterator"];
          if (!n) {
            if (
              Array.isArray(t) ||
              (n = (function (t, e) {
                if (t) {
                  if ("string" == typeof t) return d(t, e);
                  var n = {}.toString.call(t).slice(8, -1);
                  return (
                    "Object" === n && t.constructor && (n = t.constructor.name),
                    "Map" === n || "Set" === n
                      ? Array.from(t)
                      : "Arguments" === n ||
                          /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
                        ? d(t, e)
                        : void 0
                  );
                }
              })(t)) ||
              (e && t && "number" == typeof t.length)
            ) {
              n && (t = n);
              var r = 0,
                i = function () {};
              return {
                s: i,
                n: function () {
                  return r >= t.length
                    ? { done: !0 }
                    : { done: !1, value: t[r++] };
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
          var o,
            a = !0,
            l = !1;
          return {
            s: function () {
              n = n.call(t);
            },
            n: function () {
              var t = n.next();
              return (a = t.done), t;
            },
            e: function (t) {
              (l = !0), (o = t);
            },
            f: function () {
              try {
                a || null == n.return || n.return();
              } finally {
                if (l) throw o;
              }
            },
          };
        })(v);
      try {
        for (n.s(); !(t = n.n()).done; )
          for (var r = t.value, i = m[r], o = 0; o < i.weight; o++)
            e.push(i.id);
      } catch (t) {
        n.e(t);
      } finally {
        n.f();
      }
      return e[Math.floor(Math.random() * e.length)];
    }
    function b(t) {
      var e = m[t];
      return e
        ? { icon: e.icon, bg: e.bg, color: e.color }
        : {
            icon: "Ⅰ",
            bg: "linear-gradient(135deg,#3a3a4e,#666688,#3a3a4e)",
            color: "#AAAAAA",
          };
    }
    function w(t) {
      return (
        (w =
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
        w(t)
      );
    }
    function S(t, e) {
      return (
        (function (t) {
          if (Array.isArray(t)) return t;
        })(t) ||
        (function (t, e) {
          var n =
            null == t
              ? null
              : ("undefined" != typeof Symbol && t[Symbol.iterator]) ||
                t["@@iterator"];
          if (null != n) {
            var r,
              i,
              o,
              a,
              l = [],
              s = !0,
              c = !1;
            try {
              if (((o = (n = n.call(t)).next), 0 === e)) {
                if (Object(n) !== n) return;
                s = !1;
              } else
                for (
                  ;
                  !(s = (r = o.call(n)).done) &&
                  (l.push(r.value), l.length !== e);
                  s = !0
                );
            } catch (t) {
              (c = !0), (i = t);
            } finally {
              try {
                if (
                  !s &&
                  null != n.return &&
                  ((a = n.return()), Object(a) !== a)
                )
                  return;
              } finally {
                if (c) throw i;
              }
            }
            return l;
          }
        })(t, e) ||
        E(t, e) ||
        (function () {
          throw new TypeError(
            "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.",
          );
        })()
      );
    }
    function E(t, e) {
      if (t) {
        if ("string" == typeof t) return A(t, e);
        var n = {}.toString.call(t).slice(8, -1);
        return (
          "Object" === n && t.constructor && (n = t.constructor.name),
          "Map" === n || "Set" === n
            ? Array.from(t)
            : "Arguments" === n ||
                /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
              ? A(t, e)
              : void 0
        );
      }
    }
    function A(t, e) {
      (null == e || e > t.length) && (e = t.length);
      for (var n = 0, r = Array(e); n < e; n++) r[n] = t[n];
      return r;
    }
    function x(t, e) {
      for (var n = 0; n < e.length; n++) {
        var r = e[n];
        (r.enumerable = r.enumerable || !1),
          (r.configurable = !0),
          "value" in r && (r.writable = !0),
          Object.defineProperty(t, k(r.key), r);
      }
    }
    function k(t) {
      var e = (function (t) {
        if ("object" != w(t) || !t) return t;
        var e = t[Symbol.toPrimitive];
        if (void 0 !== e) {
          var n = e.call(t, "string");
          if ("object" != w(n)) return n;
          throw new TypeError("@@toPrimitive must return a primitive value.");
        }
        return String(t);
      })(t);
      return "symbol" == w(e) ? e : e + "";
    }
    var L = (function () {
      return (
        (t = function t() {
          !(function (t, e) {
            if (!(t instanceof e))
              throw new TypeError("Cannot call a class as a function");
          })(this, t);
        }),
        (e = [
          {
            key: "highlightWins",
            value: function (t) {
              document.querySelectorAll(".sym.highlight").forEach(function (t) {
                return t.classList.remove("highlight");
              });
              var e,
                n = (function (t) {
                  var e =
                    ("undefined" != typeof Symbol && t[Symbol.iterator]) ||
                    t["@@iterator"];
                  if (!e) {
                    if (Array.isArray(t) || (e = E(t))) {
                      e && (t = e);
                      var n = 0,
                        r = function () {};
                      return {
                        s: r,
                        n: function () {
                          return n >= t.length
                            ? { done: !0 }
                            : { done: !1, value: t[n++] };
                        },
                        e: function (t) {
                          throw t;
                        },
                        f: r,
                      };
                    }
                    throw new TypeError(
                      "Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.",
                    );
                  }
                  var i,
                    o = !0,
                    a = !1;
                  return {
                    s: function () {
                      e = e.call(t);
                    },
                    n: function () {
                      var t = e.next();
                      return (o = t.done), t;
                    },
                    e: function (t) {
                      (a = !0), (i = t);
                    },
                    f: function () {
                      try {
                        o || null == e.return || e.return();
                      } finally {
                        if (a) throw i;
                      }
                    },
                  };
                })(t);
              try {
                for (n.s(); !(e = n.n()).done; ) {
                  var r = S(e.value, 2),
                    i = r[0],
                    o = r[1],
                    a = document.querySelectorAll(".reel")[i];
                  if (a) {
                    var l = a.querySelector(".reel-strip");
                    if (l) {
                      var s = l.querySelectorAll(".sym")[o];
                      s && s.classList.add("highlight");
                    }
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
              document.querySelectorAll(".sym.highlight").forEach(function (t) {
                return t.classList.remove("highlight");
              });
            },
          },
          {
            key: "countUp",
            value: function (t, e) {
              var n =
                arguments.length > 2 && void 0 !== arguments[2]
                  ? arguments[2]
                  : 600;
              if (t) {
                var r = performance.now(),
                  i = parseInt(t.textContent.replace(/[^0-9]/g, "")) || 0,
                  o = function (a) {
                    var l = Math.min((a - r) / n, 1),
                      s = 1 - Math.pow(1 - l, 3),
                      c = Math.floor(i + (e - i) * s);
                    (t.textContent = c.toLocaleString("id-ID")),
                      l < 1 && requestAnimationFrame(o);
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
                }, 900));
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
          {
            key: "burst",
            value: function (t, e) {
              var n =
                  arguments.length > 2 && void 0 !== arguments[2]
                    ? arguments[2]
                    : "#FFD700",
                r = document.getElementById("gameScreen");
              if (r)
                for (
                  var i = function () {
                      var i = document.createElement("div");
                      (i.className = "particle"),
                        (i.style.cssText = "\n        position:fixed; left:"
                          .concat(t, "px; top:")
                          .concat(e, "px;\n        width:")
                          .concat(3 + 6 * Math.random(), "px; height:")
                          .concat(
                            3 + 6 * Math.random(),
                            "px;\n        border-radius:50%;\n        background:",
                          )
                          .concat(
                            n,
                            ";\n        pointer-events:none; z-index:999;\n        box-shadow:0 0 6px ",
                          )
                          .concat(n, ";\n      ")),
                        r.appendChild(i);
                      var a = (o / 20) * Math.PI * 2 + 0.3 * Math.random(),
                        l = 30 + 100 * Math.random(),
                        s = Math.cos(a) * l,
                        c = Math.sin(a) * l;
                      i.animate(
                        [
                          { transform: "translate(0,0) scale(1)", opacity: 1 },
                          {
                            transform: "translate("
                              .concat(s, "px,")
                              .concat(c, "px) scale(0)"),
                            opacity: 0,
                          },
                        ],
                        {
                          duration: 600 + 400 * Math.random(),
                          easing: "ease-out",
                        },
                      ).onfinish = function () {
                        return i.remove();
                      };
                    },
                    o = 0;
                  o < 20;
                  o++
                )
                  i();
            },
          },
        ]),
        e && x(t.prototype, e),
        Object.defineProperty(t, "prototype", { writable: !1 }),
        t
      );
      var t, e;
    })();
    function M(t) {
      return (
        (M =
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
        M(t)
      );
    }
    function C(t, e) {
      return (
        (function (t) {
          if (Array.isArray(t)) return t;
        })(t) ||
        (function (t, e) {
          var n =
            null == t
              ? null
              : ("undefined" != typeof Symbol && t[Symbol.iterator]) ||
                t["@@iterator"];
          if (null != n) {
            var r,
              i,
              o,
              a,
              l = [],
              s = !0,
              c = !1;
            try {
              if (((o = (n = n.call(t)).next), 0 === e)) {
                if (Object(n) !== n) return;
                s = !1;
              } else
                for (
                  ;
                  !(s = (r = o.call(n)).done) &&
                  (l.push(r.value), l.length !== e);
                  s = !0
                );
            } catch (t) {
              (c = !0), (i = t);
            } finally {
              try {
                if (
                  !s &&
                  null != n.return &&
                  ((a = n.return()), Object(a) !== a)
                )
                  return;
              } finally {
                if (c) throw i;
              }
            }
            return l;
          }
        })(t, e) ||
        (function (t, e) {
          if (t) {
            if ("string" == typeof t) return O(t, e);
            var n = {}.toString.call(t).slice(8, -1);
            return (
              "Object" === n && t.constructor && (n = t.constructor.name),
              "Map" === n || "Set" === n
                ? Array.from(t)
                : "Arguments" === n ||
                    /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
                  ? O(t, e)
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
    function O(t, e) {
      (null == e || e > t.length) && (e = t.length);
      for (var n = 0, r = Array(e); n < e; n++) r[n] = t[n];
      return r;
    }
    function B() {
      B = function () {
        return e;
      };
      var t,
        e = {},
        n = Object.prototype,
        r = n.hasOwnProperty,
        i =
          Object.defineProperty ||
          function (t, e, n) {
            t[e] = n.value;
          },
        o = "function" == typeof Symbol ? Symbol : {},
        a = o.iterator || "@@iterator",
        l = o.asyncIterator || "@@asyncIterator",
        s = o.toStringTag || "@@toStringTag";
      function c(t, e, n) {
        return (
          Object.defineProperty(t, e, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          }),
          t[e]
        );
      }
      try {
        c({}, "");
      } catch (t) {
        c = function (t, e, n) {
          return (t[e] = n);
        };
      }
      function u(t, e, n, r) {
        var o = e && e.prototype instanceof v ? e : v,
          a = Object.create(o.prototype),
          l = new I(r || []);
        return i(a, "_invoke", { value: L(t, n, l) }), a;
      }
      function f(t, e, n) {
        try {
          return { type: "normal", arg: t.call(e, n) };
        } catch (t) {
          return { type: "throw", arg: t };
        }
      }
      e.wrap = u;
      var h = "suspendedStart",
        p = "suspendedYield",
        y = "executing",
        d = "completed",
        m = {};
      function v() {}
      function g() {}
      function b() {}
      var w = {};
      c(w, a, function () {
        return this;
      });
      var S = Object.getPrototypeOf,
        E = S && S(S(R([])));
      E && E !== n && r.call(E, a) && (w = E);
      var A = (b.prototype = v.prototype = Object.create(w));
      function x(t) {
        ["next", "throw", "return"].forEach(function (e) {
          c(t, e, function (t) {
            return this._invoke(e, t);
          });
        });
      }
      function k(t, e) {
        function n(i, o, a, l) {
          var s = f(t[i], t, o);
          if ("throw" !== s.type) {
            var c = s.arg,
              u = c.value;
            return u && "object" == M(u) && r.call(u, "__await")
              ? e.resolve(u.__await).then(
                  function (t) {
                    n("next", t, a, l);
                  },
                  function (t) {
                    n("throw", t, a, l);
                  },
                )
              : e.resolve(u).then(
                  function (t) {
                    (c.value = t), a(c);
                  },
                  function (t) {
                    return n("throw", t, a, l);
                  },
                );
          }
          l(s.arg);
        }
        var o;
        i(this, "_invoke", {
          value: function (t, r) {
            function i() {
              return new e(function (e, i) {
                n(t, r, e, i);
              });
            }
            return (o = o ? o.then(i, i) : i());
          },
        });
      }
      function L(e, n, r) {
        var i = h;
        return function (o, a) {
          if (i === y) throw Error("Generator is already running");
          if (i === d) {
            if ("throw" === o) throw a;
            return { value: t, done: !0 };
          }
          for (r.method = o, r.arg = a; ; ) {
            var l = r.delegate;
            if (l) {
              var s = C(l, r);
              if (s) {
                if (s === m) continue;
                return s;
              }
            }
            if ("next" === r.method) r.sent = r._sent = r.arg;
            else if ("throw" === r.method) {
              if (i === h) throw ((i = d), r.arg);
              r.dispatchException(r.arg);
            } else "return" === r.method && r.abrupt("return", r.arg);
            i = y;
            var c = f(e, n, r);
            if ("normal" === c.type) {
              if (((i = r.done ? d : p), c.arg === m)) continue;
              return { value: c.arg, done: r.done };
            }
            "throw" === c.type &&
              ((i = d), (r.method = "throw"), (r.arg = c.arg));
          }
        };
      }
      function C(e, n) {
        var r = n.method,
          i = e.iterator[r];
        if (i === t)
          return (
            (n.delegate = null),
            ("throw" === r &&
              e.iterator.return &&
              ((n.method = "return"),
              (n.arg = t),
              C(e, n),
              "throw" === n.method)) ||
              ("return" !== r &&
                ((n.method = "throw"),
                (n.arg = new TypeError(
                  "The iterator does not provide a '" + r + "' method",
                )))),
            m
          );
        var o = f(i, e.iterator, n.arg);
        if ("throw" === o.type)
          return (n.method = "throw"), (n.arg = o.arg), (n.delegate = null), m;
        var a = o.arg;
        return a
          ? a.done
            ? ((n[e.resultName] = a.value),
              (n.next = e.nextLoc),
              "return" !== n.method && ((n.method = "next"), (n.arg = t)),
              (n.delegate = null),
              m)
            : a
          : ((n.method = "throw"),
            (n.arg = new TypeError("iterator result is not an object")),
            (n.delegate = null),
            m);
      }
      function O(t) {
        var e = { tryLoc: t[0] };
        1 in t && (e.catchLoc = t[1]),
          2 in t && ((e.finallyLoc = t[2]), (e.afterLoc = t[3])),
          this.tryEntries.push(e);
      }
      function j(t) {
        var e = t.completion || {};
        (e.type = "normal"), delete e.arg, (t.completion = e);
      }
      function I(t) {
        (this.tryEntries = [{ tryLoc: "root" }]),
          t.forEach(O, this),
          this.reset(!0);
      }
      function R(e) {
        if (e || "" === e) {
          var n = e[a];
          if (n) return n.call(e);
          if ("function" == typeof e.next) return e;
          if (!isNaN(e.length)) {
            var i = -1,
              o = function n() {
                for (; ++i < e.length; )
                  if (r.call(e, i)) return (n.value = e[i]), (n.done = !1), n;
                return (n.value = t), (n.done = !0), n;
              };
            return (o.next = o);
          }
        }
        throw new TypeError(M(e) + " is not iterable");
      }
      return (
        (g.prototype = b),
        i(A, "constructor", { value: b, configurable: !0 }),
        i(b, "constructor", { value: g, configurable: !0 }),
        (g.displayName = c(b, s, "GeneratorFunction")),
        (e.isGeneratorFunction = function (t) {
          var e = "function" == typeof t && t.constructor;
          return (
            !!e &&
            (e === g || "GeneratorFunction" === (e.displayName || e.name))
          );
        }),
        (e.mark = function (t) {
          return (
            Object.setPrototypeOf
              ? Object.setPrototypeOf(t, b)
              : ((t.__proto__ = b), c(t, s, "GeneratorFunction")),
            (t.prototype = Object.create(A)),
            t
          );
        }),
        (e.awrap = function (t) {
          return { __await: t };
        }),
        x(k.prototype),
        c(k.prototype, l, function () {
          return this;
        }),
        (e.AsyncIterator = k),
        (e.async = function (t, n, r, i, o) {
          void 0 === o && (o = Promise);
          var a = new k(u(t, n, r, i), o);
          return e.isGeneratorFunction(n)
            ? a
            : a.next().then(function (t) {
                return t.done ? t.value : a.next();
              });
        }),
        x(A),
        c(A, s, "Generator"),
        c(A, a, function () {
          return this;
        }),
        c(A, "toString", function () {
          return "[object Generator]";
        }),
        (e.keys = function (t) {
          var e = Object(t),
            n = [];
          for (var r in e) n.push(r);
          return (
            n.reverse(),
            function t() {
              for (; n.length; ) {
                var r = n.pop();
                if (r in e) return (t.value = r), (t.done = !1), t;
              }
              return (t.done = !0), t;
            }
          );
        }),
        (e.values = R),
        (I.prototype = {
          constructor: I,
          reset: function (e) {
            if (
              ((this.prev = 0),
              (this.next = 0),
              (this.sent = this._sent = t),
              (this.done = !1),
              (this.delegate = null),
              (this.method = "next"),
              (this.arg = t),
              this.tryEntries.forEach(j),
              !e)
            )
              for (var n in this)
                "t" === n.charAt(0) &&
                  r.call(this, n) &&
                  !isNaN(+n.slice(1)) &&
                  (this[n] = t);
          },
          stop: function () {
            this.done = !0;
            var t = this.tryEntries[0].completion;
            if ("throw" === t.type) throw t.arg;
            return this.rval;
          },
          dispatchException: function (e) {
            if (this.done) throw e;
            var n = this;
            function i(r, i) {
              return (
                (l.type = "throw"),
                (l.arg = e),
                (n.next = r),
                i && ((n.method = "next"), (n.arg = t)),
                !!i
              );
            }
            for (var o = this.tryEntries.length - 1; o >= 0; --o) {
              var a = this.tryEntries[o],
                l = a.completion;
              if ("root" === a.tryLoc) return i("end");
              if (a.tryLoc <= this.prev) {
                var s = r.call(a, "catchLoc"),
                  c = r.call(a, "finallyLoc");
                if (s && c) {
                  if (this.prev < a.catchLoc) return i(a.catchLoc, !0);
                  if (this.prev < a.finallyLoc) return i(a.finallyLoc);
                } else if (s) {
                  if (this.prev < a.catchLoc) return i(a.catchLoc, !0);
                } else {
                  if (!c) throw Error("try statement without catch or finally");
                  if (this.prev < a.finallyLoc) return i(a.finallyLoc);
                }
              }
            }
          },
          abrupt: function (t, e) {
            for (var n = this.tryEntries.length - 1; n >= 0; --n) {
              var i = this.tryEntries[n];
              if (
                i.tryLoc <= this.prev &&
                r.call(i, "finallyLoc") &&
                this.prev < i.finallyLoc
              ) {
                var o = i;
                break;
              }
            }
            o &&
              ("break" === t || "continue" === t) &&
              o.tryLoc <= e &&
              e <= o.finallyLoc &&
              (o = null);
            var a = o ? o.completion : {};
            return (
              (a.type = t),
              (a.arg = e),
              o
                ? ((this.method = "next"), (this.next = o.finallyLoc), m)
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
              var n = this.tryEntries[e];
              if (n.finallyLoc === t)
                return this.complete(n.completion, n.afterLoc), j(n), m;
            }
          },
          catch: function (t) {
            for (var e = this.tryEntries.length - 1; e >= 0; --e) {
              var n = this.tryEntries[e];
              if (n.tryLoc === t) {
                var r = n.completion;
                if ("throw" === r.type) {
                  var i = r.arg;
                  j(n);
                }
                return i;
              }
            }
            throw Error("illegal catch attempt");
          },
          delegateYield: function (e, n, r) {
            return (
              (this.delegate = { iterator: R(e), resultName: n, nextLoc: r }),
              "next" === this.method && (this.arg = t),
              m
            );
          },
        }),
        e
      );
    }
    function j(t, e, n, r, i, o, a) {
      try {
        var l = t[o](a),
          s = l.value;
      } catch (t) {
        return void n(t);
      }
      l.done ? e(s) : Promise.resolve(s).then(r, i);
    }
    function I(t) {
      return function () {
        var e = this,
          n = arguments;
        return new Promise(function (r, i) {
          var o = t.apply(e, n);
          function a(t) {
            j(o, r, i, a, l, "next", t);
          }
          function l(t) {
            j(o, r, i, a, l, "throw", t);
          }
          a(void 0);
        });
      };
    }
    var R = window.location.origin;
    function F(t) {
      return T.apply(this, arguments);
    }
    function T() {
      return (T = I(
        B().mark(function t(e) {
          var n;
          return B().wrap(
            function (t) {
              for (;;)
                switch ((t.prev = t.next)) {
                  case 0:
                    return (
                      (t.prev = 0),
                      (t.next = 3),
                      fetch(R + e, {
                        method: "GET",
                        headers: { Accept: "application/json" },
                      })
                    );
                  case 3:
                    if ((n = t.sent).ok) {
                      t.next = 6;
                      break;
                    }
                    return t.abrupt("return", null);
                  case 6:
                    return (t.next = 8), n.json();
                  case 8:
                    return t.abrupt("return", t.sent);
                  case 11:
                    return (
                      (t.prev = 11),
                      (t.t0 = t.catch(0)),
                      t.abrupt("return", null)
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
    function D(t, e) {
      return N.apply(this, arguments);
    }
    function N() {
      return (N = I(
        B().mark(function t(e, n) {
          var r, i, o, a, l, s, c;
          return B().wrap(
            function (t) {
              for (;;)
                switch ((t.prev = t.next)) {
                  case 0:
                    for (
                      t.prev = 0,
                        r = new URLSearchParams(),
                        i = 0,
                        o = Object.entries(n);
                      i < o.length;
                      i++
                    )
                      (a = C(o[i], 2)), (l = a[0]), (s = a[1]), r.append(l, s);
                    return (
                      (t.next = 5),
                      fetch(R + e, {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/x-www-form-urlencoded",
                        },
                        body: r.toString(),
                      })
                    );
                  case 5:
                    if ((c = t.sent).ok) {
                      t.next = 8;
                      break;
                    }
                    return t.abrupt("return", { success: !1 });
                  case 8:
                    return (t.next = 10), c.json();
                  case 10:
                    return t.abrupt("return", t.sent);
                  case 13:
                    return (
                      (t.prev = 13),
                      (t.t0 = t.catch(0)),
                      t.abrupt("return", { success: !1 })
                    );
                  case 16:
                  case "end":
                    return t.stop();
                }
            },
            t,
            null,
            [[0, 13]],
          );
        }),
      )).apply(this, arguments);
    }
    const _ = function () {
        return I(
          B().mark(function t() {
            var e;
            return B().wrap(function (t) {
              for (;;)
                switch ((t.prev = t.next)) {
                  case 0:
                    return (t.next = 2), F("/api/config");
                  case 2:
                    if ((e = t.sent)) {
                      t.next = 5;
                      break;
                    }
                    return t.abrupt("return", null);
                  case 5:
                    return t.abrupt("return", {
                      winRate: void 0 !== e.winRate ? e.winRate : null,
                      payoutMultiplier:
                        void 0 !== e.payoutMultiplier
                          ? e.payoutMultiplier
                          : null,
                      minSpinsBeforeWin:
                        void 0 !== e.minSpinsBeforeWin
                          ? e.minSpinsBeforeWin
                          : null,
                      jackpotHitRate:
                        void 0 !== e.jackpotHitRate ? e.jackpotHitRate : null,
                      startingMoney:
                        void 0 !== e.startingMoney ? e.startingMoney : null,
                      betAmount: void 0 !== e.betAmount ? e.betAmount : null,
                      jackpot: void 0 !== e.jackpot ? e.jackpot : null,
                      difficultyId:
                        void 0 !== e.difficultyId ? e.difficultyId : null,
                      difficultyLabel: e.difficultyLabel || null,
                    });
                  case 6:
                  case "end":
                    return t.stop();
                }
            }, t);
          }),
        )();
      },
      P = function (t) {
        return I(
          B().mark(function e() {
            return B().wrap(function (e) {
              for (;;)
                switch ((e.prev = e.next)) {
                  case 0:
                    return e.abrupt(
                      "return",
                      D("/api/money", { balance: Math.floor(t) }),
                    );
                  case 1:
                  case "end":
                    return e.stop();
                }
            }, e);
          }),
        )();
      };
    function G(t) {
      return (
        (G =
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
        G(t)
      );
    }
    function U(t, e) {
      for (var n = 0; n < e.length; n++) {
        var r = e[n];
        (r.enumerable = r.enumerable || !1),
          (r.configurable = !0),
          "value" in r && (r.writable = !0),
          Object.defineProperty(t, W(r.key), r);
      }
    }
    function W(t) {
      var e = (function (t) {
        if ("object" != G(t) || !t) return t;
        var e = t[Symbol.toPrimitive];
        if (void 0 !== e) {
          var n = e.call(t, "string");
          if ("object" != G(n)) return n;
          throw new TypeError("@@toPrimitive must return a primitive value.");
        }
        return String(t);
      })(t);
      return "symbol" == G(e) ? e : e + "";
    }
    var H = (function () {
      return (
        (t = function t(e) {
          !(function (t, e) {
            if (!(t instanceof e))
              throw new TypeError("Cannot call a class as a function");
          })(this, t),
            (this.gm = e),
            (this.ws = null),
            (this.reconnectAttempts = 0),
            (this.maxBackoff = 5e3),
            (this.intentionalClose = !1),
            (this.lastConfig = null),
            this.connect();
        }),
        (e = [
          {
            key: "_getWsUrl",
            value: function () {
              var t = window.location.hostname || "localhost";
              return "ws://".concat(t, ":").concat(9090);
            },
          },
          {
            key: "connect",
            value: function () {
              var t = this;
              if (
                !this.ws ||
                (this.ws.readyState !== WebSocket.OPEN &&
                  this.ws.readyState !== WebSocket.CONNECTING)
              ) {
                this.intentionalClose = !1;
                var e = this._getWsUrl();
                try {
                  this.ws = new WebSocket(e);
                } catch (t) {
                  return (
                    console.warn(
                      "[Realtime] WebSocket creation failed:",
                      t.message,
                    ),
                    void this._scheduleReconnect()
                  );
                }
                (this.ws.onopen = function () {
                  console.log("[Realtime] Connected to " + e),
                    (t.reconnectAttempts = 0);
                }),
                  (this.ws.onmessage = function (e) {
                    try {
                      var n = JSON.parse(e.data);
                      t._dispatch(n);
                    } catch (t) {
                      console.warn("[Realtime] Invalid message:", t.message);
                    }
                  }),
                  (this.ws.onclose = function (e) {
                    console.log(
                      "[Realtime] Disconnected (code=" + e.code + ")",
                    ),
                      t.intentionalClose || t._scheduleReconnect();
                  }),
                  (this.ws.onerror = function () {});
              }
            },
          },
          {
            key: "_dispatch",
            value: function (t) {
              if (t && t.type)
                switch (t.type) {
                  case "configChanged":
                    (this.lastConfig = t.config || {}),
                      this.gm &&
                        "function" == typeof this.gm.onConfigChanged &&
                        this.gm.onConfigChanged(this.lastConfig);
                    break;
                  case "jackpotChanged":
                    this.gm &&
                      "function" == typeof this.gm.onJackpotChanged &&
                      this.gm.onJackpotChanged(t.value);
                    break;
                  case "balanceChanged":
                    this.gm &&
                      "function" == typeof this.gm.onBalanceChanged &&
                      this.gm.onBalanceChanged(t.player, t.balance);
                    break;
                  case "difficultyChanged":
                    this.gm &&
                      "function" == typeof this.gm.onDifficultyChanged &&
                      this.gm.onDifficultyChanged(
                        t.level,
                        t.winRate,
                        t.payoutMultiplier,
                      );
                    break;
                  case "maintenanceMode":
                    this.gm &&
                      "function" == typeof this.gm.onMaintenanceMode &&
                      this.gm.onMaintenanceMode(t.enabled);
                    break;
                  case "resetGame":
                    this.gm &&
                      "function" == typeof this.gm.onResetGame &&
                      this.gm.onResetGame();
                    break;
                  default:
                    console.log("[Realtime] Unknown event type:", t.type);
                }
            },
          },
          {
            key: "_scheduleReconnect",
            value: function () {
              var t = this,
                e = Math.min(
                  1e3 * Math.pow(2, this.reconnectAttempts),
                  this.maxBackoff,
                );
              this.reconnectAttempts++,
                console.log(
                  "[Realtime] Reconnecting in "
                    .concat(e, "ms (attempt ")
                    .concat(this.reconnectAttempts, ")"),
                ),
                setTimeout(function () {
                  return t.connect();
                }, e);
            },
          },
          {
            key: "disconnect",
            value: function () {
              if (((this.intentionalClose = !0), this.ws)) {
                try {
                  this.ws.close();
                } catch (t) {}
                this.ws = null;
              }
            },
          },
        ]),
        e && U(t.prototype, e),
        Object.defineProperty(t, "prototype", { writable: !1 }),
        t
      );
      var t, e;
    })();
    function Y(t) {
      return (
        (Y =
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
        Y(t)
      );
    }
    function q() {
      q = function () {
        return e;
      };
      var t,
        e = {},
        n = Object.prototype,
        r = n.hasOwnProperty,
        i =
          Object.defineProperty ||
          function (t, e, n) {
            t[e] = n.value;
          },
        o = "function" == typeof Symbol ? Symbol : {},
        a = o.iterator || "@@iterator",
        l = o.asyncIterator || "@@asyncIterator",
        s = o.toStringTag || "@@toStringTag";
      function c(t, e, n) {
        return (
          Object.defineProperty(t, e, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          }),
          t[e]
        );
      }
      try {
        c({}, "");
      } catch (t) {
        c = function (t, e, n) {
          return (t[e] = n);
        };
      }
      function u(t, e, n, r) {
        var o = e && e.prototype instanceof v ? e : v,
          a = Object.create(o.prototype),
          l = new B(r || []);
        return i(a, "_invoke", { value: L(t, n, l) }), a;
      }
      function f(t, e, n) {
        try {
          return { type: "normal", arg: t.call(e, n) };
        } catch (t) {
          return { type: "throw", arg: t };
        }
      }
      e.wrap = u;
      var h = "suspendedStart",
        p = "suspendedYield",
        y = "executing",
        d = "completed",
        m = {};
      function v() {}
      function g() {}
      function b() {}
      var w = {};
      c(w, a, function () {
        return this;
      });
      var S = Object.getPrototypeOf,
        E = S && S(S(j([])));
      E && E !== n && r.call(E, a) && (w = E);
      var A = (b.prototype = v.prototype = Object.create(w));
      function x(t) {
        ["next", "throw", "return"].forEach(function (e) {
          c(t, e, function (t) {
            return this._invoke(e, t);
          });
        });
      }
      function k(t, e) {
        function n(i, o, a, l) {
          var s = f(t[i], t, o);
          if ("throw" !== s.type) {
            var c = s.arg,
              u = c.value;
            return u && "object" == Y(u) && r.call(u, "__await")
              ? e.resolve(u.__await).then(
                  function (t) {
                    n("next", t, a, l);
                  },
                  function (t) {
                    n("throw", t, a, l);
                  },
                )
              : e.resolve(u).then(
                  function (t) {
                    (c.value = t), a(c);
                  },
                  function (t) {
                    return n("throw", t, a, l);
                  },
                );
          }
          l(s.arg);
        }
        var o;
        i(this, "_invoke", {
          value: function (t, r) {
            function i() {
              return new e(function (e, i) {
                n(t, r, e, i);
              });
            }
            return (o = o ? o.then(i, i) : i());
          },
        });
      }
      function L(e, n, r) {
        var i = h;
        return function (o, a) {
          if (i === y) throw Error("Generator is already running");
          if (i === d) {
            if ("throw" === o) throw a;
            return { value: t, done: !0 };
          }
          for (r.method = o, r.arg = a; ; ) {
            var l = r.delegate;
            if (l) {
              var s = M(l, r);
              if (s) {
                if (s === m) continue;
                return s;
              }
            }
            if ("next" === r.method) r.sent = r._sent = r.arg;
            else if ("throw" === r.method) {
              if (i === h) throw ((i = d), r.arg);
              r.dispatchException(r.arg);
            } else "return" === r.method && r.abrupt("return", r.arg);
            i = y;
            var c = f(e, n, r);
            if ("normal" === c.type) {
              if (((i = r.done ? d : p), c.arg === m)) continue;
              return { value: c.arg, done: r.done };
            }
            "throw" === c.type &&
              ((i = d), (r.method = "throw"), (r.arg = c.arg));
          }
        };
      }
      function M(e, n) {
        var r = n.method,
          i = e.iterator[r];
        if (i === t)
          return (
            (n.delegate = null),
            ("throw" === r &&
              e.iterator.return &&
              ((n.method = "return"),
              (n.arg = t),
              M(e, n),
              "throw" === n.method)) ||
              ("return" !== r &&
                ((n.method = "throw"),
                (n.arg = new TypeError(
                  "The iterator does not provide a '" + r + "' method",
                )))),
            m
          );
        var o = f(i, e.iterator, n.arg);
        if ("throw" === o.type)
          return (n.method = "throw"), (n.arg = o.arg), (n.delegate = null), m;
        var a = o.arg;
        return a
          ? a.done
            ? ((n[e.resultName] = a.value),
              (n.next = e.nextLoc),
              "return" !== n.method && ((n.method = "next"), (n.arg = t)),
              (n.delegate = null),
              m)
            : a
          : ((n.method = "throw"),
            (n.arg = new TypeError("iterator result is not an object")),
            (n.delegate = null),
            m);
      }
      function C(t) {
        var e = { tryLoc: t[0] };
        1 in t && (e.catchLoc = t[1]),
          2 in t && ((e.finallyLoc = t[2]), (e.afterLoc = t[3])),
          this.tryEntries.push(e);
      }
      function O(t) {
        var e = t.completion || {};
        (e.type = "normal"), delete e.arg, (t.completion = e);
      }
      function B(t) {
        (this.tryEntries = [{ tryLoc: "root" }]),
          t.forEach(C, this),
          this.reset(!0);
      }
      function j(e) {
        if (e || "" === e) {
          var n = e[a];
          if (n) return n.call(e);
          if ("function" == typeof e.next) return e;
          if (!isNaN(e.length)) {
            var i = -1,
              o = function n() {
                for (; ++i < e.length; )
                  if (r.call(e, i)) return (n.value = e[i]), (n.done = !1), n;
                return (n.value = t), (n.done = !0), n;
              };
            return (o.next = o);
          }
        }
        throw new TypeError(Y(e) + " is not iterable");
      }
      return (
        (g.prototype = b),
        i(A, "constructor", { value: b, configurable: !0 }),
        i(b, "constructor", { value: g, configurable: !0 }),
        (g.displayName = c(b, s, "GeneratorFunction")),
        (e.isGeneratorFunction = function (t) {
          var e = "function" == typeof t && t.constructor;
          return (
            !!e &&
            (e === g || "GeneratorFunction" === (e.displayName || e.name))
          );
        }),
        (e.mark = function (t) {
          return (
            Object.setPrototypeOf
              ? Object.setPrototypeOf(t, b)
              : ((t.__proto__ = b), c(t, s, "GeneratorFunction")),
            (t.prototype = Object.create(A)),
            t
          );
        }),
        (e.awrap = function (t) {
          return { __await: t };
        }),
        x(k.prototype),
        c(k.prototype, l, function () {
          return this;
        }),
        (e.AsyncIterator = k),
        (e.async = function (t, n, r, i, o) {
          void 0 === o && (o = Promise);
          var a = new k(u(t, n, r, i), o);
          return e.isGeneratorFunction(n)
            ? a
            : a.next().then(function (t) {
                return t.done ? t.value : a.next();
              });
        }),
        x(A),
        c(A, s, "Generator"),
        c(A, a, function () {
          return this;
        }),
        c(A, "toString", function () {
          return "[object Generator]";
        }),
        (e.keys = function (t) {
          var e = Object(t),
            n = [];
          for (var r in e) n.push(r);
          return (
            n.reverse(),
            function t() {
              for (; n.length; ) {
                var r = n.pop();
                if (r in e) return (t.value = r), (t.done = !1), t;
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
              this.tryEntries.forEach(O),
              !e)
            )
              for (var n in this)
                "t" === n.charAt(0) &&
                  r.call(this, n) &&
                  !isNaN(+n.slice(1)) &&
                  (this[n] = t);
          },
          stop: function () {
            this.done = !0;
            var t = this.tryEntries[0].completion;
            if ("throw" === t.type) throw t.arg;
            return this.rval;
          },
          dispatchException: function (e) {
            if (this.done) throw e;
            var n = this;
            function i(r, i) {
              return (
                (l.type = "throw"),
                (l.arg = e),
                (n.next = r),
                i && ((n.method = "next"), (n.arg = t)),
                !!i
              );
            }
            for (var o = this.tryEntries.length - 1; o >= 0; --o) {
              var a = this.tryEntries[o],
                l = a.completion;
              if ("root" === a.tryLoc) return i("end");
              if (a.tryLoc <= this.prev) {
                var s = r.call(a, "catchLoc"),
                  c = r.call(a, "finallyLoc");
                if (s && c) {
                  if (this.prev < a.catchLoc) return i(a.catchLoc, !0);
                  if (this.prev < a.finallyLoc) return i(a.finallyLoc);
                } else if (s) {
                  if (this.prev < a.catchLoc) return i(a.catchLoc, !0);
                } else {
                  if (!c) throw Error("try statement without catch or finally");
                  if (this.prev < a.finallyLoc) return i(a.finallyLoc);
                }
              }
            }
          },
          abrupt: function (t, e) {
            for (var n = this.tryEntries.length - 1; n >= 0; --n) {
              var i = this.tryEntries[n];
              if (
                i.tryLoc <= this.prev &&
                r.call(i, "finallyLoc") &&
                this.prev < i.finallyLoc
              ) {
                var o = i;
                break;
              }
            }
            o &&
              ("break" === t || "continue" === t) &&
              o.tryLoc <= e &&
              e <= o.finallyLoc &&
              (o = null);
            var a = o ? o.completion : {};
            return (
              (a.type = t),
              (a.arg = e),
              o
                ? ((this.method = "next"), (this.next = o.finallyLoc), m)
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
              var n = this.tryEntries[e];
              if (n.finallyLoc === t)
                return this.complete(n.completion, n.afterLoc), O(n), m;
            }
          },
          catch: function (t) {
            for (var e = this.tryEntries.length - 1; e >= 0; --e) {
              var n = this.tryEntries[e];
              if (n.tryLoc === t) {
                var r = n.completion;
                if ("throw" === r.type) {
                  var i = r.arg;
                  O(n);
                }
                return i;
              }
            }
            throw Error("illegal catch attempt");
          },
          delegateYield: function (e, n, r) {
            return (
              (this.delegate = { iterator: j(e), resultName: n, nextLoc: r }),
              "next" === this.method && (this.arg = t),
              m
            );
          },
        }),
        e
      );
    }
    function J(t, e, n, r, i, o, a) {
      try {
        var l = t[o](a),
          s = l.value;
      } catch (t) {
        return void n(t);
      }
      l.done ? e(s) : Promise.resolve(s).then(r, i);
    }
    function z(t) {
      return function () {
        var e = this,
          n = arguments;
        return new Promise(function (r, i) {
          var o = t.apply(e, n);
          function a(t) {
            J(o, r, i, a, l, "next", t);
          }
          function l(t) {
            J(o, r, i, a, l, "throw", t);
          }
          a(void 0);
        });
      };
    }
    function $(t, e) {
      var n =
        ("undefined" != typeof Symbol && t[Symbol.iterator]) || t["@@iterator"];
      if (!n) {
        if (
          Array.isArray(t) ||
          (n = (function (t, e) {
            if (t) {
              if ("string" == typeof t) return K(t, e);
              var n = {}.toString.call(t).slice(8, -1);
              return (
                "Object" === n && t.constructor && (n = t.constructor.name),
                "Map" === n || "Set" === n
                  ? Array.from(t)
                  : "Arguments" === n ||
                      /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
                    ? K(t, e)
                    : void 0
              );
            }
          })(t)) ||
          (e && t && "number" == typeof t.length)
        ) {
          n && (t = n);
          var r = 0,
            i = function () {};
          return {
            s: i,
            n: function () {
              return r >= t.length ? { done: !0 } : { done: !1, value: t[r++] };
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
      var o,
        a = !0,
        l = !1;
      return {
        s: function () {
          n = n.call(t);
        },
        n: function () {
          var t = n.next();
          return (a = t.done), t;
        },
        e: function (t) {
          (l = !0), (o = t);
        },
        f: function () {
          try {
            a || null == n.return || n.return();
          } finally {
            if (l) throw o;
          }
        },
      };
    }
    function K(t, e) {
      (null == e || e > t.length) && (e = t.length);
      for (var n = 0, r = Array(e); n < e; n++) r[n] = t[n];
      return r;
    }
    function V(t, e) {
      for (var n = 0; n < e.length; n++) {
        var r = e[n];
        (r.enumerable = r.enumerable || !1),
          (r.configurable = !0),
          "value" in r && (r.writable = !0),
          Object.defineProperty(t, Q(r.key), r);
      }
    }
    function Q(t) {
      var e = (function (t) {
        if ("object" != Y(t) || !t) return t;
        var e = t[Symbol.toPrimitive];
        if (void 0 !== e) {
          var n = e.call(t, "string");
          if ("object" != Y(n)) return n;
          throw new TypeError("@@toPrimitive must return a primitive value.");
        }
        return String(t);
      })(t);
      return "symbol" == Y(e) ? e : e + "";
    }
    window.__SYMBOLS_DATA = m;
    var X = (function () {
      return (
        (t = function t() {
          !(function (t, e) {
            if (!(t instanceof e))
              throw new TypeError("Cannot call a class as a function");
          })(this, t),
            (this.anim = new L()),
            (this.reels = []),
            (this.realtime = null),
            (this.state = {
              balance: 1e4,
              bet: 100,
              lastWin: 0,
              totalWins: 0,
              spinning: !1,
              autoplay: !1,
              turbo: !1,
              spinCount: 0,
              lossStreak: 0,
              config: {},
            }),
            (this.grid = [
              ["BAR", "BAR", "BAR"],
              ["BAR", "BAR", "BAR"],
              ["BAR", "BAR", "BAR"],
            ]),
            (this.el = {}),
            this.init();
        }),
        (e = [
          {
            key: "init",
            value: function () {
              var t = this;
              this.cacheDOM(),
                this.initReels(),
                this.loadConfig(),
                this.bindEvents(),
                this.showGrid(),
                this.updateUI(),
                this.showMsg("🎰 SPIN TO WIN"),
                setTimeout(function () {
                  t.realtime = new H(t);
                }, 100);
            },
          },
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
                    "turboMode",
                    "resetBtn",
                    "totalWinDisplay",
                    "betDown",
                    "betUp",
                    "maxBet",
                  ];
                t < e.length;
                t++
              ) {
                var n = e[t];
                this.el[n] = document.getElementById(n);
              }
            },
          },
          {
            key: "initReels",
            value: function () {
              var t = document.querySelectorAll(".reel");
              if (t) {
                var e,
                  n = $(t);
                try {
                  for (n.s(); !(e = n.n()).done; ) {
                    var r = e.value;
                    this.reels.push(new a(r, b, g));
                  }
                } catch (t) {
                  n.e(t);
                } finally {
                  n.f();
                }
              }
            },
          },
          {
            key: "showGrid",
            value: function () {
              for (
                var t = 0;
                t < this.reels.length && t < this.grid.length;
                t++
              )
                this.reels[t].loadStrip(this.grid[t]);
            },
          },
          {
            key: "loadConfig",
            value:
              ((i = z(
                q().mark(function t() {
                  var e, n, r;
                  return q().wrap(
                    function (t) {
                      for (;;)
                        switch ((t.prev = t.next)) {
                          case 0:
                            return (t.prev = 0), (t.next = 3), _();
                          case 3:
                            (n = t.sent) &&
                              ((this.state.config = n),
                              n.betAmount && (this.state.bet = n.betAmount)),
                              (t.next = 9);
                            break;
                          case 7:
                            (t.prev = 7), (t.t0 = t.catch(0));
                          case 9:
                            (r = localStorage.getItem("slot777_balance"))
                              ? (this.state.balance = parseInt(r, 10))
                              : null !== (e = this.state.config) &&
                                void 0 !== e &&
                                e.startingMoney &&
                                (this.state.balance =
                                  this.state.config.startingMoney),
                              P(this.state.balance),
                              this.updateUI();
                          case 13:
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
                return i.apply(this, arguments);
              }),
          },
          {
            key: "bindEvents",
            value: function () {
              var t,
                e,
                n,
                r,
                i,
                o,
                a,
                l = this;
              null === (t = this.el.spinBtn) ||
                void 0 === t ||
                t.addEventListener("click", function () {
                  return l.spin();
                }),
                null === (e = this.el.resetBtn) ||
                  void 0 === e ||
                  e.addEventListener("click", function () {
                    return l.resetBalance();
                  }),
                null === (n = this.el.betDown) ||
                  void 0 === n ||
                  n.addEventListener("click", function () {
                    return l.adjustBet(-50);
                  }),
                null === (r = this.el.betUp) ||
                  void 0 === r ||
                  r.addEventListener("click", function () {
                    return l.adjustBet(50);
                  }),
                null === (i = this.el.maxBet) ||
                  void 0 === i ||
                  i.addEventListener("click", function () {
                    return l.maxBet();
                  }),
                null === (o = this.el.autoplay) ||
                  void 0 === o ||
                  o.addEventListener("change", function () {
                    (l.state.autoplay = l.el.autoplay.checked),
                      l.state.autoplay &&
                        !l.state.spinning &&
                        l.state.balance >= l.state.bet &&
                        l.spin();
                  }),
                null === (a = this.el.turboMode) ||
                  void 0 === a ||
                  a.addEventListener("change", function () {
                    l.state.turbo = l.el.turboMode.checked;
                  }),
                document.addEventListener("keydown", function (t) {
                  "Space" !== t.code ||
                    l.state.spinning ||
                    (t.preventDefault(), l.spin());
                }),
                window.addEventListener("resize", function () {
                  var t,
                    e = $(l.reels);
                  try {
                    for (e.s(); !(t = e.n()).done; ) t.value.updateSize();
                  } catch (t) {
                    e.e(t);
                  } finally {
                    e.f();
                  }
                });
            },
          },
          {
            key: "adjustBet",
            value: function (t) {
              var e = Math.min(1e4, this.state.balance);
              (this.state.bet = Math.max(10, Math.min(e, this.state.bet + t))),
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
              ((r = z(
                q().mark(function t() {
                  var e, n;
                  return q().wrap(
                    function (t) {
                      for (;;)
                        switch ((t.prev = t.next)) {
                          case 0:
                            return (t.prev = 0), (t.next = 3), _();
                          case 3:
                            (n = t.sent) && (this.state.config = n),
                              (t.next = 9);
                            break;
                          case 7:
                            (t.prev = 7), (t.t0 = t.catch(0));
                          case 9:
                            (this.state.balance =
                              (null === (e = this.state.config) || void 0 === e
                                ? void 0
                                : e.startingMoney) || 1e4),
                              (this.state.lossStreak = 0),
                              localStorage.setItem(
                                "slot777_balance",
                                this.state.balance,
                              ),
                              P(this.state.balance),
                              this.el.spinBtn &&
                                (this.el.spinBtn.disabled = !1),
                              this.updateUI(),
                              this.showMsg("💰 BALANCE RESET");
                          case 16:
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
                return r.apply(this, arguments);
              }),
          },
          {
            key: "onConfigChanged",
            value: function (t) {
              t &&
                ((this.state.config = t),
                console.log("[Game] Config updated via WebSocket:", t),
                this.showMsg("⚙️ CONFIG UPDATED", "#D5AD6D"));
            },
          },
          {
            key: "onJackpotChanged",
            value: function (t) {
              console.log("[Game] Jackpot updated:", t);
              var e = document.getElementById("jackpotDisplay");
              if (e) {
                var n = (t || 0).toLocaleString("id-ID");
                (e.textContent = n),
                  e.classList.add("win-flash"),
                  setTimeout(function () {
                    return e.classList.remove("win-flash");
                  }, 600);
              }
            },
          },
          {
            key: "onBalanceChanged",
            value: function (t, e) {
              console.log("[Game] Balance update for", t, ":", e),
                void 0 !== e &&
                  e >= 0 &&
                  ((this.state.balance = e),
                  localStorage.setItem("slot777_balance", this.state.balance),
                  this.updateUI(),
                  this.showMsg("💰 BALANCE: ".concat(this.fmt(e)), "#4CAF50"));
            },
          },
          {
            key: "onDifficultyChanged",
            value: function (t, e, n) {
              console.log("[Game] Difficulty changed:", t, e, n),
                this.state.config || (this.state.config = {}),
                void 0 !== e && (this.state.config.winRate = e),
                void 0 !== n && (this.state.config.payoutMultiplier = n),
                this.showMsg(
                  "🎯 DIFFICULTY: ".concat(t || "CUSTOM"),
                  "#D5AD6D",
                );
            },
          },
          {
            key: "onMaintenanceMode",
            value: function (t) {
              console.log("[Game] Maintenance mode:", t),
                t
                  ? (this.showMsg("🛠️ MAINTENANCE MODE", "#FF6B6B"),
                    this.el.spinBtn && (this.el.spinBtn.disabled = !0))
                  : (this.showMsg("✅ READY", "#4CAF50"),
                    this.el.spinBtn &&
                      !this.state.spinning &&
                      (this.el.spinBtn.disabled = !1));
            },
          },
          {
            key: "onResetGame",
            value: function () {
              console.log("[Game] Reset command received"),
                this.resetBalance(),
                this.showMsg("🔄 GAME RESET", "#FFD700");
            },
          },
          {
            key: "spin",
            value:
              ((n = z(
                q().mark(function t() {
                  var e,
                    n,
                    r,
                    i,
                    o,
                    a,
                    l,
                    s,
                    c,
                    u,
                    f,
                    h,
                    p,
                    d,
                    m,
                    v,
                    g,
                    b,
                    w,
                    S,
                    E,
                    A,
                    x,
                    k,
                    L,
                    M,
                    C,
                    O = this;
                  return q().wrap(
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
                              this.showMsg("💸 BALANCE LOW"), t.abrupt("return")
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
                                this.anim.pulseSpinBtn(this.el.spinBtn),
                                localStorage.setItem(
                                  "slot777_balance",
                                  this.state.balance,
                                ),
                                P(this.state.balance),
                                i = this.state.config || {},
                                o =
                                  null !== (e = i.winRate) && void 0 !== e
                                    ? e
                                    : 0.15,
                                a =
                                  null !== (n = i.payoutMultiplier) &&
                                  void 0 !== n
                                    ? n
                                    : 3,
                                l =
                                  null !== (r = i.minSpinsBeforeWin) &&
                                  void 0 !== r
                                    ? r
                                    : 0,
                                this.state.lossStreak =
                                  this.state.lossStreak || 0,
                                s = !1,
                                l > 0 &&
                                  this.state.lossStreak >= l &&
                                  ((s = !0), (this.state.lossStreak = 0)),
                                c = this.generateResult(s ? 1 : o, a),
                                u = c.grid,
                                f = c.wins,
                                this.grid = u,
                                h = y(f),
                                p = this.state.turbo,
                                this.showMsg("🎰 SPINNING!"),
                                t.prev = 26,
                                v = [
                                  (m = p ? 800 : 1200),
                                  m + (d = p ? 200 : 280),
                                  m + 2 * d,
                                ],
                                g = [],
                                b = 0;
                              b < 3 && b < this.reels.length;
                              b++
                            )
                              (w = this.grid[b] || ["BAR", "BAR", "BAR"]),
                                g.push(this.reels[b].spin(w, v[b]));
                            return (t.next = 34), Promise.all(g);
                          case 34:
                            t.next = 43;
                            break;
                          case 36:
                            return (
                              (t.prev = 36),
                              (t.t0 = t.catch(26)),
                              console.error("Spin error:", t.t0),
                              (this.state.spinning = !1),
                              this.el.spinBtn &&
                                (this.el.spinBtn.disabled = !1),
                              this.showMsg("⚠️ ERROR"),
                              t.abrupt("return")
                            );
                          case 43:
                            if (
                              ((this.state.lastWin = h),
                              (this.state.totalWins += h),
                              h > 0)
                            ) {
                              (this.state.balance += h),
                                (this.state.lossStreak = 0),
                                (S = []),
                                (E = $(f));
                              try {
                                for (E.s(); !(A = E.n()).done; ) {
                                  (x = A.value), (k = $(x.positions));
                                  try {
                                    for (k.s(); !(L = k.n()).done; )
                                      (M = L.value), S.push(M);
                                  } catch (t) {
                                    k.e(t);
                                  } finally {
                                    k.f();
                                  }
                                }
                              } catch (t) {
                                E.e(t);
                              } finally {
                                E.f();
                              }
                              this.anim.highlightWins(S),
                                this.showMsg(
                                  "🎉 WIN ".concat(this.fmt(h), "!"),
                                  "#FF6B6B",
                                ),
                                this.el.totalWinDisplay &&
                                  (this.anim.countUp(
                                    this.el.totalWinDisplay,
                                    h,
                                  ),
                                  this.anim.flashWin(this.el.totalWinDisplay)),
                                this.el.spinBtn &&
                                  ((C =
                                    this.el.spinBtn.getBoundingClientRect()),
                                  this.anim.burst(C.left + C.width / 2, C.top));
                            } else this.state.lossStreak++;
                            localStorage.setItem(
                              "slot777_balance",
                              this.state.balance,
                            ),
                              P(this.state.balance),
                              (this.state.spinning = !1),
                              this.el.spinBtn &&
                                (this.el.spinBtn.disabled = !1),
                              this.updateUI(),
                              this.state.autoplay &&
                              this.state.balance >= this.state.bet
                                ? setTimeout(
                                    function () {
                                      return O.spin();
                                    },
                                    p ? 100 : 400,
                                  )
                                : (this.el.autoplay &&
                                    (this.el.autoplay.checked = !1),
                                  (this.state.autoplay = !1));
                          case 52:
                          case "end":
                            return t.stop();
                        }
                    },
                    t,
                    this,
                    [[26, 36]],
                  );
                }),
              )),
              function () {
                return n.apply(this, arguments);
              }),
          },
          {
            key: "generateResult",
            value: function (t, e) {
              var n;
              if (Math.random() < t) {
                var r = g(),
                  i = [
                    [g(), r, g()],
                    [g(), r, g()],
                    [g(), r, g()],
                  ],
                  o = p(i, this.state.bet);
                if (e && 1 !== e) {
                  var a,
                    l = $(o);
                  try {
                    for (l.s(); !(a = l.n()).done; ) {
                      var s = a.value;
                      s.amount = Math.floor(s.amount * e);
                    }
                  } catch (t) {
                    l.e(t);
                  } finally {
                    l.f();
                  }
                }
                if (
                  0 === o.length &&
                  ((i[0][1] = r),
                  (i[1][1] = r),
                  (i[2][1] = r),
                  (o = p(i, this.state.bet)),
                  e && 1 !== e)
                ) {
                  var c,
                    u = $(o);
                  try {
                    for (u.s(); !(c = u.n()).done; ) {
                      var f = c.value;
                      f.amount = Math.floor(f.amount * e);
                    }
                  } catch (t) {
                    u.e(t);
                  } finally {
                    u.f();
                  }
                }
                return { grid: i, wins: o };
              }
              var h = 0;
              do {
                (n = [
                  [g(), g(), g()],
                  [g(), g(), g()],
                  [g(), g(), g()],
                ]),
                  h++;
              } while (p(n, this.state.bet).length > 0 && h < 50);
              return { grid: n, wins: [] };
            },
          },
          {
            key: "fmt",
            value: function (t) {
              return (null != t ? t : 0).toLocaleString("id-ID");
            },
          },
          {
            key: "updateUI",
            value: function () {
              this.el.playerMoney &&
                (this.el.playerMoney.textContent = this.fmt(
                  this.state.balance,
                )),
                this.el.betDisplay &&
                  (this.el.betDisplay.textContent = this.fmt(this.state.bet)),
                this.el.betDisplay2 &&
                  (this.el.betDisplay2.textContent = this.fmt(this.state.bet));
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
        e && V(t.prototype, e),
        Object.defineProperty(t, "prototype", { writable: !1 }),
        t
      );
      var t, e, n, r, i;
    })();
    "loading" === document.readyState
      ? document.addEventListener("DOMContentLoaded", function () {
          return new X();
        })
      : new X();
  })();
})();
