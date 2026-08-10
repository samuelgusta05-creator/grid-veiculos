"use client";
import { useState, useMemo } from "react";

function formatBRL(value) {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 }).format(value);
}

export default function BuyGrid({ vehicles, salesWhatsapp }) {
  const [brand, setBrand] = useState("Todos");
  const brands = useMemo(() => ["Todos", ...new Set(vehicles.map((v) => v.brand))], [vehicles]);
  const filtered = brand === "Todos" ? vehicles : vehicles.filter((v) => v.brand === brand);

  function buyLink(v) {
    const msg = `Olá! Tenho interesse no ${v.brand} ${v.model} ${v.year} por ${formatBRL(v.price)}. Ainda está disponível?`;
    return `https://wa.me/${salesWhatsapp}?text=${encodeURIComponent(msg)}`;
  }

  return (
    <>
      <div className="filters-row">
        {brands.map((b) => (
          <span key={b} className={`filter-chip ${brand === b ? "active" : ""}`} onClick={() => setBrand(b)}>
            {b}
          </span>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p style={{ textAlign: "center", color: "#999", paddingBottom: 60 }}>Nenhum veículo disponível nessa categoria no momento.</p>
      ) : (
        <div className="buy-grid">
          {filtered.map((v) => (
            <div className="buy-card" key={v.id}>
              <div className="photo">
                <img src={v.image} alt={`${v.brand} ${v.model} ${v.year}`} loading="lazy" />
              </div>
              <div className="body">
                <h3>{v.brand} {v.model}</h3>
                <div className="year">Ano {v.year}</div>
                <p className="desc">{v.description}</p>
                <div className="price">
                  {formatBRL(v.price)}
                  <small>à vista ou financiado</small>
                </div>
                <a className="btn btn-primary" href={buyLink(v)} target="_blank" rel="noopener noreferrer" style={{ justifyContent: "center" }}>
                  Comprar agora
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
