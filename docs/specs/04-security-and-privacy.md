# Spesifikasi Keamanan dan Privasi

> **Status dokumen:** diturunkan melalui analisis statis dari arsip sumber yang diberikan, 31 Oktober 2026. Dokumentasi ini bukan bukti bahwa seluruh integrasi telah diuji secara live atau bahwa implementasi memenuhi seluruh persyaratan keamanan.

## Observasi source dan risiko yang harus ditangani

| Area | Observasi dari arsip | Risiko jika disebarkan tanpa sanitasi |
|---|---|---|
| Konfigurasi internal | Nilai akses dan konfigurasi harus dikelola dalam lingkungan terbatas. | Kebocoran akses atau konfigurasi bila dipublikasikan. |
| Web app anonim | Akses publik memerlukan pemeriksaan otorisasi dan pembatasan data. | Endpoint publik memiliki hak eksekusi pemilik deploy, bergantung pada validasi server. |
| Kredensial | Kunci dan token harus disimpan dan dibatasi sesuai kewenangan. | Kunci pada sisi klien tidak layak menjadi autentikasi tunggal. |
| Tracking | Penelusuran berdasarkan pasangan email + nomor telepon. | Risiko enumerasi dan kebocoran informasi bila tanpa pembatasan percobaan. |
| Google Sheets | Menyimpan identitas pelamar dan hasil proses seleksi. | Pelanggaran privasi bila akses, dump, atau audit log terbuka. |
| Files/PDF | Akses Drive dan PDF pengumuman via token/link. | Kebocoran dokumen internal jika filter publikasi salah. |
| Admin | Akses administratif memerlukan pembatasan sesuai peran. | Operasi atau data dapat terbuka bila otorisasi tidak konsisten. |

Pemeriksaan berdasarkan email dan nomor telepon bersifat lemah jika digunakan sendiri dan tidak setara dengan sesi autentikasi yang kuat, terutama untuk data atau tindakan sensitif.

## Checklist sebelum menjadikan konten public

- [ ] Pastikan izin institusi/hak cipta untuk mendokumentasikan sistem, merek, dan screenshot.
- [ ] Pisahkan source private dari dokumentasi public; jangan sertakan ZIP mentah di repo public.
- [ ] Rotasi semua kunci/credential yang pernah ada pada source yang disebarkan di luar ruang privat.
- [ ] Migrasikan secret ke Script Properties atau mekanisme secret management dengan otorisasi kuat.
- [ ] Audit akses layanan, pengelolaan kunci, dan eksposur hasil.
- [ ] Terapkan kontrol anti-abuse (rate limiting, monitoring) sesuai kemampuan platform.
- [ ] Patuhi prinsip least privilege untuk scope OAuth dan identitas eksekusi Web App.
- [ ] Gunakan dataset sintetis untuk screenshot, skema, maupun demo.
- [ ] Pastikan backup, retensi, penghapusan data, serta audit trail sesuai kebijakan institusi.

**Penting:** repo *private* hanya membatasi akses GitHub; tidak mengamankan rahasia yang sudah tertanam di frontend/browser atau sudah pernah bocor. Jangan mengandalkan obfuscation untuk mengunci JavaScript client-side.
