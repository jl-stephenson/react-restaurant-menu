import { useQuery } from "@tanstack/react-query";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { MenuType } from "@/utils/types/menu";

export function Menu() {
  const {
    data: menu,
    isLoading,
    isError,
    error,
  } = useQuery<MenuType>({
    queryKey: ["menu"],
    queryFn: async () => {
      const response = await fetch(
        "https://menus.flipdish.co/prod/16798/e6220da2-c34a-4ea2-bb51-a3e190fc5f08.json",
      );
      return await response.json();
    },
  });

  console.log(menu);
  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  if (!menu) {
    return <span>Menu not found!</span>;
  }

  return (
    <main className="mx-auto max-w-7xl px-1">
      {menu.MenuSections.map((section) => (
        <div key={section.MenuSectionId}>
          <div className="grid max-h-72 w-full grid-cols-1 grid-rows-1 overflow-hidden rounded-xl">
            <div className="z-10 col-span-1 col-start-1 row-start-1 flex h-full w-full items-center justify-start bg-gradient-to-r from-black/80 via-transparent to-transparent p-1">
              <h2 className="font-display self-justify-end p-4 text-7xl text-white">
                {section.Name}
              </h2>
            </div>
            <img
              src={section.ImageUrl}
              alt={section.Name}
              className="col-span-1 col-start-1 row-start-1 h-full w-full object-cover object-center"
            />
          </div>
          <div className="my-4 grid grid-cols-[repeat(auto-fit,minmax(350px,1fr))] gap-4">
            {section.MenuItems.map((item) => {
              const masterOptionSet = item.MenuItemOptionSets.find(
                (optionSet) => optionSet.IsMasterOptionSet,
              );

              return (
                <>
                  {!masterOptionSet ? (
                    <Card key={item.MenuItemId}>
                      <CardHeader>
                        <CardTitle>{item.Name}</CardTitle>
                        <CardDescription>£{item.Price}</CardDescription>
                      </CardHeader>
                      <CardContent className="self-center">
                        <img
                          src={item.ImageUrl}
                          alt={item.Name}
                          className="aspect-square w-full max-w-3xs rounded-lg object-cover object-center"
                        />
                      </CardContent>
                      <CardFooter>
                        <ul>
                          {item.MenuItemOptionSets.map((optionSet) => {
                            return optionSet.MenuItemOptionSetItems.map(
                              (optionItem) => (
                                <li
                                  key={optionItem.MenuItemOptionSetItemId}
                                >{`${optionItem.Name} - + £${optionItem.Price}`}</li>
                              ),
                            );
                          })}
                        </ul>
                      </CardFooter>
                    </Card>
                  ) : (
                    item.MenuItemOptionSets.map((optionSet) => {
                      return optionSet.MenuItemOptionSetItems.map(
                        (optionItem) => (
                          <Card key={optionItem.MenuItemOptionSetItemId}>
                            <CardHeader>
                              <CardTitle>
                                {item.Name} - {optionItem.Name}
                              </CardTitle>
                            
                            <CardDescription>
                              £{optionItem.Price}
                            </CardDescription>
                            </CardHeader>
                            <CardContent className="self-center">
                              <img
                                src={item.ImageUrl}
                                alt={item.Name}
                                className="aspect-square w-full max-w-3xs rounded-lg object-cover object-center"
                              />
                            </CardContent>
                          </Card>
                        ),
                      );
                    })
                  )}
                </>
              );
            })}
          </div>
        </div>
      ))}
    </main>
  );
}
