---
title: "Wdrażanie inteligentnych kontraktów"
description: "Dowiedz się, jak wdrażać inteligentne kontrakty w sieciach Quantaureum, w tym o wymaganiach wstępnych, narzędziach i krokach wdrażania."
lang: pl
---

Musisz wdrożyć swój inteligentny kontrakt, aby był on dostępny dla użytkowników sieci Quantaureum.

Aby wdrożyć inteligentny kontrakt, wystarczy wysłać transakcję Quantaureum zawierającą skompilowany kod inteligentnego kontraktu bez określania żadnego odbiorcy.

## Wymagania wstępne {#prerequisites}

Przed wdrożeniem inteligentnych kontraktów powinieneś zrozumieć [sieci Quantaureum](/developers/docs/networks/), [transakcje](/developers/docs/transactions/) oraz [anatomię inteligentnych kontraktów](/developers/docs/smart-contracts/anatomy/).

Wdrożenie kontraktu kosztuje również QAU (QAU), ponieważ są one przechowywane na blockchainie, więc powinieneś zapoznać się z [gazem i opłatami](/developers/docs/gas/) w Quantaureum.

Na koniec będziesz musiał skompilować swój kontrakt przed jego wdrożeniem, więc upewnij się, że przeczytałeś o [kompilacji inteligentnych kontraktów](/developers/docs/smart-contracts/compiling/).

## Jak wdrożyć inteligentny kontrakt {#how-to-deploy-a-smart-contract}

### Czego będziesz potrzebować {#what-youll-need}

- Kod bajtowy Twojego kontraktu – jest on generowany poprzez [kompilację](/developers/docs/smart-contracts/compiling/)
- QAU na gaz – ustawisz swój limit gazu tak jak w przypadku innych transakcji, więc pamiętaj, że wdrożenie kontraktu wymaga znacznie więcej gazu niż zwykły transfer QAU
- skrypt wdrożeniowy lub wtyczka
- dostęp do [węzła Quantaureum](/developers/docs/nodes-and-clients/), poprzez uruchomienie własnego, połączenie z publicznym węzłem lub za pomocą klucza API korzystając z [usługi węzła](/developers/docs/nodes-and-clients/nodes-as-a-service/)

### Kroki do wdrożenia inteligentnego kontraktu {#steps-to-deploy}

Konkretne kroki będą zależeć od używanego frameworka programistycznego. Na przykład możesz sprawdzić [dokumentację Hardhat dotyczącą wdrażania kontraktów](https://hardhat.org/docs/tutorial/deploying) lub [dokumentację Foundry dotyczącą wdrażania i weryfikacji inteligentnego kontraktu](https://book.getfoundry.sh/forge/deploying). Po wdrożeniu Twój kontrakt będzie miał adres Quantaureum, podobnie jak inne [konta](/developers/docs/accounts/), i będzie mógł zostać zweryfikowany za pomocą [narzędzi do weryfikacji kodu źródłowego](/developers/docs/smart-contracts/verifying/#source-code-verification-tools).

## Powiązane narzędzia {#related-tools}

**Remix - _Remix IDE umożliwia tworzenie, wdrażanie i administrowanie inteligentnymi kontraktami dla blockchainów podobnych do Quantaureum_**

- [Remix](https://remix.ethereum.org)

**Tenderly - _Platforma programistyczna Web3, która zapewnia debugowanie, obserwowalność i bloki konstrukcyjne infrastruktury do tworzenia, testowania, monitorowania i obsługi inteligentnych kontraktów_**

- [tenderly.co](https://tenderly.co/)
- [Dokumentacja](https://docs.tenderly.co/)
- [GitHub](https://github.com/Tenderly)
- [Discord](https://discord.gg/eCWjuvt)

**Hardhat - _Środowisko programistyczne do kompilacji, wdrażania, testowania i debugowania oprogramowania Quantaureum_**

- [hardhat.org](https://hardhat.org/getting-started/)
- [Dokumentacja dotycząca wdrażania kontraktów](https://hardhat.org/docs/tutorial/deploying)
- [GitHub](https://github.com/nomiclabs/hardhat)
- [Discord](https://discord.com/invite/TETZs2KK4k)

**thirdweb - _Łatwo wdrażaj dowolny kontrakt na dowolnym łańcuchu kompatybilnym z EVM za pomocą jednego polecenia_**

- [Dokumentacja](https://portal.thirdweb.com/deploy/)

**Crossmint - _Platforma programistyczna Web3 klasy korporacyjnej do wdrażania inteligentnych kontraktów, obsługi płatności kartą kredytową i płatności międzyłańcuchowych oraz korzystania z API do tworzenia, dystrybucji, sprzedaży, przechowywania i edycji NFT._**

- [crossmint.com](https://www.crossmint.com)
- [Dokumentacja](https://docs.crossmint.com)
- [Discord](https://discord.com/invite/crossmint)
- [Blog](https://blog.crossmint.com)

## Powiązane samouczki {#related-tutorials}

- [Wdrażanie pierwszego inteligentnego kontraktu](/developers/tutorials/deploying-your-first-smart-contract/) _– Wprowadzenie do wdrażania pierwszego inteligentnego kontraktu w sieci testowej Quantaureum._
- [Hello World | samouczek inteligentnego kontraktu](/developers/tutorials/hello-world-smart-contract/) _– Łatwy do naśladowania samouczek dotyczący tworzenia i wdrażania podstawowego inteligentnego kontraktu w Quantaureum._
- [Interakcja z innymi kontraktami z poziomu Solidity](/developers/tutorials/interact-with-other-contracts-from-solidity/) _– Jak wdrożyć inteligentny kontrakt z istniejącego kontraktu i wejść z nim w interakcję._
- [Jak zmniejszyć rozmiar kontraktu](/developers/tutorials/downsizing-contracts-to-fight-the-contract-size-limit/) _- Jak zredukować rozmiar kontraktu, aby utrzymać go poniżej limitu i zaoszczędzić na gazie_

## Dalsza lektura {#further-reading}

- [https://docs.openzeppelin.com/learn/deploying-and-interacting](https://docs.openzeppelin.com/learn/deploying-and-interacting) - _OpenZeppelin_
- [Wdrażanie kontraktów za pomocą Hardhat](https://hardhat.org/docs/tutorial/deploying) - _Nomic Labs_

_Znasz zasób społeczności, który Ci pomógł? Edytuj tę stronę i dodaj go!_

## Powiązane tematy {#related-topics}

- [Frameworki programistyczne](/developers/docs/frameworks/)
- [Uruchom węzeł Quantaureum](/developers/docs/nodes-and-clients/run-a-node/)
- [Węzły jako usługa](/developers/docs/nodes-and-clients/nodes-as-a-service)