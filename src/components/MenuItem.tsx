import { useForm, FormProvider } from "react-hook-form";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  DialogHeader,
  DialogFooter,
} from "./ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { DisplayItem, TransformedMenuItems } from "@/utils/types/menu";
import { ExtrasDialog } from "./ExtrasDialog";
import { formatPrice } from "@/utils/formatters";

type MenuItemProps = {
  item: TransformedMenuItems;
};

export function MenuItem({ item }: MenuItemProps) {
  const methods = useForm();
  const { watch, reset } = methods;

  const formValues = watch("extras") ?? {};

  function handleDialogChange(open: boolean) {
    if (!open) reset();
  }

  const selectedExtras = Object.values(formValues).filter(
    (value) => value !== false,
  );

  const extrasTotalPrice = item.extras.reduce((total, extra) => {
    return total + (formValues[`extra_${extra.id}`] ? extra.price : 0);
  }, 0);

  return item.displayItems.map((displayItem: DisplayItem) => {
    const maxSelected = selectedExtras.length === displayItem.maxSelectCount;

    return (
      <FormProvider key={displayItem.id} {...methods}>
        <Card className="h-full">
          <CardHeader>
            <CardTitle>{displayItem.name}</CardTitle>
            <CardDescription>{formatPrice(displayItem.price)}</CardDescription>
          </CardHeader>
          <CardContent className="self-center flex-1">
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
              <Dialog onOpenChange={handleDialogChange}>
                <DialogTrigger asChild>
                  <Button className="self-end hover:cursor-pointer">Add</Button>
                </DialogTrigger>
                <DialogContent>
                  <form>
                    <DialogHeader className="mb-4">
                      <DialogTitle>{displayItem.name}</DialogTitle>
                    </DialogHeader>
                    <div className="mb-4 grid gap-4">
                      <h4 className="font-medium">Extras:</h4>
                      <div className="grid gap-2">
                        {item.extras.map((extra) => (
                          <ExtrasDialog
                            key={extra.id}
                            extra={extra}
                            maxSelected={maxSelected}
                            checked={formValues[`extra_${extra.id}`]}
                          />
                        ))}
                      </div>
                      {maxSelected && (
                        <p className="text-red-700">
                          Maximum number of extras ({displayItem.maxSelectCount}
                          ) reached
                        </p>
                      )}
                    </div>
                    <DialogFooter className="w-full">
                      <Button className="w-full" type="submit">
                        Add for{" "}
                        {formatPrice(displayItem.price + extrasTotalPrice)}
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            )}
          </CardFooter>
        </Card>
      </FormProvider>
    );
  });
}
