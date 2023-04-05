import stl from './Setup.module.scss';
import logo70 from '../../static/svg/logo70.svg';

interface SetupProps {
	submitIntagration(e: React.SyntheticEvent): Promise<void>;
}

function Setup({submitIntagration}: SetupProps) {
	return (
		<form className={stl.container}>
			<div className={stl.logo}>
				<img src={logo70} alt='' />
			</div>
			<main className={stl.content}>
					<p className={stl.title}>Завершите интеграцию Sentry c DevDiscover</p>
					<span className={stl.subtitle}>
						Выполнив эту установку, вы получите доступ к следующим функциям:
					</span>
					<p className={stl.key}>Вебхуки</p>
					<ul>
						<li className={stl.subtitle}>
							Ослеживание объема ошибок/проблем Sentry
						</li>
						<li className={stl.subtitle}>
							Делайте причудливые вещи, когда срабатывают события Sentry
						</li>
					</ul>
					<p className={stl.key}>Визуализация</p>
					<ul>
						<li className={stl.subtitle}>
							Получайте данные в нужнам вам формате
						</li>
						<li className={stl.subtitle}>
							Возможность визуализировать данные в виде графика
						</li>
					</ul>
					<p className={stl.key}>API</p>
					<ul>
						<li className={stl.subtitle}>
							Получите доступ к Sentry API, чтобы делать еще больше вкусностей
						</li>
					</ul>
				<button onClick={(e) => submitIntagration(e)}>Завершить</button>
			</main>
		</form>
	);
}

export default Setup;
