steps = [
    [
        """
        CREATE TABLE accounts (
            id SERIAL PRIMARY KEY NOT NULL,
            email VARCHAR(255) NOT NULL UNIQUE,
            hashed_password VARCHAR(255) NOT NULL,
            username VARCHAR(255) NOT NULL UNIQUE
        );
        """,
        """
        DROP TABLE accounts;
        """,
    ]
]
