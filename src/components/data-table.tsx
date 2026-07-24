"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/use-debounce";
import { createPagination } from "@/lib/format";
import type { Pagination } from "@/types/banking";

export type DataTableColumn<TData> = {
  id: string;
  header: React.ReactNode;
  cell: (row: TData) => React.ReactNode;
  className?: string;
};

type DataTableProps<TData> = {
  title?: string;
  description?: string;
  data: TData[];
  columns: DataTableColumn<TData>[];
  initialPerPage?: number;
  pageSizeOptions?: number[];
  emptyLabel?: string;
};

function DataTablePagination({
  pagination,
  onPageChange,
  onPerPageChange,
  pageSizeOptions,
}: {
  pagination: Pagination;
  onPageChange: (page: number) => void;
  onPerPageChange: (perPage: number) => void;
  pageSizeOptions: number[];
}) {
  return (
    <div className="flex w-full items-center justify-between gap-3 border-t p-2 px-4 py-3 text-xs">
      <div className="flex items-center gap-2">
        <span className="text-muted-foreground">Baris</span>
        <Select
          value={String(pagination.per_page)}
          onValueChange={(value) => onPerPageChange(Number(value))}
        >
          <SelectTrigger size="sm" className="h-7 w-[76px] text-xs">
            <SelectValue />
          </SelectTrigger>
          <SelectContent align="start">
            {pageSizeOptions.map((item) => (
              <SelectItem key={item} value={String(item)} className="text-xs">
                {item}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="xs"
          disabled={pagination.current_page <= 1}
          onClick={() => onPageChange(pagination.current_page - 1)}
        >
          <ChevronLeft className="size-3" />
          Sebelumnya
        </Button>
        <span className="min-w-20 text-center text-muted-foreground">
          {pagination.current_page} / {pagination.last_page}
        </span>
        <Button
          variant="outline"
          size="xs"
          disabled={pagination.current_page >= pagination.last_page}
          onClick={() => onPageChange(pagination.current_page + 1)}
        >
          Berikutnya
          <ChevronRight className="size-3" />
        </Button>
      </div>
    </div>
  );
}

export function DataTable<TData>({
  title,
  description,
  data,
  columns,
  initialPerPage = 5,
  pageSizeOptions = [3, 5, 10, 25],
  emptyLabel = "Tidak ada data.",
}: DataTableProps<TData>) {
  const [page, setPage] = React.useState(1);
  const [perPage, setPerPage] = React.useState(initialPerPage);
  const [query, setQuery] = React.useState("");
  const debouncedQuery = useDebounce(query, 300);
  const normalizedQuery = debouncedQuery.trim().toLowerCase();
  const filteredData = normalizedQuery
    ? data.filter((row) =>
        JSON.stringify(row).toLowerCase().includes(normalizedQuery),
      )
    : data;
  const pagination = createPagination(page, perPage, filteredData.length);
  const currentPage = Math.min(page, pagination.last_page);
  const visiblePagination = { ...pagination, current_page: currentPage };
  const rows = filteredData.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage,
  );

  const tableContent = (
    <>
      <Table className="text-xs">
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead
                key={column.id}
                className="h-8 text-xs first:pl-4 last:pr-4"
              >
                {column.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.length ? (
            rows.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    className={
                      column.className ?? "py-2 text-xs first:pl-4 last:pr-4"
                    }
                  >
                    {column.cell(row)}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="h-20 text-center text-xs text-muted-foreground"
              >
                {emptyLabel}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <DataTablePagination
        pagination={visiblePagination}
        pageSizeOptions={pageSizeOptions}
        onPageChange={setPage}
        onPerPageChange={(value) => {
          setPerPage(value);
          setPage(1);
        }}
      />
    </>
  );

  if (!title && !description) {
    return (
      <div className="rounded-xl border bg-card shadow-sm">{tableContent}</div>
    );
  }

  return (
    <Card className="shadow-sm p-0" size="sm">
      <CardHeader className="grid gap-3 border-b p-4 md:grid-cols-[1fr_auto] md:items-center">
        <div>
          {title ? (
            <CardTitle className="text-sm! font-semibold">{title}</CardTitle>
          ) : null}
          {description ? (
            <CardDescription className="text-xs!">
              {description}
            </CardDescription>
          ) : null}
        </div>
        <div className="relative w-full md:w-56">
          <Search className="absolute left-2 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setPage(1);
            }}
            placeholder="Cari..."
            className="h-7 pl-7 text-xs"
          />
        </div>
      </CardHeader>
      <CardContent className="p-0">{tableContent}</CardContent>
    </Card>
  );
}
