// import { format, addDays } from 'date-fns';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { VehicleEventType } from '@/types/VehicalEventTypes';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Label } from '../ui/label';
import { Switch } from '../ui/switch';
// import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
// import { Button } from '../ui/button';
// import { CalendarIcon } from 'lucide-react';
// import { cn } from '@/lib/utils';
// import { Calendar } from '../ui/calendar';

interface VehicleEventsTableProps {
    events: VehicleEventType[];
}

export const VehicleEventsTable = ({ events }: VehicleEventsTableProps) => {
    // const formatDate = (dateString: string) => {
    //     return format(new Date(dateString), 'MMM dd, yyyy HH:mm');
    // };

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



    return (
        <Card>
            <CardHeader>
                <div className="grid grid-cols-4 gap-4">
                    <div>
                        <Input type="text" placeholder="Enter vehical ID" />
                    </div>
                    <div>
                        <Select>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Theme" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="light">Light</SelectItem>
                                <SelectItem value="dark">Dark</SelectItem>
                                <SelectItem value="system">System</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Switch id="airplane-mode" />
                        <Label htmlFor="airplane-mode">Airplane Mode</Label>
                    </div>
                    
                </div>
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
                                        {/* <TableCell>{formatDate(event.timestamp)}</TableCell> */}
                                        <TableCell>{event.speed} mph</TableCell>
                                        <TableCell>{event.fuelLevel}%</TableCell>
                                        <TableCell>{event.batteryStatus}</TableCell>
                                        <TableCell>{event.odometer.toLocaleString()} mi</TableCell>
                                        <TableCell>
                                            <Badge className={getIsActiveColor(event.isActive)}>{event.isActive}</Badge>
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
