from django.conf.urls import patterns, include, url
from properties.models import *
from properties.views import *
from tastypie.api import Api
from properties.resources import *

# Uncomment the next two lines to enable the admin:
# from django.contrib import admin
# admin.autodiscover()
api  = Api(api_name="properties")
api.register(AddpropertyResources())
api.register(Adduser())
api.register(fetchproperty())
api.register(approve_property())
urlpatterns = patterns('',
    # Examples:
    # url(r'^admin/', include(admin.site.urls)),
    # url(r'^$', 'real_estate.views.home', name='home'),
    # url(r'^real_estate/', include('real_estate.foo.urls')),
    # url(r'^accounts/login/$', 'insure.views.home'),
    url(r'^$', loginpage),
    
    url(r'^login/$', login_user),
    url(r'^home/$', home),  
    url(r'^add_property/$', add_property),
    url(r'^add_user/$', add_user),
    url(r'^clientpage/$', clientpage),
    # url(r'^fetch_property/$',fetch_property),
    url(r'^buy_propertys/$',buy_propertys),
    # url(r'^approve_property/$',approve_property),
    # url(r'^logout/$', 'users.views.logout_view'),

    # Uncomment the admin/doc line below to enable admin documentation:
    # url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    # url(r'^admin/', include(admin.site.urls)),
    url(r'^api/', include(api.urls)),
)
