import { readLocal } from "@/lib/data";
import SiteHeader from "@/components/SiteHeader";
import WhatsappFloat from "@/components/WhatsappFloat";
import BuyGrid from "@/components/BuyGrid";

export const metadata = {
  title: "Veículos à venda | Grid Veículos",
};

export default function EstoquePage() {
  const vehicles = readLocal("vehicles", []).filter((v) => v.status === "disponivel");
  const settings = readLocal("settings", { salesWhatsapp: "5511940899323" });

  return (
    <>
      <SiteHeader salesWhatsapp={settings.salesWhatsapp} />
      <section className="estoque-hero">
        <div className="container">
          <span className="tag" style={{ color: "var(--red)", fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", fontSize: 13 }}>
            Veículos à venda
          </span>
          <h1>Escolha o seu e feche com a gente</h1>
          <p>Preço já incluso, sem pegadinha. Clique em &ldquo;Comprar agora&rdquo; e finalize direto com nosso vendedor no WhatsApp.</p>
        </div>
      </section>
      <section className="container">
        <BuyGrid vehicles={vehicles} salesWhatsapp={settings.salesWhatsapp} />
      </section>
      <WhatsappFloat salesWhatsapp={settings.salesWhatsapp} />
    </>
  );
}
