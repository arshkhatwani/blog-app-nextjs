import { Blog } from "@prisma/client";
import BlogComment, { BlogCommentWithUser } from "./BlogComment";
import BlogCommentAdd from "./BlogCommentAdd";
import Divider from "./Divider";

interface Props {
    id: Blog["id"];
    blogComments: BlogCommentWithUser[];
}

export default function BlogCommentsView({ id, blogComments }: Props) {
    return (
        <div className="flex flex-col my-3 mt-6">
            <h1 className="text-3xl font-semibold">Comments</h1>

            {blogComments.map((comment, idx) => (
                <div key={comment.id}>
                    <BlogComment {...comment} />
                    {idx !== blogComments.length && <Divider />}
                </div>
            ))}

            <BlogCommentAdd blogId={id} />
        </div>
    );
}
