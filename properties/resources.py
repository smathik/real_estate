from tastypie import fields
from tastypie.authorization import DjangoAuthorization
from properties.models import *
from tastypie.bundle import Bundle
from tastypie.resources import *
import json
from tastypie.exceptions import ImmediateHttpResponse
from django.http import HttpResponse
from django.contrib.auth import authenticate


class realestateauthorization(ModelResource):

    class Meta:
        resource_name = 'login_user'
        queryset = user_profile.objects.all()

    def obj_create(self, bundle, request=None, **kwargs):
        # bundle.data = json.loads(request.body)
        print '>>>>>>>', bundle

        username = bundle.data['username']
        password = bundle.data['password']
        user = authenticate(username = username, password = password)
        client = user_profile.objects.filter(user_name = username, user_pswrd = password)
                # print request.user
        if user:
            response = "admin"
            raise ImmediateHttpResponse(response=HttpResponse(content=json.dumps(response), content_type="application/json; charset=UTF-8"))
        elif client:
            response = "client"
            print username
            raise ImmediateHttpResponse(response=HttpResponse(content=json.dumps({'response':response, 'username':username}), content_type="application/json; charset=UTF-8"))
        else:
            response = 'user not registered'
            raise ImmediateHttpResponse(response=HttpResponse(content=json.dumps(response), content_type="application/json; charset=UTF-8"))

        


class AddpropertyResources(ModelResource):
    class Meta:

       resource_name = 'add_property'
       queryset = company_profile.objects.all()
		# include_resouce_url = False


    def obj_create(self,bundle,request=None,**kwargs):

       print bundle

       company_profile.objects.create(      project_name = bundle.data['propertyname'],
                                            project_plot = bundle.data.get('plots',''),
                                            project_flat = bundle.data.get('flats','') )

       raise ImmediateHttpResponse(response=HttpResponse(content=json.dumps('success'), content_type="application/json; charset=UTF-8"))


class Adduser(ModelResource):

    class Meta:

    	resource_name = 'add_user'
    	queryset = user_profile.objects.all()

    def obj_create(self, bundle, request=None, **kwargs):

    	print 'add_user>>>>>',bundle

    	user_profile.objects.create(  user_name = bundle.data['username'], user_pswrd = bundle.data['paswrd'], mobile_no = bundle.data['mob_no'], city = bundle.data['city'])
        raise ImmediateHttpResponse(response=HttpResponse(content=json.dumps('success'), content_type="application/json; charset=UTF-8"))


class fetchproperty(ModelResource):

    class Meta:

        resource_name = 'fetch_property'
        queryset = company_profile.objects.all()
        # allowed_methods = ['GET']

    # def get_object_list(self, request):

    # # print 'fetchproperty>>>>>>', bundle
    #     data = []
    #     obj = company_profile.objects.all()
    #     print '>>>data',data
    #     for i in obj:
    #         data.append({'project_name':i.project_name, 'project_plot':i.project_plot, 'project_flat':i.project_flat})
    #     raise ImmediateHttpResponse(response=HttpResponse(content=json.dumps(data), content_type="application/json"))
    # def get_object_list(self,  request):
    #     print '>>>>>>>',username

    def alter_list_data_to_serialize(self, request, data_dict):
        if isinstance(data_dict, dict):
            if 'meta' in data_dict:
                del(data_dict['meta'])
        data_dict = data_dict['objects']
        return data_dict


class approve_property(ModelResource):

    class Meta:
        # serializer = Serializer()
        resource_name = 'approve_property'
        queryset = buy_property.objects.all()

    def alter_list_data_to_serialize(self, request, data_dict):
     if isinstance(data_dict, dict):
       if 'meta' in data_dict:
         del(data_dict['meta'])
     data_dict = data_dict['objects']    
     return data_dict

    # def get_object_list(self, request):

    #     data = []
    #     obj = buy_property.objects.all()
    #     for i in obj:
    #         data.append({'pro_name':i.pro_name, 'flat':i.flat, 'plot':i.plot})
    #     raise ImmediateHttpResponse(response=HttpResponse(content=json.dumps(data), content_type="application/json"))



















