import pandas as pd
import sys
id=sys.argv[1]
df = pd.read_csv(f"./public/{id}.csv", encoding="ISO-8859-1")

print('Hello World')
print(df)