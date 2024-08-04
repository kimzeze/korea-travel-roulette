'use client'

import Button from '@/components/Button';
import { initialRegions } from '@/lib/data/regionPaths'; // initialRegions 데이터의 정확한 경로로 수정해주세요
import { useState } from 'react';

export default function Guide() {
  const [excludedRegions, setExcludedRegions] = useState<string[]>([]);

  const toggleRegion = (regionName: string) => {
    setExcludedRegions(prev => 
      prev.includes(regionName) 
        ? prev.filter(name => name !== regionName) 
        : [...prev, regionName]
    );
  };

  return (
    <section className="font-nanum border border-primary text-[20px] text-center w-[600px]">
      <h3 className="mb-2">제외하고 싶은 지역을 선택해주세요</h3>
      <p className="mb-4">지도 또는 글자를 클릭하면 선택/해제됩니다.</p>
      <div className="border border-blue-500 h-[300px] w-[440px] mx-auto overflow-y-auto grid grid-cols-3 gap-1">
        {initialRegions.map((region) => (
          <Button 
            key={region.name}
            label={region.koreanName}
            type="button"
            className={`${excludedRegions.includes(region.name) ? 'bg-secondary line-through' : ''}`}
            onClick={() => toggleRegion(region.name)}
          />
        ))}
      </div>
    </section>
  );
}