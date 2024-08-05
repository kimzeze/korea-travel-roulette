export default function Footer() {
  return (
    <footer className="flex justify-center h-[90px] bg-white text-primary text-[14px] border-t border-primary">
      <div className="text-[12px] w-[320px] h-[90px] border-l border-primary flex flex-col justify-start p-[10px]">
        <p>7-9, Omok-ro 26-gil, Yangcheon-gu, Seoul</p>
        <p className="font-semibold">BrickStudio</p>
      </div>
      <div className="text-[12px] w-[320px] h-[90px] border-l border-primary flex flex-col justify-start p-[10px]">
        <p>Email. fridaynight@kakao.com</p>
        <p>Instagram. @kimdohyeon</p>
        <p>GitHub. github.com/kimzeze</p>
      </div>
      <div className="text-[12px] h-[90px] w-[320px] border-l border-primary flex flex-col justify-start p-[10px]">
        <p>사이트 소개 | 서비스이용약관 | 개인정보처리방침 | 고객센터 | 제휴문의 | 광고문의</p>
      </div>
      <div className="font-semibold text-[12px] h-[90px] w-[320px] border-l border-r border-primary flex flex-col justify-start p-[10px]">
        <p>
          Copyright © 2024 Kimdohyeon. <br /> All rights reserved.
        </p>
      </div>
    </footer>
  );
}
