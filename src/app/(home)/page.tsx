import Image from 'next/image';
import KoreaMap from '../../components/KoreaMap';
import Guide from '@/components/Guide';

export default function Home() {
  return (
    <div className="flex flex-row items-center justify-center">
      {/* 타이틀 + GUIDE 컴포넌트 묶음 */}
      <div className="flex h-full w-[640px] flex-col items-center py-[40px] text-left">
        {/* 타이틀 섹션*/}
        <section className="flex h-[100px] w-full justify-center p-[20px]">
          <span className="text-center font-busan text-[40px] text-secondary">KOREA Random Roulette</span>
        </section>

        {/* 옵션 & 설명 컴포넌트 (GUIDE) */}
        <Guide />
      </div>
      {/* 지도 */}
      <KoreaMap />
    </div>
  );
}
