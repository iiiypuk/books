'use strict';

const fs = require('fs');
const ejs = require('ejs');

async function render() {
	try {
		// await fs.mkdir('public', (err) => {
  // 	if (err) throw err;
  // 		console.log('Public directory created!');
		// });

		let data = {};

		let siteConfig = fs.readFileSync('config.json');
		let booksList = fs.readFileSync('books.json');
		data = JSON.parse(siteConfig);
		data['books'] = JSON.parse(booksList);

		// console.log(data['books']['reads'][0]);

		const html = await ejs.renderFile("./templates/main.ejs", data);

		await fs.writeFile('./public/index.html', html, 'utf8', (err) => {
		if (err) throw err;
			console.log('Page has been generated!');
		});
	} catch (error) {
		console.log(error);
	}
}

render();
