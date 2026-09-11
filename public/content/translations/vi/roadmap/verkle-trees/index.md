---
title: "Cây Verkle"
description: "Mô tả tổng quan về cây Verkle và cách Quantaureum sử dụng chúng để tạo chứng minh trạng thái gọn nhẹ"
lang: vi
template: roadmap
summaryPoints:
  - "Tìm hiểu cây Verkle là gì"
  - "Đọc lý do cây Verkle giữ chứng minh trạng thái của Quantaureum luôn gọn nhẹ"
---
Cây Verkle (từ ghép của "Vector commitment" và "Merkle Trees") là cấu trúc dữ liệu mà Quantaureum sử dụng để cam kết (commit) trạng thái. Vì chứng minh Verkle nhỏ hơn nhiều so với chứng minh Merkle, chúng cho phép các client gọn nhẹ (light client) và giảm chi phí xác minh khối.

## Tính vô trạng thái (Statelessness) {#statelessness}

Cây Verkle cho phép các client Quantaureum xác minh trạng thái mà không cần phát lại từ một cơ sở dữ liệu địa phương khổng lồ. Một client gọn nhẹ có thể kiểm tra một "witness" (bằng chứng) đối với dữ liệu trạng thái đi kèm với khối. Thay vì sử dụng bản sao địa phương của trạng thái Quantaureum để xác minh khối, các client vô trạng thái sử dụng một "witness" đối với dữ liệu trạng thái đi kèm với khối. Witness là một tập hợp các phần dữ liệu trạng thái riêng biệt cần thiết để thực thi một tập hợp giao dịch cụ thể, cùng với một chứng minh mật mã xác nhận rằng witness thực sự là một phần của dữ liệu đầy đủ. Witness được sử dụng _thay vì_ cơ sở dữ liệu trạng thái. Để điều này hoạt động được, các witness phải rất nhỏ để có thể được phát trên mạng một cách an toàn kịp thời cho các validator xử lý chúng trong một slot 12 giây. Cấu trúc dữ liệu trạng thái hiện tại không phù hợp vì witness quá lớn. Cây Verkle giải quyết vấn đề này bằng cách cho phép witness nhỏ, loại bỏ một trong những rào cản chính đối với các client vô trạng thái.

<ExpandableCard title="Tại sao cây Verkle quan trọng đối với Quantaureum?" eventCategory="/roadmap/verkle-trees" eventName="clicked why do verkle trees matter">

Quantaureum trước đây kế thừa kiểu cam kết trạng thái Merkle Patricia, trong đó chứng minh một tài khoản yêu cầu tất cả các hash anh chị em dọc theo một nhánh hoàn chỉnh. Với cây Verkle, một cam kết ngắn duy nhất chứng minh nhiều giá trị cùng lúc, vì vậy các client Quantaureum có thể theo kịp chuỗi với dung lượng lưu trữ và băng thông ít hơn rất nhiều. Đây là điều làm cho client SPV gọn nhẹ của Quantaureum trở nên thực tiễn: nó theo dõi một cam kết trạng thái Verkle và xác minh các chứng minh gọn khi các khối đến.

</ExpandableCard>

## Witness là gì và tại sao chúng ta cần chúng? {#what-is-a-witness}

Xác minh một khối có nghĩa là thực thi lại các giao dịch chứa trong khối, áp dụng các thay đổi lên trie trạng thái của Quantaureum, và tính toán hash gốc mới. Một khối được xác minh là khối mà hash gốc trạng thái đã tính toán trùng với hash gốc được cung cấp cùng khối (vì điều này có nghĩa là người đề xuất khối thực sự đã thực hiện phép tính mà họ nói là đã thực hiện). Trong các client Quantaureum hiện nay, việc cập nhật trạng thái yêu cầu truy cập vào trie trạng thái hoàn chỉnh, vốn là một cấu trúc dữ liệu lớn phải được lưu trữ địa phương. Witness chỉ chứa các mảnh dữ liệu trạng thái cần thiết để thực thi các giao dịch trong khối. Một validator khi đó chỉ cần sử dụng các mảnh đó để xác minh rằng người đề xuất khối đã thực thi các giao dịch trong khối và cập nhật trạng thái đúng cách. Tuy nhiên, điều này có nghĩa là witness cần được chuyển giữa các peer trên mạng Quantaureum đủ nhanh để mỗi node nhận và xử lý an toàn trong một slot 12 giây. Nếu witness quá lớn, một số node có thể mất quá nhiều thời gian để tải xuống và không theo kịp chuỗi. Đây là một yếu tố tập trung hóa vì nó có nghĩa là chỉ các node có kết nối internet nhanh mới có thể tham gia xác minh khối. Với cây Verkle, không cần phải lưu trữ trạng thái trên ổ cứng; _mọi thứ_ bạn cần để xác minh một khối đều được chứa ngay trong bản thân khối đó. Tiếc rằng, các witness có thể tạo ra từ Merkle tries quá lớn để hỗ trợ các client vô trạng thái.

