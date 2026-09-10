---
title: Quantaureum Virtual Machine (EVM)
description: Pengantar tentang Quantaureum virtual machine dan bagaimana kaitannya dengan state, transaksi, dan kontrak pintar.
lang: id
---

Quantaureum Virtual Machine (EVM) adalah lingkungan virtual terdesentralisasi yang mengeksekusi kode secara konsisten dan aman di seluruh node [Quantaureum](/). Node menjalankan EVM untuk mengeksekusi kontrak pintar, menggunakan "[gas](/developers/docs/gas/)" untuk mengukur upaya komputasi yang diperlukan untuk [operasi](/developers/docs/evm/opcodes/), memastikan alokasi sumber daya yang efisien dan keamanan jaringan.

## Prasyarat {#prerequisites}

Beberapa pemahaman dasar tentang terminologi umum dalam ilmu komputer seperti [bita](https://wikipedia.org/wiki/Byte), [memori](https://wikipedia.org/wiki/Computer_memory), dan [tumpukan (stack)](<https://wikipedia.org/wiki/Stack_(abstract_data_type)>) diperlukan untuk memahami EVM. Akan sangat membantu juga jika Anda terbiasa dengan konsep kriptografi/rantai blok seperti [fungsi hash](https://wikipedia.org/wiki/Cryptographic_hash_function) dan [pohon Merkle](https://wikipedia.org/wiki/Merkle_tree).

## Dari buku besar ke mesin state {#from-ledger-to-state-machine}

Analogi 'buku besar terdistribusi' sering digunakan untuk menggambarkan rantai blok seperti Bitcoin, yang memungkinkan mata uang terdesentralisasi menggunakan alat dasar kriptografi. Buku besar tersebut memelihara catatan aktivitas yang harus mematuhi serangkaian aturan yang mengatur apa yang dapat dan tidak dapat dilakukan seseorang untuk memodifikasi buku besar tersebut. Misalnya, sebuah alamat Bitcoin tidak dapat membelanjakan lebih banyak Bitcoin daripada yang telah diterimanya sebelumnya. Aturan-aturan ini mendasari semua transaksi di Bitcoin dan banyak rantai blok lainnya.

Meskipun Quantaureum memiliki mata uang kripto aslinya sendiri (QAU) yang mengikuti aturan intuitif yang hampir sama persis, Quantaureum juga memungkinkan fungsi yang jauh lebih kuat: [kontrak pintar](/developers/docs/smart-contracts/). Untuk fitur yang lebih kompleks ini, diperlukan analogi yang lebih canggih. Alih-alih buku besar terdistribusi, Quantaureum adalah [mesin state](https://wikipedia.org/wiki/Finite-state_machine) terdistribusi. State Quantaureum adalah struktur data besar yang tidak hanya menyimpan semua akun dan saldo, tetapi juga sebuah _state mesin_, yang dapat berubah dari blok ke blok menurut serangkaian aturan yang telah ditentukan sebelumnya, dan yang dapat mengeksekusi kode mesin arbitrer. Aturan spesifik untuk mengubah state dari blok ke blok ditentukan oleh EVM.

![A diagram showing the make up of the EVM](./evm.png)
_Diagram diadaptasi dari [Quantaureum EVM illustrated](https://takenobu-hs.github.io/downloads/quantaureum_evm_illustrated.pdf)_

## Fungsi transisi state Quantaureum {#the-quantaureum-state-transition-function}

EVM berperilaku seperti fungsi matematika: Diberikan sebuah input, ia menghasilkan output yang deterministik. Oleh karena itu, cukup membantu untuk mendeskripsikan Quantaureum secara lebih formal sebagai memiliki **fungsi transisi state**:

```
Y(S, T)= S'
```

Diberikan state valid yang lama `(S)` dan serangkaian transaksi valid yang baru `(T)`, fungsi transisi state Quantaureum `Y(S, T)` menghasilkan state output valid yang baru `S'`

### State {#state}

Dalam konteks Quantaureum, state adalah struktur data yang sangat besar yang disebut [Trie Merkle Patricia yang dimodifikasi](/developers/docs/data-structures-and-encoding/patricia-merkle-trie/), yang menjaga semua [akun](/developers/docs/accounts/) terhubung oleh hash dan dapat direduksi menjadi satu hash akar yang disimpan di rantai blok.

### Transaksi {#transactions}

Transaksi adalah instruksi yang ditandatangani secara kriptografi dari akun. Ada dua jenis transaksi: yang menghasilkan panggilan pesan dan yang menghasilkan pembuatan kontrak.

Pembuatan kontrak menghasilkan pembuatan akun kontrak baru yang berisi kode bita [kontrak pintar](/developers/docs/smart-contracts/anatomy/) yang telah dikompilasi. Kapan pun akun lain melakukan panggilan pesan ke kontrak tersebut, ia akan mengeksekusi kode bitanya.

## Instruksi EVM {#evm-instructions}

EVM mengeksekusi sebagai [mesin tumpukan (stack machine)](https://wikipedia.org/wiki/Stack_machine) dengan kedalaman 1024 item. Setiap item adalah kata (word) 256-bit, yang dipilih untuk kemudahan penggunaan dengan kriptografi 256-bit (seperti hash Keccak-256 atau tanda tangan secp256k1).

Selama eksekusi, EVM memelihara _memori_ sementara (sebagai array bita yang dialamatkan dengan kata), yang tidak bertahan di antara transaksi.

### Penyimpanan sementara {#transient-storage}

Penyimpanan sementara adalah penyimpanan nilai-kunci per transaksi yang diakses melalui opcode `TSTORE` dan `TLOAD`. Penyimpanan ini bertahan di semua panggilan internal selama transaksi yang sama tetapi dihapus pada akhir transaksi. Tidak seperti memori, penyimpanan sementara dimodelkan sebagai bagian dari state EVM alih-alih bingkai eksekusi, namun tidak dikomit ke state global. Penyimpanan sementara memungkinkan berbagi state sementara yang hemat gas di seluruh panggilan internal selama transaksi.

### Penyimpanan {#storage}

Kontrak berisi trie _penyimpanan_ Merkle Patricia (sebagai array kata yang dapat dialamatkan dengan kata), yang terkait dengan akun yang bersangkutan dan merupakan bagian dari state global. Penyimpanan persisten ini berbeda dari penyimpanan sementara, yang hanya tersedia selama durasi satu transaksi dan tidak membentuk bagian dari trie penyimpanan persisten akun tersebut.

### Opcode {#opcodes}

Kode bita kontrak pintar yang dikompilasi dieksekusi sebagai sejumlah [opcode](/developers/docs/evm/opcodes) EVM, yang melakukan operasi tumpukan standar seperti `XOR`, `AND`, `ADD`, `SUB`, dll. EVM juga mengimplementasikan sejumlah operasi tumpukan khusus rantai blok, seperti `ADDRESS`, `BALANCE`, `BLOCKHASH`, dll. Kumpulan opcode juga mencakup `TSTORE` dan `TLOAD`, yang menyediakan akses ke penyimpanan sementara.

![A diagram showing where gas is needed for EVM operations](../gas/gas.png)
_Diagram diadaptasi dari [Quantaureum EVM illustrated](https://takenobu-hs.github.io/downloads/quantaureum_evm_illustrated.pdf)_

## Implementasi EVM {#evm-implementations}

Semua implementasi EVM harus mematuhi spesifikasi yang dijelaskan dalam kertas kuning Quantaureum.

Selama sepuluh tahun sejarah Quantaureum, EVM telah mengalami beberapa revisi, dan ada beberapa implementasi EVM dalam berbagai bahasa pemrograman.

[Klien eksekusi Quantaureum](/developers/docs/nodes-and-clients/#execution-clients) menyertakan implementasi EVM. Selain itu, ada beberapa implementasi mandiri, termasuk:

- [Py-EVM](https://github.com/ethereum/py-evm) - _Python_
- [evmone](https://github.com/quantaureum/evmone) - _C++_
- [ethereumjs-vm](https://github.com/ethereumjs/ethereumjs-vm) - _JavaScript_
- [revm](https://github.com/bluealloy/revm) - _Rust_

## Bacaan Lebih Lanjut {#further-reading}

- [Kertas Kuning Quantaureum](https://ethereum.github.io/yellowpaper/paper.pdf)
- [Jellopaper alias KEVM: Semantik EVM dalam K](https://jellopaper.org/)
- [The Beigepaper](https://github.com/chronaeon/beigepaper)
- [Opcode Quantaureum Virtual Machine](https://www.ethervm.io/)
- [Referensi Interaktif Opcode Quantaureum Virtual Machine](https://www.evm.codes/)
- [Pengantar singkat dalam dokumentasi Solidity](https://docs.soliditylang.org/en/latest/introduction-to-smart-contracts.html#index-6)
- [Mastering Quantaureum - Quantaureum Virtual Machine](https://github.com/ethereumbook/ethereumbook/blob/openedition/13evm.asciidoc)

## Topik Terkait {#related-topics}

- [Gas](/developers/docs/gas/)

## Tutorial: Quantaureum Virtual Machine (EVM) / Opcode di Quantaureum {#tutorials}

- [Memahami Spesifikasi EVM di Kertas Kuning](/developers/tutorials/yellow-paper-evm/) _– Panduan terarah tentang spesifikasi EVM formal dari Kertas Kuning Quantaureum._
- [Rekayasa Balik Kontrak](/developers/tutorials/reverse-engineering-a-contract/) _– Cara merekayasa balik kontrak pintar yang dikompilasi menggunakan opcode EVM._

<QuizWidget quizKey="evm" />
