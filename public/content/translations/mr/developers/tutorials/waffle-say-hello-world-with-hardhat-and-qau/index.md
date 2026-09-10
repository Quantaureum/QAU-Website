---
title: "hardhat आणि ethers वापरून Waffle hello world शिकवणी"
description: "hardhat आणि ethers.js वापरून तुमचा पहिला Waffle प्रकल्प बनवा"
author: "MiZiet"
tags:
  [
    "waffle",
    "स्मार्ट कॉन्ट्रॅक्ट",
    "सॉलिडिटी",
    "चाचणी",
    "hardhat",
    "ethers.js"
  ]
skill: beginner
lang: mr
published: 2020-10-16
---

या [Waffle](https://ethereum-waffle.readthedocs.io) शिकवणीमध्ये, आपण [hardhat](https://hardhat.org/) आणि [ethers.js](https://docs.ethers.io/v5/) वापरून एक साधा "Hello world" स्मार्ट कॉन्ट्रॅक्ट प्रकल्प कसा सेट करायचा हे शिकू. मग आपण आपल्या स्मार्ट कॉन्ट्रॅक्टमध्ये एक नवीन कार्यक्षमता कशी जोडावी आणि Waffle सह त्याची चाचणी कशी करावी हे शिकू.

चला एक नवीन प्रकल्प तयार करून सुरुवात करूया:

```bash
yarn init
```

किंवा

```bash
npm init
```

आणि आवश्यक पॅकेजेस स्थापित करत आहोत:

```bash
yarn add -D hardhat @nomiclabs/hardhat-ethers ethers @nomiclabs/hardhat-waffle quantaureum-waffle chai
```

किंवा

```bash
npm install -D hardhat @nomiclabs/hardhat-ethers ethers @nomiclabs/hardhat-waffle quantaureum-waffle chai
```

पुढील पायरी `npx hardhat` चालवून एक नमुना hardhat प्रकल्प तयार करणे ही आहे.

```bash
888    888                      888 888               888
888    888                      888 888               888
888    888                      888 888               888
8888888888  8888b.  888d888 .d88888 88888b.   8888b.  888888
888    888     "88b 888P"  d88" 888 888 "88b     "88b 888
888    888 .d888888 888    888  888 888  888 .d888888 888
888    888 888  888 888    Y88b 888 888  888 888  888 Y88b.
888    888 "Y888888 888     "Y88888 888  888 "Y888888  "Y888

👷 Hardhat v2.0.3 मध्ये आपले स्वागत आहे 👷‍

? तुम्हाला काय करायचे आहे? …
❯ एक नमुना प्रकल्प तयार करा
एक रिकामा hardhat.config.js तयार करा
बाहेर पडा
```

`Create a sample project` निवडा

आपल्या प्रकल्पाची रचना अशी दिसावी:

```
MyWaffleProject
├── contracts
│   └── Greeter.sol
├── node_modules
├── scripts
│   └── sample-script.js
├── test
│   └── sample-test.js
├── .gitattributes
├── .gitignore
├── hardhat.config.js
└── package.json
```

### आता यापैकी काही फाइल्सबद्दल बोलूया: {#now-lets-talk}

- Greeter.sol - solidity मध्ये लिहिलेला आमचा स्मार्ट कॉन्ट्रॅक्ट;

```solidity
contract Greeter {
string greeting;

constructor(string memory _greeting) public {
console.log("अभिवादनासह ग्रीटर उपयोजित करत आहे:", _greeting);
greeting = _greeting;
}

function greet() public view returns (string memory) {
return greeting;
}

function setGreeting(string memory _greeting) public {
console.log("अभिवादन '%s' वरून '%s' मध्ये बदलत आहे", greeting, _greeting);
greeting = _greeting;
}
}
```

आपला स्मार्ट कॉन्ट्रॅक्ट तीन भागांमध्ये विभागला जाऊ शकतो:

1. कन्स्ट्रक्टर - जिथे आपण `greeting` नावाचा एक स्ट्रिंग प्रकारचा व्हेरिएबल घोषित करतो,
2. फंक्शन ग्रीट - एक फंक्शन जे कॉल केल्यावर `greeting` परत करेल,
3. फंक्शन सेटग्रीटिंग - एक फंक्शन जे आपल्याला `greeting` चे मूल्य बदलण्याची परवानगी देते.

- sample-test.js - आमची चाचणी फाइल

```js
describe("Greeter", function () {
  it("एकदा बदलल्यावर नवीन अभिवादन परत केले पाहिजे", async function () {
    const Greeter = await ethers.getContractFactory("Greeter")
    const greeter = await Greeter.deploy("Hello, world!")

    await greeter.deployed()
    expect(await greeter.greet()).to.equal("Hello, world!")

    await greeter.setGreeting("Hola, mundo!")
    expect(await greeter.greet()).to.equal("Hola, mundo!")
  })
})
```

### पुढील पायरी म्हणजे आपला कॉन्ट्रॅक्ट संकलित करणे आणि चाचण्या चालवणे: {#compiling-and-testing}

Waffle चाचण्या Mocha (एक चाचणी फ्रेमवर्क) आणि Chai (एक अभिकथन लायब्ररी) वापरतात. तुम्हाला फक्त `npx hardhat test` चालवायचे आहे आणि खालील संदेश येण्याची वाट पाहायची आहे.

```bash
✓ एकदा बदलल्यावर नवीन अभिवादन परत केले पाहिजे
```

### आतापर्यंत सर्व काही छान दिसत आहे, चला आपल्या प्रकल्पात थोडी अधिक गुंतागुंत वाढवूया <Emoji text=":slightly_smiling_face:" size={1}/> {#adding-complexity}

अशा परिस्थितीची कल्पना करा जिथे कोणीतरी अभिवादन म्हणून एक रिकामा स्ट्रिंग जोडतो. ते एक आपुलकीचे अभिवादन होणार नाही, बरोबर?  
असे होणार नाही याची खात्री करूया:

जेव्हा कोणी रिकामा स्ट्रिंग पास करतो तेव्हा आम्हाला solidity चा `revert` वापरायचा आहे. चांगली गोष्ट ही आहे की आपण Waffle च्या चाय मॅचर `to.be.revertedWith()` सह या कार्यक्षमतेची सहज चाचणी घेऊ शकतो.

```js
it("रिकामा स्ट्रिंग पास केल्यावर उलटले पाहिजे", async () => {
  const Greeter = await ethers.getContractFactory("Greeter")
  const greeter = await Greeter.deploy("Hello, world!")

  await greeter.deployed()
  await expect(greeter.setGreeting("")).to.be.revertedWith(
    "अभिवादन रिकामे नसावे"
  )
})
```

असे दिसते की आमची नवीन चाचणी यशस्वी झाली नाही:

```bash
अभिवादनासह ग्रीटर उपयोजित करत आहे: Hello, world!
अभिवादन 'Hello, world!' वरून 'Hola, mundo!' मध्ये बदलत आहे
    ✓ एकदा बदलल्यावर नवीन अभिवादन परत केले पाहिजे (1514ms)
अभिवादनासह ग्रीटर उपयोजित करत आहे: Hello, world!
अभिवादन 'Hello, world!' वरून '' मध्ये बदलत आहे
    1) रिकामा स्ट्रिंग पास केल्यावर उलटले पाहिजे


  1 यशस्वी (2s)
  1 अयशस्वी
```

चला ही कार्यक्षमता आपल्या स्मार्ट कॉन्ट्रॅक्टमध्ये लागू करूया:

```solidity
require(bytes(_greeting).length > 0, "अभिवादन रिकामे नसावे");
```

आता, आमचे setGreeting फंक्शन असे दिसते:

```solidity
function setGreeting(string memory _greeting) public {
require(bytes(_greeting).length > 0, "अभिवादन रिकामे नसावे");
console.log("अभिवादन '%s' वरून '%s' मध्ये बदलत आहे", greeting, _greeting);
greeting = _greeting;
}
```

चला पुन्हा चाचण्या चालवूया:

```bash
✓ एकदा बदलल्यावर नवीन अभिवादन परत केले पाहिजे (1467ms)
✓ रिकामा स्ट्रिंग पास केल्यावर उलटले पाहिजे (276ms)

2 यशस्वी (2s)
```

अभिनंदन! तुम्ही ते केले :)

### निष्कर्ष {#conclusion}

आम्ही Waffle, Hardhat आणि ethers.js सह एक सोपा प्रकल्प बनवला. आपण प्रकल्प कसा सेट करायचा, चाचणी कशी जोडायची आणि नवीन कार्यक्षमता कशी लागू करायची हे शिकलो.

तुमच्या स्मार्ट कॉन्ट्रॅक्टची चाचणी घेण्यासाठी अधिक उत्तम चाय मॅचर्ससाठी, [Waffle चे अधिकृत डॉक्स](https://ethereum-waffle.readthedocs.io/en/latest/matchers.html) तपासा.
