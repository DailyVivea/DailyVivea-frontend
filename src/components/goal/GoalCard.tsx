
import React from "react";
import DiamondProgressBar from "../report/DiamondProgressBar";
import '../../style/goal/goalCard.css'

interface GoalCardProps {
  title: string;
  content: string;
  interval_weeks: number;
  interval_times: number;
  start_date: string | Date | null;
  end_date: string | Date | null;
}

const GoalCard: React.FC<GoalCardProps> = ({ title, content, interval_weeks, interval_times, start_date, end_date }) => {
  const formattedStartDate = start_date instanceof Date ? start_date : new Date(start_date || "");
  const formattedEndDate = end_date instanceof Date ? end_date : new Date(end_date || "");

  return (
    <div className="goalCard">
      {/* 제목 */} 
      <div className="goalCard__title">{title}</div>

      
      <div className="goalCard__section">
        
        {/* 목표 내용 */}
        <div className="goalCard__section__box">목표</div>
      <div className="goalCard__content">{content}</div>
        
      </div>

      {/* 실행 간격과 기간 */}
      <div className="goalCard__section-flex">
        <div className="goalCard__section">
          <div className="goalCard__section__box">실행 간격</div>
          <div className="goalCard__interval">
        <div>{interval_weeks}주마다 {interval_times}회 이상</div>
        
      </div>
        </div>

        <div className="goalCard__section">
          <div className="goalCard__section__box">기간</div>
          <div className="goalCard__term">{formattedStartDate instanceof Date && !isNaN(formattedStartDate.getTime()) ? formattedStartDate.toLocaleDateString() : "미정"} ~ {formattedEndDate instanceof Date && !isNaN(formattedEndDate.getTime()) ? formattedEndDate.toLocaleDateString() : "미정"}</div>
        </div>
      </div>
      
        

      
      

      {/* 진행률 */}
      <div className="goalCard__progress">
        <div className="goalCard__section__box">진행률</div>
        <DiamondProgressBar />
      </div>

      

      {/* 하단 편집 및 삭제 버튼 */}
      <div className="goalCard__footer">
        <span className="edit"><svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.5 20H21.5" stroke="#B6B6B6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M17 3.50023C17.3978 3.1024 17.9374 2.87891 18.5 2.87891C18.7786 2.87891 19.0544 2.93378 19.3118 3.04038C19.5692 3.14699 19.803 3.30324 20 3.50023C20.197 3.69721 20.3532 3.93106 20.4598 4.18843C20.5665 4.4458 20.6213 4.72165 20.6213 5.00023C20.6213 5.2788 20.5665 5.55465 20.4598 5.81202C20.3532 6.06939 20.197 6.30324 20 6.50023L7.5 19.0002L3.5 20.0002L4.5 16.0002L17 3.50023Z" stroke="#B6B6B6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
</span>
        <span className="delete"><svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3.5 6H5.5H21.5" stroke="#B6B6B6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M8.5 6V4C8.5 3.46957 8.71071 2.96086 9.08579 2.58579C9.46086 2.21071 9.96957 2 10.5 2H14.5C15.0304 2 15.5391 2.21071 15.9142 2.58579C16.2893 2.96086 16.5 3.46957 16.5 4V6M19.5 6V20C19.5 20.5304 19.2893 21.0391 18.9142 21.4142C18.5391 21.7893 18.0304 22 17.5 22H7.5C6.96957 22 6.46086 21.7893 6.08579 21.4142C5.71071 21.0391 5.5 20.5304 5.5 20V6H19.5Z" stroke="#B6B6B6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M10.5 11V17" stroke="#B6B6B6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M14.5 11V17" stroke="#B6B6B6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
</span>
      </div>
    </div>
  );
};

export default GoalCard;


