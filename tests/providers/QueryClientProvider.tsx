import type { PropsWithChildren } from "react";
import { QueryClientProvider as BaseProvider, QueryClient } from "react-query";

export const QueryClientProvider = ({ children }: PropsWithChildren) => {
  const client = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false
      }
    }
  });

  return <BaseProvider client={client}>{children}</BaseProvider>;
};
