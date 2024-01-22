import { ServerSession } from "../../../services/auth/auth.service";
import AuthRegisterForm from "@/components/auth/AuthRegisterForm";
import { FaArrowLeftLong } from "react-icons/fa6";
import { buttonVariants } from "@ui/components/button";
import { redirect } from "next/navigation";
import { cn } from "@/lib/utils";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Create new account",
};

export default async function Register(): Promise<JSX.Element> {
  const session = await ServerSession();

  if (session) {
    return redirect("/dashboard");
  }

  return (
    <main className="bg-black w-full min-h-[100vh] p-5 flex justify-center items-center flex-col gap-5">
      <Link
        href={"/home"}
        className={cn(
          buttonVariants({ variant: "outline" }),
          "absolute top-6 left-6 flex gap-2"
        )}
      >
        <FaArrowLeftLong className="cursor-pointer" />
        <p className="cursor-pointer">Home</p>
      </Link>

      <div className="flex flex-col space-y-2 text-center">
        icon
        <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
        <p className="text-sm text-gray-200 text-opacity-80">
          Enter your email to sign in to your account
        </p>
      </div>

      <AuthRegisterForm />
      <p className="px-8 text-center text-sm text-gray-200 text-opacity-80">
        <Link href="/register">Don&apos;t have an account? Sign Up</Link>
      </p>
    </main>
  );
}
