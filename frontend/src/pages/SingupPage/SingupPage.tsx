import Singup from '../../components/authorization/singup/Singup';
import stl from './SingupPage.module.scss';

function SingupPage() {
	return (
		<div className={stl.container}>
			<Singup />
		</div>
	);
}

export default SingupPage;
