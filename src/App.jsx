import { useState } from 'react'
import './App.css'
import { generateMnemonic } from 'bip39';
import { SolanaWallet } from './components/SolanaWallet';
import { EthWallet } from './components/EthWallet';

function App() {
  const [mnemonic, setMnemonic] = useState("");

  return (
    <>
    <button onClick={ async () => {
      const mn = await generateMnemonic();
      setMnemonic(mn);
    }}>
      Create Seed Phrase
    </button>
    <p>{mnemonic}</p>
    <div style={{ display: "flex", justifyContent: 'space-between'}}>
    <SolanaWallet mnemonic={mnemonic} />
    <EthWallet mnemonic={mnemonic}/>
    </div>
    </>
  )
}

export default App
