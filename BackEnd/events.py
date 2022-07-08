from __future__ import print_function

import boto3
import simplejson as json
import uuid

client = boto3.client('dynamodb')
print('Loading event service...')

def handler(event, context):

  path = event['requestContext']["http"]["path"]
  requestJson = json.loads(event['body'])
  TABLE_NAME = "eventTable"
  dynamodb = boto3.resource('dynamodb', region_name="ap-southeast-1")
  table = dynamodb.Table(TABLE_NAME)

  def add_event():
    category_list = []
    for category in requestJson["categories"]:
      category_list.append({"S": category})
    dynamo_response = client.put_item(
      TableName=TABLE_NAME,
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
          'L': category_list
        },
        'event_name': {
          'S': requestJson["event_name"]
        },
        'event_description': {
          'S': requestJson["event_description"]
        },
        'sizeCap': {
          'N': requestJson["sizeCap"]
        },
        'contact_person': {
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
    return dynamo_response["ResponseMetadata"]["HTTPStatusCode"]
    
  def add_participant():  
    dynamo_response = client.update_item(
      TableName=TABLE_NAME,
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
    return dynamo_response["ResponseMetadata"]["HTTPStatusCode"]

  # def edit_event():

  # def delete_event():

  def get_all_events():
    dynamo_response = table.scan()
    print("GET_ALL")
    print(dynamo_response)
    return dynamo_response["Items"]

  def get_event_by_id():
    dynamo_response = table.get_item(
      Key={
        "eventId": requestJson["eventId"]
      }
    )
    print("GET_ITEM")
    print(dynamo_response)
    return dynamo_response["Item"]

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