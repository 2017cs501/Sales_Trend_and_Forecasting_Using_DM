# Required Attributes = 'invoiceno', 'description', 'quantity', 'invoicedate', 'customerid', 'unitprice'
from mlxtend.frequent_patterns import apriori,association_rules
import pandas as pd
import sys
import os
id=sys.argv[1]
# lines = sys.stdin.readlines()
# filename=lines[0]
# filename= filename.rstrip(os.linesep)

df=pd.read_csv(f"./public/{id}.csv", encoding='unicode_escape')
df=df.dropna()
'''converting all column names to lower case'''
df.columns = map(str.lower, df.columns)
'''checking if churn or customerid is in file, if not then end the program'''
try:
    Xdf = df[['invoiceno', 'description', 'quantity', 'invoicedate', 'customerid', 'unitprice','country']]
except KeyError as err:
    print("Key error: {0}".format(err))
    exit()
df.drop_duplicates(subset=['invoiceno', 'description', 'quantity', 'invoicedate', 'customerid', 'unitprice', 'country'], keep='first', inplace=True)
if '/' in df['invoicedate']:
    df['invoicedate'] = pd.to_datetime(df.invoicedate, errors='coerce')
    df['invoicedate'] = df['invoicedate'].dt.strftime('%e -%m -%Y')
else:
    df['invoicedate'] = pd.to_datetime(df.invoicedate, errors='coerce')
    df['invoicedate'] = df['invoicedate'].dt.strftime('%m -%e -%Y')

mybasket=df[df['country']=='Germany'].groupby(['invoiceno','description'])['quantity'].sum().unstack().reset_index().fillna(0).set_index('invoiceno')

def convert(x):
    if x<=0.0:
        return 0
    else:
        return 1
mybasket=mybasket.applymap(convert)
# mybasket.drop('POSTAGE',inplace=True,axis=1)
association_results=apriori(mybasket,min_support=0.03,use_colnames=True)
my_rules=association_rules(association_results)
my_rules.to_csv(f"./excel_files/{id}/Market_Basket.csv")
print("Market Basket Executed Successfully !")