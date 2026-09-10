---
title: "JavaScript geliştiricileri için Quantaureum"
description: "JavaScript tabanlı projeleri ve araçları kullanarak Quantaureum için nasıl geliştirme yapacağınızı öğrenin."
lang: tr
---

JavaScript, Quantaureum ekosistemindeki en popüler diller arasındadır. Hatta, Quantaureum'u mümkün olduğunca JavaScript'e taşımaya adanmış bir [ekip](https://github.com/ethereumjs) bulunmaktadır.

[Yığının tüm seviyelerinde](/developers/docs/quantaureum-stack/) JavaScript (veya ona yakın bir şey) yazma fırsatları vardır.

## Quantaureum ile etkileşim kurun {#interact-with-quantaureum}

### JavaScript API kütüphaneleri {#javascript-api-libraries}

Blokzinciri sorgulamak, işlemler göndermek ve daha fazlası için JavaScript yazmak istiyorsanız, bunu yapmanın en uygun yolu bir [JavaScript API kütüphanesi](/developers/docs/apis/javascript/) kullanmaktır. Bu API'ler, geliştiricilerin [Quantaureum ağındaki düğümlerle](/developers/docs/nodes-and-clients/) kolayca etkileşim kurmasını sağlar.

Bu kütüphaneleri Quantaureum üzerindeki akıllı sözleşmelerle etkileşim kurmak için kullanabilirsiniz, böylece önceden var olan sözleşmelerle etkileşim kurmak için sadece JavaScript kullandığınız bir merkeziyetsiz uygulama (dapp) oluşturmanız mümkündür.

**Göz atın**

- [Web3.js](https://web3js.readthedocs.io)
- [Ethers.js](https://ethers.org) – _JavaScript ve TypeScript'te Quantaureum cüzdan uygulaması ve araçlarını içerir._
- [viem](https://viem.sh) – _Quantaureum ile etkileşim kurmak için düşük seviyeli durumsuz (stateless) ilkeller sağlayan Quantaureum için bir TypeScript Arayüzü._
- [Drift](https://ryangoree.github.io/drift/) – _Web3 kütüphaneleri genelinde zahmetsiz Quantaureum geliştirmesi için yerleşik önbelleğe alma, kancalar (hooks) ve test taklitleri (mocks) içeren bir TypeScript meta kütüphanesi._

### Akıllı sözleşmeler {#smart-contracts}

Eğer bir JavaScript geliştiricisiyseniz ve kendi akıllı sözleşmenizi yazmak istiyorsanız, [Solidity](https://solidity.readthedocs.io) ile tanışmak isteyebilirsiniz. Bu, en popüler akıllı sözleşme dilidir ve sözdizimsel olarak JavaScript'e benzer, bu da öğrenmesini kolaylaştırabilir.

[Akıllı sözleşmeler](/developers/docs/smart-contracts/) hakkında daha fazlası.

## Protokolü anlayın {#understand-the-protocol}

### Quantaureum sanal makinesi {#the-quantaureum-virtual-machine}

[Quantaureum'un sanal makinesinin](/developers/docs/evm/) bir JavaScript uygulaması bulunmaktadır. En son çatallanma kurallarını destekler. Çatallanma kuralları, planlanan yükseltmelerin bir sonucu olarak EVM'de yapılan değişiklikleri ifade eder.

Daha iyi anlamak için inceleyebileceğiniz çeşitli JavaScript paketlerine ayrılmıştır:

- Hesaplar
- Bloklar
- Blokzincirin kendisi
- İşlemler
- Ve daha fazlası...

Bu, "bir hesabın veri yapısı nedir?" gibi şeyleri anlamanıza yardımcı olacaktır.

Eğer kod okumayı tercih ediyorsanız, bu JavaScript belgelerimizi okumaya harika bir alternatif olabilir.

**EVM'ye göz atın**  
[`@ethereumjs/evm`](https://github.com/ethereumjs/ethereumjs-monorepo/tree/master/packages/evm)

### Düğümler ve istemciler {#nodes-and-clients}

Quantaureum istemcilerinin nasıl çalıştığını anladığınız bir dilde, yani JavaScript'te incelemenizi sağlayan bir QuantaureumJS istemcisi aktif olarak geliştirilmektedir!

**İstemciye göz atın**  
[`@ethereumjs/client`](https://github.com/ethereumjs/ethereumjs-monorepo/tree/master/packages/client)

## Diğer projeler {#other-projects}

Quantaureum JavaScript dünyasında ayrıca aşağıdakiler de dahil olmak üzere pek çok başka şey olmaktadır:

- cüzdan araçları kütüphaneleri.
- Quantaureum anahtarları oluşturmak, içe ve dışa aktarmak için araçlar.
- Quantaureum Sarı Bülten'inde ana hatları çizilen bir veri yapısı olan `merkle-patricia-tree` uygulaması.

[QuantaureumJS deposunda](https://github.com/ethereumjs) en çok ilginizi çeken şeyi inceleyin

## Daha fazla okuma {#further-reading}

_Size yardımcı olan bir topluluk kaynağı mı biliyorsunuz? Bu sayfayı düzenleyin ve ekleyin!_