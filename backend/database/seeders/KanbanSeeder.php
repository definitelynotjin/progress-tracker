<?php

namespace Database\Seeders;


use Illuminate\Database\Seeder;
use App\Models\Task;
use App\Models\BoardColumn;

class KanbanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        $backlog = BoardColumn::create(['name' => 'Backlog', 'order' => 0]);
        $todo = BoardColumn::create(['name' => 'To Do', 'order' => 1]);
        $progress = BoardColumn::create(['name' => 'In Progress', 'order' => 2]);
        $done = BoardColumn::create(['name' => 'Done', 'order' => 3]);

        Task::create([
            'title' => 'Survey network topology',
            'content' => '
                <ul>
                    <li>Document the current network layout</li>
                    <li>Identify all connected devices</li>
                    <li>Checking the caches</li>
                </ul>',
            'board_column_id' => $backlog->id,
            'priority' => 'Low',
            'assignee' => 'Ali',
            'due_date' => json_encode(['from' => '2025-08-01', 'to' => '2025-08-03']),
            'order' => 0,
        ]);

        Task::create([
            'title' => 'Plan IP address allocation',
            'content' => '
                <ul>
                    <li>Design an efficient IP addressing scheme</li>
                    <li>Plan for new subnets</li>
                </ul>',
            'board_column_id' => $backlog->id,
            'priority' => 'Medium',
            'assignee' => 'Burhan',
            'due_date' => json_encode(['from' => '2025-08-04', 'to' => '2025-08-07']),
            'order' => 1,
        ]);

        Task::create([
            'title' => 'Configure VLANs on switches',
            'content' => '
                <ul>
                    <li>Set up VLANs for department separation</li>
                    <li>Improve network security</li>
                </ul>',
            'board_column_id' => $todo->id,
            'priority' => 'High',
            'assignee' => 'Coki',
            'due_date' => json_encode(['from' => '2025-08-08', 'to' => '2025-08-10']),
            'order' => 0,
        ]);

        Task::create([
            'title' => 'Install network monitoring tools',
            'content' => '
                <ul>
                    <li>Deploy Zabbix or Nagios</li>
                    <li>Monitor network health</li>
                </ul>',
            'board_column_id' => $todo->id,
            'priority' => 'Medium',
            'assignee' => 'Dennis',
            'due_date' => json_encode(['from' => '2025-08-11', 'to' => '2025-08-13']),
            'order' => 1,
        ]);

        Task::create([
            'title' => 'Troubleshoot connectivity issues',
            'content' => '
                <ul>
                    <li>Investigate intermittent connection drops</li>
                    <li>Resolve office connectivity problems</li>
                </ul>',
            'board_column_id' => $progress->id,
            'priority' => 'High',
            'assignee' => 'Erfan',
            'due_date' => json_encode(['from' => '2025-08-14', 'to' => '2025-08-16']),
            'order' => 0,
        ]);

        Task::create([
            'title' => 'Upgrade router firmware',
            'content' => '
                <ul>
                    <li>Update firmware on all core routers</li>
                    <li>Verify successful upgrade</li>
                </ul>',
            'board_column_id' => $done->id,
            'priority' => 'Low',
            'assignee' => 'Frank',
            'due_date' => json_encode(['from' => '2025-08-17', 'to' => '2025-08-18']),
            'order' => 0,
        ]);
    }
}
