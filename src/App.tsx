import { useEffect, useState } from "react";

const BASE = import.meta.env.BASE_URL;

type Artwork = {
  src: string;
  alt: string;
  type: string;
  index: string;
  caption?: string;
  price?: string;
};

const artworks: Artwork[] = [
  {
    src: `${BASE}assets/editorial-01.webp`,
    alt: "Peça editorial Dreamcore da coleção Dreamstation",
    type: "ILUSTRAÇÃO 1",
    index: "01",
  },
  {
    src: `${BASE}assets/foto-caio-01.webp`,
    alt: "Fotografia oficial da campanha Dreamstation",
    type: "ILUSTRAÇÃO 2",
    index: "02",
  },
  {
    src: `${BASE}assets/editorial-02.webp`,
    alt: "Peça editorial azul da coleção Dreamstation",
    type: "ILUSTRAÇÃO 3",
    index: "03",
  },
  {
    src: `${BASE}assets/foto-caio-02.webp`,
    alt: "Fotografia oficial da campanha Dreamstation em ambiente urbano",
    type: "ILUSTRAÇÃO 4",
    index: "04",
  },
  {
    src: `${BASE}assets/ilustracao-05.webp`,
    alt: "Peça editorial The Dream Never Stops com modelo sentado em muro urbano",
    type: "ILUSTRAÇÃO 5",
    index: "05",
  },
  {
    src: `${BASE}assets/ilustracao-06.webp`,
    alt: "Peça editorial BONES Dreamstation com três modelos de óculos azuis",
    type: "ILUSTRAÇÃO 6",
    index: "06",
  },
];

// Produtos: troque nomes, preços (valores simbólicos) e descrições aqui quando quiser.
const products: Artwork[] = [
  { name: "TÊNIS ESQUELETO", price: "R$ 349,90", alt: "Tênis preto e branco com estampa de ossos e calça jeans bordada" },
  { name: "CINTO + CORRENTE", price: "R$ 129,90", alt: "Cinto com fivela prateada e corrente presa à calça jeans" },
  { name: "COLAR CRUZ INVERTIDA", price: "R$ 79,90", alt: "Colar de elos com pingente de cruz invertida e ponta de espinho" },
  { name: "COLAR CRUZ STRASS", price: "R$ 89,90", alt: "Colar de elos com pingente de cruz com strass e detalhes vermelhos" },
  { name: "COLAR DE PÉROLAS", price: "R$ 59,90", alt: "Colar de pérolas" },
  { name: "CORRENTE DUPLA", price: "R$ 99,90", alt: "Corrente dupla com mosquetões e pingente de cruz" },
  { name: "JAQUETA RACING", price: "R$ 299,90", alt: "Jaqueta azul-marinho estilo racing com patrocinadores" },
].map((item, i) => ({
  src: `${BASE}assets/produto-0${i + 1}.webp`,
  alt: item.alt,
  type: item.name,
  index: `0${i + 1}`,
  price: item.price,
  caption: `${item.name} — ${item.price}`,
}));

function Arrow({ direction = "down" }: { direction?: "down" | "up-right" }) {
  return direction === "down" ? (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 3v17M5 13l7 7 7-7" />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 19 19 5M8 5h11v11" />
    </svg>
  );
}

