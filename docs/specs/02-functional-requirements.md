# Spesifikasi Fungsional dan Acceptance Criteria

> **Status dokumen:** diturunkan melalui analisis statis dari arsip sumber yang diberikan, 31 Oktober 2026. Dokumentasi ini bukan bukti bahwa seluruh integrasi telah diuji secara live atau bahwa implementasi memenuhi seluruh persyaratan keamanan.

| ID | Kebutuhan | Terindikasi di kode | Acceptance criteria untuk pengujian |
|---|---|---|---|
| FR-01 | Menampilkan portal dan informasi rekrutmen | Shell HTML utama + layanan data | Beranda dan menu utama terlihat pada desktop/mobile. |
| FR-02 | Memilih jalur PTT / subjenis formasi | Modul PTT | Pilihan tampil sesuai sumber data dan dapat dikembalikan. |
| FR-03 | Pencarian/filter formasi | Render/search/filter klien | Query memfilter dengan benar; empty state muncul. |
| FR-04 | Baca syarat dan detail formasi | Detail/schema server + konten modal | Data formasi cocok dengan data resmi; fallback jelas. |
| FR-05 | Daftar PTT dengan validasi | Formulir dan validasi | Validasi klien/server konsisten; consent dicatat. |
| FR-06 | Hindari duplicate submit | request ID, pemeriksaan identitas dan lock transaksi | Dua pengiriman identik menghasilkan satu lamaran tercatat. |
| FR-07 | Status submit tertunda | Pemeriksaan pencatatan | Koneksi putus tidak memaksa pelamar mendaftar ulang. |
| FR-08 | Lacak status berbasis identitas | email + HP, tahapan resmi | Pengguna hanya memperoleh status publik yang berhak diketahui. |
| FR-09 | Gate pengumuman hasil seleksi | Pengujian publikasi | Sebelum publish, detail hasil tidak bocor; sesudah publish sesuai kebijakan. |
| FR-10 | Akses daftar dan pratinjau PDF | Drive + PDF.js | Dokumen yang layak publik saja terlihat dan preview berjalan. |
| FR-11 | Email notifikasi/konfirmasi | antrean email backend pelamar | Enqueue dan pemrosesan tidak menyebabkan submit ganda. |
| FR-12 | Operasional admin | fungsi backend admin | RBAC dan scope data perlu diverifikasi dalam deployment nyata. |
| FR-13 | Gateway backend rekrutmen lainnya | pemanggilan server ke backend lain | Error upstream ditangani tanpa membuka kunci/URL internal. |

**Status:** acceptance criteria ini adalah **target uji**, bukan hasil pengujian. Jangan menyatakan “passed” sebelum ada hasil QA.

## Nonfungsional yang harus diuji

- Privasi dan pembatasan hasil berdasarkan identitas.
- Validasi server, idempotensi dan penanganan race condition.
- Rate limit/abuse prevention pada deployment anonim.
- Kinerja query Sheets, ukuran cache, quota Apps Script, serta antrean mail.
- Konsistensi status dan hasil antar sheet.
- Perilaku responsif serta aksesibilitas keyboard/screen reader.
- Traceability audit keputusan dan perlindungan hasil resmi.
