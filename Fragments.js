import { gql } from "apollo-boost";

export const POST_FRAGMENT = gql`
  fragment PostParts on Post {
    id
    location
    caption
    likes {
      post {
        user {
          username
        }
      }
    }
    user {
      id
      avatar
      username
      fullName
    }
    files {
      id
      url
    }
    likeCount
    isLiked
    comments {
      id
      text
      isCommented
      user {
        avatar
        id
        username
      }
    }
    createdAt
  }
`;

export const USER_FRAGMENT = gql`
  fragment UserParts on User {
    id
    avatar
    username
    fullName
    firstName
    lastName
    isFollowing
    isSelf
    bio
    followingCount
    followersCount
    postsCount
    posts {
      ...PostParts
    }
  }
  ${POST_FRAGMENT}
`;