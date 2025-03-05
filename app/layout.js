import "./globals.css";

export const metadata = {
  title: "Dinesh G",
  description: "This project was developed for the GrowEasy assignment.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
