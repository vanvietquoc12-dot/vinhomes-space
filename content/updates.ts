export interface Update {
  slug: string;
  title: string;
  summary: string;
  projectSlug: string;
  publishedAt: string;
  category: "tien-do" | "thi-truong" | "su-kien" | "phap-ly";
  categoryLabel: string;
}

export const updates: Update[] = [
  {
    slug: "sai-gon-park-mo-ban-thap-tang-9-2026",
    title: "Sài Gòn Park: quỹ liền kề đang mở bán (cập nhật 9/2026)",
    summary:
      "Theo nguồn đại lý đối chiếu Market, Ivy/Global đang có bảng hàng liền kề; giá theo dãy tham chiếu từ ~5,83 tỷ/căn thô — luôn lấy báo giá mã căn mới nhất.",
    projectSlug: "vinhomes-sai-gon-park",
    publishedAt: "2026-09-16",
    category: "thi-truong",
    categoryLabel: "Thị trường",
  },
  {
    slug: "sai-gon-park-phap-ly-dvo4-bao-lanh",
    title: "Pháp lý: 1.802 căn ĐVO-4 đủ điều kiện bán + cam kết bảo lãnh",
    summary:
      "Nguồn thứ cấp trích văn bản 28497/SXD-PTĐT (06/08/2026) và cam kết Techcombank cho quỹ thấp tầng Đơn vị ở số 4 — phạm vi hẹp, không phủ toàn dự án.",
    projectSlug: "vinhomes-sai-gon-park",
    publishedAt: "2026-09-10",
    category: "phap-ly",
    categoryLabel: "Pháp lý",
  },
  {
    slug: "sai-gon-park-giao-dat-giai-doan-1",
    title: "Giao đất giai đoạn 1 ~827 ha tại Xuân Thới Sơn",
    summary:
      "Theo nguồn pháp lý thứ cấp, QĐ 1426/QĐ-UBND (12/3/2026) giao khoảng 826,76 ha GĐ1; phần 880 ha 1/500 và 1.080 ha marketing là các lớp số liệu khác nhau.",
    projectSlug: "vinhomes-sai-gon-park",
    publishedAt: "2026-08-20",
    category: "tien-do",
    categoryLabel: "Tiến độ",
  },
  {
    slug: "green-paradise-cap-nhat-dinh-huong-sinh-thai",
    title: "Green Paradise: định hướng đô thị biển – sinh thái tại Cần Giờ",
    summary:
      "Thông tin công khai nhấn mạnh yếu tố hệ sinh thái và nghỉ dưỡng. Nhà đầu tư nên theo dõi thêm lộ trình hạ tầng kết nối.",
    projectSlug: "vinhomes-green-paradise",
    publishedAt: "2026-09-02",
    category: "thi-truong",
    categoryLabel: "Thị trường",
  },
  {
    slug: "green-paradise-chu-y-phap-ly-nghi-duong",
    title: "Lưu ý pháp lý khi tìm hiểu sản phẩm nghỉ dưỡng Cần Giờ",
    summary:
      "Với bất động sản nghỉ dưỡng, hãy ưu tiên hồ sơ pháp lý rõ ràng và công bố chính thức từ chủ đầu tư trước mọi cam kết đặt chỗ.",
    projectSlug: "vinhomes-green-paradise",
    publishedAt: "2026-07-25",
    category: "phap-ly",
    categoryLabel: "Pháp lý",
  },
  {
    slug: "grand-park-cong-dong-cu-dan-soi-dong",
    title: "Grand Park: cộng đồng cư dân và tiện ích vận hành ổn định",
    summary:
      "Nhiều phân khu đã bàn giao giúp nhịp sống đô thị rõ nét hơn; thị trường thứ cấp duy trì thanh khoản theo từng phân khúc.",
    projectSlug: "vinhomes-grand-park",
    publishedAt: "2026-09-08",
    category: "su-kien",
    categoryLabel: "Sự kiện",
  },
  {
    slug: "ocean-park-tien-ich-bien-ho-hut-cu-dan",
    title: "Ocean Park: tiện ích biển hồ tiếp tục hút gia đình trẻ",
    summary:
      "Cuối tuần tại khu đô thị vẫn sôi động nhờ không gian giải trí và công viên — điểm cộng cho nhu cầu ở thực.",
    projectSlug: "vinhomes-ocean-park",
    publishedAt: "2026-08-30",
    category: "su-kien",
    categoryLabel: "Sự kiện",
  },
  {
    slug: "smart-city-lua-chon-can-cho-gia-dinh",
    title: "Smart City: nhu cầu căn hộ phù hợp gia đình trẻ phía Tây Hà Nội",
    summary:
      "Phân khúc 2–3 phòng ngủ được quan tâm nhờ tiện ích nội khu và định vị đô thị thông minh.",
    projectSlug: "vinhomes-smart-city",
    publishedAt: "2026-08-05",
    category: "thi-truong",
    categoryLabel: "Thị trường",
  },
  {
    slug: "central-park-thi-truong-thu-cap-luxury",
    title: "Central Park: giao dịch thứ cấp phân khúc cao cấp",
    summary:
      "Nguồn cung thứ cấp quanh các tháp view đẹp vẫn được quan tâm; người mua nên kiểm tra kỹ pháp lý và phí vận hành.",
    projectSlug: "vinhomes-central-park",
    publishedAt: "2026-07-12",
    category: "thi-truong",
    categoryLabel: "Thị trường",
  },
];

export function getUpdatesByProject(projectSlug: string): Update[] {
  return updates
    .filter((u) => u.projectSlug === projectSlug)
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export function getAllUpdates(): Update[] {
  return [...updates].sort((a, b) =>
    b.publishedAt.localeCompare(a.publishedAt),
  );
}

export function getRecentUpdates(limit = 5): Update[] {
  return getAllUpdates().slice(0, limit);
}
