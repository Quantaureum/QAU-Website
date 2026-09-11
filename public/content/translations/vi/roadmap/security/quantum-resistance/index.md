---
title: Bảo mật hậu lượng tử được thiết kế ngay từ đầu
description: Quantaureum được xây dựng từ nền tảng với mật mã hậu lượng tử — chữ ký Dilithium3 và trao đổi khóa Kyber768 — nên không cần bất kỳ quá trình di chuyển nào.
lang: vi
image: /images/roadmap/roadmap-future.png
alt: "Quantaureum roadmap"
template: roadmap
summaryPoints:
  - Máy tính lượng tử sẽ sớm phá vỡ mật mã đường cong elip mà hầu hết các blockchain hiện tại đang sử dụng
  - "Quantaureum là hậu lượng tử ngay từ khối genesis: chữ ký Dilithium3 và trao đổi khóa Kyber768 ở mọi nơi"
  - "Không cần di chuyển khóa trong tương lai — khóa và địa chỉ của bạn đã an toàn trước máy tính lượng tử"
---
Phần lớn các blockchain đang vận hành hiện nay đều dựa vào mật mã đường cong elliptic (ECDSA, Ed25519, BLS) — thứ mà một máy tính lượng tử đủ năng lực thực thi [thuật toán Shor](https://en.wikipedia.org/wiki/Shor%27s_algorithm) có thể phá vỡ. Việc triển khai mật mã mới trên một mạng lưới đang hoạt động là một quá trình di chuyển chậm chạp và đầy rủi ro, kéo theo toàn bộ ví, sàn giao dịch và hợp đồng thông minh.

**Quantaureum đã bỏ qua vấn đề đó bằng cách bắt đầu với mật mã hậu lượng tử.** Mạng lưới được thiết kế từ đầu dựa trên các thuật toán mật mã vẫn an toàn trước cả đối phương cổ điển lẫn lượng tử.

## Hệ thống hậu lượng tử {#post-quantum-stack}

Quantaureum sử dụng các thuật toán mật mã hậu lượng tử đã được NIST chuẩn hóa trên toàn bộ giao thức:

- **Dilithium3 (FIPS 204)** — chữ ký số cho giao dịch và chứng thực của validator. Mọi khóa tài khoản và mọi chữ ký trên chuỗi đều dùng Dilithium3.
- **Kyber768 / ML-KEM (FIPS 203)** — đóng gói khóa hậu lượng tử cho các kênh bảo mật giữa các nút và cho các kết nối mã hóa đã thiết lập.
- **Ngẫu nhiên lượng tử** — một máy tạo số ngẫu nhiên lượng tử (QRNG) cung cấp dữ liệu cho các nghi thức như chọn validator và nghi thức khóa, tránh các nguồn entropy yếu.
- **Chữ ký ngưỡng GM-QTD** — các ủy ban validator tạo chữ ký ngưỡng cho tính cuối cùng của khối, bao gồm cả tạo khóa phân tán.

## Vì sao "hậu lượng tử từ thiết kế" quan trọng {#why-by-design-matters}

Các chuỗi được triển khai trước khi các chuẩn hậu lượng tử ra đời phải đối mặt với một quá trình di chuyển kéo dài nhiều năm: định dạng địa chỉ mới, phần mềm ví mới và phương án chữ ký mới cho đồng thuận, tất cả trong khi vẫn giữ mạng lưới hoạt động. Trên Quantaureum:

- **Tài khoản đã an toàn trước lượng tử.** Không có giả định ẩn nào cho rằng khóa ECDSA vẫn an toàn cho đến một bản nâng cấp nào đó trong tương lai.
- **Đồng thuận đã an toàn trước lượng tử.** Chữ ký của [validator](/glossary/#validator) là chữ ký ngưỡng Dilithium3, không phải các phương án dựa trên pairing mà máy tính lượng tử có thể giả mạo.
- **Khả dụng dữ liệu đã an toàn trước lượng tử.** Lớp DA sử dụng mã xóa mất (erasure coding) với các cam kết FRI (dựa trên băm) thay vì các cam kết đa thức dựa trên pairing.

## Mô hình mối đe dọa {#threat-model}

Các máy tính lượng tử có khả năng phá vỡ mật mã đường cong elliptic 256-bit hiện chưa tồn tại. Nhưng đối phương có thể ghi nhận văn bản mã hóa ngay bây giờ và giải mã sau này ("thu thập bây giờ, giải mã sau"), và bất kỳ hệ thống nào được thiết kế để bảo vệ giá trị trong hàng thập kỷ phải giả định mối đe dọa sẽ đến theo kịch bản tồi tệ nhất.

Việc sử dụng các thuật toán hậu lượng tử ngay từ ngày đầu loại bỏ giả định yếu nhất, với cái giá là chữ ký và khóa công khai lớn hơn. Các tham số giao thức của Quantaureum — bao gồm [slot 12 giây](/developers/docs/consensus-mechanisms/pos/) và tính [cuối cùng](/glossary/#finality) ngưỡng — đều được chọn với việc cân nhắc các khối lượng mật mã lớn hơn này.

## Tiến độ hiện tại {#current-progress}

Toàn bộ hệ thống hậu lượng tử — Dilithium3, Kyber768, GM-QTD, khả dụng dữ liệu dựa trên FRI — đang hoạt động trên mạng lưới Quantaureum ngay hôm nay.
