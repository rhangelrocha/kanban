"use client"
import Link from "next/link"
export default function LinksASideBar({
  href,
  children,
  onMenuClick,
  activeLink,
}: {
  href: string
  children: string
  onMenuClick: (event: React.MouseEvent) => void
  activeLink: string
}) {
  // const pathname = usePathname()
  // const params = useParams()
  // const fragmento = window.location.hash

  return (
    <Link
      scroll={false}
      className={`inline-flex items-center whitespace-nowrap  text-sm font-medium transition-colors duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:text-accent-foreground h-9 px-4 py-2 hover:bg-primary transition- justify-start hover:text-white active:bg:primary ${
        activeLink === href ? "bg-primary text-white" : ""
      }`}
      href={href}
      onClick={onMenuClick}
    >
      {children}
    </Link>
  )
}
