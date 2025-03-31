import { beforeEach, describe, expect, it } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import nock from "nock";
import { ReactNode } from "react";

function useCustomHook() {
  return useQuery({ queryKey: ["customHook"], queryFn: () => "Hello" });
}

function useFetchData() {
  return useQuery({
    queryKey: ["fetchData"],
    queryFn: async () => {
      const response = fetch("http://www.example.com/menu");
      return (await response).json();
    },
  });
}

describe("tanstack query", () => {
  let queryClient: QueryClient;
  let wrapper: ({ children }: { children: ReactNode }) => ReactNode;

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });
    wrapper = ({ children }: { children: ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
  });

  it("successfully returns hello", async () => {
    const { result } = renderHook(() => useCustomHook(), { wrapper });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toEqual("Hello");
  });

  it("returns a success message", async () => {
    nock("http://www.example.com").get("/menu").reply(200, {
      message: "ok",
    });

    const { result } = renderHook(() => useFetchData(), { wrapper });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toEqual({ message: "ok" });
  });

  it("handles error responses", async () => {
    nock("http://www.example.com")
      .get("/menu")
      .replyWithError({ error: "Internal Server Error" });

    const { result } = renderHook(() => useFetchData(), { wrapper });
    await waitFor(() => expect(result.current.isError).toBe(true));
    expect(result.current.error).toBeDefined();
  });
});
