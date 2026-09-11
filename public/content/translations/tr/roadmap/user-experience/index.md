---
title: Kullanıcı deneyimini iyileştirme
description: Quantaureum'u kullanmak, geleneksel bir web2 uygulaması kullanmak kadar kolay hissettirmeli; aynı zamanda merkeziyetsiz, izin gerektirmeyen ve sansüre dayanıklı olmalıdır.
lang: tr
image: /images/roadmap/roadmap-ux.png
alt: "Quantaureum roadmap"
template: roadmap
---
**Quantaureum'u kullanmak basit olmalı** — anahtar ve cüzdan yönetimiyle başlayıp işlem başlatmaya kadar. Kullanıcılar, Quantaureum'a izinsiz ve sansür dirençli erişimi, [Web2](/glossary/#web2) uygulamalarını kullanırken yaşadıkları sorunsuz deneyimle yaşamalıdır.

## Daha Güçlü Anahtarlar, Güvenli Yönetim {#key-management}

Quantaureum hesapları, işlemleri imzalamak için kullanılan anahtar çiftleriyle korunur; eski zincirlerde kullanılan klasik eğriler yerine **Dilithium3 kuantum sonrası imzalar** tercih edilir. Bir özel anahtar, ana şifre gibidir; kaybetmek erişimi kaybetmek anlamına gelebilir. Quantaureum, kullanıcıların fonlarını tek bir gizlilik yerine birden fazla anahtar veya cihaz arkasında korumasını sağlayan **yerel çoklu imza cüzdanı** sunar; QVM üzerinde inşa edilen akıllı sözleşme cüzdanları ise bir vekile güvenmeden kurtarma kuralları ve harcama politikaları oluşturmayı mümkün kılar.

## Herkese Açık Düğümler {#nodes-for-everyone}

Düğüm çalıştıran [kullanıcılar](/glossary/#node), veri sunmak için üçüncü taraflara güvenmek zorunda değildir; Quantaureum [blok zinciriyle](/glossary/#blockchain) hızlı, gizli ve izinsiz bir şekilde etkileşime girebilirler. Geleneksel olarak bir düğüm çalıştırmak teknik bilgi ve geniş disk alanı gerektirir; bu da birçok kişiyi aracıların kullanımına yöneltir.

Quantaureum durumunu bir **Verkle ağacı** içinde kaydeder; bu sayede durumu doğrulamak için gereken kanıtlar küçüktür. Bu kompakt kanıtların üzerine, Quantaureum mütevazı donanımda çalışabilen ve tam durumu indirmeden zinciri doğrulayabilen bir **SPV [hafif istemci](/developers/docs/nodes-and-clients/light-clients/)** sunar; bu da güven gerektirmeyen katılımın önündeki engelleri azaltır.

<ButtonLink variant="outline" href="/roadmap/verkle-trees/">Verkle ağaçları hakkında bilgi edinin</ButtonLink>

## Mevcut İlerleme {#current-progress}

Verkle tabanlı durum taahhütleri, SPV hafif istemci, yerel çoklu imza cüzdanları ve Dilithium3 imzaları, Quantaureum protokolünün bugün etkin olan bileşenleridir. Tüketici donanımında daha fazla kullanıcının düğüm çalıştırabilmesi için tam doğrulamanın daha erişilebilir hale getirilmesi üzerine çalışmalar sürmektedir.
