import { Menu } from "@/app/components";

export function Settings() {
    return (
        <div className="blur-effect notes blur-bg">
            <Menu />
            <div className="flex justify-between items-center h-[50px] mb-[20px] sm:mb-[10px]">
                <h1 className="text-[24px]"> Settings </h1>
            </div>
        </div>
    )
}
