"use client"

import React from "react"
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  ChartData,
  ChartOptions,
  Legend,
  LinearScale,
} from "chart.js"
import { Bar } from "react-chartjs-2"

import { useIsClient } from "@/hooks/useIsClient"

ChartJS.register(CategoryScale, LinearScale, Legend, BarElement)

export interface BlockBarChartProps {
  labels: string[]
  values: number[]
  unit: string
  height?: number
}

/** Bar chart for gas usage / tx count per block (old explorer parity). */
const BlockBarChart = ({
  labels,
  values,
  unit,
  height = 192,
}: BlockBarChartProps) => {
  const isClient = useIsClient()
  if (!isClient) return null

  const data: ChartData<"bar"> = {
    labels,
    datasets: [
      {
        label: unit,
        data: values,
        backgroundColor: "rgba(110, 60, 188, 0.3)",
        borderColor: "rgba(110, 60, 188, 0.8)",
        borderWidth: 1,
        borderRadius: 4,
      },
    ],
  }

  const options: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      x: {
        grid: { display: false },
        ticks: { font: { size: 10 }, maxRotation: 0 },
      },
      y: {
        grid: { color: "rgba(128,128,128,0.15)" },
        ticks: { font: { size: 10 } },
      },
    },
  }

  return (
    <div style={{ height }}>
      <Bar data={data} options={options} />
    </div>
  )
}

export default BlockBarChart
