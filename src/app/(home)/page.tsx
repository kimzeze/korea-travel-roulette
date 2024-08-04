import KoreaMap from '../../components/KoreaMap';
import Guide from '@/components/Guide';

export default function Home() {
  return (
    <main className="flex justify-center flex-row">
      {/* 타이틀 */}
      <div className="flex items-center text-right h-[700px] border border-green-400 flex-col">
        <h1 className="font-busan text-[80px] border border-pink-400">
          <span className="block leading-[80px]">KOREA</span>
          <span className="block leading-[50px]">RANDOM</span>
          <span className="block leading-[80px]">TRAVEL</span>
        </h1>
        <Guide />
      </div>
      {/* 지도 */}
      <KoreaMap />
    </main>
  );
}
