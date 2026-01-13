import pandas as pd
from sqlalchemy import create_engine

engine = create_engine("sqlite:///./safi.db")
df = pd.read_sql("smoke_observations", engine)
df.to_csv("safi_training_data.csv", index=False)

print("CSV exported successfully.")
