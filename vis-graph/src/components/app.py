from flask import Flask, request, jsonify
import pandas as pd
import os

app = Flask(__name__)

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({"error": "No file part"})
    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"})
    if file:
        filepath = os.path.join("/Users/jackcleeve/Desktop", file.filename)  # Change to your desired path
        file.save(filepath)
        
        cleaned_data = process_excel_file(filepath)
        print("Cleaned Data:", cleaned_data)  # Add this line to log data
        
        return jsonify(cleaned_data)

def process_excel_file(filepath):
    # Load the Excel file
    xls = pd.ExcelFile(filepath)
    node_data = pd.read_excel(xls, 'Sheet1')
    edge_data = pd.read_excel(xls, 'Sheet2')
    
    # Clean and validate the data
    required_node_columns = {'Name', 'Title', 'Group'}
    required_edge_columns = {'To', 'From', 'Label'}
    
    if not required_node_columns.issubset(node_data.columns):
        return {"error": "Name Sheet missing required columns"}
    if not required_edge_columns.issubset(edge_data.columns):
        return {"error": "Relationship Sheet missing required columns"}
    
    # Drop rows with missing values
    node_data = node_data.dropna()
    edge_data = edge_data.dropna()

    # Assign an index to each person node
    node_data['index'] = range(1, len(node_data) + 1)

    # Create an index on Names
    name_to_index = node_data.set_index('Name')['index'].to_dict()

    # Update 'to' and 'from' columns in edge_data
    edge_data['to'] = edge_data['to'].map(name_to_index)
    edge_data['from'] = edge_data['from'].map(name_to_index)
    
    # Convert dataframes to JSON
    node_data_json = node_data.to_json(orient='records')
    edge_data_json = edge_data.to_json(orient='records')
    
    return {
        "node_data": node_data_json,
        "edge_data": edge_data_json
    }

if __name__ == '__main__':
    app.run(debug=True)
