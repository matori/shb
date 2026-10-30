// ブックマーク数につける単位。2人以上なら users
function userCountUnit(count) {
  return count > 1 ? "users" : "user"
}

export default userCountUnit
