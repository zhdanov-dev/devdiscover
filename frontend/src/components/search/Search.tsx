import stl from './Search.module.scss'
import logo from '../../static/svg/logoSearch.svg'
import { SyntheticEvent, useState } from 'react'
import { interpretRequest } from '../../util';

function Search() {
	const [inputValue, setInputValue] = useState('');

	function handlerSubmit(e: SyntheticEvent) {
		e.preventDefault();
		interpretRequest(inputValue);
	}

	return (
		<form onSubmit={(e) => handlerSubmit(e)} className={stl.container}>
			<img src={logo} alt="" />
			<div className={stl.input}>
				<input value={inputValue} onChange={(e) => {setInputValue(e.target.value)}} type="text" placeholder='Найдите информацию о логах в Sentry'/>
			</div>
		</form>
	)
}

export default Search