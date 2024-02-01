import BlogCard from "@/app/components/BlogCard";
import { getUserBlogs } from "../actions";

export default async function MineBlogs() {
    const blogs = await getUserBlogs();

    return (
        <div className="flex flex-col px-10 py-4 gap-5">
            {blogs?.map((blog) => (
                <BlogCard key={blog.id} {...blog} />
            ))}
        </div>
    );
}
