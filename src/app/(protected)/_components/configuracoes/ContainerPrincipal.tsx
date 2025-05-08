"use client"
import dynamic from "next/dynamic"
import { ConfiguracoesForm } from "./ConfiguracoesForm"
import AsideBar from "./SideBar"

export default function ContainerPrincipal() {
  const handleMenuClick = (event: React.MouseEvent) => {
    // event.preventDefault()
    // console.log(event.target)
    const id = event.currentTarget.getAttribute("href") as string

    const element = document.querySelector(id)
    // console.log(element)
    if (element) {
      const headerOffset = 90 // Ajuste este valor para a altura do seu cabeçalho
      const elementPosition =
        element.getBoundingClientRect().top + window.scrollY
      const offsetPosition = elementPosition - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
      // window.scrollTo(0, 0) // Add this line to add top spacing
    }
  }
  const handleScroll = () => {
    console.log("escolando")
  }
  return (
    <div onScroll={handleScroll} className="pt-20 max-w-4xl mx-auto ">
      <div>
        <AsideBar onMenuClick={handleMenuClick} />
      </div>

      <div
        id="main"
        className="flex flex-col gap-60  flex-1 ml-80 relative z-30 pb-28"
        onScroll={handleScroll}
      >
        <ConfiguracoesForm />
      </div>
    </div>
  )
}
