import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  TextInput,
  Image,
} from "react-native";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const Forum = ({ route }) => {
  const { nickname, userType } = route.params;
  const [tweets, setTweets] = useState([]);
  const [newTweetText, setNewTweetText] = useState("");
  const [commentText, setCommentText] = useState("");
  const [commentingTweetId, setCommentingTweetId] = useState("");
  const [showCommentsForTweetId, setShowCommentsForTweetId] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <View style={styles.headerLeftContainer}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.goBackButton}
          >
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.goBackButtonText}></Text>
        </View>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = () => {
    axios
      .get("http://192.168.1.110/compproject/get_all_questions.php")
      .then((response) => {
        if (response.data && Array.isArray(response.data)) {
          const data = response.data.map((item) => ({
            ...item,
            id: item.question_id,
            comments: [],
          }));
          console.log("Fetched data:", data);
          setTweets(data);
        } else {
          console.error("Error: Invalid data format");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleToggleComments = (tweetId) => {
    setShowCommentsForTweetId((prevId) => (prevId === tweetId ? "" : tweetId));
  };

  const handleAddButtonPress = () => {
    navigation.navigate("SearchAndAdd");
  };

  const handleAddTweet = () => {
    if (newTweetText.trim() !== "") {
      axios
        .post("http://192.168.1.110/compproject/entquestion.php", {
          nickname,
          question_text: newTweetText.trim(),
          userType,
        })
        .then((response) => {
          console.log("Question submitted:", response.data);
          const newTweet = {
            id: Date.now().toString(),
            question_text: newTweetText.trim(),
            image: null,
            liked: false,
            likes: 0,
            comments: [],
          };
          setTweets([newTweet, ...tweets]);
          setNewTweetText("");
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  const handleLike = (questionId) => {
    setTweets((prevTweets) =>
      prevTweets.map((tweet) =>
        tweet.id === questionId
          ? {
              ...tweet,
              liked: !tweet.liked,
              likes: tweet.liked ? tweet.likes - 1 : tweet.likes + 1,
            }
          : tweet
      )
    );
  };

  const handleComment = (questionId) => {
    setShowCommentsForTweetId((prevId) =>
      prevId === questionId ? "" : questionId
    );
    setCommentingTweetId((prevId) => (prevId === questionId ? "" : questionId));
    setCommentText("");
  };

  const handleAddComment = () => {
    if (commentText.trim() !== "") {
      axios
        .post("http://192.168.1.110/compproject/add_comments.php", {
          question_id: commentingTweetId,
          nickname,
          comment_text: commentText.trim(),
          userType,
        })
        .then((response) => {
          console.log("Comment added:", response.data);
          const updatedTweets = tweets.map((tweet) =>
            tweet.id === commentingTweetId
              ? {
                  ...tweet,
                  comments: [
                    ...tweet.comments,
                    { nickname, text: commentText.trim(), userType },
                  ],
                }
              : tweet
          );
          setTweets(updatedTweets);
          setCommentText("");
          setCommentingTweetId("");
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("./assets/forum.jpg")}
        style={styles.backgroundImage}
      />

      <FlatList
        data={tweets}
        renderItem={({ item }) => (
          <View style={styles.tweetContainer}>
            <View style={styles.avatar}></View>
            <View style={styles.tweetContent}>
              <Text style={styles.nickname}>
                {item.nickname}{" "}
                {item.userType === "expert" && (
                  <AntDesign name="checkcircle" size={16} color="green" />
                )}
              </Text>

              <Text style={styles.tweetText}>
                Question ID: {item.question_id} - {item.question_text}
              </Text>

              {item.image && (
                <Image source={{ uri: item.image }} style={styles.tweetImage} />
              )}
              <View style={styles.actionsContainer}>
                <TouchableOpacity
                  onPress={() => handleLike(item.id)}
                  style={styles.actionButton}
                >
                  <Ionicons
                    name={item.liked ? "heart" : "heart-outline"}
                    size={20}
                    color={item.liked ? "pink" : "#657786"}
                  />
                  <Text style={styles.actionButtonText}>{item.likes}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleComment(item.id)}
                  style={styles.actionButton}
                >
                  <Ionicons
                    name="chatbubble-outline"
                    size={20}
                    color="#657786"
                  />

                  <Text style={styles.actionButtonText}>Comment</Text>
                </TouchableOpacity>
              </View>
              {item.id === showCommentsForTweetId && (
                <View style={styles.commentContainer}>
                  <TextInput
                    style={styles.commentInput}
                    placeholder="Add a comment..."
                    value={commentText}
                    onChangeText={(text) => setCommentText(text)}
                  />
                  <TouchableOpacity
                    onPress={handleAddComment}
                    style={styles.addButton}
                  >
                    <Text style={styles.addButtonText}>Add</Text>
                  </TouchableOpacity>
                </View>
              )}

              {item.comments &&
                item.comments.map((comment, index) => (
                  <View key={index} style={styles.commentBox}>
                    <Text style={styles.commentText}>
                      {comment.nickname}{" "}
                      {comment.userType === "expert" && (
                        <AntDesign name="checkcircle" size={16} color="green" />
                      )}
                      : {comment.text}
                    </Text>
                  </View>
                ))}
            </View>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />

      <View style={styles.addTweetContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add..."
          value={newTweetText}
          onChangeText={(text) => setNewTweetText(text)}
        />
        <TouchableOpacity onPress={handleAddTweet} style={styles.addButton}>
          <Ionicons name="add" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F2DE",
  },
  addButton: {
    position: "absolute",
    bottom: 70,
    right: 30,
  },
  goBackButton: {
    marginRight: 8,
  },
  goBackButtonText: {
    color: "#1DA1F2",
    fontSize: 16,
  },
  headerLeftContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  nickname: {
    fontWeight: "bold",
    marginBottom: 4,
  },

  backgroundImage: {
    position: "absolute",
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    opacity: 0.6,
  },
  tweetContainer: {
    flex: 1,
    borderWidth: 1.5,
    borderColor: "#DAC0A3",
    borderRadius: 10,
    marginRight: 6,
    marginLeft: 6,
    marginTop: 10,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "flex-start",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  tweetContent: {
    flex: 1,
  },
  tweetText: {
    fontSize: 16,
    marginBottom: 8,
  },
  tweetImage: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    marginBottom: 8,
  },
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  actionButtonText: {
    marginLeft: 4,
    color: "#657786",
  },
  commentContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  commentInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#739072",
    borderRadius: 10,
    padding: 8,
    marginRight: 6,
    marginTop: 4,
    marginBottom: 6,
  },
  addButton: {
    backgroundColor: "#739072",
    borderRadius: 10,
    padding: 8,
  },
  addButtonText: {
    color: "#fff",
  },
  commentBox: {
    backgroundColor: "#DAC0A3",
    borderRadius: 10,
    padding: 8,
    marginRight: 6,
    marginTop: 4,
    marginBottom: 6,
  },
  commentText: {
    color: "#333",
  },
  addTweetContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#AF8260",
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    borderRadius: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#739072",
    borderRadius: 4,
    padding: 8,
    marginRight: 8,
  },
});

export default Forum;
