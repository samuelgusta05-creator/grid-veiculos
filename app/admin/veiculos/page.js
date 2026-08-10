"use client";
import { useState, useEffect } from "react";
import AdminShell from "@/components/AdminShell";
import ImageUploader from "@/components/ImageUploader";

function formatBRL(value) {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 }).format(value || 0);
}

const EMPTY = { brand: "", model: "", year: "", price: "", description: "", image: "" };

export default function VeiculosPage() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(EMPTY);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function load() {
    setLoading(true);
    const res = await fetch("/api/vehicles");
    setVehicles(await res.json());
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  function startEdit(v) {
    setEditingId(v.id);
    setForm({ brand: v.brand, model: v.model, year: v.year, price: v.price, description: v.description, image: v.image });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function cancelEdit() {
    setEditingId(null);
    setForm(EMPTY);
    setError("");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const res = await fetch(editingId ? `/api/vehicles/${editingId}` : "/api/vehicles", {
        method: editingId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Erro ao salvar");
      cancelEdit();
      load();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  async function toggleSold(v) {
    const nextStatus = v.status === "vendido" ? "disponivel" : "vendido";
    if (nextStatus === "vendido" && !confirm(`Marcar ${v.brand} ${v.model} como vendido por ${formatBRL(v.price)}?`)) return;
    await fetch(`/api/vehicles/${v.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: nextStatus }),
    });
    load();
  }

  async function remove(v) {
    if (!confirm(`Remover ${v.brand} ${v.model} do estoque?`)) return;
    await fetch(`/api/vehicles/${v.id}`, { method: "DELETE" });
    load();
  }

  return (
    <AdminShell title="Veículos">
      <div className="admin-card">
        <strong>{editingId ? "Editar veículo" : "Adicionar veículo"}</strong>
        <form onSubmit={handleSubmit} style={{ marginTop: 16 }}>
          <div className="form-grid">
            <div className="form-field">
              <label>Marca</label>
              <input required value={form.brand} onChange={(e) => setForm({ ...form, brand: e.target.value })} />
            </div>
            <div className="form-field">
              <label>Modelo</label>
              <input required value={form.model} onChange={(e) => setForm({ ...form, model: e.target.value })} />
            </div>
            <div className="form-field">
              <label>Ano</label>
              <input required value={form.year} onChange={(e) => setForm({ ...form, year: e.target.value })} />
            </div>
            <div className="form-field">
              <label>Preço (R$)</label>
              <input required type="number" min="0" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
            </div>
            <div className="form-field full">
              <label>Descrição</label>
              <textarea rows={2} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
            </div>
            <div className="form-field full">
              <label>Foto</label>
              <ImageUploader value={form.image} onChange={(url) => setForm({ ...form, image: url })} />
            </div>
          </div>
          {error && <p className="error-msg">{error}</p>}
          <div className="btn-row">
            <button className="btn btn-primary" type="submit" disabled={saving}>
              {saving ? "Salvando..." : editingId ? "Salvar alterações" : "Adicionar veículo"}
            </button>
            {editingId && <button type="button" className="btn btn-outline" onClick={cancelEdit}>Cancelar</button>}
          </div>
        </form>
      </div>

      <div className="admin-card">
        <strong>Estoque ({vehicles.length})</strong>
        <table className="data-table" style={{ marginTop: 12 }}>
          <thead>
            <tr><th>Veículo</th><th>Preço</th><th>Status</th><th></th></tr>
          </thead>
          <tbody>
            {loading && <tr><td colSpan={4} style={{ color: "#777" }}>Carregando...</td></tr>}
            {!loading && vehicles.length === 0 && <tr><td colSpan={4} style={{ color: "#777" }}>Nenhum veículo cadastrado.</td></tr>}
            {vehicles.map((v) => (
              <tr key={v.id}>
                <td>{v.brand} {v.model} {v.year}</td>
                <td>{formatBRL(v.price)}</td>
                <td><span className={`tag-pill ${v.status}`}>{v.status === "vendido" ? "Vendido" : "Disponível"}</span></td>
                <td>
                  <div className="row-actions">
                    <button className="btn btn-outline btn-sm" onClick={() => startEdit(v)}>Editar</button>
                    <button className="btn btn-sm" style={{ borderColor: "#4ade80", color: "#4ade80" }} onClick={() => toggleSold(v)}>
                      {v.status === "vendido" ? "Reabrir" : "Marcar vendido"}
                    </button>
                    <button className="btn btn-danger btn-sm" onClick={() => remove(v)}>Remover</button>
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
