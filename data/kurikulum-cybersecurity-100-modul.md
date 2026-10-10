# Kurikulum Cybersecurity — 100 Modul

**Fokus:** Web Bug Bounty & Penetration Testing (dengan Network, Linux, Server, API, Android/Mobile, Python, Vulnerability Assessment, Vulnerability Research, dan Reporting berjalan paralel)
**Bahasa:** Indonesia | **Lingkungan:** Kali Linux (VM) | **Tempo:** 1 modul = 1 sesi (±30-45 menit) | **Target:** TryHackMe / Hack The Box / PortSwigger Web Security Academy

## Cara Memakai Kurikulum Ini
- Kerjakan modul berurutan dari 001. Setiap modul mencantumkan nomor modul prasyarat.
- Setiap modul: pelajari topik secara mandiri lewat referensi pencarian yang diberikan, kerjakan tugas praktik, lalu buat write-up singkat memakai template dari Modul 001.
- Praktik hanya pada: VM lab sendiri, aplikasi yang memang sengaja dibuat rentan untuk belajar (DVWA, Juice Shop, dsb.), emulator Android, dan platform latihan resmi (TryHackMe, Hack The Box, PortSwigger Web Security Academy, crAPI, OWASP API Security lab). **Jangan pernah menguji sistem milik pihak lain tanpa izin tertulis.**
- Setiap ±5 modul ada modul review/checkpoint untuk menguji kemampuan di platform lab.
- Lima fase: Fondasi (001-020) → Dasar Keamanan (021-045) → Menengah (046-072) → Lanjut (073-092) → Terpadu (093-100).

---

## MODUL 001: Menyiapkan Lab Aman dan Aturan Main

**A. Identitas**
- Nomor: 001
- Bidang: Linux & Kali
- Tingkat: 1
- Estimasi: 45 menit
- Prasyarat: Kali Linux sudah terpasang di VM

**B. Tujuan Belajar**
- Memastikan VM Kali berjalan stabil dengan snapshot awal.
- Menjelaskan batas legal dan etika pengujian (scope dan izin).
- Membuat folder kerja dan template write-up yang dipakai di semua modul.

**C. Topik Pembelajaran**
- Snapshot VM dan fungsinya (titik pemulihan).
- Mode jaringan VM: NAT, Bridged, Host-only. Pahami perbedaannya dan mana yang paling aman untuk latihan.
- Konsep scope, izin tertulis, dan mengapa menguji sistem tanpa izin melanggar hukum (di Indonesia, cari "UU ITE akses ilegal").
- Perbedaan lab lokal, platform latihan, dan program bug bounty.

**D. Tugas Praktik**
1. Lingkungan: Kali Linux VM.
2. Cek versi sistem: `cat /etc/os-release`
3. Cek alamat jaringan VM: `ip a`
4. Perbarui daftar paket: `sudo apt update`
5. Buat struktur folder: `mkdir -p ~/lab/writeups`
6. Ambil snapshot VM dan beri nama `baseline-001`.
7. Buat template write-up `~/lab/writeups/TEMPLATE.md` dengan bagian: Judul, Tujuan, Lingkungan, Langkah, Temuan/Observasi, Bukti (screenshot), Kesimpulan.
8. Buat write-up modul ini dari template tersebut.

**E. Indikator Keberhasilan**
- Snapshot `baseline-001` muncul di manajer VM.
- `TEMPLATE.md` dan write-up 001 ada di `~/lab/writeups/`.
- Write-up memuat output `os-release` dan satu screenshot hasil `ip a`.

**F. Evaluasi Mandiri**
1. Apa risikonya jika VM latihan memakai mode Bridged saat menjalankan aplikasi yang sengaja rentan?
2. Tuliskan tiga contoh target yang boleh diuji dan tiga yang tidak boleh.
3. Lakukan satu perubahan di VM (misalnya buat file), lalu kembalikan VM ke snapshot dan buktikan perubahan itu hilang.

**G. Referensi Pencarian**
VirtualBox snapshot, VirtualBox network modes NAT Host-only, Kali Linux documentation, scope bug bounty, rules of engagement penetration testing

---

## MODUL 002: Navigasi dan Operasi File di Terminal

**A. Identitas**
- Nomor: 002
- Bidang: Linux & Kali
- Tingkat: 1
- Estimasi: 35 menit
- Prasyarat: 001

**B. Tujuan Belajar**
- Berpindah direktori dan mengelola file hanya dengan terminal.
- Membedakan path absolut dan relatif.
- Membaca dokumentasi perintah sendiri lewat `man`.

**C. Topik Pembelajaran**
- Struktur direktori Linux: `/`, `/home`, `/etc`, `/var/log`, `/tmp`.
- Perintah dasar: `pwd`, `ls -la`, `cd`, `mkdir -p`, `touch`, `cp`, `mv`, `cat`, `less`, `man`, `history`.
- Tab completion dan panah atas untuk memanggil perintah sebelumnya.
- Mengapa `rm` tidak punya "tempat sampah" dan harus dipakai hati-hati.

**D. Tugas Praktik**
1. Buat struktur: `mkdir -p ~/lab/latihan-002/{catatan,data}`
2. Buat file: `touch ~/lab/latihan-002/data/a.txt`
3. Salin dan pindahkan file antar folder memakai path relatif, lalu ulangi memakai path absolut.
4. Baca `man ls`, cari opsi untuk mengurutkan berdasarkan waktu modifikasi, dan catat opsinya.
5. Buka `/etc/os-release` dengan `less`, lalu keluar dengan `q`.
6. Dari `~`, pindah ke `/var/log` dengan satu perintah `cd` (path absolut), lalu kembali ke `~/lab` dengan path relatif.
7. Buat write-up 002.

**E. Indikator Keberhasilan**
- Struktur folder `latihan-002` ada sesuai instruksi.
- Write-up memuat minimal 8 perintah yang dipakai beserta fungsinya.
- Kamu bisa menjelaskan kapan `cd` dengan path relatif lebih praktis daripada path absolut.

**F. Evaluasi Mandiri**
1. Dari `/etc`, bagaimana cara membuat file di `~/lab/latihan-002/catatan/` tanpa pindah direktori?
2. Apa beda `cp` dan `mv` terhadap file asal?
3. Tantangan: tanpa mouse dan tanpa mengetik nama file penuh, buka file di `/etc` yang berawalan `os-`.

**G. Referensi Pencarian**
Linux filesystem hierarchy standard, Linux command line basics, absolute vs relative path, man pages cara membaca

---

## MODUL 003: Dasar Jaringan: IP, Port, DNS

**A. Identitas**
- Nomor: 003
- Bidang: Network Security
- Tingkat: 1
- Estimasi: 40 menit
- Prasyarat: 001, 002

**B. Tujuan Belajar**
- Menjelaskan fungsi IP address, subnet mask, gateway, port, dan DNS.
- Membaca informasi jaringan VM sendiri.
- Membedakan TCP dan UDP serta mengenali port umum.

**C. Topik Pembelajaran**
- Model TCP/IP (4 layer) dibandingkan dengan OSI.
- IPv4, notasi CIDR dasar (misalnya `/24`), gateway, dan NAT.
- Port dan protokol umum: 22 (SSH), 53 (DNS), 80 (HTTP), 443 (HTTPS).
- TCP vs UDP.
- DNS: cara kerjanya dan jenis record dasar (A, MX).

**D. Tugas Praktik**
1. Lihat IP dan interface: `ip a`
2. Lihat gateway: `ip route`
3. Uji konektivitas ke gateway: `ping -c 4 <IP gateway>`
4. Lihat port yang sedang listen di VM: `ss -tuln`
5. Lihat DNS resolver: `cat /etc/resolv.conf`
6. Lakukan lookup DNS: `dig example.com`
7. Dari output `ip a`, tentukan IP, subnet mask, dan jumlah host yang mungkin di jaringan VM-mu.
8. Buat write-up 003.

**E. Indikator Keberhasilan**
- Write-up menunjukkan IP VM, gateway, dan DNS resolver yang benar sesuai output perintah.
- Kamu bisa menunjuk satu baris output `ss -tuln` dan menjelaskan arti kolom alamat dan port-nya.
- Write-up memuat hasil `dig` dengan record A dan penjelasan singkat bagian-bagiannya.

**F. Evaluasi Mandiri**
1. Berapa jumlah alamat dalam `/24` dan `/16`?
2. Kenapa `ping` ke suatu host bisa gagal padahal host itu hidup?
3. Jelaskan perbedaan port 53 UDP dan TCP dan kapan masing-masing dipakai.

**G. Referensi Pencarian**
TCP/IP model vs OSI, CIDR notation explained, common ports list, how DNS works, `ss` command, `dig` tutorial

---

## MODUL 004: Python Dasar: Variabel, Tipe Data, Input/Output

**A. Identitas**
- Nomor: 004
- Bidang: Python & Analisis Kode
- Tingkat: 1
- Estimasi: 40 menit
- Prasyarat: 001, 002

**B. Tujuan Belajar**
- Menulis dan menjalankan script Python dari terminal Kali.
- Memakai variabel, tipe data dasar, input/output, dan f-string.
- Menggunakan list dan dict untuk menyimpan data sederhana.

**C. Topik Pembelajaran**
- Interpreter vs script `.py`.
- Variabel dan tipe data: `str`, `int`, `list`, `dict`.
- `print()`, `input()`, konversi tipe (`int()`), f-string, komentar.
- Membaca pesan error Python (traceback) dari bawah ke atas.

**D. Tugas Praktik**
1. Cek versi: `python3 --version`
2. Buat folder: `mkdir -p ~/lab/python`
3. Tulis `target_info.py`: program meminta host dan port, lalu mencetak `Target: <host>:<port>`.
4. Tambahkan list berisi 3 port umum dan dict yang memetakan port ke nama layanan (misalnya 22 untuk SSH, 80 untuk HTTP).
5. Cetak nama layanan dari port yang diinput. Jika port tidak ada di dict, cetak "tidak dikenal".
6. Sengaja buat satu error (misalnya input huruf pada `int()`), baca traceback-nya, dan catat artinya.
7. Jalankan: `python3 target_info.py`
8. Buat write-up 004.

**E. Indikator Keberhasilan**
- `target_info.py` berjalan dan memberi output benar untuk port yang ada maupun tidak ada.
- Write-up memuat kode, hasil run, dan penjelasan satu traceback.

**F. Evaluasi Mandiri**
1. Apa tipe hasil `input()` dan kenapa perlu `int()` untuk port?
2. Apa perbedaan list dan dict, dan kapan dict lebih cocok?
3. Ubah script agar menolak port di luar 1–65535.

**G. Referensi Pencarian**
Python 3 official tutorial, Python f-strings, Python data types, how to read Python traceback

---

## MODUL 005: Anatomi HTTP: Request, Response, Status Code, Header

**A. Identitas**
- Nomor: 005
- Bidang: Web Security & Bug Bounty
- Tingkat: 1-2
- Estimasi: 40 menit
- Prasyarat: 002, 003

**B. Tujuan Belajar**
- Menjelaskan struktur request dan response HTTP.
- Membaca status code dan header penting.
- Mengamati lalu lintas HTTP dari terminal dan browser DevTools.

**C. Topik Pembelajaran**
- Bagian URL: scheme, host, port, path, query.
- Method: GET, POST (dan secara singkat PUT, DELETE).
- Status code: 200, 301/302, 400, 401, 403, 404, 500.
- Header penting: `Host`, `User-Agent`, `Content-Type`, `Cookie`, `Set-Cookie`.
- HTTP stateless dan peran cookie.

**D. Tugas Praktik**
1. Lingkungan: server lokal buatan sendiri. Jangan arahkan ke situs pihak lain.
2. Siapkan: `mkdir -p ~/lab/web && cd ~/lab/web && echo '<h1>halo</h1>' > index.html`
3. Terminal 1: `python3 -m http.server 8000`
4. Terminal 2: `curl -v http://127.0.0.1:8000/`
5. Lihat header saja: `curl -I http://127.0.0.1:8000/`
6. Minta path yang tidak ada: `curl -v http://127.0.0.1:8000/tidak-ada`
7. Buka `http://127.0.0.1:8000/` di browser Kali, lalu buka DevTools tab Network dan bandingkan request/response-nya dengan output `curl -v`.
8. Hentikan server dengan `Ctrl+C`.
9. Buat write-up 005.

**E. Indikator Keberhasilan**
- Write-up menunjukkan perbedaan status 200 dan 404 dengan output nyata.
- Kamu bisa menunjuk request line, header, dan body di output `curl -v`.
- Ada screenshot DevTools yang menunjukkan header response untuk `index.html`.

**F. Evaluasi Mandiri**
1. Apa beda status 401 dan 403?
2. Kenapa HTTP disebut stateless, dan bagaimana cookie mengatasinya?
3. Header apa di response yang memberi tahu jenis server, dan kenapa informasi itu menarik bagi seorang tester?

**G. Referensi Pencarian**
MDN HTTP overview, HTTP status codes, HTTP headers list, `curl -v` tutorial, browser DevTools network tab

---
## MODUL 006: Manajemen User, Group, dan Permission

**A. Identitas**
- Nomor: 006
- Bidang: Linux & Kali
- Tingkat: 1-2
- Estimasi: 30-45 menit
- Prasyarat: 002

**B. Tujuan Belajar**
Mampu memahami dan mempraktikkan: manajemen user, group, dan permission.

**C. Topik Pembelajaran**
- Konsep user, group, owner; UID/GID
- Format permission rwx dan representasi oktal
- Perintah useradd/usermod/groupadd (baca dulu, jangan sembarang eksekusi di sistem penting)
- chmod dan chown

**D. Tugas Praktik**
 1. Buat user baru `sudo adduser latihan002x` khusus untuk eksperimen
 2. Buat file dan ubah permission-nya dengan notasi oktal (`chmod 640`) dan simbolik (`chmod u+x`)
 3. Ubah owner file dengan `chown`, amati efeknya saat login sebagai user lain
 4. Catat tabel permission oktal (contoh 755, 644, 600) dan artinya masing-masing

Tutup dengan membuat write-up modul ini mengikuti template.

**E. Indikator Keberhasilan**
- Write-up memuat tabel permission oktal yang benar
- Ada bukti (output `ls -l`) sebelum/sesudah chmod & chown

**F. Evaluasi Mandiri**
 1. Apa beda permission pada file dan pada direktori untuk bit 'x'?
 2. Kenapa permission 777 pada file web berisiko?

**G. Referensi Pencarian**
Linux file permissions chmod chown, Linux user management useradd

---

## MODUL 007: TCP Handshake dan Analisis Paket

**A. Identitas**
- Nomor: 007
- Bidang: Network Security
- Tingkat: 1-2
- Estimasi: 30-45 menit
- Prasyarat: 003

**B. Tujuan Belajar**
Mampu memahami dan mempraktikkan: tcp handshake dan analisis paket.

**C. Topik Pembelajaran**
- Three-way handshake (SYN, SYN-ACK, ACK)
- Membaca paket dengan tcpdump
- Pengenalan Wireshark

**D. Tugas Praktik**
 1. Jalankan `sudo tcpdump -i any port 80 -w capture.pcap` di satu terminal
 2. Di terminal lain, buat request `curl http://example-lab-lokal` (gunakan server lokal dari modul 005) atau `curl http://127.0.0.1:8000`
 3. Hentikan tcpdump, buka `capture.pcap` dengan Wireshark
 4. Temukan paket SYN, SYN-ACK, ACK dan tandai masing-masing di screenshot

Tutup dengan membuat write-up modul ini mengikuti template.

**E. Indikator Keberhasilan**
- capture.pcap berisi handshake yang bisa ditunjukkan di Wireshark
- Write-up menjelaskan urutan 3 paket handshake dengan benar

**F. Evaluasi Mandiri**
 1. Apa fungsi flag ACK dibanding SYN?
 2. Bagaimana cara mengenali koneksi yang ditutup paksa (RST) di Wireshark?

**G. Referensi Pencarian**
TCP three-way handshake explained, tcpdump tutorial, Wireshark basics

---

## MODUL 008: Struktur Kontrol dan Fungsi

**A. Identitas**
- Nomor: 008
- Bidang: Python & Analisis Kode
- Tingkat: 1-2
- Estimasi: 30-45 menit
- Prasyarat: 004

**B. Tujuan Belajar**
Mampu memahami dan mempraktikkan: struktur kontrol dan fungsi.

**C. Topik Pembelajaran**
- if/elif/else
- for dan while loop
- Mendefinisikan fungsi dengan def, parameter, return value

**D. Tugas Praktik**
 1. Tulis fungsi `cek_port(port)` yang mengembalikan True jika 1<=port<=65535, False jika tidak
 2. Tulis loop yang mengecek sekumpulan port (list) dan mencetak status valid/tidak untuk masing-masing
 3. Tambahkan fungsi `klasifikasi_port(port)` yang mengembalikan 'well-known', 'registered', atau 'dynamic' sesuai rentangnya

Tutup dengan membuat write-up modul ini mengikuti template.

**E. Indikator Keberhasilan**
- Fungsi `cek_port` dan `klasifikasi_port` bekerja benar untuk minimal 5 kasus uji
- Write-up memuat kode lengkap dan hasil uji

**F. Evaluasi Mandiri**
 1. Apa beda parameter dan argumen pada fungsi?
 2. Kenapa memecah logika menjadi fungsi memudahkan pengujian script?

**G. Referensi Pencarian**
Python functions tutorial, Python control flow if for while

---

## MODUL 009: Cookies, Session, dan Local Storage

**A. Identitas**
- Nomor: 009
- Bidang: Web Security & Bug Bounty
- Tingkat: 1-2
- Estimasi: 30-45 menit
- Prasyarat: 005

**B. Tujuan Belajar**
Mampu memahami dan mempraktikkan: cookies, session, dan local storage.

**C. Topik Pembelajaran**
- Perbedaan cookie, session storage, local storage
- Atribut cookie penting: HttpOnly, Secure, SameSite
- Cara server mengelola sesi login

**D. Tugas Praktik**
 1. Pada server lokal (modul 005), buat halaman PHP/CGI sederhana ATAU gunakan `http.cookies` di Python untuk mengirim `Set-Cookie` dari respons buatanmu
 2. Amati cookie yang tersimpan di browser lewat DevTools > Application > Cookies
 3. Catat atribut cookie yang ada/tidak ada (HttpOnly, Secure, SameSite) dan jelaskan risikonya bila tidak diset
 4. Bandingkan dengan Local Storage: buat satu nilai di Local Storage lewat console browser dan jelaskan bedanya dengan cookie

Tutup dengan membuat write-up modul ini mengikuti template.

**E. Indikator Keberhasilan**
- Write-up menunjukkan atribut cookie dari DevTools dengan analisis risikonya
- Ada perbandingan jelas cookie vs local storage

**F. Evaluasi Mandiri**
 1. Kenapa cookie tanpa HttpOnly rentan dicuri lewat XSS?
 2. Kenapa Local Storage tidak otomatis terkirim di tiap request seperti cookie?

**G. Referensi Pencarian**
Cookie attributes HttpOnly Secure SameSite, session vs local storage, DevTools application tab

---

## MODUL 010: Manajemen Paket dan Layanan

**A. Identitas**
- Nomor: 010
- Bidang: Linux & Kali
- Tingkat: 1-2
- Estimasi: 30-45 menit
- Prasyarat: 006

**B. Tujuan Belajar**
Mampu memahami dan mempraktikkan: manajemen paket dan layanan.

**C. Topik Pembelajaran**
- APT: install/remove/update/upgrade
- systemd dan systemctl (start, stop, enable, status)
- Mencari paket dan membaca dependency dasar

