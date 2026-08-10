import "./globals.css";

export const metadata = {
  title: "Grid Veículos | Qualidade que move você",
  description: "Revenda de veículos novos e seminovos em São Paulo.",
  icons: { icon: "/assets/logo-icon.png" },
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;800;900&family=Bebas+Neue&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
