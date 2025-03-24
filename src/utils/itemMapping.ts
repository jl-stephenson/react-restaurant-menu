import { MenuItem } from "./types/menu";

export function mapItem(item: MenuItem) {
  const itemMap = new Map();

  if (item.MenuItemOptionSets.length === 0) {
    return [[item], []];
  }

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
      ]);
    }
  }

  const standalones = itemMap.get("standalones");
  const options = itemMap.get("options");

  if (!standalones || standalones.length === 0) {
    return [[item], options];
  }

  return [standalones, options];
}
