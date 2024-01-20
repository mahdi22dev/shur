import { getServerSession } from "next-auth";
import { ServerSession, authOptions } from "../../services/auth/auth.service";

export default async function Home(): Promise<JSX.Element> {
  const session = await getServerSession(authOptions);
  console.log(session);

  return (
    <main className={"bg-black w-full min-h-[100vh] p-24 "}>
      log in with github
      {session?.user?.name}
    </main>
  );
}
