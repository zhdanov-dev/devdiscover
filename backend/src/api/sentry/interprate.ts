import express from 'express';
import SentryAPIClient from '../../util/SentryAPIClient';

import User from '../../models/User';
import axios from 'axios';

var natural = require('natural');

const router = express.Router();

router.get('/', async (req, res) => {
	const { str, userId } = req.query;
	const tokenizerArr = String(str).split(' ');
	const stemArr: string[] = [];
	let arr_en = [
		'a',
		'b',
		'c',
		'd',
		'e',
		'f',
		'g',
		'h',
		'i',
		'j',
		'k',
		'l',
		'm',
		'n',
		'o',
		'p',
		'q',
		'r',
		's',
		't',
		'u',
		'v',
		'w',
		'x',
		'y',
		'z',
	];
	let arr_num = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
	const specs = {
		event: false,
		error: false,
		nameOrNum: false,
		latest: false,
		oldest: false,
	};

	let nameOrNum = '';

	tokenizerArr.forEach((word: string) => {
		const a = 'последн';
		const b = 'стар';
		const c = 'событ';
		const d = 'ошибк';
		const e = 'проблем';

		const z = natural.PorterStemmerRu.stem(word);

		if (natural.LevenshteinDistance(z, a) <= 1) {
			stemArr.push(word);
			specs.latest = true;
		}
		if (natural.LevenshteinDistance(z, b) <= 1) {
			stemArr.push(word);
			specs.oldest = true;
		}
		if (natural.LevenshteinDistance(z, c) <= 1) {
			stemArr.push(word);
			specs.event = true;
		}
		if (
			natural.LevenshteinDistance(z, d) <= 1 ||
			natural.LevenshteinDistance(z, e) <= 1
		) {
			stemArr.push(word);
			specs.error = true;
		}
		if (arr_en.includes(word[0]) || arr_num.includes(Number(word[0]))) {
			stemArr.push(natural.PorterStemmerRu.stem(word));
			specs.nameOrNum = true;
			nameOrNum = word;
		}
	});

	let result;

	if (
		specs.event &&
		specs.nameOrNum &&
		!specs.error &&
		!specs.latest &&
		!specs.oldest
	) {
		const user = await User.findOne({ where: { id: userId } });
		const token = await SentryAPIClient.getSentryAPIToken(Number(userId));
		const path = `/projects/${user.externalSlug}/${nameOrNum}/events/`;
		await axios({
			method: 'GET',
			url: `${process.env.SENTRY_URL}/api/0${path}`,
			headers: { Authorization: `Bearer ${token}` },
		}).then(resp => (result = resp.data));
	}

	if (
		!specs.event &&
		specs.nameOrNum &&
		specs.error &&
		!specs.latest &&
		!specs.oldest
	) {
		const user = await User.findOne({ where: { id: userId } });
		const token = await SentryAPIClient.getSentryAPIToken(Number(userId));
		const path = `/projects/${user.externalSlug}/${nameOrNum}/issues/`;
		await axios({
			method: 'GET',
			url: `${process.env.SENTRY_URL}/api/0${path}`,
			headers: { Authorization: `Bearer ${token}` },
		}).then(resp => (result = resp.data));
	}

	if (
		specs.event &&
		specs.nameOrNum &&
		specs.error &&
		!specs.latest &&
		!specs.oldest
	) {
		const token = await SentryAPIClient.getSentryAPIToken(Number(userId));
		const path = `/issues/${nameOrNum}/events/`;
		await axios({
			method: 'GET',
			url: `${process.env.SENTRY_URL}/api/0${path}`,
			headers: { Authorization: `Bearer ${token}` },
		}).then(resp => (result = resp.data));
	}

	if (
		specs.event &&
		specs.nameOrNum &&
		specs.error &&
		specs.latest &&
		!specs.oldest
	) {
		const token = await SentryAPIClient.getSentryAPIToken(Number(userId));
		const path = `/issues/${nameOrNum}/events/latest/`;
		await axios({
			method: 'GET',
			url: `${process.env.SENTRY_URL}/api/0${path}`,
			headers: { Authorization: `Bearer ${token}` },
		}).then(resp => (result = resp.data));
	}

	if (
		specs.event &&
		specs.nameOrNum &&
		specs.error &&
		!specs.latest &&
		specs.oldest
	) {
		const token = await SentryAPIClient.getSentryAPIToken(Number(userId));
		const path = `/issues/${nameOrNum}/events/oldest/`;
		await axios({
			method: 'GET',
			url: `${process.env.SENTRY_URL}/api/0${path}`,
			headers: { Authorization: `Bearer ${token}` },
		}).then(resp => (result = resp.data));
	}
	res.send(result);
});

export default router;
