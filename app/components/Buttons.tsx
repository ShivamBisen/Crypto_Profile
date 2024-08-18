export const TabButton = ({active, children, onClick}: {
    active: boolean;
    children: React.ReactNode,
    onClick: () => void
}) => {
    return <button type="button" className={`w-full text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 ${active ? "bg-blue-500" : "bg-blue-300"}`} onClick={onClick}>{children}</button>
}