# ULSOO 홈페이지 — 비주얼 디자인 상세 설계서 v1.0

> **이 문서의 역할**: 구현자가 시각적 판단을 임의로 내리지 않도록, 디자인 토큰 → 레이아웃 치수 → 컴포넌트 상태까지 전부 수치로 고정한다.
> - 문안·사진: `CONTENT_SPEC.md` / 구조·코드·데이터: `IMPLEMENTATION_SPEC.md` / 모션: 동 문서 §12
> - 본 문서는 **기존 index.html의 디자인 시스템을 재정의하지 않는다** — 이미 쓰이는 값을 토큰으로 승격하고, 신규 요소에만 새 값을 부여한다.

---

## 1. 디자인 토큰

### 1-1. 컬러 팔레트 (기존 `:root` 유지 + 역할 정의)

| 토큰 | HEX | 역할 (이 용도 외 사용 금지) |
|---|---|---|
| `--ulsoo-ink` | `#050a14` | 페이지 배경, 버튼 위 텍스트(골드 버튼) |
| `--ulsoo-navy` | `#173d7a` | 로고 스트로크, 배경 그라데이션. 텍스트 사용 금지(대비 부족) |
| `--ulsoo-deep-blue` | `#102852` | 배경 보조 |
| `--ulsoo-teal` | `#249aa4` | **인터랙티브**: 링크 hover, 현재 네비, 테두리 활성, 검증 수치 칩 |
| `--ulsoo-gold` | `#d6a452` | **강조·성과**: 주 CTA, 활성 탭, 대표성과, 날짜 뱃지, KPI 1순위 |
| `--ulsoo-red` | `#9a2b24` | 로고 전용. UI 사용 금지 |
| `--ulsoo-coral` | `#e45f42` | **"진행 중" 상태 전용** (ULSOO 노드, KPI 특허 칸). 대비가 낮으므로 굵은 큰 글씨(≥1.1rem bold)에만 |
| `--ulsoo-cream` | `#fffaf0` | 헤드라인·본문 밝은 텍스트 |

**텍스트 밝기 위계** (다크 배경 위):
| 용도 | 값 | 참고 |
|---|---|---|
| 헤드라인 | `#ffffff` 또는 cream | H1·H2·카드 제목 |
| 강조 텍스트 | `#e8bb68`(골드 밝힘) / `#5bd0d9`(틸 밝힘) | 기존 !important 오버라이드 유지 |
| 본문 | `#cbd5e1` (slate-300) | desc·lede |
| 보조 | `#94a3b8` (slate-400) | 라벨·캡션 |
| 최저 위계 | `rgba(255,250,240,0.52)` | 푸터·저작권 |

**대비 규칙**: `#5bd0d9`·`#e8bb68`·`#cbd5e1`은 배경 `#07101f` 대비 AA 충족(본문 가능). `--ulsoo-coral` 원색과 `#94a3b8`는 **18px 이상 bold 또는 장식**에만. navy는 텍스트 금지.

**조합 금지**: 한 컴포넌트 안에서 골드 강조와 틸 강조를 동급으로 병치하지 않는다 — 골드 = "결과·성과", 틸 = "상호작용·검증"으로 의미를 분리한다. (예: 탭 활성 테두리는 틸, 그 안의 대표성과 뱃지는 골드 — 이는 위계가 다르므로 허용)

### 1-2. 타이포그래피 스케일

폰트: Pretendard(현행 유지). 자간 기본 0, 숫자는 `font-variant-numeric: tabular-nums`(카운트업 요소 전부).

| 토큰 | 크기 | weight | 용도 |
|---|---|---|---|
| `display` | `clamp(2.7rem, 6vw, 4.6rem)` / line 1.08 | 900 | H1 (기존값 유지) |
| `h2` | `clamp(2rem, 4vw, 3rem)` / 1.12 | 900 | 섹션 제목 (기존값) |
| `h3` | `1.5rem` / 1.25 | 900 | 카드 제목 |
| `verb` | `clamp(1.6rem, 3vw, 2.2rem)` / 1.2 | 900 | 여정 동사 (골드) |
| `stat` | `1.7rem` / 1.1 | 900 | 집계 숫자 |
| `body-lg` | `1.125rem` / 1.75 | 400 | Hero 부제·lede |
| `body` | `0.9rem` / 1.75 | 400 | 카드 본문 |
| `label` | `0.875rem` / 1.4 | 700–800 | 네비·탭 라벨 |
| `caption` | `0.75rem` / 1.4 | 700–900 | kicker·뱃지·칩·날짜 |

kicker는 항상 `uppercase + 0.875rem + 900 + 틸(#5bd0d9)` — 전 섹션 통일(기존 `.section-kicker`).

