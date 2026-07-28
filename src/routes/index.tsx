import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  Search,
  ChevronDown,
  ArrowRight,
  ArrowLeft,
  ArrowUpRight,
  X,
  ArrowDown,
} from "lucide-react";

import Masonry from "react-masonry-css";

import hero1 from "@/assets/hero-garden.jpg";
import hero2 from "@/assets/hero-2.jpg";
import about from "@/assets/about-garden.jpg";
import p1 from "@/assets/proj-1.jpg";
import p2 from "@/assets/proj-2.jpg";
import p3 from "@/assets/proj-3.jpg";
import p4 from "@/assets/proj-4.jpg";
import p5 from "@/assets/proj-5.jpg";
import p6 from "@/assets/proj-6.jpg";
import p7 from "@/assets/proj-7.jpg";
import p8 from "@/assets/proj-8.jpg";
import p9 from "@/assets/proj-9.jpg";
import logo from "@/assets/logo-full-light.png";
import giardDesignLogo from "@/assets/logo.svg";
import giardDesignLogoBlack from "@/assets/logo-black.svg";
import pencilLogo from "@/assets/pencil-logo.svg";
import eyeLogo from "@/assets/eye-logo.svg";
import shadeLogo from "@/assets/shade-logo.svg";

export const Route = createFileRoute("/")({
  component: Index,
});

const SLIDES = [
  {
    title: ["Nowoczesna", "aranżacja", "Twojego ogrodu"],
    text: "Marka GiardDesign to wieloletnie doświadczenie i wysoka estetyka realizacji. Oferujemy kompleksowy zakres usług z indywidualnym podejściem do każdego projektu.",
    image: hero1,
  },
  {
    title: ["Ogrody", "z charakterem", "i pasją"],
    text: "Tworzymy przestrzenie, w których nowoczesność spotyka się z naturą. Każdy projekt to indywidualne rozwiązania dopasowane do Twoich potrzeb.",
    image: hero2,
  },
];

const OFFER = [
  {
    title: "Projekty",
    desc: "Zaprojektujemy Twój ogród w nowoczesnym stylu i z najlepszym wykorzystaniem istniejącej przestrzeni.",
    cta: "Dowiedz się więcej",
    icon: pencilLogo,
  },
  {
    title: "Wizualizacje",
    desc: "Przedstawimy Ci projekty koncepcyjne w postaci wirtualnego spaceru animowanego w technologii 3D.",
    cta: "Dowiedz się więcej",
    icon: eyeLogo,
  },
  {
    title: "Realizacje",
    desc: "Zrealizujemy Twoje marzenie przy użyciu najnowszych rozwiązań i zaawansowanych technologii.",
    cta: "Zobacz nasze realizacje",
    icon: shadeLogo,
  },
];

const OFFER_MENU = [
  "Projekty koncepcyjne",
  "Projekty wykonawcze",
  "Wizualizacje 3D",
  "Realizacje ogrodów",
  "Systemy nawadniania",
  "Pielęgnacja",
];

const PROJECTS = [p1, p2, p3, p4, p5, p6, p7, p8, p9, p1, p3, p5];

const breakpointColumnsObj = {
  default: 3,
  1024: 2,
  640: 1,
};

