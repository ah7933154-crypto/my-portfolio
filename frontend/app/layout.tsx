import type { Metadata } from 'next'
import { ThemeProvider } from '@/app/ThemeContext'
import './globals.css'

export const metadata: Metadata = {
  title: 'Ali Haider — Portfolio',
  description: 'Computer Science Student & Frontend Developer Intern at DevelopersHub Corporation',
  keywords: ['Ali Haider', 'Portfolio', 'Frontend Developer', 'React', 'Next.js'],
  authors: [{ name: 'Ali Haider' }],
  openGraph: {
    title: 'Ali Haider — Portfolio',
    description: 'Computer Science Student & Frontend Developer',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>⚡</text></svg>" />
      </head>
      <body className="dark:bg-[#050508] bg-[#f8f7ff] dark:text-[#f0eeff] text-[#12101e]">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}