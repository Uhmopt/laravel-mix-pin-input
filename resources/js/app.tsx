import React from "react";
import { createRoot } from "react-dom/client";
import Container from "./components/layout/container";
import PinInputPage from "./pages/pin-input";

function App() {
    return (
        <Container verticalCenter>
            <PinInputPage />
        </Container>
    );
}

const rootElement = document.getElementById("root");

if (rootElement) {
    const root = createRoot(rootElement);
    root.render(<App />);
}
