(() => {
  "use strict";
  const t = {};
  let e = !0,
    o = (t = 500) => {
      let o = document.querySelector("body");
      if (e) {
        let c = document.querySelectorAll("[data-lp]");
        setTimeout(() => {
          for (let t = 0; t < c.length; t++) {
            c[t].style.paddingRight = "0px";
          }
          (o.style.paddingRight = "0px"),
            document.documentElement.classList.remove("lock");
        }, t),
          (e = !1),
          setTimeout(function () {
            e = !0;
          }, t);
      }
    },
    c = (t = 500) => {
      let o = document.querySelector("body");
      if (e) {
        let c = document.querySelectorAll("[data-lp]");
        for (let t = 0; t < c.length; t++) {
          c[t].style.paddingRight =
            window.innerWidth -
            document.querySelector(".wrapper").offsetWidth +
            "px";
        }
        (o.style.paddingRight =
          window.innerWidth -
          document.querySelector(".wrapper").offsetWidth +
          "px"),
          document.documentElement.classList.add("lock"),
          (e = !1),
          setTimeout(function () {
            e = !0;
          }, t);
      }
    };
  function r(t) {
    setTimeout(() => {
      window.FLS && console.log(t);
    }, 0);
  }
  function n(t) {
    return t.filter(function (t, e, o) {
      return o.indexOf(t) === e;
    });
  }
  let a = (t, e = !1, c = 500, n = 0) => {
    const a = "string" == typeof t ? document.querySelector(t) : t;
    if (a) {
      let s = "",
        l = 0;
      e &&
        ((s = "header.header"), (l = document.querySelector(s).offsetHeight));
      let i = {
        speedAsDuration: !0,
        speed: c,
        header: s,
        offset: n,
        easing: "easeOutQuad",
      };
      if (
        (document.documentElement.classList.contains("menu-open") &&
          (o(), document.documentElement.classList.remove("menu-open")),
        "undefined" != typeof SmoothScroll)
      )
        new SmoothScroll().animateScroll(a, "", i);
      else {
        let t = a.getBoundingClientRect().top + scrollY;
        window.scrollTo({ top: l ? t - l : t, behavior: "smooth" });
      }
      r(`[gotoBlock]: ????????...???????? ?? ${t}`);
    } else r(`[gotoBlock]: ???? ????..???????????? ?????????? ?????? ???? ????????????????: ${t}`);
  };
  t.watcher = new (class {
    constructor(t) {
      (this.config = Object.assign({ logging: !0 }, t)),
        this.observer,
        !document.documentElement.classList.contains("watcher") &&
          this.scrollWatcherRun();
    }
    scrollWatcherUpdate() {
      this.scrollWatcherRun();
    }
    scrollWatcherRun() {
      document.documentElement.classList.add("watcher"),
        this.scrollWatcherConstructor(
          document.querySelectorAll("[data-watch]")
        );
    }
    scrollWatcherConstructor(t) {
      if (t.length) {
        this.scrollWatcherLogging(
          `??????????????????, ?????????? ???? ?????????????????? (${t.length})...`
        ),
          n(
            Array.from(t).map(function (t) {
              return `${
                t.dataset.watchRoot ? t.dataset.watchRoot : null
              }|${t.dataset.watchMargin ? t.dataset.watchMargin : "0px"}|${t.dataset.watchThreshold ? t.dataset.watchThreshold : 0}`;
            })
          ).forEach((e) => {
            let o = e.split("|"),
              c = { root: o[0], margin: o[1], threshold: o[2] },
              r = Array.from(t).filter(function (t) {
                let e = t.dataset.watchRoot ? t.dataset.watchRoot : null,
                  o = t.dataset.watchMargin ? t.dataset.watchMargin : "0px",
                  r = t.dataset.watchThreshold ? t.dataset.watchThreshold : 0;
                if (
                  String(e) === c.root &&
                  String(o) === c.margin &&
                  String(r) === c.threshold
                )
                  return t;
              }),
              n = this.getScrollWatcherConfig(c);
            this.scrollWatcherInit(r, n);
          });
      } else
        this.scrollWatcherLogging("????????, ?????? ???????????????? ?????? ????????????????. ZzzZZzz");
    }
    getScrollWatcherConfig(t) {
      let e = {};
      if (
        (document.querySelector(t.root)
          ? (e.root = document.querySelector(t.root))
          : "null" !== t.root &&
            this.scrollWatcherLogging(
              `??????... ?????????????????????????? ?????????????? ${t.root} ?????? ???? ????????????????`
            ),
        (e.rootMargin = t.margin),
        !(t.margin.indexOf("px") < 0 && t.margin.indexOf("%") < 0))
      ) {
        if ("prx" === t.threshold) {
          t.threshold = [];
          for (let e = 0; e <= 1; e += 0.005) t.threshold.push(e);
        } else t.threshold = t.threshold.split(",");
        return (e.threshold = t.threshold), e;
      }
      this.scrollWatcherLogging(
        "???? ????, ?????????????????? data-watch-margin ?????????? ???????????????? ?? PX ?????? %"
      );
    }
    scrollWatcherCreate(t) {
      this.observer = new IntersectionObserver((t, e) => {
        t.forEach((t) => {
          this.scrollWatcherCallback(t, e);
        });
      }, t);
    }
    scrollWatcherInit(t, e) {
      this.scrollWatcherCreate(e), t.forEach((t) => this.observer.observe(t));
    }
    scrollWatcherIntersecting(t, e) {
      t.isIntersecting
        ? (!e.classList.contains("_watcher-view") &&
            e.classList.add("_watcher-view"),
          this.scrollWatcherLogging(
            `?? ???????? ${e.classList}, ?????????????? ?????????? _watcher-view`
          ))
        : (e.classList.contains("_watcher-view") &&
            e.classList.remove("_watcher-view"),
          this.scrollWatcherLogging(
            `?? ???? ???????? ${e.classList}, ?????????? ?????????? _watcher-view`
          ));
    }
    scrollWatcherOff(t, e) {
      e.unobserve(t),
        this.scrollWatcherLogging(`?? ???????????????? ?????????????? ???? ${t.classList}`);
    }
    scrollWatcherLogging(t) {
      this.config.logging && r(`[??????????????????????]: ${t}`);
    }
    scrollWatcherCallback(t, e) {
      const o = t.target;
      this.scrollWatcherIntersecting(t, o),
        o.hasAttribute("data-watch-once") &&
          t.isIntersecting &&
          this.scrollWatcherOff(o, e),
        document.dispatchEvent(
          new CustomEvent("watcherCallback", { detail: { entry: t } })
        );
    }
  })({});
  let s = !1;
  setTimeout(() => {
    if (s) {
      let t = new Event("windowScroll");
      window.addEventListener("scroll", function (e) {
        document.dispatchEvent(t);
      });
    }
  }, 0),
    (window.FLS = !0),
    (function (t) {
      let e = new Image();
      (e.onload = e.onerror =
        function () {
          t(2 == e.height);
        }),
        (e.src =
          "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA");
    })(function (t) {
      let e = !0 === t ? "webp" : "no-webp";
      document.documentElement.classList.add(e);
    }),
    (function () {
      let t = document.querySelector(".icon-menu");
      t &&
        t.addEventListener("click", function (t) {
          e &&
            (((t = 500) => {
              document.documentElement.classList.contains("lock") ? o(t) : c(t);
            })(),
            document.documentElement.classList.toggle("menu-open"));
        });
    })(),
    (function () {
      function t(t) {
        if ("click" === t.type) {
          const e = t.target;
          if (e.closest("[data-goto]")) {
            const o = e.closest("[data-goto]"),
              c = o.dataset.goto ? o.dataset.goto : "",
              r = !!o.hasAttribute("data-goto-header"),
              n = o.dataset.gotoSpeed ? o.dataset.gotoSpeed : "500";
            a(c, r, n), t.preventDefault();
          }
        } else if ("watcherCallback" === t.type && t.detail) {
          const e = t.detail.entry,
            o = e.target;
          if ("navigator" === o.dataset.watch) {
            const t = o.id,
              c =
                (document.querySelector("[data-goto]._navigator-active"),
                document.querySelector(`[data-goto="${t}"]`));
            e.isIntersecting
              ? c && c.classList.add("_navigator-active")
              : c && c.classList.remove("_navigator-active");
          }
        }
      }
      document.addEventListener("click", t),
        document.addEventListener("watcherCallback", t);
    })();
})();
