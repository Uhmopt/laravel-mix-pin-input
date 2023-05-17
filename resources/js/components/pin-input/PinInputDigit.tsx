import React, { FC, PropsWithChildren } from "react";

const PinInputDigit: FC<
    PropsWithChildren<{ value?: string; onFill?: (p: string) => void }>
> = ({ value = "", onFill = () => null }) => {
    return <div>{value}</div>;
};

export default PinInputDigit;
