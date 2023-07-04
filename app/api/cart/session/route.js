"use server";

import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import serverApi from "@/config/ServerApi";
import { cookies } from "next/headers";

/** @param {import('next/server').NextRequest} request */
export async function POST(request) {
    const body = await request.json();
    let session_cart = cookies().get('SESSION_CART');

    if(!session_cart) {
        cookies().set({
            name: 'SESSION_CART',
            value: randomUUID(),
            expires: new Date(new Date().setMinutes(new Date().getMinutes() + 250)),
        });
        session_cart = cookies().get('SESSION_CART');
    }

    try {
        const { data } = await serverApi().post('carts', body, {
            headers: {
                'X-Session-Cart': session_cart.value
            }
        });

        return NextResponse.json({
            ...data,
            session_cart_id: session_cart.value
        })
    } catch (error) {
        console.log(error)
    }
}