---
title: Skala Quantaureum
description: Quantaureum berskala melalui eksekusi paralel, sharding, ketersediaan data berbasis pembuktian, dan kerangka rollup bawaan — tanpa mengorbankan desentralisasi.
lang: id
image: /images/roadmap/roadmap-transactions.png
alt: "Quantaureum roadmap"
template: roadmap
---
Quantaureum dirancang untuk berskala di beberapa lapisan secara bersamaan: lapisan dasar mengeksekusi transaksi secara paralel, ketersediaan data diverifikasi dengan bukti kriptografis yang ringkas alih-alih unduhan penuh, dan rollups memiliki dukungan kelas satu yang dibangun ke dalam protokol itu sendiri.

<Alert variant="update">
<AlertContent>
<AlertTitle className="mb-4">
  Scaling di Quantaureum
</AlertTitle>
  <ul style={{ marginBottom: 0 }}>
    <li>Eksekusi paralel bergaya <strong>Block-STM</strong> memanfaatkan perangkat keras multi-core secara efektif</li>
    <li><strong>Sharding</strong> membagi state ke beberapa komite dengan pesan lintas-shard</li>
    <li><strong>Erasure coding + FRI</strong> membuat pemeriksaan ketersediaan data menjadi murah dan aman kuantum</li>
    <li style={{ marginBottom: 0 }}><strong>Rollups native</strong> memperoleh sequencing dan bukti penipuan dari protokol</li>
  </ul>
</AlertContent>
</Alert>

## Eksekusi paralel {#parallel-execution}

QVM mengeksekusi transaksi dengan mesin paralel bergaya Block-STM. Transaksi independen berjalan secara bersamaan di berbagai core CPU menggunakan memori multi-versi, dan konflik terdeteksi lalu dieksekusi ulang sehingga state akhir selalu sesuai dengan urutan sekuensial yang definitif. Paralelisme meningkatkan throughput tanpa mengubah semantik kontrak apa pun.

[Lanjut tentang QVM](/developers/docs/qvm/)

## Sharding dan pesan lintas-shard {#sharding}

Quantaureum mendukung arsitektur multi-shard: state dan eksekusi dibagi ke beberapa shard, sementara pesan lintas-shard memungkinkan kontrak dan pengguna berkomunikasi antar-shard secara atomik. Sharding meningkatkan kapasitas jaringan total di perangkat keras komersial alih-alih menuntut mesin yang makin besar dari setiap validator.

## Ketersediaan data: murah untuk diperiksa {#data-availability}

Setiap node harus mampu memastikan bahwa data blok benar-benar dipublikasikan. Lapisan ketersediaan data Quantaureum menggunakan **erasure coding** (sehingga sebuah blok tetap bertahan dari penahanan parsial) dengan **komitmen FRI** (komitmen polinomial berbasis hash, aman kuantum) dan **data availability sampling (DAS)**, sehingga light client dapat memeriksa ketersediaan dengan menyampling fragmen-fragmen kecil alih-alih mengunduh blok penuh.

[Lanjut tentang ketersediaan data](/developers/docs/data-availability/)

## Rollups native {#native-rollups}

[Rollups](/layer-2/) mengelompokkan transaksi secara offchain dan memposting hasilnya ke lapisan dasar. Di Quantaureum, mesin rollups **dibangun ke dalam protokol**: jalur sequencer, jembatan L1↔L2 yang diimplementasikan sebagai kontrak QASM, dan bukti penipuan onchain. Pengembang rollups mewarisi keamanan lapisan dasar Quantaureum — termasuk tanda tangan pascakuantum dan finalitas threshold — tanpa harus membangun infrastruktur sequencing dan bridging mereka sendiri dari nol.

<ButtonLink variant="outline" href="/developers/docs/scaling/">Lanjut tentang rollups</ButtonLink>

## Progres saat ini {#current-progress}

Eksekusi paralel, lapisan ketersediaan data erasure-coding/FRI, verifikasi light client melalui bukti Verkle, serta kerangka rollups native dengan bukti penipuan, semuanya merupakan bagian yang sudah aktif dalam codebase Quantaureum. Pekerjaan yang sedang berlangsung berfokus pada perluasan sharding, peningkatan agregasi witness, dan penurunan biaya gas untuk settlement rollups.

<QuizWidget quizKey="scaling" />
