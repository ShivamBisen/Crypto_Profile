'use client'



import React, { useState } from "react";
import { ethers } from "ethers";

export const Send = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [recipientAddress, setRecipientAddress] = useState('');
    const [amount, setAmount] = useState('');
    const [privateKey, setPrivateKey] = useState('');
    const [txHash, setTxHash] = useState("");

    const handleSend = async () => {
        try {
            const provider = ethers.getDefaultProvider("https://mainnet.infura.io/v3/c237870bdcf547de8b8e3df2e40b8cee");
            const wallet = new ethers.Wallet(privateKey, provider);
            const tx = {
                to: recipientAddress,
                value: ethers.parseEther(amount),
                gasLimit: 21000,
                gasPrice: ethers.parseUnits("10", "gwei")
            };

            const transactionResponse = await wallet.sendTransaction(tx);
            await transactionResponse.wait();
            setTxHash(transactionResponse.hash);
        } catch (error) {
            console.error("Transaction failed:", error);
        }
    };

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    return (
        <div>
            <button
                onClick={toggleModal}
                className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                type="button"
            >
                Send
            </button>

            {isModalOpen && (
                <div
                    id="authentication-modal"
                    aria-hidden={!isModalOpen}
                    className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
                >
                    <div className="relative p-4 w-full max-w-md max-h-full">
                        <div className="relative bg-white rounded-lg shadow">
                            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                                <h3 className="text-xl font-semibold text-gray-900">
                                    Send ETH
                                </h3>
                                <button
                                    type="button"
                                    onClick={toggleModal}
                                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center"
                                >
                                    <svg
                                        className="w-3 h-3"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 14 14"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                        />
                                    </svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                            </div>

                            <div className="p-4 h-[400px] md:p-5">
                                <div className="flex flex-col gap-3">
                                    <h2>Recipient Address</h2>
                                    <input
                                        onChange={(e) => setRecipientAddress(e.target.value)}
                                        type="text"
                                        className="w-full p-2 bg-transparent border rounded-md"
                                    />
                                    <h2>Amount</h2>
                                    <input
                                        onChange={(e) => setAmount(e.target.value)}
                                        type="text"
                                        className="w-full p-2 bg-transparent border rounded-md"
                                    />
                                    <h2>Your Private Key</h2>
                                    <input
                                        type="text"
                                        onChange={(e) => setPrivateKey(e.target.value)}
                                        className="w-full p-2 bg-transparent border rounded-md"
                                    />
                                    <button
                                        onClick={handleSend}
                                        className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                        type="button"
                                    >
                                        Confirm Transaction
                                    </button>
                                    {txHash && <p>Transaction Hash: {txHash}</p>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export const Receive = () => {
    // Step 1: State to manage modal visibility
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Step 2: Function to toggle modal visibility
    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    return (
        <div className="">
            {/* Toggle Button */}
            <button
                onClick={toggleModal} // Step 3: Toggle the modal on button click
                className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                type="button"
            >
                Receive
            </button>

            {/* Modal */}
            {isModalOpen && ( // Step 4: Conditional rendering based on modal state
                <div
                    id="authentication-modal"
                    aria-hidden={!isModalOpen}
                    className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
                >
                    <div className="relative p-4 w-full max-w-md max-h-full">
                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            {/* Modal Header */}
                            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                    still working on it
                                </h3>
                                <button
                                    type="button"
                                    onClick={toggleModal} // Close the modal
                                    className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                >
                                    <svg
                                        className="w-3 h-3"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 14 14"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                        />
                                    </svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                            </div>

                            {/* Modal Body */}
                            <div className="p-4 h-[400px] md:p-5">
                               
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
export const Swap = () => {
    // Step 1: State to manage modal visibility
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Step 2: Function to toggle modal visibility
    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    return (
        <div className="">
            {/* Toggle Button */}
            <button
                onClick={toggleModal} // Step 3: Toggle the modal on button click
                className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                type="button"
            >
                Swap
            </button>

            {/* Modal */}
            {isModalOpen && ( // Step 4: Conditional rendering based on modal state
                <div
                    id="authentication-modal"
                    aria-hidden={!isModalOpen}
                    className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
                >
                    <div className="relative p-4 w-full max-w-md max-h-full">
                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            {/* Modal Header */}
                            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                    still working on it
                                </h3>
                                <button
                                    type="button"
                                    onClick={toggleModal} // Close the modal
                                    className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                >
                                    <svg
                                        className="w-3 h-3"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 14 14"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                        />
                                    </svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                            </div>

                            {/* Modal Body */}
                            <div className="p-4 h-[400px] md:p-5">
                               
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
export const Buy = () => {
    // Step 1: State to manage modal visibility
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Step 2: Function to toggle modal visibility
    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    return (
        <div className="">
            {/* Toggle Button */}
            <button
                onClick={toggleModal} // Step 3: Toggle the modal on button click
                className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                type="button"
            >
                Buy
            </button>

            {/* Modal */}
            {isModalOpen && ( // Step 4: Conditional rendering based on modal state
                <div
                    id="authentication-modal"
                    aria-hidden={!isModalOpen}
                    className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
                >
                    <div className="relative p-4 w-full max-w-md max-h-full">
                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            {/* Modal Header */}
                            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                    still working on it
                                </h3>
                                <button
                                    type="button"
                                    onClick={toggleModal} // Close the modal
                                    className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                >
                                    <svg
                                        className="w-3 h-3"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 14 14"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                        />
                                    </svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                            </div>

                            {/* Modal Body */}
                            <div className="p-4 h-[400px] md:p-5">
                               
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};