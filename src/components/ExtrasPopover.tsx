import { formatPrice } from "@/utils/formatters";
import { Extra } from "@/utils/types/menu";

type ExtrasPopoverProps = {
  extra: Extra;
};

export function ExtrasPopover({ extra }: ExtrasPopoverProps) {
  return (
    <div className="flex items-center justify-between">
      <label htmlFor={extra.name}>
        {`${extra.name} (+${formatPrice(extra.price ?? 0)})`}
      </label>
      <input id={extra.name} type="checkbox" />
    </div>
  );
}