**D. Tugas Praktik**
 1. Install satu paket latihan (misal `nmap` jika belum ada) dengan `sudo apt install`
 2. Gunakan `systemctl status`, `systemctl stop`, `systemctl start` pada satu service (misal `ssh`)
 3. Gunakan `systemctl enable`/`disable` dan jelaskan bedanya dengan start/stop
 4. Cari log service tersebut dengan `journalctl -u <service>`

Tutup dengan membuat write-up modul ini mengikuti template.

**E. Indikator Keberhasilan**
- Write-up memuat output status service sebelum/sesudah stop-start
- Bisa menjelaskan beda enable dan start

**F. Evaluasi Mandiri**
 1. Apa risiko menjalankan service yang tidak dibutuhkan terus menyala?
 2. Bagaimana cara tahu service apa saja yang aktif di sistem?

**G. Referensi Pencarian**
systemctl tutorial, apt package management, journalctl basics

---

## MODUL 011: Subnetting Lanjutan dan Routing Dasar

**A. Identitas**
- Nomor: 011
- Bidang: Network Security
- Tingkat: 1-2
- Estimasi: 30-45 menit
- Prasyarat: 007

**B. Tujuan Belajar**
Mampu memahami dan mempraktikkan: subnetting lanjutan dan routing dasar.

**C. Topik Pembelajaran**
- Perhitungan subnet mask dan jumlah host per subnet
- Default gateway dan routing table
- Perbedaan jaringan privat (RFC1918) dan publik

**D. Tugas Praktik**
 1. Hitung manual jumlah host untuk 3 CIDR berbeda (/26, /28, /30)
 2. Lihat routing table VM: `ip route`
 3. Cari tahu rentang IP privat RFC1918 dan tentukan subnet VM-mu termasuk kelas apa
 4. Buat tabel: CIDR, subnet mask, jumlah host valid

Tutup dengan membuat write-up modul ini mengikuti template.

**E. Indikator Keberhasilan**
- Tabel perhitungan subnet benar untuk ketiga CIDR
- Write-up menjelaskan isi routing table VM sendiri

**F. Evaluasi Mandiri**
 1. Berapa host valid pada /29?
 2. Kenapa alamat privat tidak bisa langsung diakses dari internet?

**G. Referensi Pencarian**
Subnetting practice, IP routing table explained, RFC1918 private IP

---

## MODUL 012: Modul requests: Mengirim HTTP Request dari Python

**A. Identitas**
- Nomor: 012
- Bidang: Python & Analisis Kode
- Tingkat: 1-2
- Estimasi: 30-45 menit
- Prasyarat: 008

**B. Tujuan Belajar**
Mampu memahami dan mempraktikkan: modul requests: mengirim http request dari python.

**C. Topik Pembelajaran**
- Instalasi `requests` (`pip install requests`)
- GET dan POST request dasar
- Membaca response: status_code, headers, text

**D. Tugas Praktik**
 1. Jalankan kembali server lokal dari modul 005 (`python3 -m http.server 8000`)
 2. Tulis script Python yang melakukan GET ke `http://127.0.0.1:8000/` dan mencetak status_code serta 200 karakter pertama body
 3. Modifikasi script agar mencetak semua response header
 4. Tambahkan penanganan error dasar dengan try/except jika server tidak merespons

Tutup dengan membuat write-up modul ini mengikuti template.

**E. Indikator Keberhasilan**
- Script berjalan dan mencetak status code 200 serta header dengan benar
- Ada penanganan error saat server dimatikan

**F. Evaluasi Mandiri**
 1. Kenapa requests lebih praktis dibanding memakai curl untuk otomasi?
 2. Apa risiko mengirim request dalam jumlah besar tanpa jeda ke target lab/produksi?

**G. Referensi Pencarian**
Python requests library tutorial, handling HTTP errors in Python

---

## MODUL 013: Burp Suite Dasar: Proxy dan Intercept

**A. Identitas**
- Nomor: 013
- Bidang: Web Security & Bug Bounty
- Tingkat: 1-2
- Estimasi: 30-45 menit
- Prasyarat: 009

**B. Tujuan Belajar**
Mampu memahami dan mempraktikkan: burp suite dasar: proxy dan intercept.

**C. Topik Pembelajaran**
- Konfigurasi Burp sebagai proxy browser
- Fitur Intercept, HTTP History, Repeater
- Memodifikasi request sebelum dikirim

**D. Tugas Praktik**
 1. Konfigurasikan browser di Kali agar trafiknya lewat Burp Suite (proxy 127.0.0.1:8080)
 2. Install sertifikat Burp sebagai trusted CA di browser untuk HTTPS
 3. Akses server lokal (modul 005), amati request tertangkap di tab Proxy > Intercept
 4. Kirim satu request ke tab Repeater, ubah salah satu header/parameter, kirim ulang, dan amati responsnya

Tutup dengan membuat write-up modul ini mengikuti template.

**E. Indikator Keberhasilan**
- Write-up menunjukkan request asli dan hasil modifikasi di Repeater beserta responsnya
- Sertifikat Burp berhasil ter-install, HTTPS bisa diamati

**F. Evaluasi Mandiri**
 1. Apa fungsi Repeater dibanding mengubah request langsung di browser?
 2. Kenapa Burp perlu menjadi trusted CA untuk mengamati trafik HTTPS?

**G. Referensi Pencarian**
Burp Suite getting started, configuring browser proxy for burp, Burp Repeater tutorial

---

## MODUL 014: Permission Lanjutan, sudo, dan SUID/SGID

**A. Identitas**
- Nomor: 014
- Bidang: Linux & Kali
- Tingkat: 1-2
- Estimasi: 30-45 menit
- Prasyarat: 010

**B. Tujuan Belajar**
Mampu memahami dan mempraktikkan: permission lanjutan, sudo, dan suid/sgid.

**C. Topik Pembelajaran**
- File /etc/sudoers (hanya baca, jangan edit langsung tanpa visudo)
- Konsep least privilege
- SUID dan SGID, risikonya jika salah konfigurasi

**D. Tugas Praktik**
 1. Jalankan `sudo -l` untuk melihat hak akses sudo milikmu
 2. Cari file dengan bit SUID di sistem: `find / -perm -4000 -type f 2>/dev/null`
 3. Pilih satu hasil, cari tahu fungsinya (`man <nama>`), dan jelaskan kenapa butuh SUID
 4. Jelaskan skenario (tanpa mengeksploitasi) bagaimana SUID pada binary yang salah bisa disalahgunakan untuk privilege escalation

Tutup dengan membuat write-up modul ini mengikuti template.

**E. Indikator Keberhasilan**
- Daftar hasil `find` SUID tercatat di write-up
- Ada penjelasan fungsi minimal 3 binary SUID yang ditemukan

**F. Evaluasi Mandiri**
 1. Kenapa least privilege penting dalam konfigurasi server?
 2. Apa beda SUID dan SGID?

**G. Referensi Pencarian**
Linux SUID SGID explained, sudoers least privilege, find SUID binaries

---

## MODUL 015: Host Discovery dan Port Scanning dengan Nmap

**A. Identitas**
- Nomor: 015
- Bidang: Network Security
- Tingkat: 1-2
- Estimasi: 30-45 menit
- Prasyarat: 011

**B. Tujuan Belajar**
Mampu memahami dan mempraktikkan: host discovery dan port scanning dengan nmap.

**C. Topik Pembelajaran**
- Instalasi dan dasar Nmap
- Host discovery (-sn)
- TCP connect scan dan SYN scan (-sT, -sS) dasar
- Scan hanya pada target lab sendiri/berizin

**D. Tugas Praktik**
 1. Pastikan target scan adalah VM/lab sendiri (misal VM kedua yang sengaja dibuat rentan, atau localhost)
 2. Jalankan `nmap -sn <subnet VM>/24` untuk host discovery
 3. Jalankan `nmap <target>` untuk scan port default
 4. Bandingkan hasil `-sT` vs `-sS` (catat kebutuhan sudo untuk -sS) dan jelaskan perbedaannya

Tutup dengan membuat write-up modul ini mengikuti template.

**E. Indikator Keberhasilan**
- Output nmap menunjukkan port terbuka pada target lab
- Write-up menjelaskan beda -sT dan -sS

**F. Evaluasi Mandiri**
 1. Kenapa -sS disebut 'stealth scan' secara historis?
 2. Apa risikonya men-scan IP di luar lab tanpa izin?

**G. Referensi Pencarian**
Nmap host discovery, Nmap SYN scan vs connect scan, Nmap basics tutorial

---

## MODUL 016: Parsing Data JSON dan Script Recon Kecil

**A. Identitas**
- Nomor: 016
- Bidang: Python & Analisis Kode
- Tingkat: 1-2
- Estimasi: 30-45 menit
- Prasyarat: 012

**B. Tujuan Belajar**
Mampu memahami dan mempraktikkan: parsing data json dan script recon kecil.

**C. Topik Pembelajaran**
- Modul json bawaan Python
- Mengubah response API menjadi dict Python
- Menyimpan hasil scan ke file JSON

**D. Tugas Praktik**
 1. Buat endpoint JSON sederhana sendiri (file statis `data.json` disajikan lewat `python3 -m http.server`) sebagai target latihan
 2. Tulis script yang mengambil JSON tersebut via requests, mem-parsing dengan `response.json()`, lalu mencetak field tertentu
 3. Simpan hasil olahanmu (misal daftar port+status) ke file `hasil.json` baru dengan `json.dump`

Tutup dengan membuat write-up modul ini mengikuti template.

**E. Indikator Keberhasilan**
- `hasil.json` berhasil dibuat dengan struktur rapi
- Script menangani kasus field yang tidak ada di JSON tanpa crash

**F. Evaluasi Mandiri**
 1. Kenapa format JSON umum dipakai API modern?
 2. Bagaimana cara aman mengakses field JSON yang mungkin tidak selalu ada?

**G. Referensi Pencarian**
Python json module tutorial, parsing JSON API response

---

## MODUL 017: Enumerasi Direktori dan Subdomain

**A. Identitas**
- Nomor: 017
- Bidang: Web Security & Bug Bounty
- Tingkat: 1-2
- Estimasi: 30-45 menit
- Prasyarat: 013

**B. Tujuan Belajar**
Mampu memahami dan mempraktikkan: enumerasi direktori dan subdomain.

**C. Topik Pembelajaran**
- Konsep enumerasi direktori dengan wordlist
- Tool gobuster/ffuf dasar
- Enumerasi subdomain dasar (konsep, pada domain lab sendiri atau domain latihan resmi)

**D. Tugas Praktik**
 1. Pada web server lab milikmu (modul 005/018), buat beberapa path tersembunyi (misal /admin, /backup)
 2. Jalankan `gobuster dir -u http://127.0.0.1:8000 -w <wordlist kecil buatanmu>` dan amati path yang ditemukan
 3. Jelaskan kenapa enumerasi hanya boleh dilakukan pada target sendiri/berizin, termasuk untuk subdomain enumeration

Tutup dengan membuat write-up modul ini mengikuti template.

**E. Indikator Keberhasilan**
- Write-up menunjukkan path tersembunyi berhasil ditemukan lewat gobuster
- Ada penjelasan etika/izin terkait enumerasi subdomain

**F. Evaluasi Mandiri**
 1. Kenapa kualitas wordlist memengaruhi efektivitas enumerasi?
 2. Apa risiko enumerasi agresif (banyak request) terhadap target produksi?

**G. Referensi Pencarian**
gobuster directory enumeration tutorial, ffuf fuzzing basics, subdomain enumeration ethics

---

## MODUL 018: Instalasi dan Konfigurasi Dasar Web Server

**A. Identitas**
- Nomor: 018
- Bidang: Server Security
- Tingkat: 1-2
- Estimasi: 30-45 menit
- Prasyarat: -, 003, 011

**B. Tujuan Belajar**
Mampu memahami dan mempraktikkan: instalasi dan konfigurasi dasar web server.

**C. Topik Pembelajaran**
- Instalasi Apache atau Nginx
- Struktur file konfigurasi dasar
- Document root dan virtual host sederhana

**D. Tugas Praktik**
 1. Install salah satu (`sudo apt install apache2` atau `nginx`) di VM lab
 2. Akses `http://127.0.0.1/` dari browser dan pastikan halaman default muncul
 3. Ganti isi halaman default dengan halaman HTML buatanmu sendiri
 4. Lihat lokasi file konfigurasi utama dan jelaskan fungsi 2-3 direktif penting di dalamnya

Tutup dengan membuat write-up modul ini mengikuti template.

**E. Indikator Keberhasilan**
- Halaman kustom berhasil tampil di browser
- Write-up menjelaskan minimal 2 direktif konfigurasi

**F. Evaluasi Mandiri**
 1. Apa fungsi document root pada konfigurasi web server?
 2. Kenapa memahami konfigurasi default penting sebelum hardening?

**G. Referensi Pencarian**
Apache basic configuration, Nginx basic configuration tutorial

---

## MODUL 019: Dasar Menulis Catatan Temuan dan Write-Up Terstruktur

**A. Identitas**
- Nomor: 019
- Bidang: Pelaporan & Remediation
- Tingkat: 1-2
- Estimasi: 30-45 menit
- Prasyarat: -

**B. Tujuan Belajar**
Mampu memahami dan mempraktikkan: dasar menulis catatan temuan dan write-up terstruktur.

**C. Topik Pembelajaran**


**D. Tugas Praktik**


Tutup dengan membuat write-up modul ini mengikuti template.

**E. Indikator Keberhasilan**


**F. Evaluasi Mandiri**


**G. Referensi Pencarian**


---

## MODUL 020: Checkpoint Fase 1: Tantangan Lab Gabungan

**A. Identitas**
- Nomor: 020
- Bidang: Vulnerability Assessment & Pentest
- Tingkat: 1-2
- Estimasi: 30-45 menit
- Prasyarat: -, 019

**B. Tujuan Belajar**
Mampu memahami dan mempraktikkan: checkpoint fase 1: tantangan lab gabungan.

**C. Topik Pembelajaran**
- Mengintegrasikan Linux, Network, Python, dan Web dari modul 001-019 dalam satu tantangan

**D. Tugas Praktik**
 1. Pilih satu room/challenge level 'easy' di platform lab (TryHackMe/Hack The Box/PortSwigger) yang relevan dengan topik Linux dasar dan web dasar
 2. Selesaikan tantangan tersebut menggunakan keterampilan dari modul 001-019 (enumerasi, HTTP, scripting dasar)
 3. Tulis write-up gaya laporan: ringkasan target, langkah yang dilakukan, temuan, dan pembelajaran

Tutup dengan membuat write-up modul ini mengikuti template.

**E. Indikator Keberhasilan**
- Tantangan terselesaikan (atau progres jelas jika belum tuntas) dengan write-up lengkap
- Write-up mengaitkan langkah dengan modul spesifik yang relevan (001-019)

**F. Evaluasi Mandiri**
 1. Modul mana dari Fase 1 yang paling membantu menyelesaikan tantangan ini?
 2. Keterampilan apa yang terasa masih kurang dan perlu diperdalam?

**G. Referensi Pencarian**
TryHackMe easy room list, beginner CTF walkthrough approach

---

## MODUL 021: Reflected Cross-Site Scripting (XSS) Dasar

**A. Identitas**
- Nomor: 021
- Bidang: Web Security & Bug Bounty
- Tingkat: 2-3
- Estimasi: 40-50 menit
- Prasyarat: 017

**B. Tujuan Belajar**
Mampu memahami dan mempraktikkan: reflected cross-site scripting (xss) dasar.

**C. Topik Pembelajaran**
- Konsep XSS: input user dipantulkan tanpa sanitasi ke halaman
- Payload XSS dasar (`<script>alert(1)</script>`)
- Konteks output (HTML, atribut, JavaScript) memengaruhi payload

**D. Tugas Praktik**
 1. Gunakan lab latihan XSS yang memang disediakan untuk belajar (misal PortSwigger Web Security Academy - Reflected XSS, atau DVWA di VM terpisah)
 2. Ikuti skenario lab untuk menemukan parameter yang rentan reflected XSS
 3. Dokumentasikan payload yang berhasil dan konteks outputnya (di dalam tag HTML, di atribut, dsb.)

Tutup dengan membuat write-up modul ini mengikuti template.

**E. Indikator Keberhasilan**
- Write-up mencatat payload yang berhasil dan konteks outputnya
- Ada screenshot bukti alert/eksekusi script pada lab

**F. Evaluasi Mandiri**
 1. Kenapa payload yang sama bisa gagal di satu konteks tapi berhasil di konteks lain?
 2. Apa mitigasi utama terhadap reflected XSS?

**G. Referensi Pencarian**
PortSwigger reflected XSS lab, DVWA setup, XSS context explained

---

## MODUL 022: Stored Cross-Site Scripting (XSS)

**A. Identitas**
- Nomor: 022
- Bidang: Web Security & Bug Bounty
- Tingkat: 2-3
- Estimasi: 40-50 menit
- Prasyarat: 021

**B. Tujuan Belajar**
Mampu memahami dan mempraktikkan: stored cross-site scripting (xss).

**C. Topik Pembelajaran**
- Beda XSS reflected dan stored (persisten di database)
- Dampak stored XSS yang lebih luas (menyerang banyak pengguna)

**D. Tugas Praktik**
 1. Pada lab latihan (PortSwigger Academy - Stored XSS, atau DVWA), temukan fitur yang menyimpan input user (misal kolom komentar)
 2. Masukkan payload XSS pada fitur tersebut dan verifikasi payload tereksekusi setiap kali halaman dimuat oleh pengguna lain (dalam skenario lab)
 3. Jelaskan kenapa dampak stored XSS lebih besar dibanding reflected XSS

Tutup dengan membuat write-up modul ini mengikuti template.

**E. Indikator Keberhasilan**
- Write-up membuktikan payload tersimpan dan tereksekusi ulang tanpa perlu link khusus
- Ada perbandingan dampak dengan reflected XSS

**F. Evaluasi Mandiri**
 1. Kenapa stored XSS pada fitur komentar publik lebih berbahaya dibanding pada fitur yang hanya terlihat oleh satu user?
 2. Apa peran Content Security Policy dalam mitigasi stored XSS?

**G. Referensi Pencarian**
PortSwigger stored XSS lab, stored vs reflected XSS impact

---

## MODUL 023: Proses, Job Control, dan Monitoring Sistem

**A. Identitas**
- Nomor: 023
- Bidang: Linux & Kali
- Tingkat: 2-3
- Estimasi: 40-50 menit
- Prasyarat: 014

**B. Tujuan Belajar**
Mampu memahami dan mempraktikkan: proses, job control, dan monitoring sistem.

**C. Topik Pembelajaran**
- Proses foreground/background, PID
- ps, top/htop, kill/killall
- Job control: &, jobs, fg, bg

**D. Tugas Praktik**
 1. Jalankan proses dummy di background (`sleep 300 &`), lihat dengan `jobs` dan `ps aux | grep sleep`
 2. Gunakan `top` atau `htop`, amati proses dengan CPU/memori tertinggi
 3. Hentikan proses tadi dengan `kill <PID>`, lalu coba `kill -9` dan jelaskan bedanya
 4. Catat 5 proses sistem yang selalu berjalan di Kali dan fungsi singkatnya

Tutup dengan membuat write-up modul ini mengikuti template.

**E. Indikator Keberhasilan**
- Write-up memuat PID dan output sebelum/sesudah kill
- Bisa menjelaskan beda sinyal TERM dan KILL

**F. Evaluasi Mandiri**
 1. Apa yang terjadi jika proses tidak merespons `kill` biasa?
 2. Kenapa memantau proses penting saat melakukan pengujian keamanan?

**G. Referensi Pencarian**
Linux process management, ps top htop, kill signals SIGTERM SIGKILL

---

## MODUL 024: SQL Injection Dasar (Error-Based)

**A. Identitas**
- Nomor: 024
- Bidang: Web Security & Bug Bounty
- Tingkat: 2-3
- Estimasi: 40-50 menit
- Prasyarat: 022