function Index() {
  const [slide, setSlide] = useState(0);
  const [leavingSlide, setLeavingSlide] = useState<number | null>(null);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [offerOpen, setOfferOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const current = SLIDES[slide];

  const navigateToSlide = (next: number) => {
    if (next === slide) return;
    const forward = (next - slide + SLIDES.length) % SLIDES.length;
    const backward = (slide - next + SLIDES.length) % SLIDES.length;
    setDirection(forward <= backward ? 1 : -1);
    setLeavingSlide(slide);
    setSlide(next);
  };

  const goSlide = (delta: 1 | -1) => {
    navigateToSlide((slide + delta + SLIDES.length) % SLIDES.length);
  };

  useEffect(() => {
    if (leavingSlide === null) return;
    const timer = window.setTimeout(() => setLeavingSlide(null), 1400);
    return () => window.clearTimeout(timer);
  }, [leavingSlide, slide]);

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight")
        setLightbox((i) => (i === null ? 0 : (i + 1) % visibleProjects.length));
      if (e.key === "ArrowLeft")
        setLightbox((i) =>
          i === null
            ? 0
            : (i - 1 + visibleProjects.length) % visibleProjects.length,
        );
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const visibleProjects = expanded ? PROJECTS : PROJECTS.slice(0, 9);
  const searchRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (searchOpen) searchRef.current?.focus();
  }, [searchOpen]);

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* NAV */}
      <header className="absolute top-0 left-0 right-0 z-40">
        <div className="container-x flex items-center justify-between py-6">
          <a
            href="#"
            className="text-[20px] tracking-tight font-semibold text-ink"
          >
            <img
              src={giardDesignLogoBlack}
              alt="GiardDesign"
              className="h-6 w-auto"
            />
          </a>
          <nav className="hidden md:flex items-center gap-9 text-[14px] text-ink">
            <div
              className="relative"
              onMouseEnter={() => setOfferOpen(true)}
              onMouseLeave={() => setOfferOpen(false)}
            >
              <button
                type="button"
                className="flex items-center gap-1 hover:opacity-70 transition"
              >
                Oferta{" "}
                <ChevronDown
                  className={`h-3.5 w-3.5 transition-transform ${offerOpen ? "rotate-180" : ""}`}
                />
              </button>
              <div
                className={`absolute left-1/2 -translate-x-1/2 top-full pt-4 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${offerOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-2 pointer-events-none"}`}
              >
                <div className="min-w-[240px] rounded-2xl bg-white shadow-[0_20px_60px_-20px_rgba(0,0,0,0.2)] py-3 border border-line/40 origin-top">
                  {OFFER_MENU.map((it, idx) => (
                    <a
                      key={it}
                      href="#oferta"
                      style={{
                        transitionDelay: offerOpen ? `${idx * 30}ms` : "0ms",
                      }}
                      className={`flex items-center justify-between px-5 py-2.5 text-[13px] hover:bg-beige-soft/40 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group ${offerOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"}`}
                    >
                      <span>{it}</span>
                      <ArrowUpRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
            <a href="#o-firmie" className="hover:opacity-70 transition">
              O firmie
            </a>
            <a href="#realizacje" className="hover:opacity-70 transition">
              Realizacje
            </a>
            <a href="#kontakt" className="hover:opacity-70 transition">
              Kontakt
            </a>
            <button
              type="button"
              aria-label="Szukaj"
              onClick={() => setSearchOpen((s) => !s)}
              className="hover:opacity-70 transition"
            >
              <Search className="h-4 w-4" />
            </button>
          </nav>
        </div>
        {/* Search drawer */}
        <div
          className={`overflow-hidden transition-[max-height,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${searchOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}
        >
          <div className="bg-white/95 backdrop-blur border-b border-line/40">
            <div className="container-x py-6 flex items-center gap-4">
              <Search className="h-5 w-5 text-muted-ink" />
              <input
                ref={searchRef}
                type="text"
                placeholder="Czego szukasz? np. projekt ogrodu, wizualizacja…"
                className="flex-1 bg-transparent outline-none text-[16px] placeholder:text-muted-ink"
              />
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                aria-label="Zamknij"
                className="p-2 hover:opacity-60 transition-opacity"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* HERO / INTRO SLIDER */}
      <section className="relative pt-16 md:pt-18">
        <div className="grid md:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
          {/* Left — inside grid */}
          <div className="bg-beige overflow-hidden">
            <div
              key={slide}
              className="pl-6 md:pl-[max(1.5rem,calc((100vw-1280px)/2+1.5rem))] pr-6 md:pr-16 py-14 md:py-24 max-w-[640px]"
            >
              <h1 className="text-[44px] md:text-[56px] leading-[1.05] font-medium tracking-tight text-ink">
                {current.title.map((line, i) => (
                  <span
                    key={i}
                    style={{ animationDelay: `${180 + i * 90}ms` }}
                    className="hero-slide-line block"
                  >
                    {line}
                  </span>
                ))}
              </h1>
              <p
                style={{
                  animationDelay: `${180 + current.title.length * 90 + 80}ms`,
                }}
                className="hero-slide-desc mt-8 text-[14.5px] leading-[1.75] text-muted-ink max-w-[380px]"
              >
                {current.text}
              </p>
              <div
                style={{
                  animationDelay: `${180 + current.title.length * 90 + 180}ms`,
                }}
                className="hero-slide-actions mt-10 flex items-center gap-3"
              >
                <a
                  href="#kontakt"
                  className="pill-btn bg-forest text-white hover:bg-forest-deep"
                >
                  Skontaktuj się z nami
                </a>
                <a
                  href="#realizacje"
                  className="pill-btn border border-forest/80 text-ink hover:bg-forest hover:text-white hover:border-forest"
                >
                  Zobacz nasze realizacje <ArrowDown className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
          {/* Right — bleeds to edge */}
          <div className="relative min-h-[420px] md:min-h-[620px] overflow-hidden">
            {SLIDES.map((s, i) => {
              const isActive = i === slide;
              const isLeaving = i === leavingSlide;
              if (!isActive && !isLeaving) return null;

              let motionClass = "hero-slide-image--idle";
              if (isLeaving) {
                motionClass =
                  direction === 1
                    ? "hero-slide-image--out-next"
                    : "hero-slide-image--out-prev";
              } else if (leavingSlide !== null) {
                motionClass =
                  direction === 1
                    ? "hero-slide-image--in-next"
                    : "hero-slide-image--in-prev";
              }

              return (
                <img
                  key={i}
                  src={s.image}
                  alt=""
                  width={1600}
                  height={1100}
                  className={`hero-slide-image absolute inset-0 h-[105%] w-full object-cover ${isActive ? "hero-slide-image--active" : ""} ${motionClass}`}
                />
              );
            })}
            <div className="absolute right-0 bottom-0 z-10 flex items-stretch bg-white">
              <button
                type="button"
                aria-label="Poprzedni"
                onClick={() => goSlide(-1)}
                className="grid h-[52px] w-[52px] place-items-center text-ink transition-opacity hover:opacity-50"
              >
                <ArrowLeft className="h-[18px] w-[18px]" strokeWidth={1.5} />
              </button>
              <button
                type="button"
                aria-label="Następny"
                onClick={() => goSlide(1)}
                className="grid h-[52px] w-[52px] place-items-center text-ink transition-opacity hover:opacity-50"
              >
                <ArrowRight className="h-[18px] w-[18px]" strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* OFERTA */}
      <section id="oferta" className="bg-background py-24 md:py-32">
        <div className="container-x">
          <p className="text-[13px] text-forest mb-6">Oferta</p>
          <h2 className="text-[38px] md:text-[52px] leading-[1.1] font-medium tracking-tight max-w-3xl">
            Działamy{" "}
            <span className="font-serif-i font-inter">kompleksowo</span>
          </h2>
          <p className="mt-8 text-[14.5px] leading-[1.8] text-muted-ink max-w-[560px]">
            Oferujemy kompletną obsługę inwestycji terenów zielonych.
            Projektujemy nowoczesne ogrody przydomowe oraz rezydencjonalne.
            Stworzymy dla Ciebie projekt, zwizualizujemy go i wcielimy w życie,
            a na każdym etapie posłużymy radą i wieloletnim doświadczeniem.
          </p>

          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {OFFER.map((o) => {
              return (
                <a
                  key={o.title}
                  href="#realizacje"
                  className="group relative bg-white rounded-[24px] p-8 md:p-10 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_30px_60px_-30px_rgba(0,0,0,0.25)] border border-line/30"
                >
                  <img src={o.icon} alt="" className="h-12 w-12" />
                  <h3 className="mt-14 text-[24px] font-medium">{o.title}</h3>
                  <p className="mt-4 text-[13.5px] leading-[1.7] text-muted-ink min-h-[80px]">
                    {o.desc}
                  </p>
                  <div className="mt-8 inline-flex text-forest items-center gap-2 text-[13px] border-b border-ink pb-1 group-hover:gap-3 transition-all">
                    {o.cta} <ArrowRight className="h-3.5 w-3.5" />
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* O FIRMIE */}
      <section
        id="o-firmie"
        className="grid md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]"
      >
        <div className="relative min-h-[420px] md:min-h-[600px]">
          <img
            src={about}
            alt="Zen garden"
            width={1200}
            height={1000}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
        <div className="bg-forest text-white">
          <div className="pr-6 md:pr-[max(1.5rem,calc((100vw-1280px)/2+1.5rem))] pl-6 md:pl-16 py-16 md:py-28 max-w-[640px]">
            <p className="text-[13px] mb-6 opacity-90">O firmie</p>
            <h2 className="text-[38px] md:text-[52px] leading-[1.1] font-medium tracking-tight">
              Tworzymy
              <br />z <span className="font-serif-i font-inter">pasją</span>
            </h2>
            <p className="mt-8 text-[14.5px] leading-[1.85] opacity-90 max-w-[440px]">
              Każdy projekt to nowe wyzwanie. Dlatego nasz zespół tworzą
              wykwalifikowani projektanci oraz architekci, których zadaniem jest
              rozpoznanie i realizacja potrzeb każdego Klienta. Nasza
              specjalizacja to przestrzenie nowoczesne, które charakteryzuje
              minimalizm, geometria i elegancka prostota. Tworzymy ogrody
              małoobsługowe, dostosowane do współczesnego trybu życia.
            </p>
            <a
              href="#kontakt"
              className="mt-10 pill-btn border border-white/70 hover:bg-white hover:text-forest"
            >
              Poznaj nas bliżej <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {/* REALIZACJE — MASONRY */}
      <section id="realizacje" className="bg-beige py-24 md:py-32">
        <div className="container-x">
          <p className="text-[13px] text-forest mb-6">Realizacje</p>
          <h2 className="text-[38px] md:text-[52px] leading-[1.1] font-medium tracking-tight">
            Nasze <span className="font-serif-i font-inter">projekty</span>
          </h2>
        </div>

        <div className="container-x mt-16">
          <div className="relative">
            <Masonry
              breakpointCols={breakpointColumnsObj}
              className="flex gap-6"
              columnClassName="space-y-6"
            >
              {visibleProjects.map((src, i) => {
                return (
                  <button
                    type="button"
                    key={i}

                    className="block w-full overflow-hidden group relative will-change-transform transition-all duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
                    onClick={() => setLightbox(i)}
                  >
                    <img
                      src={src}
                      alt={`Projekt ogrodu ${i + 1}`}
                      loading="lazy"
                      className="w-full transition-transform duration-700 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-forest/0 group-hover:bg-forest/20 transition-colors duration-500" />
                  </button>
                );
              })}
            </Masonry>
            <div
              aria-hidden
              className={`pointer-events-none absolute inset-x-0 bottom-0 transition-opacity duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                expanded ? "opacity-0" : "opacity-100"
              }`}
              style={{
                height: "clamp(260px, 38%, 460px)",
                background:
                  "linear-gradient(to bottom, color-mix(in oklab, var(--color-beige) 0%, transparent) 0%, color-mix(in oklab, var(--color-beige) 60%, transparent) 45%, var(--color-beige) 90%)",
              }}
            />
          </div>

          <div className="mt-4 flex justify-center">
            <button
              type="button"
              onClick={() => setExpanded((v) => !v)}
              className="pill-btn border border-ink/70 hover:bg-ink hover:text-white transition-all duration-500"
            >
              {expanded ? "Zwiń" : "Rozwiń"}
              <ArrowDown
                className={`h-4 w-4 transition-transform duration-500 ${expanded ? "rotate-180" : ""}`}
              />
            </button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="kontakt" className="bg-background py-16 md:py-24">
        <div className="container-x">
          <div className="bg-forest text-white rounded-[8px] px-8 md:px-16 py-14 md:py-20 flex flex-col md:flex-row md:items-center justify-between gap-10">
            <h3 className="text-[26px] md:text-[36px] leading-tight font-medium max-w-2xl">
              Zostańmy w kontakcie!
              <br />
              Znajdziesz nas na{" "}
              <span className="font-serif-i font-inter">Instagramie</span>.
            </h3>
            <div className="flex items-center gap-8">
              <p className="text-[13px] opacity-90 max-w-[180px]">
                Śledź nasze najnowsze realizacje!
              </p>
              <a
                href="#"
                className="pill-btn bg-white text-ink hover:bg-beige-soft"
              >
                Instagram
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#0E0E0E] text-white py-[80px]">
        <div className="container-x">
          {/* Górna sekcja */}
          <div className="flex items-center justify-between border-b border-white/20 pb-[48px]">
            <img
              src={giardDesignLogo}
              alt="GiardDesign"
              className="h-6 w-auto"
            />

            <div className="flex items-center gap-[24px]">
              <span className="text-[16px]">
                Daj znać, co możemy dla Ciebie zrobić!
              </span>

              <a
                href="#kontakt"
                className="pill-btn bg-forest hover:bg-forest-deep"
              >
                Skontaktuj się z nami
              </a>
            </div>
          </div>

          {/* Środkowa sekcja */}
          <div className="flex items-center justify-between py-[48px]">
            <div className="flex items-center gap-[48px] text-[14px]">
              <a href="#">Kontakt</a>
              <a href="#">Instagram</a>
              <a href="#">Facebook</a>
              <a href="#">LinkedIn</a>
            </div>

            <div className="flex items-center gap-[48px] text-[14px]">
              <span>000-000-000</span>
              <a href="mailto:giarddesign@kontakt.pl">giarddesign@kontakt.pl</a>
            </div>
          </div>

          {/* Dolna sekcja */}
          <div className="flex items-center justify-between text-[14px]">
            <span>Prawa zastrzeżone © 2022</span>

            <div className="flex items-center gap-2">
              <span>made by</span>

              <img src={logo} alt="adRespect" className="h-6 w-auto" />
            </div>
          </div>
        </div>
      </footer>

      {/* LIGHTBOX */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-6 animate-lb-fade backdrop-blur-sm"
          onClick={() => setLightbox(null)}
        >
          <button
            type="button"
            aria-label="Zamknij"
            onClick={(e) => {
              e.stopPropagation();
              setLightbox(null);
            }}
            className="absolute top-6 right-6 h-11 w-11 rounded-full bg-white/10 hover:bg-white/20 grid place-items-center text-white transition-all duration-300 hover:scale-110"
          >
            <X className="h-5 w-5" />
          </button>
          <button
            type="button"
            aria-label="Poprzedni"
            onClick={(e) => {
              e.stopPropagation();
              setLightbox(
                (lightbox - 1 + visibleProjects.length) %
                  visibleProjects.length,
              );
            }}
            className="absolute left-6 h-12 w-12 rounded-full bg-white/10 hover:bg-white/20 grid place-items-center text-white transition-all duration-300 hover:scale-110 hover:-translate-x-0.5"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <img
            key={lightbox}
            src={visibleProjects[lightbox]}
            alt=""
            className="max-h-[90vh] max-w-[90vw] object-contain  animate-lb-zoom"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            type="button"
            aria-label="Następny"
            onClick={(e) => {
              e.stopPropagation();
              setLightbox((lightbox + 1) % visibleProjects.length);
            }}
            className="absolute right-6 h-12 w-12 rounded-full bg-white/10 hover:bg-white/20 grid place-items-center text-white transition-all duration-300 hover:scale-110 hover:translate-x-0.5"
          >
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      )}
    </div>
  );
}
