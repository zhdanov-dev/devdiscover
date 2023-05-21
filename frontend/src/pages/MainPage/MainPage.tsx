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
import Loader from '../../components/loader/Loader';

function MainPage() {
	const { isAuth, email, token, id } = useAuth();
	const [data, setData] = useState<any>({});
	const [param, setParam] = useState('');
	const dataRef = useRef<any>();
	const { input } = useAppSelector(state => state.search);
	const [isLoading, setLoading] = useState(false);

	async function getSearchData(e: SyntheticEvent) {
		e.preventDefault();
		if (input !== '') {
			setLoading(true);
			await axios({
				method: 'GET',
				url: 'http://194.67.116.184:5000/api/sentry/interprate/',
				headers: { Authorization: 'Bearer ' + token },
				params: { userId: id, str: input },
			}).then(res => {
				setData(res.data.result);
				dataRef.current = res.data.result;
				res.data.paramKey ? setParam(res.data.paramKey) : setParam('');
				setLoading(false);
			});
		}
	}

	function renderContent() {
		if (
			Object.keys(data).length !== 0 &&
			param !== '01010000' &&
			param !== '11000000' &&
			param !== '10110000'
		)
			return <ReactJson src={data} />;
		else return <Table values={dataRef.current} param={param} />;
	}

	return isAuth ? (
		<div className={stl.container}>
			<Header email={email} />
			<Search getSearchData={getSearchData} />
			{!isLoading && Object.keys(data).length === 0 && (
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
					<div className={stl.annot}>
						<span>
							{
								'Написав Ваш запрос, Вы можете добавить тип вывода данных, по-умолчанию это JSON, но Вы также можете получить данные в виде таблицы, как в примере 1, таким орбразом удобнее просматривать большое количество данных. Еденичные данные всегда будут представлены в формате JSON.'
							}
						</span>
					</div>
				</div>
			)}
			{isLoading && <Loader />}
			{!isLoading && Object.keys(data).length !== 0 && renderContent()}
		</div>
	) : (
		<Navigate to={'/signup'}></Navigate>
	);
}

export default MainPage;
