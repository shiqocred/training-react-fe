import Link from "next/link";
import { Landmark } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function AuthPanel({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,var(--muted),transparent_34%),var(--background)] p-4 text-xs">
      <Card className="w-full max-w-sm shadow-sm" size="sm">
        <CardHeader className="text-center">
          <Link
            href="/"
            className="mx-auto mb-2 flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground"
          >
            <Landmark className="size-4" />
          </Link>
          <CardTitle className="text-base!">{title}</CardTitle>
          <CardDescription className="text-sm">{description}</CardDescription>
        </CardHeader>
        <CardContent>{children}</CardContent>
      </Card>
    </main>
  );
}
