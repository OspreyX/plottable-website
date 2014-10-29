import json


with open("WID_Data.json", "r") as f:
  fullData = json.load(f)

name_to_conciseName = {
  "EG.ELC.PROD.KH": "total",
  "EG.ELC.COAL.KH": "coal",
  "EG.ELC.HYRO.KH": "hydroelectric",
  "EG.ELC.NGAS.KH": "gas",
  "EG.ELC.NUCL.KH": "nuclear",
  "EG.ELC.RNWX.KH": "other_renewable"
}

def filterToElectricity(x):
  return x["Indicator Name"] in name_to_conciseName

electricityData = filter(filterToElectricity, fullData)

with open("full_electricity_data.json", "w") as f:
  json.dump(electricityData, f)

