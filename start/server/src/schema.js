const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql`
    type Launch {
        id: ID!
        site: String
        mission: Mission
        rocket: Rocket
        isBooked: Boolean!
    }

    type Rocket {
        id: ID!
        name: String
        type: String
    }

    type Mission {
        name: String
        missionPatch(size: PatchSize): String
    }

    type User {
        id: ID!
        email: String!
        trips: [Launch]!
    }

    enum PatchSize {
        SMALL
        LARGE
    }

    type TripUpdateResponse {
        success: Boolean!
        message: String
        launches: [Launch]
    }
    
    type Query {
        launches(
            pageSize: Int 
            after: String
          ): LaunchConnection!
        launch(id: ID!): Launch
        me: User
    }

    type LaunchConnection {
        cursor: String!
        hasMore: Boolean!
        launches: [Launch]!
    }
    
    type Mutation {
        bookTrips(lauchIds: [ID]!): TripUpdateResponse!
        cancelTrip(launchId: ID!): TripUpdateResponse!
        login(email: String): String #login token
    }
`;


module.exports = typeDefs;
