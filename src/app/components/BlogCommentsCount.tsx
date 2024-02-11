import Image from "next/image";

interface Props {
    blogComments: number;
}

export default function BlogCommentsCount({ blogComments }: Props) {
    if (!blogComments) return <></>;
    return (
        <div className="flex items-center gap-2">
            <Image
                src={"/assets/comment.png"}
                height={20}
                width={20}
                alt="likes"
            />
            <span>{blogComments}</span>
        </div>
    );
}
