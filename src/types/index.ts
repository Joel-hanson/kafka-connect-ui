export interface ConnectorConfig {
    "connector.class": string;
    [key: string]: string;
}

export interface ConnectorStatus {
    state: "RUNNING" | "PAUSED" | "STOPPED" | "FAILED";
    worker_id: string;
}

export interface ConnectorTask {
    id: number;
    state: "RUNNING" | "FAILED" | "PAUSED";
    worker_id: string;
    trace?: string;
}

export interface Connector {
    name: string;
    type: string;
    config: ConnectorConfig;
    status: ConnectorStatus;
    tasks: ConnectorTask[];
}
