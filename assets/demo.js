'use strict';

const demoGroups = [
  ['Pendaftaran dan formasi', [
    ['01-beranda-pendaftaran-dibuka.jpg', 'Beranda saat pendaftaran dibuka', 'Halaman awal memperkenalkan jalur rekrutmen yang tersedia dan menyediakan akses menuju informasi formasi. Tampilan ini merekam kondisi ketika periode pendaftaran masih berlangsung.'],
    ['02-pilih-jenis-jabatan.jpg', 'Memilih jenis jabatan', 'Pelamar dapat memilih kelompok jabatan untuk melihat informasi dan formasi yang sesuai. Penanda periode pada halaman membantu menjelaskan apakah pendaftaran sedang dibuka.'],
    ['03-formulir-fungsional-pelaksana.png', 'Formulir fungsional pelaksana', 'Contoh formulir menampilkan pilihan bidang pekerjaan dan informasi yang perlu disiapkan pelamar. Isian dan persyaratan dapat berbeda sesuai jalur dan formasi yang dipilih.'],
    ['04-formasi-laboran.png', 'Mencari formasi laboran', 'Katalog laboran menyediakan pencarian dan filter untuk membantu pelamar menelusuri pilihan yang tersedia. Setiap kartu menampilkan ringkasan formasi dan akses ke detailnya.'],
    ['05-formasi-tenaga-kesehatan.png', 'Mencari formasi tenaga kesehatan', 'Katalog tenaga kesehatan menampilkan formasi beserta ringkasan kualifikasi. Pelamar dapat meninjau rincian sebelum melanjutkan sesuai ketentuan yang berlaku.'],
    ['06-bukti-pendaftaran.png', 'Konfirmasi pendaftaran terkirim', 'Setelah pengiriman berhasil, portal menampilkan konfirmasi dan nomor lamaran yang dapat disimpan pelamar. Informasi pribadi pada contoh gambar telah disamarkan.'],
    ['07-syarat-ketentuan-pendaftaran.jpg', 'Syarat dan ketentuan pendaftaran', 'Dialog menyajikan pernyataan dan ketentuan yang perlu dibaca sebelum pelamar melanjutkan. Kotak persetujuan digunakan untuk menyatakan bahwa ketentuan telah dipahami.']
  ]],
  ['Informasi dan panduan', [
    ['08-pengumuman-publik.png', 'Daftar pengumuman', 'Menu pengumuman menampilkan daftar dokumen resmi yang tersedia untuk dibaca. Pelamar dapat memilih dokumen untuk melihat informasi selengkapnya.'],
    ['09-panduan-pelamar.png', 'Panduan menggunakan portal', 'Halaman panduan merangkum langkah memilih program, membaca persyaratan, mengisi pendaftaran, dan melacak perkembangan lamaran. Informasi khusus PTT ditampilkan pada bagian panduan terkait.'],
    ['10-pertanyaan-umum.png', 'Pertanyaan yang sering diajukan', 'Bagian FAQ menyajikan jawaban ringkas tentang penggunaan portal, jalur rekrutmen, pengumuman, dan pelacakan status. Setiap pertanyaan dapat dibuka untuk membaca penjelasannya.']
  ]],
  ['Pelacakan dan tahapan seleksi', [
    ['11-lacak-setelah-pendaftaran.png', 'Lacak status setelah mendaftar', 'Contoh halaman Lacak menampilkan ringkasan lamaran setelah identitas pendaftaran diperiksa. Gambar memperlihatkan keadaan ketika lamaran masih dalam proses seleksi.'],
    ['12-informasi-seleksi-administrasi.jpg', 'Informasi seleksi administrasi', 'Popup memberi informasi umum bahwa proses seleksi administrasi sedang diselesaikan. Pelamar diarahkan untuk memantau pengumuman melalui kanal yang disediakan.'],
    ['13-status-seleksi-administrasi.png', 'Hasil seleksi administrasi', 'Contoh tampilan membandingkan pesan untuk hasil seleksi administrasi yang berbeda. Status perorangan hanya ditampilkan melalui alur pelacakan yang berlaku.'],
    ['14-informasi-tes-intelegensia.jpg', 'Informasi tes intelegensia', 'Popup menyampaikan perkembangan proses pada tahap tes intelegensia dan mengarahkan pelamar ke menu Lacak. Pesan ini merupakan contoh tampilan pada periode yang didokumentasikan.'],
    ['15-status-tes-intelegensia.png', 'Hasil tes intelegensia', 'Contoh hasil tahap intelegensia menampilkan status dan informasi tahap berikutnya bagi pelamar yang berhak. Rincian pada layar bergantung pada hasil yang diizinkan untuk dipublikasikan.'],
    ['16-informasi-tes-inventory.jpg', 'Informasi tes inventory kepribadian', 'Popup menjelaskan bahwa informasi tahap inventory dapat diperiksa melalui menu Lacak. Tampilan juga memberi arahan umum mengenai tahap berikutnya sesuai pengumuman.'],
    ['17-status-tes-inventory.png', 'Hasil tes inventory kepribadian', 'Contoh status tahap inventory menunjukkan hasil dan petunjuk wawancara bagi pelamar yang berhak. Jadwal dan tindak lanjut pada gambar merupakan dokumentasi periode sebelumnya.']
  ]],
  ['Hasil akhir dan riwayat', [
    ['18-informasi-tahap-akhir.jpg', 'Pengumuman tahap akhir', 'Popup menyampaikan bahwa informasi hasil akhir telah diumumkan melalui kanal yang disediakan. Tombol pada tampilan mengarahkan pelamar untuk memeriksa hasil atau menutup pemberitahuan.'],
    ['19-status-hasil-akhir.png', 'Hasil akhir melalui Lacak', 'Contoh tampilan hasil akhir memperlihatkan informasi lanjutan bagi pelamar yang dinyatakan diterima. Identitas pada gambar disamarkan, dan rincian yang terlihat merupakan dokumentasi historis.'],
    ['20-riwayat-tahapan-seleksi.jpg', 'Riwayat tahapan seleksi', 'Ringkasan riwayat membantu pelamar memahami perkembangan lamaran di beberapa tahapan. Status yang ditampilkan pada gambar adalah contoh tampilan, bukan informasi seleksi terbaru.']
  ]],
  ['Saat pendaftaran ditutup', [
    ['21-beranda-pendaftaran-ditutup.png', 'Beranda setelah pendaftaran ditutup', 'Beranda tetap menyediakan akses informasi ketika periode pendaftaran telah berakhir. Penanda status membantu membedakan informasi arsip dari pendaftaran yang sedang dibuka.'],
    ['22-formasi-pendaftaran-ditutup.png', 'Informasi formasi saat ditutup', 'Pilihan jenis jabatan dan informasi formasi tetap dapat dilihat setelah penutupan. Penanda pada halaman menjelaskan bahwa periode pendaftaran telah berakhir.'],
    ['23-pemberitahuan-pendaftaran-ditutup.png', 'Pemberitahuan pendaftaran ditutup', 'Dialog memberi tahu pelamar bahwa pendaftaran baru tidak dapat dikirim setelah periode berakhir. Informasi formasi dan fitur Lacak tetap ditampilkan sesuai kondisi pada gambar.']
  ]]
];

