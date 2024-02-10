import { notFound } from "next/navigation";
import { getBlogById } from "../../actions";
import BlogEditPage from "./BlogEditPage";

export default async function Page({ params }: { params: { id: string } }) {
    const { id } = params;
    const blog = await getBlogById(id);
    if (!blog) {
        notFound();
    }

    return <BlogEditPage {...blog} />;
}
