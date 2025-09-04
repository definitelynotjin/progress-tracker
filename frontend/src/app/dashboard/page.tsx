import Dashboard from '@/app/components/dashboard/Dashboard';
import Header from '@/app/components/dashboard/Header';
import Sidebar from '@/app/sidebar';
import DashboardHeaderBar from '../components/dashboard/DashboardHeaderBar';
// import { DashboardSectionCard } from '../components/dashboard/DashboardSectionCard';

export default async function DashboardPage() {
	return (
		<div className="relative bg-repeat-round min-h-screen ">
			<Sidebar className="sidebar" />
			<div className="content min-h-screen">
				<Header />
				<main className="p-10 bg-gray-900">
					<DashboardHeaderBar />
					<Dashboard />
				</main>
			</div>
		</div>
	);
}