function renderDemo(article) {
  const title = document.createElement('h2'); title.textContent = 'Demo alur rekrutmen';
  const intro = document.createElement('p'); intro.className = 'demo-intro';
  intro.textContent = 'Jelajahi tampilan portal dari pemilihan formasi hingga pelacakan hasil. Gambar merekam periode sebelumnya; identitas pada contoh status telah disamarkan dan informasi yang terlihat bukan pengumuman terkini.';
  article.append(title, intro);
  let number = 0;
  for (const [group, items] of demoGroups) {
    const heading = document.createElement('h3'); heading.textContent = group; article.append(heading);
    for (const [file, name, description] of items) {
      const figure = document.createElement('figure'); figure.className = 'demo-card';
      const caption = document.createElement('figcaption');
      const label = document.createElement('span'); label.className = 'demo-number'; label.textContent = `LAYAR ${String(++number).padStart(2, '0')}`;
      const cardTitle = document.createElement('h4'); cardTitle.textContent = name;
      const text = document.createElement('p'); text.textContent = description;
      caption.append(label, cardTitle, text);
      const link = document.createElement('a'); link.className = 'demo-image-link';
      link.href = new URL(`assets/images/${file}`, document.baseURI).href;
      link.target = '_blank'; link.rel = 'noopener noreferrer'; link.setAttribute('aria-label', `Buka gambar ukuran penuh: ${name} (tab baru)`);
      const image = document.createElement('img'); image.src = link.href; image.alt = `Tampilan portal: ${name}`;
      image.loading = 'lazy'; image.decoding = 'async';
      const hint = document.createElement('span'); hint.textContent = 'Buka gambar ukuran penuh ↗'; link.append(image, hint);
      figure.append(caption, link); article.append(figure);
    }
  }
}
