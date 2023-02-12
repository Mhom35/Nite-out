steps = [
    [
        """
        CREATE TABLE trips (
            id SERIAL PRIMARY KEY NOT NULL,
            trip_name VARCHAR(255) NOT NULL,
            locations VARCHAR(255)[] NOT NULL,
            description TEXT NOT NULL,
            created_on TIMESTAMP NOT NULL,
            image_url VARCHAR(255),
            likes SMALLINT,
            city VARCHAR(255),
            account INT NOT NULL,
            username VARCHAR(255)
        );
        """,
        """
        DROP TABLE trips;
        """,
    ]
]
