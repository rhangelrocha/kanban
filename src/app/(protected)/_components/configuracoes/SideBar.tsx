"use client"
import { useEffect, useState } from "react"
import LinksASideBar from "./LinksAsideBar"

export default function AsideBar({
  onMenuClick,
}: {
  onMenuClick: (event: React.MouseEvent) => void
}) {
  const [activeLink, setActiveLink] = useState("#usuarios")
  const handleClick = (event: React.MouseEvent, href: string) => {
    onMenuClick(event)
    setActiveLink(href)
  }
  useEffect(() => {
    // const secao_ids = document.querySelectorAll(".secao-ids")
    const handleScroll = () => {
      const secao_ids = Array.from(document.querySelectorAll(".secao-ids"))
      const activeSecao = secao_ids.find((secao) => {
        const rect = secao.getBoundingClientRect()
        return rect.top < 95 && rect.bottom > 90
      })

      // console.log(activeSecao.id)
      if (activeSecao) {
        const newUrl = "#" + activeSecao.id
        // window.history.pushState(null, "", newUrl)
        setActiveLink(newUrl)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])
  return (
    <aside className="mx-4 h-full fixed ">
      <h1 className="text-2xl font-bold mb-8">Configurações</h1>
      <nav>
        <ul className="flex  flex-col">
          <LinksASideBar
            href="#usuarios"
            onMenuClick={(e) => handleClick(e, "#usuarios")}
            activeLink={activeLink}
          >
            Usuários
          </LinksASideBar>
          <LinksASideBar
            href="#usuarios-convidados"
            onMenuClick={(e) => handleClick(e, "#usuarios-convidados")}
            activeLink={activeLink}
          >
            Usuários convidados
          </LinksASideBar>
          <LinksASideBar
            href="#tarefas"
            onMenuClick={(e) => handleClick(e, "#tarefas")}
            activeLink={activeLink}
          >
            Tarefas
          </LinksASideBar>
          <LinksASideBar
            href="#comentarios-anexos"
            onMenuClick={(e) => handleClick(e, "#comentarios-anexos")}
            activeLink={activeLink}
          >
            Comentários e anexos
          </LinksASideBar>
          <LinksASideBar
            href="#cliente-projeto"
            onMenuClick={(e) => handleClick(e, "#cliente-projeto")}
            activeLink={activeLink}
          >
            Cliente &gt; Projeto
          </LinksASideBar>
          <LinksASideBar
            href="#mural"
            onMenuClick={(e) => handleClick(e, "#mural")}
            activeLink={activeLink}
          >
            Mural
          </LinksASideBar>
          <LinksASideBar
            href="#gestao-tempo"
            onMenuClick={(e) => handleClick(e, "#gestao-tempo")}
            activeLink={activeLink}
          >
            Gestão de tempo
          </LinksASideBar>
        </ul>
      </nav>
    </aside>
  )
}
