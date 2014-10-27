import json


with open("world_electricity.json", "r") as f:
  fullData = json.load(f)

result = {}
names = []

def process_series(s): # obj containing keys 1960-2012, country name, Country Code, Indicator Name, Indicator Code
  data = [{"year": i, "value": s[str(i)]} for i in range(1960, 2012)]
  name = s["Indicator Name"]
  out = {"Indicator Name": name, "Indicator Code": s["Indicator Code"], "data": data}
  result[name] = out
  names.append(name)


map(process_series, fullData)
with open("processed_world_electricity.json", "w") as f:
  json.dump(result, f)

with open("electricity_field_names", "w") as f:
  json.dump(names, f)

