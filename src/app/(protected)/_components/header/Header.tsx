"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import styles from "./Header.module.css"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu"
import { PrimaryMenu } from "./PrimaryMenu"
import { ModeToggle } from "@/components/ModeToggle"

import {
  CalendarIcon,
  EnvelopeClosedIcon,
  FaceIcon,
  GearIcon,
  PersonIcon,
  RocketIcon,
  BellIcon,
  MagnifyingGlassIcon,
  ReloadIcon,
  PlusIcon,
} from "@radix-ui/react-icons"

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
  CommandLoading,
} from "@/components/ui/command"

import { Button } from "@/components/ui/button"
import { randomInt } from "crypto"

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UserNav } from "./UserNav"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Icons } from "@/components/icons"

type ItemSearch = {
  title: string
  link: string
  organization: string
  image: any
}

export default function Header() {
  const [query, setQuery] = React.useState("")
  const [openSearch, setOpenSeach] = React.useState(false)
  const [loadingSearch, setloadingSeach] = React.useState(false)
  const [search, setSearch] = React.useState("")
  const [itemsSearch, setItemsSearch] = React.useState<ItemSearch[]>([])

  React.useEffect(() => {
    if (query.trim() === "") {
      setItemsSearch([])
      return
    }

    const fetchData = async () => {
      setloadingSeach(true)
      try {
        // const response = await axios.get(`sua_api_aqui?q=${query}`);
        // setItemsSearch(response.data);
        setTimeout(() => {
          setItemsSearch([
            {
              title: "0001 - AE DIGITAL | Desenvolvimento App",
              link: "#",
              organization: "AE DIGITAL",
              image:
                "https://ae.digital/wp-content/themes/ae_digital2/imgs/favicon.png",
            },
            {
              title: "0002 - MEDEX | Ajustes Plataforma",
              link: "#",
              organization: "MEDICO EXPONENCIAL",
              image: null,
            },
            {
              title: "0003 - JNR | Ajustes LP",
              link: "#",
              organization: "JOGANDO NA REDE",
              image: null,
            },
            {
              title: "0001 - AE DIGITAL | Desenvolvimento App",
              link: "#",
              organization: "AE DIGITAL",
              image:
                "https://ae.digital/wp-content/themes/ae_digital2/imgs/favicon.png",
            },
            {
              title: "0002 - MEDEX | Ajustes Plataforma",
              link: "#",
              organization: "MEDICO EXPONENCIAL",
              image: null,
            },
            {
              title: "0003 - JNR | Ajustes LP",
              link: "#",
              organization: "JOGANDO NA REDE",
              image: null,
            },
            {
              title: "0001 - AE DIGITAL | Desenvolvimento App",
              link: "#",
              organization: "AE DIGITAL",
              image:
                "https://ae.digital/wp-content/themes/ae_digital2/imgs/favicon.png",
            },
            {
              title: "0002 - MEDEX | Ajustes Plataforma",
              link: "#",
              organization: "MEDICO EXPONENCIAL",
              image: null,
            },
            {
              title: "0003 - JNR | Ajustes LP",
              link: "#",
              organization: "JOGANDO NA REDE",
              image: null,
            },
          ])
          setloadingSeach(false)
        }, 2000)
      } catch (error) {
        console.error("Erro ao buscar dados:", error)
      } finally {
        // setloadingSeach(false);
      }
    }

    fetchData()
  }, [query])

  React.useEffect(() => {
    if (openSearch == false) {
      setQuery("")
      setItemsSearch([])
    }
  }, [openSearch])

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpenSeach((openSearch) => !openSearch)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const convertToSlug = (title: string): string => {
    return title.toLowerCase().replace(/\s+/g, "-")
  }

  return (
    <header className="sticky top-0 right-0 left-0 z-50 bg-inherit">
      <nav
        className={`flex items-center justify-between p-2 lg:px-8 h-15 border border-t-0 border-l-0 border-r-0 border-b ${styles.header__app}`}
        aria-label="Global"
      >
        <div className="flex lg:flex-1 items-center justify-start gap-5">
          <Link
            href="/dashboard"
            className={`flex items-center justify-center p-1.5 rounded ${styles.brand}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className={`h-6 w-6 ${styles.svg__logo}`}
              fill="#fff"
            >
              <path d="M15.91 13.34l2.636-4.026-.454-.406-3.673 3.099c-.675-.138-1.402.068-1.894.618-.736.823-.665 2.088.159 2.824.824.736 2.088.665 2.824-.159.492-.55.615-1.295.402-1.95zm-3.91-10.646v-2.694h4v2.694c-1.439-.243-2.592-.238-4 0zm8.851 2.064l1.407-1.407 1.414 1.414-1.321 1.321c-.462-.484-.964-.927-1.5-1.328zm-18.851 4.242h8v2h-8v-2zm-2 4h8v2h-8v-2zm3 4h7v2h-7v-2zm21-3c0 5.523-4.477 10-10 10-2.79 0-5.3-1.155-7.111-3h3.28c1.138.631 2.439 1 3.831 1 4.411 0 8-3.589 8-8s-3.589-8-8-8c-1.392 0-2.693.369-3.831 1h-3.28c1.811-1.845 4.321-3 7.111-3 5.523 0 10 4.477 10 10z" />
            </svg>
          </Link>

          <div className={`flex items-center gap-3 ${styles.menu__app}`}>
            <PrimaryMenu />
          </div>
        </div>
        <div className="flex lg:flex-1 items-center justify-end gap-2">
          <Button
            variant="outline"
            className="relative pr-[70px] text-[13px]"
            onClick={() => setOpenSeach((openSearch) => !openSearch)}
          >
            <MagnifyingGlassIcon className="mr-2 h-4 w-4" /> O que você procura?
            <kbd className="absolute right-2 pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
              <span className="text-xs">⌘</span>K
            </kbd>
          </Button>
          <Button>
            Nova tarefa <PlusIcon className="ml-2 h-4 w-4" />
          </Button>
          <Sheet>
            <Button asChild variant="outline" size="icon" title="Notificações">
              <SheetTrigger>
                <BellIcon className="h-4 w-4" />
              </SheetTrigger>
            </Button>
            <SheetContent>
              <SheetHeader>
                <SheetTitle className="text-sm">Notificações</SheetTitle>
              </SheetHeader>
              <Tabs defaultValue="todas" className="w-[90%] mt-3">
                <TabsList className="mb-2">
                  <TabsTrigger value="todas">Todas</TabsTrigger>
                  <TabsTrigger value="mencoes">Menções para mim</TabsTrigger>
                </TabsList>
                <TabsContent value="todas">
                  <div
                    className={`text-sm text-gray-500 ${styles.notificacoes__vazio}`}
                  >
                    Sem notificações por enquanto.
                  </div>
                </TabsContent>
                <TabsContent value="mencoes">
                  <div
                    className={`text-sm text-gray-500 ${styles.notificacoes__vazio}`}
                  >
                    Sem notificações por enquanto.
                  </div>
                </TabsContent>
              </Tabs>
            </SheetContent>
          </Sheet>
          <ModeToggle />
          <UserNav />
        </div>
      </nav>
      <CommandDialog open={openSearch} onOpenChange={setOpenSeach}>
        <Command shouldFilter={false}>
          <CommandInput
            placeholder="Digite o que você está procurando..."
            value={query}
            onValueChange={setQuery}
          />
          <CommandList>
            {query ? (
              loadingSearch ? (
                <CommandEmpty className="flex items-center justify-center gap-3 text-gray-800 dark:text-gray-400 py-5">
                  <Icons.spinner className="h-3 w-3 animate-spin" /> Carregando
                </CommandEmpty>
              ) : (
                <CommandGroup heading="Resultados">
                  {itemsSearch.map((item, index) => (
                    <CommandItem key={index}>
                      <Avatar className="h-7 w-7 mr-2">
                        <AvatarImage
                          src={item.image}
                          alt={`@${item.organization
                            .split(" ")
                            .map((word) => word.charAt(0))
                            .join("")}`}
                        />
                        <AvatarFallback className="text-[10px]">
                          {item.organization
                            .split(" ")
                            .map((word) => word.charAt(0))
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      {item.title}
                    </CommandItem>
                  ))}
                </CommandGroup>
              )
            ) : (
              <>
                <CommandSeparator />
                <CommandGroup heading="Sugestões">
                  <Link
                    href={"/perfil"}
                    className="relative flex items-center rounded-sm px-2 py-1.5 text-xs outline-none hover:bg-gray-100 aria-selected:bg-accent aria-selected:text-accent-foreground opacity-80"
                  >
                    <PersonIcon className="mr-2 h-4 w-4" />
                    <span>Meu perfil</span>
                  </Link>
                  <Link
                    href={"/configuracoes"}
                    className="relative flex items-center rounded-sm px-2 py-1.5 text-xs outline-none hover:bg-gray-100 aria-selected:bg-accent aria-selected:text-accent-foreground opacity-80"
                  >
                    <GearIcon className="mr-2 h-4 w-4" />
                    <span>Configurações</span>
                  </Link>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </CommandDialog>
    </header>
  )
}
