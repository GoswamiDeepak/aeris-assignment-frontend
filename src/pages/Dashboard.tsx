import { EventTypeChart } from '@/components/charts/EventTypeChart';
import { FuelLevelChart } from '@/components/charts/FuelLevelChart';
import { OdometerChart } from '@/components/charts/OdometerChart';
import { TirePressureChart } from '@/components/charts/TirePressureChart';
import { StatsOverview } from '@/components/dashboard/StateOverviewComp';
import { getVehicals } from '@/http/api';
import { useQuery } from '@tanstack/react-query';

const Dashboard = () => {
    const { data: vehicleData = [] } = useQuery({
        queryKey: ['vehicalEvents'],
        queryFn: async () => {
            const response = await getVehicals();
            return response.data;
        },
    });

    return (
        <>
            <div>
                <StatsOverview events={vehicleData} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 mt-8">
                <FuelLevelChart events={vehicleData} />
                <OdometerChart events={vehicleData} />
                <TirePressureChart events={vehicleData} />
                <EventTypeChart events={vehicleData} />
            </div>
        </>
    );
};

export default Dashboard;
