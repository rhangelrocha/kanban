import Link from "next/link";
import React from "react";

export default function Nav() {
    return (
        <header>
            <nav
            className="flex items-center justify-between p-6 lg:px-8 h-20 border border-t-0 border-l-0 border-r-0 border-b-gray-600"
            aria-label="Global">
                <div className="flex lg:flex-1">
                    <Link href="/" className="-m-1.5 p-1.5">
                        Corre Corre 🏃🏻
                    </Link>
                </div>
                <Link href='/dashboard'>Dashboard</Link>
            </nav>
        </header>
    )
}