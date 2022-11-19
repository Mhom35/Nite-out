steps = [
    [
        ## Create the table
        """
        CREATE TABLE accounts (
            id SERIAL PRIMARY KEY NOT NULL,
            email VARCHAR(255) NOT NULL,
            hashed_password VARCHAR(255) NOT NULL,
            full_name VARCHAR(255) NOT NULL
        );
        """,
        ## Drop the table
        """
        DROP TABLE accounts;
        """
    ]
]
