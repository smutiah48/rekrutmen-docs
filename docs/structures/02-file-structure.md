# Peta Berkas dan Struktur Sumber

> **Status dokumen:** diturunkan melalui analisis statis dari arsip sumber yang diberikan, 31 Oktober 2026. Dokumentasi ini bukan bukti bahwa seluruh integrasi telah diuji secara live atau bahwa implementasi memenuhi seluruh persyaratan keamanan.

## Layout yang dijadikan sumber dokumentasi

```text
frontend/
  Pelamar.html                 # shell publik
  PTT.html                     # modul rekrutmen PTT
backend/
  PelamarBackend.gs            # layanan pelamar
  SeleksiAdministrasi.gs       # hasil seleksi / tracking
  AdminBackend.gs              # layanan admin terpisah
config/
  appsscript.json              # manifest Apps Script
```

**Perhatian:** layout ZIP adalah pengelompokan arsip agar mudah dipelajari; Apps Script editor biasanya menempatkan file `.gs` dan `.html` sebagai file proyek pada satu root. Source aslinya mungkin berasal dari lebih dari satu Apps Script project. Jangan menyatukan backend admin dan pelamar sebelum mengonfirmasi deploy/function collision.

## Ukuran dan kepadatan

| Berkas | Peran | Baris | Fungsi terdeteksi | Ukuran |
|---|---|---:|---:|---:|
| `backend/AdminBackend.gs` | Operasional administrasi dan proses seleksi internal | 51,191 | 1,817 | 2.61 MB |
| `backend/PelamarBackend.gs` | Layanan publik, pendaftaran, status, pengumuman, gateway | 2,907 | 160 | 132 KB |
| `backend/SeleksiAdministrasi.gs` | Publikasi hasil seleksi, QA, tracking lintas tahap | 4,949 | 105 | 96 KB |
| `config/appsscript.json` | Manifest runtime, scope OAuth, dan Web App | 17 | 0 | 0 KB |
| `frontend/PTT.html` | Modul rekrutmen PTT yang dimuat secara lazy | 17,488 | 191 | 891 KB |
| `frontend/Pelamar.html` | Portal utama dan shell publik | 12,826 | 105 | 642 KB |
| **Total** | **6 berkas sumber** | **89,378** | **2,378** | **4.32 MB** |

Untuk penelusuran private gunakan `docs/structures/function-index` dan `docs/structures/line-by-line`. Tidak ada source code asli yang digandakan di file dokumentasi.
