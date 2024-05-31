import { Bar, Pie, Line } from "react-chartjs-2";
import "chart.js/auto";
import { data } from "../constants/graphData.js";

// Function to format data for charts
const formatChartData = () => {
    const categories = {};
    const signatures = {};
    const timestamps = {};
    const protocol = {};

    data.forEach((item) => {
        const { alert, timestamp, proto } = item;
        if (alert?.category)
            categories[alert?.category] =
                (categories[alert?.category] || 0) + 1;
        if (alert?.signature)
            signatures[alert?.signature] =
                (signatures[alert?.signature] || 0) + 1;

        const time = new Date(timestamp).toLocaleTimeString();
        timestamps[time] = (timestamps[time] || 0) + 1;

        if (proto) protocol[proto] = (protocol[proto] || 0) + 1;
    });

    return {
        categories,
        signatures,
        timestamps,
        protocol,
    };
};

const Dashboard = () => {
    const { categories, signatures, timestamps, protocol } = formatChartData();

    const categoryData = {
        labels: Object.keys(categories),
        datasets: [
            {
                label: "Categories",
                data: Object.values(categories),
                backgroundColor: "rgba(75, 192, 192, 0.6)",
            },
        ],
    };

    const signatureData = {
        labels: Object.keys(signatures),
        datasets: [
            {
                label: "Signatures",
                data: Object.values(signatures),
                backgroundColor: [
                    "rgba(75, 192, 192, 0.6)",
                    "rgba(75, 192, 22, 0.6)",
                    "rgba(255, 206, 86, 0.6)",
                    "rgba(153, 102, 105, 0.6)",
                    "rgba(255, 159, 64, 0.6)",
                    "rgba(255, 99, 132, 0.6)",
                    "rgba(104, 162, 85, 0.6)",
                    "rgba(54, 162, 235, 0.6)",
                    "rgba(255, 678, 86, 0.6)",
                    "rgba(75, 192, 192, 0.6)",
                    "rgba(153, 102, 255, 0.6)",
                    "rgba(201, 203, 207, 0.6)",
                    "rgba(255, 205, 86, 0.6)",
                    "rgba(255, 22, 86, 0.8)",
                    "rgba(255, 67, 86, 0.6)",
                    "rgba(255, 67, 818, 0.6)",
                ],
            },
        ],
    };

    const timestampData = {
        labels: Object.keys(timestamps),
        datasets: [
            {
                label: "Alerts over Time",
                data: Object.values(timestamps),
                backgroundColor: "rgba(255, 159, 64, 0.6)",
                borderColor: "rgba(255, 159, 64, 1)",
                fill: false,
            },
        ],
    };

    const protocolData = {
        labels: Object.keys(protocol),
        datasets: [
            {
                label: "Protocols",
                data: Object.values(protocol),
                backgroundColor: "rgba(25, 112, 192, 0.6)",
            },
        ],
    };

    return (
        <div className="p-2 md:p-8 bg-gray-900 text-white max-w-[1400px] mx-auto">
            <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
            <div className="flex flex-col gap-6">
                <div className="bg-gray-800 p-2 md:p-6 rounded-lg">
                    <h2 className="text-2xl mb-4">Alert Categories</h2>
                    <div className="h-[400px] w-full">
                        <Bar
                            data={categoryData}
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
                            }}
                        />
                    </div>
                </div>
                <div className="bg-gray-800 p-2 md:p-6 rounded-lg">
                    <h2 className="text-2xl mb-4">Alert Signatures</h2>
                    <div className="h-[850px] w-full">
                        <Pie
                            data={signatureData}
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
                            }}
                        />
                    </div>
                </div>
                <div className="bg-gray-800 p-2 md:p-6 rounded-lg">
                    <h2 className="text-2xl mb-4">Alerts over Time</h2>
                    <div className="h-[400px] w-full">
                        <Line
                            data={timestampData}
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
                            }}
                        />
                    </div>
                </div>
                <div className="bg-gray-800 p-2 md:p-6 rounded-lg">
                    <h2 className="text-2xl mb-4">Protocol Data</h2>
                    <div className="h-[400px] w-full">
                        <Bar
                            data={protocolData}
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
