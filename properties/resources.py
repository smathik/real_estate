from tastypie import fields
from tastypie.authorization import DjangoAuthorization
from properties.models import *
from tastypie.bundle import Bundle
from tastypie.resources import *
import json
from tastypie.exceptions import ImmediateHttpResponse


class AddpropertyResources(ModelResource):
    class Meta:

       resource_name = 'add_property'
       queryset = company_profile.objects.all()
		# include_resouce_url = False


    def obj_create(self,bundle,request=None,**kwargs):

       print bundle

       company_profile.objects.create(     
                                            project_name = bundle.data['propertyname'],
                                            project_plot = bundle.data.get('plots',''),
                                            project_flat = bundle.data.get('flats','') )

       raise ImmediateHttpResponse(response=HttpResponse(content=json.dumps('success'), content_type="application/json; charset=UTF-8"))

    class Meta:

    	resource_name = 'add_user'
    	queryset = user_profile.objects.all()

    def obj_create(self, bundle, request=None, **kwargs):

    	print 'add_user>>>>>',bundle

    	user_profile.objects.create(  user_name = bundle.data['username'], user_pswrd = bundle.data['paswrd'], mobile_no = bundle.data['mob_no'], city = bundle.data['city'])
        raise ImmediateHttpResponse(response=HttpResponse(content=json.dumps('success'), content_type="application/json; charset=UTF-8"))