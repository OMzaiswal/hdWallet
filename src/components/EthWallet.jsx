import { mnemonicToSeed } from "bip39";
import { useState } from "react";
import { Wallet, HDNodeWallet } from "ethers";


export function EthWallet({ mnemonic }) {
    const [ currentIndex, setCurrentIndex ] = useState(0);
    const [ publicKeys, setPublicKeys ] = useState([]);

    return (
    <div>
        <button onClick={ async () => {
            const seed = await mnemonicToSeed(mnemonic);
            const derivationPath = `m/44'/60'/${currentIndex}'/0'`;
            const hdNode = HDNodeWallet.fromSeed(seed);
            const child = hdNode.derivePath(derivationPath);
            const privateKey = child.privateKey;
            const wallet = new Wallet(privateKey);
            setCurrentIndex(currentIndex + 1);
            setPublicKeys([...publicKeys, wallet.address]);
        }}>
            Add ETH Wallet
        </button>
        <div>
            { publicKeys.map(p => 
                <div style={{ display: "flex" }}> 
                    <div>Eth - {p}</div>
                    <button>Check Balance</button> 
                </div>
            )}
        </div>
    </div>
)
}