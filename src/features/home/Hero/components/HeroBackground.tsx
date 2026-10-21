export function HeroBackground() {
  return (
    <div className="absolute inset-0 z-0">
      <div className="absolute inset-0 bg-linear-to-b from-black via-black to-black/90"></div>

      <div className="animate-pulse-slow absolute start-1/3 top-1/3 h-[300px] w-[300px] rounded-full bg-red-500/20 blur-[100px] sm:h-[500px] sm:w-[500px]"></div>
      <div className="animate-pulse-slow absolute end-1/3 bottom-1/3 h-[250px] w-[250px] rounded-full bg-amber-500/20 blur-[100px] delay-1000 sm:h-[400px] sm:w-[400px]"></div>

      <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-repeat opacity-10"></div>
    </div>
  );
}
