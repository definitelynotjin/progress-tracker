import Sidebar from '@/app/sidebar';
import Header from '@/app/components/team-management/Header';
import HeaderBar from '@/app/components/team-management/TeamHeaderBar';
import TeamManagement from '../components/team-management/Team-Management';

export default function TeamManagementPage() {
    return (
        <div className="relative bg-repeat-round min-h-screen ">
            <Sidebar className="sidebar" />
            <div className="content min-h-screen">
                <Header />
                <main className="p-10 bg-gray-900">
                    <HeaderBar />
                    <TeamManagement />
                </main>
            </div>
        </div>
    );
}
