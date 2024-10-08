'use client';

import { useEffect, useState } from "react";
import { Buy, Receive, Send, Swap } from "../components/Toggle";
import { useStake } from "../State/Hooks";
import { Keypair, PublicKey, Connection, LAMPORTS_PER_SOL } from "@solana/web3.js";
import * as bip39 from "bip39";
import { derivePath } from "ed25519-hd-key"; // Solana uses ed25519 key derivation

type Tab = "Account 1" | "Account 2" | "Account 3";
const tabs: Tab[] = ["Account 1", "Account 2", "Account 3"];

const WalletComponent = () => {
    const [tab, setTab] = useState<number>(0);
    const [mnemonic, setMnemonic] = useStake();
    const [publicKeys, setPublicKeys] = useState<string[]>([]);
    const [balance, setBalances] = useState<number[]>([]);

    const seed = bip39.mnemonicToSeedSync(mnemonic.toString());
    
    const deriveSolanaKeypair = (index: number) => {
        const path = `m/44'/501'/0'/${index}'`;
        const derivedSeed = derivePath(path, seed.toString('hex')).key;
        const keypair = Keypair.fromSeed(derivedSeed);
        return keypair;
    };

    const addWallet = () => {
        const keypair = deriveSolanaKeypair(publicKeys.length);
        const solPublicKey = keypair.publicKey.toString();
        setPublicKeys(prev => [...prev, solPublicKey]);
        console.log("Public Key:", solPublicKey);
    };

    useEffect(() => {
        const generateInitialKey = () => {
            const keypair = deriveSolanaKeypair(0);
            const solPublicKey = keypair.publicKey.toString();
            const solSecretKey = Buffer.from(keypair.secretKey).toString('hex');
            setPublicKeys([solPublicKey]);
            console.log("Public Key:", solPublicKey);
          

        };

        const getBalance = async (publicKey: string) => {
            const connection = new Connection("https://solana-mainnet.g.alchemy.com/v2/sleiRD8-KgsQ_uHYmWkD095z6E8wmSaP");
            const balance = await connection.getBalance(new PublicKey(publicKey));
            return balance / LAMPORTS_PER_SOL;
        };

        const fetchBalances = async () => {
            const balancePromises = publicKeys.map(pk => getBalance(pk));
            const fetchedBalances = await Promise.all(balancePromises);
            setBalances(fetchedBalances);
        };

        if (publicKeys.length > 0) {
            fetchBalances();
        } else {
            generateInitialKey();
        }
    }, [mnemonic, publicKeys]);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(publicKeys[tab]);
        alert("Public key copied to clipboard!");
    };

    return (
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
                                <div className="flex flex-col gap-2 cursor-pointer">
                                    {publicKeys.map((key, index) => {
                                        return(
                                            <div key={index} className="flex justify-between items-center gap-2">
                                                <div onClick={() => setTab(index)} className={`font-mono text-lg ${tab === index ? 'font-bold' : ''}`}>
                                                    {publicKeys[index] ? `${publicKeys[index].slice(0, 6)}...${publicKeys[index].slice(-6)}` : ""}
                                                </div>
                                                <button 
                                                    onClick={copyToClipboard} 
                                                    className="text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-1.5"
                                                >
                                                    Copy
                                                </button>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="border-l">
                        <h1 className="text-2xl p-2 font-bold border-b">{tabs[tab]}</h1>
                        <div className="">
                            <div className="h-[400px] flex justify-center items-center">
                                <p className="text-4xl">{balance[tab]?.toFixed(7)} SOL</p>
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
