from __future__ import print_function

import boto3
import json
import uuid

client = boto3.client('dynamodb')
print('Loading event service...')

def handler(event, context):

  path = event['requestContext']["path"]
  requestJson = json.loads(event['body'])

  def add_event():
    dynamo_response = client.put_item(
      TableName='eventTable',
      Item={
        'eventId': {
          'S': uuid.uuid4()
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
        'tags': {
          'L': requestJson["tags"]
        },
        'name': {
          'S': requestJson["name"]
        },
        'sizeCap': {
          'N': requestJson["sizeCap"]
        },
        'contactPerson': {
          'M': {
            "telegram": {
              'S': requestJson["contactPersonTelegram"]
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
    
  # def edit_event():

  # def delete_event():

  # def get_all_events():

  # def get_event_by_id():

  # def get_filtered_events():

  execute = {
    '/events/add': add_event
    # '/events/edit': edit_event,
    # '/events/delete': delete_event,
    # '/events/all': get_all_events,
    # '/events/id': get_event_by_id,
    # '/events/filter': get_filtered_events,
  }

  data = execute[path]

  response = {
      'statusCode': 200,
      'body': json.dumps(data),
      'headers': {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
  }
  
  return response