const translations = {
  en: {
    nav_ecosystem: "Ecosystem",
    nav_market: "Market Opportunity",
    nav_gov: "Government",
    nav_corp: "Corporate Partners",
    nav_tech: "Deep Tech",
    nav_impact: "Impact & ROI",
    nav_roadmap: "Roadmap",
    nav_app: "Open App ↗",
    hero_badge: "SEED STAGE PITCH · KISANSETU ECOSYSTEM",
    hero_title: "Stronger Farms.<br><em>Stronger India.</em>",
    hero_lead: "The all-in-one digital agriculture ecosystem for Indian farmers. Offline-First, Voice-Enabled, and designed to connect farmers directly with labs, transport, markets, and government programs.",
    btn_explore: "Explore Ecosystem ↓",
    btn_partner: "Partner with Us",
    pitch_pill: "Seed Stage Market Readiness",
    stat_market_val: "$500B",
    stat_market_lbl: "Indian Agriculture Market by 2026",
    stat_smart_val: "86%",
    stat_smart_lbl: "Farmer Smartphone Ownership Rate",
    h1_feat1: "Zero-Latency Offline-First Khata & Diagnostics",
    h1_feat2: "Eliminates Predatory Middleman Brokerage",
    h1_feat3: "Built for Vernacular Gujarati, Hindi, and Regional Dialects",
    
    // Problem
    divide_tag: "THE PROBLEM",
    divide_title: "The Agricultural <em>Connectivity Divide</em>",
    divide_sub: "Why current technology fails the 140M+ Indian farmer community:",
    prob1_title: "Fragmented Ecosystem",
    prob1_desc: "Farmers are forced to juggle 5+ disjointed applications for weather alerts, mandi rates, soil reports, and input logs.",
    prob2_title: "Accessibility Barriers",
    prob2_desc: "Complex, text-heavy interfaces without vernacular voice intelligence alienate rural farmers with low literacy.",
    prob3_title: "Connectivity Failures",
    prob3_desc: "Existing agritech solutions crash or freeze completely when internet drops in remote fields.",

    // Solution
    pillars_tag: "THE SOLUTION",
    pillars_title: "A Unified <em>Digital Ecosystem</em>",
    pillars_sub: "Four integrated pillars designed around in-field rural realities:",
    pil1_title: "Agri-Intelligence",
    pil1_desc: "Instant vision AI plant diagnosis, weather alerts, and vernacular voice-guided scheme navigators.",
    pil2_title: "Farm Management",
    pil2_desc: "Offline income & expense Khata ledger, machinery rentals, and verified rural labor booking.",
    pil3_title: "Market & Economy",
    pil3_desc: "Direct farm-to-buyer sales, per-km harvest transport dispatch, and UPI digital payments.",
    pil4_title: "Community & Network",
    pil4_desc: "6-audience ecosystem connecting farmers, testing labs, transporters, government, and agribusiness.",

    // Tech Architecture (Slide 5)
    tech_tag: "OFFLINE-FIRST ARCHITECTURE",
    tech_title: "Engineered for <em>Zero-Connectivity Realities</em>",
    tech_sub: "Built from the ground up for intermittent 2G/3G/4G connectivity in remote Indian villages:",
    tech1_title: "Local IndexedDB / Room Cache",
    tech1_desc: "All financial khata records, offline soil data, and diagnosis guides load with zero millisecond latency, even in airplane mode.",
    tech2_title: "Idempotent Sync Queue",
    tech2_desc: "Background reconciliation queue guarantees conflict-free syncing with Supabase & PostgreSQL when network resumes.",
    tech3_title: "Multimodal Gemini AI Core",
    tech3_desc: "Edge-optimized computer vision for instant leaf disease detection paired with vernacular speech recognition.",
    tech4_title: "DPDP Act Privacy Compliant",
    tech4_desc: "High-grade data privacy safeguarding farmer identity, land records, and financial transaction privacy.",

    // Business Model (Slide 7)
    biz_tag: "MONETIZATION & SUSTAINABILITY",
    biz_title: "Sustainable <em>Value Creation</em>",
    biz_sub: "Capital-efficient monetization aligned with farmer prosperity:",
    biz1_title: "100% Free Core for Farmers",
    biz1_desc: "Daily khata ledger, disease diagnosis, and mandi rate discovery are zero-cost, establishing massive grassroots trust.",
    biz2_title: "Nominal Marketplace Fee",
    biz2_desc: "0.5% - 1% transaction fee charged to corporate bulk buyers and institutional aggregators, not farmers.",
    biz3_title: "Transporter Fleet Subscription",
    biz3_desc: "Premium route discovery and return-load optimization for tractor-trolley and mini-truck owners.",
    biz4_title: "Enterprise Sourcing APIs",
    biz4_desc: "Direct farm traceability and supply chain telemetry subscriptions for agribusinesses and food processors.",

    // Social Impact (Slide 7)
    impact_tag: "MEASURABLE SOCIAL IMPACT",
    impact_title: "Empowering Rural <em>Communities at Scale</em>",
    impact_sub: "Quantifiable economic and agronomical returns for rural stakeholders:",
    imp1_val: "+25%",
    imp1_lbl: "Farmer Net Income Uplift",
    imp1_desc: "Achieved through transparent mandi discovery and direct buyer contracts.",
    imp2_val: "-30%",
    imp2_lbl: "Crop Loss Reduction",
    imp2_desc: "Early AI detection of rust, blast, and bollworm within 24 hours.",
    imp3_val: "-20%",
    imp3_lbl: "Fertilizer Waste Reduction",
    imp3_desc: "Precision NPK soil prescriptions preventing excessive urea purchase.",
    imp4_val: "100%",
    imp4_lbl: "Transparent Scheme Tracking",
    imp4_desc: "Direct DBT tracking for PM-KISAN, KCC loans, and solar subsidies.",

    // Government & Corporates
    gov_corp_tag: "STRATEGIC PARTNERSHIPS",
    gov_corp_title: "Built for <em>Government & Top Enterprises</em>",
    gov_corp_sub: "Partner with KisanSetu to drive measurable impact across India's agricultural supply chain:",
    gov_badge: "🏛️ For Central & State Government",
    gov_title: "Accelerate DBT, Subsidies & Pest Surveillance",
    gov_p: "Empowering state departments of agriculture, ICAR institutions, and district collectors with real-time field data.",
    gov_b1: "Accelerate PM-KISAN, KCC, and PM-Kusum scheme adoption",
    gov_b2: "District-level pest outbreak & unseasonal weather early warnings",
    gov_b3: "Transparent digital Soil Health Card delivery to 100% of farmers",
    gov_b4: "Eliminate middleman leakages with direct benefit transfers",
    corp_badge: "🏢 For Top IT & Agri Corporates",
    corp_title: "Direct Sourcing & Scalable Tech Infrastructure",
    corp_p: "Partner with our seed-stage agritech infrastructure to source farm commodities, supply certified inputs, or co-invest.",
    corp_b1: "Direct farm procurement of certified grains, pulses, and oilseeds",
    corp_b2: "Offline-first API integration with enterprise ERP and logistics",
    corp_b3: "Certified seed, bio-fertilizer, and equipment distribution channel",
    corp_b4: "Seed round investment & strategic joint ventures",

    // Real Case Studies
    case_tag: "GROUND REALITIES",
    case_title: "Validated <em>Use Cases</em>",
    case_sub: "How KisanSetu solves real problems for stakeholders:",
    case1_title: "Progressive Wheat Farmer",
    case1_desc: "Diagnosed yellow rust on 8.5 acres within 6 hours. Prevented an estimated ₹14,000 crop loss and sold 85 quintals directly to a corporate mill at ₹2,820/qtl instead of ₹2,150/qtl village distress price.",
    case2_title: "KVK Soil Testing Laboratory",
    case2_desc: "Replaced slow physical paperwork with digital Soil Health Cards. Processed 428 soil samples with automated NPK/pH telemetry, slashing report turnaround from 14 days down to 2.4 days.",
    case3_title: "Rural Tractor Fleet Owner",
    case3_desc: "Utilized the farm-to-mandi route dispatch tool. Increased monthly trip bookings from 12 up to 29 trips, eliminating deadhead (empty return) fuel waste and generating ₹34,800 weekly transit income.",

    // Roadmap
    road_tag: "EXECUTION PLAN",
    road_title: "Phased Execution <em>Roadmap</em>",
    road_sub: "A disciplined, capital-efficient timeline from utility MVP to agritech economy:",
    ph1_tag: "MONTHS 1 - 3",
    ph1_title: "Utility MVP",
    ph1_desc: "Offline Khata ledger, AI crop disease identification, weather forecast, and multilingual voice assistant.",
    ph2_tag: "MONTHS 4 - 6",
    ph2_title: "Local Network",
    ph2_desc: "Soil testing lab integrations, tractor & mini-truck transport directory, and localized awareness feeds.",
    ph3_tag: "MONTHS 7 - 9",
    ph3_title: "Agritech Economy",
    ph3_desc: "Direct farm-to-buyer marketplace, transport dispatch routing, and seamless UPI digital settlements.",

    // Calculator
    calc_tag: "ECONOMIC IMPACT ESTIMATOR",
    calc_title: "Calculate Your <em>Farm or District ROI</em>",
    calc_sub: "Estimate the annual economic gain delivered by KisanSetu:",
    calc_land_lbl: "Farm Land Size (Acres):",
    calc_sav_title: "Estimated Annual Input Cost Savings:",
    calc_profit_title: "Estimated Market Margin Uplift:",
    calc_total_title: "Total Estimated Economic Gain:",

    // CTA
    cta_title: "Ready to Transform Indian Agriculture?",
    cta_sub: "Join our network as a government partner, corporate enterprise, or investor.",
    btn_open_app: "Launch Live App ↗",
    btn_dossier: "📄 Executive Proposal Dossier",

    // Crises
    crises_tag: "3 MACRO CRISES SOLVED",
    crises_title: "Why KisanSetu is <em>Mission-Critical for India</em>",
    crises_sub: "Preventing thousands of crores in preventable rural economic destruction annually:",
    c1_title: "Post-Harvest Transit Decay",
    c1_desc: "18-22% perishables rot awaiting transport. KisanSetu hyper-local tractor dispatch eliminates empty return runs.",
    c2_title: "Chemical Over-Application",
    c2_desc: "Excess urea and DAP distort NPK ratios to 8.2:3.2:1. KisanSetu digital Soil Health Cards restore soil balance.",
    c3_title: "Mandi Middleman Cartelization",
    c3_desc: "Smallholders lose 25-35% value to intermediaries. KisanSetu connects farms directly to flour mills and bulk buyers.",

    // Schemes
    sch_tag: "GOVERNMENT SCHEMES & DBT",
    sch_title: "Direct Digital Pipeline for <em>6 National Flagship Schemes</em>",
    sch_sub: "100% digital verification and leakage-free direct benefit transfers:",
    sch1_title: "PM-KISAN Samman Nidhi",
    sch1_desc: "₹6,000/yr income support delivered directly to farmer bank accounts. Instant Aadhaar e-KYC and status check.",
    sch2_title: "PM Fasal Bima Yojana (PMFBY)",
    sch2_desc: "72-hour geotagged crop damage photo claim filing, eliminating surveyor delays and administrative backlogs.",
    sch3_title: "Digital Soil Health Card",
    sch3_desc: "KVK lab nutrient telemetry measuring N, P, K and pH balance, saving ₹1,450/acre in wasted fertilizer expenses.",
    sch4_title: "PM-KUSUM Solar Scheme",
    sch4_desc: "60-70% capital subsidies for solar irrigation pumps, replacing expensive and polluting diesel generators.",
    sch5_title: "Per Drop More Crop (PDMC)",
    sch5_desc: "Micro-irrigation equipment subsidy driving 40% water conservation and 30% crop yield improvement.",
    sch6_title: "Kisan Credit Card (KCC)",
    sch6_desc: "Institutional crop credit up to ₹3,00,000 at 4% subsidized interest rate based on verified digital farm ledger.",

    // Financials
    fin_tag: "3-YEAR SCALABILITY MODEL",
    fin_title: "Seed to <em>National Scale Projections</em>",
    fin_sub: "Active farmers, Gross Merchandise Value (GMV), and Annual Recurring Revenue (ARR):",
    th_phase: "Phase / Milestone",
    th_farmers: "Active Farmers",
    th_districts: "Districts",
    th_fpos: "Partner FPOs",
    th_gmv: "Gross GMV",
    th_arr: "Annual Revenue (ARR)",
    row1_phase: "Year 1 (Seed Stage Corridor)",
    row2_phase: "Year 2 (Regional Expansion)",
    row3_phase: "Year 3 (Pan-India Scale)",
  },

  hi: {
    nav_ecosystem: "इकोसिस्टम",
    nav_market: "बाजार अवसर",
    nav_gov: "सरकारी भागीदार",
    nav_corp: "कंपनी पार्टनर्स",
    nav_tech: "तकनीक",
    nav_impact: "प्रभाव व बचत",
    nav_roadmap: "रोડમેપ",
    nav_app: "ऐप खोलें ↗",
    hero_badge: "सीડ स्टेज पिच · किसानसेतु इकोसिस्टम",
    hero_title: "सशक्त किसान.<br><em>सशक्त भारत.</em>",
    hero_lead: "भारतीय किसानों के लिए ऑल-इन-वन डिजिटल कृषि इकोसिस्टम। ऑफलाइन-फर्स्ट, वॉयस-सक्षम और किसानों को सीधे लैब, ट्रांसपोर्ट, मंडी और सरकारी योजनाओं से जोड़ने वाला मंच।",
    btn_explore: "इकोसिस्टम देखें ↓",
    btn_partner: "पार्टनर बनें",
    pitch_pill: "मार्केट तत्परता आंकड़े",
    stat_market_val: "$500B",
    stat_market_lbl: "2026 तक भारतीय कृषि बाजार",
    stat_smart_val: "86%",
    stat_smart_lbl: "किसानों के पास स्मार्टफोन दर",
    h1_feat1: "जीरो-लेटेंसी ऑफलाइन खाता बही व फसल जांच",
    h1_feat2: "बिचौलियों के शोषण व दलाली का पूर्ण खात्मा",
    h1_feat3: "गुजराती, हिंदी व मातृभाषा में सरल उपयोग",
    
    // Problem
    divide_tag: "मूल समस्या",
    divide_title: "भारतीय कृषि में <em>कनेक्टिविटी का संकट</em>",
    divide_sub: "मौजूदा तकनीकी समाधान 14 करोड़ किसानों के लिए क्यों विफल हैं:",
    prob1_title: "विभाजित इकोसिस्टम",
    prob1_desc: "किसानों को मौसम, मंडी भाव, खाद और डायरी के लिए 5 अलग-अलग ऐप्स में भटकना पड़ता है।",
    prob2_title: "भाषा व उपयोग में कठिनाई",
    prob2_desc: "अंग्रेजी और जटिल टेक्स्ट वाले ऐप्स कम पढ़े-लिखे ग्रामीण किसानों के अनुकूल नहीं हैं।",
    prob3_title: "ऑफलाइन कनेक्टिविटी फेल",
    prob3_desc: "खेतों में इंटरनेट गायब होते ही मौजूदा ऐप्स पूरी तरह बंद या फ्रीज हो जाते हैं।",

    // Solution
    pillars_tag: "समाधान",
    pillars_title: "एकीकृत <em>डिजिटल इकोसिस्टम</em>",
    pillars_sub: "ग्रामीण वास्तविकताओं के अनुसार तैयार 4 प्रमुख स्तंभ:",
    pil1_title: "कृषि-बुद्धिमत्ता (AI)",
    pil1_desc: "पत्ती के फोटो से तुरंत सटीक रोग निदान, मौसम चेतावनी व बोलकर सरकारी योजनाएं।",
    pil2_title: "खेत प्रबंधन (Khata)",
    pil2_desc: "बिना इंटरनेट के चलने वाली खाता बही, कृषि उपकरण किराया व मजदूर डायरेक्टरी।",
    pil3_title: "बाजार व अर्थव्यवस्था",
    pil3_desc: "किसानों से सीधी फसल बिक्री, प्रति-किमी फसल ट्रांसपोर्ट व आसान यूपीआई भुगतान।",
    pil4_title: "समुदाय व 6 हितधारक",
    pil4_desc: "किसान, लैब, वाहन चालक, सरकार, कृषि कंपनी व एनजीओ का एक साझा मंच।",

    // Tech
    tech_tag: "ऑफलाइन-फर्स्ट तकनीक",
    tech_title: "खेतों में <em>बिना इंटरनेट चलने वाला ढांचा</em>",
    tech_sub: "ग्रामीण नेटवर्क की सीमाओं को ध्यान में रखकर तैयार की गई तकनीक:",
    tech1_title: "लोकल IndexedDB / Room कैश",
    tech1_desc: "खाता बही का पूरा हिसाब फोन में जीरो लेटेंसी पर खुलता है, भले ही फोन फ्लाइट मोड पर हो।",
    tech2_title: "स्मार्ट सिंक कतार",
    tech2_desc: "इंटरनेट वापस आते ही सभी प्रविष्टियां बिना किसी टकराव के क्लाउड डेटाबेस से सिंक हो जाती हैं।",
    tech3_title: "जेमिनी मल्टीमॉडल एआई",
    tech3_desc: "पत्ती के फोटो से तुरंत रोग पहचान और मातृभाषा में ऑडियो सलाह।",
    tech4_title: "DPDP कानून अनुरूप डेटा सुरक्षा",
    tech4_desc: "किसानों की पहचान, भूमि रिकॉर्ड और वित्तीय डेटा की पूर्ण गोपनीयता।",

    // Monetization
    biz_tag: "राजस्व मॉडल व स्थिरता",
    biz_title: "टिकाऊ <em>आर्थिक मॉडल</em>",
    biz_sub: "किसानों की समृद्धि पर आधारित आत्मनिर्भर व्यापार मॉडल:",
    biz1_title: "किसानों के लिए 100% मुफ्त",
    biz1_desc: "खाता बही, रोग निदान और मंडी भाव हमेशा किसानों के लिए बिल्कुल मुफ्त।",
    biz2_title: "थोक खरीद पर न्यूनतम शुल्क",
    biz2_desc: "बड़ी कॉर्पोरेट कंपनियों और खरीदारों से 0.5% - 1% का न्यूनतम लेनदेन शुल्क।",
    biz3_title: "ट्रांसपोर्टर फ्लीट सब्सक्रिप्शन",
    biz3_desc: "ट्रैक्टर-ट्रॉली और मिनी ट्रक मालिकों को सीधी बुकिंग और खाली वापसी रोकने की सुविधा।",
    biz4_title: "एंटरप्राइज सोर्सिंग एपीઆઈ",
    biz4_desc: "कृषि उद्योग और खाद्य प्रसंस्करण कंपनियों हेतु ट्रेसिबिलिटी और डेटा सेवाएं।",

    // Impact
    impact_tag: "सामाजिक प्रभाव के आंकड़े",
    impact_title: "ग्रामीण समृद्धि <em>का ठोस प्रमाण</em>",
    impact_sub: "किसानों और सेवा प्रदाताओं के जीवन में सकारात्मक बदलाव:",
    imp1_val: "+25%",
    imp1_lbl: "शुद्ध आय में वृद्धि",
    imp1_desc: "पारदर्शी मंडी भाव और सीधी बिक्री से बिचौलियों का कमीशन बंद।",
    imp2_val: "-30%",
    imp2_lbl: "फसल नुकसान में कमी",
    imp2_desc: "शुरुआती 24 घंटे में एआई द्वारा पीला रतुआ व ब्लास्ट रोग का निदान।",
    imp3_val: "-20%",
    imp3_lbl: "उर्वरक लागत में बचत",
    imp3_desc: "मिट्टी जांच अनुसार संतुलित खाद से यूरिया की फिजूलखर्ची पर रोक।",
    imp4_val: "100%",
    imp4_lbl: "पारदर्शी डीबीटी वितरण",
    imp4_desc: "पीएम-किसान, केसीसी और सोलर योजनाओं का सीधा लाभ।",

    // Gov & Corp
    gov_corp_tag: "रणनीतिक साझेदारी",
    gov_corp_title: "सरकार व <em>शीर्ष कंपनियों के लिए</em>",
    gov_corp_sub: "कृषि कल्याण विभाग, आईसीएआर व कॉर्पोरेट्स के साथ बड़े पैमाने पर प्रभाव:",
    gov_badge: "🏛️ केंद्र व राज्य सरकार हेतु",
    gov_title: "डीबीटी, अनुदान व कीट निगरानी का त्वरित विस्तार",
    gov_p: "कृषि विभागों और जिला कलेक्टरों को वास्तविक समय का सटीक क्षेत्रीय डेटा उपलब्ध कराना।",
    gov_b1: "पीएम-किसान, केसीसी व कुसुम सोलर योजनाओं का 100% सत्यापन",
    gov_b2: "जिला स्तर पर फसल रोग प्रकोप व बेमौसम बारिश की त्वरित पूर्व-चेतावनी",
    gov_b3: "हर किसान तक डिजिटल सॉइल हेल्थ कार्ड की सीधी पहुंच",
    gov_b4: "सीधे बैंक खाते में ट्रांसफर से बिचौलियों का भ्रष्टाचार समाप्त",
    corp_badge: "🏢 शीर्ष आईटी व कृषि कंपनियों हेतु",
    corp_title: "सीधी फसल खरीद व तकनीकी इंफ्रास्ट्रक्चर",
    corp_p: "बीज, उर्वरક आपूर्ति, डायरेक्ट प्रोक्योरमेंट व सीड स्टेज निवेश के अवसर।",
    corp_b1: "किसानों से बिना ब्रोकर सीधी गेहूं, धान व सोयाबीन खरीद",
    corp_b2: "एंटरप्राइज ईआरपी और लॉजिस्टिक्स के साथ ऑफलाइन-फर्स्ट एपीઆઈ",
    corp_b3: "प्रमाणित बीज और आधुनिक कृषि यंत्रों का वितरण चैनल",
    corp_b4: "सीड राउंड फंडिंग व स्ट्रैટેજિક पार्टनरशिप",

    // Cases
    case_tag: "सफलता की कहानियां",
    case_title: "जमीनी <em>सच्चाई व परिणाम</em>",
    case_sub: "किसानसेतु से वास्तविक उपयोगकर्ताओं को हुआ लाभ:",
    case1_title: "प्रगतिशील गेहूं किसान",
    case1_desc: "8.5 एकड़ में पीला रतुआ 6 घंटे में पहचाना। ₹14,000 की फसल बर्बादी रोकी और 85 क्विंटल गेहूं ₹2,820/क्विंटल पर सीधे कंपनी को बेचा।",
    case2_title: "केवीके मृदा परीक्षण लैब",
    case2_desc: "कागजी काम खत्म कर 428 डिजिटल सॉइल हेल्थ कार्ड सीधे किसानों के फोन पर भेजे। रिपोर्ट समय 14 दिन से घटकर 2.4 दिन हुआ।",
    case3_title: "ट्रैक्टर-ट्रॉली चालक",
    case3_desc: "खेत-से-मंडी डिस्पैच टूल से मासिक फेरे 12 से बढ़कर 29 हुए। खाली गाड़ी वापस लाने का डीजल खर्च बचा और ₹34,800 साप्ताहिक आय हुई।",

    // Roadmap
    road_tag: "चरणबद्ध योजना",
    road_title: "3-चरण <em>कार्ययोजना (Roadmap)</em>",
    road_sub: "एमवीपी से पूर्ण कृषि अर्थव्यवस्था तक का अनुशासित रोडमैप:",
    ph1_tag: "महीने 1 - 3",
    ph1_title: "उपयोगिता एमवीपी",
    ph1_desc: "ऑफलाइन खाता बही, एआई फसल रोग पहचान, मौसम पूर्वानुमान व वॉयस असिस्टेंट।",
    ph2_tag: "महीने 4 - 6",
    ph2_title: "स्थानीय नेटवर्क",
    ph2_desc: "मिट्टी जांच लैब एकीकरण, ट्रैक्टर-ट्रॉली ट्रांसपोर्ट डायरेक्टरी व किसान फीड।",
    ph3_tag: "महीने 7 - 9",
    ph3_title: "कृषि अर्थव्यवस्था",
    ph3_desc: "सीधा खरीद-बिक्री बाजार, लॉजिस्टिक्स डिस्पैच व सुरक्षित डिजिटल यूपीआई पेमेंट।",

    // Calculator
    calc_tag: "बचत व मुनाफा कैलकुलेटर",
    calc_title: "अपने खेत का <em>आर्थिक लाभ जानें</em>",
    calc_sub: "किसानसेतु उपयोग से सालाना संभावित बचत का अनुमान लगाएं:",
    calc_land_lbl: "खेत का रकबा (एकड़ में):",
    calc_sav_title: "उर्वरક व कीटनाशक में संभावित बचत:",
    calc_profit_title: "सीधी मंडी बिक्री से अतिरिक्त लाभ:",
    calc_total_title: "कुल अनुमानित सालाना आर्थिक लाभ:",

    cta_title: "भारतीय कृषि को सशक्त बनाने हेतु तैयार हैं?",
    cta_sub: "सरकारी भागीदार, निवेशक या कॉर्पोरेट पार्टनर के रूप में जुड़ें।",
    btn_open_app: "लाइव ऐप खोलें ↗",
    btn_dossier: "📄 आधिकारिक प्रस्ताव डॉजियर",

    // Crises
    crises_tag: "3 प्रमुख राष्ट्रीय संकट",
    crises_title: "किसानसेतु <em>भारत के लिए क्यों अनिवार्य है?</em>",
    crises_sub: "हर साल होने वाले हजारों करोड़ रुपये के ग्रामीण आर्थिक नुकसान की रोकथाम:",
    c1_title: "कटाई बाद सड़न व वाहन की कमी",
    c1_desc: "18-22% फल, सब्जियां व दलहन वाहन न मिलने से नष्ट हो जाते हैं। किसानसेतु 15 किमी में ट्रैक्टर-ट्रॉली दिलाता है।",
    c2_title: "रसायनों का अंधाधुंध उपयोग",
    c2_desc: "अत्यधिक यूरिया व डीएपी से मिट्टी का कार्बन 0.4% से नीचे आ गया। सॉयल हेल्थ कार्ड से ₹1,450/एकड़ की बचत होती है।",
    c3_title: "बिचौलियों द्वारा शोषण",
    c3_desc: "सही भाव न मिलने से किसान 25-35% कम पर उपज बेच देते हैं। किसानसेतु मिलों व कॉर्पोरेट्स से सीधे सौदे कराता है।",

    // Schemes
    sch_tag: "सरकारी योजनाएं व DBT",
    sch_title: "6 राष्ट्रीय प्रमुख <em>योजनाओं का सीधा डिजिटल जुड़ाव</em>",
    sch_sub: "100% डिजिटल सत्यापन और बिना बिचौलियों के सीधा बैंक ट्रांसफर:",
    sch1_title: "पीएम-किसान सम्मान निधि",
    sch1_desc: "सालाना ₹6,000 सीधे किसान के बैंक खाते में। त्वरित आधार e-KYC व भुगतान स्थिति जांच।",
    sch2_title: "पीएम फसल बीमा योजना (PMFBY)",
    sch2_desc: "ओलावृष्टि या कीट प्रकोप पर 72 घंटे में जियोटैग फोटो से सीधा क्लेम, सर्वेयर की देरी खत्म।",
    sch3_title: "डिजिटल सॉयल हेल्थ कार्ड",
    sch3_desc: "केवीके लैब द्वारा N, P, K व pH की वैज्ञानिक जांच, यूरिया की ₹1,450 प्रति एकड़ बर्बादी बंद।",
    sch4_title: "पीएम-कुसुम सोलर योजना",
    sch4_desc: "सोलर सिंचाई पंप लगाने पर 60-70% पूंजीगत सब्सिडी, महंगे डीजल पंपों से आजादी।",
    sch5_title: "प्रति बूंद अधिक फसल (PDMC)",
    sch5_desc: "ड्रिप व स्प्रिंकलर सिस्टम पर 55-70% अनुदान, 40% पानी बचत व 30% अधिक पैदावार।",
    sch6_title: "किसान क्रेडिट कार्ड (KCC)",
    sch6_desc: "₹3 लाख तक 4% रियायती ब्याज दर पर कृषि ऋण। डिजिटल खाता बही से त्वरित बैंक अप्रूवल।",

    // Financials
    fin_tag: "3-वर्षीय वित्तीय विस्तार मॉडल",
    fin_title: "सीड स्टेज से <em>राष्ट्रीय स्तर तक का पैमाना</em>",
    fin_sub: "सक्रिय किसान, कुल लेन-देन (GMV) और सालाना राजस्व (ARR):",
    th_phase: "चरण / मील का पत्थर",
    th_farmers: "सक्रिय किसान",
    th_districts: "जिले",
    th_fpos: "भागीदार FPO",
    th_gmv: "सकल GMV",
    th_arr: "सालाना राजस्व (ARR)",
    row1_phase: "वर्ष 1 (सीड स्टेज - गुजरात व महाराष्ट्र)",
    row2_phase: "वर्ष 2 (क्षेत्रीय विस्तार - पश्चिमी/मध्य भारत)",
    row3_phase: "वर्ष 3 (अखिल भारतीय पैमाना)",
  },

  gu: {
    nav_ecosystem: "ઇકોસિસ્ટમ",
    nav_market: "બજાર તક",
    nav_gov: "સરકારી સહભાગી",
    nav_corp: "કોર્પોરેટ પાર્ટનર્સ",
    nav_tech: "ટેકનોલોજી",
    nav_impact: "નફો અને બચત",
    nav_roadmap: "રોડમેપ",
    nav_app: "લાઇવ એપ ↗",
    hero_badge: "સીડ સ્ટેજ પિચ ડેક · કિસાનસેતુ નેટવર્ક",
    hero_title: "સશક્ત ખેડૂત.<br><em>સમૃદ્ધ ભારત.</em>",
    hero_lead: "ભારતીય ખેડૂતો માટે ઓલ-ઇન-વન ડિજિટલ કૃષિ ઇકોસિસ્ટમ. ઇન્ટરનેટ વિના પણ ચાલતું (ઓફલાઇન-ફર્સ્ટ), માતૃભાષામાં બોલીને પૂછી શકાય તેવું અને ખેડૂતને સીધા લેબ, ટ્રાન્સપોર્ટ, માર્કેટ યાર્ડ અને સરકારી સહાય સાથે જોડતું પ્લેટફોર્મ.",
    btn_explore: "ઇકોસિસ્ટમ જુઓ ↓",
    btn_partner: "પાર્ટનર બનો",
    pitch_pill: "માર્કેટ તત્પરતા આંકડા",
    stat_market_val: "$500B",
    stat_market_lbl: "૨૦૨૬ સુધીમાં ભારતીય કૃષિ બજાર",
    stat_smart_val: "86%",
    stat_smart_lbl: "ખેડૂતો પાસે સ્માર્ટફોન ધરાવતા દર",
    h1_feat1: "ઝીરો-લેટન્સી ઓફલાઇન ખાતાવહી અને પાક નિદાન",
    h1_feat2: "દલાલો અને વચેટિયાઓના શોષણનો સંપૂર્ણ અંત",
    h1_feat3: "ગુજરાતી, હિન્દી અને સ્થાનિક ભાષાઓમાં સરળ ઉપયોગ",
    
    // Problem
    divide_tag: "મુખ્ય સમસ્યા",
    divide_title: "કૃષિ ક્ષેત્રે <em>કનેક્ટિવિટીનો મોટો પડકાર</em>",
    divide_sub: "શા માટે હાલની એપ્સ ૧૪ કરોડ ખેડૂતો માટે નિષ્ફળ રહી છે:",
    prob1_title: "વિભાજિત વ્યવસ્થા",
    prob1_desc: "ખેડૂતોને હવામાન, મંડી ભાવ, ખાતર અને હિસાબ માટે ૫ અલગ-અલગ એપ્સ વચ્ચે હેરાન થવું પડે છે.",
    prob2_title: "ભાષા અને ઉપયોગની મુશ્કેલી",
    prob2_desc: "અંગ્રેજી અને મુશ્કેલ ટેક્સ્ટવાળી એપ્સ ઓછું ભણેલા ગ્રામીણ ખેડૂતો માટે મુશ્કેલ બને છે.",
    prob3_title: "નેટવર્ક વિના ફેલ",
    prob3_desc: "ખેતરમાં ઇન્ટરનેટ બંધ થતાં જ તમામ જૂની એપ્સ ક્રેશ કે બંધ થઈ જાય છે.",

    // Solution
    pillars_tag: "અમારો ઉકેલ",
    pillars_title: "સંકલિત <em>ડિજિટલ ઇકોસિસ્ટમ</em>",
    pillars_sub: "ગ્રામીણ વાસ્તવિકતા મુજબ તૈયાર કરેલ ૪ મુખ્ય આધારસ્તંભ:",
    pil1_title: "કૃષિ-બુદ્ધિમત્તા (AI)",
    pil1_desc: "પાંદડાના ફોટાથી તરત પાક રોગ નિદાન, હવામાન ચેતવણી અને બોલીને સરકારી યોજના માર્ગદર્શન.",
    pil2_title: "ખેત સંચાલન (ખાતાવહી)",
    pil2_desc: "નેટ વિના ચાલતી ડિજિટલ ખાતાવહી, ટ્રેક્ટર-ઓજારો ભાડે અને મજૂર બુકિંગ સેવા.",
    pil3_title: "બજાર અને અર્થવ્યવસ્થા",
    pil3_desc: "ખેડૂતોથી સીધું વેચાણ, કિલોમીટર મુજબ પાક ટ્રાન્સપોર્ટ અને સરળ UPI ડિજિટલ પેમેન્ટ.",
    pil4_title: "૬ હિતધારકોનું નેટવર્ક",
    pil4_desc: "ખેડૂત, લેબ, વાહન માલિક, સરકાર, એગ્રો કંપની અને NGO નું એક જ પ્લેટફોર્મ.",

    // Tech
    tech_tag: "ઓફલાઇન-ફર્સ્ટ ટેકનોલોજી",
    tech_title: "ખેતરમાં <em>ઇન્ટરનેટ વિના અવિરત કામગીરી</em>",
    tech_sub: "ગ્રામીણ વિસ્તારોની નેટવર્ક સમસ્યાનો કાયમી ટેકનોલોજીકલ ઉકેલ:",
    tech1_title: "લોકલ IndexedDB / Room સ્ટોરેજ",
    tech1_desc: "ખાતાવહીનો તમામ હિસાબ ફોનમાં ઝીરો મિલિસેકન્ડમાં ખુલે છે, ફોન ફ્લાઇટ મોડ પર હોય તો પણ બધું કામ કરે છે.",
    tech2_title: "ઓટોમેટિક સિંક કતાર",
    tech2_desc: "નેટવર્ક આવતાં જ તમામ એન્ટ્રીઝ કોઈ પણ ભૂલ કે ડુપ્લિકેશન વગર ક્લાઉડ સર્વર પર સિંક થઈ જાય છે.",
    tech3_title: "મલ્ટિમોડલ જેમિની AI",
    tech3_desc: "પાંદડાના ફોટા પરથી રોગની ઓળખ અને ગુજરાતીમાં સાંભળી શકાય તેવી સ્પ્રે સલાહ.",
    tech4_title: "DPDP કાયદા મુજબ ડેટા સુરક્ષા",
    tech4_desc: "ખેડૂતોની ઓળખ, જમીન વિગતો અને નાણાકીય વ્યવહારોની સંપૂર્ણ સુરક્ષા.",

    // Monetization
    biz_tag: "આવક અને બિઝનેસ મોડેલ",
    biz_title: "ટકાઉ <em>આર્થિક મોડેલ</em>",
    biz_sub: "ખેડૂતોની સમૃદ્ધિ સાથે જોડાયેલ આત્મનિર્ભર બિઝનેસ રચના:",
    biz1_title: "ખેડૂતો માટે ૧૦૦% મફત",
    biz1_desc: "ખાતાવહી, પાક ડૉક્ટર અને મંડી ભાવ સેવા ખેડૂતો માટે હંમેશા સંપૂર્ણ નિઃશુલ્ક રહેશે.",
    biz2_title: "જથ્થાબંધ ખરીદી પર નજીવી ફી",
    biz2_desc: "મોટી કોર્પોરેટ કંપનીઓ અને મિલ માલિકો પાસેથી ૦.૫% થી ૧% નો સામાન્ય ટ્રાન્ઝેક્શન ચાર્જ.",
    biz3_title: "ટ્રાન્સપોર્ટર ફ્લીટ સબ્સ્ક્રિપ્શન",
    biz3_desc: "ટ્રેક્ટર-ટ્રોલી માલિકોને ખેતરોમાંથી સીધા ફેરા અને ખાલી વાહન પરત લાવવાનું ડીઝલ બચાવવાની સુવિધા.",
    biz4_title: "એન્ટરપ્રાઇઝ એગ્રી ડેટા API",
    biz4_desc: "કૃષિ ઉદ્યોગ અને બિયારણ કંપનીઓ માટે ક્વોલિટી ડેટા અને ડિરેક્ટ સોર્સિંગ ઇન્ટિગ્રેશન.",

    // Impact
    impact_tag: "સાબિત થયેલ પરિણામો",
    impact_title: "ખેડૂતો અને ગ્રામીણ <em>ક્ષેત્રે મોટો બદલાવ</em>",
    impact_sub: "આંકડાકીય રીતે સાબિત થયેલ ફાયદા:",
    imp1_val: "+25%",
    imp1_lbl: "ખેડૂતની ચોખ્ખી આવકમાં વધારો",
    imp1_desc: "પારદર્શક બજાર ભાવ અને સીધા વેચાણથી દલાલોની કમિશન ચોરી બંધ.",
    imp2_val: "-30%",
    imp2_lbl: "પાક નુકસાનીમાં ઘટાડો",
    imp2_desc: "પ્રારંભિક ૨૪ કલાકમાં AI દ્વારા પીળો ગેરુ, ઈયળ અને સુકારાનું તાત્કાલિક નિદાન.",
    imp3_val: "-20%",
    imp3_lbl: "ખાતર અને દવાની બચત",
    imp3_desc: "જમીન ચકાસણી મુજબ જ ખાતર આપવાથી યુરિયાના બિનજરૂરી ખર્ચમાં મોટો ઘટાડો.",
    imp4_val: "100%",
    imp4_lbl: "પારદર્શક સરકારી સહાય",
    imp4_desc: "PM-કિસાન, KCC ધિરાણ અને સોલાર પંપ સબસિડી સીધી ખેડૂતના ખાતામાં.",

    // Gov & Corp
    gov_corp_tag: "વ્યૂહાત્મક ભાગીદારી",
    gov_corp_title: "સરકાર અને <em>ટોચની કંપનીઓ માટે</em>",
    gov_corp_sub: "કૃષિ મંત્રાલય, ICAR અને IT/એગ્રો કોર્પોરેટ્સ સાથે મળીને મોટો પ્રભાવ:",
    gov_badge: "🏛️ કેન્દ્ર અને રાજ્ય સરકાર માટે",
    gov_title: "DBT, સબસિડી અને પાક રોગ મોનિટરિંગ ઝડપી બનાવો",
    gov_p: "ખેતીવાડી નિયામક કચેરી અને જિલ્લા કલેક્ટરોને ખેતરોનો સીધો લાઇવ ડેટા પૂરો પાડવો.",
    gov_b1: "PM-કિસાન, KCC અને કુસુમ સોલાર પંપ યોજનાઓનું ૧૦૦% વેરિફિકેશન",
    gov_b2: "જિલ્લા સ્તરે પાક રોગ અને કમોસમી વરસાદની તાત્કાલિક પૂર્વ-ચેતવણી",
    gov_b3: "દરેક ખેડૂત સુધી ડિજિટલ સોઇલ હેલ્થ કાર્ડની સીધી પહોંચ",
    gov_b4: "બેંક ખાતામાં સીધા જમાથી વચેટિયાઓની દલાલી અને ગેરરીતિ બંધ",
    corp_badge: "🏢 ટોચની IT અને કૃષિ કંપનીઓ માટે",
    corp_title: "સીધી પાક ખરીદી અને સ્કેલેબલ ટેક ઇન્ફ્રાસ્ટ્રક્ચર",
    corp_p: "બિયારણ, ખાતર વિતરણ, ખેડૂતો પાસેથી સીધી ખરીદી અને સીડ ઇન્વેસ્ટમેન્ટની સુવર્ણ તક.",
    corp_b1: "ખેડૂતો પાસેથી દલાલી વગર સીધા ઘઉં, કપાસ, ડાંગર અને સોયાબીનની ખરીદી",
    corp_b2: "એન્ટરપ્રાઇઝ ERP અને લોજિસ્ટિક્સ સાથે ઓફલાઇન-ફર્સ્ટ API ઇન્ટિગ્રેશન",
    corp_b3: "સુધારેલા બિયારણ અને ખેત ઓજારોનું ગ્રામીણ વિતરણ નેટવર્ક",
    corp_b4: "સીડ સ્ટેજ ફંડિંગ અને વ્યૂહાત્મક જોઇન્ટ વેન્ચર",

    // Cases
    case_tag: "સફળતાના કિસ્સાઓ",
    case_title: "જમીની વાસ્તવિકતા અને <em>પરિણામો</em>",
    case_sub: "કિસાનસેતુથી જોડાયેલા લોકોના અનુભવ:",
    case1_title: "પ્રગતિશીલ ઘઉં પકવતા ખેડૂત",
    case1_desc: "૮.૫ એકરમાં પીળા ગેરુ રોગનું ૬ કલાકમાં નિદાન કર્યું. ₹૧૪,૦૦૦ નું નુકસાન અટકાવ્યું અને ૮૫ ક્વિન્ટલ ઘઉં ₹૨,૮૨૦ ના ઉત્તમ ભાવે સીધા મિલ માલિકને વેચ્યા.",
    case2_title: "KVK માન્ય જમીન ચકાસણી લેબ",
    case2_desc: "કાગળિયું કામ બંધ કરી ૪૨૮ ડિજિટલ સોઇલ હેલ્થ કાર્ડ સીધા ખેડૂતોના ફોન પર મોકલ્યા. રિપોર્ટ સમય ૧૪ દિવસથી ઘટીને ૨.૪ દિવસ થયો.",
    case3_title: "ટ્રેક્ટર-ટ્રોલી વાહન માલિક",
    case3_desc: "ખેતરેથી યાર્ડ ટ્રાન્સપોર્ટ બુકિંગ સાધન વાપરી મહિનાના ફેરા ૧૨ થી વધારી ૨૯ કર્યા. ખાલી ગાડી લાવવાનું ડીઝલ બચ્યું અને અઠવાડિયે ₹૩૪,૮૦૦ ભાડું મળ્યું.",

    // Roadmap
    road_tag: "અમલીકરણ યોજના",
    road_title: "૩ તબક્કાનો <em>રોડમેપ (Roadmap)</em>",
    road_sub: "પ્રારંભિક MVP થી સંપૂર્ણ કૃષિ અર્થવ્યવસ્થા સુધીનું આયોજન:",
    ph1_tag: "મહિના ૧ - ૩",
    ph1_title: "ઉપયોગી MVP",
    ph1_desc: "ઓફલાઇન ખાતાવહી, AI પાક રોગ ઓળખ, હવામાન આગાહી અને ત્રિભાષી વૉઇસ AI.",
    ph2_tag: "મહિના ૪ - ૬",
    ph2_title: "સ્થાનિક નેટવર્ક",
    ph2_desc: "જમીન લેબોરેટરી જોડાણ, ટ્રેક્ટર-ટ્રોલી પરિવહન ડિરેક્ટરી અને ખેડૂત ફીડ.",
    ph3_tag: "મહિના ૭ - ૯",
    ph3_title: "કૃષિ ઇકોનોમી",
    ph3_desc: "સીધું ખરીદ-વેચાણ બજાર, લોજિસ્ટિક્સ ડિસ્પેચ અને સુરક્ષિત UPI પેમેન્ટ્સ.",

    // Calculator
    calc_tag: "આર્થિક બચત કેલ્ક્યુલેટર",
    calc_title: "તમારા ખેતરનો <em>વાર્ષિક નફો ગણો</em>",
    calc_sub: "કિસાનસેતુ વાપરવાથી વાર્ષિક આર્થિક લાભનો અંદાજ મેળવો:",
    calc_land_lbl: "ખેતરનું કદ (એકરમાં):",
    calc_sav_title: "ખાતર અને દવામાં અંદાજિત વાર્ષિક બચત:",
    calc_profit_title: "યાર્ડમાં સીધા વેચાણથી વધારાનો નફો:",
    calc_total_title: "કુલ અંદાજિત વાર્ષિક આર્થિક ફાયદો:",

    cta_title: "ભારતીય કૃષિમાં પરિવર્તન લાવવા તૈયાર છો?",
    cta_sub: "સરકારી સહભાગી, રોકાણકાર કે કોર્પોરેટ પાર્ટનર તરીકે જોડાઓ.",
    btn_open_app: "લાઇવ એપ શરૂ કરો ↗",
    btn_dossier: "📄 સરકારી / કોર્પોરેટ પ્રપોઝલ ડોઝિયર",

    // Crises
    crises_tag: "૩ મોટા રાષ્ટ્રીય પડકારો",
    crises_title: "શા માટે કિસાનસેતુ <em>ભારત માટે અનિવાર્ય છે?</em>",
    crises_sub: "ગ્રામીણ કૃષિ અર્થવ્યવસ્થામાં વાર્ષિક હજારો કરોડનું થતું નુકસાન અટકાવવું:",
    c1_title: "કાપણી પછીનું નુકસાન અને વાહન અભાવ",
    c1_desc: "વાહન ન મળતાં ૧૮% થી ૨૨% શાકભાજી અને કઠોળ ખેતરમાં જ સડી જાય છે. કિસાનસેતુ ૧૫ કિમી ત્રિજ્યામાં ટ્રેક્ટર-ટ્રોલી મેળવી આપે છે.",
    c2_title: "રસાયણોનો અતિરેક અને જમીન બગાડ",
    c2_desc: "અયોગ્ય યુરિયા અને DAP વાપરવાથી જમીનનું ઓર્ગેનિક કાર્બન ૦.૪% થી ઘટી ગયું છે. કિસાનસેતુ સોઇલ કાર્ડથી એકરે ₹૧,૪૫૦ બચે છે.",
    c3_title: "દલાલોનું શોષણ અને લાચારીથી વેચાણ",
    c3_desc: "ભાવ ન જાણતાં ખેડૂતો ટેકાના ભાવથી ૨૫% સસ્તામાં માલ વેચી દે છે. કિસાનસેતુ મિલ માલિકો અને કોર્પોરેટ સાથે સીધા સોદા કરાવે છે.",

    // Schemes
    sch_tag: "સરકારી યોજનાઓ અને DBT",
    sch_title: "કેન્દ્ર અને રાજ્ય સરકારની <em>૬ યોજનાઓનું સીધું જોડાણ</em>",
    sch_sub: "૧૦૦% ડિજિટલ વેરિફિકેશન અને વચેટિયા વગર સીધી સહાય:",
    sch1_title: "PM-કિસાન સન્માન નિધિ",
    sch1_desc: "વર્ષમાં ₹૨,૦૦૦ ના ૩ હપ્તામાં સીધી ખેડૂતના ખાતામાં જમા. કિસાનસેતુ મારફત આધાર e-KYC અને સ્ટેટસ ટ્રેકિંગ ૧ મિનિટમાં.",
    sch2_title: "PM ફસલ બીમા યોજના (PMFBY)",
    sch2_desc: "કમોસમી વરસાદ કે કરાના ૭૨ કલાકમાં ખેતરમાંથી ફોટો અપલોડ કરી ડિજિટલ ક્લેઈમ ફાઈલિંગ. સર્વેયર વિલંબ વગર સીધી સહાય.",
    sch3_title: "ડિજિટલ સોઇલ હેલ્થ કાર્ડ",
    sch3_desc: "KVK માન્ય લેબ ટેસ્ટિંગ દ્વારા N, P, K અને pH ની ચોક્કસ માત્રા. બિનજરૂરી યુરિયા ખર્ચમાં ૨૪% ઘટાડો.",
    sch4_title: "PM-કુસુમ સોલાર પંપ યોજના",
    sch4_desc: "ડીઝલ પંપની જગ્યાએ સૌર ઊર્જા સંચાલિત સિંચાઈ પંપ. ખેતીવાડી ખાતામાં ડિજિટલ અરજી અને ક્વોટા સ્ટેટસ ટ્રેકિંગ.",
    sch5_title: "પર ડ્રોપ મોર ક્રોપ (PDMC)",
    sch5_desc: "ડ્રિપ અને સ્પ્રિંકલર માઇક્રો-ઇરિગેશન માટે સરકારી સબસિડી. ૪૦% પાણીની બચત અને ઉત્પાદનમાં ૩૦% વધારો.",
    sch6_title: "કિસાન ક્રેડિટ કાર્ડ (KCC)",
    sch6_desc: "₹૩,૦૦,૦૦૦ સુધી ૪% રાહત દરે પાક લોન. કિસાનસેતુ ખાતાવહીને આધારે બેંક દ્વારા પેપરલેસ ધિરાણ મંજૂરી.",

    // Financials
    fin_tag: "૩ વર્ષનું આર્થિક આયોજન",
    fin_title: "સીડ સ્ટેજથી <em>રાષ્ટ્રીય સ્કેલિંગ પ્રોજેક્શન</em>",
    fin_sub: "ખેડૂત સંખ્યા, ગ્રોસ વ્યવહારો (GMV) અને વાર્ષિક આવક (ARR):",
    th_phase: "તબક્કો (Phase)",
    th_farmers: "સક્રિય ખેડૂતો",
    th_districts: "જિલ્લાઓ",
    th_fpos: "ભાગીદાર FPO",
    th_gmv: "કુલ વ્યવહાર (GMV)",
    th_arr: "વાર્ષિક આવક (ARR)",
    row1_phase: "વર્ષ ૧ (સીડ સ્ટેજ - ગુજરાત/મહારાષ્ટ્ર)",
    row2_phase: "વર્ષ ૨ (વૃદ્ધિ સ્ટેજ - પશ્ચિમ/મધ્ય ભારત)",
    row3_phase: "વર્ષ ૩ (રાષ્ટ્રીય પ્લેટફોર્મ સ્કેલ)",
  },
};

