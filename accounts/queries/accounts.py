from pydantic import BaseModel
from typing import Optional

# from datetime import date
from queries.pool import pool


class Account(BaseModel):
    id: int
    email: str
    hashed_password: str
    username: str


class AccountIn(BaseModel):
    email: str
    password: str
    username: str


class AccountOut(BaseModel):
    id: int
    email: str
    username: str


class AccountRepo:
    def get(self, username: str) -> Optional[Account]:
        # connect the database
        with pool.connection() as conn:
            # get a cursor (something to run SQL with)
            with conn.cursor() as db:
                # Run our SELECT statement
                result = db.execute(
                    """
                    SELECT id
                            , email
                            , hashed_password
                            , username
                    FROM accounts
                    WHERE username = %s
                    """,
                    [username],
                )
                record = result.fetchone()
                if record is None:
                    return None

                return Account(
                    id=record[0],
                    email=record[1],
                    hashed_password=record[2],
                    username=record[3],
                )

    def create(self, account: AccountIn, hashed_password: str) -> Account:
        # connect the database
        with pool.connection() as conn:
            # get a cursor (something to run SQL with)
            with conn.cursor() as db:
                # Run our INSERT statement
                result = db.execute(
                    """
                    INSERT INTO accounts
                        (email, hashed_password, username)
                    VALUES
                        (%s, %s, %s)
                    RETURNING id;
                    """,
                    [
                        account.email,
                        hashed_password,
                        account.username,
                    ],
                )
                id = result.fetchone()[0]
                return Account(
                    id=id,
                    email=account.email,
                    hashed_password=hashed_password,
                    username=account.username,
                )
