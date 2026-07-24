import {
  ArrowDownLeft,
  ArrowUpRight,
  CircleDollarSign,
  Users,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/lib/format";
import type { DashboardData } from "@/types/banking";

export function OverviewCards({ data }: { data?: DashboardData }) {
  const items = [
    {
      label: "Total saldo",
      value: formatCurrency(data?.total_balance ?? 0),
      icon: CircleDollarSign,
    },
    {
      label: "Nasabah",
      value: String(data?.total_customers ?? 0),
      icon: Users,
    },
    {
      label: "Dana masuk",
      value: formatCurrency(data?.total_income ?? 0),
      icon: ArrowDownLeft,
    },
    {
      label: "Dana keluar",
      value: formatCurrency(data?.total_outcome ?? 0),
      icon: ArrowUpRight,
    },
  ];

  return (
    <section className="grid gap-3 md:grid-cols-4">
      {items.map((item) => (
        <Card key={item.label} className="shadow-sm" size="sm">
          <CardContent className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground">{item.label}</p>
              <p className="mt-1 text-sm font-semibold">{item.value}</p>
            </div>
            <div className="flex size-8 items-center justify-center rounded-lg bg-muted">
              <item.icon className="size-4" />
            </div>
          </CardContent>
        </Card>
      ))}
    </section>
  );
}
