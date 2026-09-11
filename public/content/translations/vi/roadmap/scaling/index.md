---
title: "Mở rộng Quantaureum"
description: "Quantaureum mở rộng thông qua thực thi song song, sharding, khả năng sẵn có dữ liệu ưu tiên chứng minh và khung rollup tích hợp — mà không hy sinh tính phi tập trung."
lang: vi
image: /images/roadmap/roadmap-transactions.png
alt: "Quantaureum roadmap"
template: roadmap
---
Quantaureum được thiết kế để mở rộng ở nhiều tầng cùng lúc: tầng cơ bản thực thi giao dịch song song, khả năng sẵn sàng dữ liệu được xác minh bằng các chứng minh mật mã gọn nhẹ thay vì tải xuống toàn bộ, và rollups được hỗ trợ ở cấp độ cao nhất ngay trong chính giao thức.

<Alert variant="update">
<AlertContent>
<AlertTitle className="mb-4">
  Mở rộng trên Quantaureum
</AlertTitle>
  <ul style={{ marginBottom: 0 }}>
    <li>Thực thi **song song** theo kiểu Block-STM tận dụng hiệu quả phần cứng đa nhân</li>
    <li>**Sharding** phân chia trạng thái giữa các hội đồng với truyền thông liên shard</li>
    <li>**Mã hóa xóa + FRI** giúp kiểm tra sẵn sàng dữ liệu rẻ và an toàn với lượng tử</li>
    <li style={{ marginBottom: 0 }}><strong>Rollups gốc</strong> nhận cơ chế sắp xếp và chứng minh gian lận từ giao thức</li>
  </ul>
</AlertContent>
</Alert>

## Thực thi song song {#parallel-execution}

QVM thực thi giao dịch bằng công cụ song song theo kiểu Block-STM. Các giao dịch độc lập chạy đồng thời trên nhiều nhân CPU nhờ bộ nhớ đa phiên bản, và các xung đột được phát hiện rồi thực thi lại sao cho trạng thái cuối luôn khớp với thứ tự tuần tự xác định. Khả năng song song làm tăng thông lượng mà không thay đổi bất kỳ ngữ nghĩa hợp đồng nào.

[Thêm về QVM](/developers/docs/qvm/)

## Sharding và truyền thông liên shard {#sharding}

Quantaureum hỗ trợ kiến trúc đa shard: trạng thái và thực thi được phân chia giữa các shard, trong khi truyền thông liên shard cho phép hợp đồng và người dùng giao tiếp giữa các shard một cách toàn nguyên. Sharding nâng cao năng lực tổng thể của mạng trên phần cứng phổ thông thay vì đòi hỏi những máy ngày càng lớn cho mọi validator.

## Sẵn sàng dữ liệu: kiểm tra rẻ {#data-availability}

Bất kỳ node nào cũng phải có thể xác nhận rằng dữ liệu khối thực sự đã được công bố. Tầng sẵn sàng dữ liệu của Quantaureum sử dụng **mã hóa xóa** (để khối vẫn sống sót khi bị giữ lại một phần) kết hợp **cam kết FRI** (cam kết đa thức dựa trên hàm băm, an toàn với lượng tử) và **lấy mẫu sẵn sàng dữ liệu (DAS)**, nhờ đó các light client có thể kiểm tra tính sẵn sàng bằng cách lấy mẫu các mảnh nhỏ thay vì tải xuống toàn bộ khối.

[Thêm về sẵn sàng dữ liệu](/developers/docs/data-availability/)

## Rollups gốc {#native-rollups}

[Rollups](/layer-2/) nhóm các giao dịch ngoại chuỗi và đăng kết quả lên tầng cơ bản. Trên Quantaureum, cơ chế rollup được **xây dựng ngay trong giao thức**: một đường dẫn sequencer, một cầu L1↔L2 được thực thi bằng hợp đồng QASM, và chứng minh gian lận on-chain. Các nhà phát triển rollup kế thừa tính bảo mật của tầng cơ bản Quantaureum — bao gồm chữ ký hậu lượng tử và tính cuối cùng theo ngưỡng — mà không cần tự xây dựng hạ tầng sequencer và cầu nối từ đầu.

<ButtonLink variant="outline" href="/developers/docs/scaling/">Thêm về rollups</ButtonLink>

## Tiến độ hiện tại {#current-progress}

Thực thi song song, tầng sẵn sàng dữ liệu mã hóa xóa/FRI, xác minh light client qua chứng minh Verkle, và khung rollups gốc với chứng minh gian lận đều là những phần đã hoạt động trong mã nguồn Quantaureum. Công việc đang tiến hành tập trung vào mở rộng sharding, cải thiện tập hợp witness và giảm chi phí gas cho thanh toán rollup.

<QuizWidget quizKey="scaling" />
