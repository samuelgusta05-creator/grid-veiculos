import { readLocal } from "@/lib/data";
import SiteHeader from "@/components/SiteHeader";
import WhatsappFloat from "@/components/WhatsappFloat";
import Showroom from "@/components/Showroom";

export default function HomePage() {
  const vehicles = readLocal("vehicles", []).filter((v) => v.status === "disponivel");
  const settings = readLocal("settings", { salesWhatsapp: "5511940899323" });

  return (
    <>
      <SiteHeader salesWhatsapp={settings.salesWhatsapp} />

      <section className="hero" id="top">
        <div className="container">
          <div className="hero-content">
            <span className="eyebrow">Há mais de 20 anos no mercado</span>
            <h1>Qualidade que <span>move</span> você</h1>
            <p>Revenda de veículos novos e seminovos em São Paulo. Atendimento honesto, preço justo e carros revisados para você comprar com confiança.</p>
            <div className="btn-row">
              <a className="btn btn-primary" href="/estoque">Ver veículos à venda</a>
              <a className="btn btn-outline" href="#contato">Nossa localização</a>
            </div>
          </div>
        </div>
      </section>

      <div className="trust-bar">
        <div className="container">
          <div className="trust-item">
            <svg fill="none" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/></svg>
            Mais de 20 anos no mercado
          </div>
          <div className="trust-item">
            <svg fill="none" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="m11.48 3.499 1.5 3.03 3.35.487a.75.75 0 0 1 .416 1.28l-2.424 2.363.572 3.336a.75.75 0 0 1-1.088.79L12 13.187l-2.994 1.6a.75.75 0 0 1-1.088-.79l.572-3.337-2.424-2.363a.75.75 0 0 1 .416-1.28l3.35-.486 1.5-3.03a.75.75 0 0 1 1.342 0Z"/></svg>
            4,4 de avaliação no Google
          </div>
          <div className="trust-item">
            <svg fill="none" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"/></svg>
            Novos e seminovos
          </div>
          <div className="trust-item">
            <svg fill="none" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.97a.75.75 0 0 1 .75-.75h6a.75.75 0 0 1 .75.75V21M3 9l9-6 9 6v10.5a.75.75 0 0 1-.75.75H3.75a.75.75 0 0 1-.75-.75V9Z"/></svg>
            Revenda de confiança
          </div>
        </div>
      </div>

      <section className="section" id="estoque">
        <div className="container">
          <div className="section-head">
            <span className="tag">Showroom</span>
            <h2>Destaques do estoque</h2>
            <p>Passe o mouse sobre o carro pra ver mais. Clique na foto pra abrir em tela cheia. Quer comprar? <a href="/estoque" className="accent" style={{textDecoration:"underline"}}>Veja preços e condições</a>.</p>
          </div>
          <Showroom vehicles={vehicles} />
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="stock-cta">
            <h3>Estoque atualizado direto no WhatsApp e Instagram</h3>
            <p>Nossos veículos disponíveis mudam toda semana. Fale com a nossa equipe para receber fotos, valores e condições atualizadas na hora.</p>
            <div className="btn-row" style={{ justifyContent: "center" }}>
              <a className="btn btn-primary" href={`https://wa.me/${settings.salesWhatsapp}`} target="_blank" rel="noopener noreferrer">Chamar no WhatsApp</a>
              <a className="btn btn-outline" href="/estoque">Ver veículos à venda</a>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="diferenciais">
        <div className="container">
          <div className="why-grid">
            <div>
              <div className="section-head" style={{ textAlign: "left", marginBottom: 32 }}>
                <span className="tag">Por que a Grid</span>
                <h2>Qualidade que se prova na estrada</h2>
              </div>
              <div className="why-list">
                <div className="why-item">
                  <div className="icon"><svg fill="none" viewBox="0 0 24 24" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m6-3v6.75c0 5.25-3.75 8.25-9 9.75-5.25-1.5-9-4.5-9-9.75V6.75L12 3l9 3.75Z"/></svg></div>
                  <div><h4>Confiança</h4><p>Mais de 20 anos de história e centenas de clientes satisfeitos em São Paulo.</p></div>
                </div>
                <div className="why-item">
                  <div className="icon"><svg fill="none" viewBox="0 0 24 24" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H8.497m5.007 0a7.5 7.5 0 1 0-5.007 0m5.007 0h-5.007"/></svg></div>
                  <div><h4>Qualidade</h4><p>Veículos revisados e selecionados a dedo, com procedência garantida.</p></div>
                </div>
                <div className="why-item">
                  <div className="icon"><svg fill="none" viewBox="0 0 24 24" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"/></svg></div>
                  <div><h4>Compromisso</h4><p>Negociação transparente, do primeiro contato até a entrega das chaves.</p></div>
                </div>
                <div className="why-item">
                  <div className="icon"><svg fill="none" viewBox="0 0 24 24" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z"/><path strokeLinecap="round" strokeLinejoin="round" d="m9.75 12 1.5 1.5 3-3.5"/></svg></div>
                  <div><h4>Performance</h4><p>Carros prontos para rodar com segurança e economia desde o primeiro dia.</p></div>
                </div>
              </div>
            </div>
            <div className="why-photo">
              <img src="/assets/storefront.png" alt="Fachada Grid Veículos" />
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="avaliacoes" style={{ background: "var(--dark)" }}>
        <div className="container">
          <div className="section-head">
            <span className="tag">Avaliações</span>
            <h2>O que dizem sobre a Grid</h2>
          </div>
          <div className="rating-summary">
            <span className="rating-score">4,4</span>
            <div>
              <div className="stars">&#9733;&#9733;&#9733;&#9733;&#9734;</div>
              <div className="count">35 avaliações no Google</div>
            </div>
          </div>
          <div className="testi-grid">
            <div className="testi-card">
              <span className="stars">&#9733;&#9733;&#9733;&#9733;&#9733;</span>
              <p>&ldquo;O atendimento do vendedor Rafael e Sr. Marcos foram essenciais para a concretização do negócio. O carro que eu adquiri está impecável e com preço justo. Recomendo!&rdquo;</p>
              <div className="testi-author">
                <div className="testi-avatar">MD</div>
                <div><div className="name">Marcos Diniz</div><div className="time">Avaliação no Google</div></div>
              </div>
            </div>
            <div className="testi-card">
              <span className="stars">&#9733;&#9733;&#9733;&#9733;&#9733;</span>
              <p>&ldquo;Atendimento excelente, vendedor Rafael está de parabéns, muito atencioso.&rdquo;</p>
              <div className="testi-author">
                <div className="testi-avatar">JR</div>
                <div><div className="name">Jailton Reis</div><div className="time">Avaliação no Google</div></div>
              </div>
            </div>
            <div className="testi-card">
              <span className="stars">&#9733;&#9733;&#9733;&#9733;&#9733;</span>
              <p>&ldquo;Ótimos profissionais e preços justos!&rdquo;</p>
              <div className="testi-author">
                <div className="testi-avatar">RF</div>
                <div><div className="name">Rafael Luis Froge</div><div className="time">Avaliação no Google</div></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="contato">
        <div className="container">
          <div className="section-head">
            <span className="tag">Contato</span>
            <h2>Venha nos visitar</h2>
          </div>
          <div className="contact-wrap">
            <div className="contact-info">
              <h3>Grid Veículos</h3>
              <span className="status">Aberto agora · Fecha às 19:00</span>
              <div className="info-row">
                <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25s-7.5-4.108-7.5-11.25a7.5 7.5 0 1 1 15 0Z"/></svg>
                <div><div className="label">Endereço</div><div className="val">Avenida Marechal Tito, 3100 A — Itaim Paulista, São Paulo - SP, 08160-495</div></div>
              </div>
              <div className="info-row">
                <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h1.5a1.5 1.5 0 0 0 1.5-1.5v-2.379a1.5 1.5 0 0 0-1.06-1.435l-3.516-1.055a1.5 1.5 0 0 0-1.517.39l-.899.9a10.4 10.4 0 0 1-5.61-5.61l.9-.899a1.5 1.5 0 0 0 .389-1.517L7.564 3.31A1.5 1.5 0 0 0 6.129 2.25H3.75a1.5 1.5 0 0 0-1.5 1.5Z"/></svg>
                <div><div className="label">Telefone</div><div className="val">(11) 2567-2163</div></div>
              </div>
              <div className="info-row">
                <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v7.142a1.75 1.75 0 0 1-1.75 1.75H4a1.75 1.75 0 0 1-1.75-1.75v-7.142c0-.97.616-1.813 1.5-2.097M20.25 8.511 12 13.5 3.75 8.511M20.25 8.511V6.75A1.75 1.75 0 0 0 18.5 5h-13A1.75 1.75 0 0 0 3.75 6.75v1.761"/></svg>
                <div><div className="label">WhatsApp</div><div className="val">(11) 94190-9323</div></div>
              </div>
              <div className="info-row">
                <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/></svg>
                <div><div className="label">Horário</div><div className="val">Seg a Sáb · 08:00 às 19:00</div></div>
              </div>
              <div className="btn-row" style={{ marginTop: 30 }}>
                <a className="btn btn-primary" href={`https://wa.me/${settings.salesWhatsapp}`} target="_blank" rel="noopener noreferrer">Chamar no WhatsApp</a>
              </div>
            </div>
            <div className="map-embed">
              <iframe
                src="https://www.google.com/maps?q=Grid+Ve%C3%ADculos+Avenida+Marechal+Tito+3100+A+Itaim+Paulista+S%C3%A3o+Paulo&output=embed"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>

      <footer>
        <div className="container">
          <div className="footer-grid">
            <div>
              <img className="flogo" src="/assets/logo-white.png" alt="Grid Veículos" />
              <p className="desc">Revenda de veículos novos e seminovos há mais de 20 anos em São Paulo. Qualidade que move você.</p>
              <div className="social-row">
                <a href="#" aria-label="Instagram"><svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r="1"/></svg></a>
                <a href="#" aria-label="Facebook"><svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8"><path d="M14 9h2.5V6h-2.5c-2 0-3.5 1.5-3.5 3.5V12H8v3h2.5v6h3v-6H16l.5-3h-3V9.7c0-.4.3-.7.5-.7Z"/></svg></a>
                <a href={`https://wa.me/${settings.salesWhatsapp}`} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8"><path d="M20 12a8 8 0 1 1-15.3-3.3L3 21l6.5-1.6A8 8 0 0 1 20 12Z"/></svg></a>
              </div>
            </div>
            <div className="footer-col">
              <h5>Navegação</h5>
              <a href="/#top">Início</a>
              <a href="/estoque">Comprar</a>
              <a href="/#diferenciais">Diferenciais</a>
              <a href="/#avaliacoes">Avaliações</a>
            </div>
            <div className="footer-col">
              <h5>Contato</h5>
              <a href="tel:+551125672163">(11) 2567-2163</a>
              <a href={`https://wa.me/${settings.salesWhatsapp}`}>(11) 94190-9323</a>
              <a href="/#contato">Ver no mapa</a>
            </div>
            <div className="footer-col">
              <h5>Endereço</h5>
              <a href="/#contato">Av. Marechal Tito, 3100 A</a>
              <a href="/#contato">Itaim Paulista, São Paulo - SP</a>
              <a href="/#contato">08160-495</a>
            </div>
          </div>
          <div className="footer-bottom">
            <span>&copy; 2026 Grid Veículos. Todos os direitos reservados.</span>
            <span>Qualidade que move você.</span>
          </div>
        </div>
      </footer>

      <WhatsappFloat salesWhatsapp={settings.salesWhatsapp} />
    </>
  );
}
