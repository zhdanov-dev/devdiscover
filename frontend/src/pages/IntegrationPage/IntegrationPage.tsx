import ReactFullpage from '@fullpage/react-fullpage';
import sentryFirst from '../../static/images/sentryFirst.png';
import sentrySecond from '../../static/images/sentrySecond.png';

import './IntegrationStyles.scss';
import Section from '../../components/section/Section';
import { useAuth } from '../../hooks/use-auth';
import { Navigate } from 'react-router-dom';

const anchors = ['Sentry', 'Sentry-First-Step', 'Sentry-Second-Step'];

function IntegrationPage() {
	const { isAuth, integration } = useAuth();
	return isAuth && integration ? (
		<Navigate to={'/main'}></Navigate>
	) : isAuth && !integration ? (
		<ReactFullpage
			credits={{}}
			anchors={anchors}
			dragAndMove={true}
			parallax={true}
			navigation
			navigationTooltips={anchors}
			scrollingSpeed={500}
			render={() => {
				return (
					<div style={{ width: '100%' }}>
						<Section type='title' title='Интеграция с Sentry' />
						<Section
							type='first'
							content={[
								'Для начала игтеграции с Sentry перейдите по ссылке - ',
								'https://organization-slug.sentry.io/settings/integrations/?search=devdiscover',
								'https://{organization-slug}.sentry.io/settings/integrations/?search=devdiscover',
								'  находится в настройках Вашего аккаунта Sentry',
							]}
							accent={'organization-slug'}
							image={sentryFirst}
						/>
						<Section
							type='second'
							content={[
								'Найдите и выберите интеграцию ',
								'После выбора интеграции нажмите ',
							]}
							accent={'Accept & Install'}
							image={sentrySecond}
						/>
					</div>
				);
			}}
		/>
	) : (
		<Navigate to={'/signup'}></Navigate>
	);
}

export default IntegrationPage;
