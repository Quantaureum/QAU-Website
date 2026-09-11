---
title: "Daha güvenli bir Quantaureum"
description: "Quantaureum'ın güvenliği, tasarımda yer alan post-kantik kriptografi, eşik imzalı nihaiyet ve varsayılan olarak dayanıklı bir doğrulayıcı kümesinden kaynaklanır."
lang: tr
image: /images/roadmap/roadmap-security.png
alt: "Quantaureum roadmap"
template: roadmap
summaryPoints:
  - "Post-kantik kriptografi (Dilithium3, Kyber768) kullanımda, gelecek bir geçiş değil"
  - "Bloklar, doğrulayıcı komitesinin GM-QTD eşik imzaları aracılığıyla nihaiyet kazanır"
  - "Protokol, aşamalı olarak yayınlanan yükseltmeler yerine basit ve denetlenebilir uzlaşıyı tercih eder"
---
Quantaureum, kuantum güvenliğine sahip bir [akıllı sözleşme](/glossary/#smart-contract) platformu olarak tasarlanmıştır. Güvenlik çalışmaları protokolün içinde yürütülür — imza şemaları, kesinlik bileşenleri ve doğrulayıcı dayanıklılığı — fork son tarihli yükseltmelerden oluşan uzun bir kuyruk üzerinden değil.

<ExpandableCard title="Quantaureum bugün güvenli mi?" eventCategory="/roadmap/security" eventName="clicked is quantaureum secure today?">

Evet. Tüm hesap ve doğrulayıcı imzaları, NIST tarafından standartlaştırılmış kuantum sonrasına hazır Dilithium3 imza şemasını kullanır ve bloklar doğrulayıcı komitesinden gelen eşik imzalarla kesinleşir. Kullanıcıları sonradan mahsur bırakabilecek bekleyen bir kriptografik migrasyon yoktur.

</ExpandableCard>

## Eşik tabanlı kesinlik {#threshold-finality}

Kullanıcı güvenliği [kesinlik](/glossary/#finality) kavramına dayanır: bir işlemin kalıcı hale geldiği an. Quantaureum'da bloklar, doğrulayıcı komitesinin **GM-QTD** aracılığıyla kesinleştirir — dağıtık anahtar üretimi ve eşik imzalama. Kesinlik, protokol içinde sentezlenen bir komite imzası olduğu için dürüst doğrulayıcıların yeterli bir çoğunluğu zinciri kesinleştirmek için yeterlidir ve protokol, slashing mekanizması yoluyla sınırlı sayıda arızalı veya kötü niyetli doğrulayıcıya tahammül gösterir.

## Dayanıklı doğrulayıcılar {#resilient-validators}

Bir doğrulayıcı tek bir arıza noktası olmamalıdır. Quantaureum'un eşik imzası tasarımı, doğrulayıcı görevlerinin yapısal olarak dağıtılmış olduğu anlamına gelir: kesinlik imzası, tek bir makinenin tek bir sıcak anahtarını tutması yerine komite üyelerinin bir eşiğinden katılım gerektirir. Slashing koşulları ve hisse ağırlıklı seçimle birlikte, bazı doğrulayıcılar çevrimdışı kaldığında bile ağ canlı tutulur.

<ButtonLink variant="outline" href="/staking/">Staking hakkında daha fazla bilgi</ButtonLink>

## Kuantum direnci {#quantum-resistance}

Çoğu köklü blockchain, yeterince büyük bir kuantum bilgisayarın kıracabileceği eliptik eğri kriptografisine dayanır — bu da onları acı verici, kademeli migrasyonlara zorlar. **Quantaureum'un bu sorunu yoktur**: Dilithium3 imzaları, Kyber768 anahtar değişimi, hash tabanlı (FRI) veri kullanılabilirliği taahhütleri ve kuantum rastgelelik, tümü aktif protokol özellikleridir.

<ButtonLink variant="outline" href="/roadmap/security/quantum-resistance/">Kuantum direnci hakkında daha fazla bilgi</ButtonLink>

## Devam eden çalışmalar {#ongoing-work}

Aktif güvenlik çalışmaları arasında eşik imza protokolünü güçlendirme, [veri kullanılabilirliği](/developers/docs/data-availability/) katmanının FRI taahhütlerini genişletme ve QVM'nin paralel yürütme semantiğini formelleştirerek paralel motorun ardışık yürütmeyi kanıtlı olarak eşleştirdiğini sağlamak yer alıyor.
