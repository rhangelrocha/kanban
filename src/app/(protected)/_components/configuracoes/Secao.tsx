"use client"
export default function Secao({
  id,
  titulo,
  children,
}: {
  id: string
  titulo: string
  children: React.ReactNode
}) {
  return (
    <section id={id} className="pb-10 secao-ids">
      <h2 className="text-xl font-bold mb-5">{titulo}</h2>
      {children}
    </section>
  )
}
