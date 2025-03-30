import { VehicleEventsTable } from '@/components/dashboard/VehicalEventsTable';
import { getVehicals } from '@/http/api';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

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
    const [queryString, setQueryString] = useState('');

    const { data: vehicleData = [] } = useQuery({
        queryKey: ['vehicalEvents', queryString],
        queryFn: async () => {
            const response = await getVehicals(queryString);
            return response.data;
        },
    });
    function handleQueryString(queryString = '') {
        setQueryString(queryString);
    }
    return (
        <div>
            <VehicleEventsTable events={vehicleData} onQueryHandler={handleQueryString} />
        </div>
    );
};

export default List;
