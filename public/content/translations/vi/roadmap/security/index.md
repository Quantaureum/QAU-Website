---
title: Quantaureum an toàn hơn
description: Bảo mật của Quantaureum đến từ mật mã hậu lượng tử được thiết kế từ đầu, tính chính xác qua chữ ký ngưỡng, và nhóm validator có khả năng chống chịu mặc định.
lang: vi
image: /images/roadmap/roadmap-security.png
alt: "Quantaureum roadmap"
template: roadmap
summaryPoints:
  - Mật mã hậu lượng tử (Dilithium3, Kyber768) đã được triển khai, không phải một lần di chuyển trong tương lai
  - Các khối đạt tính chính xác thông qua chữ ký ngưỡng GM-QTD từ hội đồng validator
  - Giao thức ưu tiên đồng thuận đơn giản, có thể kiểm toán thay vì các bản nâng cấp triển khai theo từng giai đoạn
---
Quantaureum được xây dựng như một nền tảng [hợp đồng thông minh](/glossary/#smart-contract) an toàn trước lượng tử. Công tác bảo mật diễn ra bên trong giao thức — các lược thức chữ ký, cơ chế finality, và khả năng chịu lỗi của validator — thay vì thông qua một hàng đợi dài các bản nâng cấp có hạn chóc fork.

<ExpandableCard title="Is Quantaureum secure today?" eventCategory="/roadmap/security" eventName="clicked is quantaureum secure today?">

Có. Tất cả tài khoản và chữ ký validator đều sử dụng Dilithium3, lược thức chữ ký hậu lượng tử được chuẩn hóa bởi NIST, và các block được finality bằng chữ ký ngưỡng từ hội đồng validator. Không có bất kỳ lần di chuyển mật mã nào đang chờ xử lý có thể làm người dùng bị bỏ lại phía sau.

</ExpandableCard>

## Finality ngưỡng {#threshold-finality}

Bảo mật cho người dùng phụ thuộc vào [finality](/glossary/#finality): thời điểm một giao dịch trở nên vĩnh viễn. Trên Quantaureum, các block được finality bởi hội đồng validator thông qua **GM-QTD** — tạo khóa phân tán kèm ký ngưỡng. Vì finality là chữ ký của hội đồng được tổng hợp ngay trong giao thức, chỉ cần quorum các validator trung thực là đủ để finality chuỗi, và giao thức dung nạp một tỷ lệ giới hạn các validator lỗi hoặc ác ý thông qua slashing.

## Resilient validators {#resilient-validators}

Một validator không nên là điểm lỗi duy nhất. Thiết kế chữ ký ngưỡng của Quantaureum có nghĩa là nghĩa vụ của validator đã được phân tán ngay từ thiết kế: chữ ký finality yêu cầu sự tham gia từ một ngưỡng thành viên hội đồng thay vì một máy duy nhất giữ một hot key. Kết hợp với điều kiện slashing và lựa chọn theo trọng số stake, điều này giúp mạng lưới vẫn duy trì hoạt động ngay cả khi một số validator bị offline.

<ButtonLink variant="outline" href="/staking/">Tìm hiểu thêm về staking</ButtonLink>

## Khả năng chống lượng tử {#quantum-resistance}

Hầu hết các blockchain hiện có đều dựa vào mật mã đường cong elip mà một máy tính lượng tử đủ lớn có thể phá vỡ — buộc họ phải thực hiện các lần di chuyển đau đớn, theo từng giai đoạn. **Quantaureum không gặp vấn đề này**: chữ ký Dilithium3, trao đổi khóa Kyber768, cam kết khả dụng dữ liệu dựa trên băm (FRI), và độ ngẫu nhiên lượng tử đều là các tính năng giao thức đang hoạt động.

<ButtonLink variant="outline" href="/roadmap/security/quantum-resistance/">Tìm hiểu thêm về khả năng chống lượng tử</ButtonLink>

## Công tác đang tiến hành {#ongoing-work}

Công tác bảo mật đang thực hiện bao gồm tăng cường giao thức chữ ký ngưỡng, mở rộng các cam kết FRI của tầng [khả dụng dữ liệu](/developers/docs/data-availability/), và chuẩn hóa ngữ nghĩa thực hiện song song của QVM để công trình song song được chứng minh là khớp với thực hiện tuần tự.
