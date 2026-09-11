---
title: "Keamanan pasca-kuantum sejak rancangan"
description: "Quantaureum dibangun dari awal dengan kriptografi pasca-kuantum — tanda tangan Dilithium3 dan pertukaran kunci Kyber768 — sehingga tidak ada migrasi yang perlu dilakukan."
lang: id
image: /images/roadmap/roadmap-future.png
alt: "Quantaureum roadmap"
template: roadmap
summaryPoints:
  - Komputer kuantum pada akhirnya akan memecahkan kriptografi kurva eliptik yang digunakan oleh sebagian besar blockchain yang ada
  - "Quantaureum bersifat pasca-kuantum sejak genesis: tanda tangan Dilithium3 dan pertukaran kunci Kyber768 di setiap bagian"
  - "Tidak diperlukan migrasi kunci di masa depan — kunci dan alamat Anda sudah aman secara kuantum"
---
Sebagian besar blockchain yang beroperasi saat ini mengandalkan kriptografi kurva eliptik (ECDSA, Ed25519, BLS), yang dapat dihancurkan oleh komputer kuantum yang cukup mampu menjalankan [Algoritma Shor](https://en.wikipedia.org/wiki/Shor%27s_algorithm). Membangun kriptografi baru di jaringan yang sudah aktif merupakan migrasi yang lambat dan berisiko tinggi, karena harus melibatkan seluruh dompet, bursa, dan kontrak.

**Quantaureum menghindari masalah tersebut dengan memulai dari post-quantum.** Rantai ini dirancang dari nol围绕 kriptografi yang tetap aman terhadap ancaman klasik maupun kuantum.

## Tumpukan post-quantum {#post-quantum-stack}

Quantaureum menggunakan primitif post-quantum standar NIST di seluruh protokol:

- **Dilithium3 (FIPS 204)** — tanda tangan digital untuk transaksi dan atestasi validator. Setiap kunci akun dan setiap tanda tangan di rantai adalah Dilithium3.
- **Kyber768 / ML-KEM (FIPS 203)** — enkapsulasi kunci post-quantum untuk kanal aman antar-node dan untuk koneksi terenkripsi yang telah mapan.
- **Kekacakan kuantum** — generator angka acak kuantum (QRNG) memberikan asupan untuk ritual seperti pemilihan validator dan upacara kunci, menghindari sumber entropi yang lemah.
- **Tanda tangan ambang GM-QTD** — komite validator menghasilkan tanda tangan ambang untuk finalitas blok, termasuk pembuatan kunci terdistribusi.

## Mengapa "post-quantum sejak awal desain" penting {#why-by-design-matters}

Rantai yang diluncurkan sebelum standar post-quantum ada menghadapi migrasi berdurasi multi-tahun: format alamat baru, perangkat lunak dompet baru, dan skema tanda tangan baru untuk konsensus, semuanya sambil menjaga jaringan tetap aktif. Di Quantaureum:

- **Akun sudah aman secara kuantum.** Tidak ada asumsi tersembunyi bahwa kunci ECDSA tetap aman hingga pembaruan di masa depan.
- **Konsensus sudah aman secara kuantum.** Tanda tangan [Validator](/glossary/#validator) menggunakan threshold Dilithium3, bukan skema berbasis pairing yang dapat dipalsukan oleh komputer kuantum.
- **Ketersediaan data sudah aman secara kuantum.** Lapisan DA menggunakan koding erasure dengan komitmen berbasis hash (FRI), bukan komitmen polinomial berbasis pairing.

## Model ancaman {#threat-model}

Komputer kuantum yang mampu memecahkan kriptografi kurva eliptik 256-bit belum ada saat ini. Namun, pihak penyerang dapat merekam sandi teks sekarang dan membuka aksesnya nanti ("panen sekarang, buka sandi nanti"), dan sistem apa pun yang dirancang untuk mengamankan nilai selama beberapa dekade harus mengasumsikan ancaman datang pada skenario terburuk.

Menggunakan primitif post-quantum sejak hari pertama menghilangkan asumsi terlemah, dengan biaya tanda tangan dan kunci publik yang lebih besar. Parameter protokol Quantaureum — termasuk [slot 12 detik](/developers/docs/consensus-mechanisms/pos/) dan [finalitas](/glossary/#finality) ambang — dipilih dengan mempertimbangkan beban kriptografis yang lebih besar tersebut.

## Kemajuan terkini {#current-progress}

Tumpukan post-quantum lengkap — Dilithium3, Kyber768, GM-QTD, ketersediaan data berbasis FRI — saat ini sudah aktif di jaringan Quantaureum.
