import { useUser } from "@clerk/nextjs"
import { UserButton } from "@clerk/nextjs"

export function Profile() {
    const { user, isLoaded } = useUser()

    return (
        <>
            {user && isLoaded &&
                <div className="flex items-center mb-[30px]">
                    <UserButton afterSignOutUrl="/" />
                </div>
            }
        </>
    )
}
