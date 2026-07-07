// ULSOO 홈페이지 데이터 — docs/IMPLEMENTATION_SPEC.md §3 데이터 계약
// 수치·문안은 연구보고서 검증값. 임의 수정 금지 (§0 절대 규칙).
const ULSOO_DATA = {
  teamInfo: {
    name: "ULSOO",
    fullName: "Ultimate Sophisticated Object Technology meets culture",
    motto: "전통 문화유산, 최첨단 AI 객체 기술로 '얼쑤' 흥을 돋우다",
    englishMotto: "Where Deep K-Heritage Meets Ultimate AI Object Technology",
    badge: "2020–2026 ETRI AI & 3D Digital Heritage R&D"
  },

  // ── Hero KPI (카운트업 대상) ──────────────────────────────
  kpis: [
    { value: 31022, format: "comma", suffix: "", label: "문화유산 디지털 애셋 구축", color: "gold" },
    { value: 200,   format: "plain", suffix: "억+", label: "누적 사업화 규모(원)", color: "teal" },
    { value: 20,    format: "plain", suffix: "+", label: "특허 출원 (미국 포함)", color: "coral" },
    { value: 54,    format: "plain", suffix: "+", label: "국내외 논문 발표", color: "cream" }
  ],

  // ── ② 연구 여정 ──────────────────────────────────────────
  journey: [
    {
      id: "chic",
      period: "2020 – 2022",
      status: "done",
      verb: "기록하다",
      title: "CHIC",
      subtitle: "애셋 기반 지능형 큐레이션 및 서비스 운영기술",
      funder: "문화체육관광부 · 한국콘텐츠진흥원",
      mission: "문화유산을 고품질 디지털 애셋으로 표준화하고, 큐레이터가 직접 쓰는 AI 큐레이션 플랫폼을 국립중앙박물관에서 실증했습니다.",
      highlights: [
        "문화유산 애셋 31,022개 구축 — 목표(2,600개)의 12배 달성",
        "사업화 23건 · 약 200억 원 규모 — 문화유산 원형기록 통합 DB 등",
        "전통문화 특화 언어모델 NER F1 89.0% — COLING 2022 발표"
      ],
      partners: "국립중앙박물관 · 국립무형유산원 실증 / 문체부 장관표창(2022)"
    },
    {
      id: "much",
      period: "2023 – 2025",
      status: "done",
      verb: "연결하다",
      title: "MUCH",
      subtitle: "인공지능 기반 디지털 헤리티지 공유 플랫폼",
      funder: "문화체육관광부 · 한국콘텐츠진흥원",
      mission: "세계 최초의 문화유산 4계층 데이터 패브릭과 국내 최초 디지털 데이터 생성 표준을 정립하고, 5대 대국민 서비스로 실증했습니다.",
      highlights: [
        "TTA 단체표준 제정 TTAK.KO-10.1621 — 국내 최초 문화유산 디지털 데이터 생성 표준",
        "국립중앙박물관 소장 유물 207,458점 3차원 관계망 — AVICOM 2025 우수상",
        "ICCV 2025 논문 발표 · 국립중앙도서관 STT 기술이전(2026.01)"
      ],
      partners: "국립중앙박물관 테스트베드 / 국립중앙도서관 MOU·기술이전"
    },
    {
      id: "ulsoo",
      period: "2026 –",
      status: "active",
      verb: "되살리다",
      title: "ULSOO",
      subtitle: "동산 문화유산 초정밀 디지털 복원·재현 기술",
      funder: "국가유산청",
      mission: "10억 픽셀 초고해상도 스캔과 멀티모달(UV·IR·XRF) 분석, 생성형 AI를 결합해 훼손된 문화유산의 원형을 과학적으로 복원하는 의사결정 지원 체계를 개발합니다.",
      highlights: [
        "10억 픽셀급 기가스캔 + 0.5µm급 미세 균열 자동 탐지 (개발 목표)",
        "생성형 AI 결손 복원 — 복원 정확도 SSIM 95% 목표",
        "Linked Art·CRMsci·CRMdig 기반 복원 전주기 이력 관리 표준화"
      ],
      partners: "ETRI(주관) · 중앙대학교 · 문화유산기술연구소 컨소시엄"
    }
  ],

  // ── ③ 핵심기술: 3대 분야 ─────────────────────────────────
  techFields: [
    {
      id: "ai",
      icon: "brain-circuit",
      category: "Field 01",
      title: "Heritage AI",
      tagline: "문화유산을 이해하는 인공지능",
      overview: "한국 문화유산에 특화된 언어·비전 AI를 기초 데이터셋부터 직접 구축했습니다. 유물의 손상을 진단하고, 기록을 읽고, 유물 사이의 관계를 추론하며, 관람객과 대화하는 전 영역의 지능을 다룹니다.",
      img: "assets/img/field-ai.webp",
      imgAlt: "AI 손상 패턴 진단 맵 예시",
      techs: [
        { name: "손상 패턴 진단 AI", desc: "멀티모달(가시광·UV·IR·XRF) 융합 분석으로 육안 식별이 불가능한 미세 균열·박락·변색을 비파괴 진단합니다. 손상 상태의 100단계 정량 등급화를 목표로 개발 중입니다.", metric: "0.5µm급 탐지 목표" },
        { name: "전통문화 특화 언어지능", desc: "문화유산 속성 분류체계(대분류 10종·세분류 92종)와 169,899문장의 학습 데이터를 자체 구축하고, 한국어 특화 사전학습으로 세계 최고 수준을 상회했습니다.", metric: "NER F1 89.0% · COLING 2022" },
        { name: "지식그래프·관계 분석", desc: "유물 설명·전시 이력·속성을 결합해 유물 간 맥락적 관계를 추론하고, 국립중앙박물관 소장 유물 전체를 3차원 관계망으로 시각화했습니다.", metric: "유물 207,458점 관계망" },
        { name: "RAG 기반 대화형 AI 도슨트", desc: "유물 메타데이터 109,000건을 임베딩한 검색증강생성(RAG) 구조로, 할루시네이션을 억제하며 전시 해설과 개인화 안내를 제공합니다.", metric: "무령왕릉 '진묘' 실증" },
        { name: "Data-Centric 자동 분류·태깅", desc: "한국 문화유산 이미지-텍스트로 CLIP을 특화 학습시켜, 재학습 없이 신규 유물 데이터를 자동 분류·태깅합니다.", metric: "인식률 92.43% · 태깅 89%" }
      ]
    },
    {
      id: "gen",
      icon: "box",
      category: "Field 02",
      title: "디지털 문화유산 생성",
      tagline: "원형을 데이터로, 데이터를 실감으로",
      overview: "기가픽셀 스캔부터 생성형 AI 복원, 실시간 3D 가시화까지 — 문화유산의 물리적 원형을 손실 없이 디지털 자산으로 변환하고 되살리는 전 공정 기술을 보유합니다.",
      img: "assets/img/field-gen.webp",
      imgAlt: "생성형 AI 결손 부위 복원 전후 비교",
      techs: [
        { name: "기가픽셀·3D 정밀 데이터 획득", desc: "10억 픽셀급 초고해상도 촬영과 구조광·사진측량 3D 스캔, 국내 최초의 로봇팔 자동 취득 시스템(최고 3m 대형 유물 대응)으로 균일 품질의 원천 데이터를 확보합니다.", metric: "국내 최초 취득 표준 가이드라인" },
        { name: "생성형 AI 복원 (Inpainting·SR)", desc: "Diffusion 기반 결손 부위 자동 생성과 주파수 분해 오염 제거(FSENet), Transformer 초해상화(HAT)로 훼손 이미지를 복원합니다.", metric: "PSNR 33.73 · SSIM 0.984" },
        { name: "NeRF·3D Gaussian Splatting", desc: "2D 이미지로부터 3D 객체를 생성하고, RGB 표면과 X-ray 내부 구조를 단일 모델로 통합하는 비파괴 융합 기술을 세계 무대에서 검증했습니다.", metric: "ICCV 2025 발표" },
        { name: "H-PBR 실감 재질 표현", desc: "금속·도자기·비단 등 문화재 재질별 물리기반렌더링(PBR) 템플릿을 구축해, 유물 고유의 광택·질감을 물리적으로 정확하게 재현합니다.", metric: "재질 템플릿 55종" },
        { name: "WebGL 초실감 웹 뷰어", desc: "플러그인 없이 웹브라우저에서 60FPS로 구동되는 3D·RTI·기가픽셀 뷰어군. 조명 제어와 초고배율 줌으로 유물 표면을 양방향 탐험합니다.", metric: "60FPS · 동시접속 50+" }
      ]
    },
    {
      id: "arch",
      icon: "database",
      category: "Field 03",
      title: "문화유산 특화 데이터 아키텍처",
      tagline: "흩어진 유산 데이터를 하나의 표준으로",
      overview: "데이터 생성부터 관리·공유까지의 표준을 국내 최초로 정립했습니다. 국제 표준 온톨로지와 연계된 데이터 패브릭 위에서 문화유산 데이터가 기관을 넘어 흐릅니다.",
      img: "assets/img/field-arch.webp",
      imgAlt: "유물 메타데이터 3차원 관계망 시각화",
      techs: [
        { name: "4계층 데이터 패브릭", desc: "Work(유물)–Project(활동)–Instance(산출)–Item(파일)의 4계층 구조로 문화유산 데이터 생명주기를 관리하는 세계 최초의 체계입니다.", metric: "데이터셋 12,131건 구축" },
        { name: "CIDOC-CRM 온톨로지·지식그래프", desc: "CIDOC-CRM(ISO 21127)·Dublin Core·Schema.org 등 국제표준 5종을 통합한 하이브리드 스키마와 링크드 오픈 데이터 기반 개방형 지식그래프를 설계했습니다.", metric: "국제표준 5종 통합" },
        { name: "디지털 데이터 생성 표준화", desc: "3D·기가픽셀·RTI 데이터의 획득 환경·장비·품질 기준을 정의한 국내 최초의 생성 표준. 국립중앙박물관 공식 납품 지침으로 채택되었습니다.", metric: "TTA 표준 TTAK.KO-10.1621" },
        { name: "MUCH 플랫폼·신뢰 아카이브 CMS", desc: "진본성과 파생물 추적성을 보장하는 문화유산 특화 CMS와, AI 추천·패싯 검색·자동 뷰어 연동을 갖춘 개방형 공유 플랫폼입니다.", metric: "국립중앙박물관 테스트베드 실증" }
      ]
    }
  ],

  // ── ④ 실증사례 (6건) ─────────────────────────────────────
  projects: [
    {
      id: "banga",
      title: "WebGL 반가사유상",
      subtitle: "국보 실시간 3D 체험",
      desc: "반가사유상 두 점(1962-1·1962-2)을 재질·광택까지 재현한 실시간 3D 콘텐츠. 조명·회전·확대를 관람객이 직접 제어하며 불교문화 해설을 함께 제공합니다.",
      tag: "국립중앙박물관", icon: "gem", img: "assets/img/case-banga.webp", hasBadge: true
    },
    {
      id: "jinmyo",
      title: "AI 도슨트 '진묘'",
      subtitle: "RAG 기반 대화형 에이전트",
      desc: "무령왕릉 출토품 1,125건 전용 AI 챗봇. 유물 메타데이터 109,000건을 임베딩한 검색증강생성 구조로 개념형·조건형 질문에 정확하게 답합니다.",
      tag: "인공지능 에이전트", icon: "bot", img: "assets/img/case-jinmyo.webp", hasBadge: false
    },
    {
      id: "gwanggaeto",
      title: "디지털 광개토대왕릉비",
      subtitle: "박물관 메인홀 상설 콘텐츠",
      desc: "정밀 3D 스캔 모델로 비문을 확대 탐독할 수 있는 디지털 릉비. 2024년 2월부터 국립중앙박물관 1층 로비에서 관람객을 맞고 있습니다.",
      tag: "상설 전시", icon: "landmark", img: "assets/img/case-gwanggaeto.webp", hasBadge: false
    },
    {
      id: "hwaseong",
      title: "초고해상도 화성행궁",
      subtitle: "기가픽셀 딥줌 뷰어",
      desc: "정조 화성행궁 그림을 기가픽셀 딥줌(DZI)으로 탐험하는 콘텐츠. 지도 핀을 클릭하면 장면별 해설과 오디오가 연동됩니다.",
      tag: "기가픽셀", icon: "zoom-in", img: "assets/img/case-hwaseong.webp", hasBadge: false
    },
    {
      id: "route",
      title: "맞춤형 관람 동선 추천",
      subtitle: "지식그래프 개인화 안내",
      desc: "유물 지식그래프의 의미적 연관도를 기반으로 개인 취향에 맞는 관람 동선을 수 초 내에 추천하고 실제 길안내까지 연결합니다.",
      tag: "개인화 서비스", icon: "route", img: "assets/img/case-route.webp", hasBadge: false
    },
    {
      id: "chic-legacy",
      title: "'사유의 방' & 메타버스 박물관",
      subtitle: "CHIC 실증 유산",
      desc: "반가사유상 극사실 애셋으로 국립중앙박물관 '사유의 방' 전시에 참여하고, 제페토·다중접속 VR로 5개 국립박물관 공간을 메타버스에 재현했습니다.",
      tag: "XR·메타버스", icon: "orbit", img: "assets/img/case-metaverse.webp", hasBadge: false
    }
  ],

  // ── ⑤ 연구성과: 집계 + 대표 성과 ─────────────────────────
  achievementSummary: [
    { key: "publications", label: "논문", icon: "book-open",  count: "54+", detail: "국제 15+ · 국내 39+" },
    { key: "awards",       label: "수상", icon: "trophy",     count: "3",   detail: "국제 1 · 정부 1 · 기관 1" },
    { key: "patents",      label: "특허·표준", icon: "scroll-text", count: "30+", detail: "특허 20+ · SW 9 · 표준 1" },
    { key: "business",     label: "사업화", icon: "briefcase", count: "24+", detail: "약 200억 원 규모" }
  ],

  achievements: {
    publications: {
      eyebrow: "Publications",
      desc: "세계 최고 권위의 AI 학회와 국내외 학술지에서 문화유산 특화 알고리즘의 독보성을 검증받았습니다.",
      items: [
        { type: "Top-tier 국제학회", title: "ICCV 2025 — RGB·X-ray 융합 3D Gaussian Splatting 비파괴 분석 연구 발표", date: "2025.10", highlight: true },
        { type: "Top-tier 국제학회", title: "COLING 2022 — 한국 전통문화 특화 언어모델·개체명 인식 연구 발표", date: "2022.10", highlight: true },
        { type: "국제 학술대회", title: "SCOPUS 등재 국제 학술대회 논문 15편 발표 (문화유산 AI·데이터 표준 분야)", date: "누적", highlight: false },
        { type: "국내 학술", title: "국내 저널·학술대회 39편 게재 및 발표 — 전통회화 객체 인식, 관계망 시각화 등", date: "누적", highlight: false }
      ]
    },
    awards: {
      eyebrow: "Awards & Recognitions",
      desc: "기술 혁신성과 문화 서비스 확산 기여를 국제기구와 정부로부터 공식 인정받았습니다.",
      items: [
        { type: "국제 수상", title: "AVICOM 2025 우수상 — 국제박물관협의회(ICOM) 시청각·뉴미디어 위원회, 관계기반 데이터 시각화 기술", date: "2025.11", highlight: true },
        { type: "정부 포상", title: "문화체육관광부 장관표창 — 신기술융합콘텐츠 확산 및 박물관 디지털화 공로", date: "2022.12", highlight: true },
        { type: "기관 선정", title: "ETRI 우수성과 선정 — MUCH 디지털 헤리티지 플랫폼", date: "2025", highlight: false }
      ]
    },
    patents: {
      eyebrow: "Patents & Standards",
      desc: "원천기술을 지식재산으로 자산화하고, 문화유산 디지털 데이터의 국가 표준을 선도합니다.",
      items: [
        { type: "단체 표준", title: "TTA 단체표준 제정 — 문화유산 디지털 데이터 생성 품질 지침 (TTAK.KO-10.1621)", date: "2025.12", highlight: true },
        { type: "국제특허(미국)", title: "AI 기반 멀티모달 추론 시스템 등 미국 특허 출원 (초고품질 디지털 데이터 생성 포함 3건 추진)", date: "2022–2026", highlight: false },
        { type: "국내특허", title: "지능형 큐레이션 플랫폼, 데이터 패브릭 아카이브 등 국내 특허 20건 출원", date: "누적", highlight: true },
        { type: "SW 저작권", title: "문화유산 가시화 시스템 등 프로그램 등록 9건", date: "누적", highlight: false }
      ]
    },
    business: {
      eyebrow: "Business & Tech Transfer",
      desc: "연구 성과를 국가 사업과 기술 계약으로 연결해 산업 현장에 확산시켰습니다.",
      items: [
        { type: "사업화", title: "사업화 23건 · 약 200억 원 규모 — 문화유산 원형기록 통합 DB 구축(약 130억) 등", date: "종합", highlight: true },
        { type: "기술이전", title: "국립중앙도서관 멀티모달 자동변환·메타데이터 생성(STT) 기술이전 및 MOU", date: "2026.01", highlight: true },
        { type: "데이터 자산", title: "고품질 문화유산 애셋 31,022개 구축 — 목표 대비 12배 초과 달성", date: "종합", highlight: false },
        { type: "실증 확산", title: "국립중앙박물관 테스트베드 및 5대 대국민 시범서비스 공개 (2025 박물관·미술관 박람회)", date: "2025", highlight: false }
      ]
    }
  },

  // ── ⑥ 연구진 ────────────────────────────────────────────
  members: [
    {
      name: "이재호", role: "연구책임자 · 책임연구원", inst: "ETRI 한국전자통신연구원",
      img: "assets/members/member-01.webp",
      tags: ["연구 총괄", "디지털 헤리티지", "지능형 플랫폼"],
      email: "jhlee3@etri.re.kr"
    },
    {
      name: "김희권", role: "선임연구원", inst: "ETRI 한국전자통신연구원",
      img: "assets/members/member-02.webp",
      tags: ["AI 아키텍처", "RAG·지식그래프", "데이터 패브릭"],
      email: "hkkim79@etri.re.kr"
    },
    {
      name: "박찬우", role: "연구원", inst: "ETRI 한국전자통신연구원",
      img: "assets/members/member-03.webp",
      tags: ["응용 시스템", "디지털 문화유산 생성"],
      email: "gamer@etri.re.kr"
    },
    {
      name: "백서현", role: "연구원", inst: "ETRI 한국전자통신연구원",
      img: "assets/members/member-04.webp",
      tags: ["문화보존과학", "AI 기반 문화유산 복원·생성"],
      email: "b_seohy@etri.re.kr"
    }
  ],

  network: {
    role: "산·학·연 협력 생태계",
    name: "공동·위탁 연구 네트워크",
    orgs: ["문화유산기술연구소(TRIC)", "중앙대학교", "에스큐아이소프트", "㈜디캐릭", "한국전통문화대학교", "고려대학교", "KAIST", "국립중앙박물관"],
    tags: ["보존과학 검증", "3D 디지털 트윈", "AI 알고리즘 고도화", "현장 실증"]
  }
};
