import { beforeEach, describe, expect, it } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import nock from "nock";
import { request } from "http";

function useCustomHook() {
  return useQuery({ queryKey: ["customHook"], queryFn: () => "Hello" });
}

function useFetchData() {
  return useQuery({
    queryKey: ["fetchData"],
    queryFn: () => request("http://www.example.com/menu"),
  });
}

describe("tanstack query", () => {
  let queryClient: QueryClient;
  let wrapper: React.FC;

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });
    wrapper = ({ children }) => (
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
  });
});
