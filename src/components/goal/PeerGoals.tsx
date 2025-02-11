"use client";

import React, { useEffect, useState } from "react";
import "../../style/goal/PeerGoals.css"; // 일반 CSS 파일 불러오기

interface PeerGoal {
  title: string;
  owner: string;
  subtitle?: string;
}

// 서버 미완 - 임시 데이터
const TEMP_PEER_GOALS: PeerGoal[] = [
  { title: "[임시] 건강한 식습관 만들기", owner: "김지원", subtitle: "매일 아침 과일 먹기" },
  { title: "[임시] 독서 목표 세우기", owner: "박현우", subtitle: "한 달에 2권 이상 읽기" },
  { title: "[임시] 운동 루틴 유지", owner: "이서연", subtitle: "주 3회 이상 헬스장 가기" },
  { title: "[임시] 공부 습관 들이기", owner: "정민호", subtitle: "매일 2시간 이상 집중 공부" },
  { title: "[임시] 새로운 취미 배우기", owner: "송다혜", subtitle: "기타 연습 시작하기" },
];

interface ReportData {
  peerGoals: PeerGoal[];
}

const PeerGoals: React.FC<{ userId: string }> = ({ userId }) => {
  const [peerGoals, setPeerGoals] = useState<PeerGoal[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {

    
    fetch(`/api/${userId}/report`)
      .then((res) => {
        const contentType = res.headers.get("content-type");
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Received non-JSON response");
        }
        return res.json();
      })
      .then((data: ReportData) => {
        setPeerGoals(data.peerGoals);
      })
      .catch((error) => {
        console.error("Error fetching peer goals:", error);
        setError("데이터를 불러오는 중 오류가 발생했습니다. 임시");

        console.log("API 호출 실패! 임시 데이터를 설정합니다.");

        // 🔴 api 완성 전까지 임시 데이터 사용해 ui 수정중
        setPeerGoals(TEMP_PEER_GOALS); 
        // error 상태를 초기화하여 데이터가 화면에 표시되도록 함
        setTimeout(() => setError(null));
      });
  }, [userId]);
  console.log("🟢 현재 peerGoals 상태:", peerGoals);

  return (
    <div className="peerGoals__container">
      <h2 className="peerGoals__title">내 또래 다른 친구들은 이렇게 세웠어요</h2>
      <div className="peerGoals__goal-box">
        {error ? (
          <p className="peerGoals__error">{error}</p>
        ) : (
          <div className="peerGoals__goal-list">
            {peerGoals.slice(0, 5).map((goal, index) => (
              <div key={index} className="peerGoals__goal-item">
                <div className="peerGoals__goal-text">
                  <p className="peerGoals__goal-title">🔆{goal.title}</p>
                  {goal.subtitle && <p className="peerGoals__goal-subtitle">{goal.subtitle}</p>}
                </div>
                <p className="peerGoals__goal-owner">{goal.owner}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PeerGoals;
