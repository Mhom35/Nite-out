steps =[
    [
        ## Create the table
        """
        CREATE TABLE trip_bars (
            trip_id INT NOT NULL,
            bar_id INT NOT NULL,
            PRIMARY KEY (trip_id, bar_id)
        );
        """,
        ## Drop the table
        """
        DROP TABLE trip_bars;
        """,
    ]
]
