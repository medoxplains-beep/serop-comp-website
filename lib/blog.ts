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
    titleAr: "ÙƒÙŠÙ ØªØ®ØªØ§Ø± Ø®Ø²Ø§Ù† Ø§Ù„Ù‡ÙˆØ§Ø¡ Ø§Ù„Ù…Ù†Ø§Ø³Ø¨",
    excerpt:
      "A practical guide to selecting capacity, working pressure, finish, and layout for compressed-air receiver tanks.",
    excerptAr:
      "Ø¯Ù„ÙŠÙ„ Ø¹Ù…Ù„ÙŠ Ù„Ø§Ø®ØªÙŠØ§Ø± Ø§Ù„Ø³Ø¹Ø© ÙˆØ¶ØºØ· Ø§Ù„ØªØ´ØºÙŠÙ„ ÙˆØ§Ù„ØªØ´Ø·ÙŠØ¨ ÙˆØ§Ù„ØªØµÙ…ÙŠÙ… Ø§Ù„Ù…Ù†Ø§Ø³Ø¨ Ù„Ø®Ø²Ø§Ù†Ø§Øª Ø§Ù„Ù‡ÙˆØ§Ø¡ Ø§Ù„Ù…Ø¶ØºÙˆØ·.",
    date: "2026-01-18",
    readTime: "6 min read",
    readTimeAr: "6 Ø¯Ù‚Ø§Ø¦Ù‚ Ù‚Ø±Ø§Ø¡Ø©",
    category: "Engineering",
    categoryAr: "Ø§Ù„Ù‡Ù†Ø¯Ø³Ø©",
    image: "/images/tanks/vertical-3000-blue.webp",
    content: [
      "Choosing an air receiver is not only about volume. The correct tank must match compressor output, working pressure, installation space, operating environment, and documentation requirements.",
      "For standard compressed-air systems, SEROP COMP manufactures vertical and horizontal receivers with common working pressure around 11 bar, plus custom configurations for higher-pressure applications up to 42 bar depending on specification.",
      "Finish selection matters. Painted and epoxy systems suit many indoor and outdoor industrial installations, while hot-dip galvanized vessels are better for humid, coastal, or corrosive environments.",
      "Before ordering, prepare the required capacity, working pressure, test pressure expectation, connection layout, drain requirements, inspection openings, finish, quantity, and destination. This allows the engineering team to quote accurately and avoid delays.",
    ],
    contentAr: [
      "Ø§Ø®ØªÙŠØ§Ø± Ø®Ø²Ø§Ù† Ø§Ù„Ù‡ÙˆØ§Ø¡ Ù„Ø§ ÙŠØ¹ØªÙ…Ø¯ Ø¹Ù„Ù‰ Ø§Ù„Ø³Ø¹Ø© ÙÙ‚Ø·. Ø§Ù„Ø®Ø²Ø§Ù† Ø§Ù„ØµØ­ÙŠØ­ ÙŠØ¬Ø¨ Ø£Ù† ÙŠÙ†Ø§Ø³Ø¨ Ù‚Ø¯Ø±Ø© Ø§Ù„Ø¶Ø§ØºØ· ÙˆØ¶ØºØ· Ø§Ù„ØªØ´ØºÙŠÙ„ ÙˆÙ…Ø³Ø§Ø­Ø© Ø§Ù„ØªØ±ÙƒÙŠØ¨ ÙˆØ¨ÙŠØ¦Ø© Ø§Ù„ØªØ´ØºÙŠÙ„ ÙˆÙ…ØªØ·Ù„Ø¨Ø§Øª Ø§Ù„ØªÙˆØ«ÙŠÙ‚.",
      "Ù„Ø£Ù†Ø¸Ù…Ø© Ø§Ù„Ù‡ÙˆØ§Ø¡ Ø§Ù„Ù…Ø¶ØºÙˆØ· Ø§Ù„Ù‚ÙŠØ§Ø³ÙŠØ©ØŒ ØªØµÙ†Ø¹ Ø³ÙŠØ±ÙˆØ¨ ÙƒÙˆÙ…Ø¨ Ø®Ø²Ø§Ù†Ø§Øª Ø±Ø£Ø³ÙŠØ© ÙˆØ£ÙÙ‚ÙŠØ© Ø¨Ø¶ØºØ· ØªØ´ØºÙŠÙ„ Ø´Ø§Ø¦Ø¹ Ø­ÙˆÙ„ 11 Ø¨Ø§Ø±ØŒ Ø¥Ù„Ù‰ Ø¬Ø§Ù†Ø¨ ØªÙƒÙˆÙŠÙ†Ø§Øª Ù…Ø®ØµØµØ© Ù„ØªØ·Ø¨ÙŠÙ‚Ø§Øª Ø§Ù„Ø¶ØºØ· Ø§Ù„Ø¹Ø§Ù„ÙŠ Ø­ØªÙ‰ 42 Ø¨Ø§Ø± Ø­Ø³Ø¨ Ø§Ù„Ù…ÙˆØ§ØµÙØ©.",
      "Ø§Ø®ØªÙŠØ§Ø± Ø§Ù„ØªØ´Ø·ÙŠØ¨ Ù…Ù‡Ù…. Ø§Ù„Ø¯Ù‡Ø§Ù† ÙˆØ£Ù†Ø¸Ù…Ø© Ø§Ù„Ø¥ÙŠØ¨ÙˆÙƒØ³ÙŠ Ù…Ù†Ø§Ø³Ø¨Ø© Ù„ÙƒØ«ÙŠØ± Ù…Ù† Ø§Ù„ØªØ±ÙƒÙŠØ¨Ø§Øª Ø§Ù„ØµÙ†Ø§Ø¹ÙŠØ© Ø§Ù„Ø¯Ø§Ø®Ù„ÙŠØ© ÙˆØ§Ù„Ø®Ø§Ø±Ø¬ÙŠØ©ØŒ Ø¨ÙŠÙ†Ù…Ø§ Ø§Ù„Ø¬Ù„ÙÙ†Ø© Ø¨Ø§Ù„ØºÙ…Ø± Ø§Ù„Ø³Ø§Ø®Ù† Ø£ÙØ¶Ù„ Ù„Ù„Ø¨ÙŠØ¦Ø§Øª Ø§Ù„Ø±Ø·Ø¨Ø© Ø£Ùˆ Ø§Ù„Ø³Ø§Ø­Ù„ÙŠØ© Ø£Ùˆ Ø§Ù„Ù…Ø¹Ø±Ø¶Ø© Ù„Ù„ØªØ¢ÙƒÙ„.",
      "Ù‚Ø¨Ù„ Ø·Ù„Ø¨ Ø¹Ø±Ø¶ Ø§Ù„Ø³Ø¹Ø±ØŒ Ø¬Ù‡Ø² Ø§Ù„Ø³Ø¹Ø© Ø§Ù„Ù…Ø·Ù„ÙˆØ¨Ø© ÙˆØ¶ØºØ· Ø§Ù„ØªØ´ØºÙŠÙ„ ÙˆØ¶ØºØ· Ø§Ù„Ø§Ø®ØªØ¨Ø§Ø± Ø§Ù„Ù…ØªÙˆÙ‚Ø¹ ÙˆØªÙˆØ²ÙŠØ¹ Ø§Ù„Ù…Ø®Ø§Ø±Ø¬ ÙˆÙ…ØªØ·Ù„Ø¨Ø§Øª Ø§Ù„ØªØµØ±ÙŠÙ ÙˆÙØªØ­Ø§Øª Ø§Ù„ÙØ­Øµ ÙˆØ§Ù„ØªØ´Ø·ÙŠØ¨ ÙˆØ§Ù„ÙƒÙ…ÙŠØ© ÙˆÙˆØ¬Ù‡Ø© Ø§Ù„Ø´Ø­Ù†. Ù‡Ø°Ø§ ÙŠØ³Ø§Ø¹Ø¯ Ø§Ù„ÙØ±ÙŠÙ‚ Ø§Ù„Ù‡Ù†Ø¯Ø³ÙŠ Ø¹Ù„Ù‰ Ø§Ù„ØªØ³Ø¹ÙŠØ± Ø¨Ø¯Ù‚Ø© ÙˆØªØ¬Ù†Ø¨ Ø§Ù„ØªØ£Ø®ÙŠØ±.",
    ],
  },
  {
    slug: "pressure-vessel-certifications",
    title: "What SEROP COMP Certifications Mean for Buyers",
    titleAr: "Ù…Ø§Ø°Ø§ ØªØ¹Ù†ÙŠ Ø§Ø¹ØªÙ…Ø§Ø¯Ø§Øª Ø³ÙŠØ±ÙˆØ¨ ÙƒÙˆÙ…Ø¨ Ù„Ù„Ù…Ø´ØªØ±ÙŠ",
    excerpt:
      "A clear explanation of ISO 9001, ISO 16528-1:2017, CE/PED, pressure testing, and the documents buyers should request.",
    excerptAr:
      "Ø´Ø±Ø­ ÙˆØ§Ø¶Ø­ Ù„Ù…Ø¹Ù†Ù‰ ISO 9001 ÙˆISO 16528-1:2017 ÙˆCE/PED ÙˆØ§Ø®ØªØ¨Ø§Ø±Ø§Øª Ø§Ù„Ø¶ØºØ· ÙˆØ§Ù„ÙˆØ«Ø§Ø¦Ù‚ Ø§Ù„ØªÙŠ ÙŠØ¬Ø¨ Ø¹Ù„Ù‰ Ø§Ù„Ù…Ø´ØªØ±ÙŠ Ø·Ù„Ø¨Ù‡Ø§.",
    date: "2026-01-08",
    readTime: "7 min read",
    readTimeAr: "7 Ø¯Ù‚Ø§Ø¦Ù‚ Ù‚Ø±Ø§Ø¡Ø©",
    category: "Quality",
    categoryAr: "Ø§Ù„Ø¬ÙˆØ¯Ø©",
    image: "/images/certificates/uks-iso-16528.webp",
    content: [
      "Certification gives buyers confidence that the manufacturer follows a controlled process. For pressure vessels, the most important points are design compliance, manufacturing control, pressure testing, and traceable documentation.",
      "SEROP COMP holds ISO 9001:2015 for quality management, ISO 16528-1:2017 for boilers and pressure vessels performance requirements, and CE/PED documentation for air pressure vessels under European pressure equipment requirements.",
      "Pressure testing is central to safe delivery. Standard tanks are tested at 1.5x working pressure, and high-pressure models can be tested up to 63 bar depending on the vessel rating.",
      "When buying a tank, ask for the relevant certificate, pressure-test record, product identification, finish specification, and any export documents required by your destination market.",
    ],
    contentAr: [
      "Ø§Ù„Ø§Ø¹ØªÙ…Ø§Ø¯ ÙŠØ¹Ø·ÙŠ Ø§Ù„Ù…Ø´ØªØ±ÙŠ Ø«Ù‚Ø© Ø£Ù† Ø§Ù„Ù…ØµÙ†Ø¹ ÙŠØ¹Ù…Ù„ Ù…Ù† Ø®Ù„Ø§Ù„ Ø¹Ù…Ù„ÙŠØ© Ù…Ù†Ø¶Ø¨Ø·Ø©. ÙÙŠ Ø£ÙˆØ¹ÙŠØ© Ø§Ù„Ø¶ØºØ·ØŒ Ø£Ù‡Ù… Ø§Ù„Ù†Ù‚Ø§Ø· Ù‡ÙŠ Ù…Ø·Ø§Ø¨Ù‚Ø© Ø§Ù„ØªØµÙ…ÙŠÙ…ØŒ ÙˆØ§Ù„ØªØ­ÙƒÙ… ÙÙŠ Ø§Ù„ØªØµÙ†ÙŠØ¹ØŒ ÙˆØ§Ø®ØªØ¨Ø§Ø±Ø§Øª Ø§Ù„Ø¶ØºØ·ØŒ ÙˆØ§Ù„ÙˆØ«Ø§Ø¦Ù‚ Ø§Ù„Ù‚Ø§Ø¨Ù„Ø© Ù„Ù„ØªØªØ¨Ø¹.",
      "ØªÙ…ØªÙ„Ùƒ Ø³ÙŠØ±ÙˆØ¨ ÙƒÙˆÙ…Ø¨ Ø´Ù‡Ø§Ø¯Ø© ISO 9001:2015 Ù„Ø¥Ø¯Ø§Ø±Ø© Ø§Ù„Ø¬ÙˆØ¯Ø©ØŒ ÙˆØ´Ù‡Ø§Ø¯Ø© ISO 16528-1:2017 Ù„Ù…ØªØ·Ù„Ø¨Ø§Øª Ø£Ø¯Ø§Ø¡ Ø§Ù„ØºÙ„Ø§ÙŠØ§Øª ÙˆØ£ÙˆØ¹ÙŠØ© Ø§Ù„Ø¶ØºØ·ØŒ ÙˆÙˆØ«Ø§Ø¦Ù‚ CE/PED Ù„Ø£ÙˆØ¹ÙŠØ© Ø¶ØºØ· Ø§Ù„Ù‡ÙˆØ§Ø¡ ÙˆÙÙ‚ Ù…ØªØ·Ù„Ø¨Ø§Øª Ù…Ø¹Ø¯Ø§Øª Ø§Ù„Ø¶ØºØ· Ø§Ù„Ø£ÙˆØ±ÙˆØ¨ÙŠØ©.",
      "Ø§Ø®ØªØ¨Ø§Ø± Ø§Ù„Ø¶ØºØ· Ø¬Ø²Ø¡ Ø£Ø³Ø§Ø³ÙŠ Ù…Ù† Ø§Ù„ØªØ³Ù„ÙŠÙ… Ø§Ù„Ø¢Ù…Ù†. Ø§Ù„Ø®Ø²Ø§Ù†Ø§Øª Ø§Ù„Ù‚ÙŠØ§Ø³ÙŠØ© ØªØ®ØªØ¨Ø± Ø¹Ù†Ø¯ 1.5 Ù…Ù† Ø¶ØºØ· Ø§Ù„ØªØ´ØºÙŠÙ„ØŒ ÙˆÙ…ÙˆØ¯ÙŠÙ„Ø§Øª Ø§Ù„Ø¶ØºØ· Ø§Ù„Ø¹Ø§Ù„ÙŠ ÙŠÙ…ÙƒÙ† Ø£Ù† ÙŠØµÙ„ Ø§Ø®ØªØ¨Ø§Ø±Ù‡Ø§ Ø¥Ù„Ù‰ 63 Ø¨Ø§Ø± Ø­Ø³Ø¨ ØªØµÙ†ÙŠÙ Ø§Ù„ÙˆØ¹Ø§Ø¡.",
      "Ø¹Ù†Ø¯ Ø´Ø±Ø§Ø¡ Ø®Ø²Ø§Ù†ØŒ Ø§Ø·Ù„Ø¨ Ø§Ù„Ø´Ù‡Ø§Ø¯Ø© Ø§Ù„Ù…Ù†Ø§Ø³Ø¨Ø© ÙˆØ³Ø¬Ù„ Ø§Ø®ØªØ¨Ø§Ø± Ø§Ù„Ø¶ØºØ· ÙˆØªØ¹Ø±ÙŠÙ Ø§Ù„Ù…Ù†ØªØ¬ ÙˆÙ…ÙˆØ§ØµÙØ© Ø§Ù„ØªØ´Ø·ÙŠØ¨ ÙˆØ£ÙŠ Ù…Ø³ØªÙ†Ø¯Ø§Øª ØªØµØ¯ÙŠØ± Ù…Ø·Ù„ÙˆØ¨Ø© ÙÙŠ Ø³ÙˆÙ‚ Ø§Ù„ÙˆØµÙˆÙ„.",
    ],
  },
  {
    slug: "egypt-industrial-export",
    title: "Why Egyptian Pressure Vessels Are Ready for Export",
    titleAr: "Ù„Ù…Ø§Ø°Ø§ Ø£ÙˆØ¹ÙŠØ© Ø§Ù„Ø¶ØºØ· Ø§Ù„Ù…ØµØ±ÙŠØ© Ø¬Ø§Ù‡Ø²Ø© Ù„Ù„ØªØµØ¯ÙŠØ±",
    excerpt:
      "Egypt's industrial zones, port access, and manufacturing expertise make certified pressure equipment a strong export product.",
    excerptAr:
      "Ø§Ù„Ù…Ù†Ø§Ø·Ù‚ Ø§Ù„ØµÙ†Ø§Ø¹ÙŠØ© Ø§Ù„Ù…ØµØ±ÙŠØ© ÙˆØ§Ù„ÙˆØµÙˆÙ„ Ù„Ù„Ù…ÙˆØ§Ù†Ø¦ ÙˆØ§Ù„Ø®Ø¨Ø±Ø© Ø§Ù„ØªØµÙ†ÙŠØ¹ÙŠØ© ØªØ¬Ø¹Ù„ Ù…Ø¹Ø¯Ø§Øª Ø§Ù„Ø¶ØºØ· Ø§Ù„Ù…Ø¹ØªÙ…Ø¯Ø© Ù…Ù†ØªØ¬Ø§ Ù‚ÙˆÙŠØ§ Ù„Ù„ØªØµØ¯ÙŠØ±.",
    date: "2025-12-20",
    readTime: "5 min read",
    readTimeAr: "5 Ø¯Ù‚Ø§Ø¦Ù‚ Ù‚Ø±Ø§Ø¡Ø©",
    category: "Export",
    categoryAr: "Ø§Ù„ØªØµØ¯ÙŠØ±",
    image: "/images/tanks/vertical-2000-blue.webp",
    content: [
      "Egypt has a strong position for industrial export thanks to manufacturing zones such as 10th of Ramadan City, access to regional ports, and supply chains that serve the Middle East and Africa.",
      "For pressure vessels, export readiness depends on more than the product itself. Buyers need correct packing, product identification, pressure-test documents, certificates, and clear communication before shipment.",
      "SEROP COMP supports export buyers with technical review, pressure-tested vessels, certification records, and coordination for shipment documents according to order requirements.",
      "This combination of manufacturing capability and documentation discipline helps regional buyers source compressed-air tanks and pressure vessels from Egypt with confidence.",
    ],
    contentAr: [
      "ØªÙ…ØªÙ„Ùƒ Ù…ØµØ± Ù…ÙˆÙ‚Ø¹Ø§ Ù‚ÙˆÙŠØ§ Ù„Ù„ØªØµØ¯ÙŠØ± Ø§Ù„ØµÙ†Ø§Ø¹ÙŠ Ø¨ÙØ¶Ù„ Ù…Ù†Ø§Ø·Ù‚ Ø§Ù„ØªØµÙ†ÙŠØ¹ Ù…Ø«Ù„ Ù…Ø¯ÙŠÙ†Ø© Ø§Ù„Ø¹Ø§Ø´Ø± Ù…Ù† Ø±Ù…Ø¶Ø§Ù†ØŒ ÙˆØ§Ù„ÙˆØµÙˆÙ„ Ø¥Ù„Ù‰ Ø§Ù„Ù…ÙˆØ§Ù†Ø¦ Ø§Ù„Ø¥Ù‚Ù„ÙŠÙ…ÙŠØ©ØŒ ÙˆØ³Ù„Ø§Ø³Ù„ Ø§Ù„Ø¥Ù…Ø¯Ø§Ø¯ Ø§Ù„ØªÙŠ ØªØ®Ø¯Ù… Ø§Ù„Ø´Ø±Ù‚ Ø§Ù„Ø£ÙˆØ³Ø· ÙˆØ£ÙØ±ÙŠÙ‚ÙŠØ§.",
      "ÙÙŠ Ø£ÙˆØ¹ÙŠØ© Ø§Ù„Ø¶ØºØ·ØŒ Ø§Ù„Ø¬Ø§Ù‡Ø²ÙŠØ© Ù„Ù„ØªØµØ¯ÙŠØ± Ù„Ø§ ØªØ¹ØªÙ…Ø¯ Ø¹Ù„Ù‰ Ø§Ù„Ù…Ù†ØªØ¬ ÙÙ‚Ø·. ÙŠØ­ØªØ§Ø¬ Ø§Ù„Ù…Ø´ØªØ±ÙŠ Ø¥Ù„Ù‰ ØªØºÙ„ÙŠÙ ØµØ­ÙŠØ­ ÙˆØªØ¹Ø±ÙŠÙ ÙˆØ§Ø¶Ø­ Ù„Ù„Ù…Ù†ØªØ¬ ÙˆÙ…Ø³ØªÙ†Ø¯Ø§Øª Ø§Ø®ØªØ¨Ø§Ø± Ø§Ù„Ø¶ØºØ· ÙˆØ§Ù„Ø´Ù‡Ø§Ø¯Ø§Øª ÙˆØªÙˆØ§ØµÙ„ ÙˆØ§Ø¶Ø­ Ù‚Ø¨Ù„ Ø§Ù„Ø´Ø­Ù†.",
      "ØªØ¯Ø¹Ù… Ø³ÙŠØ±ÙˆØ¨ ÙƒÙˆÙ…Ø¨ Ù…Ø´ØªØ±ÙŠ Ø§Ù„ØªØµØ¯ÙŠØ± Ù…Ù† Ø®Ù„Ø§Ù„ Ø§Ù„Ù…Ø±Ø§Ø¬Ø¹Ø© Ø§Ù„ÙÙ†ÙŠØ© ÙˆØ§Ù„Ø£ÙˆØ¹ÙŠØ© Ø§Ù„Ù…Ø®ØªØ¨Ø±Ø© ØªØ­Øª Ø§Ù„Ø¶ØºØ· ÙˆØ³Ø¬Ù„Ø§Øª Ø§Ù„Ø§Ø¹ØªÙ…Ø§Ø¯ ÙˆØªÙ†Ø³ÙŠÙ‚ Ù…Ø³ØªÙ†Ø¯Ø§Øª Ø§Ù„Ø´Ø­Ù†Ø© Ø­Ø³Ø¨ Ù…ØªØ·Ù„Ø¨Ø§Øª Ø§Ù„Ø·Ù„Ø¨.",
      "Ù‡Ø°Ø§ Ø§Ù„Ø¬Ù…Ø¹ Ø¨ÙŠÙ† Ø§Ù„Ù‚Ø¯Ø±Ø© Ø§Ù„ØªØµÙ†ÙŠØ¹ÙŠØ© ÙˆØ§Ù„Ø§Ù†Ø¶Ø¨Ø§Ø· ÙÙŠ Ø§Ù„ØªÙˆØ«ÙŠÙ‚ ÙŠØ³Ø§Ø¹Ø¯ Ø§Ù„Ù…Ø´ØªØ±ÙŠÙ† Ø§Ù„Ø¥Ù‚Ù„ÙŠÙ…ÙŠÙŠÙ† Ø¹Ù„Ù‰ ØªÙˆØ±ÙŠØ¯ Ø®Ø²Ø§Ù†Ø§Øª Ø§Ù„Ù‡ÙˆØ§Ø¡ Ø§Ù„Ù…Ø¶ØºÙˆØ· ÙˆØ£ÙˆØ¹ÙŠØ© Ø§Ù„Ø¶ØºØ· Ù…Ù† Ù…ØµØ± Ø¨Ø«Ù‚Ø©.",
    ],
  },
]

export function getPostBySlug(slug: string) {
  return posts.find((p) => p.slug === slug)
}
