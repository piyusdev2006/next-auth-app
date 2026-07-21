import { connectToDatabase } from "@/dbConfig/dbConfig";
import { NextResponse } from "next/server";

export async function GET(){

    try{
        await connectToDatabase();
        
        const response = NextResponse.json(
            {
                message:"Logout Successful",
                success: true,
            },
            {
                status:200
            }
        )

        response.cookies.set("token", "", 
            {
                httpOnly: true,
                expires: Date.now()
            }
        )

        return response;
        
    }
    catch(error: any){
        return NextResponse.json(
            {error:error.message}, 
            {status:500}
        ) 
    }
}