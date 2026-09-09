import { createContext, useState } from "react";

export const SelectionContext = createContext();

export function SelectionProvider({ children }) {
    const [language, setLanguage] = useState("");
    const [level, setLevel] = useState("");

    return (
        <SelectionContext.Provider value={{ language, setLanguage, level, setLevel }}>
            {children}
        </SelectionContext.Provider>
    );
}
