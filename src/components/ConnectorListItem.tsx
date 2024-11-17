"use client"

import { Badge } from "@/components/ui/badge";
import { Connector } from "@/types";
import ConnectorFlowIndicator from "./ConnectorFlowIndicator";

interface ConnectorListItemProps {
    connector: Connector;
    isSelected: boolean;
    onClick: () => void;
}

export default function ConnectorListItem({
    connector,
    isSelected,
    onClick
}: ConnectorListItemProps) {
    return (
        <div
            onClick={onClick}
            className={`mb-2 cursor-pointer rounded-lg border p-4 transition-colors 
    ${isSelected ? 'border-primary bg-primary/5' : 'hover:bg-muted/50'}`}
        >
            <div className="flex items-start justify-between">
                <div className="flex-1 flex-col min-w-0">
                    <h3 className="font-semibold">{connector.name}</h3>
                    <ConnectorFlowIndicator type={connector.type} />
                    <span className="flex-col capitalize text-xs text-muted-foreground">{connector.type}</span>
                </div>
                <div className="flex flex-col items-center gap-4 ml-4 shrink-0">
                    <Badge
                        variant={connector.status.state === "RUNNING" ? "default" : "destructive"}
                        className="whitespace-nowrap uppercase text-zinc-100"
                    >
                        {connector.status.state}
                    </Badge>
                    <span className="text-sm">
                        Tasks:{" "}

                        {/* <Badge variant="default" className="rounded-full"> */}
                        <span className="font-extrabold">{connector.tasks?.length || 0}</span>
                        {/* </Badge> */}
                    </span>
                </div>
            </div>
        </div>
    );
};