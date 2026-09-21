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
  content: string[];
}

export const articles: Article[] = [
  {
    slug: "tong-quan-vinhomes-sai-gon-park",
    title: "Tổng quan Vinhomes Sài Gòn Park: định vị đô thị xanh phía Đông TP.HCM",
    excerpt:
      "Giới thiệu khái quát vị trí, định vị sản phẩm và những điểm cần theo dõi khi Vinhomes Sài Gòn Park chuẩn bị lộ diện trên thị trường.",
    projectSlug: "vinhomes-sai-gon-park",
    publishedAt: "2026-08-12",
    coverImage:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=80",
    tags: ["Tổng quan", "Sài Gòn Park", "Khu Đông"],
    readingMinutes: 6,
    featured: true,
    content: [
      "Vinhomes Sài Gòn Park đang là cái tên được cộng đồng bất động sản khu Đông TP. Hồ Chí Minh nhắc đến nhiều trong các diễn đàn và kênh thông tin thị trường. Với định vị đô thị xanh, dự án kỳ vọng kế thừa công thức thành công của các đại đô thị Vinhomes: công viên trung tâm, tiện ích nội khu đồng bộ và hệ sinh thái Vin.",
      "Về vị trí, khu vực phía Đông — đặc biệt là TP. Thủ Đức và vùng phụ cận — tiếp tục hưởng lợi từ hạ tầng giao thông và tốc độ đô thị hóa. Người mua ở thực thường quan tâm đến kết nối về trung tâm, trường học và bệnh viện; nhà đầu tư thì theo dõi pháp lý, tiến độ và chính sách bán hàng.",
      "Ở giai đoạn sắp mở bán, thông tin chi tiết về mật độ xây dựng, sản phẩm căn hộ/thấp tầng và giá sơ cấp thường được công bố dần. Người quan tâm nên ưu tiên nguồn chính thức từ chủ đầu tư hoặc đại lý ủy quyền, đồng thời đối chiếu với quy hoạch khu vực.",
      "Trên Vinhomes Space, chúng tôi tổng hợp góc nhìn độc lập, cập nhật bài viết và tin ngắn để bạn dễ theo dõi diễn biến dự án mà không bị nhiễu thông tin marketing quá mức.",
    ],
  },
  {
    slug: "5-yeu-to-can-xem-truoc-khi-quan-tam-sai-gon-park",
    title: "5 yếu tố cần xem trước khi quan tâm Vinhomes Sài Gòn Park",
    excerpt:
      "Pháp lý, hạ tầng, sản phẩm, tiện ích và khả năng thanh khoản — checklist thực tế cho người mua lần đầu.",
    projectSlug: "vinhomes-sai-gon-park",
    publishedAt: "2026-09-01",
    coverImage:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&q=80",
    tags: ["Tư vấn", "Checklist", "Sài Gòn Park"],
    readingMinutes: 7,
    featured: true,
    content: [
      "Trước khi đặt chỗ hay đăng ký nhận bảng hàng, hãy làm rõ năm nhóm yếu tố sau. Thứ nhất là pháp lý và tiến độ phê duyệt — đây là nền tảng an toàn cho mọi giao dịch bất động sản hình thành trong tương lai.",
      "Thứ hai là hạ tầng kết nối: đường vào dự án, giao thông công cộng, thời gian di chuyển đến nơi làm việc. Khu Đông có nhiều lợi thế nhưng cũng cần kiểm tra thực tế vào giờ cao điểm.",
      "Thứ ba là cơ cấu sản phẩm: diện tích, số phòng, hướng view và chính sách thanh toán. Thứ tư là tiện ích vận hành thực tế — không chỉ phối cảnh. Thứ năm là thanh khoản thứ cấp và chi phí sở hữu (phí quản lý, thuế, lãi vay).",
      "Checklist này không thay thế tư vấn pháp lý chuyên sâu, nhưng giúp bạn đặt đúng câu hỏi khi làm việc với tư vấn viên bán hàng.",
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
