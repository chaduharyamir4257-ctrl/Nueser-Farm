import AdminGuard from "@/components/admin/AdminGuard";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default function ProtectedAdminLayout({ children }) {
  return (
    <AdminGuard>
      <div className="min-h-screen bg-gradient-to-br from-[#F6F8F2] via-[#FFFDF7] to-[#EEF4E7] md:flex">
        <AdminSidebar />
        <main className="flex-1 p-5 md:p-8 xl:p-10">{children}</main>
      </div>
    </AdminGuard>
  );
}


