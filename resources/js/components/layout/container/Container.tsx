import React, { FC, PropsWithChildren } from "react";

const Container: FC<PropsWithChildren<{ fullWidth?: boolean, verticalCenter?: boolean }>> = ({
    children = null,
    fullWidth = false,
    verticalCenter = false
}) => {
    return fullWidth ? <div className={` ${verticalCenter ? ' flex flex-col items-stretch justify-center' : ''}`}>{children}</div> : <div className={`container ${verticalCenter ? ' flex flex-col items-stretch justify-center' : ''}`}>{children}</div>;
};

export default Container;