**B. Tujuan Belajar**
Mampu memahami dan mempraktikkan: sql injection dasar (error-based).

**C. Topik Pembelajaran**
- Konsep SQL Injection: input user masuk ke query tanpa parameterisasi
- Payload dasar (`' OR '1'='1`, komentar SQL)
- Membaca pesan error database sebagai petunjuk

**D. Tugas Praktik**
 1. Pada lab latihan (PortSwigger Academy - SQL injection, atau DVWA), temukan form yang rentan SQLi
 2. Coba payload dasar untuk bypass login atau memicu error database
 3. Catat payload yang berhasil dan pesan error/perubahan perilaku yang muncul

Tutup dengan membuat write-up modul ini mengikuti template.

**E. Indikator Keberhasilan**
- Write-up mencatat payload berhasil dan buktinya (bypass login atau error DB)
- Ada penjelasan kenapa payload tersebut bekerja secara logis terhadap query SQL

**F. Evaluasi Mandiri**
 1. Kenapa parameterized query/prepared statement mencegah SQL Injection?
 2. Apa risiko menampilkan pesan error database mentah ke pengguna?

**G. Referensi Pencarian**
PortSwigger SQL injection lab, DVWA SQLi, prepared statements explained

---

## MODUL 025: Service dan Version Detection dengan Nmap

**A. Identitas**
- Nomor: 025
- Bidang: Network Security
- Tingkat: 2-3
- Estimasi: 40-50 menit
- Prasyarat: 015

**B. Tujuan Belajar**
Mampu memahami dan mempraktikkan: service dan version detection dengan nmap.

**C. Topik Pembelajaran**
- Opsi -sV untuk deteksi versi service
- Nmap Scripting Engine dasar (-sC)
- Membaca output scan untuk mencari petunjuk kerentanan

**D. Tugas Praktik**
 1. Jalankan `nmap -sV -sC <target lab>` pada target yang sama seperti modul sebelumnya
 2. Identifikasi versi service yang terdeteksi (misal versi SSH, HTTP server)
 3. Cari tahu (lewat pencarian mandiri) apakah versi tersebut punya kerentanan publik yang dikenal — cukup catat, jangan eksploitasi tanpa modul khusus
 4. Susun tabel: port, service, versi, catatan

Tutup dengan membuat write-up modul ini mengikuti template.

**E. Indikator Keberhasilan**
- Tabel service/versi lengkap untuk minimal 3 port
- Write-up mencatat minimal satu referensi pencarian kerentanan versi tersebut

**F. Evaluasi Mandiri**
 1. Kenapa mengetahui versi service penting sebelum menyerang?
 2. Apa risiko hasil deteksi versi yang salah (false positive)?

**G. Referensi Pencarian**
Nmap version detection -sV, Nmap NSE scripts intro, searching CVE by service version

---

## MODUL 026: Struktur APK dan Komponen Aplikasi Android

**A. Identitas**
- Nomor: 026
- Bidang: Android & Mobile Security
- Tingkat: 2-3
- Estimasi: 40-50 menit
- Prasyarat: -, 003

**B. Tujuan Belajar**
Mampu memahami dan mempraktikkan: struktur apk dan komponen aplikasi android.

**C. Topik Pembelajaran**
- Format APK (ZIP) dan isinya: AndroidManifest.xml, classes.dex, resources
- Empat komponen utama: Activity, Service, Broadcast Receiver, Content Provider
- Permission model Android dasar

**D. Tugas Praktik**
 1. Unduh satu APK aplikasi latihan yang memang disediakan untuk belajar keamanan mobile (cari 'vulnerable android app for learning')
 2. Ekstrak APK tersebut sebagai file ZIP (`unzip app.apk -d app_extracted`)
 3. Buka `AndroidManifest.xml` (boleh dalam bentuk mentah dulu) dan identifikasi permission yang diminta aplikasi
 4. Catat komponen (activity/service) yang terdaftar di manifest

Tutup dengan membuat write-up modul ini mengikuti template.

**E. Indikator Keberhasilan**
- Write-up memuat daftar permission dan komponen dari manifest
- Ada penjelasan struktur APK secara umum

**F. Evaluasi Mandiri**
 1. Kenapa permission yang berlebihan pada aplikasi patut dicurigai?
 2. Apa fungsi AndroidManifest.xml secara umum?

**G. Referensi Pencarian**
APK file structure, AndroidManifest.xml basics, Android app components overview

---

## MODUL 027: Directory/Path Traversal dan Local File Inclusion Dasar

**A. Identitas**
- Nomor: 027
- Bidang: Web Security & Bug Bounty
- Tingkat: 2-3
- Estimasi: 40-50 menit
- Prasyarat: 024

**B. Tujuan Belajar**
Mampu memahami dan mempraktikkan: directory/path traversal dan local file inclusion dasar.

**C. Topik Pembelajaran**
- Konsep traversal: `../../` untuk keluar dari direktori yang dimaksud
- Local File Inclusion (LFI) dasar
- Null byte dan encoding bypass (pengantar konsep)

**D. Tugas Praktik**
 1. Pada lab latihan (PortSwigger Academy - Path Traversal, atau DVWA File Inclusion), temukan parameter yang memuat nama file
 2. Coba payload traversal (`../../../etc/passwd` dalam skenario lab) sesuai petunjuk lab
 3. Dokumentasikan file yang berhasil diakses di luar direktori yang dimaksud

Tutup dengan membuat write-up modul ini mengikuti template.

**E. Indikator Keberhasilan**
- Write-up menunjukkan bukti file di luar direktori berhasil dibaca (sesuai skenario lab)
- Ada penjelasan payload traversal yang dipakai

**F. Evaluasi Mandiri**
 1. Kenapa validasi input path tidak cukup hanya memeriksa string '../'?
 2. Apa beda path traversal dan local file inclusion?

**G. Referensi Pencarian**
PortSwigger path traversal lab, DVWA file inclusion, LFI basics

---

## MODUL 028: File Handling dan Menyimpan Hasil Scan

**A. Identitas**
- Nomor: 028
- Bidang: Python & Analisis Kode
- Tingkat: 2-3
- Estimasi: 40-50 menit
- Prasyarat: 016

**B. Tujuan Belajar**
Mampu memahami dan mempraktikkan: file handling dan menyimpan hasil scan.

**C. Topik Pembelajaran**
- Membuka file (read/write/append)
- Context manager `with open(...)`
- Format output terstruktur (CSV sederhana)

**D. Tugas Praktik**
 1. Gabungkan script modul 007-009 (requests + port check) menjadi satu alur
 2. Simpan hasil pengecekan beberapa port ke file CSV: port,status,service_tebakan
 3. Gunakan `with open(...)` agar file selalu tertutup dengan benar
 4. Buka file CSV di terminal dengan `cat` untuk verifikasi

Tutup dengan membuat write-up modul ini mengikuti template.

**E. Indikator Keberhasilan**
- File CSV terbentuk dengan header dan data yang benar
- Kode memakai context manager, bukan open/close manual

**F. Evaluasi Mandiri**
 1. Apa risiko lupa menutup file saat menulis dalam jumlah besar?
 2. Kenapa format CSV memudahkan analisis lanjutan di tool lain?

**G. Referensi Pencarian**
Python file handling with statement, writing CSV in Python

---

## MODUL 029: Hardening SSH

**A. Identitas**
- Nomor: 029
- Bidang: Server Security
- Tingkat: 2-3
- Estimasi: 40-50 menit
- Prasyarat: 018

**B. Tujuan Belajar**
Mampu memahami dan mempraktikkan: hardening ssh.

**C. Topik Pembelajaran**
- Autentikasi berbasis key vs password
- Menonaktifkan login root langsung
- File konfigurasi /etc/ssh/sshd_config (baca sebelum ubah)

**D. Tugas Praktik**
 1. Buat SSH key pair di mesin asal: `ssh-keygen`
 2. Salin public key ke VM lab (`ssh-copy-id` atau manual ke `~/.ssh/authorized_keys`)
 3. Uji login dengan key berhasil, lalu (opsional, hati-hati) nonaktifkan password authentication di `sshd_config` dan restart service
 4. Catat seluruh perubahan konfigurasi dan alasannya di write-up

Tutup dengan membuat write-up modul ini mengikuti template.

**E. Indikator Keberhasilan**
- Login SSH berhasil memakai key tanpa password
- Write-up mencantumkan baris konfigurasi yang diubah beserta alasannya

**F. Evaluasi Mandiri**
 1. Kenapa autentikasi key lebih aman dibanding password untuk SSH?
 2. Apa risiko menonaktifkan root login dilewati tanpa backup akses lain?

**G. Referensi Pencarian**
SSH key based authentication tutorial, sshd_config hardening guide

---

## MODUL 030: Kerentanan Upload File

**A. Identitas**
- Nomor: 030
- Bidang: Web Security & Bug Bounty
- Tingkat: 2-3
- Estimasi: 40-50 menit
- Prasyarat: 027

**B. Tujuan Belajar**
Mampu memahami dan mempraktikkan: kerentanan upload file.

**C. Topik Pembelajaran**
- Validasi tipe file yang lemah (hanya cek ekstensi, bukan konten)
- Bypass validasi dengan double extension atau content-type palsu
- Dampak: web shell (dipahami sebagai konsep risiko, bukan dipraktikkan untuk menyerang pihak lain)

**D. Tugas Praktik**
 1. Pada lab latihan upload yang memang vulnerable (PortSwigger Academy - File upload vulnerabilities, atau DVWA), ikuti skenario untuk memahami bypass validasi
 2. Dokumentasikan metode validasi yang gagal (misal hanya cek ekstensi client-side)
 3. Jelaskan dampak jika file berbahaya berhasil diupload dan dieksekusi server, tanpa benar-benar menjalankannya pada sistem di luar skenario lab resmi

Tutup dengan membuat write-up modul ini mengikuti template.

**E. Indikator Keberhasilan**
- Write-up menjelaskan metode bypass yang berhasil dalam skenario lab
- Ada penjelasan dampak yang akurat tanpa melebih-lebihkan

**F. Evaluasi Mandiri**
 1. Kenapa validasi berbasis ekstensi file saja tidak cukup?
 2. Validasi apa yang seharusnya dilakukan server pada file yang diupload?

**G. Referensi Pencarian**
PortSwigger file upload vulnerabilities lab, file upload validation bypass concept

---

## MODUL 031: Enumerasi Layanan Umum

**A. Identitas**
- Nomor: 031
- Bidang: Network Security
- Tingkat: 2-3
- Estimasi: 40-50 menit
- Prasyarat: 025

**B. Tujuan Belajar**
Mampu memahami dan mempraktikkan: enumerasi layanan umum.

**C. Topik Pembelajaran**
- Enumerasi FTP (anonymous login)
- Enumerasi SMB dasar (smbclient, enum4linux ringan)
- Enumerasi SSH (banner grabbing)

**D. Tugas Praktik**
 1. Pada target lab yang menyediakan service FTP/SMB (gunakan lab sengaja rentan, misal Metasploitable di VM terpisah jika tersedia, atau lab platform latihan)
 2. Coba `ftp <target>` dan uji anonymous login jika diizinkan skenario lab
 3. Gunakan `smbclient -L //<target>/` untuk list share SMB
 4. Catat seluruh informasi yang berhasil dikumpulkan tanpa melakukan akses tidak sah di luar skenario lab

Tutup dengan membuat write-up modul ini mengikuti template.

**E. Indikator Keberhasilan**
- Write-up mencatat hasil enumerasi minimal 2 service
- Ada penjelasan mengapa anonymous FTP/SMB terbuka berisiko

**F. Evaluasi Mandiri**
 1. Apa bahaya anonymous FTP login yang diizinkan di server produksi?
 2. Informasi apa dari banner SSH yang berguna bagi penyerang?

**G. Referensi Pencarian**
FTP anonymous login risk, smbclient enumeration, SSH banner grabbing

---

## MODUL 032: Setup Emulator dan ADB Dasar

**A. Identitas**
- Nomor: 032
- Bidang: Android & Mobile Security
- Tingkat: 2-3
- Estimasi: 40-50 menit
- Prasyarat: 026

**B. Tujuan Belajar**
Mampu memahami dan mempraktikkan: setup emulator dan adb dasar.

**C. Topik Pembelajaran**
- Membuat Android Virtual Device (AVD) di Android Studio
- Perintah dasar ADB: devices, install, shell, logcat
- Menghubungkan emulator dengan ADB

**D. Tugas Praktik**
 1. Buat satu AVD baru lewat Android Studio (API level menengah, RAM disesuaikan dengan lab 8GB — pilih image ringan)
 2. Jalankan emulator, verifikasi terhubung: `adb devices`
 3. Install APK latihan modul sebelumnya: `adb install app.apk`
 4. Buka shell ADB (`adb shell`) dan jelajahi direktori `/data/data/<package>` sebatas yang bisa diakses

Tutup dengan membuat write-up modul ini mengikuti template.

**E. Indikator Keberhasilan**
- `adb devices` menunjukkan emulator terhubung
- APK latihan berhasil ter-install dan terbuka di emulator

**F. Evaluasi Mandiri**
 1. Kenapa menguji di emulator lebih aman untuk belajar dibanding HP pribadi yang berisi data asli?
 2. Apa fungsi `adb logcat` secara umum?

**G. Referensi Pencarian**
Android Studio AVD setup, adb command basics, adb shell tutorial

---

## MODUL 033: Cross-Site Request Forgery (CSRF) Dasar

**A. Identitas**
- Nomor: 033
- Bidang: Web Security & Bug Bounty
- Tingkat: 2-3
- Estimasi: 40-50 menit
- Prasyarat: 030

**B. Tujuan Belajar**
Mampu memahami dan mempraktikkan: cross-site request forgery (csrf) dasar.

**C. Topik Pembelajaran**
- Konsep CSRF: memanfaatkan sesi aktif user untuk mengirim request tanpa sepengetahuannya
- CSRF token sebagai mitigasi
- Syarat aplikasi rentan CSRF (tidak ada token, mengandalkan cookie saja)

**D. Tugas Praktik**
 1. Pada lab latihan (PortSwigger Academy - CSRF), ikuti skenario untuk memahami request yang rentan CSRF
 2. Buat halaman HTML sederhana (form auto-submit) sesuai skenario lab untuk mendemonstrasikan serangan CSRF pada akun lab milikmu sendiri
 3. Jelaskan kenapa aplikasi tersebut rentan (tidak ada CSRF token / SameSite cookie)

Tutup dengan membuat write-up modul ini mengikuti template.

**E. Indikator Keberhasilan**
- Write-up membuktikan request berhasil terkirim lewat halaman CSRF buatan dalam skenario lab
- Ada penjelasan root cause kerentanan

**F. Evaluasi Mandiri**
 1. Bagaimana CSRF token mencegah serangan ini?
 2. Bagaimana atribut SameSite pada cookie membantu mitigasi CSRF?

**G. Referensi Pencarian**
PortSwigger CSRF lab, CSRF token mitigation, SameSite cookie CSRF

---

## MODUL 034: Log Linux dan Analisis Dasar

**A. Identitas**
- Nomor: 034
- Bidang: Linux & Kali
- Tingkat: 2-3
- Estimasi: 40-50 menit
- Prasyarat: 023

**B. Tujuan Belajar**
Mampu memahami dan mempraktikkan: log linux dan analisis dasar.

**C. Topik Pembelajaran**
- Lokasi log penting: /var/log/auth.log, /var/log/syslog
- journalctl dan filter waktu/service
- Pola mencari anomali di log (login gagal, dsb.)

**D. Tugas Praktik**
 1. Lihat log autentikasi: `sudo tail -n 50 /var/log/auth.log` (atau `journalctl -u ssh`)
 2. Coba login SSH ke VM dengan password salah 3 kali, lalu cari jejaknya di log
 3. Gunakan `grep` untuk menyaring baris yang memuat kata 'Failed'
 4. Tulis ringkasan apa yang bisa disimpulkan dari log tersebut

Tutup dengan membuat write-up modul ini mengikuti template.

**E. Indikator Keberhasilan**
- Write-up memuat baris log percobaan login gagal yang berhasil ditemukan
- Ada perintah grep/journalctl yang dipakai beserta hasilnya

**F. Evaluasi Mandiri**
 1. Kenapa log penting dalam investigasi insiden keamanan?
 2. Apa risikonya jika log tidak pernah dipantau?

**G. Referensi Pencarian**
Linux auth.log analysis, journalctl filter, grep log analysis

---

## MODUL 035: VPN dan Tunneling Dasar

**A. Identitas**
- Nomor: 035
- Bidang: Network Security
- Tingkat: 2-3
- Estimasi: 40-50 menit
- Prasyarat: 031

**B. Tujuan Belajar**
Mampu memahami dan mempraktikkan: vpn dan tunneling dasar.

**C. Topik Pembelajaran**
- Konsep VPN secara umum
- SSH tunneling (local port forwarding)
- Kegunaan tunneling dalam pengujian keamanan (akses service yang hanya listen di localhost)

**D. Tugas Praktik**
 1. Di server lokal (misal `python3 -m http.server 8000` yang hanya listen di localhost VM target jika memungkinkan), coba akses langsung dari luar dan amati gagal
 2. Gunakan SSH local port forward: `ssh -L 8080:127.0.0.1:8000 user@target` (gunakan 2 VM atau localhost sendiri untuk simulasi)
 3. Akses `http://127.0.0.1:8080` dari mesin asal dan jelaskan apa yang terjadi
 4. Jelaskan dengan kata-katamu sendiri kenapa ini disebut 'tunneling'

Tutup dengan membuat write-up modul ini mengikuti template.

**E. Indikator Keberhasilan**
- Berhasil mengakses service lewat tunnel dan menjelaskan prosesnya
- Write-up menggambarkan diagram sederhana alur tunneling

**F. Evaluasi Mandiri**
 1. Apa beda local dan remote port forwarding (secara konsep)?
 2. Dalam skenario pentest, kapan tunneling dibutuhkan?

**G. Referensi Pencarian**
SSH local port forwarding tutorial, SSH tunneling explained

---

## MODUL 036: Socket Programming Dasar: Port Scanner Sederhana

**A. Identitas**
- Nomor: 036
- Bidang: Python & Analisis Kode
- Tingkat: 2-3
- Estimasi: 40-50 menit
- Prasyarat: 028

**B. Tujuan Belajar**
Mampu memahami dan mempraktikkan: socket programming dasar: port scanner sederhana.

**C. Topik Pembelajaran**
- Modul socket bawaan Python
- Konsep connect_ex dan timeout
- Looping untuk banyak port

**D. Tugas Praktik**
 1. Tulis script `mini_scanner.py` yang mencoba koneksi TCP ke target lab (localhost atau VM lab) untuk rentang port 1-1024
 2. Gunakan `socket.settimeout()` agar scan tidak macet pada port yang tidak merespons
 3. Cetak daftar port yang terbuka
 4. Bandingkan hasil script-mu dengan hasil `nmap` pada target yang sama

Tutup dengan membuat write-up modul ini mengikuti template.

**E. Indikator Keberhasilan**
- `mini_scanner.py` menghasilkan daftar port yang konsisten dengan hasil nmap
- Write-up membahas kelebihan/kekurangan scanner buatan sendiri vs nmap

**F. Evaluasi Mandiri**
 1. Kenapa scan tanpa timeout bisa membuat script macet lama?
 2. Apa batasan scanner sederhana ini dibanding nmap?

**G. Referensi Pencarian**
Python socket programming tutorial, building simple port scanner python

---

## MODUL 037: Broken Authentication: Enumerasi User dan Password Reset Lemah

**A. Identitas**
- Nomor: 037
- Bidang: Web Security & Bug Bounty
- Tingkat: 2-3
- Estimasi: 40-50 menit
- Prasyarat: 033

