import { readLocal, monthKey } from "@/lib/data";
import AdminShell from "@/components/AdminShell";

function formatBRL(value) {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 }).format(value || 0);
}

export default function DashboardPage() {
  const vehicles = readLocal("vehicles", []);
  const settings = readLocal("settings", { monthlyGoal: 5 });
  const appointments = readLocal("appointments", []);

  const sold = vehicles.filter((v) => v.status === "vendido");
  const available = vehicles.filter((v) => v.status === "disponivel");
  const thisMonth = monthKey();
  const soldThisMonth = sold.filter((v) => v.soldAt && monthKey(new Date(v.soldAt)) === thisMonth);
  const faturamentoTotal = sold.reduce((sum, v) => sum + (v.soldPrice || 0), 0);
  const faturamentoMes = soldThisMonth.reduce((sum, v) => sum + (v.soldPrice || 0), 0);
  const goal = settings.monthlyGoal || 5;
  const progress = Math.min(100, Math.round((soldThisMonth.length / goal) * 100));
  const estoqueValor = available.reduce((sum, v) => sum + (v.price || 0), 0);

  const recentSold = [...sold].sort((a, b) => new Date(b.soldAt) - new Date(a.soldAt)).slice(0, 6);
  const upcomingAppointments = appointments
    .filter((a) => a.status !== "cancelado")
    .slice(0, 6);

  return (
    <AdminShell title="Dashboard">
      <div className="kpi-row">
        <div className="kpi">
          <div className="label">Faturamento total</div>
          <div className="value red">{formatBRL(faturamentoTotal)}</div>
        </div>
        <div className="kpi">
          <div className="label">Faturamento do mês</div>
          <div className="value">{formatBRL(faturamentoMes)}</div>
        </div>
        <div className="kpi">
          <div className="label">Veículos disponíveis</div>
          <div className="value">{available.length}</div>
        </div>
        <div className="kpi">
          <div className="label">Valor em estoque</div>
          <div className="value">{formatBRL(estoqueValor)}</div>
        </div>
      </div>

      <div className="admin-card">
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
          <strong>Meta mensal de vendas</strong>
          <span>{soldThisMonth.length} / {goal} veículos</span>
        </div>
        <div className="progress-bar">
          <div className="fill" style={{ width: `${progress}%` }} />
        </div>
        <p style={{ color: "#999", fontSize: 13, marginTop: 10 }}>
          {soldThisMonth.length >= goal
            ? "Meta do mês batida! 🎉"
            : `Faltam ${goal - soldThisMonth.length} veículo(s) pra bater a meta deste mês.`}
        </p>
      </div>

      <div className="admin-card">
        <strong>Últimas vendas</strong>
        <table className="data-table" style={{ marginTop: 12 }}>
          <thead>
            <tr><th>Veículo</th><th>Vendido em</th><th>Valor</th></tr>
          </thead>
          <tbody>
            {recentSold.length === 0 && (
              <tr><td colSpan={3} style={{ color: "#777" }}>Nenhuma venda registrada ainda.</td></tr>
            )}
            {recentSold.map((v) => (
              <tr key={v.id}>
                <td>{v.brand} {v.model} {v.year}</td>
                <td>{new Date(v.soldAt).toLocaleDateString("pt-BR")}</td>
                <td>{formatBRL(v.soldPrice)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="admin-card">
        <strong>Próximos agendamentos</strong>
        <table className="data-table" style={{ marginTop: 12 }}>
          <thead>
            <tr><th>Cliente</th><th>Data</th><th>Hora</th><th>Interesse</th></tr>
          </thead>
          <tbody>
            {upcomingAppointments.length === 0 && (
              <tr><td colSpan={4} style={{ color: "#777" }}>Nenhum agendamento.</td></tr>
            )}
            {upcomingAppointments.map((a) => (
              <tr key={a.id}>
                <td>{a.customerName}</td>
                <td>{a.date}</td>
                <td>{a.time}</td>
                <td>{a.vehicleInterest || "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminShell>
  );
}
