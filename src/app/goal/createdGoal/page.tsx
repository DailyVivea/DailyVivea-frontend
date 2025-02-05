import React from "react";
import '../../../style/goal/goalCreatedPage.css'; // 외부 CSS 파일 import

const Page = () => {
    return (
      
      <div className="createdGoal__container">
        
        {/* 제목 */}
        <h1 className="createdGoal__title">목표 카드를 생성했어요</h1>

        {/* 목표 카드 컴포넌트 */}
        {/* <GoalCard /> */}

        {/* 카드 보러가기 버튼 */}
        <button className="createdGoal__button">
          카드 보러가기
          <span className="createdGoal__arrow">
            >
          </span>
        </button>
      </div>
    );
}

export default Page;
