"use client";

import { BlockNoteEditor } from "@blocknote/core";
import { BlockNoteView, useBlockNote } from "@blocknote/react";
import "@blocknote/react/style.css";

interface Props {
    body: any;
}

export default function BlogEditorViewOnly({ body }: Props) {
    const editor: BlockNoteEditor | null = useBlockNote({
        initialContent: body,
        editable: false,
    });

    // Renders the editor instance using a React component.
    return <BlockNoteView editor={editor} theme={"light"} />;
}
