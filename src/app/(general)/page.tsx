import Image from "next/image";

export default function Home() {
  return (
    <>
      <div className="w-full h-[100%] flex flex-col justify-between pl-2 special:pl-4 special:h-[140%] md:h-[120%] lg:h-[100%] lg:w-[45%] lg:justify-around lg:pl-[0.5rem]">
        <h1 className="">Logo</h1>
        <div className="w-full special:mt-[60px] lg:mt-[30px]">
          <h1 className="text-mobile font-bold text-background md:text-tablet lg:text-desktop">
            Learning
          </h1>
          <h1 className="text-mobile font-light md:text-tablet lg:text-desktop">Online</h1>
        </div>
        <div className="w-[90%] md:w-[80%] lg:w-[85%]">
          <p className="text-sm text-left font-light mt-[40px] text-wrap md:text-md lg:text-[1.1rem] lg:mt-0 lg:font-light lg:whitespace-normal lg:w-full ">
            ILearner is a modern, intuitive Learning Management System (LMS)
            built to transform the way individuals, educators, and institutions
            deliver and experience online learning. Designed for accessibility
            and ease-of-use, ILearner enables seamless course creation, student
            management, assessments, and real-time progress tracking — all in
            one centralized platform. Whether you're a tutor, training
            organization, or school administrator, ILearner gives you the tools
            to educate, engage, and evaluate learners from anywhere in the
            world.
          </p>
        </div>
        <div className="w-full special:mt-[40px] lg:mt-0">
          <button className="w-[90%] rounded-md h-[40px] bg-background text-white special:w-[50%] md:h-[50px] md:text-lg md:w-[40%] lg:w-[50%] lg:text-[1.1rem] lg:tracking-wider">
            Get Started
          </button>
        </div>
      </div>
      <div className="w-full border mt-[100px] h-[60%] rounded-l-[50%] bg-background md:mt-[60px] md:flex md:justify-end md:pr-4 md:h-[50%] md:rounded-l-[40%] lg:w-[55%] lg:h-[100%] lg:object-cover lg:mt-0 lg:rounded-l-[50%]">
        <Image
          src="/image/lms-png.png"
          alt=""
          width={600}
          height={600}
          className=""
        />
      </div>
    </>
  );
}
