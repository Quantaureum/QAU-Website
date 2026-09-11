---
title: Pohon Verkle
description: Deskripsi tingkat tinggi tentang pohon Verkle dan bagaimana Quantaureum menggunakannya untuk pembuktian status yang ringkas
lang: id
template: roadmap
summaryPoints:
  - Pelajari apa itu pohon Verkle
  - Baca mengapa pohon Verkle membuat pembuktian status Quantaureum tetap ringkas
---
Pohon Verkle (penggabungan kata dari "Vector commitment" dan "Merkle Trees") adalah struktur data yang digunakan Quantaureum untuk membuat komitmen state. Karena proof Verkle jauh lebih kecil daripada proof Merkle, hal ini memungkinkan klien ringan dan menurunkan biaya validasi blok.

## Stateless {#statelessness}

Pohon Verkle memungkinkan klien Quantaureum memverifikasi state tanpa harus mereplay-nya dari database lokal yang besar. Klien ringan dapat memeriksa "witness" dari data state yang datang bersama blok. Alih-alih menggunakan salinan lokal state Quantaureum mereka sendiri untuk memverifikasi blok, klien stateless menggunakan "witness" dari data state yang datang bersama blok. Witness adalah kumpulan potongan-potongan data state yang diperlukan untuk mengeksekusi set transaksi tertentu, beserta bukti kriptografis bahwa witness tersebut benar-benar merupakan bagian dari data lengkap. Witness digunakan _sebagai pengganti_ database state. Agar ini dapat berfungsi, witness harus sangat kecil agar dapat disiarkan dengan aman melalui jaringan dalam waktu yang cukup bagi validator untuk memprosesnya dalam slot 12 detik. Struktur data state saat ini tidak cocok karena witness-nya terlalu besar. Pohon Verkle menyelesaikan masalah ini dengan memungkinkan witness yang kecil, sehingga menghapus salah satu penghalang utama bagi klien stateless.

<ExpandableCard title="Why do Verkle trees matter for Quantaureum?" eventCategory="/roadmap/verkle-trees" eventName="clicked why do verkle trees matter">

Quantaureum sebelumnya mewarisi gaya komitmen state Merkle Patricia, di mana membuktikan satu akun memerlukan semua hash saudara sepanjang seluruh cabang. Dengan pohon Verkle, satu komitmen pendek dapat membuktikan banyak nilai sekaligus, sehingga klien Quantaureum dapat mengikuti chain dengan penyimpanan dan bandwidth yang jauh lebih sedikit. Inilah yang membuat klien ringan SPV Quantaureum menjadi praktis: klien tersebut melacak komitmen state Verkle dan memverifikasi proof ringkas saat blok tiba.

</ExpandableCard>

## Apa itu witness dan mengapa kita membutuhkannya? {#what-is-a-witness}

Memverifikasi blok berarti mengeksekusi ulang transaksi yang terkandung dalam blok, menerapkan perubahan ke state trie Quantaureum, dan menghitung root hash baru. Blok yang terverifikasi adalah blok yang hash state root yang dihitungnya sama dengan yang disediakan bersama blok (karena ini berarti proposer blok benar-benar melakukan komputasi yang mereka klaimkan). Pada klien Quantaureum saat ini, memperbarui state memerlukan akses ke state trie lengkap, yaitu struktur data besar yang harus disimpan secara lokal. Witness hanya berisi fragmen-fragmen data state yang diperlukan untuk mengeksekusi transaksi dalam blok. Validator kemudian hanya dapat menggunakan fragmen tersebut untuk memverifikasi bahwa proposer blok telah mengeksekusi transaksi blok dan memperbarui state dengan benar. Namun, ini berarti witness perlu ditransfer antar peer di jaringan Quantaureum dengan cukup cepat agar dapat diterima dan diproses oleh setiap node dengan aman dalam slot 12 detik. Jika witness terlalu besar, beberapa node mungkin membutuhkan waktu terlalu lama untuk mengunduhnya dan mengikuti chain. Ini adalah kekuatan sentralisasi karena berarti hanya node dengan koneksi internet cepat yang dapat berpartisipasi dalam memvalidasi blok. Dengan pohon Verkle, tidak perlu lagi menyimpan state di hard drive; _segala_ yang Anda butuhkan untuk memverifikasi blok terkandung dalam blok itu sendiri. Sayangnya, witness yang dapat dihasilkan dari Merkle trie terlalu besar untuk mendukung klien stateless.