let currentLang = 'gu'; // Default Gujarati

function updateLanguage(lang) {
  currentLang = lang;
  const t = translations[lang] || translations.en;

  // Update language buttons active class
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });

  // Update text elements with data-i18n attribute
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key]) {
      el.innerHTML = t[key];
    }
  });

  document.documentElement.lang = lang;
  updateRoiCalculator();
}

function updateRoiCalculator() {
  const acresInput = document.getElementById('calcAcres');
  if (!acresInput) return;
  const acres = Number(acresInput.value) || 5;

  // Scientific farm ROI formulas
  const fertilizerSavings = Math.round(acres * 1450); // ₹1,450 saved per acre via soil-tested NPK
  const marketUplift = Math.round(acres * 3800); // ₹3,800 extra earnings per acre via direct buyers
  const totalBenefit = fertilizerSavings + marketUplift;

  const savEl = document.getElementById('calcSavings');
  const uplEl = document.getElementById('calcUplift');
  const totEl = document.getElementById('calcTotal');
  const acreDisplay = document.getElementById('acresDisplay');

  if (acreDisplay) acreDisplay.textContent = acres;
  if (savEl) savEl.textContent = '₹' + fertilizerSavings.toLocaleString('en-IN');
  if (uplEl) uplEl.textContent = '₹' + marketUplift.toLocaleString('en-IN');
  if (totEl) totEl.textContent = '₹' + totalBenefit.toLocaleString('en-IN');
}

