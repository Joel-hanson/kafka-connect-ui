"use client"

import { PlusCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useLocalStorage } from 'react-use';
import { Button } from './ui/button';

const KafkaConnectorManager = () => {
    const [connectors, setConnectors] = useLocalStorage<Connector[]>('connectors', []);
    const [selectedConnector, setSelectedConnector] = useState<Connector | null>(null);

    useEffect(() => {
        // Fetch connector data from Kafka Connect REST API and update state
        const fetchConnectors = async () => {
            try {
                const response = await fetch('/api/connectors');
                const data = await response.json();
                setConnectors(data);
            } catch (error) {
                console.error('Error fetching connectors:', error);
            }
        };
        fetchConnectors();
    }, [setConnectors]);

    const handleAddInstance = () => {
        const newConnector: Connector = {
            name: 'New connect instance',
            status: ConnectorStatus.RUNNING,
            taskCount: 2,
        };

        setConnectors([...(connectors as Connector[]), newConnector]);
    };

    const handleConnectorClick = (connector: Connector) => {
        setSelectedConnector(connector);
    };

    return (
        <div className="p-6">
            <>
                <div>
                    <div className="flex flex-col justify-center items-center h-64">
                        <div className='flex-row'>
                            <span>No Connect Instance Configured</span>
                        </div>
                        <div className="text-center mt-4">
                            <Button onClick={handleAddInstance} className="flex items-center">
                                <PlusCircle className="mr-2" /> Add Instance
                            </Button>
                        </div>
                    </div>
                </div>
            </>
        </div>
    );
};

export default KafkaConnectorManager;
