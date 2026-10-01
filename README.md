# Safety Culture Games (Flask + SQLite)
All files are in the repo root (no sub folders). `app.py` serves the pages AND stores results in `safety.db` (created automatically).
Run locally: `pip install flask` then `ADMIN_PASSWORD=mypass python app.py` and open http://127.0.0.1:5000
Deploy: see the PythonAnywhere steps in the chat. Update later: `git pull` on the server, then Reload.
Add a game: new `xyz.html` + one line in `GAMES` in `common.js`; save with `Store.save({... game:'xyz'})`.
Notes: answer key in `challenges.js` is visible in page source; only whitelisted file types are served (never app.py or safety.db).

## Render + Neon (free)
Render web service: Build `pip install -r requirements.txt`, Start `gunicorn app:app`. Env vars: `ADMIN_PASSWORD`, `DATABASE_URL` (Neon connection string). Without DATABASE_URL the app uses a local SQLite file (fine on your PC, NOT on Render free: files are wiped).
