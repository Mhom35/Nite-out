import os
from fastapi import Depends
from jwtdown_fastapi.authentication import Authenticator
from pydantic import BaseModel
from typing import Optional

# from queries.accounts import AccountRepo, AccountOut, Account


class Account(BaseModel):
    id: int
    email: str
    hashed_password: str
    full_name: str


class AccountIn(BaseModel):
    email: str
    password: str
    full_name: str


class AccountOut(BaseModel):
    id: int
    email: str
    full_name: str


# class AccountRepo:
#     def get(self, email: str) -> Optional[Account]:
#         # connect the database
#         with pool.connection() as conn:
#             # get a cursor (something to run SQL with)
#             with conn.cursor() as db:
#                 # Run our SELECT statement
#                 result = db.execute(
#                     """
#                     SELECT id
#                             , email
#                             , hashed_password
#                             , full_name
#                     FROM accounts
#                     WHERE email = %s
#                     """,
#                     [email],
#                 )
#                 record = result.fetchone()
#                 if record is None:
#                     return None

#                 return Account(
#                     id=record[0],
#                     email=record[1],
#                     hashed_password=record[2],
#                     full_name=record[3],
#                 )

#     # def create(self, account: AccountIn, hashed_password: str) -> Account:
#     #     # connect the database
#     #     with pool.connection() as conn:
#     #         # get a cursor (something to run SQL with)
#     #         with conn.cursor() as db:
#     #             # Run our INSERT statement
#     #             result = db.execute(
#     #                 """
#     #                 INSERT INTO accounts
#     #                     (email, hashed_password, full_name)
#     #                 VALUES
#     #                     (%s, %s, %s)
#     #                 RETURNING id;
#     #                 """,
#     #                 [
#     #                     account.email,
#     #                     hashed_password,
#     #                     account.full_name,
#     #                 ],
#     #             )
#     #             id = result.fetchone()[0]
#     #             return Account(
#     #                 id=id,
#     #                 email=account.email,
#     #                 full_name=account.full_name,
#     #                 hashed_password=hashed_password,
#     #             )


class MyAuthenticator(Authenticator):
    async def get_account_data(
        self,
        username: str,
        # accounts: AccountRepo,
    ):
        # Use your repo to get the account based on the
        # username (which could be an email)
        # return accounts.get(username)
        pass

    def get_account_getter(
        self,
        # accounts: AccountRepo = Depends(),
    ):
        # Return the accounts. That's it.
        # return accounts
        pass

    def get_hashed_password(self, account: Account):
        # Return the encrypted password value from your
        # account object
        # return account.hashed_password
        pass

    # def get_account_data_for_cookie(self, account: Account):
    #     # Return the username and the data for the cookie.
    #     # You must return TWO values from this method.
    #     return account.email, AccountOut(**account.dict())


authenticator = MyAuthenticator(os.environ["SIGNING_KEY"])
