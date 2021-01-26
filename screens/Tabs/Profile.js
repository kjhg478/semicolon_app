import React, { useState } from "react";
import { ScrollView, RefreshControl } from "react-native";
import { gql } from "apollo-boost";
import { USER_FRAGMENT } from "../../fragment";
import Loader from "../../components/Loader";
import { useQuery } from "react-apollo-hooks";
import UserProfile from "../../components/UserProfile";
import styled from "styled-components/native";

export const ME = gql`
  {
    me {
      user{
          id
          avatar
          username
          fullName
          isFollowing
          isSelf
          bio
          followingCount
          followersCount
          postsCount
      }
          posts {
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
        id
        username
      }
    }
    createdAt
          }
      }
    }
`;

export default ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
  const { loading, data, refetch } = useQuery(ME);
    const refresh = async () => {
    try {
      setRefreshing(true);
      await refetch();
    } catch (e) {
      console.log(e);
    } finally {
      setRefreshing(false);
    }
  };


  console.log(loading, data);
  return (
      <ScrollView refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={refresh} />
      }>
      {loading ? <Loader /> : data && data.me && <UserProfile {...data.me} />}
    </ScrollView>
  );
};