"use server";
import prisma from "@/db";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

const registerUser = async (formData: FormData) => {
    try {
        const session = await getServerSession();
        const email = session?.user?.email;
        const name = formData.get("name")?.toString().trim();

        if (!name) {
            console.log("No name");
            throw new Error("Not a valid user name");
        }
        if (!email) {
            console.log("No email found");
            throw new Error("No email found");
        }
        const result = await prisma.user.update({
            data: {
                name,
            },
            where: {
                email,
            },
        });
        return {
            status: "success",
            name: result.name,
        };
    } catch (error: any) {
        return { error: error.toString() };
    }
};

export default registerUser;
