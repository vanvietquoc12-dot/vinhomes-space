export type ProjectStatus = "dang-mo-ban" | "sap-mo-ban" | "da-ban-giao" | "dang-xay-dung";

export interface ProjectFact {
  label: string;
  value: string;
}

export interface Project {
  slug: string;
  name: string;
  shortName: string;
  location: string;
  city: string;
  status: ProjectStatus;
  statusLabel: string;
  tagline: string;
  overview: string;
  highlights: string[];
  facts: ProjectFact[];
  coverImage: string;
  gallery: string[];
  featured: boolean;
  order: number;
}

export const projects: Project[] = [
  {
    slug: "vinhomes-sai-gon-park",
    name: "Vinhomes Sài Gòn Park",
    shortName: "Sài Gòn Park",
    location: "Quận 9 / Thủ Đức, TP. Hồ Chí Minh",
    city: "TP. Hồ Chí Minh",
    status: "sap-mo-ban",
    statusLabel: "Sắp mở bán",
    tagline: "Công viên sống xanh giữa lòng Đông Sài Gòn",
    overview: `Vinhomes Sài Gòn Park được định vị là tổ hợp đô thị xanh quy mô lớn tại khu vực phía Đông TP. Hồ Chí Minh, kế thừa triết lý “công viên trong phố” vốn là dấu ấn của các đại đô thị Vinhomes.

Dự án hướng tới không gian sống gắn với cây xanh, mặt nước và tiện ích nội khu đa dạng — từ trường học, trung tâm thương mại đến hệ thống công viên trung tâm — phù hợp gia đình trẻ và nhà đầu tư dài hạn quan tâm đến tiềm năng kết nối giao thông của khu Đông.

Thông tin trên trang này mang tính tổng hợp, tham khảo từ nguồn công khai và sẽ được cập nhật khi chủ đầu tư công bố chi tiết chính thức về quy hoạch, pháp lý và tiến độ mở bán.`,
    highlights: [
      "Định vị đô thị xanh phía Đông TP.HCM",
      "Tiềm năng kết nối hạ tầng khu vực Thủ Đức",
      "Tiện ích nội khu đa tầng theo chuẩn Vinhomes",
      "Phù hợp ở thực và đầu tư dài hạn",
    ],
    facts: [
      { label: "Vị trí", value: "Khu Đông TP. Hồ Chí Minh" },
      { label: "Loại hình", value: "Căn hộ & thấp tầng (dự kiến)" },
      { label: "Trạng thái", value: "Sắp mở bán / cập nhật" },
      { label: "Chủ đầu tư", value: "Vinhomes (VinGroup)" },
      { label: "Phân khúc", value: "Trung – cao cấp" },
      { label: "Điểm nhấn", value: "Công viên & tiện ích xanh" },
    ],
    coverImage:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=80",
    ],
    featured: true,
    order: 1,
  },
  {
    slug: "vinhomes-green-paradise",
    name: "Vinhomes Green Paradise",
    shortName: "Green Paradise",
    location: "Cần Giờ, TP. Hồ Chí Minh",
    city: "TP. Hồ Chí Minh",
    status: "dang-xay-dung",
    statusLabel: "Đang phát triển",
    tagline: "Đô thị biển – rừng ngập mặn tại cửa ngõ Cần Giờ",
    overview: `Vinhomes Green Paradise (thường được nhắc tới trong các thông tin về siêu dự án Cần Giờ) hướng tới mô hình đô thị nghỉ dưỡng – sinh thái gắn với vùng biển và hệ sinh thái rừng ngập mặn đặc trưng của huyện Cần Giờ.

Với quy mô lớn và định vị “thiên đường xanh”, dự án thu hút sự quan tâm của nhà đầu tư quan tâm đến bất động sản nghỉ dưỡng ven biển gần TP.HCM, đồng thời đặt ra kỳ vọng về hạ tầng kết nối và phát triển du lịch sinh thái dài hạn.

Nội dung tại đây chỉ mang tính thông tin tham khảo; tiến độ, sản phẩm và chính sách bán hàng cần đối chiếu với công bố chính thức của chủ đầu tư.`,
    highlights: [
      "Định vị đô thị biển – sinh thái Cần Giờ",
      "Kết hợp nghỉ dưỡng và không gian sống xanh",
      "Tiềm năng du lịch & hạ tầng kết nối dài hạn",
      "Phân khúc nghỉ dưỡng – đầu tư",
    ],
    facts: [
      { label: "Vị trí", value: "Cần Giờ, TP. Hồ Chí Minh" },
      { label: "Loại hình", value: "Nghỉ dưỡng & đô thị biển" },
      { label: "Trạng thái", value: "Đang phát triển" },
      { label: "Chủ đầu tư", value: "Vinhomes (VinGroup)" },
      { label: "Phân khúc", value: "Nghỉ dưỡng – cao cấp" },
      { label: "Điểm nhấn", value: "Biển & rừng ngập mặn" },
    ],
    coverImage:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1200&q=80",
      "https://images.unsplash.com/photo-1499793983690-e29dafd1aa4d?w=1200&q=80",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80",
    ],
    featured: true,
    order: 2,
  },
  {
    slug: "vinhomes-grand-park",
    name: "Vinhomes Grand Park",
    shortName: "Grand Park",
    location: "Quận 9, TP. Thủ Đức, TP. Hồ Chí Minh",
    city: "TP. Hồ Chí Minh",
    status: "dang-mo-ban",
    statusLabel: "Đang mở bán",
    tagline: "Đại đô thị thông minh lớn nhất phía Đông Sài Gòn",
    overview: `Vinhomes Grand Park là đại đô thị quy mô lớn tại TP. Thủ Đức, nổi bật với công viên trung tâm rộng lớn, hệ thống tiện ích nội khu phong phú và nhiều phân khu căn hộ, thấp tầng đã và đang bàn giao.

Dự án thu hút cư dân ở thực nhờ hệ sinh thái Vin (Vincom, VinSchool, Vinmec…) cùng vị trí kết nối với các trục giao thông quan trọng của khu Đông. Phân khúc đa dạng từ căn hộ tiêu chuẩn đến cao cấp giúp mở rộng đối tượng khách hàng.

Trang thông tin này tổng hợp góc nhìn độc lập về vị trí, tiện ích và diễn biến thị trường quanh Grand Park.`,
    highlights: [
      "Công viên trung tâm quy mô lớn",
      "Hệ sinh thái tiện ích Vin đầy đủ",
      "Nhiều phân khu đã bàn giao",
      "Thanh khoản và cộng đồng cư dân lớn",
    ],
    facts: [
      { label: "Vị trí", value: "TP. Thủ Đức, TP.HCM" },
      { label: "Loại hình", value: "Căn hộ, shophouse, thấp tầng" },
      { label: "Trạng thái", value: "Đang mở bán / bàn giao" },
      { label: "Chủ đầu tư", value: "Vinhomes (VinGroup)" },
      { label: "Phân khúc", value: "Trung – cao cấp" },
      { label: "Điểm nhấn", value: "Công viên & đại đô thị" },
    ],
    coverImage:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80",
    ],
    featured: true,
    order: 3,
  },
  {
    slug: "vinhomes-ocean-park",
    name: "Vinhomes Ocean Park",
    shortName: "Ocean Park",
    location: "Gia Lâm, Hà Nội",
    city: "Hà Nội",
    status: "dang-mo-ban",
    statusLabel: "Đang mở bán",
    tagline: "Đại đô thị biển hồ phía Đông Hà Nội",
    overview: `Vinhomes Ocean Park (và các phân kỳ mở rộng như Ocean Park 2, 3) là đại đô thị biển hồ nổi tiếng phía Đông Hà Nội, với hồ nước mặn nhân tạo, công viên nước, trường học và hệ thống tiện ích quy mô “thành phố trong thành phố”.

Dự án đã hình thành cộng đồng cư dân đông đúc, thị trường thứ cấp sôi động và là điểm tham chiếu cho phân khúc căn hộ giá trị tốt tại khu vực Gia Lâm – Hưng Yên mở rộng.

Thông tin trên Vinhomes Space giúp bạn theo dõi tổng quan tiện ích, phân khu và các cập nhật thị trường liên quan.`,
    highlights: [
      "Biển hồ nước mặn & tiện ích giải trí",
      "Quy mô đại đô thị đa phân khu",
      "Cộng đồng cư dân lớn, tiện ích vận hành",
      "Thị trường sơ cấp & thứ cấp năng động",
    ],
    facts: [
      { label: "Vị trí", value: "Gia Lâm, Hà Nội" },
      { label: "Loại hình", value: "Căn hộ, shophouse, thấp tầng" },
      { label: "Trạng thái", value: "Đang mở bán / bàn giao" },
      { label: "Chủ đầu tư", value: "Vinhomes (VinGroup)" },
      { label: "Phân khúc", value: "Trung cấp – cao cấp" },
      { label: "Điểm nhấn", value: "Biển hồ nhân tạo" },
    ],
    coverImage:
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdbc?w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=1200&q=80",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&q=80",
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=80",
    ],
    featured: true,
    order: 4,
  },
  {
    slug: "vinhomes-smart-city",
    name: "Vinhomes Smart City",
    shortName: "Smart City",
    location: "Nam Từ Liêm, Hà Nội",
    city: "Hà Nội",
    status: "dang-mo-ban",
    statusLabel: "Đang mở bán",
    tagline: "Đô thị thông minh phía Tây Hà Nội",
    overview: `Vinhomes Smart City tọa lạc tại phía Tây Hà Nội (khu vực Đại Mỗ – Tây Mỗ, Nam Từ Liêm), định vị là đô thị thông minh với ứng dụng công nghệ trong vận hành, an ninh và tiện ích số cho cư dân.

Dự án gồm nhiều phân khu căn hộ và thấp tầng, gần các trục đường lớn và khu vực hành chính – công nghệ đang phát triển của thủ đô. Đây là lựa chọn phổ biến với gia đình trẻ cần không gian sống hiện đại, tiện ích đầy đủ và kết nối về trung tâm tương đối thuận tiện.

Nội dung trang dự án tập trung vào tổng quan vị trí, tiện ích và các bài viết phân tích độc lập.`,
    highlights: [
      "Định vị đô thị thông minh phía Tây Hà Nội",
      "Ứng dụng công nghệ & tiện ích số",
      "Nhiều phân khu linh hoạt về ngân sách",
      "Gần trục giao thông phía Tây",
    ],
    facts: [
      { label: "Vị trí", value: "Nam Từ Liêm, Hà Nội" },
      { label: "Loại hình", value: "Căn hộ, thấp tầng" },
      { label: "Trạng thái", value: "Đang mở bán / bàn giao" },
      { label: "Chủ đầu tư", value: "Vinhomes (VinGroup)" },
      { label: "Phân khúc", value: "Trung cấp – cao cấp" },
      { label: "Điểm nhấn", value: "Smart living & tiện ích" },
    ],
    coverImage:
      "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1200&q=80",
      "https://images.unsplash.com/photo-1460317442991-0ec209397118?w=1200&q=80",
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=1200&q=80",
    ],
    featured: false,
    order: 5,
  },
  {
    slug: "vinhomes-central-park",
    name: "Vinhomes Central Park",
    shortName: "Central Park",
    location: "Bình Thạnh, TP. Hồ Chí Minh",
    city: "TP. Hồ Chí Minh",
    status: "da-ban-giao",
    statusLabel: "Đã bàn giao",
    tagline: "Biểu tượng căn hộ cao cấp bên sông Sài Gòn",
    overview: `Vinhomes Central Park là một trong những biểu tượng căn hộ cao cấp tại TP. Hồ Chí Minh, nằm tại Bình Thạnh với tầm nhìn sông Sài Gòn, công viên nội khu và tổ hợp Landmark 81 nổi tiếng.

Dự án đã bàn giao và vận hành nhiều năm, thị trường chủ yếu là thứ cấp. Cư dân được hưởng hệ tiện ích cao cấp, vị trí trung tâm và thanh khoản ổn định trong phân khúc luxury.

Trang này cung cấp góc nhìn tổng quan và bài viết tham khảo dành cho người quan tâm mua/thuê hoặc tìm hiểu lịch sử phát triển dự án.`,
    highlights: [
      "Vị trí trung tâm, view sông Sài Gòn",
      "Landmark 81 & tiện ích cao cấp",
      "Đã bàn giao, vận hành ổn định",
      "Thị trường thứ cấp phân khúc luxury",
    ],
    facts: [
      { label: "Vị trí", value: "Bình Thạnh, TP.HCM" },
      { label: "Loại hình", value: "Căn hộ cao cấp" },
      { label: "Trạng thái", value: "Đã bàn giao" },
      { label: "Chủ đầu tư", value: "Vinhomes (VinGroup)" },
      { label: "Phân khúc", value: "Cao cấp – luxury" },
      { label: "Điểm nhấn", value: "Landmark 81 & công viên" },
    ],
    coverImage:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=1200&q=80",
      "https://images.unsplash.com/photo-1567496898669-ee935f754782?w=1200&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=80",
    ],
    featured: false,
    order: 6,
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured).sort((a, b) => a.order - b.order);
}

export function getAllProjects(): Project[] {
  return [...projects].sort((a, b) => a.order - b.order);
}
