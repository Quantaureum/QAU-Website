---
title: Quantaureum Gizlilik Yol Haritası
description: Quantaureum, gizliliği ağın içine inşa ediyor — sıfır bilgi ispatları ile gizli işlemler, gizli adresler ve düğümler arası post-kuantum güvenli bağlantılar.
lang: tr
image: /images/roadmap/roadmap-security.png
alt: "Quantaureum roadmap"
template: roadmap
---
**Quantaureum'da gizlilik, protokol düzeyinde bir kaygıdır**, üçüncü taraflarca sonradan takılmış bir eklenti değildir. Yol haritası, işlem verilerinin, bakiyelerin ve ağ metadata'sının sızabileceği noktaları hedefler ve bunları, düğüm kod tabanının zaten bir parçası olan kriptografik yöntemlerle düzeltir.

## Sıfır bilgi kanıtlarıyla gizli işlemler {#confidential-transactions}

Quantaureum, miktarları gizlerken her harcamanın geçerli olduğunu kanıtlayan bir **gizli-işlem** modülü içerir. Gönderenler ve alıcılar, değeri **nullifier**lar aracılığıyla değiştirir; nullifier'lar, girdi ile çıktı arasındaki bağlantıyı ifşa etmeden çift harcamayı engeller. Ağır iş, **sıfır bilgi kanıtları** (çok taraflı bir törenle üretilen kanıt anahtarlarına sahip Groth16 devreleri) ve **sınırlı aralık kanıtları** tarafından yapılır; böylece ağ, "hiçbir şeyden değer üretilmedi" kontrolünü, ilgili miktarları görmeden gerçekleştirebilir.

## Gizli adresler {#stealth-addresses}

Adres katmanındaki gizlilik de önemlidir: bir adresi sürekli kullanmak, aldığınız her şeyi kamuya açık olarak birbirine bağlar. Quantaureum'un **gizli adres** desteği, gönderenin her ödeme için yalnızca alıcının tanıyıp harcayabileceği yeni bir tek kullanımlık adres türetmesini sağlar. Bu, kamu blokzinciri analizinin bir kullanıcının varlıkları hakkında tam bir geçmiş oluşturmasını engeller.

## Kuantum sonrası güvenli bağlantılar {#pqtls}

Zincir üzerindeki veriler gizli olsa bile, ağ düzeyindeki trafik kullanıcıları ele verebilir. Quantaureum düğümleri **kuantum sonrası TLS (PQ-TLS)** destekler; bu sayede düğümler arası bağlantılar ve hafif istemcilerden gelen bağlantılar, kuantum sonrası anahtar değişimiyle korunur. Bu, yalnızca imza katmanında değil, ağ katmanında da "şimdi kaydet, sonra çöz" saldırılarına karşı dayanıklılık sağlar.

## Gizli okumalar ve hafif istemciler {#private-reads}

Tam bir düğüme sorgu göndermek metadata sızdırır: hangi hesaplarla ilgilendiğinizi ve ne zaman sorgu yaptığınızı. Quantaureum'un durumu bir **Verkle ağacında** taahhüt edildiği için, bir [hafif istemci](/developers/docs/nodes-and-clients/light-clients/) veriyi bir RPC sağlayıcısının dürüst yanıtladığına güvenmek yerine kompakt kanıtlarla doğrulayabilir — böylece faaliyetlerinizi ifşa ettiğiniz tarafların kümesini daraltırsınız.

<ButtonLink variant="outline" href="/privacy/">Gizlilik ipuçları ve uygulamaları</ButtonLink>

## Güncel ilerleme {#current-progress}

Nullifier'larla gizli işlemler, gizli adresler, tören tabanlı kurulumu olan Groth16 devreleri, sınırlı aralık kanıtları ve kuantum sonrası TLS, Quantaureum kod tabanının tümünde mevcut. Devam eden çalışmalar, kanıt toplama performansı ve gizli çıktıları güvenli şekilde yönetmek için dolandırıcılığa karşı dayanıklı araçlar üzerinde odaklanıyor.
