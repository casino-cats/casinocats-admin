import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import LogoPng from "../images/logo.png";

const Login = () => {
  return (
    <div className="w-screen h-screen bg-gray-800">
      <div className="flex items-center justify-center h-full">
        <div className="m-auto">
          <img src={LogoPng} alt="casinocats logo" className="mb-12" />
          <WalletMultiButton />
        </div>
      </div>
    </div>
  );
};

export default Login;
