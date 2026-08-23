import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import SiteChrome from "@/components/SiteChrome";

export const metadata = {
  title: "Ghous Ali Nursery Farm — Plants, Landscaping & Garden Care",
  description:
    "Plants, fertilizers, pots, and full landscape design — grown and delivered across Lahore. Browse the catalog and order on WhatsApp.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <SiteChrome>{children}</SiteChrome>
        </CartProvider>
      </body>
    </html>
  );
}
