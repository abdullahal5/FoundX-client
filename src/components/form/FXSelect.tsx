import { Select, SelectItem } from "@nextui-org/react";
import { useFormContext } from "react-hook-form";

import { IInput } from "@/src/types";

interface IProps extends IInput {
  options: {
    key: string;
    label: string;
  }[];
}

const FXSelect = ({
  options,
  label,
  name,
  variant = "bordered",
  disabled,
}: IProps) => {
  const { register } = useFormContext();

  return (
    <Select
      {...register(name)}
      className="min-w-full sm:min-w-[225px]"
      isDisabled={disabled}
      label={label}
      variant={variant}
    >
      {options.map((option) => (
        <SelectItem key={option.key} className="min-w-full sm:min-w-[225px]">
          {option.label}
        </SelectItem>
      ))}
    </Select>
  );
};

export default FXSelect;
