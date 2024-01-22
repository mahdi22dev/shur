import { getServerSession } from "next-auth";
import { ServerSession, authOptions } from "../../services/auth/auth.service";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@ui/components/button";

export default async function Home(): Promise<JSX.Element> {
  const session = await getServerSession(authOptions);
  console.log(session);

  return (
    <main className={"bg-black w-full min-h-[100vh] p-5 "}>
      <nav className="flex gap-1 justify-between items-center">
        <div>logo</div>
        <div>links</div>
        <Link
          href={"/login"}
          className={cn(buttonVariants({ variant: "outline" }), "")}
        >
          <p className="cursor-pointer">sign in</p>
        </Link>
      </nav>
    </main>
  );
}
