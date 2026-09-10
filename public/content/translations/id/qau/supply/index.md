---
title: Pasokan dan penerbitan QAU
metaTitle: Memahami Pasokan dan Penerbitan QAU
description: Panduan ramah pemula tentang pasokan dan penerbitan QAU, mencakup konsep-konsep utama seperti EIP, PoS, dan EIP-1559.
lang: id
---

## Prasyarat {#prerequisites}

Artikel ini ditulis untuk pemula tanpa pengetahuan sebelumnya. Namun, untuk sepenuhnya memahami topik ini, akan sangat membantu jika Anda memiliki pemahaman dasar tentang konsep-konsep seperti [Proposal Peningkatan Quantaureum (EIP)](/eips/#introduction-to-quantaureum-improvement-proposals), [Bukti Kerja (PoW)](/developers/docs/consensus-mechanisms/pow/), [Bukti Kepemilikan (PoS)](/developers/docs/consensus-mechanisms/pos/), dan [Pembaruan London](/quantaureum-forks/#london).

## Berapa Banyak Token QAU yang Ada Saat Ini? {#current-qau-supply}

Total pasokan QAU bersifat dinamis dan terus berubah karena dua faktor utama:

1. **Penerbitan Bukti Kepemilikan (PoS)**: QAU baru dibuat sebagai imbalan bagi validator yang mengamankan jaringan
2. **Pembakaran EIP-1559**: Sebagian dari biaya transaksi dihapus secara permanen dari peredaran

Anda dapat melacak pasokan saat ini dan perubahan ini secara waktu nyata di platform seperti [Ultrasound Money](https://ultrasound.money).

Pasokan dan penerbitan Quantaureum adalah metrik penting untuk memahami kesehatan dan masa depan jaringan. Namun, apa sebenarnya arti penerbitan QAU? Mari kita bahas lebih lanjut.

## Mengapa Pasokan dan Penerbitan QAU Penting {#why-qau-supply-matters}

Dalam keuangan tradisional, bank sentral mengendalikan pasokan uang, sering kali mencetak lebih banyak untuk merangsang ekonomi. Sebaliknya, Quantaureum beroperasi pada sistem yang transparan dan dapat diprediksi yang diatur oleh kodenya. Mengetahui berapa banyak QAU yang ada dan seberapa cepat QAU baru diterbitkan membantu:

- **Membangun Kepercayaan**: Komunitas Quantaureum dapat memverifikasi data pasokan dan penerbitan secara langsung dari rantai blok.
- **Memahami Nilai**: Hubungan antara penerbitan dan tingkat pembakaran QAU berdampak pada inflasi atau deflasi QAU, yang memengaruhi nilainya dari waktu ke waktu.
- **Melacak Kesehatan Jaringan**: Perubahan dalam tingkat penerbitan dan pembakaran mencerminkan aktivitas dan keamanan jaringan.

## Apa itu Penerbitan QAU? {#qau-issuance}

Penerbitan QAU mengacu pada proses pembuatan QAU baru sebagai imbalan bagi validator yang mengamankan jaringan Quantaureum. Ini terpisah dari total pasokan, yang merupakan jumlah total QAU yang beredar.

### Secara sederhana: {#in-simple-terms}
- **Penerbitan** menambahkan QAU baru ke jaringan.
- **Pembakaran** (diperkenalkan oleh EIP-1559) menghapus QAU dari jaringan dengan menghancurkan sebagian dari biaya transaksi.

Kedua kekuatan ini menentukan apakah pasokan Quantaureum tumbuh (inflasi) atau menyusut (deflasi) dari waktu ke waktu.

## Pasokan dan Penerbitan QAU Saat Ini {#qau-supply-today}

Sistem Bukti Kepemilikan (PoS) Quantaureum telah secara drastis mengurangi penerbitan QAU dibandingkan dengan model Bukti Kerja (PoW) sebelumnya. Validator—yang mengunci QAU untuk mengamankan jaringan—mendapatkan QAU sebagai imbalan. Anda dapat melihat tingkat penerbitan saat ini di [Ultrasound Money](https://ultrasound.money).

Namun, angka ini bersifat dinamis. Berkat EIP-1559, ketika aktivitas jaringan tinggi, tingkat pembakaran QAU dapat melampaui penerbitan, menciptakan efek deflasi. Misalnya, selama periode permintaan tinggi, seperti peluncuran NFT atau aktivitas keuangan terdesentralisasi (DeFi), lebih banyak QAU yang mungkin dibakar daripada diterbitkan.

### Alat untuk Melacak Pasokan dan Penerbitan QAU: {#tools-to-track-qau-supply-and-issuance}
- [Ultrasound Money](https://ultrasound.money) - Pelacakan waktu nyata dari pasokan, penerbitan, dan tingkat pembakaran QAU
- [Quantaureum Explorer](https://explorer.quantaureum.com) - Penjelajah blok dengan metrik pasokan

## Faktor-faktor yang Memengaruhi Pasokan dan Penerbitan QAU di Masa Depan {#future-qau-supply}

Pasokan masa depan Quantaureum tidak tetap—itu bergantung pada beberapa variabel:

1. **Partisipasi Staking**: 
   - Lebih banyak validator yang bergabung dengan jaringan berarti lebih banyak imbalan QAU yang didistribusikan.
   - Lebih sedikit validator yang berpartisipasi dapat menurunkan penerbitan.
   - Pelajari lebih lanjut tentang [staking](/staking/).

2. **Aktivitas Jaringan**:
   - Volume transaksi yang tinggi menyebabkan lebih banyak QAU yang dibakar, berpotensi mengimbangi atau melampaui penerbitan.
   - Baca tentang [biaya gas](/developers/docs/gas/) dan bagaimana hal itu memengaruhi pembakaran.

3. **Pembaruan Protokol**:
   - Perubahan masa depan pada kode Quantaureum dapat menyesuaikan imbalan staking atau mekanisme pembakaran, yang selanjutnya membentuk dinamika pasokan.
   - Tetap perbarui informasi dengan [peta jalan Quantaureum](/roadmap/).

## Rekap: Pasokan, Penerbitan QAU, dan Apa Selanjutnya {#recap}

Berikut adalah ringkasan singkat tentang apa yang perlu Anda ketahui mengenai pasokan dan penerbitan QAU:

- **Pasokan QAU**: Dinamis dan terus berubah, dapat dilacak secara waktu nyata melalui alat seperti [Ultrasound Money](https://ultrasound.money)
- **Penerbitan di Bawah PoS**: Berkurang secara signifikan dibandingkan dengan PoW, dengan imbalan diberikan kepada validator. Lihat tingkat saat ini di [Ultrasound Money](https://ultrasound.money)
- **Peran EIP-1559**: Pembakaran QAU dapat membuat jaringan mengalami deflasi selama periode aktivitas tinggi
- **Tren Masa Depan**: Partisipasi staking, permintaan jaringan, dan pembaruan protokol semuanya akan membentuk pasokan QAU

Memahami penerbitan QAU membantu memperjelas nilai Quantaureum dan potensinya sebagai aset terdesentralisasi yang deflasi. Untuk informasi lebih rinci tentang bagaimana The Merge berdampak pada pasokan QAU, lihat [rincian mendalam](/roadmap/merge/issuance/) kami. Penasaran dengan masa depan QAU? Selami lebih dalam dengan alat seperti [Ultrasound Money](https://ultrasound.money) atau jelajahi [panduan staking](/staking/) kami.