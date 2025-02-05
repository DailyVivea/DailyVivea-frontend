import React from "react";
import GoalForm from "../../components/goal/GoalForm";
import PeerGoals from "@/components/goal/PeerGoals";
import "../../style/goal/page.css"

const Page = () => {
    return (<div className="newGoal">
<h1 className="text-lg font-bold mb-4">나만의 목표를 세워볼까요?</h1>
      <div className="newGoal-page">
        <div>
        <GoalForm />
        </div>
        <div>
        <PeerGoals userId="exampleUserId" />
        </div>
        
      </div>
    </div>
      
    );
}

export default Page;