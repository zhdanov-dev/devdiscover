import { Navigate } from 'react-router-dom';
import Header from '../../components/header/Header';
import { useAuth } from '../../hooks/use-auth';
import stl from './IntegrationPage.module.scss';
import sentryFirst from '../../static/images/sentryFirst.png';
import sentrySecond from '../../static/images/sentrySecond.png';

function IntegrationPage() {
	const { isAuth, integration, email } = useAuth();
	
	return isAuth ? (
		integration ? (
			<Navigate to={'/main'}></Navigate>
		) : (
			<>
				<Header email={email} />
				<main className={stl.container}>
					<div className={stl.sentry}>
						<h2>{'Интеграция с Sentry'}</h2>
						<div className={stl.con}>
							<div className={stl.sub_con}>
								<span>
									{'1. Для начала игтеграции с Sentry перейдите по ссылке - '}
								</span>
								<a
									href='https://organization-slug.sentry.io/settings/integrations/?search=devdiscover'
									className={stl.link}
								>
									https://
									{'{organization-slug}'}
									.sentry.io/settings/integrations/?search=devdiscover
								</a>
							</div>

							<div className={stl.con}>
								<span className={stl.const}>{'organization-slug'}</span>
								<span>{'находится в настройках Вашего аккаунта Sentry'}</span>
							</div>
						</div>
						<div className={stl.con}>
							<span>{'2. Найдите и выберите интеграцию '}</span>
							<span className={stl.const}>{'devdiscover'}</span>
						</div>
						<img className={stl.hint} src={sentryFirst} alt='' />
						<div className={stl.con}>
							<span>{'3. После выбора интеграции нажмите '}</span>
							<span className={stl.const}>{'Accept & Install'}</span>
						</div>
						<img className={stl.hint} src={sentrySecond} alt='' />
					</div>
				</main>
			</>
		)
	) : (
		<Navigate to={'/signup'}></Navigate>
	);
}

export default IntegrationPage;
