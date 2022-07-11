from __future__ import print_function

import boto3
import simplejson as json
import uuid
from datetime import datetime

client = boto3.client('dynamodb')
print('Loading event service...')


def send_sns(message, event_name,topic_arn):
  sns_client = boto3.client('sns')
  sns_client.publish(TopicArn = topic_arn, Message = message, Subject = 'Registration for '+ event_name)
def sendrecommendation_sns(message, event_name,topic_arn):
    sns_client = boto3.client('sns')
    sns_client.publish(TopicArn = topic_arn, Message = message, Subject = 'Recommendation for you: '+ event_name)
def handler(event, context):

  path = event['requestContext']["http"]["path"]
  requestJson = json.loads(event['body'])
  TABLE_NAME = "eventTable"
  dynamodb = boto3.resource('dynamodb', region_name="ap-southeast-1")
  table = dynamodb.Table(TABLE_NAME)
  add_event_sns = boto3.client('sns')

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
    #logic to send email.
    
    event_name = requestJson["event_name"]
    location = requestJson["location"]
    date = requestJson["date"]
    startTime = int(requestJson["startTime"])
    endTime = int(requestJson["endTime"])
    startHour = str(int(startTime / 100))
    startMinute = str(int(startTime % 100))
    endHour = str(int(endTime / 100))
    endMinute = str(int(endTime % 100))
    if endMinute == "0":
      endMinute = "00"
    if startMinute == "0":
      startMinute = "00"
    url = "https://main.d3p9ddmmlki2i1.amplifyapp.com/calendar"
    message = "Hi, the following event is happening:  \"" + event_name + "\" session \nLocation: " + location  + "\nStart time: " + startHour + ":" + startMinute + "\nEnd time: " + endHour + ":" + endMinute + "\nDate: "  + date + "\nTake a look if you are interested: " + url
    sendrecommendation_sns(message,event_name,'arn:aws:sns:ap-southeast-1:491240003285:send_recommendation')
    return dynamo_response["ResponseMetadata"]["HTTPStatusCode"]
    
  
  
  def get_event_by_event_id(id):
    dynamo_response = table.get_item(
      Key={
        "eventId": id
      }
    )
    print("GET_ITEM")
    print(dynamo_response)
    return dynamo_response["Item"]
  
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
    eventId = requestJson["eventId"]
    eventJson = get_event_by_event_id(eventId)
    event_name = eventJson["event_name"]
    date = eventJson["date"]
    startTime = eventJson["startTime"]
    endTime = eventJson["endTime"]
    startHour = str(startTime / 100)
    startMinute = str(startTime % 100)
    endHour = str(endTime / 100)
    endMinute = str(endTime % 100)
    if endMinute == "0":
      endMinute = "00"
    if startMinute == "0":
      startMinute = "00"
    location = eventJson["location"]
    #d = datetime.strptime("10:30", "%H:%M")
    
    message = "You have registered \"" + event_name + "\" session \nLocation: " + location  + "\nStart time: " + startHour + ":" + startMinute + "\nEnd time: " + endHour + ":" + endMinute + ":\nDate: "  + date
    send_sns(message, event_name,'arn:aws:sns:ap-southeast-1:491240003285:email_topic')
    print("send sns successfully")
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

  # execute = {
  #   '/events/add': add_event,
  #   # '/events/edit': edit_event,
  #   # '/events/delete': delete_event,
  #   '/events/all': get_all_events,
  #   '/events/id': get_event_by_id,
  #   # '/events/filter': get_filtered_events,
  #   '/events/addParticipant': add_participant
  # }
  
  execute = {
    '/dev/events/add': add_event,
    '/events/add': add_event,
    '/events/all': get_all_events,
    '/events/id': get_event_by_id,
    '/dev/events/all': get_all_events,
    '/dev/events/id': get_event_by_id,
    '/dev/events/addParticipant': add_participant,
    '/events/addParticipant': add_participant
  }

  data = execute[path]()

  response = {
      'statusCode': 200,
      'body': json.dumps(data),
      'headers': {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'OPTIONS,POST,GET,PUT,DELETE',
        "Access-Control-Allow-Headers" : "Content-Type"
      }
  }

  return response
  
  
