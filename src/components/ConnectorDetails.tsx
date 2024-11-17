"use client"

import { useEffect, useState } from 'react';
import { Connector } from '../types';
import ConnectorOffsets from "./ConnectorOffsets";
import TasksTable from "./TasksTable";

interface ConnectorDetailsProps {
    connector: Connector | null;
    clusterUrl: string;
}

export default function ConnectorDetails({ connector, clusterUrl }: ConnectorDetailsProps) {
    const [offsets, setOffsets] = useState<any>(null);
    const [offsetsError, setOffsetsError] = useState<string | null>(null);

    useEffect(() => {
        const fetchOffsets = async () => {
            if (!connector) return;

            try {
                const offsetsUrl = `${clusterUrl}/connectors/${connector.name}/offsets`;
                const response = await fetch(`/api/proxy?url=${encodeURIComponent(offsetsUrl)}`);

                if (!response.ok) {
                    throw new Error("Failed to fetch offsets");
                }

                const data = await response.json();
                setOffsets(data);
            } catch (error) {
                console.error("Error fetching offsets:", error);
                setOffsetsError(error instanceof Error ? error.message : "Failed to fetch offsets");
            }
        };

        fetchOffsets();
    }, [connector, clusterUrl]);

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

                {offsetsError ? (
                    <div className="text-red-500 mb-4">
                        Error loading offsets: {offsetsError}
                    </div>
                ) : (
                    <div className="mb-4">
                        <ConnectorOffsets offsets={offsets} />
                    </div>
                )}

                <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Configuration</h3>
                    <pre className="rounded-xl bg-muted p-4 overflow-auto max-h-[200px] font-extralight text-sm border-zinc-200 border-2">
                        {JSON.stringify(connector.config, null, 2)}
                    </pre>
                </div>
            </div>
        </div>
    );
}