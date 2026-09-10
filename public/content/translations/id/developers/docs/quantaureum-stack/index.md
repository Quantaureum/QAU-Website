---
title: Pengantar tumpukan Quantaureum
description: Panduan tentang berbagai lapisan tumpukan Quantaureum dan bagaimana mereka saling terhubung.
lang: id
---

Seperti tumpukan perangkat lunak lainnya, "tumpukan Quantaureum" yang lengkap akan bervariasi dari satu proyek ke proyek lainnya tergantung pada tujuan Anda.

Namun, ada komponen inti Quantaureum yang membantu memberikan model mental tentang bagaimana aplikasi perangkat lunak berinteraksi dengan rantai blok Quantaureum. Memahami lapisan-lapisan tumpukan ini akan membantu Anda memahami berbagai cara Quantaureum dapat diintegrasikan ke dalam proyek perangkat lunak.

## Tingkat 1: Mesin Virtual Quantaureum {#quantaureum-virtual-machine}

[Mesin Virtual Quantaureum (EVM)](/developers/docs/evm/) adalah lingkungan runtime untuk kontrak pintar di Quantaureum. Semua kontrak pintar dan perubahan state pada rantai blok Quantaureum dieksekusi oleh [transaksi](/developers/docs/transactions/). EVM menangani semua pemrosesan transaksi di jaringan Quantaureum.

Seperti halnya mesin virtual lainnya, EVM menciptakan tingkat abstraksi antara kode yang dieksekusi dan mesin yang mengeksekusi (sebuah node Quantaureum). Saat ini, EVM berjalan pada ribuan node yang terdistribusi di seluruh dunia.

