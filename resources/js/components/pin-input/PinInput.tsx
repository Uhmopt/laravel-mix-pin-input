import React, {
    FC,
    PropsWithChildren,
    useEffect,
    useMemo,
    useState,
} from "react";
import PinInputDigit from "./PinInputDigit";
import { PIN_INPUT_TYPES } from "./inputTypes";

const PinInput: FC<
    PropsWithChildren<{
        digit?: number;
        value?: string;
        onChange?: (p: string) => void;
        onFilled?: (p: string) => void;
        inputFormat?: RegExp;
        isSecret?: boolean;
    }>
> = ({
    digit = 4,
    value: propsValue = "",
    onChange = () => null,
    onFilled = () => null,
    inputFormat = PIN_INPUT_TYPES.NUMBER,
    isSecret = false,
}) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [digits, setDigits] = useState<Array<string>>([]);
    const inputted = useMemo(() => digits.join(""), [JSON.stringify(digits)]);

    const handleFillDigit = (value: string, index: number) => {
        setDigits((s = []) => {
            value.split("").forEach((c, cIndex) => {
                if (index + cIndex < digit) {
                    s[index + cIndex] = c;
                }
            });
            return s;
        });
        setCurrentIndex((s = 0) => Math.min(s + value.length, digit));
    };

    const handleDelete = (index: number) => {
        setDigits((s = []) => {
            s[index] = "";
            return s;
        });
    };

    const handleBack = (index: number) => {
        handleDelete(index);
        setCurrentIndex((s = 0) => Math.max(0, s - 1));
    };

    const handleClick = (index: number) => {
        setCurrentIndex(index);
    };

    useEffect(() => {
        if (inputted === propsValue) {
            //
        } else {
            onChange(inputted.substring(0, digit));
            if (inputted.length >= digit) {
                onFilled(inputted.substring(0, digit));
            }
        }
    }, [inputted]);

    useEffect(() => {
        setDigits(
            Array.from({ length: digit }, (v, k) => propsValue?.[k] ?? "")
        );
    }, [digit, propsValue]);

    return (
        <div className="flex gap-6 justify-center items-center">
            {digits.map((k, kIndex) => (
                <PinInputDigit
                    key={`input_digit_${kIndex}_${JSON.stringify(digits)}`}
                    digit={k}
                    onFill={(p: string) => handleFillDigit(p, kIndex)}
                    onDelete={() => handleDelete(kIndex)}
                    onBack={() => handleBack(kIndex)}
                    inputFormat={inputFormat}
                    hasFocus={currentIndex === kIndex}
                    onClick={() => handleClick(kIndex)}
                    isSecret={isSecret}
                />
            ))}
        </div>
    );
};

export default PinInput;
