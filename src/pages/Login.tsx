import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import React, { useEffect } from "react";
import LogoPng from "../images/logo.png";
import { auth, getMe } from "../utils/lib/mutations";

const Login = () => {
  const { publicKey, signMessage } = useWallet();

  useEffect(() => {
    const signin = async () => {
      if (publicKey) {
        const encodedMessage = new TextEncoder().encode(
          "Welcome to casinocats"
        );
        if (!signMessage) return;
        const signedMessage = await signMessage(encodedMessage);
        const result: { access_token: string; user: string } = await auth({
          publicKey: publicKey.toBytes(),
          signature: Buffer.from(signedMessage),
        });
        const accessToken = result.access_token;
        localStorage.setItem("accessToken", accessToken);
        const me = await getMe();
        localStorage.setItem("currentUser", JSON.stringify(me));
      }
    };

    signin();
  }, [publicKey, signMessage]);

  return (
    <div className="w-screen h-screen bg-gray-100">
      <div className="flex items-center justify-center h-full">
        <div className="m-auto">
          <img src={LogoPng} alt="casinocats logo" className="mb-10" />
          <WalletMultiButton />
        </div>
      </div>
    </div>
  );
};

export default Login;
