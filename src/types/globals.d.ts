export { };

declare global {

    interface Cluster {
        name: string;
        url: string;
    }

    enum ConnectorStatus {
        RUNNING = 'RUNNING',
        PAUSED = 'PAUSED',
        FAILED = 'FAILED',
        UNASSIGNED = 'UNASSIGNED',
    }
    type Cluster = {
        index: number,
        name: string
        status: "running" | "not running"
        url: string
        version: string
        commit: string
        kafka_cluster_id: string
    }

    type Task = {
        id: string;
        state: string;
        worker_id: string;
        trace: string;
    };
}