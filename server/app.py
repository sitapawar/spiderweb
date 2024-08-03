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
        
        sheet1_df = fix_naming(sheet1_df)
        sheet2_df = fix_edges(sheet1_df, sheet2_df)

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
        
    
##IF GROUP IS ONE THING
def list_filters(sheet1_df):
    return sheet1_df['group'].unique()

def filter_by_group(sheet1_df, sheet2_df, chosen_filter, chosen_group_number):
    #so here chosen_group_number will be like group1, group2 etc
    filtered_sheet1_df = sheet1_df[sheet1_df[chosen_group_number] == chosen_filter]
    
    filtered_node_ids = filtered_sheet1_df['id'].tolist()
    
    filtered_sheet2_df = sheet2_df[
        (sheet2_df['from'].isin(filtered_node_ids)) | 
        (sheet2_df['to'].isin(filtered_node_ids))
    ]
    
    return filtered_sheet1_df, filtered_sheet2_df

def fix_naming(sheet1_df):
    sheet1_df.columns.values[0] = 'id'
    sheet1_df.columns.values[1] = 'name'
    sheet1_df.columns.values[2] = 'label'
    sheet1_df.columns.values[3] = 'value'

    
    group_columns = sheet1_df.columns[3:]
    
    #gonna rename the other group columns to group1, group2, etc.
    for i, col in enumerate(group_columns, start=1):
        sheet1_df.rename(columns={col: f'group{i}'}, inplace=True)
    
    return sheet1_df

##IF GROUP IS ARRAY
#need a diff list filters

def filter_by_group_array(sheet1_df, sheet2_df, chosen_filter):
    # Filter nodes by group
    filtered_sheet1_df = sheet1_df[sheet1_df['groups'].apply(lambda x: chosen_filter in x)]
    
    # Get the ids of the filtered nodes
    filtered_node_ids = filtered_sheet1_df['id'].tolist()
    
    # Filter relationships where at least one node is in the filtered group
    filtered_sheet2_df = sheet2_df[
        (sheet2_df['from'].isin(filtered_node_ids)) | 
        (sheet2_df['to'].isin(filtered_node_ids))
    ]
    
    return filtered_sheet1_df, filtered_sheet2_df

def fix_naming_array(sheet1_df):
    sheet1_df.columns.values[0] = 'id'
    sheet1_df.columns.values[1] = 'name'
    sheet1_df.columns.values[2] = 'label'
    sheet1_df.columns.values[3] = 'value'
    
    # Create a new 'groups' column by aggregating all remaining columns into a list
    sheet1_df['groups'] = sheet1_df.iloc[:, 4:].apply(lambda row: row.dropna().tolist(), axis=1)
    
    # Select only the required columns
    fixed_sheet1_df = sheet1_df[['id', 'name', 'label', 'value', 'groups']]
    
    return fixed_sheet1_df

def fix_edges(sheet1_df, sheet2_df):
    # Create a dictionary to map names to ids
    name_to_id = pd.Series(sheet1_df.id.values, index=sheet1_df.name).to_dict()
    
    # Function to convert name to id if necessary
    def convert_to_id(value):
        return name_to_id.get(value, value)
    
    # Apply the conversion function to node1 and node2 columns
    sheet2_df['to'] = sheet2_df['to'].apply(convert_to_id)
    sheet2_df['from'] = sheet2_df['from'].apply(convert_to_id)
    
    return sheet2_df


    
    
if __name__ == '__main__':
    app.run(debug=True)