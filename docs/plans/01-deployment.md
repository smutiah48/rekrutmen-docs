# Rencana Setup dan Deployment Aman

> **Status dokumen:** diturunkan melalui analisis statis dari arsip sumber yang diberikan, 31 Oktober 2026. Dokumentasi ini bukan bukti bahwa seluruh integrasi telah diuji secara live atau bahwa implementasi memenuhi seluruh persyaratan keamanan.

## Penting

Ini **rencana staging**, bukan prosedur langsung menjalankan source asli dengan data production. Apps Script memiliki keterbatasan kuota, izin owner, dan project binding.

### Fase A — inventarisasi

1. Konfirmasi pemilik proyek, izin penggunaan, dan batas tanggung jawab masing-masing layanan.
2. Pahami pemisahan layanan dan tinjau kompatibilitas sebelum melakukan perubahan.
3. Salin **data uji sintetis** ke spreadsheet baru dan siapkan folder pengumuman terpisah.
4. Terapkan hak akses minimal; **jangan** menaruh secret sebenarnya dalam dokumentasi.

### Fase B — lingkungan staging

1. Siapkan lingkungan pengujian terpisah untuk portal dan layanan pelamar.
2. Pertahankan project backend admin **terpisah** sesuai kondisi sumber, kecuali arsitektur sudah diaudit.
3. Konfigurasi sheet, folder Drive, identitas service dan izin minimum.
4. Deploy version khusus staging dan cek logs tanpa data riil.

### Fase C — pengujian

- Uji format/kolom sheet, jalur formasi, validasi form, submit, email antrean, dan notifikasi.
- Uji tabrakan request (`LockService`), refresh setelah submit, dan duplikasi identitas.
- Uji gate publish tertutup, QA, terbuka, dan pencabutan.
- Uji otorisasi di endpoint admin dan pembatasan data hasil publik.
- Uji browser desktop/mobile, keyboard, PDF, dan beban menurut batas kuota.

### Fase D — produksi

- Jalankan review keamanan dan otorisasi organisasi; lakukan backup.
- Gunakan prosedur perubahan dan rollback yang disetujui.
- Pantau error, antrean email, quota, serta perubahan struktur sheet.

Catatan: dokumentasi ini tidak membuktikan bahwa aplikasi siap dideploy atau telah diuji pada lingkungan produksi.
