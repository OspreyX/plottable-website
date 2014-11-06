import json

with open("electricity_by_country.json", "r") as f:
  fullData = json.load(f)

name_to_conciseName = {
  "EG.ELC.PROD.KH": "total",
  "EG.ELC.COAL.KH": "coal",
  "EG.ELC.HYRO.KH": "hydroelectric",
  "EG.ELC.NGAS.KH": "gas",
  "EG.ELC.PETR.KH": "oil",
  "EG.ELC.NUCL.KH": "nuclear",
  "EG.ELC.RNWX.KH": "other_renewable"
}

conciseNames = ["total", "coal", "hydroelectric", "gas", "nuclear", "other_renewable"]

countries = ["United States", "China", "European Union", "India", "Japan", "Russian Federation"]

# desired format: [country: [{value, type, country}]] - grouped by country

outData = {}

for k in name_to_conciseName:
  data = []
  shortName = name_to_conciseName[k]
  outData[shortName] = data
  for c in countries:
    datum = fullData[c][k]["data"][-1]
    datum["type"] = shortName # hackhack
    datum["country"] = c
    data.append(datum)


with open("2012_stacked_bar.json", "w") as f:
  json.dump(outData, f)

