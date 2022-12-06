steps = [
    [
        """
        CREATE TABLE trip_bars (
            trip_id INT NOT NULL,
            bar_id INT NOT NULL,
            positions INT NOT NULL,
            PRIMARY KEY (trip_id, bar_id)
        );
        """,
        """
        DROP TABLE trip_bars;
        """,
    ]
]
