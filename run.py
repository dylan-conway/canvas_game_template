import os
from flask import Flask, render_template, url_for

app = Flask(__name__)

# Serve the game.
@app.route("/")
def index():
    return render_template("index.html")

# Disable cache so I don't have to clear everytime.
# @app.after_request
# def no_cache(response):
#     response.headers['Cache-Control'] = 'no-cache, no-store, must-revalidate'
#     response.headers['Pragma'] = 'no-cache'
#     response.headers['Expires'] = '0'
    
#     return response

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, debug=True)