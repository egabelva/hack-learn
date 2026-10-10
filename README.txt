CYBER100 — Website pembelajaran cybersecurity (statis)

Struktur:
  index.html
  css/style.css
  js/app.js
  data/kurikulum-cybersecurity-100-modul.md   (isi 100 modul, dibaca langsung oleh website)

Menjalankan di laptop:
  Buka folder di VS Code, lalu jalankan index.html dengan ekstensi Live Server.
  (Membuka index.html langsung dengan klik ganda tidak bisa memuat file modul.)

Deploy ke GitHub Pages:
  1. Unggah semua isi folder ini ke repositori GitHub (index.html di akar repositori).
  2. Settings > Pages > Source: pilih branch utama dan folder / (root).

Catatan:
  - Font (Orbitron, Pixelify Sans, JetBrains Mono) dimuat dari Google Fonts, jadi perlu koneksi internet.
  - Progres tersimpan di LocalStorage browser dan tidak tersinkron antarperangkat.
  - PIN hanya memisahkan progres profil, bukan pengaman. Repo publik berarti isi modul bisa dibaca siapa saja.
