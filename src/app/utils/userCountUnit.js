const pluralRules = new Intl.PluralRules("en-US")

// ブックマーク数につける単位。英語の数え方に合わせて、1なら user、それ以外（0も含む）は users
function userCountUnit(count) {
  return pluralRules.select(count) === "one" ? "user" : "users"
}

export default userCountUnit
