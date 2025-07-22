import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import BulletList from '@tiptap/extension-bullet-list';
import ListItem from '@tiptap/extension-list-item';
import OrderedList from '@tiptap/extension-ordered-list';

export default function TiptapEditor({ value, onChange }: { value?: string; onChange?: (markdown: string) => void }) {
    const editor = useEditor({
        extensions: [StarterKit, BulletList, OrderedList, ListItem],
        content: value || '',
        onUpdate: ({ editor }) => {
            if (onChange) onChange(editor.getHTML());
        },
        immediatelyRender: false,
    });

    return (
        <div className="min-h-[200px] bg-gray-700 rounded-lg p-3 text-gray-100">
            <EditorContent editor={editor} />
        </div>
    );
}
