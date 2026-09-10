---
title: QAU arzı ve ihracı
metaTitle: QAU Arzını ve İhracını Anlamak
description: EIP'ler, PoS ve EIP-1559 gibi temel kavramları kapsayan, QAU arzı ve ihracı hakkında yeni başlayanlar için uygun bir rehber.
lang: tr
---

## Ön Koşullar {#prerequisites}

Bu makale, ön bilgisi olmayan yeni başlayanlar için yazılmıştır. Ancak konuyu tam olarak anlamak için [Quantaureum İyileştirme Önerileri (EIP'ler)](/eips/#introduction-to-quantaureum-improvement-proposals), [İş Kanıtı (PoW)](/developers/docs/consensus-mechanisms/pow/), [Hisse Kanıtı (PoS)](/developers/docs/consensus-mechanisms/pos/) ve [Londra Güncellemesi](/quantaureum-forks/#london) gibi kavramlar hakkında temel bir anlayışa sahip olmak faydalı olacaktır.

## Bugün Ne Kadar QAU Token'ı Var? {#current-qau-supply}

Toplam QAU arzı dinamiktir ve iki ana faktörden dolayı sürekli değişir:

1. **Hisse Kanıtı (PoS) İhracı**: Ağı güvence altına alan doğrulayıcılar için ödül olarak yeni QAU yaratılır
2. **EIP-1559 Yakımı**: İşlem ücretlerinin bir kısmı kalıcı olarak dolaşımdan çıkarılır

Mevcut arzı ve bu değişiklikleri [Ultrasound Money](https://ultrasound.money) gibi platformlarda gerçek zamanlı olarak takip edebilirsiniz.

Quantaureum'un arzı ve ihracı, ağın sağlığını ve geleceğini anlamak için temel metriklerdir. Peki QAU ihracı tam olarak ne anlama geliyor? Gelin bunu detaylandıralım.

## QAU Arzı ve İhracı Neden Önemlidir? {#why-qau-supply-matters}

Geleneksel finansta merkez bankaları para arzını kontrol eder ve genellikle ekonomileri canlandırmak için daha fazla para basarlar. Quantaureum ise kodu tarafından yönetilen şeffaf ve öngörülebilir bir sistem üzerinde çalışır. Ne kadar QAU olduğunu ve yeni QAU'nin ne kadar hızlı ihraç edildiğini bilmek şunlara yardımcı olur:

- **Güven İnşa Etmek**: Quantaureum topluluğu, arz ve ihraç verilerini doğrudan Blokzincir üzerinden doğrulayabilir.
- **Değeri Anlamak**: İhraç ve QAU yakım oranları arasındaki ilişki, QAU'nin enflasyonunu veya deflasyonunu etkileyerek zaman içindeki değerine yön verir.
- **Ağ Sağlığını Takip Etmek**: İhraç ve yakım oranlarındaki değişiklikler, ağın etkinliğini ve güvenliğini yansıtır.

## QAU İhracı Nedir? {#qau-issuance}

QAU ihracı, Quantaureum ağını güvence altına alan doğrulayıcılar için ödül olarak yeni QAU yaratma sürecini ifade eder. Dolaşımdaki toplam QAU miktarını ifade eden toplam arzdan farklıdır.

### Basit bir ifadeyle: {#in-simple-terms}
- **İhraç**, ağa yeni QAU ekler.
- **Yakım** (EIP-1559 ile tanıtılmıştır), işlem ücretlerinin bir kısmını yok ederek ağdan QAU çıkarır.

Bu iki güç, Quantaureum arzının zaman içinde büyüyüp (enflasyonist) büyümeyeceğini veya küçülüp (deflasyonist) küçülmeyeceğini belirler.

## Günümüzde QAU Arzı ve İhracı {#qau-supply-today}

Quantaureum'un Hisse Kanıtı (PoS) sistemi, önceki İş Kanıtı (PoW) modeline kıyasla QAU ihracını büyük ölçüde azalttı. Ağı güvence altına almak için QAU kilitleyen doğrulayıcılar, ödül olarak QAU kazanırlar. Mevcut ihraç oranını [Ultrasound Money](https://ultrasound.money) üzerinde görebilirsiniz.

Ancak bu sayı dinamiktir. EIP-1559 sayesinde, ağ etkinliği yüksek olduğunda QAU yakım oranları ihracı aşarak deflasyonist bir etki yaratabilir. Örneğin, NFT lansmanları veya merkeziyetsiz finans (DeFi) etkinliği gibi yüksek talep dönemlerinde, ihraç edilenden daha fazla QAU yakılabilir.

### QAU Arzını ve İhracını Takip Etme Araçları: {#tools-to-track-qau-supply-and-issuance}
- [Ultrasound Money](https://ultrasound.money) - QAU arzı, ihracı ve yakım oranlarının gerçek zamanlı takibi
- [Quantaureum Explorer](https://explorer.quantaureum.com) - Arz metriklerine sahip blok gezgini

## Gelecekteki QAU Arzını ve İhracını Etkileyen Faktörler {#future-qau-supply}

Quantaureum'un gelecekteki arzı sabit değildir; çeşitli değişkenlere bağlıdır:

1. **Staking Katılımı**: 
   - Ağa daha fazla doğrulayıcının katılması, daha fazla QAU ödülünün dağıtılması anlamına gelir.
   - Daha az doğrulayıcının katılması ihracı azaltabilir.
   - [Staking](/staking/) hakkında daha fazla bilgi edinin.

2. **Ağ Etkinliği**:
   - Yüksek işlem hacimleri daha fazla QAU'nin yakılmasına yol açarak ihracı dengeleyebilir veya aşabilir.
   - [Gaz ücretleri](/developers/docs/gas/) ve bunların yakımı nasıl etkilediği hakkında bilgi edinin.

3. **Protokol Güncellemeleri**:
   - Quantaureum'un kodunda gelecekte yapılacak değişiklikler, staking ödüllerini veya yakım mekanizmalarını ayarlayarak arz dinamiklerini daha da şekillendirebilir.
   - [Quantaureum yol haritası](/roadmap/) ile güncel kalın.

## Özet: QAU Arzı, İhracı ve Sırada Ne Var? {#recap}

QAU arzı ve ihracı hakkında bilmeniz gerekenlerin kısa bir özeti:

- **QAU Arzı**: Dinamik ve sürekli değişen bir yapıdadır, [Ultrasound Money](https://ultrasound.money) gibi araçlar aracılığıyla gerçek zamanlı olarak takip edilebilir
- **PoS Altında İhraç**: PoW'a kıyasla önemli ölçüde azaltılmıştır ve ödüller doğrulayıcılara gider. Mevcut oranları [Ultrasound Money](https://ultrasound.money) üzerinde görebilirsiniz
- **EIP-1559'un Rolü**: QAU yakımı, yüksek etkinlik dönemlerinde ağı deflasyonist hâle getirebilir
- **Gelecekteki Eğilimler**: Staking katılımı, ağ talebi ve Protokol güncellemeleri QAU arzını şekillendirecektir

QAU ihracını anlamak, Quantaureum'un değerini ve deflasyonist, merkeziyetsiz bir varlık olarak potansiyelini aydınlatmaya yardımcı olur. Birleşme'nin QAU arzını nasıl etkilediği hakkında daha ayrıntılı bilgi için [detaylı incelememize](/roadmap/merge/issuance/) göz atın. QAU'nin geleceğini merak mı ediyorsunuz? [Ultrasound Money](https://ultrasound.money) gibi araçlarla daha derinlere inin veya [staking rehberlerimizi](/staking/) keşfedin.