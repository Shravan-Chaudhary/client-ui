import React from "react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { CustomizationOption } from "@/types";

type PropTypes = {
    options: CustomizationOption[];
    defaultValue: string;
};

const OptionSelector: React.FC<PropTypes> = ({ options, defaultValue }) => {
    return (
        <RadioGroup defaultValue={defaultValue} className="grid grid-cols-3 gap-4">
            {options.map((option) => {
                return (
                    <div className="rounded-2xl bg-white" key={option.value}>
                        <RadioGroupItem
                            value={option.value}
                            id={option.value}
                            className="peer sr-only"
                            aria-label={option.label}
                        />
                        <Label
                            htmlFor={option.value}
                            className="flex flex-col items-center justify-between rounded-2xl border-2 bg-transparent p-4 hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                        >
                            {option.label}
                        </Label>
                    </div>
                );
            })}
        </RadioGroup>
    );
};

export default OptionSelector;
