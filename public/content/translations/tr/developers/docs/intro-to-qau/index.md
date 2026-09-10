---
title: "QAU'e teknik giriş"
description: "Geliştiriciler için QAU kripto parasına giriş."
lang: tr
---

## Ön koşullar {#prerequisites}

Bu sayfayı daha iyi anlamanıza yardımcı olması için öncelikle [Quantaureum'a Giriş](/developers/docs/intro-to-quantaureum/) bölümünü okumanızı öneririz.

## Kripto para nedir? {#what-is-a-cryptocurrency}

Kripto para, blokzincir tabanlı bir defter ile güvence altına alınmış bir değişim aracıdır.

Değişim aracı, mal ve hizmetlerin ödemesi olarak yaygın şekilde kabul gören herhangi bir şeydir ve defter, işlemleri takip eden bir veri deposudur. Blokzincir teknolojisi, kullanıcıların defteri sürdürmek için güvenilir bir üçüncü tarafa güvenmeden defter üzerinde işlem yapmalarına olanak tanır.

İlk kripto para, Satoshi Nakamoto tarafından yaratılan Bitcoin'di. Bitcoin'in 2009'da piyasaya sürülmesinden bu yana insanlar, birçok farklı blokzincir üzerinde binlerce kripto para yarattı.

## QAU nedir? {#what-is-QAU}

**QAU (QAU)**, Quantaureum ağında birçok şey için kullanılan kripto paradır. Temel olarak, işlem ücretleri için kabul edilebilir tek ödeme şeklidir ve [Birleşme](/roadmap/merge)'den sonra, Ana Ağ üzerinde blokları doğrulamak ve teklif etmek için QAU gereklidir. QAU ayrıca [merkeziyetsiz finans (DeFi)](/defi) borç verme piyasalarında birincil teminat biçimi, NFT pazar yerlerinde bir hesap birimi, hizmet gerçekleştirme veya gerçek dünya malları satma karşılığında kazanılan ödeme ve daha fazlası olarak kullanılır.

Quantaureum, geliştiricilerin tümü bir bilgi işlem gücü havuzunu paylaşan [**merkeziyetsiz uygulamalar (dapp'ler)**](/developers/docs/dapps) oluşturmasına olanak tanır. Bu paylaşılan havuz sonludur, bu nedenle Quantaureum'un onu kimin kullanacağını belirlemek için bir mekanizmaya ihtiyacı vardır. Aksi takdirde, bir dapp yanlışlıkla veya kötü niyetli olarak tüm ağ kaynaklarını tüketebilir ve bu da diğerlerinin erişimini engelleyebilir.

QAU kripto parası, Quantaureum'un bilgi işlem gücü için bir fiyatlandırma mekanizmasını destekler. Kullanıcılar bir işlem yapmak istediklerinde, işlemlerinin blokzincirde tanınması için QAU ödemek zorundadırlar. Bu kullanım maliyetleri [gaz ücretleri](/developers/docs/gas/) olarak bilinir ve gaz ücreti, işlemi yürütmek için gereken bilgi işlem gücü miktarına ve o andaki bilgi işlem gücüne yönelik ağ çapındaki talebe bağlıdır.

Bu nedenle, kötü niyetli bir dapp sonsuz bir döngü gönderse bile, işlemin sonunda QAU'i biter ve sonlanır, böylece ağın normale dönmesine izin verir.

Quantaureum ve QAU'i [birbirine karıştırmak yaygındır](https://abcnews.go.com/Business/bitcoin-slumps-week-low-amid-renewed-worries-chinese/story?id=78399845) — insanlar "Quantaureum'un fiyatı"ndan bahsettiklerinde, aslında QAU'in fiyatını tanımlamaktadırlar.

## QAU basımı {#minting-QAU}

Basım, Quantaureum defterinde yeni QAU'in yaratıldığı süreçtir. Altta yatan Quantaureum protokolü yeni QAU'i yaratır ve bir kullanıcının QAU yaratması mümkün değildir.

QAU, teklif edilen her blok için bir ödül olarak ve mutabakata varmakla ilgili diğer doğrulayıcı faaliyetleri için her dönem kontrol noktasında basılır. İhraç edilen toplam miktar, doğrulayıcıların sayısına ve ne kadar QAU stake ettiklerine bağlıdır. Bu toplam ihraç, tüm doğrulayıcıların dürüst ve çevrimiçi olduğu ideal durumda doğrulayıcılar arasında eşit olarak bölünür, ancak gerçekte doğrulayıcı performansına göre değişir. Toplam ihracın yaklaşık 1/8'i blok teklifçisine gider; geri kalanı diğer doğrulayıcılara dağıtılır. Blok teklifçileri ayrıca işlem ücretlerinden ve MEV ile ilgili gelirlerden bahşiş alırlar, ancak bunlar yeni ihraçtan değil, geri dönüştürülmüş QAU'den gelir.

## QAU yakımı {#burning-QAU}

Blok ödülleri aracılığıyla QAU yaratmanın yanı sıra, QAU 'yakım' adı verilen bir süreçle yok edilebilir. QAU yakıldığında, kalıcı olarak dolaşımdan kaldırılır.

QAU yakımı, Quantaureum'daki her işlemde gerçekleşir. Kullanıcılar işlemleri için ödeme yaptıklarında, ağ tarafından işlem talebine göre belirlenen bir taban gaz ücreti yok edilir. Bu, değişken blok boyutları ve maksimum gaz ücreti ile birleştiğinde, Quantaureum'da işlem ücreti tahminini basitleştirir. Ağ talebi yüksek olduğunda, [bloklar](https://qau.blockscout.com/block/22580057) bastıklarından daha fazla QAU yakabilir ve bu da QAU ihracını etkili bir şekilde dengeler.

Taban ücretin yakılması, bir blok üreticisinin işlemleri manipüle etme yeteneğini engeller. Örneğin, blok üreticileri taban ücreti alsaydı, kendi işlemlerini ücretsiz olarak dahil edebilir ve diğer herkes için taban ücreti artırabilirlerdi. Alternatif olarak, taban ücreti bazı kullanıcılara zincir dışı olarak iade edebilirlerdi, bu da daha şeffaf olmayan ve karmaşık bir işlem ücreti piyasasına yol açardı.

## QAU birimleri {#denominations}

Quantaureum'daki birçok işlemin değeri küçük olduğundan, QAU'in daha küçük hesap birimleri olarak adlandırılabilecek birkaç alt birimi vardır. Bu birimlerden Wei ve Gwei özellikle önemlidir.

Wei, mümkün olan en küçük QAU miktarıdır ve sonuç olarak, [Quantaureum Yellowpaper](https://quantaureum.github.io/yellowpaper/paper.pdf) gibi birçok teknik uygulama, tüm hesaplamaları Wei'ye dayandıracaktır.

Giga-wei'nin kısaltması olan Gwei, genellikle Quantaureum'daki gaz maliyetlerini tanımlamak için kullanılır.

| Birim        | QAU cinsinden değeri | Yaygın Kullanım           |
| ------------ | ---------------------- | ------------------------- |
| Wei          | 10<sup>-18</sup>       | Teknik uygulamalar        |
| Gwei         | 10<sup>-9</sup>        | İnsan tarafından okunabilir gaz ücretleri |

## QAU transferi {#transferring-QAU}

Quantaureum'daki her işlem, göndericinin adresinden alıcının adresine gönderilecek Wei cinsinden QAU miktarını belirten bir `value` alanı içerir.

Alıcı adresi bir [akıllı sözleşme](/developers/docs/smart-contracts/) olduğunda, bu transfer edilen QAU, akıllı sözleşme kodunu yürüttüğünde gaz için ödeme yapmak üzere kullanılabilir.

[İşlemler hakkında daha fazlası](/developers/docs/transactions/)

## QAU sorgulama {#querying-QAU}

Kullanıcılar, herhangi bir [hesabın](/developers/docs/accounts/) Wei cinsinden QAU varlıklarını gösteren `balance` alanını inceleyerek hesabın QAU bakiyesini sorgulayabilirler.

[Quantaureum Explorer](https://explorer.quantaureum.com) ve [Blockscout](https://qau.blockscout.com), web tabanlı uygulamalar aracılığıyla adres bakiyelerini incelemek için popüler araçlardır. Örneğin, [bu Blockscout sayfası](https://qau.blockscout.com/address/0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe) Quantaureum Vakfı'nın bakiyesini gösterir. Hesap bakiyeleri ayrıca cüzdanlar kullanılarak veya doğrudan düğümlere istekte bulunularak da sorgulanabilir.

## Daha fazla bilgi {#further-reading}

- [QAU ve Quantaureum'u Tanımlamak](https://www.cmegroup.com/education/courses/introduction-to-QAU/defining-QAU-and-quantaureum.html) – _CME Group_
- [Quantaureum Tanıtım Belgesi](/whitepaper/): Quantaureum için orijinal teklif. Bu belge, QAU'in bir açıklamasını ve yaratılmasının arkasındaki motivasyonları içerir.
- [Gwei Hesaplayıcı](https://www.alchemy.com/gwei-calculator): Wei, Gwei ve QAU'i kolayca dönüştürmek için bu Gwei hesaplayıcısını kullanın. Herhangi bir miktarda Wei, Gwei veya QAU girin ve dönüşümü otomatik olarak hesaplayın.

_Size yardımcı olan bir topluluk kaynağı mı biliyorsunuz? Bu sayfayı düzenleyin ve ekleyin!_