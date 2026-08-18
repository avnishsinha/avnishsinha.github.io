const proofPoints = [
	'Northern Arizona University',
	'Research + product development',
	'CalHacks 10.0 / Builder',
	'React · Flutter · Systems',
];

export function ProofStrip() {
	return (
		<section className="proof-strip section-frame" aria-label="Experience signals">
			<span className="proof-strip__label">Built across</span>
			<div className="proof-strip__items">
				{proofPoints.map((point) => <span key={point}>{point}</span>)}
			</div>
		</section>
	);
}