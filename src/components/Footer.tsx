export default function Footer() {
  return (
    <footer className="flex w-full justify-center border-t border-primary bg-white text-[14px] text-primary">
      <div className="flex w-full max-w-[1280px] flex-col sm:flex-row">
        <div className="flex flex-1 flex-col justify-start border-l border-primary p-[10px] text-[12px]">
          <p>7-9, Omok-ro 26-gil, Yangcheon-gu, Seoul</p>
          <p className="font-semibold">BrickStudio</p>
        </div>
        <div className="flex flex-1 flex-col justify-start border-l border-primary p-[10px] text-[12px]">
          <p>Email. fridaynight@kakao.com</p>
          <p>Instagram. @kimdohyeon</p>
          <p>GitHub. github.com/kimzeze</p>
        </div>
        <div className="flex flex-1 flex-col justify-start border-l border-primary p-[10px] text-[12px]">
          <p>사이트 소개 | 서비스이용약관 | 개인정보처리방침 | 고객센터 | 제휴문의 | 광고문의</p>
        </div>
        <div className="flex flex-1 flex-col justify-start border-l border-r border-primary p-[10px] text-[12px] font-semibold">
          <p>
            Copyright © 2024 Kimdohyeon. <br /> All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
