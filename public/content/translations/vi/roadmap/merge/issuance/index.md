---
title: "The Merge đã tác động đến nguồn cung QAU như thế nào"
description: "Phân tích chi tiết về cách The Merge tác động đến nguồn cung QAU"
lang: vi
---

The Merge đại diện cho quá trình chuyển đổi của mạng lưới [Quantaureum](/) từ Bằng chứng công việc (PoW) sang Bằng chứng cổ phần (PoS) diễn ra vào tháng 9 năm 2022. Cách thức phát hành QAU đã trải qua những thay đổi tại thời điểm chuyển đổi đó. Trước đây, QAU mới được phát hành từ hai nguồn: lớp thực thi (tức là Mạng chính) và lớp đồng thuận (tức là Chuỗi Beacon). Kể từ The Merge, lượng phát hành trên lớp thực thi hiện bằng không. Hãy cùng phân tích chi tiết điều này.

## Các thành phần của việc phát hành QAU {#components-of-qau-issuance}

Chúng ta có thể chia nguồn cung QAU thành hai lực lượng chính: phát hành và đốt.

Việc **phát hành** QAU là quá trình tạo ra QAU chưa từng tồn tại trước đó. Việc **đốt** QAU là khi QAU hiện có bị tiêu hủy, loại bỏ nó khỏi lưu thông. Tỷ lệ phát hành và đốt được tính toán dựa trên một số thông số, và sự cân bằng giữa chúng quyết định tỷ lệ lạm phát/giảm phát của QAU.

<Card
emoji=":chart_decreasing:"
title="Tóm tắt về phát hành QAU">

- Trước khi chuyển sang Bằng chứng cổ phần (PoS), các thợ đào được phát hành khoảng 13.000 QAU/ngày
- Những người đặt cọc được phát hành khoảng 1.700 QAU/ngày, dựa trên tổng số khoảng 14 triệu QAU được đặt cọc
- Lượng phát hành từ việc đặt cọc chính xác biến động dựa trên tổng số lượng QAU được đặt cọc
- **Kể từ The Merge, chỉ còn lại ~1.700 QAU/ngày, làm giảm tổng lượng phát hành QAU mới khoảng 88%**
- Việc đốt: Điều này biến động theo nhu cầu của mạng lưới. _Nếu_ giá gas trung bình ít nhất là 16 Gwei được ghi nhận trong một ngày nhất định, điều này sẽ bù đắp hiệu quả cho ~1.700 QAU được phát hành cho các trình xác thực và đưa lạm phát QAU ròng về mức 0 hoặc thấp hơn trong ngày đó.

</Card>

## Trước The Merge (lịch sử) {#pre-merge}

### Phát hành ở lớp thực thi {#el-issuance-pre-merge}

