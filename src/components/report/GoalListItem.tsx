import React from "react";

import { Text, Name } from "./GoalListItem.style";

import Image from "next/image";
import goalListIcon from "@/assets/goalListIcon.svg";

interface GoalTextProps {
    goal: string,
    name: string,
}

const GoalText = ({goal, name}: GoalTextProps) => {
    return (
      <div className="flex justify-between items-center py-1 w-full border-b-[1px] border-b-[#E6E6E6] py-4"> {/* flex 이렇게 하면 상태바의 % 너비가 제대로 안 먹힘 */}
        <div className="flex">
            <Image src={goalListIcon} alt="goalListIcon" className="w-5 h-5 mr-2" />
            <Text>{goal} </Text>
        </div>
        <Name>{name} </Name>
      </div>
    );
}

export default GoalText;