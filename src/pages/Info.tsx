import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/info_scoped.css";

const Info = () => {
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
      "/js/core-renderer.js",
      "/js/hero-project.js",
      "/js/vendor/gsap.min.js",
      "/js/info.js"
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
    <div id="page-info">
      <div className="info-canvas" id="info-canvas"></div>
      <div className="info-vignette"></div>

      <div className="intro-overlay" id="intro-overlay"></div>

      <div className="page-title" id="page-title">Info</div>

      <a className="back-btn" id="back-btn" href="/" aria-label="Retour à l'accueil">
        <span className="chr-hover" data-chr="Back"></span>
      </a>

      <main className="info-main" id="info-main">
        <section className="info-left">
          <div className="info-photo-wrap">
            <img className="info-photo" src="assets/images/profile/david_cyborg.jpg" alt="Abdul Moquit" decoding="async" />
            <span className="frame-corner tl"></span>
            <span className="frame-corner tr"></span>
            <span className="frame-corner bl"></span>
            <span className="frame-corner br"></span>
          </div>
          <div className="info-meta">
            <span className="info-meta-label" data-i18n="info.meta.based">Based in</span>
            <span className="info-meta-value" data-i18n="info.meta.based.value">Kolkata, India</span>
          </div>
          <div className="info-meta">
            <span className="info-meta-label" data-i18n="info.meta.status">Status</span>
            <span className="info-meta-value" data-i18n="info.meta.status.value">Student / Freelance</span>
          </div>
        </section>

        <section className="info-right">
          <div className="info-headline">
            <span className="info-eyebrow" data-i18n="info.eyebrow">About</span>
            <h1 className="info-name">Abdul Moquit.</h1>
            <p className="info-role" data-i18n="info.role">Commerce student specializing in business strategy, data analytics, and web technology.</p>
          </div>

          <p className="info-desc" data-i18n="info.desc">
            As a commerce student, I build analytics solutions, bridging the gap between business strategy and technical execution. I explore how data can drive business value.
          </p>

          <div className="info-skills">
            <div className="skill-col">
              <div className="skill-col-title" data-i18n="info.skills.programming">Programming</div>
              <ul>
                <li>Python</li>
                <li>SQL</li>
                <li>JavaScript</li>
                <li>HTML / CSS</li>
              </ul>
            </div>
            <div className="skill-col">
              <div className="skill-col-title" data-i18n="info.skills.datascience">Data Science</div>
              <ul>
                <li>Data Analysis</li>
                <li>Machine Learning</li>
                <li>Pandas · NumPy</li>
                <li>Scikit-Learn</li>
                <li>Tableau</li>
              </ul>
            </div>
            <div className="skill-col">
              <div className="skill-col-title" data-i18n="info.skills.tools">Tools</div>
              <ul>
                <li>Git · GitHub</li>
                <li>Jupyter Notebook</li>
                <li>MS Excel</li>
                <li>VS Code</li>
              </ul>
            </div>
            <div className="skill-col">
              <div className="skill-col-title" data-i18n="info.skills.business">Business</div>
              <ul>
                <li>Market Research</li>
                <li>Financial Analysis</li>
                <li>Business Metrics</li>
                <li>Data Visualization</li>
              </ul>
            </div>
          </div>
        </section>
      </main>

      <div className="info-bottom" id="info-bottom">
        <a className="info-mail chr-hover" data-chr="abdulmoquit00007@gmail.com" href="mailto:abdulmoquit00007@gmail.com"></a>
      </div>
    </div>
  );
};

export default Info;
