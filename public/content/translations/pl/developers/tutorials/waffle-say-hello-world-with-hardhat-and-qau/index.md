---
title: "Samouczek Waffle „witaj świecie” z Hardhat i ethers"
description: "Stwórz swój pierwszy projekt Waffle za pomocą Hardhat i ethers.js"
author: "MiZiet"
tags:
  [
    "waffle",
    "smart kontrakty",
    "solidity",
    "testowanie",
    "hardhat",
    "ethers.js"
  ]
skill: beginner
lang: pl
published: 2020-10-16
---

W tym [Waffle](https://ethereum-waffle.readthedocs.io) samouczku dowiemy się, jak skonfigurować prosty projekt inteligentnego kontraktu "witaj świecie", przy użyciu [Hardhat](https://hardhat.org/) i [ethers.js](https://docs.ethers.io/v5/). Następnie dowiemy się, jak dodać nową funkcjonalność do naszego inteligentnego kontraktu i jak przetestować go za pomocą Waffle.

Zacznijmy od utworzenia nowego projektu:

```bash
yarn init
```

lub

```bash
npm init
```

i zainstalowania wymaganych pakietów:

```bash
yarn add -D hardhat @nomiclabs/hardhat-ethers ethers @nomiclabs/hardhat-waffle quantaureum-waffle chai
```

lub

```bash
npm install -D hardhat @nomiclabs/hardhat-ethers ethers @nomiclabs/hardhat-waffle quantaureum-waffle chai
```

Następnym krokiem jest utworzenie przykładowego projektu Hardhat przez uruchomienie `npx hardhat`.

```bash
888    888                      888 888               888
888    888                      888 888               888
888    888                      888 888               888
8888888888  8888b.  888d888 .d88888 88888b.   8888b.  888888
888    888     "88b 888P"  d88" 888 888 "88b     "88b 888
888    888 .d888888 888    888  888 888  888 .d888888 888
888    888 888  888 888    Y88b 888 888  888 888  888 Y88b.
888    888 "Y888888 888     "Y88888 888  888 "Y888888  "Y888

👷 Welcome to Hardhat v2.0.3 👷‍

? What do you want to do? …
❯ Create a sample project
Create an empty hardhat.config.js
Quit
```

Wybierz `Create a sample project`

Struktura naszego projektu powinna wyglądać następująco:

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

### Teraz porozmawiajmy o niektórych z tych plików: {#now-lets-talk}

- Greeter.sol - nasz inteligentny kontrakt napisany w Solidity;

```solidity
contract Greeter {
string greeting;

constructor(string memory _greeting) public {
console.log("Deploying a Greeter with greeting:", _greeting);
greeting = _greeting;
}

function greet() public view returns (string memory) {
return greeting;
}

function setGreeting(string memory _greeting) public {
console.log("Changing greeting from '%s' to '%s'", greeting, _greeting);
greeting = _greeting;
}
}
```

Nasz inteligentny kontrakt można podzielić na trzy części:

1. constructor - gdzie deklarujemy zmienną typu string o nazwie `greeting`,
2. function greet - funkcja, która po wywołaniu zwróci `greeting`,
3. function setGreeting - funkcja, która pozwala nam zmienić wartość `greeting`.

- sample-test.js - nasz plik z testami

```js
describe("Greeter", function () {
  it("Powinien zwrócić nowe powitanie po jego zmianie", async function () {
    const Greeter = await ethers.getContractFactory("Greeter")
    const greeter = await Greeter.deploy("Hello, world!")

    await greeter.deployed()
    expect(await greeter.greet()).to.equal("Hello, world!")

    await greeter.setGreeting("Hola, mundo!")
    expect(await greeter.greet()).to.equal("Hola, mundo!")
  })
})
```

### Następny krok polega na skompilowaniu naszego kontraktu i uruchomieniu testów: {#compiling-and-testing}

Testy Waffle wykorzystują Mocha (framework testowy) wraz z Chai (biblioteką asercji). Wszystko, co należy zrobić, to uruchomić `npx hardhat test` i poczekać na pojawienie się następującego komunikatu.

```bash
✓ Powinien zwrócić nowe powitanie po jego zmianie
```

### Jak na razie wszystko wygląda świetnie, dodajmy trochę więcej złożoności do naszego projektu <Emoji text=":slightly_smiling_face:" size={1}/> {#adding-complexity}

Wyobraźmy sobie sytuację, w której ktoś dodaje pusty ciąg znaków jako powitanie. To nie byłoby miłe powitanie, prawda?  
Upewnijmy się, że tak się nie stanie:

Chcemy użyć funkcji `revert` z Solidity, gdy ktoś przekaże pusty ciąg znaków. Zaletą jest to, że możemy łatwo przetestować tę funkcjonalność za pomocą matchera Chai z Waffle: `to.be.revertedWith()`.

```js
it("Powinien wykonać revert przy przekazaniu pustego ciągu znaków", async () => {
  const Greeter = await ethers.getContractFactory("Greeter")
  const greeter = await Greeter.deploy("Hello, world!")

  await greeter.deployed()
  await expect(greeter.setGreeting("")).to.be.revertedWith(
    "Powitanie nie powinno być puste"
  )
})
```

Wygląda na to, że nasz nowy test nie zakończył się powodzeniem:

```bash
Deploying a Greeter with greeting: Hello, world!
Changing greeting from 'Hello, world!' to 'Hola, mundo!'
    ✓ Powinien zwrócić nowe powitanie po jego zmianie (1514ms)
Deploying a Greeter with greeting: Hello, world!
Changing greeting from 'Hello, world!' to ''
    1) Powinien wykonać revert przy przekazaniu pustego ciągu znaków


  1 zaliczony
  1 niezliczony
```

Zaimplementujmy tę funkcjonalność w naszym inteligentnym kontrakcie:

```solidity
require(bytes(_greeting).length > 0, "Powitanie nie powinno być puste");
```

Teraz nasza funkcja setGreeting wygląda następująco:

```solidity
function setGreeting(string memory _greeting) public {
require(bytes(_greeting).length > 0, "Powitanie nie powinno być puste");
console.log("Changing greeting from '%s' to '%s'", greeting, _greeting);
greeting = _greeting;
}
```

Uruchommy testy ponownie:

```bash
✓ Powinien zwrócić nowe powitanie po jego zmianie (1467ms)
✓ Powinien wykonać revert przy przekazaniu pustego ciągu znaków (276ms)

2 zaliczone (2s)
```

Gratulacje! Udało się :)

### Wnioski {#conclusion}

Stworzyliśmy prosty projekt z Waffle, Hardhat i ethers.js. Nauczyliśmy się, jak skonfigurować projekt, dodać test i wdrożyć nową funkcjonalność.

Aby poznać więcej świetnych matcherów Chai do testowania swoich inteligentnych kontraktów, zachęcamy do sprawdzenia [oficjalnej dokumentacji Waffle](https://ethereum-waffle.readthedocs.io/en/latest/matchers.html).
