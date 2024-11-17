import { Badge } from "@/components/ui/badge"
import { ColumnDef } from "@tanstack/react-table"
import { CheckCircle, PauseCircle, StopCircle } from "lucide-react"

export type Connector = {
    name: string
    config: {
        "connector.class": string
        [key: string]: string
    }
    status: {
        state: "RUNNING" | "PAUSED" | "STOPPED"
        worker_id: string
    },
    tasks: Task[]
}

export const statuses = [
    {
        value: "RUNNING",
        icon: CheckCircle,
    },
    {
        value: "PAUSED",
        icon: PauseCircle,
    },
    {
        value: "STOPPED",
        icon: StopCircle,
    },
]

export const columns: ColumnDef<Connector>[] = [
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorFn: (row) => row.config["connector.class"],
        header: "Connector Class",
        cell: ({ row }) => {
            return (
                <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
                    {row.original.config["connector.class"]}
                </code>
            )
        }
    },
    {
        accessorKey: "status.state",
        header: "Status",
        cell: ({ row }) => {
            const status = row.original.status.state as string

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
        accessorKey: "status.worker_id",
        header: "Worker ID",
        cell: ({ row }) => (
            <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
                {row.original.status.worker_id}
            </code>
        )
    },
]