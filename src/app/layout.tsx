import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

// Providers
import StoreProvider from '@/StoreProvider'
import QueryProvider from '@/QueryProvider'

// Clerk auth
import { ClerkProvider } from '@clerk/nextjs'
import { dark } from '@clerk/themes'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Noted',
    description: 'Client side for noted',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <ClerkProvider
            appearance={{
                baseTheme: dark
            }}
        >
            <html lang="en">
                <body className={inter.className}>
                    <StoreProvider>
                        <QueryProvider>
                            <div>
                                {children}
                            </div>
                        </QueryProvider>
                    </StoreProvider>
                </body>
            </html>
        </ClerkProvider>
    )
}
