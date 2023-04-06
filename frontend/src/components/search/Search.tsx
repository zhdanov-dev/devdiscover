import stl from './Search.module.scss';
import { SyntheticEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { setSearch } from '../../store/slices/searchSlice';
import search from '../../static/svg/search.svg'

interface SearchProps {
	getSearchData(e: SyntheticEvent): void;
}

function Search({ getSearchData }: SearchProps) {
	const { input } = useAppSelector(state => state.search);
	const dispatch = useAppDispatch();

	return (
		<form onSubmit={e => getSearchData(e)} className={stl.container}>
			<input
				value={String(input)}
				onChange={e => {
					dispatch(
						setSearch({
							input: e.target.value,
						})
					);
				}}
				type='text'
				placeholder='Найдите информацию о логах в Sentry'
			/>
			<img
				onClick={e => getSearchData(e)}
				className={stl.search}
				src={search}
				alt=''
			/>
		</form>
	);
}

export default Search;
