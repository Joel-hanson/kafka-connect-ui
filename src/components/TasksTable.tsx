"use client"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import { useState } from 'react';
import { ConnectorTask } from '../types';
import TaskDetails from './TaskDetails';
import { Badge } from "./ui/badge";

interface TasksTableProps {
    tasks: ConnectorTask[];
}

export default function TasksTable({ tasks }: TasksTableProps) {
    const [selectedTask, setSelectedTask] = useState<ConnectorTask | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleRowClick = (task: ConnectorTask) => {
        setSelectedTask(task);
        setIsDialogOpen(true);
    };

    return (
        <div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Task ID</TableHead>
                        <TableHead>State</TableHead>
                        <TableHead>Worker ID</TableHead>
                        <TableHead>Trace</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {tasks?.map((task, index) => (
                        <TableRow
                            key={index}
                            className="cursor-pointer hover:bg-muted/50"
                            onClick={() => handleRowClick(task)}
                        >
                            <TableCell className="font-medium">{task.id}</TableCell>
                            <TableCell>
                                <Badge
                                    variant={task.state === "RUNNING" ? "default" : "destructive"}
                                    className="whitespace-nowrap uppercase text-zinc-100"
                                >
                                    {task.state}
                                </Badge>
                            </TableCell>
                            <TableCell className="font-mono text-sm">
                                <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
                                    {task.worker_id}
                                </code>
                            </TableCell>
                            <TableCell>
                                {task.trace && (
                                    <pre className="max-h-20 overflow-auto rounded bg-muted p-2 text-xs">
                                        {task.trace}
                                    </pre>
                                )}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <TaskDetails
                task={selectedTask}
                open={isDialogOpen}
                onClose={() => {
                    setIsDialogOpen(false);
                    setSelectedTask(null);
                }}
            />
        </div>
    );
}