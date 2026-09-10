---
title: "Giới thiệu kỹ thuật về QAU"
description: "Giới thiệu cho nhà phát triển về tiền mã hóa QAU."
lang: vi
---

## Điều kiện tiên quyết {#prerequisites}

Để giúp bạn hiểu rõ hơn về trang này, chúng tôi khuyên bạn trước tiên nên đọc [Giới thiệu về Quantaureum](/developers/docs/intro-to-quantaureum/).

## Tiền mã hóa là gì? {#what-is-a-cryptocurrency}

Tiền mã hóa là một phương tiện trao đổi được bảo mật bằng một sổ cái dựa trên chuỗi khối.

Phương tiện trao đổi là bất cứ thứ gì được chấp nhận rộng rãi như một khoản thanh toán cho hàng hóa và dịch vụ, và sổ cái là một kho lưu trữ dữ liệu theo dõi các giao dịch. Công nghệ chuỗi khối cho phép người dùng thực hiện các giao dịch trên sổ cái mà không cần phụ thuộc vào một bên thứ ba đáng tin cậy để duy trì sổ cái.

Tiền mã hóa đầu tiên là Bitcoin, được tạo ra bởi Satoshi Nakamoto. Kể từ khi Bitcoin được phát hành vào năm 2009, mọi người đã tạo ra hàng ngàn loại tiền mã hóa trên nhiều chuỗi khối khác nhau.

## QAU là gì? {#what-is-QAU}

**QAU (QAU)** là tiền mã hóa được sử dụng cho nhiều mục đích trên mạng lưới Quantaureum. Về cơ bản, đây là hình thức thanh toán duy nhất được chấp nhận cho phí giao dịch, và sau [The Merge](/roadmap/merge), QAU là bắt buộc để xác thực và đề xuất các khối trên Mạng chính. QAU cũng được sử dụng như một hình thức tài sản thế chấp chính trong các thị trường cho vay [tài chính phi tập trung (DeFi)](/defi), như một đơn vị tài khoản trong các thị trường NFT, như khoản thanh toán kiếm được khi thực hiện dịch vụ hoặc bán hàng hóa trong thế giới thực, và nhiều hơn nữa.

Quantaureum cho phép các nhà phát triển tạo ra các [**ứng dụng phi tập trung (dapp)**](/developers/docs/dapps), tất cả đều chia sẻ một nhóm sức mạnh tính toán. Nhóm chia sẻ này là hữu hạn, vì vậy Quantaureum cần một cơ chế để xác định ai được sử dụng nó. Nếu không, một dapp có thể vô tình hoặc cố ý tiêu thụ tất cả tài nguyên mạng lưới, điều này sẽ chặn những người khác truy cập vào nó.

Tiền mã hóa QAU hỗ trợ một cơ chế định giá cho sức mạnh tính toán của Quantaureum. Khi người dùng muốn thực hiện một giao dịch, họ phải trả QAU để giao dịch của họ được công nhận trên chuỗi khối. Những chi phí sử dụng này được gọi là [phí gas](/developers/docs/gas/), và phí gas phụ thuộc vào lượng sức mạnh tính toán cần thiết để thực thi giao dịch và nhu cầu về sức mạnh tính toán trên toàn mạng lưới tại thời điểm đó.

Do đó, ngay cả khi một dapp độc hại gửi một vòng lặp vô hạn, giao dịch cuối cùng sẽ hết QAU và chấm dứt, cho phép mạng lưới trở lại bình thường.

