"use client";

import Image from "next/image";
import React from "react";
import { unlikeBlog } from "../blogs/actions";

export default function UnlikeBlog({ id }: { id: string }) {
    const onClick = async () => {
        await unlikeBlog(id);
    };
    return (
        <div className="flex items-center gap-2">
            <span>Unlike:</span>
            <button onClick={onClick}>
                <Image
                    src={"/assets/heart-fill.png"}
                    width={20}
                    height={20}
                    alt="unlike"
                />
            </button>
        </div>
    );
}
