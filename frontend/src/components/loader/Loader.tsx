import stl from './Loader.module.scss';

function Loader() {
	return (
		<div className={stl.container}>
			<div className={stl.spinner}>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
			</div>
		</div>
	);
}

export default Loader;
