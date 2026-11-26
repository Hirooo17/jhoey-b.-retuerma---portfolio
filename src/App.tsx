import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { ArrowUpRight, Command, Menu, X } from "lucide-react";
const Workbench = lazy(() => import("./components/Workbench"));
import Work from "./components/Work";
import { Archive, About, Credentials } from "./components/Profile";
import Arrival from "./components/Arrival";
import { notebookFromUrl, notebookUrl } from "./data/exhibition";
import StudyRoom from "./components/StudyRoom";
import Passport from "./components/Passport";
import Nearby from "./components/Nearby";
import { Workflow, Commission } from "./components/FieldGuide";
import { toolbox } from "./data/portfolio";

const StickerTray = lazy(() => import("./components/StickerTray"));
const Lab = lazy(() => import("./components/Lab"));
import { profile } from "./data/portfolio";

const chapters = [
  ["home", "Career atlas"],
  ["experience", "Experience"],
  ["commission", "Commission"],
  ["work", "Work"],
  ["case-study", "Case study"],
  ["workflow", "Workflow"],
  ["toolbox", "Toolbox"],
  ["lab", "The Lab"],
  ["about", "About"],
  ["certifications", "Credentials"],
  ["contact", "Contact"],
];
const links = [chapters[0], chapters[1], chapters[3], chapters[7]];

function Mark() {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" width="34" height="34">
      <g fill="currentColor">
        {Array.from({ length: 10 }, (_, i) => (
          <rect
            key={i}
            x="21"
            y="2"
            width="6"
            height="44"
            rx="1"
            transform={`rotate(${i * 18} 24 24)`}
          />
        ))}
      </g>
      <circle cx="24" cy="24" r="6" fill="var(--cream)" />
    </svg>
  );
}

