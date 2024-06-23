from typing import Optional
from sqlmodel import SQLModel, Field
from datetime import date
from pydantic import BaseModel


class ElectricityApplication(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    applicantName: str
    gender: str
    district: str
    state: str
    pincode: int
    ownership: str
    govtIdType: str
    govtIdNumber: int
    category: str
    loadApplied: int
    dateSubmitted: date
    dateApproved: date | None = None
    lastModified: date
    status: str
    reviewerId: int
    reviewerName: str
    reviewComments: str


class ElectricityApplicationSchema(BaseModel):
    id: int | None = None
    applicantName: str
    gender: str
    district: str
    state: str
    pincode: int
    ownership: str
    govtIdType: str
    govtIdNumber: int
    category: str
    loadApplied: int
    dateSubmitted: date
    dateApproved: date | None = None
    lastModified: date
    status: str
    reviewerId: int
    reviewerName: str
    reviewComments: str
