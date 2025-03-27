import { formatPrice } from "@/utils/formatters";
import { Extra } from "@/utils/types/menu";

type ExtrasDialogProps = {
  extra: Extra;
};

export function ExtrasDialog({ extra }: ExtrasDialogProps) {
  return (
    <div className="flex items-center justify-between">
      <label htmlFor={extra.name}>
        {`${extra.name} (+${formatPrice(extra.price)})`}
      </label>
      <input id={extra.name} type="checkbox" />
    </div>
  );
}
