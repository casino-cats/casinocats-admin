import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

import React from "react";

const Header = () => {
  return (
    <header className="sticky top-0 bg-white border-b border-gray-200 z-30">
      <div className="px-4 py-2 sm:px-6 lg:px-8">
        <div className="flex justify-end space-x-3">
          <WalletMultiButton />
        </div>
      </div>
    </header>
  );
};

export default Header;
