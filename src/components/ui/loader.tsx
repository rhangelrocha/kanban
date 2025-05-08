import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils";

export const Loader = ({ className, loading, children, inline }: { className?: string, loading: boolean, rounded?: string; children?: React.ReactNode, inline?: boolean }) => {
    if (loading || !children) {
        let classN = cn(
            // `h-${h}`,
            `h-[1rem]`,
            `w-[100px]`,
            `rounded-xl`,
            inline && 'inline-block',
            'align-middle',
            'mr-1',
            className
        )

        return <Skeleton className={classN} />
    } else {
        return children;
    }
}

export default Loader