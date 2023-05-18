import React, { useState } from "react";
import PinInput from "../../components/pin-input";

const PinInputPage = () => {
    const [isSecret, setIsSecret] = useState(false);

    const handleFilled = (value = "") => {
        alert(value);
    };

    return (
        <div>
            <h4 className="text-center">Default</h4>
            <PinInput isSecret={isSecret} onFilled={handleFilled} />
            <br />
            <h4 className="text-center">Default Value: 4567</h4>
            <PinInput
                value="4567"
                isSecret={isSecret}
                onFilled={handleFilled}
            />
            <br />
            <div className="flex justify-center">
                <button onClick={() => setIsSecret((s = false) => !s)}>
                    {isSecret ? "show" : "hide"}
                </button>
            </div>
        </div>
    );
};

export default PinInputPage;
