export type MenuType = {
  MenuId: number;
  MenuVersionNumber: number;
  VersionGuid: string;
  MenuSections: MenuSection[];
  MenuSectionBehaviour: number;
  DisplaySectionLinks: boolean;
  ConcessionStores: unknown[];
};

type MenuSection = {
  MenuSectionId: number;
  Name: string;
  Description: string | null;
  DisplayOrder: number;
  MenuItems: MenuItem[];
  PublicId: string;
  IsDeleted: boolean;
  IsAvailable: boolean;
  IsHiddenFromUsers: boolean;
  ImageName: string;
  ImageUrl: string;
  CellAspectRatio: number;
  CellLayoutType: number;
  MenuSectionAvailability: MenuSectionAvailability;
  ConcessionStoreId?: unknown;
  MenuSectionMetadata: unknown[];
};

export type MenuItem = {
  MenuItemId: number;
  Name: string;
  Description: string;
  SpicinessRating: number | null;
  Price: number;
  DisplayOrder: number;
  IsDeleted: boolean;
  Alcohol: boolean;
  Tags: unknown[];
  PublicId: string;
  IsAvailable: boolean;
  MenuItemOptionSets: MenuItemOptionSet[];
  TaxRate?: unknown;
  TaxRateId: number | null;
  TaxValue: number;
  MenuSectionId: number;
  ImageName: string;
  ImageUrl: string;
  CellAspectRatio: number;
  CellLayoutType: number;
  ActualPrice: number;
  DisableVouchers: boolean;
  ExcludeFromVoucherDiscounting: boolean;
  DailySpecialHours: unknown[];
  PriceCanIncrease: boolean;
  MenuItemMetadata: unknown[];
};

type MenuItemOptionSet = {
  Name: string | null;
  MenuItemOptionSetId: number;
  IsMasterOptionSet: boolean;
  DisplayOrder: number;
  MinSelectCount: number;
  MaxSelectCount: number;
  IsDeleted: boolean;
  PublicId: string;
  MenuItemOptionSetItems: MenuItemOptionSetItem[];
  ImageName: string | null;
  ImageUrl: string | null;
  CellAspectRatio: number;
  CellLayoutType: number;
  MinPrice: number;
  MenuItemId: number;
  MenuItemOptionSetMetadata: unknown[];
};

export type MenuItemOptionSetItem = {
  MenuItemOptionSetItemId: number;
  Name: string;
  Price: number;
  TaxRateId?: unknown;
  TaxRate?: unknown;
  TaxValue: number;
  IsAvailable: boolean;
  DisplayOrder: number;
  IsDeleted: boolean;
  Tags: unknown[];
  NextMenuItemOptionSetId?: (null | number)[];
  PublicId: string;
  ImageName: string | number;
  ImageUrl: string;
  CellAspectRatio: number;
  CellLayoutType: number;
  OptionSetItemMetadata: unknown[];
};

type MenuSectionAvailability = {
  MenuSectionId: number;
  AvailableTimes: AvailableTime[] | null;
  AvailabilityMode: number;
};

type AvailableTime = {
  BusinessHoursPeriodId: number;
  DayOfWeek: number;
  StartTime: string;
  Period: string;
  StartTimeEarly: string;
  PeriodEarly: string;
};

export type DisplayItem = {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  maxSelectCount: number;
};

export type Extra = {
  id: number;
  name: string;
  price: number;
};

export type TransformedMenuItems = {
  id: number;
  displayItems: DisplayItem[];
  extras: Extra[];
};

export type TransformedMenu = {
  MenuId: number;
  MenuVersionNumber: number;
  VersionGuid: string;
  MenuSections: TransformedMenuSection[];
  MenuSectionBehaviour: number;
  DisplaySectionLinks: boolean;
  ConcessionStores: unknown[];
};

type TransformedMenuSection = {
  MenuSectionId: number;
  Name: string;
  Description: string | null;
  DisplayOrder: number;
  MenuItems: TransformedMenuItems[];
  PublicId: string;
  IsDeleted: boolean;
  IsAvailable: boolean;
  IsHiddenFromUsers: boolean;
  ImageName: string;
  ImageUrl: string;
  CellAspectRatio: number;
  CellLayoutType: number;
  MenuSectionAvailability: MenuSectionAvailability;
  ConcessionStoreId?: unknown;
  MenuSectionMetadata: unknown[];
};
