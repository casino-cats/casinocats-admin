import "./App.css";
import { WalletWrapper } from "./components/Layout/WalletWrapper";
import * as Auth from "./components/AuthProvider";

function App() {
  return (
    <Auth.Provider>
      <WalletWrapper />
    </Auth.Provider>
  );
}

export default App;
