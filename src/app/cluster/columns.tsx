// columns.ts
"use client"

import { Badge } from "@/components/ui/badge"
import { ColumnDef } from "@tanstack/react-table"
import { CheckCircle, CircleOff } from "lucide-react"

export type Cluster = {
    index: number,
    name: string
    status: "RUNNING" | "NOT RUNNING"
    url: string
    version: string
    commit: string
    kafka_cluster_id: string
}

export const statuses = [
    {
        value: "RUNNING",
        icon: CheckCircle,
    },
    {
        value: "NOT RUNNING",
        icon: CircleOff,
    }
]

export const columns: ColumnDef<Cluster>[] = [
    {
        accessorKey: "index",
        header: "ID",
        cell: ({ row }) => (
            <div className="font-sm">{row.getValue("index") as number + 1}</div>
        )
    },
    {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => (
            <div className="font-md">{row.getValue("name")}</div>
        )
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const status = row.getValue("status") as string
            const statusObject = statuses.find(
                (statusIcon) => statusIcon.value === status
            )

            if (!statusObject) {
                return null
            }

            return (
                <Badge
                    variant={status === "RUNNING" ? "default" : "destructive"}
                    className="whitespace-nowrap uppercase text-zinc-100"
                >
                    {statusObject.icon && (
                        <statusObject.icon className="mr-2 h-4 w-4" />
                    )}
                    <span className="py-0.5">{status}</span>
                </Badge>
            )
        },
    },
    {
        accessorKey: "url",
        header: "URL",
        cell: ({ row }) => (
            <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
                {row.getValue("url")}
            </code>
        )
    },
    {
        accessorKey: "version",
        header: "Version",
        cell: ({ row }) => (
            <div className="font-mono text-sm">{row.getValue("version")}</div>
        )
    },
    {
        accessorKey: "commit",
        header: "Commit",
        cell: ({ row }) => (
            <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
                {row.getValue("commit")}
            </code>
        )
    },
    {
        accessorKey: "kafka_cluster_id",
        header: "Kafka Cluster ID",
        cell: ({ row }) => (
            <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
                {row.getValue("kafka_cluster_id")}
            </code>
        )
    },
]