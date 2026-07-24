import { Skeleton } from "@/components/ui/skeleton";

export function BankingLoadingState() {
  return (
    <main className="min-h-screen bg-background p-3 text-xs text-foreground md:p-4">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-3">
        <div className="flex items-center justify-between gap-3">
          <div className="space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-7 w-64" />
          </div>
          <Skeleton className="h-8 w-28" />
        </div>
        <div className="grid gap-3 md:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} className="h-24 rounded-xl" />
          ))}
        </div>
        <div className="grid gap-3 lg:grid-cols-[0.72fr_1.28fr]">
          <Skeleton className="h-[430px] rounded-xl" />
          <Skeleton className="h-[430px] rounded-xl" />
        </div>
      </div>
    </main>
  );
}
