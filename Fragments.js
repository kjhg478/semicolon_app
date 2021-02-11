import { gql } from "apollo-boost";

export const POST_FRAGMENT = gql`
  fragment PostParts on Post {
    id
    location
    caption
    user {
      id
      avatar
      username
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
    moToken
    rooms {
      id
      participants{
        id
      }
    }
    following{
      id
      username
      avatar
    }
    followingCount
    followersCount
    postsCount
    posts {
      ...PostParts
    }
  }
  ${POST_FRAGMENT}
`;

export const ME = gql`
  {
    me {
      ...UserParts
    }
  }
  ${USER_FRAGMENT}
`;