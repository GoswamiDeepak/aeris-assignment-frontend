import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { VehicleEventType } from '@/types/VehicalEventTypes';


interface EventTypeChartProps {
    events: VehicleEventType[];
}

export const EventTypeChart = ({ events }: EventTypeChartProps) => {
    // Count events by type
    const eventCounts: Record<string, number> = {};
    events.forEach((event) => {
        eventCounts[event.eventType] = (eventCounts[event.eventType] || 0) + 1;
    });

    const data = Object.entries(eventCounts).map(([name, value]) => ({
        name,
        value,
    }));

    const COLORS = ['#10b981', '#ef4444', '#3b82f6', '#f59e0b'];

    return (
        <Card className="h-full">
            <CardHeader>
                <CardTitle>Event Types</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value">
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip formatter={(value) => [`${value} events`, 'Count']} />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
};
