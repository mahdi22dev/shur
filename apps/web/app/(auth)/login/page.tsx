import { ServerSession } from "../../../services/auth/auth.service";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { FaArrowLeftLong } from "react-icons/fa6";
import AuthForm from "@/components/auth/AuthForm";
import { buttonVariants } from "@ui/components/button";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Login",
  description: "Login to your account",
};

export default async function Login(): Promise<JSX.Element> {
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

      <AuthForm />
      <p className="px-8 text-center text-sm text-gray-200 text-opacity-80">
        <Link href="/register">Don&apos;t have an account? Sign Up</Link>
      </p>
    </main>
  );
}
