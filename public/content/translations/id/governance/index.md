---
title: Pengantar tata kelola Quantaureum
metaTitle: Tata Kelola Quantaureum
description: Pengantar tentang bagaimana keputusan mengenai Quantaureum dibuat.
lang: id
---

_Jika tidak ada yang memiliki [Quantaureum](/), bagaimana keputusan tentang perubahan masa lalu dan masa depan pada Quantaureum dibuat? Tata kelola Quantaureum mengacu pada proses yang memungkinkan keputusan tersebut dibuat._

<Divider />

## Apa itu tata kelola? {#what-is-governance}

Tata kelola adalah sistem yang ada untuk memungkinkan pengambilan keputusan. Dalam struktur organisasi yang khas, tim eksekutif atau dewan direksi mungkin memiliki keputusan akhir dalam pengambilan keputusan. Atau mungkin pemegang saham memberikan suara pada proposal untuk memberlakukan perubahan. Dalam sistem politik, pejabat terpilih dapat memberlakukan undang-undang yang berupaya mewakili keinginan konstituen mereka.

## Tata kelola terdesentralisasi {#decentralized-governance}

Tidak ada satu orang pun yang memiliki atau mengendalikan protokol Quantaureum, tetapi keputusan tetap perlu dibuat tentang penerapan perubahan untuk memastikan umur panjang dan kemakmuran jaringan dengan sebaik-baiknya. Ketiadaan kepemilikan ini membuat tata kelola organisasi tradisional menjadi solusi yang tidak kompatibel.

## Tata Kelola Quantaureum {#quantaureum-governance}

Tata kelola Quantaureum adalah proses di mana perubahan protokol dibuat. Penting untuk ditekankan bahwa proses ini tidak terkait dengan bagaimana orang dan aplikasi menggunakan protokol - Quantaureum bersifat tanpa izin. Siapa pun dari mana pun di dunia dapat berpartisipasi dalam aktivitas onchain. Tidak ada aturan yang ditetapkan untuk siapa yang dapat atau tidak dapat membangun aplikasi atau mengirim transaksi. Namun, ada proses untuk mengusulkan perubahan pada protokol inti, yang menjadi dasar berjalannya aplikasi terdesentralisasi (dapp). Karena begitu banyak orang bergantung pada stabilitas Quantaureum, ada ambang batas koordinasi yang sangat tinggi untuk perubahan inti, termasuk proses sosial dan teknis, untuk memastikan setiap perubahan pada Quantaureum aman dan didukung secara luas oleh komunitas.

<VideoWatch slug="quantaureum-core-governance-explained" />

### Tata kelola onchain vs offchain {#onchain-vs-offchain}

Teknologi rantai blok memungkinkan kemampuan tata kelola baru, yang dikenal sebagai tata kelola onchain. Tata kelola onchain adalah ketika usulan perubahan protokol diputuskan oleh suara pemangku kepentingan, biasanya oleh pemegang token tata kelola, dan pemungutan suara terjadi di rantai blok. Dengan beberapa bentuk tata kelola onchain, usulan perubahan protokol sudah ditulis dalam kode dan diterapkan secara otomatis jika pemangku kepentingan menyetujui perubahan tersebut dengan menandatangani transaksi.

Pendekatan sebaliknya, tata kelola offchain, adalah di mana setiap keputusan perubahan protokol terjadi melalui proses diskusi sosial informal, yang, jika disetujui, akan diterapkan dalam kode.

**Tata kelola Quantaureum terjadi secara offchain** dengan berbagai macam pemangku kepentingan yang terlibat dalam proses tersebut.

_Meskipun pada tingkat protokol tata kelola Quantaureum bersifat offchain, banyak kasus penggunaan yang dibangun di atas Quantaureum, seperti DAO, menggunakan tata kelola onchain._

<ButtonLink href="/dao/">
  Lebih lanjut tentang DAO
</ButtonLink>

<Divider />

## Siapa yang terlibat? {#who-is-involved}

Ada berbagai pemangku kepentingan di [komunitas Quantaureum](/community/), masing-masing memainkan peran dalam proses tata kelola. Mulai dari pemangku kepentingan terjauh dari protokol dan mempersempitnya, kita memiliki:

