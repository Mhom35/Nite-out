steps =[
    [
        ## Create the table
        """
        CREATE TABLE bars (
            id SERIAL PRIMARY KEY NOT NULL,
            yelp_id VARCHAR(999) NOT NULL,
            bar_name VARCHAR(255) NOT NULL,
            url VARCHAR(999) NOT NULL,
            lat DOUBLE PRECISION NOT NULL,
            long DOUBLE PRECISION NOT NULL,
            price VARCHAR(200)
        );
        """,
        ## Drop the table
        """
        DROP TABLE bars;
        """,
    ]
]