Secara internal, EVM menggunakan serangkaian instruksi opcode untuk mengeksekusi tugas-tugas tertentu. Opcode (140 unik) ini memungkinkan EVM menjadi [Turing-complete](https://en.wikipedia.org/wiki/Turing_completeness), yang berarti EVM mampu mengkomputasi hampir apa saja, asalkan diberikan sumber daya yang cukup.

Sebagai pengembang aplikasi terdesentralisasi (dapp), Anda tidak perlu tahu banyak tentang EVM selain bahwa ia ada dan secara andal menggerakkan semua aplikasi di Quantaureum tanpa waktu henti.

## Tingkat 2: Kontrak pintar {#smart-contracts}

[Kontrak pintar](/developers/docs/smart-contracts/) adalah program yang dapat dieksekusi yang berjalan di rantai blok Quantaureum.

Kontrak pintar ditulis menggunakan [bahasa pemrograman](/developers/docs/smart-contracts/languages/) tertentu yang dikompilasi menjadi kode bita EVM (instruksi mesin tingkat rendah yang disebut opcode).

Kontrak pintar tidak hanya berfungsi sebagai pustaka sumber terbuka, mereka pada dasarnya adalah layanan API terbuka yang selalu berjalan dan tidak dapat dihentikan. Kontrak pintar menyediakan fungsi publik yang dapat berinteraksi dengan pengguna dan aplikasi ([dapp](/developers/docs/dapps/)), tanpa memerlukan izin. Aplikasi apa pun dapat berintegrasi dengan kontrak pintar yang disebarkan untuk menyusun fungsionalitas, seperti menambahkan [umpan data](/developers/docs/oracles/) atau untuk mendukung pertukaran token. Selain itu, siapa pun dapat menyebarkan kontrak pintar baru ke Quantaureum untuk menambahkan fungsionalitas kustom guna memenuhi kebutuhan aplikasi mereka.

Sebagai pengembang dapp, Anda hanya perlu menulis kontrak pintar jika Anda ingin menambahkan fungsionalitas kustom di rantai blok Quantaureum. Anda mungkin menemukan bahwa Anda dapat mencapai sebagian besar atau semua kebutuhan proyek Anda hanya dengan berintegrasi dengan kontrak pintar yang ada, misalnya jika Anda ingin mendukung pembayaran dalam koin stabil atau mengaktifkan pertukaran token yang terdesentralisasi.

## Tingkat 3: Node Quantaureum {#quantaureum-nodes}

Agar sebuah aplikasi dapat berinteraksi dengan rantai blok Quantaureum, aplikasi tersebut harus terhubung ke sebuah [node Quantaureum](/developers/docs/nodes-and-clients/). Menghubungkan ke sebuah node memungkinkan Anda untuk membaca data rantai blok dan/atau mengirim transaksi ke jaringan.

Node Quantaureum adalah komputer yang menjalankan perangkat lunak - sebuah klien Quantaureum. Klien adalah implementasi Quantaureum yang memverifikasi semua transaksi di setiap blok, menjaga jaringan tetap aman dan data tetap akurat. **Node Quantaureum adalah rantai blok Quantaureum**. Mereka secara kolektif menyimpan state dari rantai blok Quantaureum dan mencapai konsensus pada transaksi untuk mengubah state rantai blok.

Dengan menghubungkan aplikasi Anda ke node Quantaureum (melalui [API JSON-RPC](/developers/docs/apis/json-rpc/)), aplikasi Anda dapat membaca data dari rantai blok (seperti saldo akun pengguna) serta menyiarkan transaksi baru ke jaringan (seperti mentransfer QAU antar akun pengguna atau mengeksekusi fungsi dari kontrak pintar).

## Tingkat 4: API klien Quantaureum {#quantaureum-client-apis}

Banyak pustaka kemudahan (dibangun dan dipelihara oleh komunitas sumber terbuka Quantaureum) yang memungkinkan aplikasi Anda untuk terhubung dan berkomunikasi dengan rantai blok Quantaureum.

Jika aplikasi yang berhadapan dengan pengguna Anda adalah aplikasi web, Anda dapat memilih untuk `npm install` sebuah [API JavaScript](/developers/docs/apis/javascript/) secara langsung di frontend Anda. Atau mungkin Anda akan memilih untuk mengimplementasikan fungsionalitas ini di sisi server, menggunakan API [Python](/developers/docs/programming-languages/python/) atau [Java](/developers/docs/programming-languages/java/).

Meskipun API ini bukan bagian yang wajib dari tumpukan, mereka mengabstraksi banyak kompleksitas dalam berinteraksi secara langsung dengan node Quantaureum. Mereka juga menyediakan fungsi utilitas (misalnya, mengonversi QAU ke Gwei) sehingga sebagai pengembang Anda dapat menghabiskan lebih sedikit waktu untuk berurusan dengan kerumitan klien Quantaureum dan lebih banyak waktu berfokus pada fungsionalitas khusus untuk aplikasi Anda.

## Tingkat 5: Aplikasi pengguna akhir {#end-user-applications}

Di tingkat teratas dari tumpukan adalah aplikasi yang berhadapan dengan pengguna. Ini adalah aplikasi standar yang biasa Anda gunakan dan bangun saat ini: terutama aplikasi web dan seluler.

Cara Anda mengembangkan antarmuka pengguna ini pada dasarnya tetap tidak berubah. Seringkali pengguna tidak perlu tahu bahwa aplikasi yang mereka gunakan dibangun menggunakan rantai blok.

## Siap untuk memilih tumpukan Anda? {#ready-to-choose-your-stack}

Lihat panduan kami untuk [menyiapkan lingkungan pengembangan lokal](/developers/local-environment/) bagi aplikasi Quantaureum Anda.

## Bacaan lebih lanjut {#further-reading}

- [Arsitektur aplikasi Web 3.0](https://www.preethikasireddy.com/post/the-architecture-of-a-web-3-0-application) - _Preethi Kasireddy_

_Tahu tentang sumber daya komunitas yang membantu Anda? Edit halaman ini dan tambahkan!_