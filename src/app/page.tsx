import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <main className="min-h-screen flex justify-center items-center p-24">
      <Button variant={'outline'} asChild>
        <Link href="/auth/login">Acesso</Link>
      </Button>
    </main>
  );
}
