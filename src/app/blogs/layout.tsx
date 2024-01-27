import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Navbar from "@/app/components/Navbar";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function layout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await getServerSession(authOptions);
    const user = session?.user;

    if (!session) {
        redirect("/api/auth/signin");
    }
    return (
        <div>
            <Navbar />
            {children}
        </div>
    );
}
