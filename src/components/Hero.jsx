export function Hero() {
  const titleLines = ['I build the', 'things worth', 'building.'];

  return (
    <section className="hero section-frame" id="top">
      <div className="hero-heading">
        <p className="eyebrow">Software engineer / builder / researcher</p>
        <p className="hero-location">Flagstaff, AZ <span aria-hidden="true">→</span> India</p>
        <h1 className="hero-title" aria-label="I build the things worth building.">
          {titleLines.map((line, index) => (
            <span className={index === 2 ? 'hero-title__line hero-title__line--accent' : 'hero-title__line'} key={line} style={{ '--line-index': index }} aria-hidden="true">
              {line}
            </span>
          ))}
        </h1>
      </div>
      <div className="hero-grid">
        <p className="hero-intro">I am Avnish Sinha. I work across product engineering and research to turn difficult technical problems into useful things people can actually use.</p>
        <a className="text-link" href="#projects">Explore selected work <span aria-hidden="true">↘</span></a>
      </div>
    </section>
  );
}