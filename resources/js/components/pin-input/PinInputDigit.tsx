import React, {
    ChangeEventHandler,
    FC,
    KeyboardEventHandler,
    MouseEventHandler,
    PropsWithChildren,
    useEffect,
    useMemo,
    useRef,
} from "react";
import { PIN_INPUT_TYPES } from "./inputTypes";

const PinInputDigit: FC<
    PropsWithChildren<{
        digit?: string;
        onFill?: (p: string) => void;
        onDelete?: () => void;
        onBack?: () => void;
        inputFormat?: RegExp;
        hasFocus?: boolean;
        onClick?: MouseEventHandler<HTMLInputElement>;
        isSecret?: boolean;
    }>
> = ({
    digit: digitValue = "",
    onFill = () => null,
    onDelete = () => null,
    onBack = () => null,
    inputFormat = PIN_INPUT_TYPES.NUMBER,
    hasFocus = false,
    onClick,
    isSecret = false,
}) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const placeholder = useMemo(
        () => Math.floor(Math.random() * 10).toString(),
        []
    );

    const formattedValue = useMemo(
        () =>
            digitValue
                .split("")
                .filter((c) => inputFormat.test(c) || !c)
                .slice(0, 1)
                .join(""),
        [digitValue]
    );

    const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
        if (e.key === "Backspace") {
            if (!formattedValue) {
                onBack();
            }
        }
    };

    const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        const newValue = (e.target?.value ?? "")
            .split("")
            .filter((c) => inputFormat.test(c) || !c)
            .join("");

        if (newValue.length > 0) {
            onFill(newValue);
        } else {
            onDelete();
        }
    };

    useEffect(() => {
        if (hasFocus) {
            if (inputRef.current) {
                inputRef.current.focus();
            }
        }
    }, [hasFocus]);

    return (
        <input
            ref={inputRef}
            value={formattedValue}
            onKeyDown={handleKeyDown}
            onChange={handleChange}
            onClick={onClick}
            className="pin-input-digit"
            placeholder={placeholder}
            type={isSecret ? "password" : "text"}
        />
    );
};

export default PinInputDigit;
