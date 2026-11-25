import { useEffect, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowDownToLine,
  ArrowUpRight,
  Command,
  MapPin,
  Menu,
  X,
} from "lucide-react";
import Workbench from "./components/Workbench";
import Work from "./components/Work";
import Profile from "./components/Profile";
import { profile } from "./data/portfolio";

const links = [
  ["work", "Work"],
  ["experience", "Experience"],
  ["about", "About"],
  ["toolbox", "Toolbox"],
  ["certifications", "Credentials"],
];

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
  const menu = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("main section[id], footer[id]"),
    );
    let frame = 0;
    const update = () => {
      frame = 0;
      setActive(
        sections.filter((s) => s.getBoundingClientRect().top <= 160).at(-1)
          ?.id ?? "",
      );
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);
  return (
    <header
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
          aria-label="HJBR home"
        >
          <Mark />
          hjbr<span>.</span>
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
          {links.map(([id, label]) => (
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
        <p className="eyebrow">06 / Contact</p>
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
        {links.map(([id, label]) => (
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
  return (
    <>
      <a href="#main" className="skip">
        Skip to content
      </a>
      <Navigation />
      <main id="main">
        <section id="home" className="hero wrap">
          <div className="hero-layout">
            <div className="hero-copy">
              <p className="eyebrow main-label">
                <span />
                The playful engineer
              </p>
              <h1>
                <span>I build. I test.</span>
                <span>
                  I make it <em>work.</em>
                </span>
              </h1>
              <p className="intro">
                I’m <strong>{profile.name}</strong>, a software developer in
                Makati City working across quality assurance and backend
                support.
              </p>
              <div className="hero-actions">
                <a
                  className="primary"
                  href="#work"
                  onPointerMove={(event) => {
                    if (event.pointerType !== "mouse") return;
                    const box = event.currentTarget.getBoundingClientRect();
                    event.currentTarget.style.setProperty(
                      "--pull",
                      ((event.clientX - box.left) / box.width) * 6 - 3 + "px",
                    );
                  }}
                  onPointerLeave={(event) =>
                    event.currentTarget.style.removeProperty("--pull")
                  }
                >
                  Explore my work <ArrowDown size={16} />
                </a>
                <a className="resume" href={profile.resume} download>
                  <ArrowDownToLine size={16} /> Download résumé
                </a>
              </div>
              <p className="mobile-role mono">
                <i className="led" /> L1 Backend Support at PLDT
              </p>
            </div>
            <Workbench />
          </div>
          <div className="hero-foot">
            <span>
              <i className="led" /> L1 Backend Support at PLDT
            </span>
            <span>
              <MapPin size={14} /> Makati City, PH
            </span>
            <a href="#work">
              Scroll to explore <ArrowDown size={14} />
            </a>
          </div>
        </section>
        <Work />
        <Profile />
      </main>
      <Contact />
    </>
  );
}
