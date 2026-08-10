"use client";
import { useState, useEffect, useCallback } from "react";

export default function Showroom({ vehicles }) {
  const [current, setCurrent] = useState(0);
  const [openIdx, setOpenIdx] = useState(null);
  const [show, setShow] = useState(false);

  const items = vehicles.slice(0, 8);

  const render = useCallback((i) => {
    setShow(false);
    setTimeout(() => {
      setCurrent(i);
      setShow(true);
    }, 180);
  }, []);

  function open(i) {
    setOpenIdx(i);
    render(i);
  }
  function close() {
    setOpenIdx(null);
  }
  function next() {
    render((current + 1) % items.length);
  }
  function prev() {
    render((current - 1 + items.length) % items.length);
  }

  useEffect(() => {
    function onKey(e) {
      if (openIdx === null) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [openIdx, current]);

  if (!items.length) return null;

  return (
    <>
      <div className="stock-grid">
        {items.map((car, i) => (
          <div className="stock-card" key={car.id} onClick={() => open(i)}>
            <span className="badge-year">{car.year}</span>
            <img src={car.image} alt={`${car.brand} ${car.model} ${car.year}`} loading="lazy" />
            <div className="stock-overlay">
              <h4>{car.brand} {car.model}</h4>
              <span className="year-tag">Ano {car.year}</span>
              <p>{car.description}</p>
              <span className="mini-btn">Ver foto</span>
            </div>
          </div>
        ))}
      </div>

      <div className={`lightbox ${openIdx !== null ? "open" : ""}`} onClick={(e) => e.target.classList.contains("lightbox") && close()}>
        <div className="lightbox-stage">
          {openIdx !== null && (
            <img
              className={show ? "show" : ""}
              src={items[current].image}
              alt={`${items[current].brand} ${items[current].model}`}
            />
          )}
          <div className="lightbox-caption">
            <b>{openIdx !== null ? `${items[current].brand} ${items[current].model}` : ""}</b> — Ano {openIdx !== null ? items[current].year : ""}
          </div>
          <div className="lightbox-close" onClick={close}>&#10005;</div>
          <div className="lightbox-nav prev" onClick={prev}>&#10094;</div>
          <div className="lightbox-nav next" onClick={next}>&#10095;</div>
        </div>
      </div>
    </>
  );
}
