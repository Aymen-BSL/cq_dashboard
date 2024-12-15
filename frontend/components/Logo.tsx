import Image from "next/image";

export default function Logo() {
  return (
    <div className="flex items-center gap-2">
      {/* Placeholder for Logo */}
      <Image
        src="/logoClassQuiz.webp"
        alt="logo"
        height={230}
        width={250}
        className="mt-[10] ml-[7]"
      />
      {/* <h1 className="text-xl font-bold text-grey-900"></h1> */}
    </div>
  );
}
