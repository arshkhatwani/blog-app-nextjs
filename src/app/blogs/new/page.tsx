"use client";

import dynamic from "next/dynamic";
import { useState } from "react";

const Editor = dynamic(() => import("../../components/BlogEditor"), {
    ssr: false,
});

export default function NewBlog() {
    const [blocks, setBlocks] = useState<any[]>([]);

    return (
        <div>
            <div className="font-bold p-4 pt-16 flex flex-col mx-auto xs-[96%] sm:w-[90%] md:w-[80%] xl:w-[60%]">
                <input
                    type="text"
                    placeholder="Title"
                    className="text-4xl focus:border-0 focus:outline-0 mb-10"
                />
                <Editor blocks={blocks} setBlocks={setBlocks} />
            </div>
        </div>
    );
}
