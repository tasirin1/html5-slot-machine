/*! For license information please see bundle.79ddf1635446945f39fc.js.LICENSE.txt */
(() => {
  "use strict";
  (() => {
    function t(t, e) {
      var r =
        ("undefined" != typeof Symbol && t[Symbol.iterator]) || t["@@iterator"];
      if (!r) {
        if (
          Array.isArray(t) ||
          (r = n(t)) ||
          (e && t && "number" == typeof t.length)
        ) {
          r && (t = r);
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
        l = !0,
        u = !1;
      return {
        s: function () {
          r = r.call(t);
        },
        n: function () {
          var t = r.next();
          return (l = t.done), t;
        },
        e: function (t) {
          (u = !0), (a = t);
        },
        f: function () {
          try {
            l || null == r.return || r.return();
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
          var n =
            null == t
              ? null
              : ("undefined" != typeof Symbol && t[Symbol.iterator]) ||
                t["@@iterator"];
          if (null != n) {
            var r,
              o,
              i,
              a,
              l = [],
              u = !0,
              c = !1;
            try {
              if (((i = (n = n.call(t)).next), 0 === e)) {
                if (Object(n) !== n) return;
                u = !1;
              } else
                for (
                  ;
                  !(u = (r = i.call(n)).done) &&
                  (l.push(r.value), l.length !== e);
                  u = !0
                );
            } catch (t) {
              (c = !0), (o = t);
            } finally {
              try {
                if (
                  !u &&
                  null != n.return &&
                  ((a = n.return()), Object(a) !== a)
                )
                  return;
              } finally {
                if (c) throw o;
              }
            }
            return l;
          }
        })(t, e) ||
        n(t, e) ||
        (function () {
          throw new TypeError(
            "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.",
          );
        })()
      );
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
    var o = [
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
    function i(t, e) {
      var n = {
        DIAMOND: [0, 0, 200, 1e3, 5e3],
        SEVEN: [0, 0, 100, 500, 2500],
        BAR: [0, 0, 50, 200, 1e3],
        BELL: [0, 0, 25, 100, 500],
        CHERRY: [0, 5, 15, 50, 200],
        LEMON: [0, 3, 10, 40, 150],
        ORANGE: [0, 2, 8, 30, 100],
        PLUM: [0, 0, 6, 20, 75],
        WATERMELON: [0, 0, 5, 15, 50],
        GRAPES: [0, 0, 3, 10, 40],
      }[t];
      return n ? n[Math.min(Math.max(e - 1, 0), n.length - 1)] : 0;
    }
    function a(n, r) {
      if (!n || n.length < 3) return [];
      for (var a, l = [], u = 0; u < o.length; u++) {
        var c,
          s = o[u],
          f = s.map(function (t) {
            var r = e(t, 2),
              o = r[0],
              i = r[1];
            return n[o] && void 0 !== n[o][i] ? n[o][i] : "BAR";
          }),
          h = null,
          y = t(f);
        try {
          for (y.s(); !(c = y.n()).done; ) {
            var d = c.value;
            if ("DIAMOND" !== d) {
              h = d;
              break;
            }
          }
        } catch (t) {
          y.e(t);
        } finally {
          y.f();
        }
        h || (h = "SEVEN");
        var p,
          v = 0,
          g = t(f);
        try {
          for (g.s(); !(p = g.n()).done; ) {
            var m = p.value;
            if (m !== h && "DIAMOND" !== m) break;
            v++;
          }
        } catch (t) {
          g.e(t);
        } finally {
          g.f();
        }
        if (
          !(
            v <
            ((a = h), "CHERRY" === a || "LEMON" === a || "ORANGE" === a ? 2 : 3)
          )
        ) {
          var b = i(h, v);
          b <= 0 ||
            l.push({
              payline: u,
              symbol: h,
              count: v,
              multiplier: b,
              amount: Math.floor(r * b),
              positions: s.slice(0, v),
            });
        }
      }
      return l;
    }
    function l(t) {
      return t.reduce(function (t, e) {
        return t + e.amount;
      }, 0);
    }
    function u() {
      var t = [
        "DIAMOND",
        "DIAMOND",
        "DIAMOND",
        "SEVEN",
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
        "BAR",
        "BAR",
        "BELL",
        "BELL",
        "BELL",
        "BELL",
        "BELL",
        "BELL",
        "CHERRY",
        "CHERRY",
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
        "LEMON",
        "LEMON",
        "ORANGE",
        "ORANGE",
        "ORANGE",
        "ORANGE",
        "ORANGE",
        "ORANGE",
        "PLUM",
        "PLUM",
        "PLUM",
        "PLUM",
        "WATERMELON",
        "WATERMELON",
        "WATERMELON",
        "GRAPES",
        "GRAPES",
        "GRAPES",
      ];
      return t[Math.floor(Math.random() * t.length)];
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
              o,
              i,
              a,
              l = [],
              u = !0,
              c = !1;
            try {
              if (((i = (n = n.call(t)).next), 0 === e)) {
                if (Object(n) !== n) return;
                u = !1;
              } else
                for (
                  ;
                  !(u = (r = i.call(n)).done) &&
                  (l.push(r.value), l.length !== e);
                  u = !0
                );
            } catch (t) {
              (c = !0), (o = t);
            } finally {
              try {
                if (
                  !u &&
                  null != n.return &&
                  ((a = n.return()), Object(a) !== a)
                )
                  return;
              } finally {
                if (c) throw o;
              }
            }
            return l;
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
    function f(t, e) {
      var n =
        ("undefined" != typeof Symbol && t[Symbol.iterator]) || t["@@iterator"];
      if (!n) {
        if (
          Array.isArray(t) ||
          (n = h(t)) ||
          (e && t && "number" == typeof t.length)
        ) {
          n && (t = n);
          var r = 0,
            o = function () {};
          return {
            s: o,
            n: function () {
              return r >= t.length ? { done: !0 } : { done: !1, value: t[r++] };
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
          (l = !0), (i = t);
        },
        f: function () {
          try {
            a || null == n.return || n.return();
          } finally {
            if (l) throw i;
          }
        },
      };
    }
    function h(t, e) {
      if (t) {
        if ("string" == typeof t) return y(t, e);
        var n = {}.toString.call(t).slice(8, -1);
        return (
          "Object" === n && t.constructor && (n = t.constructor.name),
          "Map" === n || "Set" === n
            ? Array.from(t)
            : "Arguments" === n ||
                /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
              ? y(t, e)
              : void 0
        );
      }
    }
    function y(t, e) {
      (null == e || e > t.length) && (e = t.length);
      for (var n = 0, r = Array(e); n < e; n++) r[n] = t[n];
      return r;
    }
    function d(t, e) {
      for (var n = 0; n < e.length; n++) {
        var r = e[n];
        (r.enumerable = r.enumerable || !1),
          (r.configurable = !0),
          "value" in r && (r.writable = !0),
          Object.defineProperty(t, p(r.key), r);
      }
    }
    function p(t) {
      var e = (function (t) {
        if ("object" != c(t) || !t) return t;
        var e = t[Symbol.toPrimitive];
        if (void 0 !== e) {
          var n = e.call(t, "string");
          if ("object" != c(n)) return n;
          throw new TypeError("@@toPrimitive must return a primitive value.");
        }
        return String(t);
      })(t);
      return "symbol" == c(e) ? e : e + "";
    }
    Object.keys({
      DIAMOND: {
        id: "DIAMOND",
        name: "Diamond",
        icon: "💎",
        color: "#00FFFF",
        bg: "linear-gradient(135deg,#003366,#0099FF,#003366)",
        mult: [0, 0, 200, 1e3, 5e3],
        wild: !0,
      },
      SEVEN: {
        id: "SEVEN",
        name: "Seven",
        icon: "7",
        color: "#FFD700",
        bg: "linear-gradient(135deg,#8B0000,#FF0000,#8B0000)",
        mult: [0, 0, 100, 500, 2500],
        wild: !1,
      },
      BAR: {
        id: "BAR",
        name: "BAR",
        icon: "BAR",
        color: "#FFFFFF",
        bg: "linear-gradient(135deg,#1a1a2e,#444466,#1a1a2e)",
        mult: [0, 0, 50, 200, 1e3],
        wild: !1,
      },
      BELL: {
        id: "BELL",
        name: "Bell",
        icon: "🔔",
        color: "#FFD700",
        bg: "linear-gradient(135deg,#4a0030,#8b0060,#4a0030)",
        mult: [0, 0, 25, 100, 500],
        wild: !1,
      },
      CHERRY: {
        id: "CHERRY",
        name: "Cherry",
        icon: "🍒",
        color: "#FFCCCC",
        bg: "linear-gradient(135deg,#660000,#CC0033,#660000)",
        mult: [0, 5, 15, 50, 200],
        wild: !1,
      },
      LEMON: {
        id: "LEMON",
        name: "Lemon",
        icon: "🍋",
        color: "#FFFFCC",
        bg: "linear-gradient(135deg,#3a5000,#8BB800,#3a5000)",
        mult: [0, 3, 10, 40, 150],
        wild: !1,
      },
      ORANGE: {
        id: "ORANGE",
        name: "Orange",
        icon: "🍊",
        color: "#FFFFFF",
        bg: "linear-gradient(135deg,#803000,#FF6600,#803000)",
        mult: [0, 2, 8, 30, 100],
        wild: !1,
      },
      PLUM: {
        id: "PLUM",
        name: "Plum",
        icon: "🍑",
        color: "#FFDDFF",
        bg: "linear-gradient(135deg,#400060,#9900CC,#400060)",
        mult: [0, 0, 6, 20, 75],
        wild: !1,
      },
      WATERMELON: {
        id: "WATERMELON",
        name: "Melon",
        icon: "🍉",
        color: "#CCFFCC",
        bg: "linear-gradient(135deg,#004D00,#00AA00,#004D00)",
        mult: [0, 0, 5, 15, 50],
        wild: !1,
      },
      GRAPES: {
        id: "GRAPES",
        name: "Grapes",
        icon: "🍇",
        color: "#DDCCFF",
        bg: "linear-gradient(135deg,#1a003a,#6600AA,#1a003a)",
        mult: [0, 0, 3, 10, 40],
        wild: !1,
      },
    });
    var v = {
      DIAMOND: {
        icon: "💎",
        bg: "linear-gradient(135deg,#003366,#0099FF,#003366)",
        color: "#00FFFF",
      },
      SEVEN: {
        icon: "7",
        bg: "linear-gradient(135deg,#8B0000,#FF0000,#8B0000)",
        color: "#FFD700",
      },
      BAR: {
        icon: "BAR",
        bg: "linear-gradient(135deg,#1a1a2e,#444466,#1a1a2e)",
        color: "#FFFFFF",
      },
      BELL: {
        icon: "🔔",
        bg: "linear-gradient(135deg,#4a0030,#8b0060,#4a0030)",
        color: "#FFD700",
      },
      CHERRY: {
        icon: "🍒",
        bg: "linear-gradient(135deg,#660000,#CC0033,#660000)",
        color: "#FFCCCC",
      },
      LEMON: {
        icon: "🍋",
        bg: "linear-gradient(135deg,#3a5000,#8BB800,#3a5000)",
        color: "#FFFFCC",
      },
      ORANGE: {
        icon: "🍊",
        bg: "linear-gradient(135deg,#803000,#FF6600,#803000)",
        color: "#FFFFFF",
      },
      PLUM: {
        icon: "🍑",
        bg: "linear-gradient(135deg,#400060,#9900CC,#400060)",
        color: "#FFDDFF",
      },
      WATERMELON: {
        icon: "🍉",
        bg: "linear-gradient(135deg,#004D00,#00AA00,#004D00)",
        color: "#CCFFCC",
      },
      GRAPES: {
        icon: "🍇",
        bg: "linear-gradient(135deg,#1a003a,#6600AA,#1a003a)",
        color: "#DDCCFF",
      },
    };
    function g(t) {
      return v[t] || v.BAR;
    }
    var m = (function () {
      return (
        (t = function t() {
          !(function (t, e) {
            if (!(t instanceof e))
              throw new TypeError("Cannot call a class as a function");
          })(this, t),
            (this.pool = []);
        }),
        (e = [
          {
            key: "spinReel",
            value: function (t, e) {
              var n = this,
                r =
                  arguments.length > 2 && void 0 !== arguments[2]
                    ? arguments[2]
                    : 700,
                o =
                  arguments.length > 3 && void 0 !== arguments[3]
                    ? arguments[3]
                    : 0;
              return new Promise(function (i) {
                setTimeout(function () {
                  var o = t.querySelectorAll(".sym");
                  if (0 !== o.length) {
                    t.classList.add("spinning");
                    var a = performance.now(),
                      l = [
                        "SEVEN",
                        "BAR",
                        "BELL",
                        "CHERRY",
                        "LEMON",
                        "ORANGE",
                        "PLUM",
                        "WATERMELON",
                        "GRAPES",
                        "DIAMOND",
                      ],
                      u = function (c) {
                        var s = c - a,
                          h = Math.min(s / r, 1);
                        if (h >= 1) {
                          t.classList.remove("spinning");
                          for (var y = 0; y < o.length && y < e.length; y++) {
                            var d = g(e[y]);
                            n._setSym(o[y], d);
                          }
                          return (
                            t.classList.add("bounce"),
                            setTimeout(function () {
                              return t.classList.remove("bounce");
                            }, 250),
                            void i()
                          );
                        }
                        var p = Math.max(1, Math.floor(20 * (1 - h)));
                        if (
                          Math.floor(s / (20 * p)) !==
                          Math.floor((s - 16) / (20 * p))
                        ) {
                          var v,
                            m = f(o);
                          try {
                            for (m.s(); !(v = m.n()).done; ) {
                              var b = v.value,
                                w = g(l[Math.floor(Math.random() * l.length)]);
                              n._setSym(b, w);
                            }
                          } catch (t) {
                            m.e(t);
                          } finally {
                            m.f();
                          }
                        }
                        requestAnimationFrame(u);
                      };
                    requestAnimationFrame(u);
                  } else i();
                }, o);
              });
            },
          },
          {
            key: "_setSym",
            value: function (t, e) {
              (t.textContent = e.icon),
                (t.style.background = e.bg),
                (t.style.color = e.color);
            },
          },
          {
            key: "highlightWins",
            value: function (t) {
              document
                .querySelectorAll(".sym.win, .sym.win-glow")
                .forEach(function (t) {
                  t.classList.remove("win", "win-glow");
                });
              var e,
                n = f(t);
              try {
                for (n.s(); !(e = n.n()).done; ) {
                  var r = s(e.value, 2),
                    o = r[0],
                    i = r[1],
                    a = document.querySelectorAll(".reel")[o];
                  if (a) {
                    var l = a.querySelectorAll(".sym")[i];
                    l && l.classList.add("win", "win-glow");
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
              var n =
                arguments.length > 2 && void 0 !== arguments[2]
                  ? arguments[2]
                  : 500;
              if (t) {
                var r = performance.now(),
                  o = parseInt(t.textContent.replace(/[^0-9]/g, "")) || 0,
                  i = function (a) {
                    var l = Math.min((a - r) / n, 1),
                      u = 1 - Math.pow(1 - l, 3),
                      c = Math.floor(o + (e - o) * u);
                    (t.textContent = c.toLocaleString("id-ID")),
                      l < 1 && requestAnimationFrame(i);
                  };
                requestAnimationFrame(i);
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
            key: "burst",
            value: function (t, e) {
              var n =
                  arguments.length > 2 && void 0 !== arguments[2]
                    ? arguments[2]
                    : "#FFD700",
                r = document.getElementById("gameScreen");
              if (r)
                for (
                  var o = function () {
                      var o = document.createElement("div");
                      (o.className = "particle"),
                        (o.style.cssText = "\n        position:fixed; left:"
                          .concat(t, "px; top:")
                          .concat(e, "px;\n        width:")
                          .concat(4 + 6 * Math.random(), "px; height:")
                          .concat(
                            4 + 6 * Math.random(),
                            "px;\n        border-radius:50%;\n        background:",
                          )
                          .concat(
                            n,
                            ";\n        pointer-events:none; z-index:999;\n        box-shadow:0 0 6px ",
                          )
                          .concat(n, ";\n      ")),
                        r.appendChild(o);
                      var a = (i / 16) * Math.PI * 2 + 0.3 * Math.random(),
                        l = 30 + 80 * Math.random(),
                        u = Math.cos(a) * l,
                        c = Math.sin(a) * l;
                      o.animate(
                        [
                          { transform: "translate(0,0) scale(1)", opacity: 1 },
                          {
                            transform: "translate("
                              .concat(u, "px,")
                              .concat(c, "px) scale(0)"),
                            opacity: 0,
                          },
                        ],
                        {
                          duration: 500 + 300 * Math.random(),
                          easing: "ease-out",
                        },
                      ).onfinish = function () {
                        return o.remove();
                      };
                    },
                    i = 0;
                  i < 16;
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
        e && d(t.prototype, e),
        Object.defineProperty(t, "prototype", { writable: !1 }),
        t
      );
      var t, e;
    })();
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
          var n =
            null == t
              ? null
              : ("undefined" != typeof Symbol && t[Symbol.iterator]) ||
                t["@@iterator"];
          if (null != n) {
            var r,
              o,
              i,
              a,
              l = [],
              u = !0,
              c = !1;
            try {
              if (((i = (n = n.call(t)).next), 0 === e)) {
                if (Object(n) !== n) return;
                u = !1;
              } else
                for (
                  ;
                  !(u = (r = i.call(n)).done) &&
                  (l.push(r.value), l.length !== e);
                  u = !0
                );
            } catch (t) {
              (c = !0), (o = t);
            } finally {
              try {
                if (
                  !u &&
                  null != n.return &&
                  ((a = n.return()), Object(a) !== a)
                )
                  return;
              } finally {
                if (c) throw o;
              }
            }
            return l;
          }
        })(t, e) ||
        (function (t, e) {
          if (t) {
            if ("string" == typeof t) return E(t, e);
            var n = {}.toString.call(t).slice(8, -1);
            return (
              "Object" === n && t.constructor && (n = t.constructor.name),
              "Map" === n || "Set" === n
                ? Array.from(t)
                : "Arguments" === n ||
                    /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
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
      for (var n = 0, r = Array(e); n < e; n++) r[n] = t[n];
      return r;
    }
    function L() {
      L = function () {
        return e;
      };
      var t,
        e = {},
        n = Object.prototype,
        r = n.hasOwnProperty,
        o =
          Object.defineProperty ||
          function (t, e, n) {
            t[e] = n.value;
          },
        i = "function" == typeof Symbol ? Symbol : {},
        a = i.iterator || "@@iterator",
        l = i.asyncIterator || "@@asyncIterator",
        u = i.toStringTag || "@@toStringTag";
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
      function s(t, e, n, r) {
        var i = e && e.prototype instanceof g ? e : g,
          a = Object.create(i.prototype),
          l = new N(r || []);
        return o(a, "_invoke", { value: M(t, n, l) }), a;
      }
      function f(t, e, n) {
        try {
          return { type: "normal", arg: t.call(e, n) };
        } catch (t) {
          return { type: "throw", arg: t };
        }
      }
      e.wrap = s;
      var h = "suspendedStart",
        y = "suspendedYield",
        d = "executing",
        p = "completed",
        v = {};
      function g() {}
      function m() {}
      function w() {}
      var E = {};
      c(E, a, function () {
        return this;
      });
      var A = Object.getPrototypeOf,
        F = A && A(A(k([])));
      F && F !== n && r.call(F, a) && (E = F);
      var S = (w.prototype = g.prototype = Object.create(E));
      function x(t) {
        ["next", "throw", "return"].forEach(function (e) {
          c(t, e, function (t) {
            return this._invoke(e, t);
          });
        });
      }
      function R(t, e) {
        function n(o, i, a, l) {
          var u = f(t[o], t, i);
          if ("throw" !== u.type) {
            var c = u.arg,
              s = c.value;
            return s && "object" == b(s) && r.call(s, "__await")
              ? e.resolve(s.__await).then(
                  function (t) {
                    n("next", t, a, l);
                  },
                  function (t) {
                    n("throw", t, a, l);
                  },
                )
              : e.resolve(s).then(
                  function (t) {
                    (c.value = t), a(c);
                  },
                  function (t) {
                    return n("throw", t, a, l);
                  },
                );
          }
          l(u.arg);
        }
        var i;
        o(this, "_invoke", {
          value: function (t, r) {
            function o() {
              return new e(function (e, o) {
                n(t, r, e, o);
              });
            }
            return (i = i ? i.then(o, o) : o());
          },
        });
      }
      function M(e, n, r) {
        var o = h;
        return function (i, a) {
          if (o === d) throw Error("Generator is already running");
          if (o === p) {
            if ("throw" === i) throw a;
            return { value: t, done: !0 };
          }
          for (r.method = i, r.arg = a; ; ) {
            var l = r.delegate;
            if (l) {
              var u = O(l, r);
              if (u) {
                if (u === v) continue;
                return u;
              }
            }
            if ("next" === r.method) r.sent = r._sent = r.arg;
            else if ("throw" === r.method) {
              if (o === h) throw ((o = p), r.arg);
              r.dispatchException(r.arg);
            } else "return" === r.method && r.abrupt("return", r.arg);
            o = d;
            var c = f(e, n, r);
            if ("normal" === c.type) {
              if (((o = r.done ? p : y), c.arg === v)) continue;
              return { value: c.arg, done: r.done };
            }
            "throw" === c.type &&
              ((o = p), (r.method = "throw"), (r.arg = c.arg));
          }
        };
      }
      function O(e, n) {
        var r = n.method,
          o = e.iterator[r];
        if (o === t)
          return (
            (n.delegate = null),
            ("throw" === r &&
              e.iterator.return &&
              ((n.method = "return"),
              (n.arg = t),
              O(e, n),
              "throw" === n.method)) ||
              ("return" !== r &&
                ((n.method = "throw"),
                (n.arg = new TypeError(
                  "The iterator does not provide a '" + r + "' method",
                )))),
            v
          );
        var i = f(o, e.iterator, n.arg);
        if ("throw" === i.type)
          return (n.method = "throw"), (n.arg = i.arg), (n.delegate = null), v;
        var a = i.arg;
        return a
          ? a.done
            ? ((n[e.resultName] = a.value),
              (n.next = e.nextLoc),
              "return" !== n.method && ((n.method = "next"), (n.arg = t)),
              (n.delegate = null),
              v)
            : a
          : ((n.method = "throw"),
            (n.arg = new TypeError("iterator result is not an object")),
            (n.delegate = null),
            v);
      }
      function B(t) {
        var e = { tryLoc: t[0] };
        1 in t && (e.catchLoc = t[1]),
          2 in t && ((e.finallyLoc = t[2]), (e.afterLoc = t[3])),
          this.tryEntries.push(e);
      }
      function C(t) {
        var e = t.completion || {};
        (e.type = "normal"), delete e.arg, (t.completion = e);
      }
      function N(t) {
        (this.tryEntries = [{ tryLoc: "root" }]),
          t.forEach(B, this),
          this.reset(!0);
      }
      function k(e) {
        if (e || "" === e) {
          var n = e[a];
          if (n) return n.call(e);
          if ("function" == typeof e.next) return e;
          if (!isNaN(e.length)) {
            var o = -1,
              i = function n() {
                for (; ++o < e.length; )
                  if (r.call(e, o)) return (n.value = e[o]), (n.done = !1), n;
                return (n.value = t), (n.done = !0), n;
              };
            return (i.next = i);
          }
        }
        throw new TypeError(b(e) + " is not iterable");
      }
      return (
        (m.prototype = w),
        o(S, "constructor", { value: w, configurable: !0 }),
        o(w, "constructor", { value: m, configurable: !0 }),
        (m.displayName = c(w, u, "GeneratorFunction")),
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
              : ((t.__proto__ = w), c(t, u, "GeneratorFunction")),
            (t.prototype = Object.create(S)),
            t
          );
        }),
        (e.awrap = function (t) {
          return { __await: t };
        }),
        x(R.prototype),
        c(R.prototype, l, function () {
          return this;
        }),
        (e.AsyncIterator = R),
        (e.async = function (t, n, r, o, i) {
          void 0 === i && (i = Promise);
          var a = new R(s(t, n, r, o), i);
          return e.isGeneratorFunction(n)
            ? a
            : a.next().then(function (t) {
                return t.done ? t.value : a.next();
              });
        }),
        x(S),
        c(S, u, "Generator"),
        c(S, a, function () {
          return this;
        }),
        c(S, "toString", function () {
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
        (e.values = k),
        (N.prototype = {
          constructor: N,
          reset: function (e) {
            if (
              ((this.prev = 0),
              (this.next = 0),
              (this.sent = this._sent = t),
              (this.done = !1),
              (this.delegate = null),
              (this.method = "next"),
              (this.arg = t),
              this.tryEntries.forEach(C),
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
            function o(r, o) {
              return (
                (l.type = "throw"),
                (l.arg = e),
                (n.next = r),
                o && ((n.method = "next"), (n.arg = t)),
                !!o
              );
            }
            for (var i = this.tryEntries.length - 1; i >= 0; --i) {
              var a = this.tryEntries[i],
                l = a.completion;
              if ("root" === a.tryLoc) return o("end");
              if (a.tryLoc <= this.prev) {
                var u = r.call(a, "catchLoc"),
                  c = r.call(a, "finallyLoc");
                if (u && c) {
                  if (this.prev < a.catchLoc) return o(a.catchLoc, !0);
                  if (this.prev < a.finallyLoc) return o(a.finallyLoc);
                } else if (u) {
                  if (this.prev < a.catchLoc) return o(a.catchLoc, !0);
                } else {
                  if (!c) throw Error("try statement without catch or finally");
                  if (this.prev < a.finallyLoc) return o(a.finallyLoc);
                }
              }
            }
          },
          abrupt: function (t, e) {
            for (var n = this.tryEntries.length - 1; n >= 0; --n) {
              var o = this.tryEntries[n];
              if (
                o.tryLoc <= this.prev &&
                r.call(o, "finallyLoc") &&
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
              var n = this.tryEntries[e];
              if (n.finallyLoc === t)
                return this.complete(n.completion, n.afterLoc), C(n), v;
            }
          },
          catch: function (t) {
            for (var e = this.tryEntries.length - 1; e >= 0; --e) {
              var n = this.tryEntries[e];
              if (n.tryLoc === t) {
                var r = n.completion;
                if ("throw" === r.type) {
                  var o = r.arg;
                  C(n);
                }
                return o;
              }
            }
            throw Error("illegal catch attempt");
          },
          delegateYield: function (e, n, r) {
            return (
              (this.delegate = { iterator: k(e), resultName: n, nextLoc: r }),
              "next" === this.method && (this.arg = t),
              v
            );
          },
        }),
        e
      );
    }
    function A(t, e, n, r, o, i, a) {
      try {
        var l = t[i](a),
          u = l.value;
      } catch (t) {
        return void n(t);
      }
      l.done ? e(u) : Promise.resolve(u).then(r, o);
    }
    function F(t) {
      return function () {
        var e = this,
          n = arguments;
        return new Promise(function (r, o) {
          var i = t.apply(e, n);
          function a(t) {
            A(i, r, o, a, l, "next", t);
          }
          function l(t) {
            A(i, r, o, a, l, "throw", t);
          }
          a(void 0);
        });
      };
    }
    var S = window.location.origin;
    function x(t) {
      return R.apply(this, arguments);
    }
    function R() {
      return (R = F(
        L().mark(function t(e) {
          var n;
          return L().wrap(
            function (t) {
              for (;;)
                switch ((t.prev = t.next)) {
                  case 0:
                    return (
                      (t.prev = 0),
                      (t.next = 3),
                      fetch(S + e, {
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
    function M(t, e) {
      return O.apply(this, arguments);
    }
    function O() {
      return (O = F(
        L().mark(function t(e, n) {
          var r, o, i, a, l, u, c;
          return L().wrap(
            function (t) {
              for (;;)
                switch ((t.prev = t.next)) {
                  case 0:
                    for (
                      t.prev = 0,
                        r = new URLSearchParams(),
                        o = 0,
                        i = Object.entries(n);
                      o < i.length;
                      o++
                    )
                      (a = w(i[o], 2)), (l = a[0]), (u = a[1]), r.append(l, u);
                    return (
                      (t.next = 5),
                      fetch(S + e, {
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
    const B = function () {
        return F(
          L().mark(function t() {
            var e;
            return L().wrap(function (t) {
              for (;;)
                switch ((t.prev = t.next)) {
                  case 0:
                    return (t.next = 2), x("/api/config");
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
      C = function (t) {
        return F(
          L().mark(function e() {
            return L().wrap(function (e) {
              for (;;)
                switch ((e.prev = e.next)) {
                  case 0:
                    return e.abrupt(
                      "return",
                      M("/api/money", { balance: Math.floor(t) }),
                    );
                  case 1:
                  case "end":
                    return e.stop();
                }
            }, e);
          }),
        )();
      };
    function N(t) {
      return (
        (N =
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
        N(t)
      );
    }
    function k() {
      k = function () {
        return e;
      };
      var t,
        e = {},
        n = Object.prototype,
        r = n.hasOwnProperty,
        o =
          Object.defineProperty ||
          function (t, e, n) {
            t[e] = n.value;
          },
        i = "function" == typeof Symbol ? Symbol : {},
        a = i.iterator || "@@iterator",
        l = i.asyncIterator || "@@asyncIterator",
        u = i.toStringTag || "@@toStringTag";
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
      function s(t, e, n, r) {
        var i = e && e.prototype instanceof g ? e : g,
          a = Object.create(i.prototype),
          l = new B(r || []);
        return o(a, "_invoke", { value: x(t, n, l) }), a;
      }
      function f(t, e, n) {
        try {
          return { type: "normal", arg: t.call(e, n) };
        } catch (t) {
          return { type: "throw", arg: t };
        }
      }
      e.wrap = s;
      var h = "suspendedStart",
        y = "suspendedYield",
        d = "executing",
        p = "completed",
        v = {};
      function g() {}
      function m() {}
      function b() {}
      var w = {};
      c(w, a, function () {
        return this;
      });
      var E = Object.getPrototypeOf,
        L = E && E(E(C([])));
      L && L !== n && r.call(L, a) && (w = L);
      var A = (b.prototype = g.prototype = Object.create(w));
      function F(t) {
        ["next", "throw", "return"].forEach(function (e) {
          c(t, e, function (t) {
            return this._invoke(e, t);
          });
        });
      }
      function S(t, e) {
        function n(o, i, a, l) {
          var u = f(t[o], t, i);
          if ("throw" !== u.type) {
            var c = u.arg,
              s = c.value;
            return s && "object" == N(s) && r.call(s, "__await")
              ? e.resolve(s.__await).then(
                  function (t) {
                    n("next", t, a, l);
                  },
                  function (t) {
                    n("throw", t, a, l);
                  },
                )
              : e.resolve(s).then(
                  function (t) {
                    (c.value = t), a(c);
                  },
                  function (t) {
                    return n("throw", t, a, l);
                  },
                );
          }
          l(u.arg);
        }
        var i;
        o(this, "_invoke", {
          value: function (t, r) {
            function o() {
              return new e(function (e, o) {
                n(t, r, e, o);
              });
            }
            return (i = i ? i.then(o, o) : o());
          },
        });
      }
      function x(e, n, r) {
        var o = h;
        return function (i, a) {
          if (o === d) throw Error("Generator is already running");
          if (o === p) {
            if ("throw" === i) throw a;
            return { value: t, done: !0 };
          }
          for (r.method = i, r.arg = a; ; ) {
            var l = r.delegate;
            if (l) {
              var u = R(l, r);
              if (u) {
                if (u === v) continue;
                return u;
              }
            }
            if ("next" === r.method) r.sent = r._sent = r.arg;
            else if ("throw" === r.method) {
              if (o === h) throw ((o = p), r.arg);
              r.dispatchException(r.arg);
            } else "return" === r.method && r.abrupt("return", r.arg);
            o = d;
            var c = f(e, n, r);
            if ("normal" === c.type) {
              if (((o = r.done ? p : y), c.arg === v)) continue;
              return { value: c.arg, done: r.done };
            }
            "throw" === c.type &&
              ((o = p), (r.method = "throw"), (r.arg = c.arg));
          }
        };
      }
      function R(e, n) {
        var r = n.method,
          o = e.iterator[r];
        if (o === t)
          return (
            (n.delegate = null),
            ("throw" === r &&
              e.iterator.return &&
              ((n.method = "return"),
              (n.arg = t),
              R(e, n),
              "throw" === n.method)) ||
              ("return" !== r &&
                ((n.method = "throw"),
                (n.arg = new TypeError(
                  "The iterator does not provide a '" + r + "' method",
                )))),
            v
          );
        var i = f(o, e.iterator, n.arg);
        if ("throw" === i.type)
          return (n.method = "throw"), (n.arg = i.arg), (n.delegate = null), v;
        var a = i.arg;
        return a
          ? a.done
            ? ((n[e.resultName] = a.value),
              (n.next = e.nextLoc),
              "return" !== n.method && ((n.method = "next"), (n.arg = t)),
              (n.delegate = null),
              v)
            : a
          : ((n.method = "throw"),
            (n.arg = new TypeError("iterator result is not an object")),
            (n.delegate = null),
            v);
      }
      function M(t) {
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
          t.forEach(M, this),
          this.reset(!0);
      }
      function C(e) {
        if (e || "" === e) {
          var n = e[a];
          if (n) return n.call(e);
          if ("function" == typeof e.next) return e;
          if (!isNaN(e.length)) {
            var o = -1,
              i = function n() {
                for (; ++o < e.length; )
                  if (r.call(e, o)) return (n.value = e[o]), (n.done = !1), n;
                return (n.value = t), (n.done = !0), n;
              };
            return (i.next = i);
          }
        }
        throw new TypeError(N(e) + " is not iterable");
      }
      return (
        (m.prototype = b),
        o(A, "constructor", { value: b, configurable: !0 }),
        o(b, "constructor", { value: m, configurable: !0 }),
        (m.displayName = c(b, u, "GeneratorFunction")),
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
              : ((t.__proto__ = b), c(t, u, "GeneratorFunction")),
            (t.prototype = Object.create(A)),
            t
          );
        }),
        (e.awrap = function (t) {
          return { __await: t };
        }),
        F(S.prototype),
        c(S.prototype, l, function () {
          return this;
        }),
        (e.AsyncIterator = S),
        (e.async = function (t, n, r, o, i) {
          void 0 === i && (i = Promise);
          var a = new S(s(t, n, r, o), i);
          return e.isGeneratorFunction(n)
            ? a
            : a.next().then(function (t) {
                return t.done ? t.value : a.next();
              });
        }),
        F(A),
        c(A, u, "Generator"),
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
        (e.values = C),
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
            function o(r, o) {
              return (
                (l.type = "throw"),
                (l.arg = e),
                (n.next = r),
                o && ((n.method = "next"), (n.arg = t)),
                !!o
              );
            }
            for (var i = this.tryEntries.length - 1; i >= 0; --i) {
              var a = this.tryEntries[i],
                l = a.completion;
              if ("root" === a.tryLoc) return o("end");
              if (a.tryLoc <= this.prev) {
                var u = r.call(a, "catchLoc"),
                  c = r.call(a, "finallyLoc");
                if (u && c) {
                  if (this.prev < a.catchLoc) return o(a.catchLoc, !0);
                  if (this.prev < a.finallyLoc) return o(a.finallyLoc);
                } else if (u) {
                  if (this.prev < a.catchLoc) return o(a.catchLoc, !0);
                } else {
                  if (!c) throw Error("try statement without catch or finally");
                  if (this.prev < a.finallyLoc) return o(a.finallyLoc);
                }
              }
            }
          },
          abrupt: function (t, e) {
            for (var n = this.tryEntries.length - 1; n >= 0; --n) {
              var o = this.tryEntries[n];
              if (
                o.tryLoc <= this.prev &&
                r.call(o, "finallyLoc") &&
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
              var n = this.tryEntries[e];
              if (n.finallyLoc === t)
                return this.complete(n.completion, n.afterLoc), O(n), v;
            }
          },
          catch: function (t) {
            for (var e = this.tryEntries.length - 1; e >= 0; --e) {
              var n = this.tryEntries[e];
              if (n.tryLoc === t) {
                var r = n.completion;
                if ("throw" === r.type) {
                  var o = r.arg;
                  O(n);
                }
                return o;
              }
            }
            throw Error("illegal catch attempt");
          },
          delegateYield: function (e, n, r) {
            return (
              (this.delegate = { iterator: C(e), resultName: n, nextLoc: r }),
              "next" === this.method && (this.arg = t),
              v
            );
          },
        }),
        e
      );
    }
    function D(t, e, n, r, o, i, a) {
      try {
        var l = t[i](a),
          u = l.value;
      } catch (t) {
        return void n(t);
      }
      l.done ? e(u) : Promise.resolve(u).then(r, o);
    }
    function j(t) {
      return function () {
        var e = this,
          n = arguments;
        return new Promise(function (r, o) {
          var i = t.apply(e, n);
          function a(t) {
            D(i, r, o, a, l, "next", t);
          }
          function l(t) {
            D(i, r, o, a, l, "throw", t);
          }
          a(void 0);
        });
      };
    }
    function I(t, e) {
      var n =
        ("undefined" != typeof Symbol && t[Symbol.iterator]) || t["@@iterator"];
      if (!n) {
        if (
          Array.isArray(t) ||
          (n = (function (t, e) {
            if (t) {
              if ("string" == typeof t) return P(t, e);
              var n = {}.toString.call(t).slice(8, -1);
              return (
                "Object" === n && t.constructor && (n = t.constructor.name),
                "Map" === n || "Set" === n
                  ? Array.from(t)
                  : "Arguments" === n ||
                      /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
                    ? P(t, e)
                    : void 0
              );
            }
          })(t)) ||
          (e && t && "number" == typeof t.length)
        ) {
          n && (t = n);
          var r = 0,
            o = function () {};
          return {
            s: o,
            n: function () {
              return r >= t.length ? { done: !0 } : { done: !1, value: t[r++] };
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
          (l = !0), (i = t);
        },
        f: function () {
          try {
            a || null == n.return || n.return();
          } finally {
            if (l) throw i;
          }
        },
      };
    }
    function P(t, e) {
      (null == e || e > t.length) && (e = t.length);
      for (var n = 0, r = Array(e); n < e; n++) r[n] = t[n];
      return r;
    }
    function T(t, e) {
      for (var n = 0; n < e.length; n++) {
        var r = e[n];
        (r.enumerable = r.enumerable || !1),
          (r.configurable = !0),
          "value" in r && (r.writable = !0),
          Object.defineProperty(t, G(r.key), r);
      }
    }
    function G(t) {
      var e = (function (t) {
        if ("object" != N(t) || !t) return t;
        var e = t[Symbol.toPrimitive];
        if (void 0 !== e) {
          var n = e.call(t, "string");
          if ("object" != N(n)) return n;
          throw new TypeError("@@toPrimitive must return a primitive value.");
        }
        return String(t);
      })(t);
      return "symbol" == N(e) ? e : e + "";
    }
    var _ = (function () {
      return (
        (t = function t() {
          !(function (t, e) {
            if (!(t instanceof e))
              throw new TypeError("Cannot call a class as a function");
          })(this, t),
            (this.anim = new m()),
            (this.state = {
              balance: 1e3,
              bet: 100,
              lastWin: 0,
              totalWins: 0,
              spinning: !1,
              autoplay: !1,
              turbo: !1,
              spinCount: 0,
              lossStreak: 0,
              config: null,
            }),
            (this.strips = (function () {
              for (var t = [], e = 0; e < 3; e++) {
                for (var n = [], r = 0; r < 30; r++) n.push(u());
                t.push(n);
              }
              return t;
            })()),
            (this.grid = [
              ["BAR", "BAR", "BAR"],
              ["BAR", "BAR", "BAR"],
              ["BAR", "BAR", "BAR"],
            ]),
            (this.el = {}),
            (this.reelEls = null),
            this.init();
        }),
        (e = [
          {
            key: "init",
            value: function () {
              this.cacheDOM(),
                this.ensureSymbols(),
                this.loadConfig(),
                this.bindEvents(),
                this.renderGrid(),
                this.updateUI(),
                this.showMsg("🎰 PULL TO WIN");
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
              this.reelEls = document.querySelectorAll(".reel");
            },
          },
          {
            key: "ensureSymbols",
            value: function () {
              if (this.reelEls) {
                var t,
                  e = I(this.reelEls);
                try {
                  for (e.s(); !(t = e.n()).done; ) {
                    var n = t.value,
                      r = n.querySelectorAll(".sym");
                    if (0 === r.length) {
                      for (var o = 0; o < 3; o++) {
                        var i = document.createElement("div");
                        (i.className = "sym"), n.appendChild(i);
                      }
                      r = n.querySelectorAll(".sym");
                    }
                  }
                } catch (t) {
                  e.e(t);
                } finally {
                  e.f();
                }
              }
            },
          },
          {
            key: "loadConfig",
            value:
              ((o = j(
                k().mark(function t() {
                  var e, n;
                  return k().wrap(
                    function (t) {
                      for (;;)
                        switch ((t.prev = t.next)) {
                          case 0:
                            return (t.prev = 0), (t.next = 3), B();
                          case 3:
                            (e = t.sent),
                              (this.state.config = e),
                              e &&
                                e.betAmount &&
                                (this.state.bet = e.betAmount),
                              (t.next = 10);
                            break;
                          case 8:
                            (t.prev = 8), (t.t0 = t.catch(0));
                          case 10:
                            (n = localStorage.getItem("slot777_balance"))
                              ? (this.state.balance = parseInt(n, 10))
                              : this.state.config &&
                                this.state.config.startingMoney &&
                                (this.state.balance =
                                  this.state.config.startingMoney),
                              C(this.state.balance),
                              this.updateUI();
                          case 14:
                          case "end":
                            return t.stop();
                        }
                    },
                    t,
                    this,
                    [[0, 8]],
                  );
                }),
              )),
              function () {
                return o.apply(this, arguments);
              }),
          },
          {
            key: "bindEvents",
            value: function () {
              var t,
                e,
                n,
                r,
                o,
                i,
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
                null === (o = this.el.maxBet) ||
                  void 0 === o ||
                  o.addEventListener("click", function () {
                    return l.maxBet();
                  }),
                null === (i = this.el.autoplay) ||
                  void 0 === i ||
                  i.addEventListener("change", function () {
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
              ((r = j(
                k().mark(function t() {
                  var e, n;
                  return k().wrap(
                    function (t) {
                      for (;;)
                        switch ((t.prev = t.next)) {
                          case 0:
                            return (t.prev = 0), (t.next = 3), B();
                          case 3:
                            (n = t.sent), (this.state.config = n), (t.next = 9);
                            break;
                          case 7:
                            (t.prev = 7), (t.t0 = t.catch(0));
                          case 9:
                            (this.state.balance =
                              (null === (e = this.state.config) || void 0 === e
                                ? void 0
                                : e.startingMoney) || 1e3),
                              (this.state.lossStreak = 0),
                              localStorage.setItem(
                                "slot777_balance",
                                this.state.balance,
                              ),
                              C(this.state.balance),
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
            key: "renderGrid",
            value: function () {
              for (
                var t = this.getSymRender(), e = 0;
                e < 3 && this.reelEls && e < this.reelEls.length;
                e++
              )
                for (
                  var n = this.reelEls[e].querySelectorAll(".sym"), r = 0;
                  r < 3 && r < n.length;
                  r++
                ) {
                  var o,
                    i =
                      t[
                        (null === (o = this.grid[e]) || void 0 === o
                          ? void 0
                          : o[r]) || "BAR"
                      ] || t.BAR;
                  (n[r].textContent = i.icon),
                    (n[r].style.background = i.bg),
                    (n[r].style.color = i.color),
                    (n[r].className = "sym");
                }
            },
          },
          {
            key: "spin",
            value:
              ((n = j(
                k().mark(function t() {
                  var e,
                    n,
                    r,
                    o,
                    i,
                    a,
                    u,
                    c,
                    s,
                    f,
                    h,
                    y,
                    d,
                    p,
                    v,
                    g,
                    m,
                    b,
                    w,
                    E,
                    L,
                    A,
                    F,
                    S,
                    x,
                    R,
                    M = this;
                  return k().wrap(
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
                                C(this.state.balance),
                                o = this.state.config || {},
                                i =
                                  null !== (e = o.winRate) && void 0 !== e
                                    ? e
                                    : 0.15,
                                a =
                                  null !== (n = o.payoutMultiplier) &&
                                  void 0 !== n
                                    ? n
                                    : 3,
                                u =
                                  null !== (r = o.minSpinsBeforeWin) &&
                                  void 0 !== r
                                    ? r
                                    : 0,
                                this.state.lossStreak =
                                  this.state.lossStreak || 0,
                                c = !1,
                                u > 0 &&
                                  this.state.lossStreak >= u &&
                                  ((c = !0), (this.state.lossStreak = 0)),
                                s = this.generateResult(c ? 1 : i, a),
                                f = s.grid,
                                h = s.wins,
                                this.grid = f,
                                y = l(h),
                                d = this.state.turbo ? 300 : 700,
                                p = this.state.turbo ? 80 : 150,
                                this.showMsg(
                                  y > 0 ? "🎰 WINNING..." : "🎰 SPINNING...",
                                ),
                                v = [],
                                g = 0;
                              g < 3 && g < this.reelEls.length;
                              g++
                            )
                              (m = this.reelEls[g]),
                                (b = this.grid[g] || ["BAR", "BAR", "BAR"]),
                                v.push(this.anim.spinReel(m, b, d, g * p));
                            return (t.next = 31), Promise.all(v);
                          case 31:
                            if (
                              ((this.state.lastWin = y),
                              (this.state.totalWins += y),
                              y > 0)
                            ) {
                              (this.state.balance += y),
                                (this.state.lossStreak = 0),
                                (w = []),
                                (E = I(h));
                              try {
                                for (E.s(); !(L = E.n()).done; ) {
                                  (A = L.value), (F = I(A.positions));
                                  try {
                                    for (F.s(); !(S = F.n()).done; )
                                      (x = S.value), w.push(x);
                                  } catch (t) {
                                    F.e(t);
                                  } finally {
                                    F.f();
                                  }
                                }
                              } catch (t) {
                                E.e(t);
                              } finally {
                                E.f();
                              }
                              this.anim.highlightWins(w),
                                this.showMsg(
                                  "🎉 WIN ".concat(this.fmt(y), "!"),
                                  "#FF6B6B",
                                ),
                                this.el.totalWinDisplay &&
                                  (this.anim.countUp(
                                    this.el.totalWinDisplay,
                                    y,
                                  ),
                                  this.anim.flashWin(this.el.totalWinDisplay)),
                                this.el.spinBtn &&
                                  ((R =
                                    this.el.spinBtn.getBoundingClientRect()),
                                  this.anim.burst(R.left + R.width / 2, R.top));
                            } else this.state.lossStreak++;
                            localStorage.setItem(
                              "slot777_balance",
                              this.state.balance,
                            ),
                              C(this.state.balance),
                              (this.state.spinning = !1),
                              this.el.spinBtn &&
                                (this.el.spinBtn.disabled = !1),
                              this.updateUI(),
                              this.state.autoplay &&
                              this.state.balance >= this.state.bet
                                ? setTimeout(
                                    function () {
                                      return M.spin();
                                    },
                                    this.state.turbo ? 100 : 400,
                                  )
                                : (this.el.autoplay &&
                                    (this.el.autoplay.checked = !1),
                                  (this.state.autoplay = !1));
                          case 40:
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
            key: "generateResult",
            value: function (t, e) {
              var n;
              if (Math.random() < t) {
                var r = u(),
                  o = [
                    [u(), r, u()],
                    [u(), r, u()],
                    [u(), r, u()],
                  ],
                  i = a(o, this.state.bet);
                if (e && 1 !== e) {
                  var l,
                    c = I(i);
                  try {
                    for (c.s(); !(l = c.n()).done; ) {
                      var s = l.value;
                      s.amount = Math.floor(s.amount * e);
                    }
                  } catch (t) {
                    c.e(t);
                  } finally {
                    c.f();
                  }
                }
                if (
                  0 === i.length &&
                  ((o[0][1] = r),
                  (o[1][1] = r),
                  (o[2][1] = r),
                  (i = a(o, this.state.bet)),
                  e && 1 !== e)
                ) {
                  var f,
                    h = I(i);
                  try {
                    for (h.s(); !(f = h.n()).done; ) {
                      var y = f.value;
                      y.amount = Math.floor(y.amount * e);
                    }
                  } catch (t) {
                    h.e(t);
                  } finally {
                    h.f();
                  }
                }
                return { grid: o, wins: i };
              }
              var d = 0;
              do {
                (n = [
                  [u(), u(), u()],
                  [u(), u(), u()],
                  [u(), u(), u()],
                ]),
                  d++;
              } while (a(n, this.state.bet).length > 0 && d < 50);
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
          {
            key: "getSymRender",
            value: function () {
              return {
                DIAMOND: {
                  icon: "💎",
                  bg: "linear-gradient(135deg,#003366,#0099FF,#003366)",
                  color: "#00FFFF",
                },
                SEVEN: {
                  icon: "7",
                  bg: "linear-gradient(135deg,#8B0000,#FF0000,#8B0000)",
                  color: "#FFD700",
                },
                BAR: {
                  icon: "BAR",
                  bg: "linear-gradient(135deg,#1a1a2e,#444466,#1a1a2e)",
                  color: "#FFFFFF",
                },
                BELL: {
                  icon: "🔔",
                  bg: "linear-gradient(135deg,#4a0030,#8b0060,#4a0030)",
                  color: "#FFD700",
                },
                CHERRY: {
                  icon: "🍒",
                  bg: "linear-gradient(135deg,#660000,#CC0033,#660000)",
                  color: "#FFCCCC",
                },
                LEMON: {
                  icon: "🍋",
                  bg: "linear-gradient(135deg,#3a5000,#8BB800,#3a5000)",
                  color: "#FFFFCC",
                },
                ORANGE: {
                  icon: "🍊",
                  bg: "linear-gradient(135deg,#803000,#FF6600,#803000)",
                  color: "#FFFFFF",
                },
                PLUM: {
                  icon: "🍑",
                  bg: "linear-gradient(135deg,#400060,#9900CC,#400060)",
                  color: "#FFDDFF",
                },
                WATERMELON: {
                  icon: "🍉",
                  bg: "linear-gradient(135deg,#004D00,#00AA00,#004D00)",
                  color: "#CCFFCC",
                },
                GRAPES: {
                  icon: "🍇",
                  bg: "linear-gradient(135deg,#1a003a,#6600AA,#1a003a)",
                  color: "#DDCCFF",
                },
              };
            },
          },
        ]),
        e && T(t.prototype, e),
        Object.defineProperty(t, "prototype", { writable: !1 }),
        t
      );
      var t, e, n, r, o;
    })();
    "loading" === document.readyState
      ? document.addEventListener("DOMContentLoaded", function () {
          return new _();
        })
      : new _();
  })();
})();
