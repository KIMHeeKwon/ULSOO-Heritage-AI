# ULSOO 홈페이지 개편 — 구현 명세서 v1.0

> **이 문서의 목적**: 구현 담당자(또는 하위 AI 모델)가 추가 질문 없이 설계 의도대로 index.html을 개편할 수 있도록,
> 데이터·마크업 구조·인터랙션·완료 기준을 전부 명시한다.
> 본 문서에 없는 것을 임의로 창작하지 말 것. 애매하면 `TODO_CONFIRM` 항목으로 남기고 진행할 것.
>
> **동반 문서**: 화면 문안 전문과 사진 소스·배치는 `docs/CONTENT_SPEC.md`가 원본이다.
> 문안이 두 문서 간 다르면 CONTENT_SPEC이 우선하고, 구조·코드·수치 규칙은 본 문서가 우선한다.
> 시각 사양(토큰·레이아웃 치수·컴포넌트 상태·아트 디렉션)은 `docs/DESIGN_SPEC.md`를 따른다.

---

## 0. 절대 규칙 (위반 금지)

1. **`Ref/` 폴더를 git에 커밋하지 않는다.** (.gitignore에 이미 등록됨. 절대 해제 금지)
2. **아래 §3 데이터 계약의 수치·문안을 임의로 바꾸지 않는다.** 모든 수치는 연구보고서에서 검증된 값이다.
   - 특히: "CVPR 2023"은 **제출(submitted)** 이며 "게재"로 표기 금지.
   - "AI 진단 정확도", "SSIM 95%", "100단계 등급화"는 ULSOO 과제의 **개발 목표**이므로 반드시 "목표" 문맥으로만 사용.
3. **기존 디자인 시스템을 유지한다**: 다크 테마, CSS 변수 팔레트(`--ulsoo-*`), 전통색(네이비·틸·골드·레드), 글래스 카드, Pretendard 폰트.
4. **CDN 폴백 로직(`renderFallbackIfNeeded`)을 삭제하지 않는다.** 섹션 구조가 바뀌면 폴백도 §7 규칙대로 동기화한다.
5. 기술 스택 변경 금지: Tailwind CDN + Alpine.js 3.x + Lucide 유지. 빌드 도구·프레임워크 도입 금지.
6. 저장소 구조 외 파일(요구되지 않은 리팩터링, 포매팅 변경) 금지 — 변경 라인은 전부 이 명세로 소급 가능해야 한다.

---

## 1. 최종 파일 구조

```
/
├── index.html            # 마크업 + <style> (기존 파일 수정)
├── assets/
│   ├── data.js           # §3의 ULSOO_DATA 전체 (index.html에서 분리)
│   ├── img/              # 큐레이션 이미지 (WebP) — Phase 3에서 채움
│   └── members/          # 연구진 이미지 4점 (member-01.webp ~ member-04.webp)
├── docs/
│   ├── WORKLOG.md
│   └── IMPLEMENTATION_SPEC.md   # 본 문서
└── .gitignore
```

- `index.html`의 `<script>const ULSOO_DATA = {...}` 블록을 `assets/data.js`로 이동하고
  `<script src="assets/data.js"></script>`를 Alpine CDN `<script>` **앞에** 추가한다.
- `data.js`는 전역 `const ULSOO_DATA = {...};` 선언 하나만 포함한다 (모듈 아님, export 없음).

---

## 2. 페이지 구조 (IA) — 6섹션

| 순서 | id | 네비 라벨 | 상태 |
|---|---|---|---|
| 1 | `#home` | (로고 클릭) | 기존 유지 + KPI 교체 |
| 2 | `#journey` | 연구 여정 | **신규** |
| 3 | `#technologies` | 핵심기술 | 3대 분야 구조로 재편 |
| 4 | `#projects` | 실증사례 | 3건 → 6건 |
| 5 | `#achievements` | 연구성과 | 대시보드형 개편 |
| 6 | `#people` | 연구진 | 4인 카드로 개편 |

`navItems`를 다음으로 교체:

```js
navItems: [
  { label: "연구 여정", href: "#journey" },
  { label: "핵심기술", href: "#technologies" },
  { label: "실증사례", href: "#projects" },
  { label: "연구성과", href: "#achievements" },
  { label: "연구진", href: "#people" }
]
```

---

## 3. 데이터 계약 — `assets/data.js` 전문

아래 내용을 **그대로** 사용한다. (`TODO_CONFIRM` 표기는 사용자 확인 후 교체하되, 확인 전에는 표기된 대체 문안을 쓴다.)

```js
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
      name: "박찬우", role: "연구원", inst: "ETRI 한국전자통신연구원",  // 직급만 TODO_CONFIRM
      img: "assets/members/member-03.webp",
      tags: ["응용 시스템", "디지털 문화유산 생성"],
      email: "gamer@etri.re.kr"
    },
    {
      name: "백서현", role: "연구원", inst: "ETRI 한국전자통신연구원",  // 직급만 TODO_CONFIRM
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
```

**`TODO_CONFIRM` 처리 규칙**: 값이 `"TODO_CONFIRM"`이거나 배열이 `["TODO_CONFIRM"]`이면 해당 UI 요소(이메일 줄, 태그 영역)를 렌더링하지 않는다. `x-show="member.email !== 'TODO_CONFIRM'"` 패턴 사용.

---

## 4. 섹션별 구현 명세

### 4-1. `#home` Hero — KPI 카운트업

**변경점**: 로고 패널 하단의 KPI 3칸 그리드를 `kpis` 데이터 기반 4칸으로 교체.

**마크업** (로고 패널 내 기존 3칸 grid 대체):
```html
<div class="mt-7 grid w-full grid-cols-2 sm:grid-cols-4 gap-px overflow-hidden rounded
            border border-[rgba(214,164,82,0.22)] bg-[rgba(255,250,240,0.08)] text-center text-xs">
  <template x-for="kpi in data.kpis" :key="kpi.label">
    <div class="px-3 py-4">
      <span class="block text-lg font-black"
            :class="kpiColor(kpi.color)"
            x-text="kpiDisplay(kpi)"></span>
      <span class="text-slate-400" x-text="kpi.label"></span>
    </div>
  </template>
</div>
```

