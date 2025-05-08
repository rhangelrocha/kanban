import type { Metadata } from "next"
import Header from "../_components/header/Header"

export const metadata: Metadata = {
  title: "Configurar Notificações | Corre Corre 🏃🏻",
  description: "",
}

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <main className="pt-10">
      {/* <Header /> */}
      {children}
    </main>
  )
}
