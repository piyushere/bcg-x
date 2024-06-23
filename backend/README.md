# Electricity connection management software API


## Installation
- Required python version: 3.10.x
- Make sure you have pipx installed, please refer to: https://pipx.pypa.io/stable/installation/
- Install poetry on you machine:
```bash
pipx install poetry
```
- Run install inside the project
```bash
poetry install
```
- Start the application:
```
python src/main.py
```

## Data Loading
I have create script `src/scripts/db_loader.py`. This script reads the csv file in the same location, makes some adjustments to the data and then populates the DB.
