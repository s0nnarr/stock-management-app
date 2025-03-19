import React from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Rectangle,
    ResponsiveContainer,
} from "recharts";

const data = [
    {
        name: "1",
        product: "i7 12600H",
        Revenue: 24,
        Sales: 20,
    },
    {
        name: "2",
        product: "Macbook Pro M2",
        Revenue: 13,
        Sales: 13,
    },
    {
        name: "3",
        product: "GTX 6000 8GB",
        Revenue: 12,
        Sales: 9,
    },
    {
        name: "4",
        product: "Laptop ASUS ROG Zephyrus",
        Revenue: 7.8,
        Sales: 3,
    },
    {
        name: "5",
        product: "16GB RAM",
        Revenue: 4.89,
        Sales: 48,
    }
];

export default function BarReChart() {

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div style={{
                    fontSize:'14px',
                    fontWeight:'500',
                    backgroundColor: '#0F0F0F',
                    color: 'white',
                    padding: '10px',
                    borderRadius: '8px',
                    display:'flex',
                    flexDirection:'column',
                    gap:'4px'
                }}>
                    <p>{`${label}. ${data[label-1].product}`}</p>
                    <p>{`${payload[0].name}: ${payload[0].value}k €`}</p>
                    <p>{`${payload[1].name}: ${payload[1].value}`}</p>
                </div>
            );
        }
        return null;
    };

    return (
        <ResponsiveContainer width={"100%"} height={160}>
            <BarChart
                data={data}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip cursor={{ fill: '#0F0F0F', opacity: 0.2 }} content={CustomTooltip} />
                <Bar
                    dataKey="Revenue"
                    fill="#2C2C54"
                />
                <Bar
                    dataKey="Sales"
                    fill="#2C2C54"
                />
            </BarChart>
        </ResponsiveContainer>
    );
}
