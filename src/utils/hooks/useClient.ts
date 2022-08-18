import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useEffect, useState } from "react";
import { createClient } from "../client/client";
import { createProvider } from "../client/common";
import { ClientType } from "../client/types/clientType";

const useClient = () => {
  const wallet = useWallet();
  const { connection } = useConnection();
  const [client, setClient] = useState<ClientType>();

  useEffect(() => {
    if (
      wallet &&
      wallet.publicKey &&
      wallet.signAllTransactions &&
      wallet.signTransaction
    ) {
      const provider = createProvider(connection, {
        publicKey: wallet.publicKey,
        signAllTransactions: wallet.signAllTransactions,
        signTransaction: wallet.signTransaction,
      });
      setClient(createClient({ provider }));
    }
  }, [connection, wallet]);

  return client;
};

export default useClient;