function Navigation() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const progress = useRef<HTMLDivElement>(null);
  const destination = useRef<string | null>(null);
  const settle = useRef<ReturnType<typeof setTimeout>>(undefined);
  function chooseChapter(id: string) {
    destination.current = id;
    setActive(id);
    setOpen(false);
    if (location.hash === "#" + id)
      document.getElementById(id)?.scrollIntoView();
    else location.hash = id;
    clearTimeout(settle.current);
    settle.current = setTimeout(() => {
      destination.current = null;
    }, 250);
  }
  const index = Math.max(
    0,
    chapters.findIndex(([id]) => id === active),
  );
  const menu = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("main section[id], footer[id]"),
    );
    let frame = 0;
    const update = () => {
      frame = 0;
      const top = window.scrollY,
        extent = document.documentElement.scrollHeight - innerHeight;
      progress.current?.style.setProperty(
        "--read",
        String(extent > 0 ? Math.max(0, Math.min(1, top / extent)) : 0),
      );
      if (destination.current) return;
      const readingEdge = Math.max(
        150,
        (progress.current?.closest("header")?.offsetHeight || 0) + 10,
      );
      setActive(
        top > 0 && top >= extent - 2
          ? "contact"
          : sections
              .filter((s) => s.getBoundingClientRect().top <= readingEdge)
              .at(-1)?.id || "home",
      );
    };
    const onScroll = () => {
      if (destination.current) {
        clearTimeout(settle.current);
        settle.current = setTimeout(() => {
          destination.current = null;
          update();
        }, 180);
      }
      if (!frame) frame = requestAnimationFrame(update);
    };
    const release = () => {
      destination.current = null;
      clearTimeout(settle.current);
    };
    const ro = new ResizeObserver(onScroll);
    ro.observe(document.body);
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("wheel", release, { passive: true });
    window.addEventListener("touchstart", release, { passive: true });
    return () => {
      release();
      window.removeEventListener("wheel", release);
      window.removeEventListener("touchstart", release);
      window.removeEventListener("scroll", onScroll);
      ro.disconnect();
      cancelAnimationFrame(frame);
    };
  }, []);
  return (
    <header
      onClick={(e) => {
        if (
          e.defaultPrevented ||
          e.ctrlKey ||
          e.metaKey ||
          e.shiftKey ||
          e.altKey
        )
          return;
        const link = (e.target as Element).closest<HTMLAnchorElement>(
          'a[href^="#"]',
        );
        if (!link) return;
        e.preventDefault();
        if (link.getAttribute("aria-disabled") !== "true")
          chooseChapter(link.hash.slice(1));
      }}
      onKeyDown={(e) => {
        if (e.key === "Escape" && open) {
          setOpen(false);
          menu.current?.focus();
        }
      }}
    >
      <div className="wrap nav">
        <a
          className="wordmark"
          href="#home"
          onClick={() => setOpen(false)}
          aria-label="hjbr. Field Atlas home"
        >
          <Mark />
          hjbr<span>.</span>
          <small>FIELD ATLAS</small>
        </a>
        <button
          className="menu-toggle"
          ref={menu}
          aria-expanded={open}
          aria-controls="main-nav"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={20} /> : <Menu size={20} />} Menu
        </button>
        <nav id="main-nav" aria-label="Primary" className={open ? "open" : ""}>
          {(open ? chapters : links).map(([id, label]) => (
            <a
              href={"#" + id}
              key={id}
              aria-current={active === id ? "location" : undefined}
              onClick={() => setOpen(false)}
            >
              {label}
            </a>
          ))}
        </nav>

        <a
          className="contact-pill"
          href="#contact"
          onClick={() => setOpen(false)}
        >
          Let’s talk <ArrowUpRight size={16} />
        </a>
      </div>
      <div className="route-console">
        <div className="wrap route-inner">
          <span className="station-count" key={index}>
            {String(index + 1).padStart(2, "0")}{" "}
            <small>/ {chapters.length}</small>
          </span>
          <select
            aria-label="Jump to chapter"
            value={chapters[index][0]}
            onChange={(e) => chooseChapter(e.target.value)}
          >
            {chapters.map(([id, label]) => (
              <option key={id} value={id}>
                {label}
              </option>
            ))}
          </select>
          <div className="station-rail" aria-label="Journey overview">
            {chapters.map(([id, label], i) => (
              <a
                key={id}
                href={"#" + id}
                data-label={label}
                aria-label={"Chapter " + (i + 1) + ": " + label}
                aria-current={index === i ? "step" : undefined}
                className={i < index ? "passed" : ""}
              >
                <i />
              </a>
            ))}
          </div>
          <div className="step-links">
            <a
              href={"#" + chapters[Math.max(0, index - 1)][0]}
              aria-label="Previous chapter"
              aria-disabled={index === 0}
              tabIndex={index === 0 ? -1 : 0}
            >
              ←
            </a>
            <a
              href={"#" + chapters[(index + 1) % chapters.length][0]}
              aria-label={
                index === chapters.length - 1
                  ? "Return to first chapter"
                  : "Next chapter"
              }
            >
              {index === chapters.length - 1 ? "↑" : "→"}
            </a>
          </div>
        </div>
        <div className="reading-line" ref={progress}>
          <i />
        </div>
      </div>
    </header>
  );
}

