import pandas as pd
import json

df = pd.read_excel(
    './alerta.xls',
    header=0,
    names=["id_pacient", "B", "first_name", "last_name", "dni", "date", "G", "time", "I", "type", "observations", "medic"]
)
df = df.drop(columns=["B", "G", "I"])

df["first_name"] = df["first_name"].astype(str).str.strip()
df["last_name"] = df["last_name"].astype(str).str.strip()
df["medic"] = df["medic"].astype(str).str.strip()
df["observations"] = df["observations"].astype(str).str.strip()
df["date"] = pd.to_datetime(df["date"]).dt.strftime("%Y-%m-%d")
df["time"] = pd.to_datetime(df["time"], format="%H:%M:%S", errors='coerce').dt.strftime("%H:%M:%S")

df = df.drop_duplicates(subset=["dni", "date", "time", "type", "observations", "medic"])

grouped = df.groupby("dni").apply(
    lambda x: {
        "id_pacient": x.iloc[0]["id_pacient"],
        "dni": x.iloc[0]["dni"],
        "first_name": x.iloc[0]["first_name"],
        "last_name": x.iloc[0]["last_name"],
        "events": x[["date", "time", "type", "observations", "medic"]].to_dict(orient="records")
    }
)

data = grouped.tolist()

with open("patients.json", "w", encoding="utf-8") as f:
    json.dump(data, f, indent=2, ensure_ascii=False, default=str)
