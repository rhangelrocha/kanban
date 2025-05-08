export default function getInitials(name: string): string {
    if (!name) return '';

    const parts = name.trim().split(' ').filter(Boolean);

    if (parts.length === 1) {
        const word = parts[0];
        return word.slice(0, 2).toUpperCase();
    }

    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}