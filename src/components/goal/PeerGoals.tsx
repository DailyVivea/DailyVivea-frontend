"use client";

import React, { useEffect, useState } from "react";
import "../../style/goal/PeerGoals.css"; // 일반 CSS 파일 불러오기

interface PeerGoal {
  title: string;
  user: string;
  content?: string;
}

interface ReportData {
  peerGoals?: PeerGoal[];
}

const PeerGoals: React.FC<{ userId: number }> = ({ userId }) => {
  const [peerGoals, setPeerGoals] = useState<PeerGoal[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPeerGoals = async () => {
      try {
        const res = await fetch(`https://gunanana.onrender.com/api/${userId}/friendGoals`);

        const contentType = res.headers.get("content-type");

        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Received non-JSON response");
        }

        

        const data = await res.json();
        console.log("응답 데이터:", data);

        if (Array.isArray(data)) {
          setPeerGoals(data);
        } else {
          throw new Error("Invalid data format");
        }

      } catch (error: any) {
        console.error("Error fetching peer goals:", error);
        setError("데이터를 불러오는 중 오류가 발생했습니다.");
        console.log('또래목표 api 오류 발생')
      }
    };

    fetchPeerGoals();
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
                  {goal.content && <p className="peerGoals__goal-subtitle">{goal.content}</p>}
                </div>
                <p className="peerGoals__goal-owner">{goal.user}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PeerGoals;

