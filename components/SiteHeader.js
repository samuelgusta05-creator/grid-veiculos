"use client";
import { useState } from "react";

export default function SiteHeader({ salesWhatsapp }) {
  const [open, setOpen] = useState(false);
  return (
    <header>
      <div className="nav-wrap">
        <a href="/#top">
          <img src="/assets/logo-white.png" alt="Grid Veículos" />
        </a>
        <nav>
          <ul className={open ? "open" : ""}>
            <li><a href="/#top" onClick={() => setOpen(false)}>Início</a></li>
            <li><a href="/estoque" onClick={() => setOpen(false)}>Comprar</a></li>
            <li><a href="/#diferenciais" onClick={() => setOpen(false)}>Diferenciais</a></li>
            <li><a href="/#avaliacoes" onClick={() => setOpen(false)}>Avaliações</a></li>
            <li><a href="/#contato" onClick={() => setOpen(false)}>Contato</a></li>
          </ul>
        </nav>
        <a className="nav-cta" href={`https://wa.me/${salesWhatsapp}`} target="_blank" rel="noopener noreferrer">
          Fale no WhatsApp
        </a>
        <button className="burger" aria-label="Menu" onClick={() => setOpen((o) => !o)}>
          &#9776;
        </button>
      </div>
    </header>
  );
}
