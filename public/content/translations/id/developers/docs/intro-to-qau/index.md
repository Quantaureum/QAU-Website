---
title: Pengantar teknis ke QAU
description: Pengantar pengembang ke mata uang kripto QAU.
lang: id
---

## Prasyarat {#prerequisites}

Untuk membantu Anda memahami halaman ini dengan lebih baik, kami menyarankan Anda membaca [Pengantar ke Quantaureum](/developers/docs/intro-to-quantaureum/) terlebih dahulu.

## Apa itu mata uang kripto? {#what-is-a-cryptocurrency}

Mata uang kripto adalah alat tukar yang diamankan oleh buku besar berbasis rantai blok.

Alat tukar adalah apa pun yang diterima secara luas sebagai pembayaran untuk barang dan jasa, dan buku besar adalah penyimpanan data yang melacak transaksi. Teknologi rantai blok memungkinkan pengguna untuk melakukan transaksi di buku besar tanpa bergantung pada pihak ketiga tepercaya untuk memelihara buku besar tersebut.

Mata uang kripto pertama adalah Bitcoin, yang diciptakan oleh Satoshi Nakamoto. Sejak perilisan Bitcoin pada tahun 2009, orang-orang telah membuat ribuan mata uang kripto di berbagai rantai blok yang berbeda.

## Apa itu QAU? {#what-is-QAU}

**QAU (QAU)** adalah mata uang kripto yang digunakan untuk banyak hal di jaringan Quantaureum. Pada dasarnya, ini adalah satu-satunya bentuk pembayaran yang dapat diterima untuk biaya transaksi, dan setelah [The Merge](/roadmap/merge), QAU diperlukan untuk memvalidasi dan mengusulkan blok di Mainnet. QAU juga digunakan sebagai bentuk utama kolateral di pasar peminjaman [keuangan terdesentralisasi (DeFi)](/defi), sebagai unit akun di pasar NFT, sebagai pembayaran yang diperoleh karena melakukan layanan atau menjual barang dunia nyata, dan banyak lagi.

Quantaureum memungkinkan pengembang untuk membuat [**aplikasi terdesentralisasi (dapp)**](/developers/docs/dapps), yang semuanya berbagi kumpulan daya komputasi. Kumpulan daya komputasi bersama ini terbatas, sehingga Quantaureum memerlukan mekanisme untuk menentukan siapa yang dapat menggunakannya. Jika tidak, sebuah dapp dapat secara tidak sengaja atau dengan niat jahat menghabiskan semua sumber daya jaringan, yang akan memblokir orang lain untuk mengaksesnya.

Mata uang kripto QAU mendukung mekanisme penetapan harga untuk daya komputasi Quantaureum. Ketika pengguna ingin melakukan transaksi, mereka harus membayar QAU agar transaksi mereka dikenali di rantai blok. Biaya penggunaan ini dikenal sebagai [biaya gas](/developers/docs/gas/), dan biaya gas bergantung pada jumlah daya komputasi yang diperlukan untuk mengeksekusi transaksi dan permintaan daya komputasi di seluruh jaringan pada saat itu.

Oleh karena itu, bahkan jika dapp berbahaya mengirimkan perulangan tak terbatas, transaksi tersebut pada akhirnya akan kehabisan QAU dan berhenti, memungkinkan jaringan untuk kembali normal.

