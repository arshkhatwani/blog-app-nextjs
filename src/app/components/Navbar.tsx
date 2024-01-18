"use client";

import { useSession, signOut } from "next-auth/react";
import React from "react";
import Link from "next/link";

const navOptions = [
    { name: "Home", link: "/" },
    { name: "New Blog", link: "/blogs/new" },
    { name: "Your Blogs", link: "/blogs/mine" },
];

export default function Navbar() {
    const { data } = useSession();
    const user = data?.user;

    return (
        <div className="p-5 bg-slate-200 flex justify-between items-center">
            <div className="flex gap-5">
                {navOptions.map((item, idx) => (
                    <Link key={idx} href={item.link}>
                        <span className="text-lg duration-100 hover:text-xl hover:cursor-pointer">
                            {item.name}
                        </span>
                    </Link>
                ))}
            </div>

            <div>
                <span className="mr-5">{user?.name}</span>
                <button
                    onClick={() => signOut()}
                    className="px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                    Logout
                </button>
            </div>
        </div>
    );
}
