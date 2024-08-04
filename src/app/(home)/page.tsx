import KoreaMap from '../../components/KoreaMap';

export default function Home() {
  return (
    <main className="flex justify-center">
      <div className="flex items-center text-right h-[400px] border border-primary">
        <h1 className="font-busan text-[80px] ">
          <span className="block leading-[80px]">KOREA</span>
          <span className="block leading-[50px]">RANDOM</span>
          <span className="block leading-[80px]">TRAVEL</span>
        </h1>
      </div>
      <KoreaMap />
    </main>
  );
}
