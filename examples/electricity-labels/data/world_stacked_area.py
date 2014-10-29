import json

with open("electricity_by_country.json", "r") as f:
  fullData = json.load(f)

name_to_conciseName = {
  "EG.ELC.PROD.KH": "total",
  "EG.ELC.COAL.KH": "coal",
  "EG.ELC.HYRO.KH": "hydroelectric",
  "EG.ELC.NGAS.KH": "gas",
  "EG.ELC.NUCL.KH": "nuclear",
  "EG.ELC.RNWX.KH": "other_renewable"
}
countries = ["World", "United States", "China", "European Union", "India", "Japan", "Russia"]

worldData = fullData["World"]

outData = {}
for k in name_to_conciseName:
  data = worldData[k]["data"]
  shortName = name_to_conciseName[k]
  for datum in data:
    datum["type"] = shortName # hackhack
  outData[shortName] = data




with open("world_stacked_area.json", "w") as f:
  json.dump(outData, f)

