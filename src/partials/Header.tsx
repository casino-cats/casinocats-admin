import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

const Header = () => {
  return (
    <>
      <header className="sticky top-0 bg-gray-800 border-b border-gray-200 z-30">
        <div className="px-4 py-2 sm:px-6 lg:px-8">
          <div className="flex items-center">
            <div className="flex-none">
              <h1 className="text-xl text-yellow-400 font-bold">CasinoCats</h1>
            </div>
            <div className="flex flex-grow justify-end">
              <WalletMultiButton />
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
