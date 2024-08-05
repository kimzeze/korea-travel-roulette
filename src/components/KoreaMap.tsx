'use client'

import React, { useState, useCallback, memo } from 'react';
import { useRegionStore } from '@/lib/stores/regionStore';
import { motion, AnimatePresence } from 'framer-motion';
import useModal from '@/lib/hooks/useModal';
import Button from '@/components/Button';

/* 결과 모달창 컴포넌트 */
const ResultModal = memo(({ region, onClose }: { region: string; onClose: () => void }) => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50"
  >
    <motion.div 
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.7 }}
      className="text-primary text-center"
    >
      <motion.p 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1 }}
        className="text-[100px] font-nanum font-bold text-secondary mb-[48px]"
      >
        {region}, Korea
      </motion.p>
      <Button
        label="닫기"
        type="button"
        className="hover:bg-secondary bg-tertiary transition-all duration-300 ease-in-out font-nanum text-[20px]"
        onClick={onClose}
      />
    </motion.div>
  </motion.div>
));

export default function KoreaMap() {
  const { regions, toggleRegion, isExcluded } = useRegionStore();
  const [rouletteState, setRouletteState] = useState({ 
    selectedRegion: null as string | null, 
    isSpinning: false, 
    showResult: false 
  });
  const { openModal, closeModal, ModalPortal } = useModal();

  const handleRegionClick = useCallback((regionName: string) => {
    toggleRegion(regionName);
  }, [toggleRegion]);

  const spinRoulette = useCallback(() => {
    if (rouletteState.isSpinning) return;

    const availableRegions = regions.filter((region) => !region.excluded);
    if (availableRegions.length === 0) {
      alert('모든 지역이 제외되었습니다. 하나 이상의 지역을 선택해주세요.');
      return;
    }

    setRouletteState(prev => ({ ...prev, isSpinning: true, selectedRegion: null, showResult: false }));

    let counter = 0;
    let interval: NodeJS.Timeout;

    const spin = (speed: number) => {
      interval = setInterval(() => {
        const randomIndex = Math.floor(Math.random() * availableRegions.length);
        setRouletteState(prev => ({ ...prev, selectedRegion: availableRegions[randomIndex].name }));
        counter++;
        if (counter >= 10 && speed < 400) {
          clearInterval(interval);
          spin(speed + 50);
        } else if (speed >= 400) {
          clearInterval(interval);
          const finalRegion = availableRegions[Math.floor(Math.random() * availableRegions.length)];
          setRouletteState(prev => ({ ...prev, selectedRegion: finalRegion.name, isSpinning: false }));
          
          // 0.5초 후에 모달을 표시
          setTimeout(() => {
            setRouletteState(prev => ({ ...prev, showResult: true }));
            openModal();
          }, 500);
        }
      }, speed);
    };

    spin(100);
  }, [regions, openModal]);

  const getFillColor = (regionName: string) => {
    if (isExcluded(regionName)) return '#dedede';
    if (rouletteState.selectedRegion === regionName) return '#A0D1EF';
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
        label={rouletteState.isSpinning ? '룰렛 돌아가는 중💫' : '✈️ 룰렛 돌리기'}
        type="button"
        className="hover:bg-secondary bg-tertiary transition-all duration-300 ease-in-out font-nanum text-[16px]"
        onClick={spinRoulette}
        disabled={rouletteState.isSpinning}
      />
      <ModalPortal>
        <AnimatePresence>
          {rouletteState.showResult && rouletteState.selectedRegion && (
            <ResultModal region={rouletteState.selectedRegion} onClose={closeModal} />
          )}
        </AnimatePresence>
      </ModalPortal>
    </div>
  );
}