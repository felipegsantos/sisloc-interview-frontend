'use server';

import serverApi from "@/config/ServerApi";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function submitLoginAction(data) {
    try {
        const { data: login } = await serverApi().post('/auth/login', data);
        cookies().set({
            name: 'sisloc',
            value: login.access_token,
            sameSite: 'strict',
            httpOnly: true,
            expires: new Date(new Date().setMinutes(new Date().getMinutes() + 250)),
        });        
    } catch (error) {
        console.log(error)
    }
    
    redirect('/panel');
};