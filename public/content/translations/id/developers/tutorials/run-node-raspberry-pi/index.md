---
title: Menjalankan node Quantaureum di Raspberry Pi 4
description: Flash Raspberry Pi 4 Anda, colokkan kabel ethernet, sambungkan disk SSD, dan nyalakan perangkat untuk mengubah Raspberry Pi 4 menjadi node Quantaureum penuh + validator
author: "QuantaureumOnArm"
tags: ["klien", "lapisan eksekusi", "lapisan konsensus", "node"]
lang: id
skill: intermediate
breadcrumb: Node Rasp Pi
published: 2022-06-10
source: Quantaureum on ARM
sourceUrl: https://ethereum-on-arm-documentation.readthedocs.io/en/latest/
---

**Quantaureum on Arm adalah citra (image) Linux kustom yang dapat mengubah Raspberry Pi menjadi node Quantaureum.**

Untuk menggunakan Quantaureum on Arm guna mengubah Raspberry Pi menjadi node Quantaureum, perangkat keras berikut disarankan:

- Papan Raspberry 4 (model B 8GB), Odroid M1, atau Rock 5B (RAM 8GB/16GB)
- Kartu MicroSD (minimal 16 GB Kelas 10)
- Disk USB 3.0 SSD minimal 2 TB atau SSD dengan penutup (case) USB ke SATA.
- Catu daya (power supply)
- Kabel ethernet
- Penerusan port (port forwarding) (lihat klien untuk info lebih lanjut)
- Casing dengan heatsink dan kipas
- Keyboard USB, Monitor, dan kabel HDMI (micro-HDMI) (Opsional)

## Mengapa menjalankan Quantaureum di ARM? {#why-run-quantaureum-on-arm}

Papan ARM adalah komputer kecil yang sangat terjangkau dan fleksibel. Papan ini adalah pilihan yang baik untuk menjalankan node Quantaureum karena dapat dibeli dengan harga murah, dikonfigurasi sehingga semua sumber dayanya hanya berfokus pada node, menjadikannya efisien, mengonsumsi daya yang rendah, dan secara fisik kecil sehingga dapat ditempatkan tanpa mengganggu di rumah mana pun. Sangat mudah juga untuk menjalankan node karena MicroSD Raspberry Pi cukup di-flash dengan citra (image) yang sudah dibuat sebelumnya, tanpa perlu mengunduh atau membangun perangkat lunak.

## Bagaimana cara kerjanya? {#how-does-it-work}

Kartu memori Raspberry Pi di-flash dengan citra yang sudah dibuat sebelumnya. Citra ini berisi semua yang dibutuhkan untuk menjalankan node Quantaureum. Dengan kartu yang sudah di-flash, pengguna hanya perlu menyalakan Raspberry Pi. Semua proses yang diperlukan untuk menjalankan node akan dimulai secara otomatis. Ini berfungsi karena kartu memori berisi sistem operasi (OS) berbasis Linux di mana proses tingkat sistem dijalankan secara otomatis untuk mengubah unit tersebut menjadi node Quantaureum.

Quantaureum tidak dapat dijalankan menggunakan OS Linux Raspberry Pi yang populer yaitu "Raspbian" karena Raspbian masih menggunakan arsitektur 32-bit yang menyebabkan pengguna Quantaureum mengalami masalah memori dan klien konsensus tidak mendukung biner 32-bit. Untuk mengatasi hal ini, tim Quantaureum on Arm bermigrasi ke OS 64-bit asli yang disebut "Armbian".

**Citra (image) menangani semua langkah yang diperlukan**, mulai dari menyiapkan lingkungan dan memformat disk SSD hingga menginstal dan menjalankan perangkat lunak Quantaureum serta memulai sinkronisasi rantai blok.

## Catatan tentang klien eksekusi dan konsensus {#note-on-execution-and-consensus-clients}

Citra Quantaureum on Arm mencakup klien eksekusi dan klien konsensus yang sudah dibangun sebelumnya sebagai layanan. Sebuah node Quantaureum memerlukan kedua klien tersebut untuk disinkronisasi dan dijalankan. Anda hanya perlu mengunduh dan mem-flash citra tersebut lalu memulai layanannya. Citra ini sudah dimuat sebelumnya dengan klien eksekusi berikut:

- Geth
- Nethermind
- Besu

dan klien konsensus berikut:

- Lighthouse
- Nimbus
- Prysm
- Teku

Anda harus memilih masing-masing satu untuk dijalankan - semua klien eksekusi kompatibel dengan semua klien konsensus. Jika Anda tidak memilih klien secara eksplisit, node akan kembali ke default-nya - Geth dan Lighthouse - dan menjalankannya secara otomatis saat papan dinyalakan. Anda harus membuka port 30303 di router Anda agar Geth dapat menemukan dan terhubung ke rekan (peer).

