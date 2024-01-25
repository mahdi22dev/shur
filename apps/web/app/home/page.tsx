import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@ui/components/button";
import Navbar from "@/components/header/Navbar";

export default async function Home(): Promise<JSX.Element> {
  return (
    <main className={"bg-black w-full min-h-[100vh] p-5 "}>
      <div className="flex gap-1 justify-between items-center max-w-5xl mx-auto">
        <div>logo</div>
        <Navbar />
        <Link
          href={"/login"}
          className={cn(buttonVariants({ variant: "outline" }), "")}
        >
          <p className="cursor-pointer">sign in</p>
        </Link>
      </div>
    </main>
  );
}
