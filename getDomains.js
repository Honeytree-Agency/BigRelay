const fs = require('fs');
const path = require('path');
const cron = require('node-cron');
const { exec } = require('child_process');

cron.schedule('*/5 * * * *', async () => {
    exec('relay control domain list', (err, stdout, stderr) => {
        if (err) return console.error(err);

        const resp = stderr.split('\n');
        const total = resp
            .filter((el) => el.startsWith('Total'))[0]
            .split(':')[1]
            .trim();
        const le_domains = resp.filter((el) => el.startsWith('[*] '));
        let domains = [];
        le_domains.forEach((domain) => {
            domains.push(domain.replace('[*] ', ''));
        });

        const final = {
            total,
            domains,
            updated_at: new Date().toUTCString(),
        };

        fs.writeFile(path.join(__dirname, 'domains.json'), JSON.stringify(final), (err) => {
            if (err) return console.error('There was an error updating the list of domains: ', err);
        });
    });
});
