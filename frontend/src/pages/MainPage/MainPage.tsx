import Example from '../../components/example/Example';
import Header from '../../components/header/Header';
import Search from '../../components/search/Search';
import { useAuth } from '../../hooks/use-auth';
import stl from './MainPage.module.scss';

import examples from '../../examples.json';
import { ExampleType } from '../../types';

function MainPage() {
	const { isAuth, integration, email } = useAuth();

	return (
		<div className={stl.container}>
			<Header email={email} />
			<Search />
			<div className={stl.examples}>
				<span className={stl.title}>Примеры запросов:</span>
				{examples.map((example: ExampleType, key: number) => {
					return (
						<div className={stl.example}>
							<Example
								textOne={example.textOne}
								accentOne={example.accentOne}
								textTwo={example.textTwo}
								accentTwo={example.accentTwo}
								key={key}
							/>
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default MainPage;
