import { mnemonicToSeed } from "bip39";
import { useState } from "react";
import { Wallet, HDNodeWallet } from "ethers";
import axios from "axios";

export function EthWallet({ mnemonic }) {
    const [ currentIndex, setCurrentIndex ] = useState(0);
    const [ publicKeys, setPublicKeys ] = useState([]);
    const [ bal, setBal ] = useState('');

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
                    <button onClick={ async () => {
                        const response = await axios.post('https://eth-mainnet.g.alchemy.com/v2/4e2GZzAHXiBTaK01OQzlJZnfxJnt-wFV', {
                            "jsonrpc":"2.0",
                            "id":1,
                            "method":"eth_getBalance",
                            "params":["0x6a7349e2F6ed13637aA55455AF4295161FC3Fda2","latest"]
                        }, {
                            headers: {
                                "Content-Type": "text/plain"
                            }
                        })
                        // console.log(JSON.stringify(response.data.result));
                        setBal(JSON.stringify(response.data.result))
                        console.log(bal);
                    }}>Check Balance</button> 
                    <p>{bal} Ether</p>
                </div>
            )}
        </div>
    </div>
)
}