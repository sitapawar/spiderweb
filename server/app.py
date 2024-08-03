from flask import Flask, json, jsonify
from flask_cors import CORS
from flask import request
import pandas as pd
import json




app = Flask(__name__)
CORS(app)  # This will enable CORS for all routes


# https://stackoverflow.com/questions/31252791/flask-importerror-no-module-named-flask

@app.route('/')
def home():
    print('running')
    return "connected to backend!"

# https://www.geeksforgeeks.org/pass-javascript-variables-to-python-in-flask/

@app.route("/recieve_data", methods=['POST', 'GET'])
def recieve_data():
    if request.method == "POST":
        data = request.get_json()  # Assuming the data is sent as JSON
        # Extract sheets data from request
        sheet1_data = data.get('sheet1', [])
        sheet2_data = data.get('sheet2', [])
        
        # Convert to DataFrames
        sheet1_df = pd.DataFrame(sheet1_data[1:], columns=sheet1_data[0])  # Use the first row as columns
        sheet2_df = pd.DataFrame(sheet2_data[1:], columns=sheet2_data[0])  # Use the first row as columns
       
        # Select only the first three columns
        sheet1_df = sheet1_df.iloc[:, :3]
        sheet2_df = sheet2_df.iloc[:, :3]
        # Example processing
        print("Sheet 1 DataFrame:")
        print(sheet1_df.head())
        print("Sheet 2 DataFrame:")
        print(sheet2_df.head())

        # Return processed data as JSON
        response = {
            'sheet1': sheet1_df.to_json(orient='records'),
            'sheet2': sheet2_df.to_json(orient='records')
        }
        
        return jsonify(response)
        # # Convert the JSON data to a pandas DataFrame
        # df = pd.DataFrame(data[1:], columns=data[0])  # Use the first row as columns
        
        # # Do Stuff Here with the DataFrame
        # print(df.head())  # Print the first few rows of the DataFrame for debugging
        
        # # Convert the DataFrame back to JSON to send it back
        # data_json = df.to_json(orient='records')
        

def list_filters(data):
    return data['group'].unique()
    
def apply_filter(data, chosen_filter):
    filtered_data = data[data['group']==chosen_filter]
    return filtered_data
    
if __name__ == '__main__':
    app.run(debug=True)