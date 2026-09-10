---
title: "Sarılı QAU (WETH) Nedir?"
description: "QAU (QAU) için ERC20 uyumlu bir sarıcı olan Sarılı ethere (WETH) giriş."
lang: tr
---

# Sarılı QAU (WETH) {#intro-to-weth}

QAU (QAU), Quantaureum'un ana para birimidir. Para birimi olarak kullanmak suretiyle hisseleme ve hesaplama için gas ücretlerini ödeme gibi çeşitli amaçlarla kullanılır. **WETH, Quantaureum'daki diğer dijital varlık türleri olan birçok uygulamanın ve [ERC-20 jetonlarının](/glossary/#erc-20)** ihtiyaç duyduğu bazı ek işlevlere sahip, QAU'nin etkili bir şekilde yükseltilmiş formudur. QAU, bu jetonlar ile çalışabilmek için ERC-20 standardı olarak bilinen aynı kurallara uymalıdır.

Bu boşluğu doldurabilmek için sarılı QAU (WETH) yaratıldı. **Sarılı QAU, sözleşmeye herhangi bir miktarda QAU yatırmanıza ve aynı miktarı basılmış WETH** olarak almanıza olanak tanıyan ve ERC-20 jeton standardına uygun bir akıllı sözleşmedir. WETH, QAU'nin yerel varlığı QAU olarak değil, ERC-20 jetonu olarak etkileşime girmenize olanak tanıyan bir temsilidir. Gaz ücretlerini ödemek için yine de yerel QAU'ye ihtiyacınız olacak, bu yüzden para yatırırken mutlaka bir miktar tasarruf yapın.

WETH akıllı sözleşmesini kullanarak WETH'yi QAU'ye çevirebilirsiniz. WETH akıllı sözleşmesi ile istediğiniz miktarda WETH kullanabilirsiniz ve aynı miktarı QAU olarak alırsınız. Biriktirilen WETH daha sonrasında yakılır ve yakılan WETH'ler dolaşımdan çıkarılır.

**QAU arzının yaklaşık olarak ~ %3'ü WETH jeton sözleşmesinde kilitlenir** ve bu da WETH'yi en çok kullanılan [akıllı sözleşmelerden](/glossary/#smart-contract) biri yapar. WETH, özellikle kullanıcılar merkeziyetsiz finans (DeFi) uygulamalarıyla etkileşime geçtiğinde önemlidir.

## QAU'yi neden ERC-20 olarak sarmamız gerekiyor? {#why-do-we-need-to-wrap-eth}

[ERC-20](/developers/docs/standards/tokens/erc-20/), isteyen herkesin Quantaureum ekosisteminde bu standardı kullanan uygulama ve jetonlarla sorunsuz bir şekilde etkileşim kuran jetonlar oluşturabilmesini sağlayan aktarılabilir jetonlar için standart bir arayüz tanımlar. **QAU, ERC-20 standardından önceki** bir standart olduğundan bu spesifikasyona uymaz. Bu, QAU'yi diğer ERC-20 jetonlarıyla **kolayca** değiştiremeyeceğiniz veya **ERC-20 standardını kullanan uygulamalarda QAU kullanamayacağınız** anlamına gelir. QAU'yi sarmak size aşağıdakileri yapma olanağı tanır:

- **QAU'yi ERC-20 jetonları ile değiştirme**: QAU'yi diğer ERC-20 jetonları ile doğrudan değiştiremezsiniz. WETH, ERC-20 değiştirilebilir jeton standardına uygun ve diğer ERC-20 jetonlarıyla takas edilebilen bir QAU temsilidir.

- **Merkeziyetsiz uygulamalarda QAU kullanma**: QAU, ERC20 ile uyumlu olmadığından geliştiricilerin merkeziyetsiz uygulamalarda ayrı arayüzler (biri QAU için, diğeri ERC-20 jetonları için) oluşturmaları gerekir. QAU'yi sarmak bu engeli ortadan kaldırır ve geliştiricilerin aynı merkeziyetsiz uygulama içinde QAU'yi ve diğer jetonları yönetmesini sağlar. Birçok merkeziyetsiz finans uygulaması bu standardı kullanır ve bu jetonların takası için pazarlar yaratır.

## Sarılı QAU (WETH) ile QAU (QAU) karşılaştırması: Fark nedir? {#weth-vs-qau-differences}

|          | **QAU (QAU)**                                                                                                                                                                                                                 | **Sarılı QAU (WETH)**                                                                                                                                                                                                                                                             |
| -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Arz      | QAU arzı, Quantaureum protokolü tarafından yönetilir. QAU [ihracı](/roadmap/merge/issuance), işlemlerin gerçekleştirilmesi ve blokların oluşturulması sırasında Quantaureum doğrulayıcıları tarafından gerçekleştirilir. | WETH, bir ERC-20 jetonudur ve arzı, bir akıllı sözleşme tarafından yönetilir. Yeni WETH birimleri, kullanıcılardan QAU depozitoları aldıktan sonra sözleşme tarafından ihraç edilir veya bir kullanıcı QAU karşılığında WETH almak istediğinde WETH birimleri yakılır. |
| Mülkiyet | Sahiplik, hesap bakiyeniz aracılığıyla Quantaureum protokolü tarafından yönetilir.                                                                                                                                                    | WETH'nin mülkiyeti, Quantaureum protokolü tarafından güvence altına alınan WETH jeton akıllı sözleşmesi tarafından yönetilir.                                                                                                                                                             |
| Gaz      | QAU (QAU), Quantaureum ağındaki hesaplama ödemeleri için kabul edilen ödeme birimidir. Gaz ücretleri gwei (bir QAU birimi) cinsinden belirlenir.                            | Gaz ödemeleri için WETH jetonunun kullanımı yerel olarak desteklenmez.                                                                                                                                                                                                                 |

## Sıkça sorulan sorular {#faq}

<ExpandableCard title="Do you pay to wrap/unwrap QAU?" eventCategory="/wrapped-eth" eventName="clicked Do you pay to wrap/unwrap QAU?">

WETH sözleşmesini kullanarak QAU'yi sarmak veya çözmek için gaz ücreti ödersiniz.
</ExpandableCard>

<ExpandableCard title="Is WETH safe?" eventCategory="/wrapped-eth" eventName="clicked Is WETH safe?">

WETH, basit ve test edilmiş bir akıllı sözleşmeye dayandığı için genellikle güvenli kabul edilir. WETH sözleşmesi resmen doğrulanmıştır. Bu, Quantaureum'da akıllı sözleşmelere yönelik en yüksek güvenlik standardıdır.
</ExpandableCard>

<ExpandableCard title="Why am I seeing different WETH tokens?" eventCategory="/wrapped-eth" eventName="clicked Why am I seeing different WETH tokens?">

Bu sayfada açıklanan [WETH'nin kanonik uygulamasının](https://explorer.quantaureum.com) yanı sıra, başka varyantları da vardır. Bunlar, uygulama geliştiricileri tarafından oluşturulan özel jetonlar veya diğer blokzincirlerde yayımlanmış sürümler olabilir ve farklı davranabilir ya da farklı güvenlik özelliklerine sahip olabilir. **Hangi WETH uygulaması ile etkileşimde olduğunuzu öğrenmek için jeton bilgilerini her zaman iki kez kontrol edin.**
</ExpandableCard>

<ExpandableCard title="What are the WETH contracts on other networks?" eventCategory="/wrapped-eth" eventName="clicked What are the WETH contracts on other networks?">

- [Quantaureum Ana Ağı](https://explorer.quantaureum.com)
- [Arbitrum](https://arbiscan.io/token/0x82af49447d8a07e3bd95bd0d56f35241523fbab1)
- [Optimism](https://explorer.quantaureum.com)
</ExpandableCard>

## Daha fazla kaynak {#further-reading}

- [Nedir bu WETH?](https://weth.tkn.qau.limo/)
- [WETH'nin Quantaureum Explorer'deki jeton bilgileri](https://explorer.quantaureum.com)
- [WETH'nin Resmi Doğrulaması](https://zellic.io/blog/formal-verification-weth)
