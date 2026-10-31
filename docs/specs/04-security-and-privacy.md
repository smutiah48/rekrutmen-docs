# Spesifikasi Keamanan dan Privasi

> **Status dokumen:** diturunkan melalui analisis statis dari arsip sumber yang diberikan, 31 Oktober 2026. Dokumentasi ini bukan bukti bahwa seluruh integrasi telah diuji secara live atau bahwa implementasi memenuhi seluruh persyaratan keamanan.

## Observasi source dan risiko yang harus ditangani

| Area | Observasi dari arsip | Risiko jika disebarkan tanpa sanitasi |
|---|---|---|
| Konfigurasi internal | Ada nilai akses dan identifier hardcoded pada beberapa berkas `.gs`. | Paparan konfigurasi/secret dan kemudahan enumerasi resource. |
| Web app anonim | Akses publik memerlukan pemeriksaan otorisasi dan pembatasan data. | Endpoint publik memiliki hak eksekusi pemilik deploy, bergantung pada validasi server. |
| API key | Beberapa jalur memakai key berbasis nilai konfigurasi/header/parameter. | Key di klien atau fallback code tidak layak menjadi autentikasi tunggal. |
| Tracking | Penelusuran berdasarkan pasangan email + nomor telepon. | Risiko enumerasi dan kebocoran informasi bila tanpa pembatasan percobaan. |
| Google Sheets | Menyimpan identitas pelamar dan hasil proses seleksi. | Pelanggaran privasi bila akses, dump, atau audit log terbuka. |
| Files/PDF | Akses Drive dan PDF pengumuman via token/link. | Kebocoran dokumen internal jika filter publikasi salah. |
| Admin | Kode backend admin besar dan terus bertambah patch-nya. | Permukaan serangan lebih luas serta risiko otorisasi yang tidak konsisten. |

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
