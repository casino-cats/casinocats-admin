import { useWallet } from "@solana/wallet-adapter-react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import LogoPng from "../images/logo.png";
import { LOCAL_STORAGE_KEY } from "../utils/helper";
import { auth, getMe, getNonce } from "../utils/lib/mutations";
import { useStoreActions } from "../store/hooks";

const Login = () => {
  const { setUser } = useStoreActions((actions) => actions.userModel);

  const { publicKey, signMessage } = useWallet();
  const navigate = useNavigate();

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
          // setUser({ authToken: signResult.data.accessToken });
          localStorage.setItem(
            LOCAL_STORAGE_KEY.AccessToken,
            signResult.data.accessToken
          );
          console.log(signResult.data.accessToken);
          const authResult = await getMe();
          if (authResult.data.user.role.includes("admin")) {
            // localStorage.setItem(
            //   LOCAL_STORAGE_KEY.AdminInfo,
            //   JSON.stringify(authResult.data.user)
            // );
            setUser({
              userName: authResult.data.user.userName,
              role: authResult.data.user.role,
            });
            navigate("/");
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
