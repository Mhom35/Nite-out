steps = [
    [
        """
        CREATE TABLE bars (
            id SERIAL PRIMARY KEY NOT NULL,
            yelp_id VARCHAR(999) NOT NULL,
            bar_name VARCHAR(255) NOT NULL,
            url VARCHAR(999) NOT NULL,
            lat NUMERIC NOT NULL,
            long NUMERIC NOT NULL,
            image_url VARCHAR(999) NOT NULL
        );
        """,
        """
        DROP TABLE bars;
        """,
    ]
]
