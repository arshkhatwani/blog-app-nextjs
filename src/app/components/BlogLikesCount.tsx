import { BlogLikes } from "@prisma/client";
import Image from "next/image";

interface Props {
    blogLikes: BlogLikes[];
}

export default function BlogLikesCount({ blogLikes }: Props) {
    if (!blogLikes.length) return <></>;
    return (
        <div className="flex items-center gap-2">
            <Image
                src={"/assets/heart-fill.png"}
                height={20}
                width={20}
                alt="likes"
            />
            <span>{blogLikes.length}</span>
        </div>
    );
}
