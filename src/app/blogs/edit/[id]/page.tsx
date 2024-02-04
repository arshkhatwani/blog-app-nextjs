"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { getBlogById, updateBlog } from "../../actions";
import FloatingBtn from "@/app/components/FloatingBtn";
import ErrorToast from "@/app/components/ErrorToast";
import { Blog } from "@prisma/client";

const Editor = dynamic(() => import("../../../components/BlogEditor"), {
    ssr: false,
});

export default function Page({ params }: { params: { id: string } }) {
    const router = useRouter();
    const [blog, setBlog] = useState<Blog>();
    const [title, setTitle] = useState<string>("");
    const [blocks, setBlocks] = useState<any[]>([]);
    const [error, setError] = useState<string>("");
    const { id } = params;

    useEffect(() => {
        getBlogById(id).then((blog) => {
            if (blog) setBlog(blog);
            else {
                router.push("/not-found");
                return;
            }

            setTitle(blog.title);
        });
    }, []);

    const editBlog = async () => {
        try {
            if (!blog?.id) return;
            setError("");
            const data = {
                id: blog.id,
                title: title.trim(),
                body: blocks,
            };
            if (data.title === "") {
                setError("Please enter a valid title");
                return;
            }
            const updatedBlog = await updateBlog(data);
            // console.log("updated blog", updatedBlog);
            router.replace(`/blogs/${blog.id}`);
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
                    className="text-4xl focus:border-0 focus:outline-0 mb-10"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <Editor
                    initialContent={blog?.body}
                    blocks={blocks}
                    setBlocks={setBlocks}
                />
            </div>

            <FloatingBtn onClick={editBlog} title="Update" />
        </div>
    );
}
