//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat

/*
var javaScriptRelease = new Date('04 Dec 1995 00:12:00 GMT');
console.log(new Intl.DateTimeFormat('en-US').format(javaScriptRelease));
*/

export const openIssues = [
	{
		start:new Intl.DateTimeFormat('en-US').format(new Date('17 June 2018 00:12:00 GMT')),
		end:new Intl.DateTimeFormat('en-US').format(new Date('17 July 2018 00:12:00 GMT')),
	 	count:3,
		type: 'Visual',
		description: 'some description of Visual bug',
		open: true
	},
	{
		start:new Intl.DateTimeFormat('en-US').format(new Date('18 June 2018 00:12:00 GMT')),
		end:new Intl.DateTimeFormat('en-US').format(new Date('18 July 2018 00:12:00 GMT')),
	 	count:4,
		type: 'Functional',
		description: 'some description of Functional bug',
		open: true
	},
	{
		start:new Intl.DateTimeFormat('en-US').format(new Date('19 June 2018 00:12:00 GMT')),
		end:new Intl.DateTimeFormat('en-US').format(new Date('19 July 2018 00:12:00 GMT')),
	 	count:10,
		type: 'Performance',
		description: 'some description of Performance bug',
		open: true
	},
	{
		start:new Intl.DateTimeFormat('en-US').format(new Date('20 June 2018 00:12:00 GMT')),
		end:new Intl.DateTimeFormat('en-US').format(new Date('20 July 2018 00:12:00 GMT')),
	 	count:3,
		type: 'Technical',
		description: 'some description of Technical bug',
		open: true
	},
	{
		start:new Intl.DateTimeFormat('en-US').format(new Date('21 June 2018 00:12:00 GMT')),
		end:new Intl.DateTimeFormat('en-US').format(new Date('21 July 2018 00:12:00 GMT')),
	 	count:14,
		type: 'Other',
		description: 'some description of Other bug',
		open: true
	},
]


export const closedIssues = [
	{
		start:new Intl.DateTimeFormat('en-US').format(new Date('17 June 2018 00:12:00 GMT')),
		end:new Intl.DateTimeFormat('en-US').format(new Date('17 July 2018 00:12:00 GMT')),
		count:3,
		type: 'Technical',
		description: 'some description of Visual bug',
		open: false
	},
	{
		start:new Intl.DateTimeFormat('en-US').format(new Date('18 June 2018 00:12:00 GMT')),
		end:new Intl.DateTimeFormat('en-US').format(new Date('18 July 2018 00:12:00 GMT')),
		count:4,
		type: 'Performance',
		description: 'some description of Functional bug',
		open: false
	},
	{
		start:new Intl.DateTimeFormat('en-US').format(new Date('19 June 2018 00:12:00 GMT')),
		end:new Intl.DateTimeFormat('en-US').format(new Date('19 July 2018 00:12:00 GMT')),
		count:10,
		type: 'Other',
		description: 'some description of Performance bug',
		open: false
	},
	{
		start:new Intl.DateTimeFormat('en-US').format(new Date('20 June 2018 00:12:00 GMT')),
		end:new Intl.DateTimeFormat('en-US').format(new Date('20 July 2018 00:12:00 GMT')),
		count:3,
		type: 'Functional',
		description: 'some description of Technical bug',
		open: false
	},
	{
		start:new Intl.DateTimeFormat('en-US').format(new Date('21 June 2018 00:12:00 GMT')),
		end:new Intl.DateTimeFormat('en-US').format(new Date('21 July 2018 00:12:00 GMT')),
		count:14,
		type: 'Visual',
		description: 'some description of Other bug',
		open: false
	},
]
