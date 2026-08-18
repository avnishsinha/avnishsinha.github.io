import { useEffect, useRef } from 'react';

const journey = [
	{ marker: '01', place: 'Arizona', title: 'A practical beginning', detail: 'Northern Arizona University gave me the foundations: computer science, teaching, and the habit of getting close to how systems actually work.' },
	{ marker: '02', place: 'Research', title: 'Software meets the physical world', detail: 'At NAU, I worked on Bluetooth-connected exoskeleton workflows and Arduino controls, learning to debug across the boundary between hardware and software.' },
	{ marker: '03', place: 'Product development', title: 'From prototypes to people', detail: 'At Minds Beyond Measure and CANIS LAB, the work became product-shaped: accessible interfaces, release testing, crash fixes, and features used beyond the development team.' },
	{ marker: '04', place: 'CalHacks 10.0', title: 'Build quickly, learn loudly', detail: 'A voice-controlled co-pilot prototype put me in a room with founders and builders, where a rough idea had to become a working system under real time pressure.' },
	{ marker: '05', place: 'San Francisco', title: 'Closer to the hard problems', detail: 'The Bay Area sharpened my interest in teams that move with urgency, stay curious, and care about the difference between a demo and a dependable product.' },
	{ marker: '06', place: 'India', title: 'The next chapter', detail: 'I am returning to India looking for a strong engineering opportunity and harder problems worthy of the range I have built.' },
];

export function Journey() {
	const journeyRef = useRef(null);

	useEffect(() => {
		const section = journeyRef.current;
		if (!section) {
			return undefined;
		}

		const steps = section.querySelectorAll('.journey-step');
		if (!('IntersectionObserver' in window)) {
			steps.forEach((step) => step.classList.add('is-visible'));
			return undefined;
		}

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						entry.target.classList.add('is-visible');
						observer.unobserve(entry.target);
					}
				});
			},
			{ rootMargin: '0px 0px -12% 0px', threshold: 0.1 },
		);

		steps.forEach((step) => observer.observe(step));
		return () => observer.disconnect();
	}, []);

	return (
		<section className="content-section journey section-frame" id="journey" ref={journeyRef}>
			<div className="section-label">01 / Journey</div>
			<div className="section-content">
				<h2>Not a ladder. A widening loop of problems.</h2>
				<div className="journey-timeline">
					{journey.map((step) => (
						<article className="journey-step" key={step.marker}>
							<div className="journey-step__marker"><span>{step.marker}</span></div>
							<div className="journey-step__content">
								<p className="journey-step__place">{step.place}</p>
								<h3>{step.title}</h3>
								<p>{step.detail}</p>
							</div>
						</article>
					))}
				</div>
			</div>
		</section>
	);
}