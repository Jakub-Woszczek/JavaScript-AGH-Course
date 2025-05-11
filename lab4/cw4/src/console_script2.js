const fs = require('node:fs');
const { argv, stdin } = require('node:process');
const { exec } = require('node:child_process');

const COUNTER_FILE = 'counter.txt';

function syncMode() {
    let count = 0;

    try {
        if (fs.existsSync(COUNTER_FILE)) {
            const data = fs.readFileSync(COUNTER_FILE, 'utf-8');
            count = parseInt(data, 10) || 0;
        }
        count += 1;
        fs.writeFileSync(COUNTER_FILE, count.toString(), 'utf-8');
        console.log(`Liczba uruchomień: ${count}`);
    } catch (err) {
        console.error('Błąd w trybie sync:', err);
    }
}

function asyncMode() {
    fs.readFile(COUNTER_FILE, 'utf-8', (err, data) => {
        let count = 0;
        if (!err && data) {
            count = parseInt(data, 10) || 0;
        }
        count += 1;

        fs.writeFile(COUNTER_FILE, count.toString(), 'utf-8', (err) => {
            if (err) {
                console.error('Błąd zapisu:', err);
                return;
            }
            console.log(`Liczba uruchomień: ${count}`);
        });
    });
}

function commandMode() {
    console.log("Wpisuj komendy — Ctrl+C kończy program");

    stdin.setEncoding('utf-8');

    stdin.on('data', chunk => {
        const input = chunk.trim();
        if (input !== '') {
            exec(input, (err, stdout, stderr) => {
                if (err) {
                    console.error(`Błąd komendy "${input}":`, stderr.trim());
                } else {
                    console.log(stdout.trim());
                }
            });
        }
    });

    stdin.resume();
}

if (argv.includes('--sync')) {
    syncMode();
} else if (argv.includes('--async')) {
    asyncMode();
} else {
    commandMode();
}