**카운트업 로직** (`ulsooApp()`에 추가):
```js
kpiCounts: {},          // label → 현재 표시값
kpiDone: false,

kpiColor(c) {
  return { gold: "text-[#e8bb68]", teal: "text-[#5bd0d9]",
           coral: "text-[#e45f42]", cream: "text-[var(--ulsoo-cream)]" }[c] || "text-white";
},
kpiDisplay(kpi) {
  const v = this.kpiCounts[kpi.label] ?? 0;
  const s = kpi.format === "comma" ? v.toLocaleString("ko-KR") : String(v);
  return s + kpi.suffix;
},
startKpiCountup() {
  if (this.kpiDone) return;
  this.kpiDone = true;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  this.data.kpis.forEach(kpi => {
    if (reduce) { this.kpiCounts[kpi.label] = kpi.value; return; }
    const dur = 1400, t0 = performance.now();
    const tick = (t) => {
      const p = Math.min((t - t0) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);           // easeOutCubic
      this.kpiCounts[kpi.label] = Math.round(kpi.value * eased);
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  });
},
```

**트리거**: `init()`에서 IntersectionObserver로 로고 패널이 30% 보이면 `startKpiCountup()` 1회 호출.
```js
const panel = document.querySelector(".hero-logo-panel");
if (panel && "IntersectionObserver" in window) {
  new IntersectionObserver((es, obs) => {
    if (es[0].isIntersecting) { this.startKpiCountup(); obs.disconnect(); }
  }, { threshold: 0.3 }).observe(panel);
} else { this.startKpiCountup(); }
```

### 4-2. `#journey` 연구 여정 (신규 섹션)

`#home` 바로 뒤에 삽입. 섹션 헤더 패턴은 기존 섹션과 동일 (kicker `Research Journey`, 제목 `연구 여정`).

**구조**:
1. **타임라인 바**: 가로 flex, 3개 노드 버튼. 노드 사이는 `flex-1`인 그라데이션 선(`.timeline-stem`을 가로형으로 재활용한 새 클래스 `.journey-line`).
2. **노드 버튼**: 원형 도트(12px) + 위에 `period`, 아래에 `title`. 활성 시 골드 테두리 + 글로우. `status === "active"`인 노드(ULSOO)의 도트에 기존 `.pulse-badge` 애니메이션 적용, 옆에 `진행 중` 뱃지.
3. **상세 패널**: 활성 과제 1건을 `.achievement-panel` 스타일 재사용으로 표시.
   - 좌: `verb`(큰 타이포, 골드, 예: "기록하다") + `title`/`subtitle` + `mission` + `funder`
   - 우: `highlights` 3건을 `.achievement-item` 카드로 + 하단 `partners` 한 줄

**Alpine 상태**:
```js
activeJourney: "ulsoo",   // 초기값: 진행 중 과제
```
노드 클릭: `activeJourney = j.id; refreshIcons()`. 패널 콘텐츠는 `x-text` 바인딩, 전환 시 `x-transition.opacity`.

**모바일(≤900px)**: 타임라인 바를 3열 grid 버튼으로 대체(가로선 숨김), 상세 패널 좌우 → 상하 스택.

**접근성**: 노드 버튼에 `role="tab"`, `:aria-selected`, 패널에 `role="tabpanel"`.

### 4-3. `#technologies` 핵심기술 — 2단계 구조

기존 3카드 grid를 다음으로 교체:

1. **분야 선택 바**: `techFields` 3건을 기존 `.achievement-tab` 스타일의 가로 3버튼으로. 버튼 내용: lucide 아이콘 + `category`(작게) + `title`(크게).
2. **분야 상세 패널** (`.achievement-panel` 재사용):
   - (선택) `field.img` 필드가 존재하면 tagline 위에 16:9 이미지 렌더 (`loading="lazy"` + `@error`로 숨김 — CONTENT_SPEC §4 참조. Phase 3에서 채택 여부 결정, 필드 부재 시 렌더 생략)
   - 상단: `tagline`(골드, 큰 글씨) + `overview` 문단
   - 하단: `techs` 배열을 **아코디언 목록**으로. 각 행:
     - 헤더(버튼): `name` + 우측에 `metric` 칩(기존 `.tag-pill` 스타일, 시안색) + chevron 아이콘
     - 본문: `desc` (열림 시 `x-collapse` 없이 `x-show` + `x-transition`)
   - 첫 번째 tech는 기본 열림.

**Alpine 상태**:
```js
activeField: "ai",
openTech: 0,             // 활성 분야 내 열린 아코디언 인덱스
```
분야 전환 시 `openTech = 0`으로 리셋, `refreshIcons()` 호출.

**아코디언 헤더 접근성**: `<button type="button" :aria-expanded="(openTech===i).toString()">`.

### 4-4. `#projects` 실증사례 — 6카드 + 이미지

- grid를 `lg:grid-cols-3`(2행×3열) 유지. 카드 6건은 `projects` 데이터 바인딩.
- 기존 브라우저 창 모티프(신호등 도트 + tag) 유지.
- 카드 상단에 이미지 영역 추가:
```html
<div class="aspect-[16/9] overflow-hidden bg-slate-900">
  <img :src="project.img" :alt="project.title + ' 실증 이미지'"
       class="h-full w-full object-cover transition duration-300 hover:scale-105"
       loading="lazy" @error="$el.style.display='none'">
</div>
```
  - `@error` 핸들러 필수: Phase 3 전(이미지 부재 시)에도 레이아웃이 깨지지 않아야 한다.
- `hasBadge`가 true인 카드에만 기존 "WebGL 데모 체험 가능" 펄스 뱃지.
- 카드 클릭 시 라이트박스(§5) 오픈: `@click="openLightbox(project)"` — 이미지가 로드된 경우에만.

