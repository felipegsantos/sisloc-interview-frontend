"use client";

import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import _ from "lodash";
import Link from "next/link";
import { useSelector } from "react-redux";

export const CartHeader = () => {
    const cart = useSelector(state => state.cart, _.isEqual);

    return (
        <Link href="/cart" className="absolute text-center text-sm top-1 right-0 bg-yellow-500 text-white p-2 rounded-full overflow">
            <ShoppingCartIcon className="w-6 h-6" />
            <div className="absolute text-sm top-0 right-0 -mt-2 -mr-2 w-5 h-5 bg-red-400 rounded-full"> { cart?.countItems || 0 } </div>
        </Link>
    );
}