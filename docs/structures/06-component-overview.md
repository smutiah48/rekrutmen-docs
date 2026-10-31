# Gambaran Komponen dan Problem yang Diselesaikan

| Komponen | Problem awal | Solusi tingkat sistem | Catatan batasan |
|---|---|---|---|
| Portal publik | Pelamar membutuhkan pusat informasi yang mudah dinavigasi | Satu shell untuk jalur rekrutmen, panduan, FAQ, pengumuman, dan pelacakan | Data real-time tergantung layanan Apps Script. |
| Modul rekrutmen | Formasi/kriteria berbeda sulit dipahami | Katalog, pencarian, detail, dan formulir kontekstual | Validasi berbeda menurut jalur dan skema server. |
| Registrasi | Resubmit berulang dan data tidak konsisten | Normalisasi, verifikasi server, penanda request, dan kontrol konkurensi | Tetap perlu QA dan observability. |
| Status lamaran | Pelamar harus bertanya secara manual | Identitas pencarian dan ringkasan tahapan yang aman | Perlu pengendalian privasi dan anti-abuse. |
| Publikasi hasil | Hasil seleksi tak boleh diumumkan sebelum disetujui | Gate server-side terpisah dari mode uji | Butuh otorisasi dan prosedur QA resmi. |
| Administrasi | Proses seleksi multiunit memerlukan data terpusat | Backend operasional untuk analisis dan tahapan | Frontend admin tidak termasuk pada sumber yang didokumentasikan. |
| Pengumuman | Dokumen PDF tersebar | Listing dan pratinjau melalui portal | Hanya dokumen yang boleh dipublikasikan. |

Detail teknis satu per satu, termasuk nama fungsi dan referensi line-number, tersimpan di **repository private**.
