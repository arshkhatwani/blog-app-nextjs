import dynamic from "next/dynamic";
import { getBlogById } from "../actions";
import { notFound } from "next/navigation";

const Editor = dynamic(() => import("../../components/BlogEditorViewOnly"), {
    ssr: false,
});

export default async function Page({ params }: { params: { id: string } }) {
    const { id } = params;
    const blog = await getBlogById(id);

    if (!blog) {
        notFound();
    }

    return (
        <div>
            <div className="font-bold p-4 pt-16 flex flex-col mx-auto xs-[96%] sm:w-[90%] md:w-[80%] xl:w-[60%]">
                <input
                    type="text"
                    placeholder="Title"
                    className="text-4xl focus:border-0 focus:outline-0 mb-10"
                    value={blog?.title}
                    readOnly
                />
                <Editor body={blog?.body} />
            </div>
        </div>
    );
}
