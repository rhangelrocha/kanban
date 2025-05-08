import { Icons } from "@/components/icons"

export default function Loading() {
    return <div className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]">
        <Icons.spinner className="h-7 w-7 animate-spin stroke-neutral-400" />
    </div>
}