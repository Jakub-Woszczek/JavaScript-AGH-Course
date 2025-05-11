import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { URL } from "node:url";
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const guestbookFilePath = path.join(__dirname, 'data', 'guestbook.json');

function getGuestbookEntries() {
    try {
        const data = fs.readFileSync(guestbookFilePath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
}

function saveGuestbookEntries(entries) {
    fs.writeFileSync(guestbookFilePath, JSON.stringify(entries, null, 2), 'utf-8');
}

function requestListener(request, response) {
    const url = new URL(request.url, `http://${request.headers.host}`);

    if (url.pathname === "/") {
        if (request.method === "GET") {
            const entries = getGuestbookEntries();
            let entriesHtml = '';
            entries.forEach(entry => {
                entriesHtml += `
                    <div>
                        <p><strong>${entry.name}</strong> napisał:</p>
                        <p>${entry.message}</p>
                        <hr />
                    </div>
                `;
            });

            // HTML strony głównej z formularzem
            response.writeHead(200, { "Content-Type": "text/html" });
            response.write(`
                <!DOCTYPE html>
                <html lang="pl">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Księga gości</title>
                </head>
                <body>
                    <h1>Księga gości</h1>
                    <h2>Poprzednie wpisy</h2>
                    ${entriesHtml}
                    <h2>Dodaj wpis</h2>
                    <form action="/" method="POST">
                        <label for="name">Imię i nazwisko:</label><br>
                        <input type="text" id="name" name="name" required><br><br>
                        <label for="message">Treść wpisu:</label><br>
                        <textarea id="message" name="message" rows="4" cols="50" required></textarea><br><br>
                        <input type="submit" value="Dodaj wpis">
                    </form>
                </body>
                </html>
            `);
            response.end();
        } else if (request.method === "POST") {
            let body = '';
            request.on('data', chunk => {
                body += chunk;
            });

            request.on('end', () => {
                const formData = new URLSearchParams(body);
                const name = formData.get('name');
                const message = formData.get('message');

                const entries = getGuestbookEntries();
                entries.push({ name, message });

                saveGuestbookEntries(entries);

                response.writeHead(302, { 'Location': '/' });
                response.end();
            });
        }
    } else {
        response.writeHead(404, { "Content-Type": "text/plain" });
        response.write("404 Not Found");
        response.end();
    }
}

const server = http.createServer(requestListener);
server.listen(8000, () => {
    console.log("Serwer działa na porcie 8000");
});
