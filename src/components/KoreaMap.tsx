'use client'
import React, { useState, useCallback } from 'react';
import { useRegionStore } from '@/lib/stores/regionStore';
import Button from '@/components/Button';

export default function KoreaMap() {
  const { regions, toggleRegion, isExcluded } = useRegionStore();
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);

  const handleRegionClick = useCallback((regionName: string) => {
    toggleRegion(regionName);
  }, [toggleRegion]);

  const spinRoulette = useCallback(() => {
    if (isSpinning) return;

    const availableRegions = regions.filter((region) => !region.excluded);

    if (availableRegions.length === 0) {
      alert('모든 지역이 제외되었습니다. 하나 이상의 지역을 선택해주세요.');
      return;
    }

    setIsSpinning(true);
    setSelectedRegion(null);

    let counter = 0;
    let interval: NodeJS.Timeout;

    const spin = (speed: number) => {
      interval = setInterval(() => {
        const randomIndex = Math.floor(Math.random() * availableRegions.length);
        setSelectedRegion(availableRegions[randomIndex].name);
        counter++;
        if (counter >= 10 && speed < 400) {
          clearInterval(interval);
          spin(speed + 50);
        } else if (speed >= 400) {
          clearInterval(interval);
          setTimeout(() => {
            const finalRegion = availableRegions[Math.floor(Math.random() * availableRegions.length)];
            setSelectedRegion(finalRegion.name);
            setIsSpinning(false);
          }, 500);
        }
      }, speed);
    };

    spin(100);
  }, [isSpinning, regions]);

  const getFillColor = (regionName: string) => {
    if (isExcluded(regionName)) return '#dedede';
    if (selectedRegion === regionName) return '#A0D1EF';
    return 'white';
  };

  return (
    <div className="flex flex-col items-center border border-primary">
      <div className="w-[550px] h-[650px] border border-primary">
        <svg width="534" height="625" viewBox="0 0 534 625" fill="none" xmlns="http://www.w3.org/2000/svg">
          {regions.map((region) => (
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
      <Button
          label={isSpinning ? '룰렛 돌아가는 중💫' : '✈️ 룰렛 돌리기'}
          type="button"
          className="hover:bg-secondary bg-tertiary transition-all duration-300 ease-in-out font-nanum text-[16px]"
          onClick={spinRoulette}
          disabled={isSpinning}
        />
      {selectedRegion && !isSpinning && (
        <p className="mt-4 text-xl font-bold">선택된 지역: {selectedRegion}</p>
      )}
    </div>
  );
}