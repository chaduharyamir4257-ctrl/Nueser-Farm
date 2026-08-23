"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartPanel from "@/components/CartPanel";
import Toast from "@/components/Toast";
import WhatsAppFloat from "@/components/WhatsAppFloat";

export default function SiteChrome({ children }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/administration");

  if (isAdmin) return children;

  return (
    <>
      <Header />
      {children}
      <Footer />
      <CartPanel />
      <Toast />
      <WhatsAppFloat />
    </>
  );
}

