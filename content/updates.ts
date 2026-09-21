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
    slug: "sai-gon-park-theo-doi-thong-tin-mo-ban",
    title: "Sài Gòn Park: tiếp tục theo dõi lộ trình thông tin mở bán",
    summary:
      "Thị trường khu Đông đang chờ các cập nhật chính thức về tiến độ và chính sách. Chúng tôi sẽ bổ sung khi có nguồn công khai đáng tin cậy.",
    projectSlug: "vinhomes-sai-gon-park",
    publishedAt: "2026-09-10",
    category: "thi-truong",
    categoryLabel: "Thị trường",
  },
  {
    slug: "sai-gon-park-ha-tang-khu-dong",
    title: "Ghi nhận diễn biến hạ tầng xung quanh khu Đông TP.HCM",
    summary:
      "Các trục kết nối và đô thị hóa Thủ Đức tiếp tục là yếu tố then chốt ảnh hưởng kỳ vọng với dự án mới phía Đông.",
    projectSlug: "vinhomes-sai-gon-park",
    publishedAt: "2026-08-18",
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
