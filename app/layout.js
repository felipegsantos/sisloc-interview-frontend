import './globals.css'
import Providers from '@/config/Providers';
import { Inter } from 'next/font/google'
import { cookies } from 'next/headers';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }) {

  return (
    <html lang="pt-BR">
      <body className={`${inter.className} bg-gray-100`}>
        <Providers accessToken={cookies().get('sisloc')?.value}>
          <main>
            {children}
          </main>
        </Providers>
      </body>
    </html>
  )
}
