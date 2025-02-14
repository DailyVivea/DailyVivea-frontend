"use client";

import React, { useState, useEffect } from "react";
import { Download, ChevronRight, Check } from "lucide-react";
import { useRouter } from "next/navigation";
import ProgressBar from "@/components/record/ProgressBar";
import "@/style/record/recordLayout.css";
import "@/style/record/recommend.css";
import Image from "next/image";
import Ted from "@/assets/images/ted-presentation.png"

const RecommendPage = ({
  setStep,
  activeStep,
  setActiveStep, 
  experienceId
}: {
  setStep: (step: number) => void;
  activeStep: number;
  setActiveStep: (step: number) => void;
  experienceId: number;
}) => {
  const [selectedGoals, setSelectedGoals] = useState<number[]>([]);
  const [previewImages, setPreviewImages] = useState<{ [key: string]: string }>({});
  const [goals, setGoals] = useState<any[]>([]); // 서버에서 받아온 goals
  const [learningResources, setLearningResources] = useState<any[]>([]); // 서버에서 받아온 learning resources

  const router = useRouter();

  const toggleGoal = async (id: number) => {
    // 목표 선택 상태 토글
    const isSelected = selectedGoals.includes(id);
    const newSelectedGoals = isSelected
      ? selectedGoals.filter((goalId) => goalId !== id)
      : [...selectedGoals, id];

    // 아이콘을 변경하기 위해 상태를 먼저 업데이트
    setSelectedGoals(newSelectedGoals);

    try {
      const response = await fetch(`https://gunanana.onrender.com/api/${id}/save`, {
        method: "PUT",
      });

      if (response.ok) {
        const data = await response.json();
        if (data.message === "추천 목표 저장 완료") {
          console.log("목표 저장 완료:", data.message);
        } else {
          console.error("목표 저장 실패:", data.message);
          // 실패 시 아이콘을 되돌리기
          setSelectedGoals(selectedGoals);
        }
      } else {
        console.error("목표 저장 API 요청 실패");
        // 실패 시 아이콘을 되돌리기
        setSelectedGoals(selectedGoals);
      }
    } catch (error) {
      console.error("목표 저장 API 요청 중 오류 발생:", error);
      // 실패 시 아이콘을 되돌리기
      setSelectedGoals(selectedGoals);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://gunanana.onrender.com/api/${experienceId}/recommends`);
        if (!response.ok) throw new Error("Failed to fetch data");
        const data = await response.json();
        console.log("추천목표 생성 완료:", data.goals);
        // 서버로부터 받은 목표 데이터와 학습 자료 설정
        setGoals(data.goals);
        setLearningResources(data.learnings);
      } catch (error) {
        console.log("서버에서 데이터를 가져오는 중 오류 발생:", error);
      
        

        // 서버 오류 발생 시 임시 데이터 설정
        setGoals([
          {
            goal_id: 3,
            title: "[임시] 청중과의 소통 연습",
            content: "4주 동안 매주 1회 친구나 가족 앞에서 발표하며 질문과 답변 연습을 해보세요!",
          },
          {
            goal_id: 4,
            title: "매일 1시간씩 자신감 있는 자세 연습하기",
            content: "4주 동안 매일 거울을 보며 자세와 표정 연습을 1시간씩 해보세요!",
          },
          {
            goal_id: 5,
            title: "다양한 발표 자료 제작 연습",
            content: "3주 동안 3회 파워포인트, 프리지, 칠판 등 다양한 자료를 활용하여 발표 연습을 해보세요!",
          },
          {
            goal_id: 6,
            title: "즉흥 발표 연습",
            content: "2주 동안 2회 갑작스러운 주제에 대한 즉흥 발표 연습을 해보세요!",
          },
          {
            goal_id: 7,
            title: "매일 1시간씩 발표 연습하기",
            content: "4주 동안 매일 거울을 보며 발표 연습을 1시간 이상 해보세요!",
          },
        ]);
        setLearningResources([
          {
            title: "발표불안 극복 방법",
            url: "https://www.youtube.com/watch?v=7QfXdLq6vvg",
            source: "YouTube",
          },
          {
            title: "효과적인 발표 자료 제작법",
            url: "https://www.youtube.com/watch?v=r3XKDv9DmkI",
            source: "YouTube",
          },
          {
            title: "자신감 있는 목소리 만들기",
            url: "https://www.youtube.com/watch?v=jdxZQ-RY3Yg",
            source: "YouTube",
          },
        ]);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchThumbnails = () => {
      const newPreviewImages: { [key: string]: string } = {};

      learningResources.forEach((resource) => {
        const youtubeMatch = resource.url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
        if (youtubeMatch) {
          const videoId = youtubeMatch[1];
          newPreviewImages[resource.url] = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
        }
      });

      setPreviewImages(newPreviewImages);
    };

    fetchThumbnails();
  }, [learningResources]);

  const NewGoalButtonClick = () => {
    router.push('/goal');
  };

  const CheckGoalButtonClick = () => {
    router.push('/list');
  };

  return (
    <div className="record-page">
      {/* 제목 & 네비게이션 */}
      <div className="title-container">
        <h1 className="record-title">오늘 경험을 토대로 추천 목표를 알려드려요!</h1>
        <button className="custom-goal-button" onClick={NewGoalButtonClick}>
          나만의 목표 설정하러 가기
          <div className="icon-wrapper">
            <ChevronRight size={18} strokeWidth={3} className="custom-goal-icon" />
          </div>
        </button>
      </div>

      {/* 콘텐츠 영역 */}
      <div className="box-container">
        {/* 목표 리스트 */}
        <div className="goal-container">
          {goals.map((goal: any) => (
            <button
              key={goal.goal_id}
              className={`goal-item ${selectedGoals.includes(goal.goal_id) ? "selected" : ""}`}
              onClick={() => toggleGoal(goal.goal_id)}
            >
              <div className="goal-content">
                <div className="goal-text">
                  <h2>{goal.title}</h2>
                  <p>{goal.content}</p>
                </div>
              </div>
              <div className="goal-icon">
                {selectedGoals.includes(goal.goal_id) ? (
                  <Check size={24} className="goal-check" />
                ) : (
                  <Download size={24} className="goal-download" />
                )}
              </div>
            </button>
          ))}

          {/* 저장된 목표 확인 버튼 */}
          <div className="goal-save-container">
            <button className="goal-save-button" onClick={CheckGoalButtonClick}>저장된 목표 확인하기</button>
          </div>
        </div>

        {/* 학습 자료 추천 */}
        <div className="learning-section">
          <h2>✏️ 학습 자료 및 추천</h2>
          <div className="learning-container">
            {learningResources.map((resource: any, index: number) => (
              <div key={resource.url} className="learning-card">
                <div className="learning-content">
                  <img src={"/icons/youtube.svg"} alt="icon" className="learning-icon" />
                  <div className="learning-text">
                    <h3>{resource.title}</h3>
                    <p>{resource.description}</p>
                  </div>
                  <div className="learning-link-container">
                    <a href={resource.url} target="_blank" rel="noopener noreferrer" className="learning-link">
                      <img src="/icons/link.svg" alt="link icon" />
                    </a>
                    <ChevronRight className="chevron-icon" />
                  </div>
                </div>
                {/* 첫 번째 항목만 미리보기 이미지 표시 */}
                {index === 0 && (
                  <img
                    src={previewImages[resource.url] || resource.image}
                    alt="preview"
                    className="learning-image"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="progress-bar-container">
        <ProgressBar activeStep={activeStep} />
      </div>
    </div>
  );
};

export default RecommendPage;
