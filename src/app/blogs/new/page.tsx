"use client";

import FloatingBtn from "@/app/components/FloatingBtn";
import dynamic from "next/dynamic";
import { useState } from "react";

const Editor = dynamic(() => import("../../components/BlogEditor"), {
    ssr: false,
});

export default function NewBlog() {
    const [blocks, setBlocks] = useState<any[]>([]);
    const [title, setTitle] = useState<string>("");
    const saveBlog = () => {
        
    };

    return (
        <div>
            <div className="font-bold p-4 pt-16 flex flex-col mx-auto xs-[96%] sm:w-[90%] md:w-[80%] xl:w-[60%]">
                <input
                    type="text"
                    placeholder="Title"
                    className="text-4xl focus:border-0 focus:outline-0 mb-10"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <Editor blocks={blocks} setBlocks={setBlocks} />
            </div>

            <FloatingBtn onClick={saveBlog} title="Save" />
        </div>
    );
}
