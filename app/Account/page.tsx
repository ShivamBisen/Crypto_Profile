'use client'

import { useEffect, useState } from "react";
import { Buy, Receive, Send, Swap } from "../components/Toggle";
import { useStake } from "../State/Hooks";
import { mnemonicToSeedSync } from "bip39";
import { hdkey } from "ethereumjs-wallet";
import axios from "axios";

type Tab = "Account 1" | "Account 2" | "Account 3";
const tabs: Tab[] = ["Account 1", "Account 2", "Account 3"];

const WalletComponent = () => {
    const [tab, setTab] = useState<Tab>("Account 1");
    const [mnemonic, setMnemonic] = useStake();
    const [publicKeys, setPublicKeys] = useState<string[]>([]);
    const [balance, setBalance] = useState<number>(0);

    const seed = mnemonicToSeedSync(mnemonic.toString());
    const hdwallet = hdkey.fromMasterSeed(seed);

    const addWallet = () => {
        const path = `m/44'/60'/0'/0/${publicKeys.length}`;
        const wallet = hdwallet.derivePath(path).getWallet();
        const ethPublicKey = wallet.getAddressString();
        setPublicKeys(prev => [...prev, ethPublicKey]);
    };

    useEffect(() => {
        const generateInitialKey = async () => {
            const path = "m/44'/60'/0'/0/0";
            const wallet = hdwallet.derivePath(path).getWallet();
            const ethPublicKey = wallet.getAddressString();
            setPublicKeys([ethPublicKey]);
        };

        const getBalance = async (publicKey: string) => {
            try {
                const response = await axios.post('https://eth-mainnet.g.alchemy.com/v2/C4MFdUO-LStFpj6R7CLQt47wZ0yMLcsO', {
                    "jsonrpc": "2.0",
                    "id": 1,
                    "method": "eth_getBalance",
                    "params": [publicKey, "latest"]
                });
        
                const hexBalance = response.data.result;
                const decimalBalance = parseInt(hexBalance, 16);
                const etherBalance = decimalBalance / 10 ** 18;
                setBalance(etherBalance);
            } catch (error) {
                console.error("Error fetching balance:", error);
            }
        };

        if (publicKeys.length > 0) {
            getBalance(publicKeys[0]);  // Assuming you're showing balance for the first account
        } else {
            generateInitialKey();
        }
    }, [mnemonic, publicKeys]);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(publicKeys[0]);
        alert("Public key copied to clipboard!");
    };

   
        <div className="">
            <div className="flex flex-col items-center gap-4 justify-between p-24">
                <div className="flex">
                    <div className="flex flex-col border-r">
                        <h1 className="text-2xl font-bold mb-4">Your Wallet</h1>
                        <div className="border-t">
                            <div className="flex justify-between mt-4 w-[300px]">
                                <h2 className="text-xl font-bold">Wallets</h2>
                                <button 
                                    type="button" 
                                    onClick={addWallet}
                                    className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                                >
                                    Add Wallet
                                </button>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="flex flex-col gap-2">
                                {publicKeys.map((key, index) => {
                                    return(
                                        <div className="flex justify-between items-center gap-2">
                                        <p key={index} className="font-mono text-lg">
                                    {publicKeys[index] ? `${publicKeys[index].slice(0, 6)}...${publicKeys[index].slice(-6)}` : ""}
                                </p>
                                    <button 
                                    onClick={copyToClipboard} 
                                    className="text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-1.5"
                                >
                                    Copy
                                </button>
                            </div>
                                    )
                                })}
                                </div>
                                
                            </div>
                        </div>
                    </div>

                    <div className="border-l">
                        <h1 className="text-2xl p-2 font-bold border-b">Account 1</h1>
                        <div className="">
                            <div className="h-[400px] flex justify-center items-center">
                                <p className="text-4xl">{balance.toFixed(7)} ETH</p>
                            </div>
                            <div className="flex justify-center items-center gap-4 p-2">
                                <Send />
                                <Receive />
                                <Swap />
                                <Buy />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default WalletComponent;
