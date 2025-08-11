import Dashboard from '@/app/components/dashboard/Dashboard';
import Header from '@/app/components/dashboard/Header';
import Sidebar from '@/app/sidebar';
import DashboardHeaderBar from '../components/dashboard/DashboardHeaderBar';
import { fetchKanbanData } from '../api/kanbanApi';

export default async function DashboardPage() {
  let kanbanData;

  try {
    kanbanData = await fetchKanbanData();
  } catch (error) {
    kanbanData = {
      Backlog: [],
      'To Do': [],
      'In Progress': [],
      Done: [],
    };
  }

  return (
    <div className="relative bg-repeat-round min-h-screen ">
      <Sidebar className="sidebar" />
      <div className="content min-h-screen">
        <Header />
        <main className="p-10 bg-gray-900">
          <DashboardHeaderBar />
          // <Dashboard initialTasks={kanbanData} />
        </main>
      </div>
    </div>
  );
}
