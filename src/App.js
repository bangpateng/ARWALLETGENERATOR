import React from 'react';
import './App.css';
import ArweaveWallet from './components/ArweaveWallet';
import { HashRouter } from 'react-router-dom';  // Mengimpor HashRouter

function App() {
  return (
    <HashRouter> {/* Membungkus aplikasi dengan HashRouter */}
      <div className="App">
        <ArweaveWallet />
      </div>
    </HashRouter>
  );
}

export default App;
