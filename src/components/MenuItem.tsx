import { DisplayItem, TransformedMenuItems } from "@/utils/types/menu";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Popover, PopoverTrigger } from "./ui/popover";

type MenuItemProps = {
  item: TransformedMenuItems;
};

function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-UK", {
    style: "currency",
    currency: "GBP",
  }).format(price);
}

export function MenuItem({ item }: MenuItemProps) {
  return item.displayItems.map((displayItem: DisplayItem) => (
    <Card>
      <CardHeader>
        <CardTitle>{displayItem.name}</CardTitle>
        <CardDescription>{formatPrice(displayItem.price)}</CardDescription>
      </CardHeader>
      <CardContent className="self-center">
        <img
          src={displayItem.imageUrl}
          alt={displayItem.name}
          className="aspect-square w-full max-w-28 self-center rounded-lg object-cover object-center"
        />
      </CardContent>
      <CardFooter className="self-center">
        {" "}
        <CardDescription className="max-w-[20em] self-center text-center">
          {displayItem.description}
        </CardDescription>
        {item.extras.length > 0 && (
          <Popover>
            <PopoverTrigger asChild>
              <button className="hover:cursor-pointer">Add</button>
            </PopoverTrigger>
          </Popover>
        )}
      </CardFooter>
    </Card>
  ));
}
