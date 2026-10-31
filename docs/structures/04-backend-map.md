# Struktur Backend dan Pelayanan Data

> **Status dokumen:** diturunkan melalui analisis statis dari arsip sumber yang diberikan, 31 Oktober 2026. Dokumentasi ini bukan bukti bahwa seluruh integrasi telah diuji secara live atau bahwa implementasi memenuhi seluruh persyaratan keamanan.

## Backend pelamar

- Registrasi, validasi schema, normalisasi email/nomor HP, penanganan duplikasi, ID pendaftaran.
- Layanan informasi publik dan penerimaan pendaftaran.
- Response wrapper, sanitasi output, pengelolaan error sementara, serta cache formasi.
- Drive PDF pengumuman dan metadata berkas.
- Antrean email, health check, gateway modular dan helper pengujian.

## Seleksi administrasi & tracking

- Pembacaan referensi hasil final, normalisasi identitas, cache dan fallback pencarian.
- Kebijakan publish/tutup hasil; mode QA dan daftar tester hanya untuk internal.
- Hasil tahap TI dan tahap berikutnya memakai aturan gate yang berbeda.
- Integrasi hasil tampil publik harus dicek pada fungsi wrapper dengan urutan patch terbaru.

## Backend admin

- Manajemen data pelamar, statistik, analisis, ranking, keputusan unit, persetujuan, dan proses lanjutan.
- Interaksi dengan sheet operasional dan sejumlah sheet teknis/hidden.
- Fungsi backend admin menyentuh data pribadi dan keputusan internal; seluruhnya harus berada di lingkungan dengan auth dan audit sesuai kebijakan.
- **UI admin tidak tersedia dalam arsip**.

## Risiko penggabungan

File backend admin memuat banyak modul/patch historis dalam satu berkas; fungsi duplikat atau redefinisi perlu dicek saat refactor. Lihat indeks private untuk lokasi deklarasi.
