"use client"

import ConnectorDetails from "@/components/ConnectorDetails";
import ConnectorListItem from "@/components/ConnectorListItem";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Connector } from "@/types";
import { LoaderPinwheel } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from 'react';

export default function ClusterConnectorsPage() {
    const { name }: { "name": string } = useParams();
    const [cluster, setCluster] = useState<Cluster>();
    const [connectors, setConnectors] = useState<Connector[]>([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null)
    const [selectedConnector, setSelectedConnector] = useState<Connector | null>(null);

    const fetchConnectorDetails = async (connectorName: string, clusterUrl: string) => {
        const detailsUrl = `${clusterUrl}/connectors/${connectorName}`;
        const statusUrl = `${clusterUrl}/connectors/${connectorName}/status`;
        const tasksUrl = `${clusterUrl}/connectors/${connectorName}/tasks`;

        const [detailsResponse, statusResponse, tasksResponse] = await Promise.all([
            fetch(`/api/proxy?url=${encodeURIComponent(detailsUrl)}`),
            fetch(`/api/proxy?url=${encodeURIComponent(statusUrl)}`),
            fetch(`/api/proxy?url=${encodeURIComponent(tasksUrl)}`)
        ]);

        // {
        //     "name": "file-source",
        //     "config": {
        //       "connector.class": "org.apache.kafka.connect.file.FileStreamSourceConnector",
        //       "file": "/data/source.txt",
        //       "name": "file-source",
        //       "topic": "file-topic"
        //     },
        //     "tasks": [
        //       {
        //         "connector": "file-source",
        //         "task": 0
        //       }
        //     ],
        //     "type": "source"
        //   }
        const details = await detailsResponse.json();
        // {
        //     "name": "file-source",
        //     "connector": {
        //       "state": "RUNNING",
        //       "worker_id": "172.31.0.3:8083"
        //     },
        //     "tasks": [
        //       {
        //         "id": 0,
        //         "state": "RUNNING",
        //         "worker_id": "172.31.0.3:8083"
        //       }
        //     ],
        //     "type": "source"
        //   }
        const status = await statusResponse.json();
        // [
        //     {
        //       "id": {
        //         "connector": "file-source",
        //         "task": 0
        //       },
        //       "config": {
        //         "connector.class": "org.apache.kafka.connect.file.FileStreamSourceConnector",
        //         "file": "/data/source.txt",
        //         "task.class": "org.apache.kafka.connect.file.FileStreamSourceTask",
        //         "name": "file-source",
        //         "topic": "file-topic"
        //       }
        //     }
        //   ]
        const tasksList = await tasksResponse.json();

        return {
            name: details.name,
            config: details.config,
            type: details.type,
            status: status.connector,
            tasks: status.tasks.map((task: Task) => ({
                id: task.id,
                state: task.state,
                worker_id: task.worker_id,
                trace: task.trace,
                config: tasksList.find((taskItem: any) => taskItem.id.task === task.id)?.config
            }))
        };
    };

    const fetchConnectors = async () => {
        try {
            const clusters = JSON.parse(localStorage.getItem("clusters") || "[]");
            // const cluster = clusters.find(
            //     (c: any) => c.name === decodeURIComponent(params.name)
            // )
            const cluster = clusters[decodeURIComponent(name)];
            setCluster(cluster);

            if (!cluster) {
                throw new Error("Cluster not found");
            }

            const connectorsUrl = `${cluster.url}/connectors`;
            const response = await fetch(`/api/proxy?url=${encodeURIComponent(connectorsUrl)}`);

            if (!response.ok) {
                throw new Error("Failed to fetch connectors");
            }

            const connectorNames = await response.json();
            const connectorDetails = await Promise.all(
                connectorNames.map(async (connectorName: string) => fetchConnectorDetails(connectorName, cluster.url))
            );

            setConnectors(connectorDetails);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching connectors:", error);
            setError(error instanceof Error ? error.message : "Failed to fetch connectors");
            setLoading(false);
        }
    };

    useEffect(() => {
        if (name) {
            fetchConnectors();
            const intervalId = setInterval(fetchConnectors, 5000);
            return () => clearInterval(intervalId);
        }
    }, [name]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <LoaderPinwheel className="h-8 w-8 animate-spin" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="text-red-500">Error: {error}</div>
            </div>
        );
    }

    return (
        <div className="container mx-auto py-10 w-8/12">
            <h1 className="text-2xl font-thin tracking-tight mb-6">
                Connectors for <span className="font-bold">{cluster ? decodeURIComponent(cluster.name) : ""}</span>
            </h1>

            <div className="grid grid-cols-4">
                {/* Left Panel - Connector List */}
                <Card className="rounded-none">
                    <CardHeader>
                        <CardTitle>Connectors</CardTitle>
                    </CardHeader>
                    <CardContent className="max-h-96 overflow-auto">
                        {connectors.map((connector) => (
                            <ConnectorListItem
                                key={connector.name}
                                connector={connector}
                                isSelected={selectedConnector?.name === connector.name}
                                onClick={() =>
                                    setSelectedConnector(connector)
                                }
                            />
                        ))}
                    </CardContent>
                </Card>

                {/* Right Panel - Connector Details */}
                <Card className="col-span-3 rounded-none border-l-0">
                    <CardContent className="p-6">
                        {cluster ? <ConnectorDetails connector={selectedConnector} clusterUrl={cluster.url} /> : <></>}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}