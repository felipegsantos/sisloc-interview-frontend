'use server';

import serverApi from "@/config/ServerApi";
import { redirect } from "next/navigation";

export default async function submitCompanyAction(data) {
    try {
        await serverApi().post('companies', data);
    } catch (error) {
        console.log(error);
    }
    
    redirect('/panel/companies');
};



