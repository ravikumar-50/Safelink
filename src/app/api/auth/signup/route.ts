import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }

    await dbConnect();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: "Identity already registered" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return NextResponse.json({ message: "Operator registered successfully", user: { name: newUser.name, email: newUser.email } }, { status: 201 });
  } catch (error: any) {
    console.error("SIGNUP_ERROR:", error);
    
    if (error.message && error.message.includes("ECONNREFUSED")) {
      return NextResponse.json({ 
        message: "Database connection refused. Check your MONGODB_URI and Password." 
      }, { status: 500 });
    }
    
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
