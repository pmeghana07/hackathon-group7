# POST /users/preferences/update
# POST /users/id
# POST /users/preferences
# POST /users/recommendations/update
# POST /users/add
# POST /users/history/update

from __future__ import print_function

import boto3
import json
import uuid

client = boto3.client('dynamodb')
print('Loading users service...')

def handler(users, context):

  path = users['requestContext']["http"]["path"]
  requestJson = json.loads(users['body'])
  TABLE_NAME = "usersTable"
  dynamodb = boto3.resource('dynamodb', region_name="ap-southeast-1")
  table = dynamodb.Table(TABLE_NAME)
  
  def add_user():
    dynamo_response = client.put_item(
      TableName= TABLE_NAME,
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
    return dynamo_response["ResponseMetadata"]["HTTPStatusCode"]

  def get_user_by_preferences():
    dynamo_response = client.get_item(
      TableName=  TABLE_NAME,
      Key={
        "preferences": {
          "S": requestJson["preferences"]
        }
      }
    )
    return dynamo_response["ResponseMetadata"]["HTTPStatusCode"]

  def get_user_by_id():
    dynamo_response = client.get_item(
      TableName=  TABLE_NAME,
      Key={
        "kerberos": {
          "S": requestJson["kerberos"]
        }
      }
    )
    return dynamo_response["ResponseMetadata"]["HTTPStatusCode"]
  
  def update_preferences():
    dynamo_response = client.update_item(
      TableName=TABLE_NAME,
      Key = {
        "kerberos": {
            "S": requestJson["kerberos"]
        },
      },
      UpdateExpression="SET preferences = list_append(perferences, :new_preference)",
      ExpressionAttributeValues={
        ':new_preference': {
          "L": [
            { 
              "S": requestJson["perferences"]
        }
          ]
        }
      },
      ReturnValues="UPDATED_NEW"
    )
    return dynamo_response["ResponseMetadata"]["HTTPStatusCode"]
  
  def update_recommendations():
    dynamo_response = client.update_item(
      TableName=TABLE_NAME,
      Key = {
        "kerberos": {
            "S": requestJson["kerberos"]
        },
      },
      UpdateExpression="SET preferences = list_append(recommendations :new_recommendations)",
      ExpressionAttributeValues={
        ':new_recommendations': {
          "L": [
            { 
              "N": requestJson["recommendations"]
        }
          ]
        }
      },
      ReturnValues="UPDATED_NEW"
    )
    return dynamo_response["ResponseMetadata"]["HTTPStatusCode"]
    
  def update_history():
    dynamo_response = client.update_item(
      TableName=TABLE_NAME,
      Key = {
        "kerberos": {
            "S": requestJson["kerberos"]
        },
      },
      UpdateExpression="SET preferences = list_append(history :new_history)",
      ExpressionAttributeValues={
        ':new_history': {
          "L": [
            { 
              "N": requestJson["history"]
        }
          ]
        }
      },
      ReturnValues="UPDATED_NEW"
    )
    return dynamo_response["ResponseMetadata"]["HTTPStatusCode"]
    
  execute = {
    '/users/add': add_user,
    '/users/preferences': get_user_by_preferences,
    '/users/id': get_user_by_id,
    '/users/preferences/update': update_preferences,
    '/users/recommendations/update': update_recommendations

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