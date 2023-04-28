import express from 'express';
import SentryAPIClient from '../../util/SentryAPIClient';
import User from '../../models/User';
import axios from 'axios';

const natural = require('natural');
const router = express.Router();

router.get('/', async (req, res) => {
	const { str, userId } = req.query;
	const tokenizerArr = String(str).split(' ');
	const specs = {
		event: false,
		name: false,
		num: false,
		error: false,
		latest: false,
		oldest: false,
		key: false,
		hash: false
	};

	const latest = 'последн';
	const oldest = 'стар';
	const event = 'событ';
	const error = 'ошибка';
	const problem = 'проблем';
	const tag = 'тег';
	const hash = 'хэш'
	let name = '';
	let num = '';
	let key = '';
	let result;

	tokenizerArr.forEach(word => {
		const stemWord = natural.PorterStemmerRu.stem(word);

		if (natural.LevenshteinDistance(stemWord, latest) <= 1) {
			specs.latest = true;
		}
		if (natural.LevenshteinDistance(stemWord, oldest) <= 1) {
			specs.oldest = true;
		}
		if (natural.LevenshteinDistance(stemWord, event) <= 1) {
			specs.event = true;
		}
		if (natural.LevenshteinDistance(stemWord, tag) <= 1) {
			specs.key = true;
		}
		if (natural.LevenshteinDistance(stemWord, hash) <= 1) {
			specs.hash = true;
		}
		if (
			natural.LevenshteinDistance(stemWord, error) <= 1 ||
			natural.LevenshteinDistance(stemWord, problem) <= 1
		) {
			specs.error = true;
		}
		if (/^[a-z]+$/i.test(word)) {
			key = word;
		}
		if (
			(/[a-z].*\d|\d.*[a-z]/i.test(word) && word.length === 32) ||
			(/^\d+$/.test(word) && word.length === 10)
		) {
			specs.num = true;
			num = word;
		}
		if (/^[a-z0-9!@#\$%\^\&*\)\(+=._-]+$/i.test(word) && !key && word !== num) {
			specs.name = true;
			name = word;
		}
	});

	const pathTable: any = {
		'11000000': '/projects/:externalSlug/:name/events/',
		'11100000': '/projects/:externalSlug/:name/events/:num/',
		'01010000': '/projects/:externalSlug/:name/issues/',
		'10110000': '/issues/:num/events/',
		'10111000': '/issues/:num/events/latest/',
		'10110100': '/issues/:num/events/oldest/',
		'00110010': '/issues/:num/tags/:key/',
		'00110001': '/issues/:num/hashes/',
	};

	const specKey = Object.values(specs).map(v => (v ? 1 : 0)).join('');
	if (pathTable[specKey]) {
		const path = pathTable[specKey];
		const user = await User.findOne({ where: { id: userId } });
		const token = await SentryAPIClient.getSentryAPIToken(Number(userId));
		const url = `${process.env.SENTRY_URL}/api/0${path
			.replace(':externalSlug', user.externalSlug)
			.replace(':name', name)
			.replace(':num', num)
			.replace(':key', key)}`;
			
		await axios({
			method: 'GET',
			url,
			headers: { Authorization: `Bearer ${token}` },
		}).then(resp => (result = resp.data));
	}

	res.send(result);
});

export default router;