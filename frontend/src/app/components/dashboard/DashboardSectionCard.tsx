import React from 'react';

export function DashboardSectionCard({
	title,
	color,
	content,
}: {
	title: string;
	color: string;
	content: React.ReactNode;
}) {
	return (
		<div className="min-w-80 justify-center relative rounded-t-lg flex flex-col overflow-x-auto">
			<div className={`h-1 rounded-t-lg ${color}`} />
			<div className="bg-gray-700 rounded-b flex flex-col">
				<div className="py-4 px-4">
					<div className="flex items-center justify-between mb-4">
						<h2 className="font-bold text-center text-white text-lg tracking-wide drop-shadow mb-2">
							{title}
						</h2>
					</div>
				</div>
				<div className="px-4 flex flex-col gap-y-2 flex-1 min-h-0">
					<div className="p-4 space-y-2 text-left text-gray-300 text-base leading-relaxed">
						{content}
					</div>
				</div>
			</div>
		</div>
	);
}
