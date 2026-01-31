const dashboard = async () => {
  try {
    const usersResponse = await fetch(`https://jsonplaceholder.typicode.com/users`);
    if (!usersResponse.ok) {
      throw new Error("Users not found");
    }
    const postsResponse = await fetch(`https://jsonplaceholder.typicode.com/posts`);
    if (!postsResponse.ok) {
      throw new Error("Posts not found");
    }
    const commentsResponse = await fetch(`https://jsonplaceholder.typicode.com/comments`);
    if (!commentsResponse.ok) {
      throw new Error("Comments not found");
    }

    const users = await usersResponse.json();
    const posts = await postsResponse.json();
    const comments = await commentsResponse.json();

    const totalUsers = users.length;
    const totalPosts = posts.length;
    const totalComments = comments.length;

    const topUsers = getTopThreeUsers(getUsersInfo(users, posts, comments));

    const recentPosts = getRecentPosts(posts);

    return {
      summary: { totalUsers, totalPosts, totalComments, avgPostsPerUser: totalPosts / totalUsers, avgCommentsPerPost: totalComments / totalPosts },
      topUsers,
      recentPosts,
    };
  } catch (err) {
    console.log(`Error: ${err.message}`);
    return null;
  }
};

const getUsersInfo = (users, posts, comments) => {
  return users.map((user) => {
    const userPosts = posts.filter((post) => post.userId === user.id);
    const userComments = comments.filter((comment) => userPosts.some((post) => post.id === comment.postId));

    return {
      userName: user.name,
      postCount: userPosts.length,
      commentCount: userComments.length,
    };
  });
};

const getTopThreeUsers = (usersInfo) => [...usersInfo].sort((a, b) => b.postCount - a.postCount).slice(0, 3);

const getRecentPosts = (posts) => [...posts].sort((a, b) => b.id - a.id).slice(0, 10);

(async () => {
  const result = await dashboard();
  console.log(result);
})();
