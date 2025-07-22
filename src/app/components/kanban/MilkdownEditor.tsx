
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';


export default function MilkdownEditor({ value, onChange }: { value?: string; onChange?: (markdown: string) => void }) {
    const editor = useEditor({
        extensions: [StarterKit],
        content: value || '',
        onUpdate: ({ editor }) => {
            if (onChange) onChange(editor.getHTML());
        },
        immediatelyRender: false,
    });

    return (
        <div style={{ minHeight: 200, background: 'gray-200', borderRadius: 8, padding: 12 }}>
            <EditorContent editor={editor} />
        </div>
    );
}
