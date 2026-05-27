import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/contact_scoped.css";

const Contact = () => {
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
      "/js/contact.js"
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
    <div id="page-contact">
      <div className="info-canvas" id="contact-canvas"></div>
      <div className="info-vignette"></div>

      <div className="intro-overlay" id="intro-overlay"></div>

      <div className="page-title" id="page-title">Contact</div>

      <a className="back-btn" id="back-btn" href="/" aria-label="Retour à l'accueil">
        <span className="chr-hover" data-chr="Back"></span>
      </a>

      <main className="info-main contact-main" id="contact-main">
        <section className="info-left contact-left">
          <div className="contact-panel">
            <h2 className="contact-panel-title" data-i18n="contact.panel.title">Let's talk about your project.</h2>
            <p className="contact-panel-copy" data-i18n="contact.panel.copy">
              I respond quickly to queries regarding collaborations, data science projects, and freelance opportunities.
            </p>
          </div>
          <div className="info-meta">
            <span className="info-meta-label" data-i18n="contact.meta.base">Base</span>
            <span className="info-meta-value" data-i18n="contact.meta.base.value">Kolkata, India</span>
          </div>
          <div className="info-meta">
            <span className="info-meta-label" data-i18n="contact.meta.status">Status</span>
            <span className="info-meta-value" data-i18n="contact.meta.status.value">Student / Freelance</span>
          </div>
          <div className="info-meta">
            <span className="info-meta-label" data-i18n="contact.meta.delay">Avg. response</span>
            <span className="info-meta-value" data-i18n="contact.meta.delay.value">24h</span>
          </div>
        </section>

        <section className="info-right contact-right">
          <div className="info-headline">
            <span className="info-eyebrow" data-i18n="contact.eyebrow">Contact</span>
            <h1 className="info-name">Let&rsquo;s build together.</h1>
            <p className="info-role" data-i18n="contact.role">Commerce student specializing in business strategy, data analytics, and web technology.</p>
          </div>

          <p className="info-desc" data-i18n="contact.desc">
            If you have a business problem to solve, a data analysis project, or an interesting collaboration in mind, I would love to hear from you.
          </p>

          <div className="contact-links">
            <div className="skill-col">
              <div className="skill-col-title" data-i18n="contact.shortcuts">Shortcuts</div>
              <ul>
                <li><a className="contact-link" href="mailto:abdulmoquit00007@gmail.com" data-i18n="contact.maildirect">Direct mail</a></li>
                <li><a className="contact-link" href="https://www.linkedin.com/in/abdul-moquit-523bb5389/" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
                <li><a className="contact-link" href="https://github.com/abdulmoquit" target="_blank" rel="noopener noreferrer">GitHub</a></li>
              </ul>
            </div>
            <div className="skill-col">
              <div className="skill-col-title" data-i18n="contact.brief">Brief format</div>
              <ul>
                <li data-i18n="contact.brief.product">Business objective</li>
                <li data-i18n="contact.brief.deadline">Target deadline</li>
                <li data-i18n="contact.brief.stack">Preferred tech stack</li>
                <li data-i18n="contact.brief.deliverables">Expected outputs</li>
              </ul>
            </div>
          </div>
        </section>
      </main>

      <div className="info-bottom" id="contact-bottom">
        <a className="info-mail chr-hover" data-chr="abdulmoquit00007@gmail.com" href="mailto:abdulmoquit00007@gmail.com"></a>
        <span className="info-version">AVAILABLE 2026</span>
      </div>
    </div>
  );
};

export default Contact;
