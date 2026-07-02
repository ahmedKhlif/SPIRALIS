const particles = [
  ["10%", "18%", "0s", "22s", "dot"],
  ["18%", "72%", "-5s", "28s", "leaf"],
  ["28%", "34%", "-11s", "24s", "dot"],
  ["36%", "86%", "-8s", "30s", "leaf"],
  ["48%", "24%", "-14s", "26s", "dot"],
  ["58%", "66%", "-3s", "32s", "leaf"],
  ["68%", "40%", "-17s", "25s", "dot"],
  ["78%", "78%", "-9s", "29s", "leaf"],
  ["88%", "28%", "-20s", "27s", "dot"],
  ["94%", "60%", "-6s", "31s", "leaf"],
] as const;

export function BotanicalParticles() {
  return (
    <div className="botanical-particles" aria-hidden="true">
      {particles.map(([left, top, delay, duration, variant], index) => (
        <span
          className={`botanical-particle botanical-particle--${variant}`}
          key={`${left}-${top}-${index}`}
          style={{
            left,
            top,
            animationDelay: delay,
            animationDuration: duration,
          }}
        />
      ))}
    </div>
  );
}
