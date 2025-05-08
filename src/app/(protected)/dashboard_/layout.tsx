import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dash | Corre Corre 🏃🏻",
  description: "",
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
        <div className="flex justify-center items-center p-24">
            {children}
        </div>
    </>
  );
}
