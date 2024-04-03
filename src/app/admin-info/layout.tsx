import { Metadata } from "next";

// either Static metadata
export const metadata: Metadata = {
  title: "Admin | Ton ID",
  description: "View all user information and analytics",
};

export default function AdminInfoLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return ( <>{children}</>);
}
