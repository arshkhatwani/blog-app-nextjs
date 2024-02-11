"use client";

import ErrorToast from "@/app/components/ErrorToast";
import FloatingBtn from "@/app/components/FloatingBtn";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createBlog } from "../actions";
import { titleInput } from "@/app/constants/uiClasses";

const Editor = dynamic(() => import("../../components/BlogEditor"), {
    ssr: false,
});

export default function NewBlog() {
    const [blocks, setBlocks] = useState<any[]>([]);
    const [title, setTitle] = useState<string>("");
    const [error, setError] = useState<string>("");
    const router = useRouter();

    const saveBlog = async () => {
        try {
            setError("");
            const data = {
                title: title.trim(),
                body: blocks,
            };
            if (data.title === "") {
                setError("Please enter a valid title");
                return;
            }
            const blog = await createBlog(data);
            // console.log("created blog", blog);
            router.replace("/");
        } catch (err) {
            console.log(err);
            setError("Could not create blog, please try later.");
        }
    };

    return (
        <div>
            {error && (
                <div className="px-10">
                    <ErrorToast message={error} />
                </div>
            )}

            <div className="font-bold p-4 pt-16 flex flex-col mx-auto xs-[96%] sm:w-[90%] md:w-[80%] xl:w-[60%]">
                <input
                    type="text"
                    placeholder="Title"
                    className={titleInput}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <Editor blocks={blocks} setBlocks={setBlocks} />
            </div>

            <FloatingBtn onClick={saveBlog} title="Save" />
        </div>
    );
}
