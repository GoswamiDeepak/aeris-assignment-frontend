import { format} from 'date-fns';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { VehicleEventType } from '@/types/VehicalEventTypes';
import EventFilterForm from './EventFilterForm';

const getEventTypeColor = (eventType: string) => {
    switch (eventType) {
        case 'Ignition On':
            return 'bg-green-100 text-green-800';
        case 'Ignition Off':
            return 'bg-red-100 text-red-800';
        case 'Time Interval':
            return 'bg-blue-100 text-blue-800';
        default:
            return 'bg-gray-100 text-gray-800';
    }
};

function getIsActiveColor(eventType: string) {
    if (eventType == 'true') {
        return 'bg-green-100 text-green-800';
    } else {
        return 'bg-red-100 text-red-800';
    }
}

interface VehicleEventsTableProps {
    events: VehicleEventType[];
    onQueryHandler: () => void;
}

export const VehicleEventsTable = ({ events, onQueryHandler }: VehicleEventsTableProps) => {
    return (
        <Card>
            <CardHeader>
                <EventFilterForm onQueryHandler={onQueryHandler} />
            </CardHeader>
            <CardContent>
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Vehicle ID</TableHead>
                                <TableHead>Event Type</TableHead>
                                <TableHead>Timestamp</TableHead>
                                <TableHead>Speed</TableHead>
                                <TableHead>Fuel Level</TableHead>
                                <TableHead>Battery</TableHead>
                                <TableHead>Odometer</TableHead>
                                <TableHead>Active</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {events.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={7} className="text-center py-4">
                                        No events found. Try adjusting your filters.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                events.map((event) => (
                                    <TableRow key={`${event.vehicleId}-${event.timestamp}`}>
                                        <TableCell className="font-medium">{event.vehicleId}</TableCell>
                                        <TableCell>
                                            <Badge className={getEventTypeColor(event.eventType)}>{event.eventType}</Badge>
                                        </TableCell>
                                        <TableCell>{format(event.timestamp, 'dd/MM/yyyy')}</TableCell>
                                        {/* <TableCell>{event.timestamp}</TableCell> */}
                                        <TableCell>{event.speed} mph</TableCell>
                                        <TableCell>{event.fuelLevel}%</TableCell>
                                        <TableCell>{event.batteryStatus}</TableCell>
                                        <TableCell>{event.odometer.toLocaleString()} mi</TableCell>
                                        <TableCell>
                                            <Badge className={getIsActiveColor(String(event.isActive))}>{String(event.isActive)}</Badge>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>
    );
};
