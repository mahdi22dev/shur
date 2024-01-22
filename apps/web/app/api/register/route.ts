import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req) {
  const data = await req.json();
  const { name, email, password } = data.data;

  if (!name || !email || !password) {
    return NextResponse.json(
      { message: "Correct the required data" },
      { status: 400 }
    );
  }
  const existingUser = await prisma.user.findUnique({
    where: { email: data.data.email },
  });

  if (existingUser) {
    return NextResponse.json(
      { message: "This email already exist" },
      { status: 409 }
    );
  }
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const newUser = await prisma.user.create({
      //@ts-ignore
      data: {
        name: name,
        email: email,
        password: hashedPassword,
      },
    });

    return NextResponse.json(
      { message: "User Saved", newUser },
      { status: 200 }
    );
  } catch (error) {
    console.log(error.message);
    return NextResponse.json({ message: "Error saving user" }, { status: 400 });
  } finally {
    await prisma.$disconnect();
  }
}
