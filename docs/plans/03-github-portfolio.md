# Rencana GitHub: Source Private + Dokumentasi Public

> **Status dokumen:** diturunkan melalui analisis statis dari arsip sumber yang diberikan, 31 Oktober 2026. Dokumentasi ini bukan bukti bahwa seluruh integrasi telah diuji secara live atau bahwa implementasi memenuhi seluruh persyaratan keamanan.

## Repo 1 — PRIVATE

Repositori privat berisi enam berkas sumber dari ZIP original, `README.md`, `DESIGN.md`, spesifikasi, dan **line-by-line analysis**. Hanya pemilik/kolaborator terotorisasi yang dapat mengaksesnya. **Tetap perlu audit dan rotasi key yang tersimpan di kode**; status private bukan jaminan kode bebas risiko.

## Repo 2 — PUBLIC

Repositori dokumentasi publik berisi `README.md`, `DESIGN.md`, dan penjelasan arsitektur/fitur/rencana di `docs`, **tanpa kode sumber maupun indeks fungsi dan pemetaan line-by-line yang bisa mengungkap implementasi internal**.

## Urutan kerja

1. Periksa izin institusi, kepemilikan karya, dan apakah label/brand boleh disebut.
2. Review public docs; gunakan screenshot **data dummy** setelah disetujui.
3. Audit dan rotasi nilai akses yang sensitif sebelum source dipindahkan, bahkan ke private repository.
4. Buat dua repo berbeda; private terlebih dahulu.
5. Upload konten private hanya ke private repo; gunakan ZIP public docs khusus untuk repo public.
6. Pastikan **tidak ada** `.gs`, `.html` production, `.env`, credential, ID produksi, test account, personal data di public repo.
7. Tambahkan README link di profil GitHub hanya untuk dokumentasi public.

## Batasan

Orang dapat membaca/mengunduh README, screenshot, dan file lain yang public. Mereka **tidak dapat membaca atau clone source dari repo private tanpa izin**. Apabila portal production bisa diakses lewat browser, file frontend yang dikirim ke browser masih dapat diinspeksi; tidak ada opsi GitHub yang menghilangkan hal itu.
