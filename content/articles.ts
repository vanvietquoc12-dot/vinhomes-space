export type ContentBlock =
  | string
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "image"; src: string; alt: string }
  | { type: "ul"; items: string[] }
  | { type: "table"; headers: string[]; rows: string[][] };

export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  projectSlug: string;
  publishedAt: string;
  updatedAt?: string;
  coverImage: string;
  tags: string[];
  readingMinutes: number;
  featured?: boolean;
  content: ContentBlock[];
}

export const articles: Article[] = [
  {
    slug: "vinhomes-sai-gon-park-la-gi-tong-quan",
    title: `Vinhomes Sài Gòn Park là gì? Tổng quan đại đô thị Hóc Môn (cập nhật 2026)`,
    excerpt:
      `Tên thương mại vs pháp lý VIUT, vị trí Hóc Môn / Tây Bắc, quy mô 1.080–880–827 ha và sản phẩm đang mở bán tháng 9/2026.`,
    projectSlug: "vinhomes-sai-gon-park",
    publishedAt: "2026-09-12",
    coverImage: "/images/sai-gon-park/hero-skyline-park.webp",
    tags: ["Tổng quan", "Sài Gòn Park", "Hóc Môn"],
    readingMinutes: 10,
    featured: true,
    content: [
      { type: "p", text: `Nếu bạn gõ “Vinhomes Sài Gòn Park” trên Google, kết quả thường nhảy giữa landing bán hàng, tin pháp lý và bảng giá lệch nhau vài tỷ. Bài này gom lại bức tranh tổng quan: dự án tên gì trên giấy tờ, nằm đâu, lớn cỡ nào, đang bán gì — và đâu là chỗ cần đọc chậm.` },
      { type: "image", src: "/images/sai-gon-park/hero-skyline-park.webp", alt: `Minh họa skyline và công viên — schematic` },
      { type: "h2", text: `Tên thương mại và tên pháp lý` },
      { type: "p", text: `Trên brochure và Vinhomes Market, dự án gọi là **Vinhomes Sài Gòn Park** (Saigon Park), đôi khi gắn thêm “Hóc Môn”. Trên văn bản nhà nước, tên pháp lý thường xuất hiện là **Khu đô thị Đại học Quốc tế** (hay viết tắt **VIUT**).` },
      { type: "p", text: `Sự khác biệt này không chỉ mang tính từ ngữ. Khi đọc quyết định giao đất, quy hoạch 1/500 hay văn bản đủ điều kiện bán, bạn sẽ ít thấy chữ “Sài Gòn Park” hơn là tên pháp lý. Người mua nên quen với cả hai để đối chiếu hồ sơ.` },
      { type: "p", text: `Chủ đầu tư pháp lý được nhiều nguồn thứ cấp nêu là **Công ty Cổ phần Đô thị Đại học Quốc tế Berjaya Việt Nam**. Tập đoàn Vingroup / thương hiệu Vinhomes xuất hiện mạnh ở khâu phát triển sản phẩm, giám sát và kênh bán (Vinhomes Market), nhưng **tên trên hợp đồng mua bán** cần khớp pháp nhân được ghi trong quyết định giao đất và thỏa thuận bảo lãnh — đừng chỉ dựa vào logo trên brochure.` },
      { type: "h2", text: `Vị trí: cửa ngõ Tây Bắc, không phải “Quận 9 mới”` },
      { type: "p", text: `Theo các nguồn lớn (CafeLand, Vinhomes Market, tin pháp lý), dự án gắn với xã **Xuân Thới Sơn**, khu vực huyện Hóc Môn cũ — cửa ngõ **Tây Bắc TP.HCM**, dọc hành lang **Quốc lộ 22** và liên quan các trục như đường **Đặng Công Bình**, **Vành đai 3**, định hướng cao tốc **TP.HCM – Mộc Bài** và tuyến **Metro số 2**.` },
      { type: "image", src: "/images/sai-gon-park/map-location-schematic.webp", alt: `Sơ đồ vị trí minh họa Tây Bắc TP.HCM` },
      { type: "p", text: `Một số trang bán hàng liệt kê thêm nhiều xã khác trong huyện Hóc Môn. Trên thực tế biên tập, nên ưu tiên **địa danh ghi trên quyết định giao đất** (Xuân Thới Sơn) và coi các mô tả “bao phủ nhiều xã” là narrative marketing cho đến khi có bản đồ ranh giới chính thức trong hồ sơ bạn đang giao dịch.` },
      { type: "p", text: `**Lưu ý:** Đây **không** phải dự án ở thành phố Thủ Đức / khu vực từng gọi là Quận 9. Nếu bạn đang so sánh với Vinhomes Grand Park, đó là hai tọa độ và hai giai đoạn vận hành khác nhau.` },
      { type: "h2", text: `Quy mô: 1.080 ha, 880 ha, hay ~827 ha?` },
      { type: "p", text: `Ba con số này thường bị trộn:` },
      { type: "table", headers: [`Con số`, `Ý nghĩa thường gặp`, `Cách dùng trong bài độc lập`], rows: [
          [`~**1.080 ha**`, `Quy mô “đại đô thị” kể cả cụm sân golf (~200 ha) theo tài liệu giới thiệu`, `Gọi là quy mô quảng bá tổng thể`],
          [`~**880 ha**`, `Phần đô thị có **quy hoạch chi tiết 1/500** (Khu đô thị Đại học Quốc tế)`, `Dùng khi nói quy hoạch & chỉ tiêu`],
          [`~**827 ha**`, `Phần **giao đất giai đoạn 1** (QĐ 1426/QĐ-UBND ngày 12/3/2026, theo nguồn thứ cấp)`, `Dùng khi nói pháp lý triển khai hiện tại`]
      ] },
      { type: "p", text: `Nhầm 1.080 với “đã giao hết” sẽ làm người mua đánh giá sai tiến độ. Phần golf, theo phân tích mặt bằng của một số đại lý, nằm **ngoài** ranh 880 ha 1/500 — tức tiện ích golf là định hướng/brochure, không tự động nằm trong cùng một quyết định quy hoạch nhà ở.` },
      { type: "p", text: `Dân số dự kiến hay được nêu khoảng **135.000 cư dân** và **60.000 sinh viên**. Đây là chỉ tiêu quy hoạch / định vị dài hạn, không phải số người đang ở năm 2026.` },
      { type: "h2", text: `Năm trụ cột định vị sản phẩm` },
      { type: "p", text: `Tài liệu giới thiệu chia không gian thành **năm khu** chạy theo trục chính (thường mô tả dọc đường Tam Tân):` },
      { type: "ul", items: [
        `**Ivy Park** — Công viên Tri Thức (gắn cụm giáo dục/đại học)`,
        `**Global Park** — Công viên Quốc Tế (thương mại, ẩm thực, giải trí)`,
        `**Laguna Park** — Công viên Biển Xanh (công viên nước, hồ lớn)`,
        `**Zen Park** — Công viên Thiền (định hướng cảnh quan Nhật)`,
        `**Golf Park** — quanh sân golf`
      ] },
      { type: "image", src: "/images/sai-gon-park/zones-5-parks.webp", alt: `Năm phân khu minh họa` },
      { type: "p", text: `Tới tháng 9/2026, nguồn thứ cấp theo dõi bảng hàng cho biết **Ivy** và **Global** đang có quỹ căn liền kề mở bán; ba khu còn lại chưa mở bán chính thức. Trạng thái này có thể đổi — hãy xem lại ngày trên chính sách bán hàng.` },
      { type: "h2", text: `Sản phẩm: đang bán gì, mới nằm trên quy hoạch?` },
      { type: "p", text: `**Đang có giao dịch thực tế (theo bảng giá đại lý đối chiếu Market, 9/2026):** chủ yếu **nhà liền kề / nhà phố thấp tầng**, với các hình thức xây thô, hoàn thiện và giãn xây. Mức giá theo dãy được công bố tham khảo từ khoảng **5,83 tỷ đồng/căn** trở lên tùy dãy và diện tích — đây là giá theo dãy, chưa phải từng mã căn.` },
      { type: "p", text: `**Trong quy hoạch nhưng chưa nên gắn “giá chính thức”:** biệt thự, shophouse, căn hộ cao tầng. Nhiều website vẫn đưa khoảng giá căn hộ hay biệt thự; ít nhất một nguồn đại lý chi tiết (tháng 9/2026) ghi rõ các dòng này **chưa công bố giá chính thức**. Trên vinhomes.space chúng tôi ưu tiên cách nói thận trọng đó.` },
      { type: "image", src: "/images/sai-gon-park/stock-city-skyline.webp", alt: `Skyline đô thị generic — stock` },
      { type: "h2", text: `Tiện ích: hãy tách “quy hoạch” và “đang vận hành”` },
      { type: "p", text: `Brochure liệt kê hệ sinh thái quen thuộc của các đại đô thị Vin: cụm đại học (~150 ha), hàng chục trường học, Vinmec, Vincom Mega Mall, công viên nước, hệ thống công viên và đường dạo ven nước, sân golf 36 hố…` },
      { type: "p", text: `Một phần có chỉ tiêu trong quy hoạch 1/500 (ví dụ đất đào tạo–nghiên cứu, lô y tế cấp đô thị). Phần lớn tiện ích **chưa** đồng nghĩa đã hoàn thành hoặc đang mở cửa năm 2026. Người mua ở thật giai đoạn đầu cần tính kịch bản: vài năm đầu có thể phụ thuộc tiện ích ngoại khu và hạ tầng xung quanh nhiều hơn ảnh render.` },
      { type: "h2", text: `Pháp lý giai đoạn đầu — điểm then chốt` },
      { type: "p", text: `Chuỗi mốc được các trang pháp lý tổng hợp gồm: điều chỉnh chủ trương đầu tư cấp Thủ tướng, quy hoạch phân khu, phê duyệt 1/500 cho ~880 ha, giao đất giai đoạn 1, nghiệm thu hạ tầng một đơn vị ở, và văn bản xác định **1.802 căn thấp tầng thuộc Đơn vị ở số 4** đủ điều kiện bán kèm cam kết bảo lãnh ngân hàng (Techcombank) vào tháng 8/2026 — theo nguồn thứ cấp có trích số hiệu văn bản.` },
      { type: "p", text: `**Phạm vi hẹp rất quan trọng:** đủ điều kiện + bảo lãnh được mô tả cho quỹ căn ĐVO-4, không tự động phủ toàn bộ 880 ha hay giai đoạn 2. Các nội dung như thu hồi đất phần còn lại, nghĩa vụ tài chính/giá đất, nghĩa vụ nhà ở xã hội vẫn được nhắc là đang triển khai.` },
      { type: "h2", text: `Ai nên đọc tiếp bài nào?` },
      { type: "ul", items: [
        `Quan tâm **đường đi & hạ tầng** → bài vị trí & giao thông.`,
        `Sắp đặt cọc → bài **pháp lý checklist**.`,
        `So sánh ngân sách → bài **giá & giãn xây**.`,
        `Phân vân Grand Park → bài so sánh nhanh.`
      ] },
      { type: "h2", text: `Kết luận ngắn` },
      { type: "p", text: `Vinhomes Sài Gòn Park là tên thương mại của một đại đô thị pháp lý **Khu đô thị Đại học Quốc tế** tại cửa ngõ Tây Bắc TP.HCM, quy mô quảng bá khoảng 1.080 ha nhưng phần quy hoạch đô thị ~880 ha và phần đã giao giai đoạn 1 nhỏ hơn. Năm 2026, câu chuyện thực tế với đa số người mua là **nhà thấp tầng khu đang mở bán + pháp lý theo từng đơn vị ở**, chứ chưa phải “thành phố tiện ích vận hành đầy đủ” như ảnh tổng thể.` },
      { type: "p", text: `*Nguồn tham khảo công khai: market.vinhomes.vn; cafeland.vn; newgeninvest.vn (mặt bằng, pháp lý, bảng giá). Cập nhật biên tập: 09/2026.*` }
    ],
  },
  {
    slug: "vinhomes-sai-gon-park-o-dau-giao-thong",
    title: `Vinhomes Sài Gòn Park ở đâu? Kết nối QL22, Vành đai 3 và Metro 2`,
    excerpt:
      `Xuân Thới Sơn – cửa ngõ Tây Bắc: QL22, Vành đai 3, cao tốc Mộc Bài và Metro 2 — tách kỳ vọng hạ tầng khỏi giờ cao điểm thật.`,
    projectSlug: "vinhomes-sai-gon-park",
    publishedAt: "2026-09-13",
    coverImage: "/images/sai-gon-park/map-location-schematic.webp",
    tags: ["Vị trí", "Giao thông", "Sài Gòn Park"],
    readingMinutes: 9,
    featured: true,
    content: [
      { type: "p", text: `Câu hỏi “ở đâu?” với Sài Gòn Park không chỉ là một pin trên Google Maps. Người mua đang cân nhắc giữa **tọa độ hiện tại** (Hóc Môn / Xuân Thới Sơn) và **tọa độ kỳ vọng** sau khi Vành đai 3, mở rộng QL22 hay các tuyến cao tốc/metro đi vào vận hành. Bài này tách hai lớp đó.` },
      { type: "image", src: "/images/sai-gon-park/map-location-schematic.webp", alt: `Bản đồ vị trí minh họa` },
      { type: "h2", text: `Địa danh trên hồ sơ và trên brochure` },
      { type: "p", text: `Các nguồn tin địa ốc lớn và trang dự án thống nhất khung lớn:` },
      { type: "ul", items: [
        `Thuộc cửa ngõ **Tây Bắc TP.HCM**`,
        `Gắn xã **Xuân Thới Sơn** (khu vực huyện Hóc Môn cũ)`,
        `Tiếp cận **Quốc lộ 22** (trục xuyên Á hướng Tây Ninh – cửa khẩu Mộc Bài)`,
        `Liên quan đường **Đặng Công Bình** và hành lang **Vành đai 3**`
      ] },
      { type: "p", text: `Một số landing mô tả dự án “trải dài nhiều xã” hoặc hình chữ L hai mặt tiền. Khi làm việc với môi giới, hãy yêu cầu **bản đồ ranh giới** và vị trí căn trên mặt bằng định vị kiến trúc, thay vì chỉ nghe mô tả “cạnh nút giao”.` },
      { type: "p", text: `**Không nhầm với:** các dự án Vinhomes phía Đông (Grand Park) hay các khu Nam Sài Gòn. Cùng hệ sinh thái thương hiệu không có nghĩa cùng thời gian di chuyển vào trung tâm lịch sử.` },
      { type: "h2", text: `Các trục hạ tầng được gắn với narrative tăng giá` },
      { type: "h2", text: `Quốc lộ 22` },
      { type: "p", text: `QL22 là lý do địa tô khu vực được nhắc nhiều nhất: kết nối trung tâm TP.HCM với Tây Ninh và hành lang biên giới. Các bài bán hàng nhấn mạnh việc mở rộng / nâng cấp tuyến này giúp rút ngắn hành trình. Thực tế ùn tắc giờ cao điểm trên QL22 vẫn là trải nghiệm hằng ngày của cư dân khu vực — người mua ở thật nên tự chạy thử vào khung giờ mình sẽ đi làm.` },
      { type: "h2", text: `Vành đai 3` },
      { type: "p", text: `Vành đai 3 được định vị là vòng kết nối vùng, liên thông nhiều cực tăng trưởng và logistics. Nhiều bài viết nêu mốc hoàn thành từng đoạn vào các năm 2025–2026. Với người mua nhà, câu hỏi thực dụng là: **đoạn nào gần dự án đã thông xe**, nút giao nào còn thi công, và đường dẫn từ cổng dự án tới vành đai dài bao nhiêu km đường hiện hữu.` },
      { type: "image", src: "/images/sai-gon-park/traffic-connectivity.webp", alt: `Sơ đồ kết nối giao thông minh họa` },
      { type: "h2", text: `Cao tốc TP.HCM – Mộc Bài` },
      { type: "p", text: `Được mô tả là tuyến chiến lược xuyên biên giới / logistics. Đây là hạ tầng **kế hoạch / triển khai theo giai đoạn**, không phải tiện ích nội khu. Gắn giá trị BĐS với cao tốc là góc đầu tư dài hạn, không phải lý do để bỏ qua pháp lý căn đang mua.` },
      { type: "h2", text: `Metro số 2 (Bến Thành – Tham Lương và định hướng TOD)` },
      { type: "p", text: `Marketing dự án thường đặt Ivy Park “gần” hướng Metro 2 / TOD Tây Bắc. Hãy phân biệt:` },
      { type: "ul", items: [
        `**Ga / đoạn đã xác định trên quy hoạch metro**`,
        `**Lối tiếp cận từ dự án tới ga** (xe buýt, xe máy, xe điện nội khu tương lai)`,
        `**Thời điểm vận hành** — metro TP.HCM có lịch sử chậm so với kỳ vọng ban đầu`
      ] },
      { type: "image", src: "/images/sai-gon-park/icon-metro.webp", alt: `Icon minh họa metro / TOD` },
      { type: "p", text: `Dùng cụm “kích hoạt giá trị TOD” trong brochure là góc bán hàng hợp lệ; dùng làm cam kết thanh khoản ngắn hạn thì rủi ro.` },
      { type: "h2", text: `Đi từ trung tâm bao lâu? Cách tự kiểm` },
      { type: "p", text: `Thay vì tin mốc “30 phút” trên landing, hãy tự đo:` },
      { type: "ul", items: [
        `Chọn 2–3 điểm đến thật của gia đình (văn phòng Quận 1/3/7, trường học hiện tại, sân bay…).`,
        `Đo Google Maps vào **7:30–8:30** và **17:30–19:00** các ngày trong tuần.`,
        `Cộng thêm đoạn từ căn nhà tới cổng ra QL22 / đường lớn (nội khu đại đô thị giai đoạn đầu có thể còn đường đất/công trường).`,
        `Lặp lại sau 3–6 tháng nếu bạn theo dõi tiến độ Vành đai 3.`
      ] },
      { type: "p", text: `Số phút tự đo mới là input cho quyết định ở thật. Số phút marketing là input cho kỳ vọng đầu tư dài hạn — hai việc khác nhau.` },
      { type: "h2", text: `Địa hình & môi trường xung quanh` },
      { type: "p", text: `Tin pháp lý trên CafeLand mô tả hiện trạng khu đất trước đô thị hóa: đất nông nghiệp, kênh rạch, địa hình thấp trũng, có thể ngập mùa mưa. Đây là thông tin hữu ích khi đánh giá:` },
      { type: "ul", items: [
        `Cao độ nền hoàn thiện so với mực nước lịch sử`,
        `Hệ thống thoát nước nội khu đã nghiệm thu tới đâu (ví dụ hạ tầng Đơn vị ở số 4 được nêu đã nghiệm thu tháng 5/2026 theo nguồn pháp lý thứ cấp)`,
        `Khoảng cách tới kênh lớn (An Hạ, Xáng… tùy đoạn)`
      ] },
      { type: "p", text: `Người mua không cần trở thành kỹ sư thủy lợi, nhưng nên hỏi ban quản lý dự án / kỹ thuật đại lý về **cao độ thiết kế** và ảnh hiện trạng mùa mưa gần nhất.` },
      { type: "h2", text: `Vị trí trong tổng mặt bằng nội khu` },
      { type: "p", text: `Trên tài liệu giới thiệu 5 khu, Ivy Park thường được đặt phía gần hướng Vành đai 3 / Metro; Global kế bên; Laguna và Zen sâu hơn theo dải; Golf tách riêng. “Gần tiện ích đại học” hay “gần Global Village” chỉ có ý nghĩa khi bạn đối chiếu **mặt bằng định vị kiến trúc** của đúng dãy đang bán — tổng mặt bằng brochure đôi khi đặt hướng Nam phía trên, dễ đọc ngược nếu không để ý.` },
      { type: "h2", text: `Ai hưởng lợi vị trí này — ai chịu áp lực?` },
      { type: "p", text: `**Phù hợp hơn nếu bạn:**` },
      { type: "ul", items: [
        `Làm việc / có hoạt động dọc hành lang Tây Bắc, Củ Chi, Tây Ninh, Bình Dương phía Tây`,
        `Chấp nhận giai đoạn công trường đổi lấy kỳ vọng hạ tầng 5–10 năm`,
        `Mua tích sản, không cần vào Quận 1 mỗi ngày`
      ] },
      { type: "p", text: `**Áp lực hơn nếu bạn:**` },
      { type: "ul", items: [
        `Commute hằng ngày vào lõi trung tâm và không linh hoạt giờ làm`,
        `Cần trường quốc tế / bệnh viện quốc tế **ngay năm đầu** trong bán kính đi bộ`,
        `Phụ thuộc hoàn toàn vào metro chưa vận hành`
      ] },
      { type: "h2", text: `Kết luận` },
      { type: "p", text: `Vinhomes Sài Gòn Park “ở” Xuân Thới Sơn – cửa ngõ Tây Bắc, bám QL22 và câu chuyện Vành đai 3 / cao tốc / Metro 2. Đó là vị trí **chiến lược trên bản đồ vùng**, nhưng trải nghiệm di chuyển năm 2026 vẫn phải tự kiểm bằng giờ cao điểm thật. Hạ tầng lớn là chất xúc tác dài hạn — không thay thế việc chọn đúng căn thuộc quỹ đã rõ pháp lý.` },
      { type: "p", text: `*Tham khảo: market.vinhomes.vn; cafeland.vn (hồ sơ dự án & tin pháp lý). Biên tập: 09/2026.*` }
    ],
  },
  {
    slug: "5-phan-khu-vinhomes-sai-gon-park",
    title: `5 phân khu Vinhomes Sài Gòn Park: Ivy, Global, Laguna, Zen, Golf`,
    excerpt:
      `Ivy, Global, Laguna, Zen, Golf — khu nào đang mở bán, tiện ích gắn brochure và cách chọn theo mục tiêu mua.`,
    projectSlug: "vinhomes-sai-gon-park",
    publishedAt: "2026-09-14",
    coverImage: "/images/sai-gon-park/zones-5-parks.webp",
    tags: ["Phân khu", "Sài Gòn Park", "Mặt bằng"],
    readingMinutes: 9,
    featured: true,
    content: [
      { type: "p", text: `Đại đô thị Sài Gòn Park không bán “một mặt bằng duy nhất”. Tài liệu giới thiệu tách thành **năm khu** với cảm hứng thiết kế và nhóm tiện ích khác nhau. Hiểu bản đồ phân khu giúp bạn lọc đúng sản phẩm đang mở bán và tránh trả giá “view golf” cho căn thực tế nằm ở dãy thương mại.` },
      { type: "image", src: "/images/sai-gon-park/zones-5-parks.webp", alt: `Sơ đồ 5 phân khu minh họa` },
      { type: "h2", text: `Bức tranh tổng thể` },
      { type: "p", text: `Theo các bài phân tích mặt bằng đối chiếu quy hoạch 1/500 (~880 ha) và brochure:` },
      { type: "ul", items: [
        `Bốn khu **Ivy – Global – Laguna – Zen** xếp thành một dải dọc trục chính (thường nêu đường Tam Tân).`,
        `**Golf Park** tách riêng, gắn cụm sân golf quy mô lớn (~200 ha theo brochure), và được một số nguồn lưu ý là **ngoài ranh** đồ án 1/500 đô thị.`,
        `Tổng mặt bằng giới thiệu đôi khi đặt **hướng Nam lên trên** — khác bản vẽ quy hoạch chuẩn (Bắc lên trên). Đọc sai hướng sẽ đảo vị trí “gần vành đai” với “cuối dải”.`
      ] },
      { type: "p", text: `Trạng thái mở bán (nguồn thứ cấp, tháng 9/2026): **Ivy** và **Global** đang có quỹ liền kề; **Laguna, Zen, Golf** chưa mở bán chính thức.` },
      { type: "h2", text: `Khu 1 — Ivy Park (Công viên Tri Thức)` },
      { type: "p", text: `**Định vị:** cảm hứng Boston–Cambridge; gắn cụm giáo dục / đại học / nghiên cứu.` },
      { type: "p", text: `**Vì sao được nhắc nhiều:** nằm phía đầu dải, gần hướng kết nối Vành đai 3 / định hướng Metro 2 trên brochure. Đất đào tạo–nghiên cứu trong 1/500 được nguồn phân tích nêu khoảng **151 ha**, với nhiều lô trường đại học và ký túc xá (chỉ tiêu tầng cao / mật độ theo QH).` },
      { type: "p", text: `**Sản phẩm:** nguồn bảng hàng nêu quỹ căn liền kề khu Công viên Tri Thức (ví dụ nhóm dãy giãn xây AS…). Phù hợp người ưu tiên môi trường học tập dài hạn, hoặc nhìn tới nhu cầu thuê khi cụm đại học vận hành — **mốc vận hành cụ thể vẫn là ẩn số**.` },
      { type: "image", src: "/images/sai-gon-park/amenity-education.webp", alt: `Tiện ích giáo dục — icon minh họa` },
      { type: "h2", text: `Khu 2 — Global Park (Công viên Quốc Tế)` },
      { type: "p", text: `**Định vị:** cảm hứng Canary Wharf; thương mại – ẩm thực – giải trí đa quốc gia.` },
      { type: "p", text: `**Tiện ích hay liệt kê trên brochure:** Global Village (~19 ha), phố thương mại kiểu Little Hong Kong, Trendy Fashion Town, công viên chủ đề (Galaxy Park…). Đây là góc hấp dẫn với khách mua nhà phố thương mại / kinh doanh dịch vụ.` },
      { type: "p", text: `**Rủi ro thực dụng:** shophouse và NPTM ở đại đô thị giai đoạn đầu thường có **thời gian chờ mật độ cư dân**. Mua vì “sắp có phố ăn uống” cần kịch bản dòng tiền nếu 2–3 năm đầu vắng khách.` },
      { type: "p", text: `Tháng 9/2026, nhiều dãy liền kề xây thô / hoàn thiện được nguồn đại lý gắn với khu Công viên Quốc Tế (nhóm TL…).` },
      { type: "image", src: "/images/sai-gon-park/amenity-park.webp", alt: `Công viên / không gian xanh minh họa` },
      { type: "h2", text: `Khu 3 — Laguna Park (Công viên Biển Xanh)` },
      { type: "p", text: `**Định vị:** cảm hứng Barcelona; hồ lớn, công viên nước.` },
      { type: "p", text: `**Brochure thường gắn:** công viên nước / VinWonders quy mô lớn, Botanica Park (~27 ha), làng khởi nghiệp, làng ẩm thực…` },
      { type: "p", text: `**Trạng thái:** chưa mở bán theo nguồn theo dõi 9/2026; mặt bằng phân lô chi tiết chưa phải thứ người mua F0 nên “đặt chỗ mù”. Laguna thường được dùng trong narrative “căn view hồ / gần công viên nước” — hãy đợi mặt bằng chính thức.` },
      { type: "image", src: "/images/sai-gon-park/canal-walk.webp", alt: `Đường dạo ven nước minh họa` },
      { type: "h2", text: `Khu 4 — Zen Park (Công viên Thiền)` },
      { type: "p", text: `**Định vị:** Karuizawa (Nhật); không gian tĩnh, công viên Nhật (Kiyomi Park ~10 ha trên brochure), làng văn hóa–ẩm thực Nhật.` },
      { type: "p", text: `Phù hợp góc “an cư nghỉ dưỡng trong đô thị”, nhưng cùng rổ rủi ro: chưa mở bán, tiện ích chưa hiện hữu. Người mua nên tách cảm xúc ảnh concept khỏi quyết định đặt cọc ở khu đang bán.` },
      { type: "h2", text: `Khu 5 — Golf Park` },
      { type: "p", text: `**Định vị:** Palm Beach; tổ chức quanh sân golf 36 hố (tên Vinpearl Golf Léman thường được nêu).` },
      { type: "image", src: "/images/sai-gon-park/amenity-golf.webp", alt: `Icon sân golf minh họa` },
      { type: "p", text: `Điểm biên tập quan trọng: nếu sân golf nằm ngoài ranh 880 ha 1/500, thì quyền lợi “view golf / thành viên golf” phải đọc trong **phụ lục hợp đồng và quy chế tiện ích**, không suy ra từ việc dự án cùng thương hiệu. Khu 5 chưa mở bán và chưa có bảng sản phẩm chính thức trên các nguồn chúng tôi đối chiếu.` },
      { type: "h2", text: `Tiện ích dùng chung toàn dự án` },
      { type: "p", text: `Ngoài tiện ích “màu sắc” từng khu, brochure nêu nhóm dùng chung: Vinmec, Vincom Mega Mall, hệ thống trường học, Canal Park, hàng chục công viên, đường dạo ven nước dài nhiều kilômét…` },
      { type: "p", text: `Cách đọc độc lập:` },
      { type: "table", headers: [`Câu hỏi`, `Việc cần làm`], rows: [
          [`Có trên 1/500 không?`, `Đối chiếu ký hiệu lô (YT-D, DV-D, CX…)`],
          [`Có ngày vận hành không?`, `Hỏi văn bản / phụ lục — đừng chỉ nghe tư vấn viên`],
          [`Có ràng buộc phí không?`, `Đọc phí quản lý, phí tiện ích có điều kiện`]
      ] },
      { type: "h2", text: `Gợi ý chọn khu theo mục tiêu` },
      { type: "ul", items: [
        `**Ở gắn giáo dục dài hạn / kỳ vọng cộng đồng học thuật:** nghiên cứu Ivy trước.`,
        `**Kinh doanh dịch vụ, nhà phố thương mại:** Global — nhưng stress-test mật độ.`,
        `**Săn view hồ / golf / thiền:** chờ mở bán & mặt bằng; đừng trả premium dựa trên render khu chưa bán.`,
        `**Ưu tiên pháp lý rõ + giỏ hàng thật:** ở giai đoạn này thường là dãy thuộc quỹ đang mở tại Ivy/Global và **đúng Đơn vị ở đã có văn bản đủ điều kiện bán**.`
      ] },
      { type: "h2", text: `Đọc sâu từng phân khu` },
      { type: "p", text: `Bài này là bản đồ tổng. Nếu bạn đang lọc đúng một khu, đọc tiếp các bài chuyên sâu (cập nhật tuần 22–26/09/2026):` },
      { type: "ul", items: [
        `**Ivy Park** — đang mở bán liền kề / giáo dục: \`/bai-viet/phan-khu-ivy-park-vinhomes-sai-gon-park\``,
        `**Global Park** — đang mở bán / thương mại: \`/bai-viet/phan-khu-global-park-vinhomes-sai-gon-park\``,
        `**Laguna Park** — chưa mở bán / VinWonders–nước: \`/bai-viet/phan-khu-laguna-park-vinhomes-sai-gon-park\``,
        `**Zen Park** — chưa mở bán / Karuizawa: \`/bai-viet/phan-khu-zen-park-vinhomes-sai-gon-park\``,
        `**Golf Park** — chưa mở bán / golf ngoài ranh 880 ha: \`/bai-viet/phan-khu-golf-park-vinhomes-sai-gon-park\``
      ] },
      { type: "h2", text: `Kết luận` },
      { type: "p", text: `Năm phân khu là ngôn ngữ bán hàng để định vị lifestyle. Với người mua năm 2026, bản đồ hữu ích nhất vẫn là: **khu nào đang bán**, **căn có thuộc ĐVO đã clear pháp lý không**, và **tiện ích nào đã có trong quy hoạch versus mới trên brochure**. Cảm hứng Boston hay Barcelona chỉ nên là lớp trang trí sau cùng.` },
      { type: "p", text: `*Tham khảo: newgeninvest.vn/mat-bang-vinhomes-sai-gon-park/; market.vinhomes.vn. Biên tập: 09/2026.*` }
    ],
  },
  {
    slug: "phan-khu-ivy-park-vinhomes-sai-gon-park",
    title: `Phân khu Ivy Park Vinhomes Sài Gòn Park: Công viên Tri Thức (Boston–Cambridge)`,
    excerpt:
      `Ivy Park — khu đang mở bán liền kề (9/2026), gắn cụm đại học ~150 ha trong 1/500. Định vị brochure vs quy hoạch, sản phẩm giãn xây và rủi ro giai đoạn đầu.`,
    projectSlug: "vinhomes-sai-gon-park",
    publishedAt: "2026-09-22",
    coverImage: "/images/sai-gon-park/amenity-education.webp",
    tags: ["Ivy Park", "Phân khu", "Sài Gòn Park", "Công viên Tri Thức"],
    readingMinutes: 11,
    featured: true,
    content: [
      { type: "p", text: `Ivy Park (Công viên Tri Thức) là phân khu được tài liệu giới thiệu đặt **đầu dải** năm khu của Vinhomes Sài Gòn Park, lấy cảm hứng Boston–Cambridge. Tháng 9/2026, đây là một trong hai khu **đang có quỹ liền kề mở bán** theo nguồn thứ cấp — cùng Global Park. Bài này tách lớp brochure, chỉ tiêu quy hoạch 1/500 và thực tế mua bán để bạn đọc chậm trước khi đặt cọc.` },
      { type: "image", src: `/images/sai-gon-park/zones-5-parks.webp`, alt: `Sơ đồ 5 phân khu minh họa — Ivy thường ở đầu dải` },
      { type: "h2", text: `Định vị brochure: Boston–Cambridge nghĩa là gì?` },
      { type: "p", text: `Trên tổng mặt bằng giới thiệu của chủ đầu tư (đối chiếu phân tích mặt bằng Newgen, 9/2026), Ivy Park gắn với hình ảnh thành phố đại học: cụm đào tạo–nghiên cứu ở lõi, nhà ở thấp tầng xếp quanh kênh cảnh quan. Cảm hứng marketing không phải cam kết pháp lý — nhưng nó giải thích vì sao khu này được gắn với narrative **TOD / Metro số 2 / Vành đai 3** nhiều hơn các khu sâu trong dải.` },
      { type: "p", text: `⚠️ Lưu ý hướng bản vẽ: tổng mặt bằng 5 khu đôi khi đặt **Nam lên trên**, khác bản đồ 1/500 (Bắc lên trên). Đọc sai hướng sẽ đảo “đầu dải gần vành đai” với “cuối dải”.` },
      { type: "h2", text: `Vị trí trên mặt bằng tổng thể` },
      { type: "ul", items: [
        `Nằm **Khu 1** trên dải Ivy → Global → Laguna → Zen (trục thường nêu đường Tam Tân).`,
        `Brochure / phân tích mặt bằng đặt Ivy phía gần hướng **nút Vành đai 3** và định hướng **Metro số 2**.`,
        `Lõi khu trùng với đất **đào tạo, nghiên cứu** trên bản đồ quy hoạch chi tiết 1/500 (~880 ha đô thị).`,
        `Golf Park **tách riêng**, không nằm trên cùng dải chính.`
      ] },
      { type: "image", src: `/images/sai-gon-park/map-location-schematic.webp`, alt: `Sơ đồ vị trí Tây Bắc / Hóc Môn — minh họa schematic` },
      { type: "h2", text: `Quy hoạch giáo dục: số liệu nào đã có trên 1/500?` },
      { type: "p", text: `Theo tổng hợp đối chiếu quyết định phê duyệt 1/500 (nguồn thứ cấp Newgen đọc QĐ 273/QĐ-UBND, ngày trên văn bản cần sao y đối chiếu):` },
      { type: "table", headers: [`Hạng mục`, `Con số thường nêu`, `Cách đọc độc lập`], rows: [
                [`Đất đào tạo–nghiên cứu`, `~**151,42 ha** (QH) / ~150 ha brochure`, `Chỉ tiêu đất — chưa = trường đang mở`],
                [`Lô đại học / KTX`, `16 lô ĐH + 3 lô KTX (bảng công trình ngầm)`, `Mỗi lô tối đa 2 tầng hầm theo nguồn này`],
                [`Chỉ tiêu công trình ĐH/KTX`, `Mật độ XD tối đa ~40%, cao tối đa ~12 tầng`, `⚠️ Theo nguồn thứ cấp — kiểm tra phụ lục`],
                [`Trường liên cấp toàn dự án`, `Marketing hay nêu “36 trường”`, `⚠️ Toàn khu, không riêng Ivy; tiến độ từng cấp khác nhau`]
            ] },
      { type: "p", text: `Câu hỏi thực dụng: bạn mua nhà năm 2026 để **ở gần trường đã vận hành**, hay để **giữ chỗ gần cụm sẽ hình thành sau này**? Hai kịch bản khác nhau về dòng tiền và kỳ vọng giá thuê.` },
      { type: "image", src: `/images/sai-gon-park/amenity-education.webp`, alt: `Icon tiện ích giáo dục — minh họa schematic` },
      { type: "h2", text: `Sản phẩm đang gắn với Ivy (tháng 9/2026)` },
      { type: "p", text: `Nguồn bảng hàng / chính sách bán hàng đối chiếu Vinhomes Market (qua Newgen) nêu quỹ căn **liền kề thô giãn xây** tại khu Công viên Tri Thức, áp dụng chính sách bản **V07** từ **25/08/2026**. Đây là quỹ đang giao dịch thực tế — không phải biệt thự hay căn hộ (hai dòng sau nhiều nguồn ghi **chưa công bố giá chính thức**).` },
      { type: "ul", items: [
        `**Loại hình:** nhà liền kề / nhà phố thấp tầng (nhóm dãy giãn xây thường được gắn mã kiểu AS… trên tài liệu đại lý).`,
        `**Hình thức:** giãn xây — phần đất + tiền mặt bằng trả trước; phần xây dựng theo lịch (thường nêu từ khoảng D+540 trên chính sách — ⚠️ có thể đổi).`,
        `**Giá tham khảo toàn dự án (không chỉ Ivy):** dải liền kề theo dãy khoảng **5,83 – 12,04 tỷ**/căn (Newgen 9/2026) — giá theo dãy, chưa phải từng mã căn.`,
        `Chi tiết dòng tiền: xem bài **Giá Vinhomes Sài Gòn Park tháng 9/2026** (\`/bai-viet/gia-vinhomes-sai-gon-park-gian-xay\`).`
      ] },
      { type: "image", src: `/images/sai-gon-park/floorplan-schematic.webp`, alt: `Sơ đồ mặt bằng nhà phố minh họa — schematic` },
      { type: "image", src: `/images/sai-gon-park/price-payment-flow.webp`, alt: `Luồng thanh toán / giãn xây minh họa` },
      { type: "h2", text: `Ai phù hợp với Ivy ở giai đoạn này?` },
      { type: "p", text: `**Phù hợp hơn nếu bạn:**` },
      { type: "ul", items: [
        `Ưu tiên môi trường **học tập / nghiên cứu dài hạn** và chấp nhận tiện ích giáo dục vận hành theo lộ trình nhiều năm.`,
        `Nhìn tới nhu cầu thuê gắn giảng viên, chuyên gia, sinh viên **khi** cụm đại học đi vào hoạt động — không cần dòng tiền thuê năm đầu.`,
        `Muốn căn thuộc quỹ **đang mở bán** và có thể đối chiếu pháp lý theo đơn vị ở (xem checklist ĐVO-4).`,
        `Sẵn sàng tự đo commute Tây Bắc (QL22, Vành đai 3) thay vì tin mốc “X phút” trên landing.`
      ] },
      { type: "p", text: `**Áp lực hơn nếu bạn:**` },
      { type: "ul", items: [
        `Cần trường quốc tế / đại học **ngay năm đầu** trong bán kính đi bộ.`,
        `Mua shophouse để kinh doanh mật độ cao ngay — góc đó nghiêng về Global hơn, và vẫn có rủi ro chờ cư dân.`,
        `Kỳ vọng “view đại học” đã hiện hữu như ảnh concept.`
      ] },
      { type: "h2", text: `Rủi ro & checklist pháp lý riêng cho người nhìn Ivy` },
      { type: "ul", items: [
        `Xác nhận căn / dãy có thuộc **1.802 căn Đơn vị ở số 4** đủ điều kiện bán + bảo lãnh (văn bản 28497/SXD-PTĐT 06/08/2026 theo nguồn thứ cấp) hay nằm ngoài phạm vi đó.`,
        `Đối chiếu **mặt bằng định vị kiến trúc** — không ước khoảng cách tới lô đại học bằng mắt trên ảnh tổng thể.`,
        `Đọc phụ lục: phí quản lý, tiến độ hạ tầng nội khu, hình thức bàn giao giãn xây.`,
        `Nhớ chủ đầu tư pháp lý thường nêu là **CTCP Đô thị Đại học Quốc tế Berjaya Việt Nam** — tên trên HĐMB phải khớp, không chỉ logo Vinhomes.`
      ] },
      { type: "p", text: `Chi tiết: bài **Pháp lý Vinhomes Sài Gòn Park** (\`/bai-viet/phap-ly-vinhomes-sai-gon-park-checklist\`) và tổng quan (\`/bai-viet/vinhomes-sai-gon-park-la-gi-tong-quan\`).` },
      { type: "h2", text: `Bảng nhanh — Ivy Park` },
      { type: "table", headers: [`Hạng mục`, `Trạng thái / nội dung (⚠️ nguồn thứ cấp 9/2026)`], rows: [
                [`Tên marketing`, `Ivy Park — Công viên Tri Thức`],
                [`Cảm hứng brochure`, `Boston–Cambridge`],
                [`Mở bán`, `**Đang mở bán** (liền kề / giãn xây theo chính sách V07)`],
                [`Sản phẩm chính đang nói tới`, `Nhà liền kề thấp tầng`],
                [`Tiện ích gắn khu`, `Cụm đại học / đào tạo–nghiên cứu (~150–151 ha trong QH)`],
                [`Lưu ý pháp lý`, `Chỉ mua căn thuộc quỹ đã có văn bản đủ ĐKB + bảo lãnh nếu đó là tiêu chí của bạn`],
                [`Bài liên quan`, `5 phân khu · Giá & giãn xây · Pháp lý checklist`]
            ] },
      { type: "h2", text: `Kết luận` },
      { type: "p", text: `Ivy Park là phân khu “đầu dải” với định vị giáo dục rõ nhất trên brochure và trên chỉ tiêu đất đào tạo–nghiên cứu trong 1/500. Với người mua 9/2026, giá trị thực dụng nằm ở **quỹ liền kề đang bán + vị trí gần hướng hạ tầng vùng**, chứ chưa phải trải nghiệm đại học đã vận hành. Cảm hứng Boston chỉ nên là lớp trang trí sau khi bạn đã khớp mã căn, chính sách giãn xây và phạm vi pháp lý.` },
      { type: "p", text: `*Tham khảo: newgeninvest.vn/mat-bang-vinhomes-sai-gon-park/; newgeninvest.vn/bang-gia-vinhomes-sai-gon-park/; market.vinhomes.vn. Biên tập độc lập vinhomes.space · 09/2026. Không phải trang CĐT.*` }
    ],
  },
  {
    slug: "phan-khu-global-park-vinhomes-sai-gon-park",
    title: `Phân khu Global Park Vinhomes Sài Gòn Park: Công viên Quốc Tế (Canary Wharf)`,
    excerpt:
      `Global Park đang mở bán liền kề thô/hoàn thiện (9/2026). Global Village, phố thương mại và rủi ro chờ mật độ cư dân — đọc trước khi mua NPTM.`,
    projectSlug: "vinhomes-sai-gon-park",
    publishedAt: "2026-09-23",
    coverImage: "/images/sai-gon-park/amenity-mall.webp",
    tags: ["Global Park", "Phân khu", "Sài Gòn Park", "Công viên Quốc Tế"],
    readingMinutes: 11,
    featured: true,
    content: [
      { type: "p", text: `Global Park (Công viên Quốc Tế) là phân khu thứ hai trên dải chính của Vinhomes Sài Gòn Park, lấy cảm hứng **Canary Wharf** (London). Tháng 9/2026, nguồn thứ cấp ghi khu này **đang mở bán** quỹ liền kề thô và hoàn thiện — song song với Ivy. Đây cũng là khu được brochure gắn dày đặc nhất với **thương mại, ẩm thực, giải trí đa quốc gia**.` },
      { type: "image", src: `/images/sai-gon-park/zones-5-parks.webp`, alt: `Sơ đồ 5 phân khu minh họa — Global liền kề Ivy` },
      { type: "h2", text: `Định vị Canary Wharf vs thực tế quy hoạch` },
      { type: "p", text: `Canary Wharf gợi hình ảnh cụm văn phòng–thương mại mật độ cao bên sông. Trên mặt bằng giới thiệu Sài Gòn Park, Global được mô tả theo dạng **ô bàn cờ**: dãy nhà phố song song, mã màu theo mẫu nhà, bao quanh khối công trình và quảng trường trung tâm. Cảm hứng marketing khác với mật độ và giai đoạn vận hành thực tế năm 2026 — đại đô thị cửa ngõ Tây Bắc vẫn đang ở pha **khởi động hạ tầng + mở bán thấp tầng**.` },
      { type: "p", text: `Khu 2 nằm **liền kề Khu 1 (Ivy)** trên cùng bản vẽ định vị kiến trúc. Người mua nên yêu cầu file định vị độ phân giải cao của đúng dãy, không suy vị trí từ ảnh tổng thể.` },
      { type: "h2", text: `Tiện ích brochure gắn Global` },
      { type: "p", text: `Theo tài liệu giới thiệu đối chiếu Newgen / Market (⚠️ có thể điều chỉnh):` },
      { type: "table", headers: [`Tiện ích (brochure)`, `Quy mô hay nêu`, `Ghi chú biên tập`], rows: [
                [`Global Village`, `~**19,3 ha**`, `Trung tâm ẩm thực–văn hóa–giải trí quốc tế — chưa = đang mở`],
                [`Little Hong Kong (phố thương mại)`, `~**7,5 ha**`, `Góc NPTM / shophouse`],
                [`Trendy Fashion Town`, `~**2,3 ha**`, `⚠️ Brochure`],
                [`Galaxy Park (công viên chủ đề)`, `~**3,9 ha**`, `Bộ đôi công viên thiên văn trên tài liệu giới thiệu`]
            ] },
      { type: "image", src: `/images/sai-gon-park/amenity-mall.webp`, alt: `Icon thương mại / mall — minh họa schematic` },
      { type: "image", src: `/images/sai-gon-park/amenity-park.webp`, alt: `Công viên / không gian xanh minh họa` },
      { type: "h2", text: `Sản phẩm đang bán tại Global (9/2026)` },
      { type: "ul", items: [
        `Quỹ căn **thô** và **hoàn thiện** theo chính sách khu Công viên Quốc Tế công bố trên Vinhomes Market (qua nguồn đại lý).`,
        `Nhiều dãy liền kề được gắn mã nhóm **TL…** trên bảng hàng thứ cấp.`,
        `Dải giá tham khảo toàn dự án liền kề theo dãy khoảng **5,83 – 12,04 tỷ**/căn; đơn giá quy đổi đại lý ~**91–140 triệu/m² đất** hoặc ~**33–51 triệu/m² sàn** — ⚠️ không phải báo giá ràng buộc từng mã.`,
        `Chiết khấu ví dụ hay được nêu: khoảng **18%** (thô) / **22,5%** (hoàn thiện) ở Global; vay tối đa ~70% — **cơ sở tính thường trên phần đất + tiền mặt bằng** với sản phẩm giãn xây / chính sách tương ứng. CSBH có thể đổi theo bản chính sách mới.`,
        `Đọc kỹ bài **Giá & giãn xây** (\`/bai-viet/gia-vinhomes-sai-gon-park-gian-xay\`) trước khi so “giá net”.`
      ] },
      { type: "image", src: `/images/sai-gon-park/price-payment-flow.webp`, alt: `Luồng thanh toán minh họa — schematic` },
      { type: "image", src: `/images/sai-gon-park/floorplan-schematic.webp`, alt: `Schematic nhà phố / liền kề minh họa` },
      { type: "h2", text: `Shophouse & nhà phố thương mại: cơ hội và “thời gian chờ”` },
      { type: "p", text: `Global là khu hấp dẫn nhất với khách mua để **kinh doanh dịch vụ**. Rủi ro thực dụng ở mọi đại đô thị giai đoạn đầu:` },
      { type: "ul", items: [
        `**Mật độ cư dân nội khu** cần vài năm mới đủ nuôi phố ẩm thực / thời trang.`,
        `Giai đoạn công trường ảnh hưởng trải nghiệm khách vãng lai.`,
        `Chi phí vận hành shophouse (điện, nhân sự, marketing) có thể âm dòng tiền 2–3 năm đầu nếu bạn mua vì “sắp có Global Village”.`,
        `Quyền kinh doanh, giờ hoạt động, phí quản lý mặt tiền phải đọc **phụ lục HĐMB / quy chế**, không suy từ render.`
      ] },
      { type: "p", text: `Stress-test đơn giản: giả định doanh thu bằng **0 trong 24 tháng** — bạn còn chịu được không? Nếu không, cân nhắc căn ở thuần hoặc timeline dài hơn.` },
      { type: "h2", text: `Ai phù hợp / không phù hợp` },
      { type: "p", text: `**Phù hợp hơn:** nhà đầu tư hoặc hộ kinh doanh có vốn đệm; người muốn gần cụm thương mại tương lai và chấp nhận pha ủ mật độ; khách mua liền kề để ở nhưng thích không khí đô thị sôi động hơn Zen/Laguna.` },
      { type: "p", text: `**Áp lực hơn:** F0 cần dòng tiền thuê/kinh doanh ngay; người dị ứng tiếng ồn phố thương mại; ai chỉ muốn “view hồ / golf” — các góc đó thuộc Laguna/Golf và **chưa mở bán**.` },
      { type: "image", src: `/images/sai-gon-park/who-fits.webp`, alt: `Minh họa persona người mua — schematic` },
      { type: "h2", text: `Pháp lý — đừng để tiện ích che mất ĐVO` },
      { type: "p", text: `Dù căn nằm Global hay Ivy, câu hỏi then chốt vẫn là: **có thuộc quỹ Đơn vị ở đã đủ điều kiện bán + có thư bảo lãnh không?** Nguồn thứ cấp mô tả phạm vi **1.802 căn thấp tầng ĐVO-4** (văn bản 06/08/2026) kèm cam kết Techcombank — không tự động phủ mọi dãy trên brochure. Xem \`/bai-viet/phap-ly-vinhomes-sai-gon-park-checklist\`.` },
      { type: "h2", text: `Bảng nhanh — Global Park` },
      { type: "table", headers: [`Hạng mục`, `Trạng thái / nội dung (⚠️ 9/2026)`], rows: [
                [`Tên marketing`, `Global Park — Công viên Quốc Tế`],
                [`Cảm hứng brochure`, `Canary Wharf, London`],
                [`Mở bán`, `**Đang mở bán** (liền kề thô / hoàn thiện)`],
                [`Sản phẩm`, `Nhà liền kề; NPTM/shophouse là góc định vị — kiểm tra giỏ hàng thực tế`],
                [`Tiện ích gắn khu`, `Global Village, Little Hong Kong, Fashion Town, Galaxy Park (brochure)`],
                [`Rủi ro chính`, `Chờ mật độ + tiện ích thương mại vận hành`],
                [`Bài liên quan`, `\`/bai-viet/5-phan-khu-vinhomes-sai-gon-park\` · giá · pháp lý · ai nên mua`]
            ] },
      { type: "h2", text: `Kết luận` },
      { type: "p", text: `Global Park là “cực thương mại” trên bản đồ năm khu. Tháng 9/2026 bạn có thể tiếp cận **giỏ liền kề thật**, nhưng câu chuyện Canary Wharf / Global Village vẫn chủ yếu là **định hướng**. Mua để ở gần tương lai phố quốc tế thì hợp lý; mua để kinh doanh ngay thì cần kịch bản dòng tiền lạnh.` },
      { type: "p", text: `*Tham khảo: newgeninvest.vn/mat-bang-vinhomes-sai-gon-park/; newgeninvest.vn/bang-gia-vinhomes-sai-gon-park/; market.vinhomes.vn. Biên tập độc lập · 09/2026.*` }
    ],
  },
  {
    slug: "phan-khu-laguna-park-vinhomes-sai-gon-park",
    title: `Phân khu Laguna Park Vinhomes Sài Gòn Park: Công viên Biển Xanh (Barcelona)`,
    excerpt:
      `Laguna Park chưa mở bán (9/2026). Brochure gắn VinWonders / công viên nước ~23 ha, Botanica ~27 ha — tách kỳ vọng view hồ khỏi quyết định đặt chỗ.`,
    projectSlug: "vinhomes-sai-gon-park",
    publishedAt: "2026-09-24",
    coverImage: "/images/sai-gon-park/canal-walk.webp",
    tags: ["Laguna Park", "Phân khu", "Sài Gòn Park", "Công viên Biển Xanh"],
    readingMinutes: 10,
    featured: false,
    content: [
      { type: "p", text: `Laguna Park (Công viên Biển Xanh) là phân khu thứ ba trên dải chính, lấy cảm hứng **Barcelona**. Trên brochure, đây là khu “nước” nổi bật nhất — hồ lớn, công viên nước / **VinWonders**, Botanica. Theo nguồn theo dõi tháng 9/2026, Laguna **chưa mở bán** và mặt bằng phân lô chi tiết **chưa** được chủ đầu tư công bố đầy đủ như hai khu đang bán.` },
      { type: "image", src: `/images/sai-gon-park/zones-5-parks.webp`, alt: `Sơ đồ 5 phân khu minh họa — Laguna ở giữa dải` },
      { type: "h2", text: `Vị trí trên dải năm khu` },
      { type: "ul", items: [
        `Nằm **giữa** dải: sau Global, trước Zen.`,
        `Tổng mặt bằng giới thiệu nhấn cụm **công viên nước + mặt hồ**, nhà thấp tầng bao quanh.`,
        `Không nên suy “view hồ bảo đảm” từ ảnh concept khi chưa có mặt bằng định vị kiến trúc chính thức cho đợt mở bán.`
      ] },
      { type: "image", src: `/images/sai-gon-park/canal-walk.webp`, alt: `Đường dạo ven nước minh họa — schematic / stock style` },
      { type: "h2", text: `Tiện ích brochure gắn Laguna` },
      { type: "table", headers: [`Hạng mục (brochure)`, `Quy mô hay nêu`, `Độ tin cậy biên tập`], rows: [
                [`Công viên nước / VinWonders`, `~**22,7 ha**`, `⚠️ Brochure — chưa = đang vận hành`],
                [`Botanica Park (rừng bách thảo)`, `~**27 ha**`, `⚠️ Brochure (+ một phần narrative QH toàn khu)`],
                [`Vườn hoa nhà kính`, `~**1,5 ha**`, `⚠️`],
                [`Saigon Startup Village`, `~**1,6 ha**`, `⚠️ Làng khởi nghiệp trên tài liệu giới thiệu`],
                [`Cheers Town (làng ẩm thực)`, `~**1,8 ha**`, `⚠️`]
            ] },
      { type: "p", text: `Toàn dự án còn narrative Canal Park ~5 km, đường dạo ven nước ~21 km, “70–100+ công viên” — con số lệch giữa các bài Market. Laguna “thừa hưởng” câu chuyện nước nhưng **không đồng nghĩa** mọi tiện ích nước đều nằm trong ranh phân khu này.` },
      { type: "image", src: `/images/sai-gon-park/amenity-park.webp`, alt: `Công viên xanh minh họa` },
      { type: "image", src: `/images/sai-gon-park/stock-green-park.webp`, alt: `Ảnh stock công viên xanh — minh họa generic, không phải ảnh marketing CĐT` },
      { type: "h2", text: `Trạng thái mở bán & sản phẩm` },
      { type: "p", text: `**Chưa mở bán** theo Newgen / đối chiếu Market tháng 9/2026. Hệ quả thực dụng:` },
      { type: "ul", items: [
        `Chưa có bảng giá chính thức theo dãy cho Laguna trên các nguồn chúng tôi đối chiếu.`,
        `Chưa nên “giữ chỗ mù” chỉ vì narrative view hồ / gần VinWonders.`,
        `Biệt thự / căn hộ cao tầng trên toàn dự án nhiều nguồn ghi **chưa công bố giá chính thức** — càng không nên gắn giá tin đồn cho Laguna.`,
        `Nếu môi giới chào “căn Laguna”, hãy đòi **mã chính sách bán hàng + mặt bằng định vị + văn bản đủ điều kiện bán** (nếu đã có).`
      ] },
      { type: "h2", text: `Ai nên theo dõi Laguna — và khi nào?` },
      { type: "p", text: `**Nên theo dõi nếu bạn:** ưu tiên lifestyle nước / công viên giải trí gia đình; sẵn sàng chờ đợt mở bán và so sánh giá với Ivy/Global đã có lịch sử giao dịch; đầu tư dài hạn theo quy hoạch, không cần căn năm 2026.` },
      { type: "p", text: `**Không nên ưu tiên đặt cọc “để giữ” nếu bạn:** cần pháp lý rõ + giỏ hàng thật ngay; ngân sách chỉ đủ một căn và đang phân vân với dãy ĐVO-4 đang bán; dễ bị ảnh render dẫn dắt.` },
      { type: "image", src: `/images/sai-gon-park/hero-urban-park.webp`, alt: `Ảnh stock đô thị–công viên — minh họa mood, không phải render Laguna` },
      { type: "h2", text: `Rủi ro giai đoạn “chưa mở bán”` },
      { type: "ul", items: [
        `Vị trí căn trên mặt bằng có thể đổi giữa các bản phát hành brochure.`,
        `Tiến độ VinWonders / công viên nước gắn với toàn dự án nhiều năm (kế hoạch hoàn tất đại đô thị có nguồn nêu kéo dài tới ~2034–2035 — ⚠️).`,
        `Premium “view hồ” chỉ có ý nghĩa khi phụ lục HĐMB và quy chế tiện ích xác nhận tầm nhìn / khoảng lùi — không suy từ Photoshop.`,
        `Pháp lý giai đoạn 2 / phần đất chưa giao vẫn là ẩn số lớn hơn câu chuyện phân khu.`
      ] },
      { type: "p", text: `Đọc thêm: \`/bai-viet/5-phan-khu-vinhomes-sai-gon-park\`, \`/bai-viet/tien-ich-vinhomes-sai-gon-park-quy-hoach\`, \`/bai-viet/ai-nen-mua-vinhomes-sai-gon-park\`.` },
      { type: "h2", text: `Bảng nhanh — Laguna Park` },
      { type: "table", headers: [`Hạng mục`, `Trạng thái / nội dung (⚠️ 9/2026)`], rows: [
                [`Tên marketing`, `Laguna Park — Công viên Biển Xanh`],
                [`Cảm hứng brochure`, `Barcelona`],
                [`Mở bán`, `**Chưa mở bán**`],
                [`Sản phẩm`, `Chưa có giỏ hàng chính thức trên nguồn đối chiếu`],
                [`Tiện ích gắn khu`, `VinWonders / công viên nước, Botanica, làng ẩm thực–startup (brochure)`],
                [`Lưu ý`, `Đợi mặt bằng phân lô + CSBH; đừng trả premium dựa trên render`],
                [`Thay thế giai đoạn này`, `Ivy / Global nếu cần mua thật trong 2026`]
            ] },
      { type: "h2", text: `Kết luận` },
      { type: "p", text: `Laguna Park là lớp “biển xanh” đẹp nhất trên brochure năm khu — và cũng là khu dễ khiến người mua F0 **trả giá cho thứ chưa bán**. Cách độc lập: ghi nhận tiện ích nước như định hướng quy hoạch/marketing, theo dõi đợt mở bán chính thức, còn quyết định tiền thật năm 2026 hãy neo vào quỹ đã clear pháp lý ở Ivy/Global.` },
      { type: "p", text: `*Tham khảo: newgeninvest.vn/mat-bang-vinhomes-sai-gon-park/; market.vinhomes.vn. Biên tập độc lập · 09/2026.*` }
    ],
  },
  {
    slug: "phan-khu-zen-park-vinhomes-sai-gon-park",
    title: `Phân khu Zen Park Vinhomes Sài Gòn Park: Công viên Thiền (Karuizawa)`,
    excerpt:
      `Zen Park chưa mở bán (9/2026). Định vị Karuizawa, Kiyomi Park ~10 ha trên brochure — phù hợp góc an cư tĩnh, nhưng chưa có giỏ hàng và tiện ích hiện hữu.`,
    projectSlug: "vinhomes-sai-gon-park",
    publishedAt: "2026-09-25",
    coverImage: "/images/sai-gon-park/stock-green-park.webp",
    tags: ["Zen Park", "Phân khu", "Sài Gòn Park", "Công viên Thiền"],
    readingMinutes: 10,
    featured: false,
    content: [
      { type: "p", text: `Zen Park (Công viên Thiền) là phân khu thứ tư trên dải chính của Vinhomes Sài Gòn Park, lấy cảm hứng vùng nghỉ dưỡng **Karuizawa** (Nhật Bản). Trên tài liệu giới thiệu, Zen nằm ở **phần cuối, thu hẹp dần** của dải năm khu — định hướng lối sống tĩnh, cảnh quan và tiện ích mang văn hóa Nhật. Tháng 9/2026: **chưa mở bán**.` },
      { type: "image", src: `/images/sai-gon-park/zones-5-parks.webp`, alt: `Sơ đồ 5 phân khu minh họa — Zen ở cuối dải chính` },
      { type: "h2", text: `Karuizawa trên brochure nghĩa là gì?` },
      { type: "p", text: `Karuizawa gợi không gian nghỉ dưỡng cao nguyên, nhà thấp, nhiều cây, nhịp sống chậm. Trên mặt bằng Sài Gòn Park, Zen được dùng để cân bằng các cực “ồn” hơn (Global thương mại, Laguna giải trí nước). Đây là **ngôn ngữ lifestyle**, không phải cam kết mật độ xây dựng hay tiến độ greenery đã trồng xong.` },
      { type: "p", text: `Người mua dễ nhầm: chọn Zen trong đầu rồi… đặt cọc nhầm dãy đang bán ở Global vì “cùng dự án”. Hãy giữ checklist: **đúng khu · đúng dãy · đúng ĐVO**.` },
      { type: "h2", text: `Tiện ích gắn Zen theo tài liệu giới thiệu` },
      { type: "table", headers: [`Hạng mục`, `Quy mô hay nêu`, `Ghi chú`], rows: [
                [`Kiyomi Park (công viên Nhật)`, `~**10 ha**`, `⚠️ Brochure`],
                [`Làng cổ văn hóa & ẩm thực Nhật`, `~**1,5 ha**`, `⚠️ Brochure`],
                [`Vị trí trên dải`, `Cuối dải chính (sau Laguna)`, `Xa hơn hướng Vành đai 3 / Metro trên narrative tổng mặt bằng`]
            ] },
      { type: "image", src: `/images/sai-gon-park/amenity-park.webp`, alt: `Icon công viên minh họa` },
      { type: "image", src: `/images/sai-gon-park/stock-green-park.webp`, alt: `Ảnh stock công viên xanh — minh họa mood Zen, không phải ảnh CĐT` },
      { type: "image", src: `/images/sai-gon-park/stock-family-park.webp`, alt: `Ảnh stock gia đình trong công viên — minh họa generic` },
      { type: "h2", text: `Trạng thái sản phẩm` },
      { type: "ul", items: [
        `**Chưa mở bán** theo nguồn thứ cấp 9/2026.`,
        `Chưa có bảng giá / mặt bằng phân lô chi tiết công bố tương tự Ivy–Global trên các nguồn đối chiếu.`,
        `Toàn dự án vẫn có chỉ tiêu thấp tầng / biệt thự / cao tầng trên 1/500 — nhưng **gán sản phẩm vào Zen** khi chưa mở bán là suy diễn.`,
        `Nếu được mời đặt chỗ Zen: yêu cầu văn bản CSBH có ngày hiệu lực, mã file, và xác nhận phạm vi đủ điều kiện bán.`
      ] },
      { type: "h2", text: `Ai phù hợp với định vị Zen?` },
      { type: "p", text: `**Góc hợp lý để theo dõi:** gia đình muốn an cư ít thương mại mặt tiền; người dị ứng mật độ shophouse; khách so sánh “ở trong công viên” với các phân khu ồn hơn.` },
      { type: "p", text: `**Góc chưa hợp để xuống tiền ngay:** ai cần căn 2026 có pháp lý rõ; nhà đầu tư cần thanh khoản sơ cấp đang chạy; người trả premium chỉ vì ảnh concept Nhật.` },
      { type: "image", src: `/images/sai-gon-park/who-fits.webp`, alt: `Schematic persona người mua` },
      { type: "h2", text: `So nhanh với các khu khác (giai đoạn này)` },
      { type: "table", headers: [`Nhu cầu`, `Khu nên nhìn trước (9/2026)`, `Vì sao`], rows: [
                [`Mua thật + pháp lý ĐVO`, `Ivy / Global`, `Đang mở bán; có quỹ đối chiếu`],
                [`Kinh doanh phố`, `Global`, `Narrative thương mại dày hơn`],
                [`View nước / công viên giải trí`, `Laguna (theo dõi)`, `Chưa bán — đợi mặt bằng`],
                [`Không gian tĩnh / Nhật`, `Zen (theo dõi)`, `Chưa bán — đừng đặt cọc mù`],
                [`Golf / Palm Beach`, `Golf Park (theo dõi)`, `Ngoài ranh 880 ha theo Newgen — đọc phụ lục`]
            ] },
      { type: "h2", text: `Rủi ro biên tập độc lập muốn nhấn` },
      { type: "ul", items: [
        `Cuối dải có thể **xa hơn** các cực hạ tầng vùng được marketing gắn với đầu dải (Vành đai 3 / Metro) — tự kiểm trên mặt bằng khi có file chính thức.`,
        `Tiện ích Nhật trên brochure có thể điều chỉnh theo quyết định CĐT (Market thường ghi thông tin mang tính tương đối).`,
        `Đừng dùng cảm xúc “thiền” để bỏ qua bài **pháp lý checklist** (\`/bai-viet/phap-ly-vinhomes-sai-gon-park-checklist\`).`
      ] },
      { type: "h2", text: `Bảng nhanh — Zen Park` },
      { type: "table", headers: [`Hạng mục`, `Trạng thái / nội dung (⚠️ 9/2026)`], rows: [
                [`Tên marketing`, `Zen Park — Công viên Thiền`],
                [`Cảm hứng brochure`, `Karuizawa, Nhật Bản`],
                [`Mở bán`, `**Chưa mở bán**`],
                [`Sản phẩm`, `Chưa có giỏ hàng chính thức trên nguồn đối chiếu`],
                [`Tiện ích gắn khu`, `Kiyomi Park ~10 ha; làng văn hóa–ẩm thực Nhật ~1,5 ha (brochure)`],
                [`Lưu ý`, `Tách mood concept khỏi quyết định đặt cọc khu đang bán`],
                [`Bài liên quan`, `\`/bai-viet/5-phan-khu-vinhomes-sai-gon-park\` · tiện ích · ai nên mua`]
            ] },
      { type: "h2", text: `Kết luận` },
      { type: "p", text: `Zen Park hoàn thiện “bảng màu” lifestyle của Sài Gòn Park: sau tri thức, quốc tế và biển xanh là lớp **tĩnh – Nhật**. Năm 2026, đó vẫn là lớp trên brochure. Người mua thực dụng ghi Zen vào watchlist, còn tiền thật ưu tiên quỹ đã mở và đã rõ phạm vi pháp lý.` },
      { type: "p", text: `*Tham khảo: newgeninvest.vn/mat-bang-vinhomes-sai-gon-park/; market.vinhomes.vn. Biên tập độc lập · 09/2026.*` }
    ],
  },
  {
    slug: "phan-khu-golf-park-vinhomes-sai-gon-park",
    title: `Phân khu Golf Park Vinhomes Sài Gòn Park: Công viên Golf (Palm Beach)`,
    excerpt:
      `Golf Park chưa mở bán. Sân golf ~200 ha (Vinpearl Golf Léman) nằm ngoài ranh 880 ha 1/500 theo Newgen — đọc kỹ quyền lợi view/thành viên trước khi trả premium.`,
    projectSlug: "vinhomes-sai-gon-park",
    publishedAt: "2026-09-26",
    coverImage: "/images/sai-gon-park/amenity-golf.webp",
    tags: ["Golf Park", "Phân khu", "Sài Gòn Park", "Công viên Golf"],
    readingMinutes: 11,
    featured: false,
    content: [
      { type: "p", text: `Golf Park (Công viên Golf) là phân khu thứ năm — và **khác biệt cấu trúc** nhất — trong bộ năm khu của Vinhomes Sài Gòn Park. Cảm hứng brochure: **Palm Beach** (Florida). Tổ chức quanh sân golf 36 hố (tên hay nêu **Vinpearl Golf Léman**), quy mô khoảng **200 ha**. Tháng 9/2026: **chưa mở bán**, chưa có thông tin sản phẩm chính thức trên các nguồn chúng tôi đối chiếu.` },
      { type: "image", src: `/images/sai-gon-park/zones-5-parks.webp`, alt: `Sơ đồ 5 phân khu minh họa — Golf tách riêng khỏi dải chính` },
      { type: "h2", text: `Vì sao Golf không giống bốn khu còn lại?` },
      { type: "ul", items: [
        `Bốn khu Ivy–Global–Laguna–Zen nằm trên **một dải** dọc trục chính.`,
        `Golf Park **tách riêng**, bao quanh cụm sân golf trên tổng mặt bằng giới thiệu.`,
        `Điểm biên tập then chốt (theo phân tích Newgen đối chiếu 1/500): khu vực sân golf ~200 ha nằm **ngoài ranh** đồ án quy hoạch chi tiết đô thị ~**880 ha**.`,
        `Hệ quả: tiện ích golf là định hướng/brochure và/hoặc hạng mục ngoài ranh nhà ở — **không** tự động suy ra từ quyết định QHCT phần đô thị.`
      ] },
      { type: "image", src: `/images/sai-gon-park/amenity-golf.webp`, alt: `Icon sân golf minh họa — schematic` },
      { type: "h2", text: `Ba lớp quy mô bạn phải thuộc lòng` },
      { type: "table", headers: [`Con số`, `Ý nghĩa`, `Liên quan Golf`], rows: [
                [`~**1.080 ha**`, `Quy mô quảng bá “đại đô thị” (thường = đô thị + golf)`, `Hay gồm ~200 ha golf`],
                [`~**880 ha**`, `Phần đô thị có QHCT 1/500 (VIUT)`, `Golf **ngoài** ranh theo Newgen`],
                [`~**827 ha**`, `Giao đất giai đoạn 1 (QĐ 1426/12/3/2026, nguồn thứ cấp)`, `Không đồng nghĩa đã giao phần golf`]
            ] },
      { type: "p", text: `Nhầm 1.080 ha với “đã quy hoạch nhà ở hết” hoặc “đã giao hết” sẽ làm sai lệch kỳ vọng tiến độ và pháp lý. Xem thêm \`/bai-viet/vinhomes-sai-gon-park-la-gi-tong-quan\`.` },
      { type: "image", src: `/images/sai-gon-park/map-location-schematic.webp`, alt: `Sơ đồ vị trí minh họa — schematic` },
      { type: "h2", text: `Sản phẩm & trạng thái mở bán` },
      { type: "ul", items: [
        `**Chưa mở bán** (⚠️ nguồn thứ cấp 9/2026).`,
        `Chưa có bảng giá / giỏ hàng chính thức cho Golf Park trên Newgen / đối chiếu Market.`,
        `Biệt thự “view golf” trên các landing bên thứ ba thường là **ước lệ marketing** — ưu tiên ghi “chưa công bố” cho đến CSBH chính thức.`,
        `Nếu được chào bán sớm: kiểm tra pháp nhân, ranh thửa, và liệu căn có nằm trong phần đô thị 1/500 đã có đủ điều kiện bán hay không.`
      ] },
      { type: "h2", text: `Quyền lợi golf: đừng suy từ thương hiệu` },
      { type: "p", text: `Câu hỏi người mua hay bỏ qua:` },
      { type: "ul", items: [
        `“View golf” có được **bảo vệ bằng phụ lục** (tầm nhìn, khoảng lùi, độ cao công trình đối diện) không?`,
        `Thành viên sân golf / phí duy trì có **đi kèm HĐMB** hay bán riêng?`,
        `Sân golf thuộc chủ thể nào — cùng pháp nhân dự án nhà ở hay đơn vị vận hành khác?`,
        `Tiến độ 36 hố và mở cửa từng giai đoạn là gì trên văn bản — không chỉ trên brochure?`
      ] },
      { type: "p", text: `⚠️ Nếu golf ngoài ranh 880 ha, việc “ở trong Vinhomes Sài Gòn Park” **không tự động** = thành viên Vinpearl Golf. Mọi quyền lợi phải đọc chữ trên hợp đồng.` },
      { type: "image", src: `/images/sai-gon-park/legal-checklist.webp`, alt: `Checklist pháp lý minh họa — schematic` },
      { type: "image", src: `/images/sai-gon-park/comparison-chart.webp`, alt: `Biểu đồ so sánh minh họa — dùng để nhắc tách lớp quy mô` },
      { type: "h2", text: `Ai phù hợp theo dõi Golf Park?` },
      { type: "p", text: `**Phù hợp watchlist:** khách chơi golf / nghỉ dưỡng đô thị; nhà đầu tư siêu dài hạn theo narrative 1.080 ha; người đã có căn ĐVO đang bán và muốn theo dõi đợt sau.` },
      { type: "p", text: `**Không phù hợp xuống tiền cảm xúc ngay:** F0 lần đầu chỉ nghe “Palm Beach”; người trả premium view golf khi chưa có mặt bằng và phụ lục; ai cần thanh khoản sơ cấp đang chạy năm 2026.` },
      { type: "h2", text: `Rủi ro tập trung` },
      { type: "ul", items: [
        `**Ranh giới pháp lý** khác ranh giới marketing.`,
        `Tiến độ sân golf và nhà ở có thể **lệch pha**.`,
        `Phí tiện ích có điều kiện / phí thành viên làm đội chi phí sở hữu.`,
        `Thanh khoản thứ cấp của sản phẩm “view golf” phụ thuộc uy tín vận hành sân — yếu tố ngoài HĐMB nhà ở.`
      ] },
      { type: "p", text: `Đọc kèm: \`/bai-viet/5-phan-khu-vinhomes-sai-gon-park\`, \`/bai-viet/phap-ly-vinhomes-sai-gon-park-checklist\`, \`/bai-viet/ai-nen-mua-vinhomes-sai-gon-park\`.` },
      { type: "h2", text: `Bảng nhanh — Golf Park` },
      { type: "table", headers: [`Hạng mục`, `Trạng thái / nội dung (⚠️ 9/2026)`], rows: [
                [`Tên marketing`, `Golf Park — Công viên Golf`],
                [`Cảm hứng brochure`, `Palm Beach, Florida`],
                [`Mở bán`, `**Chưa mở bán**`],
                [`Sản phẩm`, `Chưa có thông tin chính thức trên nguồn đối chiếu`],
                [`Tiện ích gắn khu`, `Sân golf 36 hố ~200 ha (Vinpearl Golf Léman thường được nêu)`],
                [`Đặc điểm pháp lý quan trọng`, `Golf ~200 ha **ngoài** ranh 880 ha 1/500 (theo Newgen)`],
                [`Lưu ý`, `Quyền view/thành viên → phụ lục HĐMB & quy chế, không suy từ logo`]
            ] },
      { type: "h2", text: `Kết luận` },
      { type: "p", text: `Golf Park là cực “Palm Beach” của bộ năm khu — hấp dẫn trên ảnh, nhưng là khu cần **nhiều caveat pháp lý nhất** vì lớp ranh giới đô thị vs sân golf. Năm 2026 hãy để Golf ở chế độ theo dõi; quyết định mua hãy neo vào quỹ thấp tầng đang mở (Ivy/Global) và văn bản đủ điều kiện bán có số hiệu.` },
      { type: "p", text: `*Tham khảo: newgeninvest.vn/mat-bang-vinhomes-sai-gon-park/; newgeninvest.vn/phap-ly-vinhomes-saigon-park/; market.vinhomes.vn; cafeland.vn. Biên tập độc lập vinhomes.space · 09/2026. Không phải trang CĐT.*` }
    ],
  },
  {
    slug: "tien-ich-vinhomes-sai-gon-park-quy-hoach",
    title: `Tiện ích Vinhomes Sài Gòn Park: đại học, Vinmec, công viên — đâu là quy hoạch?`,
    excerpt:
      `Đại học ~150 ha, Vinmec, Vincom, công viên và golf: tách chỉ tiêu quy hoạch 1/500 khỏi ảnh concept brochure.`,
    projectSlug: "vinhomes-sai-gon-park",
    publishedAt: "2026-09-15",
    coverImage: "/images/sai-gon-park/amenity-park.webp",
    tags: ["Tiện ích", "Giáo dục", "Sài Gòn Park"],
    readingMinutes: 9,
    content: [
      { type: "p", text: `Điểm bán hàng mạnh nhất của Sài Gòn Park không phải một căn nhà phố 50 m², mà là lời hứa **hệ sinh thái**: học – chữa bệnh – mua sắm – chơi – làm việc trong cùng đại đô thị. Bài này giúp bạn xếp tiện ích vào hai ngăn: **đã có chỉ tiêu / lô đất trong quy hoạch** và **mới xuất hiện trên tài liệu giới thiệu**.` },
      { type: "image", src: "/images/sai-gon-park/amenity-park.webp", alt: `Mảng xanh & công viên minh họa` },
      { type: "h2", text: `Vì sao phải tách “QH” và “brochure”?` },
      { type: "p", text: `Quy hoạch chi tiết 1/500 xác định chức năng lô đất (ở, cây xanh, y tế, giáo dục, dịch vụ…). Chủ đầu tư có thể điều chỉnh thiết kế công trình trong khung chỉ tiêu. Brochure thì được phép dùng ảnh concept và tên thương mại (Vinmec, Vincom, VinWonders…) để kể chuyện.` },
      { type: "p", text: `Khi ký hợp đồng, phần cứng thường là: vị trí căn, diện tích, tiến độ bàn giao nhà, và các phụ lục tiện ích **được dẫn chiếu**. Phần mềm là kỳ vọng “5 năm nữa có Mega Mall trước nhà”.` },
      { type: "h2", text: `Trụ cột giáo dục — lý do có chữ “Đại học” trong tên pháp lý` },
      { type: "p", text: `Tên pháp lý **Khu đô thị Đại học Quốc tế** phản ánh định hướng gắn đô thị với giáo dục–nghiên cứu. Các nguồn công khai thường nêu:` },
      { type: "ul", items: [
        `Khoảng **150–151 ha** đất đào tạo / nghiên cứu`,
        `Nhiều lô trường đại học và ký túc xá (một bài đọc 1/500 nêu 16 lô ĐH + 3 lô KTX, mật độ tối đa 40%, cao tối đa 12 tầng — chỉ tiêu QH)`,
        `Marketing bổ sung “36 trường học” liên cấp, Vinschool, viện nghiên cứu…`
      ] },
      { type: "image", src: "/images/sai-gon-park/amenity-education.webp", alt: `Icon giáo dục minh họa` },
      { type: "p", text: `**Ý nghĩa với người mua nhà:**` },
      { type: "ul", items: [
        `Dài hạn: cộng đồng giảng viên, sinh viên, dịch vụ quanh trường có thể tạo thanh khoản cho thuê căn nhỏ / studio khi cao tầng ra hàng.`,
        `Ngắn hạn: **chưa có lịch khai giảng công khai đáng tin** trên các nguồn chúng tôi tổng hợp → không tính tiền thuê năm sau dựa trên “60.000 sinh viên”.`
      ] },
      { type: "image", src: "/images/sai-gon-park/icon-school.webp", alt: `Icon trường học` },
      { type: "p", text: `Gia đình có con nhỏ nên hỏi rõ: trường liên cấp nào cam kết giai đoạn nào, học phí dự kiến, và phương án trường ngoài dự án trong 3 năm đầu.` },
      { type: "h2", text: `Y tế — lô Vinmec trong quy hoạch` },
      { type: "p", text: `Phân tích mặt bằng dẫn quy hoạch nêu lô y tế cấp đô thị (ký hiệu kiểu **YT-D01**) rộng khoảng **6,9 ha**, cho phép bệnh viện đa khoa cao tối đa 10 tầng. Trên brochure, đây được gọi thẳng là hệ thống **Vinmec**.` },
      { type: "image", src: "/images/sai-gon-park/amenity-hospital.webp", alt: `Icon y tế minh họa` },
      { type: "p", text: `Checklist thực dụng:` },
      { type: "ul", items: [
        `Lô đã giao / đã có tiến độ xây chưa?`,
        `Bệnh viện có phải tiện ích “mở cho cư dân miễn phí” không (thường là **không** — là dịch vụ trả phí)?`,
        `Cấp cứu ban đêm giai đoạn đầu dựa vào bệnh viện nào trong bán kính 15–30 phút xe máy?`
      ] },
      { type: "h2", text: `Thương mại — Vincom Mega Mall & phố nội khu` },
      { type: "p", text: `Vincom Mega Mall nằm trong nhóm tiện ích toàn dự án trên tài liệu giới thiệu. Khu Global Park bổ sung các cụm: Global Village, phố thương mại chủ đề, khu thời trang…` },
      { type: "image", src: "/images/sai-gon-park/amenity-mall.webp", alt: `Icon thương mại minh họa` },
      { type: "p", text: `Với nhà đầu tư shophouse: sức mua đến từ cư dân + khách bên ngoài + sinh viên. Ba nguồn này **lệch pha thời gian**. Mô hình “mở quán năm bàn giao nhà” có thể lỗ vận hành nếu mật độ chưa tới.` },
      { type: "h2", text: `Công viên, mặt nước, giải trí` },
      { type: "p", text: `Các con số hay gặp (brochure, có thể lệch bài này sang bài khác):` },
      { type: "ul", items: [
        `Hơn **70** hoặc thậm chí **100** công viên`,
        `Botanica / bách thảo ~**27 ha**`,
        `Công viên nước ~**23 ha**`,
        `Công viên Nhật ~**10 ha**`,
        `Canal Park dài ~**5 km**; đường dạo ven nước ~**21 km**`,
        `Tổ hợp giải trí / VinWonders gắn Laguna`
      ] },
      { type: "image", src: "/images/sai-gon-park/canal-walk.webp", alt: `Canal / đường dạo minh họa` },
      { type: "p", text: `Cây xanh trên quy hoạch là lợi thế dài hạn cho mật độ sống. Nhưng công viên nước chủ đề và tổ hợp vé cửa thường là dự án con có lịch riêng — đừng gộp với ngày nhận nhà phố.` },
      { type: "h2", text: `Golf & thể thao` },
      { type: "p", text: `Sân golf 36 hố (~200 ha) là điểm nhận diện Golf Park. Hãy xác nhận: quyền sử dụng của cư dân (nếu có), phí thành viên, và liệu tiện ích có nằm trong phạm vi pháp lý khu nhà bạn đang mua.` },
      { type: "image", src: "/images/sai-gon-park/amenity-golf.webp", alt: `Icon golf` },
      { type: "h2", text: `Bảng tóm tắt nhanh cho người đọc lướt` },
      { type: "table", headers: [`Tiện ích`, `Thường thấy ở`, `Nên hiểu là`], rows: [
          [`Đại học / nghiên cứu`, `Ivy + chỉ tiêu 1/500`, `Trụ cột pháp lý–QH; chờ vận hành`],
          [`Trường liên cấp`, `Brochure “36 trường”`, `Xác minh từng cấp & tiến độ`],
          [`Vinmec`, `Lô YT trong QH + brand`, `Dịch vụ y tế, không phải “có là xong”`],
          [`Vincom Mega Mall`, `Brochure toàn dự án`, `Timeline riêng`],
          [`Công viên / canal`, `QH cây xanh + brochure`, `Ưu thế mật độ; hạng mục lớn chờ xây`],
          [`Golf`, `Golf Park / ngoài 880 ha?`, `Đọc kỹ quyền lợi HĐ`],
          [`Metro / VD3`, `Ngoài rào dự án`, `Hạ tầng nhà nước`]
      ] },
      { type: "h2", text: `Kết luận` },
      { type: "p", text: `Tiện ích là lý do Sài Gòn Park được gọi là “đại đô thị” chứ không chỉ khu nhà liền kề. Người mua thông minh trả tiền cho **đất + nhà + pháp lý rõ**, rồi gán xác suất cho từng tiện ích theo tiến độ — không trả full giá “thành phố hoàn chỉnh” ở ngày đặt cọc năm 2026.` },
      { type: "p", text: `*Tham khảo: market.vinhomes.vn; newgeninvest.vn/mat-bang. Biên tập: 09/2026.*` }
    ],
  },
  {
    slug: "gia-vinhomes-sai-gon-park-gian-xay",
    title: `Giá Vinhomes Sài Gòn Park (9/2026): đọc bảng liền kề và hiểu giãn xây`,
    excerpt:
      `Bảng liền kề tháng 9/2026, đơn giá quy đổi, ba hình thức bàn giao và cách đọc chiết khấu/vay trên phần đất+TM.`,
    projectSlug: "vinhomes-sai-gon-park",
    publishedAt: "2026-09-16",
    coverImage: "/images/sai-gon-park/price-payment-flow.webp",
    tags: ["Giá bán", "Giãn xây", "Sài Gòn Park"],
    readingMinutes: 8,
    featured: true,
    content: [
      { type: "p", text: `“Giá bao nhiêu?” là câu được search nhiều nhất — và cũng là chỗ các website lệch nhau rõ nhất. Bài này ưu tiên cách **đọc** bảng giá hơn là gắn một con số “chính thức duy nhất”.` },
      { type: "image", src: "/images/sai-gon-park/price-payment-flow.webp", alt: `Sơ đồ dòng tiền giãn xây (khái niệm)` },
      { type: "h2", text: `Thực tế tháng 9/2026: đang bán liền kề` },
      { type: "p", text: `Theo tổng hợp đại lý đối chiếu Vinhomes Market (tháng 9/2026), quỹ căn công bố gồm nhiều **dãy nhà liền kề** tại Công viên Quốc Tế và Công viên Tri Thức 1, với ba hình thức: **xây thô**, **hoàn thiện**, **giãn xây**.` },
      { type: "p", text: `Mức thấp nhất trên bảng theo dãy được nêu khoảng **5,83 tỷ đồng/căn** (ví dụ dãy TL10, 50 m² đất, xây thô). Các dãy khác kéo lên khoảng **6–12 tỷ** tùy diện tích đất, diện tích sàn và hình thức bàn giao. Đây là **giá theo dãy**, chưa phải giá từng mã căn (căn góc, view công viên, mặt đường lớn sẽ khác).` },
      { type: "p", text: `Đơn giá quy đổi (cách làm của bên tổng hợp bảng hàng): khoảng **91–140 triệu đồng/m² đất**, hoặc **33–51 triệu đồng/m² sàn xây dựng**. Hai cách tính có thể đảo thứ tự “dãy nào rẻ hơn”.` },
      { type: "image", src: "/images/sai-gon-park/floorplan-schematic.webp", alt: `Mặt bằng liền kề minh họa` },
      { type: "h2", text: `Vì sao CafeLand / tin rao / blog Market có thể khác?` },
      { type: "ul", items: [
        `**Portal bảng giá** đôi khi lấy tin rao trung bình (ví dụ liền kề 50 m² ~7,8 tỷ) — khác quỹ thô/giãn xây.`,
        `**Blog chính thức** có lúc nêu mức **dự kiến** giãn xây từ ~3,9 tỷ cho một cấu hình — có thể thuộc kịch bản/CSBH khác thời điểm.`,
        `**Tin Batdongsan** mang tính chào bán môi giới, không phải bảng CĐT.`
      ] },
      { type: "p", text: `Trên vinhomes.space: coi mọi số là **tham chiếu có ngày**, và yêu cầu môi giới gửi **PDF chính sách + giá mã căn** trước khi đặt cọc.` },
      { type: "h2", text: `Ba hình thức bàn giao — ảnh hưởng dòng tiền hơn “rẻ/đắt”` },
      { type: "ul", items: [
        `**Xây thô:** giá niêm yết thấp hơn hoàn thiện; bạn tự bỏ tiền nội thất. So sánh thô vs hoàn thiện phải cộng chi phí hoàn thiện thực tế.`,
        `**Hoàn thiện:** vào ở / cho thuê nhanh hơn; chiết khấu thanh toán sớm đôi khi cao hơn nhóm thô (ví dụ nguồn CSBH nêu 22,5% vs 18% ở một quỹ Global — **có thể đã đổi**).`,
        `**Giãn xây:** tách nghĩa vụ thanh toán — phần **giá trị quyền sử dụng đất và thương mại** trả sớm; phần **giá trị xây dựng** trả muộn hơn (nguồn phân tích nêu mốc kiểu **D+540** ngày sau ký HĐ).`
      ] },
      { type: "p", text: `Điểm dễ sai nhất: **chiết khấu và hạn mức vay 70%** với căn giãn xây thường tính trên phần đất+TM (chưa gồm một số khoản), **không** phải nhân thẳng lên tổng giá căn. Nhầm công thức có thể lệch hàng trăm triệu mỗi đợt.` },
      { type: "h2", text: `Ví dụ cách nghĩ về năm đầu (minh họa)` },
      { type: "p", text: `Một nguồn đại lý phân tích căn giãn xây tổng giá khoảng 6,45 tỷ: phần đất+TM chiếm phần lớn, phải thanh toán mạnh trong ~6 tháng đầu (có ví dụ ~3,5 tỷ / ~54% tổng giá), rồi mới tới giai đoạn xây dựng. Con số này **không** áp dụng mọi căn — chỉ để bạn mở Excel hỏi lại: “Đợt 1–5 của mã căn tôi là bao nhiêu, tính trên cơ sở nào?”` },
      { type: "image", src: "/images/sai-gon-park/icon-investment.webp", alt: `Icon đầu tư` },
      { type: "h2", text: `Chi phí ngoài giá bán thường gặp` },
      { type: "table", headers: [`Khoản`, `Ghi chú`], rows: [
          [`VAT 10%`, `Theo từng đợt trên phần chịu thuế`],
          [`Kinh phí bảo trì 2%`, `Thường đợt cuối / khi bàn giao`],
          [`Nội thất`, `Quan trọng với căn thô`],
          [`Phí quản lý`, `Sau bàn giao`],
          [`Lãi vay & phí trả nợ trước hạn`, `Đọc hợp đồng tín dụng`]
      ] },
      { type: "h2", text: `Biệt thự & căn hộ: chưa nên gắn giá “chính thức”` },
      { type: "p", text: `Quy hoạch có đất biệt thự và chung cư. Nhiều website vẫn đăng khoảng giá biệt thự 10–45 tỷ hay căn hộ vài tỷ. Ít nhất một tổng hợp bảng hàng chi tiết tháng 9/2026 ghi **chưa công bố giá chính thức** cho shophouse, biệt thự và căn hộ. Chúng tôi chọn cách nói đó cho đến khi có bảng CĐT rõ ràng.` },
      { type: "h2", text: `Checklist trước khi chốt giá` },
      { type: "ul", items: [
        `[ ] Giá là **mã căn** hay chỉ “từ dãy TL/AS…”?`,
        `[ ] Đã gồm VAT / KPBT chưa?`,
        `[ ] Chiết khấu tính trên tổng giá hay phần đất+TM?`,
        `[ ] Vay 70% — 70% của cái gì?`,
        `[ ] Căn có thuộc quỹ **Đơn vị ở đã đủ điều kiện bán + bảo lãnh** không?`,
        `[ ] Tài khoản nhận tiền là của chủ đầu tư / bên được ủy quyền?`
      ] },
      { type: "h2", text: `Kết luận` },
      { type: "p", text: `Giá Sài Gòn Park tháng 9/2026 xoay quanh **liền kề đang mở bán**, tham chiếu từ khoảng gần **6 tỷ**/căn thô tùy dãy, với biến số lớn ở hình thức bàn giao và vị trí căn. Hiểu **giãn xây** và cơ sở tính chiết khấu/vay quan trọng hơn việc săn “giá thấp nhất trên Facebook”.` },
      { type: "p", text: `*Tham khảo: newgeninvest.vn/bang-gia-vinhomes-sai-gon-park/; market.vinhomes.vn/blog/lien-ke-vinhomes-sai-gon-park; cafeland bảng giá dự án. Biên tập: 09/2026.*` }
    ],
  },
  {
    slug: "phap-ly-vinhomes-sai-gon-park-checklist",
    title: `Pháp lý Vinhomes Sài Gòn Park: Đơn vị ở số 4, bảo lãnh và checklist đặt cọc`,
    excerpt:
      `Giao đất GĐ1, 1.802 căn ĐVO-4 đủ điều kiện bán + bảo lãnh Techcombank, và checklist trước khi đặt cọc.`,
    projectSlug: "vinhomes-sai-gon-park",
    publishedAt: "2026-09-17",
    coverImage: "/images/sai-gon-park/legal-checklist.webp",
    tags: ["Pháp lý", "Checklist", "Sài Gòn Park"],
    readingMinutes: 9,
    featured: true,
    content: [
      { type: "p", text: `Pháp lý đại đô thị dễ bị kể như một nút xanh duy nhất: “đã đủ điều kiện bán”. Thực tế năm 2026, câu chuyện Sài Gòn Park (pháp lý **Khu đô thị Đại học Quốc tế – VIUT**) nên được hiểu theo **lớp** và **phạm vi**.` },
      { type: "image", src: "/images/sai-gon-park/legal-checklist.webp", alt: `Checklist pháp lý minh họa` },
      { type: "h2", text: `Lớp 1 — Dự án có quyền tồn tại trên giấy` },
      { type: "p", text: `Các mốc thường được các bài pháp lý thứ cấp liệt kê:` },
      { type: "ul", items: [
        `Điều chỉnh chủ trương đầu tư cấp **Thủ tướng** (các quyết định năm 2021, 2025…)`,
        `Quy hoạch phân khu tỷ lệ 1/2000`,
        `Phê duyệt **QHCT 1/500** cho khoảng **880 ha** (nguồn nêu quyết định cấp xã Xuân Thới Sơn; có cảnh báo lệch số hiệu/ngày giữa văn bản — nên xin sao y)`,
        `**Giao đất giai đoạn 1** theo Quyết định **1426/QĐ-UBND ngày 12/3/2026** (~826,76 ha / 8.267.586,7 m² tại Xuân Thới Sơn, theo nguồn trích)`
      ] },
      { type: "p", text: `Có quy hoạch 1/500 **không** đồng nghĩa mọi căn trong ranh đã được bán hợp pháp.` },
      { type: "image", src: "/images/sai-gon-park/map-location-schematic.webp", alt: `Vị trí / ranh minh họa` },
      { type: "h2", text: `Lớp 2 — Giai đoạn 1 đã giao đất, giai đoạn 2 còn việc` },
      { type: "p", text: `Quyết định giao đất giai đoạn 1 được mô tả kèm nhiệm vụ tiếp tục thu hồi / GPMB phần còn lại cho giai đoạn 2. Nghĩa vụ tài chính (xác định giá đất, tiền sử dụng đất, khoản liên quan đất lúa…) và nghĩa vụ **nhà ở xã hội** cũng được các bài pháp lý nhắc là đang trong vòng hướng dẫn / thực hiện.` },
      { type: "p", text: `Người mua không cần am hiểu hết thủ tục nhà nước, nhưng cần biết: **rủi ro tiến độ tiện ích và mở rộng** một phần nằm ngoài rào “căn tôi đã đủ điều kiện bán”.` },
      { type: "h2", text: `Lớp 3 — Đủ điều kiện bán: phạm vi 1.802 căn ĐVO-4` },
      { type: "p", text: `Theo tổng hợp có trích số hiệu (tháng 8–9/2026):` },
      { type: "ul", items: [
        `Hạ tầng kỹ thuật **Đơn vị ở số 4** được nghiệm thu (biên bản tháng 5/2026).`,
        `Văn bản cơ quan quản lý (**28497/SXD-PTĐT ngày 06/08/2026**) xác định **1.802 căn nhà ở thấp tầng** thuộc ĐVO-4.`,
        `**Techcombank** cam kết phát hành thư bảo lãnh cho quỹ căn này (văn bản cam kết 06/08/2026, dựa trên thỏa thuận trước đó).`
      ] },
      { type: "p", text: `**Hệ quả thực dụng:** câu hỏi đầu tiên khi được mời đặt cọc không phải “dự án Vinhomes đã clear chưa?” mà là **“Căn này có thuộc 1.802 căn / ĐVO-4 (hoặc văn bản tương đương mới hơn) không?”**` },
      { type: "p", text: `Các đơn vị ở khác, cao tầng, giai đoạn 2: cần hồ sơ riêng.` },
      { type: "h2", text: `Bảo lãnh ngân hàng — đọc kỹ phạm vi tiền` },
      { type: "p", text: `Các điểm hay bị bỏ qua (theo diễn giải nguồn pháp lý thứ cấp):` },
      { type: "ul", items: [
        `Thư bảo lãnh thường gắn **từng bên mua** lựa chọn có bảo lãnh.`,
        `Số tiền được bảo lãnh thường là tiền chủ đầu tư nhận **sau** khi bên mua đã nhận thư — tiền nộp trước có thể **không** nằm trong phạm vi.`,
        `Từ chối bảo lãnh để “cho nhanh” là quyết định tài chính nghiêm túc, không phải thủ tục dư thừa.`
      ] },
      { type: "h2", text: `Pháp nhân trên hợp đồng` },
      { type: "p", text: `Chủ đầu tư pháp lý được nêu: **Công ty Cổ phần Đô thị Đại học Quốc tế Berjaya Việt Nam**. Vinhomes có thể xuất hiện với vai trò khác (ví dụ tư vấn giám sát trên biên bản nghiệm thu).` },
      { type: "p", text: `Nếu HĐMB / phiếu tính giá ghi pháp nhân lạ: dừng lại, yêu cầu văn bản ủy quyền còn hiệu lực.` },
      { type: "h2", text: `Checklist một trang trước khi đặt cọc` },
      { type: "ul", items: [
        `☐ Xác nhận căn thuộc đơn vị ở / văn bản đủ điều kiện bán nào`,
        `☐ Xin bản sao văn bản cơ quan quản lý nhà ở liên quan quỹ căn`,
        `☐ Đối chiếu tên pháp nhân + MST trên HĐMB`,
        `☐ Lịch thanh toán vs thời điểm dự kiến có thư bảo lãnh`,
        `☐ Tài khoản nhận tiền đúng bên bán được ủy quyền — không chuyển tài khoản cá nhân môi giới`,
        `☐ Mặt bằng định vị kiến trúc khớp mã căn; không mua chỉ dựa trên tổng mặt bằng brochure`,
        `☐ CSBH (chiết khấu, lãi vay) ghi rõ cơ sở tính với căn giãn xây`,
        `☐ Đại lý có giấy/chứng nhận phân phối còn hạn (nếu mua qua đại lý)`
      ] },
      { type: "h2", text: `So sánh nhanh với “tin group Facebook”` },
      { type: "p", text: `Group dự án hữu ích để xem ảnh hiện trường, nhưng pháp lý không được vote bằng comment. Mọi file “đủ điều kiện bán” gửi qua Zalo cần đối chiếu số hiệu và phạm vi căn.` },
      { type: "h2", text: `Kết luận` },
      { type: "p", text: `Tới tháng 9/2026, VIUT / Sài Gòn Park đã đi qua chuỗi mốc lớn tới giao đất giai đoạn 1 và — với **một quỹ thấp tầng ĐVO-4** — đủ điều kiện bán kèm cam kết bảo lãnh theo nguồn thứ cấp. Đó là tiến bộ thật. Nhưng người mua vẫn phải khoanh đúng **căn của mình** trong đám mây marketing 1.080 ha. Checklist nhàm chán chính là thứ giúp bạn không trả tiền cho nhầm lớp pháp lý.` },
      { type: "p", text: `*Tham khảo chính: newgeninvest.vn/phap-ly-vinhomes-saigon-park/; cafeland.vn tin pháp lý 880ha Hóc Môn. Biên tập: 09/2026.*` }
    ],
  },
  {
    slug: "ai-nen-mua-vinhomes-sai-gon-park",
    title: `Ai nên (và không nên) mua Vinhomes Sài Gòn Park giai đoạn này?`,
    excerpt:
      `Persona gia đình, NĐT dài hạn, shophouse và ai nên tránh giai đoạn F0 — ma trận quyết định thực dụng.`,
    projectSlug: "vinhomes-sai-gon-park",
    publishedAt: "2026-09-18",
    coverImage: "/images/sai-gon-park/who-fits.webp",
    tags: ["Tư vấn", "Người mua", "Sài Gòn Park"],
    readingMinutes: 8,
    content: [
      { type: "p", text: `Đại đô thị giai đoạn F0 hút hai nhóm rất khác nhau: người cần chỗ ở trong hệ sinh thái Vin, và người mua kỳ vọng hạ tầng đẩy giá. Trộn hai động cơ trong một quyết định thường dẫn tới thất vọng. Bài này dựng vài **persona** thực dụng.` },
      { type: "image", src: "/images/sai-gon-park/who-fits.webp", alt: `Persona người mua minh họa` },
      { type: "h2", text: `Persona A — Gia đình trẻ ưu tiên trường & không gian xanh` },
      { type: "p", text: `**Hồ sơ:** thu nhập ổn, chấp nhận đi lại Tây Bắc, muốn nhà phố hơn chung cư chật.` },
      { type: "p", text: `**Điểm cộng SGP:** định hướng giáo dục lớn; mật độ xanh theo quy hoạch; sản phẩm liền kề đang có hàng; thương hiệu vận hành đại đô thị đã có tiền lệ ở nơi khác.` },
      { type: "p", text: `**Điểm trừ giai đoạn này:** tiện ích trường/Vinmec/TTTM phần lớn chưa vận hành; công trường ồn; commute vào lõi trung tâm có thể nặng.` },
      { type: "p", text: `**Gợi ý:** chỉ xuống tiền nếu đã chạy thử giờ cao điểm và có phương án trường **ngoài dự án** 3–5 năm đầu. Ưu tiên căn thuộc quỹ pháp lý rõ (xem bài pháp lý).` },
      { type: "image", src: "/images/sai-gon-park/stock-family-park.webp", alt: `Stock công viên / thiên nhiên` },
      { type: "h2", text: `Persona B — Nhà đầu tư giữ dài hạn (5–10 năm)` },
      { type: "p", text: `**Hồ sơ:** không cần dòng tiền thuê ngay; tin vào Vành đai 3, QL22, câu chuyện cực Tây Bắc.` },
      { type: "p", text: `**Điểm cộng:** quy mô lớn hiếm; giá F0 thấp tầng được marketing là cửa vào; quỹ hàng giai đoạn sau (biệt thự, cao tầng) có thể tạo mặt bằng giá tham chiếu mới.` },
      { type: "p", text: `**Điểm trừ:** chi phí vốn (lãi vay) trong giai đoạn chờ; thanh khoản thứ cấp chưa kiểm chứng; rủi ro tiến độ tiện ích làm chậm “câu chuyện”.` },
      { type: "p", text: `**Gợi ý:** stress-test nếu giá đi ngang 3 năm; không dùng đòn bẩy tối đa trên giả định tăng giá thẳng đứng.` },
      { type: "image", src: "/images/sai-gon-park/hero-urban-park.webp", alt: `Hero đô thị / công viên stock` },
      { type: "h2", text: `Persona C — Mua để kinh doanh shophouse / NPTM` },
      { type: "p", text: `**Hồ sơ:** cần mặt bằng bán lẻ, F&B, dịch vụ.` },
      { type: "p", text: `**Điểm cộng dài hạn:** Global Park và các cụm thương mại trên brochure; dân số quy hoạch lớn + sinh viên.` },
      { type: "p", text: `**Điểm trừ ngắn hạn:** mật độ cư dân thấp năm đầu; cạnh tranh chính sách ưu đãi mặt bằng; vốn chôn kèm chi phí vận hành.` },
      { type: "p", text: `**Gợi ý:** lập bài toán **break-even** với công suất 30–40% năm đầu; đọc ngành nghề được phép; ưu tiên vị trí đã có mặt bằng định vị hơn là “gần Global Village trên ảnh tổng thể”.` },
      { type: "h2", text: `Persona D — Cần ở gần CBD / thanh khoản thuê cao ngay` },
      { type: "p", text: `**Thường không khớp giai đoạn này.** Grand Park hoặc các dự án đã vận hành tại khu Đông/Nam có thể phù hợp hơn nếu ưu tiên thuê ngay và tiện ích đã mở. Sài Gòn Park bán câu chuyện tương lai Tây Bắc — khác bài toán studio cho thuê Quận 1.` },
      { type: "h2", text: `Persona E — Săn căn hộ giá “rẻ trên group”` },
      { type: "p", text: `**Rủi ro cao.** Tới tháng 9/2026, nguồn bảng hàng chi tiết vẫn ghi căn hộ **chưa công bố giá chính thức**. Mọi số trên Facebook cần nghi ngờ cho đến bảng CĐT. Đừng đặt cọc căn hộ dựa trên brochure cao tầng.` },
      { type: "image", src: "/images/sai-gon-park/apartment-skyline.webp", alt: `Căn hộ schematic` },
      { type: "h2", text: `Ma trận quyết định nhanh` },
      { type: "table", headers: [`Câu hỏi`, `Nếu “Có”`, `Nếu “Không”`], rows: [
          [`Chịu được công trường & tiện ích thiếu 3 năm?`, `Tiếp tục lọc căn`, `Cân nhắc dự án đã vận hành`],
          [`Đã đo commute giờ cao điểm?`, `OK`, `Dừng — đi đo đã`],
          [`Căn thuộc văn bản đủ điều kiện bán?`, `OK`, `Không đặt cọc`],
          [`Hiểu giãn xây & cơ sở chiết khấu?`, `OK`, `Đọc lại bài giá`],
          [`Cần cashflow thuê < 24 tháng?`, `Khó khớp SGP F0`, `Phù hợp tích sản hơn`]
      ] },
      { type: "h2", text: `Kết luận` },
      { type: "p", text: `Sài Gòn Park giai đoạn này hợp người **chấp nhận chờ đợi có kiểm soát** — kiểm soát pháp lý căn, kiểm soát dòng tiền, kiểm soát kỳ vọng tiện ích. Không hợp người cần “nhận nhà là có phố đi bộ như render” ngay tuần sau. Chọn đúng persona của chính bạn trước khi chọn dãy TL hay AS.` },
      { type: "p", text: `*Biên tập: 09/2026.*` },
      { type: "h2", text: `Câu hỏi nên mang tới buổi xem nhà` },
      { type: "ul", items: [
        `Căn thuộc dãy nào, Đơn vị ở nào, đã có văn bản đủ điều kiện bán chưa?`,
        `Hình thức bàn giao thô / hoàn thiện / giãn xây — lịch thanh toán chi tiết?`,
        `Chiết khấu và vay tính trên tổng giá hay phần đất + thương mại?`,
        `Khi nào dự kiến có thư bảo lãnh mang tên tôi?`,
        `Trường học / y tế tạm thời ngoài dự án trong bán kính 5 km là gì?`,
        `Phí quản lý dự kiến và tiện ích nào tính phí riêng?`,
        `Tiến độ đường nội khu từ căn tới cổng ra QL22 / Đặng Công Bình?`
      ] },
      { type: "p", text: `Mang sẵn checklist pháp lý (bài riêng trên site) giúp bạn không bị kéo vào demo tiện ích brochure cả buổi.` },
      { type: "h2", text: `Kịch bản “mua rồi hối” thường gặp` },
      { type: "ul", items: [
        `Đặt cọc vì FOMO livestream, quên xác minh ĐVO.`,
        `Chọn giãn xây vì “nhẹ dòng tiền” nhưng không chuẩn bị được khoản 6 tháng đầu.`,
        `Mua shophouse kỳ vọng mở quán ngay năm bàn giao.`,
        `So giá SGP với căn thứ cấp Grand Park đã có sổ rồi kết luận “rẻ quá phải chốt”.`
      ] },
      { type: "p", text: `Nếu nhận ra mình đang ở một trong bốn kịch bản trên, hãy dừng 48 giờ, đọc lại bài pháp lý và bài giá, rồi mới quyết.` }
    ],
  },
  {
    slug: "vinhomes-sai-gon-park-vs-grand-park",
    title: `Vinhomes Sài Gòn Park vs Grand Park: so sánh nhanh cho người đang phân vân`,
    excerpt:
      `Tây Bắc vs khu Đông, đô thị đang dựng vs đã vận hành — khi nào nghiêng SGP, khi nào giữ Grand Park.`,
    projectSlug: "vinhomes-sai-gon-park",
    publishedAt: "2026-09-19",
    coverImage: "/images/sai-gon-park/comparison-chart.webp",
    tags: ["So sánh", "Grand Park", "Sài Gòn Park"],
    readingMinutes: 8,
    featured: true,
    content: [
      { type: "p", text: `Nhiều khách hàng Vin tại TP.HCM đã biết **Grand Park** (khu Đông, thành phố Thủ Đức) và đang tự hỏi Sài Gòn Park (Hóc Môn / Tây Bắc) có phải “Grand Park phiên bản mới” không. Câu trả lời ngắn: **cùng họ tiện ích – khác bản đồ – khác giai đoạn.**` },
      { type: "image", src: "/images/sai-gon-park/comparison-chart.webp", alt: `Biểu đồ so sánh quy mô minh họa` },
      { type: "h2", text: `Bảng so sánh một màn hình` },
      { type: "table", headers: [`Tiêu chí`, `Sài Gòn Park (SGP)`, `Grand Park (GP)`], rows: [
          [`Vùng`, `Tây Bắc (Xuân Thới Sơn / Hóc Môn)`, `Đông TP.HCM (Thủ Đức)`],
          [`Quy mô quảng bá`, `~1.080 ha (kể cả golf) / ~880 ha đô thị QH`, `Nhỏ hơn nhiều (~271 ha theo các nguồn công bố lịch sử GP)`],
          [`Giai đoạn 2026`, `Đại đô thị mới triển khai; thấp tầng đang mở bán`, `Đã vận hành nhiều năm; cộng đồng & tiện ích hiện hữu hơn`],
          [`Định vị nổi bật`, `Đô thị đại học / “công viên tri thức”`, `Đại đô thị nhà ở + công viên trung tâm đã biết đến`],
          [`Sản phẩm “dễ mua” hiện tại`, `Liền kề F0 + pháp lý theo ĐVO`, `Căn hộ/thấp tầng sơ cấp & thứ cấp đa dạng`],
          [`Pháp lý người mua`, `Cần khoanh ĐVO-4 / văn bản từng quỹ`, `Thị trường thứ cấp quen thuộc hơn; sơ cấp tùy phân khu`],
          [`Thuê ngắn hạn`, `Chưa phải điểm mạnh năm đầu`, `Thanh khoản thuê dễ kiểm chứng hơn`],
          [`Câu chuyện hạ tầng`, `QL22, VD3, Metro 2, cao tốc Mộc Bài`, `Vành đai, metro khu Đông, kết nối sẵn có hơn`]
      ] },
      { type: "p", text: `Số quy mô trên bảng là **tham chiếu tương đối** để hình dung — luôn đối chiếu tài liệu mới nhất từng dự án.` },
      { type: "h2", text: `Khi nào nghiêng về Sài Gòn Park?` },
      { type: "ul", items: [
        `Bạn tin cực tăng trưởng Tây Bắc và chấp nhận chu kỳ chờ hạ tầng.`,
        `Ngân sách/sản phẩm thấp tầng F0 khớp kế hoạch nắm giữ dài.`,
        `Gia đình có hoạt động về phía Củ Chi / Tây Ninh / hành lang QL22.`,
        `Bạn muốn vị thế “sớm” trong đại đô thị gắn giáo dục quy mô lớn — chấp nhận rủi ro timeline.`
      ] },
      { type: "image", src: "/images/sai-gon-park/stock-apartment-facade.webp", alt: `Facade căn hộ stock — minh họa đô thị đã phát triển` },
      { type: "h2", text: `Khi nào nghiêng về Grand Park (hoặc ở lại khu Đông)?` },
      { type: "ul", items: [
        `Cần tiện ích và hàng xóm **đã có** trong 12–24 tháng tới.`,
        `Ưu tiên cho thuê hoặc bán lại trên thị trường thứ cấp đã quen.`,
        `Commute/logistics đời sống gắn khu Đông, sân bay Long Thành theo hướng hiện tại của bạn.`,
        `Không muốn đánh cược lớn vào tiến độ công trường giai đoạn đầu.`
      ] },
      { type: "image", src: "/images/sai-gon-park/apartment-skyline.webp", alt: `Skyline căn hộ schematic` },
      { type: "h2", text: `Những sai lầm khi so sánh` },
      { type: "ul", items: [
        `**So giá m² F0 SGP với giá thứ cấp GP** mà không cùng giai đoạn tiện ích.`,
        `**Gán** “cùng thương hiệu = cùng tốc độ tăng giá lịch sử”. Mỗi dự án gắn một chu kỳ hạ tầng địa phương.`,
        `**Bỏ qua pháp lý căn**: GP thứ cấp sổ đỏ khác hẳn SGP hình thành trong tương lai.`,
        `**Tin thời gian di chuyển brochure** của cả hai thay vì tự đo.`
      ] },
      { type: "h2", text: `Góc sản phẩm` },
      { type: "ul", items: [
        `Muốn **căn hộ đang ở được**: GP (hoặc dự án vận hành khác) thường thực tế hơn SGP năm 2026, khi cao tầng SGP còn trên quy hoạch / chưa có giá chính thức theo nguồn bảng hàng chi tiết.`,
        `Muốn **nhà phố đất F0 + câu chuyện đại học**: SGP đang là điểm nóng truyền thông.`,
        `Muốn **đa dạng hóa**: một số NĐT giữ cả hai vùng Đông–Tây — chỉ hợp nếu vốn và quản lý rủi ro đủ lớn.`
      ] },
      { type: "h2", text: `Kết luận` },
      { type: "p", text: `Sài Gòn Park không phải bản sao Grand Park đặt sang Hóc Môn. Một bên là **đô thị đang chạy**; một bên là **đô thị đang dựng** trên cửa ngõ Tây Bắc với định vị giáo dục rất mạnh trên giấy. Chọn theo bản đồ đời sống và khẩu vị rủi ro — không chọn theo thói quen thương hiệu.` },
      { type: "p", text: `*Biên tập: 09/2026. Quy mô GP mang tính tham chiếu công bố lịch sử; độc giả nên cập nhật số liệu GP riêng nếu cần phân tích sâu.*` },
      { type: "h2", text: `Góc giao thông & đời sống` },
      { type: "p", text: `Grand Park hưởng lợi từ mạng lưới khu Đông đã đô thị hóa mạnh hơn trong thập kỷ qua (các trục về phía thủ Thiêm, cao tốc Long Thành theo hướng đông). Sài Gòn Park gắn câu chuyện **mở khóa Tây Bắc**: QL22, Vành đai 3, cao tốc hướng Mộc Bài, Metro 2 theo định hướng TOD.` },
      { type: "p", text: `Không có “bên nào thắng tuyệt đối”. Người làm việc ở Thủ Đức / quận cũ phía Đông thường tối ưu GP. Người có nhà máy, kho, gia đình phía Tây–Tây Bắc, hoặc chấp nhận đổi không gian sống lấy chu kỳ F0, mới nên đẩy SGP lên đầu danh sách.` },
      { type: "image", src: "/images/sai-gon-park/traffic-connectivity.webp", alt: `Kết nối giao thông minh họa SGP` },
      { type: "h2", text: `Góc sản phẩm & ngân sách (thực dụng)` },
      { type: "table", headers: [`Nhu cầu`, `Thiên về`], rows: [
          [`Căn hộ 2PN thuê được trong 12 tháng`, `Grand Park / dự án vận hành`],
          [`Nhà phố đất, nắm 7–10 năm`, `Sài Gòn Park (nếu pháp lý căn OK)`],
          [`Biệt thự view tiện ích đã có`, `Xem hàng GP & thị trường thứ cấp`],
          [`Săn hàng F0 “đúng văn bản ĐVO”`, `SGP thấp tầng đang mở`],
          [`Đa dạng hóa Đông–Tây`, `Chỉ khi vốn dư và quản trị được lãi vay`]
      ] },
      { type: "p", text: `Nhắc lại: giá căn hộ / biệt thự SGP trên mạng năm 2026 nhiều khi là ước tính. Đừng dùng số chưa công bố để “chứng minh” SGP rẻ hơn GP.` },
      { type: "h2", text: `Kết luận hành động` },
      { type: "ul", items: [
        `Viết ra 3 ưu tiên (ở thật / tích sản / kinh doanh).`,
        `Đo commute tới chỗ làm cho **cả hai** hướng Đông và Tây Bắc.`,
        `Nếu nghiêng SGP: chỉ xem căn có checklist pháp lý đạt.`,
        `Nếu nghiêng GP: so tổng chi phí sở hữu (giá + phí + thời gian) chứ không chỉ giá rao.`
      ] },
      { type: "p", text: `Cùng hệ sinh thái Vin không có nghĩa thay thế được nhau trên bản đồ thành phố.` }
    ],
  },
  {
    slug: "vinhomes-green-paradise-can-gio-tiem-nang-nghi-duong",
    title: "Vinhomes Green Paradise Cần Giờ: tiềm năng đô thị biển – sinh thái",
    excerpt:
      "Phân tích định vị nghỉ dưỡng gần TP.HCM, lợi thế hệ sinh thái Cần Giờ và những rủi ro cần cân nhắc.",
    projectSlug: "vinhomes-green-paradise",
    publishedAt: "2026-07-20",
    coverImage:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80",
    tags: ["Green Paradise", "Cần Giờ", "Nghỉ dưỡng"],
    readingMinutes: 8,
    featured: true,
    content: [
      "Cần Giờ từ lâu được xem là “lá phổi” và cửa biển của TP. Hồ Chí Minh với rừng ngập mặn và bờ biển đặc trưng. Vinhomes Green Paradise hướng tới mô hình đô thị biển – sinh thái quy mô lớn, kết hợp không gian sống và nghỉ dưỡng.",
      "Điểm hấp dẫn với nhà đầu tư là khoảng cách tương đối gần trung tâm thành phố so với nhiều điểm nghỉ dưỡng xa hơn, kèm kỳ vọng hạ tầng kết nối được cải thiện theo thời gian. Ở chiều ngược lại, tiến độ hạ tầng và đặc thù môi trường ven biển là yếu tố cần theo dõi sát.",
      "Phân khúc nghỉ dưỡng thường nhạy cảm với dòng tiền cho thuê và chính sách vận hành. Người mua nên làm rõ mục tiêu: ở cuối tuần, đầu tư dài hạn hay kết hợp cả hai.",
      "Bài viết mang tính thông tin tham khảo; mọi quyết định cần dựa trên hồ sơ pháp lý và công bố chính thức mới nhất.",
    ],
  },
  {
    slug: "so-sanh-nghi-duong-can-gio-va-cac-diem-den-bien-khac",
    title: "Nghỉ dưỡng Cần Giờ và các điểm đến biển khác: góc nhìn cho nhà đầu tư",
    excerpt:
      "Đặt Green Paradise trong bức tranh nghỉ dưỡng miền Nam — khoảng cách, hệ sinh thái và kỳ vọng dòng khách.",
    projectSlug: "vinhomes-green-paradise",
    publishedAt: "2026-08-28",
    coverImage:
      "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1200&q=80",
    tags: ["So sánh", "Đầu tư", "Green Paradise"],
    readingMinutes: 6,
    content: [
      "Khi cân nhắc bất động sản nghỉ dưỡng gần TP.HCM, nhà đầu tư thường so sánh Cần Giờ với các điểm đến biển miền Trung hoặc các khu vực vệ tinh khác. Lợi thế của Cần Giờ nằm ở khoảng cách và câu chuyện sinh thái rừng ngập mặn.",
      "Tuy nhiên, “gần” không đồng nghĩa với trải nghiệm giống resort biển dài đã vận hành nhiều năm. Dòng khách du lịch, dịch vụ phụ trợ và hạ tầng vẫn đang trong quá trình hoàn thiện theo quy hoạch.",
      "Với dự án mang thương hiệu Vinhomes, kỳ vọng lớn thường đặt vào quy mô tiện ích và khả năng tạo lập cộng đồng. Hãy đối chiếu kỳ vọng đó với lộ trình bàn giao và chính sách vận hành thực tế khi có thông tin chính thức.",
      "Góc nhìn độc lập trên Vinhomes Space giúp bạn có khung so sánh trước khi đi sâu vào bảng hàng cụ thể.",
    ],
  },
  {
    slug: "vinhomes-grand-park-song-trong-dai-do-thi",
    title: "Sống trong đại đô thị: trải nghiệm thực tế quanh Vinhomes Grand Park",
    excerpt:
      "Công viên, tiện ích Vin và nhịp sống cư dân — những gì người ở thực thường quan tâm tại Grand Park.",
    projectSlug: "vinhomes-grand-park",
    publishedAt: "2026-06-15",
    coverImage:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80",
    tags: ["Grand Park", "Ở thực", "Tiện ích"],
    readingMinutes: 7,
    featured: true,
    content: [
      "Vinhomes Grand Park đã đi qua giai đoạn “dự án trên giấy” để trở thành đại đô thị có cộng đồng cư dân lớn. Công viên trung tâm và hệ tiện ích nội khu là lý do nhiều gia đình chọn gắn bó dài hạn.",
      "Người ở thực thường đánh giá cao sự tiện lợi khi trường học, mua sắm và không gian xanh nằm trong bán kính di chuyển ngắn. Ở góc độ thị trường, nguồn cung đa phân khu tạo ra mặt bằng giá và lựa chọn diện tích đa dạng trên thị trường thứ cấp.",
      "Khi xem nhà thứ cấp, hãy kiểm tra tình trạng bàn giao, phí quản lý, hướng căn và khả năng cải tạo. Với hàng sơ cấp còn mở bán, cần làm rõ chính sách thanh toán và tiến độ những tháp/phân khu liên quan.",
      "Grand Park phù hợp người ưu tiên tiện ích đồng bộ và không gian xanh hơn là vị trí sát trung tâm lịch sử của thành phố.",
    ],
  },
  {
    slug: "thanh-khoan-can-ho-grand-park-goi-y-cho-nha-dau-tu",
    title: "Thanh khoản căn hộ Grand Park: gợi ý cho nhà đầu tư thứ cấp",
    excerpt:
      "Một số tiêu chí chọn căn và theo dõi mặt bằng giá khi giao dịch trên thị trường thứ cấp Grand Park.",
    projectSlug: "vinhomes-grand-park",
    publishedAt: "2026-09-05",
    coverImage:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&q=80",
    tags: ["Đầu tư", "Thứ cấp", "Grand Park"],
    readingMinutes: 5,
    content: [
      "Thị trường thứ cấp tại các đại đô thị lớn thường có thanh khoản tốt hơn nhờ cộng đồng cư dân và độ nhận diện thương hiệu. Grand Park không ngoại lệ, nhưng không phải mọi căn đều dễ giao dịch như nhau.",
      "Các yếu tố ảnh hưởng gồm vị trí tháp, tầng, view công viên/nội khu, tình trạng pháp lý và mức giá so với mặt bằng khu vực. Căn 2 phòng ngủ thanh khoản thường cao hơn với nhóm ở thực.",
      "Nhà đầu tư nên tránh FOMO theo tin đồn ngắn hạn; thay vào đó theo dõi biên độ giá giao dịch thực và chi phí vốn. Bài viết chỉ mang tính tham khảo, không phải khuyến nghị mua/bán.",
    ],
  },
  {
    slug: "vinhomes-ocean-park-dai-do-thi-bien-ho",
    title: "Vinhomes Ocean Park: đại đô thị biển hồ phía Đông Hà Nội",
    excerpt:
      "Tổng quan tiện ích biển hồ, quy mô phân khu và lý do Ocean Park hút cư dân trẻ.",
    projectSlug: "vinhomes-ocean-park",
    publishedAt: "2026-05-22",
    coverImage:
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdbc?w=1200&q=80",
    tags: ["Ocean Park", "Hà Nội", "Tổng quan"],
    readingMinutes: 6,
    content: [
      "Vinhomes Ocean Park nổi bật với hình ảnh biển hồ nhân tạo và hệ tiện ích giải trí quy mô lớn — yếu tố khó tìm thấy ở nhiều khu đô thị khác phía Đông Hà Nội.",
      "Sau nhiều năm phát triển, dự án và các phân kỳ mở rộng đã tạo thành hệ sinh thái đô thị với trường học, thương mại và không gian công cộng. Điều này hỗ trợ cả nhu cầu ở thực lẫn khai thác cho thuê trong một số phân khúc.",
      "Người mua cần phân biệt rõ từng phân khu về thời điểm bàn giao, mật độ và chính sách bán hàng. Việc khảo sát thực tế vào cuối tuần giúp cảm nhận đúng nhịp sống cư dân.",
    ],
  },
  {
    slug: "tien-ich-ocean-park-nhung-diem-dang-trai-nghiem",
    title: "Tiện ích Ocean Park: những điểm đáng trải nghiệm trước khi quyết định",
    excerpt:
      "Từ biển hồ, công viên đến tiện ích nội khu — gợi ý lịch khảo sát một buổi cho gia đình.",
    projectSlug: "vinhomes-ocean-park",
    publishedAt: "2026-08-08",
    coverImage:
      "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=1200&q=80",
    tags: ["Tiện ích", "Ocean Park"],
    readingMinutes: 5,
    content: [
      "Một buổi khảo sát thực tế nên bắt đầu từ không gian biển hồ và công viên trung tâm — đây là “linh hồn” hình ảnh của Ocean Park. Tiếp theo, hãy đi bộ quanh phân khu bạn quan tâm để cảm nhận mật độ và khoảng cách tới tiện ích.",
      "Ghé trường học, khu thương mại và các lối ra vào giúp đánh giá sinh hoạt hàng ngày. Nếu mua để cho thuê, hãy hỏi thêm về nhu cầu thuê thực tế theo từng loại căn.",
      "Mang theo checklist pháp lý và chi phí vận hành để buổi xem nhà hiệu quả hơn.",
    ],
  },
  {
    slug: "vinhomes-smart-city-do-thi-thong-minh-phia-tay",
    title: "Vinhomes Smart City: đô thị thông minh phía Tây Hà Nội",
    excerpt:
      "Ứng dụng công nghệ, vị trí Nam Từ Liêm và lựa chọn phân khu phù hợp ngân sách gia đình trẻ.",
    projectSlug: "vinhomes-smart-city",
    publishedAt: "2026-04-18",
    coverImage:
      "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=1200&q=80",
    tags: ["Smart City", "Hà Nội", "Công nghệ"],
    readingMinutes: 6,
    content: [
      "Vinhomes Smart City hướng tới trải nghiệm sống gắn với tiện ích số, an ninh và vận hành thông minh — phù hợp nhóm khách hàng trẻ, thích không gian hiện đại phía Tây Hà Nội.",
      "Vị trí Nam Từ Liêm thuận tiện với nhiều trục đường lớn và khu vực đang phát triển. Tuy nhiên, thời gian di chuyển vào trung tâm vẫn cần kiểm chứng theo khung giờ làm việc của gia đình bạn.",
      "Nhiều phân khu giúp người mua linh hoạt về mức giá và diện tích. Hãy ưu tiên nhu cầu thực (số phòng, hướng nắng, tiện ích gần căn) trước khi bị cuốn theo các gói ưu đãi ngắn hạn.",
    ],
  },
  {
    slug: "gia-dinh-tre-chon-can-smart-city-can-luu-y-gi",
    title: "Gia đình trẻ chọn căn tại Smart City cần lưu ý gì?",
    excerpt:
      "Ngân sách, trường học, phí quản lý và kế hoạch tài chính — các câu hỏi nên hỏi trước khi ký.",
    projectSlug: "vinhomes-smart-city",
    publishedAt: "2026-07-30",
    coverImage:
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=80",
    tags: ["Gia đình", "Smart City", "Tư vấn"],
    readingMinutes: 5,
    content: [
      "Gia đình trẻ thường tối ưu giữa trả góp, khoảng cách làm việc và môi trường nuôi dạy con. Smart City có lợi thế tiện ích nội khu, nhưng vẫn cần tính toán tổng chi phí sở hữu.",
      "Hãy liệt kê các khoản: trả trước, dư nợ vay, phí quản lý, nội thất và quỹ dự phòng. Nếu có con nhỏ, khảo sát trường học và sân chơi trong bán kính di chuyển bộ.",
      "Đừng quên kiểm tra hướng căn và tiếng ồn nếu gần trục đường lớn. Quyết định tốt thường đến từ khảo sát thực tế hơn là xem phối cảnh.",
    ],
  },
  {
    slug: "vinhomes-central-park-bieu-tuong-ben-song-sai-gon",
    title: "Vinhomes Central Park: biểu tượng căn hộ cao cấp bên sông Sài Gòn",
    excerpt:
      "Vị trí Bình Thạnh, Landmark 81 và thị trường thứ cấp luxury — dành cho người tìm chuẩn sống trung tâm.",
    projectSlug: "vinhomes-central-park",
    publishedAt: "2026-03-10",
    coverImage:
      "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=1200&q=80",
    tags: ["Central Park", "Cao cấp", "TP.HCM"],
    readingMinutes: 6,
    content: [
      "Vinhomes Central Park gắn liền với hình ảnh Landmark 81 và công viên ven sông — trở thành biểu tượng của phân khúc căn hộ cao cấp tại TP. Hồ Chí Minh.",
      "Dự án đã bàn giao và vận hành ổn định; giao dịch chủ yếu trên thị trường thứ cấp. Người mua quan tâm đến view sông, tầng cao, tình trạng căn và chi phí quản lý tương xứng phân khúc luxury.",
      "So với đại đô thị vùng ven, Central Park đánh đổi diện tích xanh quy mô lớn để lấy vị trí gần trung tâm và giá trị biểu tượng. Lựa chọn phụ thuộc rõ mục tiêu sống hoặc nắm giữ tài sản dài hạn.",
    ],
  },
  {
    slug: "mua-thu-cap-central-park-checklist-phap-ly",
    title: "Mua thứ cấp Central Park: checklist pháp lý và kiểm tra căn hộ",
    excerpt:
      "Sổ hồng, nợ phí, cải tạo nội thất và biên bản bàn giao — những hạng mục không thể bỏ qua.",
    projectSlug: "vinhomes-central-park",
    publishedAt: "2026-06-02",
    coverImage:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&q=80",
    tags: ["Pháp lý", "Thứ cấp", "Central Park"],
    readingMinutes: 5,
    content: [
      "Giao dịch thứ cấp tại dự án đã vận hành đòi hỏi kiểm tra kỹ hồ sơ pháp lý: giấy chứng nhận, tình trạng thế chấp (nếu có), nghĩa vụ tài chính với ban quản lý.",
      "Khảo sát căn nên gồm hệ thống điện nước, điều hòa, trần tường sàn và các hạng mục cải tạo trái quy định (nếu có). Yêu cầu xác nhận nợ phí trước khi đặt cọc.",
      "Nên có hỗ trợ pháp lý độc lập thay vì chỉ dựa vào bên bán. Checklist này là gợi ý chung, không thay thế tư vấn chuyên môn.",
    ],
  },
];

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

export function getArticlesByProject(projectSlug: string): Article[] {
  return articles
    .filter((a) => a.projectSlug === projectSlug)
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export function getAllArticles(): Article[] {
  return [...articles].sort((a, b) =>
    b.publishedAt.localeCompare(a.publishedAt),
  );
}

export function getFeaturedArticles(limit = 4): Article[] {
  const featured = articles.filter((a) => a.featured);
  const list = (featured.length ? featured : articles).sort((a, b) =>
    b.publishedAt.localeCompare(a.publishedAt),
  );
  return list.slice(0, limit);
}

export function getRecentArticles(limit = 6): Article[] {
  return getAllArticles().slice(0, limit);
}
