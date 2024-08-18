'use client';
import { generateMnemonic, mnemonicToSeedSync } from "bip39";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useStake } from "../State/Hooks";

export const Createwallet = () => {
    const [mnemonic, setMnemonic] = useStake();
    const [mnemonicCreated, setMnemonicCreated] = useState(false);
    const router = useRouter();
    const create_Mnemonic =()=>{
        const Mnemonic = generateMnemonic();
        const Mnemonic_Array = Mnemonic.split(" ");
        
        setMnemonic(Mnemonic_Array);
        setMnemonicCreated(true);

    }
    const getAccount = () => {
        router.push("/Account");
        
    }
    return(
        <div className="">
            <div className="flex flex-col items-center gap-4 justify-between p-24">
                <h1 className="text-3xl font-bold">Create Wallet</h1>     
                <p className="text-lg">Create a new wallet to start using the app</p>
                <div className="flex flex-wrap gap-4 justify-center items-center w-[400px]">
                    {mnemonic.map((words,index)=>{
                        return(
                            <div key={index} className=" w-[120px] h-[40px] flex items-center justify-center rounded-lg bg-gray-700">
                                <p className="text-2xl">{words}</p>
                            </div>
                            )
                    })}
                </div>
                {!mnemonicCreated?<button onClick={create_Mnemonic} className="bg-blue-500 text-white p-2 w-96 rounded-md mt-4">Create Wallet</button>:
                <button onClick={getAccount} className="bg-blue-500 text-white p-2 w-96 rounded-md mt-4">Proceed</button> }
                
            </div>
        </div>
    )
} 