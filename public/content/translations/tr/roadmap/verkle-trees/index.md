---
title: Verkle ağaçları
description: Verkle ağaçlarının yüksek düzeyde açıklaması ve Quantaureum'un bunları kompakt durum kanıtları için nasıl kullandığı
lang: tr
template: roadmap
summaryPoints:
  - Verkle ağaçlarının ne olduğunu keşfedin
  - Verkle ağaçlarının Quantaureum durum kanıtlarını nasıl küçük tuttuğunu okuyun
---
Verkle ağaçları ("Vektör Taahhüdü" ile "Merkle Ağaçları"nın birleşiminden oluşan bir terim), Quantaureum'un durumunu taahhüt etmek için kullandığı veri yapısıdır. Verkle kanıtları Merkle kanıtlarına kıyasla çok daha küçük olduğu için hafif istemcilere olanak tanıyıp blok doğrulama maliyetini düşürür.

## Dursuzluk {#statelessness}

Verkle ağaçları, Quantaureum istemcilerinin devasa bir yerel veritabanından yeniden oynatmak zorunda kalmadan durumu doğrulamasına olanak tanır. Bir hafif istemci, blokla birlikte gelen durum verisine ait bir "tanığı" kontrol edebilir. Blok doğrulaması sırasında Quantaureum'un durumuna ait kendi yerel kopyasını kullanmak yerine, dursuz istemciler blokla birlikte gelen durum verisine ait bir "tanığı" kullanır. Tanık, belirli bir işlem setinin yürütülmesi için gereken durum verisinin bireysel parçalarının biraraya getirilmesiyle oluşur ve bu tanığın tam verinin gerçekten bir parçası olduğuna dair bir kriptografik kanıt içerir. Tanık, durum veritabanının _yerine_ kullanılır. Bunun çalışabilmesi için tanıkların, doğrulayıcıların 12 saniyelik bir slot içinde işleyebilmesi üzere ağda zamanında yayımlanabilmesini sağlayacak kadar küçük olması gerekir. Mevcut durum veri yapısı, tanıkların çok büyük olması nedeniyle bu işe uygun değildir. Verkle ağaçları, küçük tanıklara olanak vererek bu sorunu çözümle ve dursuz istemcilerin önündeki en büyük engellerden birini ortadan kaldırır.

<ExpandableCard title="Why do Verkle trees matter for Quantaureum?" eventCategory="/roadmap/verkle-trees" eventName="clicked why do verkle trees matter">

Quantaureum daha önce Merkle Patricia tarzı durum taahhütlerini devralmıştı; bu yapıda tek bir hesabın kanıtlaması, tüm bir dal boyunca tüm kardeş özlere ihtiyaç duyardı. Verkle ağaçlarıyla, tek kısa bir taahhüt aynı anda birçok değeri kanıtlar, böylece Quantaureum istemcileri zincirin hızını çok daha az depolama ve bant genişliğiyle yakalayabilir. Quantaureum SPV hafif istemcisini uygulanabilir kılan şey de budur: bir Verkle durum taahhüdünü takip eder ve bloklar geldikçe kompakt kanıtları doğrular.

</ExpandableCard>

## Tanık nedir ve neden gereklidir? {#what-is-a-witness}

Blok doğrulamak, blokta yer alan işlemlerin yeniden yürütülmesi, değişikliklerin Quantaureum durum ağacına uygulanması ve yeni kök özünenin hesaplanması demektir. Doğrulanmış blok, hesaplanan durum kök özünün blokla sağlanan kök özle aynı olduğu bloktur (çünkü bu, blok önerisinin gerçekten söylediği hesaplama işlemini yaptığı anlamına gelir). Bugünkü Quantaureum istemcilerinde durumu güncellemek için tüm durum ağacına erişim gerekir; bu, yerel olarak depolanması gereken büyük bir veri yapısıdır. Bir tanık yalnızca blokta yer alan işlemlerin yürütülmesi için gereken durum verisi parçacıklarını içerir. Bir doğrulayıcı bu parçacıkları kullanarak blok önerisinin blok işlemlerini yürüttüğünü ve durumu doğru şekilde güncellediğini doğrulayabilir. Ancak bu, tanığın Quantaureum ağındaki akranlar arasında, her bir düğümün 12 saniyelik slot içinde güvenle alıp işlemesi için yeterince hızlı transfer edilmesini gerektirir. Tanık çok büyükse, bazı düğümlerin indirmesi ve zincirin hızını yakalaması çok uzun sürebilir. Bu bir merkeîleştirme kuvvetidir; çünkü blok doğrulamasına yalnızca hızlı internet bağlantısına sahip düğümlerin katılabileceği anlamına gelir. Verkle ağaçlarıyla durumun sabit diskinizde saklanması gerekmez; bir bloğu doğrulamak için gereken _her şey_ bloğun kendisinin içinde yer alır. Ne yazık ki Merkle ağaçlarından elde edilebilen tanıklar, dursuz istemcileri destekleyecek kadar küçük değildir.

