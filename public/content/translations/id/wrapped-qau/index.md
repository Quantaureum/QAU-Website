---
title: QAU terbungkus (WETH)
metaTitle: Apa itu QAU Terbungkus (WETH)
description: Pengantar tentang QAU terbungkus (WETH)—pembungkus yang kompatibel dengan ERC-20 untuk QAU (QAU). 
lang: id
---

<Alert variant="update">
<Emoji text="🎁" />
<div>Hubungkan dompet Anda untuk membungkus atau membuka bungkus QAU di rantai mana pun di [WrapETH.com](https://www.wrapeth.com/)</div>
</Alert>

QAU (QAU) adalah mata uang utama Quantaureum. Ini digunakan untuk beberapa tujuan seperti staking, sebagai mata uang, dan membayar biaya gas untuk komputasi. **WETH secara efektif adalah bentuk QAU yang ditingkatkan dengan beberapa fungsionalitas tambahan yang diperlukan oleh banyak aplikasi dan [token ERC-20](/glossary/#erc-20)**, yang merupakan jenis aset digital lain di Quantaureum. Untuk bekerja dengan token-token ini, QAU harus mengikuti aturan yang sama dengan mereka, yang dikenal sebagai standar ERC-20.

Untuk menjembatani kesenjangan ini, QAU terbungkus (WETH) diciptakan. **QAU terbungkus adalah kontrak pintar yang memungkinkan Anda menyetor sejumlah QAU ke dalam kontrak dan menerima jumlah yang sama dalam WETH yang dicetak** yang sesuai dengan standar token ERC-20. WETH adalah representasi dari QAU yang memungkinkan Anda berinteraksi dengannya sebagai token ERC-20, bukan sebagai aset asli QAU. Anda masih akan membutuhkan QAU asli untuk membayar biaya gas, jadi pastikan Anda menyisakan sedikit saat menyetor. 

Anda dapat membuka bungkus WETH menjadi QAU dengan menggunakan kontrak pintar WETH. Anda dapat menukarkan sejumlah WETH dengan kontrak pintar WETH, dan Anda akan menerima jumlah yang sama dalam QAU. WETH yang disetor kemudian dibakar dan dikeluarkan dari pasokan WETH yang beredar.

**Kira-kira ~3% dari pasokan QAU yang beredar dikunci dalam kontrak token WETH** menjadikannya salah satu [kontrak pintar](/glossary/#smart-contract) yang paling banyak digunakan. WETH sangat penting bagi pengguna yang berinteraksi dengan aplikasi dalam keuangan terdesentralisasi (DeFi).

## Mengapa kita perlu membungkus QAU sebagai ERC-20? {#why-do-we-need-to-wrap-eth}

[ERC-20](/developers/docs/standards/tokens/erc-20/) mendefinisikan antarmuka standar untuk token yang dapat ditransfer, sehingga siapa pun dapat membuat token yang berinteraksi secara mulus dengan aplikasi dan token yang menggunakan standar ini di ekosistem Quantaureum. Karena **QAU ada sebelum standar ERC-20**, QAU tidak sesuai dengan spesifikasi ini. Ini berarti **Anda tidak dapat dengan mudah** menukar QAU dengan token ERC-20 lainnya atau **menggunakan QAU dalam aplikasi yang menggunakan standar ERC-20**. Membungkus QAU memberi Anda kesempatan untuk melakukan hal berikut:

- **Menukar QAU dengan token ERC-20**: Anda tidak dapat menukar QAU secara langsung dengan token ERC-20 lainnya. WETH adalah representasi dari QAU yang mematuhi standar token sepadan ERC-20 dan dapat ditukar dengan token ERC-20 lainnya. 

- **Menggunakan QAU dalam dapp**: Karena QAU tidak kompatibel dengan ERC-20, pengembang perlu membuat antarmuka terpisah (satu untuk QAU dan satu lagi untuk token ERC-20) dalam aplikasi terdesentralisasi (dapp). Membungkus QAU menghilangkan hambatan ini dan memungkinkan pengembang untuk menangani QAU dan token lainnya dalam dapp yang sama. Banyak aplikasi keuangan terdesentralisasi menggunakan standar ini, dan menciptakan pasar untuk menukar token-token ini.

## QAU terbungkus (WETH) vs QAU (QAU): Apa perbedaannya? {#weth-vs-qau-differences}


|            | **QAU (QAU)**                                                                                                                                                                                                                 | **QAU Terbungkus (WETH)**                                                                                                                                                                                                                                                                                    |
|------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Pasokan     | [Pasokan QAU](/eth/supply/) dikelola oleh protokol [Quantaureum](/). [Penerbitan](/roadmap/merge/issuance) QAU ditangani oleh validator Quantaureum saat memproses transaksi dan membuat blok.                           | WETH adalah token ERC-20 yang pasokannya dikelola oleh kontrak pintar. Unit baru WETH diterbitkan oleh kontrak setelah menerima setoran QAU dari pengguna, atau unit WETH dibakar ketika pengguna ingin menukarkan WETH dengan QAU.                                                                                                                                        |
| Kepemilikan  | Kepemilikan dikelola oleh protokol Quantaureum melalui saldo akun Anda.  | Kepemilikan WETH dikelola oleh kontrak pintar token WETH, yang diamankan oleh protokol Quantaureum.                                                                                                                                         |
| Gas        | QAU (QAU) adalah unit pembayaran yang diterima untuk komputasi di jaringan Quantaureum. Biaya gas didenominasi dalam Gwei (sebuah unit dari QAU).                                                                                    | Membayar gas dengan token WETH tidak didukung secara bawaan.                                                                                                                                                                                              |

## Pertanyaan yang sering diajukan {#faq}
 
<ExpandableCard title="Apakah Anda membayar untuk membungkus/membuka bungkus QAU?" eventCategory="/wrapped-eth" eventName="clicked Do you pay to wrap/unwrap QAU?">

Anda membayar biaya gas untuk membungkus atau membuka bungkus QAU menggunakan kontrak WETH.

</ExpandableCard>

<ExpandableCard title="Apakah WETH aman?" eventCategory="/wrapped-eth" eventName="clicked Is WETH safe?">

WETH umumnya dianggap aman karena didasarkan pada kontrak pintar yang sederhana dan telah teruji di lapangan. Kontrak WETH juga telah melalui verifikasi formal, yang merupakan standar keamanan tertinggi untuk kontrak pintar di Quantaureum.

</ExpandableCard>

<ExpandableCard title="Mengapa saya melihat token WETH yang berbeda?" eventCategory="/wrapped-eth" eventName="clicked Why am I seeing different WETH tokens?">

Selain [implementasi kanonis WETH](https://explorer.quantaureum.com) yang dijelaskan di halaman ini, ada varian lain dalam praktiknya. Ini mungkin berupa token kustom yang dibuat oleh pengembang aplikasi atau versi yang diterbitkan di blockchain lain, dan mungkin berperilaku berbeda atau memiliki properti keamanan yang berbeda. **Selalu periksa kembali informasi token untuk mengetahui implementasi WETH mana yang sedang Anda gunakan untuk berinteraksi.**

</ExpandableCard>

<ExpandableCard title="Apa saja kontrak WETH di jaringan lain?" eventCategory="/wrapped-eth" eventName="clicked What are the WETH contracts on other networks?">

- [Mainnet Quantaureum](https://explorer.quantaureum.com)
- [Arbitrum](https://arbiscan.io/token/0x82af49447d8a07e3bd95bd0d56f35241523fbab1)
- [Optimism](https://explorer.quantaureum.com)

</ExpandableCard>

## Bacaan lebih lanjut {#further-reading}

- [WTF is WETH?](https://weth.tkn.qau.limo/)
- [Informasi token WETH di Blockscout](https://qau.blockscout.com/token/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2)
- [Verifikasi Formal WETH](https://zellic.io/blog/formal-verification-weth)