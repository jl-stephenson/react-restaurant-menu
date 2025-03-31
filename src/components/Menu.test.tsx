import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import nock from "nock";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Menu } from "./Menu";
import menuData from "@/__mocks__/menuData.json";

describe("menu page render", () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient();
    nock("https://menus.flipdish.co")
      .get("/prod/16798/e6220da2-c34a-4ea2-bb51-a3e190fc5f08.json")
      .reply(200, menuData);

    render(
      <QueryClientProvider client={queryClient}>
        <Menu />
      </QueryClientProvider>,
    );
  });

  afterEach(() => {
    nock.cleanAll();
  });

  it("renders loading correctly", async () => {
    expect(screen.getByText("Loading...")).toBeInTheDocument();
    await waitFor(() =>
      expect(screen.queryByText("Loading...")).not.toBeInTheDocument(),
    );
  });

  it("renders page title", () => {
    expect(screen.getByRole("heading", { level: 1 }).textContent).toBe("Menu");
  });

  it("renders section header", async () => {
    const firstSectionHeader = menuData.MenuSections[0].Name;
    const sections = await waitFor(() =>
      screen.getAllByRole("heading", { level: 2 }),
    );
    expect(sections[0].textContent).toEqual(firstSectionHeader);
  });

  it("renders menu item", async () => {
    const firstItemHeader = menuData.MenuSections[0].MenuItems[0].Name;
    const items = await waitFor(() =>
      screen.getAllByText((content) => content.includes(firstItemHeader)),
    );
    expect(items[0].textContent).toContain(firstItemHeader);
  });
});
