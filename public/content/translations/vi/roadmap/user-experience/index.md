---
title: Cải thiện trải nghiệm người dùng
description: Việc sử dụng Quantaureum nên đơn giản như khi dùng một ứng dụng web2 truyền thống, đồng thời giữ được tính phi tập trung, không cần cấp phép và chống kiểm duyệt.
lang: vi
image: /images/roadmap/roadmap-ux.png
alt: "Quantaureum roadmap"
template: roadmap
---
**Việc sử dụng Quantaureum cần phải đơn giản** — từ quản lý [khóa](/glossary/#key) và [ví](/glossary/#wallet) đến khởi tạo giao dịch. Người dùng nên được trải nghiệm quyền truy cập không cần cấp phép và chống kiểm duyệt vào Quantaureum với cảm giác liền mạch như khi dùng các ứng dụng [Web2](/glossary/#web2).

## Khóa mạnh hơn, quản lý an toàn {#key-management}

Tài khoản Quantaureum được bảo vệ bằng cặp khóa dùng để ký giao dịch — sử dụng **chữ ký hậu lượng tử Dilithium3** thay vì các đường cong cổ điển mà các chuỗi lâu đời dùng. Khóa tư nhân giống như mật khẩu chính; mất nó có thể đồng nghĩa với việc mất toàn bộ quyền truy cập. Quantaureum tích hợp sẵn **ví đa chữ ký native** để người dùng bảo vệ tài sản phía sau nhiều khóa hoặc nhiều thiết bị thay vì một bí mật duy nhất, và các ví hợp đồng thông minh xây dựng trên QVM cho phép thiết lập quy tắc khôi phục và chính sách chi tiêu mà không cần tin tưởng một bên quản lý.

## Nút cho mọi người {#nodes-for-everyone}

Người dùng tự chạy [nút](/glossary/#node) không cần phụ thuộc vào bên thứ ba để cung cấp dữ liệu, và có thể tương tác nhanh chóng, riêng tư, không cần cấp phép với [chuỗi khối](/glossary/#blockchain) Quantaureum. Trước đây, việc chạy một nút đòi hỏi kiến thức kỹ thuật và dung lượng ổ đĩa đáng kể, khiến nhiều người phải nương vào các bên trung gian.

Quantaureum cam kết trạng thái trong một **cây Verkle**, nhờ đó các chứng minh cần để xác minh trạng thái rất nhỏ gọn. Trên nền các chứng minh compact này, Quantaureum cung cấp một **client nhẹ SPV** có thể chạy trên phần cứng khiêm tốn và xác minh chuỗi mà không cần tải xuống toàn bộ trạng thái — hạ thấp rào cản tham gia không cần tin cậy.

<ButtonLink variant="outline" href="/roadmap/verkle-trees/">Đọc về cây Verkle</ButtonLink>

## Tiến độ hiện tại {#current-progress}

Các cam kết trạng thái dựa trên Verkle, client nhẹ SPV, ví đa chữ ký native và chữ ký Dilithium3 hiện đã là những thành phần hoạt động trong giao thức Quantaureum. Công việc tiếp tục nhằm giảm chi phí xác minh đầy đủ để ngày càng nhiều người dùng có thể tự chạy nút trên phần cứng tiêu dùng.