document.addEventListener('DOMContentLoaded', () => {
  // Setup language switch buttons
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      updateLanguage(btn.dataset.lang);
    });
  });

  // Mobile navigation toggle
  const menuToggle = document.getElementById('menuToggle');
  const mainNav = document.getElementById('mainNav');
  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', () => {
      mainNav.classList.toggle('open');
    });
  }

  // ROI Calculator input listener
  const acresInput = document.getElementById('calcAcres');
  if (acresInput) {
    acresInput.addEventListener('input', updateRoiCalculator);
  }

  // Dossier Modal toggle
  const openDossierBtn = document.getElementById('openDossierBtn');
  const closeDossierBtn = document.getElementById('closeDossierBtn');
  const dossierModal = document.getElementById('dossierModal');
  if (openDossierBtn && dossierModal) {
    openDossierBtn.addEventListener('click', () => {
      dossierModal.classList.add('active');
    });
  }
  if (closeDossierBtn && dossierModal) {
    closeDossierBtn.addEventListener('click', () => {
      dossierModal.classList.remove('active');
    });
  }
  if (dossierModal) {
    dossierModal.addEventListener('click', (e) => {
      if (e.target === dossierModal) {
        dossierModal.classList.remove('active');
      }
    });
  }

  // Initial load
  updateLanguage('gu');
});

