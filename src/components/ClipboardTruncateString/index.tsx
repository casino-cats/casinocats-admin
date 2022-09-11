import React, { useState } from "react";
import { CgClipboard } from "react-icons/cg";
import { truncateString } from "../../utils/helper";

interface ClipboardTruncateStringProps {
  original: string;
}

const ClipboardTruncateString = (props: ClipboardTruncateStringProps) => {
  const [isClipboardButtonShow, setIsClipboardButtonShow] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(props.original);
  };
  return (
    <>
      <div
        className="cursor-pointer flex"
        onMouseEnter={() => setIsClipboardButtonShow(true)}
        onMouseLeave={() => setIsClipboardButtonShow(false)}
      >
        <span>{truncateString(props.original, 5)}</span>
        {isClipboardButtonShow && (
          <button
            type="button"
            className="inline-flex items-center text-sm mx-1 hover:text-teal-500"
            onClick={copyToClipboard}
          >
            <CgClipboard />
          </button>
        )}
      </div>
    </>
  );
};

export default ClipboardTruncateString;
