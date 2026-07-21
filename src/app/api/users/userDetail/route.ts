// grabbing userDtails from tokens
import { connectToDatabase } from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import { NextRequest, NextResponse } from 'next/server';
import { getUserDataFromToken } from '@/helpers/getUserDetailsfromToken';


export async function GET(request:NextRequest){
    try {
        await connectToDatabase();
        const userId = await getUserDataFromToken(request);
        
        const user = await User.findOne({
            _id: userId
        }).select("-password");

        return NextResponse.json({
            message: "User details fetched successfully",
            data: user
        })
    } catch (error: any) {
        return NextResponse.json(
            {error: error.message }, 
            {status: 500}
        );
    }
}