**B. Tujuan Belajar**
Mampu memahami dan mempraktikkan: broken authentication: enumerasi user dan password reset lemah.

**C. Topik Pembelajaran**
- User enumeration lewat pesan error login/registrasi yang berbeda
- Alur password reset yang lemah (token mudah ditebak, tidak ada rate limit)

**D. Tugas Praktik**
 1. Pada lab latihan (PortSwigger Academy - Authentication), bandingkan pesan error untuk username valid vs tidak valid saat login
 2. Jika lab menyediakan skenario password reset, analisis kekuatan token reset (panjang, keacakan) sesuai petunjuk lab
 3. Catat temuan enumerasi dan kelemahan reset password yang ditemukan

Tutup dengan membuat write-up modul ini mengikuti template.

**E. Indikator Keberhasilan**
- Write-up membuktikan perbedaan respons yang memungkinkan user enumeration
- Ada analisis kekuatan token reset sesuai skenario lab

**F. Evaluasi Mandiri**
 1. Kenapa pesan error login sebaiknya digeneralisasi (tidak membedakan 'user tidak ada' vs 'password salah')?
 2. Apa ciri token reset password yang aman?

**G. Referensi Pencarian**
PortSwigger authentication vulnerabilities lab, user enumeration via error messages, password reset token security

---

## MODUL 038: Manajemen User dan Hak Akses di Server

**A. Identitas**
- Nomor: 038
- Bidang: Server Security
- Tingkat: 2-3
- Estimasi: 40-50 menit
- Prasyarat: 029

**B. Tujuan Belajar**
Mampu memahami dan mempraktikkan: manajemen user dan hak akses di server.

**C. Topik Pembelajaran**
- Prinsip least privilege pada akun layanan
- Group khusus untuk aplikasi web (misal www-data)
- Memisahkan akun admin dan akun aplikasi

**D. Tugas Praktik**
 1. Lihat user yang menjalankan proses web server (`ps aux | grep apache` atau `nginx`)
 2. Jelaskan kenapa service web biasanya tidak berjalan sebagai root
 3. Buat user khusus baru untuk simulasi aplikasi, batasi aksesnya hanya pada folder tertentu dengan permission yang tepat
 4. Dokumentasikan struktur user dan permission yang kamu rancang

Tutup dengan membuat write-up modul ini mengikuti template.

**E. Indikator Keberhasilan**
- Write-up menunjukkan user yang menjalankan web server dan penjelasannya
- Struktur permission user aplikasi baru terdokumentasi jelas

**F. Evaluasi Mandiri**
 1. Apa risiko menjalankan aplikasi web sebagai root?
 2. Bagaimana least privilege diterapkan pada akun layanan?

**G. Referensi Pencarian**
Principle of least privilege, web server process user www-data

---

## MODUL 039: Analisis Statis APK Dasar

**A. Identitas**
- Nomor: 039
- Bidang: Android & Mobile Security
- Tingkat: 2-3
- Estimasi: 40-50 menit
- Prasyarat: 032

**B. Tujuan Belajar**
Mampu memahami dan mempraktikkan: analisis statis apk dasar.

**C. Topik Pembelajaran**
- Decompile APK (misal dengan jadx) menjadi kode yang lebih terbaca
- Mencari string sensitif dalam kode (API key, URL backend)
- Membaca permission dan intent-filter lebih lanjut

