"use client";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@ui/components/ui/button";
import { signOut } from "next-auth/react";
import Link from "next/link";

export default function Dashboard(): JSX.Element {
  return (
    <main className={"bg-black w-full min-h-[100vh] p-24"}>
      dashboard
      {/* @ts-ignore */}
      <div className="flex gap-5 ">
        {/*  @ts-ignore */}
        <Button
          onClick={() => {
            signOut();
          }}
        >
          Sign out
        </Button>
        <Link href={"/home"}>home</Link>
        <Link href={"/settings"}>settings page</Link>
      </div>
    </main>
  );
}
