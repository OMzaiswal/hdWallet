import { mnemonicToSeed } from "bip39";
import { useState } from "react";
import { derivePath } from "ed25519-hd-key"
import { Keypair } from "@solana/web3.js"
import nacl from "tweetnacl";
import axios from "axios";


export function SolanaWallet({ mnemonic }) {
    const [ currentIndex, setCurrentIndex ] = useState(0);
    const [ publicKeys, setPublicKeys ] = useState([]);
    const [ balance, setBalance ] = useState('__');

    const displayBal = (bal) => {
        <p>{bal} SOL</p>
    }

    return <div>
        <button onClick={ async () => {
            const seed = await mnemonicToSeed(mnemonic);
            const derivationPath = `m/44'/501'/${currentIndex}'/0'`;
            const derivedSeed = derivePath(derivationPath, seed.toString("hex")).key;
            const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
            const keypair = Keypair.fromSecretKey(secret);
            setCurrentIndex(currentIndex + 1);
            setPublicKeys([...publicKeys, keypair.publicKey]);
        }}>
            Add Solana Wallet
        </button>
        <div>
            {publicKeys.map(p => 
                <div style={{ display: "flex"}}>
                    <div>{p.toBase58()}</div>
                    <button onClick={ async () => {
                        const response = await axios.post('https://solana-mainnet.g.alchemy.com/v2/4e2GZzAHXiBTaK01OQzlJZnfxJnt-wFV',{
                            "jsonrpc":"2.0",
                            "id":1,
                            "method":"getBalance",
                            "params":["HG7mYp33mY1pQbrnbiGSPCwVYdoJFYrACr2ZwRRLmWrv"]
                        }, {
                            headers: {
                                "Content-Type": "text/plain"
                            }
                        })
                        setBalance(JSON.stringify(response.data.result.value))
                        console.log(balance);
                    }}>Check Balance</button> 
                    <input value={`${balance} SOL`}></input>
                    
                </div>
            )}
        </div>
    </div>
}