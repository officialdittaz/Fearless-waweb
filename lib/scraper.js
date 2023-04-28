import axios from 'axios'
import cheerio from 'cheerio'
import request from 'request'
import { JSDOM } from 'jsdom'
import fetch from 'node-fetch';


async function dood(url) {
    const headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.41 Safari/537.36',
        'Referer': url
    }
    if (!/\.(so|sh)\//.test(url)) {
        url = url.replace(/\.(.*?)\//, '.so/');
    }
    const baseURL = new URL(url).origin
    if (!/\/(e|f)\//.test(url)) {
        const get_iframe = await axios.get(url, { headers })
        const iframe = baseURL + /<iframe src="(.*?)"/.exec(get_iframe.data)[1]
        url = iframe
    } else if (/\/f\//.test(url)) {
        const get_single = await axios.get(url, { headers })
        const regexp = /"(https:\/\/dood\.(.*?)\/(.*?)\/(.*?))"/g;
        const str = get_single.data;
        const all_single = [...str.matchAll(regexp)].map(x => {
            return x[1]
        })
        url = all_single
    }
    const get_md5 = await axios.get(url, { headers })

    let pass_md5 = '/pass_md5/' + /\$\.get\('\/pass_md5\/(.*?)',/.exec(get_md5.data)[1]
    const token = pass_md5.slice(pass_md5.lastIndexOf('/')).substring(1)
    const md5 = await axios.get(baseURL + pass_md5, { headers })

    // from dood.to
    function makePlay(token) {
        for (var a = "", t = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", n = t.length, o = 0; 10 > o; o++) a += t.charAt(Math.floor(Math.random() * n));
        return a + "?token=" + token + "&expiry=" + Date.now();
    };

    const media_url = md5.data + makePlay(token)
    console.log(media_url);
}


async function randomTiktok(query) {
	return new Promise(async (resolve, reject) => {
		await axios.get('https://brainans.com/search?query=' + query).then(response => {
			const $ = cheerio.load(response.data)
			const User = $('#search-container > div:nth-child(1) > div.content__text > a').attr('href')
			axios.get('https://brainans.com/' + User).then(respon => {
				const soup = cheerio.load(respon.data)
				const Vidlink = []
				const main = soup('#videos_container > div > div.content__list.grid.infinite_scroll.cards > div > div > a')
				main.each(function () {
					const Vlink = 'https://brainans.com/' + soup(this).attr('href')
					Vidlink.push(Vlink)
				})
				pickrandom(Vidlink).then(res => {
					axios.get(res).then(resp => {
						const ch = cheerio.load(resp.data)
						const result = {
							username: ch('#card-page > div > div.row > div > div > div > div > div.main__user-desc.align-self-center.ml-2 > a').text(),
							caption: ch('#card-page > div > div.row > div > div > div.main_info.mb-4 > div.main_list').text(),
							likes: ch('#card-page > div > div.row > div > div > div.main__info.mb-4 > div > div:nth-child(1) > span').text(),
							comment: ch('#card-page > div > div.row > div > div > div.main_info.mb-4 > div.content_btns.d-flex > div:nth-child(2) > span').text(),
							share: ch('#card-page > div > div.row > div > div > div.main_info.mb-4 > div.content_btns.d-flex > div:nth-child(3) > span').text(),
							video: ch('#card-page > div > div.row > div > div > div.main_info.mb-4 > div.main_image-container > div > video').attr('src')
						}
						resolve(result)
					})
				}).catch(resolve)
			}).catch(resolve)
		}).catch(resolve)
	})
}
      
export default {
dood,
randomTiktok
 }


import { fileURLToPath, URL } from 'url'
const __filename = new URL('', import.meta.url).pathname
const __dirname = new URL('.', import.meta.url).pathname
import fs from "fs"
import chalk from'chalk'
let file = fileURLToPath(import.meta.url)
fs.watchFile(file, () => {
fs.unwatchFile(file)
console.log(chalk.bgGreen(chalk.black("[  UPDATE ]")),chalk.white(`${__filename}`) )
//delete require.cache[file]
import(`${file}?update=${Date.now()}`)
})

