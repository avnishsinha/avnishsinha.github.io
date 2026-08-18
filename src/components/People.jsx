import { photos } from '../data/photos';

export function People() {
	return (
		<section className="people section-frame" id="people">
			<div className="people-intro">
				<div className="section-label">02 / People</div>
				<h2>A room full of builders changes the pace of the work.</h2>
				<p>CalHacks brought the work out of the usual lanes: ideas became prototypes, and prototypes became conversations.</p>
			</div>
			<div className="photo-editorial">
				{photos.map((photo, index) => (
					<figure className={photo.featured ? 'photo-frame photo-frame--featured' : 'photo-frame'} key={photo.src}>
						<img src={photo.src} alt={photo.alt} loading={index === 0 ? 'eager' : 'lazy'} />
						<span className="photo-index" aria-hidden="true">0{index + 1}</span>
					</figure>
				))}
			</div>
		</section>
	);
}