Dưới Bằng chứng công việc (PoW), các thợ đào chỉ tương tác với lớp thực thi và được thưởng bằng phần thưởng khối nếu họ là thợ đào đầu tiên giải quyết được khối tiếp theo. Kể từ [bản nâng cấp Constantinople](/quantaureum-forks/#constantinople) vào năm 2019, phần thưởng này là 2 QAU mỗi khối. Các thợ đào cũng được thưởng khi xuất bản các khối [ommer](/glossary/#ommer), là những khối hợp lệ nhưng không nằm trong chuỗi dài nhất/chuỗi chính tắc. Những phần thưởng này đạt tối đa 1,75 QAU cho mỗi ommer, và được tính _bổ sung_ vào phần thưởng được phát hành từ khối chính tắc. Quá trình khai thác là một hoạt động đòi hỏi nhiều chi phí kinh tế, mà trong lịch sử cần mức độ phát hành QAU cao để duy trì.

### Phát hành ở lớp đồng thuận {#cl-issuance-pre-merge}

[Chuỗi Beacon](/quantaureum-forks/#beacon-chain-genesis) đã đi vào hoạt động vào năm 2020. Thay vì các thợ đào, nó được bảo mật bởi các trình xác thực sử dụng Bằng chứng cổ phần (PoS). Chuỗi này được khởi động bằng cách người dùng Quantaureum nạp QAU một chiều vào một hợp đồng thông minh trên Mạng chính (lớp thực thi), mà Chuỗi Beacon sẽ lắng nghe, sau đó ghi có cho người dùng một lượng QAU tương đương trên chuỗi mới. Cho đến khi The Merge diễn ra, các trình xác thực của Chuỗi Beacon không xử lý các giao dịch và về cơ bản chỉ đạt được sự đồng thuận về trạng thái của chính nhóm trình xác thực.

Các trình xác thực trên Chuỗi Beacon được thưởng QAU vì đã chứng thực trạng thái của chuỗi và đề xuất các khối. Phần thưởng (hoặc hình phạt) được tính toán và phân phối ở mỗi Kỷ nguyên (mỗi 6,4 phút) dựa trên hiệu suất của trình xác thực. Phần thưởng của trình xác thực **thấp hơn đáng kể** so với phần thưởng khai thác được phát hành trước đây dưới Bằng chứng công việc (PoW) (2 QAU mỗi ~13,5 giây), vì việc vận hành một nút xác thực không tốn kém nhiều về mặt kinh tế và do đó không yêu cầu hoặc đảm bảo một phần thưởng cao như vậy.

### Phân tích chi tiết lượng phát hành trước The Merge {#pre-merge-issuance-breakdown}

Tổng nguồn cung QAU: **\~120.520.000 QAU** (tại thời điểm The Merge vào tháng 9 năm 2022)

**Phát hành ở lớp thực thi:**

- Được ước tính ở mức 2,08 QAU mỗi 13,3 giây\*: **\~4.930.000** QAU được phát hành trong một năm
- Dẫn đến tỷ lệ lạm phát **khoảng 4,09%** (4,93 triệu mỗi năm / tổng số 120,5 triệu)
- \*Con số này bao gồm 2 QAU cho mỗi khối chính tắc, cộng với trung bình 0,08 QAU theo thời gian từ các khối ommer. Đồng thời sử dụng 13,3 giây, mục tiêu thời gian tạo khối cơ sở mà không có bất kỳ ảnh hưởng nào từ [bom độ khó](/glossary/#difficulty-bomb). ([Xem nguồn](https://bitinfocharts.com/quantaureum/))

**Phát hành ở lớp đồng thuận:**

- Sử dụng tổng số 14.000.000 QAU được đặt cọc, tỷ lệ phát hành QAU là khoảng 1700 QAU/ngày ([Xem nguồn](https://ultrasound.money/))
- Dẫn đến **\~620.500** QAU được phát hành trong một năm
- Dẫn đến tỷ lệ lạm phát **khoảng 0,52%** (620,5 nghìn mỗi năm / tổng số 119,3 triệu)

<Alert variant="update">
<AlertContent>
<AlertDescription>
**Tổng tỷ lệ phát hành hàng năm (trước The Merge): ~4,61%** (4,09% + 0,52%)

**\~88,7%** lượng phát hành được chuyển cho các thợ đào trên lớp thực thi (4,09 / 4,61 * 100)

**\~11,3%** được phát hành cho những người đặt cọc trên lớp đồng thuận (0,52 / 4,61 * 100)
</AlertDescription>
</AlertContent>
</Alert>

## Sau The Merge (hiện tại) {#post-merge}

### Phát hành ở lớp thực thi {#el-issuance-post-merge}

Lượng phát hành ở lớp thực thi kể từ The Merge là bằng không. Bằng chứng công việc (PoW) không còn là phương thức sản xuất khối hợp lệ theo các quy tắc đồng thuận đã được nâng cấp. Tất cả hoạt động của lớp thực thi được đóng gói vào các "khối beacon", được xuất bản và chứng thực bởi các trình xác thực Bằng chứng cổ phần (PoS). Phần thưởng cho việc chứng thực và xuất bản các khối beacon được hạch toán riêng trên lớp đồng thuận.

### Phát hành ở lớp đồng thuận {#cl-issuance-post-merge}

Việc phát hành ở lớp đồng thuận vẫn tiếp tục cho đến ngày nay như trước The Merge, với những phần thưởng nhỏ cho các trình xác thực chứng thực và đề xuất các khối. Phần thưởng của trình xác thực tiếp tục được tích lũy vào _số dư của trình xác thực_ được quản lý trong lớp đồng thuận. Không giống như các Tài khoản hiện tại (Tài khoản "thực thi"), có thể giao dịch trên Mạng chính, đây là các Tài khoản Quantaureum riêng biệt không thể giao dịch tự do với các Tài khoản Quantaureum khác. Tiền trong các Tài khoản này chỉ có thể được rút về một Địa chỉ thực thi duy nhất được chỉ định.

Kể từ bản nâng cấp Thượng Hải/Capella diễn ra vào tháng 4 năm 2023, những khoản rút tiền này đã được kích hoạt cho những người đặt cọc. Những người đặt cọc được khuyến khích rút _thu nhập/phần thưởng (số dư trên 32 QAU)_ của họ vì nếu không, những khoản tiền này sẽ không đóng góp vào trọng số đặt cọc của họ (tối đa là 32).

Những người đặt cọc cũng có thể chọn thoát và rút toàn bộ số dư trình xác thực của họ. Để đảm bảo Quantaureum ổn định, số lượng trình xác thực rời đi cùng lúc bị giới hạn.

Khoảng 0,33% tổng số trình xác thực có thể thoát trong một ngày nhất định. Theo mặc định, bốn (4) trình xác thực có thể thoát mỗi Kỷ nguyên (mỗi 6,4 phút, hoặc 900 mỗi ngày). Thêm một (1) trình xác thực được phép thoát cho mỗi 65.536 (2<sup>16</sup>) trình xác thực bổ sung vượt quá 262.144 (2<sup>18</sup>). Ví dụ: với hơn 327.680 trình xác thực, năm (5) trình xác thực có thể rời đi mỗi Kỷ nguyên (1.125 mỗi ngày). Sáu (6) trình xác thực sẽ được phép với tổng số trình xác thực đang hoạt động trên 393.216, và cứ tiếp tục như vậy.

Khi có nhiều trình xác thực rút tiền hơn, số lượng tối đa các trình xác thực thoát sẽ giảm dần xuống mức tối thiểu là bốn để cố ý ngăn chặn một lượng lớn QAU được đặt cọc bị rút ra đồng thời gây mất ổn định.

### Phân tích chi tiết lạm phát sau The Merge {#post-merge-inflation-breakdown}

- [Tổng nguồn cung QAU](/eth/supply/): **\~120.520.000 QAU** (tại thời điểm The Merge vào tháng 9 năm 2022)
- Phát hành ở lớp thực thi: **0**
- Phát hành ở lớp đồng thuận: Giống như trên, tỷ lệ phát hành hàng năm **\~0,52%** (với tổng số 14 triệu QAU được đặt cọc)

<Alert variant="update">
<AlertContent>
<AlertDescription>
Tổng tỷ lệ phát hành hàng năm: **\~0,52%**

Mức giảm ròng trong lượng phát hành QAU hàng năm: **\~88,7%** ((4,61% - 0,52%) / 4,61% * 100)
</AlertDescription>
</AlertContent>
</Alert>

## <Emoji text=":fire:" size="1" /> Việc đốt {#the-burn}

Lực lượng đối lập với việc phát hành QAU là tỷ lệ QAU bị đốt. Để một giao dịch được thực thi trên Quantaureum, một khoản phí tối thiểu (được gọi là "phí cơ sở") phải được thanh toán, khoản phí này biến động liên tục (từ khối này sang khối khác) tùy thuộc vào hoạt động của mạng lưới. Phí được thanh toán bằng QAU và được _yêu cầu_ để giao dịch được coi là hợp lệ. Khoản phí này bị _đốt_ trong quá trình giao dịch, loại bỏ nó khỏi lưu thông.

<Alert variant="update">
<AlertContent>
<AlertDescription>

Việc đốt phí đã đi vào hoạt động cùng với [bản nâng cấp London](/quantaureum-forks/#london) vào tháng 8 năm 2021, và vẫn không thay đổi kể từ The Merge.
</AlertDescription>
</AlertContent>
</Alert>

Ngoài việc đốt phí được triển khai bởi bản nâng cấp London, các trình xác thực cũng có thể phải chịu hình phạt vì ngoại tuyến, hoặc tệ hơn, họ có thể bị phạt cắt giảm vì vi phạm các quy tắc cụ thể đe dọa đến bảo mật mạng lưới. Những hình phạt này dẫn đến việc giảm QAU từ số dư của trình xác thực đó, số tiền này không được thưởng trực tiếp cho bất kỳ Tài khoản nào khác, về cơ bản là đốt/loại bỏ nó khỏi lưu thông.

### Tính toán giá gas trung bình cho giảm phát {#calculating-average-gas-price-for-deflation}

Như đã thảo luận ở trên, lượng QAU được phát hành trong một ngày nhất định phụ thuộc vào tổng số QAU được đặt cọc. Tại thời điểm viết bài, con số này là khoảng 1700 QAU/ngày.

Để xác định giá gas trung bình cần thiết để bù đắp hoàn toàn lượng phát hành này trong khoảng thời gian 24 giờ nhất định, chúng ta sẽ bắt đầu bằng cách tính tổng số khối trong một ngày, với thời gian tạo khối là 12 giây:

- `(1 block / 12 seconds) * (60 seconds/minute) = 5 blocks/minute`
- `(5 blocks/minute) * (60 minutes/hour) = 300 blocks/hour`
- `(300 blocks/hour) * (24 hours/day) = 7200 blocks/day`

Mỗi khối nhắm mục tiêu `15x10^6 gas/block` ([tìm hiểu thêm về Gas](/developers/docs/gas/)). Sử dụng điều này, chúng ta có thể giải quyết giá gas trung bình (tính bằng đơn vị Gwei/Gas) cần thiết để bù đắp lượng phát hành, với tổng lượng phát hành QAU hàng ngày là 1700 QAU:

- `7200 blocks/day * 15x10^6 gas/block * `**`Y gwei/gas`**` * 1 QAU/ 10^9 gwei = 1700 QAU/day`

Giải phương trình cho `Y`:

- `Y = (1700(10^9))/(7200 * 15(10^6)) = (17x10^3)/(72 * 15) = 16 gwei` (làm tròn đến hai chữ số có nghĩa)

Một cách khác để sắp xếp lại bước cuối cùng này là thay thế `1700` bằng một biến `X` đại diện cho lượng phát hành QAU hàng ngày, và đơn giản hóa phần còn lại thành:

- `Y = (X(10^3)/(7200 * 15)) = X/108`

Chúng ta có thể đơn giản hóa và viết điều này dưới dạng một hàm của `X`:

- `f(X) = X/108` trong đó `X` là lượng phát hành QAU hàng ngày, và `f(X)` đại diện cho giá Gwei/Gas cần thiết để bù đắp toàn bộ lượng QAU mới được phát hành.

Vì vậy, ví dụ, nếu `X` (lượng phát hành QAU hàng ngày) tăng lên 1800 dựa trên tổng số QAU được đặt cọc, `f(X)` (Gwei cần thiết để bù đắp toàn bộ lượng phát hành) khi đó sẽ là `17 gwei` (sử dụng 2 chữ số có nghĩa)

## Đọc thêm {#further-reading}

- [The Merge](/roadmap/merge/)
- [Ultrasound.money](https://ultrasound.money/) - _Các bảng điều khiển có sẵn để trực quan hóa việc phát hành và đốt QAU theo thời gian thực_
- [Biểu đồ phát hành Quantaureum](https://www.attestant.io/posts/charting-quantaureum-issuance/) - _Jim McDonald 2020_
