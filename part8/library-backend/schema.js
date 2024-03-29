const typeDefs = `
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value : String!
  }

  type Author {
    name: String!
    born: String
    bookCount: Int
    id:ID!
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String]!
    id: ID!
  }

  type Query {
    authorCount: Int!
    bookCount: Int!
    allBooks(genre: String author:String): [Book!]!
    allAuthors: [Author!]!
  }
  
  type Query {
    me: User!
  }

  type Mutation {
    addBook (
        title: String!
        author: String!
        published: Int!
        genres: [String!]!
    ): Book

        editAuthor (
            name: String!
            setBornTo: Int!
        ): Author

        createUser(
        username: String!
        favoriteGenre: String!
        ): User

        login(
        username: String!
        password: String!
        ): Token
    }

    type Subscription {
        bookAdded : Book!
    }
`;
module.exports = typeDefs;
