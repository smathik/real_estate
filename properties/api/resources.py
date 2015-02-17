from tastypie import fields
from tastypie.authorization import DjangoAuthorization
from properties.models import *
from tastypie.bundle import Bundle


class AddpropertyResources(ModelResource):

	class Meta:

		resource_name = 'add_property'
		queryset = company_profile.objects.all()
		include_resouce_url = False


	def obj_create(self,bundle,request=None,**kwargs):

		print bundle
