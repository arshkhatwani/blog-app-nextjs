"use client";

import { useSession, signOut } from "next-auth/react";
import React from "react";

export default function Navbar() {
    const { data } = useSession();
    const user = data?.user;

    return (
        <div className="p-5 bg-slate-200 flex justify-end items-center">
            <span className="mr-5">{user?.name}</span>
            <button
                onClick={() => signOut()}
                className="px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                Logout
            </button>
        </div>
    );
}
