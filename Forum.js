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
      .get("http://10.30.10.210/compproject/get_all_questions.php")
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
        .post("http://10.30.10.210/compproject/entquestion.php", {
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
        .post("http://10.30.10.210/compproject/add_comments.php", {
          question_id: commentingTweetId,
          nickname,
          comment_text: commentText.trim(),
          userType,
        })
        .then((response) => {
          console.log("Comment added:", response.data);
          // Yeni yorumun veri yapısına eklenmesi
          const updatedTweets = tweets.map((tweet) =>
            tweet.id === commentingTweetId
              ? {
                  ...tweet,
                  comments: [
                    ...tweet.comments,
                    { nickname, comment_text: commentText.trim(), userType },
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
  const fetchComments = (questionId) => {
    axios
      .post("http://10.30.10.210/compproject/get_all_comments.php", {
        question_id: questionId,
      })
      .then((response) => {
        console.log("Comments fetched:", response.data);
        const updatedTweets = tweets.map((tweet) =>
          tweet.id === questionId
            ? { ...tweet, comments: response.data }
            : tweet
        );
        setTweets(updatedTweets);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.backgroundImage}>
        <Image
          source={require("./assets/forum.jpg")}
          style={StyleSheet.absoluteFillObject}
          resizeMode="cover"
        />
      </View>

      <FlatList
        data={tweets}
        renderItem={({ item }) => {
          if (!item) {
            return null; // Avoid rendering if item is undefined
          }

          return (
            <View style={styles.tweetContainer}>
              <View style={styles.avatar}></View>
              <View style={styles.tweetContent}>
                <Text style={styles.nickname}>
                  {item.nickname || "Unknown"}{" "}
                  {item.userType === "expert" && (
                    <AntDesign name="checkcircle" size={16} color="green" />
                  )}
                </Text>

                <Text style={styles.tweetText}>
                  Question ID: {item.question_id} - {item.question_text}
                </Text>

                {item.image && (
                  <Image
                    source={{ uri: item.image }}
                    style={styles.tweetImage}
                  />
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
                    onPress={() => {
                      handleComment(item.id);
                      fetchComments(item.id);
                    }}
                    style={styles.actionButton}
                  >
                    <Ionicons
                      name="chatbubble-outline"
                      size={20}
                      color="#657786"
                    />

                    <Text style={styles.actionButtonText}>add</Text>
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
                      onPress={() => {
                        handleAddComment();
                        // Hide the comments section after adding a comment
                      }}
                      style={styles.addButton}
                    >
                      <Text style={styles.addButtonText}>Add</Text>
                    </TouchableOpacity>
                  </View>
                )}

                {item.id === showCommentsForTweetId &&
                  Array.isArray(item.comments) &&
                  item.comments.map((comment, index) => (
                    <View key={index} style={styles.commentBox}>
                      <Text style={[styles.commentText, { color: "black" }]}>
                        {comment.nickname || "Unknown"}{" "}
                        {comment.userType === "expert" && (
                          <AntDesign
                            name="checkcircle"
                            size={16}
                            color="green"
                            style={{ marginLeft: 5 }} // Yeşil işaretin sol boşluğunu ayarla
                          />
                        )}
                        : {comment.comment_text}
                      </Text>
                    </View>
                  ))}
              </View>
            </View>
          );
        }}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.tweetList}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="What's happening?"
          value={newTweetText}
          onChangeText={(text) => setNewTweetText(text)}
        />
        <TouchableOpacity onPress={handleAddTweet} style={styles.addButton}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "white",
  },
  tweetContainer: {
    flexDirection: "row",
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e1e8ed",
    paddingBottom: 8,
  },
  commentText: {
    color: "black", // Yorum yazısının rengi siyah olacak
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#ccc",
    marginRight: 12,
  },
  tweetContent: {
    flex: 1,
  },
  nickname: {
    fontWeight: "bold",
    fontSize: 16,
  },
  tweetText: {
    marginTop: 4,
    fontSize: 14,
    color: "#333",
  },
  tweetImage: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    marginTop: 8,
  },
  actionsContainer: {
    flexDirection: "row",
    marginTop: 8,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16,
  },
  actionButtonText: {
    marginLeft: 4,
    color: "#657786",
  },
  commentContainer: {
    marginTop: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  commentInput: {
    flex: 1,
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 20,
    paddingLeft: 16,
    paddingRight: 16,
    marginRight: 8,
  },
  addButton: {
    backgroundColor: "rgba(156, 167, 119, 0.7)",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  addButtonText: {
    color: "white",
  },
  commentBox: {
    backgroundColor: "#f5f8fa",
    padding: 8,
    borderRadius: 8,
    marginTop: 8,
  },
  commentText: {
    color: "#333",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: "#e1e8ed",
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 20,
    paddingLeft: 16,
    paddingRight: 16,
  },
  searchAddButton: {
    backgroundColor: "rgba(156, 167, 119, 0.7)",
    borderRadius: 20,
    padding: 16,
    alignItems: "center",
    marginTop: 16,
  },
  searchAddButtonText: {
    color: "white",
    fontSize: 16,
  },
  backgroundImage: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    opacity: 0.1,
    zIndex: -1,
  },
});

export default Forum;