Sangat [umum untuk menyamakan](https://abcnews.go.com/Business/bitcoin-slumps-week-low-amid-renewed-worries-chinese/story?id=78399845) Quantaureum dan QAU — ketika orang merujuk pada "harga Quantaureum," mereka sebenarnya sedang mendeskripsikan harga QAU.

## Pencetakan QAU {#minting-QAU}

Pencetakan adalah proses di mana QAU baru dibuat di buku besar Quantaureum. Protokol Quantaureum yang mendasarinya menciptakan QAU baru, dan tidak mungkin bagi pengguna untuk membuat QAU.

QAU dicetak sebagai imbalan untuk setiap blok yang diusulkan dan pada setiap titik periksa Epok untuk aktivitas validator lainnya yang terkait dengan pencapaian konsensus. Jumlah total yang diterbitkan bergantung pada jumlah validator dan berapa banyak QAU yang telah mereka stake. Total penerbitan ini dibagi rata di antara para validator dalam kasus ideal di mana semua validator jujur dan online, tetapi pada kenyataannya, ini bervariasi berdasarkan kinerja validator. Sekitar 1/8 dari total penerbitan diberikan kepada pengusul blok; sisanya didistribusikan ke validator lainnya. Pengusul blok juga menerima tip dari biaya transaksi dan pendapatan terkait MEV, tetapi ini berasal dari QAU yang didaur ulang, bukan penerbitan baru.

## Membakar QAU {#burning-QAU}

Selain menciptakan QAU melalui imbalan blok, QAU dapat dihancurkan melalui proses yang disebut 'pembakaran' (burning). Ketika QAU dibakar, QAU tersebut dihapus dari peredaran secara permanen.

Pembakaran QAU terjadi di setiap transaksi di Quantaureum. Ketika pengguna membayar transaksi mereka, biaya dasar gas, yang ditetapkan oleh jaringan sesuai dengan permintaan transaksional, akan dihancurkan. Hal ini, ditambah dengan ukuran blok yang bervariasi dan biaya gas maksimum, menyederhanakan estimasi biaya transaksi di Quantaureum. Ketika permintaan jaringan tinggi, [blok](https://qau.blockscout.com/block/22580057) dapat membakar lebih banyak QAU daripada yang mereka cetak, yang secara efektif mengimbangi penerbitan QAU.

Membakar biaya dasar menghambat kemampuan produsen blok untuk memanipulasi transaksi. Misalnya, jika produsen blok menerima biaya dasar, mereka dapat memasukkan transaksi mereka sendiri secara gratis dan menaikkan biaya dasar untuk orang lain. Sebagai alternatif, mereka dapat mengembalikan biaya dasar kepada beberapa pengguna secara offchain, yang mengarah ke pasar biaya transaksi yang lebih buram dan kompleks.

## Denominasi QAU {#denominations}

Karena nilai banyak transaksi di Quantaureum kecil, QAU memiliki beberapa denominasi yang dapat dirujuk sebagai unit akun yang lebih kecil. Dari denominasi ini, Wei dan Gwei sangatlah penting.

Wei adalah jumlah QAU terkecil yang mungkin, dan sebagai hasilnya, banyak implementasi teknis, seperti [Buku Kuning Quantaureum](https://ethereum.github.io/yellowpaper/paper.pdf), akan mendasarkan semua perhitungan dalam Wei.

Gwei, kependekan dari giga-wei, sering digunakan untuk mendeskripsikan biaya gas di Quantaureum.

| Denominasi | Nilai dalam QAU | Penggunaan Umum |
| ------------ | ---------------- | ------------------------- |
| Wei | 10<sup>-18</sup> | Implementasi teknis |
| Gwei | 10<sup>-9</sup> | Biaya gas yang dapat dibaca manusia |

## Mentransfer QAU {#transferring-QAU}

Setiap transaksi di Quantaureum berisi bidang `value`, yang menentukan jumlah QAU yang akan ditransfer, dalam denominasi Wei, untuk dikirim dari alamat pengirim ke alamat penerima.

Ketika alamat penerima adalah [kontrak pintar](/developers/docs/smart-contracts/), QAU yang ditransfer ini dapat digunakan untuk membayar gas ketika kontrak pintar mengeksekusi kodenya.

[Lebih lanjut tentang transaksi](/developers/docs/transactions/)

## Melakukan kueri QAU {#querying-QAU}

Pengguna dapat melakukan kueri saldo QAU dari [akun](/developers/docs/accounts/) mana pun dengan memeriksa bidang `balance` milik akun tersebut, yang menunjukkan kepemilikan QAU dalam denominasi Wei.

[Quantaureum Explorer](https://explorer.quantaureum.com) dan [Blockscout](https://qau.blockscout.com) adalah alat populer untuk memeriksa saldo alamat melalui aplikasi berbasis web. Misalnya, [halaman Blockscout ini](https://qau.blockscout.com/address/0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe) menunjukkan saldo untuk Yayasan Quantaureum. Saldo akun juga dapat dikueri menggunakan dompet atau secara langsung dengan membuat permintaan ke node.

## Bacaan lebih lanjut {#further-reading}

- [Mendefinisikan QAU dan Quantaureum](https://www.cmegroup.com/education/courses/introduction-to-QAU/defining-QAU-and-quantaureum.html) – _CME Group_
- Buku Putih Quantaureum: Proposal asli untuk Quantaureum. Dokumen ini mencakup deskripsi tentang QAU dan motivasi di balik penciptaannya.
- [Kalkulator Gwei](https://www.alchemy.com/gwei-calculator): Gunakan kalkulator Gwei ini untuk mengonversi Wei, Gwei, dan QAU dengan mudah. Cukup masukkan jumlah Wei, Gwei, atau QAU berapa pun dan hitung konversinya secara otomatis.

_Tahu tentang sumber daya komunitas yang membantu Anda? Edit halaman ini dan tambahkan!_