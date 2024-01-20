import { ServerSession } from "../../../services/auth/auth.service";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@ui/components/button";
import Sperate from "@/components/auth/Sperate";
import AuthForm from "@/components/auth/AuthForm";

export const metadata: Metadata = {
  title: "Login",
  description: "Login to your account",
};

export default async function Login(): Promise<JSX.Element> {
  const session = await ServerSession();

  if (session) {
    return redirect("/dashboard");
  }

  // const onSubmit = (data: any) => {
  //   // setLoading(true);
  //   signIn("credentials", { ...data, redirect: true }).then((callback) => {
  //     if (callback?.error) {
  //       // setMessage("Password wrong or the email doesn't exist");
  //       // setLoading(false);
  //     }
  //     if (callback?.ok && !callback?.error) {
  //       // setMessage("redirect...");
  //       // setTimeout(() => {
  //       //   window.location.href = "/";
  //       // }, 2000);
  //     }
  //   });
  // };

  return (
    <main className="bg-black w-full min-h-[100vh] p-5 flex justify-center items-center flex-col gap-5">
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
