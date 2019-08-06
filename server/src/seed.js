const colors = require('colors')
const app = require('./app')

const adminId = '5b8034ad3b5bcc37a0535c89'

const series = {
	acts: {
		// _id: '5b8034ad3b5bcc37a0535c00',
		title: 'Acts',
		description: `Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
			tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
			quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
			consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
			cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
			proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
		image: 'https://i.ytimg.com/vi/yOvt9BqjEEk/maxresdefault.jpg',
		authorId: adminId
	},
	mark: {
		// _id: '5b8034ad3b5bcc37a0535c01',
		title: 'Mark',
		description: `Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
			tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
			quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
			consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
			cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
			proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
		image:
			'http://32edd11cf9ed6fb1e1c8-971f60a4668d3052209ebf245940277f.r51.cf2.rackcdn.com/uploaded/g/0e5180533_1466516679_gospel-of-mark-image.jpg',
		authorId: adminId
	}
}

const otherSeries = [
	{
		title: 'Hebrews',
		description: `Ut enim ad minim veniam,
            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat.`,
		image: 'https://dummyimage.com/1920x1080/ccc/aaa',
		authorId: adminId
	},
	{
		title: '1 Corinthians',
		description: `Ut enim ad minim veniam,
            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat.`,
		image: 'https://dummyimage.com/1920x1080/ccc/aaa',
		authorId: adminId
	},
	{
		title: 'James',
		description: `Ut enim ad minim veniam,
            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat.`,
		image: 'https://dummyimage.com/1024x768/ccc/aaa',
		authorId: adminId
	},
	{
		title: '1 Peter',
		description: `Ut enim ad minim veniam,
            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat.`,
		image: 'https://dummyimage.com/1920x1080/ccc/aaa',
		authorId: adminId
	},
	{
		title: 'Revelation',
		description: `Ut enim ad minim veniam,
            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat.`,
		image: 'https://dummyimage.com/800x600/ccc/aaa',
		authorId: adminId
	},
	{
		title: 'John 3',
		description: `Ut enim ad minim veniam,
            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat.`,
		image: 'https://dummyimage.com/1920x1080/ccc/aaa',
		authorId: adminId
	},
	{
		title: 'Hosea',
		description: `Ut enim ad minim veniam,
            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat.`,
		image: 'https://dummyimage.com/100x100/ccc/aaa',
		authorId: adminId
	},
	{
		title: 'Genesis',
		description: `Ut enim ad minim veniam,
            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat.`,
		image: 'https://dummyimage.com/1920x1080/ccc/aaa',
		authorId: adminId
	},
	{
		title: 'Exodus',
		description: `Ut enim ad minim veniam,
            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat.`,
		image: 'https://dummyimage.com/1920x1080/ccc/aaa',
		authorId: adminId
	},
	{
		title: 'Leviticus',
		description: `Ut enim ad minim veniam,
            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat.`,
		image: 'https://dummyimage.com/1920x1080/ccc/aaa',
		authorId: adminId
	},
	{
		title: 'Deuteronomy',
		description: `Ut enim ad minim veniam,
            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat.`,
		image: 'https://dummyimage.com/1920x1080/ccc/aaa',
		authorId: adminId
	}
]

async function seedDatabase() {
	await app.service('series').remove(null, { query: {} })
	console.log('Removed all series!'.green)

	await app.service('sermons').remove(null, { query: {} })
	console.log('Removed all sermons!'.green)

	// Create Other Series
	await app.service('series').create(otherSeries)

	// Create Acts Series
	let acts = await app.service('series').create(series.acts)
	console.log(`Series 'Acts' created!`.green)

	// create Acts Sermons
	for (let num of [...Array(8).keys()]) {
		await app.service('sermons').create({
			title: `Acts ${num + 1}`,
			description: `At vero eos et accusamus et iusto odio dignissimos ducimus 
                qui blanditiis praesentium voluptatum deleniti atque corrupti quos 
                dolores et quas molestias excepturi sint occaecati cupiditate non 
                provident, similique sunt in culpa qui officia deserunt mollitia 
                animi, id est laborum et dolorum fuga.`,
			datePreached: new Date(`2018-09-${num + 1} 13:15:01.921Z`),
			scripture: `Acts ${num + 1}: 1-8`,
			video: `https://www.youtube.com/watch?v=aqz-KE-bpKQ`,
			seriesId: acts._id,
			authorId: adminId
		})
	}

	// Create Mark Series
	let mark = await app.service('series').create(series.mark)
	console.log(`Series 'Mark' created!`.green)

	// create Mark Sermons
	for (let num of [...Array(15).keys()]) {
		await app.service('sermons').create({
			title: `Mark ${num + 1}`,
			description: `At vero eos et accusamus et iusto odio dignissimos ducimus 
                qui blanditiis praesentium voluptatum deleniti atque corrupti quos 
                dolores et quas molestias excepturi sint occaecati cupiditate non 
                provident, similique sunt in culpa qui officia deserunt mollitia 
                animi, id est laborum et dolorum fuga.`,
			datePreached: new Date(`2018-09-${num + 1} 13:15:01.921Z`),
			scripture: `Mark ${num + 1}: 1-8`,
			video: `https://www.youtube.com/watch?v=aqz-KE-bpKQ`,
			seriesId: mark._id,
			authorId: adminId
		})
	}

	// process.exit();
}

seedDatabase()

// // Seed Series
// async function removeSeries() {
// 	return app.service('series').remove(null, { query: {} })
// }

// const rs = await removeSeries();

// await app.service('series').create(series).then((createdSeries) => {
// 	console.log('Series Created: ', createdSeries);
// });