### 1-3. 스페이싱 (4pt 기반, 기존 값 승격)

`0.25 / 0.5 / 0.75 / 1 / 1.25 / 1.5 / 2 / 3 / 6 rem`만 사용. 주요 고정값:

| 위치 | 값 |
|---|---|
| 섹션 상하 패딩 | `6rem` (py-24, 현행) |
| 섹션 헤더 → 본문 | `3rem` |
| 카드 내부 패딩 | `1.5rem` (glass-card 현행) |
| 그리드 gap | `1.5rem` (카드) / `0.75rem` (탭·칩) |
| 콘텐츠 최대폭 | `80rem` (max-w-7xl) / 성과·여정 패널 `64rem` |

### 1-4. 형태·표면

| 토큰 | 값 |
|---|---|
| 라운드 | `0.25rem` 단일 (pill 요소만 `999px`) — 현행 유지, 큰 라운드 도입 금지 |
| 카드 표면 | `.glass-card` 현행 (rgba(7,16,31,0.68) + blur 14px + 골드 20% 테두리) |
| 글로우 | 골드 `0 0 28px rgba(214,164,82,0.28)` / 틸 `0 0 24px rgba(36,154,164,0.24)` 2종만 |
| 구분선 | `1px solid rgba(30,41,59,0.8)` (섹션 경계, 현행) |

---

## 2. 반응형 레이아웃 시스템

브레이크포인트 2개(현행 900px 유지 + Tailwind sm 640px 활용): **D**esktop >900 / **T**ablet 641–900 / **M**obile ≤640.

| 섹션 | D | T | M |
|---|---|---|---|
| Hero | 2컬럼 `1.08fr : 0.92fr`, gap 3rem | 1컬럼 (텍스트 → 로고 패널) | 동일, H1 `clamp(1.8rem, 8.2vw, 2.08rem)` (현행 모바일 값) |
| Hero KPI | 4칸 1행 | 2×2 | 2×2 |
| 여정 타임라인 | 가로 노드 3 + 라인 | 가로 유지 | **3열 grid 버튼** (라인 숨김) |
| 여정 패널 | 2컬럼 `0.9fr : 1.1fr` (좌 verb·미션 / 우 하이라이트) | 1컬럼 스택 | 1컬럼 |
| 기술 분야 바 | 3열 | 3열 | 1열 스택 |
| 기술 패널 | 상단 풀폭(tagline·overview) + 아코디언 풀폭 | 동일 | 동일 |
| 실증 카드 | 3×2 | 2×3 | 1×6 |
| 성과 집계 | 4열 | 2×2 | 2×2 |
| 성과 패널 | `0.9fr : 1.1fr` | 1컬럼 | 1컬럼 |
| 연구진 | 4열 | 2×2 | 1열 (또는 2열 유지 — 카드 최소폭 9rem 확보 시) |
| 네트워크 orgs | 4열 | 2열 | 2열 |

**모바일 공통**: 가로 스크롤 절대 금지. 스크롤 큐·호버 오버레이 비표시. 터치 타깃 최소 44×44px (노드 도트는 시각 14px + 패딩으로 44px 확보).

---

## 3. 섹션별 상세 레이아웃 (데스크톱 기준 치수)

### 3-1. `#home` Hero
```
┌────────────────────────────── max-w-7xl ──────────────────────────────┐
│ [배지 pill]                                    ┌──────────────────────┐ │
│ [kicker 골드]                                  │  hero-logo-panel     │ │
│ [H1 display 흰색 max-w-5xl]                    │  (min-h 34rem)       │ │
│ [부제 body-lg slate-300 max-w-2xl]             │  로고 SVG 18rem       │ │
│ [CTA골드] [CTA틸아웃라인]   gap 1rem            │  ULSOO 워드마크       │ │
│                                                │  캡션 → KPI 4칸      │ │
│              [scroll-cue 중앙 하단]             └──────────────────────┘ │
└────────────────────────────────────────────────────────────────────────┘
```
- CTA 높이 3.5rem(py-4 px-6), 아이콘 20px 좌측.
- KPI 칸: 상 숫자(stat·색상별) / 하 라벨(caption·slate-400), 칸 구분 1px 골드 22%.

