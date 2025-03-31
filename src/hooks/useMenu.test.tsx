import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import nock from "nock";
import { ReactNode } from "react";
import { useMenu } from "@/hooks/useMenu";
import menuData from "@/__mocks__/menuData.json";

describe("useMenu query hook", () => {
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

  afterEach(() => {
    nock.cleanAll();
  });

  it("fetches menu data", async () => {
    nock("https://menus.flipdish.co")
      .get("/prod/16798/e6220da2-c34a-4ea2-bb51-a3e190fc5f08.json")
      .reply(200, menuData);

    const { result } = renderHook(() => useMenu(), { wrapper });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toHaveProperty("MenuSections");
  });

  it("handles error responses", async () => {
    nock("https://menus.flipdish.co")
      .get("/prod/16798/e6220da2-c34a-4ea2-bb51-a3e190fc5f08.json")
      .replyWithError({ error: "Internal Server Error" });

    const { result } = renderHook(() => useMenu(), { wrapper });
    await waitFor(() => expect(result.current.isError).toBe(true));
    expect(result.current.error).toBeDefined();
  });

  it("transforms the menu data", async () => {
    nock("https://menus.flipdish.co")
      .get("/prod/16798/e6220da2-c34a-4ea2-bb51-a3e190fc5f08.json")
      .reply(200, menuData);

    const { result } = renderHook(() => useMenu(), { wrapper });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data?.MenuSections[0].MenuItems[0]).toHaveProperty(
      "displayItems",
    );
    expect(result.current.data?.MenuSections[0].MenuItems[0]).toHaveProperty(
      "extras",
    );
  });
});
