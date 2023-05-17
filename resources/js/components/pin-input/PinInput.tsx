import React, {
    FC,
    PropsWithChildren,
    useEffect,
    useMemo,
    useState,
} from "react";
import PinInputDigit from "./PinInputDigit";

const PinInput: FC<
    PropsWithChildren<{
        digit?: number;
        value?: string;
        onChange?: (p: string) => void;
    }>
> = ({ digit = 4, value: propsValue = "", onChange = () => null }) => {
    const [digits, setDigits] = useState<Array<string>>([]);
    const inputted = useMemo(() => digits.join(""), [digits]);

    const handleFillDigit = (value: string, index: number) => {
        setDigits((s = []) => {
            s[index] = value;
            return s;
        });
    };

    useEffect(() => {
        setDigits(propsValue.split(""));
    }, [propsValue]);

    useEffect(() => {
        if (inputted === propsValue) {
            //
        } else {
            onChange(inputted.substring(0, digit));
        }
    }, [inputted]);

    return (
        <div className="flex gap-2 justify-center items-center">
            {Array.from({ length: digit }, (v, k) => k).map((k, kIndex) => (
                <div key={kIndex}>
                    <PinInputDigit
                        value={digits?.[kIndex] ?? ""}
                        onFill={(p: string) => handleFillDigit(p, kIndex)}
                    />
                </div>
            ))}
        </div>
    );
};

export default PinInput;
