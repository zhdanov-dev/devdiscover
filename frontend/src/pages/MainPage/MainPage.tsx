import Example from '../../components/example/Example';
import Header from '../../components/header/Header';
import Search from '../../components/search/Search';
import { useAuth } from '../../hooks/use-auth';
import stl from './MainPage.module.scss';
import examples from '../../examples.json';
import { ExampleType } from '../../types';
import { SyntheticEvent, useRef, useState } from 'react';
import axios from 'axios';
import { useAppSelector } from '../../hooks/redux-hooks';
import ReactJson from 'react-json-view';
import { Navigate } from 'react-router-dom';
import Table from '../../components/table/Table';

function MainPage() {
	const { isAuth, email, token, id } = useAuth();
	const [data, setData] = useState<any>({});
	const [param, setParam] = useState('');
	const dat = useRef<any>();
	const { input } = useAppSelector(state => state.search);

	async function getSearchData(e: SyntheticEvent) {
		console.log(input);
		e.preventDefault();
		await axios({
			method: 'GET',
			url: 'http://localhost:5000/api/sentry/interprate/',
			headers: { Authorization: 'Bearer ' + token },
			params: { userId: id, str: input },
		}).then(res => {
			setData(res.data.result);
			dat.current = res.data.result;
			res.data.paramKey ? setParam(res.data.paramKey) : setParam('')
		});
	}

	return isAuth ? (
		<div className={stl.container}>
			<Header email={email} />
			<Search getSearchData={getSearchData} />
			{Object.keys(data).length !== 0 && param === '' ? (
				<ReactJson src={data} />
			) : Object.keys(data).length !== 0 && param !== '' ? (
				<Table values={dat.current} param={param} />
			) : (
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
			)}
			{/* <button onClick={() => methodDoesNotExist()}>Break the world</button>; */}
			<div className={stl.annot}>
				<span>
					{
						'Написав Ваш запрос, Вы можете добавить тип вывода данных, по-умолчанию это JSON, но Вы также можете получить данные в виде таблицы, как в примере 1, таким орбразом удобнее просматривать большое количество данных. Еденичные данные всегда будут представлены в формате JSON.'
					}
				</span>
			</div>
		</div>
	) : (
		<Navigate to={'/signup'}></Navigate>
	);
}

export default MainPage;
