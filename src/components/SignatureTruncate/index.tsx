import React, { useState } from "react";
import { CgClipboard, CgMoreAlt } from "react-icons/cg";
import { SOLANA_EXPLORER_BASE_URL, truncateString } from "../../utils/helper";

interface SignatureTruncateProps {
  tx: string;
}

const SignatureTruncate = (props: SignatureTruncateProps) => {
  const [isShow, setIsShow] = useState(false);

  console.log(process.env.REACT_APP_SOLANA_NETWORK);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(props.tx);
  };

  const viewDetailsOnSolanaExplorer = async () => {
    window.open(
      SOLANA_EXPLORER_BASE_URL + props.tx + "?cluster=devnet",
      "_blank"
    );
  };

  return (
    <div
      className="cursor-pointer flex"
      onMouseEnter={() => setIsShow(true)}
      onMouseLeave={() => {
        setIsShow(false);
      }}
    >
      <span>{truncateString(props.tx, 5)}</span>
      {isShow && (
        <button
          type="button"
          className="inline-flex items-center text-sm mx-1 hover:text-teal-500"
          onClick={copyToClipboard}
        >
          <CgClipboard />
        </button>
      )}
      {isShow && (
        <button
          type="button"
          className="inline-flex items-center text-sm mx-1 hover:text-pink-500"
          onClick={viewDetailsOnSolanaExplorer}
        >
          <CgMoreAlt />
        </button>
      )}
    </div>
  );
};

export default SignatureTruncate;
