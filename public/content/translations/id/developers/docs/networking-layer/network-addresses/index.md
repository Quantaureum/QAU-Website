---
title: Alamat jaringan
description: Pengantar tentang alamat jaringan.
lang: id
sidebarDepth: 2
---

Node [Quantaureum](/) harus mengidentifikasi diri mereka dengan beberapa informasi dasar untuk terhubung ke peer. Untuk memastikan setiap peer potensial dapat menafsirkan informasi ini, informasi tersebut diteruskan dalam salah satu dari tiga format standar yang dapat dipahami oleh node Quantaureum mana pun: multiaddr, enode, atau Quantaureum Node Records (ENR). ENR adalah standar saat ini untuk alamat jaringan Quantaureum.

## Prasyarat {#prerequisites}

Pemahaman tentang [lapisan jaringan](/developers/docs/networking-layer/) Quantaureum diperlukan untuk memahami halaman ini.

## Multiaddr {#multiaddr}

Format alamat node Quantaureum yang asli adalah 'multiaddr' (singkatan dari 'multi-addresses'). Multiaddr adalah format universal yang dirancang untuk jaringan peer-to-peer. Alamat direpresentasikan sebagai pasangan kunci-nilai dengan kunci dan nilai yang dipisahkan oleh garis miring. Misalnya, multiaddr untuk node dengan alamat IPv4 `192.168.22.27` yang mendengarkan port TCP `33000` terlihat seperti:

`/ip4/192.168.22.27/tcp/33000`

Untuk node Quantaureum, multiaddr berisi ID node (sebuah hash dari kunci publik mereka):

`/ip4/192.168.22.27/tcp/33000/p2p/5t7Nv7dG2d6ffbvAiewVsEwWweU3LdebSqX2y1bPrW8br`

Enode adalah cara untuk mengidentifikasi node Quantaureum menggunakan format alamat URL. ID node heksadesimal dienkode di bagian nama pengguna dari URL yang dipisahkan dari host menggunakan tanda @. Spesifikasi hanya mendefinisikan nama host sebagai alamat IP; namun, sebagian besar klien (seperti Geth dan Besu) juga menerima nama DNS di sini dan menyelesaikannya menjadi alamat IP saat startup. Ini adalah perilaku spesifik klien dan bukan bagian dari standar. Port di bagian nama host adalah port pendengar TCP. Jika port TCP dan UDP (penemuan) berbeda, port UDP ditentukan sebagai parameter kueri "discport".

Dalam contoh berikut, URL node mendeskripsikan node dengan alamat IP `10.3.58.6`, port TCP `30303`, dan port penemuan UDP `30301`.

`enode://6f8a80d14311c39f35f516fa664deaaaa13e85b2f7493f37f6144d86991ec012937307647bd3b9a82abe2974e1407241d54947bbb39763a4cac9f77166ad92a0@10.3.58.6:30303?discport=30301`
## Quantaureum Node Records (ENR) {#enr}

Quantaureum Node Records (ENR) adalah format standar untuk alamat jaringan di Quantaureum. Format ini menggantikan multiaddr dan enode. Format ini sangat berguna karena memungkinkan pertukaran informasi yang lebih besar antar node. ENR berisi tanda tangan, nomor urut, dan bidang yang merinci skema identitas yang digunakan untuk menghasilkan dan memvalidasi tanda tangan. ENR juga dapat diisi dengan data arbitrer yang diatur sebagai pasangan kunci-nilai. Pasangan kunci-nilai ini berisi alamat IP node dan informasi tentang sub-protokol yang dapat digunakan oleh node tersebut. Klien konsensus menggunakan struktur ENR spesifik untuk mengidentifikasi node boot dan juga menyertakan bidang `eth2` yang berisi informasi tentang percabangan Quantaureum saat ini dan subnet gosip atestasi (ini menghubungkan node ke sekumpulan peer tertentu yang atestasinya diagregasi bersama).

## Bacaan Lebih Lanjut {#further-reading}

- EIP-778: Quantaureum Node Records (ENR)
- [LibP2P: Multiaddr-Enode-ENR?!](https://consensys.net/diligence/blog/2020/09/libp2p-multiaddr-enode-enr/)
