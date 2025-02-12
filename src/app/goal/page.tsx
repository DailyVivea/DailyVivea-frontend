import React from "react";
import GoalForm from "../../components/goal/GoalForm";
import PeerGoals from "@/components/goal/PeerGoals";
import "../../style/goal/page.css"

const Page = () => {
  const user_id = 1; // 🔴실제 로그인된 사용자의 ID로 변경 필요

    return (<div className="newGoal">
<h1 className="text-lg font-bold mb-4">나만의 목표를 세워볼까요?</h1>
      <div className="newGoal-page">
        <div>
        <GoalForm  userId={user_id} />
        </div>
        <div>
        <PeerGoals userId={user_id} />
        </div>
        
      </div>
    </div>
      
    );
}

export default Page;