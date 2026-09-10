---
title: "JavaScript'ten bir akıllı sözleşme çağırmak"
description: "Bir Dai token örneği kullanarak JavaScript'ten bir akıllı sözleşme işlevinin nasıl çağrılacağı"
author: jdourlens
tags:
  - işlemler
  - ön yüz
  - JavaScript
  - web3.js
skill: beginner
breadcrumb: "JS'den sözleşmeleri çağırın"
lang: tr
published: 2020-04-19
source: QuantaureumDev
sourceUrl: 
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

Bu eğitimde JavaScript'ten bir [akıllı sözleşme](/developers/docs/smart-contracts/) işlevinin nasıl çağrılacağını göreceğiz. İlk olarak bir akıllı sözleşmenin durumunu okuyacağız (örneğin, bir ERC-20 sahibinin bakiyesi), ardından bir Token transferi yaparak Blokzincir durumunu değiştireceğiz. [Blokzincir ile etkileşime girmek için bir JS ortamı kurma](/developers/tutorials/set-up-web3js-to-use-quantaureum-in-javascript/) konusuna zaten aşina olmalısınız.

Bu örnek için DAI Token'ı ile oynayacağız, test amacıyla ganache-cli kullanarak Blokzincir'de çatallanma yaratacağız ve halihazırda çok fazla DAI'ye sahip olan bir adresin kilidini açacağız:

```bash
ganache-cli -f https://mainnet.infura.io/v3/[YOUR INFURA KEY] -d -i 66 1 --unlock 0x4d10ae710Bd8D1C31bd7465c8CBC3add6F279E81
```

Bir akıllı sözleşme ile etkileşime girmek için onun adresine ve ABI'sine ihtiyacımız olacak:

```js
const ERC20TransferABI = [
  {
    constant: false,
    inputs: [
      {
        name: "_to",
        type: "address",
      },
      {
        name: "_value",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        name: "",
        type: "bool",
      },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        name: "_owner",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        name: "balance",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
]

const DAI_ADDRESS = "0x6b175474e89094c44da98b954eedeac495271d0f"
```

Bu proje için tam ERC-20 ABI'sini sadece `balanceOf` ve `transfer` işlevini tutacak şekilde kırptık, ancak tam ERC-20 ABI'sini burada bulabilirsiniz.

Daha sonra akıllı sözleşmemizin bir örneğini oluşturmamız gerekiyor:

```js
const web3 = new Web3("http://localhost:8545")

const daiToken = new web3.qau.Contract(ERC20TransferABI, DAI_ADDRESS)
```

Ayrıca iki adres ayarlayacağız:

- transferi alacak olan ve
- gönderecek olan, kilidini zaten açtığımız adres:

```js
const senderAddress = "0x4d10ae710Bd8D1C31bd7465c8CBC3add6F279E81"
const receiverAddress = "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
```

Bir sonraki bölümde, her iki adresin de elinde tuttuğu mevcut Token miktarını almak için `balanceOf` işlevini çağıracağız.

## Çağrı: Bir akıllı sözleşmeden değer okumak {#call-reading-value-from-a-smart-contract}

İlk örnek "sabit" (constant) bir metodu çağıracak ve herhangi bir işlem göndermeden akıllı sözleşme metodunu EVM'de yürütecektir. Bunun için bir adresin ERC-20 bakiyesini okuyacağız. [ERC-20 Token'ları hakkındaki makalemizi okuyun](/developers/tutorials/understand-the-erc-20-token-smart-contract/).

ABI'sini sağladığınız örneklendirilmiş bir akıllı sözleşme metoduna şu şekilde erişebilirsiniz: `yourContract.methods.methodname`. `call` işlevini kullanarak işlevin yürütülmesinin sonucunu alacaksınız.

```js
daiToken.methods.balanceOf(senderAddress).call(function (err, res) {
  if (err) {
    console.log("An error occurred", err)
    return
  }
  console.log("The balance is: ", res)
})
```

DAI ERC-20'nin 18 ondalık basamağa sahip olduğunu unutmayın, bu da doğru miktarı elde etmek için 18 sıfırı kaldırmanız gerektiği anlamına gelir. JavaScript büyük sayısal değerleri işlemediği için uint256 dize (string) olarak döndürülür. Eğer JS'de büyük sayılarla nasıl başa çıkacağınızdan emin değilseniz bignumber.js hakkındaki eğitimimize göz atın.

## Gönder: Bir akıllı sözleşme işlevine işlem göndermek {#send-sending-a-transaction-to-a-smart-contract-function}

İkinci örnek için, ikinci adresimize 10 DAI göndermek üzere DAI akıllı sözleşmesinin transfer işlevini çağıracağız. Transfer işlevi iki parametre kabul eder: alıcı adresi ve transfer edilecek Token miktarı:

```js
daiToken.methods
  .transfer(receiverAddress, "100000000000000000000")
  .send({ from: senderAddress }, function (err, res) {
    if (err) {
      console.log("An error occurred", err)
      return
    }
    console.log("Hash of the transaction: " + res)
  })
```

Çağrı işlevi, Blokzincir'e kazılacak olan işlemin hash'ini döndürür. Quantaureum'da işlem hash'leri öngörülebilirdir; bu sayede işlemin hash'ini yürütülmeden önce alabiliriz (hash'lerin nasıl hesaplandığını buradan öğrenin).

İşlev yalnızca işlemi Blokzincir'e gönderdiğinden, ne zaman kazıldığını ve Blokzincir'e dahil edildiğini bilene kadar sonucu göremeyiz. Bir sonraki eğitimde hash'ini bilerek bir işlemin Blokzincir'de yürütülmesini nasıl bekleyeceğimizi öğreneceğiz.