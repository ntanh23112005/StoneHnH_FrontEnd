import { createContext, useState } from 'react';

export const PriceContext = createContext();

export const PriceWrapper = ({ props }) => {
    const [showBeforeTax, setShowBeforeTax] = useState(false);

    return (
        <PriceContext.Provider value={{ showBeforeTax, setShowBeforeTax }}>
            {props}
        </PriceContext.Provider>
    );
};

// export const usePriceContext = () => useContext(PriceContext)