### 3-2. `#journey`
```
[섹션 헤더: kicker / H2 / lede max-w-3xl]        ← 3rem ↓
[타임라인 바: ●──────●──────●  높이 ~5rem, max-w-4xl 중앙]
   위: period(caption slate-400) / 아래: title(label 900)
                                                  ← 2rem ↓
[패널 max-w-5xl: ┌ 좌 0.9fr ──────┬ 우 1.1fr ─────────────┐
                 │ verb(골드 대형) │ 하이라이트 3건          │
                 │ title/subtitle │ (.achievement-item)    │
                 │ funder caption │                        │
                 │ mission body   │ partners 1줄 caption   │
                 └────────────────┴────────────────────────┘]
```
- 노드 도트 14px, 활성 시 scale 1.25 + 골드. 노드-라벨 간격 0.4rem.
- verb 아래 1rem 여백 후 title(h3)+subtitle(caption 틸).

### 3-3. `#technologies`
- 분야 바: 3버튼, 각 버튼 내부 좌측 아이콘 24px + 우측 텍스트 2행(category caption 골드 / title label 900).
- 패널: tagline(골드, `1.25rem` 900) → overview(body, max-w-3xl) → 1rem ↓ → 아코디언 목록(행 간격 0.6rem).
- 아코디언 헤더 높이 ~3.4rem(py-0.9rem), name 좌 / metric 칩+chevron 우.

### 3-4. `#projects`
- 카드: 이미지 16:9 → 창 헤더(신호등+tag, py-3 px-4) → 본문 p-6.
- 본문 내부: 제목(h3) + 부제(caption 틸) 상단, desc(body) `min-h 10.5rem` 제거하고 자연 높이 (6카드라 행별 높이 불일치 허용 — grid row가 자동 정렬).
- 뱃지는 카드 하단 구분선 위 우측(현행 패턴).

### 3-5. `#achievements`
- 집계 스트립: 4칸, 각 칸 좌측정렬 — 상: 아이콘 20px+라벨(label), 중: 숫자(stat, publications·patents=골드 / awards·business=틸 교차), 하: detail(caption slate-400).
- 활성 칸: 틸 테두리 + 배경 그라데이션(기존 `.achievement-tab.is-active` 사양).
- 패널: 좌 summary(eyebrow caption 골드 → 제목 h3 → desc body) / 우 items 리스트.

### 3-6. `#people`
- 카드(위→아래): 아바타 정사각 → 1rem ↓ 이름(1.5rem 900 흰) → role(caption 골드) → inst(caption slate-400) → 0.75rem ↓ tags pill 랩 → 1rem ↓ 이메일 행(주소 caption 틸 + 복사 버튼 36px).
- 이니셜 아바타(이미지 전 단계): 배경 `rgba(255,250,240,0.04)` + 중앙 이니셜 3rem 900 골드 + 우하단에 heritage-grid 패턴 은은히.
- 네트워크 밴드: 카드 아래 1.5rem, 풀폭 glass-card. orgs 4열 pill-grid.

---

## 4. 컴포넌트 상태 매트릭스

전역 포커스: `:focus-visible { outline: 2px solid var(--ulsoo-teal); outline-offset: 3px; border-radius: 0.25rem; }` — 모든 인터랙티브 요소 공통. 골드 배경 버튼 위에서만 `outline-color: var(--ulsoo-cream)`.

| 컴포넌트 | default | hover | active/selected | 비고 |
|---|---|---|---|---|
| 네비 링크 | slate-300 | 틸 텍스트 | `.is-current`: 틸 + 밑줄(offset 6px) | §12-2 |
| CTA 골드 | 골드 그라데이션 + ink 텍스트 + 골드 글로우 | translateY(-4px) + 아이콘 +4px | pressed: translateY(-2px) | |
| CTA 아웃라인 | 틸 45% 테두리 + 틸 14% 배경 | 테두리 틸 300 + 리프트 | 동일 | |
| 여정 노드 | 도트 틸 테두리·ink 채움 | 도트 scale 1.1 | 활성: 골드 채움 + scale 1.25, ULSOO는 +펄스 | role=tab |
| 분야 탭 / 집계 탭 | `.achievement-tab` 사양 | 리프트 -0.15rem + 틸 테두리 | `.is-active`: 틸 테두리 + 그라데이션 배경 + cream 텍스트 | |
| 아코디언 헤더 | cream 800 | 배경 `rgba(255,250,240,0.03)` | `.is-open`: 틸 테두리 + chevron 180° + 칩 펄스 1회 | aria-expanded |
| 실증 카드 | glass-card | 리프트 -0.5rem + 틸 테두리(현행) + 이미지 zoom 1.05 + 오버레이 | — | 카드 전체가 버튼 아님, 이미지 영역만 클릭 |
| 연구진 카드 | glass-card (이재호만 골드 테두리+글로우) | 아바타 -4px + 액센트 글로우 | — | |
| 복사 버튼 | 틸 아웃라인 36px | 배경 틸 20% | 클릭: check 아이콘 1.8s | |
| 라이트박스 ‹› | slate 테두리 40px 원형 grid | 틸 테두리 | — | aria-label |
| to-top | 골드 테두리 44px | 배경 밝힘 | `.is-show`만 표시 | |

