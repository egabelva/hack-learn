(() => {
  const SRC = 'data/kurikulum-cybersecurity-100-modul.md';
  const K = 'cs100:progress:', S = 'cs100:profile';
  const app = document.getElementById('app');
  let mods = [], pin = sessionStorage.getItem(S);

  const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const inl = s => esc(s).replace(/`([^`]+)`/g, '<code>$1</code>').replace(/\*\*([^*]+)\*\*/g, '<b>$1</b>');

  // ---------- Progres (LocalStorage, terpisah per profil) ----------
  const get = () => {
    try { return new Set(JSON.parse(localStorage.getItem(K + pin)) || []); } catch { return new Set(); }
  };
  const save = s => {
    try { localStorage.setItem(K + pin, JSON.stringify([...s].sort((a, b) => a - b))); } catch {}
  };

  // ---------- Membaca file Markdown ----------
  function parse(t) {
    const p = t.split(/^## MODUL (\d{3}): (.+)$/m), out = [];
    for (let i = 1; i < p.length; i += 3) {
      const secs = {}, q = p[i + 2].split(/^\*\*([A-G])\. (.+?)\*\*\s*$/m);
      for (let j = 1; j < q.length; j += 3) secs[q[j]] = { name: q[j + 1], txt: q[j + 2] };
      out.push({ n: p[i], i: +p[i], title: p[i + 1].trim(), secs });
    }
    return out;
  }

  function md(t) {
    let h = '', m = null;
    const close = () => { if (m) { h += '</' + m + '>'; m = null; } };
    for (const l of t.split('\n')) {
      const L = l.trim(); let x;
      if (!L || L === '---') { close(); continue; }
      if ((x = L.match(/^[-*]\s+(.*)/))) { if (m !== 'ul') { close(); h += '<ul>'; m = 'ul'; } h += '<li>' + inl(x[1]) + '</li>'; }
      else if ((x = L.match(/^\d+\.\s+(.*)/))) { if (m !== 'ol') { close(); h += '<ol>'; m = 'ol'; } h += '<li>' + inl(x[1]) + '</li>'; }
      else { close(); h += '<p>' + inl(L) + '</p>'; }
    }
    close(); return h;
  }

  function identity(t) {
    let h = '<dl class="id">';
    for (const l of t.split('\n')) {
      const x = l.trim().match(/^[-*]\s+([^:]+):\s*(.*)$/);
      if (x) h += '<dt>' + esc(x[1]) + '</dt><dd>' + inl(x[2]) + '</dd>';
    }
    return h + '</dl>';
  }

  // ---------- Tampilan ----------
  const profile = () => `<div class="center"><div class="card neon">
    <h1 class="logo">CYBER100</h1>
    <p>Ketik PIN profil (angka 1 sampai 9).</p>
    <input class="pin" id="pin" type="text" inputmode="numeric" maxlength="1" autocomplete="off" aria-label="PIN profil" autofocus>
    <p class="err" id="err" role="alert"></p></div></div>`;

  function list() {
    const d = get();
    return `<div class="wrap"><div class="top"><div><h1 class="logo">CYBER100</h1>
      <p class="sub">Profil ${pin} · 100 modul</p></div>
      <button class="btn mag" data-act="switch">Ganti profil</button></div><div class="line"></div>` +
      mods.map(m => `<a class="row${d.has(m.i) ? ' done' : ''}" href="#/m/${m.n}">
        <span class="num">${m.n}</span><span class="rt">${esc(m.title)}</span>
        <span class="chk" aria-label="${d.has(m.i) ? 'Selesai' : ''}">${d.has(m.i) ? '✓' : ''}</span></a>`).join('') + '</div>';
  }

  function modulePage(m) {
    const d = get(), done = d.has(m.i), ok = m.i === 1 || d.has(m.i - 1);
    const prev = mods[m.i - 2], next = mods[m.i];
    const secs = 'ABCDEFG'.split('').filter(k => m.secs[k]).map(k => {
      const s = m.secs[k];
      const body = k === 'A' ? identity(s.txt) : md(s.txt);
      return `<section class="sec"><h3>${k}. ${esc(s.name)}</h3>${k === 'D' ? `<div class="neon box">${body}</div>` : body}</section>`;
    }).join('');
    const mark = done ? '<button class="btn mag" disabled>Selesai ✓</button>'
      : `<button class="btn mag" data-act="done" data-n="${m.i}"${ok ? '' : ' disabled'}>Tandai selesai</button>`;
    const link = (x, t) => x ? `<a class="btn" href="#/m/${x.n}">${t}</a>` : `<button class="btn" disabled>${t}</button>`;
    return `<div class="wrap"><a class="btn" href="#/">Daftar modul</a>
      <h1 class="mt"><span class="mn">${m.n}</span><br>${esc(m.title)}</h1><div class="line"></div>${secs}
      <div class="nav">${link(prev, '← Sebelumnya')}${mark}${link(next, 'Berikutnya →')}</div>
      ${!done && !ok ? `<p class="hint">Selesaikan modul ${mods[m.i - 2].n} lebih dulu.</p>` : ''}</div>`;
  }

  function render(keep) {
    if (!pin) app.innerHTML = profile();
    else {
      const r = location.hash.match(/^#\/m\/(\d{3})$/), m = r && mods.find(x => x.n === r[1]);
      app.innerHTML = m ? modulePage(m) : list();
    }
    if (!keep) scrollTo(0, 0);
    const el = document.getElementById('pin'); if (el) el.focus();
  }

  // ---------- Aksi ----------
  app.addEventListener('click', e => {
    const b = e.target.closest('[data-act]'); if (!b) return;
    if (b.dataset.act === 'switch') { sessionStorage.removeItem(S); pin = null; location.hash = '#/'; render(); }
    if (b.dataset.act === 'done') {
      const n = +b.dataset.n, d = get();
      if (n === 1 || d.has(n - 1)) { d.add(n); save(d); render(true); }
    }
  });
  app.addEventListener('input', e => {
    if (e.target.id !== 'pin') return;
    const v = e.target.value.trim();
    if (/^[1-9]$/.test(v)) { pin = v; sessionStorage.setItem(S, v); location.hash = '#/'; render(); }
    else { e.target.value = ''; document.getElementById('err').textContent = 'PIN harus satu angka dari 1 sampai 9.'; }
  });
  addEventListener('hashchange', () => render());

  // ---------- Mulai ----------
  fetch(SRC).then(r => { if (!r.ok) throw 0; return r.text(); })
    .then(t => { mods = parse(t); render(); })
    .catch(() => {
      app.innerHTML = '<div class="center"><div class="card neon"><p>Modul gagal dimuat.</p><p class="sub">Jika kamu membuka index.html langsung dari folder, jalankan lewat server lokal (misalnya ekstensi Live Server di VS Code) atau buka lewat GitHub Pages.</p></div></div>';
    });
})();
