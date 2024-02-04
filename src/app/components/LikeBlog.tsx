"use client";

import Image from "next/image";
import React from "react";
import { likeBlog } from "../blogs/actions";

export default function LikeBlog({ id }: { id: string }) {
    const onClick = async () => {
        await likeBlog(id);
    };
    return (
        <div className="flex items-center gap-2">
            <span>Like:</span>
            <button onClick={onClick}>
                <Image
                    src={"/assets/heart-empty.png"}
                    width={20}
                    height={20}
                    alt="like"
                />
            </button>
        </div>
    );
}
