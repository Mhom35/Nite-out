import os
from jwtdown_fastapi.authentication import Authenticator
from pydantic import BaseModel


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
