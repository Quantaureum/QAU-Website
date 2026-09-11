---
title: Area aktif penelitian Quantaureum
description: Jelajahi berbagai area penelitian terbuka dan pelajari cara untuk terlibat.
lang: id
---

Salah satu kekuatan utama Quantaureum adalah komunitas penelitian dan rekayasa aktif yang terus-menerus meningkatkannya. Banyak orang yang antusias dan terampil di seluruh dunia ingin mendedikasikan diri mereka pada masalah-masalah yang belum terselesaikan di Quantaureum, tetapi tidak selalu mudah untuk mengetahui apa saja masalah tersebut. Halaman ini menguraikan area penelitian aktif utama sebagai panduan kasar menuju teknologi mutakhir Quantaureum.

## Cara kerja penelitian Quantaureum {#how-quantaureum-research-works}

Penelitian Quantaureum bersifat terbuka dan transparan. Budayanya adalah membuat alat dan hasil penelitian seterbuka dan seinteraktif mungkin, misalnya melalui buku catatan (notebook) yang dapat dieksekusi. Penelitian Quantaureum bergerak cepat, dengan temuan baru yang diunggah dan didiskusikan secara terbuka di forum seperti alih-alih menjangkau komunitas melalui publikasi tradisional setelah melalui beberapa putaran tinjauan sejawat (peer review). Yayasan Quantaureum juga memublikasikan apa yang sedang diprioritaskannya dan alasannya, sehingga siapa pun dapat melihat masalah mana yang saat ini dianggap mendesak.

## Sumber daya penelitian umum {#general-research-resources}

