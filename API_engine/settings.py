"""SETTINGS
Settings loaders using Pydantic BaseSettings classes (load from environment variables / dotenv file)
"""

# # Installed # #
import pydantic

__all__ = ("api_settings", "mongo_settings")


class BaseSettings(pydantic.BaseSettings):
    class Config:
        env_file = ".env"


class APISettings(BaseSettings):
    title: str = "Robot Banao API"
    host: str = "0.0.0.0"
    port: int = 5000
    log_level: str = "INFO"

    class Config(BaseSettings.Config):
        env_prefix = "API_"


class MongoSettings(BaseSettings):
    uri: str = "mongodb://127.0.0.1:5001"
    database: str = "robot_banao"
    users: str = "users"
    enterprises: str = "enterprises"

    class Config(BaseSettings.Config):
        env_prefix = "MONGO_"


api_settings = APISettings()
mongo_settings = MongoSettings()
