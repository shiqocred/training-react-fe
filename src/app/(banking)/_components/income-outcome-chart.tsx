"use client";

import { format } from "date-fns";
import { id } from "date-fns/locale";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { DashboardPoint } from "@/types/banking";

const chartConfig = {
  income: {
    label: "Pemasukan",
    color: "oklch(0.627 0.194 149.214)",
  },
  outcome: {
    label: "Pengeluaran",
    color: "oklch(0.577 0.245 27.325)",
  },
} satisfies ChartConfig;

export function IncomeOutcomeChart({ data = [] }: { data?: DashboardPoint[] }) {
  const chartData = data.map((item) => ({
    day: format(new Date(item.date), "dd MMM", { locale: id }),
    income: item.income,
    outcome: item.outcome,
  }));

  return (
    <Card className="shadow-sm" size="sm">
      <CardHeader className="border-b">
        <CardTitle className="text-sm font-semibold">
          Pemasukan vs Pengeluaran
        </CardTitle>
        <CardDescription className="text-xs">
          Bandingkan pergerakan kas masuk dan keluar dalam beberapa hari
          operasional terakhir.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-60 w-full">
          <LineChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="day"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Line
              dataKey="income"
              type="monotone"
              stroke="var(--color-income)"
              strokeWidth={2}
              dot={{ fill: "var(--color-income)" }}
              activeDot={{ r: 5 }}
            />
            <Line
              dataKey="outcome"
              type="monotone"
              stroke="var(--color-outcome)"
              strokeWidth={2}
              dot={{ fill: "var(--color-outcome)" }}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
