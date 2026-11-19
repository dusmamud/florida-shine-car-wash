import { chromium } from 'playwright';
const browser = await chromium.launch({
	executablePath: '/home/hatch/shot-work/chrome-headless-shell-linux64/chrome-headless-shell',
	args: ['--no-sandbox', '--disable-dev-shm-usage']
});
const pages = [
	{ path: '/', name: 'home' },
	{ path: '/packages', name: 'packages' },
	{ path: '/book', name: 'book' },
	{ path: '/locations', name: 'locations' },
	{ path: '/gallery', name: 'gallery' },
	{ path: '/memberships', name: 'memberships' }
];
const results = {};
for (const p of pages) {
	// desktop
	const dp = await browser.newPage({ viewport: { width: 1280, height: 900 } });
	await dp.goto(`http://localhost:4180${p.path}`, { waitUntil: 'networkidle' });
	await dp.waitForTimeout(1200);
	await dp.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
	await dp.waitForTimeout(800);
	await dp.evaluate(() => window.scrollTo(0, 0));
	await dp.waitForTimeout(400);
	await dp.screenshot({ path: `/home/hatch/workspace/florida-shine-car-wash/screenshots/${p.name}-desktop.png`, fullPage: true });
	await dp.close();
	// mobile 390
	const mp = await browser.newPage({ viewport: { width: 390, height: 844 } });
	await mp.goto(`http://localhost:4180${p.path}`, { waitUntil: 'networkidle' });
	await mp.waitForTimeout(1200);
	await mp.screenshot({ path: `/home/hatch/workspace/florida-shine-car-wash/screenshots/${p.name}-mobile.png`, fullPage: true });
	// 320 overflow
	const sp = await browser.newPage({ viewport: { width: 320, height: 800 } });
	await sp.goto(`http://localhost:4180${p.path}`, { waitUntil: 'networkidle' });
	await sp.waitForTimeout(1000);
	const ov = await sp.evaluate(() => {
		const de = document.documentElement;
		const bad = [];
		document.querySelectorAll('*').forEach((el) => {
			const r = el.getBoundingClientRect();
			if (r.right > 321 && r.width > 0) bad.push(`${el.tagName}.${(el.className || '').toString().slice(0, 50)} right=${Math.round(r.right)}`);
		});
		return { scrollWidth: de.scrollWidth, clientWidth: de.clientWidth, overflow: de.scrollWidth - de.clientWidth, bad: bad.slice(0, 5) };
	});
	results[p.name] = ov;
	console.log(p.name, JSON.stringify(ov));
	await sp.close();
	await mp.close();
}
await browser.close();
console.log('DONE', JSON.stringify(results));
