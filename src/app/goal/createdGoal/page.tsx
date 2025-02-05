import React from "react";



const Page = () => {
    return (<div className="flex flex-col items-center justify-center min-h-screen space-y-6 bg-white p-6">
      {/* 제목 */}
      <h1 className="text-3xl font-bold text-black">목표 카드를 생성했어요</h1>

      {/* 목표 카드 컴포넌트 */}
      {/* <GoalCard /> */}

      {/* 카드 보러가기 버튼 */}
      <button className="flex items-center justify-center px-6 py-3 bg-green-500 text-black text-lg font-semibold rounded-full shadow-md hover:bg-green-600 transition">
        카드 보러가기 
        <span className="ml-2 flex items-center justify-center w-8 h-8 bg-white text-black rounded-full"> >
        
        </span>
      </button>
    </div>
      
    );
}

export default Page;