from .electricity_application import ElectricityApplication, ElectricityApplicationSchema
from sqlmodel import SQLModel


def generate_tables(engine, rinse=False):
    if rinse:
        SQLModel.metadata.drop_all(engine)
    SQLModel.metadata.create_all(engine)
