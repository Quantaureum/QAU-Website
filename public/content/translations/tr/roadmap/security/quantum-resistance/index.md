---
title: "Tasarımda kuantum sonrası güvenlik"
description: "Quantaureum, baştan sona kuantum sonrası kriptografi ile inşa edildi — Dilithium3 imzaları ve Kyber768 anahtar değişimi — bu sayede herhangi bir geçiş işlemine gerek yoktur."
lang: tr
image: /images/roadmap/roadmap-future.png
alt: "Quantaureum roadmap"
template: roadmap
summaryPoints:
  - "Kuantum bilgisayarlar, mevcut blok zincirlerin çoğunda kullanılan eliptik eğri kriptografisini nihayetinde bozacak"
  - "Quantaureum, genesis'ten itibaren kuantum sonrasına dayanıklıdır: her yerde Dilithium3 imzaları ve Kyber768 anahtar değişimi"
  - "Gelecekte bir anahtar geçişi gerekmez — anahtarlarınız ve adresleriniz zaten kuantum güvenliğine sahiptir"
---
Bugün üretimde olan çoğu blockchain, eliptik eğri kriptografisine (ECDSA, Ed25519, BLS) dayanmaktadır; yeterince yetenekli bir kuantum bilgisayar, [Shor algoritması](https://en.wikipedia.org/wiki/Shor%27s_algorithm) ile bu yapıları kırabilir. Canlı bir ağda yeni kriptografi kurmak, her cüzdanı, borsayı ve akıllı sözleşmeyi de birlikte sürükleyerek taşıyan yavaş ve riskli bir geçiş demektir.

**Quantaureum, kuantum sonrası mimariden başlayarak bu soruyu tamamen atlatmıştır.** Zincik, hem klasik hem de kuantum saldırganlara karşı güvenli kriptografik yapılar etrafında sıfırdan tasarlanmıştır.

## Kuantum sonrası yığın {#post-quantum-stack}

Quantaureum, protokol boyunca NIST tarafından standardize edilmiş kuantum sonrası primitifler kullanır:

- **Dilithium3 (FIPS 204)** — işlemler ve geçerleyici onayları için dijital imzalar. Zincikteki her hesap anahtarı ve her imza Dilithium3'tür.
- **Kyber768 / ML-KEM (FIPS 203)** — düğümler arası güvenli kanallar ve kurulmuş şifreli bağlantılar için kuantum sonrası anahtar kapsülleme.
- **Kuantum rastgelelik** — bir kuantum rastgele sayı üretici (QRNG), geçerleyici seçimi ve anahtar ritüelleri gibi töreleri besleyerek zayıf entropi kaynaklarını ortadan kaldırır.
- **GM-QTD eşik imzaları** — geçerleyici komiteleri, blok kesinliği için eşik imzaları üretir; dağıtık anahtar üretimi de dahildir.

## "Tasarımda kuantum sonrası" neden önemli? {#why-by-design-matters}

Kuantum sonrası standartlar ortaya çıkmadan önce piyasaya sürülen zincirler, çok yıllık bir geçişle karşı karşıyadır: yeni adres biçimleri, yeni cüzdan yazılımları ve konsensüs için yeni imza şemaları; tüm bunlar ağın canlı kalması zorunluluğuyla birlikte yürütülmelidir. Quantaureum'da:

- **Hesaplar zaten kuantuma karşı güvenlidir.** Bazı bir gelecek yükseltmeye kadar ECDSA anahtarlarının güvende kalacağına dair gizli bir varsayım yoktur.
- **Konsensüs zaten kuantuma karşı güvenlidir.** [Geçerleyici](/glossary/#validator) imzaları eşik Dilithium3'tür; kuantum bilgisayarın sahte üretebileceği eşleşmeye dayalı şemalar değildir.
- **Veri erişilebilirliği zaten kuantuma karşı güvenlidir.** DA katmanı, eşleşmeye dayalı polinom taahhütleri yerine FRI (hash tabanlı) taahhütleri kullanan silme kodlamasına dayanır.

## Tehdit modeli {#threat-model}

256-bit eliptik eğri kriptografisini kırmaya yetenekli kuantum bilgisayarlar bugün mevcut değildir. Ancak saldırganlar şimdi şifreli metni kaydedip daha sonra çözümleyebilir ("şimdi topla, sonra çöz"); on yıllar boyunca değer güvenliğini garanti altına almayı hedefleyen her sistem, tehdidin en kötü senaryo zaman çizelgesiyle geleceğini varsaymalıdır.

Kuantum sonrası primitifleri birinci günden itibaren kullanmak, en zayıf varsayımı ortadan kaldırır; bedeli ise daha büyük imza ve genel anahtar boyutlarıdır. Quantaureum'un protokol parametreleri — [12 saniyelik slotlar](/developers/docs/consensus-mechanisms/pos/) dahil eşik [kesinlik](/glossary/#finality) — bu daha büyük kriptografik yükler göz önünde bulundurularak seçilmiştir.

## Güncel ilerleme {#current-progress}

Tam kuantum sonrası yığın — Dilithium3, Kyber768, GM-QTD, FRI tabanlı veri erişilebilirliği — Quantaureum ağı üzerinde bugün canlıdır.
