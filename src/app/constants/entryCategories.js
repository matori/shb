import deepFreeze from "deep-freeze"

const categories = [
  {
    key: "all",
    label: "総合",
    display: "総合",
  },
  {
    key: "general",
    label: "一般",
    display: "一般",
  },
  {
    key: "social",
    label: "世の中",
    display: "世の中",
  },
  {
    key: "economics",
    label: "政治と経済",
    display: "政治と<wbr>経済",
  },
  {
    key: "life",
    label: "暮らし",
    display: "暮らし",
  },
  {
    key: "knowledge",
    label: "学び",
    display: "学び",
  },
  {
    key: "it",
    label: "テクノロジー",
    display: "テクノ<wbr>ロジー",
  },
  {
    key: "fun",
    label: "おもしろ",
    display: "おも<wbr>しろ",
  },
  {
    key: "entertainment",
    label: "エンタメ",
    display: "エン<wbr>タメ",
  },
  {
    key: "game",
    label: "アニメとゲーム",
    display: "アニメと<wbr>ゲーム",
  },
]

const ENTRY_CATEGORIES = deepFreeze(categories)

export default ENTRY_CATEGORIES