function Contact() {
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const shortcut = (event: KeyboardEvent) => {
      const target = event.target;
      if (
        event.key === "?" &&
        !event.ctrlKey &&
        !event.metaKey &&
        !event.altKey &&
        !(
          target instanceof HTMLElement &&
          (target.isContentEditable || target.closest("input,textarea,select"))
        ) &&
        !dialog.current?.open
      ) {
        event.preventDefault();
        dialog.current?.showModal();
      }
    };
    window.addEventListener("keydown", shortcut);
    return () => window.removeEventListener("keydown", shortcut);
  }, []);
  return (
    <footer id="contact">
      <div className="wrap section">
        <p className="eyebrow">Final stop / Contact</p>
        <h2>
          Let’s build something
          <br />
          <em>meaningful.</em>
        </h2>
        <a className="mail" href={"mailto:" + profile.email}>
          {profile.email} <ArrowUpRight />
        </a>
        <details className="draft">
          <summary>
            Compose an email <ArrowUpRight size={17} />
          </summary>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              const data = new FormData(event.currentTarget);
              window.location.href =
                "mailto:" +
                profile.email +
                "?subject=" +
                encodeURIComponent(String(data.get("subject"))) +
                "&body=" +
                encodeURIComponent(String(data.get("message")));
            }}
          >
            <label>
              Subject
              <input name="subject" required maxLength={180} />
            </label>
            <label>
              Message
              <textarea name="message" rows={4} required maxLength={2500} />
            </label>
            <button>
              Open in email app <ArrowUpRight size={16} />
            </button>
          </form>
        </details>
        <div className="footer-links">
          <a href={profile.github}>GitHub ↗</a>
          <a href={profile.linkedin}>LinkedIn ↗</a>
          <a href={profile.resume} download>
            Résumé ↓
          </a>
          <button
            title="Quick jump (?)"
            onClick={() => dialog.current?.showModal()}
          >
            <Command size={15} /> Quick jump <kbd>?</kbd>
          </button>
          <a href="#home">Back to top ↑</a>
        </div>
        <Passport />
        <a className="return-map" href="#atlas">
          ↖ Return to the career atlas
        </a>
        <div className="folio">
          <span>Hero Jhoey B. Retuerma</span>
          <span>Makati City, Philippines</span>
        </div>
      </div>
      <dialog ref={dialog} aria-labelledby="jump-title">
        <div className="section-title">
          <h3 id="jump-title">Quick jump</h3>
          <button
            aria-label="Close quick jump"
            onClick={() => dialog.current?.close()}
          >
            <X />
          </button>
        </div>
        {chapters.map(([id, label]) => (
          <a key={id} href={"#" + id} onClick={() => dialog.current?.close()}>
            {label}
            <ArrowUpRight size={16} />
          </a>
        ))}
      </dialog>
    </footer>
  );
}

export default function App() {
  const [computerLoaded, setComputerLoaded] = useState(false);
  const [study, setStudy] = useState(notebookFromUrl);
  function openNotebook(index: number) {
    const url = notebookUrl(index);
    if (location.href !== url.href) history.pushState(null, "", url);
    setStudy(index);
    const section = document.getElementById("case-study");
    section?.scrollIntoView();
    section?.focus({ preventScroll: true });
  }
  useEffect(() => {
    const target = document.getElementById(location.hash.slice(1));
    if (target) target.scrollIntoView({ behavior: "instant" });
    const restore = () => setStudy(notebookFromUrl());
    window.addEventListener("popstate", restore);
    return () => window.removeEventListener("popstate", restore);
  }, []);
  return (
    <>
      <a href="#main" className="skip">
        Skip to content
      </a>
      <Navigation />
      <main id="main">
        <Arrival />
        <Archive />
        <Commission />
        <Work onStudy={openNotebook} />
        <StudyRoom
          index={study}
          onSelect={(i) => {
            history.replaceState(null, "", notebookUrl(i));
            setStudy(i);
          }}
        />
        <Workflow />
        <section id="toolbox" className="tool-section">
          <div className="section wrap">
            <p className="eyebrow">Hands-on collection</p>
            <h2>
              The tool <em>tray.</em>
            </h2>
            <Nearby
              fallback={
                <details>
                  <summary>Browse all technologies</summary>
                  {Object.entries(toolbox).map(([k, v]) => (
                    <p key={k}>
                      <strong>{k}</strong> · {v.join(", ")}
                    </p>
                  ))}
                </details>
              }
            >
              <StickerTray />
            </Nearby>
          </div>
        </section>
        <section id="lab" className="wrap section laboratory">
          <p className="eyebrow">Experiments / Open bench</p>
          <h2>
            The <em>Lab.</em>
          </h2>
          <Nearby
            fallback={
              <p>
                Line engraving, local command console and miniature computer.
              </p>
            }
          >
            <Lab />
            <details className="computer-drawer" onToggle={(event) => {
              if (event.currentTarget.open) setComputerLoaded(true);
            }}>
              <summary>
                Open the miniature computer <span>＋</span>
              </summary>
              {computerLoaded && (
                <Suspense fallback={<p role="status">Opening the workbench…</p>}>
                  <Workbench />
                </Suspense>
              )}
            </details>
          </Nearby>
        </section>
        <About />
        <Credentials />
      </main>
      <Contact />
    </>
  );
}
