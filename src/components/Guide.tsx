'use client';
import Button from '@/components/Button';
import { useRegionStore } from '@/lib/stores/regionStore';
import { useCallback } from 'react';

export default function Guide() {
  const { regions, toggleRegion, isExcluded, toggleAllRegions, resetRegions } = useRegionStore();

  const handleExcludeAll = useCallback(() => {
    toggleAllRegions(true);
  }, [toggleAllRegions]);

  const handleReset = useCallback(() => {
    resetRegions();
  }, [resetRegions]);

  return (
    <section className="h-[600px] w-full text-center font-nanum text-[20px]">
      {/* 안내문구 */}
      <div className="p-[20px]">
        <p className="mb-2">제외하고 싶은 지역을 선택해주세요</p>
        <p className="mb-4 text-[16px]">지도 또는 글자를 클릭하면 선택/해제됩니다.</p>
      </div>
      {/* 버튼 제어 섹션 */}
      <div className="flex justify-center space-x-4 p-[20px]">
        <Button
          label="모두 제외하기"
          type="button"
          className="bg-tertiary transition-all duration-300 ease-in-out hover:bg-secondary"
          onClick={handleExcludeAll}
        />
        <Button
          label="초기화"
          type="button"
          className="bg-tertiary transition-all duration-300 ease-in-out hover:bg-secondary"
          onClick={handleReset}
        />
      </div>
      {/* 버튼 모음 */}
      <div className="mx-auto grid h-[350px] w-[500px] grid-cols-3 gap-1 overflow-y-auto p-[20px]">
        {regions.map(region => (
          <Button
            key={region.name}
            label={region.koreanName}
            type="button"
            className={`mx-auto hover:bg-secondary ${isExcluded(region.name) ? 'bg-delete line-through decoration-secondary decoration-2' : ''} transition-all duration-300 ease-in-out`}
            onClick={() => toggleRegion(region.name)}
          />
        ))}
      </div>
    </section>
  );
}
