import { connectToDatabase } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextResponse, NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';


export async function POST(request: NextRequest) {
    try {
        // Connect to database inside the handler so it's properly awaited
        await connectToDatabase();


        const reqBody = await request.json();
        const { email, password } = reqBody;

        // Check if the user exists
        const existingLoggedInUser = await User.findOne({ email });

        if (!existingLoggedInUser) {
            return NextResponse.json({
                message: 'User does not exist'
            }, { status: 404 });
        }

        // Check if the password is correct
        const isPasswordCorrect = await bcrypt.compare(password, existingLoggedInUser.password);

        if (!isPasswordCorrect) {
            return NextResponse.json({
                message: 'Invalid email or password'
            }, { status: 401 });
        }


        // creating a session or token for the user can be done here if needed
        // this is token payload data that can be used to create a JWT or session
        const tokenData = {
            id : existingLoggedInUser._id,
            email : existingLoggedInUser.email,
            username : existingLoggedInUser.username
        }

        // creting token 
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: '1d' });

        // set this token in user's cookie or local storage on the client side for future authenticated requests
        const response = NextResponse.json({
            message: 'Login successful',
            user: existingLoggedInUser,
            success: true,
        }, { status: 200 });

        // set the token in the response header or cookie
        response.cookies.set('token', token, {
            httpOnly: true,
            maxAge: 60 * 60 * 24 // 1 day
        })

        return response;
    }
    catch (error: any) {
        return NextResponse.json({
            message: 'Error occurred while creating the user', error
        }, { status: 500 });
    }
} 