### 4-5. `#achievements` 연구성과 — 대시보드형

1. **집계 스트립** (탭 위에 신규): `achievementSummary` 4건을 4열 grid로.
   - 각 칸: `count`(큰 숫자, 골드/시안 교차) + `label` + `detail`(작은 회색).
   - 이 칸이 곧 **탭 버튼 역할**을 겸한다 — 클릭 시 해당 분야로 전환. 기존 `.achievement-tab` 클래스에 숫자 강조를 더한 변형 `.achievement-stat-tab` 신설.
2. **상세 패널**: 기존 `.achievement-panel` 구조 유지하되 데이터 소스를 새 `achievements[key]` 구조(`eyebrow`/`desc`/`items`)로 교체. 좌측 summary의 `<ul>` 리스트는 제거하고 `desc` 문단만 남긴다(간결화).
3. items는 분야당 **최대 5건** — 데이터에 있는 그대로만 렌더링하고 임의 추가 금지.

**기존 `achievementCategories`·`achievementDetails` 객체는 삭제**하고 `achievementSummary` + `achievements`로 일원화한다.

### 4-6. `#people` 연구진 — 4인 카드

기존 2카드+네트워크 구조를 교체:

1. **4인 그리드**: `grid gap-6 sm:grid-cols-2 lg:grid-cols-4`, `members` 4건 바인딩.
   - 카드 구성(위→아래): 프로필 이미지 → 이름(2xl, 흰색) → role(골드) → inst(회색 작게) → tags(pill) → 이메일 버튼
   - **프로필 이미지**: 정사각 `aspect-square`, `rounded`, `object-cover`.
     이미지 로드 실패 시 폴백 — 이니셜 아바타:
```html
<div class="relative aspect-square overflow-hidden rounded border border-slate-700/70 bg-slate-900">
  <div class="absolute inset-0 grid place-items-center text-5xl font-black text-[var(--ulsoo-gold)]"
       x-text="member.name.charAt(0)"></div>
  <img :src="member.img" :alt="member.name + ' 프로필'" loading="lazy"
       class="relative h-full w-full object-cover" @error="$el.remove()">
</div>
```
   - 연구책임자(이재호) 카드만 `border-amber-400/55 shadow-amberGlow` 강조 유지.
   - 이메일: `email !== 'TODO_CONFIRM'`일 때만 복사 버튼+텍스트 표시 (기존 `copyEmail()` 재사용).
2. **네트워크 밴드**: 기존 네트워크 article 유지하되 `network.orgs` 배열 직접 바인딩(기존 `inst.split(",")` 제거).

### 4-7. 신규 섹션 공통

- 모든 신규 마크업은 기존 섹션의 클래스 어휘(`glass-card`, `section-kicker`, `.achievement-*`)를 재사용한다. 새 CSS는 §6에 열거된 것만 추가.
- lucide 아이콘은 동적 렌더 후 반드시 `refreshIcons()` 호출 (기존 패턴).
- **섹션별 인터랙션·모션은 §12를 따른다** (§12가 §4의 정적 명세 위에 얹히는 모션 레이어).

---

## 5. 라이트박스 (신규 컴포넌트)

```js
lightbox: null,   // { img, title, subtitle } 또는 null
openLightbox(p) { if (!p.img) return; this.lightbox = { img: p.img, title: p.title, subtitle: p.subtitle }; },
closeLightbox() { this.lightbox = null; },
```

마크업 (body 최하단, footer 앞):
```html
<div x-show="lightbox" x-transition.opacity x-cloak
     class="fixed inset-0 z-[60] grid place-items-center bg-black/85 p-6"
     @click.self="closeLightbox()" @keydown.escape.window="closeLightbox()"
     role="dialog" aria-modal="true">
  <figure class="max-w-4xl">
    <img :src="lightbox?.img" :alt="lightbox?.title" class="max-h-[78vh] w-auto rounded">
    <figcaption class="mt-3 text-center text-sm text-slate-300">
      <span class="font-black text-white" x-text="lightbox?.title"></span>
      <span class="ml-2" x-text="lightbox?.subtitle"></span>
    </figcaption>
  </figure>
  <button type="button" @click="closeLightbox()" aria-label="닫기"
          class="absolute right-5 top-5 grid h-10 w-10 place-items-center rounded border border-slate-600 bg-slate-900/80 text-slate-200">✕</button>
</div>
```

---

## 6. 추가 CSS (기존 `<style>` 끝에 append)

```css
/* 연구 여정 타임라인 */
.journey-line {
  height: 3px; flex: 1;
  background: linear-gradient(90deg, rgba(36,154,164,0.7), rgba(214,164,82,0.7));
}
.journey-node { display: grid; justify-items: center; gap: 0.4rem; }
.journey-dot {
  width: 14px; height: 14px; border-radius: 999px;
  border: 2px solid var(--ulsoo-teal); background: #07101f;
  transition: transform 200ms ease, background 200ms ease;
}
.journey-node.is-active .journey-dot { background: var(--ulsoo-gold); border-color: var(--ulsoo-gold); transform: scale(1.25); }
.journey-verb {
  color: var(--ulsoo-gold); font-size: clamp(1.6rem, 3vw, 2.2rem);
  font-weight: 900; line-height: 1.2;
}

/* 성과 집계 탭 */
.achievement-stat-tab b {
  display: block; font-size: 1.7rem; font-weight: 900;
  font-variant-numeric: tabular-nums; letter-spacing: -0.02em;
}

/* 기술 아코디언 */
.tech-acc { border: 1px solid rgba(255,250,240,0.12); border-radius: 0.25rem; background: rgba(5,10,20,0.58); }
.tech-acc + .tech-acc { margin-top: 0.6rem; }
.tech-acc > button {
  display: flex; width: 100%; align-items: center; justify-content: space-between;
  gap: 1rem; padding: 0.9rem 1rem; text-align: left;
  color: var(--ulsoo-cream); font-weight: 800; background: none; border: 0; cursor: pointer;
}
.tech-acc.is-open { border-color: rgba(36,154,164,0.55); }
.tech-acc .tech-body { padding: 0 1rem 1rem; color: #cbd5e1; font-size: 0.9rem; line-height: 1.75; }

/* prefers-reduced-motion: §12-10의 확장 블록을 사용한다 (여기에 별도 작성 금지) */
```

