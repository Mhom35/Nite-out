steps = [
    [
        """
        CREATE TABLE wishlist (
            id SERIAL PRIMARY KEY NOT NULL,
            wishlist VARCHAR(255)[] NOT NULL,
            account INT NOT NULL
        );
        """,
        """
        DROP TABLE wishlist;
        """,
    ]
]
