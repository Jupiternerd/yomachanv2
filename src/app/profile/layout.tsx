import { redirect } from "next/navigation";
import serverAuth from "../components/auth/ServerAuth";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await serverAuth();

  if (!session) return redirect("/api/auth/signin");
  else return <>{children}</>;
}