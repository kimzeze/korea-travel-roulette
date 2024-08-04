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
    <section className="font-nanum border border-primary text-[20px] text-center w-[600px]">
      <h3 className="mb-2">제외하고 싶은 지역을 선택해주세요</h3>
      <p className="mb-4">지도 또는 글자를 클릭하면 선택/해제됩니다.</p>
      <div className="flex justify-center space-x-4 mb-[20px]">
        <Button
          label="모두 제외하기"
          type="button"
          className="hover:bg-secondary bg-tertiary transition-all duration-300 ease-in-out"
          onClick={handleExcludeAll}
        />
        <Button
          label="초기화"
          type="button"
          className="hover:bg-secondary bg-tertiary transition-all duration-300 ease-in-out"
          onClick={handleReset}
        />
      </div>
      <div className="border border-blue-500 h-[300px] w-[440px] mx-auto overflow-y-auto grid grid-cols-3 gap-1">
        {regions.map(region => (
          <Button
            key={region.name}
            label={region.koreanName}
            type="button"
            className={`
              hover:bg-secondary
              ${isExcluded(region.name) ? 'bg-delete line-through decoration-secondary decoration-2' : ''}
              transition-all duration-300 ease-in-out
            `}
            onClick={() => toggleRegion(region.name)}
          />
        ))}
      </div>
    </section>
  );
}
