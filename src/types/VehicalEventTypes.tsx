export interface TirePressure {
    frontLeft: number;
    frontRight: number;
    rearLeft: number;
    rearRight: number;
}

export interface Location {
    latitude: number;
    longitude: number;
}

export interface VehicleEventType {
    vehicleId: string;
    eventType: string;
    speed: number;
    location: Location;
    engineTemp: number;
    odometer: number;
    fuelLevel: number;
    batteryStatus: string;
    tirePressure: TirePressure;
    timestamp: string;
    isActive: string;
}
