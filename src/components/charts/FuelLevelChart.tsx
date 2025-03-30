import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { VehicleEventType } from '@/types/VehicalEventTypes';
//   import { VehicleEvent } from "@/data/vehicleData";

interface FuelLevelChartProps {
    events: VehicleEventType[];
}

export const FuelLevelChart = ({ events }: FuelLevelChartProps) => {
    const data = events.map((event) => ({
        name: event.vehicleId,
        fuelLevel: event.fuelLevel,
    }));

    return (
        <Card className="h-full">
            <CardHeader>
                <CardTitle>Fuel Level Comparison</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={data}
                            margin={{
                                top: 20,
                                right: 30,
                                left: 0,
                                bottom: 5,
                            }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis label={{ value: 'Percentage (%)', angle: -90, position: 'insideLeft' }} />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="fuelLevel" fill="#10b981" name="Fuel Level %" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
};
