import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

// Redux
import StoreProvider from '@/StoreProvider'

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
                        <div>
                            {children}
                        </div>
                    </StoreProvider>
                </body>
            </html>
        </ClerkProvider>
    )
}
