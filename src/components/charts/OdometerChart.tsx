import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { VehicleEventType } from '@/types/VehicalEventTypes';

interface OdometerChartProps {
    events: VehicleEventType[];
}

export const OdometerChart = ({ events }: OdometerChartProps) => {
    const data = events.map((event) => ({
        name: event.vehicleId,
        odometer: event.odometer,
    }));

    return (
        <Card className="h-full">
            <CardHeader>
                <CardTitle>Vehicle Odometer Readings</CardTitle>
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
                            <YAxis label={{ value: 'Miles', angle: -90, position: 'insideLeft' }} />
                            <Tooltip formatter={(value) => [`${value.toLocaleString()} mi`, 'Odometer']} />
                            <Legend />
                            <Bar dataKey="odometer" fill="#3b82f6" name="Odometer (mi)" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
};
