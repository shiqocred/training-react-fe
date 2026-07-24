"use client";

import { useEffect } from "react";
import { AlertTriangle, RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-background p-4 text-xs text-foreground">
      <Card
        className="w-full max-w-md border-destructive/20 shadow-sm"
        size="sm"
      >
        <CardHeader>
          <div className="flex items-center gap-2 text-destructive">
            <AlertTriangle className="size-4" />
            <CardTitle className="text-sm font-semibold">
              Dasbor gagal dimuat
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-muted-foreground">
            Terjadi kesalahan pada tampilan banking. Silakan coba muat ulang.
          </p>
          <Button size="sm" onClick={reset} className="w-full">
            <RotateCcw className="size-3.5" />
            Coba lagi
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}
