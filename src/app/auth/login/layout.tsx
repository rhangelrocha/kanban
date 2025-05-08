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
      {children}
    </>
  );
}
