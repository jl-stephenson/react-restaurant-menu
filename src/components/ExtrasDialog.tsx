import { useFormContext } from "react-hook-form";
import { formatPrice } from "@/utils/formatters";
import { Extra } from "@/utils/types/menu";

type ExtrasDialogProps = {
  extra: Extra;
  maxSelected: boolean;
  checked: boolean;
};

export function ExtrasDialog({ extra, maxSelected, checked }: ExtrasDialogProps) {
  const { register } = useFormContext();
  const isDisabled = maxSelected && !checked;

  return (
    <div className="flex items-center justify-between">
      <label htmlFor={extra.name}>
        {`${extra.name} (+${formatPrice(extra.price)})`}
      </label>
      <input
        {...register(`extras.extra_${extra.id}`)}
        id={extra.name}
        type="checkbox"
        disabled={isDisabled}
      />
    </div>
  );
}