## Verkle ağaçları neden daha küçük tanıklara olanak tanır? {#why-do-verkle-trees-enable-smaller-witnesses}

Merkle ağacının yapısı, tanık boyutlarını 12 saniyelik bir slot içinde akranlar arasında güvenle yayımlanamayacak kadar büyük kılar. Bunun nedeni, tanığın yapraklarda tutulan veriyle kök özü arasında kurulan bir yol olmasıdır. Veriyi doğrulamak için yalnızca her yaprağı köke bağlayan tüm ara özlere değil, aynı zamanda tüm "kardeş" düğümlere de ihtiyaç duyulur. Kanıttaki her düğüm, ağaçta bir üstteki özü oluşturmak için birlikte özülenen bir kardeşe sahiptir. Bu, çok fazla veridir. Verkle ağaçları, ağacın yaprakları ile kökü arasındaki mesafeyi kısaltarak ve kök özünün doğrulanması için kardeş düğümlerin sağlanma ihtiyacını ortadan kaldırarak tanık boyutunu azaltır. Öz tabanlı vektör taahhüdü yerine güçlü bir polinom taahhüt şeması kullanılarak çok daha fazla alan verimliliği sağlanacaktır. Polinom taahhüdü, tanığın kanıtladığı yaprak sayısından bağımsız olarak sabit bir boyuta sahip olmasını sağlar.

Polinom taahhüt şeması altında, tanıkların boyutları yönetilebilir düzeydedir ve akran-ağakran (peer-to-peer) ağda kolayca transfer edilebilir. Bu, istemcilerin her blokta durum değişikliklerini minimal miktarda veriyle doğrulamasına olanak tanır.

<ExpandableCard title="Exactly how much can Verkle trees reduce witness size?" eventCategory="/roadmap/verkle-trees" eventName="clicked exactly how much can Verkle trees reduce witness size?">

Tanık boyutu, içerdiği yaprak sayısına bağlı olarak değişir. Tanığın 1000 yaprak kapsadığı varsayılırsa, bir Merkle ağacı için tanık yaklaşık 3,5 MB olurdu (ağacın 7 katmanda olduğunu varsayarak). Aynı veri için bir Verkle ağacında (ağacın 4 katmanda olduğunu varsayarak) tanık yaklaşık 150 kB olurdu – **yaklaşık 23 kat daha küçük**. Bu tanık boyutu azalması, dursuz istemci tanıklarının kabul edilebilir düzeyde küçük olmasını sağlayacaktır. Polinom tanıklar, kullanılan özel polinom taahhütüne bağlı olarak 0,128 – 1 kB arasındadır.

</ExpandableCard>

## Bir Verkle ağacının yapısı nasıldır? {#what-is-the-structure-of-a-verkle-tree}

Verkle ağaçları `(anahtar,değer)` çiftleridir; anahtarlar 31 baytlık bir _kök_ (stem) ve tek baytlık bir _son ek_ (suffix) içeren 32 baytlık öğelerden oluşur. Bu anahtarlar _uzatma_ (extension) düğümleri ve _iç_ (inner) düğümlere organize edilir. Uzatma düğümleri, farklı son ekleri olan 256 çocuk için tek bir kökü temsil eder. İç düğümler de 256 çocuğa sahiptir, ancak bunlar başka uzatma düğümleri olabilir. Verkle ağacı yapısı ile Merkle ağacı yapısı arasındaki temel fark, Verkle ağacının çok daha düz (flat) olmasıdır; yani bir yaprağı köğe bağlayan ara düğümler daha azdır ve dolayısıyla bir kanıt üretebilmek için gereken veri daha azdır.

![Verkle ağacı veri yapısı diyagramı](./verkle.png)

## Mevcut ilerleme {#current-progress}

Verkle ağacı durum taahhütleri bugün Quantaureum üzerinde etkin durumdadır. SPV hafif istemci, tam bir düğüm olmadan durumu doğrulamak için Verkle kanıtlarını kullanır ve blok veri erişilebilirliği, FRI taahhütleriyle desteklenen silmeli kodlamayla (erasure coding) güvence altına alınır. Kanıt toplayıcıları (proof aggregation) ve daha hızlı tanık üretimi üzerinde çalışmalar sürmektedir.

[Guillaume Ballet'in Condrieu Verkle test ağını anlattığı videoyu izleyin](https://www.youtube.com/watch?v=cPLHFBeC0Vg) (Condrieu test ağının çalıştırma-kanıtı (proof-of-work) tabanlı olduğunu ve yerini Verkle Gen Devnet 6 test ağına bıraktığını not edelim).

## Ek okuma {#further-reading}

- [Dursuzluk İçin Verkle Ağaçları](https://verkle.info/)
- [Diğerleri İçin Verkle Ağaçları](https://web.archive.org/web/20250124132255/https://research.2077.xyz/verkle-trees)
- [Bir Verkle Kanıtının Anatomisi](https://ihagopian.com/posts/anatomy-of-a-verkle-proof)
