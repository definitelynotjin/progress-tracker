'use client';

import { format } from 'date-fns';
import 'tippy.js/dist/tippy.css';
import { useEffect } from 'react';
import { DashboardSectionCard } from './DashboardSectionCard';
import useDashboardStore from '../../stores/dashboardStore';

const dashboardSections = [
	{
		title: 'Overview',
		color: 'bg-blue-500',
		content: 'Project summary, stats, and quick links.',
	},
	{
		title: 'Recent Activity',
		color: 'bg-purple-500',
		content: 'Latest updates and changes.',
	},
	{ title: 'Team', color: 'bg-teal-500', content: 'Team members and roles.' },
	{
		title: 'Deadlines',
		color: 'bg-lime-500',
		content: 'Upcoming deadlines and milestones.',
	},
];

function formattedDate(dueDate: string) {
	if (!dueDate) return ' - ';
	const startDate = new Date(dueDate.slice(0, 10));
	const endDate = new Date(dueDate.slice(11));

	const formattedStart = format(startDate, 'd MMM');
	const formattedEnd = format(endDate, 'd MMM');

	return `${formattedStart} - ${formattedEnd}`;
}

export default function Dashboard() {
	const { tasks, loadTasks } = useDashboardStore();

	useEffect(() => {
		loadTasks();
	}, [loadTasks]);

	const allTasks = [
		...tasks.Backlog,
		...tasks['To Do'],
		...tasks['In Progress'],
		...tasks.Done,
	];
	console.log('whats in the dashboard ', allTasks);
	return (
		<div className="bg-gray-800 bg-repeat-round min-h-screen rounded-xl shadow-lg p-8">
			{/* Kanban Data Table */}
			<section className="mb-8">
				<h2 className="text-2xl font-extrabold text-white mb-4 tracking-wide drop-shadow rounded-xl ">
					Kanban Board Data
				</h2>
				<div className="overflow-x-auto">
					<table className="min-w-full bg-gradient-to-r from-gray-800 to-gray-700 rounded-lg shadow-lg">
						<thead>
							<tr className="rounded-xl bg-gray-800/80">
								<th className="px-4 py-3 rounded-t-xl   text-left text-lg font-semibold text-blue-300 tracking-wide">
									Title
								</th>
								<th className="px-4 py-3 text-left text-lg font-semibold text-purple-300 tracking-wide">
									Column
								</th>
								<th className="px-4 py-3 text-left text-lg font-semibold text-pink-300 tracking-wide">
									Priority
								</th>
								<th className="px-4 py-3 text-left text-lg font-semibold text-teal-300 tracking-wide">
									Assignee
								</th>
								<th className="px-4 py-3 text-left text-lg font-semibold text-lime-300 tracking-wide">
									Due Date
								</th>
							</tr>
						</thead>
						<tbody>
							{allTasks.length === 0 ? (
								<tr>
									<td
										colSpan={5}
										className="px-4 py-8 text-center text-gray-400 italic text-lg"
									>
										No tasks available.
									</td>
								</tr>
							) : (
								allTasks.map((task) => (
									<tr
										key={task.id}
										className="border-b border-gray-700 hover:bg-gray-700/40 transition"
									>
										<td className=" px-4 py-3 text-gray-100 font-medium text-base">
											{task.title}
										</td>
										<td className="px-4 py-3 text-purple-200 font-semibold text-base">
											{task.column}
										</td>
										<td className="px-4 py-3 text-pink-200 font-semibold text-base">
											{task.priority || (
												<span className="italic text-gray-400">Unassigned</span>
											)}
										</td>
										<td className="px-4 py-3 text-teal-200 font-semibold text-base">
											{task.assignee || (
												<span className="italic text-gray-400">Unassigned</span>
											)}
										</td>
										<td className="px-4 py-3 text-lime-200 font-semibold text-base">
											{formattedDate(task.dueDate)}
										</td>
									</tr>
								))
							)}
						</tbody>
					</table>
				</div>
			</section>
			{/* Existing dashboard sections */}
			<div className="flex flex-row gap-4 min-w-full overflow-x-auto">
				{dashboardSections.map((section) => (
					<DashboardSectionCard key={section.title} {...section} />
				))}
			</div>
		</div>
	);
}
