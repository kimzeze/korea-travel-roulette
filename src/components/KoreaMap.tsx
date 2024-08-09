'use client';
import React, { useState, useCallback, memo } from 'react';
import { useRegionStore } from '@/lib/stores/regionStore';
import { motion, AnimatePresence } from 'framer-motion';
import useModal from '@/lib/hooks/useModal';
import Button from '@/components/Button';

interface ResultModalProps {
  region: { name: string; koreanName: string };
  onClose: () => void;
}

const ResultModal = memo<ResultModalProps>(({ region, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0, backgroundColor: 'rgba(0, 0, 0, 0)' }}
      animate={{ opacity: 1, backgroundColor: 'rgba(0, 0, 0, 0.9)' }}
      exit={{ opacity: 0, backgroundColor: 'rgba(0, 0, 0, 0)' }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 flex items-center justify-center"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-center text-primary"
      >
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mb-[48px] font-nanum text-[100px] font-bold text-secondary"
        >
          대한민국, {region.koreanName}
        </motion.p>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}>
          <Button
            label="닫기"
            type="button"
            className="bg-tertiary font-nanum text-[20px] transition-all duration-300 ease-in-out hover:bg-secondary"
            onClick={onClose}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
});

ResultModal.displayName = 'ResultModal';

export default function KoreaMap() {
  const { regions, toggleRegion, isExcluded } = useRegionStore();
  const [rouletteState, setRouletteState] = useState({
    selectedRegion: null as { name: string; koreanName: string } | null,
    isSpinning: false,
    showResult: false,
  });
  const { openModal, closeModal, ModalPortal } = useModal();

  const handleRegionClick = useCallback(
    (regionName: string) => {
      toggleRegion(regionName);
    },
    [toggleRegion],
  );

  const spinRoulette = useCallback(() => {
    if (rouletteState.isSpinning) return;

    const availableRegions = regions.filter(region => !region.excluded);
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
        const selectedRegion = availableRegions[randomIndex];
        setRouletteState(prev => ({
          ...prev,
          selectedRegion: { name: selectedRegion.name, koreanName: selectedRegion.koreanName },
        }));
        counter++;
        if (counter >= 10 && speed < 400) {
          clearInterval(interval);
          spin(speed + 50);
        } else if (speed >= 400) {
          clearInterval(interval);
          const finalRegion = availableRegions[Math.floor(Math.random() * availableRegions.length)];
          setRouletteState(prev => ({
            ...prev,
            selectedRegion: { name: finalRegion.name, koreanName: finalRegion.koreanName },
            isSpinning: false,
          }));

          // 0.5초 후에 모달을 표시
          setTimeout(() => {
            setRouletteState(prev => ({ ...prev, showResult: true }));
            openModal();
          }, 500);
        }
      }, speed);
    };

    spin(100);
  }, [regions, openModal, rouletteState.isSpinning, setRouletteState]);

  const getFillColor = (regionName: string) => {
    if (isExcluded(regionName)) return '#dedede';
    if (rouletteState.selectedRegion?.name === regionName) return '#A0D1EF';
    return 'white';
  };

  return (
    <div className="flex h-full w-[640px] flex-col items-center py-[40px]">
      <div className="ml-[140px] h-[640px] w-[550px]">
        <svg width="534" height="625" viewBox="0 0 534 625" fill="none" xmlns="http://www.w3.org/2000/svg">
          {regions.map(region => (
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
        label={rouletteState.isSpinning ? '룰렛 돌아가는 중💫' : '✈️ 오른쪽으로 스와이프해서 다트 던지기'}
        type="button"
        className={`mt-[20px] w-[350px] font-nanum text-[16px] transition-all duration-300 ease-in-out ${
          rouletteState.isSpinning ? 'bg-secondary hover:bg-secondary' : 'bg-tertiary hover:bg-secondary'
        }`}
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
