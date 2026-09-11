---
title: "Lộ trình quyền riêng tư của Quantaureum"
description: "Quantaureum đang tích hợp quyền riêng tư vào mạng — giao dịch bảo mật bằng chứng minh không lộ kiến thức, địa chỉ ẩn danh và kết nối an toàn hậu lượng tử giữa các nút."
lang: vi
image: /images/roadmap/roadmap-security.png
alt: "Quantaureum roadmap"
template: roadmap
---
**Quyền riêng tư trên Quantaureum là mối quan tâm ở cấp giao thức**, không phải một tính năng gắn thêm bởi bên thứ ba. Lộ trình tập trung vào các điểm mà dữ liệu giao dịch, số dư và metadata mạng có thể bị lộ — và khắc phục chúng bằng các thuật toán mật mã vốn đã có sẵn trong codebase node.

## Giao dịch bí mật với chứng minh zero-knowledge {#confidential-transactions}

Quantaureum bao gồm một module **giao dịch bí mật** che giấu số dư nhưng vẫn chứng minh mỗi lần tiêu dùng là hợp lệ. Người gửi và người nhận trao đổi giá trị thông qua **nullifier**, giúp ngăn chặn chi tiêu trùng lặp mà không tiết lộ mối liên hệ giữa input và output. Phần công việc nặng nề được thực hiện bởi **chứng minh zero-knowledge** (mạch Groth16, với khóa chứng minh được tạo qua một nghi thức đa bên) và **chứng minh phạm vi có giới hạn**, nhờ đó mạng lưới có thể kiểm tra rằng "không giá trị nào được tạo ra từ hư không" mà không cần xem các số dư liên quan.

## Stealth address {#stealth-addresses}

Quyền riêng tư ở lớp địa chỉ cũng rất quan trọng: việc sử dụng lại một địa chỉ công khai sẽ liên kết mọi giao dịch bạn nhận được. Tính năng **stealth address** của Quantaureum cho phép người gửi tạo ra một địa chỉ dùng một lần mới cho mỗi thanh toán, mà chỉ người nhận mới có thể nhận ra và chi tiêu từ đó. Điều này giúp ngăn các phân tích blockchain công khai xây dựng lịch sử đầy đủ về tài sản của người dùng.

## Kết nối an toàn hậu lượng tử {#pqtls}

Ngay cả khi dữ liệu onchain được bảo mật, lưu lượng ở tầng mạng vẫn có thể tiết lộ người dùng. Các node Quantaureum hỗ trợ **post-quantum TLS (PQ-TLS)** để các kết nối giữa các node và từ light client được bảo vệ bằng key exchange hậu lượng tử — chống lại các cuộc tấn công "ghi bây giờ, giải mã sau" ở tầng mạng, không chỉ ở tầng chữ ký.

## Đọc bí mật và light client {#private-reads}

Truy vấn full node sẽ làm lộ metadata: những tài khoản bạn quan tâm và thời điểm truy vấn. Vì trạng thái của Quantaureum được cam kết trong một **cây Verkle**, một [light client](/developers/docs/nodes-and-clients/light-clients/) có thể xác minh dữ liệu bằng các chứng minh gọn thay vì phải tin rằng nhà cung cấp RPC sẽ trả lời trung thực — thu hẹp tập hợp các bên mà bạn tiết lộ hoạt động của mình.

<ButtonLink variant="outline" href="/privacy/">Mẹo và thực hành bảo mật riêng tư</ButtonLink>

## Tiến độ hiện tại {#current-progress}

Các giao dịch bí mật với nullifier, stealth address, mạch Groth16 với cấu hình dựa trên nghi thức, chứng minh phạm vi có giới hạn, và post-quantum TLS đều đã có trong codebase Quantaureum. Công việc đang thực hiện tập trung vào hiệu năng proof-aggregation và công cụ chống lừa đảo để quản lý các output bí mật một cách an toàn.
