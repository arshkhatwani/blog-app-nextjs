import dynamic from "next/dynamic";
import { getBlogByIdWithComments } from "../actions";
import { notFound } from "next/navigation";
import LikeBlog from "@/app/components/LikeBlog";
import getUserDetails from "@/app/utils/getUserDetails";
import UnlikeBlog from "@/app/components/UnlikeBlog";
import BlogCommentsView from "@/app/components/BlogCommentsView";
import { titleInput } from "@/app/constants/uiClasses";

const Editor = dynamic(() => import("../../components/BlogEditorViewOnly"), {
    ssr: false,
});

export default async function Page({ params }: { params: { id: string } }) {
    const { id } = params;
    const blog = await getBlogByIdWithComments(id);
    const user = await getUserDetails();
    const hasUserLiked =
        blog?.BlogLikes.find((like) => like.userId === user?.id) != undefined;

    if (!blog) {
        notFound();
    }

    return (
        <div>
            <div className="p-4 pt-16 flex flex-col mx-auto xs-[96%] sm:w-[90%] md:w-[80%] xl:w-[60%]">
                <input
                    type="text"
                    placeholder="Title"
                    className={titleInput}
                    value={blog?.title}
                    readOnly
                />
                <Editor body={blog?.body} />

                {hasUserLiked ? (
                    <UnlikeBlog id={blog.id} />
                ) : (
                    <LikeBlog id={blog.id} />
                )}

                <BlogCommentsView
                    id={blog.id}
                    blogComments={blog.BlogComments}
                />
            </div>
        </div>
    );
}
