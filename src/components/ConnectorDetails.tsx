"use client"

import { Connector } from '../types';
import TasksTable from "./TasksTable";

interface ConnectorDetailsProps {
    connector: Connector | null;
}

export default function ConnectorDetails({ connector }: ConnectorDetailsProps) {
    if (!connector) return (
        <div className="flex h-full items-center justify-center text-muted-foreground">
            Select a connector to view details
        </div>
    );

    return (
        <div className="space-y-6">
            <div>
                <div className='mb-4'>
                    <h2 className="text-2xl font-bold tracking-tight">{connector.name}</h2>
                    <p className="text-muted-foreground">
                        <code className="relative rounded px-[0.3rem] py-[0.2rem] text-xs break-words">
                            {connector.config["connector.class"]}
                        </code>
                    </p>
                </div>
                <div className="mb-4">
                    <h3 className="text-lg font-semibold mb-4">Tasks</h3>
                    <TasksTable tasks={connector.tasks} />
                </div>

                <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Configuration</h3>
                    <pre className="rounded-xl bg-muted p-4 overflow-auto max-h-[200px] font-extralight text-sm border-zinc-200 border-2">
                        {JSON.stringify(connector.config, null, 2)}
                    </pre>
                </div>
            </div>
        </div>
    );
};