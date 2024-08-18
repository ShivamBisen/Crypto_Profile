import { useState } from 'react';

// Create a custom hook for the stake state
export const useStake = () => {
    const [mnemonic, setMnemonic] = useState([]);

    return [mnemonic, setMnemonic]
};
