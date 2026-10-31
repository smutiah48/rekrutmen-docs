# Spesifikasi Sistem dan Batasan Lingkup

> **Status dokumen:** diturunkan melalui analisis statis dari arsip sumber yang diberikan, 31 Oktober 2026. Dokumentasi ini bukan bukti bahwa seluruh integrasi telah diuji secara live atau bahwa implementasi memenuhi seluruh persyaratan keamanan.

## Problem yang diselesaikan

1. Pelamar membutuhkan **satu tempat** untuk membaca kebutuhan, memilih jalur, memahami syarat, dan mengajukan lamaran.
2. Pendaftaran berisiko ganda akibat refresh, jaringan terlambat, atau klik berulang; backend menyediakan **request ID**, pencarian submit yang telah tersimpan, dan lock saat menulis.
3. Tahapan seleksi tersebar di sejumlah sheet; **tracking identity + stage-aware response** mengurangi pencarian manual.
4. Pengumuman tidak boleh tampil sebelum disetujui; gate publikasi dan mode QA membedakan pengujian dan publikasi resmi.
5. Operasional administrasi membutuhkan layanan terpisah dengan akses yang dibatasi sesuai tanggung jawab.

## Aktor

- **Pelamar publik:** melihat informasi, mendaftar, dan melacak lamaran yang dimilikinya.
- **Operator/Pimpinan internal:** memproses data pelamar dan tahapan melalui layanan admin (UI admin tidak terlampir).
- **Pengelola sistem:** mengatur konfigurasi, sheet, script properties, deployment, QA, dan publikasi.
- **Sistem eksternal:** backend rekrutmen lain melalui gateway yang disediakan pada file pelamar.

## Gambaran komponen

| Komponen | Peran tingkat umum |
|---|---|
| Portal pelamar | Menyajikan informasi, panduan, pengumuman, dan pelacakan. |
| Modul rekrutmen | Membantu pengguna menemukan formasi dan mengisi pendaftaran. |
| Layanan pelamar | Mendukung pendaftaran, informasi, dan status yang diizinkan. |
| Layanan administrasi | Mendukung proses operasional dalam lingkungan terbatas. |

## Di luar lingkup yang dapat diverifikasi

- Frontend Admin tidak tersedia; detail tata letak dan validasi admin tidak dapat direkonstruksi secara pasti.
- Backend manajerial/pokja yang diakses melalui integrasi eksternal tidak seluruhnya tersedia.
- Tidak ada dataset production, diagram jaringan, credential store, konfigurasi trigger, maupun bukti audit live dalam ZIP.
- Tidak disertakan screenshot asli; screenshot untuk portofolio perlu disiapkan dari lingkungan demo yang datanya disamarkan.
