// import { VehicleEvent } from "@/data/vehicleData";
import { VehicleEventType } from '@/types/VehicalEventTypes';
import { Card, CardContent } from '../ui/card';

interface StatsOverviewProps {
    events: VehicleEventType[];
}

export const StatsOverview = ({ events }: StatsOverviewProps) => {
    // Calculate stats
    const totalVehicles = new Set(events.map((event) => event.vehicleId)).size;
    const avgFuelLevel = events.reduce((sum, event) => sum + event.fuelLevel, 0) / events.length;
    const avgEngineTemp = events.reduce((sum, event) => sum + event.engineTemp, 0) / events.length;
    const totalIgnitionOn = events.filter((event) => event.eventType === 'Ignition On').length;

    const statItems = [
        {
            title: 'Total Vehicles',
            value: totalVehicles,
            icon: '🚗',
            color: 'bg-blue-50 text-blue-700',
        },
        {
            title: 'Avg. Fuel Level',
            value: `${avgFuelLevel.toFixed(1)}%`,
            icon: '⛽',
            color: 'bg-green-50 text-green-700',
        },
        {
            title: 'Avg. Engine Temp',
            value: `${avgEngineTemp.toFixed(1)}°C`,
            icon: '🔥',
            color: 'bg-red-50 text-red-700',
        },
        {
            title: 'Ignition On Events',
            value: totalIgnitionOn,
            icon: '🔑',
            color: 'bg-purple-50 text-purple-700',
        },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {statItems.map((stat, index) => (
                <Card key={index}>
                    <CardContent className="pt-6">
                        <div className="flex items-center space-x-4">
                            <div className={`p-3 rounded-full ${stat.color}`}>
                                <span className="text-2xl">{stat.icon}</span>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">{stat.title}</p>
                                <p className="text-2xl font-bold">{stat.value}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};
