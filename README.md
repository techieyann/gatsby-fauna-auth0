# gatsby-fauna-auth0

Boilerplate for a gatsby site authenticating with auth0 and faunaDB

# Setup Auth0 and FaunaDB

From: https://www.smashingmagazine.com/2020/06/static-sites-jamstack-apps-faunadb/

You'll have to create an app on Auth0 and create a rule:

```
async function (user, context, callback) {
  const FAUNADB_SECRET = 'Your Server secret';
  const faunadb = require('faunadb@2.11.1');
  const { query: q } = faunadb;
  const client = new faunadb.Client({ secret: FAUNADB_SECRET });
  try {
    const token = await client.query(
      q.Call('user_login_or_create', user.email, user) // Call UDF in fauna
    );
    let newClient = new faunadb.Client({ secret: token.secret });

    context.idToken['https://faunadb.com/id/secret'] = token.secret;
    callback(null, user, context);
  } catch(error) {
    console.log('->', error);
    callback(error, user, context);
  }
}
```

And setup FaunaDB to properly support the auth flow. Create a `users` collection with a function `user_login_or_create` termed by `data.email`:

```
Query(
  Lambda(
    ["userEmail", "userObj"], // Arguments
    Let(
      { user: Match(Index("user_by_email"), Var("userEmail")) }, // Set user variable
      If(
        Exists(Var("user")), // Check if the User exists
        Create(Tokens(null), { instance: Select("ref", Get(Var("user"))) }), // Return a token for that item in the users collection (in other words, the user)
        Let( // Else statement: Set a variable
          {
            newUser: Create(Collection("users"), { data: Var("userObj") }), // Create a new user and get its reference
            token: Create(Tokens(null), { // Create a token for that user
              instance: Select("ref", Var("newUser"))
            })
          },
          Var("token") // return the token
        )
      )
    )
  )
)
```

You'll want to make an `AuthedUser` role as well.