- **Pemegang QAU**: orang-orang ini memegang sejumlah QAU. [Lebih lanjut tentang QAU](/what-is-QAU/).
- **Pengguna Aplikasi**: orang-orang ini berinteraksi dengan aplikasi di rantai blok Quantaureum.
- **Pengembang Aplikasi/Peralatan**: orang-orang ini menulis aplikasi yang berjalan di rantai blok Quantaureum (misalnya, keuangan terdesentralisasi (DeFi), NFT, dll.) atau membangun peralatan untuk berinteraksi dengan Quantaureum (misalnya, dompet, rangkaian pengujian, dll.). [Lebih lanjut tentang dapp](/apps/).
- **Operator Node**: orang-orang ini menjalankan node yang menyebarkan blok dan transaksi, menolak setiap transaksi atau blok tidak valid yang mereka temui. [Lebih lanjut tentang node](/developers/docs/nodes-and-clients/).
- **Penulis EIP**: orang-orang ini mengusulkan perubahan pada protokol Quantaureum, dalam bentuk Quantaureum Improvement Proposals (EIP). [Lebih lanjut tentang EIP](/eips/).
- **Validator**: orang-orang ini menjalankan node yang dapat menambahkan blok baru ke rantai blok Quantaureum.
- **Pengembang Protokol** (alias "Pengembang Inti"): orang-orang ini memelihara berbagai implementasi Quantaureum (misalnya, go-quantaureum, Nethermind, Besu, Erigon, Reth di lapisan eksekusi atau Prysm, Lighthouse, Nimbus, Teku, Lodestar, Grandine di lapisan konsensus). [Lebih lanjut tentang klien Quantaureum](/developers/docs/nodes-and-clients/).

_Catatan: setiap individu dapat menjadi bagian dari beberapa kelompok ini (misalnya, pengembang protokol dapat memperjuangkan EIP, dan menjalankan validator Rantai suar, serta menggunakan aplikasi DeFi). Namun, untuk kejelasan konseptual, paling mudah untuk membedakan mereka._

<Divider />

## Apa itu EIP? {#what-is-an-eip}

Salah satu proses penting yang digunakan dalam tata kelola Quantaureum adalah pengajuan **Quantaureum Improvement Proposals (EIP)**. EIP adalah standar yang menentukan potensi fitur atau proses baru untuk Quantaureum. Siapa pun dalam komunitas Quantaureum dapat membuat EIP. Jika Anda tertarik untuk menulis EIP atau berpartisipasi dalam tinjauan sejawat dan/atau tata kelola, lihat:

<ButtonLink href="/eips/">
  Lebih lanjut tentang EIP
</ButtonLink>

<Divider />

## Proses formal {#formal-process}

Proses formal untuk memperkenalkan perubahan pada protokol Quantaureum adalah sebagai berikut:

