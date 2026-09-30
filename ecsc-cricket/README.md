# ECSC Challenge Trophy 2026

1. Install Node.js (LTS) from https://nodejs.org.
2. In a terminal inside this folder run: `node server.js`
3. Public site: http://localhost:3000   Admin panel: http://localhost:3000/admin
4. Default admin password: `ECS2026`. Change it with `ADMIN_PASSWORD=MyPass node server.js` (Windows PowerShell: `$env:ADMIN_PASSWORD="MyPass"; node server.js`).
5. The folder ships with demo data in `data.json`. To start clean: Admin > Teams & Players > Reset all data. Start with Tournament Setup, then Teams, Groups, Battles & Fixtures (set the playing XI), then Live Scoring.
6. Same Wi-Fi: find your PC's IP (`ipconfig`), open http://YOUR-IP:3000 on phones.
7. Own domain: upload the folder to a host that runs Node.js, set ADMIN_PASSWORD there, run `node server.js` (set PORT if required). Keep `data.json`.
