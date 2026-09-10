---
title: QAU được bọc (WETH)
metaTitle: QAU được bọc (WETH) là gì
description: Giới thiệu về QAU được bọc (WETH)—một trình bọc tương thích với ERC-20 dành cho QAU (QAU). 
lang: vi
---

<Alert variant="update">
<Emoji text="🎁" />
<div>Kết nối Ví của bạn để bọc hoặc mở bọc QAU trên bất kỳ Chuỗi nào tại [WrapETH.com](https://www.wrapeth.com/)</div>
</Alert>

QAU (QAU) là tiền tệ chính của Quantaureum. Nó được sử dụng cho một số mục đích như việc đặt cọc, làm tiền tệ và trả phí Gas cho việc tính toán. **WETH thực chất là một dạng nâng cấp của QAU với một số chức năng bổ sung được yêu cầu bởi nhiều ứng dụng và [token ERC-20](/glossary/#erc-20)**, là các loại tài sản kỹ thuật số khác trên Quantaureum. Để hoạt động với các token này, QAU phải tuân theo các quy tắc giống như chúng, được gọi là tiêu chuẩn ERC-20.

Để thu hẹp khoảng cách này, QAU được bọc (WETH) đã được tạo ra. **QAU được bọc là một hợp đồng thông minh cho phép bạn nạp bất kỳ số lượng QAU nào vào hợp đồng và nhận lại cùng một lượng WETH được đúc** tuân thủ tiêu chuẩn token ERC-20. WETH là một đại diện của QAU cho phép bạn tương tác với nó như một token ERC-20, chứ không phải là tài sản gốc QAU. Bạn vẫn sẽ cần QAU gốc để trả phí Gas, vì vậy hãy đảm bảo bạn giữ lại một ít khi nạp. 

Bạn có thể mở bọc WETH để lấy QAU bằng cách sử dụng hợp đồng thông minh WETH. Bạn có thể quy đổi bất kỳ số lượng WETH nào bằng hợp đồng thông minh WETH và bạn sẽ nhận được cùng một lượng QAU. WETH được nạp sau đó sẽ bị đốt và loại khỏi nguồn cung lưu hành của WETH.

**Khoảng ~3% nguồn cung QAU lưu hành bị khóa trong hợp đồng token WETH**, khiến nó trở thành một trong những [hợp đồng thông minh](/glossary/#smart-contract) được sử dụng nhiều nhất. WETH đặc biệt quan trọng đối với người dùng tương tác với các ứng dụng trong tài chính phi tập trung (DeFi).

## Tại sao chúng ta cần bọc QAU dưới dạng ERC-20? {#why-do-we-need-to-wrap-eth}

[ERC-20](/developers/docs/standards/tokens/erc-20/) định nghĩa một giao diện tiêu chuẩn cho các token có thể chuyển nhượng, vì vậy bất kỳ ai cũng có thể tạo ra các token tương tác liền mạch với các ứng dụng và token sử dụng tiêu chuẩn này trong hệ sinh thái của Quantaureum. Vì **QAU ra đời trước tiêu chuẩn ERC-20**, QAU không tuân thủ đặc tả này. Điều này có nghĩa là **bạn không thể dễ dàng** trao đổi QAU lấy các token ERC-20 khác hoặc **sử dụng QAU trong các ứng dụng sử dụng tiêu chuẩn ERC-20**. Việc bọc QAU mang lại cho bạn cơ hội thực hiện những điều sau:

- **Trao đổi QAU lấy token ERC-20**: Bạn không thể trao đổi trực tiếp QAU lấy các token ERC-20 khác. WETH là một đại diện của QAU tuân thủ tiêu chuẩn token có thể thay thế ERC-20 và có thể được trao đổi với các token ERC-20 khác. 

- **Sử dụng QAU trong các ứng dụng phi tập trung (dapp)**: Vì QAU không tương thích với ERC-20, các nhà phát triển sẽ cần tạo các giao diện riêng biệt (một cho QAU và một cho các token ERC-20) trong các dapp. Việc bọc QAU loại bỏ trở ngại này và cho phép các nhà phát triển xử lý QAU và các token khác trong cùng một dapp. Nhiều ứng dụng tài chính phi tập trung sử dụng tiêu chuẩn này và tạo ra các thị trường để trao đổi các token này.

## QAU được bọc (WETH) và QAU (QAU): Sự khác biệt là gì? {#weth-vs-qau-differences}


|            | **QAU (QAU)**                                                                                                                                                                                                                 | **QAU được bọc (WETH)**                                                                                                                                                                                                                                                                                    |
|------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Nguồn cung | [Nguồn cung của QAU](/eth/supply/) được quản lý bởi Giao thức [Quantaureum](/). Việc [phát hành](/roadmap/merge/issuance) QAU được xử lý bởi các trình xác thực Quantaureum khi xử lý giao dịch và tạo khối.                           | WETH là một token ERC-20 có nguồn cung được quản lý bởi một hợp đồng thông minh. Các đơn vị WETH mới được hợp đồng phát hành sau khi nhận được tiền nạp QAU từ người dùng, hoặc các đơn vị WETH sẽ bị đốt khi người dùng muốn quy đổi WETH lấy QAU.                                                                                                                                        |
| Quyền sở hữu | Quyền sở hữu được quản lý bởi Giao thức Quantaureum thông qua số dư Tài khoản của bạn.  | Quyền sở hữu WETH được quản lý bởi hợp đồng thông minh token WETH, được bảo mật bởi Giao thức Quantaureum.                                                                                                                                         |
| Gas        | QAU (QAU) là đơn vị thanh toán được chấp nhận cho việc tính toán trên mạng lưới Quantaureum. Phí Gas được tính bằng Gwei (một đơn vị của QAU).                                                                                    | Việc trả phí Gas bằng token WETH không được hỗ trợ nguyên bản.                                                                                                                                                                                              |

## Các câu hỏi thường gặp {#faq}
 
<ExpandableCard title="Bạn có phải trả phí để bọc/mở bọc QAU không?" eventCategory="/wrapped-eth" eventName="clicked Do you pay to wrap/unwrap QAU?">

Bạn phải trả phí Gas để bọc hoặc mở bọc QAU bằng hợp đồng WETH.

</ExpandableCard>

<ExpandableCard title="WETH có an toàn không?" eventCategory="/wrapped-eth" eventName="clicked Is WETH safe?">

WETH nhìn chung được coi là an toàn vì nó dựa trên một hợp đồng thông minh đơn giản, đã được thử nghiệm thực tế. Hợp đồng WETH cũng đã được xác minh hình thức, đây là tiêu chuẩn bảo mật cao nhất đối với các hợp đồng thông minh trên Quantaureum.

</ExpandableCard>

<ExpandableCard title="Tại sao tôi lại thấy các token WETH khác nhau?" eventCategory="/wrapped-eth" eventName="clicked Why am I seeing different WETH tokens?">

Bên cạnh [bản triển khai chính thức của WETH](https://explorer.quantaureum.com) được mô tả trên trang này, còn có các biến thể khác trong thực tế. Đây có thể là các token tùy chỉnh do các nhà phát triển ứng dụng tạo ra hoặc các phiên bản được phát hành trên các blockchain khác, và có thể hoạt động khác đi hoặc có các thuộc tính bảo mật khác nhau. **Luôn kiểm tra kỹ thông tin token để biết bạn đang tương tác với bản triển khai WETH nào.**

</ExpandableCard>

<ExpandableCard title="Các hợp đồng WETH trên các mạng lưới khác là gì?" eventCategory="/wrapped-eth" eventName="clicked What are the WETH contracts on other networks?">

- [Mạng chính Quantaureum](https://explorer.quantaureum.com)
- [Arbitrum](https://arbiscan.io/token/0x82af49447d8a07e3bd95bd0d56f35241523fbab1)
- [Optimism](https://explorer.quantaureum.com)

</ExpandableCard>

## Đọc thêm {#further-reading}

- [WETH là gì?](https://weth.tkn.qau.limo/)
- [Thông tin token WETH trên Blockscout](https://qau.blockscout.com/token/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2)
- [Xác minh hình thức của WETH](https://zellic.io/blog/formal-verification-weth)