function Ps2Bar({ title }: { title: string }) {
  return (
    <div className="ps2-bar" aria-hidden="true">
      <div className="ps2-bar-inner">
        <span className="ps2-bar-title">{title}</span>
        <div className="ps2-bar-foot">
          <span className="ps2-serial">SERIAL 7392053214123</span>
          <i className="barcode" />
          <div className="ps2-tags">
            <span>NTRC</span>
            <span>B/R</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [viewer, setViewer] = useState<{ list: "artworks" | "products"; index: number } | null>(
    null,
  );
  const viewerItems = viewer?.list === "products" ? products : artworks;

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        setViewer(null);
      }
      if (viewer && event.key === "ArrowRight") {
        setViewer({ ...viewer, index: (viewer.index + 1) % viewerItems.length });
      }
      if (viewer && event.key === "ArrowLeft") {
        setViewer({
          ...viewer,
          index: (viewer.index - 1 + viewerItems.length) % viewerItems.length,
        });
      }
    };
    window.addEventListener("keydown", onKeyDown);
    document.body.classList.toggle("is-locked", menuOpen || viewer !== null);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.classList.remove("is-locked");
    };
  }, [viewer, viewerItems.length, menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#home" aria-label="BONE.S — início">
          <img src={`${BASE}assets/bones-logo-icone.png`} alt="BONE.S" />
        </a>

        <nav className="desktop-nav" aria-label="Navegação principal">
          <a href="#home">HOME</a>
          <a href="#sobre">SOBRE</a>
          <a href="#dreamstation">DREAMSTATION</a>
          <a href="#produtos">PRODUTOS</a>
        </nav>

        <button
          className={`menu-button ${menuOpen ? "is-open" : ""}`}
          type="button"
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span />
          <span />
        </button>
      </header>

      <div className={`mobile-menu ${menuOpen ? "is-open" : ""}`} aria-hidden={!menuOpen}>
        <div className="mobile-menu-noise" />
        <nav>
          <a href="#home" onClick={closeMenu}>
            <span>01</span> HOME
          </a>
          <a href="#sobre" onClick={closeMenu}>
            <span>02</span> SOBRE
          </a>
          <a href="#dreamstation" onClick={closeMenu}>
            <span>03</span> DREAMSTATION
          </a>
          <a href="#produtos" onClick={closeMenu}>
            <span>04</span> PRODUTOS
          </a>
        </nav>
        <p>
          SÃO PAULO / BRASIL
          <br />
          CULTURA DE RUA INDEPENDENTE
        </p>
      </div>

      <section className="hero" id="home">
        <div className="hero-copy">
          <p className="eyebrow">STREETWEAR INDEPENDENTE / BRASIL</p>
          <h1 className="hero-logo-title">
            <img
              className="hero-logo"
              src={`${BASE}assets/bones-logo-hero.png`}
              alt="BONE.S — O sonho nunca para"
            />
          </h1>
        </div>
        <a className="scroll-cue" href="#sobre">
          <span>ROLE PARA ENTRAR</span>
          <Arrow />
        </a>
        <div className="hero-code" aria-hidden="true">
          <span>DESDE 2026</span>
          <span>23°33&apos;S</span>
        </div>
      </section>

      <div className="ticker" aria-hidden="true">
        <div className="ticker-track">
          {[0, 1].map((group) => (
            <span className="ticker-group" key={group}>
              {Array.from({ length: 16 }, (_, i) => (
                <span key={i}>
                  BONE.S&nbsp;/&nbsp; THE DREAM NEVER STOPS&nbsp;/&nbsp; DREAMSTATION&nbsp;/&nbsp;
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      <section className="manifesto" id="sobre">
        <div className="manifesto-mark" aria-hidden="true">
          <img src={`${BASE}assets/bones-icone.png`} alt="" />
        </div>
        <div className="section-tag">
          <span>01</span>
          <span>SOBRE O SISTEMA</span>
        </div>
        <div className="manifesto-grid">
          <p className="manifesto-intro">
            NÃO É APENAS VESTUÁRIO.
            <br />É UMA DECLARAÇÃO.
          </p>
          <div className="manifesto-copy">
            <h2>
              NASCEMOS DO <span>RU<em>Í</em>DO</span>,
              <br />
              VIVEMOS FORA DO PADRÃO.
            </h2>
            <p>
              A BONE.S é uma marca streetwear conceitual e independente que atua na intersecção da
              cultura de rua urbana, do retrofuturismo Y2K e da linguagem dos videogames arcade dos
              anos 2000. Não vendemos apenas vestuário; construímos um ambiente de pertença para
              quem recusa o óbvio e transforma seu vestuário na sua própria tela para se expressar.
            </p>
          </div>
        </div>
        <div className="system-line">
          <span>CULTURA DE RUA</span>
          <i />
          <span>RETROFUTURISMO Y2K</span>
          <i />
          <span>ARCADE ANOS 2000</span>
        </div>
      </section>

      <section className="dreamstation" id="dreamstation">
        <Ps2Bar title="DREAMSTATION ★ VOL. 01" />
        <div className="halftone" aria-hidden="true" />
        <div className="section-tag light">
          <span>02</span>
          <span>NOVO ARQUIVO CARREGADO</span>
        </div>
        <div className="dream-title">
          <p>COLEÇÃO_001</p>
          <h2>
            DREAM
            <br />
            STATION
          </h2>
          <div className="disc" aria-hidden="true">
            <span>D/S</span>
          </div>
        </div>

        <div className="dream-concept">
          <p className="concept-label">[ ARQUIVO DE CONCEITO ]</p>
          <p>
            Dreamstation nasce da junção entre a memória afetiva dos consoles do início dos anos
            2000, com referência direta ao universo visual e sensorial do PlayStation 2, e a
            atmosfera sombria urbana. O conceito explora o brilho azulado da televisão de tubo no
            escuro, o som analógico de inicialização do console, os encartes plásticos das caixas de
            jogos e a estética experimental Y2K.
          </p>
          <p>
            Muito mais do que uma releitura nostálgica, a coleção traz a cultura gamer da virada do
            milênio para o vestuário urbano.
          </p>
        </div>

        <div className="gallery-header">
          <p>ARQUIVO DA CAMPANHA</p>
          <p>
            CLIQUE PARA AMPLIAR <Arrow direction="up-right" />
          </p>
        </div>

        <div className="gallery">
          {artworks.map((artwork, index) => (
            <button
              className={`gallery-card gallery-card-${index + 1}`}
              key={artwork.src}
              type="button"
              onClick={() => setViewer({ list: "artworks", index })}
              aria-label={`Ampliar ${artwork.alt}`}
            >
              <div className="gallery-image">
                <img src={artwork.src} alt={artwork.alt} loading={index > 1 ? "lazy" : "eager"} />
                <span className="expand-icon">+</span>
              </div>
              <div className="gallery-meta">
                <span>{artwork.index}</span>
                <span>{artwork.type}</span>
                <span>DS_26</span>
              </div>
            </button>
          ))}
        </div>
      </section>

      <section className="products" id="produtos">
        <Ps2Bar title="ARQUIVO DE PRODUTOS ★ DS_26" />
        <div className="halftone halftone-alt" aria-hidden="true" />
        <div className="section-tag light">
          <span>03</span>
          <span>ARQUIVO DE PRODUTOS</span>
        </div>
        <div className="products-title">
          <p>COLEÇÃO_001 / ITENS</p>
          <h2>PRODUTOS</h2>
        </div>

        <div className="products-intro">
          <p>
            A seleção de produtos da coleção Dreamstation transita entre peças essenciais do
            vestuário streetwear casual e acessórios, projetados para trazer autenticidade e um
            toque de brilho ao visual.
          </p>
          <p className="warning-stamp">
            <b>AVISO</b> ESTÉTICA RETROFUTURISTA · CONTEÚDO EXPERIMENTAL
          </p>
        </div>

        <div className="gallery-header">
          <p>ÍNDICE DE ITENS</p>
          <p>
            CLIQUE PARA AMPLIAR <Arrow direction="up-right" />
          </p>
        </div>

        <div className="gallery">
          {products.map((product, index) => (
            <button
              className={`gallery-card product-card-${index + 1}`}
              key={product.src}
              type="button"
              onClick={() => setViewer({ list: "products", index })}
              aria-label={`Ampliar ${product.type}`}
            >
              <div className="gallery-image">
                <img src={product.src} alt={product.alt} loading="lazy" />
                <span className="expand-icon">+</span>
              </div>
              <div className="gallery-meta product-meta">
                <span>{product.index}</span>
                <span>{product.type}</span>
                <span>{product.price}</span>
              </div>
            </button>
          ))}
        </div>
        <p className="products-note">* VALORES SIMBÓLICOS, SUJEITOS A ALTERAÇÃO.</p>
      </section>

      <section className="closing">
        <div className="closing-grid" aria-hidden="true" />
        <img className="closing-icon" src={`${BASE}assets/bones-icone.png`} alt="" />
        <p>CONTINUE SONHANDO / CONTINUE SE MOVENDO</p>
        <h2>
          CRIE SUA
          <br />
          PRÓPRIA
          <br />
          <span>REALIDADE.</span>
        </h2>
        <a href="#home">
          VOLTAR AO TOPO <Arrow direction="up-right" />
        </a>
      </section>

      <footer>
        <img src={`${BASE}assets/bones-logo-completo.png`} alt="BONE.S" />
        <div>
          <p>STREETWEAR CONCEITUAL E INDEPENDENTE</p>
          <p>© 2026 BONE.S — TODOS OS DIREITOS RESERVADOS</p>
        </div>
        <p>THE DREAM NEVER STOPS</p>
      </footer>

      {viewer && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label="Galeria ampliada">
          <div className="lightbox-top">
            <span>
              {String(viewer.index + 1).padStart(2, "0")} /{" "}
              {String(viewerItems.length).padStart(2, "0")}
            </span>
            <button type="button" onClick={() => setViewer(null)} aria-label="Fechar imagem">
              FECHAR <span>×</span>
            </button>
          </div>
          <div className="lightbox-stage">
            <img src={viewerItems[viewer.index].src} alt={viewerItems[viewer.index].alt} />
          </div>
          <div className="lightbox-controls">
            <button
              type="button"
              onClick={() =>
                setViewer({
                  ...viewer,
                  index: (viewer.index - 1 + viewerItems.length) % viewerItems.length,
                })
              }
            >
              ← ANTERIOR
            </button>
            <p>
              {viewerItems[viewer.index].caption ?? `${viewerItems[viewer.index].type} / DREAMSTATION`}
            </p>
            <button
              type="button"
              onClick={() =>
                setViewer({ ...viewer, index: (viewer.index + 1) % viewerItems.length })
              }
            >
              PRÓXIMA →
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

export default App;
