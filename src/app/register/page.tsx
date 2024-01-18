"use client";

import { useState } from "react";
import registerUser from "./registerUser";
import ErrorToast from "../components/ErrorToast";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import { primaryBtn } from "../constants/uiClasses";

export default function Register() {
    const [error, setError] = useState<string>("");
    const { data: session, update } = useSession();

    const onSubmit = async (formData: FormData) => {
        setError("");
        const result = await registerUser(formData);
        if (result.error) {
            setError(result.error);
            return;
        }
        await update({
            ...session,
            user: {
                ...session?.user,
                name: result.name,
            },
        });
        redirect("/");
    };
    return (
        <div className="min-h-screen flex flex-col justify-center items-center">
            <form action={onSubmit} className="flex flex-col justify-center">
                <h1 className="text-3xl mb-4 text-center">Enter your name</h1>
                <input
                    type="text"
                    name="name"
                    id="name"
                    className="border-2 border-black w-full text-2xl mb-4 p-1.5 rounded-lg"
                    required
                />

                <input type="submit" value="Submit" className={primaryBtn} />
            </form>

            {error && <ErrorToast message={error} />}
        </div>
    );
}