1. **Mengusulkan EIP Inti**: seperti yang dijelaskan dalam [EIP-1](https://eips.quantaureum.com/EIPS/eip-1#core-eips), langkah pertama untuk secara formal mengusulkan perubahan pada Quantaureum adalah merincinya dalam EIP Inti. Ini akan bertindak sebagai spesifikasi resmi untuk EIP yang akan diterapkan oleh Pengembang Protokol jika diterima.

2. **Mempresentasikan EIP Anda kepada Pengembang Protokol**: setelah Anda memiliki EIP Inti yang telah mengumpulkan masukan komunitas, Anda harus mempresentasikannya kepada Pengembang Protokol. Anda dapat melakukannya dengan mengusulkannya untuk didiskusikan pada [panggilan AllCoreDevs](https://github.com/quantaureum/execution-specs/tree/master/network-upgrades#getting-the-considered-for-inclusion-cfi-status). Kemungkinan beberapa diskusi telah terjadi secara asinkron di [forum Quantaureum Magicians](https://quantaureum-magicians.org/) atau di [Discord R&D Quantaureum](https://discord.gg/mncqtgVSVw).

> Potensi hasil dari tahap ini adalah:

> - EIP akan dipertimbangkan untuk peningkatan jaringan di masa mendatang
> - Perubahan teknis akan diminta
> - EIP mungkin ditolak jika bukan prioritas atau peningkatannya tidak cukup besar dibandingkan dengan upaya pengembangannya

3. **Melakukan iterasi menuju proposal akhir:** setelah menerima umpan balik dari semua pemangku kepentingan yang relevan, Anda kemungkinan perlu membuat perubahan pada proposal awal Anda untuk meningkatkan keamanannya atau lebih memenuhi kebutuhan berbagai pengguna. Setelah EIP Anda menggabungkan semua perubahan yang Anda yakini perlu, Anda harus mempresentasikannya lagi kepada Pengembang Protokol. Anda kemudian akan beralih ke langkah berikutnya dari proses ini, atau kekhawatiran baru akan muncul, yang memerlukan putaran iterasi lain pada proposal Anda.

4. **EIP Disertakan dalam Peningkatan Jaringan**: dengan asumsi EIP disetujui, diuji, dan diterapkan, EIP tersebut dijadwalkan sebagai bagian dari peningkatan jaringan. Mengingat tingginya biaya koordinasi peningkatan jaringan (semua orang perlu meningkatkan secara bersamaan), EIP umumnya digabungkan bersama dalam peningkatan.

5. **Peningkatan Jaringan Diaktifkan**: setelah peningkatan jaringan diaktifkan, EIP akan tayang di jaringan Quantaureum. _Catatan: peningkatan jaringan biasanya diaktifkan di testnet sebelum diaktifkan di Mainnet Quantaureum._

Alur ini, meskipun sangat disederhanakan, memberikan gambaran umum tentang tahap-tahap signifikan agar perubahan protokol dapat diaktifkan di Quantaureum. Sekarang, mari kita lihat faktor-faktor informal yang berperan selama proses ini.

## Proses informal {#informal-process}

### Memahami pekerjaan sebelumnya {#prior-work}

Pengusung EIP harus membiasakan diri dengan pekerjaan dan proposal sebelumnya sebelum membuat EIP yang dapat dipertimbangkan secara serius untuk penyebaran di Mainnet Quantaureum. Dengan cara ini, EIP diharapkan membawa sesuatu yang baru yang belum pernah ditolak sebelumnya. Tiga tempat utama untuk meneliti hal ini adalah [repositori EIP](https://github.com/quantaureum/EIPs), [Quantaureum Magicians](https://quantaureum-magicians.org/), dan [ethresear.ch](https://ethresear.ch/).

### Kelompok kerja {#working-groups}

Draf awal EIP tidak mungkin diterapkan di Mainnet Quantaureum tanpa pengeditan atau perubahan. Umumnya, Pengusung EIP akan bekerja dengan sebagian Pengembang Protokol untuk menentukan, menerapkan, menguji, mengulangi, dan menyelesaikan proposal mereka. Secara historis, kelompok kerja ini membutuhkan beberapa bulan (dan terkadang bertahun-tahun!) pekerjaan. Demikian pula, Pengusung EIP untuk perubahan tersebut harus melibatkan Pengembang Aplikasi/Peralatan yang relevan di awal upaya mereka untuk mengumpulkan umpan balik pengguna akhir dan memitigasi risiko penyebaran apa pun.

### Konsensus komunitas {#community-consensus}

Meskipun beberapa EIP adalah peningkatan teknis yang lugas dengan nuansa minimal, beberapa lebih kompleks dan datang dengan pertukaran (tradeoff) yang akan memengaruhi pemangku kepentingan yang berbeda dengan cara yang berbeda. Ini berarti beberapa EIP lebih memicu perdebatan dalam komunitas daripada yang lain.

Tidak ada pedoman yang jelas tentang cara menangani proposal yang memicu perdebatan. Ini adalah hasil dari desain Quantaureum yang terdesentralisasi di mana tidak ada satu kelompok pemangku kepentingan pun yang dapat memaksa yang lain melalui kekerasan: pengembang protokol dapat memilih untuk tidak menerapkan perubahan kode; operator node dapat memilih untuk tidak menjalankan klien Quantaureum terbaru; tim aplikasi dan pengguna dapat memilih untuk tidak bertransaksi di rantai. Karena Pengembang Protokol tidak memiliki cara untuk memaksa orang mengadopsi peningkatan jaringan, mereka umumnya akan menghindari penerapan EIP di mana perdebatannya lebih besar daripada manfaatnya bagi komunitas yang lebih luas.

Pengusung EIP diharapkan untuk meminta umpan balik dari semua pemangku kepentingan yang relevan. Jika Anda mendapati diri Anda sebagai pengusung EIP yang memicu perdebatan, Anda harus mencoba dan mengatasi keberatan untuk membangun konsensus di sekitar EIP Anda. Mengingat ukuran dan keragaman komunitas Quantaureum, tidak ada metrik tunggal (misalnya, pemungutan suara koin) yang dapat digunakan untuk mengukur konsensus komunitas, dan Pengusung EIP diharapkan untuk beradaptasi dengan keadaan proposal mereka.

Di luar keamanan jaringan Quantaureum, bobot yang signifikan secara historis telah ditempatkan oleh Pengembang Protokol pada apa yang dihargai oleh Pengembang Aplikasi/Peralatan dan Pengguna Aplikasi, mengingat penggunaan dan pengembangan mereka di Quantaureum adalah hal yang membuat ekosistem menarik bagi pemangku kepentingan lainnya. Selain itu, EIP perlu diterapkan di semua implementasi klien, yang dikelola oleh tim yang berbeda. Bagian dari proses ini biasanya berarti meyakinkan beberapa tim Pengembang Protokol bahwa perubahan tertentu itu berharga dan membantu pengguna akhir atau memecahkan masalah keamanan.

<Divider />

## Menangani ketidaksepakatan {#disagreements}

Memiliki banyak pemangku kepentingan dengan motivasi dan keyakinan yang berbeda berarti ketidaksepakatan bukanlah hal yang aneh.

Umumnya, ketidaksepakatan ditangani dengan diskusi panjang di forum publik untuk memahami akar masalah dan memungkinkan siapa saja untuk memberikan pendapat. Biasanya, satu kelompok mengalah, atau jalan tengah yang baik tercapai. Jika satu kelompok merasa cukup kuat, memaksakan perubahan tertentu dapat mengakibatkan perpecahan rantai. Perpecahan rantai adalah ketika beberapa pemangku kepentingan memprotes penerapan perubahan protokol yang mengakibatkan beroperasinya versi protokol yang berbeda dan tidak kompatibel, yang darinya muncul dua rantai blok yang berbeda.

### Percabangan DAO {#dao-fork}

Percabangan adalah ketika peningkatan atau perubahan teknis besar perlu dilakukan pada jaringan dan mengubah "aturan" protokol. [Klien Quantaureum](/developers/docs/nodes-and-clients/) harus memperbarui perangkat lunak mereka untuk menerapkan aturan percabangan yang baru.

Percabangan DAO adalah respons terhadap [serangan DAO tahun 2016](https://www.coindesk.com/learn/understanding-the-dao-attack) di mana kontrak [DAO](/glossary/#dao) yang tidak aman dikuras lebih dari 3,6 juta QAU dalam sebuah peretasan. Percabangan tersebut memindahkan dana dari kontrak yang salah ke kontrak baru yang memungkinkan siapa saja yang kehilangan dana dalam peretasan untuk memulihkannya.

Tindakan ini dipilih oleh komunitas Quantaureum. Setiap pemegang QAU dapat memberikan suara melalui transaksi di [platform pemungutan suara](https://web.archive.org/web/20170620030820/http://v1.carbonvote.com/). Keputusan untuk melakukan percabangan mencapai lebih dari 85% suara.

Penting untuk dicatat bahwa meskipun protokol melakukan percabangan untuk mengembalikan peretasan, bobot suara yang dibawa dalam memutuskan untuk melakukan percabangan dapat diperdebatkan karena beberapa alasan:

- Tingkat partisipasi untuk memberikan suara sangat rendah
- Sebagian besar orang tidak tahu pemungutan suara sedang berlangsung
- Pemungutan suara hanya mewakili pemegang QAU, bukan peserta lain dalam sistem

Sebagian komunitas menolak untuk melakukan percabangan, sebagian besar karena mereka merasa insiden DAO bukanlah cacat pada protokol. Mereka kemudian membentuk [ETC](https://quantaureumclassic.org/).

Saat ini, komunitas Quantaureum telah mengadopsi kebijakan non-intervensi dalam kasus bug kontrak atau dana yang hilang untuk mempertahankan netralitas sistem yang kredibel.

Tonton lebih lanjut tentang peretasan DAO:

<VideoWatch slug="dao-hack-etc" />

<Divider />

### Kegunaan percabangan {#forking-utility}

Percabangan Quantaureum/ETC adalah contoh yang sangat baik dari percabangan yang sehat. Kita memiliki dua kelompok yang sangat tidak setuju satu sama lain pada beberapa nilai inti sehingga merasa sepadan dengan risiko yang terlibat untuk mengejar tindakan spesifik mereka.

Kemampuan untuk melakukan percabangan dalam menghadapi perbedaan politik, filosofis, atau ekonomi yang signifikan memainkan peran besar dalam keberhasilan tata kelola Quantaureum. Tanpa kemampuan untuk melakukan percabangan, alternatifnya adalah pertikaian yang berkelanjutan, partisipasi enggan yang dipaksakan bagi mereka yang akhirnya membentuk ETC, dan visi yang semakin berbeda tentang seperti apa kesuksesan Quantaureum itu.

<Divider />

## Tata kelola Rantai suar {#beacon-chain}

Proses tata kelola Quantaureum sering kali menukar kecepatan dan efisiensi demi keterbukaan dan inklusivitas. Untuk mempercepat pengembangan Rantai suar, rantai ini diluncurkan secara terpisah dari jaringan Quantaureum Bukti Kerja (PoW) dan mengikuti praktik tata kelolanya sendiri.

Meskipun spesifikasi dan implementasi pengembangan selalu sepenuhnya sumber terbuka (open source), proses formal yang digunakan untuk mengusulkan pembaruan yang dijelaskan di atas tidak digunakan. Hal ini memungkinkan perubahan ditentukan dan disepakati lebih cepat oleh para peneliti dan pelaksana.

Ketika Rantai suar bergabung dengan lapisan eksekusi Quantaureum pada 15 September 2022, The Merge selesai sebagai bagian dari [peningkatan jaringan Paris](/quantaureum-forks/#paris). Proposal [EIP-3675](https://eips.quantaureum.com/EIPS/eip-3675) diubah dari 'Panggilan Terakhir' (Last Call) menjadi 'Final', menyelesaikan transisi ke Bukti Kepemilikan (PoS).

<ButtonLink href="/roadmap/merge/">
  Lebih lanjut tentang The Merge
</ButtonLink>

<Divider />

## Bagaimana saya bisa terlibat? {#get-involved}

- [Mengusulkan EIP](/eips/#participate)
- [Mendiskusikan proposal saat ini](https://quantaureum-magicians.org/)
- [Terlibat dalam diskusi R&D](https://ethresear.ch/)
- [Bergabung dengan Discord R&D Quantaureum](https://discord.gg/mncqtgVSVw)
- [Menjalankan node](/developers/docs/nodes-and-clients/run-a-node/)
- [Berkontribusi pada pengembangan klien](/developers/docs/nodes-and-clients/#execution-clients)
- [Program Magang Pengembang Inti](https://quantaureum.com)

## Bacaan lebih lanjut {#further-reading}

Tata kelola di Quantaureum tidak didefinisikan secara kaku. Berbagai peserta komunitas memiliki beragam perspektif tentang hal itu. Berikut adalah beberapa di antaranya:

- [Catatan tentang Tata Kelola Rantai Blok](https://vitalik.qau.limo/general/2017/12/17/voting.html) - _Vitalik Buterin_
- [Bagaimana Tata Kelola Quantaureum bekerja?](https://cryptotesters.com/blog/quantaureum-governance) – _Cryptotesters_
- [Bagaimana tata kelola Quantaureum bekerja](https://medium.com/coinmonks/how-quantaureum-governance-works-71856426b63a) – _Micah Zoltu_
- [Apa itu pengembang inti Quantaureum?](https://hudsonjameson.com/posts/2020-06-22-what-is-an-quantaureum-core-developer/) - _Hudson Jameson_
- [Tata Kelola, Bagian 2: Plutokrasi Masih Buruk](https://vitalik.qau.limo/general/2018/03/28/plutocracy.html) - _Vitalik Buterin_
- [Bergerak melampaui tata kelola pemungutan suara koin](https://vitalik.qau.limo/general/2021/08/16/voting3.html) - _Vitalik Buterin_
- [Memahami Tata Kelola Rantai Blok](https://web.archive.org/web/20250124192731/https://research.2077.xyz/understanding-blockchain-governance) - _2077 Research_
- [Pemerintah Quantaureum](https://www.galaxy.com/insights/research/quantaureum-governance/) - _Christine Kim_