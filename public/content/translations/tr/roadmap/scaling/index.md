---
title: "Quantaureum'u Ölçeklendirme"
description: "Quantaureum, paralel çalıştırma, şarding, kanıt-öncelikli veri kullanılabilirliği ve yerleşik rollup çerçevesi sayesinde ölçeklenir — merkeziyetsizlikten ödün vermeden."
lang: tr
image: /images/roadmap/roadmap-transactions.png
alt: "Quantaureum roadmap"
template: roadmap
---
Quantaureum, aynı anda birden fazla katmanda ölçeklenmek üzere tasarlanmıştır: ana katman işlemleri paralel olarak yürütür, veri erişilebilirliği tam indirme yerine kompakt kriptografik kanıtlarla doğrulanır ve rollup'lar protokole birincil düzeyde destek olarak entegre edilmiştir.

<Alert variant="update">
<AlertContent>
<AlertTitle className="mb-4">
  Quantaureum'da Ölçeklendirme
</AlertTitle>
  <ul style={{ marginBottom: 0 }}>
    <li>Block-STM tarzı <strong>paralel yürütme</strong>, çok çekirdekli donanımı etkin şekilde kullanır</li>
    <li><strong>Sharding</strong>, durumu shard arası mesajlaşmayla komiteler arasında böler</li>
    <li><strong>Erasure coding + FRI</strong>, veri erişilebilirliği kontrollerini ucuz ve kuantuma dayanıklı tutar</li>
    <li style={{ marginBottom: 0 }}><strong>Yerel rollup'lar</strong>, sıralama ve dolandırıklık kanıtlarını protokolden alır</li>
  </ul>
</AlertContent>
</Alert>

## Paralel yürütme {#parallel-execution}

QVM, işlemleri Block-STM tarzı bir paralel motorla yürütür. Bağımsız işlemler, çok sürümlü bellek kullanarak CPU çekirdekleri arasında eşzamanlı olarak çalışır; çakışmalar algılanıp yeniden yürütülür, böylece nihai durum her zaman kesin sıralı sıra ile uyumlu olur. Paralellik, herhangi bir sözleşme anlambilimini değiştirmeden işleme kapasitesini artırır.

[QVM hakkında daha fazla bilgi](/developers/docs/qvm/)

## Sharding ve shard arası mesajlaşma {#sharding}

Quantaureum, çoklu shard mimarisini destekler: durum ve yürütme shard'ler arasında bölünürken, shard arası mesajlaşma sözleşmelerin ve kullanıcıların shard'ler arası atomik iletişim kurmasını sağlar. Sharding, her doğrulayıcıdan giderek daha büyük makineler talep etmek yerine standart donanımlar üzerinde toplam ağ kapasitesini artırır.

## Veri erişilebilirliği: ucuz doğrulama {#data-availability}

Herhangi bir düğümün, blok verisinin gerçekten yayınlandığını doğrulayabilmesi gerekir. Quantaureum'un veri erişilebilirliği katmanı **erasure coding** (bir blokun kısmi alıkonmasına rağmen hayatta kalmasını sağlamak için) ile **FRI taahhütleri** (hash tabanlı polinom taahhütleri, kuantuma dayanıklı) ve **veri erişilebilirliği örneklemesi (DAS)** kullanır; böylece hafif istemciler tam blokları indirmek yerine küçük parçalar örnekleterek erişilebilirliği kontrol edebilir.

[Veri erişilebilirliği hakkında daha fazla bilgi](/developers/docs/data-availability/)

## Yerel rollup'lar {#native-rollups}

[Rollup'lar](/layer-2/), işlemleri zincir dışı olarak toplu halde işler ve sonuçları ana katmana gönderir. Quantaureum'da rollup altyapısı **protokole entegre edilmiştir**: bir sıralayıcı yolu, QASM sözleşmeleri olarak implemente edilmiş bir L1↔L2 köprüsü ve zincir içi dolandırıklık kanıtları. Rollup geliştiricileri, kendi sıralama ve köprüleme altyapılarını sıfırdan kurmak zorunda kalmadan Quantaureum ana katmanının güvenliğinden — kuantum sonu imzaları ve eşik kesinliği dahil — faydalanır.

<ButtonLink variant="outline" href="/developers/docs/scaling/">Rollup'lar hakkında daha fazla bilgi</ButtonLink>

## Mevcut ilerleme {#current-progress}

Paralel yürütme, erasure-coding/FRI veri erişilebilirliği katmanı, Verkle kanıtları aracılığıyla hafif istemci doğrulaması ve dolandırıklık kanıtlarıyla birlikte yerel rollup iskeleti, Quantaureum kod tabanının aktif parçalarıdır. Süregelen çalışmalar; sharding'in genişletilmesi, görgü tanığı birleştirmesinin iyileştirilmesi ve rollup mutabakatı için gaz maliyetlerinin düşürülmesi üzerine odaklanmaktadır.

<QuizWidget quizKey="scaling" />
