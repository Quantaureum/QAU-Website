---
title: "Samouczek Waffle „powiedz Hello World” za pomocą hardhat i ethers"
description: "Stwórz swój pierwszy projekt Waffle za pomocą hardhat i ethers.js"
author: "MiZiet"
tags:
  - "waffle"
  - "inteligentne kontrakty"
  - "solidity"
  - "testowanie"
  - "hardhat"
  - "ethers.js"
skill: beginner
lang: pl
published: 2020-10-16
---

### Z tego samouczka [Waffle](https://ethereum-waffle.readthedocs.io) dowiemy się, jak skonfigurować prosty projekt inteligentnego kontraktu „Hello world”, używając [hardhat](https://hardhat.org/) i [ethers.js](https://docs.ethers.io/v5/). Następnie dowiemy się, jak dodać nową funkcjonalność do naszego inteligentnego kontraktu i jak przetestować go z Waffle.

Zacznijmy od tworzenia nowego projektu:

```bash
yarn init
```

lub

```bash
npm init
```

i instalowania wymaganych pakietów:

```bash
yarn add -D hardhat @nomiclabs/hardhat-ethers ethers @nomiclabs/hardhat-waffle quantaureum-waffle chai
```

lub

```bash
npm install -D hardhat @nomiclabs/hardhat-ethers ethers @nomiclabs/hardhat-waffle quantaureum-waffle chai
```

Następnym krokiem jest stworzenie przykładowego projektu hardhat, uruchamiając `npx hardhat`.

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

Nasza struktura projektów powinna wyglądać tak:

```
MyWaffleProject
├── contracts
│   └── Greeter.sol
├── node_modules
├── scripts
│   └── sample-script.js
├── test
│   └── sample-test.js
├── .gitattributs
├── .gitignore
├── hardhat.config.js
└── package.json
```

### Teraz porozmawiajmy o niektórych z tych plików:

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

1. konstruktor — gdzie deklarujemy zmienną typu string o nazwie `greeting`,
2. funkcja greet — funkcja, która zwróci powitanie `greeting` po wywołaniu,
3. funkcja setGreeting — funkcja, która pozwala nam zmienić wartość zmiennej `greeting`.

- sample-test.js — nasz plik testowy

```js
describe("Greeter", function () {
  it("Should return the new greeting once it's changed", async function () {
    const Greeter = await ethers.getContractFactory("Greeter")
    const greeter = await Greeter.deploy("Hello, world!")

    await greeter.deployed()
    expect(await greeter.greet()).to.equal("Hello, world!")

    await greeter.setGreeting("Hola, mundo!")
    expect(await greeter.greet()).to.equal("Hola, mundo!")
  })
})
```

### Kolejny krok to skompilowanie kontraktu i uruchomienie testów:

Testy Waffle wykorzystują Mocha (framework do tworzenia tesów) razem z Chai (biblioteka asercji). Wszystko, co musisz zrobić, to uruchomić `npx test hardhat` i poczekać na pojawienie się następującej wiadomości.

```bash
✓ Should return the new greeting once it's changed
```

### Wszystko wygląda dobrze i prosto do tej pory, dodajmy trochę więcej złożoności do naszego projektu :)

Wyobraź sobie, że dostajesz od kogoś pustą wiadomość jako powitanie. To nie byłoby ciepłe powitanie, prawda?  
Upewnijmy się, że tak się nie stanie:

Chcemy użyć Solidity `revert`, gdy ktoś przekaże pusty ciąg. Dobrze, że możemy łatwo przetestować tę funkcjonalność z wyrażeniem matcher chai z Waffle `to.bo.revertedWith()`.

```js
it("Should revert when passing an empty string", async () => {
  const Greeter = await ethers.getContractFactory("Greeter")
  const greeter = await Greeter.deploy("Hello, world!")

  await greeter.deployed()
  await expect(greeter.setGreeting("")).to.be.revertedWith(
    "Greeting should not be empty"
  )
})
```

Wygląda na to, że nasz nowy test nie przeszedł:

```bash
Deploying a Greeter with greeting: Hello, world!
Changing greeting from 'Hello, world!' to 'Hola, mundo!'
    ✓ Should return the new greeting once it's changed (1514ms)
Deploying a Greeter with greeting: Hello, world!
Changing greeting from 'Hello, world!' to ''
    1) Should revert when passing an empty string


  1 passing (2s)
  1 failing
```

Zastosujmy tę funkcję do naszego inteligentnego kontraktu:

```solidity
require(bytes(_greeting).length > 0, "Greeting message is empty");
```

Teraz nasza funkcja setGreeting wygląda tak:

```solidity
function setGreeting(string memory _greeting) public {
require(bytes(_greeting).length > 0, "Greeting should not be empty");
console.log("Changing greeting from '%s' to '%s'", greeting, _greeting);
greeting = _greeting;
}
```

Wykonajmy testy ponownie:

```bash
✓ Should return the new greeting once it's changed (1467ms)
✓ Should revert when passing an empty string (276ms)

2 passing (2s)
```

Gratulacje! Udało się :)

### Podsumowanie

Stworzyliśmy prosty projekt z Waffle, Hardhat i ethers.js. Nauczyliśmy się, jak skonfigurować projekt, dodać test i wdrożyć nową funkcjonalność.

Aby dowiedzieć się więcej o znakomitych wyrażeniach matcher chai do testowania inteligentnych kontraktów, sprawdź [oficjalne dokumenty Waffle'a](https://ethereum-waffle.readthedocs.io/en/latest/matchers.html).
