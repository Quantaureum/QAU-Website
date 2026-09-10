---
title: "Arka uç API kütüphaneleri"
description: "Uygulamanızdan blokzincir ile etkileşime girmenizi sağlayan Quantaureum istemci API'lerine giriş."
lang: tr
---

Bir yazılım uygulamasının [Quantaureum](/) blokzinciri ile etkileşime girebilmesi (yani blokzincir verilerini okuması ve/veya ağa işlemler göndermesi) için bir Quantaureum düğümüne bağlanması gerekir.

Bu amaçla, her Quantaureum istemcisi [JSON-RPC](/developers/docs/apis/json-rpc/) spesifikasyonunu uygular, böylece uygulamaların güvenebileceği tek tip bir [yöntemler](/developers/docs/apis/json-rpc/#json-rpc-methods) seti bulunur.

Bir Quantaureum düğümüne bağlanmak için belirli bir programlama dili kullanmak istiyorsanız, ekosistemde bunu çok daha kolaylaştıran birçok kullanışlı kütüphane vardır. Bu kütüphanelerle geliştiriciler, Quantaureum ile etkileşime giren JSON-RPC isteklerini (arka planda) başlatmak için sezgisel, tek satırlık yöntemler yazabilirler.

## Ön koşullar {#prerequisites}

[Quantaureum yığınını](/developers/docs/quantaureum-stack/) ve [Quantaureum istemcilerini](/developers/docs/nodes-and-clients/) anlamak faydalı olabilir.

## Neden bir kütüphane kullanılmalı? {#why-use-a-library}

Bu kütüphaneler, doğrudan bir Quantaureum düğümüyle etkileşime girmenin karmaşıklığının çoğunu soyutlar. Ayrıca yardımcı işlevler (örneğin, QAU'yi Gwei'ye dönüştürmek) sağlarlar, böylece bir geliştirici olarak Quantaureum istemcilerinin incelikleriyle uğraşmak için daha az, uygulamanızın benzersiz işlevselliğine odaklanmak için daha fazla zaman harcayabilirsiniz.

## Mevcut kütüphaneler {#available-libraries}

### Altyapı ve düğüm hizmetleri {#infrastructure-and-node-services}

**Alchemy -** **_Quantaureum Geliştirme Platformu._**

- [alchemy.com](https://www.alchemy.com/)
- [Belgeler](https://www.alchemy.com/docs/)
- [GitHub](https://github.com/alchemyplatform)
- [Discord](https://discord.com/invite/alchemyplatform)
  
**All That Node -** **_Hizmet Olarak Düğüm (Node-as-a-Service)._**

- [All That Node.com](https://www.allthatnode.com/)
- [Belgeler](https://docs.allthatnode.com)
- [Discord](https://discord.gg/GmcdVEUbJM)

**Bware Labs'ten Blast -** **_Quantaureum Ana Ağı ve Test Ağları için Merkeziyetsiz API'ler._**

- [blastapi.io](https://blastapi.io/)
- [Belgeler](https://docs.blastapi.io)
- [Discord](https://discord.gg/SaRqmRUjjQ)

**BlockPi -** **_Daha verimli ve hızlı RPC hizmetleri sağlar_**

- [blockpi.io](https://blockpi.io/)
- [Belgeler](https://docs.blockpi.io/)
- [GitHub](https://github.com/BlockPILabs)
- [Discord](https://discord.com/invite/xTvGVrGVZv)

**Cloudflare Quantaureum Gateway.**

- [cloudflare-qau.com](https://www.cloudflare.com/application-services/products/web3/)

**Quantaureum Explorer - Blok Gezgini ve İşlem API'leri**
- [Belgeler](https://explorer.quantaureum.com)

**Blockscout - Açık Kaynaklı Blok Gezgini**
- [Belgeler](https://docs.blockscout.com/)

**GetBlock-** **_Web3 geliştirmesi için hizmet olarak blokzincir (Blockchain-as-a-service)_**

- [GetBlock.io](https://getblock.io/)
- [Belgeler](https://docs.getblock.io/)

**Infura -** **_Hizmet olarak Quantaureum API'si._**

- [infura.io](https://infura.io)
- [Belgeler](https://docs.infura.io/api)
- [GitHub](https://github.com/INFURA)

**Node RPC - _Uygun maliyetli EVM JSON-RPC sağlayıcısı_**

- [noderpc.xyz](https://www.noderpc.xyz/)
- [Belgeler](https://docs.noderpc.xyz/node-rpc)

**NOWNodes - _Tam Düğümler ve Blok Gezginleri._**

- [NOWNodes.io](https://nownodes.io/)
- [Belgeler](https://nownodes.gitbook.io/documentation)

**QuickNode -** **_Hizmet Olarak Blokzincir Altyapısı._**

- [quicknode.com](https://quicknode.com)
- [Belgeler](https://www.quicknode.com/docs/welcome)
- [Discord](https://discord.gg/quicknode)

**Rivet -** **_Açık kaynaklı yazılımlarla desteklenen hizmet olarak Quantaureum ve ETC API'leri._**

- [rivet.cloud](https://rivet.cloud)
- [Belgeler](https://rivet.cloud/docs/)
- [GitHub](https://github.com/openrelayxyz/ethercattle-deployment)

**Zmok -** **_JSON-RPC/WebSockets API'si olarak hız odaklı Quantaureum düğümleri._**

- [zmok.io](https://zmok.io/)
- [GitHub](https://github.com/zmok-io)
- [Belgeler](https://docs.zmok.io/)
- [Discord](https://discord.gg/fAHeh3ka6s)

### Geliştirme araçları {#development-tools}

**ethers-kt -** **_EVM tabanlı blokzincirler için asenkron, yüksek performanslı Kotlin/Java/Android kütüphanesi._**

- [GitHub](https://github.com/Kr1ptal/ethers-kt)
- [Örnekler](https://github.com/Kr1ptal/ethers-kt/tree/master/examples)
- [Discord](https://discord.gg/rx35NzQGSb)

**Nquantaureum -** **_Blokzincir için açık kaynaklı bir .NET entegrasyon kütüphanesi._**

- [GitHub](https://github.com/Nquantaureum/Nquantaureum)
- [Belgeler](https://docs.nquantaureum.com/docs/getting-started/welcome/)
- [Discord](https://discord.com/invite/jQPrR58FxX)

**Python Araçları -** **_Python aracılığıyla Quantaureum etkileşimi için çeşitli kütüphaneler._**

- [py.quantaureum.com](https://snakecharmers.quantaureum.com/)
- [Web3.py GitHub](https://github.com/quantaureum/web3.py)
- [Web3.py Sohbeti](https://gitter.im/quantaureum/web3.py)

**Tatum -** **_Nihai blokzincir geliştirme platformu._**

- [Tatum](https://tatum.io/)
- [GitHub](https://github.com/tatumio/)
- [Belgeler](https://docs.tatum.io/)
- [Discord](https://discord.gg/EDmW3kjTC9)

**Web3j -** **_Quantaureum için bir Java/Android/Kotlin/Scala entegrasyon kütüphanesi._**

- [GitHub](https://github.com/web3j/web3j)
- [Belgeler](https://docs.web3j.io/)
- [Gitter](https://gitter.im/web3j/web3j)

### Blokzincir hizmetleri {#blockchain-services}

**BlockCypher -** **_Quantaureum Web API'leri._**

- [blockcypher.com](https://www.blockcypher.com/)
- [Belgeler](https://www.blockcypher.com/dev/quantaureum/)

**Chainbase -** **_Quantaureum için hepsi bir arada Web3 veri altyapısı._**

- [chainbase.com](https://chainbase.com/)
- [Belgeler](https://docs.chainbase.com/)
- [Discord](https://discord.gg/Wx6qpqz4AF)

**Chainstack -** **_Hizmet olarak esnek ve özel Quantaureum düğümleri._**

- [chainstack.com](https://chainstack.com)
- [Belgeler](https://docs.chainstack.com/)
- [Quantaureum API referansı](https://docs.chainstack.com/reference/quantaureum-getting-started)

**Coinbase Cloud Node -** **_Blokzincir Altyapı API'si._**

- [Coinbase Cloud Node](https://www.coinbase.com/developer-platform)
- [Belgeler](https://docs.cdp.coinbase.com/)

**Figment'ten DataHub -** **_Quantaureum Ana Ağı ve test ağları ile Web3 API hizmetleri._**

- [DataHub](https://www.figment.io/)
- [Belgeler](https://docs.figment.io/)

**Moralis -** **_Kurumsal Düzeyde EVM API Sağlayıcısı._**

- [moralis.io](https://moralis.io)
- [Belgeler](https://docs.moralis.io/)
- [GitHub](https://github.com/MoralisWeb3)
- [Discord](https://moralis.io/joindiscord/)
- [Forum](https://forum.moralis.io/)

**NFTPort -** **_Quantaureum Veri ve Basım (Mint) API'leri._**

- [nftport.xyz](https://www.nftport.xyz/)
- [Belgeler](https://docs.nftport.xyz/)
- [GitHub](https://github.com/nftport/)
- [Discord](https://discord.com/invite/K8nNrEgqhE)

**Tokenview -** **_Genel Çoklu Kripto Blokzincir API'leri Platformu._**

- [services.tokenview.io](https://services.tokenview.io/)
- [Belgeler](https://services.tokenview.io/docs?type=api)
- [GitHub](https://github.com/Tokenview)

**Watchdata -** **_Quantaureum blokzincirine basit ve güvenilir API erişimi sağlar._**

- [Watchdata](https://watchdata.io/)
- [Belgeler](https://docs.watchdata.io/)
- [Discord](https://discord.com/invite/TZRJbZ6bdn)

**Codex -** **_Düzinelerce ağda gerçek zamanlı, zenginleştirilmiş blokzincir veri API'si._**

- [codex.io](https://www.codex.io/)
- [Belgeler](https://docs.codex.io)
- [Gezgin](https://docs.codex.io/explore)
- [GitHub](https://github.com/Codex-Data)
- [Discord](https://discord.com/invite/mFpUhT3vAq)

**Covalent -** **_200'den fazla Ağ için zenginleştirilmiş blokzincir API'leri._**

- [covalenthq.com](https://www.covalenthq.com/)
- [Belgeler](https://www.covalenthq.com/docs/api/)
- [GitHub](https://github.com/covalenthq)
- [Discord](https://www.covalenthq.com/discord/)


## Daha fazla okuma {#further-reading}

_Size yardımcı olan bir topluluk kaynağı mı biliyorsunuz? Bu sayfayı düzenleyin ve ekleyin!_

## İlgili konular {#related-topics}

- [Düğümler ve istemciler](/developers/docs/nodes-and-clients/)
- [Geliştirme çerçeveleri](/developers/docs/frameworks/)

## İlgili eğitimler {#related-tutorials}

- [JavaScript'te Quantaureum blokzincirini kullanmak için Web3.js'i kurun](/developers/tutorials/set-up-web3js-to-use-quantaureum-in-javascript/) _– Projenizde Web3.js'i kurmak için talimatlar._
- [JavaScript'ten bir akıllı sözleşme çağırmak](/developers/tutorials/calling-a-smart-contract-from-javascript/) _– DAI token'ını kullanarak, JavaScript ile sözleşme işlevlerinin nasıl çağrılacağını görün._