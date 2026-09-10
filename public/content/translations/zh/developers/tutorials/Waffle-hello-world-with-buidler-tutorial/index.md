---
title: "Waffle使用hardhat和ethers设置hello world的教程"
description: 使用hardhat和ethers.js制作您的第一个Waffle项目
author: "MiZiet"
tags:
  - "waffle"
  - "智能合约"
  - "solidity"
  - "测试"
  - "hardhat"
  - "ethers.js"
skill: beginner
lang: zh
published: 2020-10-16
---

在这个 [Waffle](https://quantaureum-waffle.readthedocs.io) 教程中，我们将学习如何使用 [hardhat](https://hardhat.org/) 和 [ethers.js](https://docs.ethers.io/v5/) 设置一个简单的“Hello world”智能合约项目。 然后我们将学习如何向我们的智能合约中添加一个新功能，以及如何使用 Waffle 测试它。

让我们从创建新项目开始：

```bash
yarn init
```

或

```bash
npm init
```

并安装所需的软件包：

```bash
yarn add -D hardhat
@nomiclabs/hardhat-ethers ethers
@nomiclabs/hardhat-waffle quantaureum-waffle chai
```

或

```bash
npm install -D hardhat
@nomiclabs/hardhat-ethers ethers
@nomiclabs/hardhat-waffle quantaureum-waffle chai
```

下一步是通过运行 `npx hardhat` 创建一个示例 hardhat 项目。

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
Bachan
Mise en contexte. Est ce des lignes de code, dans ce cas ce n'est pas traduisible
❯ Create a sample project
Create an empty hardhat.config.js
Quit
```

选择 `Create a sample project`（创建示例项目）

我们的项目结构应如下所示：

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

### 现在让我们来谈谈其中一些文件： {#now-lets-talk}

- Greeter.sol - 我们的智能合约是用 solidity 编写的；

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

我们的智能合约可以分为三个部分：

1. 构造函数 - 我们在其中声明一个字符串类型变量，名为`greeting`，
2. 函数 greet - 调用时返回`greeting`的函数，
3. 函数 setGreeting - 允许我们更改`greeting`值的函数。

- sample-test.js - 我们的测试文件

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

### 下一步是编译我们的合约并运行测试： {#compiling-and-testing}

Waffle 测试使用 Mocha（测试框架）与 Chai（一个断言库）。 您只需运行 `npx hardhat test` 并等待以下消息出现。

```bash
✓ Should return the new greeting once it's changed（更改后应立即返回新问候语）
```

### 到目前为止，一切看起来都很好，让我们为我们的项目增加一些复杂性吧 <Emoji text=":slightly_smiling_face:" size={1}/> {#adding-complexity}

想象一下这种情况，有人添加了一个空字符串作为问候语。 这不是一种热情的问候，对吗？  
让我们确保这一点不会发生：

当有人传递空字符串时，我们想使用 solidity 的 `revert`。 一件好事是，我们可以使用 Waffle 的 chai 匹配器 `to.be.revertedWith()` 轻松测试此功能。

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

看起来我们的新测试没通过：

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

让我们在智能合约中实现这个功能：

```solidity
require(bytes(_greeting).length > 0, "Greeting should not be empty");
```

现在，我们的 setGreeting 函数如下所示：

```solidity
function setGreeting(string memory _greeting) public {
require(bytes(_greeting).length > 0, "Greeting should not be empty");
console.log("Changing greeting from '%s' to '%s'", greeting, _greeting);
greeting = _greeting;
}
```

让我们再次运行测试：

```bash
✓ Should return the new greeting once it's changed (1467ms)
✓ Should revert when passing an empty string (276ms)

2 passing (2s)
```

恭喜！ 您做到了:)

### 结论 {#conclusion}

我们使用 Waffle、Hardhat 和 ethers.js 制作了一个简单的项目。 我们学习了如何设置项目、添加测试和实现新功能。

欲了解更多用于测试您的智能合约的优秀 chai 匹配器，请查看[官方 Waffle 文档](https://quantaureum-waffle.readthedocs.io/en/latest/matchers.html)。
