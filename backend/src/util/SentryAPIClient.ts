import axios, { AxiosResponse, Method } from 'axios';

import { TokenResponseData } from '../api/sentry/setup';
import User from '../models/User';
import SentryInstallation from '../models/SentryInstallation';

class SentryAPIClient {
	private token: string;

	constructor(token: string) {
		this.token = token;
	}

	/**
	 * Fetches an organization's Sentry API token, refreshing it if necessary.
	 */
	static async getSentryAPIToken(userId: number) {
		const sentryInstallation = await SentryInstallation.findOne({
			where: { userId: userId },
		});

		// If the token is not expired, no need to refresh it
		if (sentryInstallation.expiresAt.getTime() > Date.now()) {
			return sentryInstallation.token;
		}

		// If the token is expired, we'll need to refresh it...
		console.info(
			`Token for '${sentryInstallation.orgSlug}' has expired. Refreshing...`
		);
		// Construct a payload to ask Sentry for a new token
		const payload = {
			grant_type: 'refresh_token',
			refresh_token: sentryInstallation.refreshToken,
			client_id: process.env.SENTRY_CLIENT_ID,
			client_secret: process.env.SENTRY_CLIENT_SECRET,
		};

		// Send that payload to Sentry and parse the response
		const tokenResponse: { data: TokenResponseData } = await axios.post(
			`${process.env.SENTRY_URL}/api/0/sentry-app-installations/${sentryInstallation.uuid}/authorizations/`,
			payload
		);

		// Store the token information for future requests
		const { token, refreshToken, expiresAt } = tokenResponse.data;
		const updatedSentryInstallation = await sentryInstallation.update({
			token,
			refreshToken,
			expiresAt: new Date(expiresAt),
		});
		console.info(
			`Token for '${updatedSentryInstallation.orgSlug}' has been refreshed.`
		);

		// Return the newly refreshed token
		return updatedSentryInstallation.token;
	}

	// We create static wrapper on the constructor to ensure our token is always refreshed
	// static async create(organization: Organization) {
	// 	const token = await SentryAPIClient.getSentryAPIToken(organization);
	// 	return new SentryAPIClient(token);
	// }

	// public async request(method: Method, path: string, data?: object) {
	// 	const response = await axios({
	// 		method,
	// 		url: `${process.env.SENTRY_URL}/api/0${path}`,
	// 		headers: { Authorization: `Bearer ${this.token}` },
	// 		data,
	// 	});

	// 	return response;
	// }

	// public get(path: string) {
	// 	return this.request('GET', path);
	// }

	// TODO(you): Extend as you see fit!
}

export default SentryAPIClient;
