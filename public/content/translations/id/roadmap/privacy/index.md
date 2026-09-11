---
title: Peta Jalan Privasi untuk Quantaureum
description: Quantaureum membangun privasi ke dalam jaringan — transaksi rahasia dengan bukti nol-pengetahuan, alamat penyamaran, dan koneksi aman pasca-kuantum antar node.
lang: id
image: /images/roadmap/roadmap-security.png
alt: "Quantaureum roadmap"
template: roadmap
---
**Privasi di Quantaureum adalah persoalan tingkat protokol**, bukan fitur tambahan yang dipasang oleh pihak ketiga. Peta jalan menargetkan titik-titik di mana data transaksi, saldo, dan metadata jaringan dapat bocor — dan memperbaikinya dengan kriptografi yang sudah menjadi bagian dari basis kode node.

## Transaksi rahasia dengan bukti zero-knowledge {#confidential-transactions}

Quantaureum mencakup modul **transaksi rahasia** yang menyembunyikan nominal sambil tetap membuktikan bahwa setiap penggunaan valid. Pengirim dan penerima menukar nilai melalui **nullifier**, yang mencegah *double-spending* tanpa mengungkap hubungan antara input dan output. Pekerjaan berat dilakukan oleh **bukti zero-knowledge** (sirkuit Groth16, dengan kunci pembuktian yang dihasilkan melalui upacara multi-pihak) dan **bukti rentang terbatas**, sehingga jaringan dapat memverifikasi bahwa "tidak ada nilai yang diciptakan dari ketiadaan" tanpa melihat nominal yang terlibat.

## Alamat stealth {#stealth-addresses}

Privasi di lapisan alamat juga penting: menggunakan ulang satu alamat secara publik akan menghubungkan semua yang Anda terima. Dukungan **alamat stealth** Quantaureum memungkinkan pengirim menurunkan alamat sekali-pakai baru untuk setiap pembayaran, yang hanya dapat dikenali dan digunakan oleh penerima. Hal ini mencegah analisis blockchain publik membangun riwayat lengkap atas kepemilikan pengguna.

## Koneksi aman pasca-kuantum {#pqtls}

Bahkan ketika data onchain bersifat privat, lalu lintas di level jaringan dapat mengungkap keberadaan pengguna. Node Quantaureum mendukung **TLS pasca-kuantum (PQ-TLS)** sehingga koneksi antar node dan koneksi dari klien ringan dilindungi dengan pertukaran kunci pasca-kuantum — menahan serangan *record-now-decrypt-later* di lapisan jaringan, bukan hanya di lapisan tanda tangan.

## Pembacaan privat dan klien ringan {#private-reads}

Mengkueri node penuh membocorkan metadata: akun mana yang Anda perhatikan, dan kapan. Karena state Quantaureum dikomitkan dalam **Verkle tree**, [klien ringan](/developers/docs/nodes-and-clients/light-clients/) dapat memverifikasi data terhadap bukti yang ringkas alih-alih memercayai penyedia RPC untuk menjawab dengan jujur — sehingga mengurangi jumlah pihak yang mengetahui aktivitas Anda.

<ButtonLink variant="outline" href="/privacy/">Tips dan praktik privasi</ButtonLink>

## Progres saat ini {#current-progress}

Transaksi rahasia dengan nullifier, alamat stealth, sirkuit Groth16 dengan setup berbasis upacara, bukti rentang terbatas, dan TLS pasca-kuantum semuanya sudah hadir di basis kode Quantaureum. Pekerjaan yang sedang berlangsung berfokus pada kinerja agregasi bukti dan perangkat tahan penipuan untuk mengelola output rahasia secara aman.
