"use client";
import { useState, useEffect } from "react";
import AdminShell from "@/components/AdminShell";

const EMPTY = { name: "", phone: "", email: "", notes: "" };

export default function ClientesPage() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(EMPTY);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function load() {
    setLoading(true);
    const res = await fetch("/api/customers");
    setCustomers(await res.json());
    setLoading(false);
  }
  useEffect(() => { load(); }, []);

  function startEdit(c) {
    setEditingId(c.id);
    setForm({ name: c.name, phone: c.phone, email: c.email, notes: c.notes });
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
      const res = await fetch(editingId ? `/api/customers/${editingId}` : "/api/customers", {
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

  async function remove(c) {
    if (!confirm(`Remover cliente ${c.name}?`)) return;
    await fetch(`/api/customers/${c.id}`, { method: "DELETE" });
    load();
  }

  return (
    <AdminShell title="Clientes">
      <div className="admin-card">
        <strong>{editingId ? "Editar cliente" : "Adicionar cliente"}</strong>
        <form onSubmit={handleSubmit} style={{ marginTop: 16 }}>
          <div className="form-grid">
            <div className="form-field">
              <label>Nome</label>
              <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </div>
            <div className="form-field">
              <label>Telefone</label>
              <input required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="(11) 99999-9999" />
            </div>
            <div className="form-field">
              <label>Email</label>
              <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            </div>
            <div className="form-field full">
              <label>Observações</label>
              <textarea rows={2} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
            </div>
          </div>
          {error && <p className="error-msg">{error}</p>}
          <div className="btn-row">
            <button className="btn btn-primary" type="submit" disabled={saving}>
              {saving ? "Salvando..." : editingId ? "Salvar alterações" : "Adicionar cliente"}
            </button>
            {editingId && <button type="button" className="btn btn-outline" onClick={cancelEdit}>Cancelar</button>}
          </div>
        </form>
      </div>

      <div className="admin-card">
        <strong>Clientes ({customers.length})</strong>
        <table className="data-table" style={{ marginTop: 12 }}>
          <thead>
            <tr><th>Nome</th><th>Telefone</th><th>Email</th><th></th></tr>
          </thead>
          <tbody>
            {loading && <tr><td colSpan={4} style={{ color: "#777" }}>Carregando...</td></tr>}
            {!loading && customers.length === 0 && <tr><td colSpan={4} style={{ color: "#777" }}>Nenhum cliente cadastrado.</td></tr>}
            {customers.map((c) => (
              <tr key={c.id}>
                <td>{c.name}</td>
                <td>{c.phone}</td>
                <td>{c.email || "—"}</td>
                <td>
                  <div className="row-actions">
                    <button className="btn btn-outline btn-sm" onClick={() => startEdit(c)}>Editar</button>
                    <button className="btn btn-danger btn-sm" onClick={() => remove(c)}>Remover</button>
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
