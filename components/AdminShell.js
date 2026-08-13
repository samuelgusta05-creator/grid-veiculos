"use client";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";

const LINKS = [
  { href: "/admin/dashboard", label: "Dashboard" },
  { href: "/admin/veiculos", label: "Veículos" },
  { href: "/admin/clientes", label: "Clientes" },
  { href: "/admin/agenda", label: "Agenda" },
];

export default function AdminShell({ title, children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin");
    router.refresh();
  }

  return (
    <div className="admin-shell">
      <aside className={`admin-sidebar ${open ? "open" : ""}`}>
        <img src="/assets/logo-white.png" alt="Grid Veículos" />
        <button className="admin-menu-btn" aria-label="Menu" onClick={() => setOpen((o) => !o)}>
          {open ? "✕" : "☰"}
        </button>
        {LINKS.map((l) => (
          <a key={l.href} href={l.href} className={pathname === l.href ? "active" : ""} onClick={() => setOpen(false)}>
            {l.label}
          </a>
        ))}
        <div style={{ flex: 1 }} />
        <a href="/" target="_blank" rel="noopener noreferrer">Ver site &#8599;</a>
        <a onClick={logout} style={{ cursor: "pointer" }}>Sair</a>
      </aside>
      <main className="admin-main">
        <div className="admin-topbar">
          <h1>{title}</h1>
        </div>
        {children}
      </main>
    </div>
  );
}
