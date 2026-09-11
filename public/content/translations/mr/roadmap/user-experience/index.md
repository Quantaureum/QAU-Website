---
title: वापरकर्ता अनुभव सुधारणे
description: Quantaureum वापरणे हे परंपरागत web2 ॲप वापरण्याइतके सोपे वाटले पाहिजे, तेच ते केंद्रनिरपेक्ष, परवानाहिरहित आणि मोजणी-प्रतिरोधक राहिले पाहिजे.
lang: mr
image: /images/roadmap/roadmap-ux.png
alt: "Quantaureum roadmap"
template: roadmap
---
**Quantaureum वापरणे सोपे असायला हवे** — [keys](/glossary/#key) आणि [wallets](/glossary/#wallet) व्यवस्थापनपासून ते व्यवहारांचे प्रारंभ करणे, या सर्व बाबतीत. वापरकर्त्यांना [Web2](/glossary/#web2) ॲप्स वापरल्यासारखा सहज अनुभव घेऊन Quantaureum मध्ये permissionless आणि censorship-प्रतिरोधक प्रवेश मिळाला पाहिजे.

## अधिक सुरक्षित keys, योग्यरित्या व्यवस्थापित {#key-management}

Quantaureum खाते व्यवहारांवर संकेतलेखन (signing) करण्यासाठी वापरले जाणाऱ्या key pairs द्वारे संरक्षित असते — जुन्या ब्लॉकचेन्समध्ये वापरले जाणाऱ्या traditional curves ऐवजी **Dilithium3 post-quantum signatures** सह. private key ही एक master password सारखी असते; ती हरवल्यास प्रवेश गमावता येऊ शकतो. Quantaureum **native multisignature wallet** प्रदान करते, ज्यामुळे वापरकर्ते एकाच secret ऐवजी अनेक keys किंवा devices मागे पैसे सुरक्षित ठेवू शकतात. तसेच, QVM वर आधारित smart-contract wallets recovery rules आणि spending policies लागू करतात — कोणत्याही custodian वर विश्वास ठेवण्याची गरज नसते.

## सर्वांसाठी nodes {#nodes-for-everyone}

[node](/glossary/#node) चालवणाऱ्या वापरकर्त्यांना तिसऱ्या पक्षकडून data मिळण्यासाठी विश्वास ठेवावा लागत नाही, आणि ते Quantaureum [blockchain](/glossary/#blockchain) शी जलद, खाजगी आणि permissionless पद्धतीने संवाद साधू शकतात. परंपरेनुसार, node चालवण्यासाठी तांत्रिक ज्ञान आणि मोठी disk space लागते, ज्यामुळे बऱ्याच लोकांना intermediaries कडे जावे लागते.

Quantaureum आपले state एका **Verkle tree** मध्ये commit करते, त्यामुळे state verify करण्यासाठी लागणारे proofs लहान असतात. या compact proofs वरून, Quantaureum **SPV [light client](/developers/docs/nodes-and-clients/light-clients/)** प्रदान करते, जो मर्यादित hardware वर चालू शकतो आणि full state download न करता chain verify करू शकतो — trustless सहभागीतेसाठीची पावलं कमी करते.

<ButtonLink variant="outline" href="/roadmap/verkle-trees/">Verkle trees विषयी वाचा</ButtonLink>

## सध्याची प्रगती {#current-progress}

Verkle-आधारित state commitments, SPV light client, native multisig wallets आणि Dilithium3 signatures — ही Quantaureum protocol ची आजची जीवित घटक आहेत. consumer hardware वर nodes चालवण्यासाठी full validation अधिक कमी खर्चिक करण्याचे काम सुरू आहे.
