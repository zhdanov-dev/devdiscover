import stl from './Instance.module.scss'

interface InstanceProps {
	values: Array<String>;
}

function Instance({values}: InstanceProps) {
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

export default Instance