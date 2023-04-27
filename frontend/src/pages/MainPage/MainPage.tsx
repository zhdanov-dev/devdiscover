import Example from '../../components/example/Example';
import Header from '../../components/header/Header';
import Search from '../../components/search/Search';
import { useAuth } from '../../hooks/use-auth';
import stl from './MainPage.module.scss';
import examples from '../../examples.json';
import { ExampleType } from '../../types';
import { SyntheticEvent, useState } from 'react';
import axios from 'axios';
import { useAppSelector } from '../../hooks/redux-hooks';
import ReactJson from 'react-json-view';
import { Navigate } from 'react-router-dom';

function MainPage() {
	const { isAuth, email, token, id } = useAuth();
	const [data, setData] = useState({});
	const { input } = useAppSelector(state => state.search);

	async function getSearchData(e: SyntheticEvent) {
		console.log(input);
		e.preventDefault();
		await axios({
			method: 'GET',
			url: 'http://localhost:5000/api/sentry/interprate/',
			headers: { Authorization: 'Bearer ' + token },
			params: { userId: id, str: input },
		}).then(res => setData(res.data));
	}

	return isAuth ? (
		<div className={stl.container}>
			<Header email={email} />
			<Search getSearchData={getSearchData} />
			{Object.keys(data).length !== 0 ? (
				<ReactJson src={data} />
			) : (
				<div className={stl.examples}>
					<span className={stl.title}>Примеры запросов:</span>
					{examples.map((example: ExampleType, index: number) => {
						return (
							<div className={stl.example}>
								<Example
									textOne={example.textOne}
									accentOne={example.accentOne}
									textTwo={example.textTwo}
									accentTwo={example.accentTwo}
									key={index}
								/>
							</div>
						);
					})}
				</div>
			)}
		</div>
	) : (
		<Navigate to={'/signup'}></Navigate>
	);
}

export default MainPage;