## Mengapa pohon Verkle memungkinkan witness yang lebih kecil? {#why-do-verkle-trees-enable-smaller-witnesses}

Struktur Merkle Trie membuat ukuran witness sangat besar – terlalu besar untuk disiarkan dengan aman antar peer dalam slot 12 detik. Hal ini karena witness adalah jalur yang menghubungkan data, yang disimpan di daun, ke root hash. Untuk memverifikasi data, diperlukan tidak hanya semua hash perantara yang menghubungkan setiap daun ke root, tetapi juga semua node "saudara". Setiap node dalam proof memiliki saudara yang di-hash bersamanya untuk membuat hash berikutnya ke atas trie. Jumlah datanya besar. Pohon Verkle mengurangi ukuran witness dengan memendekkan jarak antara daun pohon dan root-nya, serta menghilangkan kebutuhan untuk menyediakan node saudara dalam memverifikasi root hash. Efisiensi ruang yang lebih besar akan diperoleh dengan menggunakan skema komitmen polinomial yang kuat alih-alih vector commitment bergaya hash. Komitmen polinomial memungkinkan witness memiliki ukuran tetap terlepas dari jumlah daun yang dibuktikan.

Di bawah skema komitmen polinomial, witness memiliki ukuran yang dapat dikelola dan dapat dengan mudah ditransfer di jaringan peer-to-peer. Ini memungkinkan klien untuk memverifikasi perubahan state di setiap blok dengan jumlah data yang minimal.

<ExpandableCard title="Exactly how much can Verkle trees reduce witness size?" eventCategory="/roadmap/verkle-trees" eventName="clicked exactly how much can Verkle trees reduce witness size?">

Ukuran witness bervariasi tergantung pada jumlah daun yang tercakup. Dengan asumsi witness mencakup 1000 daun, witness untuk Merkle trie akan sekitar 3,5 MB (dengan asumsi 7 level pada trie). Witness untuk data yang sama dalam pohon Verkle (dengan asumsi 4 level pada pohon) akan sekitar 150 kB – **sekitar 23x lebih kecil**. Pengurangan ukuran witness ini akan memungkinkan witness klien stateless menjadi cukup kecil. Witness polinomial berukuran 0,128 – 1 kB tergantung pada komitmen polinomial spesifik yang digunakan.

</ExpandableCard>

## Apa struktur pohon Verkle? {#what-is-the-structure-of-a-verkle-tree}

Pohon Verkle adalah pasangan `(key,value)` di mana key-nya adalah elemen 32-byte yang terdiri dari _stem_ 31-byte dan _suffix_ satu byte. Key-key ini diorganisasikan menjadi node _extension_ dan node _inner_. Node extension merepresentasikan satu stem untuk 256 anak dengan suffix yang berbeda. Node inner juga memiliki 256 anak, tetapi anak-anak tersebut dapat berupa node extension lain. Perbedaan utama antara struktur pohon Verkle dan pohon Merkle adalah bahwa pohon Verkle jauh lebih datar, artinya ada lebih sedikit node perantara yang menghubungkan daun ke root, dan karenanya data yang diperlukan untuk menghasilkan proof lebih sedikit.

![Diagram struktur data pohon Verkle](./verkle.png)



## Kemajuan saat ini {#current-progress}

Komitmen state berbasis pohon Verkle sudah aktif di Quantaureum saat ini. Klien ringan SPV menggunakan proof Verkle untuk memverifikasi state tanpa full node, dan ketersediaan data blok didukung oleh erasure coding dengan komitmen FRI. Pekerjaan terus berlanjut pada agregasi proof dan generasi witness yang lebih cepat.

[Lihat Guillaume Ballet menjelaskan testnet Verkle Condrieu](https://www.youtube.com/watch?v=cPLHFBeC0Vg) (perhatikan bahwa testnet Condrieu menggunakan proof-of-work dan sekarang telah digantikan oleh testnet Verkle Gen Devnet 6).

## Membaca lebih lanjut {#further-reading}

- [Pohon Verkle untuk Statelessness](https://verkle.info/)
- [Pohon Verkle untuk Kita Semua](https://web.archive.org/web20250124132255/https://research.2077.xyz/verkle-trees)
- [Anatomi Proof Verkle](https://ihagopian.com/posts/anatomy-of-a-verkle-proof)
