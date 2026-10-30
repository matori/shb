import deepFreeze from "~/utils/deepFreeze"

// labelSegments: タブの幅が狭いときに改行してよい位置で区切ったラベル
const categories = [
  {
    key: "all",
    label: "総合",
  },
  {
    key: "general",
    label: "一般",
  },
  {
    key: "social",
    label: "世の中",
  },
  {
    key: "economics",
    label: "政治と経済",
    labelSegments: ["政治と", "経済"],
  },
  {
    key: "life",
    label: "暮らし",
  },
  {
    key: "knowledge",
    label: "学び",
  },
  {
    key: "it",
    label: "テクノロジー",
    labelSegments: ["テクノ", "ロジー"],
  },
  {
    key: "fun",
    label: "おもしろ",
    labelSegments: ["おも", "しろ"],
  },
  {
    key: "entertainment",
    label: "エンタメ",
    labelSegments: ["エン", "タメ"],
  },
  {
    key: "game",
    label: "アニメとゲーム",
    labelSegments: ["アニメと", "ゲーム"],
  },
]

const ENTRY_CATEGORIES = deepFreeze(categories)

export default ENTRY_CATEGORIES
