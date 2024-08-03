from flask import Flask, json 
from flask_cors import CORS
from flask import request
import pandas as pd



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
        # Convert the JSON data to a pandas DataFrame
        df = pd.DataFrame(data)
        
        # Do Stuff Here with the DataFrame
        print(df.head())  # Print the first few rows of the DataFrame for debugging
        
        # Convert the DataFrame back to JSON to send it back
        data_json = df.to_json(orient='records')
        
        return data_json

def list_filters(data):
    return data['group'].unique()
    
def apply_filter(data, chosen_filter):
    filtered_data = data[data['group']==chosen_filter]
    return filtered_data
    
if __name__ == '__main__':
    app.run(debug=True)