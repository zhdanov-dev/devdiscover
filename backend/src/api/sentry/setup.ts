import axios from 'axios';
import express from 'express';

import User from '../../models/User';
import SentryInstallation from '../../models/SentryInstallation';

export type TokenResponseData = {
	expiresAt: string;
	token: string;
	refreshToken: string;
};

export type InstallResponseData = {
	app: {
		uuid: string;
		slug: string;
	};
	organization: {
		slug: string;
	};
	uuid: string;
};

const router = express.Router();

router.post('/', async (req, res) => {
	const { code, installationId, sentryOrgSlug, userId } = req.body;

	const payload = {
		grant_type: 'authorization_code',
		code,
		client_id: process.env.SENTRY_CLIENT_ID,
		client_secret: process.env.SENTRY_CLIENT_SECRET,
	};

	const tokenResponse: { data: TokenResponseData } = await axios.post(
		`${process.env.SENTRY_URL}/api/0/sentry-app-installations/${installationId}/authorizations/`,
		payload
	);

	const { token, refreshToken, expiresAt } = tokenResponse.data;
	const user = await User.findByPk(userId);
	await SentryInstallation.create({
		uuid: installationId as string,
		orgSlug: sentryOrgSlug as string,
		expiresAt: new Date(expiresAt),
		token,
		refreshToken,
		userId: user.id,
	});

	const verifyResponse: { data: InstallResponseData } = await axios.put(
		`${process.env.SENTRY_URL}/api/0/sentry-app-installations/${installationId}/`,
		{ status: 'installed' },
		{
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}
	);

	user.externalSlug = sentryOrgSlug;
	await user.save();

	console.info(tokenResponse.data.token);
	res.status(201).send({
		redirectUrl: `${process.env.SENTRY_URL}/settings/${sentryOrgSlug}/sentry-apps/${verifyResponse.data.app.slug}/`,
	});
});

export default router;
