import { useQuery } from "@tanstack/react-query";
import { transformMenu } from "@/utils/transformMenu";
import { MenuItem } from "./MenuItem";

export function Menu() {
  const {
    data: menu,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["menu"],
    queryFn: async () => {
      const response = await fetch(
        "https://menus.flipdish.co/prod/16798/e6220da2-c34a-4ea2-bb51-a3e190fc5f08.json",
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return await response.json();
    },
    select: transformMenu,
  });

  return (
    <main className="mx-auto mt-6 max-w-7xl space-y-8 px-2">
      <h1 className="text-center text-4xl">Menu</h1>
      {isPending ? (
        <span>Loading...</span>
      ) : isError ? (
        <span>Error: {error.message}</span>
      ) : (
        menu.MenuSections.map((section) => (
          <section key={section.MenuSectionId}>
            <div className="bg-accent h-0.5 w-full"></div>
            <header className="my-1 flex items-center justify-center gap-6 sm:justify-start">
              {section.ImageUrl ? (
                <img
                  src={section.ImageUrl}
                  alt={section.Name}
                  className="aspect-square w-full max-w-16 rounded-full object-cover object-center"
                />
              ) : null}
              <h2 className="text-[2rem]">{section.Name}</h2>
            </header>
            <div className="bg-accent h-0.5 w-full"></div>
            <div className="my-4 grid grid-cols-[repeat(auto-fit,minmax(350px,1fr))] gap-4">
              {section.MenuItems.map((item) => (
                <MenuItem key={item.id} item={item} />
              ))}
            </div>
          </section>
        ))
      )}
    </main>
  );
}
