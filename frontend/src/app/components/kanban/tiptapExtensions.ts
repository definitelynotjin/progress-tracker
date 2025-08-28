import StarterKit from '@tiptap/starter-kit';
import BulletList from '@tiptap/extension-bullet-list';
import ListItem from '@tiptap/extension-list-item';
import OrderedList from '@tiptap/extension-ordered-list';

export const tiptapExtensions = [
	StarterKit.configure({
		bulletList: false,
		orderedList: false,
		listItem: false,
	}),
	BulletList.extend({
		addInputRules() {
			return [];
		},
	}),
	OrderedList,
	ListItem.extend({
		addInputRules() {
			return [];
		},
	}),
];
