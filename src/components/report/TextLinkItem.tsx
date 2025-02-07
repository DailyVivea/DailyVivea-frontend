import React from "react";

import { Text } from "./TextLinkItem.style";

import Image from "next/image";
import linkIcon from "@/assets/linkIcon.svg";

interface TextLinkItemProps {
    text: string,
}

const TextLinkItem = ({text}: TextLinkItemProps) => {
    return (
      <div className="flex justify-between items-center w-full mt-4 px-3">
        <Text>{text} </Text>
        <Image src={linkIcon} alt="linkIcon" className="w-6 h-6 cursor-pointer" />
      </div>
    );
}

export default TextLinkItem;