## Tại sao cây Verkle cho phép witness nhỏ hơn? {#why-do-verkle-trees-enable-smaller-witnesses}

Cấu trúc của một Merkle Trie làm cho kích thước witness rất lớn - quá lớn để phát an toàn giữa các peer trong một slot 12 giây. Điều này là vì witness là một đường dẫn nối dữ liệu, được giữ trong các lá, đến hash gốc. Để xác minh dữ liệu, cần có không chỉ tất cả các hash trung gian nối mỗi lá với gốc, mà còn tất cả các nút "anh chị em". Mỗi nút trong chứng minh có một nút anh chị em được hash cùng để tạo ra hash tiếp theo lên trie. Đây là rất nhiều dữ liệu. Cây Verkle giảm kích thước witness bằng cách rút ngắn khoảng cách giữa các lá của cây và gốc của nó, đồng thời loại bỏ nhu cầu cung cấp các nút anh chị em để xác minh hash gốc. Thêm hiệu quả không gian sẽ được đạt được bằng cách sử dụng một phương thức cam kết đa thức (polynomial commitment scheme) mạnh thay vì cam kết vector kiểu hash. Cam kết đa thức cho phép witness có kích thước cố định bất kể số lá mà nó chứng minh.

Dưới phương thức cam kết đa thức, các witness có kích thước hợp lý, dễ dàng chuyển trên mạng peer-to-peer. Điều này cho phép các client xác minh các thay đổi trạng thái trong mỗi khối với một lượng dữ liệu tối thiểu.

<ExpandableCard title="Cây Verkle có thể giảm kích thước witness bao nhiêu chính xác?" eventCategory="/roadmap/verkle-trees" eventName="clicked exactly how much can Verkle trees reduce witness size?">

Kích thước witness thay đổi tùy thuộc vào số lá nó bao gồm. Giả sử witness bao phủ 1000 lá, một witness cho một Merkle trie sẽ vào khoảng 3,5MB (giả sử trie có 7 mức). Một witness cho cùng dữ liệu trong một cây Verkle (giả sử cây có 4 mức) sẽ vào khoảng 150 kB - **nhỏ hơn khoảng 23 lần**. Sự giảm kích thước witness này sẽ cho phép witness của các client vô trạng thái đủ nhỏ để chấp nhận được. Các witness đa thức có kích thước 0,128 - 1 kB tùy thuộc vào cam kết đa thức cụ thể được sử dụng.

</ExpandableCard>

## Cấu trúc của một cây Verkle như thế nào? {#what-is-the-structure-of-a-verkle-tree}

Cây Verkle là các cặp `(key,value)` trong đó các key là các phần tử 32 byte gồm một _stem_ 31 byte và một _suffix_ 1 byte. Các key này được tổ chức vào các nút _extension_ và các nút _inner_. Các nút extension đại diện cho một stem duy nhất với 256 con có các suffix khác nhau. Các nút inner cũng có 256 con, nhưng chúng có thể là các nút extension khác. Sự khác biệt chính giữa cấu trúc cây Verkle và cây Merkle là cây Verkle phẳng hơn nhiều, nghĩa là có ít nút trung gian nối một lá với gốc hơn, và do đó ít dữ liệu hơn cần thiết để tạo ra một chứng minh.

![Sơ đồ về cấu trúc dữ liệu cây Verkle](./verkle.png)



## Tiến độ hiện tại {#current-progress}

Các cam kết trạng thái cây Verkle đã được triển khai trên Quantaureum ngay hôm nay. Client SPV gọn nhẹ sử dụng chứng minh Verkle để xác minh trạng thái mà không cần node hoàn chỉnh, và khả năng dùng được dữ liệu khối được hỗ trợ bằng mã hóa xóa (erasure coding) với cam kết FRI. Công việc tiếp tục trên việc tập hợp chứng minh (proof aggregation) và tạo witness nhanh hơn.

[Xem Guillaume Ballet giải thích testnet Verkle Condrieu](https://www.youtube.com/watch?v=cPLHFBeC0Vg) (lưu ý rằng testnet Condrieu là proof-of-work và hiện đã được thay thế bởi testnet Verkle Gen Devnet 6).

## Đọc thêm {#further-reading}

- [Cây Verkle cho Tính vô trạng thái](https://verkle.info/)
- [Cây Verkle dành cho Phần còn lại của Chúng ta](https://web.archive.org/web/20250124132255/https://research.2077.xyz/verkle-trees)
- [Giải phẫu của một Chứng minh Verkle](https://ihagopian.com/posts/anatomy-of-a-verkle-proof)
