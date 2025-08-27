'use client';

// import dynamic from 'next/dynamic';
import Header from '@/app/components/kanban/Header';
import KanbanHeaderBar from '@/app/components/kanban/KanbanHeaderBar';
import Sidebar from '@/app/sidebar';
import KanbanBoard from '../components/kanban/KanbanBoard';

export default function KanbanPage() {
	return (
		<div className="bg-repeat-round min-h-screen relative">
			<Sidebar className="sidebar" />
			<div className="content min-h-screen">
				<Header />
				<main className="p-10 bg-gray-900">
					<KanbanHeaderBar />
					<KanbanBoard />
				</main>
			</div>
		</div>
	);
}
