import pandas as pd
from fbprophet import Prophet
from fbprophet.plot import plot_plotly, plot_components_plotly
import sys
id=sys.argv[1]
df = pd.read_csv(f"./public/{id}.csv", encoding="ISO-8859-1")
'''converting all column names to lower case'''
df.columns = map(str.lower, df.columns)
try:
    Xdf = df[['invoiceno', 'description', 'quantity', 'invoicedate', 'customerid', 'unitprice', 'country']]
except KeyError as err:
    print("Key error: {0}".format(err))
    exit()
#de_duplication
df.drop_duplicates(subset=['invoiceno', 'description', 'quantity', 'invoicedate', 'customerid', 'unitprice', 'country'], keep='first', inplace=True)
#date_format_standardization
if '/' in df['invoicedate']:
    df['invoicedate'] = pd.to_datetime(df.invoicedate, errors='coerce')
    df['invoicedate'] = df['invoicedate'].dt.strftime('%e -%m -%Y')
else:
    df['invoicedate'] = pd.to_datetime(df.invoicedate, errors='coerce')
    df['invoicedate'] = df['invoicedate'].dt.strftime('%m -%e -%Y')
trending_products=pd.DataFrame()
trending_products = df.groupby(['description'])['quantity'].sum().reset_index().sort_values(by=['quantity'], ascending=False).head(5)

new_df = df.groupby(['invoiceno', 'invoicedate', 'customerid', 'country'])['unitprice'].sum()
new_dff = new_df.to_frame()

df['invoicedate'] = pd.to_datetime(df.invoicedate, errors='coerce')
df['invoicedate'] = df['invoicedate'].dt.strftime('%Y-%m-%d')
df = df.groupby(['invoicedate'])['unitprice'].sum().reset_index()
# df = df.to_frame()
df=pd.DataFrame(df)
df['ds']=df['invoicedate']
df['y']=df['unitprice']
df.drop(['invoicedate','unitprice'],axis='columns',inplace=True)
m = Prophet()
m.fit(df)
future = m.make_future_dataframe(periods=365)
forecast = m.predict(future)
new_df=forecast[['ds', 'yhat', 'yhat_lower', 'yhat_upper']]
predict=pd.DataFrame()
predict['date']=new_df['ds']
predict['predicted_sales']=new_df['yhat']
predict['higher_predicted_sales']=new_df['yhat_upper']
predict['lower_predicted_sales']=new_df['yhat_lower']
predict.to_csv('Sales_Forecasting.csv')
print(list(trending_products['description']))
print('Sales Forecasting executed successfully !')