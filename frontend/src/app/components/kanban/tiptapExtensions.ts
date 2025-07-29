import StarterKit from '@tiptap/starter-kit';
import BulletList from '@tiptap/extension-bullet-list';
import ListItem from '@tiptap/extension-list-item';

export const tiptapExtensions = [
    StarterKit.configure({
        bulletList: false,
        listItem: false,
    }),
    BulletList,
    ListItem,
];
