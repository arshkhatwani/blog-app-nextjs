import { BlogComments } from "@prisma/client";

export interface BlogCommentWithUser extends BlogComments {
    user: {
        name: string;
    };
}
export default function BlogComment(blogComment: BlogCommentWithUser) {
    const { name: userName } = blogComment.user;
    const { body } = blogComment;
    return (
        <div className="py-2">
            <h1 className="font-bold">{userName}</h1>
            <h2>{body}</h2>
        </div>
    );
}