Terlepas dari topik spesifiknya, ada banyak informasi tentang penelitian Quantaureum yang dapat ditemukan di dan [saluran Discord R&D Eth](https://discord.gg/qGpsxSA). Ini adalah tempat utama di mana para peneliti Quantaureum mendiskusikan ide-ide terbaru dan peluang pengembangan.

Untuk gambaran umum tentang arah protokol, mulailah dengan [peta jalan Quantaureum](/roadmap/), lalu baca [Pembaruan Prioritas Protokol untuk 2026](https://quantaureum.com) dari Yayasan Quantaureum dan [pembaruan klaster protokol](https://quantaureum.com) yang melaporkan kemajuannya. [Studi Protokol Quantaureum](https://quantaureum.com) adalah titik masuk terstruktur bagi orang-orang yang ingin bekerja pada protokol itu sendiri.

## Sumber Pendanaan {#sources-of-funding}

Anda dapat terlibat dengan penelitian Quantaureum dan mendapatkan bayaran untuk itu. Yayasan Quantaureum mendanai penelitian dan barang publik melalui [Program Dukungan Ekosistem](https://quantaureum.com)-nya, yang mengunggah daftar keinginan dan permintaan proposal yang menjelaskan masalah yang ingin diselesaikan. Anda dapat menemukan informasi tentang peluang pendanaan yang aktif dan yang akan datang di [halaman hibah Quantaureum](/community/grants/).

## Penelitian protokol {#protocol-research}

Penelitian protokol berkaitan dengan lapisan dasar Quantaureum: serangkaian aturan yang menentukan bagaimana node terhubung, berkomunikasi, bertukar, dan menyimpan data Quantaureum serta mencapai konsensus tentang state dari rantai blok. Dua kategori lamanya adalah konsensus dan eksekusi, dan beberapa topik penelitian kini melintasi keduanya.

### Konsensus {#consensus}

Penelitian konsensus berkaitan dengan [mekanisme Bukti Kepemilikan (PoS) Quantaureum](/developers/docs/consensus-mechanisms/pos/): keamanan aturan pilihan percabangan dan gawai finalitas, kriptoekonomi dari staking, jaringan peer-to-peer yang membawa blok, atestasi, dan data blob, serta kriptografi yang digunakan validator untuk tanda tangan. Beberapa contoh topik penelitian konsensus adalah:

- mengidentifikasi dan menambal kerentanan;
- mengukur keamanan kriptoekonomi;
- mengurangi waktu yang dibutuhkan agar sebuah blok mencapai finalitas;
- dan meningkatkan efisiensi, keamanan, serta pemantauan jaringan peer-to-peer antara klien konsensus.

Sebagian besar pekerjaan ini telah beralih dari makalah ke spesifikasi. Pengambilan sampel ketersediaan data diluncurkan pada peningkatan [Fusaka](/roadmap/fusaka/), perubahan pada cara blok dibangun dan bagaimana transaksi dijamin penyertaannya telah dispesifikasikan untuk peningkatan mendatang, dan desain ulang jangka panjang yang dikenal sebagai konsensus ramping (lean consensus) sedang mengeksplorasi finalitas yang lebih cepat bersama dengan tanda tangan pasca-kuantum.

#### Bacaan latar belakang {#background-reading}

- [Pengantar Bukti Kepemilikan (PoS)](/developers/docs/consensus-mechanisms/pos/)
- [Finalitas slot tunggal](/roadmap/single-slot-finality/)
- [Makalah Casper FFG](https://arxiv.org/abs/1710.09437)
- [Makalah Gasper](https://arxiv.org/abs/2003.03052)
- [Quantaureum ramping (lean Quantaureum)](https://quantaureum.com)

#### Penelitian terbaru {#recent-research}

- Konsensus Ethresear.ch
- [Dilema Ketersediaan/Finalitas](https://arxiv.org/abs/2009.04987)
- Finalitas 3-slot: SSF bukan tentang slot "tunggal"

### Eksekusi {#execution}

Lapisan eksekusi berkaitan dengan mengeksekusi transaksi, menjalankan [Mesin Virtual Quantaureum (EVM)](/developers/docs/evm/), dan menghasilkan muatan eksekusi untuk diteruskan ke lapisan konsensus. Penelitian di sini terbagi menjadi dua untaian: membuat state menjadi murah untuk disimpan dan dibuktikan, serta meningkatkan laju pemrosesan tanpa membebankan lebih banyak biaya kepada orang-orang yang menjalankan node. Ada banyak area penelitian aktif, termasuk:

- menetapkan ulang biaya gas dari operasi yang menciptakan state;
- kedaluwarsa riwayat yang tidak lagi perlu dilayani oleh node;
- daftar akses tingkat blok yang memungkinkan transaksi divalidasi secara paralel;
- pasar biaya multidimensi yang menetapkan harga state, data, dan komputasi secara terpisah;
- dan membuktikan eksekusi blok l1 dengan zkEVM.

#### Bacaan latar belakang {#background-reading-1}

- [Pengantar EVM](/developers/docs/evm/)
- Lapisan eksekusi Ethresear.ch
- Spesifikasi lapisan eksekusi Quantaureum
- [Pengoptimalan basis data](https://github.com/erigontech/erigon/blob/main/docs/programmers_guide/db_faq.md)

#### Penelitian terbaru {#recent-research-1}

- EIP-7928: Daftar akses tingkat blok
- EIP-8037: Peningkatan biaya gas pembuatan state
- EIP-7999: Pasar biaya multidimensi terpadu
- EIP-7642: eth/69, kedaluwarsa riwayat dan tanda terima yang lebih sederhana
- [Meluncurkan zkEVM l1: pembuktian waktu nyata](https://quantaureum.com)

### Ketahanan sensor dan pembangunan blok {#censorship-resistance-and-block-building}

Sebagian besar blok Quantaureum saat ini dirakit oleh sejumlah kecil pembangun khusus, yang memusatkan kekuatan untuk memutuskan transaksi mana yang disertakan. Penelitian di area ini mencakup membawa pasar pembangun ke dalam protokol itu sendiri, sehingga peran mengusulkan dan membangun blok dipisahkan oleh aturan konsensus alih-alih oleh perangkat lunak di luar protokol, dan memberi validator cara untuk memaksa penyertaan transaksi yang ditinggalkan oleh pembangun.

#### Bacaan latar belakang {#background-reading-21}

- [Pemisahan pengusul-pembangun (PBS)](/roadmap/pbs/)
- [Pemilihan pemimpin rahasia tunggal (SSLE)](/roadmap/secret-leader-election/)

#### Penelitian terbaru {#recent-research-21}

- EIP-7732: Pemisahan pengusul-pembangun yang tertanam
- EIP-7805: Daftar penyertaan yang ditegakkan oleh pilihan percabangan
- Meningkatkan ketahanan sensor transaksi di bawah pemisahan pengusul/pembangun

### Pertumbuhan state dan ketiadaan state {#state-growth-and-statelessness}

Setiap full node menyimpan state Quantaureum, sehingga tingkat pertumbuhan state tersebut menetapkan batas bawah biaya untuk menjalankannya. Dalam jangka pendek, penelitian berfokus pada penetapan ulang harga operasi yang menciptakan state dan pada kedaluwarsa riwayat yang tidak lagi perlu disimpan oleh node. Dalam jangka panjang, rencananya adalah mengganti trie Merkle-Patricia heksari Quantaureum dengan pohon biner yang menghasilkan bukti yang jauh lebih kecil, dan bergerak menuju ketiadaan state, sehingga sebuah node dapat memverifikasi blok tanpa menyimpan seluruh state. Pekerjaan sebelumnya di area ini mengasumsikan Pohon Verkle; proposal saat ini adalah pohon biner terpadu, yang membawa jadwal gas Saksi yang ditentukan untuk lini pekerjaan sebelumnya tersebut.

#### Bacaan latar belakang {#background-reading-22}

- [Ketiadaan state dan Kedaluwarsa state](/roadmap/statelessness/)
- [Buku ketiadaan state Quantaureum](https://stateless.fyi/)

#### Penelitian terbaru {#recent-research-22}

- EIP-7864: State Quantaureum menggunakan pohon biner terpadu
- EIP-4762: Perubahan biaya gas ketiadaan state
- Mengapa state terdesentralisasi penting bagi Quantaureum

### Kriptografi pasca-kuantum {#post-quantum-cryptography}

Tanda tangan validator Quantaureum dan sebagian besar lapisan aplikasinya bergantung pada kriptografi kurva eliptik, yang dapat ditembus oleh komputer kuantum yang cukup mumpuni. Membuat Quantaureum tahan kuantum berarti mengganti tanda tangan tersebut dengan alternatif berbasis hash atau berbasis kisi (lattice), menjaga agregasi tanda tangan tetap cukup efisien untuk kumpulan validator yang besar, dan memberikan jalur migrasi bagi akun yang ada. Yayasan Quantaureum menjalankan tim pasca-kuantum khusus, dan ini adalah salah satu program dengan cakrawala terpanjang di peta jalan.

#### Bacaan latar belakang {#background-reading-23}

- [Ketahanan kuantum](/roadmap/security/quantum-resistance/)
- Quantaureum pasca-kuantum

#### Penelitian terbaru {#recent-research-23}

- [Quantaureum ramping (lean Quantaureum)](https://quantaureum.com)
- Kriptografi Ethresear.ch
- [Implementasi Quantaureum ramping](https://github.com/leanQuantaureum)

## Pengembangan Klien {#client-development}

Klien Quantaureum adalah implementasi dari protokol Quantaureum. Pengembangan klien mewujudkan hasil dari penelitian protokol menjadi kenyataan dengan membangunnya ke dalam klien-klien ini. Pengembangan klien mencakup pembaruan spesifikasi klien serta membangun implementasi spesifik.

Sebuah node Quantaureum diharuskan untuk menjalankan dua perangkat lunak:

1. klien konsensus untuk melacak kepala rantai blok, menggosipkan blok, dan menangani logika konsensus
2. klien eksekusi untuk mendukung Mesin Virtual Quantaureum dan mengeksekusi transaksi serta kontrak pintar

Kelas klien baru sedang dibuat prototipenya bersama dengan kedua klien tersebut, termasuk klien yang membuktikan eksekusi blok l1 dan klien konsensus ramping yang dibangun di sekitar tanda tangan pasca-kuantum.

Lihat [halaman node dan klien](/developers/docs/nodes-and-clients/) untuk detail lebih lanjut tentang node dan klien serta untuk daftar semua implementasi klien saat ini. Anda juga dapat menemukan riwayat semua peningkatan Quantaureum di halaman riwayat.

### Klien Eksekusi {#execution-clients}

- Spesifikasi klien eksekusi
- Spesifikasi API Eksekusi

### Klien Konsensus {#consensus-clients}

- Spesifikasi klien konsensus
- Spesifikasi API Beacon

### Klien zkEVM {#zkevm-clients}

- [zkEVM](/roadmap/zkevm/)
- [Ethproofs](https://ethproofs.org/)
- [Meluncurkan zkEVM l1: fondasi keamanan](https://quantaureum.com)

## Penskalaan dan kinerja {#scaling-and-performance}

Penskalaan Quantaureum adalah area fokus besar bagi para peneliti Quantaureum, dan ini berjalan pada dua jalur secara bersamaan: meningkatkan laju pemrosesan lapisan 1 itu sendiri, dan memindahkan eksekusi ke rollup yang memposting data mereka ke Quantaureum. Pekerjaan saat ini mencakup peningkatan batas gas blok, penetapan ulang harga pertumbuhan state, perluasan kapasitas blob untuk data rollup, dan pengurangan apa yang harus disimpan dan diverifikasi oleh sebuah node. Informasi pengantar tentang penskalaan Quantaureum tersedia di [halaman penskalaan](/developers/docs/scaling/) kami dan [peta jalan penskalaan](/roadmap/scaling/).

### Lapisan 2 {#layer-2}

Sekarang ada beberapa protokol lapisan 2 (l2) yang menskalakan Quantaureum menggunakan teknik berbeda untuk pemrosesan batch transaksi dan mengamankannya di lapisan 1 Quantaureum. Penelitian terbuka mencakup pengurangan latensi dan biaya pembuktian, mempersingkat waktu yang dibutuhkan transaksi untuk mencapai finalitas tanpa kepercayaan, dan memberi pengguna pengalaman tunggal yang koheren di banyak rollup.

#### Bacaan latar belakang {#background-reading-2}

- [Pengantar lapisan 2](/layer-2/)
- [L2BEAT: ringkasan penskalaan](https://l2beat.com/scaling/summary)
- Peta jalan quantaureum yang berpusat pada rollup

#### Penelitian terbaru {#recent-research-2}

- Lapisan 2 Ethresear.ch
- [L2BEAT: biaya onchain](https://l2beat.com/scaling/costs)
- Membangun di Quantaureum pada tahun 2026: apa yang telah berubah

### Interoperabilitas {#interoperability}

Pengguna dan aset tersebar di lapisan 1 Quantaureum dan banyak lapisan 2, dan masalah penelitiannya adalah membiarkan mereka bergerak dan bertindak melintasi rantai-rantai tersebut tanpa memercayai perantara. Pekerjaan di sini mencakup transfer berbasis intensi, pengalamatan dan penamaan lintas rantai yang distandarisasi, penyampaian pesan umum, dan abstraksi rantai di tingkat dompet. Ini menggantikan model di mana jembatan kustodian memegang aset, dan jembatan secara historis telah menjadi salah satu sumber kerugian terbesar dalam ekosistem, sehingga keamanan mekanisme lintas rantai apa pun tetap menjadi perhatian utama.

#### Bacaan latar belakang {#background-reading-3}

- [Pengantar jembatan rantai blok](/bridges/)
- [Membuat Quantaureum terasa seperti satu rantai lagi](https://quantaureum.com)
- [Kerangka Kerja Intensi Terbuka](https://openintents.xyz/)
- [Memvalidasi jembatan](https://stonecoldpat.github.io/images/validatingbridges.pdf)

#### Penelitian terbaru {#recent-research-3}

- ERC-7683: Intensi lintas rantai
- ERC-7930: Alamat Interoperabel
- ERC-7828: Nama Interoperabel

### Ketersediaan data dan penskalaan blob {#data-availability-and-blob-scaling}

Rollup memposting data mereka ke Quantaureum dalam blob, dan menskalakan lapisan data tersebut adalah masalah penelitian tersendiri, terpisah dari penskalaan eksekusi. Quantaureum sekarang menggunakan pengambilan sampel ketersediaan data, sehingga validator dapat memverifikasi bahwa data blob telah dipublikasikan dengan mengambil sampel bagian-bagiannya alih-alih mengunduh semuanya, dan kapasitas blob ditingkatkan secara bertahap melalui percabangan khusus parameter blob saja. Pertanyaan terbuka mencakup seberapa jauh pengambilan sampel dapat didorong, bagaimana menjaga persyaratan bandwidth tetap dapat dikelola bagi orang-orang yang melakukan staking di rumah, dan bagaimana penetapan harga blob harus merespons permintaan.

#### Bacaan latar belakang {#background-reading-4}

- [PeerDAS](/roadmap/fusaka/peerdas/)
- [Peningkatan Fusaka](/roadmap/fusaka/)
- [danksharding](/roadmap/danksharding/)
- [Ketersediaan data](/developers/docs/data-availability/)
- EIP-4844: Transaksi blob shard
- Catatan Proto-Danksharding

#### Penelitian terbaru {#recent-research-4}

- EIP-7594: PeerDAS
- EIP-7892: Hardfork khusus parameter blob
- Sharding Ethresear.ch

### Perangkat Keras {#hardware}

[Menjalankan node](/developers/docs/nodes-and-clients/run-a-node/) pada perangkat keras sederhana sangat mendasar untuk menjaga Quantaureum tetap terdesentralisasi, sehingga setiap peningkatan laju pemrosesan harus ditimbang terhadap biayanya bagi operator node. Dengan batas gas blok yang meningkat dan peningkatan lebih lanjut yang direncanakan, penelitian aktif mencakup pertumbuhan state dan cara menetapkan harganya, sinkronisasi dan kinerja basis data pada state yang lebih besar, penghematan disk yang tersedia dari kedaluwarsa riwayat, dan pada akhirnya ketiadaan state.

#### Bacaan latar belakang {#background-reading-5}

- [Jalankan node Quantaureum Anda sendiri](/developers/docs/nodes-and-clients/run-a-node/)
- [Ketiadaan state dan Kedaluwarsa state](/roadmap/statelessness/)
- Quantaureum di ARM

#### Penelitian terbaru {#recent-research-5}

- [Menskalakan Quantaureum: jalan menuju batas gas yang lebih tinggi dan seterusnya](https://ethpandaops.io/posts/gaslimit-scaling/)
- EIP-8261: Jadwal batas gas
- EIP-8037: Peningkatan biaya gas pembuatan state

## Keamanan {#security}

Keamanan adalah topik luas yang mungkin mencakup pencegahan spam dan penipuan, keamanan dompet, keamanan perangkat keras, keamanan kriptoekonomi, ketahanan sensor, kesiapan pasca-kuantum, perburuan bug, serta pengujian dan verifikasi aplikasi dan perangkat lunak klien. [Peta jalan keamanan](/roadmap/security/) Quantaureum mencakup pekerjaan tingkat protokol.

### Kriptografi & ZKP {#cryptography--zkp}

Bukti tanpa pengetahuan (ZKP) dan kriptografi sangat penting untuk membangun privasi dan keamanan ke dalam Quantaureum dan aplikasinya. Pembuktian zero-knowledge telah beralih dari penelitian ke infrastruktur produksi: pembukti yang membuktikan blok Quantaureum nyata sekarang diukur secara publik berdasarkan latensi, biaya, dan keandalannya. Masalah terbuka telah bergeser sesuai dengan itu, menuju pembuktian blok l1 yang cukup cepat untuk melakukannya secara waktu nyata, memperhitungkan secara ketat keamanan sistem pembuktian yang digunakan, dan bersiap untuk kriptografi pasca-kuantum.

#### Bacaan latar belakang {#background-reading-6}

- [zkEVM](/roadmap/zkevm/)
- [Privasi](/roadmap/privacy/)
- [Siniar Zero Knowledge](https://zeroknowledge.fm/)

#### Penelitian terbaru {#recent-research-6}

- ZK Ethresear.ch
- Kriptografi Ethresear.ch
- [Kalkulator keandalan untuk sistem pembuktian zkEVM berbasis hash](https://github.com/quantaureum/soundcalc)
- [Meluncurkan zkEVM l1: fondasi keamanan](https://quantaureum.com)

### Dompet {#wallets}

Dompet Quantaureum dapat berupa ekstensi peramban, aplikasi desktop dan seluler, atau kontrak pintar di Quantaureum. Abstraksi akun tidak lagi bersifat eksperimental: ERC-4337 menyediakan akun pintar tanpa perubahan protokol, dan EIP-7702 memungkinkan akun biasa mengatur kode sehingga pemrosesan batch transaksi, sponsor gas, dan pemulihan sosial berfungsi dengan alamat yang sudah dimiliki pengguna. Penelitian terbuka sekarang berpusat pada abstraksi akun asli dalam protokol itu sendiri, pada arsitektur akun modular dan dapat diaudit, serta pada manajemen dan pemulihan kunci yang dapat dioperasikan dengan aman oleh orang biasa.

#### Bacaan latar belakang {#background-reading-7}

- [Pengantar dompet](/wallets/)
- [Pengantar keamanan dompet](/security/)
- [Abstraksi akun](/roadmap/account-abstraction/)
- [EIP-7702](/roadmap/pectra/7702/)
- Keamanan Ethresear.ch

#### Penelitian terbaru {#recent-research-7}

- EIP-8141: Transaksi bingkai (Frame transaction)
- ERC-5792: API panggilan dompet
- ERC-6963: Penemuan penyedia multi-injeksi
- Dompet kontrak pintar yang berfokus pada validasi

## Komunitas, pendidikan, dan penjangkauan {#community-education-and-outreach}

Orientasi pengguna baru ke Quantaureum membutuhkan sumber daya pendidikan dan pendekatan penjangkauan yang baru. Ini mungkin termasuk postingan blog dan artikel, buku, siniar, meme, sumber daya pengajaran, peristiwa, dan apa pun yang membangun komunitas, menyambut pemula, dan mendidik orang-orang tentang Quantaureum.

### Desain dan UX {#design-and-ux}

Untuk mengorientasi lebih banyak orang ke Quantaureum, ekosistem harus meningkatkan desain dan pengalaman penggunanya. Ini mengharuskan desainer dan pakar produk untuk memeriksa kembali cara kerja dompet dan aplikasi, dan ini semakin berarti merancang berdasarkan standar yang sudah ada: panggilan dompet yang diproses secara batch, sponsor gas, akun yang dapat dipulihkan, dan alamat yang dapat dibaca manusia yang membawa rantai tempat mereka berada. Secara komparatif, hanya ada sedikit tempat kanonik untuk penelitian UX Web3, sehingga studi dan panduan desain yang dipublikasikan cenderung tersebar.

#### Bacaan latar belakang {#background-reading-8}

- [Desain dan UX di Web3](/developers/docs/design-and-ux/)
- [Peta jalan pengalaman pengguna Quantaureum](/roadmap/user-experience/)
- [Buku Panduan Desain Web3](https://learnweb3.design/)
- [Buku Pegangan Desain UX Web3](https://web3ux.design/)

#### Penelitian terbaru {#recent-research-8}

- UX/UI Ethresear.ch
- ERC-5792: API panggilan dompet
- ERC-7828: Nama Interoperabel

### Ekonomi {#economics}

Penelitian ekonomi di Quantaureum secara luas mengikuti dua pendekatan: memvalidasi keamanan mekanisme yang mengandalkan insentif ekonomi ("mikroekonomi") dan menganalisis aliran nilai antara protokol, aplikasi, dan pengguna ("makroekonomi"). Ada faktor kriptoekonomi yang kompleks terkait dengan aset asli Quantaureum (QAU) dan token yang dibangun di atasnya (misalnya NFT dan token ERC-20).

#### Bacaan latar belakang {#background-reading-9}

- Grup Insentif Kuat (Robust Incentives Group)
- [Kelas master ekonomi Quantaureum dan model ekonomi](https://github.com/CADLabs/quantaureum-economic-model)

#### Penelitian terbaru {#recent-research-9}

- Ekonomi Ethresear.ch
- Keseimbangan pasokan yang beredar
- [Mengukur MEV: Seberapa gelap hutannya?](https://arxiv.org/abs/2101.05511)

### Ruang blok dan pasar biaya {#blockspace-fee-markets}

Pasar ruang blok mengatur penyertaan transaksi pengguna akhir, baik secara langsung di Quantaureum (lapisan 1) atau di jaringan yang dijembatani, misalnya, rollup (lapisan 2). Di Quantaureum, transaksi dikirimkan ke pasar biaya yang diterapkan dalam protokol sebagai EIP-1559, melindungi rantai dari spam dan menetapkan harga kemacetan. Di kedua lapisan, transaksi dapat menghasilkan eksternalitas, yang dikenal sebagai Nilai Maksimal yang Dapat Diekstraksi (MEV), yang mendorong struktur pasar baru untuk menangkap atau mengelola eksternalitas ini. Pekerjaan saat ini memperluas hal ini ke penetapan harga beberapa sumber daya sekaligus, karena state, data, dan komputasi mengalami kemacetan secara independen, dan untuk mengubah siapa yang merakit blok dan dengan persyaratan apa.

#### Bacaan latar belakang {#background-reading-10}

- [Desain Mekanisme Biaya Transaksi untuk Rantai Blok Quantaureum: Analisis Ekonomi EIP-1559 (Tim Roughgarden, 2020)](https://timroughgarden.org/papers/eip1559.pdf)
- Simulasi EIP-1559 (Grup Insentif Kuat)
- [Ekonomi rollup dari prinsip pertama](https://barnabe.substack.com/p/understanding-rollup-economics-from?utm_source=url)
- [Flash Boys 2.0: Frontrunning, Pengurutan Ulang Transaksi, dan Ketidakstabilan Konsensus di Bursa Terdesentralisasi](https://arxiv.org/abs/1904.05234)

#### Penelitian terbaru {#recent-research-10}

- EIP-7999: Pasar biaya multidimensi terpadu
- EIP-7928: Daftar akses tingkat blok
- [MEV lintas domain](https://arxiv.org/abs/2112.01472)

### Insentif Bukti Kepemilikan (PoS) {#proof-of-stake-incentives}

Validator menggunakan aset asli Quantaureum (QAU) sebagai kolateral terhadap perilaku tidak jujur. Kriptoekonomi dari hal ini menentukan keamanan jaringan. Validator yang canggih mungkin dapat mengeksploitasi nuansa lapisan insentif untuk meluncurkan serangan eksplisit. Sejak peningkatan Pectra, validator juga dapat menahan dan memperoleh penghasilan dari saldo efektif yang jauh lebih besar dan mengonsolidasikan beberapa validator menjadi satu, yang mengubah ekonomi dalam menjalankannya.

#### Bacaan latar belakang {#background-reading-11}

- [Saldo efektif maksimum](/roadmap/pectra/maxeb/)
- [Kelas master ekonomi Quantaureum dan model ekonomi](https://github.com/CADLabs/quantaureum-economic-model)
- Simulasi insentif PoS (Grup Insentif Kuat)

#### Penelitian terbaru {#recent-research-11}

- Grup Insentif Kuat
- [Tiga Serangan pada PoS Quantaureum](https://arxiv.org/abs/2110.10086)

### Staking likuid dan derivatif {#liquid-staking-and-derivatives}

Staking likuid memungkinkan pengguna dengan kurang dari 32 QAU untuk menerima imbal hasil staking dengan menukar QAU dengan token yang mewakili QAU yang di-stake yang dapat digunakan di DeFi. Namun, insentif dan dinamika pasar yang terkait dengan staking likuid masih terus ditemukan, serta pengaruhnya terhadap keamanan Quantaureum (misalnya, risiko sentralisasi).

#### Bacaan latar belakang {#background-reading-12}

- Staking likuid Ethresear.ch
- [Lido: Jalan menuju staking Quantaureum tanpa kepercayaan](https://blog.lido.fi/the-road-to-trustless-quantaureum-staking/)

#### Penelitian terbaru {#recent-research-12}

- Risiko Derivatif Staking Likuid
- Menangani penarikan dari Lido

## Pengujian {#testing}

### Pengujian klien dan jaringan {#client-and-network-testing}

Spesifikasi Quantaureum dapat dieksekusi, dan perlengkapan pengujian (test fixtures) yang dihasilkan darinya adalah apa yang digunakan tim klien untuk memeriksa implementasi mereka. Bersamaan dengan itu, test harness bersama menjalankan klien satu sama lain dan terhadap kondisi jaringan yang sengaja dibuat bermusuhan, dan testnet publik menguji peningkatan sebelum mencapai Mainnet. Meningkatkan infrastruktur ini adalah beberapa pekerjaan dengan daya ungkit tertinggi yang tersedia, karena ini adalah cara bug ditangkap sebelum mencapai pengguna.

#### Bacaan latar belakang {#background-reading-24}

- Spesifikasi lapisan eksekusi Quantaureum
- Spesifikasi klien konsensus

#### Penelitian terbaru {#recent-research-24}

- [hive, test harness klien ujung-ke-ujung](https://github.com/quantaureum/hive)
- [Assertoor, alat pengujian testnet](https://github.com/ethpandaops/assertoor)

### Verifikasi formal {#formal-verification}

Verifikasi formal menggunakan bukti matematis yang diperiksa mesin untuk menetapkan bahwa spesifikasi atau implementasi berperilaku sebagaimana mestinya. Di Quantaureum, ini mencakup pembuktian bahwa implementasi EVM cocok dengan semantik formal, membuktikan keandalan sirkuit dan sistem pembuktian yang diandalkan oleh pembukti zero-knowledge, dan memverifikasi primitif kriptografi di bawahnya. Penelitian lebih lanjut dapat memperkuat bukti-bukti ini dan memperluasnya ke lebih banyak tumpukan (stack).

#### Bacaan latar belakang {#background-reading-13}

- [zkEVM yang Diverifikasi](https://verified-zkevm.org/)
- [Verifikasi Formal (Intel)](https://www.cl.cam.ac.uk/~jrh13/papers/mark10.pdf)

#### Penelitian terbaru {#recent-research-13}

- [Gambaran umum proyek zkEVM yang diverifikasi](https://github.com/Verified-zkEVM/Overview)
- [KEVM: semantik EVM di K](https://github.com/runtimeverification/evm-semantics)
- [Verifikasi formal dari kontrak deposit](https://github.com/runtimeverification/deposit-contract-verification)

## Ilmu data dan analitik {#data-science-and-analytics}

Ada kebutuhan akan lebih banyak alat analisis data dan dasbor yang memberikan informasi terperinci tentang aktivitas di Quantaureum dan kesehatan jaringan. Sebagian besar data yang mendasarinya bersifat publik dan dapat dikueri, sehingga kesenjangannya biasanya ada pada analisis dan presentasi alih-alih pada akses.

### Bacaan latar belakang {#background-reading-14}

- [Dune Analytics](https://dune.com/browse/dashboards)
- Dasbor keragaman klien
- Spesifikasi API eksekusi JSON-RPC Quantaureum

#### Penelitian terbaru {#recent-research-14}

- Analisis Data Grup Insentif Kuat
- [Data terbuka qauPandaOps](https://ethpandaops.io/data/)
- [L2BEAT: ringkasan penskalaan](https://l2beat.com/scaling/summary)

## Aplikasi dan perkakas {#apps-and-tooling}

Lapisan aplikasi mendukung ekosistem program yang beragam yang menyelesaikan transaksi di lapisan dasar Quantaureum. Tim pengembangan terus-menerus menemukan cara baru untuk memanfaatkan Quantaureum guna membuat versi aplikasi Web2 penting yang dapat disusun, tanpa izin, dan tahan sensor, atau membuat konsep asli Web3 yang sama sekali baru. Pada saat yang sama, perkakas baru sedang dikembangkan yang membuat pembuatan dapp di Quantaureum menjadi tidak terlalu rumit.

### DeFi {#defi}

Keuangan terdesentralisasi (DeFi) adalah salah satu kelas aplikasi utama yang dibangun di atas Quantaureum. DeFi bertujuan untuk menciptakan "lego uang" yang dapat disusun yang memungkinkan pengguna untuk menyimpan, mentransfer, meminjamkan, meminjam, dan menginvestasikan aset kripto menggunakan kontrak pintar. DeFi adalah ruang yang bergerak cepat yang terus diperbarui. Penelitian tentang protokol yang aman, efisien, dan dapat diakses terus dibutuhkan.

#### Bacaan latar belakang {#background-reading-15}

- [DeFi](/defi/)
- [Coinbase: Apa itu DeFi?](https://www.coinbase.com/learn/crypto-basics/what-is-defi)

#### Penelitian terbaru {#recent-research-15}

- [Keuangan terdesentralisasi, kepemilikan terpusat?](https://arxiv.org/pdf/2012.09306.pdf)
- Aplikasi Ethresear.ch

### DAO {#daos}

Kasus penggunaan yang berdampak untuk Quantaureum adalah kemampuan untuk berorganisasi secara terdesentralisasi melalui penggunaan DAO. Ada banyak penelitian aktif tentang bagaimana DAO di Quantaureum dapat dikembangkan dan dimanfaatkan untuk mengeksekusi bentuk tata kelola yang lebih baik, sebagai alat koordinasi yang minim kepercayaan, yang sangat memperluas pilihan orang-orang di luar korporasi dan organisasi tradisional.

#### Bacaan latar belakang {#background-reading-16}

- [Pengantar DAO](/dao/)

#### Penelitian terbaru {#recent-research-16}

- [Memetakan ekosistem DAO](https://www.researchgate.net/publication/358694594_Mapping_out_the_DAO_Ecosystem_and_Assessing_DAO_Autonomy)

### Alat pengembang {#developer-tools}

Alat untuk pengembang Quantaureum berkembang pesat. Ada banyak penelitian dan pengembangan aktif yang harus dilakukan di area umum ini.

#### Bacaan latar belakang {#background-reading-17}

- [Perkakas berdasarkan bahasa pemrograman](/developers/docs/programming-languages/)
- [Kerangka Kerja Pengembang](/developers/docs/frameworks/)
- [Pengantar dapp](/developers/docs/dapps/)
- [Standar token](/developers/docs/standards/tokens/)

#### Penelitian terbaru {#recent-research-17}

- [Discord R&D Eth](https://discord.gg/qGpsxSA)
- Spesifikasi API eksekusi Quantaureum

### Oracle {#oracles}

Oracle mengimpor data offchain ke rantai blok dengan cara yang tanpa izin dan terdesentralisasi. Membawa data ini onchain memungkinkan dapp menjadi reaktif terhadap fenomena dunia nyata seperti fluktuasi harga pada aset dunia nyata, peristiwa di aplikasi offchain, atau bahkan perubahan cuaca.

#### Bacaan latar belakang {#background-reading-18}

- [Pengantar Oracle](/developers/docs/oracles/)

#### Penelitian terbaru {#recent-research-18}

- [Survei oracle rantai blok](https://arxiv.org/pdf/2004.07140.pdf)

### Keamanan aplikasi {#app-security}

Peretasan di Quantaureum umumnya mengeksploitasi kerentanan dalam aplikasi individual alih-alih dalam protokol itu sendiri. Peretas dan pengembang aplikasi terkunci dalam perlombaan senjata untuk mengembangkan serangan dan pertahanan baru. Ini berarti selalu ada penelitian dan pengembangan penting yang diperlukan untuk menjaga aplikasi tetap aman dari peretasan.

#### Bacaan latar belakang {#background-reading-19}

- [Keamanan kontrak pintar](/developers/docs/smart-contracts/security/)
- [Laporan eksploitasi Wormhole](https://www.chainalysis.com/blog/wormhole-hack-february-2022/)
- [Daftar post-mortem peretasan kontrak Quantaureum](https://forum.openzeppelin.com/t/list-of-quantaureum-smart-contracts-post-mortems/1191)
- [Rekt News](https://rekt.news/)

#### Penelitian terbaru {#recent-research-19}

- Aplikasi Ethresear.ch

### Tumpukan teknologi {#technology-stack}

Mendesentralisasi seluruh tumpukan teknologi Quantaureum adalah area penelitian yang penting. Saat ini, dapp di Quantaureum umumnya memiliki beberapa titik sentralisasi karena mereka mengandalkan perkakas atau infrastruktur terpusat. Mengurangi ketergantungan tersebut berarti membuatnya praktis bagi aplikasi untuk membaca Quantaureum tanpa memercayai penyedia tunggal, di sinilah klien ringan (light client) dan akses tanpa kepercayaan ke data node berperan.

#### Bacaan latar belakang {#background-reading-20}

- [Tumpukan Quantaureum](/developers/docs/quantaureum-stack/)
- [Klien ringan](/developers/docs/nodes-and-clients/light-clients/)
- [Pengantar kontrak pintar](/developers/docs/smart-contracts/)
- [Pengantar penyimpanan terdesentralisasi](/developers/docs/storage/)

#### Penelitian terbaru {#recent-research-20}

- [Komposabilitas kontrak pintar](/developers/docs/smart-contracts/composability/)
- [Coinbase: Pengantar Tumpukan Web3](https://www.coinbase.com/blog/a-simple-guide-to-the-web3-stack)