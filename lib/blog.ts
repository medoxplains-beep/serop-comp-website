export type Post = {
  slug: string
  title: string
  titleAr: string
  excerpt: string
  excerptAr: string
  date: string
  readTime: string
  readTimeAr: string
  category: string
  categoryAr: string
  image: string
  content: string[]
  contentAr: string[]
}

export const posts: Post[] = [
  {
    slug: "how-to-choose-air-receiver",
    title: "How to Choose the Right Air Receiver Tank",
    titleAr: "كيف تختار خزان الهواء المناسب",
    excerpt:
      "A practical guide to selecting capacity, working pressure, finish, and layout for compressed-air receiver tanks.",
    excerptAr:
      "دليل عملي لاختيار السعة وضغط التشغيل والتشطيب والتصميم المناسب لخزانات الهواء المضغوط.",
    date: "2026-01-18",
    readTime: "6 min read",
    readTimeAr: "6 دقائق قراءة",
    category: "Engineering",
    categoryAr: "الهندسة",
    image: "/images/tanks/vertical-3000-blue.webp",
    content: [
      "Choosing an air receiver is not only about volume. The correct tank must match compressor output, working pressure, installation space, operating environment, and documentation requirements.",
      "For standard compressed-air systems, SEROP COMP manufactures vertical and horizontal receivers with common working pressure around 11 bar, plus custom configurations for higher-pressure applications up to 42 bar depending on specification.",
      "Finish selection matters. Painted and epoxy systems suit many indoor and outdoor industrial installations, while hot-dip galvanized vessels are better for humid, coastal, or corrosive environments.",
      "Before ordering, prepare the required capacity, working pressure, test pressure expectation, connection layout, drain requirements, inspection openings, finish, quantity, and destination. This allows the engineering team to quote accurately and avoid delays.",
    ],
    contentAr: [
      "اختيار خزان الهواء لا يعتمد على السعة فقط. الخزان الصحيح يجب أن يناسب قدرة الضاغط وضغط التشغيل ومساحة التركيب وبيئة العمل ومتطلبات التوثيق.",
      "في أنظمة الهواء المضغوط القياسية، تصنع SEROP COMP خزانات رأسية وأفقية بضغط تشغيل شائع حول 11 بار، مع إمكانية تنفيذ تكوينات مخصصة لتطبيقات الضغط العالي حتى 42 بار حسب المواصفة.",
      "اختيار التشطيب مهم. الدهان وأنظمة الإيبوكسي مناسبة لكثير من التركيبات الصناعية الداخلية والخارجية، بينما تكون الجلفنة بالغمر الساخن أفضل للبيئات الرطبة أو الساحلية أو المعرضة للتآكل.",
      "قبل طلب عرض السعر، جهز السعة المطلوبة وضغط التشغيل وضغط الاختبار المتوقع وتوزيع المخارج ومتطلبات التصريف وفتحات الفحص والتشطيب والكمية ووجهة الشحن. هذا يساعد الفريق الهندسي على التسعير بدقة وتجنب التأخير.",
    ],
  },
  {
    slug: "pressure-vessel-certifications",
    title: "What SEROP COMP Certifications Mean for Buyers",
    titleAr: "ماذا تعني اعتمادات SEROP COMP للمشتري",
    excerpt:
      "A clear explanation of ISO 9001, ISO 16528-1:2017, CE/PED, pressure testing, and the documents buyers should request.",
    excerptAr:
      "شرح واضح لمعنى ISO 9001 و ISO 16528-1:2017 و CE/PED واختبارات الضغط والوثائق التي يجب على المشتري طلبها.",
    date: "2026-01-08",
    readTime: "7 min read",
    readTimeAr: "7 دقائق قراءة",
    category: "Quality",
    categoryAr: "الجودة",
    image: "/images/certificates/uks-iso-16528.webp",
    content: [
      "Certification gives buyers confidence that the manufacturer follows a controlled process. For pressure vessels, the most important points are design compliance, manufacturing control, pressure testing, and traceable documentation.",
      "SEROP COMP holds ISO 9001:2015 for quality management, ISO 16528-1:2017 for boilers and pressure vessels performance requirements, and CE/PED documentation for air pressure vessels under European pressure equipment requirements.",
      "Pressure testing is central to safe delivery. Standard tanks are tested at 1.5x working pressure, and high-pressure models can be tested up to 63 bar depending on the vessel rating.",
      "When buying a tank, ask for the relevant certificate, pressure-test record, product identification, finish specification, and any export documents required by your destination market.",
    ],
    contentAr: [
      "الاعتماد يعطي المشتري ثقة أن المصنع يعمل من خلال عملية منضبطة. في أوعية الضغط، أهم النقاط هي مطابقة التصميم والتحكم في التصنيع واختبارات الضغط والوثائق القابلة للتتبع.",
      "تمتلك SEROP COMP شهادة ISO 9001:2015 لإدارة الجودة، وشهادة ISO 16528-1:2017 لمتطلبات أداء الغلايات وأوعية الضغط، ووثائق CE/PED لأوعية ضغط الهواء وفق متطلبات معدات الضغط الأوروبية.",
      "اختبار الضغط جزء أساسي من التسليم الآمن. الخزانات القياسية تختبر عند 1.5 من ضغط التشغيل، وموديلات الضغط العالي يمكن أن يصل اختبارها إلى 63 بار حسب تصنيف الوعاء.",
      "عند شراء خزان، اطلب الشهادة المناسبة وسجل اختبار الضغط وتعريف المنتج ومواصفة التشطيب وأي مستندات تصدير مطلوبة في سوق الوصول.",
    ],
  },
  {
    slug: "egypt-industrial-export",
    title: "Why Egyptian Pressure Vessels Are Ready for Export",
    titleAr: "لماذا أوعية الضغط المصرية جاهزة للتصدير",
    excerpt:
      "Egypt's industrial zones, port access, and manufacturing expertise make certified pressure equipment a strong export product.",
    excerptAr:
      "المناطق الصناعية المصرية والوصول إلى الموانئ والخبرة التصنيعية تجعل معدات الضغط المعتمدة منتجا قويا للتصدير.",
    date: "2025-12-20",
    readTime: "5 min read",
    readTimeAr: "5 دقائق قراءة",
    category: "Export",
    categoryAr: "التصدير",
    image: "/images/tanks/vertical-2000-blue.webp",
    content: [
      "Egypt has a strong position for industrial export thanks to manufacturing zones such as 10th of Ramadan City, access to regional ports, and supply chains that serve the Middle East and Africa.",
      "For pressure vessels, export readiness depends on more than the product itself. Buyers need correct packing, product identification, pressure-test documents, certificates, and clear communication before shipment.",
      "SEROP COMP supports export buyers with technical review, pressure-tested vessels, certification records, and coordination for shipment documents according to order requirements.",
      "This combination of manufacturing capability and documentation discipline helps regional buyers source compressed-air tanks and pressure vessels from Egypt with confidence.",
    ],
    contentAr: [
      "تمتلك مصر موقعا قويا للتصدير الصناعي بفضل مناطق التصنيع مثل مدينة العاشر من رمضان، والوصول إلى الموانئ الإقليمية، وسلاسل الإمداد التي تخدم الشرق الأوسط وأفريقيا.",
      "في أوعية الضغط، الجاهزية للتصدير لا تعتمد على المنتج فقط. يحتاج المشتري إلى تغليف صحيح وتعريف واضح للمنتج ومستندات اختبار الضغط والشهادات وتواصل واضح قبل الشحن.",
      "تدعم SEROP COMP مشتري التصدير من خلال المراجعة الفنية والأوعية المختبرة تحت الضغط وسجلات الاعتماد وتنسيق مستندات الشحنة حسب متطلبات الطلب.",
      "هذا الجمع بين القدرة التصنيعية والانضباط في التوثيق يساعد المشترين الإقليميين على توريد خزانات الهواء المضغوط وأوعية الضغط من مصر بثقة.",
    ],
  },
]

export function getPostBySlug(slug: string) {
  return posts.find((p) => p.slug === slug)
}
