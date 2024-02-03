import React from "react";
import Link from "next/link";
import { toggleLink } from "../constants/uiClasses";

export default function ToggleBlogs({ type }: { type: string | undefined }) {
    return (
        <div className="flex justify-end">
            {type === "deleted" ? (
                <Link
                    className={toggleLink + " text-blue-800"}
                    href="/blogs/mine">
                    View undeleted blogs
                </Link>
            ) : (
                <Link
                    className={toggleLink + " text-red-800"}
                    href="/blogs/mine?type=deleted">
                    View deleted blogs
                </Link>
            )}
        </div>
    );
}
