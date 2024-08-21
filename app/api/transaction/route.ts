import { ethers } from "ethers";

export async function POST(request: any) {
    const body = await request.json();
    
    // Extracting required fields from the request body
    const { recipientAddress, amount } = body;
    
    // Corrected provider initialization
    const provider = ethers.getDefaultProvider("https://mainnet.infura.io/v3/c237870bdcf547de8b8e3df2e40b8cee");

    // Creating a new wallet instance
    const wallet = new ethers.Wallet('0xabf82ff96b463e9d82b83cb9bb450fe87e6166d4db6d7021d0c71d7e960d5abe', provider);

    // Setting up the transaction object
    const tx = {
        to: recipientAddress,
        value: ethers.parseEther(amount), // Ensure 'amount' is a string or number
        gasLimit: 21000,
        gasPrice: ethers.parseUnits("10", "gwei") 
    };

    try {
        // Sending the transaction
        const transactionResponse = await wallet.sendTransaction(tx);

        // Waiting for the transaction to be mined
        await transactionResponse.wait();

        // Returning the transaction hash as a response
        return new Response(JSON.stringify({ txHash: transactionResponse.hash }), { status: 200 });
    } catch (error) {
        // Handling errors
        return new Response(JSON.stringify({ error: error }), { status: 500 });
    }
}
