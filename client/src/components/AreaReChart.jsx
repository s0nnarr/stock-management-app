import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from "recharts";

const data = [
  {
    name: "Jan",
    sales: 328,
    revenue: 16000,
  },
  {
    name: "Feb",
    sales: 260,
    revenue: 20000,
  },
  {
    name: "Mar",
    sales: 125,
    revenue: 9800,
  },
  {
    name: "Abr",
    sales: 220,
    revenue: 8560,
  },
  {
    name: "May",
    sales: 260,
    revenue: 12000,
  },
  {
    name: "Jun",
    sales: 456,
    revenue: 28000,
  },
  {
    name: "Jul",
    sales: 527,
    revenue: 36500,
  }
];

export default function AreaReChart() {

  function CustomTooltip({ payload, label, active }) {
    if (active) {
      return (
        <div style={{
          fontSize: '14px',
          fontWeight: '500',
          backgroundColor: '#0F0F0F',
          color: 'white',
          padding: '10px',
          borderRadius: '8px',
          display: 'flex',
          flexDirection: 'column',
          gap: '4px'
        }}>
          <p>{`${label} : ${payload[0].value}€`}</p>
        </div>
      );
    }

    return null;
  }

  return (
    <AreaChart
      width={440}
      height={160}
      data={data}
      margin={{
        top: 10,
        right: 30,
        left: 0,
        bottom: 0
      }}
    >
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip content={CustomTooltip} />

      <Area
        type="monotone"
        dataKey="revenue"
        stackId="1"
        stroke="#2C2C54"
        fill='#2C2C54'
      />
    </AreaChart>
  );
}