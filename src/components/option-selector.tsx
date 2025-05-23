import React from "react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";

type PropTypes = {
    options: string[];
    defaultValue: string;
};

const OptionSelector: React.FC<PropTypes> = ({ options, defaultValue }) => {
    return (
        <RadioGroup defaultValue={defaultValue} className="grid grid-cols-3 gap-4">
            {options.map((option) => {
                return (
                    <div className="max-w-40 rounded-2xl bg-white" key={option}>
                        <RadioGroupItem value={option} id={option} className="peer sr-only" aria-label={option} />
                        <Label
                            htmlFor={option}
                            className="sm: flex max-w-40 flex-col items-center justify-between rounded-xl border-2 bg-transparent p-2 py-3 hover:text-accent-foreground peer-data-[state=checked]:border-primary sm:rounded-2xl sm:p-4 [&:has([data-state=checked])]:border-primary"
                        >
                            {option}
                        </Label>
                    </div>
                );
            })}
        </RadioGroup>
    );
};

export default OptionSelector;
