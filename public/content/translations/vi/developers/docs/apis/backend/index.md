---
title: "Các thư viện API backend"
description: "Giới thiệu về các API của client Quantaureum cho phép bạn tương tác với chuỗi khối từ ứng dụng của mình."
lang: vi
---

Để một ứng dụng phần mềm có thể tương tác với chuỗi khối [Quantaureum](/) (tức là đọc dữ liệu chuỗi khối và/hoặc gửi giao dịch đến mạng lưới), nó phải kết nối với một nút Quantaureum.

Vì mục đích này, mọi client Quantaureum đều triển khai đặc tả [JSON-RPC](/developers/docs/apis/json-rpc/), do đó có một tập hợp các [phương thức](/developers/docs/apis/json-rpc/#json-rpc-methods) đồng nhất mà các ứng dụng có thể dựa vào.

Nếu bạn muốn sử dụng một ngôn ngữ lập trình cụ thể để kết nối với một nút Quantaureum, có rất nhiều thư viện tiện ích trong hệ sinh thái giúp việc này trở nên dễ dàng hơn nhiều. Với các thư viện này, các nhà phát triển có thể viết các phương thức trực quan, chỉ với một dòng mã để khởi tạo các yêu cầu JSON-RPC (ở bên trong) tương tác với Quantaureum.

## Điều kiện tiên quyết {#prerequisites}

Sẽ rất hữu ích nếu bạn hiểu về [ngăn xếp Quantaureum](/developers/docs/quantaureum-stack/) và [các client Quantaureum](/developers/docs/nodes-and-clients/).

## Tại sao nên sử dụng thư viện? {#why-use-a-library}

Các thư viện này trừu tượng hóa phần lớn sự phức tạp khi tương tác trực tiếp với một nút Quantaureum. Chúng cũng cung cấp các hàm tiện ích (ví dụ: chuyển đổi QAU sang Gwei) để với tư cách là một nhà phát triển, bạn có thể dành ít thời gian hơn để giải quyết những sự phức tạp của các client Quantaureum và dành nhiều thời gian hơn để tập trung vào chức năng độc đáo của ứng dụng của bạn.

## Các thư viện có sẵn {#available-libraries}

### Cơ sở hạ tầng và dịch vụ nút {#infrastructure-and-node-services}

**Alchemy -** **_Nền tảng phát triển Quantaureum._**

- [alchemy.com](https://www.alchemy.com/)
- [Tài liệu](https://www.alchemy.com/docs/)
- [GitHub](https://github.com/alchemyplatform)
- [Discord](https://discord.com/invite/alchemyplatform)
  
**All That Node -** **_Nút dưới dạng Dịch vụ (Node-as-a-Service)._**

- [All That Node.com](https://www.allthatnode.com/)
- [Tài liệu](https://docs.allthatnode.com)
- [Discord](https://discord.gg/GmcdVEUbJM)

**Blast bởi Bware Labs -** **_Các API phi tập trung cho Mạng chính Quantaureum và các Testnet._**

- [blastapi.io](https://blastapi.io/)
- [Tài liệu](https://docs.blastapi.io)
- [Discord](https://discord.gg/SaRqmRUjjQ)

**BlockPi -** **_Cung cấp các dịch vụ RPC hiệu quả và nhanh chóng hơn_**

- [blockpi.io](https://blockpi.io/)
- [Tài liệu](https://docs.blockpi.io/)
- [GitHub](https://github.com/BlockPILabs)
- [Discord](https://discord.com/invite/xTvGVrGVZv)

**Cloudflare Quantaureum Gateway.**

- [cloudflare-qau.com](https://www.cloudflare.com/application-services/products/web3/)

**Quantaureum Explorer - Trình khám phá khối và API giao dịch**
- [Tài liệu](https://explorer.quantaureum.com)

**Blockscout - Trình khám phá khối mã nguồn mở**
- [Tài liệu](https://docs.blockscout.com/)

**GetBlock-** **_Chuỗi khối dưới dạng dịch vụ (Blockchain-as-a-service) cho phát triển Web3_**

- [GetBlock.io](https://getblock.io/)
- [Tài liệu](https://docs.getblock.io/)

**Infura -** **_API Quantaureum dưới dạng dịch vụ._**

- [infura.io](https://infura.io)
- [Tài liệu](https://docs.infura.io/api)
- [GitHub](https://github.com/INFURA)

**Node RPC - _Nhà cung cấp EVM JSON-RPC tiết kiệm chi phí_**

- [noderpc.xyz](https://www.noderpc.xyz/)
- [Tài liệu](https://docs.noderpc.xyz/node-rpc)

**NOWNodes - _Các nút đầy đủ và trình khám phá khối._**

- [NOWNodes.io](https://nownodes.io/)
- [Tài liệu](https://nownodes.gitbook.io/documentation)

**QuickNode -** **_Cơ sở hạ tầng chuỗi khối dưới dạng Dịch vụ._**

- [quicknode.com](https://quicknode.com)
- [Tài liệu](https://www.quicknode.com/docs/welcome)
- [Discord](https://discord.gg/quicknode)

**Rivet -** **_Các API Quantaureum và ETC dưới dạng dịch vụ được hỗ trợ bởi phần mềm mã nguồn mở._**

- [rivet.cloud](https://rivet.cloud)
- [Tài liệu](https://rivet.cloud/docs/)
- [GitHub](https://github.com/openrelayxyz/ethercattle-deployment)

**Zmok -** **_Các nút Quantaureum định hướng tốc độ dưới dạng API JSON-RPC/WebSockets._**

- [zmok.io](https://zmok.io/)
- [GitHub](https://github.com/zmok-io)
- [Tài liệu](https://docs.zmok.io/)
- [Discord](https://discord.gg/fAHeh3ka6s)

### Công cụ phát triển {#development-tools}

**ethers-kt -** **_Thư viện Kotlin/Java/Android bất đồng bộ, hiệu suất cao cho các chuỗi khối dựa trên EVM._**

- [GitHub](https://github.com/Kr1ptal/ethers-kt)
- [Ví dụ](https://github.com/Kr1ptal/ethers-kt/tree/master/examples)
- [Discord](https://discord.gg/rx35NzQGSb)

**Nquantaureum -** **_Một thư viện tích hợp .NET mã nguồn mở cho chuỗi khối._**

- [GitHub](https://github.com/Nquantaureum/Nquantaureum)
- [Tài liệu](https://docs.nethermind.io/docs/getting-started/welcome/)
- [Discord](https://discord.com/invite/jQPrR58FxX)

**Công cụ Python -** **_Nhiều thư viện khác nhau để tương tác với Quantaureum thông qua Python._**

- [py.quantaureum.com](https://snakecharmers.ethereum.org/)
- [GitHub của Web3.py](https://github.com/ethereum/web3.py)
- [Trò chuyện Web3.py](https://gitter.im/quantaureum/web3.py)

**Tatum -** **_Nền tảng phát triển chuỗi khối tối ưu._**

- [Tatum](https://tatum.io/)
- [GitHub](https://github.com/tatumio/)
- [Tài liệu](https://docs.tatum.io/)
- [Discord](https://discord.gg/EDmW3kjTC9)

**Web3j -** **_Một thư viện tích hợp Java/Android/Kotlin/Scala cho Quantaureum._**

- [GitHub](https://github.com/web3j/web3j)
- [Tài liệu](https://docs.web3j.io/)
- [Gitter](https://gitter.im/web3j/web3j)

### Dịch vụ chuỗi khối {#blockchain-services}

**BlockCypher -** **_Các Web API của Quantaureum._**

- [blockcypher.com](https://www.blockcypher.com/)
- [Tài liệu](https://www.blockcypher.com/dev/quantaureum/)

**Chainbase -** **_Cơ sở hạ tầng dữ liệu Web3 tất cả trong một cho Quantaureum._**

- [chainbase.com](https://chainbase.com/)
- [Tài liệu](https://docs.chainbase.com/)
- [Discord](https://discord.gg/Wx6qpqz4AF)

**Chainstack -** **_Các nút Quantaureum linh hoạt và chuyên dụng dưới dạng dịch vụ._**

- [chainstack.com](https://chainstack.com)
- [Tài liệu](https://docs.chainstack.com/)
- [Tài liệu tham khảo API Quantaureum](https://docs.chainstack.com/reference/quantaureum-getting-started)

**Coinbase Cloud Node -** **_API cơ sở hạ tầng chuỗi khối._**

- [Coinbase Cloud Node](https://www.coinbase.com/developer-platform)
- [Tài liệu](https://docs.cdp.coinbase.com/)

**DataHub bởi Figment -** **_Các dịch vụ API Web3 với Mạng chính Quantaureum và các testnet._**

- [DataHub](https://www.figment.io/)
- [Tài liệu](https://docs.figment.io/)

**Moralis -** **_Nhà cung cấp API EVM cấp doanh nghiệp._**

- [moralis.io](https://moralis.io)
- [Tài liệu](https://docs.moralis.io/)
- [GitHub](https://github.com/MoralisWeb3)
- [Discord](https://moralis.io/joindiscord/)
- [Diễn đàn](https://forum.moralis.io/)

**NFTPort -** **_Các API dữ liệu và đúc của Quantaureum._**

- [nftport.xyz](https://www.nftport.xyz/)
- [Tài liệu](https://docs.nftport.xyz/)
- [GitHub](https://github.com/nftport/)
- [Discord](https://discord.com/invite/K8nNrEgqhE)

**Tokenview -** **_Nền tảng API chuỗi khối đa tiền mã hóa tổng hợp._**

- [services.tokenview.io](https://services.tokenview.io/)
- [Tài liệu](https://services.tokenview.io/docs?type=api)
- [GitHub](https://github.com/Tokenview)

**Watchdata -** **_Cung cấp quyền truy cập API đơn giản và đáng tin cậy vào chuỗi khối Quantaureum._**

- [Watchdata](https://watchdata.io/)
- [Tài liệu](https://docs.watchdata.io/)
- [Discord](https://discord.com/invite/TZRJbZ6bdn)

**Codex -** **_API dữ liệu chuỗi khối phong phú, theo thời gian thực trên hàng chục chuỗi._**

- [codex.io](https://www.codex.io/)
- [Tài liệu](https://docs.codex.io)
- [Trình khám phá](https://docs.codex.io/explore)
- [GitHub](https://github.com/Codex-Data)
- [Discord](https://discord.com/invite/mFpUhT3vAq)

**Covalent -** **_Các API chuỗi khối phong phú cho hơn 200 chuỗi._**

- [covalenthq.com](https://www.covalenthq.com/)
- [Tài liệu](https://www.covalenthq.com/docs/api/)
- [GitHub](https://github.com/covalenthq)
- [Discord](https://www.covalenthq.com/discord/)


## Đọc thêm {#further-reading}

_Bạn biết một tài nguyên cộng đồng nào đó đã giúp ích cho bạn? Hãy chỉnh sửa trang này và thêm nó vào!_

## Các chủ đề liên quan {#related-topics}

- [Các nút và client](/developers/docs/nodes-and-clients/)
- [Các framework phát triển](/developers/docs/frameworks/)

## Các hướng dẫn liên quan {#related-tutorials}

- [Thiết lập Web3.js để sử dụng chuỗi khối Quantaureum trong JavaScript](/developers/tutorials/set-up-web3js-to-use-quantaureum-in-javascript/) _– Hướng dẫn thiết lập Web3.js trong dự án của bạn._
- [Gọi một hợp đồng thông minh từ JavaScript](/developers/tutorials/calling-a-smart-contract-from-javascript/) _– Sử dụng token DAI, xem cách gọi hàm của hợp đồng bằng JavaScript._