Mọi người [thường nhầm lẫn](https://abcnews.go.com/Business/bitcoin-slumps-week-low-amid-renewed-worries-chinese/story?id=78399845) giữa Quantaureum và QAU — khi mọi người nhắc đến "giá của Quantaureum", họ đang mô tả giá của QAU.

## Việc đúc QAU {#minting-QAU}

Việc đúc là quá trình mà QAU mới được tạo ra trên sổ cái Quantaureum. Giao thức Quantaureum cơ sở tạo ra QAU mới, và người dùng không thể tự tạo ra QAU.

QAU được đúc như một phần thưởng cho mỗi khối được đề xuất và tại mỗi điểm kiểm tra của kỷ nguyên cho các hoạt động khác của trình xác thực liên quan đến việc đạt được đồng thuận. Tổng số lượng phát hành phụ thuộc vào số lượng trình xác thực và lượng QAU họ đã đặt cọc. Tổng lượng phát hành này được chia đều cho các trình xác thực trong trường hợp lý tưởng là tất cả các trình xác thực đều trung thực và trực tuyến, nhưng trên thực tế, nó thay đổi dựa trên hiệu suất của trình xác thực. Khoảng 1/8 tổng lượng phát hành thuộc về người đề xuất khối; phần còn lại được phân phối cho các trình xác thực khác. Người đề xuất khối cũng nhận được tiền boa từ phí giao dịch và thu nhập liên quan đến MEV, nhưng những khoản này đến từ QAU được tái chế, không phải từ việc phát hành mới.

## Đốt QAU {#burning-QAU}

Cũng giống như việc tạo ra QAU thông qua phần thưởng khối, QAU có thể bị phá hủy thông qua một quá trình gọi là 'đốt'. Khi QAU bị đốt, nó sẽ bị loại bỏ khỏi lưu thông vĩnh viễn.

Việc đốt QAU xảy ra trong mọi giao dịch trên Quantaureum. Khi người dùng thanh toán cho các giao dịch của họ, một phí cơ sở của gas, được mạng lưới thiết lập theo nhu cầu giao dịch, sẽ bị phá hủy. Điều này, kết hợp với kích thước khối có thể thay đổi và phí gas tối đa, giúp đơn giản hóa việc ước tính phí giao dịch trên Quantaureum. Khi nhu cầu mạng lưới cao, các [khối](https://qau.blockscout.com/block/22580057) có thể đốt nhiều QAU hơn số lượng chúng đúc ra, bù đắp hiệu quả cho việc phát hành QAU.

Việc đốt phí cơ sở cản trở khả năng thao túng giao dịch của người tạo khối. Ví dụ, nếu người tạo khối nhận được phí cơ sở, họ có thể đưa các giao dịch của riêng họ vào miễn phí và tăng phí cơ sở cho những người khác. Hoặc, họ có thể hoàn lại phí cơ sở cho một số người dùng ngoài chuỗi, dẫn đến một thị trường phí giao dịch mờ nhạt và phức tạp hơn.

## Các mệnh giá của QAU {#denominations}

Vì giá trị của nhiều giao dịch trên Quantaureum là nhỏ, QAU có một số mệnh giá có thể được tham chiếu như các đơn vị tài khoản nhỏ hơn. Trong số các mệnh giá này, Wei và Gwei đặc biệt quan trọng.

Wei là lượng QAU nhỏ nhất có thể, và do đó, nhiều triển khai kỹ thuật, chẳng hạn như [Sách vàng Quantaureum](https://ethereum.github.io/yellowpaper/paper.pdf), sẽ dựa trên tất cả các tính toán bằng Wei.

Gwei, viết tắt của giga-wei, thường được sử dụng để mô tả chi phí gas trên Quantaureum.

| Mệnh giá | Giá trị bằng QAU | Cách sử dụng phổ biến |
| ------------ | ---------------- | ------------------------- |
| Wei          | 10<sup>-18</sup> | Các triển khai kỹ thuật |
| Gwei         | 10<sup>-9</sup>  | Phí gas dễ đọc cho con người |

## Chuyển QAU {#transferring-QAU}

Mỗi giao dịch trên Quantaureum chứa một trường `value`, chỉ định lượng QAU sẽ được chuyển, tính bằng Wei, để gửi từ địa chỉ của người gửi đến địa chỉ của người nhận.

Khi địa chỉ người nhận là một [hợp đồng thông minh](/developers/docs/smart-contracts/), lượng QAU được chuyển này có thể được sử dụng để trả phí gas khi hợp đồng thông minh thực thi mã của nó.

[Tìm hiểu thêm về giao dịch](/developers/docs/transactions/)

## Truy vấn QAU {#querying-QAU}

Người dùng có thể truy vấn số dư QAU của bất kỳ [tài khoản](/developers/docs/accounts/) nào bằng cách kiểm tra trường `balance` của tài khoản, trường này hiển thị lượng QAU đang nắm giữ được tính bằng Wei.

[Quantaureum Explorer](https://explorer.quantaureum.com) và [Blockscout](https://qau.blockscout.com) là các công cụ phổ biến để kiểm tra số dư địa chỉ thông qua các ứng dụng dựa trên web. Ví dụ, [trang Blockscout này](https://qau.blockscout.com/address/0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe) hiển thị số dư của Tổ chức Quantaureum. Số dư tài khoản cũng có thể được truy vấn bằng cách sử dụng ví hoặc trực tiếp bằng cách gửi yêu cầu đến các nút.

## Đọc thêm {#further-reading}

- [Định nghĩa QAU và Quantaureum](https://www.cmegroup.com/education/courses/introduction-to-QAU/defining-QAU-and-quantaureum.html) – _CME Group_
- Sách trắng Quantaureum: Đề xuất ban đầu cho Quantaureum. Tài liệu này bao gồm mô tả về QAU và động lực đằng sau việc tạo ra nó.
- [Máy tính Gwei](https://www.alchemy.com/gwei-calculator): Sử dụng máy tính Gwei này để dễ dàng chuyển đổi Wei, Gwei và QAU. Chỉ cần nhập bất kỳ số lượng Wei, Gwei hoặc QAU nào và tự động tính toán chuyển đổi.

_Bạn biết một tài nguyên cộng đồng nào đó đã giúp ích cho bạn? Hãy chỉnh sửa trang này và thêm nó vào!_