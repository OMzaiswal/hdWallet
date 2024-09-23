import { mnemonicToSeed } from "bip39";
import { useState } from "react";
import { derivePath } from "ed25519-hd-key"
import { Keypair } from "@solana/web3.js"
import nacl from "tweetnacl";
import axios from "axios";


export function SolanaWallet({ mnemonic }) {
    const [ currentIndex, setCurrentIndex ] = useState(0);
    const [ publicKeys, setPublicKeys ] = useState([]);

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
                        
                    }}>Check Balance</button> 
                </div>
            )}
        </div>
    </div>
}