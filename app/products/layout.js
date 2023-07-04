import { TopBar } from "../components/TopBar";

export default function ProductLayout({ children, searchParams }) {

  return (
    <div className="min-h-full">
        {/* top navigation menu */}
        <TopBar />
        { children }
      </div>
  )
}
