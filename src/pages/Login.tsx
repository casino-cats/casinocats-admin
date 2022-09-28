import { useWallet } from "@solana/wallet-adapter-react";
import { useActor } from "@xstate/react";
import { useContext, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import * as AuthProvider from "../components/AuthProvider";
import LogoPng from "../images/logo.png";
import { LOCAL_STORAGE_KEY } from "../utils/helper";
import { auth, getMe, getNonce } from "../utils/lib/mutations";

const Login = () => {
  const { authService } = useContext(AuthProvider.Context);
  const [authState, send] = useActor(authService);
  const { isAuth } = authState.context;
  const { publicKey, signMessage } = useWallet();

  const handleLogin = async () => {
    if (!publicKey) {
      toast.error("Please connect your wallet first!");
      return;
    } else {
      const nonceResult = await getNonce({ publicKey: publicKey.toBase58() });
      if (nonceResult.status === "success") {
        const nonce = nonceResult.data.nonce;
        const encodedMessage = new TextEncoder().encode(
          "Authorize your wallet to play " + nonce
        );
        if (!signMessage) {
          toast.error("Please connect your wallet first!");
          return;
        }
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
          console.log({ authResult });
          if (authResult.data.user.role.includes("admin")) {
            await localStorage.setItem(
              LOCAL_STORAGE_KEY.AdminInfo,
              JSON.stringify(authResult.data.user)
            );
            send("AUTHORIZATION_SUCCEED");
          } else {
            toast("You are not admin");
          }
        } else {
          toast.error(signResult.message);
        }
      } else {
        toast.error("Can not get nonce, Please try again later.");
      }
    }
  };

  return (
    <div className="h-[calc(100vh-65px)] bg-gray-800">
      <div className="flex items-center justify-center h-full">
        <div className="m-auto content-center">
          <img src={LogoPng} alt="casinocats logo" className="mb-12" />
          <button
            className="text-white bg-transparent hover:bg-gray-700 py-2 px-4 border border-white rounded w-full hover:border-yellow-300"
            onClick={handleLogin}
          >
            Login
          </button>
        </div>
      </div>
      <Toaster position="bottom-center" />
    </div>
  );
};

export default Login;
