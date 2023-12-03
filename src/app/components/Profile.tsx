import { useUser } from "@clerk/nextjs"
import { UserButton } from "@clerk/nextjs"

export function Profile() {
    const { user, isLoaded } = useUser()

    return (
        <>
            {user && isLoaded &&
                <div className="flex items-center mb-[20px]">
                    <UserButton afterSignOutUrl="/" />
                    <p className="ml-[10px]"> {user.fullName} </p>
                </div>
            }
        </>
    )
}
