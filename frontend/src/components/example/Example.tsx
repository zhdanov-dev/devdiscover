import stl from './Example.module.scss';
import { ExampleType } from '../../types';

interface ExampleProps extends ExampleType {}

function Example({ textOne, accentOne, textTwo, accentTwo }: ExampleProps) {
	return (
		<div className={stl.container}>
			<span>{textOne}</span>
			<span className={stl.actent}>{accentOne}</span>

			{textTwo && <span>{textTwo}</span>}
			{accentTwo && <span className={stl.actent}>{accentTwo}</span>}
		</div>
	);
}

export default Example;
