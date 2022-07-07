# POST /users/preferences/update
# POST /users/id
# POST /users/recommendations/update
# POST /users/add

from __future__ import print_function

import boto3
import json
import uuid

client = boto3.client('dynamodb')
print('Loading users service...')

def handler(users, context):

  path = users['requestContext']["http"]["path"]
  requestJson = json.loads(users['body'])
  
  def add_user():
    dynamo_response = client.put_item(
      TableName='usersTable',
      Item={
        'kerberos': {
          'S': requestJson["kerberos"]
        },
        'contact': {
          'S': requestJson["contact"]
        },
        'name': {
          'S': requestJson["name"]
        },
        'recommendations': {
          'L': []
        },
        'team': {
          'S': requestJson["team"]
        },
        'preferences': {
          'S': requestJson["preferences"]
        },
        'location': {
          'M': {
            "country": {
              'S': requestJson["user_country"]
            },
            "office_location": {
              "S": requestJson["user_location"]
            }
          }
        },
        
        "history": { "L": []
        },

    
          }
    )
    return dynamo_response

  execute = {
    '/users/add': add_user,
    #'/users/all': get_all_users,
    #'/users/id': get_user_by_id,
    #'/users/preferences/update': update_preferences
    #'/users/recommendations/update': update_references

  }

  data = execute[path]()

  response = {
      'statusCode': 200,
      'body': json.dumps(data),
      'headers': {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
  }

  return response