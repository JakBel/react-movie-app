export const mutationLogin = async () => {
  const res = await fetch(
    "https://api.themoviedb.org/3/authentication/guest_session/new",
    {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4Y2Y0ODA0MWYwMmY3MTBjYzQ1MjQ0NzBmYTNlYWJhZiIsInN1YiI6IjYxZTcxMTNhNDk3NTYwMDAxOTU3NmM0MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ghHmnw6aBD8TCVJie_0tsL5JKJrZQPY_Qj506G3-omA",
      },
    }
  );
  return res.json();
};