비활성(disabled) 상태는 이 사이트에 존재하지 않는다 — 만들지 말 것.

---

## 5. 프로필 이미지 아트 디렉션 (Phase 3, 캐리커처 채택 시)

**스타일**: 플랫 벡터 캐리커처 + 한국 전통 오방색 감성. 두꺼운 균일 아웃라인(로고 스트로크와 동일 계열), 셀 셰이딩 1단계, 사실적 질감 금지. 4인이 **한 세트**로 보여야 한다(동일 선굵기·시점·크기).

| 항목 | 사양 |
|---|---|
| 캔버스 | 1024×1024 원본 → 512×512 WebP q85 배치 |
| 구도 | 어깨 위 버스트, 3/4 좌향 시점 통일, 얼굴 높이 캔버스의 55% |
| 배경 | ink(#050a14) + 인물 뒤 액센트색 radial glow + heritage-grid 미세 패턴 |
| 액센트 매핑 | 이재호=골드 / 김희권=틸 / 박찬우=#4f74c2 / 백서현=코랄 (§12-8 글로우와 동일) |
| 표정 | 밝은 미소, 전문적. 과장은 온화한 수준(광대·눈웃음)까지만 |
| 소품(선택) | 각 1개 이하: 이재호=서책 / 김희권=회로 문양 / 박찬우=3D 와이어프레임 유물 / 백서현=붓·안료 접시 |

**생성 프롬프트 템플릿** (이미지 생성 모델용, 인물 사진 제공 후):
> flat vector caricature portrait, bust shot, 3/4 view facing left, warm smile, bold uniform dark-navy outline, single-step cel shading, Korean traditional obangsaek accent, background: near-black (#050a14) with a soft radial glow of {ACCENT_HEX} and a faint hanok lattice grid pattern, no photorealism, no text, 1:1

**사진 채택 시 대체 규칙**: 동일 배경 합성 불가한 실사진이면 — 정사각 크롭(얼굴 중심 상단 1/3), 흑백 처리 후 액센트색 duotone(어두운부 ink / 밝은부 액센트 70%)으로 4인 톤 통일.

---

## 6. OG 이미지·파비콘 (Phase 3)

**OG 커버** (`assets/img/og-cover.webp`, 1200×630):
- 배경: ink + 좌상 red 16%·우상 teal 20% radial(본문 body 그라데이션 축소판)
- 좌측 55%: ULSOO 로고 마크(스트로크 원색, 높이 340px) + 하단 워드마크 `ULSOO` 900
- 우측 45%: 3행 타이포 — `기록하다` `연결하다` `되살리다` (verb 스케일, 골드→틸→코랄 순 배색), 최하단 caption `ETRI AI & 3D Digital Heritage R&D`
- 텍스트 안전 여백 60px

**파비콘**: 기존 SVG 심볼에서 주 획 4개(navy 대각 획, red 가로 획, teal 우상 획, gold 중앙 획)만 남긴 단순화 버전을 inline SVG data URI로 `<link rel="icon">`. 32px에서 획이 뭉개지면 gold 단색 `얼` 자 형태로 대체 (TODO_CONFIRM: 단순화 시안 사용자 확인).

---

## 7. 폴백 모드 시각 사양 (§7 보완)

폴백(Alpine 부재)은 기능이 아니라 **가독**이 목표:
- 탭·아코디언 콘텐츠를 전부 펼치되, 각 그룹 사이 `2rem` 여백 + 그룹 제목은 h3 사양 유지
- 인터랙션 전용 장식(진행선, 스크롤 큐, 오버레이) 미렌더 — 빈 자리 없이 자연 흐름
- 리빌·진행바·백투탑은 vanilla이므로 동작 (§12-0 표 참조)

---

## 8. 검증 체크리스트 (디자인 QA — §10에 추가 수행)

- [ ] 골드/틸 역할 혼용 없음 (성과=골드, 인터랙션=틸 그대로인지 전 섹션 육안 확인)
- [ ] coral·slate-400이 본문 크기(≤0.9rem 400)로 쓰인 곳 없음
- [ ] 모든 인터랙티브 요소에 `:focus-visible` 링 표시 (Tab 순회로 확인)
- [ ] 라운드 0.25rem/999px 외 값 없음, 새 글로우 색 없음
- [ ] 375px·768px·1280px 3폭에서 §2 표와 레이아웃 일치
- [ ] 카운트업 숫자에 tabular-nums 적용 (자릿수 흔들림 없음)
- [ ] 4인 아바타(이니셜 단계 포함)의 크기·정렬 통일
