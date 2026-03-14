import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter } from "react-router-dom";
import { ReactNode } from "react";
import { MovieModalProvider } from "@/contexts/MovieModalContext";
import { Provider } from "react-redux";
import { store } from "@/store/store";
// FIX: Create QueryClient instance outside component to prevent recreation on every render
// This ensures the query cache persists across re-renders and avoids unnecessary refetches
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <Provider store={store}>
       <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <MovieModalProvider>
          {children}
        </MovieModalProvider>
      </BrowserRouter>
      {/* React Query Devtools for debugging - only in development */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
    </Provider>
  );
}
