from django.http import HttpResponse
from django.shortcuts import render
import json
# import re
from properties.models import *
from django.http import HttpResponse
from django.contrib.auth import authenticate, login,logout

# from users.idv_auth.auth_helper import authenticate,login,logout,user_login_checker

def loginpage(request):
  return render(request,'login.html')

def home(request):
  return render(request,'home.html')

def login_user(request):
    data = json.loads(request.body)
    username = data['username']
    password = data['password']
    user = authenticate(username = username, password = password)
    client = user_profile.objects.filter(user_name = username, user_pswrd = password)
    print request.user
    if user:
        response = "admin"
        return HttpResponse(content=json.dumps(response), content_type="application/json; charset=UTF-8")
    elif client:
        response = "client"
        return HttpResponse(content=json.dumps(response), content_type="application/json; charset=UTF-8")
    else:
        response = 'user not registered'
        return HttpResponse(content=json.dumps(response), content_type="application/json; charset=UTF-8")


def logout_view(request):
    logout(request)
    data = {"data":"Logout Succesfully."}
    return HttpResponse(content=json.dumps(data), content_type="application/json; charset=UTF-8")

def add_property(request):
    if request.method == 'POST':
        true, false = True, False
        print '>>>>yes'
        # global company_profile
        dat = 'yes'
        data = json.loads(request.body)  
        print data
        
        company_profile.objects.create(     
                                            project_name = data['propertyname'],
                                            project_plot = data.get('plots',''),
                                            project_flat = data.get('flats','') )

    return HttpResponse(content=json.dumps(data), content_type="application/json; charset=UTF-8")

def add_user(request):
    if request.method == 'POST':
        print '<<<user'
        true, false = True, False
        data = json.loads(request.body)
        # project = company_profile.objects.filter(project_name=data['propertyname']).id
        # print project
        user_profile.objects.create(  user_name = data['username'], user_pswrd = data['paswrd'], mobile_no = data['mob_no'], city = data['city'])    
    return HttpResponse(content=json.dumps(data), content_type="application/json; charset=UTF-8")


def fetch_property(request):
  # if request.method == 'GET':
  #   print '>>>'
  #   data = []
  #   dat = company_profile.objects.all()
  #   print '>>>data',data
  #   for i in dat:
  #       data.append({'project_name':i.project_name, 'project_plot':i.project_plot, 'project_flat':i.project_flat})
  #   return HttpResponse(content=json.dumps(data), content_type="application/json; charset=UTF-8")
  return render(request, 'clientpage.html')

def clientpage(request):
    return render(request, 'clientpage.html')


def buy_propertys(request):
    if request.method == 'POST':
        true, false = True, False
        data = json.loads(request.body)

        buy_property.objects.create(    user = data.get('username',''),
                                        pro_name = data.get('obj', ''),
                                        flat = data.get('flat', ''),
                                        plot = data.get('plot', '')
                                        )



    return HttpResponse(content=json.dumps('success'), content_type="application/json; charset+UTF-8")


# def approve_property(request):
#     if request.method == 'GET':
#       data =[]
#       dat = buy_property.objects.all()
#       print '>>>data',data
#       for i in dat:
#         data.append({'pro_name':i.pro_name, 'flat':i.flat, 'plot':i.plot})
#     return HttpResponse(content=json.dumps(data), content_type="application/json; charset=UTF-8")









