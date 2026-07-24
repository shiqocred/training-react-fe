// In Next.js, this file would be called: app/providers.tsx
"use client";

// Since QueryClientProvider relies on useContext under the hood, we have to put 'use client' on top
import {
  environmentManager,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // staleTime: berapa lama data dianggap "fresh" sebelum refetch
        // 5 menit = data tidak akan refetch jika masih dalam 5 menit terakhir
        staleTime: 5 * 60 * 1000, // 5 menit

        // gcTime: berapa lama cache disimpan di memory setelah unused
        // 10 menit = cache tetap ada selama 10 menit meskipun tidak ada component yang subscribe
        gcTime: 10 * 60 * 1000, // 10 menit

        // refetchOnWindowFocus: refetch saat window focus kembali
        refetchOnWindowFocus: false, // Disable auto-refetch saat window focus
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined = undefined;

const getQueryClient = () => {
  const isServer = environmentManager.isServer();
  if (isServer) {
    // Server: always make a new query client
    return makeQueryClient();
  } else {
    // Browser: make a new query client if we don't already have one
    // This is very important, so we don't re-make a new client if React
    // suspends during the initial render. This may not be needed if we
    // have a suspense boundary BELOW the creation of the query client
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
};

export function QueryProviders({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // NOTE: Avoid useState when initializing the query client if you don't
  //       have a suspense boundary between this and the code that may
  //       suspend because React will throw away the client on the initial
  //       render if it suspends and there is no boundary
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
