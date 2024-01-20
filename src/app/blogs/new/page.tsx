export default function NewBlog() {
    return (
        <div className="font-bold p-4 pt-16 flex flex-col min-h-screen mx-auto xs-[96%] sm:w-[90%] md:w-[80%] xl:w-[60%]">
            <input
                type="text"
                placeholder="Title"
                className="text-4xl focus:border-0 focus:outline-0"
            />
        </div>
    );
}
