import {
  DisplayItem,
  Extra,
  MenuItem,
  MenuType,
  TransformedMenu,
} from "./types/menu";

export function transformMenu(data: MenuType): TransformedMenu {
  const transformedMenu = {
    ...data,
    MenuSections: data.MenuSections.map((section) => ({
      ...section,
      MenuItems: section.MenuItems.map((item) => {
        const transformedMenuItems = transformMenuItem(item);
        return transformedMenuItems;
      }),
    })),
  };
  return transformedMenu;
}

function transformMenuItem(item: MenuItem): {
  id: number;
  displayItems: DisplayItem[];
  extras: Extra[];
} {
  const displayItems = [] as DisplayItem[];
  const extras = [] as Extra[];

  if (item.MenuItemOptionSets.length === 0) {
    displayItems.push({
      id: item.MenuItemId,
      name: item.Name,
      description: item.Description,
      price: item.Price,
      imageUrl: item.ImageUrl,
      maxSelectCount: 1,
    });
    return { id: item.MenuItemId, displayItems, extras };
  }

  for (const optionSet of item.MenuItemOptionSets) {
    if (optionSet.MinSelectCount > 0) {
      optionSet.MenuItemOptionSetItems.forEach((optionItem) => {
        displayItems.push({
          id: optionItem.MenuItemOptionSetItemId,
          name:
            item.Name !== optionItem.Name
              ? `${item.Name} - ${optionItem.Name}`
              : item.Name,
          description: item.Description,
          price: !optionSet.IsMasterOptionSet
            ? item.Price + optionItem.Price
            : optionItem.Price,
          imageUrl: optionItem.ImageUrl ? optionItem.ImageUrl : item.ImageUrl,
          maxSelectCount: optionSet.MaxSelectCount,
        });
      });
    } else {
      optionSet.MenuItemOptionSetItems.forEach((optionItem) => {
        extras.push({
          id: optionItem.MenuItemOptionSetItemId,
          name: optionItem.Name,
          price: optionItem.Price,
        });
      });
    }
  }

  if (!displayItems || displayItems.length === 0) {
    displayItems.push({
      id: item.MenuItemId,
      name: item.Name,
      description: item.Description,
      price: item.Price,
      imageUrl: item.ImageUrl,
      maxSelectCount: item.MenuItemOptionSets[0].MaxSelectCount,
    });
  }

  return { id: item.MenuItemId, displayItems, extras };
}