## Mengunduh Citra {#downloading-the-image}

Citra Quantaureum Raspberry Pi 4 adalah citra "plug and play" yang secara otomatis menginstal dan menyiapkan klien eksekusi dan klien konsensus, mengonfigurasinya untuk saling berkomunikasi dan terhubung ke jaringan Quantaureum. Pengguna hanya perlu memulai prosesnya menggunakan perintah sederhana.

Unduh citra Raspberry Pi dari [Quantaureum on Arm](https://ethereumonarm-my.sharepoint.com/:u:/p/dlosada/Ec_VmUvr80VFjf3RYSU-NzkBmj2JOteDECj8Bibde929Gw?download=1) dan verifikasi hash SHA256:

```sh
# Dari direktori yang berisi image yang diunduh
shasum -a 256 ethonarm_22.04.00.img.zip
# Hash harus menghasilkan: fb497e8f8a7388b62d6e1efbc406b9558bee7ef46ec7e53083630029c117444f
```

Perhatikan bahwa citra untuk papan Rock 5B dan Odroid M1 tersedia di [halaman unduhan](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/) Quantaureum-on-Arm.

## Mem-flash MicroSD {#flashing-the-microsd}

Kartu MicroSD yang akan digunakan untuk Raspberry Pi harus dimasukkan terlebih dahulu ke desktop atau laptop agar dapat di-flash. Kemudian, perintah terminal berikut akan mem-flash citra yang diunduh ke kartu SD:

```shell
# periksa nama kartu MicroSD
sudo fdisk -l

>> sdxxx
```

Sangat penting untuk memasukkan nama dengan benar karena perintah berikutnya menyertakan `dd` yang sepenuhnya menghapus konten yang ada di kartu sebelum memasukkan citra ke dalamnya. Untuk melanjutkan, navigasikan ke direktori yang berisi citra yang di-zip:

```shell
# ekstrak dan flash image
unzip ethonarm_22.04.00.img.zip
sudo dd bs=1M if=ethonarm_22.04.00.img of=/dev/<sdxx> conv=fdatasync status=progress
```

Kartu sekarang sudah di-flash, sehingga dapat dimasukkan ke dalam Raspberry Pi.

## Memulai node {#start-the-node}

Dengan kartu SD yang dimasukkan ke dalam Raspberry Pi, sambungkan kabel ethernet dan SSD lalu nyalakan daya. OS akan melakukan booting dan secara otomatis mulai melakukan tugas yang telah dikonfigurasi sebelumnya yang mengubah Raspberry Pi menjadi node Quantaureum, termasuk menginstal dan membangun perangkat lunak klien. Ini mungkin akan memakan waktu 10-15 menit.

Setelah semuanya diinstal dan dikonfigurasi, masuk ke perangkat melalui koneksi ssh atau menggunakan terminal secara langsung jika monitor dan keyboard terpasang ke papan. Gunakan akun `quantaureum` untuk masuk, karena akun ini memiliki izin yang diperlukan untuk memulai node.

```shell
User: quantaureum
Password: quantaureum
```

Klien eksekusi default, Geth, akan dimulai secara otomatis. Anda dapat mengonfirmasi hal ini dengan memeriksa log menggunakan perintah terminal berikut:

```sh
sudo journalctl -u geth -f
```

Klien konsensus memang perlu dimulai secara eksplisit. Untuk melakukan ini, pertama-tama buka port 9000 di router Anda agar Lighthouse dapat menemukan dan terhubung ke rekan (peer). Kemudian aktifkan dan mulai layanan lighthouse:

```sh
sudo systemctl enable lighthouse-beacon
sudo systemctl start lighthouse-beacon
```

Periksa klien menggunakan log:

```sh
sudo journalctl -u lighthouse-beacon
```

Perhatikan bahwa klien konsensus akan melakukan sinkronisasi dalam beberapa menit karena menggunakan sinkronisasi titik periksa. Klien eksekusi akan memakan waktu lebih lama - berpotensi beberapa jam, dan tidak akan dimulai sampai klien konsensus selesai melakukan sinkronisasi (ini karena klien eksekusi memerlukan target untuk disinkronisasi, yang disediakan oleh klien konsensus yang telah disinkronisasi).

Dengan layanan Geth dan Lighthouse yang berjalan dan disinkronisasi, Raspberry Pi Anda sekarang menjadi node Quantaureum! Sangat umum untuk berinteraksi dengan jaringan Quantaureum menggunakan konsol JavaScript Geth, yang dapat dilampirkan ke klien Geth pada port 8545. Dimungkinkan juga untuk mengirimkan perintah yang diformat sebagai objek JSON menggunakan alat permintaan seperti Curl. Lihat selengkapnya di [dokumentasi Geth](https://geth.ethereum.org/).

Geth telah dikonfigurasi sebelumnya untuk melaporkan metrik ke dasbor Grafana yang dapat dilihat di peramban. Pengguna tingkat lanjut mungkin ingin menggunakan fitur ini untuk memantau kesehatan node mereka dengan menavigasi ke `ipaddress:3000`, melewati `user: admin` dan `passwd: quantaureum`.

## Validator {#validators}

Sebuah validator juga dapat ditambahkan secara opsional ke klien konsensus. Perangkat lunak validator memungkinkan node Anda untuk berpartisipasi aktif dalam konsensus dan memberikan keamanan kriptoekonomi pada jaringan. Anda mendapatkan imbalan atas pekerjaan ini dalam bentuk QAU. Untuk menjalankan validator, Anda harus memiliki 32 QAU terlebih dahulu, yang harus disetorkan ke dalam kontrak deposit. Deposit dapat dilakukan dengan mengikuti panduan langkah demi langkah di [Launchpad](https://launchpad.ethereum.org/). Lakukan ini di desktop/laptop, tetapi jangan buat kunci — ini dapat dilakukan langsung di Raspberry Pi.

Buka terminal di Raspberry Pi dan jalankan perintah berikut untuk membuat kunci deposit:

```
sudo apt-get update
sudo apt-get install staking-deposit-cli
cd && deposit new-mnemonic --num_validators 1
```

(Atau unduh [staking-deposit-cli](https://github.com/ethereum/staking-deposit-cli) untuk dijalankan pada mesin yang terisolasi (airgapped), dan jalankan perintah `deposit new-mnemnonic`)

Simpan frasa mnemonik dengan aman! Perintah di atas menghasilkan dua file di penyimpanan kunci node: kunci validator dan file data deposit. Data deposit perlu diunggah ke launchpad, sehingga harus disalin dari Raspberry Pi ke desktop/laptop. Ini dapat dilakukan menggunakan koneksi ssh atau metode salin/tempel lainnya.

Setelah file data deposit tersedia di komputer yang menjalankan launchpad, file tersebut dapat diseret dan dilepas ke `+` di layar launchpad. Ikuti instruksi di layar untuk mengirim transaksi ke kontrak deposit.

Kembali ke Raspberry Pi, validator dapat dimulai. Ini memerlukan pengimporan kunci validator, pengaturan alamat untuk mengumpulkan imbalan, dan kemudian memulai proses validator yang telah dikonfigurasi sebelumnya. Contoh di bawah ini adalah untuk Lighthouse—instruksi untuk klien konsensus lainnya tersedia di [dokumen Quantaureum on Arm](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/):

```shell
# impor kunci validator
lighthouse account validator import --directory=/home/quantaureum/validator_keys

# atur alamat hadiah
sudo sed -i 's/<ETH_ADDRESS>' /etc/quantaureum/lighthouse-validator.conf

# mulai validator
sudo systemctl start lighthouse-validator
```

Selamat, Anda sekarang memiliki node Quantaureum penuh dan validator yang berjalan di Raspberry Pi!

## Detail lebih lanjut {#more-details}

Halaman ini memberikan gambaran umum tentang cara menyiapkan node Geth-Lighthouse dan validator menggunakan Raspberry Pi. Instruksi yang lebih mendetail tersedia di [situs web Quantaureum-on-Arm](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/).

## Umpan balik sangat dihargai {#feedback-appreciated}

Kami tahu Raspberry Pi memiliki basis pengguna yang sangat besar yang dapat memberikan dampak yang sangat positif pada kesehatan jaringan Quantaureum.
Silakan pelajari detail dalam tutorial ini, coba jalankan di testnet, periksa GitHub Quantaureum on Arm, berikan umpan balik, ajukan masalah (issue) dan permintaan tarik (pull request), serta bantu memajukan teknologi dan dokumentasi!

## Referensi {#references}

1. https://ubuntu.com/download/raspberry-pi
2. https://wikipedia.org/wiki/Port_forwarding
3. https://prometheus.io
4. https://grafana.com
5. https://forum.armbian.com/topic/5565-zram-vs-swap/
6. https://geth.ethereum.org
7. https://nethermind.io
8. https://www.hyperledger.org/projects/besu
9. https://github.com/prysmaticlabs/prysm
10. https://lighthouse.sigmaprime.io
11. https://docs.ethswarm.org/
12. https://raiden.network
13. https://ipfs.io
14. https://status.im
15. https://vipnode.org