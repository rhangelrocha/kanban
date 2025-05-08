import type { Metadata } from "next"
import { Suspense } from "react"
import Loading from "./loading"

export const metadata: Metadata = {
  title: "Projetos | Corre Corre 🏃🏻",
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