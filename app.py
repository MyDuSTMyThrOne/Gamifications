import os, sqlite3, hashlib, hmac
from flask import Flask, request, jsonify, send_from_directory, abort
BASE = os.path.dirname(os.path.abspath(__file__))
DB = os.path.join(BASE, 'safety.db')
ADMIN = os.environ.get('ADMIN_PASSWORD', 'change-me')
OK_EXT = {'.html', '.js', '.css', '.jpg', '.jpeg', '.png', '.webp', '.svg', '.ico'}  # app.py and safety.db are never served
app = Flask(__name__)

DATABASE_URL = os.environ.get('DATABASE_URL')  # set on Render = Postgres (Neon). Not set = local SQLite file.
if DATABASE_URL:
    import psycopg2, psycopg2.extras
COLS = 'ts TEXT, name TEXT, eid TEXT, dept TEXT, game TEXT, score INT, "max" INT, found INT, total INT, lang TEXT, sec INT, det TEXT'
_ready = False

def run(sql, args=(), fetch=False):
    """Run one SQL statement on Postgres or SQLite. Use ? as placeholder."""
    global _ready
    pk = 'id SERIAL PRIMARY KEY' if DATABASE_URL else 'id INTEGER PRIMARY KEY AUTOINCREMENT'
    ddl = 'CREATE TABLE IF NOT EXISTS results(%s, %s)' % (pk, COLS)
    if DATABASE_URL:
        conn = psycopg2.connect(DATABASE_URL)
        try:
            with conn, conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor) as cur:
                if not _ready: cur.execute(ddl); _ready = True
                cur.execute(sql.replace('?', '%s'), args)
                return [dict(r) for r in cur.fetchall()] if fetch else None
        finally:
            conn.close()
    conn = sqlite3.connect(DB); conn.row_factory = sqlite3.Row
    try:
        with conn:
            conn.execute(ddl)
            cur = conn.execute(sql, args)
            return [dict(r) for r in cur.fetchall()] if fetch else None
    finally:
        conn.close()

def is_admin():
    return hmac.compare_digest(request.headers.get('X-Admin', ''), ADMIN)

@app.route('/api/results', methods=['GET', 'POST', 'DELETE'])
def results():
    if request.method == 'POST':
        r = request.get_json(silent=True) or {}
        try:
            row = (str(r.get('ts', ''))[:30], str(r['name'])[:80], str(r['eid'])[:40], str(r.get('dept', ''))[:60], str(r.get('game', 'hunt'))[:20],
                   int(r['score']), int(r['max']), int(r.get('found', 0)), int(r.get('total', 0)), str(r.get('lang', ''))[:3], int(r.get('sec', 0)), str(r.get('det', ''))[:200])
        except (KeyError, ValueError, TypeError):
            return jsonify(ok=False, error='bad data'), 400
        run('INSERT INTO results(ts,name,eid,dept,game,score,"max",found,total,lang,sec,det) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)', row)
        return jsonify(ok=True)
    if request.method == 'DELETE':
        if not is_admin(): return jsonify(ok=False), 401
        run('DELETE FROM results')
        return jsonify(ok=True)
    adm = 'X-Admin' in request.headers
    if adm and not is_admin(): return jsonify(ok=False), 401
    rows = run('SELECT * FROM results ORDER BY id', fetch=True)
    if not adm:  # public view: employee ID is hidden (hashed)
        for x in rows: x['eid'] = hashlib.sha256(x['eid'].encode()).hexdigest()[:8]
    return jsonify(rows)

@app.route('/')
def home():
    return send_from_directory(BASE, 'index.html')

@app.route('/<name>')
def files(name):
    if os.path.splitext(name)[1].lower() not in OK_EXT: abort(404)
    return send_from_directory(BASE, name)

if __name__ == '__main__':
    app.run(debug=True)
