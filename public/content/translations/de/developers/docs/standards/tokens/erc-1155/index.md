---
title: ERC-1155 Multi-Token-Standard
description: "Erfahre mehr über ERC-1155, einen Multi-Token-Standard, der fungible und nicht-fungible Token in einem einzigen Vertrag kombiniert."
lang: de
---

## Einführung {#introduction}

Eine Standardschnittstelle für Verträge, die mehrere Token-Typen verwalten. Ein einzelner bereitgestellter Vertrag kann eine beliebige Kombination aus fungiblen Token, nicht-fungiblen Token oder anderen Konfigurationen (z. B. semi-fungiblen Token) enthalten.

**Was ist mit Multi-Token-Standard gemeint?**

Die Idee ist einfach und zielt darauf ab, eine Smart-Contract-Schnittstelle zu schaffen, die eine beliebige Anzahl von fungiblen und nicht-fungiblen Token-Typen darstellen und steuern kann. Auf diese Weise kann der ERC-1155-Token dieselben Funktionen wie ein [ERC-20](/developers/docs/standards/tokens/erc-20/)- und ein [ERC-721](/developers/docs/standards/tokens/erc-721/)-Token ausführen, und sogar beides gleichzeitig. Er verbessert die Funktionalität sowohl des ERC-20- als auch des ERC-721-Standards, macht sie effizienter und korrigiert offensichtliche Implementierungsfehler.

