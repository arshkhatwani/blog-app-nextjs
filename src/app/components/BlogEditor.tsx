"use client";

import {
    BlockNoteEditor,
    uploadToTmpFilesDotOrg_DEV_ONLY,
} from "@blocknote/core";
import { BlockNoteView, useBlockNote } from "@blocknote/react";
import "@blocknote/react/style.css";
import { Dispatch, SetStateAction } from "react";

interface Props {
    blocks: any[];
    setBlocks: Dispatch<SetStateAction<any[]>>;
    initialContent?: any | undefined;
}

export default function BlogEditor({
    initialContent,
    blocks,
    setBlocks,
}: Props) {
    const editor: BlockNoteEditor | null = useBlockNote({
        onEditorContentChange: (editor) => {
            setBlocks(editor.topLevelBlocks);
        },
        uploadFile: uploadToTmpFilesDotOrg_DEV_ONLY,
        initialContent,
    });

    // Renders the editor instance using a React component.
    return <BlockNoteView editor={editor} theme={"light"} />;
}
