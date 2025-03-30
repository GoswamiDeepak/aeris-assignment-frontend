export const DashboardHeader = () => {
    return (
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
            <div>
                <h1 className="text-3xl font-bold text-gray-800">Vehical Dashboard</h1>
                <p className="text-gray-500 mt-1">Monitor your vehicle fleet in real-time</p>
            </div>

            <div className="mt-4 sm:mt-0 w-full sm:w-auto">
                <div className="relative">
                    {/* <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <Input
                        placeholder="Search events..."
                        value={searchTerm}
                        onChange={(e) => onSearchChange(e.target.value)}
                        className="pl-10 w-full sm:w-64"
                    /> */}
                </div>
            </div>
        </div>
    );
};
