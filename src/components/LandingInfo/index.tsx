interface LandingInfoProps {}

function LandingInfo({}: LandingInfoProps) {
  return (
    <div className="flex flex-col max-w-3xl items-center gap-5">
      <h1 className="text-3xl sm:text-6xl tracking-tighter text-center font-bold transition-all text-tertiary">
        Brand Name Checker Thingy
      </h1>
      <p className="tracking-tighter text-center w-full max-w-[500px] transition-all text-tertiary">
        Check domain name, social handle & registered business name availability
        for your next project. Free to use, forever.
      </p>
    </div>
  );
}

export default LandingInfo;
