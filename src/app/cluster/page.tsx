"use client"

import { Button } from "@/components/ui/button"
import { useClusters } from "@/contexts/ClusterContext"
import { LoaderPinwheel, PlusCircle } from "lucide-react"
import { useEffect, useState } from "react"
import { Cluster, columns } from "./columns"
import { DataTable } from "./data-table"

interface ClusterResponse {
    version: string
    commit: string
    kafka_cluster_id: string
}

export default function ClusterTable() {
    const { clusters, setShowModal } = useClusters()

    // const [clusters] = useLocalStorage<BasicCluster[]>("clusters", [])
    const [enrichedClusters, setEnrichedClusters] = useState<Cluster[]>([])
    const [loading, setLoading] = useState(true)

    const fetchClusterInfo = async (url: string): Promise<ClusterResponse | null> => {
        try {
            // Option 1: Using proxy endpoint
            const proxyUrl = `/api/proxy?url=${encodeURIComponent(url)}`

            const response = await fetch(proxyUrl, {
                headers: {
                    'Accept': 'application/json',
                },
            })

            if (!response.ok) {
                throw new Error("Failed to fetch cluster info")
            }

            const data = await response.json()
            return data
        } catch (error) {
            console.error(`Error fetching cluster info from ${url}:`, error)
            return null
        }
    }

    const enrichClusterData = async () => {
        if (!clusters) return

        setEnrichedClusters((await Promise.all(
            clusters.map(async (cluster, index) => {
                try {
                    const clusterInfo = await fetchClusterInfo(cluster.url);

                    if (clusterInfo) {
                        return {
                            index,
                            name: cluster.name,
                            url: cluster.url,
                            status: "RUNNING",
                            version: clusterInfo.version,
                            commit: clusterInfo.commit,
                            kafka_cluster_id: clusterInfo.kafka_cluster_id,
                        }
                    } else {
                        return {
                            index,
                            name: cluster.name,
                            url: cluster.url,
                            status: "NOT RUNNING",
                            version: "N/A",
                            commit: "N/A",
                            kafka_cluster_id: "N/A",
                        }
                    }
                } catch (error) {
                    console.error(`Error enriching cluster data for ${cluster.url}:`, error)
                    return {
                        index,
                        name: cluster.name,
                        url: cluster.url,
                        status: "NOT RUNNING",
                        version: "N/A",
                        commit: "N/A",
                        kafka_cluster_id: "N/A",
                    }
                }
            })
        )))
        setLoading(false)
    }

    useEffect(() => {
        enrichClusterData()

        // Set up polling interval
        const intervalId = setInterval(enrichClusterData, 3000) // Poll every 30 seconds

        return () => clearInterval(intervalId)
    }, [clusters])

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <LoaderPinwheel className="h-8 w-8 animate-spin" />
            </div>
        )
    }

    return (
        <div className="container mx-auto py-20 w-4/6 p-8">
            <div className="hidden h-full flex-1 flex-col space-y-8 md:flex">
                <div className="flex items-center justify-between space-y-2">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">Kafka Connect Clusters</h2>
                        <p className="text-muted-foreground">
                            Here&apos;s a list of your kafka connect clusters
                        </p>
                    </div>
                    <Button onClick={() => setShowModal(true)} className="flex items-center">
                        <PlusCircle className="mr-2 h-4 w-4" /> Add Instance
                    </Button>
                </div>
                <DataTable columns={columns} data={enrichedClusters} />
            </div>
        </div>
    )
}