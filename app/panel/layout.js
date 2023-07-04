import { Inter } from 'next/font/google';
import { TopNavigation } from "./components/TopNavigation";

const inter = Inter({ subsets: ['latin'] })

export default function PanelLayout({ children }) {
  return (
    <div className="min-h-full">
        {/* top navigation menu */}
        <TopNavigation />
        { children }
      </div>
  )
}
