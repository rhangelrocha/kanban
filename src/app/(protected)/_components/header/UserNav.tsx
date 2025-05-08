import React from "react"
import { signIn } from "../../../../../auth"
import { logout } from "@/actions/logout"
import { useSession } from "next-auth/react"
import { useCurrentUser } from "@/hooks/use-current-user"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

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
  ExitIcon,
} from "@radix-ui/react-icons"
import { Icons } from "@/components/icons"
import Link from "next/link"

export function UserNav() {
  const user = useCurrentUser();

  const [loadingSignOut, setloadingSignOut] = React.useState(false)
  const handleLogout = async () => {
    setloadingSignOut(true)
    logout()
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-7 w-7 rounded-full p-0">
          <Avatar className="h-7 w-7 flex align-center">
            {!loadingSignOut ? (
              <>
                <AvatarImage src="/assets/user-ae.png" alt={user?.name} />
                <AvatarFallback>
                  {user?.name.split(" ")[0].charAt(0)}
                </AvatarFallback>
              </>
            ) : (
              <Icons.spinner className="h-7 w-7 animate-spin stroke-neutral-400" />
            )}
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user?.name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Link href="/perfil" className="flex items-center">
              <PersonIcon className="h-3 w-3 mr-2" /> Meu perfil
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/configurar-notificacoes" className="flex items-center">
              <BellIcon className="h-3 w-3 mr-2" /> Configurar notificações
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          <ExitIcon className="h-3 w-3 mr-2 text-red-600" /> Sair
          {/* <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut> */}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
