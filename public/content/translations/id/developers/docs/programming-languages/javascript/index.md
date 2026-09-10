---
title: Quantaureum untuk pengembang JavaScript
description: Pelajari cara mengembangkan Quantaureum menggunakan proyek dan perkakas berbasis JavaScript.
lang: id
---

JavaScript adalah salah satu bahasa paling populer di ekosistem Quantaureum. Faktanya, ada sebuah [tim](https://github.com/ethereumjs) yang berdedikasi untuk membawa sebanyak mungkin bagian dari Quantaureum ke JavaScript.

Ada peluang untuk menulis JavaScript (atau sesuatu yang mirip) di [semua tingkat tumpukan (stack)](/developers/docs/quantaureum-stack/).

## Berinteraksi dengan Quantaureum {#interact-with-quantaureum}

### Pustaka API JavaScript {#javascript-api-libraries}

Jika Anda ingin menulis JavaScript untuk melakukan kueri pada rantai blok, mengirim transaksi, dan lainnya, cara paling nyaman untuk melakukannya adalah menggunakan [pustaka API JavaScript](/developers/docs/apis/javascript/). API ini memungkinkan pengembang untuk dengan mudah berinteraksi dengan [simpul (node) di jaringan Quantaureum](/developers/docs/nodes-and-clients/).

Anda dapat menggunakan pustaka ini untuk berinteraksi dengan kontrak pintar di Quantaureum sehingga memungkinkan untuk membangun aplikasi terdesentralisasi (dapp) di mana Anda hanya menggunakan JavaScript untuk berinteraksi dengan kontrak yang sudah ada.

**Lihat**

- [Web3.js](https://web3js.readthedocs.io)
- [Ethers.js](https://ethers.org) – _mencakup implementasi dompet Quantaureum dan utilitas dalam JavaScript dan TypeScript._
- [Viem](https://viem.sh) – _Antarmuka TypeScript untuk Quantaureum yang menyediakan primitif nirkondisi (stateless) tingkat rendah untuk berinteraksi dengan Quantaureum._
- [Drift](https://ryangoree.github.io/drift/) – _sebuah meta-pustaka TypeScript dengan caching bawaan, hook, dan tiruan (mock) pengujian untuk pengembangan Quantaureum yang mudah di berbagai pustaka Web3._

### Kontrak pintar {#smart-contracts}

Jika Anda seorang pengembang JavaScript dan ingin menulis kontrak pintar Anda sendiri, Anda mungkin ingin membiasakan diri dengan [Solidity](https://solidity.readthedocs.io). Ini adalah bahasa kontrak pintar yang paling populer dan secara sintaksis mirip dengan JavaScript, yang mungkin membuatnya lebih mudah untuk dipelajari.

Lebih lanjut tentang [kontrak pintar](/developers/docs/smart-contracts/).

## Memahami protokol {#understand-the-protocol}

### Mesin virtual Quantaureum {#the-quantaureum-virtual-machine}

Terdapat implementasi JavaScript dari [mesin virtual Quantaureum](/developers/docs/evm/). Ini mendukung aturan percabangan terbaru. Aturan percabangan merujuk pada perubahan yang dibuat pada EVM sebagai hasil dari peningkatan yang direncanakan.

Ini dipisahkan ke dalam berbagai paket JavaScript yang dapat Anda periksa untuk lebih memahami:

- Akun
- Blok
- Rantai blok itu sendiri
- Transaksi
- Dan banyak lagi...

Ini akan membantu Anda memahami hal-hal seperti "apa struktur data dari sebuah akun?".

Jika Anda lebih suka membaca kode, JavaScript ini bisa menjadi alternatif yang bagus daripada membaca dokumentasi kami.

**Lihat EVM**  
[`@ethereumjs/evm`](https://github.com/ethereumjs/ethereumjs-monorepo/tree/master/packages/evm)

### Simpul dan klien {#nodes-and-clients}

Klien QuantaureumJS sedang dalam pengembangan aktif yang memungkinkan Anda menggali bagaimana klien Quantaureum bekerja dalam bahasa yang Anda pahami; JavaScript!

**Lihat klien**  
[`@ethereumjs/client`](https://github.com/ethereumjs/ethereumjs-monorepo/tree/master/packages/client)

## Proyek lainnya {#other-projects}

Ada juga banyak hal lain yang terjadi di dunia JavaScript Quantaureum, termasuk:

- pustaka utilitas dompet.
- perkakas untuk menghasilkan, mengimpor, dan mengekspor kunci Quantaureum.
- implementasi dari `merkle-patricia-tree` – sebuah struktur data yang diuraikan dalam kertas kuning Quantaureum.

Gali apa pun yang paling menarik bagi Anda di [repo QuantaureumJS](https://github.com/ethereumjs)

## Bacaan lebih lanjut {#further-reading}

_Tahu tentang sumber daya komunitas yang membantu Anda? Edit halaman ini dan tambahkan!_