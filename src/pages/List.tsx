import { VehicleEventsTable } from '@/components/dashboard/VehicalEventsTable';
import { getVehicals } from '@/http/api';
import { useQuery } from '@tanstack/react-query';

// const VehicleEvent = [
//     {
//         vehicleId: 'VH1001',
//         eventType: 'Ignition On',
//         speed: 0,
//         location: {
//             latitude: 37.7749,
//             longitude: -122.4194,
//         },
//         engineTemp: 0,
//         odometer: 12345,
//         fuelLevel: 85,
//         batteryStatus: 'Normal',
//         tirePressure: {
//             frontLeft: 32,
//             frontRight: 31,
//             rearLeft: 30,
//             rearRight: 32,
//         },
//         isActive: 'true',
//         timestamp: '2023-05-15T08:30:00Z',
//     },
// ];

const List = () => {
    const { data: vehicleData = [] } = useQuery({
        queryKey: ['vehicalEvents'],
        queryFn: async () => {
            const response = await getVehicals();
            return response.data;
        },
    });
    return (
        <div>
            <VehicleEventsTable events={vehicleData} />
        </div>
    );
};

export default List;
