'use client'

import React, { useState, useCallback } from 'react';
import { initialRegions } from '@/lib/data/regionPaths';
import { Region } from '@/lib/types/regions';

export default function KoreaMap() {
  /* 상태 관리 */
  const [regionsState, setRegionsState] = useState<Region[]>(initialRegions);
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);

  /* 지역 선택(클릭) 핸들러 함수 */
  const handleRegionClick = useCallback((regionName: string) => {
    setRegionsState((prevRegions) =>
      prevRegions.map((region) =>
        region.name === regionName ? { ...region, excluded: !region.excluded } : region
      )
    );
  }, []);

  /* 룰렛 회전 함수 */
  const spinRoulette = useCallback(() => {
    if (isSpinning) return;

    setIsSpinning(true);
    setSelectedRegion(null);

    const availableRegions = regionsState.filter((region) => !region.excluded);
    let counter = 0;
    let interval: NodeJS.Timeout;
    
    // 룰렛 회전 속도 조절을 위한 함수
    const spin = (speed: number) => {
      interval = setInterval(() => {
        const randomIndex = Math.floor(Math.random() * availableRegions.length);
        setSelectedRegion(availableRegions[randomIndex].name);
        counter++;

        // 속도에 따라 다음 단계로 진행
        if (counter >= 10 && speed < 400) {
          clearInterval(interval);
          spin(speed + 50); // 속도를 점점 늦춤
        } else if (speed >= 400) {
          clearInterval(interval);
          // 최종 선택
          setTimeout(() => {
            const finalRegion = availableRegions[Math.floor(Math.random() * availableRegions.length)];
            setSelectedRegion(finalRegion.name);
            setIsSpinning(false);
          }, 500);
        }
      }, speed);
    };

    // 초기 빠른 속도로 시작
    spin(100);
  }, [isSpinning, regionsState]);

  /* 지역 색상 관련 함수 */
  const getFillColor = (regionName: string) => {
    const region = regionsState.find((r) => r.name === regionName);
    if (region?.excluded) return '#dedede'; // 제외된 지역: 회색
    if (selectedRegion === regionName) return '#222'; // 선택된 지역: 검정
    return 'white'; // 기본 색상: 흰색
  };

  return (
    <div className="flex flex-col items-center border border-primary">
      {/* 지도 SVG */}
      <div className="w-[650px] h-[650px] border border-primary">
      <svg width="534" height="625" viewBox="0 0 534 625" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* 각 지역을 SVG path로 렌더링 */}
              {initialRegions.map((region) => (
                <path
                  key={region.name}
                  className={region.name}
                  d={region.path} 
                  fill={getFillColor(region.name)}
                  stroke="black"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  onClick={() => handleRegionClick(region.name)}
                  style={{ cursor: 'pointer', transition: 'fill 0.3s ease' }}
                />
              ))}            
        </svg>
      </div>
      {/* 룰렛 회전 버튼 */}
      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        onClick={spinRoulette}
        disabled={isSpinning}
      >
        {isSpinning ? '룰렛 돌아가는 중...' : '룰렛 돌리기'}
      </button>
      {/* 선택된 지역 표시 */}
      {selectedRegion && !isSpinning && (
        <p className="mt-4 text-xl font-bold">선택된 지역: {selectedRegion}</p>
      )}
    </div>
  );
};
