import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/works_scoped.css";

const Works = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // 1. Hook up smooth React routing callback for the vanilla JS transition scripts
    window.__navigate = (href: string) => {
      let route = "/";
      if (href.includes("works")) route = "/works";
      else if (href.includes("info")) route = "/info";
      else if (href.includes("contact")) route = "/contact";
      navigate(route);
    };

    // 2. Intercept and sandbox all event listeners and animation loops for clean navigation unmounting
    const activeListeners: {
      target: EventTarget;
      type: string;
      listener: EventListenerOrEventListenerObject;
      options?: boolean | AddEventListenerOptions;
    }[] = [];
    const originalWindowAdd = window.addEventListener;
    const originalDocAdd = document.addEventListener;

    window.addEventListener = (type, listener, options) => {
      activeListeners.push({ target: window, type, listener, options });
      originalWindowAdd.call(window, type, listener, options);
    };
    document.addEventListener = (type, listener, options) => {
      activeListeners.push({ target: document, type, listener, options });
      originalDocAdd.call(document, type, listener, options);
    };

    const activeRAFs: number[] = [];
    const originalRAF = window.requestAnimationFrame;
    window.requestAnimationFrame = (callback) => {
      const id = originalRAF(callback);
      activeRAFs.push(id);
      return id;
    };

    const activeTimeouts: any[] = [];
    const originalTimeout = window.setTimeout;
    window.setTimeout = (callback: any, delay: any) => {
      const id = originalTimeout(callback, delay);
      activeTimeouts.push(id);
      return id;
    };

    // 3. Sequentially mount vanilla JS dependencies
    const scripts = [
      "/js/i18n.js",
      "/js/vendor/gsap.min.js",
      "/js/works.js"
    ];

    let loadedCount = 0;
    const scriptElements: HTMLScriptElement[] = [];

    const loadNextScript = () => {
      if (loadedCount >= scripts.length) {
        // Trigger initial resize & scroll triggers
        window.dispatchEvent(new Event("resize"));
        return;
      }
      const script = document.createElement("script");
      script.src = scripts[loadedCount];
      script.async = false;
      script.onload = () => {
        loadedCount++;
        loadNextScript();
      };
      document.body.appendChild(script);
      scriptElements.push(script);
    };

    loadNextScript();

    // 4. Teardown sandbox environment on route change
    return () => {
      window.addEventListener = originalWindowAdd;
      document.addEventListener = originalDocAdd;
      window.requestAnimationFrame = originalRAF;
      window.setTimeout = originalTimeout;

      // Remove DOM script tags
      scriptElements.forEach((s) => {
        if (s.parentNode) s.parentNode.removeChild(s);
      });

      // Remove bound event listeners
      activeListeners.forEach(({ target, type, listener, options }) => {
        target.removeEventListener(type, listener, options);
      });

      // Clear timers
      activeTimeouts.forEach((id) => window.clearTimeout(id));

      // Kill ScrollTrigger instances and GSAP tweens
      if ((window as any).ScrollTrigger) {
        (window as any).ScrollTrigger.getAll().forEach((t: any) => t.kill());
      }
      if ((window as any).gsap) {
        (window as any).gsap.killTweensOf("*");
      }

      // Cancel animation frames AFTER killing GSAP tweens, then wake the
      // ticker so the next page's GSAP instance can animate immediately.
      activeRAFs.forEach((id) => window.cancelAnimationFrame(id));
      if ((window as any).gsap && (window as any).gsap.ticker) {
        (window as any).gsap.ticker.wake();
      }

      // Cleanup window properties
      delete (window as any).__navigate;

      // Reset styles added to document/body elements
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      document.body.style.cursor = "";
    };
  }, [navigate]);

  return (
    <div id="page-works">
      <div className="intro-overlay" id="intro-overlay"></div>
      <div className="page-title" id="page-title">Work</div>

      <h1 className="sr-only" data-i18n="works.h1">
        Projets — Luke Baffait, Creative Developer. Découvrez mes réalisations en développement web, animation et design interactif.
      </h1>

      <a className="back-btn" id="back-btn" href="/" aria-label="Retour à l'accueil">
        <span className="chr-hover" data-chr="Back"></span>
      </a>

      <div className="scroll-hint" id="scroll-hint">Scroll to explore</div>

      <div className="scroll-chevron" id="scroll-chevron">
        <svg viewBox="0 0 24 24">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>

      <canvas className="ruler" id="ruler-left"></canvas>
      <canvas className="ruler" id="ruler-right"></canvas>
      <div className="counter-wrap" id="counter-wrap">
        <div className="counter-window">
          <div className="counter-strip" id="counter-strip"></div>
        </div>
      </div>

      <div className="cube-viewport" id="cube-viewport">
        <div className="cube-scene">
          <div className="cube" id="cube">
            <div className="cube-face" data-face="0"></div>
            <div className="cube-face" data-face="1"></div>
            <div className="cube-face" data-face="2"></div>
            <div className="cube-face" data-face="3"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Works;
