import { cookies } from "next/headers";
import { CartHeader } from "./CartHeader";
import { SearchInput } from "./SearchInput";
import Link from "next/link";
import { HomeIcon } from "@heroicons/react/24/outline";

export const TopBar = () => {
   
    return (
        <div className="w-full bg-yellow-400 py-8 px-24">
            <div className="relative max-w-7xl mx-auto">
                <div className="relative flex items-center justify-center">
                    <Link href="/" className="block bg-black p-2 mr-6 w-10 h-10 rounded-full">
                        <HomeIcon className="w-6 h-6 text-white" />
                    </Link>
                    <SearchInput />
                    <CartHeader sessionId={cookies().get('SESSION_CART')?.value} />
                </div>

            </div>
        </div>
    );
}