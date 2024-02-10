import { Blog, BlogComments } from "@prisma/client";
import BlogComment, { BlogCommentWithUser } from "./BlogComment";
import BlogCommentAdd from "./BlogCommentAdd";

interface Props {
    id: Blog["id"];
    blogComments: BlogCommentWithUser[];
}

export default function BlogCommentsView({ id, blogComments }: Props) {
    return (
        <div className="flex flex-col my-3 mt-6">
            <h1 className="text-3xl font-semibold">Comments</h1>

            {blogComments.map((comment) => (
                <BlogComment key={comment.id} {...comment} />
            ))}

            <BlogCommentAdd blogId={id} />
        </div>
    );
}
