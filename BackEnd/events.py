from __future__ import print_function

import boto3
import json
import uuid

client = boto3.client('dynamodb')
print('Loading event service...')

def handler(event, context):

  path = event['requestContext']["http"]["path"]
  requestJson = json.loads(event['body'])

  def add_event():
    dynamo_response = client.put_item(
      TableName='eventTable',
      Item={
        'eventId': {
          'S': str(uuid.uuid4())
        },
        'status': {
          'S': 'OPEN'
        },
        'location': {
          'S': requestJson["location"]
        },
        'participants': {
          'L': []
        },
        'startTime': {
          'S': requestJson["startTime"]
        },
        'endTime': {
          'S': requestJson["endTime"]
        },
        'date': {
          'S': requestJson["date"]
        },
        'categories': {
          'L': requestJson["categories"]
        },
        'name': {
          'S': requestJson["name"]
        },
        'sizeCap': {
          'N': requestJson["sizeCap"]
        },
        'contactPerson': {
          'M': {
            "email": {
              'S': requestJson["contactPersonEmail"]
            },
            "kerberosId": {
              "S": requestJson["contactPersonKerberos"]
            },
            "name": {
              "S": requestJson["contactPersonName"]
            }
          }
        },
      }
    )
    return dynamo_response
    
  def add_participant():  
    dynamo_response = client.update_item(
      TableName='eventTable',
      Key = {
        "eventId": {
            "S": requestJson["eventId"]
        },
      },
      UpdateExpression="SET participants = list_append(participants, :new_participant)",
      ExpressionAttributeValues={
        ':new_participant': {
          "L": [
            {
              "M":{
                "name":{
                  "S":requestJson["name"]
                },
                "email":{
                  "S":requestJson["email"]
                },
                "kerberos":{
                  "S":requestJson["kerberos"]
                }
              }
            },
          ]
        }
      },
      ReturnValues="UPDATED_NEW"
    )
    return dynamo_response

  # def edit_event():

  # def delete_event():

  def get_all_events():
    dynamo_response = client.scan(
      TableName='string'
    )
    return dynamo_response

  def get_event_by_id():
    dynamo_response = client.get_item(
      TableName='eventTable',
      Key={
        "eventId": {
          "S": requestJson["eventId"]
        }
      }
    )
    return dynamo_response

  # def get_filtered_events():
    # date, category, OPEN/CLOSE (status), location, sizeCap

  execute = {
    '/events/add': add_event,
    # '/events/edit': edit_event,
    # '/events/delete': delete_event,
    '/events/all': get_all_events,
    '/events/id': get_event_by_id,
    # '/events/filter': get_filtered_events,
    '/events/addParticipant': add_participant
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