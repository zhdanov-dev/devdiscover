import stl from './Section.module.scss';

interface SectionProps {
	title?: string;
	content?: string[];
	accent?: string;
	image?: string;
	type?: 'title' | 'first' | 'second';
}

function Section({ title, content, accent, image, type }: SectionProps) {
	return (
		<div className='section'>
			<div className={stl.container}>
				{type === 'title' && (
					<div>
						<h1 style={{ fontSize: '60px' }}>{title}</h1>
					</div>
				)}
				{type === 'first' && (
					<div className={stl.block}>
						<div>
							<span>{content![0]}</span>
							<a href={content![1]}>{content![2]}</a>
						</div>
						<div>
							<div>
								<span className='slug'>{accent}</span>
								<span>{content![3]}</span>
							</div>
						</div>
					</div>
				)}
				{type === 'second' && (
					<div className={stl.block}>
						<div>
							<span>{content![0]}</span>
						</div>

						<div>
							<span>{content![1]}</span>
							<span className='slug'>{accent}</span>
						</div>
					</div>
				)}
				{type === 'first' && <img src={image} alt='' width={1210} />}
				{type === 'second' && <img src={image} alt='' width={1210} />}
			</div>
		</div>
	);
}

export default Section;