§12의 인터랙션용 CSS(모션 토큰, .reveal, .scroll-progress, .case-overlay, .to-top 등)도 이 `<style>` 끝에 함께 append한다.

---

## 7. CDN 폴백(`renderFallbackIfNeeded`) 동기화 규칙

폴백은 **정보 전달**이 목적이므로 인터랙션 없이 전 내용을 펼쳐 렌더링한다:

1. 감지 셀렉터를 `#technologies article` → `#technologies .tech-acc, #technologies article`로 갱신.
2. **KPI**: 카운트업 없이 최종값을 정적 렌더 (`31,022` 등 콤마 포함 문자열).
3. **연구 여정**: 3개 과제를 세로 카드 3장으로 전부 렌더 (타임라인·탭 없음).
4. **핵심기술**: 분야 3개를 순서대로, 각 분야의 techs 전체를 펼친 목록으로 렌더.
5. **연구성과**: 집계 4칸 + 4개 분야를 전부 순서대로 렌더 (탭 없음).
6. **연구진**: 4인 카드 렌더 (이미지 `<img onerror="this.remove()">` + 이니셜 폴백 동일 적용).
7. 폴백 내 모든 문자열은 기존 `escapeHtml()` 통과 필수.
8. 데이터 소스는 반드시 `ULSOO_DATA` 단일 참조 — 폴백 전용 중복 데이터 객체(기존 `achievementMeta` 같은 것)를 **만들지 않는다**.

---

## 8. 이미지 파이프라인 (Phase 3)

1. **추출** (Ref/ PDF → 후보 이미지, 스크래치 디렉터리에):
```python
import fitz, os
doc = fitz.open("Ref/<파일명>.pdf")
os.makedirs("candidates", exist_ok=True)
for pno, page in enumerate(doc):
    for i, img in enumerate(page.get_images(full=True)):
        xref, w, h = img[0], img[2], img[3]
        if w < 400 or h < 300: continue
        pix = fitz.Pixmap(doc, xref)
        if pix.n > 3: pix = fitz.Pixmap(fitz.csRGB, pix)
        pix.save(f"candidates/p{pno+1:03d}_{i}.png")
```
2. **큐레이션**: 섹션별 후보를 사용자에게 제시 → 선별 (자동 선정 금지 — 저작권 판단 필요).
3. **변환**: 선별본을 `cwebp -q 85 -resize 1200 0` (가로 1200px, 세로 비율 유지)로 `assets/img/`에 저장.
   - 파일명은 §3 데이터의 `img` 경로와 일치시킬 것 (`case-banga.webp` 등).
4. **예산**: 이미지 총합 ≤ 2MB. 초과 시 q=75로 재변환.
5. **주의**: 후보 원본(candidates/)은 커밋 금지 — 선별·변환된 WebP만 커밋.

---

## 9. 배포 (Phase 4)

1. `git add -A && git commit` (Ref/ 제외 확인: `git status`에 Ref/가 없어야 함).
2. `git push origin main`.
3. GitHub → repo Settings → Pages → Source: `Deploy from a branch`, Branch: `main` / `/ (root)` → Save.
4. 1~2분 후 `https://kimheekwon.github.io/ULSOO-Heritage-AI/` 접속 확인.

---

## 10. 완료 기준 (Acceptance Criteria)

구현 완료 선언 전 아래를 전부 확인한다:

**기능**
- [ ] 6섹션이 순서대로 렌더링되고 네비 5링크가 각 섹션으로 스크롤된다
- [ ] Hero KPI가 화면 진입 시 1회 카운트업된다 (31,022는 콤마 포함)
- [ ] 연구 여정: 노드 클릭으로 3개 과제 패널이 전환되고, ULSOO 노드에 펄스 뱃지가 보인다
- [ ] 핵심기술: 분야 3버튼 전환 + 분야당 아코디언이 열리고 닫힌다 (분야 전환 시 첫 항목 열림)
- [ ] 연구성과: 집계 4칸 클릭으로 분야 전환, 분야당 항목 5건 이하
- [ ] 연구진: 4인 카드, 이미지 없으면 이니셜 아바타, TODO_CONFIRM 필드는 숨김
- [ ] 실증사례 카드 이미지 클릭 시 라이트박스 열림, ESC/배경 클릭으로 닫힘, ←/→로 사례 순회
- [ ] 이메일 복사 버튼이 토스트 + copy→check 아이콘 모프와 함께 동작한다

**인터랙션 (§12)**
- [ ] 스크롤 시 섹션 헤더·카드가 1회 리빌되고, JS 차단 시에도 콘텐츠가 처음부터 보인다
- [ ] 헤더 진행바가 스크롤 진행률을 반영하고, 현재 섹션 네비 링크에 밑줄 하이라이트
- [ ] Hero 로고가 로드 시 스트로크 드로우로 그려진다
- [ ] 연구 여정: 활성 노드 이전 진행선이 골드로 채워지고, ←/→ 키로 과제 순환
- [ ] 성과 집계 4칸이 뷰포트 진입 시 카운트업, 탭 전환 시 항목 리스트가 stagger로 재생
- [ ] 백투탑 버튼이 600px 스크롤 후 나타나고 폴백 모드에서도 동작한다

**품질**
- [ ] 375px(모바일)에서 가로 스크롤 없음, 타임라인·grid가 세로 스택으로 전환
- [ ] Alpine.js를 차단(DevTools에서 스크립트 block)해도 폴백이 전 콘텐츠를 렌더링한다
- [ ] `prefers-reduced-motion` 설정 시 카운트업·펄스가 즉시 최종 상태로 표시
- [ ] 콘솔 에러 0건 (이미지 404는 @error로 흡수되어야 함)
- [ ] 본문 어디에도 "CVPR 게재", "SCI 저널" 문구가 없다 (grep으로 확인)
- [ ] `git ls-files | grep Ref` 결과가 비어 있다

