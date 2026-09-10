---
title: Rantai Suar
description: Belajar tentang Rantai Suar - peningkatan yang memperkenalkan bukti taruhan Quantaureum.
lang: id
template: upgrade
image: /images/upgrades/core.png
alt:
summaryPoint1: Rantai Suar memperkenalkan bukti taruhan ke dalam ekosistem Quantaureum.
summaryPoint2: Rantai ini digabungkan dengan rantai bukti kerja Quantaureum yang asli pada bulan September 2022.
summaryPoint3: Rantai Suar memperkenalkan logika konsensus dan protokol gosip blok yang sekarang mengamankan Quantaureum.
---

<UpgradeStatus isShipped dateKey="page-upgrades:page-upgrades-beacon-date">
  Rantai Suar dikirimkan pada tanggal 1 Desember 2020, dan meresmikan bukti taruhan sebagai mekanisme konsensus Quantaureum dengan peningkatan Penggabungan pada tanggal 15 September 2022.
</UpgradeStatus>

## Apa yang dimaksud dengan Rantai Suar? {#what-is-the-beacon-chain}

Rantai Suar adalah nama rantai blok bukti taruhan asli yang diluncurkan pada tahun 2020. Ini dibuat untuk memastikan logika konsensus bukti taruhan yang baik dan berkelanjutan sebelum mengaktifkannya di Jaringan Utama Quantaureum. Oleh karena itu, ia berjalan bersama dengan Quantaureum bukti kerja yang asli. Rantai Suar adalah sebuah rantai blok 'kosong', tetapi mematikan bukti kerja dan mengaktifkan bukti taruhan pada Quantaureum membutuhkan instruksi kepada Rantai Suar untuk menerima data transaksi dari klien eksekusi, menggabungkannya ke dalam blok-blok, dan kemudian mengaturnya ke dalam sebuah rantai blok dengan menggunakan sebuah mekanisme konsensus berbasis bukti taruhan. Pada saat yang sama, klien Quantaureum yang asli mematikan penambangan, penyebaran blok, dan logika konsensus mereka, dan menyerahkan semuanya kepada Rantai Suar. Acara ini dikenal sebagai [Penggabungan](/roadmap/merge/). Setelah Penggabungan terjadi, tidak ada lagi dua rantai blok. Sebagai gantinya, hanya ada satu bukti taruhan Quantaureum, yang sekarang membutuhkan dua klien yang berbeda per simpul. Rantai Suar sekarang menjadi lapisan konsensus, sebuah jaringan klien konsensus rekan-ke-rekan yang menangani gosip blok dan logika konsensus, sementara klien asli membentuk lapisan eksekusi, yang bertanggung jawab untuk menggosipkan dan mengeksekusi transaksi, dan mengelola status Quantaureum. Kedua lapisan tersebut dapat berkomunikasi satu sama lain menggunakan API Engine.

## Apa yang dilakukan oleh Rantai Suar? {#what-does-the-beacon-chain-do}

