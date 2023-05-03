import stl from './Head.module.scss'

interface HeadProps {
	values: Array<String>
}

function Head({values}: HeadProps) {
	return (
		<div className={stl.container}>
			{values.map((value, index) => {
				return (
					<div key={index}>
						<span>{value}</span>
					</div>
				);
			})}
		</div>
	);
}

export default Head