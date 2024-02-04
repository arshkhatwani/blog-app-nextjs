import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import Navbar from "./components/Navbar";
import { redirect } from "next/navigation";
import NEW_USER from "./constants/newUser";
import PublicBlogs from "./components/PublicBlogs";

export default async function Home() {
    const session = await getServerSession(authOptions);
    const user = session?.user;

    if (!session) {
        redirect("/api/auth/signin");
    }
    if (user?.name === NEW_USER) {
        console.log("New User encountered, redirecting to register");
        redirect("/register");
    }
    return (
        <>
            <Navbar />
            <div className="p-5">
                <PublicBlogs />
            </div>
        </>
    );
}
