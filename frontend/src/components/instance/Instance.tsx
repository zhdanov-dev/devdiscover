import stl from './Instance.module.scss'

function Instance() {
	return (
		<div className={stl.container}>
			<div>
				<span>id:</span>
				<span>4013300633</span>
			</div>
			<div>
				<span>title:</span>
				<span>TypeError: Failed to fetch</span>
			</div>
			<div>
				<span>type:</span>
				<span>error</span>
			</div>
			<div>
				<span>status:</span>
				<span>unresolved</span>
			</div>
			<div>
				<span>project:</span>
				<span>javascript-react</span>
			</div>
		</div>
	);
}

export default Instance