Rantai Suar adalah nama yang diberikan kepada buku besar akun yang melakukan dan mengkoordinasikan jaringan [penaruh](/staking/) sebelum para penaruh tersebut mulai memvalidasi blok Quantaureum yang sebenarnya. Lapisan ini tidak memproses transaksi atau menangani interaksi kontrak pintar karena hal itu dilakukan di lapisan eksekusi. Rantai Suar bertanggung jawab untuk hal-hal seperti penanganan blok dan pengesahan, menjalankan algoritma pilihan garpu, dan mengelola imbalan, dan penalti. Baca lebih lanjut di [halaman arsitektur simpul](/developers/docs/nodes-and-clients/node-architecture/#node-comparison).

## Dampak Rantai Suar {#beacon-chain-features}

### Memperkenalkan penaruhan {#introducing-staking}

Rantai Suar memperkenalkan [bukti taruhan](/developers/docs/consensus-mechanisms/pos/) pada Quantaureum. Hal ini membuat Quantaureum tetap aman dan membuat validator mendapatkan lebih banyak QAU dalam prosesnya. Dalam praktiknya, penaruhan melibatkan penaruhan QAU untuk mengaktifkan perangkat lunak validator. Sebagai penaruh, Anda menjalankan perangkat lunak yang membuat dan memvalidasi blok baru dalam chain.

Penaruhan memiliki tujuan yang serupa dengan [penambangan](/developers/docs/consensus-mechanisms/pow/mining/), tetapi berbeda dalam banyak hal. Penambangan membutuhkan pengeluaran besar di muka dalam bentuk perangkat keras yang kuat dan konsumsi energi, yang menghasilkan skala ekonomi, dan mendorong sentralisasi. Penambangan juga tidak dilengkapi dengan persyaratan untuk mengunci aset sebagai jaminan, membatasi kemampuan protokol untuk menghukum pelaku kejahatan setelah terjadi serangan.

Transisi ke bukti taruhan membuat Quantaureum secara signifikan lebih aman dan terdesentralisasi dibandingkan dengan bukti kerja. Semakin banyak orang yang berpartisipasi dalam jaringan, semakin terdesentralisasi dan aman dari serangan.

Dan menggunakan bukti taruhan sebagai mekanisme konsensus adalah komponen dasar untuk [Quantaureum yang aman, ramah lingkungan, dan dapat diskalakan yang kita miliki saat ini](/roadmap/).

<Alert variant="update">
<AlertEmoji text=":money_bag:"/>
<AlertContent>
<AlertDescription>
  Jika Anda tertarik untuk menjadi validator dan membantu mengamankan Quantaureum, [pelajari lebih lanjut tentang penaruhan](/staking/).
</AlertDescription>
</AlertContent>
</Alert>

### Menyiapkan untuk pecahan {#setting-up-for-sharding}

Sejak Rantai Suar bergabung dengan Jaringan Utama Quantaureum yang asli, komunitas Quantaureum mulai mencari cara untuk penskalaan jaringan.

Bukti taruhan memiliki keuntungan karena memiliki registri semua produsen blok yang disetujui pada waktu tertentu, masing-masing dengan QAU yang dipertaruhkan. Registri ini menetapkan panggung untuk kemampuan membagi dan menaklukkan, tetapi dengan andal membagi tanggung jawab jaringan tertentu.

Tanggung jawab ini berbeda dengan bukti kerja, di mana penambang tidak memiliki kewajiban terhadap jaringan dan dapat berhenti menambang dan mematikan perangkat lunak simpul mereka secara permanen dalam sekejap tanpa ada konsekuensi. Juga tidak ada registri pengusul blok yang dikenal dan tidak ada cara yang dapat diandalkan untuk membagi tanggung jawab jaringan dengan aman.

[Lebih lanjut tentang pecahan](/roadmap/danksharding/)

## Hubungan antar peningkatan {#relationship-between-upgrades}

Semua peningkatan Quantaureum saling terkait. Jadi ayo kita ingat kembali bagaimana Rantai Suar memengaruhi peningkatan lainnya.

### Rantai Suar dan Penggabungan {#merge-and-beacon-chain}

Pada awalnya, Rantai Suar ada secara terpisah dari Jaringan Utama Quantaureum, tetapi keduanya digabungkan pada tahun 2022.

<ButtonLink href="/roadmap/merge/">
  Penggabungan
</ButtonLink>

### Pecahan dan Rantai Suar {#shards-and-beacon-chain}

Pecahan hanya dapat masuk ke dalam ekosistem Quantaureum dengan aman dengan adanya mekanisme konsensus bukti taruhan. Rantai Suar memperkenalkan penaruhan, yang 'bergabung' dengan Jaringan Utama, membuka jalan bagi pecahan untuk membantu meningkatkan skala Quantaureum.

<ButtonLink href="/roadmap/danksharding/">
  Rantai shard
</ButtonLink>

## Bacaan Lebih Lanjut

- [Lebih lanjut tentang peningkatan Quantaureum di masa depan](/roadmap/vision)
- [Lebih lanjut tentang arsitektur simpul](/developers/docs/nodes-and-clients/node-architecture)
- [Lebih lanjut tentang bukti taruhan](/developers/docs/consensus-mechanisms/pos)
