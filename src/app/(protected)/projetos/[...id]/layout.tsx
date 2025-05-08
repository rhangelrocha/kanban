import type { Metadata } from "next"
import { Suspense } from "react"
import Loading from "../loading"
import "./projeto.css"

export const metadata: Metadata = {
  title: "Editar projeto | Corre Corre 🏃🏻",
  description: "",
}

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return ( 
    <main>
      <Suspense fallback={<Loading />}>
        {children}
      </Suspense>
    </main>
  )
}