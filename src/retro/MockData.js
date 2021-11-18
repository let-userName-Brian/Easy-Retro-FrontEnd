export const mock_users = [
  { user_id: "c1ad74ae-b651-4fa0-9820-833193797964", user_name: 'Floyd', is_dark_mode: false },
  { user_id: "0e5639ea-8868-4bf6-ab5f-cb8a8d470785", user_name: 'Mario', is_dark_mode: false },
  { user_id: "a4e73f0d-60c2-4c30-8e7a-d54f637a8760", user_name: 'Brian', is_dark_mode: true },
  { user_id: "1c1543a6-9cdd-4616-a5d7-3021b0bf40ad", user_name: 'Dustin', is_dark_mode: true },
  { user_id: "325353e8-dac3-4e3d-bbc0-8d02de38d1ff", user_name: 'Stephen', is_dark_mode: true },
  { user_id: "7c8c5100-544d-45f3-9cee-3fed3d1a9a5d", user_name: 'Chasten', is_dark_mode: true },
  { user_id: "e8c00cd6-4077-470f-8b61-17a4a1386959", user_name: 'James' }
]

export const mock_retro = {
  retro_id: "e0fef645-088d-4f13-b53a-ccb95f4f2131",
  retro_name: "Chasten's Thoughts on Mjolnir",
  column_ids: JSON.stringify([1, 2, 3]),
  tags: ["aypples", "banaynays"]
}

export const mock_columns = () => {
  let n = 1
  return [{ column_id: 1, column_name: 'OMGood', card_ids: JSON.stringify([n++, n++, n++]) },
  { column_id: 2, column_name: 'Did not go well', card_ids: JSON.stringify([n++, n++, n++]) },
  { column_id: 3, column_name: 'Hated', card_ids: JSON.stringify([n++, n++, n++]) }]
}

export const mock_cards = () => {
  let arr = []
  for (let card_id = 1; card_id < 50; card_id++) {
    arr.push({
      card_id,
      card_text: "Four dollar toast photo booth chia selfies biodiesel occupy chambray VHS snackwave.",
      user_id: "c1ad74ae-b651-4fa0-9820-833193797964",
      votes: { "c1ad74ae-b651-4fa0-9820-833193797964": "up_vote" }
    })
  }
  return arr
}

export const mock_comments = () => {
  let arr = []
  for (let comment_id = 1; comment_id < 50; comment_id++) {
    arr.push({
      comment_id,
      comment_text: "Four dollar toast photo booth chia selfies biodiesel occupy chambray VHS snackwave.",
      user_id: "c1ad74ae-b651-4fa0-9820-833193797964",
      card_id: comment_id,
      reactions: { "c1ad74ae-b651-4fa0-9820-833193797964": "banana" }
    })
  }
  return arr
}