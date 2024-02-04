import { getPublicBlogs } from "../blogs/actions";
import PublicBlogCard from "./PublicBlogCard";

export default async function PublicBlogs() {
    const blogs = await getPublicBlogs();

    return (
        <div>
            {blogs?.map((blog) => (
                <PublicBlogCard key={blog.id} {...blog} />
            ))}
        </div>
    );
}
