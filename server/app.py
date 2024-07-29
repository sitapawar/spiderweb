from flask import Flask, json 
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # This will enable CORS for all routes

# https://stackoverflow.com/questions/31252791/flask-importerror-no-module-named-flask

@app.route('/')
def home():
    print('running')
    return "Hello, Flask!"

from flask import request

@app.route("/recieve_data", methods=['POST', 'GET'])
def recieve_data():
    if request.method == "POST":
        data = request.get_data()
        data = json.loads(data)
        # Do Stuff Here
        return data
    
if __name__ == '__main__':
    app.run(debug=True)