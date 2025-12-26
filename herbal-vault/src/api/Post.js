export const getPosts = async () => {
  const res = await fetch("/herbPosts.json");
  return res.json();
};