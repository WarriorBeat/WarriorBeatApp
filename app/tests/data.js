/**
 * __tests__/data.js
 * Component Test
 * tests
 */

import UUID from "uuid/v4"
/* eslint-disable */

export const author = () => ({
  id: UUID(),
  name: "Myles Hudson",
  title: "Lead Designer",
  bio:
    'Myles Hudson is a freshman and this is his first year on the Warrior Beat Newspaper Staff. He is the first freshman to be on staff. Myles enjoys playing tennis and Fortnite with friends and watching Netflix. He also enjoys "nerding" out about new technology.',
  staffYear: 1,
  gradeYear: 11,
  profileImage: {
    id: UUID(),
    url:
      "https://s3.amazonaws.com/warriorbeat-graphql-media-dev/media/a816ba91-1b34-45d8-b9ea-774e58c9583e_d52b98fd-09f2-4ede-a1af-062a06e46d43.jpeg",
  },
  posts: [
    {
      id: UUID(),
      title: "Warrior swim team advances to state meet",
      createdOn: "Apr 08 2019",
      categories: [
        {
          id: UUID(),
          name: "School",
        },
        {
          id: UUID(),
          name: "Sports",
        },
      ],
      coverImage: {
        id: UUID(),
        url:
          "https://s3.amazonaws.com/warriorbeat-graphql-media-dev/media/a816ba91-1b34-45d8-b9ea-774e58c9583e_ebe6c4b7-2892-4c7a-b144-847198d6c81e.jpeg",
      },
    },
  ],
})