**D. Tugas Praktik**
 1. Gunakan tool decompiler (misal `jadx-gui`) pada APK latihan untuk melihat kode Java/Kotlin yang didekompilasi
 2. Cari string mencurigakan dengan `grep -r` pada hasil ekstraksi (kata kunci: key, secret, password, http://)
 3. Catat temuan string sensitif (jika ada) beserta lokasinya
 4. Bandingkan permission di manifest dengan apa yang benar-benar dipakai di kode (sebatas yang terlihat)

Tutup dengan membuat write-up modul ini mengikuti template.

**E. Indikator Keberhasilan**
- Write-up memuat hasil pencarian string sensitif dengan lokasi file
- Ada tangkapan layar hasil decompile di jadx

**F. Evaluasi Mandiri**
 1. Kenapa hardcoded secret di kode aplikasi mobile berisiko tinggi?
 2. Apa keterbatasan analisis statis dibanding analisis dinamis?

**G. Referensi Pencarian**
jadx apk decompiler tutorial, android static analysis basics, finding hardcoded secrets

---

## MODUL 040: Metodologi Vulnerability Assessment Dasar

**A. Identitas**
- Nomor: 040
- Bidang: Vulnerability Assessment & Pentest
- Tingkat: 2-3
- Estimasi: 40-50 menit
- Prasyarat: 020

**B. Tujuan Belajar**
Mampu memahami dan mempraktikkan: metodologi vulnerability assessment dasar.

**C. Topik Pembelajaran**
- Tahapan VA: perencanaan, scanning, identifikasi, verifikasi, pelaporan
- Perbedaan vulnerability assessment dan penetration testing

**D. Tugas Praktik**
 1. Pilih satu target lab (VM atau platform latihan) dan terapkan tahapan VA secara berurutan: tentukan scope, lakukan scanning (nmap), identifikasi potensi kerentanan dari hasil scan, verifikasi minimal satu temuan secara manual
 2. Susun temuan dalam format tabel: kerentanan, lokasi, tingkat risiko awal

Tutup dengan membuat write-up modul ini mengikuti template.

**E. Indikator Keberhasilan**
- Tabel temuan tersusun dengan minimal 3 item
- Write-up menjelaskan tahapan VA yang diikuti secara berurutan

**F. Evaluasi Mandiri**
 1. Apa beda fokus VA dibanding pentest penuh?
 2. Kenapa tahap verifikasi manual penting, tidak cukup hanya hasil scanner otomatis?

**G. Referensi Pencarian**
Vulnerability assessment methodology, VA vs penetration testing difference

---

## MODUL 041: Menulis Laporan Kerentanan: Deskripsi, Dampak, Bukti

**A. Identitas**
- Nomor: 041
- Bidang: Pelaporan & Remediation
- Tingkat: 2-3
- Estimasi: 40-50 menit
- Prasyarat: 019

**B. Tujuan Belajar**
Mampu memahami dan mempraktikkan: menulis laporan kerentanan: deskripsi, dampak, bukti.

**C. Topik Pembelajaran**
- Struktur laporan kerentanan: judul, deskripsi, lokasi, langkah reproduksi, dampak, bukti (screenshot/request-response)
- Bahasa laporan yang jelas dan tidak ambigu

**D. Tugas Praktik**
 1. Ambil satu temuan dari modul sebelumnya (Web/API/Linux manapun) yang sudah pernah kamu kerjakan
 2. Tulis ulang temuan tersebut dalam format laporan kerentanan lengkap: judul, deskripsi, lokasi, langkah reproduksi bernomor, dampak, bukti
 3. Minta dirimu sendiri membaca ulang sebagai 'orang lain' — apakah langkah reproduksinya cukup jelas diikuti tanpa penjelasan tambahan?

Tutup dengan membuat write-up modul ini mengikuti template.

**E. Indikator Keberhasilan**
- Laporan memuat seluruh bagian standar (judul, deskripsi, lokasi, langkah, dampak, bukti)
- Langkah reproduksi bernomor dan bisa diikuti tanpa ambigu

**F. Evaluasi Mandiri**
 1. Kenapa langkah reproduksi yang jelas sangat penting bagi penerima laporan (developer)?
 2. Apa beda 'dampak teknis' dan 'dampak bisnis' dalam sebuah laporan kerentanan?

**G. Referensi Pencarian**
Vulnerability report writing guide, bug bounty report template

---

## MODUL 042: Insecure Direct Object Reference (IDOR) Dasar

**A. Identitas**
- Nomor: 042
- Bidang: Web Security & Bug Bounty
- Tingkat: 2-3
- Estimasi: 40-50 menit
- Prasyarat: 037

**B. Tujuan Belajar**
Mampu memahami dan mempraktikkan: insecure direct object reference (idor) dasar.

**C. Topik Pembelajaran**
- Konsep IDOR: mengubah ID pada URL/parameter untuk mengakses data milik orang lain
- Pentingnya pengecekan otorisasi di sisi server, bukan hanya UI

**D. Tugas Praktik**
 1. Pada lab latihan (PortSwigger Academy - Access control, atau aplikasi contoh dengan dua akun test), login dengan dua akun berbeda
 2. Catat ID objek (misal invoice/profile) milik akun pertama, lalu coba akses dengan mengubah ID saat login sebagai akun kedua
 3. Dokumentasikan apakah data akun pertama bisa diakses oleh akun kedua

Tutup dengan membuat write-up modul ini mengikuti template.

**E. Indikator Keberhasilan**
- Write-up menunjukkan bukti akses data akun lain lewat perubahan ID
- Ada penjelasan root cause (kurangnya pengecekan otorisasi per-objek)

**F. Evaluasi Mandiri**
 1. Apa beda IDOR dengan broken authentication?
 2. Bagaimana server seharusnya memvalidasi kepemilikan objek pada tiap request?

**G. Referensi Pencarian**
PortSwigger access control lab, IDOR explained, object level authorization

---

## MODUL 043: Membangun dan Membaca Vulnerability Scan Sederhana

**A. Identitas**
- Nomor: 043
- Bidang: Vulnerability Assessment & Pentest
- Tingkat: 2-3
- Estimasi: 40-50 menit
- Prasyarat: 040

**B. Tujuan Belajar**
Mampu memahami dan mempraktikkan: membangun dan membaca vulnerability scan sederhana.

**C. Topik Pembelajaran**
- Pengantar vulnerability scanner (konsep, misal Nikto untuk web)
- Membaca output scanner dan memverifikasi false positive

**D. Tugas Praktik**
 1. Jalankan `nikto -h <target lab web milikmu>` pada web server lab
 2. Baca output, pilih 3 temuan, dan verifikasi manual apakah temuan tersebut benar (bukan false positive)
 3. Catat hasil verifikasi masing-masing temuan

Tutup dengan membuat write-up modul ini mengikuti template.

**E. Indikator Keberhasilan**
- Write-up mencatat 3 temuan beserta hasil verifikasi manual (benar/false positive)
- Ada penjelasan kenapa verifikasi manual diperlukan

**F. Evaluasi Mandiri**
 1. Apa risiko langsung mempercayai hasil scanner tanpa verifikasi?
 2. Informasi apa dari output Nikto yang paling berguna?

**G. Referensi Pencarian**
Nikto web scanner tutorial, verifying scanner false positives

---

## MODUL 044: Skema CVSS Dasar untuk Menilai Tingkat Keparahan

**A. Identitas**
- Nomor: 044
- Bidang: Pelaporan & Remediation
- Tingkat: 2-3
- Estimasi: 40-50 menit
- Prasyarat: 041

**B. Tujuan Belajar**
Mampu memahami dan mempraktikkan: skema cvss dasar untuk menilai tingkat keparahan.

**C. Topik Pembelajaran**
- Pengantar CVSS (Common Vulnerability Scoring System)
- Faktor utama: attack vector, complexity, privileges required, impact
- Kategori skor: low, medium, high, critical

**D. Tugas Praktik**
 1. Ambil 3 temuan berbeda dari modul-modul sebelumnya (misal satu XSS, satu IDOR, satu misconfiguration server)
 2. Gunakan kalkulator CVSS resmi (cari 'CVSS calculator FIRST.org') untuk menghitung skor masing-masing
 3. Catat skor dan kategori (low/medium/high/critical) untuk tiap temuan beserta alasan tiap faktor yang dipilih

Tutup dengan membuat write-up modul ini mengikuti template.

**E. Indikator Keberhasilan**
- Ketiga temuan memiliki skor CVSS dengan alasan tiap faktor tercatat
- Write-up menjelaskan kenapa skor bisa berbeda antar temuan

**F. Evaluasi Mandiri**
 1. Faktor CVSS apa yang paling sering membuat skor naik drastis?
 2. Kenapa skor CVSS saja tidak cukup, perlu juga konteks bisnis?

**G. Referensi Pencarian**
CVSS calculator FIRST.org, CVSS scoring guide basics

---

## MODUL 045: Checkpoint Fase 2: Tantangan Web Vulnerabilities

**A. Identitas**
- Nomor: 045
- Bidang: Vulnerability Assessment & Pentest
- Tingkat: 2-3
- Estimasi: 40-50 menit
- Prasyarat: 043

**B. Tujuan Belajar**
Mampu memahami dan mempraktikkan: checkpoint fase 2: tantangan web vulnerabilities.

**C. Topik Pembelajaran**
- Mengintegrasikan modul web klasik (XSS, SQLi, CSRF, IDOR, upload, dsb.) dari Fase 2

**D. Tugas Praktik**
 1. Pilih satu room/lab di platform latihan yang berfokus pada kerentanan web dasar-menengah (misal PortSwigger Web Security Academy topik XSS/SQLi, atau room web TryHackMe/HTB)
 2. Selesaikan lab tersebut, catat setiap kerentanan yang berhasil ditemukan dan dieksploitasi sesuai skenario lab
 3. Tulis write-up: kerentanan, langkah eksploitasi (dalam batas lab), dampak, dan cara mitigasinya

Tutup dengan membuat write-up modul ini mengikuti template.

**E. Indikator Keberhasilan**
- Write-up mencakup minimal 2 jenis kerentanan dari Fase 2
- Setiap temuan memuat langkah, dampak, dan mitigasi

**F. Evaluasi Mandiri**
 1. Kerentanan mana dari Fase 2 yang menurutmu paling berbahaya kalau terjadi di aplikasi nyata?
 2. Bagaimana urutan prioritas perbaikan jika semua ditemukan bersamaan?

**G. Referensi Pencarian**
PortSwigger Web Security Academy topics, web vulnerability lab walkthrough

---

## MODUL 046: Dasar REST API dan Cara Membacanya

**A. Identitas**
- Nomor: 046
- Bidang: API Security
- Tingkat: 3-4
- Estimasi: 45-60 menit
- Prasyarat: -, 005, 012

**B. Tujuan Belajar**
Mampu memahami dan mempraktikkan: dasar rest api dan cara membacanya.

**C. Topik Pembelajaran**
- Konsep REST: resource, method (GET/POST/PUT/DELETE), status code
- Membaca dokumentasi API lewat Swagger/OpenAPI atau Postman collection
- Endpoint dan parameter

**D. Tugas Praktik**
 1. Cari satu API publik yang menyediakan sandbox gratis untuk latihan (misal API publik dengan dokumentasi terbuka yang memang ditujukan untuk latihan/testing)
 2. Install Postman, import dokumentasi/koleksi API tersebut jika tersedia
 3. Coba kirim request GET ke salah satu endpoint, amati response dan status code
 4. Catat struktur endpoint API tersebut (resource, method yang didukung)

Tutup dengan membuat write-up modul ini mengikuti template.

**E. Indikator Keberhasilan**
- Write-up memuat minimal 3 endpoint yang dicoba beserta response-nya
- Ada penjelasan struktur REST dari API yang diuji

**F. Evaluasi Mandiri**
 1. Apa beda idealnya antara method GET dan POST dalam REST?
 2. Kenapa membaca dokumentasi API penting sebelum mengujinya?

**G. Referensi Pencarian**
REST API basics, Postman tutorial, reading OpenAPI Swagger documentation

---

## MODUL 047: Blind SQL Injection

**A. Identitas**
- Nomor: 047
- Bidang: Web Security & Bug Bounty
- Tingkat: 3-4
- Estimasi: 45-60 menit
- Prasyarat: 042

**B. Tujuan Belajar**
Mampu memahami dan mempraktikkan: blind sql injection.

**C. Topik Pembelajaran**
- Konsep blind SQLi: tidak ada pesan error terlihat, harus menyimpulkan dari perilaku aplikasi (true/false, waktu respons)
- Teknik boolean-based dan time-based dasar

**D. Tugas Praktik**
 1. Pada lab latihan (PortSwigger Academy - Blind SQL injection), ikuti skenario boolean-based terlebih dahulu
 2. Amati bagaimana payload true vs false menghasilkan respons aplikasi yang berbeda meski tanpa error terlihat
 3. Jika lab menyediakan skenario time-based, amati perbedaan waktu respons sebagai indikator

Tutup dengan membuat write-up modul ini mengikuti template.

**E. Indikator Keberhasilan**
- Write-up menjelaskan bagaimana kesimpulan true/false diambil dari respons aplikasi
- Ada perbandingan hasil boolean-based dan time-based bila keduanya dicoba

**F. Evaluasi Mandiri**
 1. Kenapa blind SQLi lebih sulit dideteksi dibanding error-based?
 2. Apa risiko teknik time-based terhadap performa target saat pengujian?

**G. Referensi Pencarian**
PortSwigger blind SQL injection lab, boolean based vs time based SQLi

---

## MODUL 048: Autentikasi API: API Key, Basic Auth, OAuth Dasar

**A. Identitas**
- Nomor: 048
- Bidang: API Security
- Tingkat: 3-4
- Estimasi: 45-60 menit
- Prasyarat: 046

**B. Tujuan Belajar**
Mampu memahami dan mempraktikkan: autentikasi api: api key, basic auth, oauth dasar.

**C. Topik Pembelajaran**
- API Key di header/query param
- HTTP Basic Auth
- Konsep OAuth 2.0 secara garis besar (access token, refresh token)

**D. Tugas Praktik**
 1. Pada API lab/sandbox yang butuh autentikasi, coba akses tanpa kredensial dan amati response (biasanya 401)
 2. Tambahkan API key atau kredensial yang benar sesuai dokumentasi, ulangi request
 3. Bandingkan response sebelum dan sesudah autentikasi
 4. Jelaskan di write-up alur OAuth 2.0 secara umum (tanpa perlu implementasi penuh)

Tutup dengan membuat write-up modul ini mengikuti template.

**E. Indikator Keberhasilan**
- Ada bukti perbandingan response 401 vs 200 dengan/tanpa kredensial
- Penjelasan alur OAuth 2.0 akurat secara konsep

**F. Evaluasi Mandiri**
 1. Kenapa mengirim API key lewat URL (query param) kurang ideal dibanding header?
 2. Apa fungsi refresh token dalam OAuth 2.0?

**G. Referensi Pencarian**
API authentication methods, HTTP Basic Auth, OAuth 2.0 flow explained

---

## MODUL 049: Authorization Bypass dan Role-Based Access Control

**A. Identitas**
- Nomor: 049
- Bidang: Web Security & Bug Bounty
- Tingkat: 3-4
- Estimasi: 45-60 menit
- Prasyarat: 047

**B. Tujuan Belajar**
Mampu memahami dan mempraktikkan: authorization bypass dan role-based access control.

**C. Topik Pembelajaran**
- Konsep RBAC (role-based access control)
- Vertical privilege escalation (user biasa mengakses fungsi admin)
- Horizontal privilege escalation (mengakses data user lain dengan role sama)

**D. Tugas Praktik**
 1. Pada lab latihan (PortSwigger Academy - Access control lanjutan), login sebagai user biasa
 2. Coba akses endpoint/fungsi yang seharusnya hanya untuk admin (vertical) sesuai skenario lab
 3. Bandingkan dengan skenario horizontal (modul IDOR) dan jelaskan perbedaannya

Tutup dengan membuat write-up modul ini mengikuti template.

**E. Indikator Keberhasilan**
- Write-up membuktikan akses ke fungsi admin sebagai user biasa (dalam skenario lab)
- Ada perbandingan jelas vertical vs horizontal privilege escalation

**F. Evaluasi Mandiri**
 1. Mengapa pengecekan role harus dilakukan di setiap endpoint, bukan hanya di level navigasi UI?
 2. Apa dampak bisnis dari vertical privilege escalation yang berhasil?

**G. Referensi Pencarian**
PortSwigger access control vertical horizontal, RBAC explained

---

## MODUL 050: Metodologi Penetration Testing: Recon - Exploit - Report

**A. Identitas**
- Nomor: 050
- Bidang: Vulnerability Assessment & Pentest
- Tingkat: 3-4
- Estimasi: 45-60 menit
- Prasyarat: 045

**B. Tujuan Belajar**
Mampu memahami dan mempraktikkan: metodologi penetration testing: recon - exploit - report.

**C. Topik Pembelajaran**
- Tahapan pentest umum: reconnaissance, scanning, exploitation, post-exploitation, reporting
- Pentingnya mengikuti scope dan rules of engagement

**D. Tugas Praktik**
 1. Pada satu lab pentest-style (TryHackMe/HTB level easy-medium), terapkan seluruh tahapan: recon (nmap, enumerasi), exploitation (sesuai kerentanan yang ditemukan dalam skenario lab), dokumentasi tiap tahap
 2. Buat garis waktu (timeline) kegiatan pengujian dari awal sampai akhir

Tutup dengan membuat write-up modul ini mengikuti template.

**E. Indikator Keberhasilan**
- Write-up menunjukkan seluruh tahapan pentest dengan bukti di tiap tahap
- Ada timeline kegiatan yang jelas

**F. Evaluasi Mandiri**
 1. Kenapa dokumentasi di setiap tahap penting, bukan hanya di akhir?
 2. Apa yang dimaksud rules of engagement dan kenapa harus dipatuhi?

**G. Referensi Pencarian**
Penetration testing methodology phases, rules of engagement pentest

---

## MODUL 051: JSON Web Token (JWT): Struktur dan Analisis

**A. Identitas**
- Nomor: 051
- Bidang: API Security
- Tingkat: 3-4
- Estimasi: 45-60 menit
- Prasyarat: 048

**B. Tujuan Belajar**
Mampu memahami dan mempraktikkan: json web token (jwt): struktur dan analisis.

**C. Topik Pembelajaran**
- Struktur JWT: header.payload.signature
- Encoding Base64URL (bukan enkripsi)
- Klaim umum: exp, iat, sub

**D. Tugas Praktik**
 1. Ambil contoh token JWT (dari API lab yang dipakai, atau generate token contoh lewat situs decoder JWT edukatif offline/lokal jika memungkinkan)
 2. Decode header dan payload secara manual (Base64URL decode) tanpa tool online untuk data sensitif
 3. Identifikasi algoritma yang dipakai (field `alg`) dan klaim yang ada
 4. Jelaskan kenapa JWT yang di-decode BUKAN berarti sudah diverifikasi keabsahannya

Tutup dengan membuat write-up modul ini mengikuti template.

**E. Indikator Keberhasilan**
- Write-up menunjukkan hasil decode header dan payload JWT contoh
- Ada penjelasan perbedaan decode vs verifikasi signature

**F. Evaluasi Mandiri**
 1. Kenapa payload JWT standar tidak boleh berisi data sangat rahasia meski signature valid?
 2. Apa fungsi claim `exp` pada JWT?

**G. Referensi Pencarian**
JWT structure explained, base64url decoding, JWT claims exp iat sub

---

## MODUL 052: Content Security Policy dan Bypass Filter XSS Dasar

**A. Identitas**
- Nomor: 052
- Bidang: Web Security & Bug Bounty
- Tingkat: 3-4
- Estimasi: 45-60 menit
- Prasyarat: 049

**B. Tujuan Belajar**
Mampu memahami dan mempraktikkan: content security policy dan bypass filter xss dasar.

**C. Topik Pembelajaran**
- Fungsi CSP sebagai mitigasi XSS
- Directive CSP umum (script-src, default-src)
- Teknik dasar bypass filter XSS sederhana (pengantar)

**D. Tugas Praktik**
 1. Pada lab latihan (PortSwigger Academy - CSP), amati header CSP pada respons target lab
 2. Analisis apakah konfigurasi CSP tersebut cukup ketat atau memiliki celah (misal `unsafe-inline` diizinkan)
 3. Ikuti skenario lab untuk memahami bagaimana celah CSP tertentu bisa dimanfaatkan

Tutup dengan membuat write-up modul ini mengikuti template.

**E. Indikator Keberhasilan**
- Write-up menganalisis header CSP target dan celah yang ditemukan
- Ada penjelasan kenapa directive tertentu melemahkan proteksi CSP

**F. Evaluasi Mandiri**
 1. Kenapa `unsafe-inline` pada script-src melemahkan proteksi CSP terhadap XSS?
 2. Apa directive CSP yang paling penting untuk mencegah eksekusi script asing?

**G. Referensi Pencarian**
PortSwigger CSP lab, Content-Security-Policy header explained, CSP bypass concept

---

## MODUL 053: Penyimpanan Data Tidak Aman pada Aplikasi Android

**A. Identitas**
- Nomor: 053
- Bidang: Android & Mobile Security
- Tingkat: 3-4
- Estimasi: 45-60 menit
- Prasyarat: 039

**B. Tujuan Belajar**
Mampu memahami dan mempraktikkan: penyimpanan data tidak aman pada aplikasi android.

**C. Topik Pembelajaran**
- SharedPreferences dan risikonya jika menyimpan data sensitif tanpa enkripsi
- Lokasi penyimpanan data aplikasi di `/data/data/<package>`
- File database SQLite lokal

**D. Tugas Praktik**
 1. Pada APK latihan yang kamu kontrol (atau aplikasi contoh yang memang dirancang untuk belajar), gunakan `adb shell` untuk masuk ke `/data/data/<package>/shared_prefs` (butuh akses sesuai skenario lab/emulator rooted jika diperlukan)
 2. Baca isi file XML SharedPreferences, cari data yang seharusnya dilindungi (misal token, password)
 3. Jika ada file database `.db`, salin ke komputer (`adb pull`) dan buka dengan tool SQLite viewer
 4. Catat temuan data sensitif yang tersimpan tanpa enkripsi

Tutup dengan membuat write-up modul ini mengikuti template.

**E. Indikator Keberhasilan**
- Write-up mencatat minimal satu contoh data yang tersimpan tanpa enkripsi (pada aplikasi contoh/lab)
- Proses `adb pull` dan pembacaan database terdokumentasi

**F. Evaluasi Mandiri**
 1. Kenapa menyimpan token sesi di SharedPreferences tanpa enkripsi berisiko?
 2. Apa alternatif penyimpanan yang lebih aman di Android (secara konsep)?

**G. Referensi Pencarian**
Android insecure data storage, adb pull shared_prefs, SQLite database mobile security

---

## MODUL 054: Kerentanan JWT

**A. Identitas**
- Nomor: 054
- Bidang: API Security
- Tingkat: 3-4
- Estimasi: 45-60 menit
- Prasyarat: 051

**B. Tujuan Belajar**
Mampu memahami dan mempraktikkan: kerentanan jwt.

**C. Topik Pembelajaran**
- Serangan alg:none (pengantar konsep)
- Weak secret pada algoritma HS256 (konsep brute force secret)
- Validasi JWT yang tidak benar di sisi server

**D. Tugas Praktik**
 1. Pada aplikasi/lab latihan yang memang dirancang untuk kerentanan JWT (cari platform lab seperti PortSwigger Web Security Academy bagian JWT)
 2. Ikuti skenario lab tersebut untuk memahami bagaimana validasi JWT yang lemah bisa dieksploitasi
 3. Catat langkah demi langkah apa yang membuat validasi tersebut lemah dan bagaimana dampaknya

Tutup dengan membuat write-up modul ini mengikuti template.

**E. Indikator Keberhasilan**
- Write-up menjelaskan root cause kerentanan JWT pada lab yang diikuti
- Ada langkah-langkah yang diikuti dari lab resmi (bukan target nyata)

**F. Evaluasi Mandiri**
 1. Kenapa server harus selalu memvalidasi algoritma yang diharapkan, bukan mempercayai field `alg` dari token?
 2. Apa dampak bila secret HS256 mudah ditebak?

**G. Referensi Pencarian**
PortSwigger JWT attacks lab, JWT alg none vulnerability, JWT weak secret

---

## MODUL 055: Open Redirect dan Dampaknya

**A. Identitas**
- Nomor: 055
- Bidang: Web Security & Bug Bounty
- Tingkat: 3-4
- Estimasi: 45-60 menit
- Prasyarat: 052

**B. Tujuan Belajar**
Mampu memahami dan mempraktikkan: open redirect dan dampaknya.

**C. Topik Pembelajaran**
- Konsep open redirect: parameter URL yang mengarahkan ke domain lain tanpa validasi
- Dampak: phishing, memperkuat serangan lain

**D. Tugas Praktik**
 1. Pada lab latihan (PortSwigger Academy - Open redirect, bila tersedia, atau aplikasi contoh), temukan parameter redirect (misal `?next=` atau `?url=`)
 2. Uji apakah parameter tersebut bisa diarahkan ke domain eksternal sembarang (gunakan domain contoh yang netral, bukan untuk phishing sungguhan)
 3. Jelaskan skenario bagaimana open redirect bisa dimanfaatkan dalam serangan phishing

Tutup dengan membuat write-up modul ini mengikuti template.

**E. Indikator Keberhasilan**
- Write-up membuktikan redirect ke domain eksternal berhasil dalam skenario lab
- Ada penjelasan skenario dampak phishing secara konseptual

**F. Evaluasi Mandiri**
 1. Kenapa open redirect sering dianggap 'low severity' tapi tetap berisiko?
 2. Bagaimana validasi yang benar untuk parameter redirect?

**G. Referensi Pencarian**
Open redirect vulnerability explained, open redirect phishing risk

---

## MODUL 056: Privilege Escalation Linux Dasar

**A. Identitas**
- Nomor: 056
- Bidang: Vulnerability Assessment & Pentest
- Tingkat: 3-4
- Estimasi: 45-60 menit
- Prasyarat: 050

**B. Tujuan Belajar**
Mampu memahami dan mempraktikkan: privilege escalation linux dasar.

**C. Topik Pembelajaran**
- Enumerasi privilege escalation: SUID, cron job writable, sudo misconfiguration
- Tool enumerasi populer (LinPEAS) sebagai referensi, dipahami cara bacanya

**D. Tugas Praktik**
 1. Pada lab privilege escalation Linux (TryHackMe/HTB kategori privesc, level easy), lakukan enumerasi manual terlebih dahulu (SUID, cron, sudo -l) sebelum memakai tool otomatis
 2. Bandingkan hasil enumerasi manualmu dengan output tool otomatis (misal LinPEAS) bila lab mengizinkan penggunaannya
 3. Dokumentasikan jalur privilege escalation yang berhasil ditemukan dalam skenario lab

Tutup dengan membuat write-up modul ini mengikuti template.

**E. Indikator Keberhasilan**
- Write-up menunjukkan hasil enumerasi manual sebelum memakai tool otomatis
- Jalur privilege escalation terdokumentasi lengkap sesuai skenario lab

**F. Evaluasi Mandiri**
 1. Kenapa penting bisa enumerasi manual, tidak hanya mengandalkan tool otomatis?
 2. Apa pola umum yang membuat privilege escalation mungkin terjadi?

**G. Referensi Pencarian**
Linux privilege escalation techniques, LinPEAS usage, SUID cron sudo privesc

---

## MODUL 057: Broken Object Level Authorization (BOLA) pada API

**A. Identitas**
- Nomor: 057
- Bidang: API Security
- Tingkat: 3-4
- Estimasi: 45-60 menit
- Prasyarat: 054

**B. Tujuan Belajar**
Mampu memahami dan mempraktikkan: broken object level authorization (bola) pada api.

**C. Topik Pembelajaran**
- Konsep BOLA/IDOR pada API: mengubah ID objek di request untuk mengakses data milik user lain
- Pentingnya pengecekan otorisasi per-objek, bukan hanya autentikasi

**D. Tugas Praktik**
 1. Pada API lab yang menyediakan skenario BOLA (misal lab edukatif seperti crAPI atau OWASP API Security lab resmi), ikuti skenario yang disediakan
 2. Amati bagaimana mengubah parameter ID pada request bisa mengakses data user lain dalam skenario lab tersebut
 3. Dokumentasikan request asli dan request yang dimodifikasi beserta responsnya

Tutup dengan membuat write-up modul ini mengikuti template.

**E. Indikator Keberhasilan**
- Write-up menunjukkan perbandingan request/response sebelum dan sesudah ID diubah
- Ada penjelasan kenapa ini tergolong BOLA, bukan sekadar bug biasa

**F. Evaluasi Mandiri**
 1. Apa beda autentikasi dan otorisasi dalam konteks BOLA?
 2. Bagaimana seharusnya server memvalidasi kepemilikan objek pada tiap request?

**G. Referensi Pencarian**
OWASP API Security Top 10 BOLA, crAPI vulnerable api lab, IDOR vs BOLA

---

## MODUL 058: Intercept Trafik Aplikasi Mobile dengan Burp Suite

**A. Identitas**
- Nomor: 058
- Bidang: Android & Mobile Security
- Tingkat: 3-4
- Estimasi: 45-60 menit
- Prasyarat: 053

**B. Tujuan Belajar**
Mampu memahami dan mempraktikkan: intercept trafik aplikasi mobile dengan burp suite.

**C. Topik Pembelajaran**
- Konfigurasi proxy pada emulator
- Install sertifikat Burp sebagai trusted CA pada emulator (untuk HTTPS)
- Mengamati request/response aplikasi

**D. Tugas Praktik**
 1. Set proxy emulator mengarah ke Burp Suite yang berjalan di Kali (cari panduan 'configure android emulator proxy burp')
 2. Install sertifikat Burp ke emulator agar trafik HTTPS bisa diamati (hanya untuk lab, bukan aplikasi produksi orang lain)
 3. Buka aplikasi latihan di emulator, amati request yang tertangkap di Burp
 4. Catat endpoint, header, dan data yang dikirim aplikasi

Tutup dengan membuat write-up modul ini mengikuti template.

**E. Indikator Keberhasilan**
- Burp berhasil menangkap minimal 3 request dari aplikasi latihan
- Write-up mencatat endpoint dan data yang dikirim

**F. Evaluasi Mandiri**
 1. Kenapa perlu menginstal sertifikat Burp sebagai trusted CA untuk mengamati trafik HTTPS?
 2. Informasi apa dari trafik yang paling berguna bagi tester keamanan mobile?

**G. Referensi Pencarian**
Burp Suite android emulator setup, intercept https mobile traffic

---

## MODUL 059: Server-Side Template Injection (SSTI) Pengantar

**A. Identitas**
- Nomor: 059
- Bidang: Web Security & Bug Bounty
- Tingkat: 3-4
- Estimasi: 45-60 menit
- Prasyarat: 055

**B. Tujuan Belajar**
Mampu memahami dan mempraktikkan: server-side template injection (ssti) pengantar.

**C. Topik Pembelajaran**
- Konsep SSTI: input user dievaluasi sebagai bagian dari template engine
- Deteksi dasar SSTI (payload matematis sederhana seperti `{{7*7}}`)

**D. Tugas Praktik**
 1. Pada lab latihan (PortSwigger Academy - SSTI), ikuti skenario untuk menemukan input yang diproses oleh template engine
 2. Coba payload deteksi dasar dan amati apakah hasil evaluasi (misal 49) muncul di respons
 3. Dokumentasikan template engine yang teridentifikasi berdasarkan perilaku payload

Tutup dengan membuat write-up modul ini mengikuti template.

**E. Indikator Keberhasilan**
- Write-up membuktikan payload deteksi berhasil dan menjelaskan template engine yang teridentifikasi
- Ada penjelasan kenapa ini berbeda dari XSS biasa

**F. Evaluasi Mandiri**
 1. Kenapa SSTI berpotensi berdampak lebih parah dibanding XSS?
 2. Bagaimana cara awal membedakan target rentan SSTI dibanding hanya XSS?

**G. Referensi Pencarian**
PortSwigger SSTI lab, server side template injection basics

---

## MODUL 060: Mass Assignment dan Over-Exposure Data pada API

**A. Identitas**
- Nomor: 060
- Bidang: API Security
- Tingkat: 3-4
- Estimasi: 45-60 menit
- Prasyarat: 057

**B. Tujuan Belajar**
Mampu memahami dan mempraktikkan: mass assignment dan over-exposure data pada api.

**C. Topik Pembelajaran**
- Mass assignment: field yang seharusnya tidak bisa diubah user malah bisa diubah lewat request
- Over-exposure: API mengembalikan lebih banyak field daripada yang dibutuhkan

**D. Tugas Praktik**
 1. Pada lab API yang sesuai (OWASP API Security lab atau crAPI), cari endpoint update profil
 2. Coba tambahkan field tambahan di body request (misal field role/isAdmin) yang seharusnya tidak boleh diubah user biasa, amati apakah diterima
 3. Periksa response endpoint lain, catat apakah ada field sensitif yang ikut terkirim padahal tidak dibutuhkan front-end

Tutup dengan membuat write-up modul ini mengikuti template.

**E. Indikator Keberhasilan**
- Write-up mencatat hasil percobaan mass assignment dengan bukti request/response
- Ada daftar field over-exposed yang ditemukan

**F. Evaluasi Mandiri**
 1. Kenapa validasi field di sisi server (bukan hanya di sisi client) penting untuk mencegah mass assignment?
 2. Apa risiko API yang mengembalikan field sensitif berlebihan meski tidak ditampilkan di UI?

**G. Referensi Pencarian**
Mass assignment vulnerability API, OWASP API Security excessive data exposure

---

## MODUL 061: Checkpoint Fase 3 bagian 1: Simulasi Pengujian API+Web

**A. Identitas**
- Nomor: 061
- Bidang: Vulnerability Assessment & Pentest
- Tingkat: 3-4
- Estimasi: 45-60 menit
- Prasyarat: 056

**B. Tujuan Belajar**
Mampu memahami dan mempraktikkan: checkpoint fase 3 bagian 1: simulasi pengujian api+web.

**C. Topik Pembelajaran**
- Mengintegrasikan modul API dan Web dari Fase 3

**D. Tugas Praktik**
 1. Pilih satu target lab yang menggabungkan web dan API (misal crAPI, atau aplikasi web dengan backend API pada platform lab)
 2. Lakukan pengujian pada kedua lapisan: web (XSS/SSTI/dll.) dan API (BOLA/JWT/dll.) sesuai skenario lab
 3. Susun laporan terpisah untuk temuan web dan temuan API, lalu ringkasan gabungan

Tutup dengan membuat write-up modul ini mengikuti template.

**E. Indikator Keberhasilan**
- Laporan mencakup temuan dari kedua lapisan (web dan API)
- Ada ringkasan gabungan yang menjelaskan keterkaitan temuan bila ada

**F. Evaluasi Mandiri**
 1. Apakah ada temuan di API yang berakar dari kelemahan di sisi web, atau sebaliknya?
 2. Bagian mana yang paling menantang untuk diuji?

**G. Referensi Pencarian**
crAPI vulnerable api lab, combined web and api testing approach

---

## MODUL 062: Chaining XSS dan CSRF dalam Satu Skenario

**A. Identitas**
- Nomor: 062
- Bidang: Web Security & Bug Bounty
- Tingkat: 3-4
- Estimasi: 45-60 menit
- Prasyarat: 059

**B. Tujuan Belajar**
Mampu memahami dan mempraktikkan: chaining xss dan csrf dalam satu skenario.

**C. Topik Pembelajaran**
- Menggabungkan dua kerentanan untuk dampak lebih besar
- Alur serangan chaining: XSS untuk mencuri token CSRF, lalu memanfaatkannya

**D. Tugas Praktik**
 1. Pada lab yang memungkinkan (atau rancang sendiri skenario di aplikasi lab pribadi dari modul-modul sebelumnya), identifikasi satu titik stored XSS dan satu fungsi tanpa proteksi CSRF yang kuat
 2. Rancang (dalam lingkungan lab sendiri) bagaimana payload XSS bisa dipakai untuk memicu aksi CSRF secara otomatis
 3. Dokumentasikan alur chaining ini sebagai diagram sederhana

Tutup dengan membuat write-up modul ini mengikuti template.

**E. Indikator Keberhasilan**
- Write-up memuat diagram alur chaining dari titik masuk sampai dampak akhir
- Penjelasan menunjukkan pemahaman kenapa menggabungkan dua kerentanan memperbesar dampak

**F. Evaluasi Mandiri**
 1. Kenapa chaining kerentanan sering dinilai lebih kritikal dibanding kerentanan tunggal?
 2. Mitigasi mana yang akan memutus rantai serangan ini paling efektif?

**G. Referensi Pencarian**
Vulnerability chaining examples, combining XSS and CSRF impact

---

## MODUL 063: Rate Limiting dan Abuse API

**A. Identitas**
- Nomor: 063
- Bidang: API Security
- Tingkat: 3-4
- Estimasi: 45-60 menit
- Prasyarat: 060

**B. Tujuan Belajar**
Mampu memahami dan mempraktikkan: rate limiting dan abuse api.

**C. Topik Pembelajaran**
- Konsep rate limiting dan kenapa dibutuhkan
- Dampak API tanpa rate limiting (brute force, resource exhaustion)
- Cara menguji ada/tidaknya rate limiting

**D. Tugas Praktik**
 1. Pada API lab milikmu sendiri (bisa pakai API sederhana buatan modul Python sebelumnya atau lab latihan), kirim banyak request berturut-turut dalam waktu singkat (gunakan script Python dari modul sebelumnya, dengan jeda wajar agar tidak mengganggu infrastruktur bersama)
 2. Amati apakah ada respons pembatasan (status 429) atau tidak ada pembatasan sama sekali
 3. Jika tidak ada rate limiting, jelaskan dampak potensialnya pada endpoint login

Tutup dengan membuat write-up modul ini mengikuti template.

**E. Indikator Keberhasilan**
- Write-up mencatat hasil pengujian dan ada/tidaknya status 429
- Ada analisis dampak jika endpoint sensitif (login) tidak memiliki rate limiting

**F. Evaluasi Mandiri**
 1. Kenapa endpoint login sangat perlu rate limiting dibanding endpoint lain?
 2. Selain rate limiting, mitigasi apa lagi yang bisa mencegah brute force pada API?

**G. Referensi Pencarian**
API rate limiting testing, HTTP 429 too many requests, brute force mitigation API

---

## MODUL 064: Regular Expression untuk Analisis Teks dan Log

**A. Identitas**
- Nomor: 064
- Bidang: Python & Analisis Kode
- Tingkat: 3-4
- Estimasi: 45-60 menit
- Prasyarat: 036

**B. Tujuan Belajar**
Mampu memahami dan mempraktikkan: regular expression untuk analisis teks dan log.

**C. Topik Pembelajaran**
- Modul re: match, search, findall
- Pola dasar: digit, huruf, kuantifier
- Studi kasus: mengekstrak IP atau timestamp dari log

**D. Tugas Praktik**
 1. Ambil contoh baris dari `/var/log/auth.log` (atau log hasil modul 013) yang memuat percobaan login gagal
 2. Tulis regex untuk mengekstrak alamat IP dari baris log tersebut
 3. Tulis regex kedua untuk mengekstrak timestamp
 4. Uji regex pada minimal 5 baris log berbeda dan catat hasilnya

Tutup dengan membuat write-up modul ini mengikuti template.

**E. Indikator Keberhasilan**
- Regex berhasil mengekstrak IP dan timestamp dengan benar pada seluruh baris uji
- Write-up menjelaskan pola regex yang dipakai

**F. Evaluasi Mandiri**
 1. Kenapa regex berguna saat menganalisis log dalam jumlah besar?
 2. Apa risiko regex yang terlalu longgar (false match)?

**G. Referensi Pencarian**
Python re module tutorial, regex extract IP address, regex for log analysis

---

## MODUL 065: Analisis Dinamis Dasar

**A. Identitas**
- Nomor: 065
- Bidang: Android & Mobile Security
- Tingkat: 3-4
- Estimasi: 45-60 menit
- Prasyarat: 058

**B. Tujuan Belajar**
Mampu memahami dan mempraktikkan: analisis dinamis dasar.

**C. Topik Pembelajaran**
- logcat untuk memantau log aplikasi real-time
- Permission abuse: aplikasi minta akses berlebih dari kebutuhannya
- Observasi perilaku aplikasi saat runtime

**D. Tugas Praktik**
 1. Jalankan `adb logcat` sambil memakai aplikasi latihan, amati log yang muncul
 2. Filter log dengan `adb logcat | grep <package_name>`
 3. Identifikasi permission yang diminta aplikasi saat runtime dan bandingkan dengan fungsinya (misal aplikasi catatan minta akses kamera, apakah wajar?)
 4. Catat observasi di write-up

Tutup dengan membuat write-up modul ini mengikuti template.

**E. Indikator Keberhasilan**
- Write-up memuat cuplikan log relevan dan analisis singkatnya
- Ada analisis kewajaran permission yang diminta aplikasi

**F. Evaluasi Mandiri**
 1. Kenapa logcat berguna untuk memahami perilaku aplikasi saat runtime?
 2. Bagaimana mengenali permission yang tidak wajar untuk fungsi aplikasi tertentu?

**G. Referensi Pencarian**
adb logcat filtering tutorial, android permission abuse analysis

---

## MODUL 066: Capstone API: Pengujian API Lab Secara Menyeluruh

**A. Identitas**
- Nomor: 066
- Bidang: API Security
- Tingkat: 3-4
- Estimasi: 45-60 menit
- Prasyarat: 063

**B. Tujuan Belajar**
Mampu memahami dan mempraktikkan: capstone api: pengujian api lab secara menyeluruh.

**C. Topik Pembelajaran**
- Menggabungkan seluruh modul API menjadi satu pengujian menyeluruh pada satu API lab

**D. Tugas Praktik**
 1. Pilih satu API lab latihan (crAPI, OWASP API lab, atau API buatan sendiri dari modul Python)
 2. Lakukan pengujian mencakup: pemetaan endpoint, autentikasi, analisis JWT, BOLA, mass assignment, dan rate limiting
 3. Susun laporan temuan lengkap dengan tingkat risiko dan rekomendasi untuk tiap temuan

Tutup dengan membuat write-up modul ini mengikuti template.

**E. Indikator Keberhasilan**
- Laporan mencakup minimal 4 kategori pengujian API yang telah dipelajari
- Setiap temuan memiliki bukti request/response dan rekomendasi

**F. Evaluasi Mandiri**
 1. Dari semua temuan, mana yang paling kritikal bagi keamanan data pengguna?
 2. Apa langkah pengujian API lanjutan yang ingin kamu pelajari setelah ini?

**G. Referensi Pencarian**
API security testing methodology, OWASP API Security Top 10 overview

---

## MODUL 067: Menulis Rekomendasi Remediasi yang Actionable

**A. Identitas**
- Nomor: 067
- Bidang: Pelaporan & Remediation
- Tingkat: 3-4
- Estimasi: 45-60 menit
- Prasyarat: 044

**B. Tujuan Belajar**
Mampu memahami dan mempraktikkan: menulis rekomendasi remediasi yang actionable.

**C. Topik Pembelajaran**
- Ciri rekomendasi yang baik: spesifik, bisa dieksekusi, sesuai akar masalah
- Menghindari rekomendasi generik yang tidak membantu ('gunakan keamanan yang lebih baik')

**D. Tugas Praktik**
 1. Ambil kembali 3 temuan dari modul sebelumnya
 2. Untuk tiap temuan, tulis rekomendasi remediasi yang spesifik dan actionable (bukan generik)
 3. Untuk satu temuan, coba terapkan sendiri rekomendasi tersebut di lab (misal menambahkan validasi input) dan buktikan kerentanan tertutup

Tutup dengan membuat write-up modul ini mengikuti template.

**E. Indikator Keberhasilan**
- Tiap rekomendasi spesifik dan merujuk akar masalah, bukan saran umum
- Minimal satu rekomendasi benar-benar diterapkan dan diverifikasi

**F. Evaluasi Mandiri**
 1. Apa bedanya rekomendasi 'validasi semua input' dengan rekomendasi yang benar-benar actionable untuk kasus spesifik?
 2. Kenapa memverifikasi hasil perbaikan sama pentingnya dengan menemukan kerentanan?

**G. Referensi Pencarian**
Writing actionable remediation recommendations, secure coding fix examples

---

## MODUL 068: Privilege Escalation Lanjutan dan Post-Exploitation Dasar

**A. Identitas**
- Nomor: 068
- Bidang: Vulnerability Assessment & Pentest
- Tingkat: 3-4
- Estimasi: 45-60 menit
- Prasyarat: 061

**B. Tujuan Belajar**
Mampu memahami dan mempraktikkan: privilege escalation lanjutan dan post-exploitation dasar.

**C. Topik Pembelajaran**
- Teknik privesc lanjutan (kernel exploit secara konsep, credential harvesting dasar)
- Post-exploitation dasar: mengumpulkan informasi lanjutan setelah akses awal didapat, dalam batas lab

**D. Tugas Praktik**
 1. Pada lab privesc level menengah, lanjutkan dari modul sebelumnya dengan teknik yang lebih bervariasi (credential yang ditemukan di file konfigurasi, dsb.)
 2. Setelah mendapat akses level lebih tinggi dalam skenario lab, dokumentasikan informasi apa saja yang bisa dikumpulkan (post-exploitation) sesuai batasan lab
 3. Refleksikan dampak bila ini terjadi pada sistem produksi sungguhan

Tutup dengan membuat write-up modul ini mengikuti template.

**E. Indikator Keberhasilan**
- Write-up menunjukkan teknik privesc lanjutan yang berhasil pada lab
- Ada refleksi dampak bisnis/produksi

**F. Evaluasi Mandiri**
 1. Kenapa credential yang tertinggal di file konfigurasi sering jadi jalan privilege escalation?
 2. Apa batasan etis post-exploitation dalam konteks lab vs dunia nyata?

**G. Referensi Pencarian**
Advanced linux privilege escalation, post exploitation basics ethical boundaries

---

## MODUL 069: Automasi Tugas Berulang dengan Python

**A. Identitas**
- Nomor: 069
- Bidang: Python & Analisis Kode
- Tingkat: 3-4
- Estimasi: 45-60 menit
- Prasyarat: 064

**B. Tujuan Belajar**
Mampu memahami dan mempraktikkan: automasi tugas berulang dengan python.

**C. Topik Pembelajaran**
- Looping terhadap wordlist
- Jeda antar-request (time.sleep) untuk menghindari pembebanan berlebihan
- Menyusun hasil ke struktur data untuk dianalisis

**D. Tugas Praktik**
 1. Buat wordlist kecil berisi 10 path umum (misal admin, login, config) dalam file `wordlist.txt`
 2. Tulis script yang mencoba request ke `http://127.0.0.1:8000/<path>` untuk tiap baris wordlist pada server lokal
 3. Tambahkan `time.sleep(0.2)` antar-request agar tidak membebani target
 4. Catat path mana saja yang memberi status selain 404

Tutup dengan membuat write-up modul ini mengikuti template.

**E. Indikator Keberhasilan**
- Script berjalan sampai selesai tanpa membanjiri target (ada delay)
- Hasil path yang ditemukan tercatat di write-up

**F. Evaluasi Mandiri**
 1. Kenapa memberi jeda antar-request penting secara etika saat menguji target nyata?
 2. Bagaimana script ini bisa dikembangkan menjadi tool enumerasi direktori sederhana?

**G. Referensi Pencarian**
Python automation scripting, rate limiting in scripts, wordlist based enumeration concept

---

## MODUL 070: Cron dan Automasi Sederhana

**A. Identitas**
- Nomor: 070
- Bidang: Linux & Kali
- Tingkat: 3-4
- Estimasi: 45-60 menit
- Prasyarat: 034

**B. Tujuan Belajar**
Mampu memahami dan mempraktikkan: cron dan automasi sederhana.

**C. Topik Pembelajaran**
- Format crontab (menit jam tanggal bulan hari)
- crontab -e, crontab -l
- Risiko script cron yang bisa ditulis oleh user lain

**D. Tugas Praktik**
 1. Buat script sederhana Python/Bash yang menulis timestamp ke file log
 2. Jadwalkan script tersebut berjalan tiap menit dengan `crontab -e`
 3. Tunggu beberapa menit, verifikasi file log bertambah isinya
 4. Hapus jadwal cron setelah selesai (`crontab -e` lalu hapus baris)

Tutup dengan membuat write-up modul ini mengikuti template.

**E. Indikator Keberhasilan**
- File log menunjukkan beberapa baris timestamp berurutan
- Write-up menjelaskan format crontab dengan benar

**F. Evaluasi Mandiri**
 1. Apa format crontab untuk 'setiap hari Senin jam 7 pagi'?
 2. Kenapa script cron yang writable oleh user lain berisiko?

**G. Referensi Pencarian**
Crontab format tutorial, cron security risks

---

## MODUL 071: Firewall dan ACL: Konsep dan Pengujian Dasar

**A. Identitas**
- Nomor: 071
- Bidang: Network Security
- Tingkat: 3-4
- Estimasi: 45-60 menit
- Prasyarat: 035

**B. Tujuan Belajar**
Mampu memahami dan mempraktikkan: firewall dan acl: konsep dan pengujian dasar.

**C. Topik Pembelajaran**
- Stateful vs stateless firewall (konsep)
- Access Control List dasar
- Cara memverifikasi rule firewall berfungsi

**D. Tugas Praktik**
 1. Pada VM lab, aktifkan ufw dan buat rule yang memblokir port tertentu (misal 8000)
 2. Jalankan server HTTP di port tersebut, lalu coba akses dari luar VM dan buktikan terblokir
 3. Buka kembali port tersebut, verifikasi akses berhasil
 4. Catat seluruh rule yang dibuat dan hasil pengujiannya

Tutup dengan membuat write-up modul ini mengikuti template.

**E. Indikator Keberhasilan**
- Ada bukti before/after (gagal lalu berhasil) sesuai rule firewall
- Write-up menjelaskan ACL secara konsep dengan contoh nyata dari lab

**F. Evaluasi Mandiri**
 1. Kenapa pengujian firewall penting dilakukan, tidak cukup hanya dikonfigurasi?
 2. Apa risiko rule firewall yang terlalu longgar?

**G. Referensi Pencarian**
ufw rules tutorial, firewall ACL concept, stateful vs stateless firewall

---

## MODUL 072: Etika dan Tata Cara Pelaporan Bertanggung Jawab

**A. Identitas**
- Nomor: 072
- Bidang: Pelaporan & Remediation
- Tingkat: 3-4
- Estimasi: 45-60 menit
- Prasyarat: 067

**B. Tujuan Belajar**
Mampu memahami dan mempraktikkan: etika dan tata cara pelaporan bertanggung jawab.

**C. Topik Pembelajaran**
- Responsible disclosure vs full disclosure
- Scope dan rules of engagement program bug bounty
- Apa yang boleh dan tidak boleh dilakukan saat menemukan kerentanan di luar lab

**D. Tugas Praktik**
 1. Baca kebijakan disclosure dari minimal 2 program bug bounty publik (misal lewat halaman policy di HackerOne/Bugcrowd program manapun yang publik)
 2. Catat poin penting: scope, larangan (misal dilarang DoS, dilarang akses data user lain), batas waktu disclosure
 3. Tulis ringkasan pemahamanmu tentang responsible disclosure dengan kata-kata sendiri

Tutup dengan membuat write-up modul ini mengikuti template.

**E. Indikator Keberhasilan**
- Write-up merangkum kebijakan dari minimal 2 program berbeda
- Ringkasan responsible disclosure akurat dan dengan kata-kata sendiri

**F. Evaluasi Mandiri**
 1. Apa risiko melakukan full disclosure tanpa memberi waktu vendor memperbaiki?
 2. Kenapa tetap berada dalam scope program itu penting secara hukum dan etika?

**G. Referensi Pencarian**
Responsible disclosure policy examples, bug bounty program rules of engagement

---

## MODUL 073: Business Logic Flaw Dasar (Race Condition Sederhana)

**A. Identitas**
- Nomor: 073
- Bidang: Web Security & Bug Bounty
- Tingkat: 4-5
- Estimasi: 50-65 menit
- Prasyarat: 062

**B. Tujuan Belajar**
Mampu memahami dan mempraktikkan: business logic flaw dasar (race condition sederhana).

**C. Topik Pembelajaran**
- Business logic flaw: kerentanan dari alur bisnis yang salah asumsi, bukan bug teknis biasa
- Race condition dasar: dua request bersamaan memanfaatkan celah waktu validasi

**D. Tugas Praktik**
 1. Pada lab latihan (PortSwigger Academy - Business logic vulnerabilities), pelajari skenario yang disediakan
 2. Jika tersedia skenario race condition (misal redeem voucher berkali-kali), coba kirim beberapa request secara bersamaan (bisa dengan Burp Intruder sesuai panduan lab) dan amati hasilnya
 3. Jelaskan logika bisnis yang seharusnya mencegah hal ini terjadi

Tutup dengan membuat write-up modul ini mengikuti template.

**E. Indikator Keberhasilan**
- Write-up menjelaskan skenario business logic flaw yang dipelajari dan hasil ujinya
- Ada penjelasan perbaikan logika yang tepat

**F. Evaluasi Mandiri**
 1. Kenapa business logic flaw sering tidak terdeteksi oleh scanner otomatis?
 2. Apa yang membuat race condition sulit dicegah hanya dengan validasi biasa?

**G. Referensi Pencarian**
PortSwigger business logic vulnerabilities lab, race condition web application concept

---

## MODUL 074: Checkpoint Fase 3 bagian 2: Tantangan Lab Menengah

**A. Identitas**
- Nomor: 074
- Bidang: Vulnerability Assessment & Pentest
- Tingkat: 4-5
- Estimasi: 50-65 menit
- Prasyarat: 068

**B. Tujuan Belajar**
Mampu memahami dan mempraktikkan: checkpoint fase 3 bagian 2: tantangan lab menengah.

**C. Topik Pembelajaran**
- Review menyeluruh Fase 3 (API, Web lanjutan, privesc, Android)

**D. Tugas Praktik**
 1. Pilih satu lab level medium di platform latihan yang menggabungkan beberapa kategori (web, privesc, dan bila memungkinkan mobile)
 2. Selesaikan sebanyak mungkin bagian tantangan sesuai kemampuan saat ini
 3. Tulis write-up reflektif: bagian yang berhasil, bagian yang masih sulit, rencana belajar tambahan

Tutup dengan membuat write-up modul ini mengikuti template.

**E. Indikator Keberhasilan**
- Write-up mencakup refleksi jujur atas bagian yang berhasil dan belum
- Ada rencana belajar tambahan yang konkret

**F. Evaluasi Mandiri**
 1. Topik apa dari Fase 3 yang paling perlu diulang sebelum lanjut ke Fase 4?
 2. Bagaimana progresmu dibanding saat baru mulai Fase 1?

**G. Referensi Pencarian**
Medium difficulty lab platform challenge, self assessment learning progress

---

## MODUL 075: Keamanan File dan Direktori Web Server

**A. Identitas**
- Nomor: 075
- Bidang: Server Security
- Tingkat: 4-5
- Estimasi: 50-65 menit
- Prasyarat: 038

**B. Tujuan Belajar**
Mampu memahami dan mempraktikkan: keamanan file dan direktori web server.

**C. Topik Pembelajaran**
- Permission file/folder yang aman untuk web root
- File sensitif yang tidak boleh terekspos (.git, .env, backup file)
- Directory listing dan risikonya

**D. Tugas Praktik**
 1. Pada web server lab, buat beberapa file contoh termasuk satu file `.env` dummy berisi data palsu
 2. Coba akses file tersebut langsung lewat browser/curl dan amati apakah bisa diakses
 3. Konfigurasikan web server agar file/pola tertentu (`.env`, `.git`) tidak bisa diakses dari luar
 4. Aktifkan lalu nonaktifkan directory listing, amati bedanya

Tutup dengan membuat write-up modul ini mengikuti template.

**E. Indikator Keberhasilan**
- Bukti sebelum/sesudah bahwa file sensitif tidak lagi bisa diakses
- Write-up menjelaskan risiko directory listing yang aktif

**F. Evaluasi Mandiri**
 1. Kenapa file `.env` atau `.git` yang terekspos berbahaya?
 2. Apa dampak directory listing yang aktif pada folder upload?

**G. Referensi Pencarian**
Securing sensitive files web server, disable directory listing apache nginx

---

## MODUL 076: Hardcoded Secret dan Insecure Communication

**A. Identitas**
- Nomor: 076
- Bidang: Android & Mobile Security
- Tingkat: 4-5
- Estimasi: 50-65 menit
- Prasyarat: 065

**B. Tujuan Belajar**
Mampu memahami dan mempraktikkan: hardcoded secret dan insecure communication.

**C. Topik Pembelajaran**
- Menggabungkan analisis statis (cari secret di kode) dan analisis trafik (cek apakah komunikasi terenkripsi)
- HTTP vs HTTPS pada komunikasi aplikasi mobile

**D. Tugas Praktik**
 1. Dari hasil modul 003 (decompile) dan modul 005 (intercept trafik), identifikasi apakah ada secret di kode yang juga terlihat dipakai di request jaringan
 2. Periksa apakah ada request yang masih memakai HTTP biasa (tidak terenkripsi) pada aplikasi latihan
 3. Susun temuan gabungan: secret di kode + cara secret itu dipakai di komunikasi jaringan

Tutup dengan membuat write-up modul ini mengikuti template.

**E. Indikator Keberhasilan**
- Write-up menggabungkan temuan statis dan dinamis menjadi satu analisis utuh
- Ada kesimpulan apakah komunikasi aplikasi latihan aman atau tidak

**F. Evaluasi Mandiri**
 1. Kenapa kombinasi analisis statis dan dinamis memberi gambaran lebih lengkap dibanding satu metode saja?
 2. Apa dampak bisnis dari aplikasi yang mengirim data sensitif lewat HTTP biasa?

**G. Referensi Pencarian**
Mobile app insecure communication, combining static dynamic analysis mobile security

---

## MODUL 077: Clickjacking

**A. Identitas**
- Nomor: 077
- Bidang: Web Security & Bug Bounty
- Tingkat: 4-5
- Estimasi: 50-65 menit
- Prasyarat: 073

**B. Tujuan Belajar**
Mampu memahami dan mempraktikkan: clickjacking.

**C. Topik Pembelajaran**
- Konsep clickjacking: menumpuk halaman target dalam iframe transparan
- Header X-Frame-Options dan CSP frame-ancestors sebagai mitigasi

**D. Tugas Praktik**
 1. Pada web server lab milikmu, buat halaman HTML yang memuat halaman lab lain dalam `<iframe>`
 2. Amati apakah iframe berhasil dimuat (tergantung header X-Frame-Options target)
 3. Tambahkan header `X-Frame-Options: DENY` pada server labmu sendiri, verifikasi iframe gagal dimuat setelahnya

Tutup dengan membuat write-up modul ini mengikuti template.

**E. Indikator Keberhasilan**
- Ada bukti before/after header X-Frame-Options memengaruhi keberhasilan iframe
- Write-up menjelaskan konsep clickjacking dengan diagram sederhana

**F. Evaluasi Mandiri**
 1. Kenapa clickjacking berbahaya meski tidak ada kerentanan teknis lain di halaman target?
 2. Apa beda proteksi X-Frame-Options dan CSP frame-ancestors?

**G. Referensi Pencarian**
Clickjacking explained, X-Frame-Options header, CSP frame-ancestors

---

## MODUL 078: Pengantar Vulnerability Research: Membaca CVE dan Advisory

**A. Identitas**
- Nomor: 078
- Bidang: Vulnerability Research
- Tingkat: 4-5
- Estimasi: 50-65 menit
- Prasyarat: -

**B. Tujuan Belajar**
Mampu memahami dan mempraktikkan: pengantar vulnerability research: membaca cve dan advisory.

**C. Topik Pembelajaran**
- Apa itu CVE, CVSS, dan security advisory
- Sumber CVE resmi (NVD, vendor advisory)
- Cara membaca advisory: affected version, impact, fix

**D. Tugas Praktik**
 1. Cari 3 CVE yang relevan dengan teknologi yang pernah kamu pakai di lab (misal Apache, OpenSSH, atau aplikasi web populer)
 2. Baca detail masing-masing di NVD (nvd.nist.gov) atau advisory resmi vendor
 3. Catat: nomor CVE, komponen terdampak, versi terdampak, dampak, dan status perbaikan

Tutup dengan membuat write-up modul ini mengikuti template.

**E. Indikator Keberhasilan**
- Tabel 3 CVE lengkap dengan komponen, versi, dampak, dan status perbaikan
- Write-up menjelaskan dengan kata sendiri dampak salah satu CVE

**F. Evaluasi Mandiri**
 1. Apa beda CVE, CVSS, dan advisory?
 2. Kenapa penting mengecek versi software yang dipakai terhadap database CVE secara berkala?

**G. Referensi Pencarian**
NVD National Vulnerability Database, reading CVE advisory, CVSS vs CVE difference

---

## MODUL 079: Simulasi Pentest Lengkap pada Target Multi-Layanan

**A. Identitas**
- Nomor: 079
- Bidang: Vulnerability Assessment & Pentest
- Tingkat: 4-5
- Estimasi: 50-65 menit
- Prasyarat: 074

**B. Tujuan Belajar**
Mampu memahami dan mempraktikkan: simulasi pentest lengkap pada target multi-layanan.

**C. Topik Pembelajaran**
- Mengaplikasikan seluruh metodologi pentest pada satu target dengan beberapa layanan sekaligus (web, SSH, service lain)

**D. Tugas Praktik**
 1. Pilih satu lab (TryHackMe/HTB) dengan target yang memiliki beberapa layanan/port terbuka
 2. Lakukan pentest penuh: recon, enumerasi tiap layanan, eksploitasi sesuai skenario lab, privilege escalation bila relevan
 3. Dokumentasikan seluruh proses sebagai laporan pentest gaya profesional (ringkasan eksekutif singkat + detail teknis)

Tutup dengan membuat write-up modul ini mengikuti template.

**E. Indikator Keberhasilan**
- Laporan memuat ringkasan eksekutif dan detail teknis yang terpisah jelas
- Seluruh layanan pada target sudah dienumerasi, bukan hanya satu

**F. Evaluasi Mandiri**
 1. Bagaimana kamu akan menjelaskan temuan ini ke orang non-teknis (ringkasan eksekutif)?
 2. Layanan mana yang paling rentan pada target ini dan kenapa?

**G. Referensi Pencarian**
Full pentest lab walkthrough, executive summary pentest report example

---

## MODUL 080: Deteksi Misconfiguration Server Dasar

**A. Identitas**
- Nomor: 080
- Bidang: Server Security
- Tingkat: 4-5
- Estimasi: 50-65 menit
- Prasyarat: 075

**B. Tujuan Belajar**
Mampu memahami dan mempraktikkan: deteksi misconfiguration server dasar.

**C. Topik Pembelajaran**
- Header response yang membocorkan informasi (Server, X-Powered-By)
- Default page dan file contoh yang terlupa dihapus
- Port/service yang tidak perlu terbuka

**D. Tugas Praktik**
 1. Jalankan `curl -I` ke web server lab, catat header yang membocorkan versi/teknologi
 2. Cari file/halaman default bawaan instalasi yang masih ada (misal halaman uji PHP info jika relevan)
 3. Scan ulang service terbuka pada VM server dengan nmap dari modul sebelumnya, identifikasi yang tidak perlu
 4. Susun daftar misconfiguration yang ditemukan beserta rekomendasi perbaikannya

Tutup dengan membuat write-up modul ini mengikuti template.

**E. Indikator Keberhasilan**
- Daftar minimal 3 misconfiguration tercatat dengan rekomendasi
- Header informasi sensitif teridentifikasi dengan bukti curl

**F. Evaluasi Mandiri**
 1. Kenapa header yang membocorkan versi software berisiko?
 2. Bagaimana cara memprioritaskan misconfiguration mana yang diperbaiki dulu?

**G. Referensi Pencarian**
Server misconfiguration examples, information disclosure HTTP headers

---

## MODUL 081: Pengantar HTTP Request Smuggling

**A. Identitas**
- Nomor: 081
- Bidang: Web Security & Bug Bounty
- Tingkat: 4-5
- Estimasi: 50-65 menit
- Prasyarat: 077

**B. Tujuan Belajar**
Mampu memahami dan mempraktikkan: pengantar http request smuggling.

**C. Topik Pembelajaran**
- Konsep dasar request smuggling: perbedaan interpretasi panjang request antara front-end dan back-end server
- Header Content-Length dan Transfer-Encoding sebagai sumber ambiguitas (pengantar konsep)

**D. Tugas Praktik**
 1. Pelajari skenario pengantar di PortSwigger Academy - HTTP Request Smuggling (bagian pengantar/konsep)
 2. Ikuti satu lab paling dasar sesuai kemampuan saat ini, fokus pada pemahaman konsep, bukan harus menyelesaikan lab tersulit
 3. Tulis penjelasan dengan kata sendiri kenapa perbedaan parsing antara dua server bisa dieksploitasi

Tutup dengan membuat write-up modul ini mengikuti template.

**E. Indikator Keberhasilan**
- Write-up menjelaskan konsep dasar request smuggling dengan kata sendiri
- Ada catatan progres lab (meski belum tuntas sepenuhnya, karena ini topik lanjutan)

**F. Evaluasi Mandiri**
 1. Kenapa topik ini dianggap lanjutan dan butuh pemahaman HTTP yang kuat?
 2. Apa dampak potensial jika request smuggling berhasil dieksploitasi pada infrastruktur nyata?

**G. Referensi Pencarian**
PortSwigger HTTP request smuggling academy, request smuggling CL TE explained

---

## MODUL 082: Capstone Android: Audit Keamanan Aplikasi Lab

**A. Identitas**
- Nomor: 082
- Bidang: Android & Mobile Security
- Tingkat: 4-5
- Estimasi: 50-65 menit
- Prasyarat: 076

**B. Tujuan Belajar**
Mampu memahami dan mempraktikkan: capstone android: audit keamanan aplikasi lab.

**C. Topik Pembelajaran**
- Menggabungkan seluruh modul Android menjadi satu audit terhadap satu aplikasi latihan

**D. Tugas Praktik**
 1. Pilih satu aplikasi latihan (yang memang disediakan untuk belajar keamanan mobile)
 2. Lakukan audit mencakup: permission, analisis statis, penyimpanan data, trafik jaringan, dan perilaku runtime
 3. Susun laporan audit lengkap dengan temuan, tingkat risiko sederhana (tinggi/sedang/rendah), dan rekomendasi

Tutup dengan membuat write-up modul ini mengikuti template.

**E. Indikator Keberhasilan**
- Laporan audit mencakup minimal 4 aspek yang telah dipelajari
- Setiap temuan punya tingkat risiko dan rekomendasi

**F. Evaluasi Mandiri**
 1. Dari seluruh temuan, mana yang paling berdampak bagi pengguna aplikasi?
 2. Apa yang akan kamu lakukan secara berbeda jika ini adalah aplikasi produksi sungguhan dengan program bug bounty resmi?

**G. Referensi Pencarian**
Mobile application security audit checklist, android pentest report example

---

## MODUL 083: Checkpoint Fase 4: Tantangan Lab Lanjut

**A. Identitas**
- Nomor: 083
- Bidang: Vulnerability Assessment & Pentest
- Tingkat: 4-5
- Estimasi: 50-65 menit
- Prasyarat: 079

**B. Tujuan Belajar**
Mampu memahami dan mempraktikkan: checkpoint fase 4: tantangan lab lanjut.

**C. Topik Pembelajaran**
- Review menyeluruh Fase 4 (web lanjutan, server hardening, android lanjutan, vuln research awal)

**D. Tugas Praktik**
 1. Pilih satu lab level medium-hard yang menggabungkan web lanjutan dan privilege escalation/server
 2. Selesaikan sebanyak mungkin, dokumentasikan setiap langkah termasuk yang gagal (bagian gagal juga berharga untuk dipelajari)
 3. Tulis write-up reflektif tentang kesiapan menuju capstone akhir

Tutup dengan membuat write-up modul ini mengikuti template.

**E. Indikator Keberhasilan**
- Write-up mencakup bagian yang gagal beserta analisis kenapa gagal
- Ada kesimpulan kesiapan menuju capstone

**F. Evaluasi Mandiri**
 1. Pola kerentanan apa yang mulai terasa familiar sampai sejauh ini?
 2. Persiapan apa yang masih dibutuhkan sebelum capstone akhir?

**G. Referensi Pencarian**
Medium-hard lab challenge, learning from failed attempts in security testing

---

## MODUL 084: TLS/SSL Dasar: Sertifikat dan Konfigurasi Aman

**A. Identitas**
- Nomor: 084
- Bidang: Server Security
- Tingkat: 4-5
- Estimasi: 50-65 menit
- Prasyarat: 080

**B. Tujuan Belajar**
Mampu memahami dan mempraktikkan: tls/ssl dasar: sertifikat dan konfigurasi aman.

**C. Topik Pembelajaran**
- Konsep HTTPS dan sertifikat TLS
- Self-signed certificate untuk lab
- Redirect HTTP ke HTTPS

**D. Tugas Praktik**
 1. Buat self-signed certificate dengan `openssl` untuk web server lab
 2. Konfigurasikan web server agar menyajikan halaman lewat HTTPS memakai sertifikat tersebut
 3. Akses lewat browser, amati peringatan 'tidak tepercaya' dan jelaskan kenapa itu muncul untuk self-signed cert
 4. Konfigurasikan redirect dari HTTP ke HTTPS

Tutup dengan membuat write-up modul ini mengikuti template.

**E. Indikator Keberhasilan**
- HTTPS pada lab berjalan dengan self-signed certificate
- Redirect HTTP->HTTPS terbukti berfungsi

**F. Evaluasi Mandiri**
 1. Kenapa browser menandai self-signed certificate sebagai tidak tepercaya?
 2. Apa perbedaan fungsi antara enkripsi dan validasi identitas pada TLS?

**G. Referensi Pencarian**
Self-signed certificate openssl tutorial, HTTPS redirect configuration

---

## MODUL 085: Menyusun Portofolio Write-Up di GitHub

**A. Identitas**
- Nomor: 085
- Bidang: Pelaporan & Remediation
- Tingkat: 4-5
- Estimasi: 50-65 menit
- Prasyarat: 072

**B. Tujuan Belajar**
Mampu memahami dan mempraktikkan: menyusun portofolio write-up di github.

**C. Topik Pembelajaran**
- Struktur repository untuk kumpulan write-up
- Menulis README yang informatif
- Memisahkan write-up lab publik (boleh dipublikasikan) dari data sensitif (tidak boleh)

**D. Tugas Praktik**
 1. Buat repository baru di GitHub (akun egabelva) khusus kumpulan write-up lab pembelajaran
 2. Susun struktur folder per kategori (web, network, android, dst.)
 3. Pindahkan beberapa write-up terbaik dari modul-modul sebelumnya ke repo ini, hilangkan data pribadi/sensitif bila ada
 4. Tulis README yang menjelaskan isi repo dan tujuan pembelajaran

Tutup dengan membuat write-up modul ini mengikuti template.

**E. Indikator Keberhasilan**
- Repository GitHub berisi minimal 3 write-up yang sudah dirapikan
- README menjelaskan struktur dan tujuan repo dengan jelas

**F. Evaluasi Mandiri**
 1. Kenapa portofolio write-up berguna untuk melamar posisi di bidang keamanan siber?
 2. Data apa saja yang harus dihilangkan sebelum write-up dipublikasikan?

**G. Referensi Pencarian**
Security write-up portfolio GitHub examples, README best practices

---

## MODUL 086: Membaca Source Code untuk Menemukan Pola Kerentanan

**A. Identitas**
- Nomor: 086
- Bidang: Vulnerability Research
- Tingkat: 4-5
- Estimasi: 50-65 menit
- Prasyarat: 078

**B. Tujuan Belajar**
Mampu memahami dan mempraktikkan: membaca source code untuk menemukan pola kerentanan.

**C. Topik Pembelajaran**
- Code review dasar: mencari input yang tidak divalidasi, query yang dibangun dengan string concatenation (indikasi SQLi), penggunaan fungsi berbahaya

**D. Tugas Praktik**
 1. Ambil contoh kode sumber aplikasi web sederhana yang memang open-source dan dirancang untuk latihan (misal aplikasi contoh dari platform belajar keamanan)
 2. Baca kode bagian yang menangani input user (form login, pencarian, dsb.)
 3. Identifikasi pola berisiko: string concatenation untuk query SQL, kurangnya validasi input, penggunaan fungsi eval/exec
 4. Catat baris kode dan penjelasan kenapa pola tersebut berisiko

Tutup dengan membuat write-up modul ini mengikuti template.

**E. Indikator Keberhasilan**
- Write-up mencatat minimal 2 pola kode berisiko dengan kutipan baris kode
- Penjelasan kenapa tiap pola berisiko akurat

**F. Evaluasi Mandiri**
 1. Kenapa string concatenation pada query SQL berbahaya dibanding parameterized query?
 2. Apa manfaat code review dibanding hanya mengandalkan black-box testing?

**G. Referensi Pencarian**
Secure code review basics, SQL injection vulnerable code pattern, source code security review

---

## MODUL 087: Capstone Web: Chaining Multi-Kerentanan pada Target Lab

**A. Identitas**
- Nomor: 087
- Bidang: Web Security & Bug Bounty
- Tingkat: 4-5
- Estimasi: 50-65 menit
- Prasyarat: 081

**B. Tujuan Belajar**
Mampu memahami dan mempraktikkan: capstone web: chaining multi-kerentanan pada target lab.

**C. Topik Pembelajaran**
- Menggabungkan seluruh modul Web Fase 1-4 menjadi satu pengujian menyeluruh pada satu target lab

**D. Tugas Praktik**
 1. Pilih satu target lab (web app vulnerable yang memang disediakan untuk latihan, misal DVWA/juice shop/PortSwigger lab gabungan)
 2. Lakukan pengujian menyeluruh: enumerasi, XSS, SQLi, IDOR, CSRF, dan kerentanan lain yang relevan dari seluruh modul Web
 3. Susun laporan akhir Web: daftar seluruh kerentanan ditemukan, tingkat risiko, dan rekomendasi perbaikan masing-masing

Tutup dengan membuat write-up modul ini mengikuti template.

**E. Indikator Keberhasilan**
- Laporan mencakup minimal 4 kategori kerentanan web berbeda dari seluruh modul yang dipelajari
- Setiap temuan memuat bukti, dampak, dan rekomendasi

**F. Evaluasi Mandiri**
 1. Dari seluruh kerentanan web yang pernah kamu pelajari, mana tiga yang paling sering kamu temui/paling menarik, dan kenapa?
 2. Apa pola umum yang membuat aplikasi web rentan terhadap banyak kerentanan sekaligus?

**G. Referensi Pencarian**
OWASP Juice Shop, DVWA comprehensive testing, web application penetration testing checklist

---

## MODUL 088: Hardening Server Lanjutan

**A. Identitas**
- Nomor: 088
- Bidang: Server Security
- Tingkat: 4-5
- Estimasi: 50-65 menit
- Prasyarat: 084

**B. Tujuan Belajar**
Mampu memahami dan mempraktikkan: hardening server lanjutan.

**C. Topik Pembelajaran**
- fail2ban untuk mencegah brute force
- Pembatasan akses berbasis IP (allowlist dasar)
- Checklist hardening server sederhana

**D. Tugas Praktik**
 1. Install dan konfigurasikan `fail2ban` dasar untuk melindungi SSH di VM lab
 2. Simulasikan beberapa percobaan login gagal dan amati apakah fail2ban memblokir IP tersebut
 3. Susun checklist hardening pribadi berdasarkan seluruh modul Server yang telah dipelajari (minimal 8 item)

Tutup dengan membuat write-up modul ini mengikuti template.

**E. Indikator Keberhasilan**
- Bukti fail2ban memblokir percobaan login gagal berulang
- Checklist hardening pribadi tersusun rapi dan relevan dengan lab

**F. Evaluasi Mandiri**
 1. Apa keterbatasan fail2ban dibanding firewall tingkat jaringan?
 2. Item checklist mana yang menurutmu paling berdampak jika diabaikan?

**G. Referensi Pencarian**
fail2ban tutorial, server hardening checklist

---

## MODUL 089: Hardening Dasar Linux

**A. Identitas**
- Nomor: 089
- Bidang: Linux & Kali
- Tingkat: 4-5
- Estimasi: 50-65 menit
- Prasyarat: 070

**B. Tujuan Belajar**
Mampu memahami dan mempraktikkan: hardening dasar linux.

**C. Topik Pembelajaran**
- Firewall dasar dengan ufw
- Menonaktifkan service yang tidak perlu
- Update rutin sebagai mitigasi dasar

**D. Tugas Praktik**
 1. Cek status firewall: `sudo ufw status`
 2. Aktifkan ufw dan izinkan hanya port yang dibutuhkan (misal SSH): `sudo ufw allow 22` lalu `sudo ufw enable`
 3. List service yang berjalan (`systemctl list-units --type=service --state=running`), identifikasi yang tidak perlu untuk lab ini
 4. Jelaskan keputusan menonaktifkan atau membiarkan tiap service yang teridentifikasi

Tutup dengan membuat write-up modul ini mengikuti template.

**E. Indikator Keberhasilan**
- Output `ufw status` menunjukkan rule yang dibuat
- Write-up memuat daftar service aktif dengan keputusan masing-masing

**F. Evaluasi Mandiri**
 1. Kenapa 'deny by default, allow by exception' lebih aman?
 2. Apa risiko mematikan firewall saat lab terhubung ke jaringan kampus/rumah?

**G. Referensi Pencarian**
ufw firewall tutorial, Linux service hardening basics

---

## MODUL 090: Network Pivoting Pengantar

**A. Identitas**
- Nomor: 090
- Bidang: Network Security
- Tingkat: 4-5
- Estimasi: 50-65 menit
- Prasyarat: 071

**B. Tujuan Belajar**
Mampu memahami dan mempraktikkan: network pivoting pengantar.

**C. Topik Pembelajaran**
- Konsep pivoting: menjangkau jaringan internal lewat host yang sudah diakses
- Port forwarding sebagai dasar pivoting sederhana

**D. Tugas Praktik**
 1. Simulasikan skenario 2 VM: VM A terhubung ke jaringan luar dan ke VM B (jaringan internal/host-only)
 2. Dari mesin asal, coba akses langsung VM B dan buktikan tidak bisa (beda jaringan)
 3. Gunakan SSH tunnel melalui VM A untuk mengakses service di VM B
 4. Gambarkan topologi skenario ini di write-up

Tutup dengan membuat write-up modul ini mengikuti template.

**E. Indikator Keberhasilan**
- Diagram topologi 2 VM tergambar jelas di write-up
- Berhasil mengakses VM B lewat VM A dengan bukti output

**F. Evaluasi Mandiri**
 1. Mengapa pivoting relevan dalam skenario pentest jaringan internal perusahaan?
 2. Apa risiko keamanan dari topologi yang memungkinkan pivoting tanpa kontrol?

**G. Referensi Pencarian**
Network pivoting concept, SSH tunneling for pivoting intro

---

## MODUL 091: Parsing HTML dengan BeautifulSoup untuk Web Recon

**A. Identitas**
- Nomor: 091
- Bidang: Python & Analisis Kode
- Tingkat: 4-5
- Estimasi: 50-65 menit
- Prasyarat: 069

**B. Tujuan Belajar**
Mampu memahami dan mempraktikkan: parsing html dengan beautifulsoup untuk web recon.

**C. Topik Pembelajaran**
- Instalasi `beautifulsoup4`
- Parsing tag HTML (link, form, input)
- Ekstraksi informasi dari halaman statis

**D. Tugas Praktik**
 1. Buat halaman HTML latihan berisi beberapa link dan satu form sederhana, sajikan lewat `python3 -m http.server`
 2. Tulis script yang mengambil halaman tersebut dan mengekstrak semua tag `<a href>`
 3. Tambahkan ekstraksi semua field `<input>` pada form (name dan type)
 4. Diskusikan di write-up kegunaan script ini untuk tahap recon pengujian web

Tutup dengan membuat write-up modul ini mengikuti template.

**E. Indikator Keberhasilan**
- Script berhasil mencetak seluruh link dan field form dari halaman uji
- Write-up menjelaskan manfaat ekstraksi ini untuk recon

**F. Evaluasi Mandiri**
 1. Kenapa mengetahui field form penting sebelum menguji input validation?
 2. Bagaimana script ini berbeda dengan crawler web sungguhan?

**G. Referensi Pencarian**
BeautifulSoup tutorial, Python web scraping basics, HTML form parsing

---

## MODUL 092: Menelusuri Changelog/Patch untuk Memahami Root Cause

**A. Identitas**
- Nomor: 092
- Bidang: Vulnerability Research
- Tingkat: 4-5
- Estimasi: 50-65 menit
- Prasyarat: 086

**B. Tujuan Belajar**
Mampu memahami dan mempraktikkan: menelusuri changelog/patch untuk memahami root cause.

**C. Topik Pembelajaran**
- Membandingkan versi sebelum dan sesudah patch keamanan (diff) untuk memahami akar masalah
- Changelog dan security fix notes

**D. Tugas Praktik**
 1. Pilih satu CVE dari modul 001 yang memiliki source code terbuka dan patch publik (misal proyek open-source populer)
 2. Cari commit/patch yang memperbaiki CVE tersebut (lewat changelog atau repository resmi)
 3. Bandingkan kode sebelum dan sesudah patch, identifikasi apa yang berubah
 4. Jelaskan dengan kata sendiri root cause kerentanan berdasarkan perubahan tersebut

Tutup dengan membuat write-up modul ini mengikuti template.

**E. Indikator Keberhasilan**
- Write-up menunjukkan potongan kode sebelum/sesudah patch
- Penjelasan root cause konsisten dengan perubahan kode yang ditemukan

**F. Evaluasi Mandiri**
 1. Kenapa membaca patch membantu memahami kerentanan lebih dalam dibanding hanya membaca deskripsi CVE?
 2. Apa yang membuat suatu perbaikan dianggap menyelesaikan akar masalah, bukan hanya gejalanya?

**G. Referensi Pencarian**
Reading security patch diffs, CVE patch analysis, root cause analysis vulnerability

---

## MODUL 093: Review Linux: Membangun Script Enumerasi Sistem

**A. Identitas**
- Nomor: 093
- Bidang: Linux & Kali
- Tingkat: 4-5
- Estimasi: 60-90 menit
- Prasyarat: 089

**B. Tujuan Belajar**
Mampu memahami dan mempraktikkan: review linux: membangun script enumerasi sistem.

**C. Topik Pembelajaran**
- Menggabungkan perintah yang sudah dipelajari (user, proses, service, log) menjadi satu alur
- Scripting Bash dasar (opsional) untuk otomasi

**D. Tugas Praktik**
 1. Tulis satu script Bash atau Python yang mengumpulkan: info OS, user aktif, service berjalan, dan 5 baris terakhir auth.log
 2. Jalankan script di VM, simpan outputnya ke file `enum-report.txt`
 3. Bandingkan hasilnya dengan satu tool enumerasi populer yang kamu cari sendiri (misal LinPEAS, cukup baca dokumentasinya, tidak wajib dijalankan)

Tutup dengan membuat write-up modul ini mengikuti template.

**E. Indikator Keberhasilan**
- Script enumerasi berjalan tanpa error dan menghasilkan `enum-report.txt`
- Write-up membandingkan outputmu dengan pendekatan tool populer

**F. Evaluasi Mandiri**
 1. Informasi apa lagi yang menurutmu penting ditambahkan ke script ini?
 2. Kenapa enumerasi sistem adalah langkah awal yang penting dalam assessment maupun privilege escalation?

**G. Referensi Pencarian**
Linux enumeration script, LinPEAS overview, Bash scripting basics

---

## MODUL 094: Review Network: Pemetaan Jaringan Lab

**A. Identitas**
- Nomor: 094
- Bidang: Network Security
- Tingkat: 4-5
- Estimasi: 60-90 menit
- Prasyarat: 090

**B. Tujuan Belajar**
Mampu memahami dan mempraktikkan: review network: pemetaan jaringan lab.

**C. Topik Pembelajaran**
- Menggabungkan host discovery, port scan, dan service enumeration menjadi satu laporan pemetaan jaringan

**D. Tugas Praktik**
 1. Lakukan pemetaan penuh terhadap lab (minimal 2 host): discovery, port scan, service/version detection
 2. Susun diagram sederhana topologi lab (host, IP, port terbuka, service)
 3. Simpan semua output mentah nmap sebagai lampiran write-up

Tutup dengan membuat write-up modul ini mengikuti template.

**E. Indikator Keberhasilan**
- Diagram topologi dan tabel hasil scan lengkap dan konsisten dengan output nmap
- Semua perintah yang dipakai terdokumentasi

**F. Evaluasi Mandiri**
 1. Jika kamu harus melaporkan hasil ini ke klien, bagian mana yang paling penting disorot lebih dulu?
 2. Apa yang akan kamu scan lebih lanjut berdasarkan temuan ini?

**G. Referensi Pencarian**
Network mapping methodology, nmap reporting practice

---

## MODUL 095: Proyek Python: Menyusun Tool Recon Sendiri

**A. Identitas**
- Nomor: 095
- Bidang: Python & Analisis Kode
- Tingkat: 4-5
- Estimasi: 60-90 menit
- Prasyarat: 091

**B. Tujuan Belajar**
Mampu memahami dan mempraktikkan: proyek python: menyusun tool recon sendiri.

**C. Topik Pembelajaran**
- Menggabungkan socket scanner, requests, parsing JSON/HTML, dan file handling menjadi satu tool CLI kecil

**D. Tugas Praktik**
 1. Rancang tool `recon.py` dengan alur: terima target (host) -> port scan dasar -> untuk port 80/8000 terbuka, ambil halaman dan ekstrak link/form -> simpan semua hasil ke file laporan
 2. Jalankan terhadap target lab milikmu sendiri
 3. Tambahkan argumen command-line sederhana dengan `sys.argv` (misal `python3 recon.py <target>`)

Tutup dengan membuat write-up modul ini mengikuti template.

**E. Indikator Keberhasilan**
- `recon.py` berjalan end-to-end dan menghasilkan file laporan
- Kode terorganisir dalam fungsi-fungsi yang jelas, bukan satu blok besar

**F. Evaluasi Mandiri**
 1. Fitur apa yang akan kamu tambahkan selanjutnya pada tool ini?
 2. Bagaimana kamu memastikan tool ini tidak dipakai secara tidak sengaja ke target di luar lab?

**G. Referensi Pencarian**
Building a recon tool in python, python argparse basics, CLI tool design python

---

## MODUL 096: Capstone Server: Hardening dan Audit Server Lab

**A. Identitas**
- Nomor: 096
- Bidang: Server Security
- Tingkat: 4-5
- Estimasi: 60-90 menit
- Prasyarat: 088

**B. Tujuan Belajar**
Mampu memahami dan mempraktikkan: capstone server: hardening dan audit server lab.

**C. Topik Pembelajaran**
- Menggabungkan seluruh modul Server menjadi satu audit menyeluruh

**D. Tugas Praktik**
 1. Lakukan audit penuh terhadap satu VM server lab: service, user, permission file, header, TLS, firewall, fail2ban
 2. Susun laporan audit dengan format: temuan, risiko, rekomendasi, status (sudah/belum diperbaiki)
 3. Terapkan minimal 3 rekomendasi perbaikan dan buktikan hasilnya

Tutup dengan membuat write-up modul ini mengikuti template.

**E. Indikator Keberhasilan**
- Laporan audit mencakup minimal 6 aspek yang sudah dipelajari
- Minimal 3 perbaikan diterapkan dengan bukti before/after

**F. Evaluasi Mandiri**
 1. Dari seluruh temuan, mana yang akan kamu tandai sebagai prioritas tertinggi dan kenapa?
 2. Apa yang akan kamu audit secara berkala jika server ini benar-benar production?

**G. Referensi Pencarian**
Server security audit checklist, hardening report writing

---

## MODUL 097: Dasar Fuzzing dan Pengujian Input Tidak Terduga

**A. Identitas**
- Nomor: 097
- Bidang: Vulnerability Research
- Tingkat: 4-5
- Estimasi: 60-90 menit
- Prasyarat: 092

**B. Tujuan Belajar**
Mampu memahami dan mempraktikkan: dasar fuzzing dan pengujian input tidak terduga.

**C. Topik Pembelajaran**
- Konsep fuzzing: memberi input acak/ekstrem untuk menemukan perilaku tak terduga
- Fuzzing sederhana pada form/parameter dengan karakter khusus, input sangat panjang, tipe data salah

**D. Tugas Praktik**
 1. Pada aplikasi web lab milikmu sendiri, siapkan daftar input 'aneh' (karakter khusus `' " <> ; --`, string sangat panjang, angka negatif, unicode)
 2. Tulis script Python kecil (manfaatkan modul sebelumnya) yang mengirim tiap input tersebut ke satu form/parameter dan mencatat response/error yang muncul
 3. Identifikasi input mana yang memicu error atau perilaku tidak normal (pesan error verbose, crash, delay signifikan)

Tutup dengan membuat write-up modul ini mengikuti template.

**E. Indikator Keberhasilan**
- Write-up mencatat input mana yang memicu respons tidak normal beserta buktinya
- Script fuzzing sederhana terlampir dan berjalan

**F. Evaluasi Mandiri**
 1. Kenapa pesan error yang sangat detail (verbose) bisa jadi petunjuk kerentanan?
 2. Apa beda fuzzing sederhana ini dengan fuzzer production-grade (konsep saja)?

**G. Referensi Pencarian**
Fuzzing basics concept, input validation testing special characters, simple fuzzer python

---

## MODUL 098: Menulis Ringkasan Teknis Kerentanan

**A. Identitas**
- Nomor: 098
- Bidang: Vulnerability Research
- Tingkat: 4-5
- Estimasi: 60-90 menit
- Prasyarat: 097

**B. Tujuan Belajar**
Mampu memahami dan mempraktikkan: menulis ringkasan teknis kerentanan.

**C. Topik Pembelajaran**
- Gaya penulisan advisory: ringkas, teknis, tapi tetap bisa dipahami audiens teknis luas
- Struktur: ringkasan, detail teknis, dampak, mitigasi, referensi

**D. Tugas Praktik**
 1. Pilih satu temuan terbaikmu dari seluruh kurikulum (boleh dari lab manapun)
 2. Tulis ringkasan teknis bergaya advisory (bukan laporan internal biasa): judul singkat, ringkasan satu paragraf, detail teknis, dampak, mitigasi, referensi
 3. Bandingkan gaya tulisanmu dengan satu advisory publik asli sebagai referensi format (jangan menyalin isinya)

Tutup dengan membuat write-up modul ini mengikuti template.

**E. Indikator Keberhasilan**
- Tulisan mengikuti struktur advisory standar
- Ada perbandingan singkat dengan format advisory publik asli sebagai referensi

**F. Evaluasi Mandiri**
 1. Apa beda audiens advisory publik dengan laporan internal ke satu klien?
 2. Bagian mana dari advisory publik asli yang menurutmu paling efektif menyampaikan informasi?

**G. Referensi Pencarian**
Security advisory writing style, vulnerability summary example format

---

## MODUL 099: Capstone Akhir: Simulasi Pentest End-to-End di Lab

**A. Identitas**
- Nomor: 099
- Bidang: Vulnerability Assessment & Pentest
- Tingkat: 4-5
- Estimasi: 60-90 menit
- Prasyarat: 083

**B. Tujuan Belajar**
Mampu memahami dan mempraktikkan: capstone akhir: simulasi pentest end-to-end di lab.

**C. Topik Pembelajaran**
- Menggabungkan seluruh kurikulum (001-099) dalam satu simulasi pentest menyeluruh

**D. Tugas Praktik**
 1. Pilih satu lab/target (atau gabungan beberapa lab) yang mencakup web, API (bila tersedia), privilege escalation, dan idealnya elemen mobile/server
 2. Lakukan pentest end-to-end lengkap: recon, enumerasi, eksploitasi, privilege escalation, dokumentasi tiap temuan
 3. Susun laporan pentest profesional lengkap: ringkasan eksekutif, metodologi, temuan terperinci (dengan tingkat risiko), rekomendasi remediasi

Tutup dengan membuat write-up modul ini mengikuti template.

**E. Indikator Keberhasilan**
- Laporan capstone lengkap dengan seluruh bagian standar laporan pentest profesional
- Minimal 3 kategori kerentanan berbeda berhasil didokumentasikan

**F. Evaluasi Mandiri**
 1. Jika kurikulum ini harus dilanjutkan dengan 20 modul lagi, topik apa yang ingin kamu dalami lebih jauh?
 2. Apa tiga keterampilan yang paling berkembang selama 100 modul ini?

**G. Referensi Pencarian**
Full pentest report template, end to end penetration testing simulation

---

## MODUL 100: Capstone Reporting: Laporan Pentest Lengkap dari Hasil Capstone

**A. Identitas**
- Nomor: 100
- Bidang: Pelaporan & Remediation
- Tingkat: 4-5
- Estimasi: 60-90 menit
- Prasyarat: 085

**B. Tujuan Belajar**
Mampu memahami dan mempraktikkan: capstone reporting: laporan pentest lengkap dari hasil capstone.

**C. Topik Pembelajaran**
- Menggabungkan seluruh teknik pelaporan (struktur, CVSS, remediasi, etika) menjadi satu laporan pentest profesional utuh

**D. Tugas Praktik**
 1. Ambil hasil dari modul Capstone Akhir (VA/Pentest) sebelumnya
 2. Susun ulang menjadi laporan pentest profesional lengkap: sampul, ringkasan eksekutif, metodologi, temuan terperinci dengan skor CVSS, rekomendasi remediasi, lampiran bukti
 3. Simpan laporan ini sebagai bagian dari portofolio (boleh dalam bentuk PDF/Markdown)

Tutup dengan membuat write-up modul ini mengikuti template.

**E. Indikator Keberhasilan**
- Laporan akhir mencakup seluruh bagian standar laporan pentest profesional
- Laporan tersimpan rapi sebagai bagian dari portofolio

**F. Evaluasi Mandiri**
 1. Jika laporan ini dibaca oleh klien non-teknis, bagian mana yang akan mereka baca lebih dulu?
 2. Apa yang akan kamu ubah dari gaya menulismu setelah menyelesaikan seluruh kurikulum ini?

**G. Referensi Pencarian**
Professional penetration testing report structure, pentest report template

---