**콘텐츠 대조 (§3과 완전 일치해야 하는 핵심 수치)**
- [ ] 31,022 / 약 200억 / 23건 / 특허 20건 / SW 9건 / TTAK.KO-10.1621 / 207,458점 / F1 89.0% / 인식률 92.43% / 109,000건 / 1,125건 / 60FPS

---

## 11. 작업 순서 요약

| Phase | 작업 | 산출물 |
|---|---|---|
| 1 | data.js 분리 + §3 데이터 반영 + 기존 섹션 데이터 소스 교체 | assets/data.js, index.html 수정 |
| 2 | 신규 섹션(#journey)·KPI 카운트업·기술 아코디언·성과 대시보드·연구진 4인·라이트박스 + 폴백 동기화 | index.html |
| 2.5 | **인터랙션 패스(§12)**: 리빌·스파이·진행바·로고 드로우·아코디언 모션·라이트박스 내비·카운트업·글로우·백투탑 | index.html |
| 3 | 이미지 추출→사용자 선별→WebP 배치 | assets/img/, assets/members/ |
| 4 | 커밋·푸시·GitHub Pages 활성화 + §10 체크리스트 검증 | 공개 URL |

각 Phase 완료 시 `docs/WORKLOG.md`에 날짜·산출물·미해결 항목을 추가 기록한다.

---

## 12. 인터랙션·모션 명세 (v1.1 추가)

> §4의 정적 구조 위에 얹는 모션 레이어. **라이브러리 추가 금지** — Alpine + vanilla JS + CSS만 사용한다.
> 모든 코드는 이 문서의 것을 그대로 사용한다. 임의 변경 금지.

### 12-0. 공통 원칙 (전 항목 적용)

| 규칙 | 내용 |
|---|---|
| 애니메이트 속성 | `transform` · `opacity` **만**. width/height/top/left 애니메이션 금지 (레이아웃 스래시) |
| 모션 토큰 | `--mt-fast: 180ms` / `--mt-base: 320ms` / `--mt-slow: 650ms` / `--ease-brush: cubic-bezier(0.22, 1, 0.36, 1)` — `:root`에 추가 |
| reduced-motion | `prefers-reduced-motion: reduce` 시 §12의 **모든** 애니메이션·트랜지션이 꺼지고 최종 상태로 즉시 표시 (12-11 CSS 블록이 일괄 처리) |
| 폴백 모드 | 12-1(리빌)·12-2(스파이·진행바)·12-9(백투탑)는 **vanilla 구현이므로 폴백 모드에서도 동작**. 나머지(Alpine 의존)는 폴백에서 자동 부재 — 콘텐츠는 §7 규칙대로 전부 펼쳐 보임 |
| JS 실패 안전 | 모션용 초기 은닉(`opacity:0`)은 반드시 `.js-on` 스코프 안에서만 — `<script>` 첫 줄이 실행되지 않으면 모든 콘텐츠가 그대로 보여야 한다 |
| IO 인스턴스 | IntersectionObserver 총 4개 이하 (리빌 1, 스파이 1, KPI 1, 성과 카운트업 1) |
| 예산 | §12 전체 추가 JS ≤ 6KB(비압축), 추가 CSS ≤ 4KB |

**부트스트랩** (기존 `<script>` 최상단, `ULSOO_DATA` 선언 직전):
```js
document.documentElement.classList.add("js-on");
const REDUCE_MOTION = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
```

### 12-1. 글로벌 스크롤 리빌 (vanilla)

섹션 헤더·카드류가 뷰포트 진입 시 아래에서 떠오른다. **1회성** (재스크롤 시 재생 없음).

```js
function initReveals() {
  const els = document.querySelectorAll(".reveal:not(.is-in)");
  if (!("IntersectionObserver" in window) || REDUCE_MOTION) {
    els.forEach(el => el.classList.add("is-in")); return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); }
    });
  }, { threshold: 0.15, rootMargin: "0px 0px -8% 0px" });
  els.forEach(el => io.observe(el));
}
```

**`.reveal` 부여 대상** (그 외 임의 부여 금지):
- 각 섹션의 헤더 블록(kicker+H2+lede 래퍼)
- 카드류: 실증 6카드, 연구진 4카드, 여정 상세 패널, 기술 상세 패널, 성과 집계 4칸
- 그리드 내 stagger: `:style="'--d:' + (i % 3)"` (행 단위 지연 — 최대 `--d`는 3)

**호출 시점 3곳**: ① `DOMContentLoaded` ② Alpine `init()`의 `$nextTick` 안 (x-for 렌더 후 재스캔) ③ `renderFallbackIfNeeded()` 마지막 줄.

```css
.js-on .reveal { opacity: 0; transform: translateY(22px);
  transition: opacity var(--mt-slow) var(--ease-brush), transform var(--mt-slow) var(--ease-brush);
  transition-delay: calc(var(--d, 0) * 70ms); }
.js-on .reveal.is-in { opacity: 1; transform: none; }
```

### 12-2. 헤더 — 스크롤스파이 + 읽기 진행바 (vanilla)

**진행바**: 헤더 하단 2px. 페이지 스크롤 진행률에 따라 좌→우로 틸→골드 그라데이션이 차오른다.

마크업 (`<header>` 닫는 태그 직전):
```html
<div class="scroll-progress" aria-hidden="true"><span></span></div>
```
```css
.scroll-progress { position: absolute; left: 0; right: 0; bottom: -1px; height: 2px;
  background: rgba(255,250,240,0.06); }
.scroll-progress span { display: block; height: 100%;
  transform-origin: left; transform: scaleX(0);
  background: linear-gradient(90deg, var(--ulsoo-teal), var(--ulsoo-gold)); }
```

**스파이**: 현재 섹션의 네비 링크에 `.is-current` (시안색 + 밑줄).
```js
function initScrollSpy() {
  if (!("IntersectionObserver" in window)) return;
  const io = new IntersectionObserver((es) => {
    es.forEach(e => {
      if (!e.isIntersecting) return;
      const id = "#" + e.target.id;
      document.querySelectorAll('header a[href^="#"]').forEach(a =>
        a.classList.toggle("is-current", a.getAttribute("href") === id));
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  document.querySelectorAll("main section[id]").forEach(s => io.observe(s));
}
```
```css
header nav a.is-current, header nav .is-current { color: #5bd0d9 !important;
  text-decoration: underline; text-underline-offset: 6px;
  text-decoration-color: rgba(91,208,217,0.6); }
```

**스크롤 리스너** (진행바 + 백투탑 + Hero 스크롤 큐 공용, rAF 스로틀):
```js
function initScrollFx() {
  const bar = document.querySelector(".scroll-progress span");
  const topBtn = document.querySelector(".to-top");
  const cue = document.querySelector(".scroll-cue");
  let ticking = false;
  addEventListener("scroll", () => {
    if (ticking) return; ticking = true;
    requestAnimationFrame(() => {
      const max = document.documentElement.scrollHeight - innerHeight;
      if (bar) bar.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
      if (topBtn) topBtn.classList.toggle("is-show", scrollY > 600);
      if (cue) cue.classList.toggle("is-hide", scrollY > 80);
      ticking = false;
    });
  }, { passive: true });
}
```
호출: `DOMContentLoaded` 1회 + 폴백 렌더 후 1회(중복 방지 위해 `window.__scrollFxDone` 가드 두기).

### 12-3. `#home` Hero — 로고 스트로크 드로우 + CTA 마이크로 모션

**로고 드로우**: ULSOO 로고는 전부 stroke 기반 SVG이므로, 로드 시 붓으로 그려지는 효과. `stroke-dasharray`/`stroke-dashoffset`은 SVG 상속 속성이라 `<use>` 참조 내부 path에도 적용된다 (단, `stroke-dasharray="2 7"`인 장식 점선 2개는 자체값 유지 — offset만 미세 이동하며 이는 의도된 잔재미).

```css
.js-on .hero-logo-panel .ulsoo-logo-mark {
  stroke-dasharray: 1400; stroke-dashoffset: 1400;
  animation: logoDraw 2.2s cubic-bezier(0.4, 0, 0.2, 1) 0.25s forwards;
}
@keyframes logoDraw { to { stroke-dashoffset: 0; } }
```
헤더의 소형 로고(`.logo-shell`)에는 적용하지 않는다 (Hero 패널 한정).

**CTA 버튼**: 아이콘이 hover 시 4px 전진.
```css
#home h1 ~ div a i { transition: transform var(--mt-fast) var(--ease-brush); }
@media (hover: hover) { #home h1 ~ div a:hover i { transform: translateX(4px); } }
```

**스크롤 큐**: Hero 하단 중앙 chevron-down, 느린 바운스. 80px 스크롤 후 사라짐(12-2 리스너).
```html
<div class="scroll-cue" aria-hidden="true"><i data-lucide="chevron-down" class="h-6 w-6"></i></div>
```
```css
.scroll-cue { position: absolute; bottom: 1.5rem; left: 50%; transform: translateX(-50%);
  color: rgba(255,250,240,0.45); animation: cueBounce 2.4s ease-in-out infinite;
  transition: opacity var(--mt-base); }
.scroll-cue.is-hide { opacity: 0; pointer-events: none; }
@keyframes cueBounce { 0%,100% { transform: translate(-50%, 0); } 50% { transform: translate(-50%, 8px); } }
@media (max-width: 900px) { .scroll-cue { display: none; } }
```

KPI 카운트업은 §4-1 그대로 (변경 없음).

### 12-4. `#journey` 연구 여정 — 진행선 채움 + 패널 전환

**진행선 채움**: 활성 노드 이전 구간의 `.journey-line`은 골드로 채워지고, 이후 구간은 흐리게. "과거→현재 진행" 서사를 시각화.
- 바인딩: 라인 `i`(0-based, 노드 i와 i+1 사이)에 `:class="data.journeys.findIndex(j => j.id === activeJourney) > i ? 'is-past' : ''"`
```css
.journey-line { opacity: 0.35; transition: opacity var(--mt-base); }
.journey-line.is-past { opacity: 1;
  background: linear-gradient(90deg, var(--ulsoo-gold), var(--ulsoo-teal)); }
```

**패널 전환**: §4-2의 단일 바인딩 패널을 **과제별 3개 패널 + `x-show`**로 변경 (전환 모션을 위해).
```html
<template x-for="j in data.journeys" :key="j.id">
  <div x-show="activeJourney === j.id"
       x-transition:enter="transition duration-300 ease-out"
       x-transition:enter-start="opacity-0 translate-y-3"
       x-transition:enter-end="opacity-100 translate-y-0"
       role="tabpanel">…§4-2의 패널 내용…</div>
</template>
```
`x-transition:leave`는 지정하지 않는다 (이전 패널 즉시 제거 — 겹침 방지).

**키보드 내비**: 탭리스트 컨테이너에 ←/→ 순환.
```js
stepJourney(d) {
  const ids = this.data.journeys.map(j => j.id);
  const i = (ids.indexOf(this.activeJourney) + d + ids.length) % ids.length;
  this.activeJourney = ids[i]; this.refreshIcons();
},
```
```html
<div role="tablist" @keydown.arrow-right.prevent="stepJourney(1)"
     @keydown.arrow-left.prevent="stepJourney(-1)">
```

### 12-5. `#technologies` 핵심기술 — CSS 아코디언 + 칩 플래시

**아코디언 개폐 모션**: `x-show` 대신 **CSS grid-rows 트릭** (부드러운 높이 전환을 transform 없이 달성, JS 0줄). §4-3의 본문 렌더를 다음으로 대체:
```html
<div class="tech-acc" :class="openTech === i ? 'is-open' : ''">
  <button type="button" @click="openTech = openTech === i ? -1 : i"
          :aria-expanded="(openTech === i).toString()">
    <span x-text="tech.name"></span>
    <span class="flex items-center gap-2">
      <span class="tag-pill" x-text="tech.metric"></span>
      <i data-lucide="chevron-down" class="acc-chevron h-4 w-4"></i>
    </span>
  </button>
  <div class="tech-body-wrap"><div>
    <p class="tech-body" x-text="tech.desc"></p>
  </div></div>
</div>
```
```css
.tech-body-wrap { display: grid; grid-template-rows: 0fr;
  transition: grid-template-rows var(--mt-base) var(--ease-brush); }
.tech-acc.is-open .tech-body-wrap { grid-template-rows: 1fr; }
.tech-body-wrap > div { overflow: hidden; }
.acc-chevron { transition: transform var(--mt-base); }
.tech-acc.is-open .acc-chevron { transform: rotate(180deg); }
.tech-acc.is-open .tag-pill { animation: chipPulse 0.7s ease 1; }
@keyframes chipPulse {
  0% { box-shadow: 0 0 0 rgba(36,154,164,0); }
  50% { box-shadow: 0 0 14px rgba(36,154,164,0.55); }
  100% { box-shadow: 0 0 0 rgba(36,154,164,0); } }
```
(`openTech = -1` 허용 — 전부 닫기 가능. 분야 전환 시 `openTech = 0` 리셋은 §4-3 유지.)

**분야 패널 전환**: 12-4와 동일한 3패널 + `x-show` + enter 전용 트랜지션 패턴.

### 12-6. `#projects` 실증사례 — 호버 오버레이 + 라이트박스 내비

**카드 이미지 호버 오버레이**: §4-4 이미지 블록을 다음으로 확장:
```html
<div class="case-thumb aspect-[16/9] overflow-hidden bg-slate-900 relative">
  <img :src="project.img" :alt="project.title + ' 실증 이미지'"
       class="h-full w-full object-cover" loading="lazy" @error="$el.parentElement.style.display='none'">
  <div class="case-overlay"><i data-lucide="zoom-in" class="h-5 w-5"></i><span>자세히 보기</span></div>
</div>
```
```css
.case-thumb img { transition: transform 0.5s var(--ease-brush); }
.case-overlay { position: absolute; inset: 0; display: grid; place-items: center;
  align-content: center; gap: 0.4rem; background: rgba(5,10,20,0.55);
  opacity: 0; transition: opacity var(--mt-base);
  color: #dffbff; font-weight: 800; font-size: 0.8rem; }
@media (hover: hover) {
  .case-thumb:hover .case-overlay { opacity: 1; }
  .case-thumb:hover img { transform: scale(1.05); }
}
```
터치 기기: 오버레이 없음, 탭 즉시 라이트박스 (기존 `@click` 그대로).

**라이트박스 이전/다음**: §5 상태를 인덱스 기반으로 확장:
```js
lightboxIdx: -1,
get lightboxList() { return this.data.projects.filter(p => p.img); },
get lightbox() { return this.lightboxList[this.lightboxIdx] ?? null; },
openLightbox(p) { const i = this.lightboxList.indexOf(p); if (i >= 0) this.lightboxIdx = i; },
closeLightbox() { this.lightboxIdx = -1; },
stepLightbox(d) {
  const n = this.lightboxList.length; if (!n || this.lightboxIdx < 0) return;
  this.lightboxIdx = (this.lightboxIdx + d + n) % n;
},
```
§5 마크업에 추가: 좌우 화살표 버튼 2개(`@click.stop="stepLightbox(-1)"` / `+1`, `aria-label="이전 사례"/"다음 사례"`), 전역 키 `@keydown.arrow-left.window`/`arrow-right.window` (lightbox 열림일 때만 동작하도록 핸들러 안에서 `if (this.lightboxIdx < 0) return`), figure에 scale-in:
```html
x-transition:enter="transition duration-300 ease-out"
x-transition:enter-start="opacity-0 scale-95" x-transition:enter-end="opacity-100 scale-100"
```

### 12-7. `#achievements` 연구성과 — 집계 카운트업 + 리스트 stagger + 골드 스윕

**집계 카운트업**: `achievementSummary`의 `count`(예: `"36+"`)를 숫자부+접미부로 분해해 §4-1과 동일한 easeOutCubic 카운트업. IO로 `#achievements` 30% 진입 시 1회.
```js
achvCounts: {}, achvDone: false,
achvDisplay(s) {
  const m = String(s.count).match(/^([\d,]+)(.*)$/);
  if (!m) return s.count;
  const target = parseInt(m[1].replace(/,/g, ""), 10);
  const v = this.achvCounts[s.key] ?? (this.achvDone ? target : 0);
  return v.toLocaleString("ko-KR") + m[2];
},
startAchvCountup() {
  if (this.achvDone) return; this.achvDone = true;
  this.data.achievementSummary.forEach(s => {
    const m = String(s.count).match(/^([\d,]+)/);
    if (!m) return;
    const target = parseInt(m[1].replace(/,/g, ""), 10);
    if (REDUCE_MOTION) { this.achvCounts[s.key] = target; return; }
    const dur = 1200, t0 = performance.now();
    const tick = (t) => {
      const p = Math.min((t - t0) / dur, 1);
      this.achvCounts[s.key] = Math.round(target * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  });
},
```
트리거는 §4-1 패턴 복제: `init()`에서 `#achievements` 대상 IO(threshold 0.3) → `startAchvCountup()` → disconnect.

**리스트 stagger**: 탭 전환 시 x-for가 항목을 재생성하므로 CSS 애니메이션이 자동 재생된다.
```html
<article class="achievement-item" :style="'--d:' + i" …>
```
```css
.achievement-item { animation: fadeSlideUp 0.45s var(--ease-brush) both;
  animation-delay: calc(var(--d, 0) * 55ms); }
@keyframes fadeSlideUp { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: none; } }
```

**대표성과 골드 스윕**: `is-highlight` 카드에 6초 주기의 은은한 광택 스윕 1회전.
```css
.achievement-item.is-highlight { position: relative; overflow: hidden; }
.achievement-item.is-highlight::after { content: ""; position: absolute; inset: 0;
  pointer-events: none; transform: translateX(-130%);
  background: linear-gradient(115deg, transparent 42%, rgba(214,164,82,0.13) 50%, transparent 58%);
  animation: goldSweep 6s ease-in-out infinite; }
@keyframes goldSweep { 0%, 68% { transform: translateX(-130%); } 86%, 100% { transform: translateX(130%); } }
```

### 12-8. `#people` 연구진 — 팔레트 글로우 + 복사 확인 모프

**카드별 액센트 글로우**: 4인 카드에 §7 캐리커처 팔레트와 동일한 액센트를 hover 글로우로 선반영 (이미지 도입 전에도 개인 식별성 부여).
```css
#people .member-card:nth-child(1) { --accent: var(--ulsoo-gold); }
#people .member-card:nth-child(2) { --accent: var(--ulsoo-teal); }
#people .member-card:nth-child(3) { --accent: #4f74c2; }   /* navy 밝힘 */
#people .member-card:nth-child(4) { --accent: var(--ulsoo-coral); }
.member-avatar { transition: transform var(--mt-base) var(--ease-brush), box-shadow var(--mt-base); }
@media (hover: hover) {
  .member-card:hover .member-avatar { transform: translateY(-4px);
    box-shadow: 0 10px 28px color-mix(in srgb, var(--accent) 40%, transparent); }
}
```
(§4-6 카드 최상위 요소에 `member-card` 클래스, 아바타 래퍼에 `member-avatar` 클래스 추가. `color-mix` 미지원 브라우저는 글로우만 생략됨 — 무해.)

**복사 버튼 모프**: 클릭 시 copy 아이콘이 체크로 1.8초 바뀐다 (토스트와 병행).
```js
copied: "",   // ulsooApp 상태 추가
// copyEmail() 성공 분기에 추가:
this.copied = email;
// 기존 setTimeout 내부에 추가:
this.copied = "";
```
```html
<button type="button" @click="copyEmail(member.email)" …>
  <i data-lucide="copy" class="h-5 w-5" x-show="copied !== member.email"></i>
  <i data-lucide="check" class="h-5 w-5 text-emerald-300" x-show="copied === member.email" x-cloak></i>
</button>
```

### 12-9. 백투탑 버튼 (vanilla — 폴백에서도 동작)

`onclick` 인라인이므로 Alpine 부재 시에도 동작한다. footer 직전에 배치:
```html
<button type="button" class="to-top" aria-label="맨 위로"
        onclick="window.scrollTo({top:0,behavior:'smooth'})">
  <i data-lucide="arrow-up" class="h-5 w-5"></i><span class="sr-only-fallback">↑</span>
</button>
```
```css
.to-top { position: fixed; right: 1.25rem; bottom: 1.25rem; z-index: 55;
  display: grid; place-items: center; width: 2.75rem; height: 2.75rem;
  border: 1px solid rgba(214,164,82,0.4); border-radius: 0.25rem;
  background: rgba(5,10,20,0.85); color: var(--ulsoo-gold);
  opacity: 0; transform: translateY(10px); pointer-events: none;
  transition: opacity var(--mt-base), transform var(--mt-base); }
.to-top.is-show { opacity: 1; transform: none; pointer-events: auto; }
```
표시 토글은 12-2 `initScrollFx()`가 담당. lucide 미로드 시 `<span>` 화살표가 보이도록 `.sr-only-fallback`은 lucide 성공 시 JS로 숨긴다(선택 — 미구현 시 아이콘+텍스트 병기 허용).

### 12-10. reduced-motion 일괄 처리 (§6 기존 블록 **대체**)

```css
@media (prefers-reduced-motion: reduce) {
  .pulse-badge, .scan-line, .scroll-cue, .achievement-item,
  .achievement-item.is-highlight::after, .tech-acc.is-open .tag-pill { animation: none !important; }
  .hero-logo-panel .ulsoo-logo-mark { animation: none !important; stroke-dashoffset: 0; }
  .js-on .reveal { opacity: 1; transform: none; transition: none; }
  * { transition-duration: 0.01ms !important; }
}
```

### 12-11. 인터랙션 요약표 (구현 체크용)

| # | 위치 | 인터랙션 | 트리거 | 폴백 모드 | reduced-motion |
|---|---|---|---|---|---|
| 12-1 | 전 섹션 | 스크롤 리빌 + stagger | IO 진입 | 동작 | 즉시 표시 |
| 12-2 | 헤더 | 스파이 + 진행바 | IO/scroll | 동작 | 동작(모션 아님) |
| 12-3 | Hero | 로고 드로우, CTA 아이콘, 스크롤 큐 | 로드/hover | 정적 로고 | 정적 로고 |
| 12-4 | 여정 | 진행선 채움, 패널 전환, ←/→ | 클릭/키 | 전체 펼침 | 전환만 즉시 |
| 12-5 | 핵심기술 | CSS 아코디언, 칩 플래시 | 클릭 | 전체 펼침 | 즉시 개폐 |
| 12-6 | 실증사례 | 호버 오버레이, 라이트박스 ‹› | hover/클릭/키 | 이미지 정적 | 줌 없음 |
| 12-7 | 연구성과 | 집계 카운트업, stagger, 골드 스윕 | IO/탭 전환 | 최종값 정적 | 최종값 즉시 |
| 12-8 | 연구진 | 액센트 글로우, 복사 모프 | hover/클릭 | 정적 | 글로우만(무모션) |
| 12-9 | 전역 | 백투탑 | scroll>600 | 동작 | 동작 |
