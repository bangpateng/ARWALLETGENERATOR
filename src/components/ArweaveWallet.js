import React, { useState } from 'react';
import Arweave from 'arweave';
import { ethers } from 'ethers';
import './ArweaveWallet.css';

const ArweaveWallet = () => {
  const [address, setAddress] = useState('');
  const [seedPhrase, setSeedPhrase] = useState('');
  const [walletFile, setWalletFile] = useState(null);

  const generateWallet = async () => {
    const arweave = Arweave.init();
    const wallet = ethers.Wallet.createRandom();
    const mnemonic = wallet.mnemonic.phrase;

    const arweaveWallet = await arweave.wallets.generate();
    const address = await arweave.wallets.jwkToAddress(arweaveWallet);

    setAddress(address);
    setSeedPhrase(mnemonic);
    setWalletFile(new Blob([JSON.stringify(arweaveWallet)], { type: 'application/json' }));
  };

  const downloadWallet = () => {
    const url = URL.createObjectURL(walletFile);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'arweave_wallet.json';
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  return (
    <div className="wallet-container">
      <div className="header">
        <img src="/bgpateng.png" alt="Profile" className="profile-image" />
        <h1>GENERATE AR WALLET</h1>
      </div>
      <button className="generate-btn" onClick={generateWallet}>Generate</button>
      {address && (
        <div className="wallet-info">
          {/* Your Address Section */}
          <div className="info-section">
            <h3>Your Address:</h3>
            <span onClick={() => copyToClipboard(address)} style={{ cursor: 'pointer', color: 'blue' }}>
              {address}
            </span>
          </div>

          {/* Seed Phrase Section */}
          <div className="info-section">
            <h3>Seed Phrase:</h3>
            <span onClick={() => copyToClipboard(seedPhrase)} style={{ cursor: 'pointer', color: 'blue' }}>
              {seedPhrase}
            </span>
          </div>

          <button className="download-btn" onClick={downloadWallet}>Download Json Wallet</button>
        </div>
      )}
<footer>
  <p>Created By : <a href="https://t.me/bangpateng_airdrop" target="_blank" rel="noopener noreferrer">Bang Pateng</a></p>
</footer>
    </div>
  );
};

const copyToClipboard = (text) => {
  navigator.clipboard.writeText(text)
    .then(() => alert('Copied to clipboard!'))
    .catch(err => console.error('Error copying text: ', err));
};

export default ArweaveWallet;
