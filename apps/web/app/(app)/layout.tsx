import { Metadata } from "next";
import "../../styles/globals.css";

export const metadata: Metadata = {
  title: "dashboard",
  description: "user dashboard",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="flex justify-between bg-gray-800 p-5">
        <p>links</p>
        <p>anylitics</p>
        <p>settings</p>
      </div>
      {children}
    </section>
  );
}
