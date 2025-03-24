import { MenuItem } from "./types/menu";

export function mapItem(item: MenuItem) {
  const itemMap = new Map();

  for (const option of item.MenuItemOptionSets) {
    if (option.IsMasterOptionSet) {
      const prevStandalones = itemMap.get("standalones") ?? [];
      itemMap.set("standalones", [
        ...prevStandalones,
        ...option.MenuItemOptionSetItems,
      ]);
    } else {
        const prevOptions = itemMap.get("options") ?? [];
        itemMap.set("options", [
            ...prevOptions,
            ...option.MenuItemOptionSetItems,
        ])
    }
  }

  return itemMap;
}
