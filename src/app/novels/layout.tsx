import { redirect } from "next/navigation";
export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {

return <>{children}</>;
}