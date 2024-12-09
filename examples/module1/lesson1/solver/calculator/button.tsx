import type { ReactNode } from "react";

export default function Button({
    onClick, 
    children
}: {
    onClick: React.MouseEventHandler<HTMLButtonElement> | undefined,
    children: ReactNode
}) {
    return (
        <button
            className="bg-blue-200 px-2 py-4 text-lg hover:bg-blue-500 hover:text-white rounded-md"
            onClick={onClick}
            type="button"
        >
            {children}
        </button>
    )
}