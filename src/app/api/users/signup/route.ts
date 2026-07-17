import { connectToDatabase } from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import { NextResponse, NextRequest } from 'next/server';
import bcrypt from 'bcryptjs';

export async function POST(request: NextRequest) {
    try {
        // Connect to database inside the handler so it's properly awaited
        await connectToDatabase();

        const reqBody = await request.json();
        const { username, email, password } = reqBody;
        console.log('Request body:', reqBody);

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json({
                message: 'User already exists'
            }, { status: 400 });
        }

        // hash the password before saving it to the database using bcryptjs
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // create a new user instance
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        // save the new user to the database
        const savedUser = await newUser.save();
        console.log('Saved user:', savedUser);

        return NextResponse.json({
            message: 'User created successfully',
            user: savedUser,
            success: true,
        }, { status: 201 });

    } catch (error: any) {
        console.error('Error occurred while creating the user:', error);
        return NextResponse.json({
            message: 'Error occurred while creating the user',
            error: error.message,
        }, { status: 500 });
    }
}
