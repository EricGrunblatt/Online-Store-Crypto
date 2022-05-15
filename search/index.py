from flask import Flask
from flask_restful import Resource, Api, reqparse
from data_processor import main
app = Flask(__name__)
api = Api(app)
class Users(Resource):
    def post(self):
        parser = reqparse.RequestParser()  # initialize
        
        try:
            parser.add_argument('product_titles', required=True,action="append")  # add args
            parser.add_argument('product_ids', required=True,action="append")  # add args
            parser.add_argument('search', required=True)  # add args
            args = parser.parse_args()  # parse arguments to dictionary

            print("search:",args)
            product_titles,product_ids=main(args["search"],args["product_titles"],args["product_ids"])

            return {'product_ids': product_ids,'product_titles':product_titles}, 200  # return data with 200 OK
        
        except Exception as err:
            return {"status":"ERROR","errorMessage":str(err)},200

api.add_resource(Users, '/search')  # '/users' is our entry point for Users
# app.run(debug=True)
app.run()

