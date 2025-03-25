import { DisplayItem, TransformedMenuItems } from "@/utils/types/menu";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { ExtrasPopover } from "./ExtrasPopover";
import { formatPrice } from "@/utils/formatters";
import { Button } from "./ui/button";

type MenuItemProps = {
  item: TransformedMenuItems;
};

export function MenuItem({ item }: MenuItemProps) {
  return item.displayItems.map((displayItem: DisplayItem) => (
    <Card key={displayItem.id}>
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
      <CardFooter className="w-full flex-col gap-3 self-center">
        <CardDescription className="max-w-[20em] self-center text-center">
          {displayItem.description}
        </CardDescription>
        {item.extras.length === 0 ? (
          <Button className="self-end hover:cursor-pointer">Add</Button>
        ) : (
          <Popover>
            <PopoverTrigger asChild>
              <Button className="self-end hover:cursor-pointer">Extras</Button>
            </PopoverTrigger>
            <PopoverContent>
              <div className="grid gap-4">
                <h4 className="font-medium">Extras:</h4>
                <div className="grid gap-2">
                  {item.extras.map((extra) => (
                    <ExtrasPopover key={extra.id} extra={extra} />
                  ))}
                </div>
              </div>
            </PopoverContent>
          </Popover>
        )}
      </CardFooter>
    </Card>
  ));
}
