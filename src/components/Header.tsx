export default function Header() {
  return (
    <header className="flex h-[100px] w-full justify-center border-b border-primary bg-white text-[14px] text-primary">
      <div className="flex h-[100px] w-[1280px] flex-col justify-start border-l border-r border-primary p-[10px] text-[12px]">
        <p>This is HEADER</p>
        <p className="font-semibold">BrickStudio</p>
        <p className="font-semibold">BrickStudio</p> <p className="font-semibold">BrickStudio</p>
      </div>
    </header>
  );
}
