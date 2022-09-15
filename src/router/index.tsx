import { useWallet } from "@solana/wallet-adapter-react";
import { useActor } from "@xstate/react";
import React, { createContext, useContext, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import * as AuthProvider from "../components/AuthProvider";
import AddPool from "../pages/AddPool";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import NftList from "../pages/NftList";
import Pool from "../pages/Pool";
import Transaction from "../pages/Transaction";
import { LOCAL_STORAGE_KEY } from "../utils/helper";
import { auth, getMe, getNonce } from "../utils/lib/mutations";

interface CurrentUserType {
  id: string;
  walletAddress: string;
  username: string;
  solBalance: number;
  usdcBalance: number;
  cccBalance: number;
  profilePicture: string;
  role: string[];
}
interface AuthInterface {
  accessToken: string | null;
  currentUser: CurrentUserType | null;
  setAccessToken: React.Dispatch<React.SetStateAction<string | null>>;
  setCurrentUser: React.Dispatch<React.SetStateAction<CurrentUserType | null>>;
}

export const AuthCtx = createContext<AuthInterface | null>(null);

const Router = () => {
  const [isAuth, setIsAuth] = useState(false);
  const { authService } = useContext(AuthProvider.Context);
  const [authState, send] = useActor(authService);

  const { publicKey, signMessage } = useWallet();

  useEffect(() => {
    const login = async () => {
      if (publicKey != null) {
        const result = await getNonce({ publicKey: publicKey.toBase58() });
        if (result.status === "success") {
          const nonce = result.data.nonce;
          const encodedMessage = new TextEncoder().encode(
            "Authorize your wallet to play " + nonce
          );
          if (!signMessage) return;
          const signedMessage = await signMessage(encodedMessage);
          const signResult = await auth({
            publicKey: publicKey.toBytes(),
            signature: Buffer.from(signedMessage),
          });
          if (signResult.status === "success") {
            await localStorage.setItem(
              LOCAL_STORAGE_KEY.AccessToken,
              signResult.data.accessToken
            );
            console.log(signResult.data.accessToken);
            const authResult = await getMe();
            if (authResult.status === "success") {
              if (authResult.data.user.role.includes("admin")) {
                send("AUTHORIZATION_SUCCEED");
              }
            }
          }
        }
      } else {
        send("LOGOUT");
      }
    };

    login();
  }, [publicKey, send, signMessage]);

  useEffect(() => {
    const _isAuth = authState.matches("authorized");
    setIsAuth(_isAuth);
  }, [authState]);

  return (
    <div className="w-full h-full">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={isAuth ? <Dashboard /> : <Login />} />
          <Route
            path="/transaction"
            element={isAuth ? <Transaction /> : <Login />}
          />
          <Route path="/pool" element={isAuth ? <Pool /> : <Login />} />
          <Route path="/pool/add" element={isAuth ? <AddPool /> : <Login />} />
          <Route path="/nft-list" element={isAuth ? <NftList /> : <Login />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default Router;
