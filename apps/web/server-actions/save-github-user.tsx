"use server";

import { prisma } from "../lib/prisma";
import { nanoid } from "nanoid";
import { generatePassword } from "../lib/utils";

export const saveGithubUser = async (profile: any) => {
  const userObject = {
    userId: profile.id.toString(),
    name: profile.name,
    email: profile.email || `${nanoid()}@example.com`,
    image: profile.avatar_url,
    password: await generatePassword(),
  };
  try {
    if (profile) {
      const userExist = await prisma.user.findFirst({
        where: { userId: profile.id },
      });
      if (!userExist) {
        await prisma.user.create({ data: userObject });
      }
    }
  } catch (error: any) {
    console.error("Error saving GitHub user:", error);
  } finally {
    await prisma.$disconnect();
  }
};
