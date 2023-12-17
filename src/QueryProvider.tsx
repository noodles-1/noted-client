'use client'

import { ReactQueryStreamedHydration } from "@tanstack/react-query-next-experimental"
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"

export default function QueryProvider({ children }: { children: React.ReactNode }) {
    const client = new QueryClient()

    return (
        <QueryClientProvider client={client}>
            <ReactQueryStreamedHydration>
                {children}
            </ReactQueryStreamedHydration>
        </QueryClientProvider>
    )
}