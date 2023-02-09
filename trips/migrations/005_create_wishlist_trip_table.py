steps = [
    [
        """
        CREATE TABLE wishlist_trips (
            wishlist_id INT NOT NULL,
            trip_id INT NOT NULL,
            PRIMARY KEY (wishlist_id, trip_id)
        );
        """,
        """
        DROP TABLE wishlist_trips;
        """,
    ]
]