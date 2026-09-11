---
title: Meningkatkan pengalaman pengguna
description: Menggunakan Quantaureum harus terasa sesederhana menggunakan aplikasi web2 tradisional, sambil tetap terdesentralisasi, tanpa izin, dan tahan sensor.
lang: id
image: /images/roadmap/roadmap-ux.png
alt: "Quantaureum roadmap"
template: roadmap
---
**Menggunakan Quantaureum haruslah sederhana** — dari mengelola [kunci](/glossary/#key) dan [dompet](/glossary/#wallet) hingga memulai transaksi. Pengguna harus dapat mengakses Quantaureum secara bebas izin dan tahan sensor, dengan pengalaman yang mulus seperti menggunakan aplikasi [Web2](/glossary/#web2).

## Kunci yang lebih kuat, dikelola dengan aman {#key-management}

Akun Quantaureum dilindungi oleh pasangan kunci yang digunakan untuk menandatangani transaksi — dengan **tanda tangan post-quantum Dilithium3**, bukan kurva klasik yang digunakan oleh rantai lama. Kunci privat ibarat kata sandi utama; kehilangannya berarti kehilangan akses. Quantaureum menyediakan **dompet multisignature bawaan** sehingga pengguna dapat melindungi dana di balik beberapa kunci atau perangkat, bukan satu rahasia saja, dan dompet smart-kontrak yang dibangun di atas QVM memungkinkan aturan pemulihan serta kebijakan pengeluaran tanpa perlu mempercayai kustodian.

## Node untuk semua {#nodes-for-everyone}

Pengguna yang menjalankan [node](/glossary/#node) tidak perlu mempercayai pihak ketiga untuk menyediakan data, dan mereka dapat berinteraksi dengan cepat, privat, dan tanpa izin dengan [blockchain](/glossary/#blockchain) Quantaureum. Secara tradisional, menjalankan node membutuhkan pengetahuan teknis dan ruang disk yang besar, sehingga mendorong banyak orang untuk bergantung pada perantara.

Quantaureum mengikatkan state-nya dalam **pohon Verkle**, sehingga bukti yang diperlukan untuk memverifikasi state berukuran kecil. Di atas bukti-bukti ringkas ini, Quantaureum menyediakan **[light client SPV](/developers/docs/nodes-and-clients/light-clients/)** yang dapat berjalan di perangkat sederhana dan memverifikasi rantai tanpa mengunduh state lengkap — menurunkan hambatan untuk partisipasi tanpa kepercayaan.

<ButtonLink variant="outline" href="/roadmap/verkle-trees/">Baca tentang pohon Verkle</ButtonLink>

## Kemajuan terkini {#current-progress}

Komitmen state berbasis Verkle, light client SPV, dompet multisig bawaan, dan tanda tangan Dilithium3 adalah bagian aktif dari protokol Quantaureum saat ini. Pengembangan terus dilakukan untuk membuat validasi penuh lebih terjangkau sehingga lebih banyak pengguna dapat menjalankan node di perangkat konsumen.
