"use client"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import { ConnectorOffsetsProps } from "@/types";

export default function ConnectorOffsets({ offsets }: ConnectorOffsetsProps) {
    if (!offsets) return null;

    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold">Offsets</h3>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Topic</TableHead>
                        <TableHead>Partition</TableHead>
                        <TableHead>Offset</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {Object.entries(offsets).map(([topic, partitions]) =>
                        Object.entries(partitions).map(([partition, offset], index) => (
                            <TableRow key={`${topic}-${partition}`}>
                                {index === 0 ? (
                                    <TableCell rowSpan={Object.keys(partitions).length} className="font-medium">
                                        {topic}
                                    </TableCell>
                                ) : null}
                                <TableCell>{partition}</TableCell>
                                <TableCell>{offset}</TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    );
}