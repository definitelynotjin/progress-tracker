'use client';

import React from 'react';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { ListNode, ListItemNode } from '@lexical/list';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';

export default function LexicalBulletEditor({ value, onChange }) {
	const initialConfig = {
		namespace: 'LexicalBulletEditor',
		theme: {
			paragraph: 'text-white p-2',
			list: 'list-none',
			listitem: 'my-1',
		},
		nodes: [ListNode, ListItemNode],
		onError(error: Error) {
			console.error(error);
		},
	};

	return (
		<LexicalComposer initialConfig={initialConfig}>
			<div className="prose min-h-[300px] p-4 bg-gray-600 rounded-md">
				<RichTextPlugin
					contentEditable={<ContentEditable className="w-full outline-none" />}
					placeholder={<div className="text-gray-400">Type here...</div>}
					ErrorBoundary={LexicalErrorBoundary}
				/>
				<ListPlugin />
				<OnChangePlugin
					onChange={(editorState) => {
						editorState.read(() => {
							onChange(editorState.toJSON());
						});
					}}
				/>
			</div>
		</LexicalComposer>
	);
}
