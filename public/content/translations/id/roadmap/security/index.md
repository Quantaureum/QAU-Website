---
title: Quantaureum yang lebih aman
description: Keamanan Quantaureum berasal dari kriptografi pasca-kuantum secara desain, finalitas tanda tangan ambang, dan himpunan validator yang tangguh secara bawaan.
lang: id
image: /images/roadmap/roadmap-security.png
alt: "Quantaureum roadmap"
template: roadmap
summaryPoints:
  - Kriptografi pasca-kuantum (Dilithium3, Kyber768) sudah aktif, bukan migrasi di masa depan
  - Blok mencapai finalitas melalui tanda tangan ambang GM-QTD dari komite validator
  - Protokol ini mengutamakan konsensus yang sederhana dan dapat diaudit dibandingkan peningkatan yang dirilis secara bertahap
---
Quantaureum dibangun sebagai platform [kontrak cerdas](/glossary/#smart-contract) yang aman secara kuantum. Pekerjaan keamanan dilakukan di dalam protokol — skema tanda tangan, gawai finalitas, dan ketangguhan validator — bukan melalui antrean panjang upgrade dengan tenggat fork.

<ExpandableCard title="Apakah Quantaureum aman saat ini?" eventCategory="/roadmap/security" eventName="clicked is quantaureum secure today?">

Ya. Semua akun dan tanda tangan validator menggunakan Dilithium3, skema tanda tangan pasca-kuantum yang distandardisasi NIST, dan blok difinalisasi dengan tanda tangan ambang dari komite validator. Tidak ada migrasi kriptografis yang tertunda yang bisa membuat pengguna terlantar di kemudian hari.

</ExpandableCard>

## Finalitas ambang {#threshold-finality}

Keamanan pengguna bergantung pada [finalitas](/glossary/#finality): saat transaksi menjadi permanen. Di Quantaureum, blok difinalisasi oleh komite validator melalui **GM-QTD** — pembuatan kunci terdistribusi加上 tanda tangan ambang. Karena finalitas merupakan tanda tangan komite yang disintesis dalam protokol, kuorum validator yang jujur sudah cukup untuk memfinalisasi rantai, dan protokol toleran terhadap fraksi terbatas validator yang gagal atau bermusuhan melalui slashing.

## Validator yang tangguh {#resilient-validators}

Sebuah validator seharusnya bukan titik kegagalan tunggal. Desain tanda tangan ambang Quantaureum berarti tugas validator sudah terdistribusi secara struktural sejak awal: tanda tangan finalitas membutuhkan partisipasi dari ambang anggota komite, bukan satu mesin yang memegang satu kunci aktif. Dikombinasikan dengan kondisi slashing dan pemilihan berbobot stake, hal ini menjaga jaringan tetap aktif meskipun sebagian validator offline.

<ButtonLink variant="outline" href="/staking/">Lebih lanjut tentang staking</ButtonLink>

## Ketahanan kuantum {#quantum-resistance}

Sebagian besar blockchain yang mapan mengandalkan kriptografi kurva eliptik yang bisa dipecahkan oleh komputer kuantum berukuran cukup besar — memaksa mereka menjalani migrasi bertahap yang menyakitkan. **Quantaureum tidak memiliki masalah ini**: tanda tangan Dilithium3, pertukaran kunci Kyber768, komitmen ketersediaan data berbasis hash (FRI), dan keacakan kuantum semuanya merupakan fitur protokol yang sudah berjalan.

<ButtonLink variant="outline" href="/roadmap/security/quantum-resistance/">Lebih lanjut tentang ketahanan kuantum</ButtonLink>

## Pekerjaan berkelanjutan {#ongoing-work}

Pekerjaan keamanan aktif meliputi penguatan protokol tanda tangan ambang, perluasan komitmen FRI pada lapisan [ketersediaan data](/developers/docs/data-availability/), dan formalisasi semantik eksekusi paralel QVM sehingga mesin paralel terbukti sesuai dengan eksekusi berurutan.
