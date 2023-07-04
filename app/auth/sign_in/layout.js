import { Inter } from 'next/font/google'
import { cookies } from 'next/headers';

const inter = Inter({ subsets: ['latin'] });

export default function AuthLayout({ children }) {
    const cookie = cookies();
    return (
        <div className="min-h-full">
            {children}
        </div>
    )
}
