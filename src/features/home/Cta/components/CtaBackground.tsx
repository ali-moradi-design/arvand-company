export function CtaBackground() {
  return (
    <div className="absolute inset-0 z-0">
      <div className="bg-gradient-radial absolute inset-0 from-red-500/20 via-transparent to-transparent opacity-30"></div>
      <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-repeat opacity-10"></div>
    </div>
  );
}
