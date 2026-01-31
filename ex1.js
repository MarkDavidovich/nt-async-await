const getUserById = async (userId) => {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
    if (!response.ok) {
      throw new Error("User not found");
    }

    const user = await response.json();
    console.log(`Found user: ${user.name} (${user.email})`);
    return user;
  } catch (err) {
    console.log(`Error fetching user: ${err.message}`);
    return null;
  }
};

getUserById(8);
getUserById(1);
getUserById(20);