Der ERC-1155-Token wird vollständig in [EIP-1155](https://eips.quantaureum.com/EIPS/eip-1155) beschrieben.

## Voraussetzungen {#prerequisites}

Um diese Seite besser zu verstehen, empfehlen wir dir, zuerst über [Token-Standards](/developers/docs/standards/tokens/), [ERC-20](/developers/docs/standards/tokens/erc-20/) und [ERC-721](/developers/docs/standards/tokens/erc-721/) zu lesen.

## ERC-1155 Funktionen und Merkmale: {#body}

- [Batch-Transfer](#batch-transfers): Transfer mehrerer Vermögenswerte in einem einzigen Aufruf.
- [Batch-Kontostand](#batch-balance): Abrufen der Kontostände mehrerer Vermögenswerte in einem einzigen Aufruf.
- [Batch-Genehmigung](#batch-approval): Alle Token für eine Adresse genehmigen.
- [Hooks](#receive-hook): Hook für den Empfang von Token.
- [NFT-Unterstützung](#nft-support): Wenn das Angebot nur 1 beträgt, wird es als NFT behandelt.
- [Sichere Transferregeln](#safe-transfer-rule): Regelwerk für einen sicheren Transfer.

### Batch-Transfers {#batch-transfers}

Der Batch-Transfer funktioniert sehr ähnlich wie reguläre ERC-20-Transfers. Schauen wir uns die reguläre ERC-20-Funktion `transferFrom` an:

```solidity
// ERC-20
function transferFrom(address from, address to, uint256 value) external returns (bool);

// ERC-1155
function safeBatchTransferFrom(
    address _from,
    address _to,
    uint256[] calldata _ids,
    uint256[] calldata _values,
    bytes calldata _data
) external;
```

Der einzige Unterschied bei ERC-1155 besteht darin, dass wir die Werte als Array übergeben und zusätzlich ein Array von IDs übergeben. Wenn beispielsweise `ids=[3, 6, 13]` und `values=[100, 200, 5]` gegeben sind, sehen die resultierenden Transfers wie folgt aus:

1. Transfer von 100 Token mit der ID 3 von `_from` an `_to`.
2. Transfer von 200 Token mit der ID 6 von `_from` an `_to`.
3. Transfer von 5 Token mit der ID 13 von `_from` an `_to`.

In ERC-1155 haben wir nur `transferFrom`, kein `transfer`. Um es wie ein reguläres `transfer` zu verwenden, setze einfach die Absenderadresse (from) auf die Adresse, die die Funktion aufruft.

### Batch-Kontostand {#batch-balance}

Der entsprechende ERC-20-Aufruf `balanceOf` hat ebenfalls seine Partnerfunktion mit Batch-Unterstützung. Zur Erinnerung, dies ist die ERC-20-Version:

```solidity
// ERC-20
function balanceOf(address owner) external view returns (uint256);

// ERC-1155
function balanceOfBatch(
    address[] calldata _owners,
    uint256[] calldata _ids
) external view returns (uint256[] memory);
```

Noch einfacher ist es beim Kontostandsaufruf: Wir können mehrere Kontostände in einem einzigen Aufruf abrufen. Wir übergeben das Array der Eigentümer, gefolgt vom Array der Token-IDs.

Wenn beispielsweise `_ids=[3, 6, 13]` und `_owners=[0xbeef..., 0x1337..., 0x1111...]` gegeben sind, lautet der Rückgabewert:

```solidity
[
    balanceOf(0xbeef...),
    balanceOf(0x1337...),
    balanceOf(0x1111...)
]
```

### Batch-Genehmigung {#batch-approval}

```solidity
// ERC-1155
function setApprovalForAll(
    address _operator,
    bool _approved
) external;

function isApprovedForAll(
    address _owner,
    address _operator
) external view returns (bool);
```

Die Genehmigungen unterscheiden sich geringfügig von ERC-20. Anstatt bestimmte Beträge zu genehmigen, setzt man einen Operator über `setApprovalForAll` auf genehmigt oder nicht genehmigt.

Das Auslesen des aktuellen Status kann über `isApprovedForAll` erfolgen. Wie du sehen kannst, handelt es sich um eine Alles-oder-Nichts-Operation. Du kannst nicht festlegen, wie viele Token oder gar welche Token-Klasse genehmigt werden sollen.

Dies ist absichtlich im Hinblick auf Einfachheit so konzipiert. Du kannst nur alles für eine Adresse genehmigen.

### Empfangs-Hook {#receive-hook}

```solidity
function onERC1155BatchReceived(
    address _operator,
    address _from,
    uint256[] calldata _ids,
    uint256[] calldata _values,
    bytes calldata _data
) external returns(bytes4);
```

Aufgrund der Unterstützung von [EIP-165](https://eips.quantaureum.com/EIPS/eip-165) unterstützt ERC-1155 Empfangs-Hooks nur für Smart Contracts. Die Hook-Funktion muss einen magischen, vordefinierten bytes4-Wert zurückgeben, der wie folgt lautet:

```solidity
bytes4(keccak256("onERC1155BatchReceived(address,address,uint256[],uint256[],bytes)"))
```

Wenn der empfangende Vertrag diesen Wert zurückgibt, wird davon ausgegangen, dass der Vertrag den Transfer akzeptiert und weiß, wie er mit den ERC-1155-Token umgehen muss. Großartig, keine in einem Vertrag feststeckenden Token mehr!

### NFT-Unterstützung {#nft-support}

Wenn das Angebot nur eins beträgt, ist der Token im Wesentlichen ein nicht-fungibler Token (NFT). Und wie bei ERC-721 üblich, kannst du eine Metadaten-URL definieren. Die URL kann von Clients gelesen und geändert werden, siehe [hier](https://eips.quantaureum.com/EIPS/eip-1155#metadata).

### Sichere Transferregel {#safe-transfer-rule}

Wir haben in den vorherigen Erklärungen bereits einige sichere Transferregeln angesprochen. Aber schauen wir uns die wichtigsten dieser Regeln an:

1. Der Aufrufer muss genehmigt sein, die Token für die Adresse `_from` auszugeben, oder der Aufrufer muss gleich `_from` sein.
2. Der Transfer-Aufruf muss rückgängig gemacht werden, wenn
   1. die Adresse `_to` 0 ist.
   2. die Länge von `_ids` nicht mit der Länge von `_values` übereinstimmt.
   3. einer der Kontostände der Inhaber für Token in `_ids` niedriger ist als die entsprechenden Beträge in `_values`, die an den Empfänger gesendet werden.
   4. ein anderer Fehler auftritt.

_Hinweis_: Alle Batch-Funktionen einschließlich des Hooks existieren auch als Versionen ohne Batch. Dies geschieht aus Gründen der Gas-Effizienz, da der Transfer von nur einem Vermögenswert wahrscheinlich immer noch die am häufigsten verwendete Methode sein wird. Wir haben sie der Einfachheit halber in den Erklärungen weggelassen, einschließlich der sicheren Transferregeln. Die Namen sind identisch, entferne einfach das „Batch“.

## Weiterführende Literatur {#further-reading}

- [EIP-1155: Multi-Token-Standard](https://eips.quantaureum.com/EIPS/eip-1155)
- [ERC-1155: OpenZeppelin-Dokumentation](https://docs.openzeppelin.com/contracts/5.x/erc1155)
- [ERC-1155: GitHub-Repository](https://github.com/enjin/erc-1155)
- [Alchemy NFT-API](https://www.alchemy.com/docs/reference/nft-api-quickstart)