"use client";
import { useState, useEffect } from "react";
import AdminShell from "@/components/AdminShell";

const EMPTY = { customerName: "", customerPhone: "", date: "", time: "", vehicleInterest: "", notes: "" };

export default function AgendaPage() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(EMPTY);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function load() {
    setLoading(true);
    const res = await fetch("/api/appointments");
    setAppointments(await res.json());
    setLoading(false);
  }
  useEffect(() => { load(); }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Erro ao salvar");
      setForm(EMPTY);
      load();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  async function setStatus(a, status) {
    await fetch(`/api/appointments/${a.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    load();
  }

  async function remove(a) {
    if (!confirm(`Remover agendamento de ${a.customerName}?`)) return;
    await fetch(`/api/appointments/${a.id}`, { method: "DELETE" });
    load();
  }

  return (
    <AdminShell title="Agenda">
      <div className="admin-card">
        <strong>Novo agendamento</strong>
        <form onSubmit={handleSubmit} style={{ marginTop: 16 }}>
          <div className="form-grid">
            <div className="form-field">
              <label>Cliente</label>
              <input required value={form.customerName} onChange={(e) => setForm({ ...form, customerName: e.target.value })} />
            </div>
            <div className="form-field">
              <label>Telefone</label>
              <input value={form.customerPhone} onChange={(e) => setForm({ ...form, customerPhone: e.target.value })} />
            </div>
            <div className="form-field">
              <label>Data</label>
              <input required type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
            </div>
            <div className="form-field">
              <label>Hora</label>
              <input required type="time" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} />
            </div>
            <div className="form-field">
              <label>Veículo de interesse</label>
              <input value={form.vehicleInterest} onChange={(e) => setForm({ ...form, vehicleInterest: e.target.value })} />
            </div>
            <div className="form-field">
              <label>Observações</label>
              <input value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
            </div>
          </div>
          {error && <p className="error-msg">{error}</p>}
          <button className="btn btn-primary" type="submit" disabled={saving}>
            {saving ? "Salvando..." : "Agendar"}
          </button>
        </form>
      </div>

      <div className="admin-card">
        <strong>Agendamentos ({appointments.length})</strong>
        <table className="data-table" style={{ marginTop: 12 }}>
          <thead>
            <tr><th>Cliente</th><th>Data</th><th>Hora</th><th>Interesse</th><th>Status</th><th></th></tr>
          </thead>
          <tbody>
            {loading && <tr><td colSpan={6} style={{ color: "#777" }}>Carregando...</td></tr>}
            {!loading && appointments.length === 0 && <tr><td colSpan={6} style={{ color: "#777" }}>Nenhum agendamento.</td></tr>}
            {appointments.map((a) => (
              <tr key={a.id}>
                <td>{a.customerName}{a.customerPhone ? ` · ${a.customerPhone}` : ""}</td>
                <td>{a.date}</td>
                <td>{a.time}</td>
                <td>{a.vehicleInterest || "—"}</td>
                <td>
                  <span className="tag-pill" style={{ background: a.status === "concluido" ? "rgba(74,222,128,0.15)" : a.status === "cancelado" ? "rgba(255,77,77,0.15)" : "rgba(192,192,192,0.15)", color: a.status === "concluido" ? "#4ade80" : a.status === "cancelado" ? "#ff4d4d" : "#ccc" }}>
                    {a.status}
                  </span>
                </td>
                <td>
                  <div className="row-actions">
                    {a.status === "agendado" && (
                      <>
                        <button className="btn btn-sm" style={{ borderColor: "#4ade80", color: "#4ade80" }} onClick={() => setStatus(a, "concluido")}>Concluir</button>
                        <button className="btn btn-danger btn-sm" onClick={() => setStatus(a, "cancelado")}>Cancelar</button>
                      </>
                    )}
                    <button className="btn btn-outline btn-sm" onClick={() => remove(a)}>Remover</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminShell>
  );
}
