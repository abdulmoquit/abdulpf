import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/index_scoped.css";

const Index = () => {
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
      "/js/vendor/ScrollTrigger.min.js",
      "/js/vendor/lenis.min.js",
      "/js/index.js"
    ];

    let loadedCount = 0;
    const scriptElements: HTMLScriptElement[] = [];

    const loadNextScript = () => {
      if (loadedCount >= scripts.length) {
        // Trigger initial resize & scroll triggers
        window.dispatchEvent(new Event("resize"));
        window.dispatchEvent(new Event("scroll"));
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
    <div id="page-index">
      <div className="intro-bg" id="intro-bg"></div>

      <div className="name-layer" id="name-layer">
        <div className="preloader-content" id="preloader-content">
          <div id="preloader-logo">A</div>
          <span id="preloader-luke">bdul</span>
          <span id="preloader-baffait"> Moquit</span>
          <span id="preloader-dot">.</span>
        </div>
      </div>

      <div className="transition-panel" id="transition-panel">
        <div className="t-panel-dark" id="t-panel-dark"></div>
        <div className="t-panel-red" id="t-panel-red"></div>
      </div>

      <div className="scroll-wrap" id="scroll-wrap">
        <section className="hero" id="hero">
          <h1 className="sr-only" data-i18n="index.h1">
            Abdul Moquit — Portfolio. Commerce student passionate about business, data science, and technology based in Kolkata, India.
          </h1>
          <div className="hero-canvas" id="hero-canvas"></div>

          <div className="hero-content">
            <div className="hero-tagline" id="hero-tagline" data-i18n="index.hero.tagline">
              Commerce student, <span className="other-accent">bridging data and business</span>,<br />
              through analytics, technology and design.
            </div>

            <div className="hero-line" id="hero-line"></div>
            <div className="hero-bar" id="hero-bar">
              <div className="hero-bar-left">
              </div>
              <nav className="hero-bar-center" aria-label="Réseaux sociaux">
                <a className="chr-hover" data-chr="LinkedIn" href="https://www.linkedin.com/in/abdul-moquit-523bb5389/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"></a>
                <span className="sep" aria-hidden="true">/</span>
                <a className="chr-hover" data-chr="GitHub" href="https://github.com/abdulmoquit" target="_blank" rel="noopener noreferrer" aria-label="GitHub"></a>
              </nav>
              <nav className="hero-bar-right" aria-label="Navigation principale">
                <a className="chr-hover" data-chr="Work" href="works/" data-page-link="work" aria-label="Work"></a>
                <a className="chr-hover" data-chr="Info" href="info/" data-page-link="info" aria-label="Info"></a>
                <a className="chr-hover" data-chr="Contact" href="contact/" data-page-link="contact" aria-label="Contact"></a>
              </nav>
            </div>
          </div>
        </section>
      </div>

      <div className="reveal-image-wrap" id="reveal-image-wrap">
        <canvas className="reveal-image reveal-seq" id="reveal-canvas"></canvas>
        <div className="reveal-frame reveal-seq">
          <span className="reveal-corner tl"></span>
          <span className="reveal-corner tr"></span>
          <span className="reveal-corner bl"></span>
          <span className="reveal-corner br"></span>
        </div>
        <div className="reveal-overlay" id="reveal-overlay"></div>
        <p className="reveal-phrase" id="reveal-phrase">Basically, I make websites.</p>
      </div>

      <section className="section-after" id="section-after">
        <div className="about" id="about">
          <div className="about-text" id="about-text" data-i18n="index.about.text">
            As a <span className="other-accent">commerce student</span>, I build analytics solutions, bridging the gap between <span className="other-accent">business strategy</span> and technical execution.
          </div>
          <div className="about-sub" id="about-sub" data-i18n="index.about.sub">
            My name is Abdul Moquit. I am a commerce student based in Kolkata, India, passionate about data science, market research, and web technologies. I explore how data can drive business value.
          </div>
          <div className="about-btn">
            <a className="chr-hover" data-chr="Info" href="info/" data-page-link="info" aria-label="Learn more about me"></a>
          </div>

          <div className="about-photo-wrap" id="about-photo-wrap">
            <img className="about-photo" src="assets/images/profile/david_cyborg.jpg" alt="Abdul Moquit" decoding="async" width="2500" height="3001" />
          </div>
        </div>

        <div className="projects" id="projects">
          <svg className="fluid-line-svg" id="fluid-line-svg" viewBox="0 0 1400 1400" preserveAspectRatio="xMidYMid slice">
            <path className="fluid-line" id="fluid-line" d="
              M -80,0
              C 300,-20  600,150  540,400
              C 490,650   0,655    300,1050
              C 600,1385 650,1250 850,1200
              C 1050,1150 1350,1250 1540,1300
            " />
          </svg>
          <div className="projects-inner">
            <div className="projects-list" id="projects-list">
              <div className="proj-item" data-id="pricera" data-img="assets/images/projects/Covers/Pricera.png" data-date="05 2026">Pricera</div>
              <div className="proj-item" data-id="aniquahportfolio" data-img="assets/images/projects/Covers/AniquahPortfolio.png" data-date="04 2026">Aniquah Parvin</div>
              <div className="proj-item" data-id="calcuttafitness" data-img="assets/images/projects/Covers/CalcuttaFitness.png" data-date="03 2026">The Calcutta Fitness</div>
              <div className="proj-item" data-id="landsafe" data-img="assets/images/projects/Covers/LandSafe.png" data-date="02 2026">LandSafe</div>
              <div className="proj-item" data-id="pypredict" data-img="assets/images/projects/Covers/PyPredict.png" data-date="01 2026">PyPredict</div>
              <div className="proj-item" data-id="bizmetrics" data-img="assets/images/projects/Covers/BizMetrics.png" data-date="11 2025">BizMetrics</div>
              <div className="proj-item" data-id="queryvault" data-img="assets/images/projects/Covers/QueryVault.png" data-date="09 2025">QueryVault</div>
              <div className="proj-item" data-id="insightai" data-img="assets/images/projects/Covers/InsightAI.png" data-date="07 2025">InsightAI</div>
            </div>
          </div>
        </div>
      </section>

      <section className="circle-gallery" id="circle-gallery">
        <div className="circle-gallery-pin" id="circle-gallery-pin">
          <img className="cg-img" src="assets/images/projects/Covers/Pricera.png" alt="Pricera — AI-powered smart shopping platform" width="3000" height="2250" />
          <img className="cg-img" src="assets/images/projects/Covers/AniquahPortfolio.png" alt="Aniquah Parvin — client personal portfolio" width="3000" height="2250" />
          <img className="cg-img" src="assets/images/projects/Covers/CalcuttaFitness.png" alt="The Calcutta Fitness — fitness brand website" width="3000" height="2250" />
          <img className="cg-img" src="assets/images/projects/Covers/LandSafe.png" alt="LandSafe — AI-powered property verification platform" width="3000" height="2250" />
          <img className="cg-img" src="assets/images/projects/Covers/PyPredict.png" alt="PyPredict — ML prediction tool" width="2667" height="2000" />
          <img className="cg-img" src="assets/images/projects/Covers/BizMetrics.png" alt="BizMetrics — business KPI dashboard" width="2667" height="2000" />
          <img className="cg-img" src="assets/images/projects/Covers/QueryVault.png" alt="QueryVault — SQL database explorer" width="2667" height="2000" />
          <img className="cg-img" src="assets/images/projects/Covers/InsightAI.png" alt="InsightAI — AI-powered data insights" width="2667" height="2000" />
          <p className="cg-phrase" id="cg-phrase" data-i18n="index.cg.phrase">
            Each project is an opportunity to <span className="other-accent">learn</span>, <span className="other-accent">experiment</span> and push my limits.
          </p>
        </div>
      </section>

      <section className="skills" id="skills">
        <div className="skills-inner">
          <div className="skills-left">
            <div className="skills-subtitle" data-i18n="index.skills.subtitle">Skills</div>
            <div className="skills-text" data-i18n="index.skills.text">
              Commerce student passionate about business, data science, and technology. Specializing in data analysis, market research, and web application development.
            </div>
            <div className="skills-separator"></div>
            <div>
              <a className="skills-contact chr-hover" data-chr="Contact me🞣" href="contact/" data-page-link="contact" aria-label="Contact me"></a>
            </div>
            <div className="skills-arrow" id="skills-arrow">
              <svg style={{ width: "1.25em", height: "1.25em", verticalAlign: "-0.25em" }} viewBox="0 0 84 85" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M11 38H54L37 21H51L73 43L51 65H37L54 48H11Z" />
              </svg>
            </div>
          </div>
          <div className="skills-right" id="skills-right">
            <div className="skill-group open" data-group="programming">
              <div className="skill-header">
                <span className="skill-header-title" data-i18n="index.skills.programming">Programming</span>
                <span className="skill-header-icon"></span>
              </div>
              <div className="skill-body">
                <ul className="skill-body-inner">
                  <li>Python</li>
                  <li>SQL</li>
                  <li>JavaScript</li>
                  <li>HTML</li>
                  <li>CSS</li>
                </ul>
              </div>
            </div>
            <div className="skill-group" data-group="datascience">
              <div className="skill-header">
                <span className="skill-header-title" data-i18n="index.skills.datascience">Data Science</span>
                <span className="skill-header-icon"></span>
              </div>
              <div className="skill-body">
                <ul className="skill-body-inner">
                  <li>Data Analysis</li>
                  <li>Machine Learning</li>
                  <li>Pandas / NumPy</li>
                  <li>Scikit-Learn</li>
                  <li>Tableau</li>
                </ul>
              </div>
            </div>
            <div className="skill-group" data-group="webdev">
              <div className="skill-header">
                <span className="skill-header-title" data-i18n="index.skills.webdev">Web Development</span>
                <span className="skill-header-icon"></span>
              </div>
              <div className="skill-body">
                <ul className="skill-body-inner">
                  <li>React</li>
                  <li>Next.js</li>
                  <li>Node.js</li>
                  <li>Express.js</li>
                  <li>Tailwind CSS</li>
                  <li>Supabase</li>
                </ul>
              </div>
            </div>
            <div className="skill-group" data-group="tools">
              <div className="skill-header">
                <span className="skill-header-title" data-i18n="index.skills.tools">Tools &amp; Platforms</span>
                <span className="skill-header-icon"></span>
              </div>
              <div className="skill-body">
                <ul className="skill-body-inner">
                  <li>Git</li>
                  <li>GitHub</li>
                  <li>Jupyter Notebook</li>
                  <li>MS Excel</li>
                  <li>VS Code</li>
                </ul>
              </div>
            </div>
            <div className="skill-group" data-group="business">
              <div className="skill-header">
                <span className="skill-header-title" data-i18n="index.skills.business">Business &amp; Analytics</span>
                <span className="skill-header-icon"></span>
              </div>
              <div className="skill-body">
                <ul className="skill-body-inner">
                  <li>Market Research</li>
                  <li>Financial Analysis</li>
                  <li>Business Metrics</li>
                  <li>Data Visualization</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="contact-bg" id="contact-bg"></div>
      <div className="contact-blob-wrap" id="contact-blob-wrap">
        <div className="contact-blob" id="contact-blob"></div>
      </div>
      <section className="contact" id="contact">
        <div className="contact-pin" id="contact-pin">
          <div className="contact-title" id="contact-title">Contact</div>

          <div className="contact-dispo" id="contact-dispo">
            <p data-i18n="index.contact.dispo1">
              Currently seeking <span className="other-accent">exciting opportunities</span> at the intersection of business, data, and technology.
            </p>
          </div>

          <div className="contact-frame" id="contact-frame">
            <img className="contact-frame-img" id="contact-frame-img" src="assets/images/art/Untitled2.png" alt="" loading="lazy" decoding="async" />
            <span className="frame-corner tl"></span>
            <span className="frame-corner tr"></span>
            <span className="frame-corner bl"></span>
            <span className="frame-corner br"></span>
          </div>

          <div className="contact-dispo" id="contact-dispo-2">
            <p data-i18n="index.contact.dispo2">
              Available for <span className="other-accent">collaborations and freelance projects</span> globally, helping solve business problems with data.
            </p>
          </div>

          <div className="contact-frame" id="contact-frame-2">
            <img className="contact-frame-img" id="contact-frame-img-2" src="assets/images/art/Untitled1.png" alt="" loading="lazy" decoding="async" />
            <span className="frame-corner tl"></span>
            <span className="frame-corner tr"></span>
            <span className="frame-corner bl"></span>
            <span className="frame-corner br"></span>
          </div>

          <div className="contact-bottom" id="contact-bottom">
            <nav className="contact-socials" id="contact-socials" aria-label="Réseaux sociaux">
              <a className="chr-hover" data-chr-contact="GitHub" href="https://github.com/abdulmoquit" target="_blank" rel="noopener noreferrer" aria-label="GitHub"></a>
              <a className="chr-hover" data-chr-contact="LinkedIn" href="https://www.linkedin.com/in/abdul-moquit-523bb5389/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"></a>
            </nav>
            <a className="contact-mail" id="contact-mail" href="mailto:abdulmoquit00007@gmail.com">abdulmoquit00007@gmail.com</a>
          </div>
        </div>
      </section>

      <div className="footer-transition" id="footer-transition"></div>
      <footer className="footer" id="footer">
        <div className="footer-content" id="footer-content">
          <div className="footer-top">
            <div className="footer-top-col">
              <a className="chr-hover footer-mail" data-chr-footer="abdulmoquit00007@gmail.com" href="mailto:abdulmoquit00007@gmail.com" aria-label="Send email"></a>
              <span className="chr-hover footer-date" data-chr-footer="© 2026"></span>
            </div>
            <nav className="footer-top-col" aria-label="Social media">
              <a className="chr-hover" data-chr-footer="GitHub" href="https://github.com/abdulmoquit" target="_blank" rel="noopener noreferrer" aria-label="GitHub"></a>
              <a className="chr-hover" data-chr-footer="LinkedIn" href="https://www.linkedin.com/in/abdul-moquit-523bb5389/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"></a>
            </nav>
            <nav className="footer-top-col" aria-label="Footer navigation">
              <a className="chr-hover" data-chr-footer="Work" href="works/" data-page-link="work" aria-label="Work"></a>
              <a className="chr-hover" data-chr-footer="Info" href="info/" data-page-link="info" aria-label="Info"></a>
              <a className="chr-hover" data-chr-footer="Contact" href="contact/" data-page-link="contact" aria-label="Contact"></a>
            </nav>
          </div>
          <div className="footer-ascii-wrap">
            <div className="footer-ascii left">
              <pre id="ascii-left"></pre>
            </div>
            <div className="footer-ascii right">
              <pre id="ascii-right"></pre>
            </div>
          </div>
          <div className="footer-name">
            <span className="footer-name-luke"><span className="first-letter">A</span>bdul</span>
            <span className="footer-name-baffait-wrap">
              <span className="footer-name-baffait">Moquit</span>
              <span className="footer-name-dot">.</span>
            </span>
          </div>
        </div>
      </footer>

      <div className="proj-preview" id="proj-preview">
        <div className="proj-card" id="proj-card">
          <div className="proj-meta">
            <span className="proj-date" id="proj-date">01 2025</span>
            <span className="proj-label">Preview</span>
          </div>
          <img id="proj-cover" src="assets/images/projects/Covers/CyberDiag.avif" alt="" width="1333" height="1000" />
        </div>
      </div>
      <div className="proj-cursor" id="proj-cursor">See project</div>

      <div className="page-fade" id="page-fade"></div>
      <div className="flying-title" id="flying-title"></div>
      <div className="work-transition-overlay" id="work-transition-overlay"></div>
      <div className="work-flying-text" id="work-flying-text">Work</div>

      <section className="project-detail" id="project-detail">
        <div className="detail-back chr-hover" id="detail-back" data-chr="🡼RETOUR" data-i18n-attr="data-chr:index.detail.back"></div>
        <div className="detail-info">
          <div className="detail-title-wrap" id="detail-title-wrap">
            <h1 className="detail-title" id="detail-title"> </h1>
            <span className="detail-year" id="detail-year"></span>
          </div>
          <p className="detail-desc" id="detail-desc"></p>
          <div className="detail-tags" id="detail-tags"></div>
        </div>
        <div className="detail-gallery-wrap" id="detail-gallery-wrap">
          <div className="detail-thumbs" id="detail-thumbs">
            <div className="detail-thumbs-inner" id="detail-thumbs-inner"></div>
          </div>
          <div className="detail-selected" id="detail-selected"></div>
        </div>
      </section>

      <div className="scroll-pct" id="scroll-pct">(0)</div>
      <div className="scroll-timeline" id="scroll-timeline">
        <span className="st-label" id="st-label"></span>
        <div className="st-bar" id="st-bar"></div>
      </div>
    </div>
  );
};

export default Index;