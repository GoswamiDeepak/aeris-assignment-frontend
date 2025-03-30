import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useEffect, useState } from 'react';
import { VehicleEventType } from '@/types/VehicalEventTypes';

interface TirePressureChartProps {
    events: VehicleEventType[];
}

export const TirePressureChart = ({ events }: TirePressureChartProps) => {
    const [selectedVehicleId, setSelectedVehicleId] = useState<string>();

    useEffect(() => {
        if (events) {
            setSelectedVehicleId(events[0]?.vehicleId);
        }
    }, [events]);
    // console.log({ selectedVehicleId });
    const selectedEvent = events.find((event) => event.vehicleId === selectedVehicleId);

    const data = selectedEvent
        ? [
              { position: 'Front Left', value: selectedEvent.tirePressure.frontLeft },
              { position: 'Front Right', value: selectedEvent.tirePressure.frontRight },
              { position: 'Rear Right', value: selectedEvent.tirePressure.rearRight },
              { position: 'Rear Left', value: selectedEvent.tirePressure.rearLeft },
          ]
        : [];

    return (
        <Card className="h-full">
            <CardHeader>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                    <CardTitle>Tire Pressure</CardTitle>
                    <Select value={selectedVehicleId} onValueChange={setSelectedVehicleId}>
                        <SelectTrigger className="w-[180px] mt-2 sm:mt-0">
                            <SelectValue placeholder="Select vehicle" />
                        </SelectTrigger>
                        <SelectContent>
                            {events.map((event) => (
                                <SelectItem key={event.vehicleId} value={event.vehicleId}>
                                    {event.vehicleId}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </CardHeader>
            <CardContent>
                <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <RadarChart data={data}>
                            <PolarGrid />
                            <PolarAngleAxis dataKey="position" />
                            <PolarRadiusAxis angle={30} domain={[20, 40]} />
                            <Radar name="Tire Pressure (PSI)" dataKey="value" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.6} />
                            <Tooltip />
                            <Legend />
                        </RadarChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
};
