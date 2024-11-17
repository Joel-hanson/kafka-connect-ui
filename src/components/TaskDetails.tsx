"use client"

import { Badge } from "@/components/ui/badge"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Terminal } from "lucide-react"
import { ConnectorTask } from '../types'

interface TaskDetailsProps {
    task: ConnectorTask | null;
    open: boolean;
    onClose: () => void;
}

export default function TaskDetails({ task, open, onClose }: TaskDetailsProps) {
    if (!task) return null;

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[625px]">
                <DialogHeader>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Terminal className="h-5 w-5" />
                            <DialogTitle>Task Details</DialogTitle>
                        </div>
                        {/* <Badge
                            variant={task.state === "RUNNING" ? "default" : "destructive"}
                            className="whitespace-nowrap uppercase text-zinc-100"
                        >
                            {task.state}
                        </Badge> */}
                    </div>
                    <DialogDescription className="mt-2">
                        Detailed information for task ID: {task.id}
                    </DialogDescription>
                </DialogHeader>

                <div className="grid gap-6">
                    <div className="grid gap-4">
                        <div className="space-y-2">
                            <h4 className="text-sm font-medium leading-none">Status</h4>
                            <Badge
                                variant={task.state === "RUNNING" ? "default" : "destructive"}
                                className="whitespace-nowrap uppercase text-zinc-100"
                            >
                                {task.state}
                            </Badge>
                        </div>

                        <div className="space-y-2">
                            <h4 className="text-sm font-medium leading-none">Worker ID</h4>
                            <div className="rounded-md bg-muted p-2">
                                <code className="text-sm font-mono">
                                    {task.worker_id}
                                </code>
                            </div>
                        </div>

                        {task.trace && (
                            <div className="space-y-2">
                                <h4 className="text-sm font-medium leading-none">Trace</h4>
                                <ScrollArea className="h-[200px] w-full rounded-md border">
                                    <div className="p-4">
                                        <pre className="text-sm font-mono whitespace-pre-wrap break-all">
                                            {task.trace}
                                        </pre>
                                    </div>
                                </ScrollArea>
                            </div>
                        )}

                        {task.config && (
                            <div className="space-y-2">
                                <h4 className="text-sm font-medium leading-none">Configuration</h4>
                                <ScrollArea className="h-[200px] w-full rounded-md border bg-muted border-zinc-200">
                                    <div className="p-4">
                                        <pre className="text-sm font-extralight whitespace-pre-wrap break-all">
                                            {JSON.stringify(task.config, null, 2)}
                                        </pre>
                                    </div>
                                </ScrollArea>
                            </div>
                        )}
                    </div>
                </div>

                <DialogFooter className="sm:justify-start">
                    <div className="text-sm text-muted-foreground">
                        Last updated: {new Date().toLocaleString()}
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}