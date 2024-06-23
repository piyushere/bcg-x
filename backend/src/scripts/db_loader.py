from sqlmodel import Session, SQLModel
import pandas as pd
import os
from src.models.electricity_application import ElectricityApplication
from src.config.db import sync_engine
from src.models import generate_tables


base_path = os.path.abspath('')
target_file = os.path.join(
    base_path, 'src/scripts/electricity_board_case_study.csv')
dataset = pd.read_csv(target_file)


column_mapping = {
    'ID': 'id',
    'Applicant_Name': 'applicantName',
    'Gender': 'gender',
    'District': 'district',
    'State': 'state',
    'Pincode': 'pincode',
    'Ownership': 'ownership',
    'GovtID_Type': 'govtIdType',
    'ID_Number': 'govtIdNumber',
    'Category': 'category',
    'Load_Applied (in KV)': 'loadApplied',
    'Date_of_Application': 'dateSubmitted',
    'Date_of_Approval': 'dateApproved',
    'Modified_Date': 'lastModified',
    'Status': 'status',
    'Reviewer_ID': 'reviewerId',
    'Reviewer_Name': 'reviewerName',
    'Reviewer_Comments': 'reviewComments',
}

dataset = dataset.rename(columns=column_mapping)
for column in dataset:
    if str(column) in ['dateSubmitted', 'dateApproved', 'lastModified']:
        dataset[column] = pd.to_datetime(dataset[column], format='%d-%m-%y')
    elif dataset[column].dtype == 'float64':
        dataset[column] = dataset[column].astype(int)
    elif dataset[column].dtype == 'object':
        dataset[column] = dataset[column].str.lower()
dataset.replace(
    to_replace={pd.NaT: None, 'commerical': 'commercial'}, inplace=True)

generate_tables(sync_engine, rinse=True)
with Session(sync_engine) as session:
    records = dataset.to_dict('records')
    rows = []
    for record in records:
        row = ElectricityApplication.model_validate(record)
        rows.append(row)
    session.add_all(rows)
    session.commit()
