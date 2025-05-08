"use client"
 
import * as React from "react"
import Link from "next/link"
import { usePathname } from 'next/navigation'

 
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
 
export function PrimaryMenu() {
  const pathName : string = usePathname();

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link href="/dashboard" legacyBehavior passHref>
            <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), pathName == '/dashboard' ? 'bg-accent text-accent-foreground' : '')}>
              Quadros
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Empresa</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-2 md:w-[300px] lg:w-[200px] lg:grid-cols-[1fr]">
              <ListItem href="/projetos" title="Projetos"></ListItem>
              <ListItem href="/tarefas" title="Tarefas"></ListItem>
              <ListItem href="/clientes" title="Clientes"></ListItem>
              <ListItem href="/relatorios" title="Relatórios"></ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/equipes" legacyBehavior passHref>
            <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), pathName == '/equipes' ? 'bg-accent text-accent-foreground' : '')}>
              Equipes
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/eu" legacyBehavior passHref>
            <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), pathName == '/eu' ? 'bg-accent text-accent-foreground' : '')}>
              Eu
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/emails" legacyBehavior passHref>
            <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), pathName == '/emails' ? 'bg-accent text-accent-foreground' : '')}>
              Enviar e-mail
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}
 
const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"