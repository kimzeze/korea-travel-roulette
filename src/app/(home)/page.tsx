import Image from 'next/image';
import KoreaMap from '../../components/KoreaMap';
import Guide from '@/components/Guide';

export default function Home() {
  return (
    <main className="flex flex-row items-center justify-center px-[80px]">
      {/* 타이틀 + GUIDE 컴포넌트 묶음 */}
      <div className="flex h-full w-[640px] flex-col items-center border-r border-primary py-[40px] text-left">
        {/* 타이틀 섹션*/}
        <section className="h-[100px] w-full p-[20px]">
          <span className="border text-center text-[40px]">BRAND LOGO & TITLE</span>
        </section>

        {/* 옵션 & 설명 컴포넌트 (GUIDE) */}
        <Guide />
      </div>
      {/* 지도 */}
      <KoreaMap />
    </main>
  );
}
