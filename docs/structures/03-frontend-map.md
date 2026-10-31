# Struktur UI dan Tanggung Jawab Komponen

> **Status dokumen:** diturunkan melalui analisis statis dari arsip sumber yang diberikan, 31 Oktober 2026. Dokumentasi ini bukan bukti bahwa seluruh integrasi telah diuji secara live atau bahwa implementasi memenuhi seluruh persyaratan keamanan.

## Shell publik (`Pelamar.html`)

- Document head dan dependensi browser (Tailwind CDN, SweetAlert2, PDF.js, Font Awesome).
- Styling utama, shell, navbar desktop/mobile, hero, kartu jalur, statistik footer.
- Bagian panduan, FAQ, pengumuman, dan lacak status.
- Pemuatan modul PTT sesuai pemilihan jalur; bridging ke fungsi Apps Script.
- Fitur form manajerial dan modal, yang backend integrasinya sebagian di luar ZIP.

## PTT (`PTT.html`)

- Scope style komponen untuk kartu, pencarian, detail, form, dan popup.
- Hero kategori PTT, pilihan jalur, countdown/periode pendaftaran.
- Pencarian formasi, filter dan pemetaan pendidikan/program studi.
- Form registrasi yang tampil/dibangun dinamis berdasarkan jalur.
- Dialog persyaratan, validasi, draft, dan integrasi layanan aplikasi.

## Aturan desain pengembang

1. Gunakan namespace CSS/DOM yang jelas agar class baru tidak mempengaruhi shell.
2. Render teks dari data dengan escape/sanitasi; hindari menyuntikkan HTML tak tepercaya.
3. Modal perlu accessible focus and close controls.
4. Gunakan status publik dari server, bukan kalkulasi kelulusan di browser.
5. Tetap uji desktop 100% zoom dan mobile viewport; banyak override CSS berarti risiko regresi.
