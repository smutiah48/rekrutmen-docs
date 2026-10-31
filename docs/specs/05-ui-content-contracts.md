# Kontrak UX dan Konten

> **Status dokumen:** diturunkan melalui analisis statis dari arsip sumber yang diberikan, 31 Oktober 2026. Dokumentasi ini bukan bukti bahwa seluruh integrasi telah diuji secara live atau bahwa implementasi memenuhi seluruh persyaratan keamanan.

## Jalur antarmuka

| Tampilan | Konten minimal | Aksi |
|---|---|---|
| Halaman depan | Nama portal, pilihan program, pengantar, panduan | Pilih program, buka panduan, lacak. |
| Katalog PTT | Jalur formasi, jumlah kebutuhan jika tersedia, pencarian, filter, status buka/tutup | Lihat formasi, pilih, kembali. |
| Detail formasi | Nama, unit, kualifikasi, bidang/level bila tersedia | Lanjut ke formulir. |
| Formulir | Identitas, pendidikan, pengalaman, portofolio, consent | Simpan draft (jika aktif), validasi, submit. |
| Pengumuman | Daftar dokumen yang dapat diakses publik | Buka preview, kembali, tutup. |
| Lacak | Email, nomor HP, penanda hasil/status | Cari, tampilkan error atau status. |

## Prinsip pesan

1. Tidak mengungkap rincian pemeringkatan atau atribut internal yang tidak ditetapkan sebagai hasil publik.
2. Gunakan bahasa Indonesia ringkas dan jelas, satu CTA utama per langkah.
3. Indikator status harus tetap dipahami tanpa bergantung pada warna.
4. Tautan/berkas PDF harus dapat diakses pengguna berkebutuhan khusus bila memungkinkan.
5. Modal memiliki label, focus management, dan opsi tutup.

Referensi visual teknis: `DESIGN.md`. Untuk memeriksa perilaku event secara granular, lihat indeks fungsi/line map di paket private.
