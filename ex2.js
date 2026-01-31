const getUserWithPosts = async (userId) => {
  try {
    const userResponse = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
    if (!userResponse.ok) {
      throw new Error("User not found");
    }
    const user = await userResponse.json();

    const postResponse = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
    if (!postResponse.ok) {
      throw new Error("User posts not found");
    }
    const posts = await postResponse.json();

    console.log(`Found user: ${user.name}\nUser posts: ${posts}`);
    return { user: user.name, posts };
  } catch (err) {
    console.log(`Error: ${err.message}`);
    return null;
  }
};

getUserWithPosts(2);
getUserWithPosts(20);
