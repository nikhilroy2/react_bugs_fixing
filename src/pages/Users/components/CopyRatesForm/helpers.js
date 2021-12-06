export const parseValues = (users) => ({
  value: users.map((el) => ({ id: el.id, title: `${el.username} (${el.custom_rates})` })),
})
