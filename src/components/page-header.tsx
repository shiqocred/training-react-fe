export function PageHeader({
  title,
  description,
  actions,
}: {
  title: string;
  description: string;
  actions?: React.ReactNode;
}) {
  return (
    <header className="flex flex-col justify-between gap-3 rounded-2xl border bg-card/80 p-4 shadow-sm backdrop-blur md:flex-row md:items-center">
      <div className="space-y-1.5">
        <h1 className="text-base font-semibold leading-none text-foreground">
          {title}
        </h1>
        <p className="max-w-2xl text-sm leading-5 text-muted-foreground">
          {description}
        </p>
      </div>
      {actions ? (
        <div className="flex items-center gap-2">{actions}</div>
      ) : null}
    </header>
  );
}
